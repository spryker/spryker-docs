---
title: Merchant Switcher + Wishlist feature integration
last_updated: Oct 08, 2021
description: This document describes the process how to integrate the Merchant Switcher + Wishlist feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Merchant Switcher + Wishlist feature into a Spryker project.

## Install feature core

Follow the steps below to install the Merchant Switcher + Wishlist feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE  |
|-|-|-|
| Merchant Switcher | {{page.version}} | [Merchant Switcher feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/merchant-switcher-feature-integration.html)|
| Marketplace Wishlist | {{page.version}} | [Marketplace Wishlist feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-wishlist-feature-integration.html) |

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
  * @return \Spryker\Zed\WishlistExtension\Dependency\Plugin\WishlistReloadItemsPluginInterface[]
  */
 protected function getWishlistReloadItemsPlugins(): array
 {
     return [
         new SingleMerchantWishlistReloadItemsPlugin(),
     ];
 }

 /**
  * @return \Spryker\Zed\WishlistExtension\Dependency\Plugin\WishlistItemsValidatorPluginInterface[]
  */
 protected function getWishlistItemsValidatorPlugins(): array
 {
     return [
         new SingleMerchantWishlistItemsValidatorPlugin(),
     ];
 }
}
```
