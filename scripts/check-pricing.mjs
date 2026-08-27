#!/usr/bin/env node
// Pricing invariants (CLAUDE.md §3):
//   1. "Cabalistic" headline prices - every charged total's digits sum to 8.
//   2. Each headline price appears in the i18n table and the expected page(s).
//   3. PT per-session display rates (Basic A$101, Golden A$88.75, Diamond A$83.92)
//      are consistent with the monthly totals and session counts.
//   4. Sensory Energetics carries BOTH launch (A$224) and regular (A$305) prices
//      on massage.html (and the launch badge), since CLAUDE.md §8 mandates the
//      double-display during the launch window.
//   5. PT membership minimums (2/2/3 months) and freeze entitlements (1/2/3 weeks)
//      appear in the EN + PT policy copy.

import { readPage, loadI18n, makeReporter } from './lib/parse.mjs';

const r = makeReporter('check-pricing');

const digitsum = (n) => String(n).replace(/\D/g, '').split('').reduce((a, c) => a + Number(c), 0);

// Headline (charged) prices. Every one MUST be cabalistic.
// Each entry says where the price token must appear in the EN markup or i18n table.
const HEADLINE_PRICES = [
  { price: 125,  label: 'Somatic massage (Corporal + Facial)', mustAppearIn: ['massage.html', 'index.html', 'method.html'] },
  { price: 116,  label: 'Single PT session',                   mustAppearIn: ['training.html', 'index.html'] },
  { price: 107,  label: 'A$107 (assessment, MFIT, consult, weekly catalog)', mustAppearIn: ['training.html', 'massage.html'] },
  { price: 224,  label: 'Sensory Energetics launch price',     mustAppearIn: ['massage.html', 'method.html'] },
  { price: 305,  label: 'Sensory Energetics regular price',    mustAppearIn: ['massage.html'] },
  { price: 404,  label: 'Basic PT membership / month',         mustAppearIn: ['training.html', 'index.html'] },
  { price: 710,  label: 'Golden PT membership / month',        mustAppearIn: ['training.html'] },
  { price: 1007, label: 'Diamond PT membership / month',       mustAppearIn: ['training.html'] },
  { price: 1070, label: 'Emerald bodywork membership (10 sessions, upfront)', mustAppearIn: ['massage.html'] },
];

// Intentional exception to the cabalistic rule, kept at Marina's request:
// the Diamond prepaid bodywork pack is priced A$1,960 upfront (A$98/session),
// which does NOT sum to 8. It is deliberately NOT in HEADLINE_PRICES so the
// cabalistic assertion does not flag it. Do not "fix" this price without
// confirming with Marina first.

// Derived totals from a cabalistic per-unit rate × N. NOT required to sum to 8 -
// the cabalistic rule applies to the per-unit headline price, not the multiplier.
// We still verify these are mathematically consistent and surfaced.
const DERIVED_TOTALS = [
  { price: 428, label: 'Ultimate 4-week cycle (A$107/week × 4)', mustAppearIn: ['massage.html'] },
];

// Derived per-session display rates - NOT required to sum to 8.
// We verify they are mathematically consistent with the monthly totals.
const PT_PLANS = [
  { name: 'Basic',   monthly: 404,  sessions: 4,  perSessionDisplay: 101 },
  { name: 'Golden',  monthly: 710,  sessions: 8,  perSessionDisplay: 88.75 },
  { name: 'Diamond', monthly: 1007, sessions: 12, perSessionDisplay: 83.92 },
];

// PT membership terms (CLAUDE.md §9). Must appear in EN + PT policy copy.
const POLICY_TERMS = [
  { token: '2-month minimum',  altPt: ['mínimo de 2 meses', '2 meses'], why: 'Basic + Golden minimum commitment' },
  { token: '3-month minimum',  altPt: ['mínimo de 3 meses', '3 meses'], why: 'Diamond minimum commitment' },
  { token: '7 days',           altPt: ['7 dias'],                       why: 'pre-renewal cancellation window' },
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

// Match raw integer with optional thousands separator. Handle both EN ("A$1,007")
// and PT ("A$1.007") formats by normalizing punctuation out before comparing.
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

// ── 3. PT per-session display rates derive from monthly totals ──────────────
for (const { name, monthly, sessions, perSessionDisplay } of PT_PLANS) {
  const computed = monthly / sessions;
  const tolerance = 0.01;
  if (Math.abs(computed - perSessionDisplay) > tolerance) {
    r.error(`PT ${name}: monthly A$${monthly} ÷ ${sessions} sessions = A$${computed.toFixed(4)} but display rate is A$${perSessionDisplay}`);
  }
  // The display rate token must also appear in EN i18n / markup somewhere.
  // PT uses comma as decimal separator (A$88,75) - check both formats.
  const enToken = 'A$' + perSessionDisplay;
  const ptToken = 'A$' + String(perSessionDisplay).replace('.', ',');
  if (!enValues.includes(enToken)) r.error(`PT ${name}: per-session display "${enToken}" not found in i18n.en`);
  if (!ptValues.includes(ptToken) && !ptValues.includes(enToken)) {
    r.error(`PT ${name}: per-session display ("${enToken}" or "${ptToken}") not found in i18n.pt`);
  }
}

// ── 4. Sensory launch double-display on massage.html ────────────────────────
const massageHtml = readPage('massage.html');
if (!/A\$224/.test(massageHtml)) r.error('massage.html: missing Sensory launch price A$224');
if (!/A\$305/.test(massageHtml)) r.error('massage.html: missing Sensory regular price A$305 (must coexist with launch price during promo)');
if (!/service-block__badge--launch/.test(massageHtml)) r.error('massage.html: missing .service-block__badge--launch (Launch price badge)');
if (!/pricing__note--launch/.test(massageHtml)) r.error('massage.html: missing .pricing__note--launch (the "Returns to A$305" note)');

// ── 5. PT membership terms appear in EN + PT policy copy ────────────────────
const trainingHtml = readPage('training.html');
for (const { token, altPt, why } of POLICY_TERMS) {
  if (!trainingHtml.includes(token) && !enValues.includes(token)) {
    r.error(`training.html / i18n.en: missing "${token}" (${why})`);
  }
  const hasPt = altPt.some((alt) => ptValues.includes(alt)) || ptValues.includes(token);
  if (!hasPt) r.error(`i18n.pt: missing PT translation of "${token}" (${why})`);
}

// Freeze entitlements: 1/2/3 weeks for Basic/Golden/Diamond (CLAUDE.md §9).
// Assert the EN i18n table mentions each.
for (const phrase of ['1 week', '2 weeks', '3 weeks']) {
  if (!enValues.includes(phrase)) r.error(`i18n.en: missing "${phrase}" (PT plan freeze entitlement)`);
}
for (const phrase of ['1 semana', '2 semanas', '3 semanas']) {
  if (!ptValues.includes(phrase)) r.error(`i18n.pt: missing "${phrase}" (PT plan freeze entitlement)`);
}

console.log(`[check-pricing] verified ${HEADLINE_PRICES.length} headline + ${DERIVED_TOTALS.length} derived prices, ${PT_PLANS.length} PT plan rates, ${POLICY_TERMS.length} policy terms`);
r.done();
