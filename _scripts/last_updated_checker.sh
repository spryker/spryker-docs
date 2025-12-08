#!/bin/bash

echo "set -e"
set -e

BASE_SHA="${GITHUB_BASE_SHA:-$(git merge-base origin/master HEAD)}"
HEAD_SHA="${GITHUB_SHA:-HEAD}"

echo "files_needing_update=0"
files_needing_update=0

echo "changed_md_files=\$(git diff --name-only \"\BASE_SHA\"...\"\$HEAD_SHA\" -- | grep '\\.md\$' || true)"
changed_md_files=$(git diff --name-only "BASE_SHA"..."$HEAD_SHA" -- | grep '\.md$' || true)

echo "if [ -z \"\$changed_md_files\" ]; then"
if [ -z "$changed_md_files" ]; then
  echo "  exit 0"
  exit 0
fi

echo "for file in \$changed_md_files; do"
for file in $changed_md_files; do
  echo "  if [ ! -f \"\$file\" ]; then"
  if [ ! -f "$file" ]; then
    echo "    continue"
    continue
  fi

  echo "  if ! grep -q \"^last_updated:\" \"\$file\"; then"
  if ! grep -q "^last_updated:" "$file"; then
    echo "    continue"
    continue
  fi

  echo "  if git diff \"\$BASE_SHA\"...\"\$HEAD_SHA\" -- \"\$file\" | grep -q \"^[-+]last_updated:\"; then"
  if git diff "$BASE_SHA"..."$HEAD_SHA" -- "$file" | grep -q "^[-+]last_updated:"; then
    echo "    continue"
    continue
  fi

  echo "  lines_changed=\$(git diff \"\$BASE_SHA\"...\"\$HEAD_SHA\" -- \"\$file\" | grep \"^-.*\" | grep -v \"^---\" | grep -v \"^-\$\" | wc -l)"
  lines_changed=$(git diff "$BASE_SHA"..."$HEAD_SHA" -- "$file" | grep "^-.*" | grep -v "^---" | grep -v "^-$" | wc -l)

  echo "  if [ \"\$lines_changed\" -gt 5 ]; then"
  if [ "$lines_changed" -gt 5 ]; then
    echo "    echo \"Please consider updating last_updated of the \$file\""
    echo "Please consider updating last_updated of the $file"
    echo "    files_needing_update=1"
    files_needing_update=1
  fi
done

echo ""
echo "if [ \"\$files_needing_update\" -gt 0 ]; then"
if [ "$files_needing_update" -gt 0 ]; then
  echo "  exit 1"
  exit 1
fi

echo "echo \"All changed files are up to date!\""
echo "All changed files are up to date!"
