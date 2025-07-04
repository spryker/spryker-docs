This document describes how to integrate the Marketplace Product Offer Prices + Wishlist Glue API feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Product Offer Prices + Wishlist Glue API feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
| --------------- | ------- | ---------- |
| Marketplace Wishlist | 202507.0 |[Install Wishlist feature](/docs/pbc/all/shopping-list-and-wishlist/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-wishlist-feature.html) |
| Marketplace Product Offer Prices API | 202507.0 |[Install the Product Offer Prices Glue API](/docs/pbc/all/price-management/latest/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-offer-prices-glue-api.html) |


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
     * @return array<\Spryker\Zed\WishlistExtension\Dependency\Plugin\WishlistItemExpanderPluginInterface>
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
     * @return array<\Spryker\Zed\PriceProductOfferExtension\Dependency\Plugin\PriceProductOfferExtractorPluginInterface>
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

Make sure that `PriceProductOfferWishlistItemExpanderPlugin` is set up by sending the request `GET https://glue.mysprykershop.com/wishlists/{% raw %}{{wishlistId}}{% endraw %}?include=wishlist-items`. You should get the price product collection within the `attributes` in the response.

Make sure that `PriceProductOfferVolumeExtractorPlugin` is set up by sending the request `GET https://glue.mysprykershop.com/wishlists/{% raw %}{{wishlistId}}{% endraw %}?include=wishlist-items,selected-product-offers,product-offer-prices`. You should get the product offer volume prices within the `prices` in the response.

{% endinfo_block %}
