#!/bin/bash

# Define the root directory to search
ROOT_DIR="./docs"

# Define directories to ignore
IGNORE_DIRS=( "201811.0" "201903.0" "201907.0" "202001.0" "202005.0" "202009.0" "202108.0" )

# Find all files starting with "file-details" in the root directory and its subdirectories, excluding the ignored directories
FILES=$(find "$ROOT_DIR" -type f -name "file-details*.md" "${IGNORE_DIRS[@]/#/-path}" -prune -o -print)

# Loop through each file
for FILE in $FILES; do

  # Check if the file has a "related" tag in the frontmatter
  RELATED_TAG=$(grep -E "^related:" "$FILE")

  # If the file does not have a "related" tag, add the default related link to the end of the frontmatter
  if [[ -z "$RELATED_TAG" ]]; then
    sed -i '/^---$/a related:\n  - title: Data export Merchant Orders CSV files format\n    link: docs/scos/dev/data-import/page.version/demo-shop-data-import/execution-order-of-data-importers-in-demo-shop.html' "$FILE"
  # If the file has a "related" tag, add the default related link after the last subtag of the "related" tag
  else
    sed -i '/^related:/,/^- title:/s/^- title:/  - title: Data export Merchant Orders CSV files format\n    link: docs\/scos\/dev\/data-import\/page.version\/demo-shop-data-import\/execution-order-of-data-importers-in-demo-shop.html\n\n  - title:/' "$FILE"
  fi

done
