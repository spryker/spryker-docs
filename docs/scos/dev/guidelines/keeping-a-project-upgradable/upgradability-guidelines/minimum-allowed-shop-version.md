---
title: Minimum allowed shop version
description: Reference information for evaluator tools.
template: howto-guide-template
---

"Minimum allowed shop version" check makes sure that the project uses one of the supported product releases by [Spryker Code Upgrader](/docs/scu/dev/onboard-to-spryker-code-upgrader/prepare-a-project-for-spryker-code-upgrader.html).

## Problem description

The project should meet the minimum required Spryker product release to make it upgradable by [Spryker Code Upgrader](/docs/scu/dev/onboard-to-spryker-code-upgrader/prepare-a-project-for-spryker-code-upgrader.html). 

If the project doesn't use the feature packages, the corresponding Spryker module versions should be used.

## Example of evaluator error message

Example 1. Used feature package version doesn't correspond the minimum required version

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

Example 2. Used Spryker package version doesn't correspond the minimum required version

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

1. Update the outdated dependencies to make it corresponding to the minimum required version.
