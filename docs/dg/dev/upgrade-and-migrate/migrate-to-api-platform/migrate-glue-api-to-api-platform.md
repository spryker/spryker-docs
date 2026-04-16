---
title: Migrate Glue REST API to API Platform
description: Overview of migrating storefront Glue REST API modules to API Platform, with cross-cutting setup steps and links to per-module migration guides.
last_updated: Apr 16, 2026
template: howto-guide-template
related:
  - title: Migrate project-level customizations
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-project-level-customizations.html
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

If your project has customized Glue REST API behavior at the project level (`src/Pyz/`), complete the project-level cleanup steps described in [Migrate project-level customizations](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-project-level-customizations.html). This guide covers:

- Removing migrated route and relationship plugins from `GlueApplicationDependencyProvider`
- Removing migrated resource plugins from `GlueStorefrontApiApplicationDependencyProvider` and `GlueBackendApiApplicationDependencyProvider`
- Deleting obsolete Pyz `*RestApi` modules and creating their API Platform replacements
- Migrating custom plugin implementations to new extension interfaces
- Migrating custom REST API endpoints to the API Platform Provider/Processor pattern

You can complete these steps before, during, or after the per-module migrations. Each section can be done independently as you migrate the corresponding module.

## Per-module migration guides

After completing the cross-cutting changes, migrate individual modules by following the guides below. Each guide lists the modules to update, plugins to add, and legacy plugins to remove.

{% info_block infoBox "Migration order" %}

You can migrate modules in any order. We recommend starting with simpler read-only resources and progressing to more complex ones.

{% endinfo_block %}

| Module to migrate | Replaces legacy module | Guide |
|---|---|---|
| Agent | AgentAuthRestApi | [Migrate AgentAuthRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-agentauthrestapi.html) |
| Authentication | AuthRestApi | [Migrate AuthRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-authrestapi.html) |
| Availability | ProductAvailabilitiesRestApi | [Migrate ProductAvailabilitiesRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-productavailabilitiesrestapi.html) |
| Cart | CartsRestApi | [Migrate CartsRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-cartsrestapi.html) |
| CartCode | CartCodesRestApi | [Migrate CartCodesRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-cartcodesrestapi.html) |
| Catalog | CatalogSearchRestApi | [Migrate CatalogSearchRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-catalogsearchrestapi.html) |
| Category | CategoriesRestApi | [Migrate CategoriesRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-categoriesrestapi.html) |
| Checkout | CheckoutRestApi | [Migrate CheckoutRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-checkoutrestapi.html) |
| Company | CompaniesRestApi | [Migrate CompaniesRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-companiesrestapi.html) |
| CompanyUser | CompanyUsersRestApi, CompanyUserAuthRestApi | [Migrate CompanyUsersRestApi and CompanyUserAuthRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-companyusersrestapi.html) |
| CompanyBusinessUnit | CompanyBusinessUnitsRestApi | Coming soon |
| CompanyRole | CompanyRolesRestApi | Coming soon |
| CompanyUnitAddress | CompanyBusinessUnitAddressesRestApi | Coming soon |
| ContentProduct | ContentProductAbstractListsRestApi | [Migrate ContentProductAbstractListsRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-contentproductabstractlistsrestapi.html) |
| Customer | CustomersRestApi | [Migrate CustomersRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-customersrestapi.html) |
| CustomerAccess | CustomerAccessRestApi | [Migrate CustomerAccessRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-customeraccessrestapi.html) |
| Merchant | MerchantsRestApi | [Migrate MerchantsRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-merchantsrestapi.html) |
| MerchantOpeningHours | MerchantOpeningHoursRestApi | [Migrate MerchantOpeningHoursRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-merchantopeninghoursrestapi.html) |
| MerchantProductOffer | MerchantProductOffersRestApi | [Migrate MerchantProductOffersRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-merchantproductoffersrestapi.html) |
| Navigation | NavigationsRestApi | [Migrate NavigationsRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-navigationsrestapi.html) |
| Oauth | OauthApi | [Migrate OauthApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-oauthapi.html) |
| Payment | PaymentsRestApi, OrderPaymentsRestApi | [Migrate OrderPaymentsRestApi and PaymentsRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-orderpaymentsrestapi.html) |
| PriceProduct | ProductPricesRestApi | [Migrate ProductPricesRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-productpricesrestapi.html) |
| PriceProductOffer | ProductOfferPricesRestApi | [Migrate ProductOfferPricesRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-productofferpricesrestapi.html) |
| Product | ProductsRestApi | [Migrate ProductsRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-productsrestapi.html) |
| ProductAlternative | AlternativeProductsRestApi | [Migrate AlternativeProductsRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-alternativeproductsrestapi.html) |
| ProductAttribute | ProductAttributesRestApi | [Migrate ProductAttributesRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-productattributesrestapi.html) |
| ProductBundle | ProductBundlesRestApi | [Migrate ProductBundlesRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-productbundlesrestapi.html) |
| ProductImage | ProductImageSetsRestApi | [Migrate ProductImageSetsRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-productimagesetsrestapi.html) |
| ProductLabel | ProductLabelsRestApi | [Migrate ProductLabelsRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-productlabelsrestapi.html) |
| ProductMeasurementUnit | ProductMeasurementUnitsRestApi | [Migrate ProductMeasurementUnitsRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-productmeasurementunitsrestapi.html) |
| ProductOfferAvailability | ProductOfferAvailabilitiesRestApi | [Migrate ProductOfferAvailabilitiesRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-productofferavailabilitiesrestapi.html) |
| ProductOfferServicePointAvailability | ProductOfferServicePointAvailabilitiesRestApi | [Migrate ProductOfferServicePointAvailabilitiesRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-productofferservicepointavailabilitiesrestapi.html) |
| ProductOption | ProductOptionsRestApi | [Migrate ProductOptionsRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-productoptionsrestapi.html) |
| ProductReview | ProductReviewsRestApi | [Migrate ProductReviewsRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-productreviewsrestapi.html) |
| QuoteRequest | QuoteRequestsRestApi, QuoteRequestAgentsRestApi | [Migrate QuoteRequestsRestApi and QuoteRequestAgentsRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-quoterequestsrestapi.html) |
| Sales | OrdersRestApi | [Migrate OrdersRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-ordersrestapi.html) |
| ServicePoint | ServicePointsRestApi | Coming soon |
| SharedCart | SharedCartsRestApi | [Migrate SharedCartsRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-sharedcartsrestapi.html) |
| SharedCart | CartPermissionGroupsRestApi | [Migrate CartPermissionGroupsRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-cartpermissiongroupsrestapi.html) |
| ShipmentType | ShipmentTypesRestApi | [Migrate ShipmentTypesRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-shipmenttypesrestapi.html) |
| Store | StoresRestApi, StoresApi | [Migrate StoresRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-storesrestapi.html) |
| Tax | ProductTaxSetsRestApi | [Migrate ProductTaxSetsRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-producttaxsetsrestapi.html) |
| TaxApp | TaxAppRestApi | [Migrate TaxAppRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-taxapprestapi.html) |
| DiscountPromotion | DiscountPromotionsRestApi | Coming soon |
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

For the full list of Pyz modules to delete and their replacements, see [Migrate project-level customizations: Delete obsolete Pyz RestApi modules](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-project-level-customizations.html#4-delete-obsolete-pyz-restapi-modules-and-create-replacements).

After the cleanup, you can also remove unused `*RestApi` composer dependencies and clean up empty Glue module directories.
