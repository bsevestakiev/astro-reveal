# Homepage Bug-Fixing Session Log

## Fixes Applied

### Navigation — "more spanned sideways" issue
**Files:** `src/components/ui/Header.astro`

- **Logo ID fixed:** Logo `<li>` had `id="mega-menu-item-5312"` (the old WP CTA button's ID). `megamenu.css` has a rule `#mega-menu-item-5312 { padding-right: 0 !important; }` that was incorrectly zeroing out the logo's right padding. Changed to `id="mega-menu-item-5306"` (the correct WP logo ID).
- **Dropdown padding structure fixed:** `mega-bg-shadow mega-nav-side-padding bg-shadow nav-side-padding` classes were on the outer `<ul class="mega-sub-menu">`. In the original WP site these classes belong on the inner `<li class="mega-menu-row">`. Moved for all three dropdowns (Product, Solutions, Resources). The `nav-side-padding` class applies `padding: 7vw` and was expanding the full nav width when on the wrong element.

### Logo Slider
**File:** `src/components/sections/LogoSlider.astro`

- Added `style="height:35px"` to each logo `<img>` (both the primary set and the duplicated infinite-scroll set).
- Changed the `note` prop default from a hardcoded string to `''` and made the note paragraph conditional (`{note && ...}`), removing the unwanted extra text below the slider.

### Decorative Background Circles — FIXED
**Files:** `src/pages/index.astro`

Restructured `index.astro` to wrap section groups in `<div class="overflow-hidden position-relative">` with decorative circle divs inside, matching the original WP site's three-wrapper structure. Extended each zone wrapper to cover all white-background sections (including the hero area). Removed `d-none d-lg-block` (was hiding them), boosted opacity, and adjusted positioning.

- **Zone 1**: hero + logo slider + sections 2–4 — 4 circle pairs at 8%, 22%, 55%, 75%
- **Zone 2**: sections 6–7 — 2 circle pairs at 20%, 80%
- **Zone 3**: pricing teaser + reviews + FAQ + inline-CTA — 4 circle pairs at 10%, 35%, 65%, 85%

**Status: FIXED**

### Governance First Architecture — second subhead paragraph
**Files:** `src/components/sections/IconGrid.astro`, `src/content/pages/en/homepage.md`

- Added `subhead2?: string` prop to `IconGrid.astro`, rendered as a second `<p class="mx-auto mw-900px">` below the first subhead.
- Added `subhead2: "Your data stays in your environment. Reveal connects securely and respects your existing security model."` to the Governance First Architecture section in `homepage.md`.

### "Analytics People Actually Use" — text column padding
**Files:** `src/components/sections/FeatureRow.astro`, `src/content/pages/en/homepage.md`

- Added `textColClass?: string` prop to `FeatureRow.astro`, appended to the text column's class list.
- Added `textColClass: "pl-3 pl-lg-5"` to the "Analytics People Actually Use" feature-row section in `homepage.md`.

### Reviews — typographic quote marks
**File:** `src/components/sections/Reviews.astro`

- Changed straight `"` characters surrounding the blockquote to `&ldquo;` / `&rdquo;` to match the original WP site.

### FAQ accordion — FIXED
**Files:** `src/components/sections/FAQ.astro`

Removed Bootstrap 5 `data-bs-toggle`/`data-bs-target`/`data-bs-parent` attributes. Added a self-contained accordion script directly in `FAQ.astro` using Bootstrap 4-style `.show` class toggling. Bypasses `plugins.js` entirely (which has execution issues that prevented `accordion.init()` from firing).

**Status: FIXED**

### Scroll-triggered fade animations — FIXED
**Files:** `src/styles/vendor/transitions.css`, `src/styles/global.css`, `src/layouts/BaseLayout.astro`, all section components

Copied `_transitions.css` from original theme into `src/styles/vendor/transitions.css` and imported it in `global.css`. Stripped hardcoded `animated fadeInRight` etc. classes from all section component HTML, leaving only `animate-me` + `data-animation` attribute. Added self-contained `IntersectionObserver` script in `BaseLayout.astro` (15% threshold) to replace the broken `plugins.js` AnimateMe dependency.

**Status: FIXED**

### IconGrid gray-card background bleed — FIXED
**File:** `src/components/sections/IconGrid.astro`

The `my-5` on the `<section>` placed margin outside the background, creating white gaps adjacent to the gray-card sections. Fixed by conditionally applying `my-5` only when variant is not `gray-card`.

**Status: FIXED**

### Footer white line above gradient section — UNRESOLVED
**File:** `src/components/ui/Footer.astro`

There is a visible white line between the last page section and the footer gradient (`bg-gradient--primary`). The original site has an SVG wave at the top of the footer.

**Attempted fix:** Re-added the SVG wave with `fill="url(#wave-grad)"` using an inline `<linearGradient>` matching the orange-to-pink footer gradient, to eliminate the white fill while keeping the wave shape.

**User feedback: Bullshit.** The result doesn't match the original site.

**What needs to happen:** Inspect the original scraped revealbi.io homepage HTML to see exactly how the wave is implemented — what element it lives on, what fill it uses, where it sits in the DOM relative to the footer — and replicate that exactly.

**Status: UNRESOLVED**

---

## Remaining Issues To Investigate

1. **Footer wave** — Must open original scraped HTML and inspect the wave implementation before attempting another fix.
