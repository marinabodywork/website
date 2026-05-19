#!/usr/bin/env node
// Run every check sequentially and exit non-zero if any failed.
// Order is roughly cheapest-first so failures surface fast.

import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));

const CHECKS = [
  'check-i18n.mjs',
  'check-links.mjs',
  'check-head.mjs',
  'check-sitemap.mjs',
  'check-acuity.mjs',
  'check-jsonld.mjs',
  'check-pricing.mjs',
  'check-a11y.mjs',
  'check-assets.mjs',
  'check-css.mjs',
  'smoke-app.mjs',
];

let failed = 0;
for (const script of CHECKS) {
  console.log(`\n- ${script} -`);
  const res = spawnSync(process.execPath, [join(HERE, script)], { stdio: 'inherit' });
  if (res.status !== 0) failed++;
}

if (failed) {
  console.log(`\nrun-all: ${failed} check(s) failed`);
  process.exit(1);
}
console.log('\nrun-all: all checks passed');
