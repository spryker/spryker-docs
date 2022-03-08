---
title: Extending a core module that is used by another
description: This topic describes how to extend a core module that is used by another core module.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-extend-inuse-core
originalArticleId: f157e550-cbc1-4224-9eb9-c48ea2a884a3
redirect_from:
  - /2021080/docs/ht-extend-inuse-core
  - /2021080/docs/en/ht-extend-inuse-core
  - /docs/ht-extend-inuse-core
  - /docs/en/ht-extend-inuse-core
  - /v6/docs/ht-extend-inuse-core
  - /v6/docs/en/ht-extend-inuse-core
  - /v5/docs/ht-extend-inuse-core
  - /v5/docs/en/ht-extend-inuse-core
  - /v4/docs/ht-extend-inuse-core
  - /v4/docs/en/ht-extend-inuse-core
  - /v3/docs/ht-extend-inuse-core
  - /v3/docs/en/ht-extend-inuse-core
  - /v2/docs/ht-extend-inuse-core
  - /v2/docs/en/ht-extend-inuse-core
  - /v1/docs/ht-extend-inuse-core
  - /v1/docs/en/ht-extend-inuse-core
  - /docs/scos/dev/back-end-development/extending-spryker/extending-a-core-module-that-is-used-by-another.html
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
The described case is only practical when you are “between” two core-bundles and you want to make it right. For you own modules, use the general module-interface (e.g. `MyModuleInterface`).
{% endinfo_block %}
