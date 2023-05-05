---
title: Single plugin argument
description: Reference information for evaluator tools.
template: howto-guide-template
---

Single plugin arguments inside the dependency provider’s methods.

## Problem description

Inside of the dependency provider you can register the plugin directly in the method or through another wrap method, with and without constructor arguments. 
But not all possible expressions and variable types can be used as constructor arguments.
Supported argument types:
 - int
 - float
 - string (constant or concatenations with the constant)
 - bool 
 - null
 - usage of new statement to instantiate a class (without further methods calls)

## Example of code that causes an upgradability error

The dependency provider method returns the plugin with unwanted argument: 

```bash
namespace SprykerSdkTest\InvalidProject\src\Pyz\Zed\SinglePluginArgument;

use Spryker\Zed\Monitoring\Communication\Plugin\Console\MonitoringConsolePlugin;
use stdClass;

class ConsoleDependencyProvider
{
    /**
     * @return \Spryker\Zed\Console\Communication\Plugin\MonitoringConsolePlugin
     */
    public function getMonitoringConsoleMethod(): MonitoringConsolePlugin
    {
        $fp = fopen('test.txt', 'w');

        return new MonitoringConsolePlugin($fp);
    }
}
```
### Related error in the Evaluator output

```bash
================
SINGLE PLUGIN ARGUMENT
================

+---+---------------------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------+
| # | Message                                                                                                                         | Target                                                                                                     |
+---+---------------------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------+
| 1 | Plugin \Spryker\Zed\Console\Communication\Plugin\MonitoringConsolePlugin                                                        |                                                                                                            |
|   | should not have unsupported constructor parameters.                                                                             | \Pyz\InvalidProject\src\Pyz\Zed\SinglePluginArgument\ConsoleDependencyProvider::getMonitoringConsoleMethod |
|   | Supported argument types: int, float, string, const, bool, int, usage of new statement to                                       |                                                                                                            |
|   | instantiate a class (without further methods calls)                                                                             |                                                                                                            |
+---+---------------------------------------------------------------------------------------------------------------------------------+------------------------------------------------------------------------------------------------------------+
```

### Resolving the error
To resolve the error provided in the example, try the following in the provided order:
1. Try to use file name as argument and move reading inside of plugin.
2. Try to avoid arguments that are not mentioned in the supported types.

