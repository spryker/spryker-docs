---
title: Ensuring quality in standalone modules
description: Ensure Quality
last_updated: Jun 7, 2024
template: howto-guide-template
---

<style>
  table th, table td {
    white-space: nowrap;
  }
</style>

To adhere to Spryker's code quality standards when creating standalone modules, run the following tools:

| Command                                                                                 | Description                                                             |
|:----------------------------------------------------------------------------------------|:------------------------------------------------------------------------|
| vendor/your-company-name/your-module-name/console code:sniff:style                      | Sniffs and fixes code style.                                            |
| vendor/your-company-name/your-module-name/console code:sniff:architecture               | Validates module architecture to find common architecture mistakes.   |
| vendor/your-company-name/your-module-name/console code:phpstan                          | Runs PHPStan static analyzer to ensure code quality.                |
| vendor/your-company-name/your-module-name/console code:phpmd                            | Runs PHPMD to detect code smells and possible errors within the analyzed source code.                |


You can add these code quality checks to your GitHub CI configuration. Example:

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

After adding such configuration, make sure the [CI status badge](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/adding-a-workflow-status-badge) is added to the repository's README file.

## Next step

[Publish modules on GitHub](/docs/dg/dev/developing-standalone-modules/publish-standalone-modules-on-github.html)
