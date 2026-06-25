#!/usr/bin/env node
// Refresh `slotContent:` and `body:` fields on sectioned-YAML pages from WP HTML.
//
// Approach: parse the YAML's sections[] as raw text (preserves comments/quoting),
// for each section read its `headline`, find the matching <h2>/<h3> in the WP HTML,
// extract the body content up to the next heading, sanitise to the allowlist, and
// replace the slotContent / body field.
//
// Scope (this pass):
//   - feature-row → slotContent
//   - section-header → body
// (dark-hero.subhead, icon-grid.cards[].body, faq.items[].answer not yet — those
// are field-shape variants that need their own logic.)
//
// Usage:
//   node scripts/refresh-slot-content-B.mjs                   # dry-run all 38 pages
//   node scripts/refresh-slot-content-B.mjs --apply           # write
//   node scripts/refresh-slot-content-B.mjs banking-analytics # one page, dry-run
//   node scripts/refresh-slot-content-B.mjs banking-analytics --apply

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(here, '..', '..')
const PAGES_DIR = join(here, '..', 'src', 'content', 'pages', 'en')
const HTML_ROOT = join(repoRoot, 'www.revealbi.io')

// Slugs we don't want to touch (homepage owns its YAML; ai/embedded-analytics
// have unique structures that differ from the rest of B).
const SKIP = new Set(['homepage'])

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8211;/g, '–').replace(/&#8212;/g, '—')
    .replace(/&#8216;/g, '‘').replace(/&#8217;/g, '’')
    .replace(/&#8220;/g, '“').replace(/&#8221;/g, '”')
    .replace(/&#8230;/g, '…')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
}

function normalizeHeading(s) {
  return decodeEntities(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function findMatchingClose(html, start, tag) {
  const open = new RegExp(`<${tag}\\b[^>]*>`, 'gi')
  const close = new RegExp(`</${tag}\\s*>`, 'gi')
  let depth = 1
  let pos = start
  while (depth > 0 && pos < html.length) {
    open.lastIndex = pos
    close.lastIndex = pos
    const o = open.exec(html)
    const c = close.exec(html)
    if (!c) return -1
    if (o && o.index < c.index) {
      depth++
      pos = open.lastIndex
    } else {
      depth--
      if (depth === 0) return c.index
      pos = close.lastIndex
    }
  }
  return -1
}

// --- WP heading walker --------------------------------------------------

// Extract a list of { tag, text, normText, startIdx, endIdx } for every
// h1/h2/h3/h4 in the WP HTML body region (everything inside <main id="content">,
// minus its <header>). This is what we match YAML headlines against.
function extractWpHeadings(html) {
  const mainOpen = html.match(/<main\b[^>]*\bid\s*=\s*['"]content['"][^>]*>/i)
  if (!mainOpen) return { region: '', regionStart: 0, headings: [] }
  const regionStart = mainOpen.index + mainOpen[0].length
  const regionEnd = findMatchingClose(html, regionStart, 'main')
  if (regionEnd === -1) return { region: '', regionStart, headings: [] }
  const region = html.slice(regionStart, regionEnd)

  const headings = []
  // Exclude h1 — the page-title heading is owned by the hero (dark-hero/pricing-hero),
  // never a body section. Matching against it pulls hero CTAs into slotContent.
  const re = /<(h[2-4])\b([^>]*)>([\s\S]*?)<\/\1>/gi
  let m
  while ((m = re.exec(region)) !== null) {
    const tag = m[1].toLowerCase()
    const innerText = m[3].replace(/<[^>]+>/g, '')
    const text = decodeEntities(innerText).trim()
    headings.push({
      tag,
      text,
      normText: normalizeHeading(text),
      startIdx: m.index,
      endIdx: re.lastIndex,
    })
  }
  return { region, regionStart, headings }
}

// Word-set Jaccard for fuzzy matching (drops short stop-words first).
const STOPWORDS = new Set(['a', 'an', 'and', 'or', 'the', 'of', 'for', 'to', 'in', 'on', 'with', 'is', 'are', 'be', 'as', 'by', 'why', 'how', 'what'])
function tokens(s) {
  return new Set(s.split(/\s+/).filter((w) => w && !STOPWORDS.has(w)))
}
function jaccard(a, b) {
  if (a.size === 0 || b.size === 0) return 0
  let inter = 0
  for (const x of a) if (b.has(x)) inter++
  return inter / (a.size + b.size - inter)
}

function findHeadingByText(headings, target) {
  const norm = normalizeHeading(target)
  if (!norm) return null
  // Exact normalised match.
  let m = headings.find((h) => h.normText === norm)
  if (m) return m
  // Starts-with / contains either way.
  m = headings.find((h) => h.normText.startsWith(norm) || norm.startsWith(h.normText))
  if (m) return m
  m = headings.find((h) => h.normText.includes(norm) || norm.includes(h.normText))
  if (m) return m
  // Word-set Jaccard ≥ 0.55 — catches paraphrases. Pick the EARLIEST match in
  // document order (not the highest score) — otherwise late FAQ h3s with
  // narrowly higher overlap edge out the right body h2.
  const tt = tokens(norm)
  for (const h of headings) {
    const s = jaccard(tt, tokens(h.normText))
    if (s >= 0.55) return h
  }
  return null
}

// Slice the HTML between a matched heading and the next h1/h2/h3 of equal-or-
// higher level. (h4 doesn't truncate.)
function sliceBodyAfterHeading(region, heading, headings) {
  const start = heading.endIdx
  const ranks = { h1: 1, h2: 2, h3: 3, h4: 4 }
  const myRank = ranks[heading.tag]
  // Find next heading at depth ≤ myRank.
  const next = headings.find((h) => h.startIdx >= start && ranks[h.tag] <= myRank)
  const end = next ? next.startIdx : region.length
  return region.slice(start, end)
}

// --- WP HTML → allowlist HTML ------------------------------------------

// Convert a body HTML region into the small allowlist (p / ul / ol / li / strong /
// em / a / br / h3 / h4 / h5 / span / code). All other tags either drop their
// wrapper (transparent) or are stripped entirely.
const ALLOWED_BLOCK = new Set(['p', 'ul', 'ol', 'h3', 'h4', 'h5', 'blockquote'])
const ALLOWED_INLINE = new Set(['strong', 'em', 'b', 'i', 'a', 'br', 'code', 'span', 'li'])
const TRANSPARENT = new Set(['div', 'section', 'article', 'aside', 'main', 'header', 'footer', 'nav', 'figure', 'figcaption'])

function normalizeHref(href) {
  if (!href) return ''
  href = decodeEntities(href).trim()
  if (/^https?:\/\//i.test(href) || href.startsWith('mailto:') || href.startsWith('#') || href.startsWith('/')) return href
  if (/^\.\.\/wp-content\//.test(href)) return href.replace(/^(?:\.\.\/)+/, '/')
  if (/^(?:\.\.\/)+revealbi\.io\//.test(href)) {
    return '/' + href.replace(/^(?:\.\.\/)+revealbi\.io\//, '').replace(/\.html$/, '').replace(/\/index$/, '')
  }
  if (/^\.\.\//.test(href)) {
    return '/' + href.replace(/^(?:\.\.\/)+/, '').replace(/\.html$/, '').replace(/\/index$/, '')
  }
  return href
}

function sanitizeHtml(html) {
  // Strip script/style/svg/comments.
  html = html
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[\s\S]*?<\/style>/gi, '')
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')

  // Walk and emit cleaned HTML.
  let out = ''
  walk(html)
  // Tidy whitespace between block elements; keep inline whitespace intact.
  out = out.replace(/[\t\r]+/g, ' ').replace(/[ ]{2,}/g, ' ')
  out = out.replace(/\n[ \t]+/g, '\n').replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n')
  // Drop trailing/leading whitespace overall.
  return out.trim()

  function walk(s) {
    let pos = 0
    const tagRe = /<(\/?)(\w+)\b([^>]*)>/g
    while (pos < s.length) {
      tagRe.lastIndex = pos
      const m = tagRe.exec(s)
      if (!m) {
        out += escapeText(s.slice(pos))
        break
      }
      out += escapeText(s.slice(pos, m.index))

      const isClose = m[1] === '/'
      const name = m[2].toLowerCase()
      const attrs = m[3]
      const afterOpen = m.index + m[0].length

      // Orphan close tag (no matching open in this slice) — drop it silently.
      if (isClose) { pos = afterOpen; continue }

      if (name === 'br') { out += '<br />'; pos = afterOpen; continue }
      if (name === 'hr') { pos = afterOpen; continue }
      if (name === 'img' || name === 'input') {
        // No images inside slotContent allowlist.
        pos = afterOpen
        continue
      }

      const closeIdx = findMatchingClose(s, afterOpen, name)
      if (closeIdx === -1) {
        // Unbalanced — skip the open tag.
        pos = afterOpen
        continue
      }
      const inner = s.slice(afterOpen, closeIdx)
      const next = closeIdx + `</${name}>`.length

      if (TRANSPARENT.has(name)) {
        walk(inner)
      } else if (ALLOWED_BLOCK.has(name) || ALLOWED_INLINE.has(name)) {
        const cleanedAttrs = sanitizeAttrs(name, attrs)
        if (name === 'p' || name === 'ul' || name === 'ol' || name === 'h3' || name === 'h4' || name === 'h5' || name === 'blockquote') {
          out += '\n'
        }
        out += `<${name}${cleanedAttrs}>`
        walk(inner)
        out += `</${name}>`
        if (name === 'p' || name === 'ul' || name === 'ol' || name === 'h3' || name === 'h4' || name === 'h5' || name === 'blockquote') {
          out += '\n'
        }
      } else {
        // Unknown — drop wrapper, keep inner.
        walk(inner)
      }
      pos = next
    }
  }
}

function escapeText(t) {
  // Decode entities then re-encode the four critical ones.
  if (!t) return ''
  return decodeEntities(t)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function sanitizeAttrs(tag, raw) {
  if (!raw || !raw.trim()) return ''
  const out = []
  if (tag === 'a') {
    const href = raw.match(/\bhref\s*=\s*['"]([^'"]*)['"]/i)?.[1]
    const target = raw.match(/\btarget\s*=\s*['"]([^'"]*)['"]/i)?.[1]
    const rel = raw.match(/\brel\s*=\s*['"]([^'"]*)['"]/i)?.[1]
    const href2 = href ? normalizeHref(href) : ''
    if (href2 && /^(?:https?:\/\/|mailto:|#|\/)/.test(href2)) {
      out.push(`href="${href2}"`)
    }
    if (target) out.push(`target="${target}"`)
    if (rel) out.push(`rel="${rel}"`)
  }
  // Ban style/data-/onclick — drop everything else.
  return out.length ? ' ' + out.join(' ') : ''
}

// --- YAML editor (text-based) ------------------------------------------

// We keep the YAML as text and surgically replace specific fields. Each section
// is a top-level item in the sections: list, indented two spaces, beginning with
// `- type: <type>`. Within a section, fields are indented four spaces.
//
// The edit function for a given section:
//   - finds the `headline:` (or `title:`) value to use as the lookup key
//   - finds the block scalar `slotContent: |` (or `body: ...`) to replace
//   - replaces the field with new content, preserving indentation

function parseFrontmatterText(md) {
  const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!m) return null
  return { fmRaw: m[0], fmBody: m[1], body: md.slice(m[0].length) }
}

// Find the index range of each section in the sections[] block.
// Returns an array of { type, blockStart, blockEnd, blockText } indexes
// relative to the input fmText (the inside of the --- ... --- frontmatter).
function findSectionBlocks(fmText) {
  // Locate the `sections:` line.
  const sectionsIdx = fmText.search(/^sections\s*:/m)
  if (sectionsIdx === -1) return []
  // Find the start of the first list item.
  const blocks = []
  // Each section block starts at "  - type: <name>" and ends at the next
  // "  - " at the same indent level, or end-of-frontmatter.
  const startRe = /^  -\s+type\s*:\s*([^\s#]+)/gm
  startRe.lastIndex = sectionsIdx
  let m
  const matches = []
  while ((m = startRe.exec(fmText)) !== null) {
    matches.push({ type: m[1].trim(), idx: m.index, lineEnd: startRe.lastIndex })
  }
  for (let i = 0; i < matches.length; i++) {
    const next = i + 1 < matches.length ? matches[i + 1].idx : fmText.length
    blocks.push({
      type: matches[i].type,
      blockStart: matches[i].idx,
      blockEnd: next,
      blockText: fmText.slice(matches[i].idx, next),
    })
  }
  return blocks
}

// Read a scalar field from a section block (e.g. `headline: "..."`).
function readSectionField(block, field) {
  // Match either quoted or plain scalar on a single line.
  const re = new RegExp(`^    ${field}\\s*:\\s*(.*)$`, 'm')
  const m = block.match(re)
  if (!m) return null
  let v = m[1].trim()
  // Drop trailing comment.
  v = v.replace(/\s+#.*$/, '')
  // Strip surrounding quotes if any.
  if (/^"[\s\S]*"$/.test(v)) v = JSON.parse(v)
  else if (/^'[\s\S]*'$/.test(v)) v = v.slice(1, -1).replace(/''/g, "'")
  return v
}

// Replace (or insert) a multi-line block scalar (`slotContent: |`) in a section
// block with new content. Line-based; avoids JS-regex-end-of-string headaches.
//
// Each section block is delivered as: starting "  - type: ..." line through to
// (but not including) the next "  - " sibling list item. Field lines are
// indented 4 spaces; block-scalar content under those is indented ≥6 spaces.
function upsertBlockScalar(block, field, newValue) {
  const indented = newValue.split('\n').map((l) => l ? '      ' + l : '').join('\n')
  const newLines = (`    ${field}: |\n${indented}`).split('\n')
  return spliceField(block, field, newLines)
}

// Replace (or insert) a single-line `<field>: "..."`.
function upsertScalar(block, field, newValue) {
  const newLine = `    ${field}: ${JSON.stringify(newValue)}`
  return spliceField(block, field, [newLine])
}

// Common: find the existing `    field:` line (block scalar OR single line),
// determine its extent, and replace it with `replacement` (array of lines).
function spliceField(block, field, replacement) {
  const lines = block.split('\n')
  const fieldRe = new RegExp(`^    ${field}\\s*:`)
  const idx = lines.findIndex((l) => fieldRe.test(l))
  if (idx === -1) {
    // Append before any trailing blank lines.
    let end = lines.length
    while (end > 0 && lines[end - 1].trim() === '') end--
    return [...lines.slice(0, end), ...replacement, ...lines.slice(end)].join('\n')
  }
  // Determine where the field ends.
  let endIdx = idx + 1
  if (/:\s*[|>]\s*[+-]?\s*$/.test(lines[idx])) {
    // Block scalar (| or >). Content lines are either blank or indented ≥6 spaces.
    // Track the last line that's actual content; preserve any trailing blanks
    // that belong to inter-section spacing.
    let lastContent = idx
    while (endIdx < lines.length) {
      const l = lines[endIdx]
      if (/^      /.test(l)) { lastContent = endIdx; endIdx++ }
      else if (l === '') { endIdx++ }
      else break
    }
    endIdx = lastContent + 1
  }
  return [...lines.slice(0, idx), ...replacement, ...lines.slice(endIdx)].join('\n')
}

// --- per-section refresh ------------------------------------------------

function refreshFeatureRow(block, wp, log, ctx) {
  const headline = readSectionField(block, 'headline')
  if (!headline) { log.push('  feature-row: no headline → skip'); return block }
  let heading = findHeadingByText(wp.headings, headline)
  let viaFallback = false
  if (!heading && ctx.fallback) {
    // Position fallback: feature rows usually correspond to dashboard sub-headings,
    // not the major section banners. Prefer next unclaimed h3, fall back to h2.
    heading = wp.headings.find((h) => h.tag === 'h3' && !ctx.claimed.has(h.startIdx))
      || wp.headings.find((h) => h.tag === 'h2' && !ctx.claimed.has(h.startIdx))
    if (heading) viaFallback = true
  }
  if (!heading) { log.push(`  feature-row "${headline}": no WP heading match`); return block }
  ctx.claimed.add(heading.startIdx)
  const bodyHtml = sliceBodyAfterHeading(wp.region, heading, wp.headings)
  const cleaned = sanitizeHtml(bodyHtml)
  if (!cleaned) { log.push(`  feature-row "${headline}": empty body`); return block }
  const old = readSectionField(block, 'slotContent') || ''
  let next = block
  let touched = false
  if (old.replace(/\s+/g, ' ').trim() !== cleaned.replace(/\s+/g, ' ').trim()) {
    next = upsertBlockScalar(next, 'slotContent', cleaned)
    touched = true
  }
  // If we matched via fallback, the YAML headline is paraphrased — replace it
  // with the WP heading text so they line up (and so future matches are exact).
  if (viaFallback && heading.text && headline !== heading.text) {
    next = upsertScalar(next, 'headline', heading.text)
    touched = true
  }
  if (!touched) {
    log.push(`  feature-row "${headline}": already current`)
  } else if (viaFallback) {
    log.push(`  feature-row "${headline}" → "${heading.text}" (position-fallback): replaced`)
  } else {
    log.push(`  feature-row "${headline}": replaced slotContent`)
  }
  return next
}

function refreshSectionHeader(block, wp, log, ctx) {
  const headline = readSectionField(block, 'headline')
  if (!headline) { log.push('  section-header: no headline → skip'); return block }
  let heading = findHeadingByText(wp.headings, headline)
  let viaFallback = false
  if (!heading && ctx.fallback) {
    heading = wp.headings.find((h) => h.tag === 'h2' && !ctx.claimed.has(h.startIdx))
    if (heading) viaFallback = true
  }
  if (!heading) { log.push(`  section-header "${headline}": no WP heading match`); return block }
  ctx.claimed.add(heading.startIdx)
  const bodyHtml = sliceBodyAfterHeading(wp.region, heading, wp.headings)
  // section-header.body is plain text (the lead paragraph), not HTML.
  const pMatch = bodyHtml.match(/<p\b[^>]*>([\s\S]*?)<\/p>/i)
  if (!pMatch) { log.push(`  section-header "${headline}": no body paragraph`); return block }
  const text = decodeEntities(pMatch[1].replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim()
  if (!text) return block
  const old = readSectionField(block, 'body') || ''
  let next = block
  let touched = false
  if (old.trim() !== text) {
    next = upsertScalar(next, 'body', text)
    touched = true
  }
  if (viaFallback && heading.text && headline !== heading.text) {
    next = upsertScalar(next, 'headline', heading.text)
    touched = true
  }
  if (!touched) {
    log.push(`  section-header "${headline}": already current`)
  } else if (viaFallback) {
    log.push(`  section-header "${headline}" → "${heading.text}" (position-fallback): replaced`)
  } else {
    log.push(`  section-header "${headline}": replaced body`)
  }
  return next
}

const REFRESHERS = {
  'feature-row': refreshFeatureRow,
  'section-header': refreshSectionHeader,
}

// --- driver ------------------------------------------------------------

function processFile(slug, htmlPath, mdPath, dryRun, fallback) {
  const md = readFileSync(mdPath, 'utf8')
  const html = readFileSync(htmlPath, 'utf8')
  const fm = parseFrontmatterText(md)
  if (!fm) return { slug, status: 'no-frontmatter' }

  const wp = extractWpHeadings(html)
  if (wp.headings.length === 0) return { slug, status: 'no-wp-headings' }

  const blocks = findSectionBlocks(fm.fmBody)
  if (blocks.length === 0) return { slug, status: 'no-sections' }

  const log = []
  let newFmBody = fm.fmBody
  let touchedSections = 0

  // First pass: claim every WP heading that fuzzy-matches ANY section's headline,
  // even ones we don't refresh (icon-grid, faq, comparison-table). That keeps
  // the position-fallback honest — it skips over headings already accounted for.
  // For icon-grid specifically, also claim every h3 that lies UNDER the matched
  // h2 (until the next h2) — those are the icon-grid card titles in WP, not
  // separate feature-row candidates.
  const ctx = { fallback, claimed: new Set() }
  if (fallback) {
    for (const b of blocks) {
      const headline = readSectionField(b.blockText, 'headline')
      if (!headline) continue
      const h = findHeadingByText(wp.headings, headline)
      if (!h) continue
      ctx.claimed.add(h.startIdx)
      if (b.type === 'icon-grid' && h.tag === 'h2') {
        for (const sub of wp.headings) {
          if (sub.startIdx <= h.startIdx) continue
          if (sub.tag === 'h2' || sub.tag === 'h1') break
          if (sub.tag === 'h3') ctx.claimed.add(sub.startIdx)
        }
      }
    }
  }

  // Walk in reverse so blockStart/blockEnd offsets remain valid as we splice.
  // (Forward iteration of fallback is fine — we don't mutate `blocks` during.)
  // To keep position-fallback document-ordered, build a forward task list
  // first, then apply edits in reverse against newFmBody.
  const tasks = []
  for (const b of blocks) {
    const fn = REFRESHERS[b.type]
    if (!fn) continue
    const newBlock = fn(b.blockText, wp, log, ctx)
    if (newBlock !== b.blockText) tasks.push({ b, newBlock })
  }
  for (let i = tasks.length - 1; i >= 0; i--) {
    const { b, newBlock } = tasks[i]
    newFmBody = newFmBody.slice(0, b.blockStart) + newBlock + newFmBody.slice(b.blockEnd)
    touchedSections++
  }

  if (touchedSections === 0) return { slug, status: 'unchanged', log }

  const next = '---\n' + newFmBody + '\n---\n' + fm.body
  if (!dryRun) writeFileSync(mdPath, next, 'utf8')
  return { slug, status: dryRun ? 'would-update' : 'updated', sections: touchedSections, log }
}

function main() {
  const args = process.argv.slice(2)
  const apply = args.includes('--apply')
  const fallback = args.includes('--position-fallback')
  const positional = args.filter((a) => !a.startsWith('--'))
  const slugFilter = positional[0]

  const slugs = readdirSync(PAGES_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
    .filter((s) => !SKIP.has(s))
    .filter((s) => !slugFilter || s === slugFilter)

  // Only process pages that have sections: in their frontmatter.
  const targets = slugs.filter((s) => {
    const md = readFileSync(join(PAGES_DIR, `${s}.md`), 'utf8')
    return /^sections\s*:/m.test(md)
  })

  console.log(`${apply ? 'APPLY' : 'DRY-RUN'} — ${targets.length} sectioned pages\n`)

  const results = []
  for (const slug of targets) {
    const mdPath = join(PAGES_DIR, `${slug}.md`)
    const htmlPath = join(HTML_ROOT, `${slug}.html`)
    if (!existsSync(htmlPath)) {
      results.push({ slug, status: 'no-html' })
      continue
    }
    const r = processFile(slug, htmlPath, mdPath, !apply, fallback)
    results.push(r)
  }

  // Summary.
  const counts = results.reduce((acc, r) => ((acc[r.status] = (acc[r.status] ?? 0) + 1), acc), {})
  console.log('\nsummary:', counts)

  // Per-page log if filtered or if there are diagnostics worth seeing.
  if (slugFilter || apply) {
    for (const r of results) {
      if (r.log && r.log.length) {
        console.log(`\n${r.slug} (${r.status}):`)
        for (const l of r.log) console.log(l)
      } else if (r.status !== 'unchanged' && r.status !== 'would-update' && r.status !== 'updated') {
        console.log(`  ${r.slug}: ${r.status}`)
      }
    }
  } else {
    // Just show per-page touched counts in dry-run aggregate mode.
    const touched = results.filter((r) => r.sections)
    if (touched.length) {
      console.log('\npages with changes:')
      for (const r of touched) console.log(`  ${r.slug}: ${r.sections} sections`)
    }
  }
}

main()
