

This document describes how to install the Marketplace Product Options + Checkout feature.


## Install feature core

Follow the steps below to install the Marketplace Product Options + Checkout feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
| --------------- | ------- | ---------- |
| Marketplace Product Options| {{page.version}}      | [Install the Marketplace Product Options feature](/docs/pbc/all/product-information-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-options-feature.html) |
| Checkout | {{page.version}} | [Install the Checkout feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-checkout-feature.html) |

### 1) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantProductOptionCheckoutPreConditionPlugin | Checks the approval status for merchant product option groups. | None | Spryker\Zed\MerchantProductOption\Communication\Plugin\Checkout |


**src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Checkout;

use Spryker\Zed\MerchantProductOption\Communication\Plugin\Checkout\MerchantProductOptionCheckoutPreConditionPlugin;
use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPreConditionPluginInterface>
     */
    protected function getCheckoutPreConditions(Container $container)
    {
        return [
            new MerchantProductOptionCheckoutPreConditionPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that validation works correctly for merchants product options with not approved status and checkout process does not go to next step.

{% endinfo_block %}
