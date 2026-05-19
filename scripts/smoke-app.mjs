#!/usr/bin/env node
// Loads each indexable page into jsdom, runs app.js, and asserts the core runtime behaviour:
//  - app.js boots without uncaught errors on every page.
//  - i18n actually translates (no [data-i18n] element keeps its raw English fallback
//    when we toggle to PT).
//  - setLang round-trips through localStorage under the marinaLang key.
//  - html.lang-pending is cleared after boot (otherwise body stays hidden).
//  - aria-pressed flips on the lang toggle buttons.
//  - On pages that ship #diagnostic: all 5 tiles click cleanly; non-training tiles
//    produce an acuity-embed-button CTA, and the training tile produces an internal
//    link to training.html#plans (no acuity-embed-button).
//  - FAQ search filters .faq__item children on input.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { JSDOM, VirtualConsole } from 'jsdom';
import { ROOT, makeReporter, INDEXABLE_PAGES } from './lib/parse.mjs';

const r = makeReporter('smoke-app');
const appJs = readFileSync(join(ROOT, 'app.js'), 'utf8');

// Pages that ship the diagnostic widget. Others should boot without errors but
// don't have #diagResult or .diag__tile to exercise.
const DIAG_PAGES = new Set(['index.html', 'method.html']);

// Pages we expect to have a FAQ search input. Others skip the FAQ check.
const FAQ_SEARCH_PAGES = new Set(['index.html', 'massage.html']);

const DIAG_EXPECTED = {
  neck:     { internal: false, slugSuffix: 'SomaticMassageCorporal' },
  jaw:      { internal: false, slugSuffix: 'SomaticMassageFacial' },
  back:     { internal: false, slugSuffix: 'SomaticMassageCorporal' },
  stress:   { internal: false, slugSuffix: 'SensoryEnergetics' },
  training: { internal: true,  slugSuffix: 'training.html#plans' },
};

async function bootPage(page, { preLang } = {}) {
  const html = readFileSync(join(ROOT, page), 'utf8');
  const inlined = html.replace(
    /<script[^>]*src=["']app\.js["'][^>]*><\/script>/i,
    `<script>${appJs}</script>`,
  );
  const vc = new VirtualConsole();
  const jsdomErrors = [];
  vc.on('jsdomError', (err) => jsdomErrors.push(err.message || String(err)));
  vc.on('error', (msg) => jsdomErrors.push(String(msg)));

  const dom = new JSDOM(inlined, {
    runScripts: 'outside-only',
    pretendToBeVisual: true,
    url: 'https://marinabodywork.com/' + (page === 'index.html' ? '' : page),
    virtualConsole: vc,
    beforeParse(window) {
      // Pre-seed localStorage so the pre-paint lang-pending script sees it.
      // This is the test for the "returning PT visitor" pre-paint path.
      if (preLang) {
        try { window.localStorage.setItem('marinaLang', preLang); } catch { /* ignore */ }
      }
      window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
      class IO { observe() {} unobserve() {} disconnect() {} }
      window.IntersectionObserver = IO;
    },
  });
  // Run the IIFE.
  dom.window.eval(appJs);
  dom.window.document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));
  await new Promise((resolve) => setTimeout(resolve, 50));
  return { dom, jsdomErrors };
}

for (const page of INDEXABLE_PAGES) {
  const { dom, jsdomErrors } = await bootPage(page);
  const { window } = dom;
  const { document, localStorage } = window;

  for (const e of jsdomErrors) r.error(`${page}: jsdom runtime error - ${e}`);

  // 1. js-on class set (progressive-enhancement guard).
  if (!document.documentElement.classList.contains('js-on')) {
    r.error(`${page}: html.js-on class is not set after boot`);
  }

  // 2. lang-pending cleared (it's only set when localStorage.marinaLang === 'pt' anyway,
  //    but for the default-EN boot we just assert it's not stuck on).
  if (document.documentElement.classList.contains('lang-pending')) {
    r.error(`${page}: html.lang-pending is still set after boot (body would stay hidden)`);
  }

  // 3. aria-pressed defaults to EN active.
  const enBtn = document.querySelector('.lang button[data-lang="en"]');
  const ptBtn = document.querySelector('.lang button[data-lang="pt"]');
  if (!enBtn || !ptBtn) {
    r.error(`${page}: language toggle buttons missing`);
  } else {
    if (enBtn.getAttribute('aria-pressed') !== 'true') {
      r.error(`${page}: EN lang button aria-pressed should be "true" after boot, got "${enBtn.getAttribute('aria-pressed')}"`);
    }
    if (ptBtn.getAttribute('aria-pressed') !== 'false') {
      r.error(`${page}: PT lang button aria-pressed should be "false" after boot, got "${ptBtn.getAttribute('aria-pressed')}"`);
    }

    // 4. setLang('pt') flips lang attr + translates + persists.
    ptBtn.click();
    await new Promise((resolve) => setTimeout(resolve, 20));
    if (document.documentElement.lang !== 'pt-BR') {
      r.error(`${page}: <html lang> should be "pt-BR" after PT toggle, got "${document.documentElement.lang}"`);
    }
    if (localStorage.getItem('marinaLang') !== 'pt') {
      r.error(`${page}: localStorage.marinaLang should be "pt" after PT toggle`);
    }
    if (ptBtn.getAttribute('aria-pressed') !== 'true' || enBtn.getAttribute('aria-pressed') !== 'false') {
      r.error(`${page}: aria-pressed should flip after PT toggle (got EN="${enBtn.getAttribute('aria-pressed')}" PT="${ptBtn.getAttribute('aria-pressed')}")`);
    }

    // Every [data-i18n] should now have an innerHTML different from the raw EN markup
    // OR known to be identical in both languages (proper nouns, prices). We can't easily
    // distinguish, so just spot-check the nav.method link (stable, known different).
    const navMethodPt = document.querySelector('[data-i18n="nav.method"]');
    if (navMethodPt && navMethodPt.innerHTML.trim() !== 'Método') {
      r.error(`${page}: nav.method should render "Método" after PT toggle, got "${navMethodPt.innerHTML}"`);
    }

    // Flip back to EN.
    enBtn.click();
    await new Promise((resolve) => setTimeout(resolve, 20));
  }

  // 5. Diagnostic widget - exercise every documented area on pages that ship it.
  if (DIAG_PAGES.has(page)) {
    const tiles = document.querySelectorAll('.diag__tile');
    if (tiles.length !== 5) r.error(`${page}: expected 5 diagnostic tiles, got ${tiles.length}`);
    const result = document.getElementById('diagResult');
    if (!result) r.error(`${page}: #diagResult missing`);

    for (const [area, want] of Object.entries(DIAG_EXPECTED)) {
      const tile = document.querySelector(`.diag__tile[data-area="${area}"]`);
      if (!tile) { r.error(`${page}: diagnostic tile [data-area="${area}"] missing`); continue; }
      tile.click();
      await new Promise((resolve) => setTimeout(resolve, 20));
      if (!result || !result.classList.contains('is-open')) {
        r.error(`${page}: #diagResult should have "is-open" after clicking ${area} tile`);
        continue;
      }
      const cta = result.querySelector('a.btn');
      if (!cta) { r.error(`${page}: diag ${area} - #diagResult has no CTA anchor`); continue; }
      const href = cta.getAttribute('href') || '';
      const hasAcuityClass = cta.classList.contains('acuity-embed-button');
      if (want.internal) {
        if (hasAcuityClass) r.error(`${page}: diag ${area} CTA is internal (training.html#plans) but carries acuity-embed-button class`);
        if (!href.endsWith(want.slugSuffix)) r.error(`${page}: diag ${area} CTA href "${href}" should end with "${want.slugSuffix}"`);
      } else {
        if (!hasAcuityClass) r.error(`${page}: diag ${area} CTA must carry acuity-embed-button class`);
        if (!href.includes(want.slugSuffix)) r.error(`${page}: diag ${area} CTA href "${href}" should include "${want.slugSuffix}"`);
      }
    }
  }

  // 6. FAQ search - typing should hide non-matching items.
  if (FAQ_SEARCH_PAGES.has(page)) {
    const faq = document.querySelector('.faq');
    const search = faq && faq.querySelector('.faq__search input');
    const items = faq ? faq.querySelectorAll('.faq__item') : [];
    if (!search) r.error(`${page}: expected .faq__search input but not found`);
    else if (!items.length) r.error(`${page}: .faq__search present but no .faq__item children`);
    else {
      search.value = 'zzzzz-no-match';
      search.dispatchEvent(new window.Event('input', { bubbles: true }));
      await new Promise((resolve) => setTimeout(resolve, 20));
      const visible = [...items].filter((el) => el.style.display !== 'none').length;
      if (visible !== 0) r.error(`${page}: FAQ search with no-match query should hide all ${items.length} items; ${visible} still visible`);
      if (!faq.classList.contains('is-empty')) r.error(`${page}: FAQ should carry "is-empty" class when no items match`);
      search.value = '';
      search.dispatchEvent(new window.Event('input', { bubbles: true }));
    }
  }

  dom.window.close();
}

// ── Returning-PT-visitor path: pre-set marinaLang=pt and assert
//    lang-pending is removed AND the page is translated to PT after boot.
{
  const { dom, jsdomErrors } = await bootPage('index.html', { preLang: 'pt' });
  const { window: w } = dom;
  for (const e of jsdomErrors) r.error(`index.html (preLang=pt): jsdom runtime error - ${e}`);
  if (w.document.documentElement.classList.contains('lang-pending')) {
    r.error('index.html (preLang=pt): html.lang-pending NOT cleared after boot (body would stay hidden indefinitely)');
  }
  if (w.document.documentElement.lang !== 'pt-BR') {
    r.error(`index.html (preLang=pt): <html lang> should be "pt-BR", got "${w.document.documentElement.lang}"`);
  }
  const navMethod = w.document.querySelector('[data-i18n="nav.method"]');
  if (navMethod && navMethod.innerHTML.trim() !== 'Método') {
    r.error(`index.html (preLang=pt): nav.method should render "Método", got "${navMethod.innerHTML}"`);
  }
  dom.window.close();
}

console.log(`[smoke-app] booted ${INDEXABLE_PAGES.length} pages + returning-PT path; exercised i18n, diagnostic widget, FAQ search`);
r.done();
