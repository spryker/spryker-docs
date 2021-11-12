---
title: TS linter
description: Learn about the SCSS linter tool that allows you to find and fix mistakes in the code style.
last_updated: Jun 16, 2021
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
---

*TS linter* allows you to find and fix code style mistakes. It helps a team to follow the same standards and make code more readable.

 To analyze and fixTS files, [TSLint](https://palantir.github.io/tslint/) is used.

##  Installation
For details on how to install the TS linter for your project, see the [TS linter integration file](/docs/scos/dev/technical-enhancement-integration-guides/integrating-development-tools/integrating-ts-linter.html).

##  Using TS linter

To execute the TS linter, do the following:

1. Install the Node modules:
```bash
npm ci
```
2. Execute the TS linter in:
* validation mode:
```bash
npm run yves:tslint
```
* fix mode:
```bash
npm run yves:tslint:fix
```
## TS linter config

The config for tslint resides in `/tslint.json`.

To redefine the path for the config, adjust `/frontend/libs/tslint.js` and use other [rules](https://palantir.github.io/tslint/rules/) for the TS linter.
{% info_block infoBox %}

The TS linter rules related to formatting aren’t included in `tslint.json` to avoid duplication with the [Prittier rules](https://www.npmjs.com/package/@spryker/frontend-config.prettier).

{% endinfo_block %}

## CI checks and pre-commit hook

The TS linter is integrated into:

* Pre-commit hooks.
 The function that executes TS linter before the commit resides in `/.githook`
 ```
- GitHook\Command\FileCommand\PreCommit\TsLintCommand
```
* Travis.
Command to run the TS linter is integrated into `.travis.yml`

```
- node ./frontend/libs/tslint --format stylish
```

{% info_block warningBox "Important" %}

If you commit without the pre-commit hooks, you should run the TS linter manually to avoid issues with Travis.

{% endinfo_block %}
{% info_block infoBox %}

Pre-commit hooks weren’t integrated into [B2B](https://github.com/spryker-shop/b2b-demo-shop) and [B2C](https://github.com/spryker-shop/b2c-demo-shop) Demo Shops, only in the [Shop Suite](https://github.com/spryker-shop/suite).

{% endinfo_block %}
