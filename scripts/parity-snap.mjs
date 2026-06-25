#!/usr/bin/env node
// Phase-0 visual-parity harness.
//
// Spawns two static servers (original wget snapshot + built astro dist),
// launches headless Chromium via Playwright, captures full-page screenshots
// at three viewports for both sides, writes a side-by-side parity/report.html
// for human / multimodal-LLM review.
//
// Usage:
//   node scripts/parity-snap.mjs                  # all ⚪/❌ rows in tracker
//   node scripts/parity-snap.mjs /reveal-vs-tableau /pricing
//   node scripts/parity-snap.mjs --all            # every row
//
// Requires: `npm i -D playwright` then `npx playwright install chromium`.

import { createServer } from 'node:http'
import { createReadStream, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { dirname, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const repoAstro = join(here, '..')
const repoRoot = resolve(repoAstro, '..')
const ORIGINAL_ROOT = join(repoRoot, 'www.revealbi.io')
const BUILT_ROOT = join(repoAstro, 'dist')
const SNAPSHOTS_DIR = join(repoAstro, 'parity', 'snapshots')
const REPORT_PATH = join(repoAstro, 'parity', 'report.html')
const RUN_JSON = join(repoAstro, 'parity', 'last-run.json')
const TRACKER_PATH = join(repoAstro, 'parity-tracking.md')

const ORIGINAL_PORT = 8080
const BUILT_PORT = 4321

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
]

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
}

function staticServer(root, port) {
  return new Promise((resolveServer, rejectServer) => {
    const server = createServer((req, res) => {
      try {
        const url = new URL(req.url, `http://localhost:${port}`)
        let pathname = decodeURIComponent(url.pathname)
        if (pathname.includes('..')) { res.writeHead(400); res.end('bad path'); return }
        let filePath = join(root, pathname)
        try {
          const s = statSync(filePath)
          if (s.isDirectory()) filePath = join(filePath, 'index.html')
        } catch {}
        if (!existsSync(filePath)) { res.writeHead(404); res.end('not found'); return }
        const ext = extname(filePath).toLowerCase()
        res.writeHead(200, { 'content-type': MIME[ext] || 'application/octet-stream' })
        createReadStream(filePath).pipe(res)
      } catch (err) {
        res.writeHead(500); res.end(String(err))
      }
    })
    server.on('error', rejectServer)
    server.listen(port, '127.0.0.1', () => resolveServer(server))
  })
}

function parseTracker() {
  if (!existsSync(TRACKER_PATH)) {
    console.error(`tracker not found at ${TRACKER_PATH} — run scripts/parity-seed-tracker.mjs first`)
    process.exit(1)
  }
  const text = readFileSync(TRACKER_PATH, 'utf-8')
  const rows = []
  const rowRe = /^\| `([^`]+)` \| ([^|]+) \| `([^`]+)` \| ([^|]+) \| ([^|]+) \| ([^|]+) \|/gm
  let m
  while ((m = rowRe.exec(text)) !== null) {
    rows.push({
      path: m[1].trim(),
      bucket: m[2].trim(),
      original: m[3].trim(),
      reference: m[4].trim(),
      diff: m[5].trim(),
    })
  }
  return rows
}

function safeSlug(p) {
  return p.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, '__') || 'home'
}

async function snapPair(browser, row) {
  const slug = safeSlug(row.path)
  const dir = join(SNAPSHOTS_DIR, slug)
  mkdirSync(dir, { recursive: true })
  const result = { path: row.path, slug, viewports: [] }

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 })
    const page = await context.newPage()

    const originalUrl = `http://localhost:${ORIGINAL_PORT}${row.original}`
    const builtUrl = `http://localhost:${BUILT_PORT}${row.path}`

    const originalPng = join(dir, `original-${vp.name}.png`)
    const builtPng = join(dir, `built-${vp.name}.png`)

    let originalErr = null
    let builtErr = null

    // WP HTML references CSS/JS via absolute https://www.revealbi.io/... URLs.
    // Without filtering, those route to the live internet (slow / occasionally
    // blocking DCL) instead of the local wget snapshot which has them at the
    // same paths. Strategy: redirect www.revealbi.io ⇒ localhost, allow Reveal
    // CDN + Google Fonts (used by both sides), abort everything else.
    await page.route('**/*', async (route) => {
      const u = route.request().url()
      if (u.startsWith('http://localhost:') || u.startsWith('data:') || u.startsWith('blob:')) {
        return route.continue()
      }
      if (/^https?:\/\/(www\.)?revealbi\.io\//.test(u)) {
        const local = u.replace(/^https?:\/\/(www\.)?revealbi\.io/, `http://localhost:${ORIGINAL_PORT}`)
        try {
          const response = await route.fetch({ url: local })
          return route.fulfill({ response })
        } catch {
          return route.abort()
        }
      }
      if (
        u.includes('static.infragistics.com') ||
        u.includes('fonts.googleapis.com') ||
        u.includes('fonts.gstatic.com')
      ) {
        return route.continue()
      }
      route.abort()
    })

    process.stdout.write(`    ${vp.name}: orig… `)
    try {
      await page.goto(originalUrl, { waitUntil: 'domcontentloaded', timeout: 20_000 })
      await page.waitForLoadState('load', { timeout: 8_000 }).catch(() => {})
      await primeLazyLoad(page)
      await page.screenshot({ path: originalPng, fullPage: true })
      process.stdout.write(`built… `)
    } catch (err) { originalErr = err.message; process.stdout.write(`(orig err) built… `) }

    try {
      await page.goto(builtUrl, { waitUntil: 'domcontentloaded', timeout: 20_000 })
      await page.waitForLoadState('load', { timeout: 8_000 }).catch(() => {})
      await primeLazyLoad(page)
      await page.screenshot({ path: builtPng, fullPage: true })
      process.stdout.write(`done\n`)
    } catch (err) { builtErr = err.message; process.stdout.write(`(built err)\n`) }

    await context.close()

    result.viewports.push({
      name: vp.name,
      originalPng,
      builtPng,
      originalErr,
      builtErr,
    })
  }

  const anyErr = result.viewports.some((v) => v.originalErr || v.builtErr)
  result.status = anyErr ? '❌ capture error' : '⚪ captured'
  return result
}

async function primeLazyLoad(page) {
  // Disable CSS animations + transitions so run-to-run jitter doesn't matter,
  // and force IntersectionObserver-gated content into its visible state.
  try {
    await page.addStyleTag({ content: `
      *,*::before,*::after{
        animation-duration:0s !important;
        animation-delay:0s !important;
        transition-duration:0s !important;
        transition-delay:0s !important;
      }
    ` })
  } catch {}

  // Progressive scroll — viewport-sized steps so every section gets a moment
  // in-viewport. Single jump-to-bottom skips intermediate IO triggers.
  await page.evaluate(async () => {
    const step = Math.max(200, window.innerHeight * 0.7)
    let y = 0
    const total = document.body.scrollHeight
    while (y < total) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 120))
      y += step
    }
    window.scrollTo(0, total)
    await new Promise((r) => setTimeout(r, 400))
    window.scrollTo(0, 0)
    await new Promise((r) => setTimeout(r, 250))
  })

  // Wait for any in-flight images (lazy-loaded ones promoted by the scroll).
  await page.evaluate(() => Promise.all(
    Array.from(document.images)
      .filter((img) => !img.complete)
      .map((img) => new Promise((res) => {
        const done = () => res()
        img.addEventListener('load', done, { once: true })
        img.addEventListener('error', done, { once: true })
        setTimeout(done, 3000)
      }))
  ))

  // Force any IntersectionObserver-gated reveal classes that didn't already
  // fire (some sites key off `is-visible` / `aos-animate` / data attributes).
  await page.evaluate(() => {
    for (const el of document.querySelectorAll('[data-aos], .has-fade, .reveal-on-scroll, .fade-in-section')) {
      el.classList.add('is-visible', 'aos-animate', 'fade-in', 'visible')
      el.style.opacity = '1'
      el.style.transform = 'none'
    }
  })
}

function renderReport(results) {
  const rel = (p) => p ? p.replace(repoAstro + '/', '').replace(/\\/g, '/') : ''
  const rows = results.map((r) => {
    const viewportCells = r.viewports.map((v) => {
      const err = v.originalErr || v.builtErr
      return `
        <td style="padding:6px;vertical-align:top">
          <div style="font-weight:600;margin-bottom:4px">${v.name}</div>
          <div style="display:flex;gap:4px">
            <a href="${rel(v.originalPng)}" target="_blank"><img src="${rel(v.originalPng)}" width="220" loading="lazy" style="border:1px solid #ccc"></a>
            <a href="${rel(v.builtPng)}" target="_blank"><img src="${rel(v.builtPng)}" width="220" loading="lazy" style="border:1px solid #ccc"></a>
          </div>
          ${err ? `<div style="color:#900;font-size:11px;margin-top:4px">${err}</div>` : ''}
        </td>`
    }).join('')
    return `<tr id="${r.slug}">
      <td style="padding:6px;vertical-align:top;font-family:monospace;font-size:12px;white-space:nowrap;background:#f7f7f7">
        <div style="font-weight:700">${r.status}</div>
        <div><a href="#${r.slug}">${r.path}</a></div>
      </td>
      ${viewportCells}
    </tr>`
  }).join('\n')
  const toc = results.map((r) => `<li><a href="#${r.slug}">${r.path}</a></li>`).join('\n')
  const html = `<!doctype html>
<meta charset="utf-8">
<title>Parity report</title>
<style>
body{font-family:system-ui,sans-serif;margin:16px}
table{border-collapse:collapse}
th,td{border:1px solid #ddd;text-align:left}
th{background:#f0f0f0;padding:6px}
.toc{columns:3;font-family:monospace;font-size:12px}
.toc li{break-inside:avoid}
</style>
<h1>Parity report — ${results.length} pages</h1>
<p>Each row: original (left) | built (right) at three viewports. Click an image to open full-size in a new tab.</p>
<details><summary>Page index</summary><ul class="toc">${toc}</ul></details>
<table>
  <thead><tr><th>Page</th>${VIEWPORTS.map((v) => `<th>${v.name} (${v.width}px) — original | built</th>`).join('')}</tr></thead>
  <tbody>${rows}</tbody>
</table>`
  writeFileSync(REPORT_PATH, html)
}

async function main() {
  const args = process.argv.slice(2)
  const allFlag = args.includes('--all')
  const explicit = args.filter((a) => !a.startsWith('--'))

  const tracker = parseTracker()
  let targets
  if (explicit.length > 0) {
    const wanted = new Set(explicit.map((a) => a.endsWith('/') || a === '/' ? a : a + '/'))
    targets = tracker.filter((r) => wanted.has(r.path))
    if (targets.length === 0) {
      console.error('no tracker rows match:', explicit.join(', '))
      process.exit(1)
    }
  } else if (allFlag) {
    targets = tracker
  } else {
    targets = tracker.filter((r) => /⚪|❌/.test(r.diff))
  }
  console.log(`snap targets: ${targets.length}`)

  mkdirSync(SNAPSHOTS_DIR, { recursive: true })

  const originalServer = await staticServer(ORIGINAL_ROOT, ORIGINAL_PORT)
  const builtServer = await staticServer(BUILT_ROOT, BUILT_PORT)
  console.log(`servers up: :${ORIGINAL_PORT} (original) :${BUILT_PORT} (built)`)

  const { chromium } = await import('playwright')
  const browser = await chromium.launch()

  const results = []
  let i = 0
  for (const row of targets) {
    i++
    process.stdout.write(`[${i}/${targets.length}] ${row.path} … `)
    try {
      const r = await snapPair(browser, row)
      results.push(r)
      console.log(r.status)
    } catch (err) {
      console.log(`error: ${err.message}`)
      results.push({ path: row.path, slug: safeSlug(row.path), status: '❌ failing', viewports: [], error: err.message })
    }
  }

  await browser.close()
  originalServer.close()
  builtServer.close()

  renderReport(results)
  writeFileSync(RUN_JSON, JSON.stringify(results, null, 2))

  console.log(`\nreport: ${REPORT_PATH}`)
  console.log(`json:   ${RUN_JSON}`)
}

main().catch((err) => { console.error(err); process.exit(1) })
