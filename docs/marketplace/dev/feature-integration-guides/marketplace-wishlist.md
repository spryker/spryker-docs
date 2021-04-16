---
title: Marketplace wishlist feature integration
last_updated:
summary: This document describes the process how to integrate the Marketplace wishlist feature into a Spryker project.
---

## Install Feature Core
Follow the steps below to install the Marketplace wishlist feature core.

### Prerequisites

To start feature integration, overview and install the necessary features:

| Name            | Version | Link        |
| --------------- | -------- | ------------------ |
| Spryker Core         | master      | [Spryker Core Feature Integration](https://spryker.atlassian.net/wiki/spaces/DOCS/pages/900924310) |
| Marketplace Merchant | master      | [Marketplace Merchant Feature Integration](https://spryker.atlassian.net/wiki/spaces/DOCS/pages/1876853120) |


### 1) Install the required modules using Composer

1) Install the required modules:

```bash
composer require spryker-feature/marketplace-wishlist:"dev-master" --update-with-dependencies
```
Make sure the following modules have been installed:

| Module | Expected Directory |
|-|-|
| MerchantProductOfferWishlist | vendor/spryker/merchant-product-offer-wishlist |
| MerchantProductWishlist | vendor/spryker/merchant-product-offer-wishlist |

### 2) Set up behavior
Enable the following behaviors by registering the plugins:

| Plugin | Description | Prerequisites | Namespace |
|-|-|-|-|
| WishlistProductOfferPostMoveToCartCollectionExpanderPlugin | Expands WishlistMoveToCartRequestCollection transfer object with not valid product offers as request items. | None | Spryker\Client\WishlistExtension\Dependency\Plugin |
| WishlistMerchantProductPostMoveToCartCollectionExpanderPlugin | Expands WishlistMoveToCartRequestCollection transfer object with not valid merchant products as request items. | None | Spryker\Client\WishlistExtension\Dependency\Plugin |
| WishlistProductOfferCollectionToRemoveExpanderPlugin | Expands WishlistItemCollectionTransfer transfer object with product offer reference. | None | Spryker\Client\WishlistExtension\Dependency\Plugin |
| WishlistMerchantProductCollectionToRemoveExpanderPlugin | Expands WishlistItemCollection transfer object with merchant product wishlist items from WishlistMoveToCartRequestCollection transfer object. | None | Spryker\Client\WishlistExtension\Dependency\Plugin |


**src/Pyz/Client/Wishlist/WishlistDependencyProvider.php**

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Client\Wishlist;

use Spryker\Client\MerchantProductOfferWishlist\Plugin\Wishlist\WishlistProductOfferCollectionToRemoveExpanderPlugin;
use Spryker\Client\MerchantProductOfferWishlist\Plugin\Wishlist\WishlistProductOfferPostMoveToCartCollectionExpanderPlugin;
use Spryker\Client\MerchantProductWishlist\Plugin\Wishlist\WishlistMerchantProductCollectionToRemoveExpanderPlugin;
use Spryker\Client\MerchantProductWishlist\Plugin\Wishlist\WishlistMerchantProductPostMoveToCartCollectionExpanderPlugin;
use Spryker\Client\Wishlist\WishlistDependencyProvider as SprykerWishlistDependencyProvider;

class WishlistDependencyProvider extends SprykerWishlistDependencyProvider
{
    /**
     * @return \Spryker\Client\WishlistExtension\Dependency\Plugin\WishlistPostMoveToCartCollectionExpanderPluginInterface[]
     */
    protected function getWishlistPostMoveToCartCollectionExpanderPlugins(): array
    {
        return [
            new WishlistProductOfferPostMoveToCartCollectionExpanderPlugin(),
            new WishlistMerchantProductPostMoveToCartCollectionExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Client\WishlistExtension\Dependency\Plugin\WishlistCollectionToRemoveExpanderPluginInterface[]
     */
    protected function getWishlistCollectionToRemoveExpanderPlugins(): array
    {
        return [
            new WishlistProductOfferCollectionToRemoveExpanderPlugin(),
            new WishlistMerchantProductCollectionToRemoveExpanderPlugin(),
        ];
    }
}
```

Make sure you can add product offer to wishlist and see product offer data in there.
Make sure you can see merchant information in case of merchant product is added.
Make sure you can move wishlist with product offers to card and vise versa.


### 3) Set up database schema and transfer objects

Run the following command to generate transfer changes:

```
console transfer:generate
console propel:install
console transfer:generate
```
**Verification**

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY |	TYPE |	EVENT |
|-|-|-|
| spy_wishlist_item.merchant_reference | column |	created |
| spy_wishlist_item.product_offer_reference | column |	created |

Make sure  the following changes have been applied in transfer objects:

| Transfer | Type | Event | Path |
|-|-|-|-|
| WishlistMoveToCartRequestCollection | object | Created | src/Generated/Shared/Transfer/WishlistMoveToCartRequestCollectionTransfer |
| WishlistItemCollection | object | Created | src/Generated/Shared/Transfer/WishlistItemCollectionTransfer |
| Quote | object | Created | src/Generated/Shared/Transfer/QuoteTransfer |
| WishlistItem | object | Created | src/Generated/Shared/Transfer/WishlistItemTransfer |
| Item | object | Created | src/Generated/Shared/Transfer/ItemTransfer |
| MerchantCriteria | object | Created | src/Generated/Shared/Transfer/MerchantCriteriaTransfer |
| Merchant | object | Created | src/Generated/Shared/Transfer/MerchantTransfer |
| WishlistMoveToCartRequest | object | Created | src/Generated/Shared/Transfer/WishlistMoveToCartRequestTransfer |
| ProductOffer | object | Created | src/Generated/Shared/Transfer/ProductOfferTransfer |
| WishlistItemCriteria | object | Created | src/Generated/Shared/Transfer/WishlistItemCriteriaTransfer |
| WishlistPreAddItemCheckResponse | object | Created | src/Generated/Shared/Transfer/WishlistPreAddItemCheckResponseTransfer |
| ProductOfferCriteriaFilter | object | Created | src/Generated/Shared/Transfer/ProductOfferCriteriaFilterTransfer |
| MerchantProductCriteria | object | Created | src/Generated/Shared/Transfer/MerchantProductCriteriaTransfer |
| Merchant | object | Created | src/Generated/Shared/Transfer/MerchantTransfer |

## Install Feature Frontend
### Prerequisites

| Name            | Version | Link        |
| --------------- | -------- | ------------------ |
| Spryker Core         | master      | [Spryker Core Feature Integration](https://spryker.atlassian.net/wiki/spaces/DOCS/pages/900924310) |
| Merchant | master      | [Merchant Feature Integration](https://spryker.atlassian.net/wiki/spaces/DOCS/pages/1025277972) |

### 1) Install the required modules using Сomposer 

If installed before, not needed.

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| MerchantWidget | spryker-shop/merchant-widget |
