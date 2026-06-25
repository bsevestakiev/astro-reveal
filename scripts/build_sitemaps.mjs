#!/usr/bin/env node
// Build RankMath/Yoast-style sitemaps for the Reveal site.
//
// Reads slug list + lastmod from src/content/<col>/en/*.md frontmatter,
// then probes dist/ to determine which locales actually shipped each URL
// (Astro builds pages/ in all 5 locales; the translation pipeline mirrors
// blog/glossary/whitepapers/webinars/stories under dist/<loc>/ from
// public/<loc>/).
//
// Emits to dist/:
//   sitemap_index.xml          entry point
//   page-sitemap.xml           pages collection (incl. homepage)
//   post-sitemap.xml           blog
//   glossary-sitemap.xml       glossary
//   whitepapers-sitemap.xml    whitepapers
//   webinars-sitemap.xml       webinars
//   stories-sitemap.xml        stories
//
// Each <url> carries <xhtml:link rel="alternate" hreflang="..."> entries
// for every locale that shipped that URL (Google's requirement: self-link
// included). XML is tab-indented and references /main-sitemap.xsl for
// human-readable rendering.

import { readFileSync, readdirSync, existsSync, statSync, writeFileSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { parse as parseYaml } from 'yaml'

const SITE = (process.env.PUBLIC_SITE_URL || 'https://astro-staging.revealbi.io').replace(/\/$/, '')
const DIST = resolve('dist')
const CONTENT = resolve('src/content')

const LOCALES = ['en', 'es', 'ja', 'ko', 'pt-BR']
const HREFLANG = {
  en: 'en-US',
  es: 'es-ES',
  ja: 'ja-JP',
  ko: 'ko-KR',
  'pt-BR': 'pt-BR',
}

const COLLECTIONS = [
  { name: 'pages',       prefix: '',             file: 'page-sitemap.xml' },
  { name: 'blog',        prefix: 'blog/',        file: 'post-sitemap.xml' },
  { name: 'glossary',    prefix: 'glossary/',    file: 'glossary-sitemap.xml' },
  { name: 'whitepapers', prefix: 'whitepapers/', file: 'whitepapers-sitemap.xml' },
  { name: 'webinars',    prefix: 'webinars/',    file: 'webinars-sitemap.xml' },
  { name: 'stories',     prefix: 'stories/',     file: 'stories-sitemap.xml' },
]

function readFrontmatter(path) {
  const text = readFileSync(path, 'utf8')
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!m) return {}
  try { return parseYaml(m[1]) ?? {} }
  catch { return {} }
}

function isoDate(value) {
  if (!value) return null
  const d = value instanceof Date ? value : new Date(value)
  if (isNaN(d.getTime())) return null
  return d.toISOString().replace(/\.\d{3}Z$/, '+00:00')
}

function buildPath(locale, urlPath) {
  const langPrefix = locale === 'en' ? '' : `/${locale}`
  if (urlPath === '') return langPrefix || '/'
  return `${langPrefix}/${urlPath.replace(/^\//, '').replace(/\/$/, '')}`
}

function isBuilt(urlPath) {
  const rel = urlPath === '/' ? '' : urlPath.replace(/^\//, '')
  const file = rel === '' ? join(DIST, 'index.html') : join(DIST, rel, 'index.html')
  return existsSync(file)
}

function scanCollection(col) {
  const enDir = join(CONTENT, col.name, 'en')
  if (!existsSync(enDir)) return []

  const slugs = []
  for (const file of readdirSync(enDir)) {
    if (!file.endsWith('.md')) continue
    const slug = file.replace(/\.md$/, '')
    if (col.name === 'pages' && slug === 'homepage') {
      slugs.push({ slug, urlPath: '', mdPath: join(enDir, file) })
      continue
    }
    if (slug === 'index') {
      // Collection landing page (e.g. blog/en/index.md → /blog/).
      slugs.push({ slug, urlPath: col.prefix.replace(/\/$/, ''), mdPath: join(enDir, file) })
      continue
    }
    slugs.push({ slug, urlPath: `${col.prefix}${slug}`, mdPath: join(enDir, file) })
  }

  const entries = []
  for (const { slug, urlPath, mdPath } of slugs) {
    const fm = readFrontmatter(mdPath)
    if (fm?.seo?.noindex === true || fm?.noindex === true) continue

    const dateRaw = fm.modDate || fm.date || statSync(mdPath).mtime
    const lastmod = isoDate(dateRaw)

    const builtLocales = []
    for (const loc of LOCALES) {
      const path = buildPath(loc, urlPath)
      if (isBuilt(path)) builtLocales.push({ loc, path })
    }
    if (builtLocales.length === 0) continue

    entries.push({ slug, urlPath, lastmod, builtLocales })
  }
  return entries
}

function emitCollectionSitemap(entries) {
  const lines = []
  lines.push('<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl"?>')
  lines.push('<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
  for (const entry of entries) {
    for (const { loc, path } of entry.builtLocales) {
      lines.push('\t<url>')
      lines.push(`\t\t<loc>${SITE}${path}</loc>`)
      if (entry.lastmod) lines.push(`\t\t<lastmod>${entry.lastmod}</lastmod>`)
      for (const sib of entry.builtLocales) {
        lines.push(`\t\t<xhtml:link rel="alternate" hreflang="${HREFLANG[sib.loc]}" href="${SITE}${sib.path}"/>`)
      }
      lines.push('\t</url>')
    }
  }
  lines.push('</urlset>')
  return lines.join('\n') + '\n'
}

function emitIndex(subSitemaps) {
  const lines = []
  lines.push('<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl"?>')
  lines.push('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
  for (const sm of subSitemaps) {
    lines.push('\t<sitemap>')
    lines.push(`\t\t<loc>${SITE}/${sm.file}</loc>`)
    if (sm.lastmod) lines.push(`\t\t<lastmod>${sm.lastmod}</lastmod>`)
    lines.push('\t</sitemap>')
  }
  lines.push('</sitemapindex>')
  return lines.join('\n') + '\n'
}

if (!existsSync(DIST)) {
  console.error(`error: ${DIST} does not exist — run \`astro build\` first.`)
  process.exit(1)
}

console.log(`Building sitemaps for ${SITE}`)
const subSitemaps = []
let grandTotal = 0
for (const col of COLLECTIONS) {
  const entries = scanCollection(col)
  if (entries.length === 0) {
    console.log(`  ${col.file}: empty, skipping`)
    continue
  }
  const xml = emitCollectionSitemap(entries)
  writeFileSync(join(DIST, col.file), xml)
  const maxLastmod = entries.map(e => e.lastmod).filter(Boolean).sort().pop() || null
  const urlCount = entries.reduce((n, e) => n + e.builtLocales.length, 0)
  grandTotal += urlCount
  console.log(`  ${col.file}: ${entries.length} slugs → ${urlCount} urls (${entries.reduce((n, e) => Math.max(n, e.builtLocales.length), 0)} max locales/slug)`)
  subSitemaps.push({ file: col.file, lastmod: maxLastmod })
}

writeFileSync(join(DIST, 'sitemap_index.xml'), emitIndex(subSitemaps))
console.log(`  sitemap_index.xml: ${subSitemaps.length} sub-sitemaps, ${grandTotal} total urls`)
