#!/bin/bash

# Function to process files in a folder and its subfolders recursively
process_files() {
    local folder="$1"
    local root_directory="$2"

    for file in "$folder"/*; do
        if [ -f "$file" ]; then
            # Get the absolute file path
            file_path=$(realpath "$file")

            # Get the relative file path
            relative_path=${file_path#$root_directory}

            # Add '  - ' at the start of the relative file path
            relative_path="  - $relative_path"

            # Replace ".md" with ".html" in the relative file path
            relative_path="${relative_path%.md}.html"

            # Get the content of the original file
            original_content=$(cat "$file")

            # Prepend the modified relative file path to the content
            updated_content="$relative_path"$'\n'"$original_content"

            # Overwrite the original file with the updated content
            echo "$updated_content" > "$file"

            echo "Modified file path added to: $file"
        elif [ -d "$file" ]; then
            # If it's a directory, recursively process its contents
            process_files "$file" "$root_directory"
        fi
    done
}

# Specify the folder containing the files to add paths to
folder_path="docs/pbc/all/data-exchange/202410.0/spryker-middleware-powered-by-alumio"

# Check if the folder exists
if [ ! -d "$folder_path" ]; then
    echo "Folder does not exist: $folder_path"
    exit 1
fi

# Specify the root directory to make paths relative to. Must end with `spryker-docs`
root_directory="/Users/oscarwilde/Documents/GitHub/spryker-docs"

# Call the function to process files and subfolders
process_files "$folder_path" "$root_directory"

echo "Script completed."
