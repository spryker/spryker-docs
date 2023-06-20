---
title: Dead code checker
description: Reference information for evaluator tools.
template: howto-guide-template
---

The dead code checker checks for dead code that extends core classes in your project.

## Problem description

The project can extend core classes and after some time it can become unusable due to core changes. As a result, issues related to the project's upgradability arise.
It checks possible dead classes. For obvious reasons, the Spryker kernel classes such as `Factory`, `Facade` or `DependencyProvider` tend to be skipped.
Optionally, you can mute the dead code checker for a specific class with `@evaluator-skip-dead-code`.

## Example of code that causes an upgradability error:

The code has a class that doesn't have explicit initialization in project module: 

```bash
namespace Spryker/Zed/Module;

use Spryker\Zed\Single\Communication\Plugin\SinglePlugin as SprykerSinglePlugin;

class SinglePlugin extend SprykerSinglePlugin
{
    /**
     * @return void
     */
    public function run(): void
    {
        ...
    }
}
```
### Related error in the Evaluator output:

```bash
DEAD CODE CHECKER
=================

+---+----------------------------------------------------------------------+-----------------------------------------------------------------------+
| # | Message                                                              | Target                                                                |
+---+----------------------------------------------------------------------+-----------------------------------------------------------------------+
| 1 | Class "Spryker/Zed/Module/SinglePlugin" is not used in project       | Spryker/Zed/Module/SinglePlugin                                       |
+---+----------------------------------------------------------------------+-----------------------------------------------------------------------+
```

### Resolving the error: 
To resolve the error provided in the example, try the following in the provided order:
1. Skip the violation with an annotation.
2. Remove the unused class.

