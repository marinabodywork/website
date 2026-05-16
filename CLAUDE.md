# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A single-page marketing website for **Marina Bodywork** (Sydney, AU) — somatic massage, KSE Sensory Energetics®, and personal training. Live at `https://marinabodywork.com/`.

Bilingual: English (default) + Brazilian Portuguese, switched client-side without a page reload.

## Stack & layout

There is **no build system, no package manager, no framework, no test suite**. Everything ships as static files served as-is.

- Six HTML pages at the root: `index.html` (home), `massage.html`, `training.html`, `method.html`, `about.html`, and `404.html` (branded not-found, `<meta name="robots" content="noindex">`). Each carries the same `<nav>` + drawer markup, its own `<head>` (meta, OG, per-page JSON-LD), and the same trailing `<script src="app.js" defer>`.
- `styles.css` — single shared stylesheet for all pages.
- `app.js` — single shared script holding the i18n table (`en` + `pt` flat key maps), `setLang`, scroll/reveal/nav behaviour, hamburger drawer, diagnostic widget, FAQ search, hero parallax, and the `js-on` class toggle. **All translations live here, not inline.** First line of the IIFE adds `js-on` to `<html>` so reveal animations are progressive-enhancement only.
- `*.webp` / `*.jpeg` / `*.jpg` / `*.png` / `*.svg` — image assets live flat in the repo root and are referenced by bare filename (no `assets/` subfolder). Currently in-use brand imagery:
  - `hero.jpeg` — main brand portrait used as the home page hero image (`hero.hero__media`), `og:image` for `index.html` and `method.html`, and the `LocalBusiness.image` in JSON-LD.
  - `atendimento.jpeg` — Somatic Massage Corporal feature image (above the service block).
  - `facial.jpeg` — Somatic Massage Facial feature image.
  - `marina-massage-content.webp` — Sensory Energetics service block image.
  - `marina-hero.webp` — used as the `about.html` hero portrait + `og:image`.
  - `marina-logo.png` — **transparent-background** version of the brand mark, used in the nav so the gold mark + wordmark float directly on the dark forest nav with no boxed sticker effect. Generated from `marina-logo.webp` via a luminance-based alpha mask.
  - `marina-consult.webp`, `marina-logo.webp` — consult section, footer thumbnail, and favicon/`apple-touch-icon` (the WebP keeps a solid forest bg, which is fine because favicons need an opaque colour).
  - `flag-au.svg`, `flag-br.svg` — flag glyphs used in the language toggle (NOT emojis; rasterised SVG so the button shape stays controllable).
  - `be-bold-logo.png` — Be Bold Sydney partner logo on `about.html`'s `.partner-strip`.
- `robots.txt`, `sitemap.xml` — SEO files at the root. The sitemap lists all five indexable pages (home + the four inner pages). `404.html` is intentionally omitted (`noindex`).

If you see loose `Screenshot *.jpg` / `WhatsApp Image *.jpeg` / `Untitled (...).png` files appear at the root, they're uploads, not referenced by the site — leave them alone unless the user asks otherwise.

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

**Nav structure:** the top-level `<nav class="nav">` has a `.nav__inner` row with four logical groups — `.nav__logo`, `.nav__links` (desktop only), `.nav__right`, and the hamburger (mobile only, inside `.nav__right`). `.nav__right` contains, in order: two CTA buttons (`.nav__cta` "Book Massage" sand + `.nav__cta.nav__cta--alt` "Book Training" forest), the `.lang` toggle (**always visible** on desktop and mobile), and `.hamburger` (mobile only). The lang toggle uses **inline flag SVGs** — `flag-au.svg` for `data-lang="en"` and `flag-br.svg` for `data-lang="pt"` — with `aria-label="English"` / `aria-label="Português"` for screen readers. i18n keys are `nav.bookMassage`, `nav.bookTraining`. Both nav CTAs hide on mobile (`@media (max-width: 900px) { .nav__cta { display: none; } }`) and the mobile drawer carries the same two buttons as `.btn--primary` + `.btn--sand`.

**Drawer button cascade gotcha:** `.drawer a` sets `color: var(--forest)` for all drawer links, which has *higher specificity* than `.btn--primary` (forest bg, sand text). Without the override the "Book Massage" pill in the drawer renders forest-on-forest = invisible. The site ships `.drawer .btn--primary { color: var(--sand); }` and `.drawer .btn--sand { color: var(--forest); }` to win the cascade. Keep those rules if you touch the drawer styles.

### 4. The diagnostic widget

`#diagnostic` is driven by `DIAG_URLS` + `DIAG_AREAS` in `app.js`. Each tile is a `<button class="diag__tile" data-area="<key>">` with an inline SVG icon (`.diag__tile-icon`) above a label (`.diag__tile-label`). Clicking a tile populates `#diagResult` with the service name, "why" copy, tag pills, and an `<a class="btn btn--primary">` that points to the area-specific Acuity URL (the booking link is rendered inside `#diagResult`, not a separate `#diagBook` element). i18n keys live under `diag.tile.<area>` / `diag.<area>.name` / `diag.<area>.why` / `diag.<area>.tags` / `diag.<area>.cta`.

**Known gap:** the `why` strings are translated in EN + PT via the i18n table; if you find any `diag.*.why` keys missing in `pt`, add them. The widget itself renders whatever `t()` returns — there is no English fallback baked into the JS.

### 5. JSON-LD must stay in sync with visible content

**Every page** ships its own JSON-LD block at the top of `<head>`:

- **`index.html`** declares the canonical entities used everywhere: `LocalBusiness` (`@id` `#business`), `Person` (`@id` `#marina`), four `Service` entries with explicit `@id`s (`#service-corporal`, `#service-facial`, `#service-sensory`, `#service-pt`, each with `offers.price` in AUD), and a `WebSite` (`@id` `#website`). The business's `sameAs` array includes the Google Business profile and Instagram.
- **Inner pages** ship a compact `@graph` that references the home's canonical entities by `@id` (no duplication):
  - `method.html` → `WebPage` + `BreadcrumbList` + `Article` ("It is all fascia") with Marina as author.
  - `massage.html` → `WebPage` whose `mainEntity` is an `ItemList` of the three service `@id`s + `BreadcrumbList`.
  - `training.html` → `WebPage` with `mainEntity = #service-pt` + `BreadcrumbList`.
  - `about.html` → `AboutPage` with `mainEntity = #marina` + `BreadcrumbList`.
- **`404.html`** has no JSON-LD by design (it's `noindex`).

When prices, services, opening hours, area served, or credentials change in the visible copy, update the JSON-LD too — it's what Google reads. Changes to a service's price/url need to update both the home `Service.offers` and any inner-page reference if relevant.

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

### 5e. Reserved `.method-benefits` pattern (when 8-benefit lists are added)

The 8-benefit lists described in sections 5b (Sensory Energetics) and 5c (Somatic Release Massage) are **not currently in the markup** — the service blocks currently ship the methodology paragraphs and a single CTA. If those benefit lists are added later, use the reserved class names `.method-paragraphs` and `.method-benefits` / `.method-benefits-title` / `.method-benefits-list` (you'll need to add the styles to `styles.css` — they don't exist yet). The `.plan-card__feats li::before { content: "✓" }` pattern is the existing checkmark treatment to mirror.

### 6. Sitemap freshness

`sitemap.xml` carries a `<lastmod>` on the home URL. Bump it when the page content changes meaningfully.

### 7. Reveal-on-scroll + nav behaviour (progressive enhancement)

- The first line of `app.js`'s IIFE adds `js-on` to `<html>`. Without that class, `.reveal { opacity: 1; transform: none }` — i.e. *content is visible by default*. Only when `js-on` is set do reveals start hidden (`opacity: 0; translateY(24px)`) and animate in when their `IntersectionObserver` adds `is-visible`. This means **SEO crawlers, social-preview bots, screenshot tools, and JS-disabled visitors see the complete page**; only real browsers with JS get the animation. Service-block `clip-path` reveals follow the same pattern (`.js-on .service-block__media img` is the hidden state).
- `.reveal` accepts `stagger-1`..`stagger-6` for cascaded entry timing.
- The fixed `<nav>` toggles a `.scrolled` class past 60px and updates `.active` link state from `section[id]` offsets — new top-level sections should keep an `id` matching the nav anchor or active-state highlighting will skip them.

### 8. Motion language

Beyond reveal-on-scroll, the site uses:

- **Hero portrait first-paint reveal** — `.hero__media img` + `.about-hero__bg img` get a 1200ms `clip-path: inset(0 0 100% 0) → inset(0 0 0 0)` animation with scale `1.08 → 1` on page load. Defined as `@keyframes heroReveal`.
- **Hero parallax** — `initParallax()` in `app.js` translates `.hero__media` vertically at 8% of scroll, rAF-throttled, scroll-passive. Opt-out via `prefers-reduced-motion: reduce`.
- **Service-block image masked reveal** — `.service-block` gets `is-visible` added by `initMediaReveal()` (IntersectionObserver, 0.18 threshold) which triggers the clip-path animation.
- **Button shine sweep** — `.btn--primary` and `.btn--sand` have a `::after` gradient that translates 120% on hover (750ms cubic-bezier).
- **Cross-document view transitions** — `@view-transition { navigation: auto }` enables soft fade between page navigations on Chromium 126+. `vtFadeOut`/`vtFadeIn` keyframes. Other browsers ignore.
- **Smooth scroll** — `html { scroll-behavior: smooth }` with `@media (prefers-reduced-motion: reduce)` opt-out.
- **Diagnostic tile bounce** — `.diag__tile.is-on .diag__tile-icon { transform: scale(1.08) }` for selected state.

All motion is gated behind `prefers-reduced-motion: reduce` — that media query disables hero animation, service-block clip-path, button shine, and view transitions.

### 9. FAQ live search

Each `.faq` block can have a `.faq__search` input prepended; `initFaqSearch()` filters `.faq__item` children by `textContent` on every input event. An empty-state element `<p class="faq__empty">` (hidden by default) shows when no items match — toggled via `.faq.is-empty`. i18n keys: `faq.search.placeholder`, `faq.search.empty`. The search input uses a CSS-mask magnifier glyph as its `::before` so the icon recolors with the input's currentColor.

Currently live on `index.html` and `massage.html`. Add to other FAQ blocks by inserting the `.faq__search` + `.faq__empty` markup at the top of the `.faq` container.

### 10. Testimonials & social proof (`#proof` section on home)

Three real Google reviews live in `.testimonials` on the home page — currently **Jean** (PT), **Yumi** (bodywork experience), **Alya** (short outcome). Each card:

- `<h3>` is a verbatim pull-out phrase from that reviewer's actual quote — do not invent headlines, draw them from the quote itself.
- `<blockquote>` carries the verbatim review text (curly quotes added by `::before`/`::after`).
- `.testimonial__foot` holds the `<cite>` (first name only) and `.testimonial__source` — a tiny "via Google" badge with the colored Google `G` SVG that links to Marina's Google Business profile (`https://maps.app.goo.gl/nrZoa67hLrwqB9gm8`).

Both EN and PT versions are translated for bilingual visitors. Section h2 is "In her clients' own words." / "Nas palavras delas." i18n keys: `home.proof.t1..t3.{h,q,name}` + `home.proof.viaGoogle`. **Never fabricate testimonials** — only ship quotes Marina has authorized from her real reviews.

Below the cards is the `.reviews-strip` outlined pill (`★★★★★ G reviews · Sydney →`) linking to the same Google profile — same URL is also in the LocalBusiness `sameAs` array so Google can connect the schema to the verified profile.

### 11. Accessibility patterns

- **Skip link** — every page has `<a class="skip-link" href="#main">` as the first child of `<body>`. The first `<header>` on each page carries `id="main" tabindex="-1"` so the link target is focusable. i18n key `a11y.skip`.
- **Focus rings** — global `:focus-visible { outline: 2px solid var(--sand-deep) }`; on the dark home hero, `.hero :focus-visible { outline-color: var(--cream) }` keeps the ring legible against forest green.
- **Heading hierarchy** — no level skips. Footer column headers are `<h3>` (NOT h4) so they stay one level below the page's section h2s. Disqualifier card headers on home are also `<h3>` for the same reason. The 404 page uses a small visible `<h2>` ("Where to next?") above the CTA group to avoid jumping from the page h1 straight to footer h3s.
- **Drawer button colors** — see the cascade-override gotcha in section 3.
- **`aria-current="page"`** on the active nav link of each page.

### 12. Performance hints

Every page's `<head>` ships:

- `<link rel="preload" as="image" href="<hero-img>" fetchpriority="high">` for the page's LCP image (home: `hero.jpeg`; about: `marina-hero.webp`; other inner pages: none — they don't have a hero image).
- `<link rel="preload" as="image" href="marina-logo.png">` for the nav logo on every page.
- LCP images carry `fetchpriority="high" decoding="async"`; below-fold images carry `loading="lazy" decoding="async"`. Nav logos carry `decoding="async"` (not lazy — they're above-fold).

Logo size tokens: `--logo-h: 88px` (desktop), `--logo-h-mobile: 80px`. Nav height is 96px to give the logo breathing room.

### 13. Iconography

Three inline-SVG icon systems are in use (all 1.4px stroke, `currentColor`, no fills):

- **Diagnostic tile icons** (`.diag__tile-icon`, 28×28) — body-area glyphs above each tile label on `index.html` `#diagnostic`.
- **Home service card icons** (`.svc-card__icon`, 34×34) — ripple / recurring loop / dumbbell above each `.svc-card` on `index.html` `#services`.
- **Massage service block icons** (`.service-block__icon`, 38×38) — body silhouette / face profile / radiating petals above each `.service-block` h2 on `massage.html`.

Section eyebrow hairline accent: `.center > .eyebrow::before` and `.page-hero .eyebrow::before` render a 24px hairline rule before section-level eyebrows. Card-internal eyebrows are deliberately not affected.

### 14. Branded 404 page

`404.html` is structured exactly like an inner page (nav + page-hero + footer + WhatsApp float) so Netlify serves it on unknown routes without config. Carries `<meta name="robots" content="noindex">` and no JSON-LD by design. CTAs are service-specific per the discipline rule — "Back to home" + "Book Massage" (not generic "Book a session"). i18n keys: `nf.label`, `nf.h1`, `nf.sub`, `nf.next`, `nf.cta.home`, `nf.cta.book`.

## Git workflow

- Develop on the feature branch assigned for the session.
- Push with `git push -u origin <branch>` and open a draft PR against the default branch.
