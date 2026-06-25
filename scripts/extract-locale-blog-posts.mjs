#!/usr/bin/env node
// Scan public/<loc>/blog/<slug>/index.html for each non-en locale, extract
// title / date / description / cover / author from <head>, and emit a JSON
// manifest at src/data/locale-blog-posts.json. The localized blog index
// (src/pages/[lang]/blog/index.astro) reads that JSON to render post cards.
//
// Why this exists: the translation pipeline ports per-post HTML into public/
// but doesn't feed Astro's content collection (src/content/blog/<loc>/ is
// empty for non-en locales). Without this pass, /ja/blog/, /es/blog/, etc.
// render the "No posts yet" empty state even though all the per-post URLs
// work.
//
// Runs before `astro build` so the JSON is on disk when Astro imports it.

import { readFileSync, readdirSync, statSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'

const PUBLIC_DIR = resolve('public')
const OUT = resolve('src/data/locale-blog-posts.json')

const LOCALES = ['es', 'ja', 'ko', 'pt-BR']
const EXCLUDE_SLUGS = new Set(['category', 'page', 'tag', 'author'])

function first(html, regex) {
  const m = html.match(regex)
  return m ? m[1].trim() : null
}

// Strip the staging/prod host from a URL so it becomes a host-relative path.
// The cover image is rendered as <img src={...}> on the index card and needs
// to resolve against whichever host is actually serving the page.
function relativizeUrl(url) {
  if (!url) return null
  return url.replace(/^https?:\/\/(?:astro-staging|www)\.revealbi\.io/, '')
}

function extractPost(slug, file) {
  const html = readFileSync(file, 'utf8')
  const date = first(html, /itemprop="datePublished"\s+datetime="(\d{4}-\d{2}-\d{2})"/)
  const title = first(html, /<title>([^<]+)<\/title>/)
  // Skip non-post pages (index, category, etc.) — a post must have both
  // a published date and a title.
  if (!date || !title) return null
  return {
    slug,
    title,
    date,
    description: first(html, /name="description"\s+content="([^"]+)"/),
    cover: relativizeUrl(first(html, /property="og:image"\s+content="([^"]+)"/)),
    author: first(html, /meta\s+name="author"\s+content="([^"]+)"/),
  }
}

function extractLocale(loc) {
  const dir = join(PUBLIC_DIR, loc, 'blog')
  if (!existsSync(dir)) return []
  const posts = []
  for (const slug of readdirSync(dir)) {
    if (EXCLUDE_SLUGS.has(slug)) continue
    const file = join(dir, slug, 'index.html')
    if (!existsSync(file) || !statSync(file).isFile()) continue
    const post = extractPost(slug, file)
    if (post) posts.push(post)
  }
  return posts.sort((a, b) => b.date.localeCompare(a.date))
}

const result = {}
let total = 0
for (const loc of LOCALES) {
  result[loc] = extractLocale(loc)
  total += result[loc].length
  console.log(`extract-locale-blog-posts: ${loc} → ${result[loc].length} posts`)
}

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, JSON.stringify(result, null, 2) + '\n')
console.log(`extract-locale-blog-posts: wrote ${OUT} (${total} posts total)`)
