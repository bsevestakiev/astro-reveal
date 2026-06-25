#!/usr/bin/env node
// Apply a translated batch back to the built HTML.
//
// Reads:
//   .batch/<locale>/manifest.json
//   .batch/<locale>/source-strings.json
//   .batch/<locale>/cache-hits.json
//   .batch/<locale>/chunks/NN-out.json      one per chunk, written by Haiku agents
//                                           shape: { "globalIndex": "translated", ... }
//   .batch/<locale>/positions/<safe-slug>.json   per page
//   scripts/translation/.cache/<locale>.json     persistent cache (read + write)
//
// For each page, walks the source HTML with the SAME filter as extract,
// replaces text nodes, runs the locale postprocess from inject-text.mjs, then
// swaps in localized chrome from dist/<locale>/index.html.
//
// Writes localized HTML to dist/<locale>/<slug>/index.html.
//
// Usage:
//   node scripts/translation/apply-batch.mjs <locale> [--keep-en-chrome]
//
// --keep-en-chrome  skip the chrome-swap step (output keeps EN nav/footer).
//                   Useful if a locale doesn't have a built dist/<locale>/index.html donor.

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import * as cheerio from 'cheerio'

const args = process.argv.slice(2)
const KEEP_EN_CHROME = args.includes('--keep-en-chrome')
const [locale] = args.filter((a) => !a.startsWith('--'))
if (!locale) {
  console.error('Usage: node scripts/translation/apply-batch.mjs <locale> [--keep-en-chrome]')
  process.exit(2)
}

const ROOT = resolve(process.cwd())
const BATCH_DIR = resolve(ROOT, '.batch', locale)
const CACHE_PATH = resolve(ROOT, 'scripts/translation/.cache', `${locale}.json`)
const DONOR_PATH = resolve(ROOT, 'dist', locale, 'index.html')

if (!existsSync(BATCH_DIR)) {
  console.error(`No batch dir: ${BATCH_DIR}. Run prepare-batch.mjs first.`)
  process.exit(2)
}

const manifest = JSON.parse(readFileSync(resolve(BATCH_DIR, 'manifest.json'), 'utf-8'))
const sourceStrings = JSON.parse(readFileSync(resolve(BATCH_DIR, 'source-strings.json'), 'utf-8')).strings
const cacheHits = JSON.parse(readFileSync(resolve(BATCH_DIR, 'cache-hits.json'), 'utf-8'))

// Merge chunk outputs.
const chunkDir = resolve(BATCH_DIR, 'chunks')
const outFiles = readdirSync(chunkDir).filter((f) => /-out\.json$/.test(f)).sort()
console.log(`Found ${outFiles.length} chunk-out files`)

const translations = new Array(sourceStrings.length)
// Seed with cache hits.
let appliedFromCache = 0
for (const [k, v] of Object.entries(cacheHits)) {
  translations[Number(k)] = v
  appliedFromCache++
}

let appliedFromChunks = 0
for (const f of outFiles) {
  const obj = JSON.parse(readFileSync(resolve(chunkDir, f), 'utf-8'))
  for (const [k, v] of Object.entries(obj)) {
    const idx = Number(k)
    if (typeof v === 'string' && v.length > 0) {
      translations[idx] = v
      appliedFromChunks++
    }
  }
}

// Fall back to source for any unfilled slot.
let unfilled = 0
for (let i = 0; i < sourceStrings.length; i++) {
  if (translations[i] === undefined) {
    translations[i] = sourceStrings[i]
    unfilled++
  }
}

console.log(`Filled: ${appliedFromCache} from cache + ${appliedFromChunks} from chunks (unfilled: ${unfilled})`)

// Write updated cache: source EN -> translation.
let cache = {}
if (existsSync(CACHE_PATH)) cache = JSON.parse(readFileSync(CACHE_PATH, 'utf-8'))
let cacheAdded = 0
for (let i = 0; i < sourceStrings.length; i++) {
  const en = sourceStrings[i]
  const tr = translations[i]
  if (typeof tr === 'string' && tr.length > 0 && cache[en] !== tr) {
    cache[en] = tr
    cacheAdded++
  }
}
mkdirSync(dirname(CACHE_PATH), { recursive: true })
writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2), 'utf-8')
console.log(`Cache: ${cacheAdded} new entries written → ${CACHE_PATH}`)

// ── Per-page inject + swap-chrome ───────────────────────────────────────────
const LOCALE_TAG = { es: 'es', ja: 'ja', ko: 'ko', 'pt-BR': 'pt-BR' }
const OG_LOCALE = { es: 'es_ES', ja: 'ja_JP', ko: 'ko_KR', 'pt-BR': 'pt_BR' }
const langTag = LOCALE_TAG[locale] ?? locale
const ogLocale = OG_LOCALE[locale] ?? locale

const KEEPABLE = /[a-zA-Z]/
const SKIP_TYPES = new Set(['script', 'style'])
const SKIP_TAGS = new Set(['noscript'])
const SKIP_SELECTORS = ['#mega-menu-wrap-max_mega_menu_1', '#footer']

let donor$ = null
if (!KEEP_EN_CHROME) {
  if (!existsSync(DONOR_PATH)) {
    console.warn(`WARN: chrome donor missing (${DONOR_PATH}). Falling back to --keep-en-chrome.`)
  } else {
    donor$ = cheerio.load(readFileSync(DONOR_PATH, 'utf-8'))
  }
}

function setInLanguage(node, lang) {
  if (Array.isArray(node)) {
    node.forEach((n) => setInLanguage(n, lang))
  } else if (node && typeof node === 'object') {
    if ('inLanguage' in node) node.inLanguage = lang
    for (const k of Object.keys(node)) setInLanguage(node[k], lang)
  }
}

let pagesDone = 0
for (const page of manifest.pages) {
  const html = readFileSync(page.htmlPath, 'utf-8')
  const $ = cheerio.load(html)

  const skipSet = new Set()
  for (const sel of SKIP_SELECTORS) {
    $(sel).each((_i, el) => skipSet.add(el))
  }

  const pageMeta = JSON.parse(readFileSync(resolve(BATCH_DIR, 'positions', `${page.safeSlug}.json`), 'utf-8'))
  const positions = pageMeta.positions

  let posIdx = 0
  let replaced = 0
  let missing = 0
  function applyWalk(node) {
    if (!node) return
    if (skipSet.has(node)) return
    if (SKIP_TYPES.has(node.type)) return
    if (node.type === 'tag' && SKIP_TAGS.has(node.name)) return
    if (node.type === 'text') {
      const t = (node.data ?? '').trim()
      if (t.length >= 2 && KEEPABLE.test(t)) {
        const stringId = positions[posIdx++]
        const tr = translations[stringId]
        if (typeof tr === 'string' && tr.length > 0) {
          const orig = node.data ?? ''
          const leading = orig.match(/^\s*/)[0]
          const trailing = orig.match(/\s*$/)[0]
          node.data = leading + tr + trailing
          replaced++
        } else {
          missing++
        }
      }
      return
    }
    if (node.children && Array.isArray(node.children)) {
      for (const child of node.children) applyWalk(child)
    }
  }
  for (const root of $.root().toArray()) applyWalk(root)

  // Postprocess.
  $('html').attr('lang', langTag)
  if ($('meta[property="og:locale"]').length) {
    $('meta[property="og:locale"]').attr('content', ogLocale)
  } else {
    $('head').append(`\n  <meta property="og:locale" content="${ogLocale}" />`)
  }
  const canonical = $('link[rel="canonical"]')
  if (canonical.length) {
    const href = canonical.attr('href') ?? ''
    try {
      const u = new URL(href)
      if (!u.pathname.startsWith(`/${locale}/`)) {
        u.pathname = `/${locale}${u.pathname}`
        canonical.attr('href', u.toString())
      }
    } catch { /* ignore */ }
  }
  $('script[type="application/ld+json"]').each((_i, el) => {
    const $el = $(el)
    const text = $el.text()
    if (!text.trim()) return
    let data
    try { data = JSON.parse(text) } catch { return }
    setInLanguage(data, langTag)
    $el.text(JSON.stringify(data))
  })
  if (!$('meta[name="generator-translation"]').length) {
    $('head').append(`\n  <meta name="generator-translation" content="translation-manager pilot, ${locale}" />`)
  }

  // Meta tags: description, og:*, twitter:* — looked up via cache (extract
  // only walks text nodes, so these attrs were never extracted/translated
  // through the chunk pipeline; they piggyback on cache hits from visible
  // text that happens to match the meta content verbatim).
  const META_SELECTORS = [
    'meta[name="description"]',
    'meta[property="og:title"]',
    'meta[property="og:description"]',
    'meta[property="og:image:alt"]',
    'meta[name="twitter:title"]',
    'meta[name="twitter:description"]',
  ]
  for (const sel of META_SELECTORS) {
    $(sel).each((_i, el) => {
      const $el = $(el)
      const en = $el.attr('content') ?? ''
      if (!en) return
      const tr = cache[en]
      if (typeof tr === 'string' && tr.length > 0 && tr !== en) {
        $el.attr('content', tr)
      }
    })
  }

  // Chrome swap.
  if (donor$) {
    for (const sel of SKIP_SELECTORS) {
      const donorEl = donor$(sel)
      const targetEl = $(sel)
      if (donorEl.length && targetEl.length) {
        targetEl.replaceWith(donor$.html(donorEl))
      }
    }
    // Donor chrome's lang-switcher hrefs point to the donor's own URL
    // (the locale homepage); rewrite them to the equivalent path under
    // each locale so the switcher preserves the current page.
    const slugPath = page.slug ? `/${page.slug}/` : '/'
    $('.wovn-switch').each((_i, el) => {
      const $a = $(el)
      const target = $a.attr('data-value') ?? ''
      let href
      if (!target || target === 'en') {
        href = slugPath
      } else {
        href = slugPath === '/' ? `/${target}` : `/${target}${slugPath}`
      }
      $a.attr('href', href)
    })
  }

  const outPath = resolve(ROOT, 'dist', locale, page.slug, 'index.html')
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, $.html(), 'utf-8')
  pagesDone++
  console.log(`  ${page.slug}  →  ${outPath}  (replaced ${replaced}, missing ${missing})`)
}

console.log('')
console.log(`Done. ${pagesDone} pages written under dist/${locale}/`)
