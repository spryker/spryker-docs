---
title: "Migrate MerchantsRestApi to API Platform"
description: Step-by-step guide to migrate the MerchantsRestApi module to the API Platform Merchant module.
last_updated: Apr 07, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `MerchantsRestApi` Glue module to the API Platform `Merchant` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

## Overview

The `MerchantsRestApi` module provided the following storefront endpoints:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `GET /merchants` | List merchants | `MerchantsResourceRoutePlugin` |
| `GET /merchants/{merchantReference}` | Get merchant | `MerchantsResourceRoutePlugin` |
| `GET /merchants/{merchantReference}/merchant-addresses` | Get merchant addresses | `MerchantAddressesResourceRoutePlugin` |

These are now served by the API Platform `Merchant` module.

## 1. Update module dependencies

```bash
composer require spryker/merchant:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugins from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugins from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `MerchantsResourceRoutePlugin` | `Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication\MerchantsResourceRoutePlugin` |
| `MerchantAddressesResourceRoutePlugin` | `Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication\MerchantAddressesResourceRoutePlugin` |

## 3. Delete the obsolete Pyz MerchantsRestApi module

Delete `src/Pyz/Glue/MerchantsRestApi/MerchantsRestApiDependencyProvider.php`. This file registered `MerchantCategoryMerchantRestAttributesMapperPlugin` for the legacy `MerchantsRestApi`. The API Platform `Merchant` module inlines category mapping directly in its provider — no plugin is needed.

## 4. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

| Plugin | Registered on resource | Status | Notes |
|---|---|---|---|
| `MerchantByMerchantReferenceResourceRelationshipPlugin` | `orders` | Removed | The `Sales` API Platform provider exposes merchant data directly. |
| `MerchantByMerchantReferenceResourceRelationshipPlugin` | `abstract-products`, `concrete-products` | Removed | Products now include merchant data via the API Platform `Product` module. |
| `MerchantAddressByMerchantReferenceResourceRelationshipPlugin` | `merchants` | Removed | Merchant addresses are included in the `Merchant` resource payload or via `?include=merchant-addresses`. |
| `MerchantsByOrderResourceRelationshipPlugin` | `orders` | Removed | No longer needed; merchant data on orders is handled by the API Platform `Sales` module. |
