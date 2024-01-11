#!/bin/bash

# Define source and target paths
source_path="$PWD"
bundle_path="$source_path/vendor/bundle"

# Run Jekyll with options
docker run --rm \
    --volume="$source_path:/srv/jekyll" \
    --volume="$bundle_path:/usr/local/bundle" \
    -p 4000:4000 \
    jekyll/jekyll:4.2.0 jekyll serve \
    --incremental --livereload
