---
title: Minimum allowed shop version
description: Reference information for evaluator tools.
template: howto-guide-template
---

The *Minimum allowed shop version* check makes sure that the project uses one of the supported product releases by the [Spryker Code Upgrader](/docs/scu/dev/onboard-to-spryker-code-upgrader/prepare-a-project-for-spryker-code-upgrader.html).

## Problem description

To enable smooth upgradability of the project using the [Spryker Code Upgrader](/docs/scu/dev/onboard-to-spryker-code-upgrader/prepare-a-project-for-spryker-code-upgrader.html), it is essential for the project to adhere to the minimum required Spryker product release.

In case the project does not utilize the feature packages, it is necessary to ensure that the corresponding Spryker module versions are used.

## Example of an Evaluator error message

Below is an example of when a used feature package version doesn't correspond to the minimum required version:

```shell
============================
MINIMUM ALLOWED SHOP VERSION
============================

+---+---------------------------------------------------------------------------------------------------------------------------+---------------------------------------+
| # | Message                                                                                                                   | Target                                |
+---+---------------------------------------------------------------------------------------------------------------------------+---------------------------------------+
| 1 | The package "spryker-feature/agent-assist" version "202108.0" is not supported. The minimum allowed version is "202204.0" | spryker-feature/agent-assist:202108.0 |
+---+---------------------------------------------------------------------------------------------------------------------------+---------------------------------------+
```

Below is an example of when the used Spryker package version doesn't correspond to the minimum required version:

```shell
============================
MINIMUM ALLOWED SHOP VERSION
============================

+---+-----------------------------------------------------------------------------------------------------------------+--------------------------------+
| # | Message                                                                                                         | Target                         |
+---+-----------------------------------------------------------------------------------------------------------------+--------------------------------+
| 1 | The package "spryker/availability-gui" version "6.5.9" is not supported. The minimum allowed version is "6.6.0" | spryker/availability-gui:6.5.9 |
+---+-----------------------------------------------------------------------------------------------------------------+--------------------------------+
```

### Resolving the error

To resolve this issue:

1. Update the outdated dependencies to make it correspond to the minimum required version.
