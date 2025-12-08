#!/bin/bash

set -e

BASE_SHA="${GITHUB_BASE_SHA:-HEAD^}"
HEAD_SHA="${GITHUB_SHA:-HEAD}"

files_needing_update=0

changed_md_files=$(git diff --name-only "$BASE_SHA"..."$HEAD_SHA" -- | grep '\.md$' || true)

if [ -z "$changed_md_files" ]; then
  exit 0
fi

for file in $changed_md_files; do
  if [ ! -f "$file" ]; then
    continue
  fi

  if ! grep -q "^last_updated:" "$file"; then
    continue
  fi

  if git diff "$BASE_SHA"..."$HEAD_SHA" -- "$file" | grep -q "^[-+]last_updated:"; then
    continue
  fi

  lines_changed=$(git diff "$BASE_SHA"..."$HEAD_SHA" -- "$file" | grep "^-.*" | grep -v "^---" | grep -v "^-$" | wc -l)

  if [ "$lines_changed" -gt 5 ]; then
    echo "Please consider updating last_updated of the $file"
    files_needing_update=1
  fi
done

if [ "$files_needing_update" -gt 0 ]; then
  exit 1
fi

echo "All changed files' last_updated seem to be up to date."
