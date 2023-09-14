#!/bin/bash

# Specify the folder containing the Markdown files
folder_path="/Users/andrii.tserkovnyi/Documents/GitHub/spryker-docs/docs/scos/dev/guidelines"

# Check if the folder exists
if [ ! -d "$folder_path" ]; then
    echo "Folder does not exist: $folder_path"
    exit 1
fi

# Function to process Markdown files
process_markdown_files() {
    local folder="$1"
    local root_directory="$2"

    for file in "$folder"/*; do
        if [ -f "$file" ] && [[ "$file" == *.md ]]; then
            # Get the content of the Markdown file
            file_content=$(cat "$file")
            
            # Check if "redirect_from:" exists in the file
            if [[ "$file_content" =~ redirect_from: ]]; then
                # Add the file path after "redirect_from:"
                updated_content=$(echo "$file_content" | sed -E "s/(redirect_from:.*)/\1\n  - $file_path/")

                # Update the file with the modified content
                echo "$updated_content" > "$file"

                echo "File path added to: $file"
            else
                # Add "redirect_from:" before the second occurrence of "---"
                updated_content=$(echo "$file_content" | sed -E "0,/---/s/---/\0\nredirect_from:/")
                
                # Add the file path after "redirect_from:"
                updated_content=$(echo "$updated_content" | sed -E "/redirect_from:/s/$/\n  - $file_path/")

                # Update the file with the modified content
                echo "$updated_content" > "$file"

                echo "redirect_from: and file path added to: $file"
            fi
        elif [ -d "$file" ]; then
            # If it's a directory, recursively process its contents
            process_markdown_files "$file" "$root_directory"
        fi
    done
}

# Call the function to process Markdown files and subfolders
process_markdown_files "$folder_path" "$folder_path"

echo "Script completed."
