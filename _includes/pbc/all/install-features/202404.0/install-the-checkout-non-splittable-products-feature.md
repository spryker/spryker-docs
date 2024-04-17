

This document describes how to install the Checkout + Non-splittable Products feature.

## Install feature core

Follow the steps below to install the Checkout + Non-splittable Products feature core.

### Prerequisites

Install the required features:

| NAME                    | VERSION          |
|-------------------------|------------------|
| Checkout                | {{page.version}} |
| Non-splittable Products | {{page.version}} |

### 1) Adjust concrete product quantity

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

* Add any product to the cart with quantity ≥ 5 and begin the checkout process.
* Add product quantity restrictions (Min Qty = 1, Max Qty = 4, Qty Interval = 1) for this product via data import.
* Proceed with checkout and go to the summary page.
* Check that you see an error message that the product maximum quantity is exceeded and `Place Order` button is disabled. 

{% endinfo_block %}
