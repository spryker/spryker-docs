---
title: Glue API - Marketplace Product Offer + Wishlist feature integration
last_updated: May 7, 2021
description: This document describes how to integrate the Marketplace Product Offer + Wishlist Glue API feature into a Spryker project.
---

This document describes how to integrate the Product Offer + Wishlist Glue API feature into a Spryker project.

## Install feature core
Follow the steps below to install the Marketplace Product Offer + Wishlist Glue API feature core.

### Prerequisites
To start feature integration, overview, and install the necessary features:

| NAME | VERSION | INTEGRATION GUIDE |
|-|-|-|
| Marketplace Wishlist | dev-master |[Wishlist feature integration](/docs/marketplace/dev/feature-integration-guides/marketplace-wishlist-feature-integration.html) |

### 1) Install the required modules using Composer
Install the required modules:

```bash
composer require spryker/merchant-product-offer-wishlist-rest-api:"^0.1.0" --update-with-dependencies
```

---

**Verification**

Make sure that the following modules were installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| MerchantProductOfferWishlistRestApi | spryker/merchant-product-offer-wishlist-rest-api |

---

### 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

---
**Verification**

Make sure that the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
|-|-|-|-|
| MerchantProductCriteria.productConcreteSkus  | attribute | Created | src/Generated/Shared/Transfer/MerchantProductCriteriaTransfer |
| WishlistItem.prices  | attribute | Created | src/Generated/Shared/Transfer/WishlistItemTransfer |
| WishlistItem.productConcreteAvailability  | attribute | Created | src/Generated/Shared/Transfer/WishlistItemTransfer |
| WishlistItem.isSellable  | attribute | Created | src/Generated/Shared/Transfer/WishlistItemTransfer |
| WishlistItemRequest.productOfferReference  | attribute | Created | src/Generated/Shared/Transfer/WishlistItemRequestTransfer |
| WishlistItemRequest.uuid  | attribute | Created | src/Generated/Shared/Transfer/WishlistItemRequestTransfer |
| WishlistItemCriteria.idWishlistItem  | attribute | Created | src/Generated/Shared/Transfer/WishlistItemCriteriaTransfer |
| RestWishlistItemsAttributes.prices  | attribute | Created | src/Generated/Shared/Transfer/RestWishlistItemsAttributesTransfer |
| RestWishlistItemsAttributes.productOfferReference  | attribute | Created | src/Generated/Shared/Transfer/RestWishlistItemsAttributesTransfer |
| RestWishlistItemsAttributes.merchantReference  | attribute | Created | src/Generated/Shared/Transfer/RestWishlistItemsAttributesTransfer |
| RestWishlistItemsAttributes.availability  | attribute | Created | src/Generated/Shared/Transfer/RestWishlistItemsAttributesTransfer |
| RestWishlistItemsAttributes.id  | attribute | Created | src/Generated/Shared/Transfer/RestWishlistItemsAttributesTransfer |
| RestProductConcreteAvailability.isNeverOutOfStock  | attribute | Created | src/Generated/Shared/Transfer/RestProductConcreteAvailabilityTransfer |
| RestProductConcreteAvailability.availability  | attribute | Created | src/Generated/Shared/Transfer/RestProductConcreteAvailabilityTransfer |
| RestProductConcreteAvailability.quantity  | attribute | Created | src/Generated/Shared/Transfer/RestProductConcreteAvailabilityTransfer |

---

#### Enable resources and relationships

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| PriceProductWishlistItemExpanderPlugin | Expands `WishlistItem` transfer object with prices |  | Spryker\Zed\PriceProduct\Communication\Plugin\Wishlist |
| PriceProductOfferWishlistItemExpanderPlugin | Expands `WishlistItem` transfer object with product offer prices |  | Spryker\Zed\PriceProductOffer\Communication\Plugin\Wishlist |
| AvailabilityWishlistItemExpanderPlugin | Expands `WishlistItem` transfer object with product concrete availability |  | Spryker\Zed\Availability\Communication\Plugin\Wishlist |
| SellableWishlistItemExpanderPlugin | Expands `WishlistItem` transfer object with sellable status |  | Spryker\Zed\Availability\Communication\Plugin\Wishlist |
| MerchantProductOfferAddItemPreCheckPlugin | Returns `WishlistPreAddItemCheckResponse.isSuccess=false` if no one product offers found by `WishlistItem.productOfferReference` transfer property |  | Spryker\Zed\MerchantProductOfferWishlist\Communication\Plugin\Wishlist |
| ProductPriceRestWishlistItemsAttributesMapperPlugin | Maps prices to RestWishlistItemsAttributes transfer object |  | Spryker\Glue\ProductPricesRestApi\Plugin\Wishlist |
| ProductAvailabilityRestWishlistItemsAttributesMapperPlugin | Maps availability data to `RestWishlistItemsAttributes` transfer object |  | Spryker\Glue\ProductAvailabilitiesRestApi\Plugin\Wishlist |
| ProductOfferRestWishlistItemsAttributesMapperPlugin | Populates `RestWishlistItemsAttributes.id` with the following pattern: `{WishlistItem.sku}_{WishlistItemTransfer.productOfferReference}` |  | Spryker\Glue\MerchantProductOfferWishlistRestApi\Plugin\Wishlist |
| PriceProductOfferVolumeExtractorPlugin | Extracts volume prices from price product offer collection |  | Spryker\Zed\PriceProductOfferVolume\Communication\Plugin\PriceProductOffer |
| ProductOfferRestWishlistItemsAttributesDeleteStrategyPlugin | Checks if requested wishlist item is exist in wishlist item collection. |  | Spryker\Zed\MerchantProductOfferWishlistRestApi\Communication\Plugin |
| EmptyProductOfferRestWishlistItemsAttributesDeleteStrategyPlugin | Checks if requested wishlist item is exist in wishlist item collection |  | Spryker\Zed\MerchantProductOfferWishlistRestApi\Communication\Plugin |

<details><summary markdown='span'>src/Pyz/Zed/Wishlist/WishlistDependencyProvider.php</summary>

```php
<?php
namespace Pyz\Zed\Wishlist;

use Spryker\Zed\Availability\Communication\Plugin\Wishlist\AvailabilityWishlistItemExpanderPlugin;
use Spryker\Zed\Availability\Communication\Plugin\Wishlist\SellableWishlistItemExpanderPlugin;
use Spryker\Zed\PriceProduct\Communication\Plugin\Wishlist\PriceProductWishlistItemExpanderPlugin;
use Spryker\Zed\PriceProductOffer\Communication\Plugin\Wishlist\PriceProductOfferWishlistItemExpanderPlugin;
use Spryker\Zed\MerchantProductOfferWishlist\Communication\Plugin\Wishlist\MerchantProductOfferAddItemPreCheckPlugin;

class WishlistDependencyProvider extends SprykerWishlistDependencyProvider
{
    /**
     * @return \Spryker\Zed\WishlistExtension\Dependency\Plugin\WishlistItemExpanderPluginInterface[]
     */
    protected function getWishlistItemExpanderPlugins(): array
    {
        return [
            new PriceProductWishlistItemExpanderPlugin(),
            new PriceProductOfferWishlistItemExpanderPlugin(),
            new AvailabilityWishlistItemExpanderPlugin(),
            new SellableWishlistItemExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\WishlistExtension\Dependency\Plugin\AddItemPreCheckPluginInterface[]
     */
    protected function getAddItemPreCheckPlugins(): array
    {
        return [
            new MerchantProductOfferAddItemPreCheckPlugin(),
        ];
    }

}
```
</details>

<details><summary markdown='span'>src/Pyz/Glue/WishlistsRestApi/WishlistsRestApiDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\WishlistsRestApi;

use Spryker\Glue\MerchantProductOfferWishlistRestApi\Plugin\Wishlist\ProductOfferRestWishlistItemsAttributesMapperPlugin;
use Spryker\Glue\ProductAvailabilitiesRestApi\Plugin\Wishlist\ProductAvailabilityRestWishlistItemsAttributesMapperPlugin;
use Spryker\Glue\ProductPricesRestApi\Plugin\Wishlist\ProductPriceRestWishlistItemsAttributesMapperPlugin;
use Spryker\Glue\WishlistsRestApi\WishlistsRestApiDependencyProvider as SprykerWishlistsRestApiDependencyProvider;

class WishlistsRestApiDependencyProvider extends SprykerWishlistsRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\WishlistsRestApiExtension\Dependency\Plugin\RestWishlistItemsAttributesMapperPluginInterface[]
     */
    protected function getRestWishlistItemsAttributesMapperPlugins(): array
    {
        return [
            new ProductPriceRestWishlistItemsAttributesMapperPlugin(),
            new ProductAvailabilityRestWishlistItemsAttributesMapperPlugin(),
            new ProductOfferRestWishlistItemsAttributesMapperPlugin(),
        ];
    }
}
```
</details>



<details><summary markdown='span'>src/Pyz/Zed/PriceProductOffer/PriceProductOfferDependencyProvider.php</summary>

```php
<?php
namespace Pyz\Zed\PriceProductOffer;

use Spryker\Zed\PriceProductOffer\PriceProductOfferDependencyProvider as SprykerPriceProductOfferDependencyProvider;
use Spryker\Zed\PriceProductOfferVolume\Communication\Plugin\PriceProductOffer\PriceProductOfferVolumeExtractorPlugin;

class PriceProductOfferDependencyProvider extends SprykerPriceProductOfferDependencyProvider
{
    /**
     * @return \Spryker\Zed\PriceProductOfferExtension\Dependency\Plugin\PriceProductOfferExtractorPluginInterface[]
     */
    protected function getPriceProductOfferExtractorPlugins(): array
    {
        return [
            new PriceProductOfferVolumeExtractorPlugin(),
        ];
    }
}
```
</details>


<details><summary markdown='span'>src/Pyz/Zed/WishlistsRestApi/WishlistsRestApiDependencyProvider.php</summary>

```php
<?php
namespace Pyz\Zed\WishlistsRestApi;

use Spryker\Zed\MerchantProductOfferWishlistRestApi\Communication\Plugin\EmptyProductOfferRestWishlistItemsAttributesDeleteStrategyPlugin;
use Spryker\Zed\MerchantProductOfferWishlistRestApi\Communication\Plugin\ProductOfferRestWishlistItemsAttributesDeleteStrategyPlugin;
use Spryker\Zed\WishlistsRestApi\WishlistsRestApiDependencyProvider as SprykerWishlistsRestApiDependencyProvider;

class WishlistsRestApiDependencyProvider extends SprykerWishlistsRestApiDependencyProvider
{
    /**
     * @return \Spryker\Zed\WishlistsRestApiExtension\Dependency\Plugin\RestWishlistItemsAttributesDeleteStrategyPluginInterface[]
     */
    protected function getRestWishlistItemsAttributesDeleteStrategyPlugins(): array
    {
        return [
            new ProductOfferRestWishlistItemsAttributesDeleteStrategyPlugin(),
            new EmptyProductOfferRestWishlistItemsAttributesDeleteStrategyPlugin(),
        ];
    }
}
```
</details>

---

**Verification**

Make sure that the `PriceProductWishlistItemExpanderPlugin`, `PriceProductOfferWishlistItemExpanderPlugin` and `ProductPriceRestWishlistItemsAttributesMapperPlugin` plugins are set up by sending the request `GET http://glue.mysprykershop.com/wishlists/{% raw %}{{wishlistId}}{% endraw %}?include=wishlist-items`. You should get the price product collection within the `attributes` in the response. 

Make sure that the `AvailabilityWishlistItemExpanderPlugin` and `ProductAvailabilityRestWishlistItemsAttributesMapperPlugin` plugins are set up by sending the request `GET http://glue.mysprykershop.com/wishlists/{% raw %}{{wishlistId}}{% endraw %}?include=wishlist-items`. You should get `quantity` within the `attributes` in the response.

Make sure that the `ProductOfferRestWishlistItemsAttributesMapperPlugin` plugin is set up by sending the request `GET http://glue.mysprykershop.com/wishlists/{% raw %}{{wishlistId}}{% endraw %}?include=wishlist-items`. You should get the `attributes` in the response.

Make sure that the `SellableWishlistItemExpanderPlugin` plugin is set up by sending the request `GET http://glue.mysprykershop.com/wishlists/{% raw %}{{wishlistId}}{% endraw %}?include=wishlist-items`. You should get `availability` within the `attributes` in the response.

Make sure that the `MerchantProductOfferAddItemPreCheckPlugin` plugin is set up by sending the request `POST http://glue.mysprykershop.com/wishlists/{% raw %}{{wishlistId}}{% endraw %}/wishlist-items`. You should have the wishlist item added only when the product has the specified offer reference.

Make sure that the `PriceProductOfferVolumeExtractorPlugin` plugin is set up by sending the request `GET http://glue.mysprykershop.com/wishlists/{% raw %}{{wishlistId}}{% endraw %}?include=wishlist-items,selected-product-offers,product-offer-prices`. You should get the product offer volume prices within `prices` in the response.

Make sure that the `ProductOfferRestWishlistItemsAttributesDeleteStrategyPlugin` and `EmptyProductOfferRestWishlistItemsAttributesDeleteStrategyPlugin` plugins are set up by sending the request `DELETE http://glue.mysprykershop.com/wishlists/{% raw %}{{wishlistId}}{% endraw %}/wishlist-items/{% raw %}{{wishlistItemId}}{% endraw %}`. You should get the  product offer wishlist item deleted.

---
