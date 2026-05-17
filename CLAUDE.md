# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A multi-page marketing website for **Marina Bodywork** (Sydney, AU) — somatic massage, KSE Sensory Energetics®, and personal training. Live at `https://marinabodywork.com/`.

Bilingual: English (default) + Brazilian Portuguese, switched client-side without a page reload. Choice persists in `localStorage` under key `marinaLang`.

## Stack & layout

There is **no build system, no package manager, no framework, no test suite**. Everything ships as static files served as-is.

- Six HTML pages at the root: `index.html` (home), `massage.html`, `training.html`, `method.html`, `about.html`, and `404.html` (branded not-found, `<meta name="robots" content="noindex">`). Each carries the same `<nav>` + drawer markup, its own `<head>` (meta, OG, per-page JSON-LD, Acuity embed script), and the same trailing `<script src="app.js" defer>`.
- `styles.css` — single shared stylesheet for all pages.
- `app.js` — single shared script holding the i18n table (`en` + `pt` flat key maps, ~730 keys total), `setLang`, scroll/reveal/nav behaviour, hamburger drawer, diagnostic widget, FAQ search, hero parallax, and the `js-on` class toggle. **All translations live here, not inline.** First line of the IIFE adds `js-on` to `<html>` so reveal animations are progressive-enhancement only.
- Image assets live flat in the repo root (no `assets/` subfolder), referenced by bare filename. Currently in-use:
  - `hero.jpg` + `hero.webp` — main brand portrait used as the home page hero (`hero.hero__media` ships a `<picture>` with WebP source + JPEG fallback, 1024×1536). The JPEG is the `og:image` for `index.html` and `method.html` and the `LocalBusiness.image` in JSON-LD; the WebP is the LCP preload target.
  - `atendimento.jpeg` — Somatic Massage Corporal feature image (`massage.html` service block).
  - `facial.jpeg` — Somatic Massage Facial feature image.
  - `marina-massage-content.webp` — Sensory Energetics service block image.
  - `marina-hero.webp` — `about.html` hero portrait + `og:image`.
  - `marina-consult.webp` — home `#consult` section thumbnail.
  - `marina-logo.png` — **transparent-background** version of the brand mark used in the nav and footer of every page (the gold mark + wordmark floats directly on the dark forest nav with no boxed sticker effect). Generated from `marina-logo.webp` via a luminance-based alpha mask.
  - `marina-logo.webp` — favicon + `apple-touch-icon` (solid forest bg is fine because favicons need an opaque colour).
  - `flag-au.svg`, `flag-br.svg` — flag glyphs used in the language toggle (NOT emojis; SVG so the button shape stays controllable).
  - `be-bold-logo.png` — Be Bold Sydney partner logo on `about.html`'s `.partner-strip`.
- `robots.txt`, `sitemap.xml` — SEO files at the root. The sitemap lists all five indexable pages (home + four inner pages). `404.html` is intentionally omitted (`noindex`). Each URL carries a `<lastmod>` — bump on meaningful content changes.

Loose unused image files at the root (`marina-fingers.webp`, `marina-headshot.webp`, `marina-hero-action.webp`, `marina-pointing.webp`, `marina-portrait.webp`, `ogimage.png`) are legacy/unreferenced — leave them alone unless the user asks. Same for `Screenshot *.jpg`, `WhatsApp Image *.jpeg`, `Untitled (...).png` uploads.

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

Each HTML page is structured top-to-bottom as: `<head>` (charset/viewport → pre-paint lang script → meta/OG → JSON-LD → fonts → `styles.css` → Acuity embed CSS+JS) → `<body>` (skip-link → shared nav → mobile drawer → page-specific `<section>` blocks → footer → mobile sticky CTA → WhatsApp float on most pages) → `<script src="app.js" defer>`. Shared CSS lives in `styles.css`; shared behaviour and the i18n table live in `app.js`.

Things worth knowing before editing:

### 1. Design system in `styles.css`

CSS custom properties in `:root` — `--forest`, `--sand`, `--sand-deep`, `--cream`, `--cream-warm`, `--ink`, `--fog`, `--line`; display font `Cormorant Garamond` + body font `DM Sans`; spacing scale `--s-1`..`--s-7`; radius scale `--r`/`--r-lg`. Section background variants (`section--dark` = forest, `section--cream` = cream, `section--pale` = cream-warm, `section--surface` = subtle gradient) drive vertical rhythm; respect them when adding sections.

### 2. Client-side i18n via `data-i18n` keys

- `app.js` declares a single `const i18n = { en: {...}, pt: {...} }` table with **flat** dotted-path keys (e.g. `'home.hero.sub'`, `'tr.plan.golden.price'`, `'mas.c.p1'`) — not a nested object.
- Every translatable element in the markup carries `data-i18n="some.key"`. `setLang(lang)` walks `[data-i18n]` and replaces `el.innerHTML` (so HTML tags like `<br>`, `<strong>`, `<sup>` inside translation values are intentional and must be preserved in both languages).
- Choice persists in `localStorage` under `marinaLang` and `setLang` flips `document.documentElement.lang` to `en` or `pt-BR`.

**Translating HTML attributes** — use `data-i18n-attr="attr:key,attr:key"`. Currently powers the hamburger `aria-label` (key `nav.menu`) and the FAQ `<input>` placeholder (key `faq.search.placeholder`). See `setLang` in `app.js` for the parser.

**Pre-paint language hint** — every page has an inline `<script>` at the very top of `<head>` that reads `localStorage.getItem('marinaLang')`; if it is `pt`, it sets `document.documentElement.lang = 'pt-BR'` and adds class `lang-pending`. CSS rule `html.lang-pending body { visibility: hidden; }` keeps the body hidden for up to 800ms while `app.js` translates, preventing an EN flash for returning PT visitors. The timeout-based cleanup runs in inline script and `setLang` also removes the class. **Do not remove this block** when editing `<head>`.

**When adding/changing user-facing copy:** add the `data-i18n` attribute in the relevant HTML page, then add the key to **both** the EN and PT objects in `app.js`. A missing key in one language silently leaves the original markup text in place.

### 3. Booking flow: Acuity embed-modal (in-site popup)

Every page's `<head>` loads the Acuity embed button:

```html
<link rel="stylesheet" href="https://embed.acuityscheduling.com/embed/button/39322566.css" id="acuity-button-styles">
<script src="https://embed.acuityscheduling.com/embed/button/39322566.js" async></script>
```

Every booking CTA on the site that points to an Acuity URL carries class `acuity-embed-button`. The Acuity script intercepts clicks on those anchors and opens the booking flow inside an in-site modal overlay instead of navigating to a new tab. We keep `target="_blank" rel="noopener"` on every such link as a safe fallback for when the Acuity script fails to load (network policy, ad-blocker, etc.).

**When introducing a new booking CTA, always include the `acuity-embed-button` class** alongside `btn--primary`/`btn--sand`/etc. Internal links (e.g. `training.html`, `#mas-pricing`) do not get the class. The diagnostic widget renders its CTA dynamically in `app.js` and conditionally adds the class for non-internal areas — preserve that logic in `renderDiag()`.

**Acuity URL inventory** — every service has a dedicated URL; the hub URLs (`/bookmassage`, `/BookPTlessons`) are only used in nav/hero/drawer/sticky/footer as generic entry points.

| Service | URL slug |
|---|---|
| Massage hub | `marinaribeirobodywork.as.me/bookmassage` |
| Somatic Massage Corporal (60 min · A$125) | `.../SomaticMassageCorporal` |
| Somatic Massage Facial (60 min · A$125) | `.../SomaticMassageFacial` |
| Sensory Energetics (90 min · A$305) | `.../SensoryEnergetics` |
| PT hub | `marinaribeirobodywork.as.me/BookPTlessons` |
| Single PT lesson (A$99) | `.../SinglePTLesson` |
| PT Basic plan (A$570 · 6 sessions) | `.../PTBasic` |
| PT Golden plan (A$1,020 · 12 sessions) | `.../PTGolden` |
| PT Diamond plan (A$1,800 · 24 sessions) | `.../DiamondPTSession` |

**Per-service membership catalog URLs** — weekly memberships are sold through Acuity's catalog (cart) endpoint with the per-service `id`:

```
https://app.acuityscheduling.com/catalog.php?owner=39322566&action=addCart&clear=1&id={id}
```

| Membership | `id` |
|---|---|
| Weekly Corporal | `2213824` |
| Weekly Facial | `2213848` |
| Weekly Sensory Energetics | `2213845` |

These appear on `massage.html`'s service blocks ("Make it weekly →" secondary CTAs, keys `mas.c.mship.cta`/`mas.f.mship.cta`/`mas.s.mship.cta`) and on the `#mas-pricing` Weekly memberships strip. The home `home.svc.s2` Memberships card links to `massage.html#mas-pricing` (not WhatsApp).

**WhatsApp** — open-conversation CTAs use `https://wa.me/61451021478?text=...`. The home `#consult` section and "Talk to Marina first →" links use these.

**Booking CTA discipline:** every primary booking CTA on the page is service-specific — either "Book Massage" or "Book Training". Do not introduce a generic "Talk to Marina" / "Book a session" duplicate next to the service-specific buttons; the dedicated WhatsApp consult is the canonical place for an open conversation. The mobile sticky bar mirrors the hero buttons exactly.

If the phone, booking URLs, membership ids, or pricing change, update them in **all** of: the visible CTAs across every page, the JSON-LD `Service.offers` blocks on `index.html`, and the i18n table.

### 4. Nav, drawer, and language toggle

The top-level `<nav class="nav">` has a `.nav__inner` row with four logical groups:

1. `.nav__logo` — `marina-logo.png` (88×88 desktop / 80×80 mobile)
2. `.nav__links` — desktop only, anchors to inner pages (Method / Massage / Training / About). `aria-current="page"` on the active page.
3. `.nav__right` — in order: two CTA buttons (`.nav__cta` "Book Massage" sand + `.nav__cta.nav__cta--alt` "Book Training" forest, both `acuity-embed-button`), the `.lang` toggle (**always visible** on desktop and mobile), and the hamburger (mobile only).
4. `.hamburger` — mobile-only, lives inside `.nav__right`. `aria-label` is localized via `data-i18n-attr="aria-label:nav.menu"`.

Both nav CTAs hide on mobile (`@media (max-width: 900px) { .nav__cta { display: none; } }`); the mobile drawer (`#drawer`) carries the same two buttons as `.btn--primary` + `.btn--sand` plus the four inner-page links.

The lang toggle uses **inline flag SVGs** — `flag-au.svg` for `data-lang="en"` and `flag-br.svg` for `data-lang="pt"` — with `aria-label="English"` / `aria-label="Português"` for screen readers. i18n keys for nav CTAs: `nav.bookMassage`, `nav.bookTraining`.

**Drawer button cascade gotcha:** `.drawer a` sets `color: var(--forest)` for all drawer links, which has *higher specificity* than `.btn--primary` (forest bg, sand text). Without override, the "Book Massage" pill in the drawer renders forest-on-forest = invisible. The site ships `.drawer .btn--primary { color: var(--sand); }` and `.drawer .btn--sand { color: var(--forest); }` to win the cascade. Keep those rules if you touch the drawer styles.

### 5. The diagnostic widget (home + method)

`#diagnostic` is driven by `DIAG_AREAS` + `DIAG_URLS` in `app.js`. Five areas: `neck`, `jaw`, `back`, `stress`, `training`. Each tile is a `<button class="diag__tile" data-area="<key>">` with an inline SVG icon (`.diag__tile-icon`) above a label (`.diag__tile-label`). Clicking a tile populates `#diagResult` with the service name, "why" copy, tag pills, and an `<a class="btn btn--primary">` that points to the area-specific Acuity URL (the booking link is rendered inside `#diagResult`, not a separate `#diagBook` element).

Non-`training` areas get the `acuity-embed-button` class on the dynamically rendered CTA (in-site modal); the `training` area links to internal `training.html#plans` instead. i18n keys: `diag.tile.<area>` / `diag.<area>.name` / `diag.<area>.why` / `diag.<area>.tags` / `diag.<area>.cta`.

### 6. JSON-LD must stay in sync with visible content

**Every page** ships its own JSON-LD `@graph` at the top of `<head>`:

- **`index.html`** declares the canonical entities used everywhere:
  - `LocalBusiness` (`@id` `#business`) — includes phone, email, `priceRange`, `address` (Randwick NSW AU), `areaServed` (Sydney + Maroubra + Randwick), three `OpeningHoursSpecification` entries (massage afternoons Mon/Wed/Fri 13:00–18:00, PT Tue/Thu 08:00–18:00, PT mornings Mon/Wed/Fri 08:00–11:00), `sameAs` (Instagram, Google profile, `bebold.au`), `founder` → `#marina`.
  - `Person` (`@id` `#marina`) — Marina Ribeiro da Silva, with full `description` and `hasCredential` array of 5 EducationalOccupationalCredentials.
  - Four `Service` entries with explicit `@id`s and `offers`:
    - `#service-corporal` (A$125, alternateName "Somatic Release Massage")
    - `#service-facial` (A$125)
    - `#service-sensory` (A$305)
    - `#service-pt` — has multiple `offers` (Single A$99 with SinglePTLesson URL, plus Basic A$570 / Golden A$1,020 / Diamond A$1,800 — plans listed without URLs to keep the schema simple)
  - `WebSite` (`@id` `#website`) with `inLanguage: ["en","pt-BR"]`.
- **Inner pages** ship compact `@graph`s that reference the home's canonical entities by `@id` (no duplication):
  - `method.html` → `WebPage` + `BreadcrumbList` + `Article` ("It is all fascia") with Marina as author.
  - `massage.html` → `WebPage` whose `mainEntity` is an `ItemList` of the three service `@id`s + `BreadcrumbList`.
  - `training.html` → `WebPage` with `mainEntity = #service-pt` + `BreadcrumbList`.
  - `about.html` → `AboutPage` with `mainEntity = #marina` + `BreadcrumbList`.
- **`404.html`** has no JSON-LD by design (it's `noindex`).

When prices, services, opening hours, area served, or credentials change in the visible copy, update the JSON-LD too — it's what Google reads. Service `offers.url` should match the per-service Acuity URL, not the hub.

### 7. Home page structure (`index.html`)

Section order top-to-bottom:

1. **`<header class="hero">` `#main`** — h1 in four lines (`home.hero.h1.a..d`), sub (`home.hero.sub`), two service-specific CTAs, "Talk to Marina first" WhatsApp link, hero `<picture>` (WebP + JPG fallback).
2. **`#system`** — `section--dark`. Three-card combo grid (`.combo-grid > .combo-card`, with `.combo-card--winner` on the third) explaining why massage alone fails / training alone plateaus / Marina's combined system works. Keys `home.combo.label`/`h2`/`intro`/`c1.*`/`c2.*`/`c3.*`/`close`/`cta`. The CTA anchors to `#services`.
3. **`#services`** — three service cards in `.svc-grid` (keep this order when editing):
   1. **Single massage sessions** (`home.svc.s1.*`) — meta "60-90 min · From A$125". CTA `acuity-embed-button` → `/bookmassage` hub.
   2. **Memberships** (`home.svc.s2.*`) — carries SIGNATURE badge. Meta "From A$100/week · Fixed weekly slot". CTA "See memberships" → `massage.html#mas-pricing` (internal link, not Acuity).
   3. **Training** (`home.svc.s3.*`) — meta "60 min · From A$75/session on plan". CTA → `training.html` (internal).
4. **`#diagnostic`** — `section--dark`. Five-tile body-area picker, see section 5 above.
5. **`#proof`** (no id, `section--cream`) — three real Google reviews in `.testimonials` (Jean / Yumi / Alya). Each card has a verbatim h3 pull-quote, verbatim `<blockquote>`, `<cite>` first name + `.testimonial__source` "via Google" link to Marina's Google Business profile (`https://maps.app.goo.gl/nrZoa67hLrwqB9gm8`). Below the cards: `.reviews-strip` outlined pill (★★★★★ G reviews · Sydney →) to the same profile. Keys `home.proof.t1..t3.{h,q,name}` + `home.proof.viaGoogle` + `home.proof.reviews`. **Never fabricate testimonials** — only quotes Marina has authorized from real reviews.
6. **Disqualifiers** — `section--dark`. Four `.disqualifier` cards (`home.dq.d1..d4`) with `×` mark + h3 + p saying who this work is *not* for (relaxation seekers, rebate seekers, fixed-protocol expectations, aesthetics-only training). h3 level keeps hierarchy aligned with footer.
7. **`#consult`** (no id, `section--pale`) — WhatsApp open-conversation block. `home.consult.h2`/`p`/`cta`. CTA is `wa.me` deep link.
8. **`#faq`** — five Q&A items (`home.faq.q1..q5` / `a1..a5`) with `.faq__search` magnifier-glyph live filter. See section 11.
9. **Footer + mobile sticky bar.**

### 8. Massage page structure (`massage.html`)

- `<header class="page-hero">` — page label + h1/h2/sub, no image.
- **Services section** — three `.service-block` articles in `section--cream`:
  - **Somatic Massage Corporal** (`mas.c.*`) — Marina-developed methodology paragraphs (p1: integrating Brazilian lymphatic drainage, myofascial release, breathwork, deep relaxation; p2: addresses muscular tension, fluid retention, accumulated stress, fascial rigidity → circulation, mobility, body awareness, lightness; p3: nervous-system layer regulates cortisol → reconnects body and mind). `mas.c.cta` → SomaticMassageCorporal Acuity URL; `mas.c.mship.cta` "Make it weekly →" → catalog id=2213824.
  - **Combo strip** between Corporal and Facial — `.combo-strip` advertising 5% off when both are booked the same day (`mas.combo.h`/`mas.combo.p`).
  - **Somatic Massage Facial** (`mas.f.*`) — TMJ + intraoral (buccal) work for jaw tension, headaches, disturbed sleep. `mas.f.cta` → SomaticMassageFacial; `mas.f.mship.cta` → catalog id=2213848.
  - **Sensory Energetics** (`mas.s.*`) — 90-min signature, `.service-block--signature` variant. Three paragraphs covering: integrative method activating CNS; involuntary tremors are normal and discharge tension/regulate stress/lower cortisol/support dopamine; mind-body-emotion reconnection. `mas.s.cta` → SensoryEnergetics; `mas.s.mship.cta` → catalog id=2213845.
- **How to choose** (`mas.choose.*`) — `section--pale`, three `.choose-card` items mapping symptom → recommended service (standard remedial hasn't held → Corporal; jaw/TMJ → Facial; tension keeps coming back → Sensory Energetics).
- **`#mas-pricing`** — `section--cream`, `container--narrow`. Pricing table (`.pricing__row` with name/sub/price) plus the Weekly memberships strip with three `acuity-embed-button` links to the catalog ids. Keys `mas.price.label`/`h2`/`r1.*`/`r2.*`/`book`/`mship.h`/`mship.note`/`mship.corporal`/`mship.facial`/`mship.sensory`.
- **FAQ** — `.faq__search` live filter + `.faq__empty` empty state. Keys `mas.faq.*`.
- Footer + sticky bar.

**Source of truth for pricing** lives in this `mas.price.*` block and the JSON-LD `Service.offers` on `index.html`. If prices change, update both plus the home `home.svc.*.meta` lines and `method.html` modalities.

### 9. Training page structure (`training.html`)

- `<header class="page-hero">` — page label, h1, `tr.hero.sub` (Snap Fitness Maroubra · 60-min sessions · bodywork integrated), `tr.hero.loc` micro-line (Tue+Thu 8am-6pm · Mon/Wed/Fri 8am-11am · Active Snap Fitness membership required), two CTAs (Book Training + "Talk to Marina first" WhatsApp).
- **`#diff`** (no id, `section--cream`) — `tr.diff.*`. Three-paragraph pitch: most trainers can't see what is holding you back; Marina trained in bodywork for 10 years before taking PT clients; result is training that compounds, building strength in actual range.
- **5-phase session structure** — `section--dark`, `tr.struct.label`/`h2` + `.session-structure > .structure-step` × 5 (`tr.struct.s1..s5`):
  1. Stretching, muscle activation, myofascial release
  2. Mobility fundamentals and body awareness
  3. Specific training shaped to your goals
  4. Strengthening, stability, conditioning
  5. Muscle relaxation and breathwork
- **6 specialty chips** — `section--cream`, `tr.spec.label`/`h2` + `.specialty-chips > .specialty-chip` × 6 (`tr.spec.s1..s6`): Hypertrophy / Physical conditioning / Mobility and posture / Strength and stability / Perimenopause and menopause / Mind-body well-being.
- **`#plans`** — `section--pale`. Three-tier `.plan-grid > .plan-card` + `.single-strip` standalone:
  - **Basic** — A$570, A$95/session · 6 sessions · 1x/week · 45-day cycle · MFIT app included. URL `/PTBasic`.
  - **Golden** — `.plan-card__badge` "Most popular". A$1,020, A$85/session · 12 sessions · 2x/week · 2-month cycle · MFIT app included. URL `/PTGolden`.
  - **Diamond** — `.plan-card__badge--alt` "Best value". A$1,800, A$75/session · 24 sessions · 3x/week · 3-month cycle · MFIT app included. URL `/DiamondPTSession`.
  - **Single session** — `.single-strip`. A$99, no commitment. URL `/SinglePTLesson`.
  - All plan CTAs carry `acuity-embed-button`. `tr.plans.sub` and `tr.plan.note` both explain the **client self-serve "Select and make recurring" flow** — clients book their first session, click that option in Acuity, and the same weekday+time repeats for the cycle. Golden clients repeat the action for 2 weekdays; Diamond clients repeat for 3.
- **`#policy`** — `section--cream`, `container--reading`. "Package policy — rescheduling and renewal." Four `.policy-block` subsections (`tr.pol.*` keys): your weekly slot, rescheduling (with a `.policy-list` ul of the four edge cases — <72h reschedule, no-show, calendar full, Marina cancels), auto-renewal, single sessions. Everything is self-serve through the client's Acuity portal — the rules here mirror what's actually configured in Acuity admin (72h reschedule window, 7-day pre-renewal cancellation window). Edits to these rules need to be made in **both** the visible copy and Acuity admin so they stay in lockstep. There is no freeze/pause entitlement — clients who need a longer break cancel auto-renewal (at least 7 days before the cycle ends) and resubscribe when ready.
- **Outcomes** — `section--cream`, three `.outcome` cards (Mobility / Plateau / Perimenopause), keys `tr.outcomes.*`.
- **Snap Fitness note** — `section--pale`, `tr.snap.h`/`p`: all in-person sessions at Snap Fitness Maroubra; active Snap Fitness membership required before first session; Marina is independent and the gym is not responsible for PT services.
- Footer + sticky bar.

**Source of truth for plan pricing** lives in this page's `tr.plan.*` keys and the home JSON-LD `#service-pt.offers` array. Update both together. The `method.html` `method.mod.m4.meta` line ("60 min · From A$75/session on plan") and the home `home.svc.s3.meta` need to stay aligned too.

**Recurring-booking instructions live in two places and must stay in lockstep.** The PT plans are sold without auto-booked sessions — the client has to choose **"Select and make recurring"** themselves on their first booking (and repeat once per training day for Golden/Diamond). The wording `Select and make recurring` appears verbatim in `tr.plans.sub`, `tr.plan.note`, and `tr.pol.slot.p` (EN + PT) so clients reading the site know exactly which button to click, AND in the **Acuity appointment-type Description field** for `PTBasic` / `PTGolden` / `DiamondPTSession` so clients who land on Acuity directly (via WhatsApp, email reminders, bookmarks) see the same instruction above the calendar. If Acuity ever renames that button, update both surfaces. If you change the per-plan series count (Basic 1 / Golden 2 / Diamond 3) or per-series occurrences (6 / 6 / 8), update the visible copy, the Acuity descriptions, and the Acuity appointment-type "max recurrences" setting all together.

### 10. Method page structure (`method.html`)

- `<header class="page-hero">` — no image, page label + h1.
- Long-form fascia explainer (`method.fascia.*`).
- **Modalities grid** (`#mod`, no id; section is `section--cream`) — `method.mod.label`/`h2` + four cards (`.modality-card`) covering the four offerings: Somatic Massage (60 min A$125), KSE Sensory Energetics (90 min A$305 Signature), Conscious Movement (in every session — woven through bodywork and training), Personal Training (60 min from A$75/session on plan, Snap Fitness Maroubra). Each card has `method.mod.m{1..4}.{h,meta,p}` keys; the description explains what each modality solves.
- Diagnostic widget reuses `#diagnostic` markup + the shared `app.js` logic.
- FAQ.
- Footer + sticky bar.

### 11. About page structure (`about.html`)

- `<header class="page-hero about-hero">` — Marina's portrait (`marina-hero.webp`, 1600×1200, fetchpriority high) with overlay text.
- **Bio** — four `<p data-i18n="about.bio.p1..p4">` paragraphs. Source of truth:
  - **Identity:** Marina Ribeiro da Silva, Physical Education professional, **18+ years** dedicated to movement, health, and women's well-being.
  - **Origin:** started through dance, teaching it from age 15; studied Physical Education to professionalise the passion.
  - **Brazil career:** worked with the Minas Gerais government on **Movimenta Contagem** (largest free outdoor physical-activity programme in Brazil). After the pandemic founded **Mulheres Ativas**, a programme for women — particularly over 40, mothers, and those who never felt at home in traditional gyms.
  - **Sydney today:** specialises in women's training across all life stages including perimenopause — conditioning, hypertrophy, mobility, posture, body awareness.
  - **Bodywork:** 10+ years in body therapies; developed her own fascial-release technique combining breath, somatic awareness, and myofascial release.
- **`.about-letter`** — signed Marina quote between bio and credentials. Keys `about.letter.label` / `about.letter.quote` / `about.letter.sign`. Treat the quote as Marina's voice — confirm with the user before rewording.
- **Credentials** (`about.creds.label`/`h2` + `.cred` chips) — eight items, keys `about.cred.1..8`:
  1. EQF Level 4 Personal Trainer
  2. Vanoni Institute · Myo Aponeurosis (40 hours · Italy)
  3. Sensory Energetics Certified
  4. TMJ Mastery
  5. Buccal Massage Specialist
  6. 18+ years working with women's bodies
  7. Bilingual EN + PT
  8. Founder, Mulheres Ativas
- **Partner perks** (`.partner-strip`) — `about.perks.label`/`h` heading, then one or more `.partner-strip` rows. Currently one entry: Be Bold Sydney → 2 months free exclusive access to the Be Bold app + 10% off any Be Bold work. Keys `about.partner.label`/`p`/`link`. New partners stack as additional rows under the same heading; keep the framing on the deal/perk Marina's clients receive, not generic association copy. The `bebold.au` link also appears in the home JSON-LD `LocalBusiness.sameAs`.
- **CTA block** (`about.cta.*`) — Book Massage + Book Training + "Talk to Marina" WhatsApp.
- Footer + sticky bar.

If bio details or credentials change, update **all** of: visible markup in `about.html`, both EN + PT entries in `app.js`, and the `Person` `description`/`hasCredential` in the home JSON-LD graph.

### 12. Sitemap freshness

`sitemap.xml` carries a `<lastmod>` on each indexable URL (home + 4 inner pages). Bump when page content changes meaningfully. `404.html` is intentionally absent.

### 13. Reveal-on-scroll + nav behaviour (progressive enhancement)

- The first line of `app.js`'s IIFE adds `js-on` to `<html>`. Without that class, `.reveal { opacity: 1; transform: none }` — i.e. *content is visible by default*. Only when `js-on` is set do reveals start hidden (`opacity: 0; translateY(24px)`) and animate in when their `IntersectionObserver` adds `is-visible`. This means **SEO crawlers, social-preview bots, screenshot tools, and JS-disabled visitors see the complete page**; only real browsers with JS get the animation. Service-block `clip-path` reveals follow the same pattern (`.js-on .service-block__media img` is the hidden state).
- `.reveal` accepts `stagger-1`..`stagger-6` for cascaded entry timing.
- The fixed `<nav>` toggles a `.scrolled` class past 60px and updates `.active` link state from `section[id]` offsets — new top-level sections should keep an `id` matching the nav anchor or active-state highlighting will skip them.

### 14. Motion language

Beyond reveal-on-scroll:

- **Hero portrait first-paint reveal** — `.hero__media img` + `.about-hero__bg img` get a 1200ms `clip-path: inset(0 0 100% 0) → inset(0 0 0 0)` animation with scale `1.08 → 1` on page load (`@keyframes heroReveal`, 200ms delay).
- **Hero parallax** — `initParallax()` in `app.js` translates `.hero__media` vertically at 8% of scroll, rAF-throttled, scroll-passive. Opt-out via `prefers-reduced-motion: reduce`.
- **Service-block image masked reveal** — `.service-block` gets `is-visible` added by `initMediaReveal()` (IntersectionObserver, 0.18 threshold) which triggers the clip-path animation.
- **Button shine sweep** — `.btn--primary` and `.btn--sand` have a `::after` gradient that translates 120% on hover (750ms cubic-bezier).
- **Cross-document view transitions** — `@view-transition { navigation: auto }` enables soft fade between page navigations on Chromium 126+. `vtFadeOut`/`vtFadeIn` keyframes. Other browsers ignore.
- **Smooth scroll** — `html { scroll-behavior: smooth }` with `@media (prefers-reduced-motion: reduce)` opt-out.
- **Diagnostic tile bounce** — `.diag__tile.is-on .diag__tile-icon { transform: scale(1.08) }` for selected state.

All motion is gated behind `prefers-reduced-motion: reduce` — that media query disables hero animation, service-block clip-path, button shine, and view transitions.

### 15. FAQ live search

Each `.faq` block can have a `.faq__search` input prepended; `initFaqSearch()` filters `.faq__item` children by `textContent` on every input event. An empty-state element `<p class="faq__empty">` (hidden by default) shows when no items match — toggled via `.faq.is-empty`. The input's `placeholder` is translated via `data-i18n-attr="placeholder:faq.search.placeholder"`. The empty-state copy is `faq.search.empty`. The input uses a CSS-mask magnifier glyph as its `::before` so the icon recolors with the input's currentColor.

Currently live on `index.html` and `massage.html`. To add to another FAQ block, insert `.faq__search` + `.faq__empty` at the top of the `.faq` container — `initFaqSearch()` will pick it up automatically.

### 16. Accessibility patterns

- **Skip link** — every page has `<a class="skip-link" href="#main">` as the first child of `<body>`. The first `<header>` on each page carries `id="main" tabindex="-1"` so the link target is focusable. i18n key `a11y.skip`.
- **Focus rings** — global `:focus-visible { outline: 2px solid var(--sand-deep) }`; on the dark home hero, `.hero :focus-visible { outline-color: var(--cream) }` keeps the ring legible against forest green.
- **Heading hierarchy** — no level skips. Footer column headers are `<h3>` so they stay one level below page section h2s. Disqualifier card headers on the home are also `<h3>`. The 404 page uses a small visible `<h2>` ("Where to next?") above the CTA group to avoid jumping from page h1 straight to footer h3s.
- **Drawer button colors** — see the cascade-override gotcha in section 4.
- **`aria-current="page"`** on the active nav link of each page.
- **Lang toggle buttons** carry `aria-pressed="true|false"` reflecting active language, plus `aria-label="English"` / `aria-label="Português"`.

### 17. Performance hints

Every page's `<head>` ships:

- `<link rel="preload" as="image" href="<hero-img>" fetchpriority="high">` for the page's LCP image (home: `hero.webp` with `type="image/webp"`; about: `marina-hero.webp`; other inner pages: none — they don't have a hero image).
- `<link rel="preload" as="image" href="marina-logo.png">` for the nav logo on every page.
- `<link rel="preconnect" href="https://fonts.googleapis.com">` + `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` for the Google Fonts handshake.

LCP images carry `fetchpriority="high" decoding="async"`; below-fold images carry `loading="lazy" decoding="async"`. Nav logos carry `decoding="async"` (not lazy — they're above-fold).

Logo size tokens: `--logo-h: 88px` (desktop), `--logo-h-mobile: 80px`. Nav height is 96px to give the logo breathing room. `marina-logo.png` is intentionally large (~1.5MB) because it's the high-resolution transparent master; it scales down via `width`/`height` attrs in markup. If page-weight ever becomes a concern, regenerate a smaller transparent PNG rather than swapping to the WebP (the WebP has a solid forest background).

### 18. Iconography

Three inline-SVG icon systems are in use (all 1.4px stroke, `currentColor`, no fills):

- **Diagnostic tile icons** (`.diag__tile-icon`, 28×28) — body-area glyphs above each tile label on `#diagnostic`.
- **Home service card icons** (`.svc-card__icon`, 34×34) — ripple / recurring loop / dumbbell above each `.svc-card` on `#services`.
- **Massage service block icons** (`.service-block__icon`, 38×38) — body silhouette / face profile / radiating petals above each service block h2 on `massage.html`.

### 19. Branded 404 page

`404.html` is structured exactly like an inner page (nav + page-hero + footer + WhatsApp float) so Netlify serves it on unknown routes without config. Carries `<meta name="robots" content="noindex">` and no JSON-LD by design. CTAs are service-specific per the discipline rule — "Back to home" + "Book Massage" (not generic "Book a session"). i18n keys: `nf.label`, `nf.h1`, `nf.sub`, `nf.next`, `nf.cta.home`, `nf.cta.book`. The page ships the same pre-paint language hint script, Acuity embed, skip link, and full nav/drawer/footer as the indexable pages.

## Git workflow

- Develop on the feature branch assigned for the session (currently `claude/add-claude-documentation-AzFZQ`).
- Push with `git push -u origin <branch>` and open a draft PR against the default branch.
- Never push directly to `main`; never amend pushed commits; never force-push.
