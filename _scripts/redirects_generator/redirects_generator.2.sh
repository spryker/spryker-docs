#!/bin/bash

# $1 last version

if [ "$1" == "" ]; then
    echo "Usage: $0 <last version>"
    echo "Reads incoming paths from stdin"
    echo "Example:"
    echo "bundle exec rake check_pbc | grep  ' -> ' | cut -d '>' -f 2 | $0 <last version>"
    exit 1
fi
last_version="$1"


process_markdown_file() {
    local md_file="$1"
    local redirect_url="$2"
    if [[ "$md_file" == *.md ]]; then
        # Check if "redirect_from:" exists in the file
        if ! grep -q "redirect_from:" "$md_file"; then
            # Add "redirect_from:" after "template:" if it's missing
            awk '/template:/ && !p {print $0 RS "redirect_from:"; p=1; next} 1' "$md_file" > temp && mv temp "$md_file"
            echo "redirect_from added to: $md_file"
        fi

        # Add redirect to the file.
        awk '{print} $0=="redirect_from:"{print "  -'"$redirect_url"' "}' "$md_file" > temp && mv temp "$md_file"
    fi


}

while IFS= read relative_path; do
    redirect_url="$relative_path"
    relative_path="${relative_path%.html}.md"

    relative_path=$(echo $relative_path | xargs echo -n)

    relative_path=".${relative_path}"

    version=$(echo "$relative_path" | grep -ohE "20[0-9]{4}\.[0-9]")

    new_path=$(echo "$relative_path" | sed "s/$version/$last_version/")

    if [ -f $new_path ]; then
        process_markdown_file "$new_path" "$redirect_url"
    fi
done < "${2:-/dev/stdin}"
