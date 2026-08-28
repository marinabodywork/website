#!/usr/bin/env node
// Pricing invariants (CLAUDE.md §3):
//   1. "Cabalistic" headline prices - every charged total's digits sum to 8.
//   2. Each headline price appears in the i18n table and the expected page(s).
//   3. Marina-set exceptions (89 / 178 / 428 / 712 / 1780) are intentional and
//      deliberately NOT required to sum to 8.
//   4. Smart Training and massage-membership plan totals derive cleanly from
//      their per-session rate × session count.

import { readPage, loadI18n, makeReporter } from './lib/parse.mjs';

const r = makeReporter('check-pricing');

const digitsum = (n) => String(n).replace(/\D/g, '').split('').reduce((a, c) => a + Number(c), 0);

// Headline (charged) prices. Every one MUST be cabalistic.
// Each entry says where the price token must appear in the EN markup or i18n table.
const HEADLINE_PRICES = [
  { price: 125,  label: 'Massage single session + Smart Training single session', mustAppearIn: ['massage.html', 'index.html', 'training.html', 'method.html'] },
  { price: 107,  label: 'Emerald per-session (bodywork + Smart Training)',        mustAppearIn: ['massage.html', 'training.html'] },
  { price: 224,  label: 'KSE Sensory Energetics',                                 mustAppearIn: ['massage.html', 'method.html'] },
  { price: 1070, label: 'Emerald bodywork membership total (10 sessions)',        mustAppearIn: ['massage.html'] },
];

// Intentional exceptions to the cabalistic rule, kept at Marina's request. These
// come straight from Marina's membership cards and are deliberately NOT in
// HEADLINE_PRICES, so the cabalistic assertion does not flag them:
//   - Bodywork Diamond pack:  A$89/session · A$178/week · A$1,780 total
//   - Smart Training Emerald: A$107/session · A$428 every 4 weeks
//   - Smart Training Diamond: A$89/session  · A$712 every 4 weeks
// Do not "fix" these figures without confirming with Marina first.

// Derived totals from a per-session rate × N sessions. NOT required to sum to 8 -
// we only verify they are mathematically consistent and surfaced on the page.
const DERIVED_TOTALS = [
  { price: 428,  label: 'Smart Training Emerald 4-week cycle (A$107 × 4)', rate: 107, count: 4,  mustAppearIn: ['training.html'] },
  { price: 712,  label: 'Smart Training Diamond 4-week cycle (A$89 × 8)',  rate: 89,  count: 8,  mustAppearIn: ['training.html'] },
  { price: 1070, label: 'Bodywork Emerald total (A$107 × 10)',            rate: 107, count: 10, mustAppearIn: ['massage.html'] },
  { price: 1780, label: 'Bodywork Diamond total (A$89 × 20)',             rate: 89,  count: 20, mustAppearIn: ['massage.html'] },
];

// ── 1. Cabalistic invariant on every headline price ─────────────────────────
for (const { price, label } of HEADLINE_PRICES) {
  const s = digitsum(price);
  if (s !== 8) r.error(`headline price A$${price} (${label}) digit-sum is ${s}, not 8 - violates cabalistic rule (CLAUDE.md §3)`);
}

// ── 2. Price coherence: each headline appears in i18n + every documented page ──
const i18n = loadI18n();
const enValues = Object.values(i18n.en).join('\n');
const ptValues = Object.values(i18n.pt).join('\n');

// Match raw integer with optional thousands separator. Handle both EN ("A$1,070")
// and PT ("A$1.070") formats by normalizing punctuation out before comparing.
const normalize = (s) => s.replace(/[.,]/g, '').replace(/\s+/g, '');
const haystack = (text, price) => normalize(text).includes('A$' + price);

for (const { price, label, mustAppearIn } of [...HEADLINE_PRICES, ...DERIVED_TOTALS]) {
  if (!haystack(enValues, price)) r.error(`A$${price} (${label}) not found in i18n.en values`);
  if (!haystack(ptValues, price)) r.error(`A$${price} (${label}) not found in i18n.pt values`);
  for (const page of mustAppearIn) {
    const html = readPage(page);
    if (!haystack(html, price)) r.error(`${page}: expected to contain A$${price} (${label})`);
  }
}

// ── 3. Derived totals equal rate × count ────────────────────────────────────
for (const { price, label, rate, count } of DERIVED_TOTALS) {
  if (rate * count !== price) {
    r.error(`derived total A$${price} (${label}) does not equal A$${rate} × ${count} = A$${rate * count}`);
  }
}

console.log(`[check-pricing] verified ${HEADLINE_PRICES.length} headline + ${DERIVED_TOTALS.length} derived prices`);
r.done();
