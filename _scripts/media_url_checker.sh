#!/usr/bin/env bash
#
# Checks that external media URLs (images, videos, PDFs) added in a change
# return HTTP 200.
#
# Why: the internal link checker validates only <a href> links to pages inside
# the site, so a screenshot or video URL that points to a missing S3 object is
# never reported. A public S3 bucket answers 403 for a missing object, and the
# page silently renders a broken image.
#
# Usage:
#   _scripts/media_url_checker.sh                 # lines added since $GITHUB_BASE_SHA (default: master)
#   _scripts/media_url_checker.sh --all FILE...   # every media URL in the given files
#
# Only lines added in the diff are checked, so pre-existing broken URLs on a
# touched page do not fail the run.

set -uo pipefail

MEDIA_EXT='png|jpe?g|gif|svg|webp|avif|bmp|ico|mp4|webm|mov|ogg|mp3|pdf'
URL_RE="https?://[^][[:space:]\"'<>()]+\.(${MEDIA_EXT})(\?[^][[:space:]\"'<>()]*)?"

# Prints "file<TAB>line<TAB>url" for every media URL on lines added since BASE.
collect_from_diff() {
  local base="$1" fork_point
  # Compare the fork point with the working tree, so uncommitted edits are
  # checked locally. In CI the working tree equals HEAD.
  fork_point=$(git merge-base "$base" HEAD) || { echo "Cannot find merge base with ${base}" >&2; exit 2; }
  git diff -U0 --diff-filter=d "$fork_point" -- 'docs/**/*.md' '_includes/**' \
    | awk '
        /^\+\+\+ / { file = substr($0, 7); next }
        /^@@ / {
          split($3, a, ",")
          line = substr(a[1], 2) + 0
          next
        }
        /^\+/ { print file "\t" line "\t" substr($0, 2); line++ }
      ' \
    | while IFS=$'\t' read -r file line text; do
        grep -oiE "$URL_RE" <<<"$text" | while read -r url; do
          printf '%s\t%s\t%s\n' "$file" "$line" "$url"
        done
      done
}

# Prints "file<TAB>line<TAB>url" for every media URL in the given files.
collect_from_files() {
  local file
  for file in "$@"; do
    grep -noiE "$URL_RE" "$file" | while IFS=: read -r line url; do
      printf '%s\t%s\t%s\n' "$file" "$line" "$url"
    done
  done
}

# Prints the final HTTP status code of a URL after redirects.
# Some servers reject HEAD, so fall back to a one-byte GET.
status_of() {
  local url="$1" code
  code=$(curl -sS -o /dev/null -I -L --retry 2 --max-time 30 -w '%{http_code}' "$url" 2>/dev/null)
  if [ "$code" != "200" ]; then
    code=$(curl -sS -o /dev/null -L --retry 2 --max-time 30 -r 0-0 -w '%{http_code}' "$url" 2>/dev/null)
    # A range request answers 206 when the object exists.
    [ "$code" = "206" ] && code=200
  fi
  echo "${code:-000}"
}

main() {
  local refs
  if [ "${1:-}" = "--all" ]; then
    shift
    [ "$#" -gt 0 ] || { echo "Usage: $0 --all FILE..." >&2; exit 2; }
    refs=$(collect_from_files "$@")
  else
    local base="${GITHUB_BASE_SHA:-master}"
    refs=$(collect_from_diff "$base")
  fi

  if [ -z "$refs" ]; then
    echo "No media URLs to check."
    exit 0
  fi

  # Check each unique URL once.
  declare -A status
  local url
  while read -r url; do
    status["$url"]=$(status_of "$url")
  done < <(cut -f3 <<<"$refs" | sort -u)

  local failed=0 checked=0 file line
  while IFS=$'\t' read -r file line url; do
    checked=$((checked + 1))
    if [ "${status[$url]}" != "200" ]; then
      failed=$((failed + 1))
      echo "❌ ${file}:${line} — HTTP ${status[$url]} — ${url}"
      # GitHub annotation on the changed line.
      [ -n "${GITHUB_ACTIONS:-}" ] && echo "::error file=${file},line=${line}::Media URL returns HTTP ${status[$url]}: ${url}"
    fi
  done <<<"$refs"

  echo ""
  echo "Checked ${checked} media URL reference(s), ${#status[@]} unique."
  if [ "$failed" -gt 0 ]; then
    echo "${failed} reference(s) do not return HTTP 200. S3 answers 403 for a missing object: check the bucket path and file name."
    exit 1
  fi
  echo "✅ All media URLs return HTTP 200."
}

main "$@"
