#!/usr/bin/env node
// B2 vs-competitor cascade.
//
// Idempotent. Walks the 13 reveal-vs-*.md files (skipping reveal-vs-power-bi,
// which was the hand-edited reference) and applies four classes of fix:
//   1. Hero image swap — replace the fabricated reveal-compete-*-768.png
//      placeholder with the real per-competitor CDN URL extracted from the
//      page's wget'd WP HTML.
//   2. Feature-row image swap — replace the other fabricated placeholders
//      (predictable-pricing, sdk, scale, white-label, ux) with known-good
//      CDN URLs reused across the family.
//   3. Insert a `section-header` after `comparison-table`, headline pulled
//      from WP's "Why is Reveal Better Than X" / "Why Reveal?" h2.
//   4. Promote the bottom `cta-block` from `gradient` to `wave-lines` with
//      the WP dashboard image.

import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const repoAstro = join(here, '..')
const repoRoot = join(repoAstro, '..')
const PAGES_DIR = join(repoAstro, 'src', 'content', 'pages', 'en')
const ORIGINAL_DIR = join(repoRoot, 'www.revealbi.io')

// Generic feature-row illustrations reused across all vs-* pages in WP.
const FEATURE_IMAGE_MAP = {
  'reveal-compete-why-teams-switch-768.png': '/images/vs/reveal-compete-why-teams-switch-768.webp',
  'reveal-compete-predictable-pricing-768.png': 'https://static.infragistics.com/marketing/reveal/reveal-embedded-analytics-pricing-illustration-1100.jpg',
  'reveal-compete-sdk-768.png': 'https://static.infragistics.com/marketing/reveal/reveal-embedded-analytics-logistics-dashboard.svg',
  'reveal-compete-scale-768.png': 'https://static.infragistics.com/marketing/reveal/reveal-embedded-analytics-pricing-illustration-1100.jpg',
  'reveal-compete-white-label-768.png': 'https://static.infragistics.com/marketing/reveal/reveal-match-brand-experience-mead-manufacturing-dashboard-768.png',
  'reveal-compete-ux-768.png': '/images/vs/reveal-panintelligence-api-768.png',
}

const CTA_DASHBOARD_IMAGE = '/images/vs/reveal-acme-analytics-dashboard-1600.png'

function decodeHtml(s) {
  return s
    .replace(/&#038;/g, '&').replace(/&amp;/g, '&').replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, '–').replace(/&#8212;/g, '—').replace(/&nbsp;/g, ' ')
    .replace(/&#039;/g, "'").replace(/&quot;/g, '"').replace(/&hellip;/g, '…')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .trim()
}

// Pull the per-competitor hero <img> from the WP HTML. The WP markup wraps
// the hero in `bg-gradient--primary pt-5`. The first <img ... src="...ppc/<dir>/...hero..."> after
// that wrapper is the hero. Falls back to a search for `reveal-<slug>-hero` if
// the wrapper anchor doesn't match cleanly.
function extractHeroFromWp(htmlPath, slug) {
  let html
  try { html = readFileSync(htmlPath, 'utf8') } catch { return null }
  // Find the gradient wrapper, then first ppc/<dir>/<slug>-hero img after.
  const wrapperIdx = html.indexOf('bg-gradient--primary')
  // Region needs to span the giant form select-options block before the hero img.
  const region = wrapperIdx >= 0 ? html.slice(wrapperIdx, wrapperIdx + 50000) : html
  // data-src is the canonical post-lazy-load URL; some pages have wrong
  // src= placeholders left over from templating (e.g. domo's src points to looker).
  let m = region.match(/data-src="(https:\/\/static\.infragistics\.com\/marketing\/reveal\/ppc\/[^"]+-hero[^"]+\.(?:png|webp|jpg|jpeg|svg))"/)
  if (m) return m[1]
  // Fallback: lazy-load src, with the suffix stripped.
  m = region.match(/src="(https:\/\/static\.infragistics\.com\/marketing\/reveal\/ppc\/[^"]+-hero[^"]+\.(?:png|webp|jpg|jpeg|svg))"/)
  if (m) return m[1].replace(/-lazy-load(?=\.[a-z]+$)/, '')
  return null
}

// Pull the "Why is Reveal Better Than X" / "Why Reveal?" section header h2.
function extractSectionHeader(htmlPath) {
  let html
  try { html = readFileSync(htmlPath, 'utf8') } catch { return null }
  // Look for the centered h1-class h2 used as the family-of-features header.
  const m = html.match(/<h2[^>]*class="h1"[^>]*>([^<]+)<\/h2>/)
  if (m) return decodeHtml(m[1])
  return null
}

// Pull the wave-lines CTA's headline + body + cta label from WP HTML.
function extractWaveLinesCta(htmlPath) {
  let html
  try { html = readFileSync(htmlPath, 'utf8') } catch { return null }
  const idx = html.indexOf('wave-lines')
  if (idx < 0) return null
  const region = html.slice(idx, idx + 4000)
  const headlineMatch = region.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)
  const subMatch = region.match(/<\/h2>\s*<p[^>]*>([\s\S]*?)<\/p>/)
  const ctaMatch = region.match(/<a[^>]*class="btn[^"]*ig-show-modal[^"]*"[^>]*>([^<]+)<\/a>/)
  return {
    headline: headlineMatch ? cleanHtml(headlineMatch[1]) : null,
    subheadline: subMatch ? cleanHtml(subMatch[1]) : null,
    ctaLabel: ctaMatch ? decodeHtml(ctaMatch[1]) : null,
  }
}

function cleanHtml(s) {
  // The validate-content allowlist permits class= but not style=. Convert
  // WP's inline `style="text-decoration:underline;"` to the Bootstrap class
  // `text-decoration-underline` so headlines pass validation while keeping
  // the visual emphasis WP applies.
  return s
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<span\s+style="text-decoration:\s*underline;?"\s*>/gi, '<span class="text-decoration-underline">')
    .replace(/&#038;/g, '&').replace(/&amp;/g, '&')
    .replace(/&#8217;/g, "'").replace(/&#8211;/g, '–').replace(/&nbsp;/g, ' ')
    .replace(/&#039;/g, "'").replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/\s+/g, ' ')
    .trim()
}

function escapeYaml(s) {
  if (!s) return ''
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

function processFile(slug) {
  const mdPath = join(PAGES_DIR, `reveal-vs-${slug}.md`)
  const htmlPath = join(ORIGINAL_DIR, `reveal-vs-${slug}.html`)
  let yaml = readFileSync(mdPath, 'utf8')
  const before = yaml
  const changes = []

  // 1. Hero image swap. Replaces whatever is currently on the dark-hero
  //    block's `image:` line. Idempotent because the WP-derived URL is canonical.
  const heroUrl = extractHeroFromWp(htmlPath, slug)
  if (heroUrl) {
    const heroSectionMatch = yaml.match(/(- type: dark-hero\b[\s\S]*?)(\n  - type:|$)/)
    if (heroSectionMatch) {
      const heroBlock = heroSectionMatch[1]
      const updated = heroBlock.replace(
        /(\n    image:\s*)("[^"]*"|'[^']*'|\S+)/,
        `$1"${heroUrl}"`,
      )
      if (updated !== heroBlock) {
        yaml = yaml.replace(heroBlock, updated)
        changes.push(`hero→${heroUrl.split('/').pop()}`)
      }
    }
  }

  // 2. Feature-row image swap (idempotent).
  for (const [from, to] of Object.entries(FEATURE_IMAGE_MAP)) {
    const fromEsc = from.replace(/\./g, '\\.').replace(/-/g, '\\-')
    const re = new RegExp(`https?://static\\.infragistics\\.com/marketing/reveal/ppc/${fromEsc}`, 'g')
    if (re.test(yaml)) {
      yaml = yaml.replace(re, to)
      changes.push(`fr:${from.split('-')[2] || from}`)
    }
  }

  // 3. Insert section-header after comparison-table (before the next feature-row).
  if (!/- type: section-header/.test(yaml)) {
    const headerText = extractSectionHeader(htmlPath) || `Why Reveal?`
    const insertion = `\n  - type: section-header\n    headline: "${escapeYaml(headerText)}"\n`
    // Anchor: end of the comparison-table block (the next `- type:` after).
    yaml = yaml.replace(
      /(- type: comparison-table[\s\S]*?)(\n  - type:)/,
      `$1${insertion}$2`,
    )
    changes.push('+section-header')
  }

  // 4. Promote bottom cta-block to wave-lines variant. The cta-block is the
  //    final section; its block runs from `- type: cta-block` to the `---`
  //    YAML closing marker (which we must keep at the end).
  const ctaBlockMatch = yaml.match(/(- type: cta-block[\s\S]*?)(\n---\s*\n?$)/)
  if (ctaBlockMatch && !/variant:\s*wave-lines/.test(ctaBlockMatch[1])) {
    const wpCta = extractWaveLinesCta(htmlPath)
    let block = ctaBlockMatch[1]
    const closing = ctaBlockMatch[2]
    // Replace variant: "gradient" or other → wave-lines.
    block = block.replace(/variant:\s*"[^"]*"/, `variant: wave-lines`)
    // Ensure image: present (append at end of block — before the YAML closer).
    if (!/^\s*image:\s/m.test(block)) {
      // Trim any trailing whitespace/newlines on the block, then append.
      block = block.replace(/\s+$/, '') + `\n    image: "${CTA_DASHBOARD_IMAGE}"\n    imageAlt: "Reveal Embedded Analytics"`
    }
    // Optionally update headline/subheadline from WP if extraction succeeded
    // (preserve whatever the YAML already has otherwise — content can be
    // tightened by a future content sweep).
    if (wpCta?.headline) {
      const newHead = wpCta.headline
      block = block.replace(/(headline:\s*)("[^"]*"|'[^']*')/, `$1"${escapeYaml(newHead)}"`)
    }
    if (wpCta?.subheadline) {
      const newSub = wpCta.subheadline
      block = block.replace(/(subheadline:\s*)("[^"]*"|'[^']*')/, `$1"${escapeYaml(newSub)}"`)
    }
    if (wpCta?.ctaLabel) {
      const newLabel = wpCta.ctaLabel
      block = block.replace(/(ctaLabel:\s*)("[^"]*"|'[^']*')/, `$1"${escapeYaml(newLabel)}"`)
    }
    yaml = yaml.replace(ctaBlockMatch[1] + closing, block + closing)
    changes.push('cta→wave-lines')
  }

  if (yaml !== before) {
    writeFileSync(mdPath, yaml)
    return changes
  }
  return null
}

const slugs = readdirSync(PAGES_DIR)
  .filter(f => /^reveal-vs-.+\.md$/.test(f))
  .map(f => f.replace(/^reveal-vs-/, '').replace(/\.md$/, ''))
  .filter(s => s !== 'power-bi')

let updated = 0, skipped = 0
for (const slug of slugs) {
  const r = processFile(slug)
  if (r) { console.log(`✓ ${slug}: ${r.join(', ')}`); updated++ }
  else { console.log(`- ${slug}: no changes`); skipped++ }
}
console.log(`\nupdated ${updated}, skipped ${skipped}`)
