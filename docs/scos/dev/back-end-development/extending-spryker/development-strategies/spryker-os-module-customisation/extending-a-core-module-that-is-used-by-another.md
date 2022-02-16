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

This topic describes how to extend a core module that is used by another core module via bridge.

Extra consideration must be taken when extending core modules that are already in use by another module.

In the following example, we will extend the `Cart` -> `Calculation` modules.

- **Case 1.** The core module `Cart` uses the core module `Calculation`, so `CartBridge` exists. And you need an existing `CalculationFacade` method `foo()` in module `Cart`, but `CartBridge` doesn't have the method `foo()`.
 - **Case 2.** The core module `Cart` uses the core module `Calculation`, so `CartBridge` exists. And you want to introduce a new (not existing) method `foo()` in `CalculationFacade` and use it in the module `Cart`.

## Step 1: Modify the interface

Add a `foo()` method to `CalculationFacade` on the project level and call it from the `Cart` module.

The `CalculationFacade` needs to implement the `CartToCalculationInterface` because this interface is used in the `Cart` module.

## Step 1: Modify the FacadeInterface and Facade

For case 2 only: Extend `FacadeInterface` and `Facade` on the project level, add a `foo()` method.

```php
<?php
namespace Pyz\Zed\Calculation\Business;

use Spryker\Zed\Calculation\Business\CalculationFacadeInterface as SprykerCalculationFacadeInterface;

interface CalculationFacadeInterface extends SprykerCalculationFacadeInterface
{
    public function foo(string $bar): int;
}
```

```php
<?php
namespace Pyz\Zed\Calculation\Business;

use Spryker\Zed\Calculation\Business\CalculationFacade as SprykerCalculationFacade;

class CalculationFacade extends SprykerCalculationFacade implements CalculationFacadeInterface
{
    public function foo(string $bar): int
    {
        return strlen($bar) + 2;
    }
}
```

## Step 2: Modify the interface of Bridge and Bridge

To call `CalculationFacade` method `foo()` from the `Cart` module on the project level, do the following:
1. Extend Bridge and its interface from the core.
2. Add the needed method with the same signature as in `CalculationFacade`.

Constructing the method in the project bridge is required. Some doc blocks are missed, but required in real projects.

An interface example for both cases:
```php
<?php
namespace Pyz\Zed\Cart\Dependency\Facade;

use Spryker\Zed\Cart\Dependency\Facade\CartToCalculationFacadeInterface as SprykerCartToCalculationFacadeInterface;

interface CartToCalculationFacadeInterface extends SprykerCartToCalculationFacadeInterface
{
    public function foo(string $bar): int;
}
```

Bridge for case 1:
```php
<?php
namespace Pyz\Zed\Cart\Dependency\Facade;

use Spryker\Zed\Cart\Dependency\Facade\CartToCalculationFacadeBridge as SprykerCartToCalculationFacadeBridge;

class CartToCalculationFacadeBridge extends SprykerCartToCalculationFacadeBridge implements CartToCalculationFacadeInterface
{
    /**
     * @var \Spryker\Zed\Calculation\Business\CalculationFacadeInterface
     */
    protected $calculationFacade;

    /**
     * @param \Spryker\Zed\Calculation\Business\CalculationFacadeInterface $calculationFacade
     */
    public function __construct($calculationFacade)
    {
        $this->calculationFacade = $calculationFacade;
    }

    public function foo(string $bar): int
    {
        return $this->calculationFacade->foo($bar);
    }
}
```

Bridge for case 2:
```php
<?php
namespace Pyz\Zed\Cart\Dependency\Facade;

use Spryker\Zed\Cart\Dependency\Facade\CartToCalculationFacadeBridge as SprykerCartToCalculationFacadeBridge;

class CartToCalculationFacadeBridge extends SprykerCartToCalculationFacadeBridge implements CartToCalculationFacadeInterface
{
    /**
     * @var \Pyz\Zed\Calculation\Business\CalculationFacadeInterface
     */
    protected $calculationFacade;

    /**
     * @param \Pyz\Zed\Calculation\Business\CalculationFacadeInterface $calculationFacade
     */
    public function __construct($calculationFacade)
    {
        $this->calculationFacade = $calculationFacade;
    }

    public function foo(string $bar): int
    {
        return $this->calculationFacade->foo($bar);
    }
}
```

## Step 3: Override DependencyProvider method
In the `Cart` module's dependency provider, set your bridge from project level.

```php
namespace Pyz\Zed\Cart;

use Pyz\Zed\Cart\Dependency\Facade\CartToCalculationFacadeBridge;
use Pyz\Zed\Cart\Dependency\Facade\CartToCalculationFacadeInterface;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    // not override, if CalculationFacade is added to needed business/communication layer dependencies on core level
    public function provideBusinessLayerDependencies(Container $container): Container
    {
	    $container = self::provideBusinessLayerDependencies($container);
        $container = $this->addCalculationFacade($container);

        return $container;
    }

    // override on project level
    protected function addCalculationFacade(Container $container): Container
    {
        $container->set(static::FACADE_CALCULATION, function (Container $container): CartToCalculationFacadeInterface {
            return new CartToCalculationFacadeBridge(
                $container->getLocator()->eventBehavior()->facade()
            )
        });

        return $container;
    }
}
```

{% info_block infoBox %}

Inject the *project* bridge's interface in business models if they use the bridge's methods added on the project level.

{% endinfo_block %}

{% info_block infoBox "Info" %}

The described case is only practical when you are *between* two core bundles, and you want to make it right. For you own modules, use the general module interface (for example, `MyModuleInterface`).

{% endinfo_block %}
