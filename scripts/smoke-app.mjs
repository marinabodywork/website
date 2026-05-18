#!/usr/bin/env node
// Loads index.html into jsdom, runs app.js, and asserts the core runtime behaviour:
//  - i18n actually translates ([data-i18n] elements get their innerHTML replaced).
//  - setLang round-trips through localStorage under the marinaLang key.
//  - The diagnostic widget renders 5 tiles and clicking one populates #diagResult with a CTA.
//  - FAQ search filters .faq__item children on input.
//
// Requires devDependency: jsdom.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { JSDOM, VirtualConsole } from 'jsdom';
import { ROOT, makeReporter } from './lib/parse.mjs';

const r = makeReporter('smoke-app');
const html = readFileSync(join(ROOT, 'index.html'), 'utf8');
const appJs = readFileSync(join(ROOT, 'app.js'), 'utf8');

// Inline app.js so jsdom executes it without a network fetch.
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
  url: 'https://marinabodywork.com/',
  virtualConsole: vc,
});

// jsdom doesn't implement matchMedia or IntersectionObserver, which app.js calls during boot.
// Stub them before executing app.js, then re-run the inline script.
const { window: w } = dom;
w.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
class IO { observe() {} unobserve() {} disconnect() {} }
w.IntersectionObserver = IO;
// Re-trigger the inline app.js execution by evaluating it directly.
dom.window.eval(appJs);
// Fire DOMContentLoaded since we evaluated after parse.
dom.window.document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));

// Wait for DOMContentLoaded (jsdom fires it synchronously once parsing is done in this mode,
// but the initial applyLang reads localStorage so we should be in steady state already).
await new Promise((resolve) => setTimeout(resolve, 50));

const { window } = dom;
const { document, localStorage } = window;

for (const e of jsdomErrors) r.error(`jsdom runtime error: ${e}`);

// 1. js-on class is set (progressive-enhancement guard from app.js line 6).
if (!document.documentElement.classList.contains('js-on')) {
  r.error('html.js-on class is not set - reveal animations would never trigger');
}

// 2. i18n translated something: pick a stable key and check the resulting innerHTML matches the EN table.
const navMethod = document.querySelector('[data-i18n="nav.method"]');
if (!navMethod) r.error('[data-i18n="nav.method"] not found in markup');
else if (navMethod.innerHTML.trim() !== 'Method') r.error(`nav.method should render "Method", got "${navMethod.innerHTML}"`);

// 3. setLang('pt') flips lang attr + translates + persists.
const ptButton = document.querySelector('.lang button[data-lang="pt"]');
if (!ptButton) r.error('language toggle button [data-lang="pt"] not found');
else {
  ptButton.click();
  await new Promise((resolve) => setTimeout(resolve, 20));
  if (document.documentElement.lang !== 'pt-BR') r.error(`<html lang> should be "pt-BR" after PT toggle, got "${document.documentElement.lang}"`);
  if (localStorage.getItem('marinaLang') !== 'pt') r.error(`localStorage.marinaLang should be "pt", got "${localStorage.getItem('marinaLang')}"`);
  const navMethodPt = document.querySelector('[data-i18n="nav.method"]');
  if (navMethodPt && navMethodPt.innerHTML.trim() !== 'Método') r.error(`nav.method should render "Método" after PT toggle, got "${navMethodPt.innerHTML}"`);
}

// Flip back to EN for the remaining checks.
const enButton = document.querySelector('.lang button[data-lang="en"]');
if (enButton) { enButton.click(); await new Promise((resolve) => setTimeout(resolve, 20)); }

// 4. Diagnostic widget - 5 tiles, click renders #diagResult with a CTA.
const tiles = document.querySelectorAll('.diag__tile');
if (tiles.length !== 5) r.error(`expected 5 diagnostic tiles, got ${tiles.length}`);
const neckTile = document.querySelector('.diag__tile[data-area="neck"]');
const result = document.getElementById('diagResult');
if (!neckTile || !result) {
  r.error('diagnostic widget structure (.diag__tile[data-area="neck"] + #diagResult) is missing');
} else {
  neckTile.click();
  await new Promise((resolve) => setTimeout(resolve, 20));
  if (!result.classList.contains('is-open')) r.error('#diagResult should have class "is-open" after tile click');
  const cta = result.querySelector('a.btn');
  if (!cta) r.error('#diagResult should contain a CTA anchor after tile click');
  else if (!cta.classList.contains('acuity-embed-button')) r.error('non-training diagnostic CTA must carry "acuity-embed-button" class');
}

// 5. FAQ search - typing into the input should hide non-matching .faq__item children.
const faq = document.querySelector('.faq');
const search = faq && faq.querySelector('.faq__search input');
const items = faq ? faq.querySelectorAll('.faq__item') : [];
if (!search) r.warn('no .faq__search input on index.html - FAQ search check skipped');
else if (!items.length) r.error('found .faq__search input but no .faq__item children to filter');
else {
  search.value = 'zzzzz-no-match';
  search.dispatchEvent(new window.Event('input', { bubbles: true }));
  await new Promise((resolve) => setTimeout(resolve, 20));
  const visible = [...items].filter((el) => el.style.display !== 'none').length;
  if (visible !== 0) r.error(`FAQ search with no-match query should hide all items; ${visible} still visible`);
  if (!faq.classList.contains('is-empty')) r.error('FAQ should have class "is-empty" when no items match');
  // Clear and re-check.
  search.value = '';
  search.dispatchEvent(new window.Event('input', { bubbles: true }));
}

console.log(`[smoke-app] exercised i18n round-trip, diagnostic widget, and FAQ search on index.html`);
dom.window.close();
r.done();
