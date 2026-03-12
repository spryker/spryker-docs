---
title: Yves widget performance best practices
description: Learn how to optimize Yves widget rendering performance by applying static caching for widget services, the URL generator, and product storage data mapping.
last_updated: Mar 12, 2026
template: concept-topic-template
---

Yves renders widgets on almost every page request. In high-traffic environments, the cumulative cost of repeated object instantiation and data mapping across widget render calls can become a significant performance bottleneck. This document describes the underlying causes and the optimization package set that addresses them.

## Install the optimization

Run the following command to install the required packages:

```bash
composer update \
  spryker/navigation-storage:"^1.12.0" \
  spryker/product-group-storage:"^1.6.0" \
  spryker/product-storage:"^1.49.0" \
  spryker/router:"^1.26.0" \
  spryker-shop/catalog-page:"^1.35.0" \
  spryker-shop/cms-block-widget:"^2.4.0" \
  spryker-shop/content-navigation-widget:"^1.6.0" \
  spryker-shop/product-group-widget:"^1.12.0" \
  spryker-shop/product-review-widget:"^1.18.0" \
  spryker-shop/shop-application:"^1.17.0" \
  spryker-shop/shop-ui:"^1.103.0" \
  spryker/store-storage:"^1.3.0"
```

Release group [SOL-477](https://api.release.spryker.com/release-group/6374)

## Configure navigation caching

The `spryker-shop/content-navigation-widget` package supports request-scoped caching for navigation data. After installing the packages, you need to enable caching and configure the revalidation time.

### 1. Enable navigation caching

Override `ContentNavigationWidgetConfig` at the project level to enable the feature:

**`src/Pyz/Yves/ContentNavigationWidget/ContentNavigationWidgetConfig.php`**

```php
<?php

namespace Pyz\Yves\ContentNavigationWidget;

use SprykerShop\Yves\ContentNavigationWidget\ContentNavigationWidgetConfig as SprykerShopContentNavigationWidgetConfig;

class ContentNavigationWidgetConfig extends SprykerShopContentNavigationWidgetConfig
{
    public function isNavigationCacheEnabled(): bool
    {
        return true;
    }
}
```

### 2. Set the cache revalidation time

Add the revalidation TTL constant to your shared configuration files.

**`config/Shared/config_default.php`** (production):

```php
use SprykerShop\Shared\ContentNavigationWidget\ContentNavigationWidgetConstants;

$config[ContentNavigationWidgetConstants::NAVIGATION_REVALIDATION_TIME_IN_SECONDS] = 3600;
```

**`config/Shared/config_default-docker.dev.php`** (local development):

```php
use SprykerShop\Shared\ContentNavigationWidget\ContentNavigationWidgetConstants;

$config[ContentNavigationWidgetConstants::NAVIGATION_REVALIDATION_TIME_IN_SECONDS] = 300;
```

{% info_block infoBox "Revalidation time" %}

The revalidation time controls how long the cached navigation data is considered fresh. A value of `3600` seconds (1 hour) is recommended for production. For local development, use a shorter value like `300` seconds (5 minutes) to avoid stale navigation during active development.

{% endinfo_block %}

## Breaking change: ProductGroupWidget removed from default templates

`spryker-shop/shop-ui` 1.103.0 removes `ProductGroupWidget` rendering from the `groups` blocks in the following default templates:

- `product-card` molecule
- `product-item` molecule
- `product-list-item` molecule

If your project relies on color group rendering in product cards, you must update your project-level Twig templates to explicitly include `ProductGroupWidget` in the relevant blocks.

{% info_block warningBox "Check your product card templates" %}

After upgrading, verify that product group (color swatch) rendering still works as expected on catalog, search results, and any custom product listing pages. If color groups are missing, add the `ProductGroupWidget` call back to the affected template blocks at the project level.

{% endinfo_block %}
