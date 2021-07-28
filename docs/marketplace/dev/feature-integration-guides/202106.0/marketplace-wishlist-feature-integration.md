---
title: Marketplace Wishlist feature integration
last_updated: Jul 05, 2020
Description: This document describes the process how to integrate the Marketplace wishlist feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Wishlist feature into a Spryker project.


## Install feature core

Follow the steps below to install the Marketplace Wishlist feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | LINK |
| --------------- | ------- | ---------- |
| Spryker Core         | master      | [Spryker Core Feature Integration](https://documentation.spryker.com/docs/spryker-core-feature-integration) |
| Marketplace Merchant | master      | [Marketplace Merchant Feature Integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-merchant-feature-integration.html) |
| Marketplace Product + Marketplace Product Offer | master | [Marketplace Product + Marketplace Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-product-marketplace-product-offer-feature-integration.html) |


### 1) Install the required modules using Composer

1) Install the required modules:

```bash
composer require spryker-feature/marketplace-wishlist:"dev-master" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| MerchantProductOfferWishlist | vendor/spryker/merchant-product-offer-wishlist |
| MerchantProductWishlist | vendor/spryker/merchant-product-offer-wishlist |
| MerchantWidget | vendor/spryker-shop/merchant-widget |
| WishlistPageExtension | vendor/spryker-shop/wishlist-page-extension |

{% endinfo_block %}

### 2) Add Yves translations
Add Yves translations:

1. Append glossary according to your configuration:

**data/import/common/common/glossary.csv**
```
merchant.sold_by,Sold by,en_US
merchant.sold_by,Verkauft durch,de_DE
merchant_switcher.message.product_is_not_available,"Product %product_name% (SKU %sku%) is not available from the selected merchant. Please remove it in order to proceed or switch the merchant.",en_US
merchant_switcher.message.product_is_not_available,"Produkt %product_name% (SKU %sku%) ist beim ausgewählten Händler nicht erhältlich. Bitte diesen Artikel entfernen, um fortzufahren oder den Händler zu wechseln.",de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the `spy_glossary` table in the database.

{% endinfo_block %}

### 3) Set up database schema and transfer objects

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
| WishlistMoveToCartRequestCollection | object | Created | src/Generated/Shared/Transfer/WishlistMoveToCartRequestCollectionTransfer |
| WishlistItemCollection | object | Created | src/Generated/Shared/Transfer/WishlistItemCollectionTransfer |
| Quote | object | Created | src/Generated/Shared/Transfer/QuoteTransfer |
| WishlistItem.merchantReference | attribute | Created | src/Generated/Shared/Transfer/WishlistItemTransfer |
| WishlistItem.productOfferReference | attribute | Created | src/Generated/Shared/Transfer/WishlistItemTransfer |
| WishlistItemMeta.merchantReference | attribute | Created | src/Generated/Shared/Transfer/WishlistItemMetaTransfer |
| WishlistItemMeta.productOfferReference | attribute | Created | src/Generated/Shared/Transfer/WishlistItemMetaTransfer |
| Item | object | Created | src/Generated/Shared/Transfer/ItemTransfer |
| MerchantCriteria | object | Created | src/Generated/Shared/Transfer/MerchantCriteriaTransfer |
| Merchant | object | Created | src/Generated/Shared/Transfer/MerchantTransfer |
| WishlistMoveToCartRequest.merchantReference | attribute | Created | src/Generated/Shared/Transfer/WishlistMoveToCartRequestTransfer |
| WishlistMoveToCartRequest.productOfferReference | attribute | Created | src/Generated/Shared/Transfer/WishlistMoveToCartRequestTransfer |
| ProductOffer | object | Created | src/Generated/Shared/Transfer/ProductOfferTransfer |
| WishlistItemCriteria | object | Created | src/Generated/Shared/Transfer/WishlistItemCriteriaTransfer |
| WishlistPreAddItemCheckResponse | object | Created | src/Generated/Shared/Transfer/WishlistPreAddItemCheckResponseTransfer |
| ProductOfferCriteriaFilter | object | Created | src/Generated/Shared/Transfer/ProductOfferCriteriaFilterTransfer |
| MerchantProductCriteria | object | Created | src/Generated/Shared/Transfer/MerchantProductCriteriaTransfer |
| Merchant | object | Created | src/Generated/Shared/Transfer/MerchantTransfer |
| MerchantSwitchRequest.wishlist | attribute | Created | src/Generated/Shared/Transfer/MerchantSwitchRequestTransfer |
| MerchantSwitchResponse.wishlist | attribute | Created | src/Generated/Shared/Transfer/MerchantSwitchResponseTransfer |

{% endinfo_block %}


### 4) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| WishlistProductOfferPostMoveToCartCollectionExpanderPlugin | Expands `WishlistMoveToCartRequestCollection` transfer object with not valid product offers as request items. | None | Spryker\Client\WishlistExtension\Dependency\Plugin |
| WishlistMerchantProductPostMoveToCartCollectionExpanderPlugin | Expands `WishlistMoveToCartRequestCollection` transfer object with not valid merchant products as request items. | None | Spryker\Client\WishlistExtension\Dependency\Plugin |
| WishlistProductOfferCollectionToRemoveExpanderPlugin | Expands `WishlistItemCollectionTransfer` transfer object with product offer reference. | None | Spryker\Client\WishlistExtension\Dependency\Plugin |
| WishlistMerchantProductCollectionToRemoveExpanderPlugin | Expands `WishlistItemCollection` transfer object with merchant product wishlist items from the `WishlistMoveToCartRequestCollection` transfer object. | None | Spryker\Client\WishlistExtension\Dependency\Plugin |
| MerchantProductWishlistItemRequestExpanderPlugin | Expands `WishlistItem` transfer by provided merchant_reference in params. | None | SprykerShop\Yves\MerchantProductWidget\Plugin\WishlistPage |
| MerchantProductOfferWishlistItemRequestExpanderPlugin | Expands `WishlistItem` transfer by provided `product_offer_reference` in params. | None | SprykerShop\Yves\MerchantProductOfferWidget\Plugin\WishlistPage |
| MerchantProductWishlistItemMetaFormExpanderPlugin | Expands `WishlistItemMetaFormType` with hidden field for 'merchant_reference'. | None | SprykerShop\Yves\MerchantProductWidget\Plugin\WishlistPage |
| MerchantProductOfferWishlistItemMetaFormExpanderPlugin | Expands `WishlistItemMetaFormType` with hidden fields for `merchant_reference` and `product_offer_reference`. | None | SprykerShop\Yves\MerchantProductOfferWidget\Plugin\WishlistPage |
| SingleMerchantWishlistReloadItemsPlugin | Expands `WishlistItemMetaFormType` with hidden fields for `merchant_reference` and `product_offer_reference`. | None | Spryker\Zed\MerchantSwitcher\Communication\Plugin\Wishlist |
| SingleMerchantWishlistItemsValidatorPlugin | Expands `WishlistItemMetaFormType` with hidden fields for `merchant_reference` and `product_offer_reference`. | None | Spryker\Zed\MerchantSwitcher\Communication\Plugin\Wishlist |
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
use Spryker\Zed\MerchantSwitcher\Communication\Plugin\Wishlist\SingleMerchantWishlistItemsValidatorPlugin;
use Spryker\Zed\MerchantSwitcher\Communication\Plugin\Wishlist\SingleMerchantWishlistReloadItemsPlugin;
use Spryker\Zed\Wishlist\WishlistDependencyProvider as SprykerWishlistDependencyProvider;

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


#### Register `SoldByMerchant` to global widgets

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\MerchantWidget\Widget\SoldByMerchantWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return string[]
     */
    protected function getGlobalWidgets(): array
    {
        return [
            // ...
            SoldByMerchantWidget::class,
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that you can add a product offer to a wishlist and see the product offer data in there.
Make sure that you can see the merchant information when the merchant product is added to the wishlist.
Make sure that you can move the wishlist with the product offers to a shopping cart and vice versa.

{% endinfo_block %}

