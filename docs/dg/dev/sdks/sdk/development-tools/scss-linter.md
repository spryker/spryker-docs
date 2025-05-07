---
title: SCSS linter
description: Learn about the SCSS linter tool that allows you to find and fix mistakes in the code style.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/scss-linter
originalArticleId: 62b2d90c-52f4-4307-b93f-78776f7408aa
redirect_from:
  - /docs/sdk/dev/development-tools/scss-linter.html
  - /docs/scos/dev/sdk/201811.0/development-tools/scss-linter.html
  - /docs/scos/dev/sdk/201903.0/development-tools/scss-linter.html
  - /docs/scos/dev/sdk/201907.0/development-tools/scss-linter.html
  - /docs/scos/dev/sdk/202001.0/development-tools/scss-linter.html
  - /docs/scos/dev/sdk/202005.0/development-tools/scss-linter.html
  - /docs/scos/dev/sdk/202009.0/development-tools/scss-linter.html
  - /docs/scos/dev/sdk/202108.0/development-tools/scss-linter.html
  - /docs/scos/dev/sdk/development-tools/scss-linter.html
related:
  - title: Code sniffer
    link: docs/dg/dev/sdks/sdk/development-tools/code-sniffer.html
  - title: Formatter
    link: docs/dg/dev/sdks/sdk/development-tools/formatter.html
  - title: Architecture sniffer
    link: docs/dg/dev/sdks/sdk/development-tools/architecture-sniffer.html
  - title: Performance audit tool- Benchmark
    link: docs/dg/dev/sdks/sdk/development-tools/benchmark-performance-audit-tool.html
  - title: PHPStan
    link: docs/dg/dev/sdks/sdk/development-tools/phpstan.html
  - title: TS linter
    link: docs/dg/dev/sdks/sdk/development-tools/ts-linter.html
  - title: Spryk code generator
    link: docs/dg/dev/sdks/sdk/spryks/spryks.html
  - title: Static Security Checker
    link: docs/dg/dev/sdks/sdk/development-tools/static-security-checker.html
  - title: Tooling config file
    link: docs/dg/dev/sdks/sdk/development-tools/tooling-configuration-file.html
---

*SCSS linter* allows you to find and fix code style mistakes. It helps a team follow the same standards and make code more readable.

To analyze and fix existing SCSS files, [Stylelint](https://stylelint.io/) is used.

## Installation

For details about how to install the SCSS Linter for your project, see the [SCSS linter integration guide](/docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-scss-linter.html).

## Using SCSS Linter

To execute the SCSS Linter, do the following:

1. Install the Node.js modules:

```bash
npm ci
```

2. Execute the SCSS Linter in:

* validation mode:

```bash
npm run yves:stylelint
```

* fix mode:

```bash
npm run yves:stylelint:fix
```

## SCSS Linter config

The config for Stylelint resides in the [@spryker/frontend-config.stylelint](https://www.npmjs.com/package/@spryker/frontend-config.stylelint) module.

To redefine the path for the config file, adjust `/frontend/libs/stylelint.js`  and use other rules for the SCSS Linter.

```js
configFile: `${globalSettings.context}/node_modules/@spryker/frontend-config.stylelint/.stylelintrc.json`,
```

The SCSS Linter also uses the ignore file `/.stylelintignore` that includes directories and files where the SCSS linter shouldn't be executed.

{% info_block infoBox %}

SCSS Linter rules related to formatting aren't included in the [stylelint config](https://www.npmjs.com/package/@spryker/frontend-config.stylelint) to avoid duplication with the [Prettier rules](https://www.npmjs.com/package/@spryker/frontend-config.prettier).

{% endinfo_block %}

## CI checks and the pre-commit hook

The SCSS Linter is integrated into:

* Pre-commit hooks
The function that executes the SCSS Linter before the commit resides in `/.githook`:

```
- GitHook\Command\FileCommand\PreCommit\StyleLintCommand
```

* Travis
Command to run the SCSS Linter is integrated into `.travis.yml`

```
- node ./frontend/libs/stylelint
```

{% info_block warningBox "Important" %}

If you commit without the pre-commit hooks, you should run the SCSS Linter manually to avoid issues with Travis.

{% endinfo_block %}

{% info_block infoBox %}

Pre-commit hooks are integrated only into the Shop Suite and are not integrated in the B2B and B2C Demo Shops.

{% endinfo_block %}
