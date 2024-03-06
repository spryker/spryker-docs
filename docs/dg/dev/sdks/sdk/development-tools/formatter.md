---
title: Formatter
description: Learn about the Formatter tool that allows you to find and fix mistakes in the code style.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/formatter
originalArticleId: 4a978f53-1a56-4f70-8b91-870e0ac94ab3
redirect_from:
  - /docs/sdk/dev/development-tools/formatter.html
  - /docs/scos/dev/sdk/201811.0/development-tools/formatter.html
  - /docs/scos/dev/sdk/201903.0/development-tools/formatter.html
  - /docs/scos/dev/sdk/201907.0/development-tools/formatter.html
  - /docs/scos/dev/sdk/202001.0/development-tools/formatter.html
  - /docs/scos/dev/sdk/202005.0/development-tools/formatter.html
  - /docs/scos/dev/sdk/202009.0/development-tools/formatter.html
  - /docs/scos/dev/sdk/202108.0/development-tools/formatter.html
  - /docs/scos/dev/sdk/development-tools/formatter.html
related:
  - title: Architecture sniffer
    link: docs/scos/dev/sdk/development-tools/architecture-sniffer.html
  - title: Code sniffer
    link: docs/scos/dev/sdk/development-tools/code-sniffer.html
  - title: Performance audit tool- Benchmark
    link: docs/scos/dev/sdk/development-tools/performance-audit-tool-benchmark.html
  - title: PHPStan
    link: docs/scos/dev/sdk/development-tools/phpstan.html
  - title: SCSS linter
    link: docs/scos/dev/sdk/development-tools/scss-linter.html
  - title: TS linter
    link: docs/scos/dev/sdk/development-tools/ts-linter.html
  - title: Spryk code generator
    link: docs/scos/dev/sdk/development-tools/spryk-code-generator.html
  - title: Static Security Checker
    link: docs/scos/dev/sdk/development-tools/static-security-checker.html
  - title: Tooling config file
    link: docs/scos/dev/sdk/development-tools/tooling-config-file.html
---

*Formatter* allows you to find and fix code style mistakes and keep your code more readable.

To format files, [Prettier](https://prettier.io/) is used.

## Installation

For details about how to install Formatter for your project, see the [Formatter integration guide](/docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-formatter.html).

## Using Formatter

To execute the Formatter, do the following:

1. Install the Node.js modules:

```bash
npm ci
```

2. Execute the formatter in:

* validation mode:

```bash
npm run formatter
```

* fix mode

```bash
npm run formatter:fix
```

## File types

The default file types for formatting are:

* *.scss
* *.css
* *.less
* *.js
* *.ts
* *.json
* *.html

To change the list of file extensions, adjust `/frontend/settings.js`:

```js
formatter: [
    `**/*.(scss|css|less|js|ts|json|html)`,
],
```

{% info_block infoBox %}

Twig is **not validated** by Prettier. The existing [Twig plugin](https://github.com/trivago/prettier-plugin-twig-melody) can't work with widgets and attributes.

{% endinfo_block %}

## Formatter config

The config for Prettier resides in the [@spryker/frontend-config.prettier](https://www.npmjs.com/package/@spryker/frontend-config.prettier) module.

To redefine the path for the config file, adjust `/frontend/libs/formatter.js`  and use other [options](https://prettier.io/docs/en/options.html) for Prettier:

```js
const configPath = 'node_modules/@spryker/frontend-config.prettier/.prettierrc.json';
```

The Prettier formatter uses the ignore file `/.prettierignore` that includes directories and files where the formatter shouldn’t be executed.

## CI checks and pre-commit hook

The Formatter is integrated into:

* Pre-commit hooks.
The function that executes Formatter before the commit resides in `/.githook`

```
- GitHook\Command\FileCommand\PreCommit\FrontendFormatterCommand
```
* Travis.
The command to run the Formatter is integrated into `.travis.yml`

```
- node ./frontend/libs/formatter
```

{% info_block warningBox "Important" %}

If you commit without the pre-commit hooks, you should run the Formatter manually to avoid issues with Travis.

{% endinfo_block %}

{% info_block infoBox %}

Pre-commit hooks weren’t integrated into [B2B](https://github.com/spryker-shop/b2b-demo-shop) and [B2C](https://github.com/spryker-shop/b2c-demo-shop) demo shops, only in the [Shop Suite](https://github.com/spryker-shop/suite).

{% endinfo_block %}
