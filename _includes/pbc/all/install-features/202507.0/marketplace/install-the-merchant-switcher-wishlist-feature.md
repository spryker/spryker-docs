

This document describes how to install the Merchant Switcher + Wishlist feature.

## Install feature core

Follow the steps below to install the Merchant Switcher + Wishlist feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE  |
|-|-|-|
| Merchant Switcher | 202507.0 | [Install the Merchant Switcher feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-merchant-switcher-feature.html)|
| Marketplace Wishlist | 202507.0 | [Install the Marketplace Wishlist feature](/docs/pbc/all/shopping-list-and-wishlist/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-wishlist-feature.html) |

### 1) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| SingleMerchantWishlistReloadItemsPlugin | Expands `WishlistItemMetaFormType` with the hidden fields for the `merchant_reference` and the `product_offer_reference`. |  | Spryker\Zed\MerchantSwitcher\Communication\Plugin\Wishlist |
| SingleMerchantWishlistItemsValidatorPlugin | Expands `WishlistItemMetaFormType` with the hidden fields for the `merchant_reference` and the `product_offer_reference`. |  | Spryker\Zed\MerchantSwitcher\Communication\Plugin\Wishlist |

```php
<?php

namespace Pyz\Zed\Wishlist;

use Spryker\Zed\MerchantSwitcher\Communication\Plugin\Wishlist\SingleMerchantWishlistItemsValidatorPlugin;
use Spryker\Zed\MerchantSwitcher\Communication\Plugin\Wishlist\SingleMerchantWishlistReloadItemsPlugin;

class WishlistDependencyProvider extends SprykerWishlistDependencyProvider
{
 /**
  * @return array<\Spryker\Zed\WishlistExtension\Dependency\Plugin\WishlistReloadItemsPluginInterface>
  */
 protected function getWishlistReloadItemsPlugins(): array
 {
     return [
         new SingleMerchantWishlistReloadItemsPlugin(),
     ];
 }

 /**
  * @return array<\Spryker\Zed\WishlistExtension\Dependency\Plugin\WishlistItemsValidatorPluginInterface>
  */
 protected function getWishlistItemsValidatorPlugins(): array
 {
     return [
         new SingleMerchantWishlistItemsValidatorPlugin(),
     ];
 }
}
```
