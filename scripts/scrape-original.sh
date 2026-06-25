#!/usr/bin/env bash
# Mirror www.revealbi.io into ../www.revealbi.io/ (sibling of this repo).
# parity-snap.mjs expects the mirror at exactly that location with pages
# saved as <slug>.html — see ORIGINAL_ROOT and originalRef() in those scripts.
#
# Usage:
#   scripts/scrape-original.sh           # full mirror, ~30-90 min, ~200-500 MB
#   scripts/scrape-original.sh --quick   # ~10 representative pages, ~2 min
#   scripts/scrape-original.sh --clean   # delete existing mirror, then full
#
# Re-running the full mode resumes naturally: --mirror implies -N timestamping,
# so already-downloaded files are skipped unless they changed remotely.

set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$HERE/.." && pwd)"
PARENT="$(cd "$REPO_ROOT/.." && pwd)"
TARGET="$PARENT/www.revealbi.io"

MODE="full"
for arg in "$@"; do
  case "$arg" in
    --quick) MODE="quick" ;;
    --clean) MODE="clean" ;;
    -h|--help)
      sed -n '2,12p' "$0"
      exit 0 ;;
    *)
      echo "Unknown arg: $arg" >&2
      echo "Try --help" >&2
      exit 1 ;;
  esac
done

if [[ "$MODE" == "clean" ]]; then
  echo "Removing $TARGET ..."
  rm -rf "$TARGET"
  MODE="full"
fi

mkdir -p "$PARENT"
cd "$PARENT"

COMMON_FLAGS=(
  --convert-links
  --adjust-extension
  --page-requisites
  --restrict-file-names=windows
  --no-check-certificate
  --user-agent="Mozilla/5.0 (X11; Linux x86_64) parity-mirror"
  -e robots=off
  --wait=0.3 --random-wait
  --tries=3 --timeout=30
  --domains=revealbi.io
  --reject-regex='(wp-admin|wp-login|/feed/|/comments/|\?replytocom=|\?share=|\?print=)'
)

if [[ "$MODE" == "quick" ]]; then
  echo "Quick mode: 10 representative pages + page-requisites, no recursion"
  URLS_FILE=$(mktemp)
  trap 'rm -f "$URLS_FILE"' EXIT
  cat > "$URLS_FILE" <<'EOF'
https://www.revealbi.io/
https://www.revealbi.io/pricing/
https://www.revealbi.io/ai/
https://www.revealbi.io/features/
https://www.revealbi.io/embedded-analytics/
https://www.revealbi.io/banking-analytics/
https://www.revealbi.io/reveal-vs-power-bi/
https://www.revealbi.io/about-us/
https://www.revealbi.io/blog/
https://www.revealbi.io/glossary/
EOF
  wget "${COMMON_FLAGS[@]}" --input-file="$URLS_FILE"
else
  echo "Full mirror starting → $TARGET"
  echo "Expect 30-90 minutes, ~200-500 MB. Rerun the same command to resume."
  wget --mirror "${COMMON_FLAGS[@]}" https://www.revealbi.io/
fi

echo
echo "Done. Mirror at: $TARGET"
HTML_COUNT=$(find "$TARGET" -name '*.html' 2>/dev/null | wc -l)
echo "  html files: $HTML_COUNT"
du -sh "$TARGET" 2>/dev/null || true
