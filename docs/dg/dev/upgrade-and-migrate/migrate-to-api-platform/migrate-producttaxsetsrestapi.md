---
title: "Migrate ProductTaxSetsRestApi to API Platform"
description: Step-by-step guide to migrate the ProductTaxSetsRestApi module to the API Platform Tax module.
last_updated: Apr 07, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `ProductTaxSetsRestApi` Glue module to the API Platform `Tax` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

## Overview

The `ProductTaxSetsRestApi` module provided the following storefront endpoint:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `GET /abstract-products/{sku}/product-tax-sets` | Get tax sets for abstract product | `ProductTaxSetsResourceRoutePlugin` |

This is now served by the API Platform `Tax` module.

## 1. Update module dependencies

```bash
composer require spryker/tax:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugin from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugin from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `ProductTaxSetsResourceRoutePlugin` | `Spryker\Glue\ProductTaxSetsRestApi\Plugin\GlueApplication\ProductTaxSetsResourceRoutePlugin` |

## 3. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

| Plugin | Registered on resource | Status | Notes |
|---|---|---|---|
| `ProductTaxSetByProductAbstractSkuResourceRelationshipPlugin` | `abstract-products` | Remains | This plugin is still registered on `abstract-products` in the legacy Glue layer for backwards compatibility with not-yet-migrated product endpoints. Do not remove until `ProductsRestApi` is fully migrated. |
