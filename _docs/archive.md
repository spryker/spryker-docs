1. Create a branch from master at the day after release. Examples below assume that the previous release version is **202512.0**. Adjust all commands accordingly, when applying.

2. `find ./{docs,_includes} -type d -name 'latest' -execdir mv {} 202512.0 \;`

3. Search for `/latest/` in all files `./docs/**/202512.0/**` and replace with `/{{page.version}}/`

4. Search for
- `(link: .*)/202512.0/(.*)` and replace with `$1/page.version/$2`
- `(link: .*)/\{\{page.version\}\}/(.*)` and replace with `$1/page.version/$2`

**These are regex!** Ensure to use regex search and substitution.

5. Merge archive into branch.

Resolve conflicts:

```shell
VERSION="202602.0"

git diff --name-only --diff-filter=U --relative |
    while IFS= read -r conflicted_file; do
        if echo "$conflicted_file" | grep -q "/latest/" || echo "$conflicted_file" | grep -q "/$VERSION/" ; then
            [ -f "$conflicted_file" ] && git checkout --ours "$conflicted_file" && git add "$conflicted_file"
            [ ! -f "$conflicted_file" ] && git rm "$conflicted_file"
        else
            echo "$conflicted_file"
            if echo "$conflicted_file" | grep -q "docs/" || echo "$conflicted_file" | grep -q "_includes/" ; then
                git checkout --theirs "$conflicted_file" && git add "$conflicted_file"
            fi
        fi
    done
```

6. Run `./_scripts/deduplicate_mds.sh 202512.0` a few times until no changes are made.

7. Try to build and recover cleaned up files if they are referenced somewhere.

8. Fix CI by adding redirects or removing the pages from the sidebar.

- `bundle exec rake check_pbc > needed_redirects.txt`
- `cat needed_redirects.txt | grep  ' -> ' | cut -d '>' -f 2 | _scripts/redirects_generator/redirects_generator.2.sh 202512.0`

9. Update `netlify.toml` with redirects.
