#!/usr/bin/env node
// Re-extract body markdown from wget'd WP HTML for body-MD pages.
//
// Per-bucket body selector + skip blocks. Frontmatter preserved; only the
// body (post-frontmatter) is replaced. Idempotent within a single conversion.
//
// Usage:
//   node scripts/refresh-bodies-A.mjs                # all buckets
//   node scripts/refresh-bodies-A.mjs blog           # one bucket
//   node scripts/refresh-bodies-A.mjs blog ai-token-cost   # one slug, dry-run print
//   node scripts/refresh-bodies-A.mjs --dry-run      # write nothing, print summary

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(here, '..', '..')
const HTML_ROOT = join(repoRoot, 'www.revealbi.io')
const MD_ROOT = join(here, '..', 'src', 'content')

// Buckets we touch in this pass.
const BUCKETS = {
  blog: {
    htmlDir: join(HTML_ROOT, 'blog'),
    mdDir: join(MD_ROOT, 'blog', 'en'),
    bodySelector: sliceBlogBody,
  },
  glossary: {
    htmlDir: join(HTML_ROOT, 'glossary'),
    mdDir: join(MD_ROOT, 'glossary', 'en'),
    bodySelector: sliceGlossaryBody,
  },
  stories: {
    htmlDir: join(HTML_ROOT, 'stories'),
    mdDir: join(MD_ROOT, 'stories', 'en'),
    bodySelector: sliceStoryBody,
  },
  whitepapers: {
    htmlDir: join(HTML_ROOT, 'whitepapers'),
    mdDir: join(MD_ROOT, 'whitepapers', 'en'),
    bodySelector: sliceWhitepaperBody,
  },
  webinars: {
    htmlDir: join(HTML_ROOT, 'webinars'),
    mdDir: join(MD_ROOT, 'webinars', 'en'),
    bodySelector: sliceWebinarBody,
  },
}

// --- body slicers --------------------------------------------------------
// Each one returns the inner-HTML region we'll convert. Returns null on miss.

function sliceById(html, id) {
  // Find <... id="X" ...> opening tag, then balance to its closing tag.
  // Works only when the wrapper's element is a <div> — safe assumption here.
  const openRe = new RegExp(`<(\\w+)\\b[^>]*\\bid\\s*=\\s*['"]${id}['"][^>]*>`, 'i')
  const m = html.match(openRe)
  if (!m) return null
  const tag = m[1].toLowerCase()
  const start = m.index + m[0].length
  const end = findMatchingClose(html, start, tag)
  return end === -1 ? null : html.slice(start, end)
}

function sliceByClassPrefix(html, classFragment, tag = 'div') {
  const re = new RegExp(`<${tag}\\b[^>]*\\bclass\\s*=\\s*['"][^'"]*${classFragment}[^'"]*['"][^>]*>`, 'i')
  const m = html.match(re)
  if (!m) return null
  const start = m.index + m[0].length
  const end = findMatchingClose(html, start, tag)
  return end === -1 ? null : html.slice(start, end)
}

function sliceBlogBody(html) {
  // Body lives in <div id="blog-content" class="...content-area mb-5">.
  return sliceById(html, 'blog-content')
}

function sliceGlossaryBody(html) {
  // Most pages: <div class="wp-block-infragistics-blocks-ig-group container">.
  // Newer ones (saas-analytics, generative-ai-analytics, analytics-as-a-service):
  // plain <div class="container"> after the <header>. Fall back by selecting
  // everything between </header> and the JSON-LD <script> at end of <main>.
  const direct = sliceByClassPrefix(html, 'wp-block-infragistics-blocks-ig-group')
  if (direct) return direct
  // Locate <main id="content"> ... </header> ... </main>
  const mainOpen = html.match(/<main\b[^>]*\bid\s*=\s*['"]content['"][^>]*>/i)
  if (!mainOpen) return null
  const mainStart = mainOpen.index + mainOpen[0].length
  const mainEnd = findMatchingClose(html, mainStart, 'main')
  if (mainEnd === -1) return null
  let body = html.slice(mainStart, mainEnd)
  // Drop the leading <header class="container">…</header> (breadcrumb + h1).
  const headerOpen = body.match(/<header\b[^>]*\bclass\s*=\s*['"][^'"]*\bcontainer\b[^'"]*['"][^>]*>/i)
  if (headerOpen) {
    const headerStart = headerOpen.index + headerOpen[0].length
    const headerEnd = findMatchingClose(body, headerStart, 'header')
    if (headerEnd !== -1) {
      body = body.slice(0, headerOpen.index) + body.slice(headerEnd + '</header>'.length)
    }
  }
  return body
}

function sliceStoryBody(html) {
  // Body lives in <article class="customer-stories"> > <div class="container">
  // > <div class="row pt-0 pb-5 pt-lg-5"> > <div class="col-12 col-lg-8">.
  // Anchor on <article class="customer-stories"> and walk down.
  const article = sliceByClassPrefix(html, 'customer-stories', 'article')
  if (!article) return null
  return sliceByClassPrefix(article, 'col-12 col-lg-8')
}

function sliceWhitepaperBody(html) {
  // <article class="whitepapers"> > <div class="container"> > <div class="row pt-4 pb-3"> > <div class="col-12">.
  const article = sliceByClassPrefix(html, 'whitepapers', 'article')
  if (!article) return null
  return sliceByClassPrefix(article, 'row pt-4 pb-3')
}

function sliceWebinarBody(html) {
  // <div class="content-area order-1 order-lg-0 col-12 col-lg-7">.
  return sliceByClassPrefix(html, 'content-area order-1 order-lg-0')
}

// --- generic HTML balance/skip helpers ---------------------------------

function findMatchingClose(html, start, tag) {
  // Returns the index of the matching </tag> for an opening at `start`.
  // Depth-counted scan over both opens and closes of the same tag name.
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

function stripGarbage(html) {
  // Remove things that should never end up in the body markdown.
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[\s\S]*?<\/style>/gi, '')
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
}

function stripBlogAlerts(html) {
  // Executive Summary / Key Takeaways alert boxes — already in frontmatter.
  return html.replace(/<div\s+class="alert\s+alert-(?:-)?success[^"]*"[^>]*>[\s\S]*?<\/div>(?=\s*<(?:p|h2|h3|h4|ul|ol|figure|table|blockquote))/gi, '')
}

function stripBlogFooter(html) {
  // Trailing <div class="d-block mt-5"> contains category badge + MORE TOPICS tag list.
  // Anchor on the start; remove from there to the end.
  const idx = html.search(/<div\s+class\s*=\s*['"]d-block\s+mt-5['"][^>]*>/i)
  return idx === -1 ? html : html.slice(0, idx)
}

function stripStoryMobileAside(html) {
  // <div class="card my-5 d-lg-none"> duplicates the right-aside on mobile.
  // Built layout already renders the aside; drop the duplicate.
  return html.replace(/<div\s+class="card\s+my-5\s+d-lg-none"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, '')
}

function stripWebinarHeaderMeta(html) {
  // Webinar body region contains a small badge strip with "Free Webinar" /
  // date / clock SVG / duration that's redundant with frontmatter. Trim
  // anything before the first <h1>/<h2>.
  const idx = html.search(/<h[12]\b/i)
  return idx === -1 ? html : html.slice(idx)
}

// --- HTML entity decoding -----------------------------------------------

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
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
}

// --- WP href normaliser -------------------------------------------------

// Lazily-built map of WP post-id → public path, derived from
// index.html@p=NNNN.html files via their og:url meta. Every WP "?p=NNNN"
// permalink resolves through this.
let _postIdToSlug = null
function postIdMap() {
  if (_postIdToSlug) return _postIdToSlug
  _postIdToSlug = new Map()
  const files = readdirSync(HTML_ROOT).filter((f) => /^index\.html@p=\d+\.html$/.test(f))
  for (const f of files) {
    const id = f.match(/p=(\d+)/)[1]
    let html
    try { html = readFileSync(join(HTML_ROOT, f), 'utf8') } catch { continue }
    const og = html.match(/<meta\s+property\s*=\s*['"]og:url['"]\s+content\s*=\s*['"]([^'"]+)['"]/i)
    if (!og) continue
    const url = og[1].replace(/^https?:\/\/[^/]+/, '').replace(/\/$/, '')
    if (url) _postIdToSlug.set(id, url || '/')
  }
  return _postIdToSlug
}

function resolvePostIdHref(href) {
  // Match index.html@p=NNNN.html (with any leading ../ segments and optional anchor).
  const m = href.match(/(?:^|\/)index\.html@p=(\d+)\.html(#[^?]*)?(?:\?[^#]*)?$/)
  if (!m) return null
  const slug = postIdMap().get(m[1])
  if (!slug) return null
  return slug + (m[2] || '')
}

function normalizeHref(href) {
  if (!href) return href
  if (/^https?:\/\//i.test(href) || href.startsWith('mailto:') || href.startsWith('#')) return href

  // WP ?p=NNNN permalinks: index.html@p=NNNN.html → /pretty-slug
  const fromId = resolvePostIdHref(href)
  if (fromId) return fromId

  // ../wp-content/uploads/... → /wp-content/uploads/...
  if (/^\.\.\/wp-content\//.test(href)) return href.replace(/^(?:\.\.\/)+/, '/')
  // ../../revealbi.io/foo.html → /foo
  if (/^(?:\.\.\/)+revealbi\.io\//.test(href)) {
    return '/' + href.replace(/^(?:\.\.\/)+revealbi\.io\//, '').replace(/\.html$/, '').replace(/\/index$/, '')
  }
  // wget downloads also ship a samples.revealbi.io subtree. Cross-domain — keep absolute.
  if (/^(?:\.\.\/)+samples\.revealbi\.io\//.test(href)) {
    return 'https://samples.revealbi.io/' + href.replace(/^(?:\.\.\/)+samples\.revealbi\.io\//, '')
  }
  // ../foo.html or ../foo/bar.html → /foo or /foo/bar
  if (/^\.\.\//.test(href)) {
    return '/' + href.replace(/^(?:\.\.\/)+/, '').replace(/\.html$/, '').replace(/\/index$/, '')
  }
  return href
}

function normalizeImgSrc(src) {
  if (!src) return src
  if (/^https?:\/\//i.test(src)) return src
  if (/^\.\.\/wp-content\//.test(src)) return src.replace(/^\.\.\//, '/')
  if (/^\.\.\//.test(src)) return src.replace(/^\.\.\//, '/')
  return src
}

// --- inline conversion --------------------------------------------------

function convertInline(html) {
  let s = html

  // <a href="X">Y</a> — handle nested first via recursive replace.
  // Repeat until stable in case anchors are nested in other inline tags.
  for (let i = 0; i < 4; i++) {
    const before = s
    s = s.replace(/<a\b[^>]*?\bhref\s*=\s*['"]([^'"]*)['"][^>]*>([\s\S]*?)<\/a>/gi, (_, href, text) => {
      const inner = convertInline(text).trim()
      const url = normalizeHref(decodeEntities(href).trim())
      if (!inner) return ''  // empty anchors are tracking pixels
      if (!url) return inner
      return `[${inner}](${url})`
    })
    if (s === before) break
  }

  // Inline image: <img src="X" alt="Y">
  s = s.replace(/<img\b[^>]*>/gi, (tag) => {
    const src = tag.match(/\bsrc\s*=\s*['"]([^'"]*)['"]/i)?.[1] || ''
    const alt = tag.match(/\balt\s*=\s*['"]([^'"]*)['"]/i)?.[1] || ''
    if (!src) return ''
    return `![${decodeEntities(alt)}](${normalizeImgSrc(decodeEntities(src))})`
  })

  // <strong>/<b>
  s = s.replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, _t, text) => `**${convertInline(text)}**`)
  // <em>/<i>
  s = s.replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, _t, text) => `*${convertInline(text)}*`)
  // <code>
  s = s.replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, (_, text) => '`' + decodeEntities(text) + '`')
  // <br>
  s = s.replace(/<br\s*\/?>/gi, '\n')
  // <span>...</span> → pass through
  s = s.replace(/<span\b[^>]*>([\s\S]*?)<\/span>/gi, (_, text) => convertInline(text))

  // Strip any other tags (divs that wrap inline-only content, etc.).
  s = s.replace(/<\/?[a-z][^>]*>/gi, '')
  s = decodeEntities(s)
  // Collapse runs of whitespace except inside markdown code spans (we already converted those).
  s = s.replace(/[ \t]+\n/g, '\n').replace(/\n[ \t]+/g, '\n').replace(/[ \t]{2,}/g, ' ').trim()
  return s
}

// --- table conversion ---------------------------------------------------

function tableToMd(inner) {
  let header = []
  const rows = []
  const headMatch = inner.match(/<thead\b[^>]*>([\s\S]*?)<\/thead>/i)
  if (headMatch) {
    const ths = [...headMatch[1].matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/gi)]
    header = ths.map((m) => convertInline(m[1]).replace(/\|/g, '\\|').trim())
  }
  const bodyHtml = inner.match(/<tbody\b[^>]*>([\s\S]*?)<\/tbody>/i)?.[1] || inner
  const trs = [...bodyHtml.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)]
  for (const tr of trs) {
    const cellsRaw = [...tr[1].matchAll(/<t([hd])\b[^>]*>([\s\S]*?)<\/t\1>/gi)]
    const cells = cellsRaw.map((m) => convertInline(m[2]).replace(/\|/g, '\\|').trim())
    if (cells.length === 0) continue
    const isHeaderRow = cellsRaw.every((m) => m[1].toLowerCase() === 'h')
    if (isHeaderRow && header.length === 0) {
      header = cells
    } else {
      rows.push(cells)
    }
  }
  if (header.length === 0) {
    if (rows.length === 0) return ''
    header = rows.shift()
  }
  const cols = header.length
  const lines = [
    '| ' + header.join(' | ') + ' |',
    '| ' + Array(cols).fill('---').join(' | ') + ' |',
    ...rows.map((r) => {
      while (r.length < cols) r.push('')
      return '| ' + r.slice(0, cols).join(' | ') + ' |'
    }),
  ]
  return '\n\n' + lines.join('\n') + '\n\n'
}

// --- block tokeniser + walker -------------------------------------------

const BLOCK_TAGS = new Set(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'figure', 'table', 'blockquote', 'hr', 'pre'])
const TRANSPARENT_WRAPPERS = new Set(['div', 'section', 'article', 'aside', 'main', 'header', 'footer', 'nav'])

function tokenize(html) {
  // Walk a body HTML string and emit a stream of tokens:
  //   { tag, raw, inner }   — block element to render via blockToMd
  //   { inline: '...' }     — raw HTML/text fragment (inline elements + text)
  // Transparent wrappers (div, section, article…) are descended into so their
  // block children surface at top level. Inline tags (span, a, em, strong…)
  // are passed through as raw inline content; convertInline handles them.
  const out = []
  walk(html)
  // Coalesce adjacent inline fragments so convertInline sees them together
  // (matters for `<a>` spanning across whitespace).
  const merged = []
  for (const t of out) {
    if (t.inline !== undefined && merged.length && merged[merged.length - 1].inline !== undefined) {
      merged[merged.length - 1].inline += t.inline
    } else {
      merged.push(t)
    }
  }
  return merged

  function walk(s) {
    let pos = 0
    const tagRe = /<(\w+)\b([^>]*)>/g
    while (pos < s.length) {
      tagRe.lastIndex = pos
      const m = tagRe.exec(s)
      if (!m) {
        const tail = s.slice(pos)
        if (tail) out.push({ inline: tail })
        break
      }
      // Inline content before the next tag.
      const lead = s.slice(pos, m.index)
      if (lead) out.push({ inline: lead })

      const name = m[1].toLowerCase()
      const afterOpen = m.index + m[0].length

      // Void / self-closing elements.
      if (name === 'hr') { out.push({ tag: 'hr', raw: m[0], inner: '' }); pos = afterOpen; continue }
      if (name === 'br') { out.push({ inline: '\n' }); pos = afterOpen; continue }
      if (name === 'img' || name === 'input') {
        // Pass <img> through as inline; convertInline emits the markdown ![...]() form.
        out.push({ inline: m[0] })
        pos = afterOpen
        continue
      }

      const closeIdx = findMatchingClose(s, afterOpen, name)
      if (closeIdx === -1) { pos = afterOpen; continue }
      const inner = s.slice(afterOpen, closeIdx)
      const next = closeIdx + `</${name}>`.length

      if (BLOCK_TAGS.has(name)) {
        out.push({ tag: name, raw: m[0], inner })
      } else if (TRANSPARENT_WRAPPERS.has(name)) {
        walk(inner)
      } else if (/<(ul|ol|p|h[1-6]|figure|table|blockquote|hr|pre)\b/i.test(inner)) {
        // Inline element wrapping block content (e.g. WP's <span><ul>…</ul></span>) —
        // treat the wrapper as transparent so the block surfaces.
        walk(inner)
      } else {
        // Pure-inline element — pass the entire element through as raw HTML.
        out.push({ inline: s.slice(m.index, next) })
      }
      pos = next
    }
  }
}

function blockToMd(block) {
  const t = block.tag
  if (t === 'p') {
    const text = convertInline(block.inner)
    return text ? text + '\n\n' : ''
  }
  if (/^h[1-6]$/.test(t)) {
    const level = Number(t.slice(1))
    const text = convertInline(block.inner)
    if (!text) return ''
    return '#'.repeat(level) + ' ' + text + '\n\n'
  }
  if (t === 'ul' || t === 'ol') {
    return listToMd(block.inner, t) + '\n\n'
  }
  if (t === 'figure') {
    const img = block.inner.match(/<img\b[^>]+>/i)
    if (!img) return convertInline(block.inner)
    const src = img[0].match(/\bsrc\s*=\s*['"]([^'"]*)['"]/i)?.[1] || ''
    const alt = img[0].match(/\balt\s*=\s*['"]([^'"]*)['"]/i)?.[1] || ''
    if (!src) return ''
    const caption = block.inner.match(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/i)?.[1]
    const captionMd = caption ? '\n*' + convertInline(caption) + '*' : ''
    return `![${decodeEntities(alt)}](${normalizeImgSrc(decodeEntities(src))})${captionMd}\n\n`
  }
  if (t === 'table') return tableToMd(block.inner)
  if (t === 'blockquote') {
    const inner = mdFromHtml(block.inner)
    return inner.split('\n').map((l) => l ? '> ' + l : '>').join('\n') + '\n\n'
  }
  if (t === 'hr') return '---\n\n'
  if (t === 'pre') {
    const code = block.inner.match(/<code\b[^>]*>([\s\S]*?)<\/code>/i)?.[1] || block.inner
    return '```\n' + decodeEntities(code).trim() + '\n```\n\n'
  }
  return ''
}

function listToMd(html, listTag) {
  // Pull top-level <li>...</li>; nested lists get rendered with indent.
  const items = []
  let pos = 0
  while (pos < html.length) {
    const liOpen = /<li\b[^>]*>/gi
    liOpen.lastIndex = pos
    const m = liOpen.exec(html)
    if (!m) break
    const start = liOpen.lastIndex
    const end = findMatchingClose(html, start, 'li')
    if (end === -1) break
    items.push(html.slice(start, end))
    pos = end + '</li>'.length
  }
  return items
    .map((raw, i) => {
      const marker = listTag === 'ol' ? `${i + 1}.` : '-'
      // Render inline + nested blocks inside the li.
      const md = renderLiInner(raw)
      const lines = md.split('\n')
      const first = `${marker} ${lines[0]}`
      const rest = lines.slice(1).map((l) => l ? '  ' + l : '').join('\n')
      return rest ? first + '\n' + rest : first
    })
    .filter(Boolean)
    .join('\n')
}

function renderLiInner(html) {
  const tokens = tokenize(html)
  if (tokens.length === 0) return ''
  // All-inline → single-line render.
  if (tokens.every((t) => t.inline !== undefined)) {
    return convertInline(tokens.map((t) => t.inline).join(''))
  }
  const parts = []
  for (const t of tokens) {
    if (t.inline !== undefined) {
      const md = convertInline(t.inline)
      if (md) parts.push(md)
    } else {
      const md = blockToMd(t).trimEnd()
      if (md) parts.push(md)
    }
  }
  return parts.join('\n\n').trim()
}

function mdFromHtml(html) {
  const tokens = tokenize(html)
  let out = ''
  for (const t of tokens) {
    if (t.inline !== undefined) {
      const md = convertInline(t.inline)
      if (md) out += md + '\n\n'
    } else {
      out += blockToMd(t)
    }
  }
  return out.replace(/\n{3,}/g, '\n\n').trim()
}

// --- per-bucket pipeline ------------------------------------------------

function refreshBlog(html) {
  let body = sliceBlogBody(html)
  if (!body) return null
  body = stripGarbage(body)
  body = stripBlogAlerts(body)
  body = stripBlogFooter(body)
  return mdFromHtml(body)
}

function refreshGlossary(html) {
  let body = sliceGlossaryBody(html)
  if (!body) return null
  body = stripGarbage(body)
  return mdFromHtml(body)
}

function refreshStory(html) {
  let body = sliceStoryBody(html)
  if (!body) return null
  body = stripGarbage(body)
  body = stripStoryMobileAside(body)
  return mdFromHtml(body)
}

function refreshWhitepaper(html) {
  let body = sliceWhitepaperBody(html)
  if (!body) return null
  body = stripGarbage(body)
  return mdFromHtml(body)
}

function refreshWebinar(html) {
  let body = sliceWebinarBody(html)
  if (!body) return null
  body = stripGarbage(body)
  body = stripWebinarHeaderMeta(body)
  return mdFromHtml(body)
}

const REFRESHER = {
  blog: refreshBlog,
  glossary: refreshGlossary,
  stories: refreshStory,
  whitepapers: refreshWhitepaper,
  webinars: refreshWebinar,
}

// --- frontmatter splitter (replace body only) ---------------------------

function parseFrontmatter(md) {
  const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!m) return null
  return { fm: m[0], body: md.slice(m[0].length) }
}

// --- driver ------------------------------------------------------------

function processBucket(bucket, slugFilter, dryRun) {
  const conf = BUCKETS[bucket]
  if (!conf) return { bucket, status: 'unknown-bucket' }
  const refresh = REFRESHER[bucket]
  const slugs = readdirSync(conf.mdDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
    .filter((s) => !slugFilter || s === slugFilter)
  const results = []
  for (const slug of slugs) {
    const mdPath = join(conf.mdDir, `${slug}.md`)
    const htmlPath = join(conf.htmlDir, `${slug}.html`)
    if (!existsSync(htmlPath)) {
      results.push({ slug, status: 'no-html' })
      continue
    }
    const md = readFileSync(mdPath, 'utf8')
    const html = readFileSync(htmlPath, 'utf8')
    const fm = parseFrontmatter(md)
    if (!fm) {
      results.push({ slug, status: 'no-frontmatter' })
      continue
    }
    const newBody = refresh(html)
    if (!newBody) {
      results.push({ slug, status: 'no-body-found' })
      continue
    }
    const next = fm.fm + '\n' + newBody + '\n'
    if (next === md) {
      results.push({ slug, status: 'unchanged' })
      continue
    }
    if (!dryRun) writeFileSync(mdPath, next, 'utf8')
    results.push({ slug, status: 'updated', delta: next.length - md.length })
  }
  return { bucket, results }
}

function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const positional = args.filter((a) => !a.startsWith('--'))
  const bucket = positional[0]
  const slugFilter = positional[1]

  const targets = bucket ? [bucket] : Object.keys(BUCKETS)
  const all = targets.map((b) => processBucket(b, slugFilter, dryRun))

  console.log(`\n${dryRun ? '[dry-run] ' : ''}refresh-bodies-A summary`)
  for (const { bucket: b, results, status } of all) {
    if (status) {
      console.log(`  ${b}: ${status}`)
      continue
    }
    const counts = results.reduce((acc, r) => ((acc[r.status] = (acc[r.status] ?? 0) + 1), acc), {})
    console.log(`  ${b}: ${results.length} files`, counts)
    if (slugFilter) {
      // Print the actual generated markdown for inspection.
      const r = results[0]
      if (r) {
        console.log(`\n----- ${slugFilter} (${r.status}, delta ${r.delta ?? 0}) -----`)
      }
    }
  }
}

main()
