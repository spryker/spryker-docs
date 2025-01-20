---
title: Run the evaluator tool
description: Learn with this guide instructions for running the evaluator tool within your Spryker projects.
template: howto-guide-template
last_updated: Sep 18, 2023
redirect_from:
  - /docs/scos/dev/guidelines/keeping-a-project-upgradable/run-the-evaluator-tool.html
---

This document outlines the process of using the evaluator tool to verify if your project code adheres to Spryker's standards.

## Install the evaluator tool

* Install the evaluator tool in your project by using the composer:
```bash
composer require --dev spryker-sdk/evaluator
```

* Get general information about the tool and see all the commands related to evaluation in the `evaluate` section:

```bash
vendor/bin/evaluator evaluate -h
```

## Run an evaluation

To evaluate your code, run the evaluator in one of the following ways:

* Evaluate the code of all the modules:

```bash
vendor/bin/evaluator evaluate
```

* Evaluate the code of a specific module:

```bash
vendor/bin/evaluator evaluate --path=src/path_to_module
```

## Execute checkers

Exclude checkers:
```bash
vendor/bin/evaluator evaluate --exclude-checkers=CONTAINER_SET_FUNCTION_CHECKER
```

Execute a specific checker:
```bash
vendor/bin/evaluator evaluate --checkers={CONTAINER_SET_FUNCTION_CHECKER}
```
`CONTAINER_SET_FUNCTION_CHECKER` is the name of the checker to execute.

### Checkers

* CONTAINER_SET_FUNCTION_CHECKER - [Container set function](https://docs.spryker.com/docs/dg/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/container-set-function.html)
* DEAD_CODE_CHECKER - [Dead code checker](https://docs.spryker.com/docs/dg/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/dead-code-checker.html)
* DEPENDENCY_PROVIDER_ADDITIONAL_LOGIC_CHECKER - [Additional logic in dependency provider](https://docs.spryker.com/docs/dg/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/additional-logic-in-dependency-provider.html#run-only-this-checker)
* SPRYKER_DEV_PACKAGES_CHECKER - [Spryker dev packages checker](https://docs.spryker.com/docs/dg/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/spryker-dev-packages-checker.html)
* DISCOURAGED_PACKAGES_CHECKER - [Discouraged packages checker](https://docs.spryker.com/docs/dg/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/discouraged-packages-checker.html)
* MINIMUM_ALLOWED_SHOP_VERSION - [Minimum allowed shop version](https://docs.spryker.com/docs/dg/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/minimum-allowed-shop-version.html)
* MULTIDIMENSIONAL_ARRAY_CHECKER
* NPM_CHECKER - [Npm checker](https://docs.spryker.com/docs/dg/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/npm-checker.html)
* OPEN_SOURCE_VULNERABILITIES_CHECKER - [Open-source vulnerabilities checker](https://docs.spryker.com/docs/dg/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/open-source-vulnerabilities.html)
* PHP_VERSION_CHECKER - [PHP version checker](https://docs.spryker.com/docs/dg/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/php-version.html#problem-description)
* PLUGINS_REGISTRATION_WITH_RESTRICTIONS_CHECKER - [Plugin registration with restrictions](https://docs.spryker.com/docs/dg/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/plugin-registration-with-restrintions.html)
* SPRYKER_SECURITY_CHECKER - [Spryker security checker](https://docs.spryker.com/docs/dg/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/spryker-security-checker.html)
* SINGLE_PLUGIN_ARGUMENT - [Single plugin argument](https://docs.spryker.com/docs/dg/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/single-plugin-argument.html)

## Resolve upgradability issues

If the report contains upgradability issues, see [Upgradability guidelines](/docs/dg/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/upgradability-guidelines.html) to resolve them.
