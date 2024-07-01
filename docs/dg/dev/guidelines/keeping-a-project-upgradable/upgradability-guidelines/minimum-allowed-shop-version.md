---
title: Minimum allowed shop version
description: Reference information for evaluator tools.
template: howto-guide-template
last_updated: Oct 24, 2023
redirect_from:
  - /docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/minimum-allowed-shop-version.html
---

The *Minimum allowed shop version* check makes sure that the project uses one of the supported product releases by the [Spryker Code Upgrader](/docs/ca/devscu/prepare-a-project-for-spryker-code-upgrader.html).

## Problem description

To enable smooth upgradability of the project using the [Spryker Code Upgrader](/docs/ca/devscu/prepare-a-project-for-spryker-code-upgrader.html), it is essential for the project to adhere to the minimum required Spryker product release.

In case the project does not utilize the feature packages, it is necessary to ensure that the corresponding Spryker module versions are used.

## Example of an evaluator error message

Below is an example of when a used feature package version doesn't correspond to the minimum required version:

```bash
============================
MINIMUM ALLOWED SHOP VERSION
============================

Message: The package "spryker-feature/agent-assist" version 202108.0 is not supported. The minimum allowed version is 202204.0.
Target:  spryker-feature/agent-assist:202108.0
```

## Example of code that causes an evaluator error

The following is an example of the `composer.json` file when the used Spryker feature package version doesn't correspond to the minimum required version:

```json
{
  ...
  "require": {
    ...
    "spryker-feature/agent-assist": "^202108.0",
    ...
  },
  ...
}
```

## Resolving the error

Update the outdated dependencies to make it correspond to the minimum required version.


## Run only this checker
To run only this checker, include `MINIMUM_ALLOWED_SHOP_VERSION` into the checkers list. Example:
```bash
vendor/bin/evaluator evaluate --checkers=MINIMUM_ALLOWED_SHOP_VERSION
```
