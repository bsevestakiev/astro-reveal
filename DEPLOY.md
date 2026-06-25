# Deployment setup

The site auto-deploys to S3 + CloudFront via GitHub Actions:

A single branch-aware workflow (`.github/workflows/deploy.yml`) handles both targets:

- push to `staging` → builds with `.env.staging` → deploys to the staging S3 bucket / distribution
- push to `main` → builds with `.env.production` → deploys to the production S3 bucket / distribution
- n8n's `repository_dispatch` (translation pipeline, separate `translation.yml`) → builds + deploys to staging only

## One-time setup

### 1. AWS infrastructure (two environments)

Create separate resources for staging and production:

| Resource | Staging | Production |
|---|---|---|
| S3 bucket (static website hosting) | e.g. `astro-revealbi-staging` | e.g. `astro-revealbi-prod` |
| CloudFront distribution | fronts the staging bucket | fronts the prod bucket |
| ACM certificate + alternate domain | `astro-staging.revealbi.io` | `www.revealbi.io` |
| IAM user / role | scoped to the staging bucket + distribution | scoped to the prod bucket + distribution |
| Response Headers Policy | apply `infra/cloudfront-response-headers-policy.json` | same |

Each IAM principal needs:
- `s3:PutObject`, `s3:DeleteObject`, `s3:ListBucket` on its bucket
- `cloudfront:CreateInvalidation` on its distribution

### 2. GitHub repo

```bash
cd astro-reveal
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-org>/<your-repo>.git
git push -u origin main
git checkout -b staging
git push -u origin staging
```

In **Settings → General → Default branch**, set the default to `staging`. This avoids the "PR targets `main` by accident" gotcha — feature PRs will default-target `staging`, and only the explicit promotion PR has to retarget `main`.

### 3. GitHub Actions environments + secrets

In **Settings → Environments**, create two environments:

#### `staging`
| Secret | Value |
|---|---|
| `AWS_ACCESS_KEY_ID` | staging IAM access key |
| `AWS_SECRET_ACCESS_KEY` | staging IAM secret key |
| `S3_BUCKET_NAME` | staging bucket name (no `s3://` prefix) |
| `CLOUDFRONT_DISTRIBUTION_ID` | staging distribution ID |

#### `production`
Same four secrets, with production values. Optional: tick "Required reviewers" so a human has to approve before the prod deploy fires.

`deploy.yml` resolves `environment:` from the branch ref (`main` → `production`, anything else → `staging`), so secrets resolve automatically per branch — no `STAGING_*` / `PROD_*` prefixes in the workflow file.

### 4. Public values per environment

These live in committed files, not secrets:

- `.env.staging` — site URL, noindex flag, deploy env tag, plus analytics keys (typically empty for staging so the prod GA stream stays clean)
- `.env.production` — same shape, with production site URL and the analytics IDs marketing hands over

`deploy.yml` does `cp .env.<env> .env` before `npm run build`, picking the file from the branch — so the same code produces different artifacts per target.

## How a deploy works

1. Push lands on `staging` or `main`
2. GitHub Actions checks out the branch, copies the matching `.env.<env>` to `.env`
3. `npm ci` then `npm run build` — runs `validate-content.mjs` (HTML allowlist) → `astro build` → `pagefind`
4. `aws s3 sync dist/` with two passes: long-cache (1 year) for static assets, no-cache for `*.html`/`*.xml`/`*.json`
5. `aws cloudfront create-invalidation --paths "/*"` so the new version serves immediately

The `translation.yml` workflow does the same against the `staging` branch when n8n fires `repository_dispatch` of type `translation-complete`. Translations always land on staging first; production gets them via the next staging → main promotion PR.
