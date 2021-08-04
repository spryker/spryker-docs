---
title: TS linter
originalLink: https://documentation.spryker.com/v6/docs/ts-linter
redirect_from:
  - /v6/docs/ts-linter
  - /v6/docs/en/ts-linter
---

*TS linter* allows you to find and fix code style mistakes. It helps a team to follow the same standards and make code more readable.

 To analyze and fixTS files, [TSLint](https://palantir.github.io/tslint/) is used.
 
##  Installation
For details on how to install the TS linter for your project, see the [TS linter integration file](https://documentation.spryker.com/docs/ts-linter-integration-guide).
 
##  Using TS linter

To execute the TS linter, do the following:

1. Install the Node modules:
```Bash
npm ci
```
2. Execute the TS linter in:
* validation mode:
```Bash
npm run yves:tslint
```
* fix mode:
```Bash
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

