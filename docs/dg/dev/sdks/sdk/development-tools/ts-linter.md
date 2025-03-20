---
title: TS linter
description: Learn about the SCSS Linter tool that lets you find and fix mistakes in the code style.
last_updated: May 15, 2023
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/ts-linter
originalArticleId: d7e97882-9e50-4bf5-8b39-130c94326818
redirect_from:
  - /2021080/docs/ts-linter
  - /2021080/docs/en/ts-linter
  - /docs/ts-linter
  - /docs/en/ts-linter
  - /v6/docs/ts-linter
  - /v6/docs/en/ts-linter
  - /docs/scos/dev/sdk/201811.0/development-tools/ts-linter.html
  - /docs/scos/dev/sdk/201903.0/development-tools/ts-linter.html
  - /docs/scos/dev/sdk/201907.0/development-tools/ts-linter.html
  - /docs/scos/dev/sdk/202001.0/development-tools/ts-linter.html
  - /docs/scos/dev/sdk/202005.0/development-tools/ts-linter.html
  - /docs/scos/dev/sdk/202009.0/development-tools/ts-linter.html
  - /docs/scos/dev/sdk/202108.0/development-tools/ts-linter.html
  - /docs/scos/dev/sdk/development-tools/ts-linter.html
  - /docs/sdk/dev/development-tools/ts-linter.html

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
  - title: SCSS linter
    link: docs/dg/dev/sdks/sdk/development-tools/scss-linter.html
  - title: Spryk code generator
    link: docs/dg/dev/sdks/sdk/spryks/spryks.html
  - title: Static Security Checker
    link: docs/dg/dev/sdks/sdk/development-tools/static-security-checker.html
  - title: Tooling config file
    link: docs/dg/dev/sdks/sdk/development-tools/tooling-configuration-file.html
---

{% info_block warningBox "No longer supported" %}

Since the `202307.0` release, this tool is no longer supported and has been replaced by `ESLint`. To migrate to `ESLint`, follow [Migration guide - Switch from TSLint to ESLint](/docs/dg/dev/upgrade-and-migrate/migrate-from-tslint-to-eslint.html).

{% endinfo_block %}

*TS Linter* allows you to find and fix code style mistakes. It helps a team follow the same standards and make code more readable.

 To analyze and fix files, [TSLint](https://palantir.github.io/tslint/) is used.

## Installation

For details about how to install the TS Linter for your project, see the [TS Linter integration file](/docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-ts-linter.html).

## Using TS Linter

To execute the TS Linter, do the following:

1. Install the Node.js modules:

```bash
npm ci
```

2. Execute the TS Linter in:

* validation mode:

```bash
npm run yves:tslint
```

* fix mode:

```bash
npm run yves:tslint:fix
```

## TS Linter config

The config for tslint resides in `/tslint.json`.

To redefine the path for the config, adjust `/frontend/libs/tslint.js` and use other [rules](https://palantir.github.io/tslint/rules/) for the TS Linter.
{% info_block infoBox %}

The TS Linter rules related to formatting aren't included in `tslint.json` to avoid duplication with the [Prettier rules](https://www.npmjs.com/package/@spryker/frontend-config.prettier).

{% endinfo_block %}

## CI checks and pre-commit hook

The TS Linter is integrated into:

* Pre-commit hooks.

The function that executes TS Linter before the commit resides in `/.githook`

```
- GitHook\Command\FileCommand\PreCommit\TsLintCommand
```

* Travis.

Command to run the TS Linter is integrated into `.travis.yml`

```yml
- node ./frontend/libs/tslint --format stylish
```

{% info_block warningBox "Important" %}

If you commit without the pre-commit hooks, you should run the TS Linter manually to avoid issues with Travis.

{% endinfo_block %}

{% info_block infoBox %}

Pre-commit hooks weren't integrated into [B2B](https://github.com/spryker-shop/b2b-demo-shop) and [B2C](https://github.com/spryker-shop/b2c-demo-shop) Demo Shops, only in the [Shop Suite](https://github.com/spryker-shop/suite).

{% endinfo_block %}
