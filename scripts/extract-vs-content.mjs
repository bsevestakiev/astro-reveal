#!/usr/bin/env node
// B2 vs-competitor content sweep.
//
// Idempotent. Reads each `reveal-vs-<slug>.html` from the wget'd WP archive
// and overwrites three sections of `reveal-vs-<slug>.md`:
//   1. Hero `title` + `subhead` from the `bg-gradient--primary` block.
//   2. Family-of-features feature rows (typically 5) — replaces every
//      `feature-row` between the `section-header` and the `faq` block with
//      WP-extracted h2/p/image/reversed.
//   3. FAQ items from `<div id="accordion-faq">`.
//
// Other sections (the leading "Why Teams Switch off X" feature row,
// `comparison-table`, `reviews`, `cta-block`) are left as-is — they were
// already aligned by `cascade-vs-competitor.mjs`.

import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const repoAstro = join(here, '..')
const repoRoot = join(repoAstro, '..')
const PAGES_DIR = join(repoAstro, 'src', 'content', 'pages', 'en')
const ORIGINAL_DIR = join(repoRoot, 'www.revealbi.io')

function decodeHtml(s) {
  return s
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/&#038;/g, '&').replace(/&amp;/g, '&')
    .replace(/&#8217;/g, "'").replace(/&#8211;/g, '–').replace(/&#8212;/g, '—')
    .replace(/&#039;/g, "'").replace(/&quot;/g, '"').replace(/&hellip;/g, '…')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/\s+/g, ' ')
    .trim()
}

function escapeYaml(s) {
  if (!s) return ''
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

// Strip any HTML tag, return plain text.
function stripTags(s) {
  // Replace block-level / break tags with a space so adjacent text doesn't
  // mash together (e.g. WP's `Pricing<br>and` → `Pricing and`, not `Pricingand`).
  return s.replace(/<br\b[^>]*>/gi, ' ')
    .replace(/<\/(?:p|h\d|li|div)\s*>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

// ---- Hero extraction ---------------------------------------------------

function extractHero(html) {
  const wrapperIdx = html.indexOf('bg-gradient--primary')
  if (wrapperIdx < 0) return null
  // Search the next 50KB — WP's job-title <select> blob comes between the
  // wrapper and the hero h1/p.
  const region = html.slice(wrapperIdx, wrapperIdx + 50000)
  // The hero h1 is the desktop variant (has `d-md-block`, not `d-md-none`).
  // Class order/contents vary across pages (some use `d-none d-md-block`,
  // others `d-none h2 d-md-block`), so match on `d-md-block` alone.
  const h1Match = region.match(/<h1[^>]*\bd-md-block\b[^>]*>([\s\S]*?)<\/h1>/)
  // The subhead is the first `<p class="mb-4">...</p>` AFTER the h1.
  let subhead = null
  if (h1Match) {
    const after = region.slice(region.indexOf(h1Match[0]) + h1Match[0].length)
    const pMatch = after.match(/<p[^>]*class="mb-4"[^>]*>([\s\S]*?)<\/p>/)
    if (pMatch) subhead = decodeHtml(stripTags(pMatch[1]))
  }
  return {
    title: h1Match ? decodeHtml(stripTags(h1Match[1])) : null,
    subhead,
  }
}

// ---- Family-of-features section ----------------------------------------

// Anchored on the `<h2 class="h1">...</h2>` family header. The enclosing
// `<section>` is what holds all the feature rows.
function extractFamilySection(html) {
  // Find the `<h2 class="h1">` family-header — note WP duplicates `class="h1"`
  // attribute, both forms in the wild.
  const headerMatch = html.match(/<h2[^>]*class="h1"[^>]*>([\s\S]*?)<\/h2>/)
  if (!headerMatch) return null
  const headerEnd = html.indexOf(headerMatch[0]) + headerMatch[0].length
  // Walk back from headerEnd to find the enclosing `<section`.
  const sectionStart = html.lastIndexOf('<section', headerEnd)
  if (sectionStart < 0) return null
  // Walk forward from sectionStart to find the matching `</section>`.
  const sectionEnd = html.indexOf('</section>', sectionStart)
  if (sectionEnd < 0) return null
  return html.slice(sectionStart, sectionEnd + '</section>'.length)
}

// Inside the family section, find each feature-row. Heuristic: rows are
// `<div ... class="row...">` direct-ish children. Each row contains at
// least one `<h2 id=...>` (the row's title) — not the family header
// (which has class="h1"). We scan h2-by-h2 and walk back to the row container.
function extractFeatureRows(sectionHtml) {
  const rows = []
  // Walk all `<div ... class="row...">` opens in the section in order. Each
  // is one feature-row. Slice each to the next row open or section end.
  const rowOpenRe = /<div\s+[^>]*\bclass="row[^"]*"[^>]*>/g
  const rowOpens = []
  let om
  while ((om = rowOpenRe.exec(sectionHtml)) !== null) rowOpens.push(om.index)
  // Append section-end as sentinel so the last row has a slice boundary.
  rowOpens.push(sectionHtml.length)

  for (let i = 0; i < rowOpens.length - 1; i++) {
    const rowHtml = sectionHtml.slice(rowOpens[i], rowOpens[i + 1])
    // The row's primary h2 is the first one inside that doesn't have class="h1".
    const h2Match = rowHtml.match(/<h2(?![^>]*class="h1")[^>]*>([\s\S]*?)<\/h2>/)
    if (!h2Match) continue
    const h2Text = decodeHtml(stripTags(h2Match[1]))

    // Extract first p after the h2.
    const afterH2 = rowHtml.slice(rowHtml.indexOf(h2Match[0]) + h2Match[0].length)
    const pMatch = afterH2.match(/<p[^>]*>([\s\S]*?)<\/p>/)
    const body = pMatch ? decodeHtml(stripTags(pMatch[1])) : ''

    // Determine reversed: which col appears first in DOM — text or media?
    // text col contains the h2; media col contains <img> or <video>.
    const h2InRowIdx = rowHtml.indexOf('<h2')
    const mediaMatch = rowHtml.match(/<(?:img|video)\b/)
    const mediaIdx = mediaMatch ? rowHtml.indexOf(mediaMatch[0]) : Infinity
    const reversed = mediaIdx < h2InRowIdx

    // Image URL: prefer img data-src, then img src (strip -lazy-load),
    // then video poster, then video source src.
    let image = null
    const imgDataSrc = rowHtml.match(/<img[^>]*\sdata-src="([^"]+)"/)
    if (imgDataSrc) image = imgDataSrc[1]
    if (!image) {
      const imgSrc = rowHtml.match(/<img[^>]*\ssrc="([^"]+)"/)
      if (imgSrc) image = imgSrc[1].replace(/-lazy-load(?=\.[a-z]+$)/, '')
    }
    if (!image) {
      const poster = rowHtml.match(/poster="([^"]+)"/)
      if (poster) image = poster[1]
    }
    if (!image) {
      const videoSrc = rowHtml.match(/<source[^>]*\ssrc="([^"]+)"/)
      if (videoSrc) image = videoSrc[1]
    }
    if (!image) {
      const videoDataSrc = rowHtml.match(/<source[^>]*\sdata-src="([^"]+)"/)
      if (videoDataSrc) image = videoDataSrc[1]
    }
    // FeatureRow renders <img>; .mp4 URLs would 404. Some WP rows have
    // their poster mistakenly set to the .mp4 (no still image authored) —
    // fall back to a generic Reveal illustration so the row still renders.
    if (image && /\.mp4(?:\?|$)/i.test(image)) {
      image = 'https://static.infragistics.com/marketing/reveal/reveal-embedded-analytics-pricing-illustration-1100.jpg'
    }

    if (!h2Text || !body || !image) continue
    rows.push({ headline: h2Text, body, image, reversed })
  }
  return rows
}

// ---- FAQ extraction ----------------------------------------------------

function extractFaq(html) {
  const accIdx = html.indexOf('id="accordion-faq"')
  if (accIdx < 0) return []
  // FAQ region is the rest of that section.
  const sectionEnd = html.indexOf('</section>', accIdx)
  const region = sectionEnd > 0 ? html.slice(accIdx, sectionEnd) : html.slice(accIdx, accIdx + 30000)
  const items = []
  const itemRe = /<button[^>]*data-bs-target="#faq-slide-\d+"[^>]*>([\s\S]*?)<\/button>[\s\S]*?<div[^>]*id="faq-slide-\d+"[\s\S]*?<div class="accordion-body"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g
  let m
  while ((m = itemRe.exec(region)) !== null) {
    const question = decodeHtml(stripTags(m[1]))
    // Body may contain <p> tags — flatten to single paragraph; preserve
    // <strong> by leaving stripped text. (Our schema allows raw answer text;
    // multi-paragraph answers become one paragraph after the strip — the
    // existing power-bi YAML uses this convention.)
    const answer = decodeHtml(stripTags(m[2])).replace(/\s+/g, ' ').trim()
    if (question && answer) items.push({ question, answer })
  }
  return items
}

// ---- YAML rewrite ------------------------------------------------------

function buildFeatureRowYaml(row) {
  const lines = [
    '  - type: feature-row',
    `    headline: "${escapeYaml(row.headline)}"`,
    `    reversed: ${row.reversed ? 'true' : 'false'}`,
    `    image: "${escapeYaml(row.image)}"`,
    `    imageAlt: "${escapeYaml(row.headline)}"`,
    '    slotContent: |',
    `      <p>${escapeXml(row.body)}</p>`,
  ]
  return lines.join('\n')
}

function escapeXml(s) {
  // Body text is plain (we stripped tags). Re-escape & < > so it round-trips
  // through YAML → set:html cleanly.
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function buildFaqYaml(items) {
  const lines = ['  - type: faq', '    items:']
  for (const it of items) {
    lines.push(`      - question: "${escapeYaml(it.question)}"`)
    lines.push(`        answer: "${escapeYaml(it.answer)}"`)
  }
  return lines.join('\n')
}

function rewriteYaml(yaml, hero, rows, faqItems) {
  const changes = []

  // 1. Hero title + subhead.
  if (hero?.title) {
    const heroBlockMatch = yaml.match(/(- type: dark-hero\b[\s\S]*?)(\n  - type:|$)/)
    if (heroBlockMatch) {
      let block = heroBlockMatch[1]
      const before = block
      block = block.replace(/(\n    title:\s*)("[^"]*"|'[^']*')/, `$1"${escapeYaml(hero.title)}"`)
      if (hero.subhead) {
        block = block.replace(/(\n    subhead:\s*)("[^"]*"|'[^']*')/, `$1"${escapeYaml(hero.subhead)}"`)
      }
      if (block !== before) {
        yaml = yaml.replace(heroBlockMatch[1], block)
        changes.push('hero')
      }
    }
  }

  // 2. Replace feature-rows between section-header and faq block.
  if (rows.length > 0) {
    // Anchor: `\n  - type: section-header` ... up to `\n  - type: faq` or `\n  - type: reviews`.
    const headerIdx = yaml.indexOf('\n  - type: section-header')
    if (headerIdx >= 0) {
      // Find end of section-header block (next `\n  - type:`).
      let scanFrom = headerIdx + '\n  - type: section-header'.length
      const nextSectionAfterHeader = yaml.slice(scanFrom).match(/\n  - type:/)
      if (nextSectionAfterHeader) {
        const replaceStart = scanFrom + yaml.slice(scanFrom).indexOf(nextSectionAfterHeader[0])
        // Find where to stop replacing — at the first `- type: faq` or `- type: reviews` or `- type: cta-block` after replaceStart.
        const stopRe = /\n  - type: (faq|reviews|cta-block)/
        const stopMatch = yaml.slice(replaceStart).match(stopRe)
        if (stopMatch) {
          const replaceEnd = replaceStart + yaml.slice(replaceStart).indexOf(stopMatch[0])
          const newBlocks = '\n' + rows.map(buildFeatureRowYaml).join('\n\n') + '\n'
          yaml = yaml.slice(0, replaceStart) + newBlocks + yaml.slice(replaceEnd)
          changes.push(`rows×${rows.length}`)
        }
      }
    }
  }

  // 3. Replace faq block.
  if (faqItems.length > 0) {
    const faqRe = /\n  - type: faq\b[\s\S]*?(?=\n  - type:|$)/
    const faqMatch = yaml.match(faqRe)
    if (faqMatch) {
      const newFaq = '\n' + buildFaqYaml(faqItems) + '\n'
      yaml = yaml.replace(faqMatch[0], newFaq)
      changes.push(`faq×${faqItems.length}`)
    }
  }

  return { yaml, changes }
}

// ---- Driver ------------------------------------------------------------

const slugs = readdirSync(PAGES_DIR)
  .filter(f => /^reveal-vs-.+\.md$/.test(f))
  .map(f => f.replace(/^reveal-vs-/, '').replace(/\.md$/, ''))

let updated = 0, skipped = 0
for (const slug of slugs) {
  const mdPath = join(PAGES_DIR, `reveal-vs-${slug}.md`)
  const htmlPath = join(ORIGINAL_DIR, `reveal-vs-${slug}.html`)
  let html
  try { html = readFileSync(htmlPath, 'utf8') } catch {
    console.log(`- ${slug}: no WP HTML`); skipped++; continue
  }
  const hero = extractHero(html)
  const familySection = extractFamilySection(html)
  const rows = familySection ? extractFeatureRows(familySection) : []
  const faqItems = extractFaq(html)

  const yaml = readFileSync(mdPath, 'utf8')
  const { yaml: newYaml, changes } = rewriteYaml(yaml, hero, rows, faqItems)
  if (newYaml !== yaml) {
    writeFileSync(mdPath, newYaml)
    console.log(`✓ ${slug}: ${changes.join(', ')}`)
    updated++
  } else {
    console.log(`- ${slug}: no changes`)
    skipped++
  }
}
console.log(`\nupdated ${updated}, skipped ${skipped}`)
