#!/usr/bin/env node
// Regenerate localized blog listing/pagination/category pages from the
// fresh EN listing HTML using each locale's translation cache.
//
// Background (caveat #3): the deleted [lang]/blog/{index,page,category}
// templates referenced src/content/blog/<loc>/*.md files that don't exist
// — translation lives only in built HTML, not source markdown. So we can't
// restore the templates and rebuild. Instead, treat the freshly-built EN
// listing HTML as the structural source-of-truth and translate it via
// cache lookup (same approach as apply-batch.mjs uses for per-post pages,
// minus the chunked-batch mechanics).
//
// Per locale × listing page:
//   1. Load EN HTML (dist/blog/index.html, dist/blog/page/N/index.html,
//      dist/blog/category/<cat>/index.html)
//   2. Walk text nodes with same SKIP filter as extract-text.mjs and
//      replace each from cache[en]; miss → leave EN
//   3. Postprocess: <html lang>, og:locale, canonical, ld+json, generator
//   4. Rewrite content-area internal hrefs to /<locale>/...
//   5. Chrome swap from dist/<locale>/index.html
//   6. Write to dist/<locale>/blog/... and mirror to public/<locale>/blog/...
//
// Meta-tag translation and lang-switcher href correction are NOT done
// here — re-run fix-meta-tags.mjs and fix-lang-switcher-hrefs.mjs after.
//
// Usage:
//   node scripts/translation/translate-listings.mjs

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname, relative, join } from 'node:path'
import * as cheerio from 'cheerio'

const ROOT = resolve(process.cwd())
const LOCALES = ['es', 'ja', 'ko', 'pt-BR']
const LOCALE_TAG = { es: 'es', ja: 'ja', ko: 'ko', 'pt-BR': 'pt-BR' }
const OG_LOCALE = { es: 'es_ES', ja: 'ja_JP', ko: 'ko_KR', 'pt-BR': 'pt_BR' }

const KEEPABLE = /[a-zA-Z]/
const SKIP_TYPES = new Set(['script', 'style'])
const SKIP_TAGS = new Set(['noscript'])
const SKIP_SELECTORS = ['#mega-menu-wrap-max_mega_menu_1', '#footer']

// Path prefixes whose hrefs we rewrite to /<locale>/...
const REWRITE_PREFIXES = ['/blog/', '/glossary/', '/stories/', '/webinars/', '/whitepapers/']

function findEnListings() {
  const list = []
  if (existsSync(resolve(ROOT, 'dist/blog/index.html'))) {
    list.push('dist/blog/index.html')
  }
  for (const sub of ['page', 'category']) {
    const dir = resolve(ROOT, `dist/blog/${sub}`)
    if (!existsSync(dir)) continue
    for (const name of readdirSync(dir)) {
      const f = resolve(dir, name, 'index.html')
      if (existsSync(f) && statSync(f).isFile()) {
        list.push(`dist/blog/${sub}/${name}/index.html`)
      }
    }
  }
  return list
}

function setInLanguage(node, lang) {
  if (Array.isArray(node)) {
    node.forEach((n) => setInLanguage(n, lang))
  } else if (node && typeof node === 'object') {
    if ('inLanguage' in node) node.inLanguage = lang
    for (const k of Object.keys(node)) setInLanguage(node[k], lang)
  }
}

function isWithin(node, skipSet) {
  let cur = node
  while (cur) {
    if (skipSet.has(cur)) return true
    cur = cur.parent
  }
  return false
}

function translateOne(enRelPath, locale, cache, donor$) {
  const enAbs = resolve(ROOT, enRelPath)
  const html = readFileSync(enAbs, 'utf-8')
  const $ = cheerio.load(html)

  const skipSet = new Set()
  for (const sel of SKIP_SELECTORS) {
    $(sel).each((_i, el) => skipSet.add(el))
  }

  let replaced = 0
  let missing = 0
  function walk(node) {
    if (!node) return
    if (skipSet.has(node)) return
    if (SKIP_TYPES.has(node.type)) return
    if (node.type === 'tag' && SKIP_TAGS.has(node.name)) return
    if (node.type === 'text') {
      const orig = node.data ?? ''
      const t = orig.trim()
      if (t.length >= 2 && KEEPABLE.test(t)) {
        const tr = cache[t]
        if (typeof tr === 'string' && tr.length > 0 && tr !== t) {
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
      for (const child of node.children) walk(child)
    }
  }
  for (const root of $.root().toArray()) walk(root)

  // Postprocess.
  $('html').attr('lang', LOCALE_TAG[locale])
  if ($('meta[property="og:locale"]').length) {
    $('meta[property="og:locale"]').attr('content', OG_LOCALE[locale])
  } else {
    $('head').append(`\n  <meta property="og:locale" content="${OG_LOCALE[locale]}" />`)
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
    setInLanguage(data, LOCALE_TAG[locale])
    $el.text(JSON.stringify(data))
  })
  if (!$('meta[name="generator-translation"]').length) {
    $('head').append(`\n  <meta name="generator-translation" content="translation-manager pilot, ${locale}" />`)
  }

  // Rewrite internal hrefs in the content area (before chrome swap so we
  // don't touch the donor's already-localized chrome links).
  let hrefsRewritten = 0
  $('a[href]').each((_i, el) => {
    if (isWithin(el, skipSet)) return
    const href = $(el).attr('href') ?? ''
    if (!REWRITE_PREFIXES.some((p) => href.startsWith(p))) return
    $(el).attr('href', `/${locale}${href}`)
    hrefsRewritten++
  })

  // Chrome swap.
  if (donor$) {
    for (const sel of SKIP_SELECTORS) {
      const donorEl = donor$(sel)
      const targetEl = $(sel)
      if (donorEl.length && targetEl.length) {
        targetEl.replaceWith(donor$.html(donorEl))
      }
    }
  }

  // Compute output path: dist/blog/...  →  dist/<locale>/blog/...
  const distRelative = enRelPath.replace(/^dist\//, '')
  const outDistPath = resolve(ROOT, 'dist', locale, distRelative)
  const outPublicPath = resolve(ROOT, 'public', locale, distRelative)

  const out = $.html()
  mkdirSync(dirname(outDistPath), { recursive: true })
  writeFileSync(outDistPath, out, 'utf-8')
  mkdirSync(dirname(outPublicPath), { recursive: true })
  writeFileSync(outPublicPath, out, 'utf-8')

  return { replaced, missing, hrefsRewritten }
}

let totalPages = 0
const enListings = findEnListings()
console.log(`Found ${enListings.length} EN listing pages.`)

for (const locale of LOCALES) {
  const cachePath = resolve(ROOT, 'scripts/translation/.cache', `${locale}.json`)
  if (!existsSync(cachePath)) {
    console.warn(`[${locale}] cache missing — skipping`)
    continue
  }
  const cache = JSON.parse(readFileSync(cachePath, 'utf-8'))

  const donorPath = resolve(ROOT, 'dist', locale, 'index.html')
  let donor$ = null
  if (existsSync(donorPath)) {
    donor$ = cheerio.load(readFileSync(donorPath, 'utf-8'))
  } else {
    console.warn(`[${locale}] chrome donor missing (${donorPath}) — chrome will stay EN`)
  }

  let localeReplaced = 0
  let localeMissing = 0
  let localeHrefs = 0
  for (const enPath of enListings) {
    const r = translateOne(enPath, locale, cache, donor$)
    localeReplaced += r.replaced
    localeMissing += r.missing
    localeHrefs += r.hrefsRewritten
    totalPages++
  }
  console.log(`[${locale}] ${enListings.length} pages — text replaced=${localeReplaced}, missing=${localeMissing}, hrefs rewritten=${localeHrefs}`)
}

console.log('')
console.log(`Done. ${totalPages} total localized listing pages written to dist + public.`)
console.log('Now run: node scripts/translation/fix-meta-tags.mjs')
console.log('Then:    node scripts/translation/fix-lang-switcher-hrefs.mjs')
