---
title: "Migrate ProductBundlesRestApi to API Platform"
description: Step-by-step guide to migrate the ProductBundlesRestApi module to the API Platform ProductBundle module.
last_updated: Apr 07, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `ProductBundlesRestApi` Glue module to the API Platform `ProductBundle` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

## Overview

The `ProductBundlesRestApi` module provided the following storefront endpoints:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `GET /concrete-products/{sku}/bundled-products` | Get bundled products for a concrete product | `ConcreteProductsBundledProductsResourceRoutePlugin` |

Bundle item relationships on carts are now served by the API Platform `ProductBundle` module.

## 1. Update module dependencies

```bash
composer require spryker/product-bundle:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

| Plugin | Registered on resource | Status | Notes |
|---|---|---|---|
| `BundledProductByProductConcreteSkuResourceRelationshipPlugin` | `concrete-products` | Removed | Bundled products are now included via the API Platform `ProductBundle` module. |
| `ConcreteProductsBundledProductsResourceRoutePlugin` | *(route)* | Remains | The `GET /concrete-products/{sku}/bundled-products` route is still registered in the legacy Glue layer. Remove it once the API Platform `ProductBundle` endpoints serve this route. |
| `BundledItemByQuoteResourceRelationshipPlugin` | `carts`, `guest-carts` | Remains | Registered on cart resources from `CartsRestApi`. Do not remove until a bundle-aware cart API Platform migration is complete. |
| `BundleItemByQuoteResourceRelationshipPlugin` | `carts`, `guest-carts` | Remains | Same as above. Do not remove yet. |
| `GuestBundleItemByQuoteResourceRelationshipPlugin` | `guest-carts` | Remains | Same as above. Do not remove yet. |
