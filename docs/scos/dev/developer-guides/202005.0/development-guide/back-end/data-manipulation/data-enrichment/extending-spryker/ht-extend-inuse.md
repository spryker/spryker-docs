---
title: Extending a Core Module That is Used by Another
originalLink: https://documentation.spryker.com/v5/docs/ht-extend-inuse-core
redirect_from:
  - /v5/docs/ht-extend-inuse-core
  - /v5/docs/en/ht-extend-inuse-core
---

This topic describes how to extend a core module that is used by another core module.

Extra consideration must be taken when extending core modules that are already in use by another module. 

In the following example, we will extend the `Cart` -> `Calculation` modules.

## Step 1: Modify the Interface
Add a `foo()` method to `CalculationFacade` on the project level and call it from the `Cart` module. 

The `CalculationFacade` needs to implement the `CartToCalculationInterface` because this interface is used in the `Cart`module. 

You can also add your own interface as follows:

```php
<?php
namespace Pyz\Zed\Cart\Dependency\Facade;

use Spryker\Zed\Cart\Dependency\Facade\CartToCalculationInterface as SprykerCartToCalculationInterface;

interface CartToCalculationInterface extends SprykerCartToCalculationInterface
{
    public function foo();
}
```

## Step 2: Add the New Method to the Interface
The interface needs to extend the one from core.

```php
<?php
namespace Pyz\Zed\Calculation\Business;

use Pyz\Zed\Cart\Dependency\Facade\CartToCalculationInterface;
use Spryker\Zed\Calculation\Business\CalculationFacade as SprykerCalculationFacade;

class CalculationFacade extends SprykerCalculationFacade implements CartToCalculationInterface
{
    public function foo()
    {
        die('<pre><b>'.print_r('!!', true).'</b>'.PHP_EOL.__CLASS__.' '.__LINE__);
    }

}
```

## Step 3: Remove the Bridge
In the `Cart` module's dependency provider, remove the bridge to directly use the facade.

```php
class CartDependencyProvider extends SprykerCartDependencyProvider
{

public function provideBusinessLayerDependencies(Container $container)
{
	self::provideBusinessLayerDependencies($container);

	$container[self::FACADE_CALCULATION] = function (Container $container) {
		return $container->getLocator()->calculation()->facade();
	};
}
```

{% info_block errorBox %}
Bridges are for core-level only. If you use them at the project-level, you are doing it wrong!
{% endinfo_block %}

{% info_block infoBox "Info" %}
The described case is only practical when you are “between” two core-bundles and you want to make it right. For you own modules, use the general module-interface (e.g. `MyModuleInterface`
{% endinfo_block %}.)
