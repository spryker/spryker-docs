#!/bin/bash

set -e

BASE_SHA="${GITHUB_BASE_SHA:-HEAD^}"
HEAD_SHA="${GITHUB_SHA:-HEAD}"
lines_changed_limit="${1:-1}"
lines_changed_day_limit="${2:-30}"
files_needing_update=0

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

  front_matter=$(awk 'BEGIN{found=0} /^---$/{found++; if(found==2) exit; next} found==1{print}' "$file")

  if ! echo "$front_matter" | grep -q "^last_updated:"; then
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

  lines_changed=$(git diff "$BASE_SHA"..."$HEAD_SHA" -- "$file" | sed '1,/@@/d' | grep -v "^-\s*$" | grep -v "^\s*$" | wc -l)

  if [ "$lines_changed" -gt "$lines_changed_limit" ]; then
    echo "Modified file $file has $lines_changed changed lines, old and not updated last_updated: $date_string."
    files_needing_update=1
  fi
done

if [ "$files_needing_update" -gt 0 ]; then
  exit 1
fi

echo "All changed files' last_updated seem to be fine."
