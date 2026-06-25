#!/usr/bin/env node
// Surgical fix for caveat #2 — translate meta-tag content attrs in already-
// built localized HTML using each locale's persistent translation cache.
//
// Background: extract-text.mjs only walks text nodes, so the 6 SEO/social
// meta tags (description, og:title, og:description, og:image:alt,
// twitter:title, twitter:description) were never extracted, never sent to
// the translator, and never updated by apply-batch.mjs. The cache,
// however, has translations for many of these EN strings because the same
// text usually appears as visible <h1>/<title>/excerpt content somewhere on
// the page (and was extracted through that path). This script piggybacks
// on those cache hits and rewrites the meta attrs in place.
//
// Future apply-batch.mjs runs apply the same rewrite inline (see
// META_SELECTORS in apply-batch.mjs); this script patches existing
// dist/ + public/ trees in place.
//
// Usage:
//   node scripts/translation/fix-meta-tags.mjs

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { resolve, join } from 'node:path'

const ROOT = resolve(process.cwd())
const LOCALES = ['es', 'ja', 'ko', 'pt-BR']
const TREES = ['dist', 'public']
const META_ATTRS = new Set([
  'description',
  'og:title',
  'og:description',
  'og:image:alt',
  'twitter:title',
  'twitter:description',
])

const ENTITY_DECODE = {
  '&amp;': '&', '&#38;': '&',
  '&quot;': '"', '&#34;': '"',
  '&apos;': "'", '&#39;': "'",
  '&lt;': '<', '&#60;': '<',
  '&gt;': '>', '&#62;': '>',
  '&nbsp;': ' ',
}

function decodeEntities(s) {
  return s.replace(/&(?:amp|#38|quot|#34|apos|#39|lt|#60|gt|#62|nbsp);/g, (m) => ENTITY_DECODE[m] ?? m)
}

function encodeForAttr(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function* walkHtml(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const st = statSync(full)
    if (st.isDirectory()) yield* walkHtml(full)
    else if (st.isFile() && entry.endsWith('.html')) yield full
  }
}

const totals = { files: 0, hits: 0, misses: 0 }
const missCounts = new Map()

for (const locale of LOCALES) {
  const cachePath = resolve(ROOT, 'scripts/translation/.cache', `${locale}.json`)
  if (!existsSync(cachePath)) {
    console.warn(`[${locale}] cache missing — skipping`)
    continue
  }
  const cache = JSON.parse(readFileSync(cachePath, 'utf-8'))
  let localeFiles = 0
  let localeHits = 0
  let localeMisses = 0

  for (const tree of TREES) {
    const base = resolve(ROOT, tree, locale)
    if (!existsSync(base)) continue

    for (const file of walkHtml(base)) {
      const html = readFileSync(file, 'utf-8')
      let edits = 0

      const next = html.replace(/<meta\b[^>]*>/g, (tag) => {
        const nameMatch = tag.match(/(?:name|property)="([^"]+)"/)
        if (!nameMatch || !META_ATTRS.has(nameMatch[1])) return tag
        const contentMatch = tag.match(/content="([^"]*)"/)
        if (!contentMatch) return tag
        const en = decodeEntities(contentMatch[1])
        if (!en) return tag
        const tr = cache[en]
        if (typeof tr !== 'string' || tr.length === 0) {
          localeMisses++
          missCounts.set(en, (missCounts.get(en) ?? 0) + 1)
          return tag
        }
        if (tr === en) return tag
        const encoded = encodeForAttr(tr)
        if (encoded === contentMatch[1]) return tag
        edits++
        localeHits++
        return tag.replace(/content="[^"]*"/, `content="${encoded}"`)
      })

      if (edits > 0) {
        writeFileSync(file, next, 'utf-8')
        localeFiles++
      }
    }
  }

  console.log(`[${locale}] files=${localeFiles}  hits=${localeHits}  misses=${localeMisses}`)
  totals.files += localeFiles
  totals.hits += localeHits
  totals.misses += localeMisses
}

console.log('')
console.log(`Total: ${totals.files} files patched, ${totals.hits} hits, ${totals.misses} misses`)
console.log('')
console.log('Top 5 untranslated meta strings (still EN — would need a fresh translation pass):')
;[...missCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).forEach(([s, n]) => {
  console.log(`  [${n}x] ${JSON.stringify(s).slice(0, 120)}`)
})
