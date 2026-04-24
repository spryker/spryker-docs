---
title: "Migrate ProductReviewsRestApi to API Platform"
description: Step-by-step guide to migrate the ProductReviewsRestApi module to the API Platform ProductReview module.
last_updated: Apr 07, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `ProductReviewsRestApi` Glue module to the API Platform `ProductReview` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

## Overview

The `ProductReviewsRestApi` module provided the following storefront endpoints:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `GET /abstract-products/{sku}/product-reviews` | Get reviews for abstract product | `AbstractProductsProductReviewsResourceRoutePlugin` |
| `POST /abstract-products/{sku}/product-reviews` | Submit review for abstract product | `AbstractProductsProductReviewsResourceRoutePlugin` |

These are now served by the API Platform `ProductReview` module.

## 1. Update module dependencies

```bash
composer require spryker/product-review:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugin from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugin from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `AbstractProductsProductReviewsResourceRoutePlugin` | `Spryker\Glue\ProductReviewsRestApi\Plugin\GlueApplication\AbstractProductsProductReviewsResourceRoutePlugin` |

{% info_block warningBox "Route plugin still active" %}

In the Spryker Suite reference configuration, `AbstractProductsProductReviewsResourceRoutePlugin` has not yet been removed from `GlueApplicationDependencyProvider`. Remove it once you have verified your API Platform `ProductReview` endpoints are serving traffic correctly.

{% endinfo_block %}

## 3. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

| Plugin | Registered on resource | Status | Notes |
|---|---|---|---|
| `ProductReviewsRelationshipByProductAbstractSkuPlugin` | `abstract-products` | Remains | This plugin is still registered and allows `?include=product-reviews` on abstract product endpoints from the legacy Glue layer. Do not remove until `ProductsRestApi` is fully sunset. |
| `ProductReviewsRelationshipByProductConcreteSkuPlugin` | `concrete-products` | Removed | Reviews on concrete products are now served directly via the API Platform `ProductReview` module. |
