/// <reference types="astro/client" />

interface ImportMetaEnv {
  // Site
  readonly PUBLIC_SITE_URL: string

  // Endpoints
  readonly PUBLIC_LEAD_API_BASE: string
  readonly PUBLIC_LEAD_API_BASE_STAGING?: string
  readonly PUBLIC_CDN_BASE: string
  readonly PUBLIC_HELP_URL: string
  readonly PUBLIC_SUPPORT_EMAIL: string
  readonly PUBLIC_DEPLOY_ENV?: 'production' | 'staging' | 'dev'
  readonly PUBLIC_NOINDEX?: '0' | '1'

  // Analytics — all optional, empty string disables the snippet
  readonly PUBLIC_GA4_MEASUREMENT_ID?: string
  readonly PUBLIC_GTM_CONTAINER_ID?: string
  readonly PUBLIC_LINKEDIN_PARTNER_ID?: string
  readonly PUBLIC_META_PIXEL_ID?: string
  readonly PUBLIC_HOTJAR_SITE_ID?: string
  readonly PUBLIC_HUBSPOT_PORTAL_ID?: string
  readonly PUBLIC_RECAPTCHA_SITE_KEY?: string

  // Search
  readonly PUBLIC_SEARCH_PROVIDER?: 'pagefind'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.html?raw' {
  const content: string
  export default content
}
