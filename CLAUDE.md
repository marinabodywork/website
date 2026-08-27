# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A multi-page marketing website for **Marina Bodywork** (Sydney, AU), somatic massage, KSE Sensory Energetics®, and personal training. Live at `https://marinabodywork.com/`.

Bilingual: English (default) + Brazilian Portuguese, switched client-side without a page reload. Choice persists in `localStorage` under key `marinaLang`.

## Stack & layout

There is **no build system, no framework, and no runtime test suite**. Everything ships as static files served as-is. The repo does carry a small `package.json` whose only purpose is to host the **static-check harness** in `scripts/` (run via `npm run check` + `npm run check:html`, also auto-fired by the `.githooks/pre-commit` hook). The harness is plain Node, no bundling. See § _Static-check harness_ near the end of this doc for what each check enforces.

- Six HTML pages at the root: `index.html` (home), `massage.html`, `training.html`, `method.html`, `about.html`, and `404.html` (branded not-found, `<meta name="robots" content="noindex">`). Each carries the same `<nav>` + drawer markup, its own `<head>` (meta, OG, per-page JSON-LD, Acuity embed script), and the same trailing `<script src="app.js" defer>`.
- `styles.css`, single shared stylesheet for all pages.
- `app.js`, single shared script holding the i18n table (`en` + `pt` flat key maps, ~420 keys per language / ~840 total), `setLang`, scroll/reveal/nav behaviour, hamburger drawer, diagnostic widget, FAQ search, hero parallax, and the `js-on` class toggle. **All translations live here, not inline.** First line of the IIFE adds `js-on` to `<html>` so reveal animations are progressive-enhancement only.
- Image assets live flat in the repo root (no `assets/` subfolder), referenced by bare filename. Currently in-use:
  - `marina-headshot.webp`, main brand portrait used as the home page hero (`.hero__media > <img>`, 900×1350, LCP preload target). Doubles as the social-card image: referenced as `og:image` for `index.html` + `method.html` and as `LocalBusiness.image` / `Article.image` / `primaryImageOfPage` in JSON-LD.
  - `massage.jpeg`, used as the `massage.html` `og:image` / `primaryImageOfPage` (the treatments section is now icon-based, so this is its only placement).
  - `facial.jpeg`, ex-Facial feature image. **Now allow-listed in `check-orphan-images.mjs`** (freed up by the icon-based 5-treatment layout; kept on disk to re-place later).
  - `Sensory (2).jpeg`, ex-Sensory feature image. **Now allow-listed in `check-orphan-images.mjs`** (same reason; the parenthesised filename is intentional, and `Sensory (1).jpeg` remains a separate draft).
  - `marina-hero.webp`, `about.html` hero portrait + `og:image`.
  - `marina-hero-action.webp`, `training.html` `og:image` (social-card only, not displayed on-page).
  - `marina-consult.webp`, home `#consult` section thumbnail.
  - `ChatGPT Image May 18, 2026, 02_42_52 PM.png`, anatomical fascia illustration on `method.html` (URL-encoded in markup).
  - `certificate.jpeg`, Marina's KSE certification image on `method.html`.
  - `marina-logo.png`, **transparent-background** version of the brand mark used in the nav and footer of every page (the gold mark + wordmark floats directly on the dark forest nav with no boxed sticker effect). Generated from `marina-logo.webp` via a luminance-based alpha mask.
  - `marina-logo.webp`, favicon + `apple-touch-icon` (solid forest bg is fine because favicons need an opaque colour).
  - `flag-au.svg`, `flag-br.svg`, flag glyphs used in the language toggle (NOT emojis; SVG so the button shape stays controllable).
  - `be-bold-logo.png`, Be Bold Sydney partner logo on `about.html`'s `.partner-strip`.
- `robots.txt`, `sitemap.xml`, SEO files at the root. The sitemap lists all five indexable pages (home + four inner pages). `404.html` is intentionally omitted (`noindex`). Each URL carries a `<lastmod>`, bump on meaningful content changes.

Loose unused image files at the root (`atendimento.jpeg`, `hero.webp`, `marina-fingers.webp`, `marina-massage-content.webp`, `marina-pointing.webp`, `marina-portrait.webp`, `ogimage.png`, `Sensory (1).jpeg`) are legacy/unreferenced, leave them alone unless the user asks. Same for `Screenshot *.jpg`, `WhatsApp Image *.jpeg`, `Untitled (...).png` uploads. The orphan set is tracked by `scripts/check-orphan-images.mjs`; new orphan files will fail the check, so either reference them or add to that script's `KNOWN_ORPHANS` allow-list.

## Local development

```bash
# Just open the file:
xdg-open index.html        # or: open index.html (macOS)

# Or serve over HTTP (recommended, some browsers gate localStorage / fonts on file://):
python3 -m http.server 8000
# then visit http://localhost:8000/
```

There are no lint, build, or test commands.

## Big-picture architecture

Each HTML page is structured top-to-bottom as: `<head>` (charset/viewport → pre-paint lang script → meta/OG → JSON-LD → fonts → `styles.css` → Acuity embed CSS+JS) → `<body>` (skip-link → shared nav → mobile drawer → page-specific `<section>` blocks → footer → mobile sticky CTA → WhatsApp float on most pages) → `<script src="app.js" defer>`. Shared CSS lives in `styles.css`; shared behaviour and the i18n table live in `app.js`.

Things worth knowing before editing:

### 1. Design system in `styles.css`

CSS custom properties in `:root`, `--forest`, `--sand`, `--sand-deep`, `--cream`, `--cream-warm`, `--ink`, `--fog`, `--line`; display font `Cormorant Garamond` + body font `DM Sans`; spacing scale `--s-1`..`--s-7`; radius scale `--r`/`--r-lg`. Section background variants (`section--dark` = forest, `section--cream` = cream, `section--pale` = cream-warm, `section--surface` = subtle gradient) drive vertical rhythm; respect them when adding sections.

### 2. Client-side i18n via `data-i18n` keys

- `app.js` declares a single `const i18n = { en: {...}, pt: {...} }` table with **flat** dotted-path keys (e.g. `'home.hero.sub'`, `'tr.plan.golden.price'`, `'mas.c.p1'`), not a nested object.
- Every translatable element in the markup carries `data-i18n="some.key"`. `setLang(lang)` walks `[data-i18n]` and replaces `el.innerHTML` (so HTML tags like `<br>`, `<strong>`, `<sup>` inside translation values are intentional and must be preserved in both languages).
- Choice persists in `localStorage` under `marinaLang` and `setLang` flips `document.documentElement.lang` to `en` or `pt-BR`.

**Translating HTML attributes**, use `data-i18n-attr="attr:key,attr:key"`. Currently powers the hamburger `aria-label` (key `nav.menu`) and the FAQ `<input>` placeholder (key `faq.search.placeholder`). See `setLang` in `app.js` for the parser.

**Pre-paint language hint**, every page has an inline `<script>` at the very top of `<head>` that reads `localStorage.getItem('marinaLang')`; if it is `pt`, it sets `document.documentElement.lang = 'pt-BR'` and adds class `lang-pending`. CSS rule `html.lang-pending body { visibility: hidden; }` keeps the body hidden for up to 800ms while `app.js` translates, preventing an EN flash for returning PT visitors. The timeout-based cleanup runs in inline script and `setLang` also removes the class. **Do not remove this block** when editing `<head>`.

**When adding/changing user-facing copy:** add the `data-i18n` attribute in the relevant HTML page, then add the key to **both** the EN and PT objects in `app.js`. A missing key in one language silently leaves the original markup text in place.

### 3. Booking flow: Acuity embed-modal (in-site popup)

Every page's `<head>` loads the Acuity embed button:

```html
<link rel="stylesheet" href="https://embed.acuityscheduling.com/embed/button/39322566.css" id="acuity-button-styles">
<script src="https://embed.acuityscheduling.com/embed/button/39322566.js" async></script>
```

Every booking CTA on the site that points to an Acuity URL carries class `acuity-embed-button`. The Acuity script intercepts clicks on those anchors and opens the booking flow inside an in-site modal overlay instead of navigating to a new tab. We keep `target="_blank" rel="noopener"` on every such link as a safe fallback for when the Acuity script fails to load (network policy, ad-blocker, etc.).

**When introducing a new booking CTA, always include the `acuity-embed-button` class** alongside `btn--primary`/`btn--sand`/etc. Internal links (e.g. `training.html`, `#mas-pricing`) do not get the class. The diagnostic widget renders its CTA dynamically in `app.js` and conditionally adds the class for non-internal areas, preserve that logic in `renderDiag()`.

**Acuity URL inventory**, every service has a dedicated URL; the hub URLs (`/bookmassage`, `/BookPTlessons`) are only used in nav/hero/drawer/sticky/footer as generic entry points.

**Pricing principle: every visible total is "cabalistic"** — its digits sum to 8. Examples: 116→1+1+6=8, 107→1+0+7=8, 224→2+2+4=8, 404→4+0+4=8, 710→7+1+0=8, 1007→1+0+0+7=8, 125→1+2+5=8. Per-session display rates derived by dividing the total (e.g. A$101 / A$88.75 / A$83.92 for PT plans) don't need to sum to 8 — only the headline prices do. When changing prices, preserve this rule. Marina cares about it.

| Service | URL slug |
|---|---|
| Massage hub | `marinaribeirobodywork.as.me/bookmassage` |
| Somatic Massage Corporal (60 min · A$125) | `.../SomaticMassageCorporal` |
| Somatic Massage Facial (60 min · A$125) | `.../SomaticMassageFacial` |
| Sensory Energetics (60 min · A$224 launch / A$305 regular) | `.../SensoryEnergetics` |
| PT hub | `marinaribeirobodywork.as.me/BookPTlessons` |
| Single PT lesson (A$116) | `.../SinglePTLesson` |
| Physical assessment (A$107 standalone) | `.../Assessment` |
| Online consultancy (A$107 / 6 weeks, recurring) | `marinaribeirobodywork.as.me/?appointmentType=93324053` |
| PT memberships (Basic / Golden / Diamond), single catalog landing | `https://app.acuityscheduling.com/catalog.php?owner=39322566&category=Personal+Training+-+Memberships` |
| MFIT add-on for Basic clients (A$107, no Acuity URL yet) | WhatsApp deep link only |

**Per-service membership catalog URLs**, weekly memberships are sold through Acuity's catalog (cart) endpoint with the per-service `id`:

```
https://app.acuityscheduling.com/catalog.php?owner=39322566&action=addCart&clear=1&id={id}
```

| Membership | `id` | Price |
|---|---|---|
| Weekly Corporal | `2213824` | A$107/session |
| Weekly Facial | `2213848` | A$107/session |
| ~~Weekly Sensory Energetics~~ (currently disabled) | `2213845` | n/a — Sensory only sold as single during launch |
| Ultimate (limited May + Jun 2026) | `2215320` | A$107/week (A$428/4-week cycle) |

These appear on `massage.html`'s service blocks ("Make it weekly →" secondary CTAs on Corporal + Facial only — Sensory has no membership during launch, only the single-session CTA) and on the `#mas-pricing` Weekly memberships strip (which lists Corporal and Facial only). The home `home.svc.s2` Memberships card links to `massage.html#mas-pricing` (not WhatsApp).

**WhatsApp**, open-conversation CTAs use `https://wa.me/61451021478?text=...`. The home `#consult` section and "Talk to Marina first →" links use these.

**Booking CTA discipline:** every primary booking CTA on the page is service-specific, either "Book Massage" or "Book Training". Do not introduce a generic "Talk to Marina" / "Book a session" duplicate next to the service-specific buttons; the dedicated WhatsApp consult is the canonical place for an open conversation. The mobile sticky bar mirrors the hero buttons exactly.

If the phone, booking URLs, membership ids, or pricing change, update them in **all** of: the visible CTAs across every page, the JSON-LD `Service.offers` blocks on `index.html`, and the i18n table.

### 4. Nav, drawer, and language toggle

The top-level `<nav class="nav">` has a `.nav__inner` row with four logical groups:

1. `.nav__logo`, `marina-logo.png` (88×88 desktop / 80×80 mobile)
2. `.nav__links`, desktop only, anchors to inner pages (Method / Massage / Training / About). `aria-current="page"` on the active page.
3. `.nav__right`, in order: two CTA buttons (`.nav__cta` "Book Massage" sand + `.nav__cta.nav__cta--alt` "Book Training" forest, both `acuity-embed-button`), the `.lang` toggle (**always visible** on desktop and mobile), and the hamburger (mobile only).
4. `.hamburger`, mobile-only, lives inside `.nav__right`. `aria-label` is localized via `data-i18n-attr="aria-label:nav.menu"`.

Both nav CTAs hide on mobile (`@media (max-width: 900px) { .nav__cta { display: none; } }`); the mobile drawer (`#drawer`) carries the same two buttons as `.btn--primary` + `.btn--sand` plus the four inner-page links.

The lang toggle uses **inline flag SVGs**, `flag-au.svg` for `data-lang="en"` and `flag-br.svg` for `data-lang="pt"`, with `aria-label="English"` / `aria-label="Português"` for screen readers. i18n keys for nav CTAs: `nav.bookMassage`, `nav.bookTraining`.

**Drawer button cascade gotcha:** `.drawer a` sets `color: var(--forest)` for all drawer links, which has *higher specificity* than `.btn--primary` (forest bg, sand text). Without override, the "Book Massage" pill in the drawer renders forest-on-forest = invisible. The site ships `.drawer .btn--primary { color: var(--sand); }` and `.drawer .btn--sand { color: var(--forest); }` to win the cascade. Keep those rules if you touch the drawer styles.

### 5. The diagnostic widget (home + method)

`#diagnostic` is driven by `DIAG_AREAS` + `DIAG_URLS` in `app.js`. Five areas: `neck`, `jaw`, `back`, `stress`, `training`. Each tile is a `<button class="diag__tile" data-area="<key>">` with an inline SVG icon (`.diag__tile-icon`) above a label (`.diag__tile-label`). Clicking a tile populates `#diagResult` with the service name, "why" copy, tag pills, and an `<a class="btn btn--primary">` that points to the area-specific Acuity URL (the booking link is rendered inside `#diagResult`, not a separate `#diagBook` element).

Non-`training` areas get the `acuity-embed-button` class on the dynamically rendered CTA (in-site modal); the `training` area links to internal `training.html#plans` instead. i18n keys: `diag.tile.<area>` / `diag.<area>.name` / `diag.<area>.why` / `diag.<area>.tags` / `diag.<area>.cta`.

### 6. JSON-LD must stay in sync with visible content

**Every page** ships its own JSON-LD `@graph` at the top of `<head>`:

- **`index.html`** declares the canonical entities used everywhere:
  - `LocalBusiness` (`@id` `#business`), includes phone, email, `priceRange`, `address` (Randwick NSW AU), `areaServed` (Sydney + Maroubra + Randwick), three `OpeningHoursSpecification` entries (massage afternoons Mon/Wed/Fri 13:00–18:00, PT Tue/Thu 08:00–18:00, PT mornings Mon/Wed/Fri 08:00–11:00), `sameAs` (Instagram, Google profile, `bebold.au`), `founder` → `#marina`.
  - `Person` (`@id` `#marina`), Marina Ribeiro da Silva, with full `description` and `hasCredential` array of 5 EducationalOccupationalCredentials.
  - Six `Service` entries with explicit `@id`s and `offers` (five bodywork treatments + PT):
    - `#service-myofascial` (A$125, `/bookmassage` hub URL)
    - `#service-lymphatic` (A$125, `/bookmassage` hub URL)
    - `#service-corporal` (A$125, SomaticMassageCorporal — the "Somatic Massage" treatment, alternateName "Somatic Release Massage")
    - `#service-facial` (A$125, SomaticMassageFacial)
    - `#service-sensory` (A$224 launch price; offer carries a `description` noting regular A$305)
    - `#service-pt`, has multiple `offers` (Single A$116 with SinglePTLesson URL, plus Basic A$404 / Golden A$710 / Diamond A$1,007 monthly memberships pointing to the PT memberships catalog category URL; each plan offer carries `priceSpecification` with `billingDuration: P28D`)
  - `WebSite` (`@id` `#website`) with `inLanguage: ["en","pt-BR"]`.
- **Inner pages** ship compact `@graph`s that reference the home's canonical entities by `@id` (no duplication):
  - `method.html` → `WebPage` + `BreadcrumbList` + `Article` ("It is all fascia") with Marina as author.
  - `massage.html` → `WebPage` whose `mainEntity` is an `ItemList` of the five bodywork service `@id`s (myofascial, lymphatic, corporal, facial, sensory) + `BreadcrumbList`.
  - `training.html` → `WebPage` with `mainEntity = #service-pt` + `BreadcrumbList`.
  - `about.html` → `AboutPage` with `mainEntity = #marina` + `BreadcrumbList`.
- **`404.html`** has no JSON-LD by design (it's `noindex`).

When prices, services, opening hours, area served, or credentials change in the visible copy, update the JSON-LD too, it's what Google reads. Service `offers.url` should match the per-service Acuity URL, not the hub.

### 7. Home page structure (`index.html`)

Section order top-to-bottom:

1. **`<header class="hero">` `#main`**, h1 in four lines (`home.hero.h1.a..d`), sub (`home.hero.sub`), two service-specific CTAs, "Talk to Marina first" WhatsApp link, hero `<picture>` (WebP + JPG fallback).
2. **`#system`**, `section--dark`. Three-card combo grid (`.combo-grid > .combo-card`, with `.combo-card--winner` on the third) explaining why massage alone fails / training alone plateaus / Marina's combined system works. Keys `home.combo.label`/`h2`/`intro`/`c1.*`/`c2.*`/`c3.*`/`close`/`cta`. The CTA anchors to `#services`.
3. **`#services`**, two service cards in `.svc-grid.svc-grid--two`, each containing two internal option rows (`.svc-options > .svc-option` × 2). Section header uses `home.svc.h2` ("Two services. Two ways to start.") + `home.svc.sub`.
   1. **Massage** (`home.svc.massage.*`) — the card lists the five bodywork treatments as a `.svc-card__tags` chip row (`home.svc.massage.t1..t5`: Myofascial Release / Brazilian Lymphatic Drainage / Somatic Massage / Facial Massage / KSE Sensory Energetics) above two options:
      - Single session (`home.svc.massage.single.*`), `acuity-embed-button` on `.svc-option` → `/bookmassage` hub.
      - Weekly membership (`home.svc.massage.mship.*`), carries SIGNATURE badge as `.svc-option__badge`. Internal link → `massage.html#mas-pricing` (not Acuity).
   2. **Personal Training** (`home.svc.pt.*`) with two options:
      - Single session (`home.svc.pt.single.*`), `acuity-embed-button` on `.svc-option` → `/SinglePTLesson`.
      - Monthly plan (`home.svc.pt.plan.*`), internal link → `training.html#plans` (the plans section, not the page top).
   The two-up grid uses `.svc-grid--two` (max-width 920px, centered) for the 2-column layout; `.svc-option` rows are clickable card-links with name + meta + arrow indicator. Collapses to one column under 900px.
   Below the two cards (still inside `#services`) sits an **Ultimate-promo aside** (`.ultimate-promo`, keys `home.ultimate.*` — badge / h / sub / includes / price / worth / cta.book / cta.reserve / cta.details). Limited-window banner for the Ultimate weekly massage membership (May + Jun 2026 only, A$107/week, Acuity catalog id `2215320`). "Start your Ultimate →" CTA is `btn--sand acuity-embed-button` (catalog checkout); "Reserve your slot on WhatsApp →" (`cta.reserve`) is a `btn--primary` → `wa.me/61451021478` for the pay-then-reserve second step; "See the full breakdown →" link points to `massage.html#mas-pricing`. The block is also surfaced as a richer `.ultimate-card` on `massage.html` — see § 8.
4. **`#home-memberships`**, `section--cream`, sits between `#services` and `#diagnostic`. Compact highlight for the prepaid Emerald/Diamond packs — two `.home-gem-card` links (`.home-gem-grid`, 2-up) each with name + meta + "From A$… upfront", plus a `btn--primary` "See the memberships →". All three links are **internal** to `massage.html#mas-memberships` (not Acuity, no `acuity-embed-button`). Keys `home.gem.*`. The packs themselves live on `massage.html` (§8); this is only a pointer, so it carries no JSON-LD.
5. **`#diagnostic`**, `section--dark`. Five-tile body-area picker, see section 5 above.
6. **`#proof`** (no id, `section--cream`), three real Google reviews in `.testimonials` (Jean / Yumi / Alya). Each card has a verbatim h3 pull-quote, verbatim `<blockquote>`, `<cite>` first name + `.testimonial__source` "via Google" link to Marina's Google Business profile (`https://maps.app.goo.gl/nrZoa67hLrwqB9gm8`). Below the cards: `.reviews-strip` outlined pill (★★★★★ G reviews · Sydney →) to the same profile. Keys `home.proof.t1..t3.{h,q,name}` + `home.proof.viaGoogle` + `home.proof.reviews`. **Never fabricate testimonials**, only quotes Marina has authorized from real reviews.
7. **Disqualifiers**, `section--dark`. Four `.disqualifier` cards (`home.dq.d1..d4`) with `×` mark + h3 + p saying who this work is *not* for (relaxation seekers, rebate seekers, fixed-protocol expectations, aesthetics-only training). h3 level keeps hierarchy aligned with footer.
8. **`#consult`** (no id, `section--pale`), WhatsApp open-conversation block. `home.consult.h2`/`p`/`cta`. CTA is `wa.me` deep link.
9. **`#faq`**, eight Q&A items (`home.faq.q1..q8` / `a1..a8`) with `.faq__search` magnifier-glyph live filter. See section 15. Items in order: why combine bodywork + PT (q1), do you need a diagnosis (q2), what happens in the first session (q3), how soon you feel a difference (q4), why A$125 is more than standard remedial (q5), private-health insurance (q6, "no, not registered"), first-session guarantee (q7, 24h WhatsApp → rework / refer / refund), can you do both massage + PT (q8). `home.faq.a7` is reused verbatim on `massage.html` inside the `.guarantee` strip — keep both copies in lockstep when editing.
10. **Footer + mobile sticky bar.**

### 8. Massage page structure (`massage.html`)

- `<header class="page-hero">`, page label + h1/h2/sub, no image.
- **"Choose your treatment" section** (`mas.svc.label`/`h2`/`sub`), `section--cream`, `container--narrow`. A `.treatments` column of **five `.treatment-card` articles** (icon + name + `60 min · price` meta + three `.treatment-card__block` What / Who / Benefits paragraphs + one Acuity `Book Massage` CTA). These are the five bodywork treatments from Marina's "Choose your treatment" card, all A$125 / 60 min except Sensory. Keys under `mas.t.*`: shared labels `mas.t.q.what`/`q.who`/`q.benefits`/`book`/`disclaimer`, then per treatment `mas.t.<myo|lymph|somatic|facial|sensory>.{name,meta,what,who,benefits}`. Booking CTAs (Acuity, all `acuity-embed-button`): Myofascial + Lymphatic → the `/bookmassage` hub (no dedicated slug); Somatic → SomaticMassageCorporal; Facial → SomaticMassageFacial; Sensory → SensoryEnergetics.
  - **KSE Sensory Energetics** uses `.treatment-card--signature` and adds `.service-block__badges` (`.service-block__badge` Signature + `.service-block__badge--launch` Launch price) plus a `.service-block__launch-note` restating the regular A$305. **Launch pricing A$224 (regular A$305).** Extra keys `mas.t.sensory.{badge,launchbadge,launchnote}`. (The `service-block__badge--launch` and `pricing__note--launch` class tokens must stay on the page — `check-pricing` asserts them.)
  - A `.treatment-disclaimer` line closes the section (`mas.t.disclaimer`, "A complementary wellness practice; not a substitute for medical or psychological care.").
  - The five treatment photos are **icon-based, not photographed** — only `massage.jpeg` (Somatic) has a placement (it stays referenced as the massage.html `og:image`); `facial.jpeg` and `Sensory (2).jpeg` are now allow-listed in `check-orphan-images.mjs` (kept on disk to re-place per treatment later). The old per-service blocks/keys (`mas.c.*`/`mas.f.*`/`mas.s.*`) and the "How to choose" section (`mas.choose.*`) were removed in this restructure. The weekly-membership "Make it weekly →" per-card CTAs were dropped; the catalog ids `2213824`/`2213848` now surface only in the `#mas-pricing` Weekly memberships strip.
- **`#mas-pricing`**, `section--cream`, `container--narrow`. Pricing table (`.pricing__row` with name/sub/price) plus the Weekly memberships strip with two `acuity-embed-button` links to the catalog ids (Corporal + Facial at A$107/session each; Sensory weekly is omitted during the launch). Sensory row carries `mas.price.r2.note` ("Limited launch rate. Returns to A$305") below the price, rendered via the new `.pricing__note--launch` style. Keys `mas.price.label`/`h2`/`r1.*`/`r2.*`/`r2.note`/`book`/`mship.h`/`mship.note`/`mship.corporal`/`mship.facial`/`mship.reserve`. The memberships are **pay-then-reserve**: `mship.note` tells the client that after paying they message Marina on WhatsApp to reserve their day + time, and a `mas.price.mship.reserve` WhatsApp CTA (`.btn--primary` → `wa.me/61451021478`) sits below the two catalog buttons.
  - Directly below the memberships strip sits the **Ultimate card** (`.ultimate-card`, keys `mas.price.ultimate.*`). Limited-window weekly massage membership (May + Jun 2026 only, closes to new sign-ups 30 Jun 2026; locked slots keep the rate after that). A$107/week (A$428 every 4 weeks; worth A$680 at single-session rates), Acuity catalog id `2215320`. The card renders a `<ol class="ultimate-card__weeks">` 4-week journey (Week 1 Corporal → Week 2 Facial → Week 3 Sensory Energetics → Week 4 Corporal), keys `mas.price.ultimate.w1..w4.{label,h,p}`. Other Ultimate keys: `badge`/`h`/`sub`/`price`/`cycle`/`worth`/`journey`/`scarcity`/`terms`/`cta`/`reserve`. Pay-then-reserve like the weekly memberships: the primary `btn--primary acuity-embed-button` CTA ("Start your Ultimate →", key `cta`) → catalog id `2215320`, followed by a `btn--sand` WhatsApp CTA ("Reserve your weekly slot on WhatsApp →", key `mas.price.ultimate.reserve` → `wa.me/61451021478`).
  - Immediately under the Ultimate card sits the **First-session guarantee** strip (`.guarantee`), reusing the home FAQ key `home.faq.a7` (24-hour WhatsApp → rework / refer / refund). Visible label "First-session guarantee" is currently hard-coded English text in markup (no `data-i18n`), the body is translated.
- **`#mas-memberships`**, `section--dark`, sits between `#mas-pricing` and the FAQ. Prepaid **session-pack memberships** (distinct from the weekly/Ultimate recurring memberships above and from the PT plans on `training.html`). Two `.gem-card` tiers in a `.gem-grid` (2-up, collapses to 1 under 640px), **Emerald first (left), Diamond second (right)** to match the source card. Each card = name + `.gem-card__tagline` + `.gem-card__rows` (commitment/frequency · total sessions · per-session) + `.gem-card__pay` (weekly price · `.gem-card__total` upfront-with-5%-off · `.gem-card__full` full price) + `.gem-card__worth` savings-vs-single pill + `.gem-card__feats` (who can use · freeze · validity):
  - **Emerald** (`.gem-card--emerald`, tagline "Focus. Consistency. Lasting results."): 10 weeks · 1 session/week · 10 sessions · A$107/session · A$107/week · **A$1,070 total** · Individual only (1 person) · **choose up to 2 services, Sensory Energetics not included** · freeze up to 2 weeks · valid up to 12 weeks · worth A$1,250, saves A$180.
  - **Diamond** (tagline "More freedom. A more complete journey."): 10 weeks · 2 sessions/week · 20 sessions · A$89/session · A$178/week · **A$1,780 total** · up to 2 people on the same plan · **all 5 services, including Sensory Energetics** · freeze up to 2 weeks · valid up to 12 weeks · worth A$2,500, saves A$720.
  - There is **no upfront/5% discount** (an earlier draft had one; Marina's final card dropped it, so the total is the only price). Each card shows a `.gem-card__pay` block (total + per-week), a `.gem-card__worth` savings pill, and a `.gem-card__feats` list (who / services / freeze / valid).
  - Below the cards: a `.gem-note` "Important" box (the 2-week freeze adds no sessions, only extends the window to finish the 10/20 sessions; each plan valid up to 12 weeks), a `.gem-benefits` list (priority booking / member rates / personalised journey / offers + gifts), a `.gem-pay` note (**payment by bank transfer or cash**, no Acuity), a `.gem-scarcity` line, and a single WhatsApp CTA (`wa.me/61451021478`, "Secure your place →"). **No Acuity/online checkout** (arranged over WhatsApp), so the CTA is intentionally not an `acuity-embed-button`. Keys `mas.gem.*`.
  - **Pricing note:** only Emerald's A$1,070 total obeys the cabalistic (digit-sum-8) rule and is registered in `check-pricing.mjs`'s `HEADLINE_PRICES`. **Diamond's figures (A$89 / A$178 / A$1,780) are intentional exceptions kept at Marina's request**, deliberately left out of `HEADLINE_PRICES` (see the comment there); don't "fix" them without confirming with Marina.
- **FAQ**, `.faq__search` live filter + `.faq__empty` empty state. Keys `mas.faq.*`.
- Footer + sticky bar.

**Source of truth for pricing** lives in this `mas.price.*` block and the JSON-LD `Service.offers` on `index.html`. If prices change, update both plus the home `home.svc.*.meta` lines and `method.html` modalities. The prepaid Diamond/Emerald packs (`mas.gem.*`) are massage-only and self-contained — they have no JSON-LD `Service.offers` entry.

### 9. Training page structure (`training.html`)

- `<header class="page-hero">`, page label, h1, `tr.hero.sub` (Snap Fitness Maroubra · 60-min sessions · bodywork integrated), `tr.hero.loc` micro-line (Tue+Thu 8am-6pm · Mon/Wed/Fri 8am-11am · Active Snap Fitness membership required), two CTAs (Book Training + "Talk to Marina first" WhatsApp).
- **`#diff`** (no id, `section--cream`), `tr.diff.*`. Three-paragraph pitch: most trainers can't see what is holding you back; Marina trained in bodywork for 10 years before taking PT clients; result is training that compounds, building strength in actual range.
- **5-phase session structure**, `section--dark`, `tr.struct.label`/`h2` + `.session-structure > .structure-step` × 5 (`tr.struct.s1..s5`):
  1. Stretching, muscle activation, myofascial release
  2. Mobility fundamentals and body awareness
  3. Specific training shaped to your goals
  4. Strengthening, stability, conditioning
  5. Muscle relaxation and breathwork
- **6 specialty chips**, `section--cream`, `tr.spec.label`/`h2` + `.specialty-chips > .specialty-chip` × 6 (`tr.spec.s1..s6`): Hypertrophy / Physical conditioning / Mobility and posture / Strength and stability / Perimenopause and menopause / Mind-body well-being.
- **`#plans`**, `section--pale`. Plans are sold as **monthly memberships, billed every 4 weeks**. Three-tier `.plan-grid > .plan-card` + `.single-strip` standalones:
  - **Basic**, A$404/month (A$101/session × 4 sessions/month) · 1x/week, same weekday + time · **2-month minimum** · freeze 1 week per minimum period. Live sessions only. MFIT app available as add-on (see `tr.mfit.*`).
  - **Golden**, `.plan-card__badge` "Most popular". A$710/month (A$88.75/session × 8 sessions/month) · 2x/week, same weekdays + times · **2-month minimum** · freeze 2 weeks per minimum period · MFIT app programming included (no physical assessment).
  - **Diamond**, `.plan-card__badge--alt` "Best value". A$1,007/month (A$83.92/session × 12 sessions/month — total is exact, per-session is rounded display) · 3x/week, same weekdays + times · **3-month minimum** · freeze 3 weeks per minimum period · MFIT app + **physical assessment** both included.
  - All three plan-card CTAs ("Start membership") point to the **PT memberships catalog category URL** (`https://app.acuityscheduling.com/catalog.php?owner=39322566&category=Personal+Training+-+Memberships`), where the client picks the plan inside Acuity's catalog UI. The legacy per-plan appointment-type URLs (`/PTBasic`, `/PTGolden`, `/DiamondPTSession`) are no longer linked from the site.
  - **Single session**, `.single-strip`, framed as the way to **test the work before committing to monthly**. A$116, no commitment. URL `/SinglePTLesson`.
  - **Physical assessment**, second `.single-strip` directly below the single session. A$107 standalone movement/posture/strength assessment with Marina. Included with Diamond, optional one-off for Basic/Golden clients (or anyone curious). CTA uses the Acuity URL `marinaribeirobodywork.as.me/Assessment` with `acuity-embed-button` (in-site modal). Keys `tr.assess.{name,sub,price,cta}`. Visible copy intentionally omits the session length per Marina's request.
  - **MFIT add-on**, third `.single-strip` below the assessment. A$107 add-on for Basic-plan clients who want app programming on top of their live sessions. Already bundled into Golden and Diamond — this strip exists only to give Basic clients an entry point. **No Acuity URL yet**; CTA is a WhatsApp deep link (`wa.me/61451021478?text=...`) so the customer messages Marina to add it manually. When Marina configures an Acuity product, swap the CTA href and add the `acuity-embed-button` class. Keys `tr.mfit.{name,sub,price,cta}`.
  - **Online consultancy**, fourth `.single-strip` below MFIT. A$107 every 6 weeks, auto-renewing, for online video check-ins with Marina to review progress and adjust the training program. Designed for clients training remotely (away from Snap Fitness Maroubra). CTA uses the Acuity URL `marinaribeirobodywork.as.me/?appointmentType=93324053` with `acuity-embed-button` (in-site modal). The query-string form is used here because the appointment-type lives on the default Acuity scheduler rather than at a named slug. Keys `tr.consult.{name,sub,price,cta}`.
  - The transferable-membership rule lives in the `#policy` section (`tr.pol.commit.p3`), not on the plan cards.
  - All plan-card CTAs carry `acuity-embed-button` (catalog checkout). CTA label is "Start membership" (`tr.plan.book`); single session CTA is "Book single session" (`tr.single.cta`). `tr.plans.sub` and `tr.plan.note` both explain the **pay-then-reserve flow**: the client pays for the membership through the catalog, then messages Marina on WhatsApp to reserve their weekday + time, and Marina locks in the recurring slot for the length of the membership (Golden = 2 weekly slots, Diamond = 3). Below the plan note sits a **WhatsApp reserve CTA** (`.btn--primary` → `wa.me/61451021478`, label "Reserve your training slot on WhatsApp →", key `tr.plan.reserve`) so the client can do that second step directly.
- **`#policy`**, `section--cream`, `container--reading`. "Membership policy, billing, slot, minimum, and transfer." Six `.policy-block` subsections (`tr.pol.*` keys), `stagger-1` through `stagger-6`: your weekly slot, rescheduling (with a `.policy-list` ul of the four edge cases, <72h reschedule, no-show, calendar-full-in-current-month, Marina cancels), **monthly billing** (4-week charge cycle, 7-day pre-renewal cancellation window after minimum), **minimum commitment and transfer** (2-month / 3-month floor + transfer-to-friend-not-refund rule for cancellations inside the minimum), emergency freeze (1/2/3 weeks per Basic/Golden/Diamond, once per minimum period), single sessions (no membership / no freeze / no transfer, used to test the work). Everything is self-serve through the client's Acuity portal, the rules here mirror what's actually configured in Acuity admin (recurring-billing subscription, 72h reschedule window, 7-day pre-renewal cancellation window, per-plan minimum-period freeze entitlement, transfer-membership flow). Edits to these rules need to be made in **both** the visible copy and Acuity admin so they stay in lockstep.
- **Outcomes**, `section--cream`, three `.outcome` cards (Mobility / Plateau / Perimenopause), keys `tr.outcomes.*`.
- **Snap Fitness note**, `section--pale`, `tr.snap.h`/`p`: all in-person sessions at Snap Fitness Maroubra; active Snap Fitness membership required before first session; Marina is independent and the gym is not responsible for PT services.
- Footer + sticky bar.

**Source of truth for plan pricing** lives in this page's `tr.plan.*` keys and the home JSON-LD `#service-pt.offers` array (which carries the monthly `price` plus a `priceSpecification` with `billingDuration: P28D`). Update both together. The `method.html` `method.mod.m4.meta` line ("60 min · Monthly plans · From A$83.92/session") and the home `home.svc.pt.{single,plan}.meta` lines need to stay aligned too.

**Membership model details (kept in lockstep with Acuity).** Plans are subscription products billed every 4 weeks. Headline totals: A$404 / A$710 / A$1,007 for Basic / Golden / Diamond (all sum-of-digits = 8, per Marina's "cabalistic" pricing principle). Per-session display rates derived from the totals: A$101 / A$88.75 / A$83.92 (these do not need to sum to 8 — only the totals do). Minimum commitment is 2 months on Basic and Golden, 3 months on Diamond. Cancellation inside the minimum is **transfer-to-a-friend, no refund**, the visible copy in `tr.pol.commit.*` and `tr.plan.note` mirrors what Acuity admin enforces. After the minimum, clients cancel themselves through the Acuity portal with at least 7 days notice before the next billing date. All 3 plan-card "Start membership" CTAs point to a single **catalog category URL** (`catalog.php?owner=39322566&category=Personal+Training+-+Memberships`) where the client picks Basic / Golden / Diamond from inside Acuity's catalog. **Scheduling is pay-then-reserve**: after paying, the client contacts Marina on WhatsApp (`tr.plan.reserve` / `tr.pol.slot.p`) and Marina reserves the recurring weekday + time — Basic 1 / Golden 2 / Diamond 3 weekly slots — for the length of the membership (this replaces the old client-self-serve "Select and make recurring" flow, which is no longer referenced anywhere on the site). The same pay-then-reserve-on-WhatsApp step applies to the massage weekly memberships and the Ultimate package (`mas.price.mship.reserve` / `mas.price.ultimate.reserve` / `home.ultimate.cta.reserve`).

### 10. Method page structure (`method.html`)

- `<header class="page-hero">`, no image, page label + h1.
- Long-form fascia explainer (`method.fascia.*`).
- **Modalities grid** (`#mod`, no id; section is `section--cream`), `method.mod.label`/`h2` + four cards (`.modality-card`) covering the four offerings: Somatic Massage (60 min A$125), KSE Sensory Energetics (60 min A$224 Signature · Launch price; reverts to A$305 after launch window), Conscious Movement (in every session, woven through bodywork and training), Personal Training (60 min from A$83.92/session on plan, Snap Fitness Maroubra). Each card has `method.mod.m{1..4}.{h,meta,p}` keys; the description explains what each modality solves.
- Diagnostic widget reuses `#diagnostic` markup + the shared `app.js` logic.
- FAQ.
- Footer + sticky bar.

### 11. About page structure (`about.html`)

- `<header class="page-hero page-hero--media">`, Marina's portrait (`marina-hero.webp`, 1600×1200, fetchpriority high) sits in `.page-hero__media` next to the text block. Same side-by-side hero pattern method.html uses (text left, image right, single column under 900px).
- **Bio**, four `<p data-i18n="about.bio.p1..p4">` paragraphs with an inline `<blockquote class="pull-quote" data-i18n="about.bio.pullquote">` between p2 and p3. Section header keys: `about.bio.label` ("The story") + `about.bio.h2` ("Eighteen years of practice, two continents, one goal."). Source of truth:
  - **Identity (p1):** Marina Ribeiro da Silva, Physical Education professional, **18+ years** dedicated to movement, health, and women's well-being.
  - **Origin (p2):** started through dance, teaching it from age 15; studied Physical Education to professionalise the passion; Brazil career working with the Minas Gerais government on **Movimenta Contagem** (largest free outdoor physical-activity programme in Brazil).
  - **Pull-quote (about.bio.pullquote):** "Physical exercise goes beyond aesthetics. It is the building of a strong, functional, conscious body, one that sustains autonomy, longevity, and quality of life at every stage." Marina's words — treat as voiced copy, confirm before rewording.
  - **Mulheres Ativas (p3):** founded after the pandemic, programme for women particularly over 40, mothers, and those who never felt at home in traditional gyms.
  - **Sydney today + bodywork (p4):** specialises in women's training across all life stages including perimenopause, conditioning, hypertrophy, mobility, posture, body awareness; 10+ years in body therapies; developed her own fascial-release technique combining breath, somatic awareness, and myofascial release.
- **`.about-letter`**, signed Marina quote between bio and credentials. Keys `about.letter.label` / `about.letter.quote` / `about.letter.sign`. Treat the quote as Marina's voice, confirm with the user before rewording.
- **Credentials** (`about.creds.label`/`h2` + `.cred` chips), eight items, keys `about.cred.1..8`:
  1. EQF Level 4 Personal Trainer
  2. Vanoni Institute · Myo Aponeurosis (40 hours · Italy)
  3. Sensory Energetics Certified
  4. TMJ Mastery
  5. Buccal Massage Specialist
  6. 18+ years working with women's bodies
  7. Bilingual EN + PT
  8. Founder, Mulheres Ativas
- **Partner perks** (`.partner-strip`), `about.perks.label`/`h` heading, then one or more `.partner-strip` rows. Currently one entry: Be Bold Sydney → 2 months free exclusive access to the Be Bold app + 10% off any Be Bold work. Keys `about.partner.label`/`p`/`link`. New partners stack as additional rows under the same heading; keep the framing on the deal/perk Marina's clients receive, not generic association copy. The `bebold.au` link also appears in the home JSON-LD `LocalBusiness.sameAs`.
- **CTA block** (`about.cta.*`), Book Massage + Book Training + "Talk to Marina" WhatsApp.
- Footer + sticky bar.

If bio details or credentials change, update **all** of: visible markup in `about.html`, both EN + PT entries in `app.js`, and the `Person` `description`/`hasCredential` in the home JSON-LD graph.

### 12. Sitemap freshness

`sitemap.xml` carries a `<lastmod>` on each indexable URL (home + 4 inner pages). Bump when page content changes meaningfully. `404.html` is intentionally absent.

### 13. Reveal-on-scroll + nav behaviour (progressive enhancement)

- The first line of `app.js`'s IIFE adds `js-on` to `<html>`. Without that class, `.reveal { opacity: 1; transform: none }`, i.e. *content is visible by default*. Only when `js-on` is set do reveals start hidden (`opacity: 0; translateY(24px)`) and animate in when their `IntersectionObserver` adds `is-visible`. This means **SEO crawlers, social-preview bots, screenshot tools, and JS-disabled visitors see the complete page**; only real browsers with JS get the animation. Service-block `clip-path` reveals follow the same pattern (`.js-on .service-block__media img` is the hidden state).
- `.reveal` accepts `stagger-1`..`stagger-6` for cascaded entry timing.
- The fixed `<nav>` toggles a `.scrolled` class past 60px and updates `.active` link state from `section[id]` offsets, new top-level sections should keep an `id` matching the nav anchor or active-state highlighting will skip them.

### 14. Motion language

Beyond reveal-on-scroll:

- **Hero portrait first-paint reveal**, `.hero__media img` gets a 1200ms `clip-path: inset(0 0 100% 0) → inset(0 0 0 0)` animation with scale `1.08 → 1` on page load (`@keyframes heroReveal`, 200ms delay). About-page hero uses the standard `.page-hero--media` layout without a clip-path reveal.
- **Hero parallax**, `initParallax()` in `app.js` translates `.hero__media` vertically at 8% of scroll, rAF-throttled, scroll-passive. Opt-out via `prefers-reduced-motion: reduce`.
- **Service-block image masked reveal**, `.service-block` gets `is-visible` added by `initMediaReveal()` (IntersectionObserver, 0.18 threshold) which triggers the clip-path animation.
- **Button shine sweep**, `.btn--primary` and `.btn--sand` have a `::after` gradient that translates 120% on hover (750ms cubic-bezier).
- **Cross-document view transitions**, `@view-transition { navigation: auto }` enables soft fade between page navigations on Chromium 126+. `vtFadeOut`/`vtFadeIn` keyframes. Other browsers ignore.
- **Smooth scroll**, `html { scroll-behavior: smooth }` with `@media (prefers-reduced-motion: reduce)` opt-out.
- **Diagnostic tile bounce**, `.diag__tile.is-on .diag__tile-icon { transform: scale(1.08) }` for selected state.

All motion is gated behind `prefers-reduced-motion: reduce`, that media query disables hero animation, service-block clip-path, button shine, and view transitions.

### 15. FAQ live search

Each `.faq` block can have a `.faq__search` input prepended; `initFaqSearch()` filters `.faq__item` children by `textContent` on every input event. An empty-state element `<p class="faq__empty">` (hidden by default) shows when no items match, toggled via `.faq.is-empty`. The input's `placeholder` is translated via `data-i18n-attr="placeholder:faq.search.placeholder"`. The empty-state copy is `faq.search.empty`. The input uses a CSS-mask magnifier glyph as its `::before` so the icon recolors with the input's currentColor.

Currently live on `index.html` and `massage.html`. To add to another FAQ block, insert `.faq__search` + `.faq__empty` at the top of the `.faq` container, `initFaqSearch()` will pick it up automatically.

### 16. Accessibility patterns

- **Skip link**, every page has `<a class="skip-link" href="#main">` as the first child of `<body>`. The first `<header>` on each page carries `id="main" tabindex="-1"` so the link target is focusable. i18n key `a11y.skip`.
- **Focus rings**, global `:focus-visible { outline: 2px solid var(--sand-deep) }`; on the dark home hero, `.hero :focus-visible { outline-color: var(--cream) }` keeps the ring legible against forest green.
- **Heading hierarchy**, no level skips. Footer column headers are `<h3>` so they stay one level below page section h2s. Disqualifier card headers on the home are also `<h3>`. The 404 page uses a small visible `<h2>` ("Where to next?") above the CTA group to avoid jumping from page h1 straight to footer h3s.
- **Drawer button colors**, see the cascade-override gotcha in section 4.
- **`aria-current="page"`** on the active nav link of each page.
- **Lang toggle buttons** carry `aria-pressed="true|false"` reflecting active language, plus `aria-label="English"` / `aria-label="Português"`.

### 17. Performance hints

Every page's `<head>` ships:

- `<link rel="preload" as="image" href="<hero-img>" fetchpriority="high">` for the page's LCP image (home: `marina-headshot.webp` with `type="image/webp"`; about: `marina-hero.webp`; other inner pages: none, they don't have a hero image).
- `<link rel="preload" as="image" href="marina-logo.png">` for the nav logo on every page.
- `<link rel="preconnect" href="https://fonts.googleapis.com">` + `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` for the Google Fonts handshake.

LCP images carry `fetchpriority="high" decoding="async"`; below-fold images carry `loading="lazy" decoding="async"`. Nav logos carry `decoding="async"` (not lazy, they're above-fold).

Logo size tokens: `--logo-h: 88px` (desktop), `--logo-h-mobile: 80px`. Nav height is 96px to give the logo breathing room. `marina-logo.png` is intentionally large (~1.5MB) because it's the high-resolution transparent master; it scales down via `width`/`height` attrs in markup. If page-weight ever becomes a concern, regenerate a smaller transparent PNG rather than swapping to the WebP (the WebP has a solid forest background).

### 18. Iconography

Three inline-SVG icon systems are in use (all 1.4px stroke, `currentColor`, no fills):

- **Diagnostic tile icons** (`.diag__tile-icon`, 28×28), body-area glyphs above each tile label on `#diagnostic`.
- **Home service card icons** (`.svc-card__icon`, 34×34), ripple / recurring loop / dumbbell above each `.svc-card` on `#services`.
- **Massage service block icons** (`.service-block__icon`, 38×38), body silhouette / face profile / radiating petals above each service block h2 on `massage.html`.

### 19. Branded 404 page

`404.html` is structured exactly like an inner page (nav + page-hero + footer + WhatsApp float) so Netlify serves it on unknown routes without config. Carries `<meta name="robots" content="noindex">` and no JSON-LD by design. CTAs are service-specific per the discipline rule, "Back to home" + "Book Massage" (not generic "Book a session"). i18n keys: `nf.label`, `nf.h1`, `nf.sub`, `nf.next`, `nf.cta.home`, `nf.cta.book`. The page ships the same pre-paint language hint script, Acuity embed, skip link, and full nav/drawer/footer as the indexable pages.

## Static-check harness

`scripts/` holds plain-Node check scripts; `npm run check` runs all of them (and `npm run check:html` runs html-validate). The same suite fires automatically from `.githooks/pre-commit` (installed by `npm install`'s prepare step) and from CI on every push (`.github/workflows/checks.yml`).

| Script | What it asserts |
|---|---|
| `check-i18n.mjs` | Every `data-i18n` key in markup exists in both `i18n.en` and `i18n.pt`. Empty values fail. Orphan keys defined but never used (in HTML or `t('foo')` calls) warn. Understands `t('prefix.' + var + '.suffix')`. |
| `check-jsonld.mjs` | JSON-LD parses on every page. Canonical `@id`s (`#business`, `#marina`, `#website`, `#service-*`) exist on `index.html`. Service `offers.price` + Acuity slug match the documented table. `#service-sensory.offers.description` mentions the regular A$305 while launch pricing is active. PT plan prices (116/404/710/1007) all appear. `LocalBusiness.openingHoursSpecification` matches the documented massage / PT / PT-mornings schedule. Inner-page `@id` refs resolve. `404.html` carries no JSON-LD. |
| `check-acuity.mjs` | Every anchor on an Acuity domain carries `acuity-embed-button`. Documented slugs + membership catalog ids all appear somewhere. No generic CTA labels ("Book a session", "Book now", bare "Talk to Marina") on `.btn` anchors. Only the canonical WhatsApp number `61451021478` is used. Warns on missing `target="_blank"` / `rel="noopener"`. |
| `check-head.mjs` | Pre-paint `lang-pending` script + Acuity embed CSS+JS + `app.js defer` + nav-logo preload + skip-link as first `<body>` child + first `<header>` with `id="main" tabindex="-1"` + hero preload on home & about + 404 `noindex`. Plus `<title>` (unique across indexable pages), `<meta name="description">`, `<link rel="canonical">` to `marinabodywork.com`, `og:image` absolute URL. |
| `check-links.mjs` | Every internal `href` (file + fragment) resolves on disk. In-page anchor ids exist. |
| `check-sitemap.mjs` | Indexable pages listed, `404.html` absent, every `<loc>` has a parseable `<lastmod>`. |
| `check-pricing.mjs` | **Cabalistic digit-sum** invariant — every headline charged price (125, 116, 107, 224, 305, 404, 710, 1007) sums to 8. Each price appears in EN + PT i18n and the expected page(s). PT per-session display rates (Basic A$101, Golden A$88.75, Diamond A$83.92) derive from monthly totals. Sensory launch double-display on `massage.html` (A$224 + A$305 + `service-block__badge--launch` + `pricing__note--launch`). PT membership minimum-commitment phrases ("2-month minimum", "3-month minimum", "7 days") + freeze entitlement phrases ("1 week", "2 weeks", "3 weeks") appear in both EN and PT. |
| `check-a11y.mjs` | Exactly one `<h1>` per page, no heading-level skips. `aria-current="page"` only on the active nav link, with matching `data-i18n` key + `is-active` class. Lang toggle defaults: EN `aria-pressed="true"`, PT `aria-pressed="false"`. |
| `check-assets.mjs` | Every `<img src>` / `<source src(set)?>` / `<link rel=preload as=image>` href resolves on disk. Every `<img>` has an `alt` attribute. Preload targets are referenced by an in-page image (no wasted bytes). HTML byte budget: 60 KB / page. |
| `check-orphan-images.mjs` | Walks root-level image files. Any new file that isn't referenced from HTML/CSS/JS and isn't on the `KNOWN_ORPHANS` allow-list (or matching `Screenshot/WhatsApp Image/Untitled/IMG_` patterns) fails. Listed orphans that turn out to be referenced warn (clean up the allow-list). |
| `check-css.mjs` | Every `var(--foo)` resolves to a declared custom property. `:root` duplicates warn. Empty rule blocks warn. |
| `smoke-app.mjs` | Loads each indexable page in jsdom + runs `app.js`. Asserts: no jsdom runtime errors, `js-on` set, `lang-pending` cleared after boot, lang-toggle `aria-pressed` flips on click, `setLang('pt')` translates + persists in `localStorage`, returning-PT-visitor path (pre-seeded `marinaLang=pt`) clears `lang-pending` and translates. On `index.html` + `method.html`: all 5 diagnostic tiles click cleanly, non-training CTAs carry `acuity-embed-button` + a documented per-service URL, training CTA is internal (`training.html#plans`, no `acuity-embed-button`). FAQ live search on home + massage hides non-matches and toggles `is-empty`. |
| `check:html` | html-validate recommended ruleset (several WCAG rules off, see `.htmlvalidate.json`). |

Lighthouse CI runs on every push and asserts a11y ≥ 0.9 + SEO ≥ 0.9 (error), best-practices / performance ≥ 0.8 (warn). Config: `.lighthouserc.json`.

**Adding a new check:** drop the file in `scripts/`, add it to the `CHECKS` array in `scripts/run-all.mjs` (cheapest-first), and add a `check:foo` alias to `package.json`. Reuse `lib/parse.mjs` helpers (`readPage`, `loadI18n`, `extractAnchors`, `flattenGraph`, `makeReporter`). The reporter pattern is `r.error(msg)` / `r.warn(msg)` then `r.done()` at the bottom — errors set process.exitCode=1, warnings don't.

**Bypassing the pre-commit hook:** `git commit --no-verify`. Only for emergencies; CI runs the same suite and will still fail.

## Git workflow

- Develop on the feature branch assigned for the session (named `claude/<short-task-slug>-<random-suffix>` — the exact value is supplied per session).
- Push with `git push -u origin <branch>` and open a draft PR against the default branch (`main`).
- Never push directly to `main`; never amend pushed commits; never force-push.
- `.githooks/pre-commit` runs the full static-check suite locally before every commit. CI mirrors it (`.github/workflows/checks.yml`). Treat a green local hook + green CI as the bar for merging.
