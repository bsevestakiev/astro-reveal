// Rewrite stale Astro CSS hrefs in pre-built locale HTML.
//
// The translation pipeline emitted ~960 static HTML pages under
// public/{es,ja,ko,pt-BR}/ on 2026-05-27. At that point Astro keyed page CSS
// to a `_slug_` entry point and the bundles were named:
//   /_astro/_slug_.wNviv-3r.css
//   /_astro/_slug_.D8Ay6TMX.css
//
// Astro's build has since switched to per-component CSS keyed on BaseLayout
// and SectionRenderer, so those `_slug_.*.css` files no longer exist in the
// build output and every locale page is unstyled on staging/production.
//
// This post-build patcher reads the current CSS hrefs out of a built EN
// reference page (dist/about-us/index.html) and substitutes the stale refs
// in every locale HTML. It only touches files under dist/{es,ja,ko,pt-BR}/
// that contain the literal stale strings — EN pages, jp/, admin/, wp-content/,
// sitemaps and any future-translated pages with current refs are untouched.

import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const LOCALES = ['es', 'ja', 'ko', 'pt-BR'];
const REFERENCE_PAGE = path.join(DIST, 'about-us', 'index.html');
const STALE_REFS = [
  '/_astro/_slug_.wNviv-3r.css',
  '/_astro/_slug_.D8Ay6TMX.css',
];

if (!fs.existsSync(REFERENCE_PAGE)) {
  console.error(`fix-locale-css-refs: reference page not found at ${REFERENCE_PAGE} — skipping`);
  process.exit(0);
}

const refHtml = fs.readFileSync(REFERENCE_PAGE, 'utf8');
const cssHrefs = [...refHtml.matchAll(/<link[^>]*rel="stylesheet"[^>]*href="(\/_astro\/[^"]+\.css)"/g)].map(m => m[1]);

if (cssHrefs.length < STALE_REFS.length) {
  console.error(
    `fix-locale-css-refs: expected at least ${STALE_REFS.length} CSS refs in ${REFERENCE_PAGE}, found ${cssHrefs.length}. ` +
    `Skipping rewrite — locale pages will keep stale refs.`,
  );
  process.exit(0);
}

const replacements = STALE_REFS.map((stale, i) => ({ stale, fresh: cssHrefs[i] }));

function walk(dir, callback) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, callback);
    else if (entry.isFile() && entry.name.endsWith('.html')) callback(full);
  }
}

let touched = 0;
for (const locale of LOCALES) {
  const dir = path.join(DIST, locale);
  if (!fs.existsSync(dir)) continue;
  walk(dir, file => {
    let html = fs.readFileSync(file, 'utf8');
    let changed = false;
    for (const { stale, fresh } of replacements) {
      if (html.includes(stale)) {
        html = html.replaceAll(stale, fresh);
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(file, html);
      touched++;
    }
  });
}

const mapping = replacements.map(r => `${r.stale} → ${r.fresh}`).join('\n  ');
console.log(`fix-locale-css-refs: rewrote ${touched} HTML file(s)\n  ${mapping}`);
