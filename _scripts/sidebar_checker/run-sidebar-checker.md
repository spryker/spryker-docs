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


## Add folders and documents to the excludelist

If you need to exclude some documents or folders from the sidebar, you can add them to the `excludelist.yml` file.
 
To add a folder or document to the excludelist, in `_scripts/sidebar_checker/excludelist.yml`, list files and folders in respective sections.

The order of adding does not matter; however, for the sake of consistency, *add folders and files under respective sections*:

* For folders, use the `# Folders to exclude:` section.
* For documents, use `# Documents to exclude:`.

### Exclude a folder 

Under `# Folders to exclude:`, add the name of the folder you want to exclude from Sidebar Checker.

For example, to exclude the `features` folder, add it at the end of the `# Folders to exclude:` section, under that last added folder, like this:

```yml
# Folders to exclude:
...
features
```

### Exclude a document 

Under `# Documents to exclude:`, add the name of the document you want to exclude from Sidebar Checker.


* To exclude a *specific* document, add its relative file path like this:
```yml
# Documents to exclude:
...
docs/pbc/all/back-office/202212.0/install-the-spryker-core-back-office-feature.md
```

This excludes the `docs/pbc/all/back-office/202212.0/install-the-spryker-core-back-office-feature.md` document from the results of the Sidebar Checker run.

* To exclude *all* documents having the same name, add the file name at the end of the `# Documents to exclude:` section, like this:
```yml
# Documents to exclude:
...
index.md
```

This excludes all documents with the name `index.md` from the results of the Sidebar Checker run.