

This document describes how to install the Marketplace Product Options + Cart feature.


## Install feature core

Follow the steps below to install the Marketplace Product Options + Cart feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
| --------------- | ------- | ---------- |
| Marketplace Product Options| {{page.version}}      | [Marketplace Product Options feature Integration](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-options-feature.html) |
| Cart | {{page.version}}   | [Install the Cart feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-cart-feature.html)

### 1) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantProductOptionCartPreCheckPlugin | Checks the approval status for the merchant product options. | None | Spryker\Zed\MerchantProductOption\Communication\Plugin\Cart |


**src/Pyz/Zed/Cart/CartDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\MerchantProductOption\Communication\Plugin\Cart\MerchantProductOptionCartPreCheckPlugin;
use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\CartExtension\Dependency\Plugin\CartPreCheckPluginInterface>
     */
    protected function getCartPreCheckPlugins(Container $container): array
    {
        return [
            new MerchantProductOptionCartPreCheckPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that validation works correctly with merchants product options in the cart and displays an error in case if any is not approved.

{% endinfo_block %}
