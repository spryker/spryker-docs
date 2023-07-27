#!/bin/bash

# Define doc folder paths
FOLDERS=("docs/acp/user" "docs/cloud/dev" "docs/marketplace/dev" "docs/marketplace/user" "docs/pbc/all" "docs/scos/dev" "docs/scos/user" "docs/scu/dev" "docs/sdk/dev")

# Define sidebar file paths
SIDEBARS=("_data/sidebars/acp_user_sidebar.yml" "_data/sidebars/cloud_dev_sidebar.yml" "_data/sidebars/marketplace_dev_sidebar.yml" "_data/sidebars/marketplace_user_sidebar.yml" "_data/sidebars/pbc_all_sidebar.yml" "_data/sidebars/scos_dev_sidebar.yml" "_data/sidebars/scos_user_sidebar.yml" "_data/sidebars/scu_dev_sidebar.yml" "_data/sidebars/sdk_dev_sidebar.yml")

# Define sidebar titles
TITLES=("ACP User" "Cloud Dev" "Marketplace Dev" "Marketplace User" "PBC All" "SCOS Dev" "SCOS User" "SCU Dev" "SDK Dev")

# Define the folders to ignore
IGNORED_FOLDERS=("201811.0" "201903.0" "201907.0" "202001.0" "202005.0" "202009.0" "202108.0", "202307.0", "202400.0")

# Define output file path
OUTPUT_FILE="_scripts/sidebar_checker/missing-documents.yml"

# Remove existing output file if exists
rm -f "$OUTPUT_FILE"

# Check for missing files in each sidebar
for i in "${!SIDEBARS[@]}"; do
  sidebar="${SIDEBARS[$i]}"
  folder="${FOLDERS[$i]}"
  sidebar_title="${TITLES[$i]}"

  # Find missing files in folder; overview-of-features.md files are intenionally exluded from the sidebar; index.md files are skipped as these are used implicitly.
  missing_files=($(find "$folder" -type f -name "*.md" \
  -not -path "*/overview-of-features/202204.0/overview-of-features.md" \
    -not -path "*/overview-of-features/202212.0/overview-of-features.md" \
    -not -name "index.md" -not -path "*/\.*" -not -path "*/drafts-dev/*" -print0 | \
    while IFS= read -r -d '' file_path; do
    ignored=false
    for dir in $(dirname "$file_path" | tr '/' ' '); do
      if [[ "${IGNORED_FOLDERS[*]}" =~ "$dir" ]]; then
        ignored=true
        break
      fi
    done
    if $ignored; then
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
