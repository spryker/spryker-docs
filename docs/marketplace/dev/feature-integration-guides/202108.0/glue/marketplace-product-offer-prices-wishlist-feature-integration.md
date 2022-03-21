---
title: "Glue API: Marketplace Product Offer Prices + Wishlist feature integration"
description: This document describes how to integrate the Marketplace Product Offer Prices + Wishlist Glue API feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Product Offer Prices + Wishlist Glue API feature into a Spryker project.


## Install feature core

Follow the steps below to install the Marketplace Product Offer Prices + Wishlist Glue API feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
| --------------- | ------- | ---------- |
| Marketplace Wishlist | {{page.version}} |[Wishlist feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-wishlist-feature-integration.html) |
| Marketplace Product Offer Prices API | {{page.version}} |[Glue API: Product Offer Prices feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-offer-prices-feature-integration.html) |


### 1) Set up behavior

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| PriceProductOfferWishlistItemExpanderPlugin | Expands the `WishlistItem` transfer object with product offer prices. |  | Spryker\Zed\PriceProductOffer\Communication\Plugin\Wishlist |
| PriceProductOfferVolumeExtractorPlugin | Extracts volume prices from the price product offer collection. |  | Spryker\Zed\PriceProductOfferVolume\Communication\Plugin\PriceProductOffer |

**src/Pyz/Zed/Wishlist/WishlistDependencyProvider.php**

```php
<?php
namespace Pyz\Zed\Wishlist;

use Spryker\Zed\PriceProductOffer\Communication\Plugin\Wishlist\PriceProductOfferWishlistItemExpanderPlugin;
use Spryker\Zed\Wishlist\WishlistDependencyProvider as SprykerWishlistDependencyProvider;

class WishlistDependencyProvider extends SprykerWishlistDependencyProvider
{
    /**
     * @return \Spryker\Zed\WishlistExtension\Dependency\Plugin\WishlistItemExpanderPluginInterface[]
     */
    protected function getWishlistItemExpanderPlugins(): array
    {
        return [
            new PriceProductOfferWishlistItemExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/PriceProductOffer/PriceProductOfferDependencyProvider.php**

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

{% info_block warningBox "Verification" %}

Make sure that `PriceProductOfferWishlistItemExpanderPlugin` is set up by sending the request `GET http://glue.mysprykershop.com/wishlists/{% raw %}{{wishlistId}}{% endraw %}?include=wishlist-items`. You should get the price product collection within the `attributes` in the response.

Make sure that `PriceProductOfferVolumeExtractorPlugin` is set up by sending the request `GET http://glue.mysprykershop.com/wishlists/{% raw %}{{wishlistId}}{% endraw %}?include=wishlist-items,selected-product-offers,product-offer-prices`. You should get the product offer volume prices within the `prices` in the response.

{% endinfo_block %}