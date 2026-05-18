#!/usr/bin/env node
// Internal-link & anchor integrity:
//  - Every internal href ("page.html", "#id", "page.html#id") resolves to a file that exists
//    and (if present) an id that exists on that page.
//  - Every anchor inside a single page resolves to an id on that page.

import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { readPage, extractAnchors, extractIds, makeReporter, ALL_PAGES, ROOT } from './lib/parse.mjs';

const r = makeReporter('check-links');

const idsByPage = {};
for (const page of ALL_PAGES) idsByPage[page] = extractIds(readPage(page));

let totalChecked = 0;
for (const page of ALL_PAGES) {
  const html = readPage(page);
  const anchors = extractAnchors(html);
  for (const { href } of anchors) {
    if (!href) continue;
    if (/^(https?:|mailto:|tel:|javascript:)/i.test(href)) continue;
    totalChecked++;

    if (href.startsWith('#')) {
      const id = href.slice(1);
      if (id && !idsByPage[page].has(id)) r.error(`${page}: in-page anchor #${id} has no matching id`);
      continue;
    }

    // page.html or page.html#id or a static asset
    const [filePart, fragment] = href.split('#');
    const targetPath = join(ROOT, filePart);
    if (!existsSync(targetPath)) {
      r.error(`${page}: href="${href}" - file ${filePart} does not exist`);
      continue;
    }
    if (fragment && filePart.endsWith('.html')) {
      const targetIds = idsByPage[filePart];
      if (!targetIds) {
        r.warn(`${page}: href="${href}" - page exists but not in known set, skipping anchor check`);
      } else if (!targetIds.has(fragment)) {
        r.error(`${page}: href="${href}" - ${filePart} has no id "${fragment}"`);
      }
    }
  }
}

console.log(`[check-links] checked ${totalChecked} internal anchors across ${ALL_PAGES.length} pages`);
r.done();
