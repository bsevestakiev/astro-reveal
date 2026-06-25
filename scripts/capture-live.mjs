#!/usr/bin/env node
// Capture full-page screenshots of the live revealbi.io page for a given slug.
// Used as input for Copilot-assisted parity refits — coworkers run this once,
// then open the .md file and run the /refit prompt in Copilot Chat.
//
// Usage:
//   node scripts/capture-live.mjs ai
//   node scripts/capture-live.mjs embedded-analytics chart-types
//   npm run capture -- ai
//
// Requires: npx playwright install chromium  (one-time setup)

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(here, '..')
const OUT_DIR = join(repoRoot, 'parity', 'compare')
const LIVE_BASE = 'https://www.revealbi.io'

const VIEWPORTS = [
  { name: 'mobile',  width: 375,  height: 812 },
  { name: 'tablet',  width: 768,  height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
]

async function primeLazyLoad(page) {
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

  await page.evaluate(() => {
    for (const el of document.querySelectorAll('[data-aos], .has-fade, .reveal-on-scroll, .fade-in-section')) {
      el.classList.add('is-visible', 'aos-animate', 'fade-in', 'visible')
      el.style.opacity = '1'
      el.style.transform = 'none'
    }
  })
}

async function captureSlug(browser, slug) {
  const dir = join(OUT_DIR, slug)
  mkdirSync(dir, { recursive: true })

  const url = `${LIVE_BASE}/${slug}`
  const meta = { slug, url, captured: new Date().toISOString(), viewports: [] }

  for (const vp of VIEWPORTS) {
    const ctx  = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 })
    const page = await ctx.newPage()
    const png  = join(dir, `live-${vp.name}.png`)
    let err = null

    process.stdout.write(`  ${vp.name}… `)
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30_000 })
      await page.waitForLoadState('load', { timeout: 10_000 }).catch(() => {})
      await primeLazyLoad(page)
      await page.screenshot({ path: png, fullPage: true })
      process.stdout.write('done\n')
    } catch (e) {
      err = e.message
      process.stdout.write(`error: ${err}\n`)
    }

    await ctx.close()
    meta.viewports.push({ name: vp.name, png, err })
  }

  writeFileSync(join(dir, 'meta.json'), JSON.stringify(meta, null, 2))
  return meta
}

async function main() {
  const slugs = process.argv.slice(2).filter((a) => !a.startsWith('--'))
  if (slugs.length === 0) {
    console.error('Usage: node scripts/capture-live.mjs <slug> [slug…]')
    console.error('Example: node scripts/capture-live.mjs ai embedded-analytics')
    process.exit(1)
  }

  const { chromium } = await import('playwright')
  const browser = await chromium.launch()
  mkdirSync(OUT_DIR, { recursive: true })

  for (const slug of slugs) {
    console.log(`\ncapturing: https://www.revealbi.io/${slug}`)
    try {
      const meta = await captureSlug(browser, slug)
      const errs = meta.viewports.filter((v) => v.err)
      if (errs.length) console.log(`  warnings: ${errs.length} viewport(s) had errors`)
      else console.log(`  saved to parity/compare/${slug}/`)
    } catch (err) {
      console.error(`  failed: ${err.message}`)
    }
  }

  await browser.close()
  console.log('\ndone. open parity/compare/<slug>/ and run the /refit prompt in Copilot.')
}

main().catch((err) => { console.error(err); process.exit(1) })
