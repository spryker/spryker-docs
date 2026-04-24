---
title: "Migrate ProductAvailabilitiesRestApi to API Platform"
description: Step-by-step guide to migrate the ProductAvailabilitiesRestApi module to the API Platform Availability module.
last_updated: Mar 31, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `ProductAvailabilitiesRestApi` Glue module to the API Platform `Availability` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

## Overview

The `ProductAvailabilitiesRestApi` module provided the following storefront endpoints:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `GET /abstract-products/{abstractProductSku}/abstract-product-availabilities` | Get abstract product availabilities | `AbstractProductAvailabilitiesRoutePlugin` |
| `GET /concrete-products/{concreteProductSku}/concrete-product-availabilities` | Get concrete product availabilities | `ConcreteProductAvailabilitiesRoutePlugin` |

These are now served by the API Platform `Availability` module.

## 1. Update module dependencies

```bash
composer require spryker/availability:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugins from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugins from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `AbstractProductAvailabilitiesRoutePlugin` | `Spryker\Glue\ProductAvailabilitiesRestApi\Plugin\AbstractProductAvailabilitiesRoutePlugin` |
| `ConcreteProductAvailabilitiesRoutePlugin` | `Spryker\Glue\ProductAvailabilitiesRestApi\Plugin\ConcreteProductAvailabilitiesRoutePlugin` |

## 3. Remove relationship plugins from GlueApplicationDependencyProvider

In the same file, remove the following relationship plugin registrations from `getResourceRelationshipPlugins()`:

| Plugin to remove | Fully qualified class name | Was registered on resource |
|---|---|---|
| `ConcreteProductAvailabilitiesByResourceIdResourceRelationshipPlugin` | `Spryker\Glue\ProductAvailabilitiesRestApi\Plugin\GlueApplication\ConcreteProductAvailabilitiesByResourceIdResourceRelationshipPlugin` | `concrete-products` |

## 4. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

| Plugin | Status |
|---|---|
| `ConcreteProductAvailabilitiesByResourceIdResourceRelationshipPlugin` (`ProductAvailabilitiesRestApi`) | Removed from `concrete-products`. |
| `AbstractProductAvailabilitiesByResourceIdResourceRelationshipPlugin` (`ProductAvailabilitiesRestApi`) | Removed from top-level `abstract-products`. Remains re-added in the grouped block for related-products and upselling-products legacy Glue endpoints. Do not remove that re-added registration. |
