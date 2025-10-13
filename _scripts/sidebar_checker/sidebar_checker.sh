#!/bin/bash

# Define doc folder paths
FOLDERS=("docs/about/all" "docs/ca/dev" "docs/ca/devscu" "docs/dg/dev" "docs/pbc/all")

# Define sidebar file paths
SIDEBARS=("_data/sidebars/about_all_sidebar.yml" "_data/sidebars/ca_dev_sidebar.yml" "_data/sidebars/ca_devscu_sidebar.yml" "_data/sidebars/dg_dev_sidebar.yml" "_data/sidebars/pbc_all_sidebar.yml")

# Define sidebar titles
TITLES=("About All" "CA Dev" "CA Devscu" "DG Dev" "PBC All")

# Define output file path
OUTPUT_FILE="_scripts/sidebar_checker/missing-documents.yml"

# Read the exclusion list
EXCLUSIONS=($(cat _scripts/sidebar_checker/excludelist.yml))

# Remove existing output file if exists
rm -f "$OUTPUT_FILE"

# Check for missing files in each sidebar
for i in "${!SIDEBARS[@]}"; do
  sidebar="${SIDEBARS[$i]}"
  folder="${FOLDERS[$i]}"
  sidebar_title="${TITLES[$i]}"

  # Find missing files in folder
  missing_files=($(find "$folder" -type f -name "*.md" -print0 | \
      while IFS= read -r -d '' file_path; do
          excluded=false
          for exclusion in "${EXCLUSIONS[@]}"; do
              if [[ $(basename "$file_path") == "$exclusion" ]] || [[ "$file_path" =~ "$exclusion" ]]; then
                  excluded=true
                  break
              fi
          done
          if $excluded; then
              continue
          fi
          if ! grep -q "^\s*url:\s.*$(basename "${file_path%.*}")" "$sidebar"; then
              echo "$file_path"
          fi
      done))

  # Print missing files if any
  if [[ ${#missing_files[@]} -gt 0 ]]; then
    echo "The following files are missing from $sidebar_title:"
    printf -- '- %s\n' "${missing_files[@]}"

    # Write missing files to a file
    echo "# Missing files in $sidebar_title" >> "$OUTPUT_FILE"
    for file_path in "${missing_files[@]}"; do
      title=$(grep "^title:" "$file_path" | sed 's/^title: //')
      url="${file_path}"
      url="${url%.md}.html"

      cat <<EOF >> "$OUTPUT_FILE"
- title: $title
  url: /$url
EOF
    done
  fi
done

# Fail the script if there are any missing documents
if [ -s "$OUTPUT_FILE" ]; then
    exit 1
fi
