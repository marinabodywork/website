#!/usr/bin/env node
// Flags image files at the repo root that aren't referenced anywhere
// (HTML, CSS, JS, sitemap). The site has accumulated legacy/uploaded
// images over time (CLAUDE.md notes the existing set); this catches
// NEW orphans that creep in - the known set is allow-listed so they
// stay warning-free until someone wants to clean them up.
//
// Refs are matched both raw and URL-decoded, since markup uses %20 etc.

import { readFileSync, readdirSync } from 'node:fs';
import { join, extname } from 'node:path';
import { ROOT, makeReporter, ALL_PAGES } from './lib/parse.mjs';

const r = makeReporter('check-orphan-images');

const IMG_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif', '.ico']);

// Known orphans from CLAUDE.md - intentionally kept on disk for now.
// Anything NOT in this set that ends up unreferenced will fail the check.
const KNOWN_ORPHANS = new Set([
  // Legacy/unreferenced per CLAUDE.md "stack & layout"
  'marina-fingers.webp',
  'marina-pointing.webp',
  'marina-portrait.webp',
  'ogimage.png',
  // Drafts kept on disk but not (yet) wired in
  'atendimento.jpeg',
  'marina-massage-content.webp',
  'hero.webp',
  'Sensory (1).jpeg',
  // Service photos freed up when massage.html moved to the icon-based
  // 5-treatment layout. Kept on disk to re-place per treatment later.
  // (massage.jpeg stays referenced as the massage.html og:image.)
  'facial.jpeg',
  'Sensory (2).jpeg',
  // Home consult-section portrait; the section is now text-only. Kept on disk.
  'marina-consult.webp',
]);

// Patterns matching ad-hoc image uploads (screenshots, exports, drafts).
// CLAUDE.md says to leave these alone.
const EPHEMERAL_PATTERNS = [
  /^Screenshot[ _]/i,
  /^WhatsApp Image\b/i,
  /^Untitled\b/i,
  /^IMG[_-]/i,
];

const decodeAll = (s) => { try { return decodeURIComponent(s); } catch { return s; } };

// ── Collect every image filename referenced from source ────────────────────
const referenced = new Set();
const noteRef = (raw) => {
  if (!raw) return;
  const clean = decodeAll(raw.split(/[?#]/)[0]);
  // Bare filename only (we only care about root-level files).
  const file = clean.includes('/') ? clean.slice(clean.lastIndexOf('/') + 1) : clean;
  if (file) referenced.add(file);
};

const sources = [
  ...ALL_PAGES.map((p) => join(ROOT, p)),
  join(ROOT, 'styles.css'),
  join(ROOT, 'app.js'),
  join(ROOT, 'sitemap.xml'),
  join(ROOT, 'robots.txt'),
  // CLAUDE.md is intentionally excluded - it mentions legacy filenames
  // descriptively (as known orphans), and counting those as "references"
  // would defeat the purpose of the check.
];

for (const path of sources) {
  let body;
  try { body = readFileSync(path, 'utf8'); } catch { continue; }
  // Match any filename-looking token ending in an image extension. Permissive
  // on the leading characters to catch URL-encoded spaces (%20), parens, etc.
  for (const m of body.matchAll(/[A-Za-z0-9_%(). +-]+\.(jpg|jpeg|png|webp|svg|gif|ico)/gi)) {
    noteRef(m[0]);
  }
}

// ── Walk the repo root and find image files ────────────────────────────────
const onDisk = readdirSync(ROOT)
  .filter((f) => IMG_EXTS.has(extname(f).toLowerCase()))
  .sort();

const isEphemeral = (name) => EPHEMERAL_PATTERNS.some((re) => re.test(name));

let orphans = 0;
let knownSkipped = 0;
for (const file of onDisk) {
  if (referenced.has(file)) continue;
  if (isEphemeral(file)) { knownSkipped++; continue; }
  if (KNOWN_ORPHANS.has(file)) { knownSkipped++; continue; }
  // New orphan - error so it gets resolved (either delete it or reference it).
  r.error(`${file}: image file is not referenced anywhere and not on the legacy/ephemeral allow-list`);
  orphans++;
}

// Surface the opposite case too: an allow-listed "known orphan" that turns out
// to be referenced now. Marina probably wants to delete the entry from
// KNOWN_ORPHANS so it doesn't lull us into a false sense of cleanup.
for (const file of KNOWN_ORPHANS) {
  if (referenced.has(file)) {
    r.warn(`${file}: listed as a known orphan but is actually referenced - remove from KNOWN_ORPHANS`);
  }
}

console.log(`[check-orphan-images] scanned ${onDisk.length} image files, ${referenced.size} unique references, ${knownSkipped} allow-listed, ${orphans} new orphan(s)`);
r.done();
