---
title: "Glue API: Marketplace Inventory Management + Wishlist feature integration"
description: This document describes how to integrate the Marketplace Inventory Management + Wishlist Glue API feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Inventory Management + Wishlist Glue API feature into a Spryker project.


## Install feature core

Follow the steps below to install the Marketplace Inventory Management + Wishlist Glue API feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
| --------------- | ------- | ---------- |
| Marketplace Wishlist | {{page.version}} |[Wishlist feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-wishlist-feature-integration.html) |
| Marketplace Inventory Management API | {{page.version}} | [Glue API: Inventory Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-inventory-management-feature-integration.html) |

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
     * @return \Spryker\Zed\WishlistExtension\Dependency\Plugin\WishlistItemExpanderPluginInterface[]
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
     * @return \Spryker\Glue\WishlistsRestApiExtension\Dependency\Plugin\RestWishlistItemsAttributesMapperPluginInterface[]
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

Make sure that `AvailabilityWishlistItemExpanderPlugin` and `ProductAvailabilityRestWishlistItemsAttributesMapperPlugin` are set up by sending the request `GET http://glue.mysprykershop.com/wishlists/{% raw %}{{wishlistId}}{% endraw %}?include=wishlist-items`. You should get the `quantity` value within the `attributes` in the response.

Make sure that `SellableWishlistItemExpanderPlugin` is set up by sending the request `GET http://glue.mysprykershop.com/wishlists/{% raw %}{{wishlistId}}{% endraw %}?include=wishlist-items`. You should get `availability` value within the `attributes` in the response.

{% endinfo_block %}
