This document explains how Sidebar Checker works and how to run it.

*Sidebar Checker* is a script that generates a YAML report of missing sidebar entries based on the documents in the `docs` folder.

## Overview of Sidebar Checker

The script does the following: 

1. Defines the directories to check, the sidebars to update, and the sidebar titles.
2. Defines a list of folders to ignore.
3. Removes the output YAML file if it exists.
4. For each sidebar, the script looks for missing files in the corresponding directory.
5. If missing files are found, the script prints a message indicating which files are missing and writes the missing files to a YAML file.

## Run the script

1. In VS Code, open Terminal.
2. Run the script:
```bash
bash _scripts/sidebar_checker/sidebar_checker.sh
```

This prints a message in the terminal indicating which files are missing and generates the `missing-documents.yml` file with missing documents. The file is saved in the `_scripts/sidebar_checker` folder.
