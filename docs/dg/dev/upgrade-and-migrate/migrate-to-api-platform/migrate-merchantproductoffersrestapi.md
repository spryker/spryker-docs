---
title: "Migrate MerchantProductOffersRestApi to API Platform"
description: Step-by-step guide to migrate the MerchantProductOffersRestApi module to the API Platform MerchantProductOffer module.
last_updated: Apr 07, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `MerchantProductOffersRestApi` Glue module to the API Platform `MerchantProductOffer` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

## Overview

The `MerchantProductOffersRestApi` module provided the following storefront endpoints:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `GET /product-offers` | List product offers | `ProductOffersResourceRoutePlugin` |
| `GET /product-offers/{productOfferReference}` | Get product offer | `ProductOffersResourceRoutePlugin` |
| `GET /concrete-products/{sku}/product-offers` | Get product offers for concrete product | `ConcreteProductsProductOffersResourceRoutePlugin` |

These are now served by the API Platform `MerchantProductOffer` module.

## 1. Update module dependencies

```bash
composer require spryker/merchant-product-offer:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugins from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugins from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `ProductOffersResourceRoutePlugin` | `Spryker\Glue\MerchantProductOffersRestApi\Plugin\GlueApplication\ProductOffersResourceRoutePlugin` |
| `ConcreteProductsProductOffersResourceRoutePlugin` | `Spryker\Glue\MerchantProductOffersRestApi\Plugin\GlueApplication\ConcreteProductsProductOffersResourceRoutePlugin` |

## 3. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

| Plugin | Registered on resource | Status | Notes |
|---|---|---|---|
| `ProductOffersByProductConcreteSkuResourceRelationshipPlugin` | `concrete-products` | Removed | Product offers are now accessible via the API Platform `?include=product-offers` parameter. |
| `ProductOfferAvailabilitiesByProductOfferReferenceResourceRelationshipPlugin` | `product-offers` | Removed | The `product-offers` resource no longer exists in the legacy Glue layer. This plugin remains registered on `shopping-list-items` (from `ShoppingListsRestApi`); do not remove that registration. |
| `ProductOfferPriceByProductOfferReferenceResourceRelationshipPlugin` | `product-offers` | Removed | Same as above. This plugin remains registered on `shopping-list-items`; do not remove that registration. |
