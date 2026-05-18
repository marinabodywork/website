#!/usr/bin/env node
// Enforces the booking-link discipline from CLAUDE.md §3:
//  - Every anchor whose href points to an Acuity domain MUST carry class "acuity-embed-button".
//  - Every documented booking slug appears at least once across the site (smoke-tests that we
//    didn't accidentally delete a CTA).
//  - The three weekly-massage-membership catalog ids appear on massage.html.
//  - The PT memberships catalog category URL appears on training.html.

import { readPage, extractAnchors, makeReporter, ALL_PAGES } from './lib/parse.mjs';

const r = makeReporter('check-acuity');

const ACUITY_HOSTS = ['acuityscheduling.com', 'marinaribeirobodywork.as.me'];
const REQUIRED_SLUGS = [
  'bookmassage',
  'BookPTlessons',
  'SomaticMassageCorporal',
  'SomaticMassageFacial',
  'SensoryEnergetics',
  'SinglePTLesson',
  'Assessment',
];
const REQUIRED_MEMBERSHIP_IDS = ['2213824', '2213848', '2213845'];
const PT_MEMBERSHIPS_CATEGORY = 'category=Personal+Training+-+Memberships';

const seenSlugs = new Set();
const seenMemberships = new Set();
let seenPtCategory = false;
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
    if (a.href.includes(PT_MEMBERSHIPS_CATEGORY)) seenPtCategory = true;
  }
}

for (const slug of REQUIRED_SLUGS) {
  if (!seenSlugs.has(slug)) r.error(`booking slug "${slug}" is documented in CLAUDE.md but never linked anywhere`);
}
for (const id of REQUIRED_MEMBERSHIP_IDS) {
  if (!seenMemberships.has(id)) r.error(`membership catalog id ${id} is documented but never linked`);
}
if (!seenPtCategory) r.error(`PT memberships catalog URL (${PT_MEMBERSHIPS_CATEGORY}) is never linked`);

// Anchors to Acuity SHOULD also carry target="_blank" + rel="noopener" as a fallback (CLAUDE.md §3).
// Re-walk the raw HTML to assert that — extractAnchors discards other attrs.
for (const page of ALL_PAGES) {
  const html = readPage(page);
  const re = /<a\b[^>]*href="([^"]*(?:acuityscheduling\.com|marinaribeirobodywork\.as\.me)[^"]*)"[^>]*>/gi;
  for (const m of html.matchAll(re)) {
    const tag = m[0];
    if (!/\btarget="_blank"/i.test(tag)) {
      r.warn(`${page}: Acuity anchor missing target="_blank" fallback — ${m[1].slice(0, 60)}…`);
    } else if (!/\brel="[^"]*noopener/i.test(tag)) {
      r.warn(`${page}: Acuity anchor has target="_blank" but no rel="noopener" — ${m[1].slice(0, 60)}…`);
    }
  }
}

console.log(`[check-acuity] inspected ${totalChecked} Acuity anchors across ${ALL_PAGES.length} pages`);
r.done();
