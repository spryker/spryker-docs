This document describes how to integrate the Marketplace Inventory Management + Wishlist Glue API feature into a Spryker project.


## Install feature core

Follow the steps below to install the Marketplace Inventory Management + Wishlist Glue API feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
| --------------- | ------- | ---------- |
| Marketplace Wishlist | 202507.0 |[Install Wishlist feature](/docs/pbc/all/shopping-list-and-wishlist/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-wishlist-feature.html) |
| Marketplace Inventory Management API | 202507.0 | [Install the Inventory Management Glue API](/docs/pbc/all/warehouse-management-system/latest/marketplace/install-glue-api/install-the-marketplace-inventory-management-glue-api.html) |

### 1) Set up behavior

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| AvailabilityWishlistItemExpanderPlugin | Expands the `WishlistItem` transfer object with product concrete availability. |  | Spryker\Zed\Availability\Communication\Plugin\Wishlist |
| SellableWishlistItemExpanderPlugin | Expands the `WishlistItem` transfer object with sellable status. |  | Spryker\Zed\Availability\Communication\Plugin\Wishlist |
| ProductAvailabilityRestWishlistItemsAttributesMapperPlugin | Maps availability data to the `RestWishlistItemsAttributes` transfer object. |  | Spryker\Glue\ProductAvailabilitiesRestApi\Plugin\Wishlist |

**src/Pyz/Zed/Wishlist/WishlistDependencyProvider.php**

```php
<?php
namespace Pyz\Zed\Wishlist;

use Spryker\Zed\Availability\Communication\Plugin\Wishlist\AvailabilityWishlistItemExpanderPlugin;
use Spryker\Zed\Availability\Communication\Plugin\Wishlist\SellableWishlistItemExpanderPlugin;
use Spryker\Zed\Wishlist\WishlistDependencyProvider as SprykerWishlistDependencyProvider;

class WishlistDependencyProvider extends SprykerWishlistDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\WishlistExtension\Dependency\Plugin\WishlistItemExpanderPluginInterface>
     */
    protected function getWishlistItemExpanderPlugins(): array
    {
        return [
            new AvailabilityWishlistItemExpanderPlugin(),
            new SellableWishlistItemExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Glue/WishlistsRestApi/WishlistsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\WishlistsRestApi;

use Spryker\Glue\ProductAvailabilitiesRestApi\Plugin\Wishlist\ProductAvailabilityRestWishlistItemsAttributesMapperPlugin;
use Spryker\Glue\WishlistsRestApi\WishlistsRestApiDependencyProvider as SprykerWishlistsRestApiDependencyProvider;

class WishlistsRestApiDependencyProvider extends SprykerWishlistsRestApiDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\WishlistsRestApiExtension\Dependency\Plugin\RestWishlistItemsAttributesMapperPluginInterface>
     */
    protected function getRestWishlistItemsAttributesMapperPlugins(): array
    {
        return [
            new ProductAvailabilityRestWishlistItemsAttributesMapperPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that `AvailabilityWishlistItemExpanderPlugin` and `ProductAvailabilityRestWishlistItemsAttributesMapperPlugin` are set up by sending the request `GET https://glue.mysprykershop.com/wishlists/{% raw %}{{wishlistId}}{% endraw %}?include=wishlist-items`. You should get the `quantity` value within the `attributes` in the response.

Make sure that `SellableWishlistItemExpanderPlugin` is set up by sending the request `GET https://glue.mysprykershop.com/wishlists/{% raw %}{{wishlistId}}{% endraw %}?include=wishlist-items`. You should get `availability` value within the `attributes` in the response.

{% endinfo_block %}
