#!/bin/bash

set -e

BASE_SHA="${GITHUB_BASE_SHA:-HEAD^}"
HEAD_SHA="${GITHUB_HEAD_SHA:-${GITHUB_SHA:-HEAD}}"
domain="${1:-https://docs.spryker.com/}"

echo "Looking for changed files..."
echo ""

changed_md_files=$(git diff --name-only "$BASE_SHA"..."$HEAD_SHA" -- || true)

if [ -z "$changed_md_files" ]; then
  echo "No changed files were found. Maybe a wrong hash was used?"
  exit 0
fi


for file in $changed_md_files; do
  if [ ! -f "$file" ]; then
    continue
  fi

  if [ `echo $file | grep '\.md$' | grep '^docs/'` ]; then
    echo $file | sed 's/\.md$//g' | sed 's|^|'"$domain"'|g'
  fi

done
