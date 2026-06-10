---
title: Migration status - Glue API to API Platform
description: Tracks the migration status of API modules to the Spryker API Platform across StorefrontAPI and BackendAPI, with endpoint coverage and a high-level migration workflow.
last_updated: Jun 10, 2026
template: howto-guide-template
redirect_from:
  - /docs/dg/dev/upgrade-and-migrate/glue-api-migration-status.html
related:
  - title: Migrate to API Platform
    link: docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform.html
  - title: Integrate API Platform
    link: docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html
  - title: Integrate API Platform security
    link: docs/dg/dev/upgrade-and-migrate/integrate-api-platform-security.html
  - title: API Platform architecture
    link: docs/dg/dev/architecture/api-platform.html
---

This document tracks Spryker's migration of API-providing modules to the **API Platform** (built on Symfony and the API Platform library). Use it to plan upgrades and check the current status of every module.

{% info_block infoBox "Looking for the integration guide?" %}

This page does **not** describe how to integrate API Platform into your project. For step-by-step integration instructions, see:

- [Migrate to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform.html)
- [Integrate API Platform](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html)
- [Integrate API Platform security](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform-security.html)
- [API Platform architecture](/docs/dg/dev/architecture/api-platform.html)

{% endinfo_block %}

## Why Spryker is moving to API Platform

API Platform replaces Spryker-specific patterns for routing, authentication, and resource definition with industry-standard Symfony conventions, automatic OpenAPI schema generation, and a clean separation between resource schema, provider, and validation.

| Aspect | Previous infrastructure | API Platform |
|---|---|---|
| Bootstrap | Spryker-specific application bootstrap | Symfony Kernel-based routing |
| Resource registration | Manual plugin registration in `GlueApplicationDependencyProvider` | Declarative YAML resource definitions (`*.resource.yml`) |
| Authentication | Custom flows per module | Standard OAuth2 / Symfony Security |
| Coupling | Tight coupling between resource and routing logic | Clean separation: provider + resource schema + validation |
| Testability | Complex to test and extend | Symfony-native, testable with standard PHPUnit patterns |
| OpenAPI | Manual / partial | Automatic OpenAPI schema generation |

## General migration workflow

For any module marked **Migrated**, projects upgrade in three high-level steps. Detailed instructions are in the linked integration guides above.

1. **Update the module to the API Platform-enabled version**

   Pull the new module version that ships the `*.resource.yml` schema and Provider class:

    ```bash
    composer update spryker/<module-name>
    ```

2. **Remove the previous resource plugins**

   In your project's `GlueApplicationDependencyProvider`, remove the previous plugin registrations for the migrated module - typically a `ResourceRoutePlugin` (and any related `ResourceRelationshipPlugin` / expander plugins) registered in `getResourceRoutePlugins()`.

   For **extension-only** modules, remove or replace the corresponding plugin wiring in the parent module's dependency provider as indicated in the module's release notes.

3. **Clear caches and verify**

    ```bash
    vendor/bin/glue cache:clear
    vendor/bin/glue api:generate
    ```

   Confirm the endpoint is served by API Platform by hitting it against your local Glue host - the response is now produced by the new Symfony-based stack.

{% info_block infoBox "Parallel operation" %}

The previous API stack and API Platform run **side by side** during the transition. You can migrate modules incrementally; modules that have not been migrated continue to be served by the previous stack.

{% endinfo_block %}

### Status legend

| Status | Meaning |
|---|---|
| Migrated | Module is available on API Platform and production-ready. |
| Planned | Module is scheduled or queued for migration to API Platform. |

## Storefront API modules

All StorefrontAPI and Extension-only StorefrontAPI modules. Migrated modules are listed first.

| Module | Category | Status | Released In | Requires | Key endpoints |
|---|---|---|---|---|---|
| ContentProductAbstractListsRestApi | StorefrontAPI | Migrated | 1.4.0 | ProductsRestApi | GET /content-product-abstract-lists/{id}<br>GET /content-product-abstract-lists/{id}/abstract-products |
| MerchantOpeningHoursRestApi | StorefrontAPI | Migrated | 1.2.0 | — | GET /merchants/{id}/merchant-opening-hours |
| MerchantCategoriesRestApi | Extension-only StorefrontAPI | Migrated | 1.2.0 | MerchantsRestApi | (extension-only) |
| MerchantProductOffersRestApi | StorefrontAPI | Migrated | 2.2.0 | — | GET /concrete-products/{id}/product-offers<br>GET /product-offers/{id} |
| MerchantProductOfferServicePointAvailabilitiesRestApi | Extension-only StorefrontAPI | Migrated | 0.4.0 | ProductOfferServicePointAvailabilitiesRestApi | (extension-only) |
| MerchantsRestApi | StorefrontAPI | Migrated | 1.2.0 | — | GET /merchants<br>GET /merchants/{id}<br>GET /merchants/{id}/merchant-addresses |
| OrderPaymentsRestApi | StorefrontAPI | Migrated | 1.2.0 | — | POST /order-payments |
| PaymentsRestApi | StorefrontAPI | Migrated | 1.7.0 | — | POST /payments<br>POST /payment-cancellations<br>POST /payment-customers |
| ProductAvailabilitiesRestApi | StorefrontAPI | Migrated | 4.4.0 | ProductsRestApi | GET /abstract-products/{id}/abstract-product-availabilities<br>GET /concrete-products/{id}/concrete-product-availabilities |
| ProductOfferAvailabilitiesRestApi | StorefrontAPI | Migrated | 1.3.0 | — | GET /product-offers/{id}/product-offer-availabilities |
| ProductOfferServicePointAvailabilitiesRestApi | StorefrontAPI | Migrated | 1.2.0 | — | POST /product-offer-service-point-availabilities |
| ProductOfferPricesRestApi | StorefrontAPI | Migrated | 2.5.0 | — | GET /product-offers/{id}/product-offer-prices |
| ProductPricesRestApi | StorefrontAPI | Migrated | 1.12.0 | ProductsRestApi | GET /abstract-products/{id}/abstract-product-prices<br>GET /concrete-products/{id}/concrete-product-prices |
| ProductTaxSetsRestApi | StorefrontAPI | Migrated | 2.3.0 | — | GET /abstract-products/{id}/product-tax-sets |
| ProductsRestApi | StorefrontAPI | Migrated | 2.17.0 | — | GET /abstract-products/{id}<br>GET /concrete-products/{id} |
| ShipmentTypeProductOfferServicePointAvailabilitiesRestApi | Extension-only StorefrontAPI | Migrated | 1.2.0 | ProductOfferServicePointAvailabilitiesRestApi | (extension-only) |
| StoresApi | StorefrontAPI | Migrated | 1.3.0 | — | GET /stores |
| AgentAuthRestApi | StorefrontAPI | Migrated | 1.3.0 | — | POST /agent-access-tokens<br>POST /agent-customer-impersonation-access-tokens<br>GET /agent-customer-search |
| AlternativeProductsRestApi | StorefrontAPI | Migrated | 1.3.0 | ProductsRestApi | GET /abstract-products/{id}/related-products<br>GET /concrete-products/{id}/abstract-alternative-products<br>GET /concrete-products/{id}/concrete-alternative-products |
| AuthRestApi | StorefrontAPI | Migrated | 2.17.0 | — | POST /token<br>POST /access-tokens<br>POST /refresh-tokens<br>DELETE /refresh-tokens/{id} |
| AvailabilityNotificationsRestApi | StorefrontAPI | Migrated | 1.4.0 | — | POST /availability-notifications<br>DELETE /availability-notifications/{id}<br>GET /my-availability-notifications<br>GET /customers/{id}/availability-notifications |
| CartCodesRestApi | StorefrontAPI | Migrated | 1.7.0 | CartsRestApi | POST /carts/{id}/cart-codes<br>DELETE /carts/{id}/cart-codes/{id}<br>POST /guest-carts/{id}/cart-codes<br>DELETE /guest-carts/{id}/cart-codes/{id} |
| CartPermissionGroupsRestApi | StorefrontAPI | Migrated | 1.4.0 | — | GET /cart-permission-groups<br>GET /cart-permission-groups/{id} |
| CartReorderRestApi | StorefrontAPI | Migrated | 1.3.0 | CartsRestApi | POST /cart-reorder |
| CartsRestApi | StorefrontAPI | Migrated | 5.25.0 | — | GET,POST /carts<br>GET,PATCH,DELETE /carts/{id}<br>POST /carts/{id}/items<br>PATCH,DELETE /carts/{id}/items/{id}<br>GET /guest-carts<br>GET,PATCH /guest-carts/{id}<br>POST /guest-carts/{id}/guest-cart-items<br>PATCH,DELETE /guest-carts/{id}/guest-cart-items/{id}<br>GET /customers/{id}/carts |
| CatalogSearchRestApi | StorefrontAPI | Migrated | 2.13.0 | — | GET /catalog-search<br>GET /catalog-search-suggestions |
| CategoriesRestApi | StorefrontAPI | Migrated | 1.9.0 | — | GET /category-trees<br>GET /category-nodes/{id} |
| CheckoutRestApi | StorefrontAPI | Migrated | 3.14.0 | CartsRestApi | POST /checkout-data<br>POST /checkout |
| CmsPagesRestApi | StorefrontAPI | Migrated | 1.2.0 | — | GET /cms-pages<br>GET /cms-pages/{id} |
| CompaniesRestApi | StorefrontAPI | Migrated | 1.5.0 | — | GET /companies<br>GET /companies/{id} |
| CompanyBusinessUnitAddressesRestApi | StorefrontAPI | Migrated | 1.4.0 | — | GET /company-business-unit-addresses<br>GET /company-business-unit-addresses/{id} |
| CompanyBusinessUnitsRestApi | StorefrontAPI | Migrated | 1.6.0 | — | GET /company-business-units<br>GET /company-business-units/{id} |
| CompanyRolesRestApi | StorefrontAPI | Migrated | 1.3.0 | — | GET /company-roles<br>GET /company-roles/{id} |
| CompanyUserAuthRestApi | StorefrontAPI | Migrated | 2.3.0 | — | POST /company-user-access-tokens |
| CompanyUsersRestApi | StorefrontAPI | Migrated | 2.11.0 | — | GET /company-users<br>GET /company-users/{id} |
| ConfigurableBundleCartsRestApi | StorefrontAPI | Migrated | 1.2.0 | CartsRestApi | POST /carts/{id}/configured-bundles<br>PATCH,DELETE /carts/{id}/configured-bundles/{id}<br>POST,PATCH,DELETE /guest-carts/{id}/guest-configured-bundles/{id} |
| ConfigurableBundlesRestApi | StorefrontAPI | Migrated | 1.3.0 | — | GET /configurable-bundle-templates<br>GET /configurable-bundle-templates/{id} |
| ContentBannersRestApi | StorefrontAPI | Migrated | 2.4.0 | — | GET /content-banners/{id} |
| CustomerAccessRestApi | StorefrontAPI | Migrated | 1.3.0 | — | GET /customer-access |
| CustomersRestApi | StorefrontAPI | Migrated | 1.28.0 | — | GET,POST /customers<br>GET,PATCH,DELETE /customers/{id}<br>GET,POST /customers/{id}/addresses<br>GET,PATCH,DELETE /customers/{id}/addresses/{id}<br>POST /customer-forgotten-password<br>PATCH /customer-restore-password/{id}<br>PATCH /customer-password/{id}<br>POST /customer-confirmation |
| DiscountPromotionsRestApi | Extension-Only-StorefrontAPI | Migrated | 1.6.0 | CartCodesRestApi, CartsRestApi | (extension-only) |
| EntityTagsRestApi | Extension-only StorefrontAPI | Migrated | 1.1.0 | — | (extension-only) |
| GiftCardsRestApi | Extension-only StorefrontAPI | Migrated | 1.2.0 | — | (extension-only) |
| HealthCheck | StorefrontAPI | Migrated | 1.1.0 | — | GET /health-check |
| MerchantProductOfferShoppingListsRestApi | Extension-only StorefrontAPI | Migrated | 1.2.0 | — | (extension-only) |
| MerchantProductOfferWishlistRestApi | Extension-only StorefrontAPI | Migrated | 1.3.0 | WishlistsRestApi | (extension-only) |
| MerchantProductShoppingListsRestApi | Extension-only StorefrontAPI | Migrated | 1.2.0 | — | (extension-only) |
| MerchantProductsRestApi | Extension-only StorefrontAPI | Migrated | 1.1.0 | CartsRestApi | (extension-only) |
| MerchantSalesReturnsRestApi | Extension-only StorefrontAPI | Migrated | 1.1.0 | — | (extension-only) |
| MerchantShipmentsRestApi | Extension-only StorefrontAPI | Migrated | 0.1.1 | ShipmentsRestApi | (extension-only) |
| MultiCartsRestApi | Extension-only StorefrontAPI | Migrated | 1.1.0 | CartsRestApi | (extension-only) |
| MultiFactorAuth | StorefrontAPI | Migrated | 2.5.0 | — | GET /multi-factor-auth-types, POST /multi-factor-auth-trigger, POST /multi-factor-auth-type-activate, POST /multi-factor-auth-type-verify, POST /multi-factor-auth-type-deactivate |
| NavigationsRestApi | StorefrontAPI | Migrated | 2.3.0 | — | GET /navigations/{id} |
| OauthApi | StorefrontAPI | Migrated | 1.4.1 | — | POST /token |
| OrderAmendmentsRestApi | Extension-only StorefrontAPI | Migrated | 1.2.0 | CartReorderRestApi, CartsRestApi, OrdersRestApi | (extension-only) |
| OrdersRestApi | StorefrontAPI | Migrated | 4.14.0 | — | GET /orders<br>GET /orders/{orderReference}<br>GET /orders/{orderReference}/order-items/{uuid}<br>GET /customers/{customerReference}/orders |
| PriceProductOfferVolumesRestApi | Extension-only StorefrontAPI | Migrated | 1.1.1 | ProductOfferPricesRestApi | (extension-only) |
| PriceProductVolumesRestApi | Extension-only StorefrontAPI | Migrated | 1.2.0 | ProductPricesRestApi | (extension-only) |
| ProductAttributesRestApi | StorefrontAPI | Migrated | 1.3.0 | — | GET /product-management-attributes<br>GET /product-management-attributes/{id} |
| ProductBundleCartsRestApi | Extension-only StorefrontAPI | Migrated | 1.4.0 | CartsRestApi, ShipmentsRestApi | (extension-only) |
| ProductBundlesRestApi | StorefrontAPI | Migrated | 1.2.0 | OrdersRestApi | GET /concrete-products/{id}/bundled-products |
| ProductConfigurationShoppingListsRestApi | Extension-only StorefrontAPI | Migrated | 1.2.0 | ShoppingListsRestApi | (extension-only) |
| ProductConfigurationWishlistsRestApi | Extension-only StorefrontAPI | Migrated | 1.3.0 | WishlistsRestApi | (extension-only) |
| ProductConfigurationsPriceProductVolumesRestApi | Extension-only StorefrontAPI | Migrated | 1.1.0 | ProductConfigurationShoppingListsRestApi, ProductConfigurationWishlistsRestApi, ProductConfigurationsRestApi | (extension-only) |
| ProductConfigurationsRestApi | Extension-only StorefrontAPI | Migrated | 1.2.0 | CartsRestApi, OrdersRestApi, ProductsRestApi | (extension-only) |
| ProductDiscontinuedRestApi | Extension-only StorefrontAPI | Migrated | 1.1.1 | ProductsRestApi | (extension-only) |
| ProductImageSetsRestApi | StorefrontAPI | Migrated | 1.3.0 | ProductsRestApi | GET /abstract-products/{id}/abstract-product-image-sets<br>GET /concrete-products/{id}/concrete-product-image-sets |
| ProductLabelsRestApi | StorefrontAPI | Migrated | 1.5.0 | — | GET /product-labels/{id} |
| ProductMeasurementUnitsRestApi | StorefrontAPI | Migrated | 1.3.0 | — | GET /product-measurement-units/{id}<br>GET /concrete-products/{id}/sales-units |
| ProductOfferSalesRestApi | Extension-only StorefrontAPI | Migrated | 1.2.0 | — | (extension-only) |
| ProductOfferShoppingListsRestApi | Extension-only StorefrontAPI | Migrated | 1.2.0 | — | (extension-only) |
| ProductOffersRestApi | Extension-only StorefrontAPI | Migrated | 1.1.0 | ProductsRestApi | (extension-only) |
| ProductOptionsRestApi | Extension-only StorefrontAPI | Migrated | 1.5.0 | CartsRestApi, OrdersRestApi, ProductsRestApi, QuoteRequestsRestApi | (extension-only) |
| ProductReviewsRestApi | StorefrontAPI | Migrated | 1.3.0 | — | GET,POST /abstract-products/{id}/product-reviews<br>GET /abstract-products/{id}/product-reviews/{id} |
| QuoteRequestAgentsRestApi | StorefrontAPI | Migrated | 0.4.2 | QuoteRequestsRestApi | GET,POST /agent-quote-requests<br>GET,PATCH /agent-quote-requests/{id}<br>POST /agent-quote-requests/{id}/agent-quote-request-cancel<br>POST /agent-quote-requests/{id}/agent-quote-request-revise<br>POST /agent-quote-requests/{id}/agent-quote-request-send-to-customer |
| QuoteRequestsRestApi | StorefrontAPI | Migrated | 0.2.2 | CartsRestApi | GET,POST /quote-requests<br>GET,PATCH /quote-requests/{id}<br>POST /quote-requests/{id}/quote-request-cancel<br>POST /quote-requests/{id}/quote-request-revise<br>POST /quote-requests/{id}/quote-request-send-to-user<br>POST /quote-requests/{id}/quote-request-convert-to-quote |
| RelatedProductsRestApi | StorefrontAPI | Migrated | 1.5.0 | ProductsRestApi | GET /abstract-products/{id}/related-products |
| SalesOrderThresholdsRestApi | Extension-only StorefrontAPI | Migrated | 1.1.0 | CartsRestApi, CheckoutRestApi | (extension-only) |
| SalesReturnsRestApi | StorefrontAPI | Migrated | 1.3.0 | — | GET /return-reasons<br>GET,POST /returns<br>GET /returns/{id} |
| SecurityBlockerRestApi | Extension-only StorefrontAPI | Migrated | 1.1.0 | — | (extension-only) |
| ServicePointCartsRestApi | Extension-only StorefrontAPI | Migrated | 1.1.0 | CheckoutRestApi | (extension-only) |
| ServicePointsRestApi | StorefrontAPI | Migrated | 1.2.0 | — | GET /service-points<br>GET /service-points/{id}<br>GET /service-points/{id}/service-point-addresses/{id} |
| SharedCartsRestApi | StorefrontAPI | Migrated | 1.4.0 | — | POST /carts/{id}/shared-carts<br>PATCH,DELETE /shared-carts/{id} |
| ShipmentTypeServicePointsRestApi | Extension-only StorefrontAPI | Migrated | 1.1.0 | CheckoutRestApi, ServicePointsRestApi, ShipmentTypesRestApi, ShipmentsRestApi | (extension-only) |
| ShipmentTypesRestApi | StorefrontAPI | Migrated | 1.2.0 | — | GET /shipment-types<br>GET /shipment-types/{id} |
| ShipmentsRestApi | Extension-only StorefrontAPI | Migrated | 1.16.0 | CheckoutRestApi, OrdersRestApi, QuoteRequestsRestApi | (extension-only) |
| ShoppingListsRestApi | StorefrontAPI | Migrated | 1.5.0 | — | GET,POST /shopping-lists<br>GET,PATCH,DELETE /shopping-lists/{id}<br>POST /shopping-lists/{id}/shopping-list-items<br>PATCH,DELETE /shopping-lists/{id}/shopping-list-items/{id} |
| UpSellingProductsRestApi | StorefrontAPI | Migrated | 1.4.0 | CartsRestApi, ProductsRestApi | GET /carts/{id}/up-selling-products<br>GET /guest-carts/{id}/up-selling-products |
| UrlsRestApi | StorefrontAPI | Migrated | 1.2.0 | — | GET /url-resolver |
| Vertex | StorefrontAPI | Migrated | 1.2.0 | — | POST /tax-id-validate |
| WishlistsRestApi | StorefrontAPI | Migrated | 1.8.0 | — | GET,POST /wishlists<br>GET,PATCH,DELETE /wishlists/{id}<br>POST /wishlists/{id}/wishlist-items<br>PATCH,DELETE /wishlists/{id}/wishlist-items/{id} |

### Backward-compatible extension modules (no migration required)

The following modules are not migrated to API Platform and do not need to be. They expose no API resource of their own — they only contribute plugins (mappers and expanders) that are consumed in a backward-compatible way by both the legacy Glue REST API and the API Platform resources of the host module they extend. Because they carry no standalone resource, they have no "Released In" version.

| Module | Plugin provided | Consumed by |
|---|---|---|
| DiscountsRestApi | DiscountsRestQuoteRequestAttributesExpanderPlugin | QuoteRequestsRestApi |
| MerchantRelationshipProductListsRestApi | CustomerProductListCustomerExpanderPlugin | CustomersRestApi |
| OmsRestApi | OmsRestOrderItemsAttributesMapperPlugin | OrdersRestApi |

## Backend API modules

All BackendAPI modules tracked in the migration scope.

| Module | Category | Status | Released In | Requires | Key endpoints |
|---|---|---|---|---|---|
| CartNotesBackendApi | Extension-Only BackendAPI | Planned | — | SalesOrdersBackendApi | (extension-only) |
| CategoriesBackendApi | BackendAPI | Planned | — | — | GET,POST /categories<br>GET,PATCH /categories/{id} |
| DynamicEntityBackendApi | BackendAPI | Planned | — | — | GET,POST,PATCH,PUT /dynamic-entity/{entity-name} (~62 auto-generated entity endpoints) |
| OauthBackendApi | BackendAPI | Planned | — | — | POST /token |
| PickingListsBackendApi | BackendAPI | Planned | — | — | GET /picking-lists<br>GET /picking-lists/{id}<br>PATCH /picking-lists/{id}/picking-list-items/{id}<br>POST /start-picking |
| PickingListsUsersBackendApi | Extension-Only BackendAPI | Planned | — | PickingListsBackendApi, UsersBackendApi | (extension-only) |
| PickingListsWarehousesBackendApi | Extension-Only BackendAPI | Planned | — | PickingListsBackendApi, WarehousesBackendApi | (extension-only) |
| ProductAttributesBackendApi | BackendAPI | Planned | — | — | GET,POST /product-attributes<br>GET,PATCH /product-attributes/{id} |
| ProductImageSetsBackendApi | BackendAPI | Planned | — | — | GET /concrete-product-image-sets |
| ProductPackagingUnitsBackendApi | Extension-Only BackendAPI | Planned | — | PickingListsBackendApi | (extension-only) |
| ProductsBackendApi | BackendAPI | Planned | — | — | GET,POST /product-abstract<br>DELETE,GET,PATCH /product-abstract/{id} |
| PushNotificationsBackendApi | BackendAPI | Planned | — | — | GET,POST /push-notification-providers<br>PATCH,DELETE /push-notification-providers/{id}<br>POST /push-notification-subscriptions |
| SalesOrdersBackendApi | BackendAPI | Planned | — | — | GET /sales-orders |
| ServicePointsBackendApi | BackendAPI | Planned | — | — | GET,POST /service-points<br>GET,PATCH /service-points/{id}<br>GET,POST /service-point-addresses<br>PATCH /service-points/{id}/service-point-addresses/{id}<br>GET,POST /service-types<br>GET,PATCH /service-types/{id}<br>GET,POST /services<br>GET,PATCH /services/{id} |
| ShipmentTypesBackendApi | BackendAPI | Planned | — | — | GET,POST /shipment-types<br>GET,PATCH /shipment-types/{id} |
| ShipmentsBackendApi | BackendAPI | Planned | — | — | GET /sales-shipments |
| StoresBackendApi | BackendAPI | Planned | — | — | GET,POST,PATCH /stores |
| UsersBackendApi | BackendAPI | Planned | — | — | GET /users |
| WarehouseOauthBackendApi | BackendAPI | Planned | — | — | POST /warehouse-tokens |
| WarehouseUsersBackendApi | BackendAPI | Planned | — | — | GET,POST /warehouse-user-assignments<br>GET,PATCH,DELETE /warehouse-user-assignments/{id} |
| WarehousesBackendApi | BackendAPI | Planned | — | — | GET /warehouses |
