

This document describes how to install the Checkout + Non-splittable Products feature.

## Prerequisites

Install the required features:

| NAME                    | VERSION          |
|-------------------------|------------------|
| Checkout                | {{page.version}} |
| Non-splittable Products | {{page.version}} |

## Adjust concrete product quantity

Add the following plugins to your project:

| PLUGIN                                               | SPECIFICATION                                                                    | PREREQUISITES | NAMESPACE                                                 |
|------------------------------------------------------|----------------------------------------------------------------------------------|---------------|-----------------------------------------------------------|
| ProductQuantityRestrictionCheckoutPreConditionPlugin | Validates if quote items fulfill all quantity restriction rules during checkout. |               | Spryker\Zed\ProductQuantity\Communication\Plugin\Checkout |

**src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php**
```php
<?php

namespace Pyz\Zed\Checkout;

use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\ProductQuantity\Communication\Plugin\Checkout\ProductQuantityRestrictionCheckoutPreConditionPlugin;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPreConditionPluginInterface>
     */
    protected function getCheckoutPreConditions(Container $container): array
    {
        return [
            new ProductQuantityRestrictionCheckoutPreConditionPlugin(),
        ];
    }
}

```

{% info_block warningBox "Verification" %}

1. Add any product to the cart with quantity ≥ 5 and begin the checkout process.
2. Add product quantity restrictions for this product via data import: Min Qty = 1, Max Qty = 4, Qty Interval = 1.
3. Proceed with checkout and go to the summary page.
On the summary page, make sure the error about the maximum product quantity being exceeded is displayed. And the `Place Order` button should be disabled.

{% endinfo_block %}
