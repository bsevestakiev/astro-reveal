#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const VERTICALS = [
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

const ILLUSTRATION_URL = 'https://static.infragistics.com/marketing/reveal/reveal-analytics-business-intelligence-solutions-overview-hero-illustration.svg?v=202009290900'
const ILLUSTRATION_ALT = 'Reveal analytics overview illustration'

function decodeHtmlEntities(s) {
  return s
    .replace(/&#8217;/g, '’')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractSamplesHeader(slug) {
  const html = readFileSync(`${WP_ROOT}/${slug}.html`, 'utf8')
  // Anchor on the "<!-- SECTION: #4" comment then take the first h2 + optional first p inside its <header>.
  const sectionIdx = html.search(/<!--\s*SECTION:\s*#4/)
  if (sectionIdx === -1) return null
  const window = html.slice(sectionIdx, sectionIdx + 2500)
  const m = window.match(/<h2[^>]*id="([^"]+)"[^>]*>([^<]+)<\/h2>\s*(?:<p[^>]*>([^<]+)<\/p>)?/i)
  if (!m) return null
  return {
    anchor: m[1],
    headline: decodeHtmlEntities(m[2]),
    body: m[3] ? decodeHtmlEntities(m[3]) : null,
  }
}

function yamlEscape(s) {
  return s.replace(/"/g, '\\"')
}

function rewriteImportanceImage(md) {
  // First feature-row block (the "Importance" / "Why" one).
  // Replace its image: line and imageAlt: line with the canonical illustration.
  const featureRowStart = md.indexOf('  - type: feature-row')
  if (featureRowStart === -1) return { md, changed: false }
  const blockEnd = md.indexOf('\n  - type:', featureRowStart + 1)
  const block = md.slice(featureRowStart, blockEnd === -1 ? md.length : blockEnd)
  const newBlock = block
    .replace(/^( {4}image: ").*?("$)/m, `$1${ILLUSTRATION_URL}$2`)
    .replace(/^( {4}imageAlt: ").*?("$)/m, `$1${ILLUSTRATION_ALT}$2`)
    .replace(/^( {4}imageSrcset:[\s\S]*?)(?=^ {4}\w|^  - type:|\z)/m, '')
  if (block === newBlock) return { md, changed: false }
  return {
    md: md.slice(0, featureRowStart) + newBlock + md.slice(blockEnd === -1 ? md.length : blockEnd),
    changed: true,
  }
}

function insertSectionHeader(md, sampleHeader) {
  if (!sampleHeader) return { md, changed: false }
  if (md.includes('  - type: section-header')) return { md, changed: false } // already done

  const iconGridIdx = md.indexOf('  - type: icon-grid')
  if (iconGridIdx === -1) return { md, changed: false }
  const nextSectionAfterIcon = md.indexOf('\n  - type:', iconGridIdx + 1)
  if (nextSectionAfterIcon === -1) return { md, changed: false }

  // Verify next section after icon-grid is a feature-row (the dashboard one)
  const next = md.slice(nextSectionAfterIcon, nextSectionAfterIcon + 100)
  if (!next.includes('  - type: feature-row')) return { md, changed: false }

  let snippet = `\n  - type: section-header\n    headline: "${yamlEscape(sampleHeader.headline)}"\n    anchor: "${sampleHeader.anchor}"\n`
  if (sampleHeader.body) {
    snippet += `    body: "${yamlEscape(sampleHeader.body)}"\n`
  }

  return {
    md: md.slice(0, nextSectionAfterIcon + 1) + snippet + md.slice(nextSectionAfterIcon + 1),
    changed: true,
  }
}

function replaceInlineCta(md) {
  // Find the inline-cta block and replace with lead-form
  const inlineStart = md.indexOf('  - type: inline-cta')
  if (inlineStart === -1) return { md, changed: false }
  const blockEnd = md.indexOf('\n  - type:', inlineStart + 1)
  const finalEnd = blockEnd === -1 ? md.lastIndexOf('---') : blockEnd

  // Pull out the existing headline + body
  const block = md.slice(inlineStart, finalEnd === -1 ? md.length : finalEnd)
  const headlineMatch = block.match(/^ {4}headline: "(.*?)"$/m)
  const bodyMatch = block.match(/^ {4}body: "(.*?)"$/m)
  const headline = headlineMatch ? headlineMatch[1] : 'Request a 30-Min Demo!'
  const body = bodyMatch ? bodyMatch[1] : 'Fill out the form and we will contact you to schedule your 30-minute demo.'

  // Force WP-style trailing exclamation on Request a 30-Min Demo
  const finalHeadline = /^Request a 30-Min Demo$/i.test(headline.trim()) ? 'Request a 30-Min Demo!' : headline

  const replacement = `  - type: lead-form\n    headline: "${yamlEscape(finalHeadline)}"\n    body: "${yamlEscape(body)}"\n`

  return {
    md: md.slice(0, inlineStart) + replacement + md.slice(finalEnd === -1 ? md.length : finalEnd),
    changed: true,
  }
}

let total = { illustration: 0, header: 0, leadForm: 0, files: 0 }

for (const slug of VERTICALS) {
  const path = `${MD_ROOT}/${slug}.md`
  let md
  try {
    md = readFileSync(path, 'utf8')
  } catch {
    console.warn(`skip: ${slug} (no .md)`)
    continue
  }

  const sampleHeader = extractSamplesHeader(slug)

  let r1 = rewriteImportanceImage(md)
  let r2 = insertSectionHeader(r1.md, sampleHeader)
  let r3 = replaceInlineCta(r2.md)

  if (r1.changed || r2.changed || r3.changed) {
    writeFileSync(path, r3.md)
    total.files++
    total.illustration += r1.changed ? 1 : 0
    total.header += r2.changed ? 1 : 0
    total.leadForm += r3.changed ? 1 : 0
    console.log(`${slug}: illustration=${r1.changed} header=${r2.changed}${sampleHeader ? '' : ' (no WP header found)'} lead-form=${r3.changed}`)
  } else {
    console.log(`${slug}: no changes`)
  }
}

console.log(`\nDone: ${total.files} files; ${total.illustration} illustrations swapped, ${total.header} section-headers added, ${total.leadForm} lead-forms inserted`)
