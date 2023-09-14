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
        # Get the file path
        file_path="$folder_path/$file"
        
        # Remove everything before "/docs" in the file path
        file_path="${file_path#*\/docs\/}"
        
        # Get the content of the original file
        original_content=$(cat "$file")
        
        # Prepend the modified file path to the content
        updated_content="$file_path"$'\n'"$original_content"
        
        # Overwrite the original file with the updated content
        echo "$updated_content" > "$file"
        
        echo "File path added to: $file"
    fi
done

echo "Script completed."