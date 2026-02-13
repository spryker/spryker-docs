#!/bin/bash

# Define doc folder paths
FOLDERS=("docs/about/all" "docs/ca/dev" "docs/ca/devscu" "docs/dg/dev" "docs/pbc/all")

# Define sidebar file paths
SIDEBARS=("_data/sidebars/about_all_sidebar.yml" "_data/sidebars/ca_dev_sidebar.yml" "_data/sidebars/ca_devscu_sidebar.yml" "_data/sidebars/dg_dev_sidebar.yml" "_data/sidebars/pbc_all_sidebar.yml")

# Define sidebar titles
TITLES=("About All" "CA Dev" "CA Devscu" "DG Dev" "PBC All")

# Define output file path
OUTPUT_FILE="_scripts/sidebar_checker/missing-documents.yml"

# Read the exclusion list into a simple array (bash 3.2 compatible)
mapfile -t EXCLUSIONS < _scripts/sidebar_checker/excludelist.yml 2>/dev/null || {
    # Fallback for bash < 4 (mapfile not available)
    EXCLUSIONS=()
    while IFS= read -r line; do
        [[ -n "$line" ]] && EXCLUSIONS+=("$line")
    done < _scripts/sidebar_checker/excludelist.yml
}

# Remove existing output file if exists
rm -f "$OUTPUT_FILE"

# Check for missing files in each sidebar
for i in "${!SIDEBARS[@]}"; do
  sidebar="${SIDEBARS[$i]}"
  folder="${FOLDERS[$i]}"
  sidebar_title="${TITLES[$i]}"

  # Extract all URLs from sidebar once and store in an array (MAJOR performance boost)
  # This avoids grepping the sidebar content for every single file
  sidebar_urls=$(grep -o '^\s*url:\s.*' "$sidebar" | awk '{print $2}')

  # Array to hold missing files
  missing_files=()

  # Find all markdown files and process them
  while IFS= read -r -d '' file_path; do
      # Get basename once
      file_basename=$(basename "$file_path")

      # Check exclusions
      excluded=false
      for exclusion in "${EXCLUSIONS[@]}"; do
          if [[ "$file_basename" == "$exclusion" ]] || [[ "$file_path" =~ $exclusion ]]; then
              excluded=true
              break
          fi
      done

      if $excluded; then
          continue
      fi

      # Extract filename without extension
      file_name_no_ext="${file_basename%.md}"

      # Check if file is in sidebar URLs (grep -F for fixed string is faster)
      if ! echo "$sidebar_urls" | grep -Fq "$file_name_no_ext"; then
          missing_files+=("$file_path")
      fi
  done < <(find "$folder" -type f -name "*.md" -print0)

  # Print missing files if any
  if [[ ${#missing_files[@]} -gt 0 ]]; then
    echo ""
    echo "========================================"
    echo "Missing links in: $sidebar"
    echo "========================================"
    echo "The following files are missing from $sidebar_title sidebar:"
    echo ""
    for file_path in "${missing_files[@]}"; do
      echo "  File: $file_path"
      echo "  Add to: $sidebar"
      echo ""
    done

    # Write missing files to a file
    echo "# Missing files in $sidebar_title (add to: $sidebar)" >> "$OUTPUT_FILE"
    for file_path in "${missing_files[@]}"; do
      # Use awk instead of grep+sed for better performance
      title=$(awk -F': ' '/^title:/ {print $2; exit}' "$file_path")
      url="${file_path%.md}.html"

      cat <<EOF >> "$OUTPUT_FILE"
# Source file: $file_path
- title: $title
  url: /$url
EOF
    done
    echo "" >> "$OUTPUT_FILE"
  fi
done

# Fail the script if there are any missing documents
if [ -s "$OUTPUT_FILE" ]; then
    exit 1
fi
