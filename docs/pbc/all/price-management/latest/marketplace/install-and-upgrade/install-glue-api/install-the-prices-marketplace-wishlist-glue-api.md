---
title: Install the Prices + Marketplace Wishlist Glue API
description: This document describes how to integrate the Spryker Prices + Marketplace Wishlist Glue API feature into a Spryker Marketplace project.
template: feature-integration-guide-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/marketplace/dev/feature-integration-guides/202311.0/glue/prices-marketplace-wishlist-feature-integration.html
related:
  - title: Marketplace Wishlist feature walkthrough
    link: docs/pbc/all/shopping-list-and-wishlist/page.version/marketplace/marketplace-wishlist-feature-overview.html
---

This document describes how to integrate the Prices + Marketplace Wishlist Glue API feature into a Spryker project.


## Install feature core

Follow the steps below to install the Prices + Marketplace Wishlist Glue API feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
| --------------- | ------- | ---------- |
| Marketplace Wishlist | {{page.version}} |[Install Wishlist feature](/docs/pbc/all/shopping-list-and-wishlist/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-wishlist-feature.html) |
| Product Prices API | {{page.version}} |[Install the Product Prices Glue API](/docs/pbc/all/price-management/latest/base-shop/install-and-upgrade/install-the-product-price-glue-api.html) |


### 1) Set up behavior

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| PriceProductWishlistItemExpanderPlugin | Expands the `WishlistItem` transfer object with prices. |  | Spryker\Zed\PriceProduct\Communication\Plugin\Wishlist |
| ProductPriceRestWishlistItemsAttributesMapperPlugin | Maps prices to the `RestWishlistItemsAttributes` transfer object. |  | Spryker\Glue\ProductPricesRestApi\Plugin\Wishlist |

**src/Pyz/Zed/Wishlist/WishlistDependencyProvider.php**

```php
<?php
namespace Pyz\Zed\Wishlist;

use Spryker\Zed\PriceProduct\Communication\Plugin\Wishlist\PriceProductWishlistItemExpanderPlugin;
use Spryker\Zed\Wishlist\WishlistDependencyProvider as SprykerWishlistDependencyProvider;

class WishlistDependencyProvider extends SprykerWishlistDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\WishlistExtension\Dependency\Plugin\WishlistItemExpanderPluginInterface>
     */
    protected function getWishlistItemExpanderPlugins(): array
    {
        return [
            new PriceProductWishlistItemExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Glue/WishlistsRestApi/WishlistsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\WishlistsRestApi;

use Spryker\Glue\ProductPricesRestApi\Plugin\Wishlist\ProductPriceRestWishlistItemsAttributesMapperPlugin;
use Spryker\Glue\WishlistsRestApi\WishlistsRestApiDependencyProvider as SprykerWishlistsRestApiDependencyProvider;

class WishlistsRestApiDependencyProvider extends SprykerWishlistsRestApiDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\WishlistsRestApiExtension\Dependency\Plugin\RestWishlistItemsAttributesMapperPluginInterface>
     */
    protected function getRestWishlistItemsAttributesMapperPlugins(): array
    {
        return [
            new ProductPriceRestWishlistItemsAttributesMapperPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that `PriceProductWishlistItemExpanderPlugin` and `ProductPriceRestWishlistItemsAttributesMapperPlugin` are set up by sending the request `GET https://glue.mysprykershop.com/wishlists/{% raw %}{{wishlistId}}{% endraw %}?include=wishlist-items`. You should get the price product collection within the `attributes` in the response.

{% endinfo_block %}
