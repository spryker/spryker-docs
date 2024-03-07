This document explains how redirects generator works and how to run it.

Redirects generator consists of two scripts: redirect from generator and redirects generator.

## Redirect from generator

The redirect from generator checks if docs have the `redirect_from` parameter in the front matter. If one or more documents don't have this parameter, the script adds it to them.

### Run redirect from generator

1. In `_scripts/redirects_generator/redirect_from_generator.sh`, define the document or the folder with documents to generate the parameter for:
```sh
...
folder_path="{RELATIVE_PATH_TO_DOC_OR_FOLDER}"
```
  If the specified folder has subfolders, the script with recursively update the docs in them.

2. In a terminal, run the script:
```shell
bash _scripts/redirects_generator/redirect_from_generator.sh
```
  This returns the list of docs the parameter has been added to.

## Redirects generator

The redirects generator appends the current path of one or more docs to their front matter. This is usually useful when you need to move a bunch of docs to another location. You need to run the script *before* you move the docs.

### Run the redirects generator

1. In `_scripts/redirects_generator/redirects_generator.sh`, define the absolute path to the repo on your machine:
```text
...
root_directory="{ABSOLUTE_PATH_TO_REPO}"
...
```
    It's needed to generate the redirects relative to the path of the repo.

2. In `_scripts/redirects_generator/redirects_generator.sh`, define the the folder with documents to generate redirects for:
```
...
folder_path="{RELATIVE_PATH_TO_DOC_OR_FOLDER}"
...
```  

  If the specified folder has subfolders, the script with recursively update the docs in them.

3. In a terminal, run the script:
```shell
bash _scripts/redirects_generator/redirects_generator.sh
```

This returns the list of docs the paths have been added to.

4. In the updated docs, move the path to the `redirect_from` parameter in the front matter.
