This document explains how Sidebar Checker works and how to run it.

*Sidebar Checker* is a script that checks sidebars for missing documents in the docs folder and generates a YAML file with the missing files.

## Overview of Sidebar Checker

The script does the following: 

1. Defines the directories to check, the sidebars to update, and the sidebar titles.
2. Defines a list of folders to ignore.
3. Removes the output file if it exists.
4. For each sidebar, the script looks for missing files in the corresponding directory.
5. If missing files are found, the script prints a message indicating which files are missing and writes the missing files to a YAML file.

## Run the script

1. In VS Code, open Terminal.
2. Run the script:
```bash
bash _scripts/sidebar-checker/sidebar_checker.sh
```

This prints a message in the terminal indicating which files are missing and generates the `missing-documents.yml` file with missing documents. The file is saved in the `_scripts/sidebar_checker` folder.

**Note:** If you don't need the `missing-documents.yml` file, remove it in order to not push it to GitHub.