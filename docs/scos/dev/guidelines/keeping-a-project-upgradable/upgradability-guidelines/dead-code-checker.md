---
title: Dead code checker
description: Reference information for evaluator tools.
template: howto-guide-template
---

The dead code checker checks for dead code that extends core classes in your project.

## Problem description

The project can extend core classes and after some time it can become unusable due to project or core changes. As a result, issues related to the project's upgradability arise.
It checks possible dead classes. The Spryker kernel classes such as `Factory`, `Facade` or `DependencyProvider` tend to be skipped.
Optionally, you can mute the dead code checker for a specific class with `@evaluator-skip-dead-code`.

## Example of evaluator error message

```bash
=================
DEAD CODE CHECKER
=================

+---+---------------------------------------------------------------------------------+--------------------------------------------------+
| # | Message                                                                         | Target                                           |
+---+---------------------------------------------------------------------------------+--------------------------------------------------+
| 1 | Class "Pyz/Zed/Single/Communication/Plugin/SinglePlugin" is not used in project | Pyz/Zed/Single/Communication/Plugin/SinglePlugin |
+---+---------------------------------------------------------------------------------+--------------------------------------------------+
```

Unused class `Pyz/Zed/Single/Communication/Plugin/SinglePlugin` that produces an error:

```bash
namespace Pyz\Zed\Single\Communication\Plugin;

use Spryker\Zed\Single\Communication\Plugin\SinglePlugin as SprykerSinglePlugin;

class SinglePlugin extends SprykerSinglePlugin
{
    ...
}
```

### Resolving the error:

To resolve the error:

1. Remove the unused dead code in project.
