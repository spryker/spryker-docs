#!/bin/bash

# define function to check if a folder has .md files or subfolders with .md files
check_folder() {
  local folder="$1"
  local found=0
  local skip=0
  local md_file_pattern="*.md"
  
  # skip over excluded folders
  if [[ "$folder" == *"201811.0"* || "$folder" == *"201903.0"* || "$folder" == *"201907.0"* || "$folder" == *"202001.0"* || "$folder" == *"202005.0"* || "$folder" == *"202009.0"* || "$folder" == *"202108.0"* || "$folder" == *".[0-9][0-9][0-9][0-9][0-9][0-9].0" ]]; then
    skip=1
  fi
  
  if [[ "$skip" == 0 ]]; then
    for file in "$folder"/*; do
      if [[ -d "$file" ]]; then
        # recursively check subfolders
        check_folder "$file"
        if [[ "$found" == 1 ]]; then
          break
        fi
      elif [[ "$file" == $md_file_pattern ]]; then
        # folder has at least one .md file
        found=1
        break
      fi
    done
  fi
  
  if [[ "$found" == 1 ]]; then
    # check if folder needs to be skipped based on special rule
    if [[ "$folder" =~ .*/[0-9]{6}\.0$ ]]; then
      parent_folder=$(basename "$(dirname "$folder")")
      if [[ ! -f "$folder/$parent_folder.md" ]]; then
        # folder does not have parent folder .md file
        echo "$folder" >> /tmp/landing_page_folders.txt
      fi
    else
      echo "$folder" >> /tmp/landing_page_folders.txt
    fi
  fi
}

# start checking from the docs folder
check_folder docs/

# save the paths to a temporary file
cat /tmp/landing_page_folders.txt | sort > /tmp/landing_page_folders_sorted.txt

# generate the .md file using the sorted paths
while read -r folder; do
  echo "## $folder" >> _scripts/landing_page_checker/landing_page_checker.md
  echo "" >> _scripts/landing_page_checker/landing_page_checker.md
  echo "These pages were found in this folder:" >> _scripts/landing_page_checker/landing_page_checker.md
  echo "" >> _scripts/landing_page_checker/landing_page_checker.md
  for file in "$folder"/*; do
    if [[ "$file" == *.md ]]; then
      filename=$(basename "$file")
      echo "- [$filename]($file)" >> _scripts/landing_page_checker/landing_page_checker.md
    fi
  done
  echo "" >> _scripts/landing_page_checker/landing_page_checker.md
done < /tmp/landing_page_folders_sorted.txt

# remove temporary files
rm /tmp/landing_page_folders.txt
rm /tmp/landing_page_folders_sorted.txt
