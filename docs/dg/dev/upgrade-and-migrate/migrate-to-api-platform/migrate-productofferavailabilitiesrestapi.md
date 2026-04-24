---
title: "Migrate ProductOfferAvailabilitiesRestApi to API Platform"
description: Step-by-step guide to migrate the ProductOfferAvailabilitiesRestApi module to the API Platform ProductOfferAvailability module.
last_updated: Apr 07, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
  - title: Migrate MerchantProductOffersRestApi to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-merchantproductoffersrestapi.html
---

This document describes how to migrate the `ProductOfferAvailabilitiesRestApi` Glue module to the API Platform `ProductOfferAvailability` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

Migrating this module requires [Migrate MerchantProductOffersRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-merchantproductoffersrestapi.html) to be completed first, as this module's route endpoint was a sub-resource of `product-offers`.

## Overview

The `ProductOfferAvailabilitiesRestApi` module provided the following storefront endpoint:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `GET /product-offers/{productOfferReference}/product-offer-availabilities` | Get product offer availability | `ProductOfferAvailabilitiesResourceRoutePlugin` |

This is now served by the API Platform `ProductOfferAvailability` module.

## 1. Update module dependencies

```bash
composer require spryker/product-offer-availability:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugin from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugin from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `ProductOfferAvailabilitiesResourceRoutePlugin` | `Spryker\Glue\ProductOfferAvailabilitiesRestApi\Plugin\GlueApplication\ProductOfferAvailabilitiesResourceRoutePlugin` |

## 3. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

| Plugin | Registered on resource | Status | Notes |
|---|---|---|---|
| `ProductOfferAvailabilitiesByProductOfferReferenceResourceRelationshipPlugin` | `product-offers` | Removed | The `product-offers` resource is now served by the API Platform `MerchantProductOffer` module. |
| `ProductOfferAvailabilitiesByProductOfferReferenceResourceRelationshipPlugin` | `shopping-list-items` | Remains | This plugin is still registered on `shopping-list-items` (from `ShoppingListsRestApi`). Do not remove until `ShoppingListsRestApi` is migrated. |
