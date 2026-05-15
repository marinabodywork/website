# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A single-page marketing website for **Marina Bodywork** (Sydney, AU) — somatic massage, KSE Sensory Energetics®, and personal training. Live at `https://marinabodywork.com/`.

Bilingual: English (default) + Brazilian Portuguese, switched client-side without a page reload.

## Stack & layout

There is **no build system, no package manager, no framework, no test suite**. Everything ships as static files served as-is.

- `index.html` — the entire site (~3,500 lines): inline `<style>`, inline `<script>`, and inline JSON-LD schema in the `<head>`.
- `*.webp` / `*.jpeg` / `*.jpg` / `*.png` / `*.svg` — image assets live flat in the repo root and are referenced by bare filename from `index.html` (no `assets/` subfolder).
- `robots.txt`, `sitemap.xml` — SEO files at the root. The sitemap lists the home URL plus the in-page anchors (`#massagem`, `#training`, `#diagnostic`, `#consult`, `#about`, `#faq`, `#contact`).

Loose `Screenshot *.jpg` / `WhatsApp Image *.jpeg` / `Untitled (...).png` files in the root are uploads, not referenced by the site — leave them alone unless the user asks otherwise.

## Local development

```bash
# Just open the file:
xdg-open index.html        # or: open index.html (macOS)

# Or serve over HTTP (recommended — some browsers gate localStorage / fonts on file://):
python3 -m http.server 8000
# then visit http://localhost:8000/
```

There are no lint, build, or test commands.

## Big-picture architecture inside `index.html`

The file is structured top-to-bottom as: `<head>` (meta + JSON-LD + Google Fonts + one giant `<style>` block) → `<body>` (nav, mobile menu, ~17 `<section>` blocks, mobile sticky CTA) → one `<script>` block at the end.

Things worth knowing before editing:

### 1. Two-pass CSS with intentional `!important` overrides

The `<style>` block is split into two phases:

1. The original design system (CSS custom properties in `:root` — `--forest`, `--sage`, `--gold`, `--cream`; fonts `Cormorant Garamond` for display + `DM Sans` for body; `--radius`, `--radius-lg`, `--transition`).
2. An **"APPLE HIG IMPROVEMENTS"** section (search for that heading) that re-declares variables and pins radii, paddings, font sizes, shadows, and touch targets with `!important`. This is intentional — when tweaking buttons/cards/spacing, edit the HIG block (or the cascade will silently lose).

Section background variants (`section-dark` / `section-pale` / `section-surface`) are how visual rhythm is set; respect them when adding sections.

### 2. Client-side i18n via `data-i18n` keys

- A single `const i18n = { en: {...}, pt: {...} }` object in the trailing `<script>` holds all translatable strings, keyed by dotted paths like `hero.h1`, `method.m2.b3`, `pricing.m.cancel`.
- Every translatable element in the markup carries `data-i18n="some.key"`. `setLang(lang)` walks `[data-i18n]` and replaces `el.innerHTML` (so HTML tags like `<br>`, `<strong>`, `<sup>` inside translation values are intentional and must be preserved in both languages).
- Choice persists in `localStorage.getItem('marineLang')`; `setLang` also flips `document.documentElement.lang` to `en` or `pt-BR`.

**When adding/changing user-facing copy:** add the `data-i18n` attribute, then add the key to **both** `i18n.en` and `i18n.pt`. A missing key in one language silently leaves the original markup text in place.

### 3. Booking and external links are hard-coded

All "Book" CTAs point to Acuity:
- Massage: `https://marinaribeirobodywork.as.me/bookmassage`
- PT lessons: `https://marinaribeirobodywork.as.me/BookPTlessons`

WhatsApp links use `https://wa.me/61451021478?text=...`. If the phone, booking URLs, or pricing change, update them in **all** of: the visible CTAs, the JSON-LD `Service.offers` blocks, and the `DIAG` object (see below).

### 4. The diagnostic widget

`#diagnostic` is driven by a `const DIAG = { neck, jaw, back, stress, training }` map in the script. Each tile has `data-area="<key>"`; clicking a tile populates `#diagResult` (service name, "why" copy, tag pills, and the booking URL on `#diagBook`). The `why` strings in `DIAG` are **English-only** and not currently routed through i18n — keep that in mind if the user asks to translate them.

### 5. JSON-LD must stay in sync with visible content

The `<script type="application/ld+json">` block at the top of `<head>` declares `LocalBusiness`, `Person`, four `Service` entries (with `offers.price` in AUD), and `WebSite`. When prices, services, opening hours, area served, or credentials change in the visible copy, update the JSON-LD too — it's what Google reads.

### 5a. Personal Training section content (`#training`)

The training section needs to stay consistent with Marina's actual methodology. The source of truth:

- **Session length:** 60 minutes.
- **Experience pitch:** 15+ years of practice, thousands of women supported in Brazil, now practicing in Sydney. The integration block paragraph carries this.
- **Methodology framing:** integrated — performance, body awareness, mobility, muscular strengthening, quality of life.
- **5-phase session structure** (rendered via `.session-structure` + `data-i18n="training.structure.s1..s5"`):
  1. Stretching, muscle activation, myofascial release
  2. Mobility fundamentals + body awareness
  3. Goal-specific training
  4. Strengthening, stability, conditioning
  5. Muscle relaxation + breathwork
- **6 specialty areas** (rendered via `.specialties-block` + `data-i18n="training.spec.s1..s6"`):
  1. Hypertrophy + muscle definition
  2. Physical conditioning
  3. Mobility + posture
  4. Body strengthening + stability
  5. Perimenopause + menopause health
  6. Body awareness + mind-body well-being

The five quick-chip `.goal-item` icons (`training.g1`..`g5`) are a separate visual outcomes row above the structure block — leave them in place, they're complementary, not duplicate.

If any of the above changes, update **all** of: the visible markup in `#training`, both `i18n.en` + `i18n.pt`, and the `Conscious Movement Personal Training` `Service.description` in the JSON-LD graph.

### 6. Sitemap freshness

`sitemap.xml` carries a `<lastmod>` on the home URL. Bump it when the page content changes meaningfully.

### 7. Reveal-on-scroll + nav behaviour

- Elements with class `reveal` (and optional `stagger-1`..`stagger-6`) fade/slide in via an `IntersectionObserver`. Hero reveals are force-shown on `DOMContentLoaded` so they don't blank on first paint.
- The fixed `<nav>` toggles a `.scrolled` class past 60px and updates `.active` link state from `section[id]` offsets — new top-level sections should keep an `id` matching the nav anchor or active-state highlighting will skip them.

## Git workflow

- Develop on the feature branch assigned for the session.
- Push with `git push -u origin <branch>` and open a draft PR against the default branch.
