---
title: Dead code
description: Reference information for evaluator tools.
template: howto-guide-template
---

The checker that checks dead code that extends core classes in the project.

## Problem description

The project can extend core classes and after some time it can be unusable. It can cause the issues related to project the upgradability. 
It checks possible dead classes. For obvious reasons, the classes that are created magically tend to be skipped.
If the checker does find a false result, it can be skipped using an annotation `@evaluator-skip-dead-code` in the class.

## Example of code that causes an upgradability error:

The code has class that doesn't have explicit initialization in project module like `new Class()`: 

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
1. Skip violation with annotation.
2. Remove unused class.

