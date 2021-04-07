---
title: Product Offer + Cart feature integration 
last_updated: Dec 17, 2020
summary: This integration guide provides steps on how to integrate the Product Offer + Cart feature into a Spryker project.
---

## Install feature core
Follow the steps below to install the Product Offer + Cart feature core.

### Prerequisites

To start feature integration, overview, and install the necessary features:

| Name                      | Version    |
| ----------------------- | -------- |
| Marketplace Product Offer | dev-master |
| Cart                      | 202001.0   |

##  1) Set up behavior

Enable the following behaviors by registering the plugins:

| Plugin    | Description    | Prerequisites | Namespace  |
| ----------------------- | ----------------- | ----------- | ------------------- |
| ProductOfferGroupKeyItemExpanderPlugin         | Adds Product Offer reference to group key that separates items in the cart. | None          | Spryker\Zed\ProductOffer\Communication\Plugin\Cart |
| ProductOfferCartPreCheckPlugin                 | Checks if the Product Offer belongs to the product concrete before adding an item to cart. | None          | Spryker\Zed\ProductOffer\Communication\Plugin\Cart |
| FilterInactiveProductOfferPreReloadItemsPlugin | Removes inactive Product Offer from cart when reloading it   | None          | Spryker\Zed\ProductOffer\Communication\Plugin\Cart |

src/Pyz/Zed/Cart/CartDependencyProvider.php

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


1. Make sure that inactive Product Offers get removed from cart on reload.

2. Make sure that it is only possible to have items in cart where the Product Offer reference belongs to the correct Product Concrete

## Install feature front end
Follow the steps below to install the Product Offer + Cart feature front end.


### Prerequisites

To start feature integration, overview, and install the necessary features:

| Name                      | Version    |
| ------------------------ | --------- |
| Marketplace Product Offer | dev-master |
| Cart                      | 202001.0   |

## 1) Set up behavior

Enable the following behaviors by registering the plugins:

| Plugin    | Description   | Prerequisites | Namespace  |
| -------------------- | ------------------ | ----------- | ---------------------- |
| MerchantProductOfferPreAddToCartPlugin | Sets Product Offer reference to item transfer | None          | SprykerShop\Yves\MerchantProductOfferWidget\Plugin\CartPage |

src/Pyz/Zed/Cart/CartDependencyProvider.php

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

1. Make sure that Product Offer reference (and sold by merchant) is added to CartPage when adding a Product Offer to cart

## Related features

| Feature                                  | Link                                                         |
| :--------------------------------------- | :----------------------------------------------------------- |
| Marketplace Product Offer API + Cart API | [[WIP\] GLUE: Marketplace Offers Feature + Cart Integration - ongoing](https://spryker.atlassian.net/wiki/spaces/DOCS/pages/1950974003) |