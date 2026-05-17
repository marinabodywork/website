// Shared parsing helpers for the check scripts.
// Zero dependencies; tuned to this repo's well-structured HTML.

import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import vm from 'node:vm';

const HERE = dirname(fileURLToPath(import.meta.url));
export const ROOT = resolve(HERE, '..', '..');

export const INDEXABLE_PAGES = ['index.html', 'massage.html', 'training.html', 'method.html', 'about.html'];
export const ALL_PAGES = [...INDEXABLE_PAGES, '404.html'];

export function readPage(name) {
  return readFileSync(join(ROOT, name), 'utf8');
}

// Pull the i18n object literal out of app.js and evaluate it in a vm sandbox.
// Returns { en: {...}, pt: {...} } with real string values.
export function loadI18n() {
  const src = readFileSync(join(ROOT, 'app.js'), 'utf8');
  const start = src.indexOf('const i18n = {');
  if (start === -1) throw new Error('loadI18n: could not find "const i18n = {" in app.js');

  // Walk braces to find the matching close.
  let depth = 0;
  let i = src.indexOf('{', start);
  let end = -1;
  let inStr = null; // single-char quote we are inside, or null
  let escaped = false;
  for (; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (escaped) { escaped = false; continue; }
      if (c === '\\') { escaped = true; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === "'" || c === '"' || c === '`') { inStr = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
  }
  if (end === -1) throw new Error('loadI18n: never found matching close brace');

  const literal = src.slice(src.indexOf('{', start), end);
  const sandbox = {};
  vm.runInNewContext('out = ' + literal, sandbox);
  if (!sandbox.out || !sandbox.out.en || !sandbox.out.pt) {
    throw new Error('loadI18n: parsed object missing en or pt');
  }
  return sandbox.out;
}

// Collect every key referenced from HTML via data-i18n="..." and data-i18n-attr="attr:key,attr:key".
// Returns { byPage: { 'index.html': Set, ... }, all: Set }.
export function collectMarkupKeys(pages = ALL_PAGES) {
  const byPage = {};
  const all = new Set();
  for (const page of pages) {
    const html = readPage(page);
    const keys = new Set();
    for (const m of html.matchAll(/\bdata-i18n\s*=\s*"([^"]+)"/g)) {
      keys.add(m[1]);
      all.add(m[1]);
    }
    for (const m of html.matchAll(/\bdata-i18n-attr\s*=\s*"([^"]+)"/g)) {
      for (const pair of m[1].split(',')) {
        const parts = pair.trim().split(':');
        if (parts.length === 2) { keys.add(parts[1].trim()); all.add(parts[1].trim()); }
      }
    }
    byPage[page] = keys;
  }
  return { byPage, all };
}

// Extract every <script type="application/ld+json"> block, parsed as JSON.
// Returns an array of parsed graphs (each is whatever was in the script).
export function extractJsonLd(html) {
  const blocks = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const m of html.matchAll(re)) {
    blocks.push(JSON.parse(m[1].trim()));
  }
  return blocks;
}

// Walk a JSON-LD graph and flatten every node with an @id.
export function flattenGraph(blocks) {
  const out = [];
  const visit = (node) => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) { node.forEach(visit); return; }
    if (node['@id'] || node['@type']) out.push(node);
    for (const v of Object.values(node)) visit(v);
  };
  blocks.forEach((b) => {
    if (b && Array.isArray(b['@graph'])) b['@graph'].forEach(visit);
    else visit(b);
  });
  return out;
}

// Pull every <a href="..."> on a page along with its class attribute (or '').
export function extractAnchors(html) {
  const out = [];
  const re = /<a\b([^>]*)>/gi;
  for (const m of html.matchAll(re)) {
    const attrs = m[1];
    const href = (attrs.match(/\bhref\s*=\s*"([^"]*)"/) || [])[1];
    if (!href) continue;
    const cls = (attrs.match(/\bclass\s*=\s*"([^"]*)"/) || [, ''])[1];
    out.push({ href, class: cls });
  }
  return out;
}

// All ids defined on a page (id="..." attrs).
export function extractIds(html) {
  const ids = new Set();
  for (const m of html.matchAll(/\bid\s*=\s*"([^"]+)"/g)) ids.add(m[1]);
  return ids;
}

// Just the <head>...</head> chunk.
export function extractHead(html) {
  const m = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  return m ? m[1] : '';
}

export function extractBody(html) {
  // Anchor on </head> first — the pre-paint script in <head> contains a "<body>" comment
  // that would otherwise confuse a naive regex.
  const headEnd = html.search(/<\/head>/i);
  const fromBody = headEnd === -1 ? html : html.slice(headEnd);
  const m = fromBody.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return m ? m[1] : '';
}

// Tiny reporter shared by every check script.
export function makeReporter(name) {
  const errors = [];
  const warnings = [];
  return {
    error(msg) { errors.push(msg); },
    warn(msg) { warnings.push(msg); },
    done() {
      const log = (label, items) => items.forEach((m) => console.log(`  ${label} ${m}`));
      if (warnings.length) { console.log(`[${name}] warnings:`); log('!', warnings); }
      if (errors.length) {
        console.log(`[${name}] FAIL — ${errors.length} error(s):`);
        log('x', errors);
        process.exitCode = 1;
        return false;
      }
      console.log(`[${name}] OK${warnings.length ? ` (${warnings.length} warning(s))` : ''}`);
      return true;
    },
  };
}
