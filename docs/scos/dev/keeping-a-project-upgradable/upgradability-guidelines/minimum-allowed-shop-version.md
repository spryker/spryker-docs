---
title: Minimum allowed shop version
description: Reference information for evaluator tools.
template: howto-guide-template
---

The shop project dependencies should be at least a supported release version.

## Problem description

The shop contains the old package dependencies that are already unsupported. It can cause the issues related to project the upgradability.

## Example of code that causes an upgradability error

composer.lock contains unsupported package versions
```json
{
  "_readme": [
    "This file locks the dependencies of your project to a known state",
    "Read more about it at https://getcomposer.org/doc/01-basic-usage.md#installing-dependencies",
    "This file is @generated automatically"
  ],
  "content-hash": "7f3bcb8eeee91ab717f561b035b8df84",
  "packages": [
    {
      "name": "spryker-feature/agent-assist",
      "version": "202203.0",
      ...
    },
    {
      "name": "spryker/availability-gui",
      "version": "6.5.9",
      ...
    }
  ]
}
```

### Related error in the Evaluator output:

```shell
============================
MINIMUM ALLOWED SHOP VERSION
============================

+---+-------------------------------------------------------------------------------------------------------------------+---------------------------------------+
| # | Message                                                                                                           | Target                                |
+---+-------------------------------------------------------------------------------------------------------------------+---------------------------------------+
| 1 | The package "spryker-feature/agent-assist" version "202203.0" is not supported. The minimum allowed version is "202204.0" | spryker-feature/agent-assist:202203.0 |
+---+-------------------------------------------------------------------------------------------------------------------+---------------------------------------+
| 2 | The package "spryker/availability-gui" version "6.5.9" is not supported. The minimum allowed version is "6.6.0"           | spryker/availability-gui:6.5.9        |
+---+-------------------------------------------------------------------------------------------------------------------+---------------------------------------+
```

### Resolving the error:

To resolve this issue, you need to update the outdated dependencies to the current release or version.