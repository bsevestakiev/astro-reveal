#!/usr/bin/env node
/**
 * Port SEO metadata from the live WP/Yoast site into Astro frontmatter.
 *
 * Reads /tmp/site-audit/cache/seo.json (from scripts/site-audit.mjs) and for
 * each markdown file in src/content/<col>/<loc>/*.md, looks up the matching
 * live URL's SEO data and injects an `seo:` block into the frontmatter.
 *
 * Fields ported per page:
 *   title, description, ogTitle, ogDescription, ogType,
 *   twitterTitle, twitterDescription, ogImage
 *
 * ogImage mapping: WP /wp-content/uploads/<path> → /images/<path> if a
 * matching local file exists under public/images/, otherwise the live WP
 * absolute URL is preserved (still resolvable from WP origin during cutover).
 *
 * Coverage: all locales — EN content is matched against live EN URLs, JA
 * content against /ja/ live URLs, ES/KO/PT-BR homepages against the matching
 * locale homepage on live (the only non-EN/JA pages with live SEO data).
 *
 * Fields NOT ported:
 *   canonical (Astro builds dynamically from PUBLIC_SITE_URL)
 *   robots    (env-gated via NOINDEX)
 *
 * Idempotent: files that already have an `seo:` block are skipped; use
 * --force to overwrite.
 *
 * Usage:
 *   node scripts/port-seo-metadata.mjs            # dry-run (default)
 *   node scripts/port-seo-metadata.mjs --apply
 *   node scripts/port-seo-metadata.mjs --apply --force
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import YAML from 'yaml'

const CACHE = '/tmp/site-audit/cache/seo.json'
const CONTENT_ROOT = 'src/content'
const PUBLIC_IMAGES = 'public/images'
const APPLY = process.argv.includes('--apply')
const FORCE = process.argv.includes('--force')

// Astro URL → live WP URL aliases for content that was renamed/redirected.
const ALIASES = {
  '/about-us/': '/about-us-2/',
  '/licenses/': '/license-agreements/',
  '/partners/': '/empowering-partners-for-success-with-reveal/',
  '/pricing/': '/pricing/embedded-analytics/',
  '/blog/how-to-monetize-data-analytics-offering/': '/blog/data-monetization-methods/',
  '/blog/the-missing-piece-in-enterprise-bi-intuitive-embedded-and-self-service-analytics/': '/blog/enterprise-bi/',
}

if (!existsSync(CACHE)) {
  console.error(`error: ${CACHE} not found. Run scripts/site-audit.mjs first.`)
  process.exit(1)
}

const seo = JSON.parse(readFileSync(CACHE, 'utf8'))
const oldSeo = seo.old || {}

function urlForFile(filepath) {
  // pages/<loc>/<slug>.md  →  /<loc>/<slug>/  (or /<slug>/ for EN)
  // blog/<loc>/<slug>.md   →  /<loc>/blog/<slug>/  (or /blog/<slug>/ for EN)
  // Special: pages/<loc>/homepage.md → /<loc>/  (or / for EN)
  const m = filepath.match(/src\/content\/(blog|pages|glossary|whitepapers|webinars|stories)\/([^/]+)\/(.+)\.md$/)
  if (!m) return null
  const [, col, loc, slug] = m
  const locPrefix = loc === 'en' ? '' : `/${loc}`
  if (col === 'pages') {
    if (slug === 'homepage') return locPrefix === '' ? '/' : `${locPrefix}/`
    return `${locPrefix}/${slug}/`
  }
  if (slug === 'index') return `${locPrefix}/${col}/`
  return `${locPrefix}/${col}/${slug}/`
}

function findOldSeo(url) {
  const noSlash = url.replace(/\/$/, '')
  const withSlash = noSlash + '/'
  const aliasTarget = ALIASES[withSlash] || ALIASES[noSlash]
  const aliasNoSlash = aliasTarget ? aliasTarget.replace(/\/$/, '') : null
  const aliasWithSlash = aliasNoSlash ? aliasNoSlash + '/' : null
  const candidates = [
    withSlash, noSlash,
    aliasWithSlash, aliasNoSlash,
  ].filter(Boolean)
  for (const c of candidates) {
    if (oldSeo[c]) return { data: oldSeo[c], matchedUrl: c }
  }
  return null
}

// Remap a WP og:image URL to a local /images/ path if a matching file exists,
// else preserve the absolute URL (live WP origin still serves it).
function remapOgImage(url) {
  if (!url) return null
  const m = url.match(/\/wp-content\/uploads\/(.+)$/)
  if (!m) return url
  const localRel = `images/${m[1]}`
  const localAbs = join(PUBLIC_IMAGES, m[1])
  if (existsSync(localAbs)) return '/' + localRel
  return url
}

function buildSeoBlock(oldData) {
  const out = {}
  const fields = ['title', 'description', 'ogTitle', 'ogDescription', 'ogType', 'twitterTitle', 'twitterDescription']
  for (const f of fields) {
    const v = oldData[f]
    if (v != null && v !== '') out[f] = v
  }
  const ogImage = remapOgImage(oldData.ogImage)
  if (ogImage) out.ogImage = ogImage
  return Object.keys(out).length ? out : null
}

function extractFrontmatter(text) {
  const m = text.match(/^(---\r?\n)([\s\S]*?)(\r?\n---\r?\n?)([\s\S]*)$/)
  if (!m) return null
  return { open: m[1], yaml: m[2], close: m[3], body: m[4] }
}

function walkMd(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) walkMd(p, out)
    else if (e.name.endsWith('.md')) out.push(p)
  }
  return out
}

function serializeSeoBlock(seoObj) {
  return YAML.stringify({ seo: seoObj }, {
    lineWidth: 0,
    defaultStringType: 'QUOTE_DOUBLE',
    defaultKeyType: 'PLAIN',
    indent: 2,
  })
}

// Locales we'll try to port for. EN is the bulk; JA + ES/KO/PT-BR mostly
// limited to the homepage which is the only locale page with live SEO.
const LOCALES_TO_PORT = ['en', 'ja', 'es', 'ko', 'pt-BR']

const allMd = walkMd(CONTENT_ROOT)
const candidateMd = allMd.filter(p => {
  const m = p.match(/src\/content\/[^/]+\/([^/]+)\//)
  return m && LOCALES_TO_PORT.includes(m[1])
})

let updated = 0, skipNoData = 0, skipHasSeo = 0, skipNoFm = 0
const updates = []
const noDataPaths = []

for (const file of candidateMd) {
  const url = urlForFile(file)
  if (!url) continue

  const text = readFileSync(file, 'utf8')
  const fm = extractFrontmatter(text)
  if (!fm) { skipNoFm++; continue }

  const hasExistingSeo = /^\s*seo\s*:/m.test(fm.yaml)
  if (hasExistingSeo && !FORCE) { skipHasSeo++; continue }

  const match = findOldSeo(url)
  if (!match) { skipNoData++; noDataPaths.push([file, url]); continue }

  const seoBlock = buildSeoBlock(match.data)
  if (!seoBlock) { skipNoData++; continue }

  // Strip existing seo block if --force
  let baseYaml = fm.yaml
  if (hasExistingSeo) {
    const lines = baseYaml.split(/\r?\n/)
    const out = []
    let inSeo = false
    for (const line of lines) {
      if (/^seo\s*:/.test(line)) { inSeo = true; continue }
      if (inSeo && /^\S/.test(line)) inSeo = false
      if (!inSeo) out.push(line)
    }
    baseYaml = out.join('\n')
  }
  if (!baseYaml.endsWith('\n')) baseYaml += '\n'
  const seoYaml = serializeSeoBlock(seoBlock)
  const newText = fm.open + baseYaml + seoYaml + fm.close.replace(/^\r?\n/, '') + fm.body

  updates.push({ file, url, matchedUrl: match.matchedUrl, seoBlock })
  if (APPLY) writeFileSync(file, newText)
  updated++
}

const action = APPLY ? 'APPLIED' : 'DRY-RUN (use --apply to write)'
console.log(`\n=== ${action} ===`)
console.log(`Total markdown files scanned: ${candidateMd.length}`)
console.log(`Updated:                       ${updated}`)
console.log(`Skipped — already has seo:    ${skipHasSeo}`)
console.log(`Skipped — no live SEO match:  ${skipNoData}`)
console.log(`Skipped — no frontmatter:     ${skipNoFm}`)

// OG image coverage stats
const ogStats = { local: 0, remote: 0, none: 0 }
for (const u of updates) {
  const ogi = u.seoBlock.ogImage
  if (!ogi) ogStats.none++
  else if (ogi.startsWith('/')) ogStats.local++
  else ogStats.remote++
}
console.log(`\nogImage coverage in updated files:`)
console.log(`  local /images/ path:   ${ogStats.local}`)
console.log(`  remote WP URL:         ${ogStats.remote}`)
console.log(`  none:                  ${ogStats.none}`)
