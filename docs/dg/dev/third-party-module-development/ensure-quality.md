---
title: Ensure Quality
description: Ensure Quality
last_updated: Jun 7, 2024
template: howto-guide-template
related:
  - title: Go to the Next Step.
    link: docs/dg/dev/third-party-module-development/publish-code.html
---

<style>
  table th, table td {
    white-space: nowrap;
  }
</style>

## Tools

To make sure that code quality matched the Spryker standards it is important to execute code quality tools, here is the list:

| Command                                                                                 | Description                                                             |
|:----------------------------------------------------------------------------------------|:------------------------------------------------------------------------| 
| vendor/your-company-name/your-module-name/console code:sniff:style                      | Sniffs and fixes code style.                                            |
| vendor/your-company-name/your-module-name/console code:sniff:architecture               | Validates module architecture to find a common architecture mistakes.   |
| vendor/your-company-name/your-module-name/console code:phpstan                          | Runs PHPStan static analyzer to ensure the code quality.                |
| vendor/your-company-name/your-module-name/console code:phpmd                            | Runs PHPMD  to detect code smells and possible errors within the analyzed source code.                |

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