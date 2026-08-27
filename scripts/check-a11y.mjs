#!/usr/bin/env node
// Accessibility invariants from CLAUDE.md §16:
//  - Heading hierarchy: no level skips per page (e.g. h2 directly under h1, never h1→h3).
//  - Exactly one <h1> per page.
//  - The nav link for the current page carries aria-current="page" and class="is-active".
//  - The other nav links DO NOT carry aria-current="page".
//  - The lang toggle ships with aria-pressed reflecting active state (default EN active).

import { readPage, extractBody, makeReporter, ALL_PAGES, INDEXABLE_PAGES } from './lib/parse.mjs';

const r = makeReporter('check-a11y');

// Map each indexable page to the data-i18n key its nav link should carry.
// (Home doesn't have a nav link to itself - users get back to home via the logo.)
const NAV_KEY_FOR_PAGE = {
  'massage.html':    'nav.massage',
  'membership.html': 'nav.membership',
  'training.html':   'nav.training',
  'method.html':     'nav.method',
  'about.html':      'nav.about',
};

for (const page of ALL_PAGES) {
  const html = readPage(page);
  const body = extractBody(html);

  // ── Heading hierarchy ──────────────────────────────────────────────────────
  // Collect h1..h6 in document order. Skip headings inside <script> just in case.
  const headings = [];
  const stripped = body.replace(/<script\b[\s\S]*?<\/script>/gi, '');
  for (const m of stripped.matchAll(/<h([1-6])\b/gi)) {
    headings.push(Number(m[1]));
  }
  const h1Count = headings.filter((n) => n === 1).length;
  if (h1Count === 0) r.error(`${page}: no <h1> found`);
  if (h1Count > 1) r.error(`${page}: ${h1Count} <h1> elements (should be exactly 1)`);

  let lastLevel = 0;
  for (let i = 0; i < headings.length; i++) {
    const level = headings[i];
    if (lastLevel === 0) {
      if (level !== 1) r.error(`${page}: first heading is <h${level}> (should start at <h1>)`);
    } else if (level > lastLevel + 1) {
      r.error(`${page}: heading hierarchy jumps from <h${lastLevel}> to <h${level}> at heading #${i + 1} (no level skips allowed)`);
    }
    lastLevel = level;
  }

  // ── aria-current="page" on nav link for the current page ───────────────────
  // Find every nav anchor and check who carries aria-current="page".
  const navMatch = body.match(/<nav\b[^>]*class="nav"[\s\S]*?<\/nav>/i);
  if (!navMatch) {
    r.error(`${page}: no <nav class="nav"> block found`);
  } else {
    const navHtml = navMatch[0];
    const navLinks = [...navHtml.matchAll(/<a\b([^>]*)>/gi)].map((m) => m[1]);
    const expectedKey = NAV_KEY_FOR_PAGE[page]; // undefined for index.html + 404.html
    const ariaCurrentLinks = navLinks.filter((attrs) => /\baria-current\s*=\s*"page"/i.test(attrs));

    if (expectedKey) {
      // Exactly one link should be aria-current=page, and it must match our page's key.
      if (ariaCurrentLinks.length === 0) {
        r.error(`${page}: no nav link carries aria-current="page" (expected the "${expectedKey}" link)`);
      } else if (ariaCurrentLinks.length > 1) {
        r.error(`${page}: ${ariaCurrentLinks.length} nav links carry aria-current="page" (should be exactly 1)`);
      } else {
        const attrs = ariaCurrentLinks[0];
        if (!new RegExp(`data-i18n\\s*=\\s*"${expectedKey}"`).test(attrs)) {
          r.error(`${page}: aria-current="page" is on the wrong nav link (expected data-i18n="${expectedKey}")`);
        }
        if (!/\bclass="[^"]*\bis-active\b/.test(attrs)) {
          r.error(`${page}: nav link with aria-current="page" should also carry class="is-active"`);
        }
      }
    } else {
      // index.html + 404.html: no nav link should carry aria-current.
      // (Home has no self-link in the inner-page nav; 404 is noindex.)
      if (ariaCurrentLinks.length > 0) {
        r.error(`${page}: should not carry aria-current="page" on any nav link (no inner-page self-reference)`);
      }
    }
  }

  // ── Lang toggle aria-pressed defaults ──────────────────────────────────────
  const langMatch = body.match(/<div\b[^>]*class="lang"[^>]*>([\s\S]*?)<\/div>/i);
  if (!langMatch) {
    r.error(`${page}: no .lang toggle block found`);
  } else {
    const langHtml = langMatch[1];
    const enButton = langHtml.match(/<button\b[^>]*data-lang="en"[^>]*>/i);
    const ptButton = langHtml.match(/<button\b[^>]*data-lang="pt"[^>]*>/i);
    if (!enButton) r.error(`${page}: lang toggle missing [data-lang="en"] button`);
    else if (!/aria-pressed="true"/.test(enButton[0])) r.error(`${page}: EN lang button must default aria-pressed="true"`);
    if (!ptButton) r.error(`${page}: lang toggle missing [data-lang="pt"] button`);
    else if (!/aria-pressed="false"/.test(ptButton[0])) r.error(`${page}: PT lang button must default aria-pressed="false"`);
  }
}

console.log(`[check-a11y] validated heading hierarchy + nav aria-current + lang aria-pressed on ${ALL_PAGES.length} pages`);
r.done();
