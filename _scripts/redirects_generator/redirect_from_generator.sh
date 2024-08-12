#!/bin/bash

# Function to process Markdown files in a folder and its subfolders recursively
process_markdown_files() {
    local folder="$1"

    for file in "$folder"/*; do
        if [ -f "$file" ] && [[ "$file" == *.md ]]; then
            # Check if "redirect_from:" exists in the file
            if ! grep -q "redirect_from:" "$file"; then
                # Add "redirect_from:" after "template:" if it's missing
                awk '/template:/ && !p {print $0 RS "redirect_from:"; p=1; next} 1' "$file" > temp && mv temp "$file"

                echo "redirect_from added to: $file"
            fi
        elif [ -d "$file" ]; then
            # If it's a directory, recursively process its contents
            process_markdown_files "$file"
        fi
    done
}

# Specify the folder to add `redirect_from` to
folder_path="docs/scos/user"

# Check if the folder exists
if [ ! -d "$folder_path" ]; then
    echo "Folder does not exist: $folder_path"
    exit 1
fi

# Call the function to process Markdown files and subfolders
process_markdown_files "$folder_path"

echo "Script completed."
