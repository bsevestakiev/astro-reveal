# GDPR consent banner — port from WP

**Date:** 2026-05-05
**Commit:** `67e4c6e` — `fix(gdpr): port consent banner + guard sales-iframe loader`
**Scope:** Clear the four console errors that fired on every page load and bring across the cookie-consent UX from `www.revealbi.io`.

## Why

The legacy `plugins.js` and `tooltips.js` were copied from WP unchanged, but the DOM they query against was never ported. Result: every page load threw four uncaught exceptions:

- `plugins.js:625` — `null.addEventListener` (looking for `gdpr_accept_basic`)
- `plugins.js:601` — `null.style` (looking for `consent-block[data-theme=...]`)
- `script.js:364` — `undefined.init` (cascade — `plugins.js` died at line 625, so the `mobileDeviceDisplay` IIFE on line 769 never ran, leaving the var undefined)
- `tooltips.js:4` — `null.style` (looking for `loadingImage` / `salesIframe`, both only on the sales-iframe page)

User flagged that the GDPR banner is expected behaviour, not noise. So the fix is to actually port the banner, not silence the script.

## What changed

### New: `src/components/ui/GdprBanner.astro`

Two `<div class="consent-block">` variants (advanced + basic), both `display:none` initially, mirroring `www.revealbi.io/index.html:2681-2771`. All IDs that `plugins.js:619-674` queries are present:

- `gdpr_accept_basic`, `gdpr_settings`, `gdpr_accept_all_ok`, `gdpr_accept_all`, `gdpr_accept_selection`, `gdpr_reject_all`
- `acceptFunctionalCookies`, `acceptAnalyticsCookies`, `acceptAdvertisingCookies`, `acceptNecessaryCookies`
- `consent-summary`, `consent-options`

`plugins.js` picks which variant to show based on `localStorage.IGconsentType`.

### `src/layouts/BaseLayout.astro`

1. **New inline script in `<head>` before `<Analytics />`**:
   - `localStorage.setItem('IGconsentType', 'advanced')` — seeds the variant `plugins.js` queries.
   - Defines `window.dataLayer` and the `gtag()` shim.
   - Calls `gtag('consent', 'default', { ... all-denied ... })` — Consent Mode v2 default-deny so when GA4/GTM eventually load they respect EU consent law from the first paint.

2. **`<GdprBanner />` mounted in `<body>`** before the script bundle so plugins.js finds the DOM when it runs.

### `public/js/tooltips.js`

Wrapped the `salesIframe`/`loadingImage` `setTimeout` in an existence check. The block was meant for `/pricing` (or wherever a sales iframe exists); it fires on every page in WP too, but every other page silently relied on jQuery-style tolerance which our script doesn't have.

## Does the banner actually do anything?

**Banner UX:** ✅ functional. Buttons fire, banner hides, choice persists in `localStorage.IGconsentMode`, and `gtag('consent','update',...)` is pushed to `window.dataLayer`.

**Real-world effect:** ❌ none yet. No analytics provider is wired (`PUBLIC_GA4_MEASUREMENT_ID`, `PUBLIC_GTM_CONTAINER_ID` etc. are all empty in prod), so the consent signal has no consumer. The dataLayer pushes sit there waiting for someone to read them.

This is the right state until Phase 4 in `tracking-next.md` lands (marketing handoff of the GA4/GTM IDs). Order of operations once those values arrive:

1. `Analytics.astro` loads `gtag/js?id=G-XXX` and/or `gtm.js?id=GTM-XXX`.
2. gtag.js processes the existing dataLayer queue on init.
3. The `gtag('consent','default','denied')` we set in BaseLayout head fires *first* (queued earliest), then `plugins.js` replays the user's stored choice via `gtag('consent','update',...)` (queued on pageload from `localStorage.IGconsentMode`).
4. GA4 then only sends events for categories the user granted.

That's the correct Consent Mode v2 wiring; we're just missing the receiver.

## Known caveats

- **Basic banner doesn't persist.** When `IGconsentType === 'basic'`, clicking "Ok" only hides the banner — no `IGconsentMode` is stored, so next reload the banner reappears forever. This matches how WP shipped it (presumably because the basic variant is shown in non-GDPR regions where no record is legally required). If we ever set `IGconsentType=basic` for an EU visitor, this would be a UX bug. Currently every visitor gets `advanced`, so non-issue.
- **Visual styling not verified live yet.** The banner relies on `consent-block`, `gdpr-block`, `position-fixed p-4 text-white` Bootstrap classes. WP's stylesheet had explicit rules for `.gdpr-block` / `.gdpr-block-summary` etc.; if any of those didn't make it into our global CSS the banner may render unstyled. Visual check needed once the deploy lands.
- **Lead form not consent-gated.** `leadTracker.js` submits regardless of `IGconsentMode`. That's a legal hole in EU jurisdictions if marketing ever wires GA before this is fixed. Tracked under "things to wire when Phase 4 lands."

## How to test once the deploy finishes

1. Open `astro-staging.revealbi.io` in incognito (empty localStorage).
2. DevTools → Console: should be free of the four old errors.
3. The dark fixed-position banner ("Your Privacy Matters") should appear at the bottom.
4. Click "Manage settings" → panel swaps to the 4-checkbox options view.
5. Click "OK" or "Accept All" → banner disappears; `localStorage.IGconsentMode` is set.
6. Reload → banner does NOT reappear.
7. Reset for retest: `localStorage.removeItem('IGconsentMode'); location.reload()`

## Files touched

```
src/components/ui/GdprBanner.astro    (new, 67 lines)
src/layouts/BaseLayout.astro          (+import, +inline script, +mount)
public/js/tooltips.js                 (existence guard)
```
