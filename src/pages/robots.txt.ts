import type { APIRoute } from 'astro'
import { NOINDEX } from '../lib/env'

export const prerender = true

export const GET: APIRoute = ({ site }) => {
  const body = NOINDEX
    ? `User-agent: *\nDisallow: /\n`
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap_index.xml', site!).href}\n`
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } })
}
