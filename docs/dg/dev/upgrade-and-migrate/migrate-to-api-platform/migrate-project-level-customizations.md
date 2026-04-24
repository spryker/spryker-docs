---
title: "Migrate project-level Glue REST API customizations to API Platform"
description: Guide for migrating project-level (Pyz) Glue REST API overrides and customizations to the new API Platform architecture.
last_updated: Apr 16, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
  - title: How to integrate API Platform
    link: /docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html
  - title: How to integrate API Platform Security
    link: /docs/dg/dev/upgrade-and-migrate/integrate-api-platform-security.html
---

This document describes how to migrate project-level (`src/Pyz/`) Glue REST API customizations to the new API Platform architecture. It covers cross-cutting concerns that apply regardless of which individual modules you migrate.

{% info_block warningBox "When to use this guide" %}

This guide is for projects that have customized Glue REST API behavior at the project level — for example, by overriding `DependencyProvider` classes, `Config` classes, or by registering custom plugins in `GlueApplicationDependencyProvider`. If your project uses only the default Spryker Glue REST API configuration without Pyz-level overrides, you can skip this guide and proceed directly with the [per-module migration guides](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html#per-module-migration-guides).

{% endinfo_block %}

## Prerequisites

Before starting, make sure you have completed:

- [How to integrate API Platform](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html)
- [How to integrate API Platform Security](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform-security.html)

## Overview of changes

The migration from Glue REST API to API Platform introduces these cross-cutting changes at the project level:

1. **GlueApplicationDependencyProvider** — remove migrated route plugins and relationship plugins.
2. **GlueStorefrontApiApplicationDependencyProvider** — remove migrated storefront resource plugins.
3. **GlueBackendApiApplicationDependencyProvider** — remove migrated backend resource plugins.
4. **Obsolete Pyz RestApi modules** — delete old Pyz overrides and create replacement modules.
5. **Plugin interface migration** — adapt custom plugin implementations to new extension interfaces.
6. **Custom endpoint migration** — migrate project-specific REST API endpoints to API Platform.

## 1. Clean up GlueApplicationDependencyProvider

The file `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php` is the central wiring point for all legacy Glue REST API routes and relationships. After migrating modules to API Platform, remove the plugins that are no longer needed.

### Remove migrated resource route plugins

Remove the following plugins from the `getResourceRoutePlugins()` method:

**Authentication and tokens:**

| Plugin to remove | Fully qualified class name |
|---|---|
| `AccessTokensResourceRoutePlugin` | `Spryker\Glue\AuthRestApi\Plugin\AccessTokensResourceRoutePlugin` |
| `RefreshTokensResourceRoutePlugin` | `Spryker\Glue\AuthRestApi\Plugin\RefreshTokensResourceRoutePlugin` |
| `TokenResourceRoutePlugin` | `Spryker\Glue\AuthRestApi\Plugin\GlueApplication\TokenResourceRoutePlugin` |
| `CompanyUserAccessTokensResourceRoutePlugin` | `Spryker\Glue\CompanyUserAuthRestApi\Plugin\GlueApplication\CompanyUserAccessTokensResourceRoutePlugin` |
| `AgentAccessTokensResourceRoutePlugin` | `Spryker\Glue\AgentAuthRestApi\Plugin\GlueApplication\AgentAccessTokensResourceRoutePlugin` |
| `AgentCustomerImpersonationAccessTokensResourceRoutePlugin` | `Spryker\Glue\AgentAuthRestApi\Plugin\GlueApplication\AgentCustomerImpersonationAccessTokensResourceRoutePlugin` |
| `AgentCustomerSearchResourceRoutePlugin` | `Spryker\Glue\AgentAuthRestApi\Plugin\GlueApplication\AgentCustomerSearchResourceRoutePlugin` |

**Products:**

| Plugin to remove | Fully qualified class name |
|---|---|
| `AbstractProductsResourceRoutePlugin` | `Spryker\Glue\ProductsRestApi\Plugin\AbstractProductsResourceRoutePlugin` |
| `ConcreteProductsResourceRoutePlugin` | `Spryker\Glue\ProductsRestApi\Plugin\ConcreteProductsResourceRoutePlugin` |
| `AbstractProductAvailabilitiesRoutePlugin` | `Spryker\Glue\ProductAvailabilitiesRestApi\Plugin\AbstractProductAvailabilitiesRoutePlugin` |
| `ConcreteProductAvailabilitiesRoutePlugin` | `Spryker\Glue\ProductAvailabilitiesRestApi\Plugin\ConcreteProductAvailabilitiesRoutePlugin` |
| `AbstractProductImageSetsRoutePlugin` | `Spryker\Glue\ProductImageSetsRestApi\Plugin\AbstractProductImageSetsRoutePlugin` |
| `ConcreteProductImageSetsRoutePlugin` | `Spryker\Glue\ProductImageSetsRestApi\Plugin\ConcreteProductImageSetsRoutePlugin` |
| `AbstractProductPricesRoutePlugin` | `Spryker\Glue\ProductPricesRestApi\Plugin\AbstractProductPricesRoutePlugin` |
| `ConcreteProductPricesRoutePlugin` | `Spryker\Glue\ProductPricesRestApi\Plugin\ConcreteProductPricesRoutePlugin` |
| `ProductLabelsResourceRoutePlugin` | `Spryker\Glue\ProductLabelsRestApi\Plugin\GlueApplication\ProductLabelsResourceRoutePlugin` |
| `ProductTaxSetsResourceRoutePlugin` | `Spryker\Glue\ProductTaxSetsRestApi\Plugin\GlueApplication\ProductTaxSetsResourceRoutePlugin` |
| `ProductManagementAttributesResourceRoutePlugin` | `Spryker\Glue\ProductAttributesRestApi\Plugin\GlueApplication\ProductManagementAttributesResourceRoutePlugin` |
| `ProductMeasurementUnitsResourceRoutePlugin` | `Spryker\Glue\ProductMeasurementUnitsRestApi\Plugin\GlueApplication\ProductMeasurementUnitsResourceRoutePlugin` |
| `SalesUnitsResourceRoutePlugin` | `Spryker\Glue\ProductMeasurementUnitsRestApi\Plugin\GlueApplication\SalesUnitsResourceRoutePlugin` |
| `ConcreteProductsBundledProductsResourceRoutePlugin` | `Spryker\Glue\ProductBundlesRestApi\Plugin\GlueApplication\ConcreteProductsBundledProductsResourceRoutePlugin` |
| `ConcreteAlternativeProductsResourceRoutePlugin` | `Spryker\Glue\AlternativeProductsRestApi\Plugin\GlueApplication\ConcreteAlternativeProductsResourceRoutePlugin` |
| `AbstractAlternativeProductsResourceRoutePlugin` | `Spryker\Glue\AlternativeProductsRestApi\Plugin\GlueApplication\AbstractAlternativeProductsResourceRoutePlugin` |
| `ProductOffersResourceRoutePlugin` | `Spryker\Glue\MerchantProductOffersRestApi\Plugin\GlueApplication\ProductOffersResourceRoutePlugin` |
| `ConcreteProductsProductOffersResourceRoutePlugin` | `Spryker\Glue\MerchantProductOffersRestApi\Plugin\GlueApplication\ConcreteProductsProductOffersResourceRoutePlugin` |
| `ProductOfferAvailabilitiesResourceRoutePlugin` | `Spryker\Glue\ProductOfferAvailabilitiesRestApi\Plugin\GlueApplication\ProductOfferAvailabilitiesResourceRoutePlugin` |
| `ProductOfferPricesResourceRoutePlugin` | `Spryker\Glue\ProductOfferPricesRestApi\Plugin\GlueApplication\ProductOfferPricesResourceRoutePlugin` |
| `ProductOfferServicePointAvailabilitiesResourceRoutePlugin` | `Spryker\Glue\ProductOfferServicePointAvailabilitiesRestApi\Plugin\GlueApplication\ProductOfferServicePointAvailabilitiesResourceRoutePlugin` |

**Carts:**

| Plugin to remove | Fully qualified class name |
|---|---|
| `CartsResourceRoutePlugin` | `Spryker\Glue\CartsRestApi\Plugin\ResourceRoute\CartsResourceRoutePlugin` |
| `CartItemsResourceRoutePlugin` | `Spryker\Glue\CartsRestApi\Plugin\ResourceRoute\CartItemsResourceRoutePlugin` |
| `GuestCartsResourceRoutePlugin` | `Spryker\Glue\CartsRestApi\Plugin\ResourceRoute\GuestCartsResourceRoutePlugin` |
| `GuestCartItemsResourceRoutePlugin` | `Spryker\Glue\CartsRestApi\Plugin\ResourceRoute\GuestCartItemsResourceRoutePlugin` |
| `CustomerCartsResourceRoutePlugin` | `Spryker\Glue\CartsRestApi\Plugin\ResourceRoute\CustomerCartsResourceRoutePlugin` |
| `CartCodesResourceRoutePlugin` | `Spryker\Glue\CartCodesRestApi\Plugin\GlueApplication\CartCodesResourceRoutePlugin` |
| `GuestCartCodesResourceRoutePlugin` | `Spryker\Glue\CartCodesRestApi\Plugin\GlueApplication\GuestCartCodesResourceRoutePlugin` |
| `CartVouchersResourceRoutePlugin` | `Spryker\Glue\CartCodesRestApi\Plugin\GlueApplication\CartVouchersResourceRoutePlugin` |
| `GuestCartVouchersResourceRoutePlugin` | `Spryker\Glue\CartCodesRestApi\Plugin\GlueApplication\GuestCartVouchersResourceRoutePlugin` |
| `SharedCartsResourceRoutePlugin` | `Spryker\Glue\SharedCartsRestApi\Plugin\GlueApplication\SharedCartsResourceRoutePlugin` |

**Customers:**

| Plugin to remove | Fully qualified class name |
|---|---|
| `CustomersResourceRoutePlugin` | `Spryker\Glue\CustomersRestApi\Plugin\CustomersResourceRoutePlugin` |
| `AddressesResourceRoutePlugin` | `Spryker\Glue\CustomersRestApi\Plugin\AddressesResourceRoutePlugin` |
| `CustomerForgottenPasswordResourceRoutePlugin` | `Spryker\Glue\CustomersRestApi\Plugin\CustomerForgottenPasswordResourceRoutePlugin` |
| `CustomerRestorePasswordResourceRoutePlugin` | `Spryker\Glue\CustomersRestApi\Plugin\CustomerRestorePasswordResourceRoutePlugin` |
| `CustomerPasswordResourceRoutePlugin` | `Spryker\Glue\CustomersRestApi\Plugin\CustomerPasswordResourceRoutePlugin` |
| `CustomerConfirmationResourceRoutePlugin` | `Spryker\Glue\CustomersRestApi\Plugin\GlueApplication\CustomerConfirmationResourceRoutePlugin` |
| `CustomerAccessResourceRoutePlugin` | `Spryker\Glue\CustomerAccessRestApi\Plugin\GlueApplication\CustomerAccessResourceRoutePlugin` |

**Orders and checkout:**

| Plugin to remove | Fully qualified class name |
|---|---|
| `OrdersResourceRoutePlugin` | `Spryker\Glue\OrdersRestApi\Plugin\OrdersResourceRoutePlugin` |
| `CustomerOrdersResourceRoutePlugin` | `Spryker\Glue\OrdersRestApi\Plugin\CustomerOrdersResourceRoutePlugin` |
| `OrderPaymentsResourceRoutePlugin` | `Spryker\Glue\OrderPaymentsRestApi\Plugin\OrderPaymentsResourceRoutePlugin` |
| `CheckoutResourcePlugin` | `Spryker\Glue\CheckoutRestApi\Plugin\GlueApplication\CheckoutResourcePlugin` |
| `CheckoutDataResourcePlugin` | `Spryker\Glue\CheckoutRestApi\Plugin\GlueApplication\CheckoutDataResourcePlugin` |
| `PaymentsResourceRoutePlugin` | `Spryker\Glue\PaymentsRestApi\Plugin\GlueApplication\PaymentsResourceRoutePlugin` |
| `PaymentCancellationsResourceRoutePlugin` | `Spryker\Glue\PaymentsRestApi\Plugin\GlueApplication\PaymentCancellationsResourceRoutePlugin` |
| `PaymentCustomersResourceRoutePlugin` | `Spryker\Glue\PaymentsRestApi\Plugin\GlueApplication\PaymentCustomersResourceRoutePlugin` |

**Company:**

| Plugin to remove | Fully qualified class name |
|---|---|
| `CompanyUsersResourceRoutePlugin` | `Spryker\Glue\CompanyUsersRestApi\Plugin\GlueApplication\CompanyUsersResourceRoutePlugin` |
| `CompaniesResourcePlugin` | `Spryker\Glue\CompaniesRestApi\Plugin\GlueApplication\CompaniesResourcePlugin` |
| `CompanyBusinessUnitsResourcePlugin` | `Spryker\Glue\CompanyBusinessUnitsRestApi\Plugin\GlueApplication\CompanyBusinessUnitsResourcePlugin` |
| `CompanyBusinessUnitAddressesResourcePlugin` | `Spryker\Glue\CompanyBusinessUnitAddressesRestApi\Plugin\GlueApplication\CompanyBusinessUnitAddressesResourcePlugin` |

**Catalog, categories, navigation, and content:**

| Plugin to remove | Fully qualified class name |
|---|---|
| `CatalogSearchResourceRoutePlugin` | `Spryker\Glue\CatalogSearchRestApi\Plugin\CatalogSearchResourceRoutePlugin` |
| `CatalogSearchSuggestionsResourceRoutePlugin` | `Spryker\Glue\CatalogSearchRestApi\Plugin\CatalogSearchSuggestionsResourceRoutePlugin` |
| `CategoriesResourceRoutePlugin` | `Spryker\Glue\CategoriesRestApi\Plugin\CategoriesResourceRoutePlugin` |
| `CategoryResourceRoutePlugin` | `Spryker\Glue\CategoriesRestApi\Plugin\CategoryResourceRoutePlugin` |
| `NavigationsResourceRoutePlugin` | `Spryker\Glue\NavigationsRestApi\Plugin\ResourceRoute\NavigationsResourceRoutePlugin` |
| `ContentProductAbstractListsResourceRoutePlugin` | `Spryker\Glue\ContentProductAbstractListsRestApi\Plugin\GlueApplication\ContentProductAbstractListsResourceRoutePlugin` |
| `ContentProductAbstractListAbstractProductsResourceRoutePlugin` | `Spryker\Glue\ContentProductAbstractListsRestApi\Plugin\GlueApplication\AbstractProductsResourceRoutePlugin` (aliased) |

**Merchants:**

| Plugin to remove | Fully qualified class name |
|---|---|
| `MerchantsResourceRoutePlugin` | `Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication\MerchantsResourceRoutePlugin` |
| `MerchantAddressesResourceRoutePlugin` | `Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication\MerchantAddressesResourceRoutePlugin` |
| `MerchantOpeningHoursResourceRoutePlugin` | `Spryker\Glue\MerchantOpeningHoursRestApi\Plugin\GlueApplication\MerchantOpeningHoursResourceRoutePlugin` |

**Quote requests (B2B):**

| Plugin to remove | Fully qualified class name |
|---|---|
| `QuoteRequestsResourceRoutePlugin` | `Spryker\Glue\QuoteRequestsRestApi\Plugin\GlueApplication\QuoteRequestsResourceRoutePlugin` |
| `QuoteRequestAgentsResourceRoutePlugin` | `Spryker\Glue\QuoteRequestAgentsRestApi\Plugin\GlueApplication\QuoteRequestAgentsResourceRoutePlugin` |
| `QuoteRequestAgentCancelResourceRoutePlugin` | `Spryker\Glue\QuoteRequestAgentsRestApi\Plugin\GlueApplication\QuoteRequestAgentCancelResourceRoutePlugin` |
| `QuoteRequestAgentReviseResourceRoutePlugin` | `Spryker\Glue\QuoteRequestAgentsRestApi\Plugin\GlueApplication\QuoteRequestAgentReviseResourceRoutePlugin` |
| `QuoteRequestAgentSendResourceRoutePlugin` | `Spryker\Glue\QuoteRequestAgentsRestApi\Plugin\GlueApplication\QuoteRequestAgentSendResourceRoutePlugin` |
| `QuoteRequestCancelResourceRoutePlugin` | `Spryker\Glue\QuoteRequestsRestApi\Plugin\GlueApplication\QuoteRequestCancelResourceRoutePlugin` |
| `QuoteRequestReviseResourceRoutePlugin` | `Spryker\Glue\QuoteRequestsRestApi\Plugin\GlueApplication\QuoteRequestReviseResourceRoutePlugin` |
| `QuoteRequestSendResourceRoutePlugin` | `Spryker\Glue\QuoteRequestsRestApi\Plugin\GlueApplication\QuoteRequestSendResourceRoutePlugin` |
| `QuoteRequestConvertResourceRoutePlugin` | `Spryker\Glue\QuoteRequestsRestApi\Plugin\GlueApplication\QuoteRequestConvertResourceRoutePlugin` |

**Shipments and stores:**

| Plugin to remove | Fully qualified class name |
|---|---|
| `ShipmentTypesResourceRoutePlugin` | `Spryker\Glue\ShipmentTypesRestApi\Plugin\GlueApplication\ShipmentTypesResourceRoutePlugin` |
| `StoresResourceRoutePlugin` | `Spryker\Glue\StoresRestApi\Plugin\StoresResourceRoutePlugin` |

**Multi-factor authentication:**

| Plugin to remove | Fully qualified class name |
|---|---|
| `MultiFactorAuthTypesResourcePlugin` | `Spryker\Glue\MultiFactorAuth\Plugin\GlueApplication\RestApi\MultiFactorAuthTypesResourcePlugin` |
| `MultiFactorAuthTriggerResourcePlugin` | `Spryker\Glue\MultiFactorAuth\Plugin\GlueApplication\RestApi\MultiFactorAuthTriggerResourcePlugin` |
| `MultiFactorAuthActivateResourcePlugin` | `Spryker\Glue\MultiFactorAuth\Plugin\GlueApplication\RestApi\MultiFactorAuthActivateResourcePlugin` |
| `MultiFactorAuthTypeVerifyResourcePlugin` | `Spryker\Glue\MultiFactorAuth\Plugin\GlueApplication\RestApi\MultiFactorAuthTypeVerifyResourcePlugin` |
| `MultiFactorAuthTypeDeactivateResourcePlugin` | `Spryker\Glue\MultiFactorAuth\Plugin\GlueApplication\RestApi\MultiFactorAuthTypeDeactivateResourcePlugin` |

**Validators:**

| Plugin to remove | Fully qualified class name |
|---|---|
| `CatalogSearchRequestParametersIntegerRestRequestValidatorPlugin` | `Spryker\Glue\CatalogSearchRestApi\Plugin\CatalogSearchRequestParametersIntegerRestRequestValidatorPlugin` |

### Remove migrated relationship plugins

Remove the following plugins from the `getResourceRelationshipPlugins()` method.

**Product relationships:**

| Plugin to remove | Fully qualified class name | Was registered on resource |
|---|---|---|
| `AbstractProductsProductImageSetsResourceRelationshipPlugin` | `Spryker\Glue\ProductImageSetsRestApi\Plugin\GlueApplication\AbstractProductsProductImageSetsResourceRelationshipPlugin` | `abstract-products` |
| `ConcreteProductsProductImageSetsResourceRelationshipPlugin` | `Spryker\Glue\ProductImageSetsRestApi\Plugin\GlueApplication\ConcreteProductsProductImageSetsResourceRelationshipPlugin` | `concrete-products` |
| `AbstractProductAvailabilitiesByResourceIdResourceRelationshipPlugin` | `Spryker\Glue\ProductAvailabilitiesRestApi\Plugin\GlueApplication\AbstractProductAvailabilitiesByResourceIdResourceRelationshipPlugin` | `abstract-products` |
| `ConcreteProductAvailabilitiesByResourceIdResourceRelationshipPlugin` | `Spryker\Glue\ProductAvailabilitiesRestApi\Plugin\GlueApplication\ConcreteProductAvailabilitiesByResourceIdResourceRelationshipPlugin` | `concrete-products` |
| `AbstractProductPricesByResourceIdResourceRelationshipPlugin` | `Spryker\Glue\ProductPricesRestApi\Plugin\GlueApplication\AbstractProductPricesByResourceIdResourceRelationshipPlugin` | `abstract-products` |
| `ConcreteProductPricesByResourceIdResourceRelationshipPlugin` | `Spryker\Glue\ProductPricesRestApi\Plugin\GlueApplication\ConcreteProductPricesByResourceIdResourceRelationshipPlugin` | `concrete-products` |
| `AbstractProductsCategoriesResourceRelationshipPlugin` | `Spryker\Glue\CategoriesRestApi\Plugin\GlueApplication\AbstractProductsCategoriesResourceRelationshipPlugin` | `abstract-products` |
| `ProductTaxSetByProductAbstractSkuResourceRelationshipPlugin` | `Spryker\Glue\ProductTaxSetsRestApi\Plugin\GlueApplication\ProductTaxSetByProductAbstractSkuResourceRelationshipPlugin` | `abstract-products` |
| `ProductOptionsByProductAbstractSkuResourceRelationshipPlugin` | `Spryker\Glue\ProductOptionsRestApi\Plugin\GlueApplication\ProductOptionsByProductAbstractSkuResourceRelationshipPlugin` | `abstract-products` |
| `ProductOptionsByProductConcreteSkuResourceRelationshipPlugin` | `Spryker\Glue\ProductOptionsRestApi\Plugin\GlueApplication\ProductOptionsByProductConcreteSkuResourceRelationshipPlugin` | `concrete-products` |
| `ProductReviewsRelationshipByProductAbstractSkuPlugin` | `Spryker\Glue\ProductReviewsRestApi\Plugin\GlueApplication\ProductReviewsRelationshipByProductAbstractSkuPlugin` | `abstract-products` |
| `ProductReviewsRelationshipByProductConcreteSkuPlugin` | `Spryker\Glue\ProductReviewsRestApi\Plugin\GlueApplication\ProductReviewsRelationshipByProductConcreteSkuPlugin` | `concrete-products` |
| `ProductLabelsRelationshipByResourceIdPlugin` | `Spryker\Glue\ProductLabelsRestApi\Plugin\GlueApplication\ProductLabelsRelationshipByResourceIdPlugin` | `abstract-products` |
| `ProductLabelByProductConcreteSkuResourceRelationshipPlugin` | `Spryker\Glue\ProductLabelsRestApi\Plugin\GlueApplication\ProductLabelByProductConcreteSkuResourceRelationshipPlugin` | `concrete-products` |
| `ConcreteProductsByProductConcreteIdsResourceRelationshipPlugin` | `Spryker\Glue\ProductsRestApi\Plugin\GlueApplication\ConcreteProductsByProductConcreteIdsResourceRelationshipPlugin` | `abstract-products` |
| `ProductAbstractByProductAbstractSkuResourceRelationshipPlugin` | `Spryker\Glue\ProductsRestApi\Plugin\GlueApplication\ProductAbstractByProductAbstractSkuResourceRelationshipPlugin` | Various resources |
| `ProductAbstractBySkuResourceRelationshipPlugin` | `Spryker\Glue\ProductsRestApi\Plugin\GlueApplication\ProductAbstractBySkuResourceRelationshipPlugin` | Various resources |
| `BundledProductByProductConcreteSkuResourceRelationshipPlugin` | `Spryker\Glue\ProductBundlesRestApi\Plugin\GlueApplication\BundledProductByProductConcreteSkuResourceRelationshipPlugin` | `concrete-products` |
| `ProductMeasurementUnitsByProductConcreteResourceRelationshipPlugin` | `Spryker\Glue\ProductMeasurementUnitsRestApi\Plugin\GlueApplication\ProductMeasurementUnitsByProductConcreteResourceRelationshipPlugin` | `concrete-products` |
| `SalesUnitsByProductConcreteResourceRelationshipPlugin` | `Spryker\Glue\ProductMeasurementUnitsRestApi\Plugin\GlueApplication\SalesUnitsByProductConcreteResourceRelationshipPlugin` | `concrete-products` |
| `ProductMeasurementUnitsBySalesUnitResourceRelationshipPlugin` | `Spryker\Glue\ProductMeasurementUnitsRestApi\Plugin\GlueApplication\ProductMeasurementUnitsBySalesUnitResourceRelationshipPlugin` | `sales-units` |
| `ProductOffersByProductConcreteSkuResourceRelationshipPlugin` | `Spryker\Glue\MerchantProductOffersRestApi\Plugin\GlueApplication\ProductOffersByProductConcreteSkuResourceRelationshipPlugin` | `concrete-products` |
| `ProductOfferAvailabilitiesByProductOfferReferenceResourceRelationshipPlugin` | `Spryker\Glue\ProductOfferAvailabilitiesRestApi\Plugin\GlueApplication\ProductOfferAvailabilitiesByProductOfferReferenceResourceRelationshipPlugin` | `product-offers` |
| `ProductOfferPriceByProductOfferReferenceResourceRelationshipPlugin` | `Spryker\Glue\ProductOfferPricesRestApi\Plugin\GlueApplication\ProductOfferPriceByProductOfferReferenceResourceRelationshipPlugin` | `product-offers` |

**Catalog search relationships:**

| Plugin to remove | Fully qualified class name | Was registered on resource |
|---|---|---|
| `CatalogSearchAbstractProductsResourceRelationshipPlugin` | `Spryker\Glue\CatalogSearchProductsResourceRelationship\Plugin\CatalogSearchAbstractProductsResourceRelationshipPlugin` | `catalog-search` |
| `CatalogSearchSuggestionsAbstractProductsResourceRelationshipPlugin` | `Spryker\Glue\CatalogSearchProductsResourceRelationship\Plugin\CatalogSearchSuggestionsAbstractProductsResourceRelationshipPlugin` | `catalog-search-suggestions` |

**Customer relationships:**

| Plugin to remove | Fully qualified class name | Was registered on resource |
|---|---|---|
| `CustomersToAddressesRelationshipPlugin` | `Spryker\Glue\CustomersRestApi\Plugin\CustomersToAddressesRelationshipPlugin` | `customers` |
| `WishlistRelationshipByResourceIdPlugin` | `Spryker\Glue\WishlistsRestApi\Plugin\WishlistRelationshipByResourceIdPlugin` | `customers` |

**Cart relationships:**

| Plugin to remove | Fully qualified class name | Was registered on resource |
|---|---|---|
| `SharedCartByCartIdResourceRelationshipPlugin` | `Spryker\Glue\SharedCartsRestApi\Plugin\GlueApplication\SharedCartByCartIdResourceRelationshipPlugin` | `carts` |
| `CartPermissionGroupByShareDetailResourceRelationshipPlugin` | `Spryker\Glue\CartPermissionGroupsRestApi\Plugin\GlueApplication\CartPermissionGroupByShareDetailResourceRelationshipPlugin` | `shared-carts` |
| `CompanyUserByShareDetailResourceRelationshipPlugin` | `Spryker\Glue\CompanyUsersRestApi\Plugin\GlueApplication\CompanyUserByShareDetailResourceRelationshipPlugin` | `shared-carts` |
| `PromotionItemByQuoteTransferResourceRelationshipPlugin` | `Spryker\Glue\DiscountPromotionsRestApi\Plugin\GlueApplication\PromotionItemByQuoteTransferResourceRelationshipPlugin` | `carts`, `guest-carts` |
| `SalesUnitsByCartItemResourceRelationshipPlugin` | `Spryker\Glue\ProductMeasurementUnitsRestApi\Plugin\GlueApplication\SalesUnitsByCartItemResourceRelationshipPlugin` | `cart-items`, `guest-cart-items` |

**Checkout data relationships:**

| Plugin to remove | Fully qualified class name | Was registered on resource |
|---|---|---|
| `ShipmentsByCheckoutDataResourceRelationshipPlugin` | `Spryker\Glue\ShipmentsRestApi\Plugin\GlueApplication\ShipmentsByCheckoutDataResourceRelationshipPlugin` | `checkout-data` |
| `PaymentMethodsByCheckoutDataResourceRelationshipPlugin` | `Spryker\Glue\PaymentsRestApi\Plugin\GlueApplication\PaymentMethodsByCheckoutDataResourceRelationshipPlugin` | `checkout-data` |
| `CompanyBusinessUnitAddressByCheckoutDataResourceRelationshipPlugin` | `Spryker\Glue\CompanyBusinessUnitAddressesRestApi\Plugin\GlueApplication\CompanyBusinessUnitAddressByCheckoutDataResourceRelationshipPlugin` | `checkout-data` |
| `AddressByCheckoutDataResourceRelationshipPlugin` | `Spryker\Glue\CustomersRestApi\Plugin\GlueApplication\AddressByCheckoutDataResourceRelationshipPlugin` | `checkout-data` |
| `CartByRestCheckoutDataResourceRelationshipPlugin` | `Spryker\Glue\CartsRestApi\Plugin\GlueApplication\CartByRestCheckoutDataResourceRelationshipPlugin` | `checkout-data` |
| `GuestCartByRestCheckoutDataResourceRelationshipPlugin` | `Spryker\Glue\CartsRestApi\Plugin\GlueApplication\GuestCartByRestCheckoutDataResourceRelationshipPlugin` | `checkout-data` |
| `ServicePointsByCheckoutDataResourceRelationshipPlugin` | `Spryker\Glue\ServicePointsRestApi\Plugin\GlueApplication\ServicePointsByCheckoutDataResourceRelationshipPlugin` | `checkout-data` |

**Order relationships:**

| Plugin to remove | Fully qualified class name | Was registered on resource |
|---|---|---|
| `OrderRelationshipByOrderReferencePlugin` | `Spryker\Glue\OrdersRestApi\Plugin\OrderRelationshipByOrderReferencePlugin` | `checkout` |
| `OrderShipmentByOrderResourceRelationshipPlugin` | `Spryker\Glue\ShipmentsRestApi\Plugin\GlueApplication\OrderShipmentByOrderResourceRelationshipPlugin` | `orders` |
| `OrderAmendmentsByOrderResourceRelationshipPlugin` | `Spryker\Glue\OrderAmendmentsRestApi\Plugin\GlueApplication\OrderAmendmentsByOrderResourceRelationshipPlugin` | `orders` |
| `MerchantsByOrderResourceRelationshipPlugin` | `Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication\MerchantsByOrderResourceRelationshipPlugin` | `orders` |

**Company relationships:**

| Plugin to remove | Fully qualified class name | Was registered on resource |
|---|---|---|
| `CompanyByCompanyUserResourceRelationshipPlugin` | `Spryker\Glue\CompaniesRestApi\Plugin\GlueApplication\CompanyByCompanyUserResourceRelationshipPlugin` | `company-users` |
| `CompanyBusinessUnitByCompanyUserResourceRelationshipPlugin` | `Spryker\Glue\CompanyBusinessUnitsRestApi\Plugin\GlueApplication\CompanyBusinessUnitByCompanyUserResourceRelationshipPlugin` | `company-users` |
| `CompanyRoleByCompanyUserResourceRelationshipPlugin` | `Spryker\Glue\CompanyRolesRestApi\Plugin\GlueApplication\CompanyRoleByCompanyUserResourceRelationshipPlugin` | `company-users` |
| `CustomerByCompanyUserResourceRelationshipPlugin` | `Spryker\Glue\CustomersRestApi\Plugin\GlueApplication\CustomerByCompanyUserResourceRelationshipPlugin` | `company-users` |
| `CompanyByCompanyRoleResourceRelationshipPlugin` | `Spryker\Glue\CompaniesRestApi\Plugin\GlueApplication\CompanyByCompanyRoleResourceRelationshipPlugin` | `company-roles` |
| `CompanyByCompanyBusinessUnitResourceRelationshipPlugin` | `Spryker\Glue\CompaniesRestApi\Plugin\GlueApplication\CompanyByCompanyBusinessUnitResourceRelationshipPlugin` | `company-business-units` |
| `CompanyBusinessUnitAddressesByCompanyBusinessUnitResourceRelationshipPlugin` | `Spryker\Glue\CompanyBusinessUnitAddressesRestApi\Plugin\GlueApplication\CompanyBusinessUnitAddressesByCompanyBusinessUnitResourceRelationshipPlugin` | `company-business-units` |

**Merchant relationships:**

| Plugin to remove | Fully qualified class name | Was registered on resource |
|---|---|---|
| `MerchantOpeningHoursByMerchantReferenceResourceRelationshipPlugin` | `Spryker\Glue\MerchantOpeningHoursRestApi\Plugin\GlueApplication\MerchantOpeningHoursByMerchantReferenceResourceRelationshipPlugin` | `merchants` |
| `MerchantAddressByMerchantReferenceResourceRelationshipPlugin` | `Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication\MerchantAddressByMerchantReferenceResourceRelationshipPlugin` | `merchants` |

**Navigation and content relationships:**

| Plugin to remove | Fully qualified class name | Was registered on resource |
|---|---|---|
| `CategoryNodeByResourceIdResourceRelationshipPlugin` | `Spryker\Glue\NavigationsCategoryNodesResourceRelationship\Plugin\GlueApplication\CategoryNodeByResourceIdResourceRelationshipPlugin` | `navigations` |
| `ProductAbstractByContentProductAbstractListResourceRelationshipPlugin` | `Spryker\Glue\ContentProductAbstractListsRestApi\Plugin\GlueApplication\ProductAbstractByContentProductAbstractListResourceRelationshipPlugin` | `content-product-abstract-lists` |

### Also remove unused config class references

Remove any remaining `use` statements for old RestApi config classes that were referenced in relationship registrations:

- `Spryker\Glue\CatalogSearchRestApi\CatalogSearchRestApiConfig`
- `Spryker\Glue\CheckoutRestApi\CheckoutRestApiConfig`
- `Spryker\Glue\ContentProductAbstractListsRestApi\ContentProductAbstractListsRestApiConfig`
- `Spryker\Glue\CustomersRestApi\CustomersRestApiConfig`
- `Spryker\Glue\DiscountPromotionsRestApi\DiscountPromotionsRestApiConfig`
- `Spryker\Glue\MerchantsRestApi\MerchantsRestApiConfig`
- `Spryker\Glue\MerchantProductOffersRestApi\MerchantProductOffersRestApiConfig`
- `Spryker\Glue\NavigationsRestApi\NavigationsRestApiConfig`
- `Spryker\Glue\OrdersRestApi\OrdersRestApiConfig`
- `Spryker\Glue\ProductMeasurementUnitsRestApi\ProductMeasurementUnitsRestApiConfig`

## 2. Clean up GlueStorefrontApiApplicationDependencyProvider

In `src/Pyz/Glue/GlueStorefrontApiApplication/GlueStorefrontApiApplicationDependencyProvider.php`, remove the following plugins.

**From `getResourcePlugins()`:**

| Plugin to remove | Fully qualified class name |
|---|---|
| `OauthApiTokenResource` | `Spryker\Glue\OauthApi\Plugin\GlueApplication\OauthApiTokenResource` |
| `StoresResource` | `Spryker\Glue\StoresApi\Plugin\GlueStorefrontApiApplication\StoresResource` |
| `MultiFactorAuthStorefrontResourcePlugin` | `Spryker\Glue\MultiFactorAuth\Plugin\GlueStorefrontApiApplication\MultiFactorAuthStorefrontResourcePlugin` |
| `MultiFactorAuthTriggerStorefrontResourcePlugin` | `Spryker\Glue\MultiFactorAuth\Plugin\GlueStorefrontApiApplication\MultiFactorAuthTriggerStorefrontResourcePlugin` |
| `MultiFactorAuthTypeActivateStorefrontResourcePlugin` | `Spryker\Glue\MultiFactorAuth\Plugin\GlueStorefrontApiApplication\MultiFactorAuthTypeActivateStorefrontResourcePlugin` |
| `MultiFactorAuthTypeDeactivateStorefrontResourcePlugin` | `Spryker\Glue\MultiFactorAuth\Plugin\GlueStorefrontApiApplication\MultiFactorAuthTypeDeactivateStorefrontResourcePlugin` |
| `MultiFactorAuthTypeVerifyStorefrontResourcePlugin` | `Spryker\Glue\MultiFactorAuth\Plugin\GlueStorefrontApiApplication\MultiFactorAuthTypeVerifyStorefrontResourcePlugin` |

**From `getRequestAfterRoutingValidatorPlugins()`:**

| Plugin to remove | Fully qualified class name |
|---|---|
| `MultiFactorAuthStorefrontApiRequestValidatorPlugin` | `Spryker\Glue\MultiFactorAuth\Plugin\GlueStorefrontApiApplication\MultiFactorAuthStorefrontApiRequestValidatorPlugin` |

## 3. Clean up GlueBackendApiApplicationDependencyProvider

In `src/Pyz/Glue/GlueBackendApiApplication/GlueBackendApiApplicationDependencyProvider.php`, remove the following plugins from `getResourcePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `PickingListsBackendResourcePlugin` | `Spryker\Glue\PickingListsBackendApi\Plugin\GlueBackendApiApplication\PickingListsBackendResourcePlugin` |
| `PickingListItemsBackendResourcePlugin` | `Spryker\Glue\PickingListsBackendApi\Plugin\GlueBackendApiApplication\PickingListItemsBackendResourcePlugin` |
| `ShipmentTypesBackendResourcePlugin` | `Spryker\Glue\ShipmentTypesBackendApi\Plugin\GlueBackendApiApplication\ShipmentTypesBackendResourcePlugin` |

## 4. Delete obsolete Pyz RestApi modules and create replacements

The following table shows old Pyz RestApi modules that must be deleted and the new Pyz modules that replace them.

{% info_block infoBox "Per-module guides" %}

Detailed step-by-step instructions including the exact content of each replacement file are provided in the [per-module migration guides](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html#per-module-migration-guides). This section provides the overview and rationale.

{% endinfo_block %}

### CartsRestApi to Cart

**Delete:** `src/Pyz/CartsRestApi/` (entire directory)

This module contained:
- `Pyz\Glue\CartsRestApi\CartsRestApiConfig` — guest cart resource configuration, eager relationship settings
- `Pyz\Zed\CartsRestApi\CartsRestApiConfig` — quote creation settings during quote merging
- `Pyz\Zed\CartsRestApi\CartsRestApiDependencyProvider` — Zed-side cart quote expander and mapper plugins

**Create:** `src/Pyz/Cart/src/Pyz/Glue/Cart/CartDependencyProvider.php`

The new module registers item request expanders, item response mappers, and cart resource mappers through the new `CartExtension` plugin interfaces. See [Migrate CartsRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-cartsrestapi.html) for the full file content.

### CartCodesRestApi to CartCode

**Delete:** `src/Pyz/CartCodesRestApi/` (entire directory)

This module contained:
- `Pyz\Glue\CartCodesRestApi\CartCodesRestApiDependencyProvider` — discount promotion mapper plugin

**Create:** `src/Pyz/CartCode/src/Pyz/Glue/CartCode/CartCodeDependencyProvider.php`

The new module registers cart resource mapper plugins. See [Migrate CartCodesRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-cartcodesrestapi.html) for the full file content.

### CheckoutRestApi to Checkout

**Delete:** `src/Pyz/CheckoutRestApi/` (entire directory)

This module contained:
- `Pyz\Glue\CheckoutRestApi\CheckoutRestApiDependencyProvider` — checkout request validators, response mappers, request expanders
- `Pyz\Glue\CheckoutRestApi\CheckoutRestApiConfig` — payment method field mappings, state machine mapping
- `Pyz\Zed\CheckoutRestApi\CheckoutRestApiConfig` — Zed-side checkout configuration
- `Pyz\Zed\CheckoutRestApi\CheckoutRestApiDependencyProvider` — Zed-side checkout plugins
- `Pyz\Shared\CheckoutRestApi\Transfer\checkout_rest_api.transfer.xml` — custom transfer definitions

**Create:**
- `src/Pyz/Checkout/src/Pyz/Glue/Checkout/CheckoutDependencyProvider.php` — request expanders and validators
- `src/Pyz/Checkout/src/Pyz/Glue/Checkout/CheckoutConfig.php` — payment method to state machine mapping

See [Migrate CheckoutRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-checkoutrestapi.html) for the full file content.

### OrdersRestApi to Sales

**Delete:** `src/Pyz/OrdersRestApi/` (entire directory)

This module contained:
- `Pyz\Glue\OrdersRestApi\OrdersRestApiDependencyProvider` — order item attribute mappers and order details attribute mappers

**Create:** `src/Pyz/Sales/src/Pyz/Glue/Sales/SalesDependencyProvider.php`

The new module registers order item expander and order details expander plugins. The plugin interface naming changed from `RestOrderItemsAttributesMapperPlugin` to `OrderItemExpanderPlugin`. See [Migrate OrdersRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-ordersrestapi.html) for the full file content.

### MerchantsRestApi — delete only

**Delete:** `src/Pyz/MerchantsRestApi/` (entire directory)

This module contained:
- `Pyz\Glue\MerchantsRestApi\MerchantsRestApiDependencyProvider` — merchant category attribute mapper plugin

**No replacement needed.** Merchant attribute mapping is now handled internally by the API Platform `Merchant` module provider.

### SharedCartsRestApi to Authentication

**Delete:** `src/Pyz/SharedCartsRestApi/` (entire directory)

This module contained:
- `Pyz\Glue\SharedCartsRestApi\SharedCartsRestApiDependencyProvider` — company user storage provider plugin

**Create:** `src/Pyz/Authentication/src/Pyz/Glue/Authentication/AuthenticationDependencyProvider.php`

Company user identity resolution has moved to the centralized `Authentication` module. The new module registers customer identity expander plugins via `AuthenticationExtension`. See [Migrate SharedCartsRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-sharedcartsrestapi.html) for the full file content.

### CustomerAccessRestApi — delete only

**Delete:** `src/Pyz/CustomerAccessRestApi/` (entire directory)

This module contained:
- `Pyz\Glue\CustomerAccessRestApi\CustomerAccessRestApiConfig` — content type to REST resource type mapping

**No replacement needed.** Customer access control is now handled through API Platform security expressions in YAML resource definitions. See [Migrate CustomerAccessRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-customeraccessrestapi.html).

## 5. Migrate custom plugin implementations

If your project implemented custom plugins against old `*RestApiExtension` interfaces, you need to update them to the new extension interfaces.

### Cart extension plugins

| Old interface (`CartsRestApiExtension`) | New interface (`CartExtension`) | Changes |
|---|---|---|
| `CartItemExpanderPluginInterface` | `CartItemRequestExpanderPluginInterface` | Method parameter changed from `RestCartItemsAttributesTransfer` to API Platform resource object |
| `RestCartItemsAttributesMapperPluginInterface` | `CartItemStorefrontResourceMapperPluginInterface` | Method parameter changed from `RestItemsAttributesTransfer` to API Platform resource object |
| `RestCartAttributesMapperPluginInterface` | `CartStorefrontResourceMapperPluginInterface` | Method parameter changed from `RestCartsAttributesTransfer` to API Platform resource object |
| `CartItemFilterPluginInterface` | `CartItemFilterPluginInterface` | No changes — interface is identical |

### Checkout extension plugins

| Old interface (`CheckoutRestApiExtension`) | New interface (`CheckoutExtension`) | Changes |
|---|---|---|
| `CheckoutRequestValidatorPluginInterface` | `CheckoutValidatorPluginInterface` | Method changed: now receives `CheckoutRequestTransfer` instead of `RestCheckoutRequestAttributesTransfer`, returns `ErrorCollectionTransfer` instead of `RestErrorCollectionTransfer` |
| `CheckoutRequestExpanderPluginInterface` | `CheckoutRequestExpanderPluginInterface` | Method changed: now receives `CheckoutRequestTransfer` and `array $context` instead of `RestRequestInterface` and `RestCheckoutRequestAttributesTransfer` |
| `CheckoutDataResponseMapperPluginInterface` | — | **Removed.** Response mapping is handled automatically by API Platform serialization |
| `CheckoutResponseMapperPluginInterface` | — | **Removed.** Response mapping is handled automatically by API Platform serialization |

### Customer extension plugins

| Old interface (`CustomersRestApiExtension`) | New interface (`CustomerExtension`) | Changes |
|---|---|---|
| `CustomerPostCreatePluginInterface` | `CustomerPostCreatePluginInterface` | Method changed: no longer receives `RestRequestInterface`, return type changed from `CustomerTransfer` to `void` |
| `CustomerExpanderPluginInterface` | — | **Removed.** Use `CustomerIdentityExpanderPluginInterface` in `AuthenticationExtension` for customer identity expansion |

### Authentication extension plugins (new)

These are new plugin interfaces introduced by the API Platform architecture:

| Interface (`AuthenticationExtension`) | Purpose |
|---|---|
| `CustomerIdentityExpanderPluginInterface` | Expands the authenticated customer identity with additional data (for example, company user data) |
| `PostAuthenticationPluginInterface` | Executes logic after successful OAuth authentication (for example, guest cart conversion) |

## 6. Migrate custom REST API endpoints

If your project created custom Glue REST API endpoints in `src/Pyz/`, you need to migrate them to the API Platform architecture.

### Old pattern

In the legacy Glue REST API, a custom endpoint required:

1. A `ResourceRoutePlugin` registered in `GlueApplicationDependencyProvider::getResourceRoutePlugins()`
2. A `RestResourceController` with action methods (`getAction`, `postAction`, etc.)
3. REST attributes transfer objects defined in `transfer.xml`
4. A mapper class to convert between domain transfers and REST attributes
5. Optional: relationship plugins, request validators

### New pattern

In API Platform, a custom endpoint requires:

1. A YAML resource definition in `resources/api/storefront/your-resource.resource.yml`
2. A YAML validation definition in `resources/api/storefront/your-resource.validation.yml`
3. A Provider class extending `AbstractStorefrontProvider` (for GET operations)
4. A Processor class extending `AbstractStorefrontProcessor` (for POST/PATCH/DELETE operations)
5. Auto-generated resource class (generated by `api:generate` from the YAML definition)

### Migration steps for a custom endpoint

1. Create the YAML resource definition at `src/Pyz/{YourModule}/resources/api/storefront/your-resource.resource.yml`:

```yaml
resource:
    name: YourResources
    shortName: your-resources
    description: 'Description of your resource'

    provider: Pyz\Glue\YourModule\Api\Storefront\Provider\YourResourcesStorefrontProvider
    processor: Pyz\Glue\YourModule\Api\Storefront\Processor\YourResourcesStorefrontProcessor

    paginationEnabled: true
    security: "is_granted('ROLE_CUSTOMER')"

    operations:
        - type: GetCollection
        - type: Get
        - type: Post
        - type: Patch
        - type: Delete

    properties:
        id:
            type: string
            identifier: true
            writable: false
            readable: true
        name:
            type: string
            readable: true
            writable: true
```

2. Create the validation definition at `src/Pyz/{YourModule}/resources/api/storefront/your-resource.validation.yml`:

```yaml
post:
    name:
        - NotBlank: ~
```

3. Create the Provider class:

```php
<?php

declare(strict_types = 1);

namespace Pyz\Glue\YourModule\Api\Storefront\Provider;

use Spryker\Glue\GlueStorefrontApiApplication\Api\Provider\AbstractStorefrontProvider;

class YourResourcesStorefrontProvider extends AbstractStorefrontProvider
{
    protected function provideCollection(): array
    {
        // Load and return collection of resource objects
        return [];
    }

    protected function provideItem(): ?object
    {
        // Load and return single resource object
        return null;
    }
}
```

4. Create the Processor class:

```php
<?php

declare(strict_types = 1);

namespace Pyz\Glue\YourModule\Api\Storefront\Processor;

use Spryker\Glue\GlueStorefrontApiApplication\Api\Processor\AbstractStorefrontProcessor;

class YourResourcesStorefrontProcessor extends AbstractStorefrontProcessor
{
    protected function processPost(mixed $data): mixed
    {
        // Handle POST — $data is the auto-generated resource object
        return $data;
    }

    protected function processPatch(mixed $data): mixed
    {
        // Handle PATCH
        return $data;
    }

    protected function processDelete(): mixed
    {
        // Handle DELETE
        return null;
    }
}
```

5. Generate the resource class and clear the cache:

```bash
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

6. Remove the old `ResourceRoutePlugin` from `GlueApplicationDependencyProvider::getResourceRoutePlugins()`.

7. Delete the old controller, mapper, and REST attributes transfer classes.

## 7. Architecture changes reference

This table summarizes the paradigm shifts for quick reference when migrating project-level code.

| Concern | Old (Glue REST API) | New (API Platform) |
|---|---|---|
| Route registration | `ResourceRoutePlugin` in `GlueApplicationDependencyProvider` | YAML resource definition (auto-discovered) |
| Data reading | `RestResourceController` + Reader | Provider extending `AbstractStorefrontProvider` |
| Data writing | `RestResourceController` + Writer | Processor extending `AbstractStorefrontProcessor` |
| Response format | Manual `RestResponseBuilder` | Automatic serialization from resource objects |
| Relationships | `ResourceRelationshipPlugin` | Declarative `includes`/`includableIn` in YAML |
| Request validation | `RestRequestValidatorPlugin` | Symfony Validator constraints in `.validation.yml` |
| Authorization | `AuthorizationStrategyPluginInterface` | Symfony Voter + YAML `security` expressions |
| Error handling | `$restResponse->addError()` | Throw `GlueApiException` (auto-serialized to JSON:API format) |
| Dependencies | Bridge classes + DependencyProvider constants | Constructor injection (Symfony DI) |
| Customer context | `$restRequest->getRestUser()` | `$this->getCustomer()` from `AbstractStorefrontProvider` |
| User context (backend) | `$glueRequestTransfer->getRequestUser()` | `$this->getUser()` from `AbstractBackendProvider` |

## After migration

After completing the cross-cutting cleanup, regenerate transfers, API resources, and clear the cache:

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

Clean up unused imports and verify that your `GlueApplicationDependencyProvider` compiles without errors. Any remaining `use` statements pointing to deleted RestApi modules will cause autoload failures.
