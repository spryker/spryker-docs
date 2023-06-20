---
title: Additional logic in dependency provider
description: Reference information for evaluator tools.
template: howto-guide-template
---

This document explains how you can bypass issues with additional logic inside the dependency provider’s methods.

## Problem description

On the project level, developers use `if` constructs with variety of expressions in dependency providers to register the plugins in particular cases only.

Not all possible expressions are needed inside of the `if` statements for plugin registration and not all of them are supported. This check verifies that if an `if` construct is used for plugin registration, then only one of the following expressions is used:

`class_exists` it is allowed for BC reasons

```php
class_exists(\Foo\Bar::class) function call
```

`isDevelopment` function calls - it is allowed for plugins that are needed in development mode only (e.g. profiling, debug, etc.)
    
```php
$this->getConfig()->isDevelopmentConsoleCommandsEnabled() function calls 
```

## Example of code that causes an upgradability error

The method `getFormPlugins` in `FormDependencyProvider` contains unsupported expressions in the `if` construct `$alwaysAddPlugin`.

```php
use Spryker\Yves\Form\FormDependencyProvider as SprykerFormDependencyProvider;

class FormDependencyProvider extends SprykerFormDependencyProvider
{
    ...
    
    protected function getFormPlugins(): array
    {
        $plugins = [
            new ValidatorExtensionFormPlugin(),
        ];
        
        $plugins[] = new CsrfFormPlugin();
        
        $alwaysAddPlugin = true;

        if ($alwaysAddPlugin) {
            $plugins[] = new WebProfilerFormPlugin();
        }
        
        return $plugins;
    }
}
```

### Related error in the Evaluator output

```bash
======================
MULTIDIMENSIONAL ARRAY
======================

+---+------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------+
| # | Message                                                                                              | Target                                                                     |
+---+------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------+
| 1 | The condition statement if ($alwaysAddPlugin) {} is forbidden in the DependencyProvider              | /spryker/b2c-demo-shop/src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php |
+---+------------------------------------------------------------------------------------------------------+----------------------------------------------------------------------------+

```

### Resolving the error

To resolve the error provided in the example, try the following in the provided order:
1. Try to avoid using conditions in the dependency providers.
2. Use only the supported expressions in the `if` construct.
