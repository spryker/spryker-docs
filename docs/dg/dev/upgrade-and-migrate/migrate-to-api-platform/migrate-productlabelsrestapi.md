---
title: "Migrate ProductLabelsRestApi to API Platform"
description: Step-by-step guide to migrate the ProductLabelsRestApi module to the API Platform ProductLabel module.
last_updated: Mar 31, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `ProductLabelsRestApi` Glue module to the API Platform `ProductLabel` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

## Overview

The `ProductLabelsRestApi` module provided the following storefront endpoints:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `GET /product-labels` | List product labels | `ProductLabelsResourceRoutePlugin` |
| `GET /product-labels/{productLabelId}` | Get product label | `ProductLabelsResourceRoutePlugin` |

These are now served by the API Platform `ProductLabel` module.

## 1. Update module dependencies

```bash
composer require spryker/product-label:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugins from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugin from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `ProductLabelsResourceRoutePlugin` | `Spryker\Glue\ProductLabelsRestApi\Plugin\GlueApplication\ProductLabelsResourceRoutePlugin` |

## 3. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

| Plugin | Status |
|---|---|
| `ProductLabelsRelationshipByResourceIdPlugin` (`ProductLabelsRestApi`) | Removed from top-level `abstract-products`. Remains re-added in the grouped block for related-products and upselling-products legacy Glue endpoints. Do not remove that re-added registration. |
| `ProductLabelByProductConcreteSkuResourceRelationshipPlugin` (`ProductLabelsRestApi`) | Removed from top-level `concrete-products`. Remains re-added in the grouped block for legacy Glue sub-includes (wishlists, configurable bundles). Do not remove that re-added registration. |
