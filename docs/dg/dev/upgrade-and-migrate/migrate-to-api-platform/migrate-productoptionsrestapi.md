---
title: "Migrate ProductOptionsRestApi to API Platform"
description: Step-by-step guide to migrate the ProductOptionsRestApi module to the API Platform ProductOption module.
last_updated: Apr 07, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `ProductOptionsRestApi` Glue module to the API Platform `ProductOption` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

## Overview

The `ProductOptionsRestApi` module did not add a standalone resource route. It contributed relationship plugins that attached product option data to product resources.

These relationships are now handled by the API Platform `ProductOption` module.

## 1. Update module dependencies

```bash
composer require spryker/product-option:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove relationship plugin from GlueApplicationDependencyProvider

In the `getResourceRelationshipPlugins()` method, remove the following relationship registration:

| Resource | Plugin to remove | Fully qualified class name |
|---|---|---|
| `concrete-products` | `ProductOptionsByProductConcreteSkuResourceRelationshipPlugin` | `Spryker\Glue\ProductOptionsRestApi\Plugin\GlueApplication\ProductOptionsByProductConcreteSkuResourceRelationshipPlugin` |

## 3. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

| Plugin | Registered on resource | Status | Notes |
|---|---|---|---|
| `ProductOptionsByProductConcreteSkuResourceRelationshipPlugin` | `concrete-products` | Removed | Product options for concrete products are now included via the API Platform `ProductOption` module. |
| `ProductOptionsByProductAbstractSkuResourceRelationshipPlugin` | `abstract-products` | Remains | This plugin is still registered on `abstract-products` in the legacy Glue layer. Do not remove until `ProductsRestApi` is fully sunset from the legacy layer. |
