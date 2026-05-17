#!/usr/bin/env node
// sitemap.xml freshness:
//  - Every indexable HTML page is listed.
//  - 404.html is NOT listed (it is noindex).
//  - Every <loc> carries a <lastmod>.
//  - <lastmod> values parse as valid dates.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { makeReporter, INDEXABLE_PAGES, ROOT } from './lib/parse.mjs';

const r = makeReporter('check-sitemap');
const xml = readFileSync(join(ROOT, 'sitemap.xml'), 'utf8');

// Crude parser — sitemap.xml here is hand-written, no namespaces beyond the default.
const urls = [];
for (const m of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
  const block = m[1];
  const loc = (block.match(/<loc>([^<]+)<\/loc>/) || [, ''])[1].trim();
  const lastmod = (block.match(/<lastmod>([^<]+)<\/lastmod>/) || [, ''])[1].trim();
  urls.push({ loc, lastmod });
}

if (!urls.length) r.error('sitemap.xml contains no <url> entries');

for (const { loc, lastmod } of urls) {
  if (!lastmod) r.error(`sitemap.xml: ${loc} is missing <lastmod>`);
  else if (Number.isNaN(Date.parse(lastmod))) r.error(`sitemap.xml: ${loc} has invalid <lastmod> "${lastmod}"`);
  if (loc.endsWith('/404.html') || /\/404\b/.test(loc)) r.error(`sitemap.xml: 404.html should not be listed`);
}

const listed = new Set(urls.map((u) => u.loc.replace(/^https?:\/\/[^/]+/, '').replace(/^\//, '').replace(/^$/, 'index.html')));
for (const page of INDEXABLE_PAGES) {
  // Home appears as "/" → normalized to "index.html"; inner pages as their filename.
  const matchKey = page === 'index.html' ? 'index.html' : page;
  if (!listed.has(matchKey)) r.error(`sitemap.xml: ${page} is missing`);
}

console.log(`[check-sitemap] verified ${urls.length} <url> entries, ${INDEXABLE_PAGES.length} required pages`);
r.done();
