// SEO helpers shared across layouts and structured-data emitters.
// See docs/seo/pass-3-jsonld.md for the schema strategy.

import { SITE_URL } from './env'

// Strip HTML tags and decode the most common entities. Used for fields like
// FAQPage `acceptedAnswer.text` and Article `description`, where Google's
// schema validators reject embedded markup.
export function stripHtml(input: string | undefined): string {
  if (!input) return ''
  return input
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim()
}

// Reveal Embedded Analytics — Organization schema (sitewide). Driven from a
// single source of truth so the same identity also feeds Article.publisher.
export const ORGANIZATION_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Reveal Embedded Analytics',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    '@id': `${SITE_URL}/#logo`,
    url: `${SITE_URL}/wp-content/uploads/2020/10/reveal-logo-160x90-1.png`,
    contentUrl: `${SITE_URL}/wp-content/uploads/2020/10/reveal-logo-160x90-1.png`,
    caption: 'Reveal Embedded Analytics',
    inLanguage: 'en-US',
    width: '160',
    height: '90',
  },
  sameAs: [
    'https://www.facebook.com/reveal.bi',
    'https://twitter.com/reveal_bi',
    'https://x.com/reveal_bi',
    'https://www.linkedin.com/showcase/revealbi/',
    'https://www.youtube.com/channel/UC858QRm9DgrOITpy4KmHdOg',
    'https://www.g2.com/products/reveal-2022-05-24/reviews',
  ],
}

export const WEBSITE_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Reveal Embedded Analytics',
  url: SITE_URL,
  inLanguage: 'en-US',
  publisher: { '@id': `${SITE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/?s={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

// Article publisher — embeds Organization. Google requires `logo` as an
// ImageObject when used inside Article.publisher (not just a URL string).
export const ARTICLE_PUBLISHER_LD = {
  '@type': 'Organization',
  name: ORGANIZATION_LD.name,
  logo: {
    '@type': 'ImageObject',
    url: (ORGANIZATION_LD.logo as { url: string }).url,
  },
}

// Per-page WebPage schema. Emitted sitewide by BaseLayout so every URL has
// the WebPage type Google expects. Matches what Yoast/RankMath emit on the
// live WP site.
export function webpageLd(opts: {
  url: string
  title: string
  description?: string
  inLanguage?: string
  imageUrl?: string
  datePublished?: string
  dateModified?: string
}) {
  const { url, title, description, inLanguage = 'en-US', imageUrl, datePublished, dateModified } = opts
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    ...(description ? { description } : {}),
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    ...(imageUrl ? { primaryImageOfPage: { '@id': imageUrl } } : {}),
    inLanguage,
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
  }
}

// ImageObject for the page's primary OG image. Emitted alongside WebPage so
// Google can attribute the image to the page (drives image-pack SERP eligibility).
export function imageObjectLd(opts: {
  url: string
  width?: number | string
  height?: number | string
  inLanguage?: string
}) {
  const { url, width, height, inLanguage = 'en-US' } = opts
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    '@id': url,
    url,
    contentUrl: url,
    ...(width ? { width: String(width) } : {}),
    ...(height ? { height: String(height) } : {}),
    inLanguage,
  }
}

// BreadcrumbList — drives the breadcrumb chip in Google search results.
// Items must be an ordered list of {name, item} where item is an absolute URL.
export function breadcrumbLd(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.item,
    })),
  }
}
