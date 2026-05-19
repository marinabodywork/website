#!/usr/bin/env node
// Lightweight styles.css sanity checks (replaces pulling in stylelint for one
// file). Focused on the categories that have actually bitten this codebase:
//  - Every var(--foo) reference resolves to a custom property declared somewhere
//    in styles.css (typos like --sand-deeep silently fall back to inherit).
//  - No duplicate :root --custom-property declarations (last-wins, surprising).
//  - No empty rule blocks (left-over selectors after refactors).

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, makeReporter } from './lib/parse.mjs';

const r = makeReporter('check-css');
const css = readFileSync(join(ROOT, 'styles.css'), 'utf8');

// Strip /* ... */ comments before scanning so commented-out vars don't count.
const cleaned = css.replace(/\/\*[\s\S]*?\*\//g, '');

// ── Collect every custom-property declaration: lines like "--foo: value;" ────
// Capture name + count to detect duplicates within a single :root.
const declared = new Map(); // name -> count
for (const m of cleaned.matchAll(/(^|[{;\s])(--[a-zA-Z0-9_-]+)\s*:/g)) {
  const name = m[2];
  declared.set(name, (declared.get(name) || 0) + 1);
}

// ── Every var(--foo) must be declared ───────────────────────────────────────
const used = new Set();
for (const m of cleaned.matchAll(/var\(\s*(--[a-zA-Z0-9_-]+)/g)) {
  used.add(m[1]);
}
for (const name of used) {
  if (!declared.has(name)) {
    r.error(`var(${name}) is used but never declared - typo or missing :root entry`);
  }
}

// ── :root custom-property duplicates ────────────────────────────────────────
// Pull every `--foo: …;` inside a :root { … } block specifically.
const rootBlocks = [...cleaned.matchAll(/:root\s*\{([\s\S]*?)\}/g)];
const rootDecls = new Map(); // name -> count across all :root blocks
for (const block of rootBlocks) {
  for (const d of block[1].matchAll(/(?:^|;|\n)\s*(--[a-zA-Z0-9_-]+)\s*:/g)) {
    const name = d[1];
    rootDecls.set(name, (rootDecls.get(name) || 0) + 1);
  }
}
for (const [name, n] of rootDecls) {
  if (n > 1) r.warn(`:root declares ${name} ${n} times (last-wins, may surprise)`);
}

// ── Empty rule blocks: selector { } ─────────────────────────────────────────
// Allow whitespace inside, but not declarations.
for (const m of cleaned.matchAll(/([^{}@]+?)\{\s*\}/g)) {
  const selector = m[1].trim().replace(/\s+/g, ' ');
  if (!selector || selector.startsWith('@')) continue;
  // Skip very short fragment matches that are just keyframes anchors etc.
  if (selector.length > 200) continue;
  r.warn(`empty rule block: ${selector} { }`);
}

console.log(`[check-css] scanned ${declared.size} custom-prop declarations, ${used.size} var() references`);
r.done();
