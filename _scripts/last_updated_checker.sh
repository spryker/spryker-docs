#!/bin/bash

set -e

BASE_SHA="${GITHUB_BASE_SHA:-HEAD^}"
# Prefer the real PR head over GITHUB_SHA: on pull_request events GITHUB_SHA is the
# merge commit (PR merged into the current base), so a "$BASE_SHA"..."$HEAD_SHA" diff
# sweeps in unrelated base-branch changes and blames this PR for them. The PR head SHA
# scopes the diff to what this PR actually changed.
HEAD_SHA="${GITHUB_HEAD_SHA:-${GITHUB_SHA:-HEAD}}"
lines_changed_limit="${1:-1}"
lines_changed_day_limit="${2:-30}"
files_needing_update=0

# When set, append each file with an auto-fixable last_updated problem here so a
# follow-up CI step can rewrite the date. Both stale dates and malformed dates are
# recorded: bumping the field to today's (canonical) date fixes either one. Missing-field
# cases are intentionally NOT recorded: there is no field to rewrite, so they stay a hard
# failure that the author must resolve by adding the field.
STALE_LIST_FILE="${STALE_LIST_FILE:-}"
record_stale() {
  if [ -n "$STALE_LIST_FILE" ]; then
    echo "$1" >> "$STALE_LIST_FILE"
  fi
}

# Canonical last_updated format is "Mon D, YYYY" (e.g. "Jul 30, 2025"): a three-letter
# English month abbreviation, day (1-2 digits, leading zero allowed), comma, 4-digit year.
# The value must ALSO be a real calendar date, so "Feb 30, 2024" is rejected even though it
# matches the shape. `date -d` alone is too lenient ("Sept 23, 2023", "Nov. 27, 2024" and
# "Jan 14 2024" all parse), so the regex gate does the format work and `date -d` only
# validates the calendar.
is_canonical_date() {
  local value="$1"
  if ! [[ "$value" =~ ^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\ [0-9]{1,2},\ [0-9]{4}$ ]]; then
    return 1
  fi
  LC_ALL=C date -d "$value" >/dev/null 2>&1
}

echo "Lookging for files with at least $lines_changed_limit line(s) changed and last_updated older than $lines_changed_day_limit days "
echo ""

changed_md_files=$(git diff --name-only "$BASE_SHA"..."$HEAD_SHA" -- | grep '\.md$' || true)

if [ -z "$changed_md_files" ]; then
  echo "No changed files were found. Maybe a wrong hash was used?"
  exit 0
fi

current_seconds=$(date +%s)

for file in $changed_md_files; do
  if [ ! -f "$file" ]; then
    continue
  fi

  # Files without a front-matter block (not "---" on line 1) are not documentation pages
  # that carry last_updated (includes, snippets, data files, …); skip them silently.
  if [ "$(head -1 "$file")" != "---" ]; then
    continue
  fi

  front_matter=$(awk 'BEGIN{found=0} /^---$/{found++; if(found==2) exit; next} found==1{print}' "$file")

  # A front-matter page must carry exactly one last_updated field.
  last_updated_count=$(echo "$front_matter" | grep -c "^last_updated:" || true)

  if [ "$last_updated_count" -eq 0 ]; then
    echo "File $file has front matter but no last_updated field, please add it."
    files_needing_update=1
    continue
  fi

  if [ "$last_updated_count" -gt 1 ]; then
    echo "File $file has $last_updated_count last_updated fields, keep exactly one."
    files_needing_update=1
    record_stale "$file"
    continue
  fi

  current_date_string=$(echo "$front_matter" | grep "^last_updated:" | head -1 | sed 's/^last_updated:[[:space:]]*//')

  # Correctness gate: the value must be written in the canonical format and be a real date.
  # A malformed date can't be reasoned about for staleness, so flag it as auto-fixable and
  # move on instead of letting `date -d` fail (and, under `set -e`, abort the whole run).
  if ! is_canonical_date "$current_date_string"; then
    echo "File $file has a malformed last_updated: '$current_date_string' (expected e.g. 'Jul 30, 2025')."
    files_needing_update=1
    record_stale "$file"
    continue
  fi

  if git diff "$BASE_SHA"..."$HEAD_SHA" -- "$file" | grep -q "^\+last_updated:"; then
    date_string=$( git diff "$BASE_SHA"..."$HEAD_SHA" -- "$file" | grep "^\+last_updated:" | head -1 | sed 's/\+last_updated: //')
    date_seconds=$(date -d "$date_string" +%s)

    if [ $((current_seconds - date_seconds)) -lt $((lines_changed_day_limit * 86400)) ]; then
      continue
    fi
    echo "Modified file $file contains too old modified last_updated: $date_string."
    files_needing_update=1
    record_stale "$file"
    continue
  else
    date_string="$current_date_string"
    date_seconds=$(date -d "$date_string" +%s)

    if [ $((current_seconds - date_seconds)) -lt $((lines_changed_day_limit * 86400)) ]; then
      continue
    fi
  fi

  lines_changed=$(git diff "$BASE_SHA"..."$HEAD_SHA" -- "$file" | sed '1,/@@/d' | grep -v "^-\s*$" | grep "^\+" | wc -l)

  if [ "$lines_changed" -ge "$lines_changed_limit" ]; then
    echo "Modified file $file has $lines_changed changed lines, old and not updated last_updated: $date_string."
    files_needing_update=1
    record_stale "$file"
  fi
done

if [ "$files_needing_update" -gt 0 ]; then
  exit 1
fi

echo "All changed files' last_updated seem to be fine."