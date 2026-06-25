#!/usr/bin/env node
// Post-build pass over dist/<*.html>. For canonical / og:url / twitter:url /
// hreflang-alternate URL attributes, force two normalizations:
//
//   1. Host = whatever PUBLIC_SITE_URL points at for this build. Pre-translated
//      locale pages (es/, ko/, pt-BR/, and most of ja/) ship from
//      public/<loc>/<slug>/index.html with the staging host baked in by the
//      translation pipeline. Without this rewrite, a production build leaves
//      ES/KO/pt-BR canonicals pointing at astro-staging.revealbi.io — i.e.
//      telling Google "the real version of this page is on staging," which is
//      the inverse of what cutover wants.
//
//   2. Path = no trailing slash, except the bare root "/" which keeps it
//      (matching live WP behavior at www.revealbi.io/).
//
// Idempotent. Only rewrites canonical-equivalent tags — never touches <a href>
// or other body content. Falls back to staging URL if PUBLIC_SITE_URL is unset
// (matches astro.config.mjs default).

import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

const DIST = resolve('dist')
const TARGET_SITE = (process.env.PUBLIC_SITE_URL || 'https://astro-staging.revealbi.io').replace(/\/$/, '')

// Capture an absolute URL in href="..." / content="..." form:
//   group 1: attribute opener (`href="` or `content="`)
//   group 2: path including leading slash (everything after the origin)
//   group 3: closing quote
const URL_ATTR_RE = /((?:href|content)=")https?:\/\/[^"\/]+(\/[^"]*)(")/g

// Tag filter: only rewrite tags that carry canonical-equivalent URLs.
const TAG_RE = /<(link|meta)\b[^>]*>/g

function normalize(html) {
  let touched = 0
  const out = html.replace(TAG_RE, (tag) => {
    const isCanonical = /\brel="canonical"/.test(tag)
    const isAlternate = /\brel="alternate"/.test(tag) && /\bhreflang=/.test(tag)
    const isOgUrl = /\bproperty="og:url"/.test(tag)
    const isTwUrl = /\bname="twitter:url"/.test(tag)
    if (!(isCanonical || isAlternate || isOgUrl || isTwUrl)) return tag

    return tag.replace(URL_ATTR_RE, (_m, pre, path, post) => {
      const cleanPath = path === '/' ? '/' : path.replace(/\/+$/, '')
      touched += 1
      return `${pre}${TARGET_SITE}${cleanPath}${post}`
    })
  })
  return { out, touched }
}

function walk(dir, results) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    const s = statSync(p)
    if (s.isDirectory()) walk(p, results)
    else if (name === 'index.html' || name.endsWith('.html')) results.push(p)
  }
}

const files = []
walk(DIST, files)

let totalFiles = 0
let totalTouched = 0
for (const file of files) {
  const html = readFileSync(file, 'utf8')
  const { out, touched } = normalize(html)
  if (touched > 0) {
    writeFileSync(file, out)
    totalFiles += 1
    totalTouched += touched
  }
}

console.log(`normalize-trailing-slash: target=${TARGET_SITE} files=${totalFiles} urls=${totalTouched}`)
