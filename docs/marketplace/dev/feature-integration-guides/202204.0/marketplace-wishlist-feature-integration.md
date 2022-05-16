---
title: Marketplace Wishlist feature integration
last_updated: Jul 05, 2021
Description: This document describes the process how to integrate the Marketplace wishlist feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Wishlist feature into a Spryker project.


## Install feature core

Follow the steps below to install the Marketplace Wishlist feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
| --------------- | ------- | ---------- |
| Spryker Core         | {{page.version}}      | [Spryker Core Feature Integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/spryker-core-feature-integration.html) |
| Marketplace Merchant | {{page.version}}      | [Marketplace Merchant Feature Integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-merchant-feature-integration.html) |
| Marketplace Product + Marketplace Product Offer | {{page.version}} | [Marketplace Product + Marketplace Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-marketplace-product-offer-feature-integration.html) |


### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker-feature/marketplace-wishlist:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| MerchantProductOfferWishlist | vendor/spryker/merchant-product-offer-wishlist |
| MerchantProductWishlist | vendor/spryker/merchant-product-offer-wishlist |

{% endinfo_block %}


### 2) Set up database schema and transfer objects

Generate transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY |	TYPE |	EVENT |
|-|-|-|
| spy_wishlist_item.merchant_reference | column |	created |
| spy_wishlist_item.product_offer_reference | column |	created |

Make sure  the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
|-|-|-|-|
| WishlistItem.productOfferReference | property | Created | src/Generated/Shared/Transfer/WishlistItemTransfer |
| WishlistItem.merchantReference | property | Created | src/Generated/Shared/Transfer/WishlistItemTransfer |
| WishlistMoveToCartRequest.productOfferReference | property | Created | src/Generated/Shared/Transfer/WishlistMoveToCartRequestTransfer |
| WishlistMoveToCartRequest.merchantReference | property | Created | src/Generated/Shared/Transfer/WishlistMoveToCartRequestTransfer |
| WishlistItemCriteria.productOfferReference | property | Created | src/Generated/Shared/Transfer/WishlistItemCriteriaTransfer |
| WishlistItemCriteria.merchantReference | property | Created | src/Generated/Shared/Transfer/WishlistItemCriteriaTransfer |

{% endinfo_block %}


### 3) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| WishlistProductOfferPostMoveToCartCollectionExpanderPlugin | Expands `WishlistMoveToCartRequestCollection` transfer object with not valid product offers as request items. | None | Spryker\Client\WishlistExtension\Dependency\Plugin |
| WishlistMerchantProductPostMoveToCartCollectionExpanderPlugin | Expands `WishlistMoveToCartRequestCollection` transfer object with not valid marketplace products as request items. | None | Spryker\Client\WishlistExtension\Dependency\Plugin |
| WishlistProductOfferCollectionToRemoveExpanderPlugin | Expands `WishlistItemCollectionTransfer` transfer object with product offer reference. | None | Spryker\Client\WishlistExtension\Dependency\Plugin |
| WishlistMerchantProductCollectionToRemoveExpanderPlugin | Expands `WishlistItemCollection` transfer object with merchant product wishlist items from the `WishlistMoveToCartRequestCollection` transfer object. | None | Spryker\Client\WishlistExtension\Dependency\Plugin |
| MerchantProductWishlistItemRequestExpanderPlugin | Expands `WishlistItem` transfer by provided merchant_reference in params. | None | SprykerShop\Yves\MerchantProductWidget\Plugin\WishlistPage |
| MerchantProductOfferWishlistItemRequestExpanderPlugin | Expands `WishlistItem` transfer by provided `product_offer_reference` in params. | None | SprykerShop\Yves\MerchantProductOfferWidget\Plugin\WishlistPage |
| MerchantProductWishlistItemMetaFormExpanderPlugin | Expands `WishlistItemMetaFormType` with hidden field for 'merchant_reference'. | None | SprykerShop\Yves\MerchantProductWidget\Plugin\WishlistPage |
| MerchantProductOfferWishlistItemMetaFormExpanderPlugin | Expands `WishlistItemMetaFormType` with hidden fields for `merchant_reference` and `product_offer_reference`. | None | SprykerShop\Yves\MerchantProductOfferWidget\Plugin\WishlistPage |
| WishlistMerchantProductPreAddItemPlugin | Expands `WishlistItemMetaFormType` with hidden fields for `merchant_reference` and `product_offer_reference`. | None | Spryker\Zed\MerchantProductWishlist\Communication\Plugin\Wishlist |
| WishlistProductOfferPreAddItemPlugin | Expands `WishlistItemMetaFormType` with hidden fields for `merchant_reference` and `product_offer_reference`. | None | Spryker\Zed\MerchantProductOfferWishlist\Communication\Plugin\Wishlist |


**src/Pyz/Client/Wishlist/WishlistDependencyProvider.php**

```php
<?php

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

**src/Pyz/Yves/WishlistPage/WishlistPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\WishlistPage;

use SprykerShop\Yves\MerchantProductOfferWidget\Plugin\WishlistPage\MerchantProductOfferWishlistItemMetaFormExpanderPlugin;
use SprykerShop\Yves\MerchantProductOfferWidget\Plugin\WishlistPage\MerchantProductOfferWishlistItemRequestExpanderPlugin;
use SprykerShop\Yves\MerchantProductWidget\Plugin\WishlistPage\MerchantProductWishlistItemMetaFormExpanderPlugin;
use SprykerShop\Yves\MerchantProductWidget\Plugin\WishlistPage\MerchantProductWishlistItemRequestExpanderPlugin;
use SprykerShop\Yves\WishlistPage\WishlistPageDependencyProvider as SprykerWishlistPageDependencyProvider;

class WishlistPageDependencyProvider extends SprykerWishlistPageDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\WishlistPageExtension\Dependency\Plugin\WishlistItemRequestExpanderPluginInterface[]
     */
    protected function getWishlistItemRequestExpanderPlugins(): array
    {
        return [
            new MerchantProductWishlistItemRequestExpanderPlugin(),
            new MerchantProductOfferWishlistItemRequestExpanderPlugin(),
        ];
    }

    /**
     * @return \SprykerShop\Yves\WishlistPageExtension\Dependency\Plugin\WishlistItemMetaFormExpanderPluginInterface[]
     */
    protected function getWishlistItemMetaFormExpanderPlugins(): array
    {
        return [
            new MerchantProductWishlistItemMetaFormExpanderPlugin(),
            new MerchantProductOfferWishlistItemMetaFormExpanderPlugin(),
        ];
    }
}
```

```php
<?php

namespace Pyz\Zed\Wishlist;

use Spryker\Zed\MerchantProductOfferWishlist\Communication\Plugin\Wishlist\WishlistProductOfferPreAddItemPlugin;
use Spryker\Zed\MerchantProductWishlist\Communication\Plugin\Wishlist\WishlistMerchantProductPreAddItemPlugin;
use Spryker\Zed\Wishlist\WishlistDependencyProvider as SprykerWishlistDependencyProvider;

class WishlistDependencyProvider extends SprykerWishlistDependencyProvider
{
    /**
     * @return \Spryker\Zed\WishlistExtension\Dependency\Plugin\WishlistPreAddItemPluginInterface[]
     */
    protected function getWishlistPreAddItemPlugins(): array
    {
        return [
            new WishlistMerchantProductPreAddItemPlugin(),
            new WishlistProductOfferPreAddItemPlugin(),
        ];
    }
}
```


{% info_block warningBox "Verification" %}

- Make sure that you can add a product offer to a wishlist and see the product offer data in there.
- Make sure that you can see the merchant information when the merchant product is added to the wishlist.
- Make sure that you can move the wishlist with the product offers to a shopping cart and vice versa.

{% endinfo_block %}

