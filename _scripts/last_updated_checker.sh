#!/bin/bash

set -e

BASE_BRANCH="${GITHUB_BASE_REF:-origin/master}"
HEAD_BRANCH="${GITHUB_HEAD_REF:-HEAD}"

files_needing_update=0

changed_md_files=$(git diff --name-only "$BASE_BRANCH"..."$HEAD_BRANCH" | grep '\.md$' || true)

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

  if git diff "$BASE_BRANCH"..."$HEAD_BRANCH" -- "$file" | grep -q "^[-+]last_updated:"; then
    continue
  fi

  lines_changed=$(git diff "$BASE_BRANCH"..."$HEAD_BRANCH" -- "$file" | grep "^-.*" | grep -v "^---" | grep -v "^-$" | wc -l)

  if [ "$lines_changed" -gt 5 ]; then
    echo "Please consider updating last_updated of the $file"
    files_needing_update=1
  fi
done

echo ""
if [ "$files_needing_update" -gt 0 ]; then
  exit 1
fi

echo "All changed files are up to date!"
