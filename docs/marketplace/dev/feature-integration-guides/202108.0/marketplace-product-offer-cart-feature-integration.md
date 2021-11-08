---
title: Marketplace Product Offer + Cart feature integration
last_updated: Dec 17, 2020
description: This integration guide provides steps on how to integrate the Marketplace Product Offer + Cart feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Product Offer + Car feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Product Offer + Cart feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME      | VERSION  | INTEGRATION GUIDE |
| --------- | -------- | ------------------|
| Marketplace Product Offer | {{page.version}} | [Marketplace Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-offer-feature-integration.html)
| Cart | {{page.version}}   | [Cart feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/cart-feature-integration.html)

### Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| ------------- | ------------- | ----------- | ------------ |
| ProductOfferGroupKeyItemExpanderPlugin         | Adds a product offer reference to group key that separates items in the cart. |  | Spryker\Zed\ProductOffer\Communication\Plugin\Cart |
| ProductOfferCartPreCheckPlugin                 | Checks if the product offer belongs to the concrete product before adding an item to cart. |  | Spryker\Zed\ProductOffer\Communication\Plugin\Cart |
| FilterInactiveProductOfferPreReloadItemsPlugin | Removes an inactive product offer from cart when reloading it.   |  | Spryker\Zed\ProductOffer\Communication\Plugin\Cart |

<details>
<summary markdown='span'>src/Pyz/Zed/Cart/CartDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\ProductOffer\Communication\Plugin\Cart\FilterInactiveProductOfferPreReloadItemsPlugin;
use Spryker\Zed\ProductOffer\Communication\Plugin\Cart\ProductOfferCartPreCheckPlugin;
use Spryker\Zed\ProductOffer\Communication\Plugin\Cart\ProductOfferGroupKeyItemExpanderPlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\ItemExpanderPluginInterface[]
     */
    protected function getExpanderPlugins(Container $container): array
    {
        return [
            new ProductOfferGroupKeyItemExpanderPlugin(),
        ];
    }
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\CartPreCheckPluginInterface[]
     */
    protected function getCartPreCheckPlugins(Container $container): array
    {
        return [
            new ProductOfferCartPreCheckPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\PreReloadItemsPluginInterface[]
     */
    protected function getPreReloadPlugins(Container $container): array
    {
        return [
            new FilterInactiveProductOfferPreReloadItemsPlugin(),
        ];
    }
}
```

</details>

{% info_block warningBox "Verification" %}

Make sure that inactive product offers get removed from cart on reload.

Make sure that it is only possible to have items in cart where the product offer reference belongs to the correct concrete product.

{% endinfo_block %}

## Install feature front end

Follow the steps below to install the Marketplace Product Offer + Cart feature front end.

### Prerequisites

To start feature integration, overview, and install the necessary features:

| NAME        | VERSION    | INTEGRATION GUIDE |
| ----------- | ---------- | ------------------|
| Marketplace Product Offer | {{page.version}} | [Marketplace Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-offer-feature-integration.html) |
| Cart                      | {{page.version}}   | [Cart feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/cart-feature-integration.html) |

### Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
| - | - | - | - |
| MerchantProductOfferPreAddToCartPlugin | Sets the product offer reference to the item transfer |  | SprykerShop\Yves\MerchantProductOfferWidget\Plugin\CartPage |

**src/Pyz/Yves/Cart/CartDependencyProvider.php**

```
<?php

namespace Pyz\Yves\CartPage;

use SprykerShop\Yves\CartPage\CartPageDependencyProvider as SprykerCartPageDependencyProvider;
use SprykerShop\Yves\MerchantProductOfferWidget\Plugin\CartPage\MerchantProductOfferPreAddToCartPlugin;

class CartPageDependencyProvider extends SprykerCartPageDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\CartPageExtension\Dependency\Plugin\PreAddToCartPluginInterface[]
     */
    protected function getPreAddToCartPlugins(): array
    {
        return [
            new MerchantProductOfferPreAddToCartPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the product offer reference (and sold by merchant) is added to the *Cart* page when adding a product offer to cart.

{% endinfo_block %}

## Related features

| FEATURE | REQUIRED FOR THE CURRENT FEATURE | INTEGRATION GUIDE |
| - | - | - |
| Marketplace Product Offer + Cart API | | [Glue API: Marketplace Product Offer + Cart feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-offer-cart-feature-integration.html) |
