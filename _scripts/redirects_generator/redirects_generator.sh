#!/bin/bash

# Specify the folder containing the files
folder_path="/Users/andrii.tserkovnyi/Documents/GitHub/spryker-docs/docs/scos/dev/guidelines"

# Check if the folder exists
if [ ! -d "$folder_path" ]; then
    echo "Folder does not exist: $folder_path"
    exit 1
fi

# Loop through each file in the folder
for file in "$folder_path"/*; do
    if [ -f "$file" ]; then
        # Get the file name without extension
        filename=$(basename "$file")
        filename_without_extension="${filename%.*}"
        
        # Get the file path
        file_path="$folder_path/$filename"
        
        # Create a new file with the file path added to the content
        new_file_path="$folder_path/${filename_without_extension}_with_path.txt"
        echo "$file_path" > "$new_file_path"
        
        # Append the content of the original file to the new file
        cat "$file" >> "$new_file_path"
        
        echo "File path added to: $file"
    fi
done

echo "Script completed."