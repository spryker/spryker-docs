

This document describes how to install the Marketplace Product Offer + Car feature.

## Install feature core

Follow the steps below to install the Marketplace Product Offer + Cart feature core.

### Prerequisites

Install the required features:

| NAME      | VERSION  | INSTALLATION GUIDE |
| --------- | -------- | ------------------|
| Marketplace Product Offer | {{page.version}} | [Install the Marketplace Product Offer feature](/docs/pbc/all/offer-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-feature.html) |
| Cart | {{page.version}}   | [Install the Cart feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-cart-feature.html) |

### Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| ------------- | ------------- | ----------- | ------------ |
| ProductOfferGroupKeyItemExpanderPlugin         | Adds a product offer reference to group key that separates items in the cart. |  | Spryker\Zed\ProductOffer\Communication\Plugin\Cart |
| ProductOfferCartPreCheckPlugin                 | Checks if the product offer belongs to the concrete product before adding an item to cart. |  | Spryker\Zed\ProductOffer\Communication\Plugin\Cart |
| FilterInactiveProductOfferPreReloadItemsPlugin | Removes an inactive product offer from cart when reloading it.   |  | Spryker\Zed\ProductOffer\Communication\Plugin\Cart |

<details>
<summary>src/Pyz/Zed/Cart/CartDependencyProvider.php</summary>

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
     * @return array<\Spryker\Zed\CartExtension\Dependency\Plugin\ItemExpanderPluginInterface>
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
     * @return array<\Spryker\Zed\CartExtension\Dependency\Plugin\CartPreCheckPluginInterface>
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
     * @return array<\Spryker\Zed\CartExtension\Dependency\Plugin\PreReloadItemsPluginInterface>
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

Make sure that it's only possible to have items in cart where the product offer reference belongs to the correct concrete product.

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the Marketplace Product Offer + Cart feature frontend.

### Prerequisites

To start feature integration, overview, and install the necessary features:

| NAME        | VERSION    | INSTALLATION GUIDE |
| ----------- | ---------- | ------------------|
| Marketplace Product Offer | {{page.version}} | [Install the Marketplace Product Offer feature](/docs/pbc/all/offer-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-feature.html) |
| Cart                      | {{page.version}}   | [Install the Cart feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-cart-feature.html) |

### Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
| - | - | - | - |
| MerchantProductOfferPreAddToCartPlugin | Sets the product offer reference to the item transfer |  | SprykerShop\Yves\MerchantProductOfferWidget\Plugin\CartPage |

**src/Pyz/Yves/CartPage/CartPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\CartPage;

use SprykerShop\Yves\CartPage\CartPageDependencyProvider as SprykerCartPageDependencyProvider;
use SprykerShop\Yves\MerchantProductOfferWidget\Plugin\CartPage\MerchantProductOfferPreAddToCartPlugin;

class CartPageDependencyProvider extends SprykerCartPageDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\CartPageExtension\Dependency\Plugin\PreAddToCartPluginInterface>
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

## Install related features

| FEATURE | REQUIRED FOR THE CURRENT FEATURE | INSTALLATION GUIDE |
| - | - | - |
| Marketplace Product Offer + Cart API | | [Install the Marketplace Product Offer + Cart Glue API](/docs/pbc/all/offer-management/latest/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-offer-cart-glue-api.html) |
