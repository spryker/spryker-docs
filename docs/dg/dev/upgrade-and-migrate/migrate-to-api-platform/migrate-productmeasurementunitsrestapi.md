---
title: "Migrate ProductMeasurementUnitsRestApi to API Platform"
description: Step-by-step guide to migrate the ProductMeasurementUnitsRestApi module to the API Platform ProductMeasurementUnit module.
last_updated: Apr 07, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `ProductMeasurementUnitsRestApi` Glue module to the API Platform `ProductMeasurementUnit` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

## Overview

The `ProductMeasurementUnitsRestApi` module provided the following storefront endpoints:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `GET /product-measurement-units` | List measurement units | `ProductMeasurementUnitsResourceRoutePlugin` |
| `GET /product-measurement-units/{code}` | Get measurement unit | `ProductMeasurementUnitsResourceRoutePlugin` |
| `GET /concrete-products/{sku}/sales-units` | Get sales units for product | `SalesUnitsResourceRoutePlugin` |

These are now served by the API Platform `ProductMeasurementUnit` module.

## 1. Update module dependencies

```bash
composer require spryker/product-measurement-unit:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugins from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugins from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `ProductMeasurementUnitsResourceRoutePlugin` | `Spryker\Glue\ProductMeasurementUnitsRestApi\Plugin\GlueApplication\ProductMeasurementUnitsResourceRoutePlugin` |
| `SalesUnitsResourceRoutePlugin` | `Spryker\Glue\ProductMeasurementUnitsRestApi\Plugin\GlueApplication\SalesUnitsResourceRoutePlugin` |

## 3. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

| Plugin | Registered on resource | Status | Notes |
|---|---|---|---|
| `ProductMeasurementUnitsByProductConcreteResourceRelationshipPlugin` | `concrete-products` | Removed | Measurement units are now accessible via `?include=product-measurement-units` in the API Platform `ProductMeasurementUnit` module. |
| `ProductMeasurementUnitsBySalesUnitResourceRelationshipPlugin` | `sales-units` | Removed | The `sales-units` resource no longer exists in the legacy Glue layer after this migration. |
| `SalesUnitsByProductConcreteResourceRelationshipPlugin` | `concrete-products` | Removed | Sales units are now included via the API Platform resources. |
| `SalesUnitsByCartItemResourceRelationshipPlugin` | `items`, `guest-cart-items` | Removed | Sales unit relationships on cart items are now handled by the API Platform `Cart` module. |
