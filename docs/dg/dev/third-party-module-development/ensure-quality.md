---
title: Ensure Quality
description: Ensure Quality
last_updated: Jun 7, 2024
template: howto-guide-template

---

<style>
  table th, table td {
    white-space: nowrap;
  }
</style>

**TBD: Commands must be updated after https://spryker.atlassian.net/browse/FRW-8436 is done (Check if we need it at all)  **

## Tools

To make sure that code quality matched the Spryker standards it is important to execute code quality tools, here is the list:

| Command                                                                                 | Description                                               |
|:----------------------------------------------------------------------------------------|:----------------------------------------------------------| 
| console code:propel:validate-abstract -m YourCompanyName.YourModuleName                 | Checks Abstract classes for Propel tables exist in core   |
| console propel:schema:validate                                                          | Validates Propel the schema files.                        |
| console propel:schema:validate-xml-names                                                | Validates Propel XML element name rules for schema files. |
| console transfer:validate                                                               | Validates transfer XML definition files.                  |
| spryker-dev-console dev:validate-module-schemas YourCompanyName.YourModuleName          | Validates schema definitions for each module.             |
| spryker-dev-console dev:validate-module-databuilders YourCompanyName.YourModuleName     | Validates databuilder XML files for each module.          |
| spryker-dev-console dev:module-meta-files -d -v YourCompanyName.YourModuleName          | Updates meta files for each module.                       |
| spryker-dev-console dev:composer:update-json-files -d -v YourCompanyName.YourModuleName | Update composer.json of core modules.                     |
| console dev:composer:validate-json-files YourCompanyName.YourModuleName                 | Validates composer.json files from core modules.          |
| console code:sniff:style -m YourCompanyName.YourModuleName                              | Sniffs and fixes code style.                              |
| spryker-dev-console dev:validate-module-transfers -m YourCompanyName.YourModuleName     | Validates transfer definition for the module.             |
| console code:sniff:architecture -v -m YourCompanyName.YourModuleName                    | Validates module architecture.                            |
| console code:phpstan -m YourCompanyName.YourModuleName                                  | Runs PHPStan static analyzer.                             |

## GitHub CI file example 

Make sure that your module CI runs all the command above

```yaml
name: CI

on:
    push:
        branches:
            - 'master'
    pull_request:
    workflow_dispatch:

jobs:
    validation:
        name: Validation
        runs-on: ubuntu-latest

        steps:
            - uses: actions/checkout@v3

            - name: Setup PHP
              uses: shivammathur/setup-php@v2
              with:
                  php-version: '8.2'
                  extensions: mbstring, intl, bcmath
                  coverage: none

            - name: Composer Install
              run: composer install --prefer-dist --no-interaction --profile

            - name: Run validation
              run: composer validate

            # RUN ALL THE COMMANDS FROM THE TABLE ABOVE
    lowest:
        name: Prefer Lowest
        runs-on: ubuntu-latest

        steps:
            - uses: actions/checkout@v3

            - name: Setup PHP
              uses: shivammathur/setup-php@v2
              with:
                  php-version: '8.1'
                  extensions: mbstring, intl, bcmath
                  coverage: none

            - name: Composer Install
              run: composer install --prefer-dist --no-interaction --profile

            - name: Composer Update
              run: composer update --prefer-lowest --prefer-dist --no-interaction --profile -vvv

```

- Make sure that CI status badge is added to you repository README.md file https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/adding-a-workflow-status-badge