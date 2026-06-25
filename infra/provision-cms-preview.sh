#!/usr/bin/env bash
#
# Provisions the Sveltia "cms-content" PREVIEW environment on AWS:
#   - private S3 bucket (Block Public Access ON)
#   - CloudFront distribution (OAC → S3, default cert / *.cloudfront.net)
#   - a CloudFront Function that rewrites /foo and /foo/ → /foo/index.html
#   - a scoped IAM deploy user + access key for GitHub Actions
#
# It is the runnable version of astro-reveal/DEPLOY.md, for a third (preview)
# environment that builds the cms-content branch. Run it ONCE.
#
# Prereqs:  aws CLI v2, an active SSO session for the profile below.
#   aws sso login --profile AdministratorAccess-130516034950
#
# Usage:    bash infra/provision-cms-preview.sh
#
set -euo pipefail

# ─── settings (edit if you want different names) ────────────────────────────
PROFILE="${PROFILE:-AdministratorAccess-130516034950}"
REGION="${REGION:-us-east-1}"
BUCKET="${BUCKET:-revealbi-cms-preview}"
DEPLOY_USER="${DEPLOY_USER:-cms-preview-deployer}"
CF_FN_NAME="${CF_FN_NAME:-cms-preview-index-rewrite}"
# ────────────────────────────────────────────────────────────────────────────

aws() { command aws --profile "$PROFILE" --region "$REGION" "$@"; }
ACCOUNT="$(aws sts get-caller-identity --query Account --output text)"
echo "▶ account=$ACCOUNT region=$REGION bucket=$BUCKET"

# 1) Private S3 bucket -------------------------------------------------------
if aws s3api head-bucket --bucket "$BUCKET" 2>/dev/null; then
  echo "• bucket exists, reusing"
else
  if [ "$REGION" = "us-east-1" ]; then
    aws s3api create-bucket --bucket "$BUCKET" >/dev/null
  else
    aws s3api create-bucket --bucket "$BUCKET" \
      --create-bucket-configuration LocationConstraint="$REGION" >/dev/null
  fi
  echo "• bucket created"
fi
aws s3api put-public-access-block --bucket "$BUCKET" \
  --public-access-block-configuration \
  BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true >/dev/null

# 2) CloudFront Function: directory-index rewrite ----------------------------
TMP="$(mktemp -d)"
cat > "$TMP/rewrite.js" <<'JS'
function handler(event) {
  var req = event.request;
  var uri = req.uri;
  if (uri.endsWith('/')) { req.uri = uri + 'index.html'; }
  else if (!uri.split('/').pop().includes('.')) { req.uri = uri + '/index.html'; }
  return req;
}
JS
if aws cloudfront describe-function --name "$CF_FN_NAME" >/dev/null 2>&1; then
  FN_ARN="$(aws cloudfront describe-function --name "$CF_FN_NAME" --query 'FunctionSummary.FunctionMetadata.FunctionARN' --output text)"
  echo "• CloudFront function exists, reusing"
else
  FN_ARN="$(aws cloudfront create-function --name "$CF_FN_NAME" \
    --function-config "Comment=cms preview index rewrite,Runtime=cloudfront-js-2.0" \
    --function-code "fileb://$TMP/rewrite.js" \
    --query 'FunctionSummary.FunctionMetadata.FunctionARN' --output text)"
  ETAG="$(aws cloudfront describe-function --name "$CF_FN_NAME" --query 'ETag' --output text)"
  aws cloudfront publish-function --name "$CF_FN_NAME" --if-match "$ETAG" >/dev/null
  echo "• CloudFront function created + published"
fi

# 3) Origin Access Control (S3) ----------------------------------------------
OAC="$(aws cloudfront list-origin-access-controls \
  --query "OriginAccessControlList.Items[?Name=='${BUCKET}-oac'].Id | [0]" --output text)"
if [ "$OAC" = "None" ] || [ -z "$OAC" ]; then
  OAC="$(aws cloudfront create-origin-access-control \
    --origin-access-control-config "Name=${BUCKET}-oac,Description=cms preview,SigningProtocol=sigv4,SigningBehavior=always,OriginAccessControlOriginType=s3" \
    --query 'OriginAccessControl.Id' --output text)"
  echo "• OAC created: $OAC"
else
  echo "• OAC exists, reusing: $OAC"
fi

# 4) CloudFront distribution -------------------------------------------------
cat > "$TMP/dist.json" <<JSON
{
  "CallerReference": "cms-preview-$(date +%s)",
  "Comment": "Sveltia cms-content preview",
  "Enabled": true,
  "DefaultRootObject": "index.html",
  "Aliases": { "Quantity": 0 },
  "Origins": { "Quantity": 1, "Items": [ {
    "Id": "s3-preview",
    "DomainName": "${BUCKET}.s3.${REGION}.amazonaws.com",
    "OriginPath": "",
    "OriginAccessControlId": "${OAC}",
    "S3OriginConfig": { "OriginAccessIdentity": "" },
    "CustomHeaders": { "Quantity": 0 },
    "ConnectionAttempts": 3, "ConnectionTimeout": 10,
    "OriginShield": { "Enabled": false }
  } ] },
  "DefaultCacheBehavior": {
    "TargetOriginId": "s3-preview",
    "ViewerProtocolPolicy": "redirect-to-https",
    "AllowedMethods": { "Quantity": 2, "Items": [ "HEAD", "GET" ], "CachedMethods": { "Quantity": 2, "Items": [ "HEAD", "GET" ] } },
    "Compress": true,
    "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6",
    "FunctionAssociations": { "Quantity": 1, "Items": [ { "FunctionARN": "${FN_ARN}", "EventType": "viewer-request" } ] },
    "LambdaFunctionAssociations": { "Quantity": 0 },
    "SmoothStreaming": false, "FieldLevelEncryptionId": ""
  },
  "PriceClass": "PriceClass_100",
  "HttpVersion": "http2and3",
  "IsIPV6Enabled": true,
  "ViewerCertificate": { "CloudFrontDefaultCertificate": true },
  "Restrictions": { "GeoRestriction": { "RestrictionType": "none", "Quantity": 0 } },
  "WebACLId": ""
}
JSON
read -r DIST_ID DIST_DOMAIN < <(aws cloudfront create-distribution \
  --distribution-config "file://$TMP/dist.json" \
  --query '[Distribution.Id, Distribution.DomainName]' --output text)
DIST_ARN="arn:aws:cloudfront::${ACCOUNT}:distribution/${DIST_ID}"
echo "• distribution: $DIST_ID  →  https://$DIST_DOMAIN"

# 5) Bucket policy: only this distribution (via OAC) may read ----------------
cat > "$TMP/bucket-policy.json" <<JSON
{ "Version": "2012-10-17", "Statement": [ {
  "Sid": "AllowCloudFrontOAC",
  "Effect": "Allow",
  "Principal": { "Service": "cloudfront.amazonaws.com" },
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::${BUCKET}/*",
  "Condition": { "StringEquals": { "AWS:SourceArn": "${DIST_ARN}" } }
} ] }
JSON
aws s3api put-bucket-policy --bucket "$BUCKET" --policy "file://$TMP/bucket-policy.json"
echo "• bucket policy attached"

# 6) Scoped IAM deploy user + access key -------------------------------------
aws iam get-user --user-name "$DEPLOY_USER" >/dev/null 2>&1 || aws iam create-user --user-name "$DEPLOY_USER" >/dev/null
aws iam put-user-policy --user-name "$DEPLOY_USER" --policy-name deploy-cms-preview \
  --policy-document "{\"Version\":\"2012-10-17\",\"Statement\":[
    {\"Effect\":\"Allow\",\"Action\":[\"s3:PutObject\",\"s3:DeleteObject\",\"s3:ListBucket\"],\"Resource\":[\"arn:aws:s3:::${BUCKET}\",\"arn:aws:s3:::${BUCKET}/*\"]},
    {\"Effect\":\"Allow\",\"Action\":\"cloudfront:CreateInvalidation\",\"Resource\":\"${DIST_ARN}\"}]}" >/dev/null
read -r AK_ID AK_SECRET < <(aws iam create-access-key --user-name "$DEPLOY_USER" \
  --query '[AccessKey.AccessKeyId, AccessKey.SecretAccessKey]' --output text)
rm -rf "$TMP"

# 7) Output — these are your GitHub `preview` Environment secrets ------------
cat <<OUT

────────────────────────────────────────────────────────────────────
✅ Preview environment provisioned.

Preview URL (live after first deploy):  https://$DIST_DOMAIN

GitHub → Settings → Environments → NEW environment "preview" → add secrets:

  AWS_ACCESS_KEY_ID            $AK_ID
  AWS_SECRET_ACCESS_KEY        $AK_SECRET
  S3_BUCKET_NAME               $BUCKET
  CLOUDFRONT_DISTRIBUTION_ID   $DIST_ID

⚠ AWS_SECRET_ACCESS_KEY is shown ONCE — copy it now.
Then set  site_url: https://$DIST_DOMAIN  in public/admin/config.yml.
────────────────────────────────────────────────────────────────────
OUT
