#!/usr/bin/env node
// Audits A1 blog post YAML against the WP source HTML for two known bugs:
//   1. title mismatch — YAML title was extracted from <meta og:title>, not the
//      visible <h1 class="entry-title">. WP renames posts; the SEO title and
//      the on-page title diverge.
//   2. heroImage path — some posts have `../wp-content/uploads/...` or
//      `../../wp-staging.revealbi.io/...` which won't resolve in our build
//      (cdn() prepends static.infragistics.com which isn't where these live).
//
// Pass --apply to write the fixes back. Default is read-only audit.

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'

const APPLY = process.argv.includes('--apply')

const BLOG_DIR = resolve('src/content/blog/en')
const WP_BLOG_DIR = resolve('../www.revealbi.io/blog')

function decodeEntities(s) {
  return s
    .replace(/&#8217;|&#x2019;/g, '’')
    .replace(/&#8216;|&#x2018;/g, '‘')
    .replace(/&#8220;|&#x201C;/g, '“')
    .replace(/&#8221;|&#x201D;/g, '”')
    .replace(/&#8211;|&ndash;/g, '–')
    .replace(/&#8212;|&mdash;/g, '—')
    .replace(/&#038;|&amp;/g, '&')
    .replace(/&#8230;/g, '…')
    .replace(/&nbsp;| /g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#(\d+);/g, (_m, n) => String.fromCodePoint(parseInt(n, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_m, h) => String.fromCodePoint(parseInt(h, 16)))
}

function cleanTitle(s) {
  let t = decodeEntities(s).replace(/\s+/g, ' ').trim()
  t = t.replace(/\s*\|\s*Reveal\b[^|]*$/i, '')
  return t
}

function extractWpFields(slug) {
  const path = `${WP_BLOG_DIR}/${slug}.html`
  if (!existsSync(path)) return null
  const html = readFileSync(path, 'utf8')
  const idx = html.indexOf('header__main')
  if (idx < 0) return null
  const block = html.slice(idx, idx + 6000)

  const h1 = block.match(/<h1[^>]*entry-title[^>]*>([^<]+)<\/h1>/)?.[1]
  const heroImg = block.match(/<img[^>]*class=['"]col-8[^'"]+['"][^>]*src=['"]([^'"]+)['"]/)?.[1]
    ?? block.match(/<img[^>]*class=['"][^'"]*col-8[^'"]+['"][^>]*src=['"]([^'"]+)['"]/)?.[1]
  return {
    h1: h1 ? cleanTitle(h1) : null,
    heroSrc: heroImg ?? null,
  }
}

function readYamlFields(slug) {
  const path = `${BLOG_DIR}/${slug}.md`
  if (!existsSync(path)) return null
  const text = readFileSync(path, 'utf8')
  // Front matter
  const fm = text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ''
  const title = fm.match(/^title:\s*"([^"]*)"/m)?.[1] ?? null
  const heroImage = fm.match(/^heroImage:\s*"([^"]*)"/m)?.[1] ?? null
  const cover = fm.match(/^cover:\s*"([^"]*)"/m)?.[1] ?? null
  return { title, heroImage, cover, raw: text }
}

// Convert WP hero src into a YAML heroImage value our cdn() helper resolves.
//   https://static.infragistics.com/marketing/reveal/blogs/foo.svg -> /blogs/foo.svg
//   ../wp-content/uploads/2025/08/reveal-fallback-image.svg        -> /blog/fallback-image.svg (local copy in public/)
//   ../../wp-staging.revealbi.io/...reveal-X-header.svg            -> drop unresolvable host, treat as missing → /blog/fallback-image.svg
// WP serves a fallback SVG at this exact URL when the post has no custom hero
// illustration. Use the absolute URL so cdn() leaves it alone (it's not on the
// Reveal CDN, it's on the WP host). Resolves identically in the harness (WP
// host is allowlisted and routed to localhost) and in prod (WP still serves
// it). When we cut over fully off WP, swap to a self-hosted asset.
const FALLBACK_HERO = 'https://www.revealbi.io/wp-content/uploads/2025/08/reveal-fallback-image.svg'

function normalizeHeroSrc(src) {
  if (!src) return null
  if (/wp-content\/uploads\/.*reveal-fallback-image\.svg$/i.test(src)) return FALLBACK_HERO
  if (/wp-staging\.revealbi\.io/i.test(src)) return FALLBACK_HERO
  const cdnMatch = src.match(/^https?:\/\/static\.infragistics\.com\/marketing\/reveal\/(.*)$/)
  if (cdnMatch) return '/' + cdnMatch[1]
  if (src.startsWith('http')) return src
  return src
}

function patchYaml(slug, fixes) {
  const path = `${BLOG_DIR}/${slug}.md`
  let text = readFileSync(path, 'utf8')
  const original = text
  if (fixes.title != null) {
    text = text.replace(/^(title:\s*)"[^"]*"/m, (_m, p) => `${p}${JSON.stringify(fixes.title)}`)
  }
  if (fixes.heroImage != null) {
    if (/^heroImage:/m.test(text)) {
      text = text.replace(/^(heroImage:\s*)"[^"]*"/m, (_m, p) => `${p}${JSON.stringify(fixes.heroImage)}`)
    } else {
      // Insert after `cover:` if present; else after `author:` or `date:`
      const insertAfter = ['cover', 'author', 'date'].find((k) => new RegExp(`^${k}:`, 'm').test(text))
      if (insertAfter) {
        text = text.replace(new RegExp(`^(${insertAfter}:[^\\n]*\\n)`, 'm'), `$1heroImage: ${JSON.stringify(fixes.heroImage)}\n`)
      }
    }
  }
  if (text !== original) writeFileSync(path, text)
  return text !== original
}

function main() {
  const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md') && f !== 'index.md')
  console.log(`scanning ${files.length} blog posts (apply=${APPLY})\n`)
  const issues = { title: [], hero: [], both: [], ok: [], wpMissing: [] }

  for (const file of files) {
    const slug = file.replace(/\.md$/, '')
    const yaml = readYamlFields(slug)
    if (!yaml) continue
    const wp = extractWpFields(slug)
    if (!wp) { issues.wpMissing.push(slug); continue }

    const titleMismatch = wp.h1 && yaml.title && cleanTitle(yaml.title) !== wp.h1
    const wantedHero = normalizeHeroSrc(wp.heroSrc)
    const heroMismatch = wantedHero && yaml.heroImage !== wantedHero

    const fixes = {}
    if (titleMismatch) fixes.title = wp.h1
    if (heroMismatch) fixes.heroImage = wantedHero

    if (titleMismatch && heroMismatch) issues.both.push({ slug, fixes, prev: yaml })
    else if (titleMismatch) issues.title.push({ slug, fixes, prev: yaml })
    else if (heroMismatch) issues.hero.push({ slug, fixes, prev: yaml })
    else issues.ok.push(slug)

    if (APPLY && (titleMismatch || heroMismatch)) {
      patchYaml(slug, fixes)
    }
  }

  const print = (label, list, showFix) => {
    console.log(`${label} (${list.length})`)
    for (const it of list) {
      const slug = typeof it === 'string' ? it : it.slug
      console.log(`  ${slug}`)
      if (showFix && it.fixes) {
        if (it.fixes.title) console.log(`     title:     ${JSON.stringify(it.prev.title)} → ${JSON.stringify(it.fixes.title)}`)
        if (it.fixes.heroImage) console.log(`     heroImage: ${JSON.stringify(it.prev.heroImage)} → ${JSON.stringify(it.fixes.heroImage)}`)
      }
    }
  }
  print('Title mismatch only', issues.title, true)
  print('Hero mismatch only', issues.hero, true)
  print('Title + Hero mismatch', issues.both, true)
  print('OK (no diffs)', issues.ok, false)
  print('No WP source', issues.wpMissing, false)
  console.log(`\n${issues.title.length + issues.hero.length + issues.both.length} posts need fixes (out of ${files.length})`)
  if (!APPLY) console.log('--apply to write fixes')
}

main()
