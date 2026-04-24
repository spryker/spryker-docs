---
title: "Migrate ProductPricesRestApi to API Platform"
description: Step-by-step guide to migrate the ProductPricesRestApi module to the API Platform PriceProduct module.
last_updated: Mar 31, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `ProductPricesRestApi` Glue module to the API Platform `PriceProduct` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

## Overview

The `ProductPricesRestApi` module provided the following storefront endpoints:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `GET /abstract-products/{abstractProductSku}/abstract-product-prices` | Get abstract product prices | `AbstractProductPricesRoutePlugin` |
| `GET /concrete-products/{concreteProductSku}/concrete-product-prices` | Get concrete product prices | `ConcreteProductPricesRoutePlugin` |

These are now served by the API Platform `PriceProduct` module.

## 1. Update module dependencies

```bash
composer require spryker/price-product:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugins from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugins from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `AbstractProductPricesRoutePlugin` | `Spryker\Glue\ProductPricesRestApi\Plugin\AbstractProductPricesRoutePlugin` |
| `ConcreteProductPricesRoutePlugin` | `Spryker\Glue\ProductPricesRestApi\Plugin\ConcreteProductPricesRoutePlugin` |

## 3. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

| Plugin | Status |
|---|---|
| `AbstractProductPricesByResourceIdResourceRelationshipPlugin` (`ProductPricesRestApi`) | Removed from top-level `abstract-products`. Remains re-added in the grouped block for related-products and upselling-products legacy Glue endpoints. Do not remove that re-added registration. |
| `ConcreteProductPricesByResourceIdResourceRelationshipPlugin` (`ProductPricesRestApi`) | Removed from top-level `concrete-products`. Remains re-added in the grouped block for legacy Glue sub-includes (wishlists, configurable bundles). Do not remove that re-added registration. |
