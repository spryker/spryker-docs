#!/bin/bash

# Define the root directory to search
ROOT_DIR="./docs"

# Define the list of folders to ignore
IGNORED_FOLDERS=("201811.0" "201903.0" "201907.0" "202001.0")

# Find all files starting with "file-details" in the root directory and its subdirectories
FILES=$(find "$ROOT_DIR" -type f -name "file-details*.md" ! -path "*${IGNORED_FOLDERS[0]}*" ! -path "*${IGNORED_FOLDERS[1]}*" ! -path "*${IGNORED_FOLDERS[2]}*" ! -path "*${IGNORED_FOLDERS[3]}*")

# Loop through each file
for FILE in $FILES; do

  # Check if the file has a "related" tag in the frontmatter
  RELATED_TAG=$(grep -E "^related:" "$FILE")

  # If the file does not have a "related" tag, add the default related link tag and its items
  if [[ -z "$RELATED_TAG" ]]; then
    # Find the last tag in the frontmatter
    LAST_TAG=$(grep -nE "^---" "$FILE" | tail -1 | cut -d: -f1)
    if [[ -n "$LAST_TAG" ]]; then
      # Add the default related link tag and its items after the last tag in the frontmatter
      END=$(expr $LAST_TAG - 1)
      head -n $END "$FILE" > temp
      echo -e "related:\n  - title: Execution order of data importers in Demo Shop\n    link: docs/scos/dev/data-import/page.version/demo-shop-data-import/execution-order-of-data-importers-in-demo-shop.html" >> temp
      tail -n +$LAST_TAG "$FILE" >> temp
      mv temp "$FILE"
    fi
  # If the file has a "related" tag, add the default related link after the last subtag of the "related" tag
  else
    # Find the last subtag of the "related" tag
    LAST_SUBTAG=$(grep -nE "^  - " "$FILE" | tail -1 | cut -d: -f1)
    if [[ -n "$LAST_SUBTAG" ]]; then
      # Add the default related link after the last subtag of the "related" tag
      END=$(grep -nE "^---" "$FILE" | tail -1 | cut -d: -f1)
      head -n $END "$FILE" > temp
      tail -n +$LAST_SUBTAG "$FILE" | sed '/^---/d' >> temp
      echo -e "  - title: Execution order of data importers in Demo Shop\n    link: docs/scos/dev/data-import/page.version/demo-shop-data-import/execution-order-of-data-importers-in-demo-shop.html" >> temp
      tail -n +$END "$FILE" >> temp
      mv temp "$FILE"
    fi
  fi

done
