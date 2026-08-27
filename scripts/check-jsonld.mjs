#!/usr/bin/env node
// Validates JSON-LD across pages:
//  - Every page parses cleanly (no malformed JSON).
//  - index.html declares the canonical entities (#business, #marina, #service-corporal,
//    #service-facial, #service-sensory, #service-pt, #website) with the documented prices.
//  - Inner-page graphs that reference @ids only reference ids that exist on index.html.
//  - 404.html has no JSON-LD (it is noindex).
//  - Acuity slugs in Service.offers.url match the documented per-service URLs.

import { readPage, extractJsonLd, flattenGraph, makeReporter, INDEXABLE_PAGES } from './lib/parse.mjs';

const r = makeReporter('check-jsonld');

const EXPECTED_OFFERS = {
  '#service-corporal': { price: '125', slug: 'SomaticMassageCorporal' },
  '#service-facial':   { price: '125', slug: 'SomaticMassageFacial' },
  // Sensory Energetics is on launch pricing (regular A$305). Keep the JSON-LD price in
  // sync with the visible launch price, not the regular rate.
  '#service-sensory':  { price: '224', slug: 'SensoryEnergetics' },
};
// PT plans: every documented monthly membership price must appear in #service-pt.offers,
// alongside the single-session offer. Each plan offer also carries a slug now (the per-plan
// Acuity URL) since we moved from packages to recurring monthly memberships.
const EXPECTED_PT_PRICES = ['116', '404', '710', '1007'];
const EXPECTED_PT_SLUG = 'SinglePTLesson';

// Parse and validate per-page.
const graphs = {};
for (const page of [...INDEXABLE_PAGES, '404.html']) {
  const html = readPage(page);
  let blocks;
  try { blocks = extractJsonLd(html); }
  catch (e) { r.error(`${page}: JSON-LD parse error - ${e.message}`); continue; }
  if (page === '404.html') {
    if (blocks.length) r.error(`404.html should ship no JSON-LD (page is noindex)`);
    continue;
  }
  if (!blocks.length) { r.error(`${page}: no JSON-LD found`); continue; }
  graphs[page] = blocks;
}

// Canonical entities live on index.html. Normalize @ids to their fragment so
// "https://marinabodywork.com/#business" indexes as "#business". Only entities with
// an @type are real declarations - bare {"@id": "..."} are pointers, ignore them.
const toFrag = (id) => {
  if (!id) return null;
  const i = id.indexOf('#');
  return i === -1 ? id : id.slice(i);
};
const homeNodes = flattenGraph(graphs['index.html'] || []);
const idIndex = new Map();
for (const n of homeNodes) {
  const frag = toFrag(n['@id']);
  if (frag && n['@type']) idIndex.set(frag, n);
}

for (const id of ['#business', '#marina', '#website', '#service-corporal', '#service-facial', '#service-sensory', '#service-pt']) {
  if (!idIndex.has(id)) r.error(`index.html: missing canonical entity ${id}`);
}

// ── LocalBusiness opening hours (CLAUDE.md §6) ────────────────────────────
// Massage: Mon/Wed/Fri 13:00-18:00
// PT:      Tue/Thu     08:00-18:00
// PT AM:   Mon/Wed/Fri 08:00-11:00
const EXPECTED_HOURS = [
  { days: ['Monday', 'Wednesday', 'Friday'], opens: '13:00', closes: '18:00', label: 'massage afternoons' },
  { days: ['Tuesday', 'Thursday'],           opens: '08:00', closes: '18:00', label: 'PT Tue/Thu' },
  { days: ['Monday', 'Wednesday', 'Friday'], opens: '08:00', closes: '11:00', label: 'PT mornings' },
];
const sameDays = (a, b) => Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((d) => b.includes(d));
const business = idIndex.get('#business');
if (business) {
  const hours = Array.isArray(business.openingHoursSpecification) ? business.openingHoursSpecification : (business.openingHoursSpecification ? [business.openingHoursSpecification] : []);
  for (const want of EXPECTED_HOURS) {
    const match = hours.find((h) => h && sameDays(h.dayOfWeek, want.days) && h.opens === want.opens && h.closes === want.closes);
    if (!match) {
      r.error(`#business: missing openingHoursSpecification for ${want.label} (${want.days.join('/')} ${want.opens}-${want.closes})`);
    }
  }
}

// Sensory Energetics is on launch pricing - the offer.description MUST mention
// the regular A$305 rate so the social/search snippet doesn't look like the
// launch price is permanent (CLAUDE.md §6).
const sensory = idIndex.get('#service-sensory');
if (sensory) {
  const offer = Array.isArray(sensory.offers) ? sensory.offers[0] : sensory.offers;
  if (offer && (!offer.description || !/A\$305/.test(offer.description))) {
    r.error(`#service-sensory: offer.description must mention "A$305" (regular price) while launch pricing is active`);
  }
}

// Service price + URL discipline.
for (const [id, want] of Object.entries(EXPECTED_OFFERS)) {
  const node = idIndex.get(id);
  if (!node) continue;
  const offer = Array.isArray(node.offers) ? node.offers[0] : node.offers;
  if (!offer) { r.error(`${id}: missing offers`); continue; }
  if (String(offer.price) !== want.price) r.error(`${id}: price ${offer.price} ≠ expected ${want.price}`);
  if (!offer.url || !offer.url.includes(want.slug)) r.error(`${id}: offer.url should contain "${want.slug}", got ${offer.url || '(none)'}`);
  if (offer.priceCurrency && offer.priceCurrency !== 'AUD') r.warn(`${id}: priceCurrency is ${offer.priceCurrency} (expected AUD)`);
}

// PT service - multiple offers, prices must include the documented set.
const pt = idIndex.get('#service-pt');
if (pt) {
  const offers = Array.isArray(pt.offers) ? pt.offers : (pt.offers ? [pt.offers] : []);
  const prices = new Set(offers.map((o) => String(o.price)));
  for (const p of EXPECTED_PT_PRICES) {
    if (!prices.has(p)) r.error(`#service-pt: expected an offer with price ${p} (got ${[...prices].join(', ') || 'none'})`);
  }
  const hasSingleSlug = offers.some((o) => o.url && o.url.includes(EXPECTED_PT_SLUG));
  if (!hasSingleSlug) r.error(`#service-pt: expected an offer.url containing "${EXPECTED_PT_SLUG}"`);
}

// Inner-page @id references should resolve against the home graph.
for (const page of ['method.html', 'massage.html', 'membership.html', 'training.html', 'about.html']) {
  const nodes = flattenGraph(graphs[page] || []);
  const refs = new Set();
  const collectRefs = (node) => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) { node.forEach(collectRefs); return; }
    for (const [k, v] of Object.entries(node)) {
      // A node with @type defines a new entity; only its non-@id child @ids are references.
      // A node WITHOUT @type whose only meaningful field is @id IS a reference.
      if (k === '@id' && node['@type']) continue;
      if (typeof v === 'string' && v.includes('#')) refs.add(toFrag(v));
      else collectRefs(v);
    }
  };
  nodes.forEach(collectRefs);
  const inPageIds = new Set(nodes.filter((n) => n['@type']).map((n) => toFrag(n['@id'])));
  for (const ref of refs) {
    if (!ref || !ref.startsWith('#')) continue;
    if (!idIndex.has(ref) && !inPageIds.has(ref)) {
      r.error(`${page}: references ${ref} but it is not defined on index.html or in-page`);
    }
  }
}

console.log(`[check-jsonld] validated ${Object.keys(graphs).length} pages, ${idIndex.size} canonical entities`);
r.done();
