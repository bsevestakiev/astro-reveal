@echo off
REM ── Reveal "Publish on Save" test launcher (Windows) ───────────────────────
REM Opens the dev server + the publish watcher + the Sveltia admin in a browser.
REM Run from the repo root by double-clicking, or: author.cmd
cd /d %~dp0

REM The watcher commits to cms-content, so author on that branch.
git checkout cms-content

REM 1) Astro dev server → renders the live preview at http://localhost:4321
start "Reveal Dev Server" cmd /k "npm run dev"

REM give the dev server a moment to boot
timeout /t 4 >nul

REM 2) Publish watcher → turns "tick Publish + Save" into a push to cms-content
start "Publish Watcher" cmd /k "node scripts/publish-watcher.mjs"

REM 3) Open the CMS
start "" http://localhost:4321/admin/

echo.
echo Two windows opened (dev server + watcher) and the CMS in your browser.
echo Close those windows to stop.
