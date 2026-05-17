#!/usr/bin/env node
// Asserts i18n parity:
//  - Every data-i18n / data-i18n-attr key in HTML exists in BOTH i18n.en and i18n.pt.
//  - Every key defined in i18n.en is also defined in i18n.pt (and vice versa).
//  - Reports orphan keys defined in app.js but unused in markup (warning only).

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadI18n, collectMarkupKeys, makeReporter, ALL_PAGES, ROOT } from './lib/parse.mjs';

// Keys can also be referenced dynamically from app.js (e.g. t('diag.' + area + '.name')).
// Treat any key whose literal-prefix appears in a t(...) call OR any literal t('foo') string as used.
function collectAppJsKeys(allKeys) {
  const src = readFileSync(join(ROOT, 'app.js'), 'utf8');
  const used = new Set();
  for (const m of src.matchAll(/\bt\(\s*'([^']+)'\s*\)/g)) used.add(m[1]);
  // Concatenated lookups: t('prefix.' + var + '.suffix'). Capture the literal prefix and suffix and
  // mark any defined key that matches as used.
  const concat = /\bt\(\s*'([^']+)'\s*\+[^)]*?\+\s*'([^']*)'\s*\)/g;
  const patterns = [];
  for (const m of src.matchAll(concat)) patterns.push({ prefix: m[1], suffix: m[2] });
  for (const k of allKeys) {
    for (const { prefix, suffix } of patterns) {
      if (k.startsWith(prefix) && k.endsWith(suffix)) { used.add(k); break; }
    }
  }
  return used;
}

const r = makeReporter('check-i18n');
const i18n = loadI18n();
const en = new Set(Object.keys(i18n.en));
const pt = new Set(Object.keys(i18n.pt));

for (const k of en) if (!pt.has(k)) r.error(`key "${k}" exists in en but not pt`);
for (const k of pt) if (!en.has(k)) r.error(`key "${k}" exists in pt but not en`);

for (const lang of ['en', 'pt']) {
  for (const [k, v] of Object.entries(i18n[lang])) {
    if (typeof v !== 'string' || !v.trim()) r.error(`${lang}["${k}"] is empty or non-string`);
  }
}

const { byPage, all } = collectMarkupKeys(ALL_PAGES);
for (const [page, keys] of Object.entries(byPage)) {
  for (const k of keys) {
    if (!en.has(k)) r.error(`${page}: data-i18n="${k}" — missing in i18n.en`);
    if (!pt.has(k)) r.error(`${page}: data-i18n="${k}" — missing in i18n.pt`);
  }
}

const appJsKeys = collectAppJsKeys(en);
const orphans = [...en].filter((k) => !all.has(k) && !appJsKeys.has(k));
for (const k of orphans) r.warn(`key "${k}" is defined but never referenced from HTML or app.js`);

console.log(`[check-i18n] scanned ${en.size} en keys, ${pt.size} pt keys, ${all.size} keys used across ${ALL_PAGES.length} pages`);
r.done();
