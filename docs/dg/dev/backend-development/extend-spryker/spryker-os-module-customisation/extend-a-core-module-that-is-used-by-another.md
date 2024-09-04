---
title: Extend a core module that is used by another one
description: This document describes how to extend a core module that is used by another core module.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-extend-inuse-core
originalArticleId: f157e550-cbc1-4224-9eb9-c48ea2a884a3
redirect_from:
  - /docs/scos/dev/back-end-development/extend-spryker/spryker-os-module-customisation/extend-a-core-module-that-is-used-by-another.html
  - /docs/scos/dev/back-end-development/extend-spryker/extending-a-core-module-that-is-used-by-another.html
  - /docs/scos/dev/back-end-development/extend-spryker/spryker-os-module-customisation/extending-a-core-module-that-is-used-by-another.html
related:
  - title: Extend the core
    link: docs/scos/dev/back-end-development/extend-spryker/spryker-os-module-customisation/extend-the-core.html
  - title: Extend the Spryker Core functionality
    link: docs/scos/dev/back-end-development/extend-spryker/spryker-os-module-customisation/extend-the-spryker-core-functionality.html
---

This document describes how to extend a core module that is used by another core module.

Extra consideration must be taken when extending core modules that are already in use by another module.

The following example extends the `Cart` -> `Calculation` modules.

## 1. Modify the interface

Add the `foo()` method to `CalculationFacade` on the project level and call it from the `Cart` module.

The `CalculationFacade` needs to implement the `CartToCalculationInterface` because this interface is used in the `Cart` module.

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

## 2. Add the new method to the interface

The interface needs to extend one from the core.

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

## 3. Remove the bridge

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

## 4. Update Factories

In the modules, where `CartFacade` is used, update module's business factory with the new interface.

```php
use Pyz\Zed\Cart\Dependency\Facade\CartToCalculationInterface;

class CheckoutBusnessFactory extends SprykerCheckoutBusnessFactory
{
...
	/**
	 * @return \Pyz\Zed\Cart\Dependency\Facade\CartToCalculationInterface
	 */
	public function getCalculationFacade(): CartToCalculationInterface
	{
		return $this->getProvidedDependency(CartDependencyProvider::FACADE_CALCULATION);
	}
...
}
```

{% info_block errorBox %}

Bridges are for core-level only. If you use them at the project level, you are doing it wrong.

Spryker is constantly improving type declarations of all methods. Thus, some bridge interfaces might be incompatible with Facade interfaces, so this approach does not work. To prevent this, consider module version patch-lock.

{% endinfo_block %}

{% info_block infoBox "Info" %}

The described case is only practical when you are "between" two core bundles, and you want to make it right. For your own modules, use the general module interface—for example, `MyModuleInterface`.

{% endinfo_block %}
