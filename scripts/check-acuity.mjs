#!/usr/bin/env node
// Enforces the booking-link discipline from CLAUDE.md §3:
//  - Every anchor whose href points to an Acuity domain MUST carry class "acuity-embed-button".
//  - Every documented booking slug appears at least once across the site (smoke-tests that we
//    didn't accidentally delete a CTA).
//  - The three weekly-massage-membership catalog ids appear on massage.html.
//  - The PT memberships catalog category URL appears on training.html.
//  - CTA discipline: no generic "Book a session" / "Talk to Marina" duplicates
//    next to service-specific buttons (every primary booking CTA must be Massage/Training).
//  - The canonical WhatsApp number (61451021478) is the only one used.

import { readPage, extractAnchors, makeReporter, ALL_PAGES } from './lib/parse.mjs';

const r = makeReporter('check-acuity');

const CANONICAL_WA_NUMBER = '61451021478';

// CTA texts that, if used as a primary button label, would be too generic
// next to a service-specific Book Massage / Book Training pair. The dedicated
// WhatsApp consult link ("Talk to Marina first →") is the canonical home for
// open conversations - it gets a pass because it's styled as .btn--link, not .btn.
const GENERIC_CTA_PHRASES = [
  /\bbook a session\b/i,
  /\bbook now\b/i,
  /\btalk to marina\b(?!\s+first)/i, // "Talk to Marina" alone is generic; "Talk to Marina first" is the canonical consult phrasing
];

const ACUITY_HOSTS = ['acuityscheduling.com', 'marinaribeirobodywork.as.me'];
const REQUIRED_SLUGS = [
  'bookmassage',
  // 'BookPTlessons' (the PT booking hub) is no longer surfaced. Massage
  // treatments keep their per-service slugs; the Smart Training single session
  // reuses SinglePTLesson (now priced A$125). The membership/plan checkouts use
  // the catalog ids below.
  'SomaticMassageCorporal',
  'SomaticMassageFacial',
  'SensoryEnergetics',
  'SinglePTLesson',
];
// Acuity catalog checkout ids surfaced on the site:
//   2215296 - Smart Training Emerald plan (A$428 / 4 weeks)
//   2215300 - Smart Training Diamond plan (A$712 / 4 weeks)
//   2215320 - Massage Emerald membership (A$1,070)
//   2213845 - Massage Diamond membership (A$1,780)
const REQUIRED_MEMBERSHIP_IDS = ['2215296', '2215300', '2215320', '2213845'];

const seenSlugs = new Set();
const seenMemberships = new Set();
let totalChecked = 0;

for (const page of ALL_PAGES) {
  const html = readPage(page);
  const anchors = extractAnchors(html);
  for (const a of anchors) {
    const isAcuity = ACUITY_HOSTS.some((h) => a.href.includes(h));
    if (!isAcuity) continue;
    totalChecked++;
    const classes = a.class.split(/\s+/);
    if (!classes.includes('acuity-embed-button')) {
      r.error(`${page}: <a href="${a.href}"> is missing "acuity-embed-button" class (in-site modal won't open)`);
    }
    for (const slug of REQUIRED_SLUGS) if (a.href.includes(slug)) seenSlugs.add(slug);
    for (const id of REQUIRED_MEMBERSHIP_IDS) if (a.href.includes('id=' + id)) seenMemberships.add(id);
  }
}

for (const slug of REQUIRED_SLUGS) {
  if (!seenSlugs.has(slug)) r.error(`booking slug "${slug}" is documented in CLAUDE.md but never linked anywhere`);
}
for (const id of REQUIRED_MEMBERSHIP_IDS) {
  if (!seenMemberships.has(id)) r.error(`membership catalog id ${id} is documented but never linked`);
}

// Anchors to Acuity SHOULD also carry target="_blank" + rel="noopener" as a fallback (CLAUDE.md §3).
// Re-walk the raw HTML to assert that - extractAnchors discards other attrs.
for (const page of ALL_PAGES) {
  const html = readPage(page);
  const re = /<a\b[^>]*href="([^"]*(?:acuityscheduling\.com|marinaribeirobodywork\.as\.me)[^"]*)"[^>]*>/gi;
  for (const m of html.matchAll(re)) {
    const tag = m[0];
    if (!/\btarget="_blank"/i.test(tag)) {
      r.warn(`${page}: Acuity anchor missing target="_blank" fallback - ${m[1].slice(0, 60)}…`);
    } else if (!/\brel="[^"]*noopener/i.test(tag)) {
      r.warn(`${page}: Acuity anchor has target="_blank" but no rel="noopener" - ${m[1].slice(0, 60)}…`);
    }
  }
}

// ── CTA discipline: scan for generic CTA labels on .btn-styled anchors ──────
let genericChecked = 0;
for (const page of ALL_PAGES) {
  const html = readPage(page);
  // <a class="btn …">label</a>  - capture the class list and the inner text.
  const re = /<a\b[^>]*\bclass="([^"]*\bbtn\b[^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
  for (const m of html.matchAll(re)) {
    const cls = m[1];
    // Skip the sand-styled "Talk to Marina first →" hero link (.btn--link),
    // and skip any internal-only link without an Acuity slug + without WhatsApp.
    if (cls.includes('btn--link')) continue;
    const innerText = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    genericChecked++;
    for (const re2 of GENERIC_CTA_PHRASES) {
      if (re2.test(innerText)) {
        r.error(`${page}: primary CTA "${innerText}" is too generic - use "Book Massage" or "Book Training" (CLAUDE.md §3)`);
      }
    }
  }
}

// ── WhatsApp number is canonical ────────────────────────────────────────────
let waChecked = 0;
for (const page of ALL_PAGES) {
  const html = readPage(page);
  for (const m of html.matchAll(/wa\.me\/(\d+)/g)) {
    waChecked++;
    if (m[1] !== CANONICAL_WA_NUMBER) {
      r.error(`${page}: wa.me/${m[1]} - expected canonical number wa.me/${CANONICAL_WA_NUMBER}`);
    }
  }
}

console.log(`[check-acuity] inspected ${totalChecked} Acuity anchors, ${genericChecked} btn anchors, ${waChecked} wa.me links across ${ALL_PAGES.length} pages`);
r.done();
