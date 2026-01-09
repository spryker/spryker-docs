#!/bin/sh

# $1 last version

if [ "$1" == "" ]; then
    echo "Usage: $0 <last version>"
    exit 1
fi

find docs/ -d -name "$1"  -print0 |
    while IFS= read -r -d '' path; do
        for directory in $path/../*; do
            directory=$(realpath "$directory")
            if [ -d "$directory" ]; then
                LANG=C diff -rwBs "$path" "$directory" | egrep '^Files .+ and .+ are identical$' | awk -F '(Files | and | are identical)' '{print $3}' | while IFS= read -r diff_to_delete; do
                    # delete only if there are not includes of other files.
                    if ! grep -q "{% include.*{{page.version}}.*%}" "$diff_to_delete" ; then
                        rm -v $diff_to_delete
                    fi
                done
            fi
        done
    done


exit

tmpfile=$(mktemp /tmp/abc-script.XXXXXX)

echo "Collect all {% include ... %} tags"

grep -RiH "{% include.*{{page.version}}.*%}" docs/ |
    while IFS= read -r match; do
        file=$(echo $match | cut -d ':' -f 1)
        include=$(echo $match | cut -d ':' -f 2)

        version=$(echo "$file" | grep -ohE "20[0-9]{4}\.[0-9]")
        include_file=$(echo "$include" | sed -E "s/\{% include ([^%]+) %\}.*/\\1/" | sed "s/{{page.version}}/$version/")

        echo $include_file >> "$tmpfile"
    done

echo "Scan _includes for files not referenced in {% include ... %} tags"

find _includes -type file -path "*/20????.?/*"  -print0 |
    while IFS= read -r -d '' path; do
        path=$(echo $path | cut -c 11-)
        if echo $path | grep -vqf "$tmpfile"; then
            rm -v "_includes/$path"
        fi
    done


rm "$tmpfile"
