#!/usr/bin/env node
// One-shot: 3 glossary MD files have only frontmatter — body content was
// lost during the original extraction. Re-extract from the wget'd WP HTML.
//
// Targets:
//   analytics-as-a-service, generative-ai-analytics, saas-analytics
//
// WP body shape (inside <main id="content">):
//   <header>...breadcrumb + h1...</header>      ← skip
//   <div class="container">                     ← body starts
//     <h2 class="wp-block-heading" id="...">...</h2>
//     <p>...</p>
//     <h3 class="wp-block-heading">...</h3>
//     <ul class="..."><li>...</li></ul>
//     <figure class="wp-block-image"><img src="..." alt="..."/></figure>
//   </div>                                      ← body ends
//   </main>

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(here, '..', '..')
const HTML_DIR = join(repoRoot, 'www.revealbi.io', 'glossary')
const MD_DIR = join(here, '..', 'src', 'content', 'glossary', 'en')

const TARGETS = ['analytics-as-a-service', 'generative-ai-analytics', 'saas-analytics']

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

function extractMain(html) {
  const mainStart = html.indexOf('<main')
  const mainEnd = html.indexOf('</main>')
  if (mainStart < 0 || mainEnd < 0) throw new Error('main not found')
  let body = html.slice(mainStart, mainEnd)
  // Remove the <header>...</header> (breadcrumb + H1) before article body.
  body = body.replace(/<header[^>]*>[\s\S]*?<\/header>/i, '')
  return body
}

function inlineToMd(s) {
  // Strip inline classes/styles/ids/data-* attributes from common inline tags.
  s = s.replace(/<a\s+([^>]*?)>/gi, (m, attrs) => {
    const hrefMatch = attrs.match(/href="([^"]*)"/i)
    return hrefMatch ? `<a href="${hrefMatch[1]}">` : '<a>'
  })
  // <a href> → [text](href)
  s = s.replace(/<a href="([^"]*)">([^<]*)<\/a>/gi, (m, href, text) => `[${text}](${href})`)
  // <strong> / <b>
  s = s.replace(/<\/?strong>/gi, '**').replace(/<\/?b>/gi, '**')
  // <em> / <i>
  s = s.replace(/<\/?em>/gi, '*').replace(/<\/?i>/gi, '*')
  // <code>
  s = s.replace(/<code[^>]*>([^<]*)<\/code>/gi, '`$1`')
  // Drop any remaining <span>/<wbr>/<br/>/etc. inline wrappers
  s = s.replace(/<\/?span[^>]*>/gi, '')
  s = s.replace(/<wbr\s*\/?>/gi, '')
  s = s.replace(/<br\s*\/?>/gi, '\n')
  // Strip <p> wrappers that WP nests inside <li> elements.
  s = s.replace(/<\/?p\b[^>]*>/gi, ' ')
  return s
}

function blockHtmlToMd(html) {
  const out = []
  // Walk top-level elements. WP exports each block separated by blank lines.
  // We'll iterate through known block patterns in order.
  let i = 0
  const len = html.length
  while (i < len) {
    // Skip whitespace + comments + style/script chunks.
    while (i < len && /\s/.test(html[i])) i++
    if (html.startsWith('<!--', i)) {
      const end = html.indexOf('-->', i)
      if (end < 0) break
      i = end + 3
      continue
    }
    if (html.startsWith('<style', i) || html.startsWith('<script', i)) {
      const close = html.indexOf('>', html.indexOf('</', i))
      if (close < 0) break
      i = close + 1
      continue
    }
    if (i >= len) break

    // <h2 ... id="slug">Title</h2>
    let m
    if ((m = html.slice(i).match(/^<h2[^>]*?(?:id="([^"]*)")?[^>]*>([\s\S]*?)<\/h2>/i))) {
      out.push(`## ${decodeEntities(stripTags(m[2]).trim())}`)
      i += m[0].length
      continue
    }
    if ((m = html.slice(i).match(/^<h3[^>]*>([\s\S]*?)<\/h3>/i))) {
      out.push(`### ${decodeEntities(stripTags(m[1]).trim())}`)
      i += m[0].length
      continue
    }
    if ((m = html.slice(i).match(/^<h4[^>]*>([\s\S]*?)<\/h4>/i))) {
      out.push(`#### ${decodeEntities(stripTags(m[1]).trim())}`)
      i += m[0].length
      continue
    }
    if ((m = html.slice(i).match(/^<p[^>]*>([\s\S]*?)<\/p>/i))) {
      const text = decodeEntities(inlineToMd(m[1]).replace(/\s+/g, ' ').trim())
      if (text) out.push(text)
      i += m[0].length
      continue
    }
    if ((m = html.slice(i).match(/^<ul[^>]*>([\s\S]*?)<\/ul>/i))) {
      const items = [...m[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
      for (const it of items) {
        const text = decodeEntities(inlineToMd(it[1]).replace(/\s+/g, ' ').trim())
        if (text) out.push(`- ${text}`)
      }
      i += m[0].length
      continue
    }
    if ((m = html.slice(i).match(/^<ol[^>]*>([\s\S]*?)<\/ol>/i))) {
      const items = [...m[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
      let n = 1
      for (const it of items) {
        const text = decodeEntities(inlineToMd(it[1]).replace(/\s+/g, ' ').trim())
        if (text) out.push(`${n++}. ${text}`)
      }
      i += m[0].length
      continue
    }
    // <figure class="wp-block-image"...><img src="..." alt="..."/></figure>
    if ((m = html.slice(i).match(/^<figure[^>]*>([\s\S]*?)<\/figure>/i))) {
      const imgMatch = m[1].match(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"/i) ||
        m[1].match(/<img[^>]*alt="([^"]*)"[^>]*src="([^"]*)"/i)
      if (imgMatch) {
        const isAltFirst = m[1].indexOf('alt=') < m[1].indexOf('src=')
        const src = isAltFirst ? imgMatch[2] : imgMatch[1]
        const alt = isAltFirst ? imgMatch[1] : imgMatch[2]
        out.push(`![${decodeEntities(alt)}](${src})`)
      }
      i += m[0].length
      continue
    }
    // Pure wrapper containers: <div class="container">, <section>, etc — recurse
    if ((m = html.slice(i).match(/^<(div|section|article)\b[^>]*>/i))) {
      const tag = m[1]
      const open = m[0]
      // Find matching close tag — naive count of <tag and </tag.
      let depth = 1
      let j = i + open.length
      const opener = new RegExp(`<${tag}\\b`, 'i')
      const closer = new RegExp(`<\/${tag}>`, 'i')
      while (depth > 0 && j < len) {
        const oRest = html.slice(j)
        const o = oRest.search(opener)
        const c = oRest.search(closer)
        if (c < 0) break
        if (o >= 0 && o < c) { depth++; j += o + 1 }
        else { depth--; j += c + (`</${tag}>`).length }
      }
      const inner = html.slice(i + open.length, j - (`</${tag}>`).length)
      const innerMd = blockHtmlToMd(inner)
      if (innerMd.trim()) out.push(innerMd)
      i = j
      continue
    }
    // Skip unknown leading char/tag
    const lt = html.indexOf('<', i + 1)
    if (lt < 0) break
    i = lt
  }
  return out.join('\n\n')
}

function stripTags(s) {
  return s.replace(/<[^>]*>/g, '')
}

for (const slug of TARGETS) {
  const htmlPath = join(HTML_DIR, `${slug}.html`)
  const mdPath = join(MD_DIR, `${slug}.md`)
  if (!existsSync(htmlPath)) {
    console.error(`MISSING html: ${htmlPath}`)
    continue
  }
  if (!existsSync(mdPath)) {
    console.error(`MISSING md: ${mdPath}`)
    continue
  }

  const html = readFileSync(htmlPath, 'utf-8')
  const main = extractMain(html)
  const body = blockHtmlToMd(main).trim()

  // Preserve the existing frontmatter; replace body.
  const md = readFileSync(mdPath, 'utf-8')
  const fmEnd = md.indexOf('\n---', 3)
  if (fmEnd < 0) { console.error(`bad frontmatter: ${mdPath}`); continue }
  const frontmatter = md.slice(0, fmEnd + 4)
  writeFileSync(mdPath, `${frontmatter}\n\n${body}\n`)

  const h2 = (body.match(/^## /gm) || []).length
  const h3 = (body.match(/^### /gm) || []).length
  console.log(`${slug}: ${body.length}b, ${h2} H2 ${h3} H3`)
}
