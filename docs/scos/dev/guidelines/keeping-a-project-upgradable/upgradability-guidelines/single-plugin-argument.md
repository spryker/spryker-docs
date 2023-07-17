---
title: Single plugin argument
description: Reference information for evaluator tools.
template: howto-guide-template
---

This check makes sure that the plugins don't require the complicated constructor arguments.

## Problem description

Inside of the dependency provider you can register the plugin directly in the method or through another wrap method, with and without constructor arguments. 
To keep the plugins simple, they shouldn't require complicated objects as constructor arguments.

Supported argument types:
 - int
 - float
 - string (constant or concatenations with the constant)
 - bool 
 - null
 - usage of new statement to instantiate a class (without further methods calls)

## Example of evaluator error message

```bash
======================
SINGLE PLUGIN ARGUMENT
======================

Message: The "\Spryker\Zed\Console\Communication\Plugin\MonitoringConsolePlugin" plugin
         should not have unsupported constructor parameters.
         Supported argument types: int, float, string, const, bool, int, usage of new statement to
         instantiate a class (without further methods calls).
Target:  {PATH_TO_PROJECT}\ConsoleDependencyProvider::getMonitoringConsoleMethod
```

## Example of code that causes an evaluator error

The dependency provider method returns the plugin with unwanted argument: 

```bash
namespace Pyz\Zed\SinglePluginArgument;

use Pyz\Zed\Monitoring\Communication\Plugin\Console\MonitoringConsolePlugin;

class ConsoleDependencyProvider
{
    /**
     * @return \Pyz\Zed\Console\Communication\Plugin\MonitoringConsolePlugin
     */
    public function getMonitoringConsoleMethod(): MonitoringConsolePlugin
    {
        $fp = fopen('test.txt', 'w');

        return new MonitoringConsolePlugin($fp);
    }
}
```

### Resolving the error

To resolve the error:
1. Rework the plugin - remove the usage of the complicated constructor arguments.

