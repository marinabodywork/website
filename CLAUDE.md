# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A single-page marketing website for **Marina Bodywork** (Sydney, AU) — somatic massage, KSE Sensory Energetics®, and personal training. Live at `https://marinabodywork.com/`.

Bilingual: English (default) + Brazilian Portuguese, switched client-side without a page reload.

## Stack & layout

There is **no build system, no package manager, no framework, no test suite**. Everything ships as static files served as-is.

- Five HTML pages at the root: `index.html` (home), `massage.html`, `training.html`, `method.html`, `about.html`. Each carries the same `<nav>` + drawer markup, its own `<head>` (meta, OG, JSON-LD), and the same trailing `<script src="app.js" defer>`.
- `styles.css` — single shared stylesheet for all pages.
- `app.js` — single shared script holding the i18n table (`en` + `pt` flat key maps), `setLang`, scroll/reveal/nav behaviour, hamburger drawer, and the diagnostic widget. **All translations live here, not inline.**
- `*.webp` / `*.jpeg` / `*.jpg` / `*.png` / `*.svg` — image assets live flat in the repo root and are referenced by bare filename from `index.html` (no `assets/` subfolder). Currently in-use brand imagery:
  - `hero.jpeg` — main brand portrait used as the home page hero image (`hero.hero__media`), `og:image` for `index.html` and `method.html`, and the `LocalBusiness.image` in JSON-LD.
  - `atendimento.jpeg` — Somatic Massage Corporal feature image (above the service block).
  - `facial.jpeg` — Somatic Massage Facial feature image.
  - `marina-hero.webp` — used as the `about.html` hero portrait + `og:image`.
  - `marina-logo.png` — **transparent-background** version of the brand mark, used in the nav so the gold mark + wordmark float directly on the dark forest nav with no boxed sticker effect. Generated from `marina-logo.webp` via a luminance-based alpha mask.
  - `marina-consult.webp`, `marina-logo.webp` — consult section, footer thumbnail, and favicon/`apple-touch-icon` (the WebP keeps a solid forest bg, which is fine because favicons need an opaque colour).
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

## Big-picture architecture

Each HTML page is structured top-to-bottom as: `<head>` (meta + per-page JSON-LD + Google Fonts + `<link rel="stylesheet" href="styles.css">`) → `<body>` (shared nav, mobile drawer, page-specific `<section>` blocks, mobile sticky CTA on most pages) → `<script src="app.js" defer>`. Shared CSS lives in `styles.css`; shared behaviour and the i18n table live in `app.js`.

Things worth knowing before editing:

### 1. Design system in `styles.css`

CSS custom properties in `:root` — `--forest`, `--sand`, `--cream`, `--ink`, etc.; fonts `Cormorant Garamond` for display + `DM Sans` for body; spacing scale `--s-1`..`--s-7`; radius scale `--r`/`--r-lg`. Section background variants (`section--dark` / `section--pale` / `section--surface` / `section--cream`) drive vertical rhythm; respect them when adding sections.

### 2. Client-side i18n via `data-i18n` keys (in `app.js`)

- `app.js` exports a single `const i18n = { en: {...}, pt: {...} }` table with **flat** dotted-path keys (e.g. `'home.hero.sub'`, `'home.svc.s2.p'`, `'about.partner.p'`) — not a nested object.
- Every translatable element in the markup carries `data-i18n="some.key"`. `setLang(lang)` walks `[data-i18n]` and replaces `el.innerHTML` (so HTML tags like `<br>`, `<strong>`, `<sup>` inside translation values are intentional and must be preserved in both languages).
- Choice persists in `localStorage` and `setLang` flips `document.documentElement.lang` to `en` or `pt-BR`.

**When adding/changing user-facing copy:** add the `data-i18n` attribute in the relevant HTML page, then add the key to **both** the EN and PT objects in `app.js`. A missing key in one language silently leaves the original markup text in place.

### 3. Booking and external links are hard-coded

All "Book" CTAs point to Acuity:
- Massage: `https://marinaribeirobodywork.as.me/bookmassage`
- PT lessons: `https://marinaribeirobodywork.as.me/BookPTlessons`

WhatsApp links use `https://wa.me/61451021478?text=...`. If the phone, booking URLs, or pricing change, update them in **all** of: the visible CTAs, the JSON-LD `Service.offers` blocks, and the `DIAG` object (see below).

**Booking CTA discipline:** every primary booking CTA on the page is service-specific — either "Book Massage" (→ `bookmassage`) or "Book Training" (→ `BookPTlessons`). Do not introduce a generic "Talk to Marina" / "Book a session" duplicate next to the service-specific buttons; the dedicated WhatsApp consult is the canonical place for an open conversation. The mobile sticky bar mirrors the hero buttons exactly.

**Nav structure:** the top-level `<nav class="nav">` has a `.nav__inner` row with four logical groups — `.nav__logo`, `.nav__links` (desktop only), `.nav__right`, and the hamburger (mobile only, inside `.nav__right`). `.nav__right` contains, in order: two CTA buttons (`.nav__cta` "Book Massage" sand + `.nav__cta.nav__cta--alt` "Book Training" forest), the `.lang` toggle (**always visible** on desktop and mobile), and `.hamburger` (mobile only). The lang toggle uses **inline SVG flag icons** — `flag-au.svg` for `data-lang="en"` and `flag-br.svg` for `data-lang="pt"`, rendered as `<img class="lang__flag" src="flag-au.svg" alt="" width="22" height="22">` inside each button, with `aria-label="English"` / `aria-label="Português"` on the button for screen readers. The flag SVGs live flat in the repo root alongside other image assets; emoji aren't used because Windows browsers render regional-indicator pairs as `AU`/`BR` letters instead of flags. i18n keys for the nav are `nav.bookMassage` and `nav.bookTraining` only — the lang buttons no longer carry `data-i18n` since the flag image is the same across both languages. Both nav CTAs hide on mobile (`@media (max-width: 900px) { .nav__cta { display: none; } }`) and the mobile drawer carries the same two buttons as `.btn--primary` + `.btn--sand`.

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

### 5b. Sensory Energetics section content (inside `#massagem`)

Source of truth for the SE block (90-minute signature):

- **Methodology framing:** integrative method focused on deep release of physical/emotional tension and patterns accumulated in the nervous system. Inspired by ancient Eastern techniques + breathwork + body stimuli + somatic awareness, activating the central nervous system.
- **Body response (paragraph 2):** involuntary tremors and natural neuromuscular reactions are normal — they help discharge tension, regulate stress, and lower cortisol. The technique supports neurotransmitters tied to well-being, focus, motivation, and pleasure (dopamine).
- **Mind-body framing (paragraph 3):** more than a body experience — works on the connection between body, emotion, and mind. Promotes lightness, mental clarity, emotional balance, body awareness.
- **8 benefits** rendered via `.method-benefits` + `data-i18n="se.benefits.b1..b8"`:
  1. Nervous-system regulation
  2. Reduced physical + emotional stress
  3. Release of fascial + muscular tension
  4. Improved mental clarity + decision-making
  5. Greater well-being + deep relaxation
  6. Creativity + bodily presence
  7. Emotional balance + sleep quality
  8. Expansion, lightness, reconnection with self
- The 3 existing `outcome-item` chips (better sleep, reduced anxiety, energy/lightness) stay — they're the visual punch.

If any of the above changes, update **all** of: the visible markup in the SE service block, both `i18n.en` + `i18n.pt`, and the `Sensory Energetics` `Service.description` in the JSON-LD graph.

### 5c. Somatic Release Massage content (`massage.c.*`, inside `#massagem`)

The "Somatic Massage Corporal" service block is Marina's **Somatic Release Massage** methodology. Source of truth:

- **Marina-developed methodology** integrating different therapeutic techniques: Brazilian lymphatic drainage, myofascial release, breathwork, and deep-relaxation work.
- **What the bodywork addresses:** muscular tension, fluid retention, accumulated physical stress, fascial rigidity → improving circulation, mobility, body awareness, sense of lightness.
- **Nervous-system layer:** breathwork + deep relaxation regulate the central nervous system, lowering cortisol and improving relaxation/balance.
- **Positioning:** integrative experience that reconnects body and mind — not "just a massage."
- **8 benefits** rendered via `.method-benefits` + `data-i18n="massage.c.benefits.b1..b8"`:
  1. Release of muscular + fascial tension
  2. Reduced fluid retention
  3. Better circulation + mobility
  4. Body awareness + sense of lightness
  5. Nervous-system regulation + lower cortisol
  6. Reduced accumulated physical + emotional stress
  7. Deep relaxation + improved well-being
  8. Integrative body-mind reconnection

The existing `massage.c.desc` "stop paying three therapists for the same tension" voice still lives at the top of the block as the punchy lead-in; the new methodology paragraphs (`massage.c.method.p1..p4`) sit underneath it.

If any of the above changes, update **all** of: the visible markup in the Somatic Massage Corporal service block, both `i18n.en` + `i18n.pt`, and the `Somatic Massage Corporal` `Service.description` (which also carries `alternateName: "Somatic Release Massage"`) in the JSON-LD graph.

### 5d-pre. Home services cards (`#services` / `home.svc.*`)

The home page has **three** service cards in `.svc-grid`, in order — keep this structure when editing copy:

1. **Single massage sessions** (`home.svc.s1.*`) — covers Somatic Massage Corporal/Facial (60 min · A$125) and Sensory Energetics (90 min · A$305). CTA points to `marinaribeirobodywork.as.me/bookmassage` (the Acuity hub, not a single service URL).
2. **Memberships** (`home.svc.s2.*`) — carries the SIGNATURE badge. Weekly recurring slot, A$100/week, min 2 months. CTA is a WhatsApp deep-link (membership cannot be booked through Acuity — it's an invitation plan).
3. **Training** (`home.svc.s3.*`) — Conscious-movement PT. CTA links to `training.html`.

Pricing source of truth lives in `massage.html`'s `mas.price.*` block. If pricing changes, update both the home cards and that block (plus JSON-LD).

### 5d. About / Marina's biography (`about.html`)

The About section is the canonical biography. Rendered as four `<p data-i18n="about.bio.p1..p4">` paragraphs (EN + PT). Source of truth:

- **Identity:** Marina Ribeiro da Silva, Physical Education professional, **18+ years** dedicated to movement, health, and women's well-being.
- **Origin:** started through dance, teaching it from age 15. Studied Physical Education to professionalise the passion.
- **Brazil career:** worked with the Minas Gerais government on **Movimenta Contagem** (the largest free outdoor physical-activity programme in Brazil). After the pandemic, founded **Mulheres Ativas**, a programme for women — particularly over 40, mothers, and those who never felt at home in traditional gyms.
- **Sydney today:** specialises in women's training across all life stages, including perimenopause — conditioning, hypertrophy, mobility, posture, body awareness, quality of life.
- **Bodywork:** 10+ years in body therapies and massage; developed her own **fascial-release technique** combining breath, somatic awareness, and myofascial release.

Credential chips (`.cred-tag`, keys `about.c0`..`about.c5`): `18+ Years Experience`, `EQF Level 4 Trained`, `Vanoni Institute · Myo Aponeurosis`, `Myofascial + TMJ + Buccal`, `Sensory Energetics`, `Founder, Mulheres Ativas`, `Bilingual EN + PT`.

If any of the above changes, update **all** of: the visible markup in `about.html`, both EN + PT entries in `app.js`, and the `Person` `description` in the JSON-LD graph.

**A note from Marina** — the `.about-letter` block (between bio and credentials) holds a short signed quote, keys `about.letter.label` / `about.letter.quote` / `about.letter.sign`. Treat the quote as Marina's voice — confirm with the user before rewording.

**Partner perks (`.partner-strip`)** — the partner block on `about.html` is framed as **deals Marina's partners offer her clients** (not a generic "she runs workshops here" callout). Current entry: Be Bold Sydney → 2 months free exclusive access to the Be Bold app + 10% off any Be Bold work. Keys `about.perks.label`, `about.perks.h`, `about.partner.label`, `about.partner.p`, `about.partner.link`. New partners stack as additional `.partner-strip` rows under the same heading; keep the framing on the deal/perk, not generic association copy.

### 5e. Shared `.method-paragraphs` / `.method-benefits` styles

Both the SE and Somatic Release Massage blocks (and any future "this is the methodology" + "benefits list" block) share `.method-paragraphs` and `.method-benefits` / `.method-benefits-title` / `.method-benefits-list` styles. Reuse those classes rather than introducing per-service variants.

### 6. Sitemap freshness

`sitemap.xml` carries a `<lastmod>` on the home URL. Bump it when the page content changes meaningfully.

### 7. Reveal-on-scroll + nav behaviour

- Elements with class `reveal` (and optional `stagger-1`..`stagger-6`) fade/slide in via an `IntersectionObserver`. Hero reveals are force-shown on `DOMContentLoaded` so they don't blank on first paint.
- The fixed `<nav>` toggles a `.scrolled` class past 60px and updates `.active` link state from `section[id]` offsets — new top-level sections should keep an `id` matching the nav anchor or active-state highlighting will skip them.

## Git workflow

- Develop on the feature branch assigned for the session.
- Push with `git push -u origin <branch>` and open a draft PR against the default branch.
