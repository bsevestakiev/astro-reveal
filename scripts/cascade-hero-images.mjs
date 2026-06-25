#!/usr/bin/env node
// Patches the dark-hero `image:` + `imageSrcset:` + `imageAlt:` fields in each
// B1 vertical YAML with the real WP hero image URLs (extracted from the wget
// snapshot). Many of the existing values are fabricated by-pattern paths that
// 404 on the CDN. Idempotent.

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const VERTICALS = [
  'banking-analytics',
  'crm-analytics',
  'crypto-analytics',
  'education-analytics',
  'embedded-analytics-statistics',
  'energy-analytics',
  'finance-analytics',
  'healthcare-analytics',
  'insurance-analytics',
  'isv-analytics',
  'it-analytics',
  'manufacturing-analytics',
  'mining-analytics',
  'on-prem-analytics',
  'real-estate-analytics',
  'retail-analytics',
  'supply-chain-analytics',
  'telecommunications-analytics',
  'white-label-analytics',
]

const WP_ROOT = resolve('../www.revealbi.io')
const MD_ROOT = resolve('src/content/pages/en')

function extractHeroImage(slug) {
  const path = `${WP_ROOT}/${slug}.html`
  if (!existsSync(path)) return null
  const html = readFileSync(path, 'utf8')
  const heroIdx = html.indexOf('bg-header-teardrop')
  if (heroIdx === -1) return null
  const block = html.slice(heroIdx, heroIdx + 8000)
  // First <img> with src= pointing at static.infragistics.com (skip the SVG illustration if already in the same block)
  const imgMatch = block.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/)
  if (!imgMatch) return null
  const tag = imgMatch[0]
  const src = imgMatch[1]
  const altMatch = tag.match(/alt=["']([^"']*)["']/)
  const srcsetMatch = tag.match(/srcset=["']([^"']+)["']/)
  return {
    src,
    alt: altMatch ? altMatch[1] : '',
    srcsetRaw: srcsetMatch ? srcsetMatch[1] : null,
  }
}

// Convert WP srcset like "url480.png 480w, url768.png 768w, url1100.png 1100w"
// into our YAML format: { media, srcset } pairs. WP only emits one srcset on
// the <img>, so we use the desktop-min-width media we already use elsewhere
// (>= 960px → the largest image).
function buildYamlSrcset(srcsetRaw, fallbackSrc) {
  if (!srcsetRaw) return null
  const items = srcsetRaw.split(',').map((s) => s.trim())
  const largest = items
    .map((s) => {
      const m = s.match(/^(\S+)\s+(\d+)w$/)
      return m ? { url: m[1], w: parseInt(m[2], 10) } : null
    })
    .filter(Boolean)
    .sort((a, b) => b.w - a.w)[0]
  if (!largest) return null
  if (largest.url === fallbackSrc) return null
  return [{ media: '(min-width: 960px)', srcset: largest.url }]
}

function patchYaml(slug, hero) {
  const mdPath = `${MD_ROOT}/${slug}.md`
  if (!existsSync(mdPath)) return { slug, status: 'skip:no-md' }
  let text = readFileSync(mdPath, 'utf8')
  const original = text

  // Find the dark-hero block. Anchor on `- type: dark-hero` and run until the
  // next `- type:` (next sibling). Then within that block edit image / imageAlt
  // / imageSrcset.
  const heroMatch = text.match(/(- type: dark-hero[\s\S]*?)(\n\s{0,4}- type:|\n---|$)/)
  if (!heroMatch) return { slug, status: 'skip:no-dark-hero' }
  let block = heroMatch[1]

  // image:
  block = block.replace(/(\n\s+image:\s*)("[^"]*"|\S+)/, `$1"${hero.src}"`)

  // imageAlt:
  if (/\n\s+imageAlt:/.test(block)) {
    block = block.replace(/(\n\s+imageAlt:\s*)("[^"]*"|\S+)/, `$1"${hero.alt}"`)
  } else {
    // Append imageAlt right after image:
    block = block.replace(/(\n(\s+)image:.*\n)/, `$1$2imageAlt: "${hero.alt}"\n`)
  }

  // imageSrcset: rewrite or insert before imageAlt
  const srcsetEntries = buildYamlSrcset(hero.srcsetRaw, hero.src)
  // strip existing imageSrcset block (multiline list)
  block = block.replace(/\n\s+imageSrcset:\s*\n(?:\s+-[^\n]*\n(?:\s+srcset:[^\n]*\n)?)+/g, '\n')

  if (srcsetEntries) {
    // Insert AFTER image: (block may end at imageAlt's closing quote, no trailing \n)
    const ss = srcsetEntries
      .map((e) => `\n    imageSrcset:\n      - media: "${e.media}"\n        srcset: "${e.srcset}"`)
      .join('')
    block = block.replace(/(\n\s+image:[^\n]*)/, `$1${ss}`)
  }

  // Splice block back in
  text = text.replace(heroMatch[1], block)

  if (text === original) return { slug, status: 'unchanged' }
  writeFileSync(mdPath, text)
  return { slug, status: 'updated', src: hero.src }
}

function main() {
  console.log(`scanning ${VERTICALS.length} verticals…`)
  const results = []
  for (const slug of VERTICALS) {
    const hero = extractHeroImage(slug)
    if (!hero) {
      results.push({ slug, status: 'skip:no-hero-img-in-wp' })
      continue
    }
    results.push(patchYaml(slug, hero))
  }
  for (const r of results) {
    console.log(` ${r.status.padEnd(28)} ${r.slug}${r.src ? '  →  ' + r.src : ''}`)
  }
  const updated = results.filter((r) => r.status === 'updated').length
  console.log(`\n${updated}/${VERTICALS.length} updated`)
}

main()
