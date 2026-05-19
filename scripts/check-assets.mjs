#!/usr/bin/env node
// Asset integrity (CLAUDE.md §§16, 17):
//  - Every <img src=…>, <source src(set)?=…>, and <link rel=preload as=image href=…>
//    points to a file that actually exists on disk.
//  - Every content <img> has an alt attribute (may be empty for decorative; we just
//    require the attribute to be present so screen readers don't fall back to the path).
//  - Every <link rel=preload as=image href=X> matches an <img> or <source> that
//    references X on the same page - otherwise the preload is wasted bandwidth.
//  - Per-page HTML byte budget (catches accidental binary blobs pasted in markup).

import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { readPage, makeReporter, ALL_PAGES, ROOT } from './lib/parse.mjs';

const r = makeReporter('check-assets');

// 60KB is comfortable headroom over today's largest page (index.html, ~44KB).
const HTML_BUDGET_BYTES = 60 * 1024;

const decodeHref = (s) => {
  try { return decodeURIComponent(s); } catch { return s; }
};

const isExternal = (href) => /^(https?:|data:|mailto:|tel:|#)/i.test(href);

const fileExists = (relPath) => {
  // Strip any query/fragment, then check on-disk presence.
  const clean = decodeHref(relPath).split(/[?#]/)[0];
  if (!clean) return false;
  return existsSync(join(ROOT, clean));
};

let totalImgs = 0;
let totalSources = 0;
let totalPreloads = 0;

for (const page of ALL_PAGES) {
  const html = readPage(page);

  // ── <img> tags: src exists + alt attribute present ────────────────────────
  for (const m of html.matchAll(/<img\b([^>]*)>/gi)) {
    const attrs = m[1];
    const src = (attrs.match(/\bsrc\s*=\s*"([^"]+)"/) || [])[1];
    const hasAlt = /\balt\s*=\s*"/.test(attrs);
    if (!src) { r.error(`${page}: <img> with no src attribute`); continue; }
    totalImgs++;
    if (!hasAlt) r.error(`${page}: <img src="${src}"> is missing alt attribute`);
    if (!isExternal(src) && !fileExists(src)) {
      r.error(`${page}: <img src="${src}"> - file does not exist on disk`);
    }
  }

  // ── <source src=…> and <source srcset=…> ──────────────────────────────────
  for (const m of html.matchAll(/<source\b([^>]*)>/gi)) {
    const attrs = m[1];
    const src = (attrs.match(/\bsrc\s*=\s*"([^"]+)"/) || [])[1];
    const srcset = (attrs.match(/\bsrcset\s*=\s*"([^"]+)"/) || [])[1];
    totalSources++;
    if (src && !isExternal(src) && !fileExists(src)) {
      r.error(`${page}: <source src="${src}"> - file does not exist`);
    }
    if (srcset) {
      // srcset is a comma-separated list of "url [width]" pairs.
      for (const entry of srcset.split(',')) {
        const url = entry.trim().split(/\s+/)[0];
        if (url && !isExternal(url) && !fileExists(url)) {
          r.error(`${page}: <source srcset> entry "${url}" - file does not exist`);
        }
      }
    }
  }

  // ── <link rel=preload as=image>: file exists + a same-page <img> references it ──
  // Collect all referenced img/source hrefs first so we can validate preload targets.
  const referenced = new Set();
  for (const m of html.matchAll(/<(img|source)\b([^>]*)>/gi)) {
    const attrs = m[2];
    const src = (attrs.match(/\bsrc\s*=\s*"([^"]+)"/) || [])[1];
    const srcset = (attrs.match(/\bsrcset\s*=\s*"([^"]+)"/) || [])[1];
    if (src) referenced.add(decodeHref(src.split(/[?#]/)[0]));
    if (srcset) {
      for (const entry of srcset.split(',')) {
        const url = entry.trim().split(/\s+/)[0];
        if (url) referenced.add(decodeHref(url.split(/[?#]/)[0]));
      }
    }
  }

  for (const m of html.matchAll(/<link\b([^>]*)>/gi)) {
    const attrs = m[1];
    if (!/\brel\s*=\s*"preload"/i.test(attrs)) continue;
    if (!/\bas\s*=\s*"image"/i.test(attrs)) continue;
    const href = (attrs.match(/\bhref\s*=\s*"([^"]+)"/) || [])[1];
    if (!href) { r.error(`${page}: <link rel=preload as=image> without href`); continue; }
    totalPreloads++;
    if (!isExternal(href) && !fileExists(href)) {
      r.error(`${page}: preload "${href}" - file does not exist`);
    }
    // Preload target should be referenced in the page (otherwise the byte cost is wasted).
    const clean = decodeHref(href.split(/[?#]/)[0]);
    if (!isExternal(href) && !referenced.has(clean)) {
      r.error(`${page}: preload "${href}" is not referenced by any <img>/<source> on this page (wasted bytes)`);
    }
  }

  // ── HTML byte budget ──────────────────────────────────────────────────────
  const bytes = statSync(join(ROOT, page)).size;
  if (bytes > HTML_BUDGET_BYTES) {
    r.error(`${page}: ${(bytes / 1024).toFixed(1)} KB exceeds budget of ${HTML_BUDGET_BYTES / 1024} KB`);
  } else if (bytes > HTML_BUDGET_BYTES * 0.9) {
    r.warn(`${page}: ${(bytes / 1024).toFixed(1)} KB is within 10% of budget (${HTML_BUDGET_BYTES / 1024} KB)`);
  }
}

console.log(`[check-assets] inspected ${totalImgs} <img>, ${totalSources} <source>, ${totalPreloads} preloads across ${ALL_PAGES.length} pages`);
r.done();
