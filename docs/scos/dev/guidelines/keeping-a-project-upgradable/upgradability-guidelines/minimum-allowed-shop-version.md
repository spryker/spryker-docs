---
title: Minimum allowed shop version
description: Reference information for evaluator tools.
template: howto-guide-template
---

The *Minimum allowed shop version* check makes sure that the project uses one of the supported product releases by the [Spryker Code Upgrader](/docs/scu/dev/onboard-to-spryker-code-upgrader/prepare-a-project-for-spryker-code-upgrader.html).

## Problem description

To enable smooth upgradability of the project using the [Spryker Code Upgrader](/docs/scu/dev/onboard-to-spryker-code-upgrader/prepare-a-project-for-spryker-code-upgrader.html), it is essential for the project to adhere to the minimum required Spryker product release.

In case the project does not utilize the feature packages, it is necessary to ensure that the corresponding Spryker module versions are used.

## Example of an evaluator error message

Below is an example of when a used feature package version doesn't correspond to the minimum required version:

```shell
============================
MINIMUM ALLOWED SHOP VERSION
============================

Message: Version 202108.0 of the package "spryker-feature/agent-assist" is not supported. The minimum allowed version is 202204.0.
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

### Resolving the error

To resolve this issue:

1. Update the outdated dependencies to make it correspond to the minimum required version.
