// Resolved runtime config with defaults. Single source for endpoint URLs and
// support contact so components don't repeat `import.meta.env.PUBLIC_*` reads.
//
// Defaults match the production hosts so an unconfigured build still works
// against the live Salesforce/CDN endpoints. Override per-environment via .env.

const env = import.meta.env

const trimTrailingSlash = (s: string) => s.replace(/\/+$/, '')

export const SITE_URL = trimTrailingSlash(env.PUBLIC_SITE_URL || 'https://astro-staging.revealbi.io')
export const CDN_BASE = trimTrailingSlash(env.PUBLIC_CDN_BASE || 'https://static.infragistics.com/marketing/reveal')
export const HELP_URL = trimTrailingSlash(env.PUBLIC_HELP_URL || 'https://help.revealbi.io')
export const SUPPORT_EMAIL = env.PUBLIC_SUPPORT_EMAIL || 'support@revealbi.io'

export const DEPLOY_ENV = env.PUBLIC_DEPLOY_ENV || 'staging'

// Block search-engine indexing when set. Drives <meta name="robots"> in
// BaseLayout and the body of /robots.txt. Default true if PUBLIC_NOINDEX is
// unset so a misconfigured build doesn't accidentally expose itself.
export const NOINDEX = env.PUBLIC_NOINDEX !== '0'

// REVISIT: default is intentionally empty so leadTracker.js falls back to its
// legacy hostname-based auto-routing (staging URL → staging.infragistics.com,
// otherwise → www.infragistics.com). This is the historically-correct behavior
// for the existing /api/leadtrackingevents/track endpoint.
//
// .env.example originally suggested PUBLIC_LEAD_API_BASE=https://acctapis.infragistics.com,
// but acctapis is a different host that the legacy script has never posted to.
// Decide which one Salesforce actually wants leads on before re-introducing a
// non-empty default. See tracking-next.md "Endpoint mismatch" note.
export const LEAD_API_BASE = trimTrailingSlash(
  DEPLOY_ENV === 'staging' && env.PUBLIC_LEAD_API_BASE_STAGING
    ? env.PUBLIC_LEAD_API_BASE_STAGING
    : env.PUBLIC_LEAD_API_BASE || '',
)

// Endpoint path for lead submissions, appended in leadTracker.js to the
// resolved API host. Keep this configurable in case backend routes change.
export const LEAD_TRACKING_PATH = env.PUBLIC_LEAD_TRACKING_PATH || 'https://staging.infragistics.com/api/leadtrackingevents/track'

// Path helper: joins the CDN base with a relative path. Accepts either
// "marketing/reveal/foo.svg" (legacy absolute paths in YAML) or "/foo.svg"
// (new relative paths). Falls through unchanged for full URLs.
// Absolute paths starting with "/" (other than /marketing/) are local public
// assets and are returned as-is so they resolve against the same origin.
export function cdn(path: string): string {
  if (/^https?:\/\//i.test(path)) return path
  if (path.startsWith('/marketing/')) return `https://static.infragistics.com${path}`
  if (path.startsWith('/images/')) return path
  return `${CDN_BASE}/${path.replace(/^\/+/, '')}`
}

// Analytics provider IDs — empty string means "disabled". Components read
// these directly to decide whether to render their snippet.
export const ANALYTICS = {
  ga4: env.PUBLIC_GA4_MEASUREMENT_ID || '',
  gtm: env.PUBLIC_GTM_CONTAINER_ID || 'GTM-PTZT5MD',
  linkedinPartnerId: env.PUBLIC_LINKEDIN_PARTNER_ID || '',
  metaPixelId: env.PUBLIC_META_PIXEL_ID || '',
  hotjarSiteId: env.PUBLIC_HOTJAR_SITE_ID || '',
  hubspotPortalId: env.PUBLIC_HUBSPOT_PORTAL_ID || '',
  recaptchaSiteKey: env.PUBLIC_RECAPTCHA_SITE_KEY || '',
  pageSenseId: env.PUBLIC_PAGESENSE_ID || 'f59cd89a12d4420bb833307ddf50fdf7',
}
