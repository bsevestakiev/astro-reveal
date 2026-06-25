#!/usr/bin/env node
// Patches the dark-hero block of the 5 sparse-layout B1 vertical pages whose
// WP source uses a different hero variant than the canonical bg-header-teardrop:
//   - energy / insurance / manufacturing → bg--french-rose (solid pink)
//   - embedded-analytics-statistics      → bg-gradient--primary (gradient)
//   - on-prem-analytics                  → bg-tech (gradient + tech overlay)
// Maps each to the new DarkHero variant (flat-split / tech-centered) with the
// real WP h1, subhead, hero image, srcset, and trust-badge SVG.
//
// White-label-analytics is structurally too different (video + plain container)
// and is deferred to its own component.

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const WP_ROOT = resolve('../www.revealbi.io')
const MD_ROOT = resolve('src/content/pages/en')

const PAGES = {
  'energy-analytics':              { variant: 'flat-split', wrapper: 'bg--french-rose', accentColor: '#EC417A' },
  'insurance-analytics':           { variant: 'flat-split', wrapper: 'bg--french-rose', accentColor: '#EC417A' },
  'manufacturing-analytics':       { variant: 'flat-split', wrapper: 'bg--french-rose', accentColor: '#EC417A' },
  'embedded-analytics-statistics': { variant: 'flat-split', wrapper: 'bg-gradient--primary' },
  'on-prem-analytics':             { variant: 'tech-centered', wrapper: 'bg-tech' },
}

function decodeEntities(s) {
  return s
    .replace(/&#0?38;|&amp;/gi, '&')
    .replace(/&#0?39;|&apos;/gi, "'")
    .replace(/&#8217;|&#x2019;/gi, '’')
    .replace(/&quot;/gi, '"')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#(\d+);/g, (_m, n) => String.fromCodePoint(parseInt(n, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_m, h) => String.fromCodePoint(parseInt(h, 16)))
}

function clean(s) {
  if (!s) return s
  return decodeEntities(s).replace(/\s+/g, ' ').trim()
}

function parseSrcset(raw) {
  if (!raw) return null
  const items = raw.split(',').map((s) => s.trim())
  const sized = items
    .map((s) => {
      const m = s.match(/^(\S+)\s+(\d+)w$/)
      return m ? { url: m[1], w: parseInt(m[2], 10) } : null
    })
    .filter(Boolean)
    .sort((a, b) => b.w - a.w)
  return sized
}

function extractFields(slug, cfg) {
  const html = readFileSync(`${WP_ROOT}/${slug}.html`, 'utf8')
  const heroIdx = html.indexOf(cfg.wrapper)
  if (heroIdx === -1) return null
  // Bound: until the next <!-- SECTION
  const end = html.indexOf('<!-- SECTION', heroIdx)
  const block = html.slice(heroIdx, end > heroIdx ? end : heroIdx + 8000)

  const h1 = clean(block.match(/<h1[^>]*>([^<]+)<\/h1>/)?.[1])

  // First non-CTA <p>: skip CTAs (have class d-block d-md-none / d-none d-md-block).
  const paraMatches = [...block.matchAll(/<p(?![^>]*\bd-(?:none|block)\b)[^>]*>([^<]+)<\/p>/g)]
  const subhead = clean(paraMatches.find((m) => clean(m[1]).length > 60)?.[1])

  // Hero image: <img class="img-fluid b-lazy" data-src=... data-srcset=...>
  // Match the col-md-12 col-lg-6 (second col) image (skips trust badge which is inline in first col).
  let heroSrc = null, heroSrcsetRaw = null, heroAlt = ''
  const colImgs = [...block.matchAll(/<img[^>]+class=["']img-fluid\s+b-lazy["'][^>]*>/g)]
  if (colImgs.length > 0) {
    const tag = colImgs[colImgs.length - 1][0] // last image inside hero is the cover
    heroSrc = tag.match(/data-src=["']([^"']+)["']/)?.[1] ?? tag.match(/(?<!data-)src=["']([^"']+)["']/)?.[1]
    heroSrcsetRaw = tag.match(/data-srcset=["']([^"']+)["']/)?.[1] ?? tag.match(/(?<!data-)srcset=["']([^"']+)["']/)?.[1]
    heroAlt = clean(tag.match(/alt=["']([^"']*)["']/)?.[1] ?? '')
  }

  // Trust badge: <img src="static.infragistics.com/.../reveal-trust-ratings.svg" ...>
  let trustBadgeImage = null, trustBadgeAlt = ''
  const trustMatch = block.match(/<img[^>]+src=["']([^"']*reveal-trust-ratings[^"']*)["'][^>]*>/)
  if (trustMatch) {
    trustBadgeImage = trustMatch[1]
    trustBadgeAlt = clean(trustMatch[0].match(/alt=["']([^"']*)["']/)?.[1] ?? '')
  }

  const heroSrcset = parseSrcset(heroSrcsetRaw)

  return { h1, subhead, heroSrc, heroSrcset, heroAlt, trustBadgeImage, trustBadgeAlt, variant: cfg.variant, accentColor: cfg.accentColor }
}

function buildYamlBlock(fields) {
  const lines = ['  - type: dark-hero', `    variant: ${fields.variant}`]
  if (fields.accentColor) lines.push(`    accentColor: "${fields.accentColor}"`)
  if (fields.h1) lines.push(`    title: ${JSON.stringify(fields.h1)}`)
  if (fields.subhead) lines.push(`    subhead: ${JSON.stringify(fields.subhead)}`)
  lines.push('    ctaLabel: "Book a Personalized Demo"')
  lines.push('    secondaryCtaLabel: "Watch a Demo"')
  lines.push('    secondaryCtaHref: "/request-demo"')
  if (fields.heroSrc) {
    lines.push(`    image: "${fields.heroSrc}"`)
    if (fields.heroSrcset && fields.heroSrcset.length) {
      lines.push('    imageSrcset:')
      // Three breakpoints if available, else single
      const xl = fields.heroSrcset.find((x) => x.w >= 1100) || fields.heroSrcset[0]
      lines.push('      - media: "(min-width: 960px)"')
      lines.push(`        srcset: "${xl.url}"`)
    }
    if (fields.heroAlt) lines.push(`    imageAlt: ${JSON.stringify(fields.heroAlt)}`)
  }
  if (fields.trustBadgeImage) {
    lines.push(`    trustBadgeImage: "${fields.trustBadgeImage}"`)
    if (fields.trustBadgeAlt) lines.push(`    trustBadgeAlt: ${JSON.stringify(fields.trustBadgeAlt)}`)
  }
  return lines.join('\n')
}

function patchYaml(slug, fields) {
  const path = `${MD_ROOT}/${slug}.md`
  if (!existsSync(path)) return { slug, status: 'skip:no-md' }
  let text = readFileSync(path, 'utf8')

  // Replace the entire `- type: dark-hero` block (lazy, until the next `  - type:` or end of frontmatter `---`).
  const heroRe = /(  - type: dark-hero\n(?:    [^\n]*\n)*)/
  const m = text.match(heroRe)
  if (!m) return { slug, status: 'skip:no-dark-hero' }

  const newBlock = buildYamlBlock(fields) + '\n'
  text = text.replace(heroRe, newBlock)
  writeFileSync(path, text)
  return { slug, status: 'updated', variant: fields.variant }
}

function main() {
  const results = []
  for (const [slug, cfg] of Object.entries(PAGES)) {
    const fields = extractFields(slug, cfg)
    if (!fields) {
      results.push({ slug, status: 'skip:no-wp-hero' })
      continue
    }
    results.push(patchYaml(slug, fields))
  }
  for (const r of results) {
    console.log(`  ${r.status.padEnd(20)} ${r.slug}${r.variant ? '  →  ' + r.variant : ''}`)
  }
}

main()
