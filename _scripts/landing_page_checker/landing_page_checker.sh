#!/bin/bash

# create a directory to store the landing page checker file
mkdir -p _scripts/landing_page_checker/

# find all subdirectories of the docs/ folder
find docs -type d | while read folder; do
  # skip over excluded folders
  if [[ "$folder" == *"201811.0"* || "$folder" == *"201903.0"* || "$folder" == *"201907.0"* || "$folder" == *"202001.0"* || "$folder" == *"202005.0"* || "$folder" == *"202009.0"* || "$folder" == *"202108.0"* ]]; then
    continue
  fi

  # check if the folder contains .md files or only subfolders
  if [[ $(find "$folder" -maxdepth 1 -type f -name "*.md") || $(find "$folder" -maxdepth 1 -mindepth 1 -type d | grep -v "$(basename "$folder")") ]]; then
    # check if the folder contains an .md file with the same name or index.md
    if [[ ! -f "$folder/$(basename "$folder").md" && ! -f "$folder/index.md" ]]; then
      # check if the folder has only subfolders and no .md files
      if [[ $(find "$folder" -mindepth 2 -type f -name "*.md" | wc -l) -eq 0 ]]; then
        # exclude folders that only contain subdirectories and no .md files
        continue
      fi
      # check if the folder is of the form XXXXXX.0
      if [[ $(basename "$folder") =~ ^[0-9]{6}\.0$ ]]; then
        # check if the folder contains a file with the same name as its parent folder
        parent_dir=$(dirname "$(dirname "$folder")")
        parent_file="${parent_dir}/$(basename "${parent_dir}").md"
        if [[ -f "${parent_file}" ]]; then
          # skip the folder if it has a file with the same name as its parent folder
          continue
        fi
      fi
      # add the folder path to the landing page checker file
      echo "- $folder" >> _scripts/landing_page_checker/landing_page_checker.md
    fi
  fi
done
