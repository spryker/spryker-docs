---
title: Product Offer + Cart feature integration
last_updated: Dec 17, 2020
description: This integration guide provides steps on how to integrate the Product Offer + Cart feature into a Spryker project.
---

## Install feature core
Follow the steps below to install the Product Offer + Cart feature core.

### Prerequisites

To start feature integration, overview, and install the necessary features:

| NAME      | VERSION  | INTEGRATION GUIDE |
| --------- | -------- | ------------------|
| Marketplace Product Offer | dev-master | [Product Offer feature integration](docs/marketplace/dev/feature-integration-guides/product-offer-feature-integration.html)
| Cart                      | 202001.0   | [Cart feature integration](https://github.com/spryker-feature/cart)

##  1) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| ------------- | ------------- | ----------- | ------------ |
| ProductOfferGroupKeyItemExpanderPlugin         | Adds Product Offer reference to group key that separates items in the cart. |  | Spryker\Zed\ProductOffer\Communication\Plugin\Cart |
| ProductOfferCartPreCheckPlugin                 | Checks if the Product Offer belongs to the product concrete before adding an item to cart. |  | Spryker\Zed\ProductOffer\Communication\Plugin\Cart |
| FilterInactiveProductOfferPreReloadItemsPlugin | Removes inactive Product Offer from cart when reloading it   |  | Spryker\Zed\ProductOffer\Communication\Plugin\Cart |

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

---
**Verification**

Make sure that inactive Product Offers get removed from cart on reload.

Make sure that it is only possible to have items in cart where the Product Offer reference belongs to the correct Product sConcrete.

---

## Install feature front end
Follow the steps below to install the Product Offer + Cart feature front end.

### Prerequisites

To start feature integration, overview, and install the necessary features:

| NAME        | VERSION    | INTEGRATION GUIDE |
| ----------- | ---------- | ------------------|
| Marketplace Product Offer | dev-master | [Product Offer feature integration](docs/marketplace/dev/feature-integration-guides/product-offer-feature-integration.html) |
| Cart                      | 202001.0   | [Cart feature integration](https://github.com/spryker-feature/cart) |

## 1) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
| - | - | - | - |
| MerchantProductOfferPreAddToCartPlugin | Sets Product Offer reference to item transfer |  | SprykerShop\Yves\MerchantProductOfferWidget\Plugin\CartPage |

**src/Pyz/Zed/Cart/CartDependencyProvider.php**

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

---
**Verification**

Make sure that the Product Offer reference (and sold by merchant) is added to CartPage when adding a Product Offer to cart.

---

## Related features

| FEATURE | REQUIRED FOR THE CURRENT FEATURE | INTEGRATION GUIDE |
| - | - | - |
| Marketplace Product Offer API + Cart API | | [Marketplace Product Offer + Cart feature integration](/docs/marketplace/dev/feature-integration-guides/glue/product-offer-cart-feature-integration.html) |
