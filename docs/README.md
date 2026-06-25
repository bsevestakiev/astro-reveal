# Documentation index

All project documentation lives here. Start with the README at the repo root for the overview; come here for the deeper material.

## Handoff (read first)

- [`handoff/cutover-checklist.md`](handoff/cutover-checklist.md) — every switch to flip when launching, with file/line refs and a suggested run order
- [`handoff/outstanding-work.md`](handoff/outstanding-work.md) — categorized punchlist of what's left
- [`handoff/tracking-and-analytics.md`](handoff/tracking-and-analytics.md) — analytics wiring status (Phases 1–3 done, 4–5 pending)
- [`handoff/gdpr-consent.md`](handoff/gdpr-consent.md) — GDPR banner, Consent Mode v2, known caveats
- [`handoff/noindex-switch.md`](handoff/noindex-switch.md) — why the site is currently noindexed and how to revert

## CMS (Sveltia)

- [`cms/status.md`](cms/status.md) — current Sveltia phase status (S0/S1/S2/A/B/D done; S3/S4 deferred)
- [`cms/setup-history.md`](cms/setup-history.md) — original Sveltia setup plan + design rationale (also explains why Keystatic was abandoned)

## Translation pipeline (n8n)

- [`n8n/contract.md`](n8n/contract.md) — what gets translated, what stays verbatim, HTML allowlist, write-ownership rules
- [`n8n/knowledgebase.md`](n8n/knowledgebase.md) — operational troubleshooting log; 5 recorded LLM failure modes + their defensive transforms

## Parity (visual matching with WordPress)

- [`parity/plan.md`](parity/plan.md) — overall strategy: page buckets, definition of "matches", component reuse policy
- [`parity/per-page-walk.md`](parity/per-page-walk.md) — per-page methodology (definition-of-done per page; no-shortcuts rule)
- [`parity/tracking.md`](parity/tracking.md) — 222-row table tracking every page's reference quality, diff status, fix status
- [`parity/tracker.md`](parity/tracker.md) — mirror tracker (companion view)
- [`parity/changelog.md`](parity/changelog.md) — what landed, what regressed, what's still open across parity sessions

## History (background reading)

- [`history/migration-plan.md`](history/migration-plan.md) — original WP → Astro migration plan
- [`history/cleancode-plan.md`](history/cleancode-plan.md) — original code-cleanup plan (Phase 1 done; 2/3 informed the current state)
- [`history/homepage-bugfixing.md`](history/homepage-bugfixing.md) — homepage parity fixes
- [`history/footer-wave.md`](history/footer-wave.md) — short note on the footer wave SVG approach
- [`history/session-2026-04-30.md`](history/session-2026-04-30.md) — session log
- [`history/session-2026-05-05.md`](history/session-2026-05-05.md) — session log
- [`history/demo-2026-05-05.md`](history/demo-2026-05-05.md) — narrative explainer of the project for stakeholder demo
