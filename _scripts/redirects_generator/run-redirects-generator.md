This document explains how redirects generator works and how to run it.

## Redirects generator 2

The redirects generator 2 is used during version upgrades. When docs are moved from an older version to a newer one, this script adds the old versioned paths as `redirect_from` entries in the new version's front matter.

Unlike the original redirects generator, this script does not require editing variables inside the file. It accepts the target version and a list of old paths as inputs.

For each incoming path, the script:
1. Strips the `.html` extension and prepends `./` to form a relative `.md` path.
2. Extracts the version string (for example, `202307.0`) from the path.
3. Replaces that version with the `last_version` argument to locate the corresponding file in the newer version.
4. If the file exists, appends the old path under `redirect_from:` in its front matter. If `redirect_from:` is missing, it is added after the `template:` line.

### Run the redirects generator 2

1. Prepare a file with the paths that need redirects, one per line. Paths should be relative URL paths like `/docs/pbc/all/example/202307.0/page.html`. You can generate this list from broken-link check output:

```shell
cat needed_redirects.txt | grep ' -> ' | cut -d '>' -f 2 > paths.txt
```

2. Run the script, passing the target version as the first argument and the paths file as the second:

```shell
bash _scripts/redirects_generator/redirects_generator.2.sh {LAST_VERSION} paths.txt
```

  Replace `{LAST_VERSION}` with the version you are upgrading to, for example `202404.0`.

  Alternatively, pipe paths directly from stdin:

```shell
cat paths.txt | bash _scripts/redirects_generator/redirects_generator.2.sh {LAST_VERSION}
```

3. The script prints the path of each file it updates:

```
redirect_from added to: ./docs/pbc/all/example/202404.0/page.md
```

  Files that already have a `redirect_from:` section are updated silently—the new entry is appended without a message.

4. Review the updated front matter in the modified files to confirm the entries look correct before committing.

### Notes

- The script only updates a file if the corresponding `.md` file already exists in the new version. Paths with no matching file are silently skipped.
- The script does not move or rename files. The new-version files must already be in place before running it.
- If a path contains no recognizable version string (pattern `20XXXXXX.X`), the substitution will not produce a valid path and the file will be skipped.
