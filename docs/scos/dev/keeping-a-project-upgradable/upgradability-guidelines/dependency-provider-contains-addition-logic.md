---
title: Dependency provider contains addition logic
description: Reference information for evaluator tools.
---

Additional logic inside the dependency provider’s methods.

## Problem description

On the project level, developers use IF constructs with variety of expressions in dependency providers to register the plugins in particular cases only.

Not all possible expressions are needed inside of the if statements for plugin registration and not all of them are supported. This check will verify that if IF construct is used for plugin registration, then only one of the following expressions is used:

```php
class_exists(\Foo\Bar::class) function call - it is required for BC reasons
```
    
```php
$this->getConfig()->isDevelopmentConsoleCommandsEnabled() function calls - it is required for plugins that are needed in development mode only (e.g.: profiling, debug, etc.)
```

## Example of code that causes an upgradability error:

The method `getFormPlugins` in `FormDependencyProvider` contains unsupported expressions in IF construct `self::IS_DEV`.

```php
use Spryker\Yves\Form\FormDependencyProvider as SprykerFormDependencyProvider;

class FormDependencyProvider extends SprykerFormDependencyProvider
{
    public const IS_DEV = true;
    
    ...
    
    protected function getFormPlugins(): array
    {
        $plugins = [
            new ValidatorExtensionFormPlugin(),
        ];
        
        $plugins[] = new CsrfFormPlugin();
        
        if (self::IS_DEV) {
            $plugins[] = new WebProfilerFormPlugin();
        }
        
        return $plugins;
    }
}
```

### Related error in the Evaluator output:

```bash
============================================
DEPENDENCY PROVIDER ADDITIONAL LOGIC CHECKER
============================================

+---+------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------+
| # | Message                                                                                              | Target                                                                   |
+---+------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------+
| 1 | The condition statement if (self::IS_DEV) {} is forbidden in the DependencyProvider                  | /spryker/b2c-demo-shop/src/Pyz/Yves/Form/FormDependencyProvider.php      |
+---+------------------------------------------------------------------------------------------------------+--------------------------------------------------------------------------+

```

### Resolving the error: Extending a private API form class

To resolve the error provided in the example, try the following in the provided order:
1. Try to avoid using conditions in dependency providers.
2. Use only the supported expressions in IF construct.
