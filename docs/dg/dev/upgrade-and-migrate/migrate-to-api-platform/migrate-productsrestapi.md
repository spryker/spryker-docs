---
title: "Migrate ProductsRestApi to API Platform"
description: Step-by-step guide to migrate the ProductsRestApi module to the API Platform Product module.
last_updated: Mar 31, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `ProductsRestApi` Glue module to the API Platform `Product` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

## Overview

The `ProductsRestApi` module provided the following storefront endpoints:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `GET /abstract-products/{abstractProductSku}` | Get abstract product | `AbstractProductsResourceRoutePlugin` |
| `GET /concrete-products/{concreteProductSku}` | Get concrete product | `ConcreteProductsResourceRoutePlugin` |

These are now served by the API Platform `Product` module.

## 1. Update module dependencies

```bash
composer require spryker/product:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugins from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugins from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `AbstractProductsResourceRoutePlugin` | `Spryker\Glue\ProductsRestApi\Plugin\AbstractProductsResourceRoutePlugin` |
| `ConcreteProductsResourceRoutePlugin` | `Spryker\Glue\ProductsRestApi\Plugin\ConcreteProductsResourceRoutePlugin` |

## 3. Remove relationship plugins from GlueApplicationDependencyProvider

In the same file, remove the following relationship plugin registrations from `getResourceRelationshipPlugins()`:

| Plugin to remove | Fully qualified class name | Was registered on resource |
|---|---|---|
| `ProductAbstractByProductAbstractSkuResourceRelationshipPlugin` | `Spryker\Glue\ProductsRestApi\Plugin\GlueApplication\ProductAbstractByProductAbstractSkuResourceRelationshipPlugin` | `concrete-products` |
| `ProductAbstractBySkuResourceRelationshipPlugin` | `Spryker\Glue\ProductsRestApi\Plugin\GlueApplication\ProductAbstractBySkuResourceRelationshipPlugin` | `promotional-items` |

{% info_block warningBox "Retained relationship plugins" %}

Several product-related relationship plugins must remain registered because they serve legacy Glue endpoints that have not been migrated yet (wishlists, related-products, upselling-products, configurable-bundle-templates). See the relationship plugin status table below.

{% endinfo_block %}

## 4. Create Product Glue dependency provider

Create a new file `src/Pyz/Glue/Product/ProductDependencyProvider.php`. This file does not exist yet in your project.

```php
<?php

declare(strict_types = 1);

namespace Pyz\Glue\Product;

use Spryker\Glue\Product\ProductDependencyProvider as SprykerProductDependencyProvider;
use Spryker\Glue\ProductAttribute\Plugin\Product\MultiSelectAttributeAbstractProductExpanderPlugin;
use Spryker\Glue\ProductAttribute\Plugin\Product\MultiSelectAttributeConcreteProductExpanderPlugin;
use Spryker\Glue\ProductConfiguration\Plugin\Product\ProductConfigurationConcreteProductExpanderPlugin;
use Spryker\Glue\ProductDiscontinued\Plugin\Product\ProductDiscontinuedConcreteProductExpanderPlugin;
use Spryker\Glue\ProductReview\Plugin\Product\ProductReviewAbstractProductExpanderPlugin;
use Spryker\Glue\ProductReview\Plugin\Product\ProductReviewConcreteProductExpanderPlugin;

class ProductDependencyProvider extends SprykerProductDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\ProductExtension\Dependency\Plugin\AbstractProductsStorefrontResourceExpanderPluginInterface>
     */
    protected function getAbstractProductsStorefrontResourceExpanderPlugins(): array
    {
        return [
            new ProductReviewAbstractProductExpanderPlugin(),
            new MultiSelectAttributeAbstractProductExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\ProductExtension\Dependency\Plugin\ConcreteProductsStorefrontResourceExpanderPluginInterface>
     */
    protected function getConcreteProductsStorefrontResourceExpanderPlugins(): array
    {
        return [
            new ProductDiscontinuedConcreteProductExpanderPlugin(),
            new ProductReviewConcreteProductExpanderPlugin(),
            new ProductConfigurationConcreteProductExpanderPlugin(),
            new MultiSelectAttributeConcreteProductExpanderPlugin(),
        ];
    }
}
```

## 5. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

| Plugin | Status |
|---|---|
| `ProductAbstractByProductAbstractSkuResourceRelationshipPlugin` (`ProductsRestApi`) | Removed. Concrete-to-abstract relationship is now handled by the `Product` module through the `include` parameter. |
| `ProductAbstractBySkuResourceRelationshipPlugin` (`ProductsRestApi`) | Removed. Promotional item to abstract product relationship is now handled by the `Cart` module. |
| `ConcreteProductsByProductConcreteIdsResourceRelationshipPlugin` (`ProductsRestApi`) | Remains on legacy Glue for `abstract-products` (serves related-products, upselling-products). Do not remove yet. |
| `ConcreteProductBySkuResourceRelationshipPlugin` (`ProductsRestApi`) | Remains on legacy Glue for `guest-cart-items`, `wishlist-items`, `shopping-list-items`, `bundle-items`, `bundled-items`, and `bundled-products`. Do not remove yet. |
| `ConcreteProductByQuoteRequestResourceRelationshipPlugin` (`ProductsRestApi`) | Remains on legacy Glue for `quote-requests`. Do not remove yet. |
