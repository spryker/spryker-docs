---
title: Migration status - Glue API to API Platform
description: Tracks the migration status of API modules to the Spryker API Platform across StorefrontAPI and BackendAPI, with endpoint coverage and a high-level migration workflow.
last_updated: May 29, 2026
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

| Module | Category | Status | Requires | Key endpoints |
|---|---|---|---|---|
| ContentProductAbstractListsRestApi | StorefrontAPI | Migrated | ProductsRestApi | GET /content-product-abstract-lists/{id}<br>GET /content-product-abstract-lists/{id}/abstract-products |
| MerchantOpeningHoursRestApi | StorefrontAPI | Migrated | — | GET /merchants/{id}/merchant-opening-hours |
| MerchantCategoriesRestApi | Extension-only StorefrontAPI | Migrated | MerchantsRestApi | (extension-only) |
| MerchantProductOffersRestApi | StorefrontAPI | Migrated | — | GET /concrete-products/{id}/product-offers<br>GET /product-offers/{id} |
| MerchantProductOfferServicePointAvailabilitiesRestApi | Extension-only StorefrontAPI | Migrated | ProductOfferServicePointAvailabilitiesRestApi | (extension-only) |
| MerchantsRestApi | StorefrontAPI | Migrated | — | GET /merchants<br>GET /merchants/{id}<br>GET /merchants/{id}/merchant-addresses |
| OrderPaymentsRestApi | StorefrontAPI | Migrated | — | POST /order-payments |
| PaymentsRestApi | StorefrontAPI | Migrated | — | POST /payments<br>POST /payment-cancellations<br>POST /payment-customers |
| ProductAvailabilitiesRestApi | StorefrontAPI | Migrated | ProductsRestApi | GET /abstract-products/{id}/abstract-product-availabilities<br>GET /concrete-products/{id}/concrete-product-availabilities |
| ProductOfferAvailabilitiesRestApi | StorefrontAPI | Migrated | — | GET /product-offers/{id}/product-offer-availabilities |
| ProductOfferServicePointAvailabilitiesRestApi | StorefrontAPI | Migrated | — | POST /product-offer-service-point-availabilities |
| ProductOfferPricesRestApi | StorefrontAPI | Migrated | — | GET /product-offers/{id}/product-offer-prices |
| ProductPricesRestApi | StorefrontAPI | Migrated | ProductsRestApi | GET /abstract-products/{id}/abstract-product-prices<br>GET /concrete-products/{id}/concrete-product-prices |
| ProductTaxSetsRestApi | StorefrontAPI | Migrated | — | GET /abstract-products/{id}/product-tax-sets |
| ProductsRestApi | StorefrontAPI | Migrated | — | GET /abstract-products/{id}<br>GET /concrete-products/{id} |
| ShipmentTypeProductOfferServicePointAvailabilitiesRestApi | Extension-only StorefrontAPI | Migrated | ProductOfferServicePointAvailabilitiesRestApi | (extension-only) |
| StoresApi | StorefrontAPI | Migrated | — | GET /stores |
| AgentAuthRestApi | StorefrontAPI | Migrated | — | POST /agent-access-tokens<br>POST /agent-customer-impersonation-access-tokens<br>GET /agent-customer-search |
| AlternativeProductsRestApi | StorefrontAPI | Migrated | ProductsRestApi | GET /abstract-products/{id}/related-products<br>GET /concrete-products/{id}/abstract-alternative-products<br>GET /concrete-products/{id}/concrete-alternative-products |
| AuthRestApi | StorefrontAPI | Migrated | — | POST /token<br>POST /access-tokens<br>POST /refresh-tokens<br>DELETE /refresh-tokens/{id} |
| AvailabilityNotificationsRestApi | StorefrontAPI | Migrated | — | POST /availability-notifications<br>DELETE /availability-notifications/{id}<br>GET /my-availability-notifications<br>GET /customers/{id}/availability-notifications |
| CartCodesRestApi | StorefrontAPI | Migrated | CartsRestApi | POST /carts/{id}/cart-codes<br>DELETE /carts/{id}/cart-codes/{id}<br>POST /guest-carts/{id}/cart-codes<br>DELETE /guest-carts/{id}/cart-codes/{id} |
| CartPermissionGroupsRestApi | StorefrontAPI | Migrated | — | GET /cart-permission-groups<br>GET /cart-permission-groups/{id} |
| CartReorderRestApi | StorefrontAPI | Migrated | CartsRestApi | POST /cart-reorder |
| CartsRestApi | StorefrontAPI | Migrated | — | GET,POST /carts<br>GET,PATCH,DELETE /carts/{id}<br>POST /carts/{id}/items<br>PATCH,DELETE /carts/{id}/items/{id}<br>GET /guest-carts<br>GET,PATCH /guest-carts/{id}<br>POST /guest-carts/{id}/guest-cart-items<br>PATCH,DELETE /guest-carts/{id}/guest-cart-items/{id}<br>GET /customers/{id}/carts |
| CatalogSearchRestApi | StorefrontAPI | Migrated | — | GET /catalog-search<br>GET /catalog-search-suggestions |
| CategoriesRestApi | StorefrontAPI | Migrated | — | GET /category-trees<br>GET /category-nodes/{id} |
| CheckoutRestApi | StorefrontAPI | Migrated | CartsRestApi | POST /checkout-data<br>POST /checkout |
| CmsPagesRestApi | StorefrontAPI | Migrated | — | GET /cms-pages<br>GET /cms-pages/{id} |
| CompaniesRestApi | StorefrontAPI | Migrated | — | GET /companies<br>GET /companies/{id} |
| CompanyBusinessUnitAddressesRestApi | StorefrontAPI | Migrated | — | GET /company-business-unit-addresses<br>GET /company-business-unit-addresses/{id} |
| CompanyBusinessUnitsRestApi | StorefrontAPI | Migrated | — | GET /company-business-units<br>GET /company-business-units/{id} |
| CompanyRolesRestApi | StorefrontAPI | Migrated | — | GET /company-roles<br>GET /company-roles/{id} |
| CompanyUserAuthRestApi | StorefrontAPI | Migrated | — | POST /company-user-access-tokens |
| CompanyUsersRestApi | StorefrontAPI | Migrated | — | GET /company-users<br>GET /company-users/{id} |
| ConfigurableBundleCartsRestApi | StorefrontAPI | Migrated | CartsRestApi | POST /carts/{id}/configured-bundles<br>PATCH,DELETE /carts/{id}/configured-bundles/{id}<br>POST,PATCH,DELETE /guest-carts/{id}/guest-configured-bundles/{id} |
| ConfigurableBundlesRestApi | StorefrontAPI | Migrated | — | GET /configurable-bundle-templates<br>GET /configurable-bundle-templates/{id} |
| ContentBannersRestApi | StorefrontAPI | Migrated | — | GET /content-banners/{id} |
| CustomerAccessRestApi | StorefrontAPI | Migrated | — | GET /customer-access |
| CustomersRestApi | StorefrontAPI | Migrated | — | GET,POST /customers<br>GET,PATCH,DELETE /customers/{id}<br>GET,POST /customers/{id}/addresses<br>GET,PATCH,DELETE /customers/{id}/addresses/{id}<br>POST /customer-forgotten-password<br>PATCH /customer-restore-password/{id}<br>PATCH /customer-password/{id}<br>POST /customer-confirmation |
| DiscountPromotionsRestApi | Extension-Only-StorefrontAPI | Migrated | CartCodesRestApi, CartsRestApi | (extension-only) |
| DiscountsRestApi | StorefrontAPI | Migrated | — | POST /carts/{id}/vouchers<br>DELETE /carts/{id}/vouchers/{id}<br>POST /guest-carts/{id}/vouchers<br>DELETE /guest-carts/{id}/vouchers/{id} |
| EntityTagsRestApi | Extension-only StorefrontAPI | Migrated | — | (extension-only) |
| GiftCardsRestApi | Extension-only StorefrontAPI | Migrated | — | (extension-only) |
| HealthCheck | StorefrontAPI | Migrated | — | GET /health-check |
| MerchantProductOfferServicePointAvailabilitiesRestApi | Extension-only StorefrontAPI | Planned | ProductOfferServicePointAvailabilitiesRestApi | (extension-only) |
| MerchantProductOfferShoppingListsRestApi | Extension-only StorefrontAPI | Migrated | — | (extension-only) |
| MerchantProductOfferWishlistRestApi | Extension-only StorefrontAPI | Migrated | WishlistsRestApi | (extension-only) |
| MerchantProductShoppingListsRestApi | Extension-only StorefrontAPI | Migrated | — | (extension-only) |
| MerchantProductsRestApi | Extension-only StorefrontAPI | Migrated | CartsRestApi | (extension-only) |
| MerchantRelationshipProductListsRestApi | Extension-only StorefrontAPI | Migrated | CustomersRestApi | (extension-only) |
| MerchantSalesReturnsRestApi | Extension-only StorefrontAPI | Migrated | — | (extension-only) |
| MerchantShipmentsRestApi | Extension-only StorefrontAPI | Migrated | ShipmentsRestApi | (extension-only) |
| MultiCartsRestApi | Extension-only StorefrontAPI | Migrated | CartsRestApi | (extension-only) |
| MultiFactorAuth | StorefrontAPI | Migrated | — | GET /multi-factor-auth-types, POST /multi-factor-auth-trigger, POST /multi-factor-auth-type-activate, POST /multi-factor-auth-type-verify, POST /multi-factor-auth-type-deactivate |
| NavigationsRestApi | StorefrontAPI | Migrated | — | GET /navigations/{id} |
| OauthApi | StorefrontAPI | Migrated | — | POST /token |
| OmsRestApi | Extension-only StorefrontAPI | Migrated | OrdersRestApi | (extension-only) |
| OrderAmendmentsRestApi | Extension-only StorefrontAPI | Migrated | CartReorderRestApi, CartsRestApi, OrdersRestApi | (extension-only) |
| OrdersRestApi | StorefrontAPI | Migrated | — | GET /orders<br>GET /orders/{orderReference}<br>GET /orders/{orderReference}/order-items/{uuid}<br>GET /customers/{customerReference}/orders |
| PriceProductOfferVolumesRestApi | Extension-only StorefrontAPI | Migrated | ProductOfferPricesRestApi | (extension-only) |
| PriceProductVolumesRestApi | Extension-only StorefrontAPI | Migrated | ProductPricesRestApi | (extension-only) |
| ProductAttributesRestApi | StorefrontAPI | Migrated | — | GET /product-management-attributes<br>GET /product-management-attributes/{id} |
| ProductBundleCartsRestApi | Extension-only StorefrontAPI | Migrated | CartsRestApi, ShipmentsRestApi | (extension-only) |
| ProductBundlesRestApi | StorefrontAPI | Migrated | OrdersRestApi | GET /concrete-products/{id}/bundled-products |
| ProductConfigurationShoppingListsRestApi | Extension-only StorefrontAPI | Migrated | ShoppingListsRestApi | (extension-only) |
| ProductConfigurationWishlistsRestApi | Extension-only StorefrontAPI | Migrated | WishlistsRestApi | (extension-only) |
| ProductConfigurationsPriceProductVolumesRestApi | Extension-only StorefrontAPI | Migrated | ProductConfigurationShoppingListsRestApi, ProductConfigurationWishlistsRestApi, ProductConfigurationsRestApi | (extension-only) |
| ProductConfigurationsRestApi | Extension-only StorefrontAPI | Migrated | CartsRestApi, OrdersRestApi, ProductsRestApi | (extension-only) |
| ProductDiscontinuedRestApi | Extension-only StorefrontAPI | Migrated | ProductsRestApi | (extension-only) |
| ProductImageSetsRestApi | StorefrontAPI | Migrated | ProductsRestApi | GET /abstract-products/{id}/abstract-product-image-sets<br>GET /concrete-products/{id}/concrete-product-image-sets |
| ProductLabelsRestApi | StorefrontAPI | Migrated | — | GET /product-labels/{id} |
| ProductMeasurementUnitsRestApi | StorefrontAPI | Migrated | — | GET /product-measurement-units/{id}<br>GET /concrete-products/{id}/sales-units |
| ProductOfferSalesRestApi | Extension-only StorefrontAPI | Migrated | — | (extension-only) |
| ProductOfferShoppingListsRestApi | Extension-only StorefrontAPI | Migrated | — | (extension-only) |
| ProductOffersRestApi | Extension-only StorefrontAPI | Migrated | ProductsRestApi | (extension-only) |
| ProductOptionsRestApi | Extension-only StorefrontAPI | Migrated | CartsRestApi, OrdersRestApi, ProductsRestApi, QuoteRequestsRestApi | (extension-only) |
| ProductReviewsRestApi | StorefrontAPI | Migrated | — | GET,POST /abstract-products/{id}/product-reviews<br>GET /abstract-products/{id}/product-reviews/{id} |
| QuoteRequestAgentsRestApi | StorefrontAPI | Migrated | QuoteRequestsRestApi | GET,POST /agent-quote-requests<br>GET,PATCH /agent-quote-requests/{id}<br>POST /agent-quote-requests/{id}/agent-quote-request-cancel<br>POST /agent-quote-requests/{id}/agent-quote-request-revise<br>POST /agent-quote-requests/{id}/agent-quote-request-send-to-customer |
| QuoteRequestsRestApi | StorefrontAPI | Migrated | CartsRestApi | GET,POST /quote-requests<br>GET,PATCH /quote-requests/{id}<br>POST /quote-requests/{id}/quote-request-cancel<br>POST /quote-requests/{id}/quote-request-revise<br>POST /quote-requests/{id}/quote-request-send-to-user<br>POST /quote-requests/{id}/quote-request-convert-to-quote |
| RelatedProductsRestApi | StorefrontAPI | Migrated | ProductsRestApi | GET /abstract-products/{id}/related-products |
| SalesOrderThresholdsRestApi | Extension-only StorefrontAPI | Migrated | CartsRestApi, CheckoutRestApi | (extension-only) |
| SalesReturnsRestApi | StorefrontAPI | Migrated | — | GET /return-reasons<br>GET,POST /returns<br>GET /returns/{id} |
| SecurityBlockerRestApi | Extension-only StorefrontAPI | Migrated | — | (extension-only) |
| ServicePointCartsRestApi | Extension-only StorefrontAPI | Migrated | CheckoutRestApi | (extension-only) |
| ServicePointsRestApi | StorefrontAPI | Migrated | — | GET /service-points<br>GET /service-points/{id}<br>GET /service-points/{id}/service-point-addresses/{id} |
| SharedCartsRestApi | StorefrontAPI | Migrated | — | POST /carts/{id}/shared-carts<br>PATCH,DELETE /shared-carts/{id} |
| ShipmentTypeServicePointsRestApi | Extension-only StorefrontAPI | Migrated | CheckoutRestApi, ServicePointsRestApi, ShipmentTypesRestApi, ShipmentsRestApi | (extension-only) |
| ShipmentTypesRestApi | StorefrontAPI | Migrated | — | GET /shipment-types<br>GET /shipment-types/{id} |
| ShipmentsRestApi | Extension-only StorefrontAPI | Migrated | CheckoutRestApi, OrdersRestApi, QuoteRequestsRestApi | (extension-only) |
| ShoppingListsRestApi | StorefrontAPI | Migrated | — | GET,POST /shopping-lists<br>GET,PATCH,DELETE /shopping-lists/{id}<br>POST /shopping-lists/{id}/shopping-list-items<br>PATCH,DELETE /shopping-lists/{id}/shopping-list-items/{id} |
| TaxAppRestApi | StorefrontAPI | Planned | — | POST /tax-id-validate |
| UpSellingProductsRestApi | StorefrontAPI | Migrated | CartsRestApi, ProductsRestApi | GET /carts/{id}/up-selling-products<br>GET /guest-carts/{id}/up-selling-products |
| UrlsRestApi | StorefrontAPI | Migrated | — | GET /url-resolver |
| Vertex | StorefrontAPI | Migrated | — | POST /tax-id-validate |
| WishlistsRestApi | StorefrontAPI | Migrated | — | GET,POST /wishlists<br>GET,PATCH,DELETE /wishlists/{id}<br>POST /wishlists/{id}/wishlist-items<br>PATCH,DELETE /wishlists/{id}/wishlist-items/{id} |

## Backend API modules

All BackendAPI modules tracked in the migration scope.

| Module | Category | Status | Requires | Key endpoints |
|---|---|---|---|---|
| CartNotesBackendApi | Extension-Only BackendAPI | Planned | SalesOrdersBackendApi | (extension-only) |
| CategoriesBackendApi | BackendAPI | Planned | — | GET,POST /categories<br>GET,PATCH /categories/{id} |
| DynamicEntityBackendApi | BackendAPI | Planned | — | GET,POST,PATCH,PUT /dynamic-entity/{entity-name} (~62 auto-generated entity endpoints) |
| OauthBackendApi | BackendAPI | Planned | — | POST /token |
| PickingListsBackendApi | BackendAPI | Planned | — | GET /picking-lists<br>GET /picking-lists/{id}<br>PATCH /picking-lists/{id}/picking-list-items/{id}<br>POST /start-picking |
| PickingListsUsersBackendApi | Extension-Only BackendAPI | Planned | PickingListsBackendApi, UsersBackendApi | (extension-only) |
| PickingListsWarehousesBackendApi | Extension-Only BackendAPI | Planned | PickingListsBackendApi, WarehousesBackendApi | (extension-only) |
| ProductAttributesBackendApi | BackendAPI | Planned | — | GET,POST /product-attributes<br>GET,PATCH /product-attributes/{id} |
| ProductImageSetsBackendApi | BackendAPI | Planned | — | GET /concrete-product-image-sets |
| ProductPackagingUnitsBackendApi | Extension-Only BackendAPI | Planned | PickingListsBackendApi | (extension-only) |
| ProductsBackendApi | BackendAPI | Planned | — | GET,POST /product-abstract<br>DELETE,GET,PATCH /product-abstract/{id} |
| PushNotificationsBackendApi | BackendAPI | Planned | — | GET,POST /push-notification-providers<br>PATCH,DELETE /push-notification-providers/{id}<br>POST /push-notification-subscriptions |
| SalesOrdersBackendApi | BackendAPI | Planned | — | GET /sales-orders |
| ServicePointsBackendApi | BackendAPI | Planned | — | GET,POST /service-points<br>GET,PATCH /service-points/{id}<br>GET,POST /service-point-addresses<br>PATCH /service-points/{id}/service-point-addresses/{id}<br>GET,POST /service-types<br>GET,PATCH /service-types/{id}<br>GET,POST /services<br>GET,PATCH /services/{id} |
| ShipmentTypesBackendApi | BackendAPI | Planned | — | GET,POST /shipment-types<br>GET,PATCH /shipment-types/{id} |
| ShipmentsBackendApi | BackendAPI | Planned | — | GET /sales-shipments |
| StoresBackendApi | BackendAPI | Planned | — | GET,POST,PATCH /stores |
| UsersBackendApi | BackendAPI | Planned | — | GET /users |
| WarehouseOauthBackendApi | BackendAPI | Planned | — | POST /warehouse-tokens |
| WarehouseUsersBackendApi | BackendAPI | Planned | — | GET,POST /warehouse-user-assignments<br>GET,PATCH,DELETE /warehouse-user-assignments/{id} |
| WarehousesBackendApi | BackendAPI | Planned | — | GET /warehouses |
