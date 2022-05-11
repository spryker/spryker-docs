---
title: Marketplace Product + Cart feature integration
last_updated: Dec 16, 2020
description: This document describes the process how to integrate the Marketplace Product + Cart feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Product + Cart feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Product + Cart feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE  |
|-|-|-|
| Spryker Core | {{page.version}} | [Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/spryker-core-feature-integration.html)  |
| Marketplace Product | {{page.version}} | [Marketplace Product feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-feature-integration.html)|
| Cart | {{page.version}} | [Cart Feature Integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/cart-feature-integration.html) |

### 1) Set up transfer objects

Generate transfer changes:
```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
|-|-|-|-|
| Item.merchantReference | property | Created | src/Generated/Shared/Transfer/ItemTransfer |

{% endinfo_block %}

### 2) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantProductCartPreCheckPlugin | Validates that merchant references in the cart items match existing marketplace products. |  | Spryker\Zed\MerchantProduct\Communication\Plugin\Cart |
| MerchantProductPreAddToCartPlugin | Sets merchant reference to item transfer on add to cart. |  | SprykerShop\Yves\MerchantProductWidget\Plugin\CartPage |

**src/Pyz/Zed/Merchant/MerchantDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\MerchantProduct\Communication\Plugin\Cart\MerchantProductCartPreCheckPlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\CartPreCheckPluginInterface[]
     */
    protected function getCartPreCheckPlugins(Container $container): array
    {
        return [
            new MerchantProductCartPreCheckPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that you can’t add an item with `merchantReference` and `sku` that do not belong to the same `MerchantProduct`(see `spy_merchant_product_abstract`).

{% endinfo_block %}

**src/Pyz/Yves/CartPage/CartPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\CartPage;

use SprykerShop\Yves\CartPage\CartPageDependencyProvider as SprykerCartPageDependencyProvider;
use SprykerShop\Yves\MerchantProductWidget\Plugin\CartPage\MerchantProductPreAddToCartPlugin;

class CartPageDependencyProvider extends SprykerCartPageDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\CartPageExtension\Dependency\Plugin\PreAddToCartPluginInterface[]
     */
    protected function getPreAddToCartPlugins(): array
    {
        return [
            new MerchantProductPreAddToCartPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that when you add a merchant product to cart, it has `merchantReference` set. (Can be checked in the `spy_quote` table).

{% endinfo_block %}
