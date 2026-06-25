// @ts-check
import { defineConfig } from 'astro/config';
import remarkHeadingId from 'remark-heading-id';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://astro-staging.revealbi.io',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [],
  redirects: {
    // '/embedded-analytics-software': '/embedded-analytics',
    '/vs-powerbi-sdk': '/reveal-vs-power-bi',
    '/vs-looker-sdk': '/reveal-vs-looker',
    '/download-desktop': '/request-demo', //set on the prod site from the host
    '/licenses': '/license-agreements',
    '/pricing': '/pricing/embedded-analytics',
    '/white-label-embedded-analytics': '/white-label-analytics' // old WP slug used on live ads
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'ja', 'ko', 'pt-BR'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    remarkPlugins: [remarkHeadingId],
  },
});
