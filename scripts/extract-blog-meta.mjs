#!/usr/bin/env node
// One-shot sweep over English blog posts. For each .md file, opens the
// matching wget'd WP HTML and extracts:
//   - heroImage  (the col-lg-4 hero illustration, distinct from og:image cover)
//   - summary    (Executive Summary alert body, raw HTML)
//   - takeaways  (Key Takeaways bullet list, array of HTML strings)
//
// Writes each non-empty field to YAML frontmatter, preserving existing fields
// and body. Skips fields that aren't present in WP (post may genuinely not
// have an Executive Summary).
//
// Idempotent — running twice produces the same file (overwrites the same
// fields with the same values).

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(here, '..', '..')
const HTML_DIR = join(repoRoot, 'www.revealbi.io', 'blog')
const MD_DIR = join(here, '..', 'src', 'content', 'blog', 'en')

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8217;/g, '’')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&#8230;/g, '…')
}

// --- heroImage -----------------------------------------------------------
// WP renders: <img fetchpriority="high" class='col-8 col-lg-12 d-none d-lg-block' alt='…' title='…' src='https://…/header.svg'>
// We pull the absolute URL and strip the WP CDN prefix to produce a CDN-relative path.
function extractHero(html) {
  const m = html.match(/<img[^>]*class\s*=\s*['"][^'"]*col-8\s+col-lg-12\s+d-none\s+d-lg-block[^'"]*['"][^>]*>/)
  if (!m) return null
  const srcMatch = m[0].match(/\bsrc\s*=\s*['"]([^'"]+)['"]/)
  if (!srcMatch) return null
  let src = decodeEntities(srcMatch[1])
  // Normalise to CDN-relative when on the Reveal CDN; otherwise keep absolute.
  src = src.replace(/^https?:\/\/static\.infragistics\.com\/marketing\/reveal\//, '/')
  return src
}

// --- Executive Summary ---------------------------------------------------
// <div class="alert alert-success ...">
//   <p ...>Executive Summary:</p>
//   <div class="executive-summary-content">{summary HTML}</div>
// </div>
function extractSummary(html) {
  const m = html.match(/<div\s+class="executive-summary-content"\s*>([\s\S]*?)<\/div>/)
  if (!m) return null
  return decodeEntities(m[1].trim())
}

// --- Key Takeaways -------------------------------------------------------
// <div class="alert alert--success ...">
//   <p ...>Key Takeaways:</p>
//   <ul class="pl-4">
//     <li class="mb-3">item</li>
//     ...
//   </ul>
// </div>
//
// We anchor on the "Key Takeaways:" marker to avoid matching the wrong UL,
// then walk forward to find the first <ul>...</ul>.
function extractTakeaways(html) {
  const markerIdx = html.search(/Key\s+Takeaways:?<\/p>/)
  if (markerIdx === -1) return null
  const ulStart = html.indexOf('<ul', markerIdx)
  const ulEnd = html.indexOf('</ul>', ulStart)
  if (ulStart === -1 || ulEnd === -1) return null
  const ulInner = html.slice(ulStart, ulEnd)
  const items = [...ulInner.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)]
    .map(m => decodeEntities(m[1].trim()))
    .filter(Boolean)
  return items.length > 0 ? items : null
}

// --- frontmatter merge ---------------------------------------------------
// Parse the frontmatter as a list of (key, value) pairs preserving order,
// upsert specific keys, then re-serialise. Stays line-oriented so we don't
// disturb existing whitespace or comments.

function parseFrontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n?/)
  if (!m) return null
  const block = m[1]
  const body = md.slice(m[0].length)
  return { block, body }
}

function yamlQuote(s) {
  // For multi-line HTML we use a folded scalar with a newline-preserving
  // marker. Single-line strings get JSON-style double quotes with escaping.
  const containsNewline = /\n/.test(s)
  if (containsNewline) {
    const indented = s.split('\n').map(line => `  ${line}`).join('\n')
    return `|\n${indented}`
  }
  return JSON.stringify(s)
}

function upsertScalar(block, key, value) {
  const lines = block.split('\n')
  const re = new RegExp(`^${key}\\s*:`)
  const idx = lines.findIndex(l => re.test(l))
  const newLine = `${key}: ${yamlQuote(value)}`
  if (idx === -1) {
    lines.push(newLine)
  } else if (lines[idx].trim().endsWith(':') || /^[^:]+:\s*\|/.test(lines[idx])) {
    // Existing entry is a block scalar — replace it and any indented continuation lines.
    let endIdx = idx + 1
    while (endIdx < lines.length && /^\s+\S/.test(lines[endIdx])) endIdx++
    lines.splice(idx, endIdx - idx, newLine)
  } else {
    lines[idx] = newLine
  }
  return lines.join('\n')
}

function upsertList(block, key, items) {
  const lines = block.split('\n')
  const re = new RegExp(`^${key}\\s*:`)
  const idx = lines.findIndex(l => re.test(l))
  const newBlock = [`${key}:`, ...items.map(i => `  - ${JSON.stringify(i)}`)]
  if (idx === -1) {
    return [...lines, ...newBlock].join('\n')
  }
  let endIdx = idx + 1
  while (endIdx < lines.length && /^\s+\S/.test(lines[endIdx])) endIdx++
  lines.splice(idx, endIdx - idx, ...newBlock)
  return lines.join('\n')
}

function processFile(slug) {
  const mdPath = join(MD_DIR, `${slug}.md`)
  const htmlPath = join(HTML_DIR, `${slug}.html`)
  if (!existsSync(htmlPath)) return { slug, status: 'no-html' }

  const md = readFileSync(mdPath, 'utf8')
  const html = readFileSync(htmlPath, 'utf8')
  const fm = parseFrontmatter(md)
  if (!fm) return { slug, status: 'no-frontmatter' }

  const heroImage = extractHero(html)
  const summary = extractSummary(html)
  const takeaways = extractTakeaways(html)

  let block = fm.block
  let touched = []
  if (heroImage) { block = upsertScalar(block, 'heroImage', heroImage); touched.push('heroImage') }
  if (summary) { block = upsertScalar(block, 'summary', summary); touched.push('summary') }
  if (takeaways) { block = upsertList(block, 'takeaways', takeaways); touched.push('takeaways') }

  if (touched.length === 0) return { slug, status: 'no-fields-found' }

  const next = `---\n${block}\n---\n${fm.body}`
  if (next !== md) writeFileSync(mdPath, next, 'utf8')
  return { slug, status: 'updated', touched }
}

const slugs = readdirSync(MD_DIR)
  .filter(f => f.endsWith('.md'))
  .map(f => f.replace(/\.md$/, ''))

const results = slugs.map(processFile)
const counts = results.reduce((acc, r) => ((acc[r.status] = (acc[r.status] ?? 0) + 1), acc), {})
const updated = results.filter(r => r.status === 'updated')
console.log(`Processed ${results.length} files. Status counts:`, counts)
console.log(`Updated:    ${updated.length}`)
console.log(`  heroImage: ${updated.filter(r => r.touched.includes('heroImage')).length}`)
console.log(`  summary:   ${updated.filter(r => r.touched.includes('summary')).length}`)
console.log(`  takeaways: ${updated.filter(r => r.touched.includes('takeaways')).length}`)

const noHtml = results.filter(r => r.status === 'no-html').map(r => r.slug)
if (noHtml.length) console.log(`No matching HTML for: ${noHtml.length} file(s)`)
