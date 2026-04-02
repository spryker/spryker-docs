---
title: Migrate Glue REST API to API Platform
description: Overview of migrating storefront Glue REST API modules to API Platform, with cross-cutting setup steps and links to per-module migration guides.
last_updated: Mar 31, 2026
template: howto-guide-template
related:
  - title: How to integrate API Platform
    link: /docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html
  - title: How to integrate API Platform Security
    link: /docs/dg/dev/upgrade-and-migrate/integrate-api-platform-security.html
  - title: How to migrate to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform.html
---

This document guides you through migrating storefront Glue REST API endpoints to API Platform. The migration replaces legacy `*RestApi` Glue modules with API Platform resources defined in core Spryker modules.

## Overview

In this migration, every legacy Glue REST API resource — route plugins, relationship plugins, and resource route builders — is replaced by API Platform resources. The new resources are defined declaratively in YAML schemas inside core Spryker modules and auto-discovered by the framework.

You can migrate module by module. During migration, both the legacy Glue router and the API Platform router run side by side, so unmigrated endpoints continue to work.

## Prerequisites

Before starting, make sure you have completed:

- [How to integrate API Platform](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html)
- [How to integrate API Platform Security](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform-security.html)

## Cross-cutting changes

There are no changes required before starting the module migration. Begin with any module from the per-module migration guides below.

## Per-module migration guides

After completing the cross-cutting changes, migrate individual modules by following the guides below. Each guide lists the modules to update, plugins to add, and legacy plugins to remove.

{% info_block infoBox "Migration order" %}

You can migrate modules in any order. We recommend starting with simpler read-only resources and progressing to more complex ones.

{% endinfo_block %}

| Module to migrate | Replaces legacy module | Guide |
|---|---|---|
| Customer | CustomersRestApi | [Migrate CustomersRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-customersrestapi.html) |
| Cart | CartsRestApi | [Migrate CartsRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-cartsrestapi.html) |
| CartCode | CartCodesRestApi | [Migrate CartCodesRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-cartcodesrestapi.html) |
| Checkout | CheckoutRestApi | Coming soon |
| Sales | OrdersRestApi | [Migrate OrdersRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-ordersrestapi.html) |
| Product | ProductsRestApi | [Migrate ProductsRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-productsrestapi.html) |
| PriceProduct | ProductPricesRestApi | [Migrate ProductPricesRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-productpricesrestapi.html) |
| ProductImage | ProductImageSetsRestApi | [Migrate ProductImageSetsRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-productimagesetsrestapi.html) |
| Availability | ProductAvailabilitiesRestApi | [Migrate ProductAvailabilitiesRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-productavailabilitiesrestapi.html) |
| ProductLabel | ProductLabelsRestApi | [Migrate ProductLabelsRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-productlabelsrestapi.html) |
| ProductReview | ProductReviewsRestApi | Coming soon |
| ProductOption | ProductOptionsRestApi | Coming soon |
| ProductBundle | ProductBundlesRestApi | Coming soon |
| ProductAttribute | ProductAttributesRestApi | Coming soon |
| ProductMeasurementUnit | ProductMeasurementUnitsRestApi | Coming soon |
| Catalog | CatalogSearchRestApi | Coming soon |
| Category | CategoriesRestApi | [Migrate CategoriesRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-categoriesrestapi.html) |
| Navigation | NavigationsRestApi | Coming soon |
| Merchant | MerchantsRestApi | Coming soon |
| MerchantOpeningHours | MerchantOpeningHoursRestApi | Coming soon |
| MerchantProductOffer | MerchantProductOffersRestApi | Coming soon |
| Authentication | AuthRestApi | [Migrate AuthRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-authrestapi.html) |
| Agent | AgentAuthRestApi | Coming soon |
| Company | CompaniesRestApi | Coming soon |
| CompanyUser | CompanyUsersRestApi, CompanyUserAuthRestApi | Coming soon |
| CompanyBusinessUnit | CompanyBusinessUnitsRestApi | Coming soon |
| CompanyRole | CompanyRolesRestApi | Coming soon |
| CompanyUnitAddress | CompanyBusinessUnitAddressesRestApi | Coming soon |
| SharedCart | SharedCartsRestApi | Coming soon |
| QuoteRequest | QuoteRequestsRestApi | Coming soon |
| QuoteRequestAgent | QuoteRequestAgentsRestApi | Coming soon |
| CustomerAccess | CustomerAccessRestApi | Coming soon |
| Tax | ProductTaxSetsRestApi | Coming soon |
| Store | StoresRestApi | Coming soon |
| Payment | PaymentsRestApi, OrderPaymentsRestApi | Coming soon |
| ContentProduct | ContentProductAbstractListsRestApi | Coming soon |
| ServicePoint | ServicePointsRestApi | Coming soon |
| DiscountPromotion | DiscountPromotionsRestApi | Coming soon |
| ProductOfferAvailability | ProductOfferAvailabilitiesRestApi | Coming soon |
| PriceProductOffer | ProductOfferPricesRestApi | Coming soon |
| SalesOrderAmendment | OrderAmendmentsRestApi | Coming soon |

## After each module migration

After migrating each module, regenerate transfers, API resources, and clear the cache:

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Final cleanup

Once all modules have been migrated, perform the following cleanup steps.

### Remove legacy Glue router

In `src/Pyz/Glue/Router/RouterDependencyProvider.php`, remove `new GlueRouterPlugin()` from `getRouterPlugins()`.

### Delete obsolete project-level overrides

Delete the following file once the specified modules have been migrated:

| File to delete | Required modules migrated first |
|---|---|
| `src/Pyz/Glue/CustomerAccessRestApi/CustomerAccessRestApiConfig.php` | `CartsRestApi`, `ProductPricesRestApi`, `CheckoutRestApi`, `WishlistsRestApi` |

After the cleanup, you can also remove unused `*RestApi` composer dependencies and clean up empty Glue module directories.
