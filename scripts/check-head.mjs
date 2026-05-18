#!/usr/bin/env node
// Required <head> + structural invariants per page (CLAUDE.md §§4, 16, 17).
//  - Pre-paint lang-pending inline script is present (no EN-flash for PT visitors).
//  - Acuity embed CSS + JS are loaded.
//  - app.js is loaded with defer.
//  - The first child of <body> is the skip link to #main, and the first <header> has id="main".
//  - Nav logo preload is present.
//  - On home + about, the hero image is preloaded with fetchpriority="high".
//  - 404.html carries <meta name="robots" content="noindex">.

import { readPage, extractHead, extractBody, makeReporter, ALL_PAGES, INDEXABLE_PAGES } from './lib/parse.mjs';

const r = makeReporter('check-head');

// Pages with a hero image should preload it with fetchpriority="high".
// Don't pin to a specific filename — just assert at least one such preload exists.
const NEEDS_HERO_PRELOAD = new Set(['index.html', 'about.html']);
const HERO_PRELOAD_RE = /<link[^>]*rel="preload"[^>]*as="image"[^>]*fetchpriority="high"[^>]*>/i;

for (const page of ALL_PAGES) {
  const html = readPage(page);
  const head = extractHead(html);
  const body = extractBody(html);

  // Pre-paint language hint
  if (!/localStorage\.getItem\(['"]marinaLang['"]\)/.test(head) || !/lang-pending/.test(head)) {
    r.error(`${page}: missing pre-paint lang-pending script in <head>`);
  }

  // Acuity embed (CSS + JS)
  if (!/embed\.acuityscheduling\.com\/embed\/button\/39322566\.css/.test(head)) {
    r.error(`${page}: missing Acuity embed CSS link in <head>`);
  }
  if (!/embed\.acuityscheduling\.com\/embed\/button\/39322566\.js/.test(head)) {
    r.error(`${page}: missing Acuity embed JS script in <head>`);
  }

  // app.js with defer
  if (!/<script[^>]*src=["']app\.js["'][^>]*defer/i.test(html)) {
    r.error(`${page}: <script src="app.js" defer> not found`);
  }

  // Nav logo preload
  if (!/rel="preload"[^>]*href="marina-logo\.png"/.test(head)) {
    r.error(`${page}: missing nav-logo preload`);
  }

  // Skip link is the first child of <body>
  const firstChild = body.trim().match(/^<(\w+)([^>]*)>/);
  if (!firstChild || firstChild[1].toLowerCase() !== 'a' || !/class="[^"]*skip-link/.test(firstChild[2]) || !/href="#main"/.test(firstChild[2])) {
    r.error(`${page}: first <body> child must be the skip link <a class="skip-link" href="#main">`);
  }

  // First <header> carries id="main" tabindex="-1"
  const firstHeader = body.match(/<header\b[^>]*>/i);
  if (!firstHeader) {
    r.error(`${page}: no <header> element found in <body>`);
  } else {
    if (!/\bid="main"/.test(firstHeader[0])) r.error(`${page}: first <header> is missing id="main"`);
    if (!/\btabindex="-1"/.test(firstHeader[0])) r.error(`${page}: first <header> is missing tabindex="-1"`);
  }

  // Hero preload on home + about
  if (NEEDS_HERO_PRELOAD.has(page) && !HERO_PRELOAD_RE.test(head)) {
    r.error(`${page}: missing LCP image preload (rel="preload" as="image" fetchpriority="high")`);
  }

  // 404.html must be noindex
  if (page === '404.html') {
    if (!/<meta\s+name="robots"\s+content="noindex"/i.test(head)) {
      r.error(`404.html: missing <meta name="robots" content="noindex">`);
    }
  }

  // Indexable pages should NOT be noindex
  if (INDEXABLE_PAGES.includes(page)) {
    if (/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(head)) {
      r.error(`${page}: should not be noindex (it is in the indexable page set)`);
    }
  }
}

console.log(`[check-head] validated head + structural invariants on ${ALL_PAGES.length} pages`);
r.done();
