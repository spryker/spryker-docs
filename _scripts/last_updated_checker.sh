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

# When set, append each file with an auto-fixable stale last_updated date here so a
# follow-up CI step can bump it. Missing-field cases are intentionally not recorded:
# they can't be fixed by bumping a date and must stay a hard failure.
STALE_LIST_FILE="${STALE_LIST_FILE:-}"
record_stale() {
  if [ -n "$STALE_LIST_FILE" ]; then
    echo "$1" >> "$STALE_LIST_FILE"
  fi
}

echo "Lookging for files with at least $lines_changed_limit line(s) changed and last_updated older than $lines_changed_day_limit days "
echo ""

changed_md_files=$(git diff --name-only "$BASE_SHA"..."$HEAD_SHA" -- | grep '\.md$' || true)

if [ -z "$changed_md_files" ]; then
  echo "No changed files were found. Maybe a wrong hash was used?"
  exit 0
fi

current_seconds=$(date +%s)

# Map of renamed files in this diff range: "<new-path>\t<old-path>" per line. Without
# rename detection (-M) a rename looks like a brand-new file, so its whole content is
# counted as added and falsely trips the stale last_updated check. We keep the old path
# so diffs can be taken rename-aware: a pure rename yields 0 changed lines (passes),
# while a rename that also edits content still counts the genuine changed lines.
rename_map=$(git diff --name-status -M "$BASE_SHA"..."$HEAD_SHA" -- | awk -F'\t' '$1 ~ /^R/ {print $3"\t"$2}')

# Diff a file over the range, rename-aware: if the file is a rename target, include its
# old path and -M so git emits the true (small) hunk instead of a whole-file addition.
file_diff() {
  local f="$1" old
  old=$(printf '%s\n' "$rename_map" | awk -F'\t' -v f="$f" '$1==f{print $2}')
  if [ -n "$old" ]; then
    git diff -M "$BASE_SHA"..."$HEAD_SHA" -- "$old" "$f"
  else
    git diff "$BASE_SHA"..."$HEAD_SHA" -- "$f"
  fi
}

for file in $changed_md_files; do
  if [ ! -f "$file" ]; then
    continue
  fi

  front_matter=$(awk 'BEGIN{found=0} /^---$/{found++; if(found==2) exit; next} found==1{print}' "$file")

  if ! echo "$front_matter" | grep -q "^last_updated:"; then
    continue
  fi

  if file_diff "$file" | grep -q "^\+last_updated:"; then
    date_string=$( file_diff "$file" | grep "^\+last_updated:" | head -1 | sed 's/\+last_updated: //')
    date_seconds=$(date -d "$date_string" +%s)

    if [ $((current_seconds - date_seconds)) -lt $((lines_changed_day_limit * 86400)) ]; then
      continue
    fi
    echo "Modified file $file contains too old modified last_updated: $date_string."
    files_needing_update=1
    record_stale "$file"
    continue
  else
    if echo "$front_matter" | grep -q "^last_updated:"; then
      date_string=$( echo "$front_matter" | grep "^last_updated:" | sed 's/last_updated: //')
      date_seconds=$(date -d "$date_string" +%s)

      if [ $((current_seconds - date_seconds)) -lt $((lines_changed_day_limit * 86400)) ]; then
        continue
      fi
    else
      echo "File $file contains no last_updated, please add it."
      files_needing_update=1
      continue
    fi
  fi

  # Body-only change count: added lines inside the front-matter block (up to and
  # including the second "---") must not count, so front-matter-only edits (tags,
  # title, etc.) don't force a last_updated bump. Track new-file line numbers from
  # each hunk header and count only added lines past the front matter.
  fm_end=$(awk '/^---$/{c++; if(c==2){print NR; exit}}' "$file")
  fm_end=${fm_end:-0}
  lines_changed=$(file_diff "$file" | awk -v fm="$fm_end" '
    /^@@/ { match($0, /\+[0-9]+/); ln = substr($0, RSTART+1, RLENGTH-1) + 0; next }
    /^\+\+\+/ { next }
    /^\+/ { if (ln > fm) count++; ln++; next }
    /^-/  { next }
    { ln++ }
    END { print count+0 }
  ')

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
