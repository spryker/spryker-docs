---
title: "Migrate CartsRestApi to API Platform"
description: Step-by-step guide to migrate the CartsRestApi module to the API Platform Cart module.
last_updated: Mar 31, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `CartsRestApi` Glue module to the API Platform `Cart` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

## Overview

The `CartsRestApi` module provided the following storefront endpoints:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `GET /carts` | List carts | `CartsResourceRoutePlugin` |
| `GET /carts/{cartId}` | Get cart | `CartsResourceRoutePlugin` |
| `POST /carts` | Create cart | `CartsResourceRoutePlugin` |
| `PATCH /carts/{cartId}` | Update cart | `CartsResourceRoutePlugin` |
| `DELETE /carts/{cartId}` | Delete cart | `CartsResourceRoutePlugin` |
| `POST /carts/{cartId}/items` | Add item to cart | `CartItemsResourceRoutePlugin` |
| `PATCH /carts/{cartId}/items/{itemGroupKey}` | Update cart item | `CartItemsResourceRoutePlugin` |
| `DELETE /carts/{cartId}/items/{itemGroupKey}` | Remove cart item | `CartItemsResourceRoutePlugin` |
| `GET /customers/{customerReference}/carts` | List customer carts | `CustomerCartsResourceRoutePlugin` |
| `GET /guest-carts` | List guest carts | `GuestCartsResourceRoutePlugin` |
| `GET /guest-carts/{guestCartId}` | Get guest cart | `GuestCartsResourceRoutePlugin` |
| `POST /guest-carts/{guestCartId}/guest-cart-items` | Add guest cart item | `GuestCartItemsResourceRoutePlugin` |
| `PATCH /guest-carts/{guestCartId}/guest-cart-items/{itemGroupKey}` | Update guest cart item | `GuestCartItemsResourceRoutePlugin` |
| `DELETE /guest-carts/{guestCartId}/guest-cart-items/{itemGroupKey}` | Remove guest cart item | `GuestCartItemsResourceRoutePlugin` |

These are now served by the API Platform `Cart` module.

## 1. Update module dependencies

```bash
composer require spryker/cart:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugins from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugins from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `CartsResourceRoutePlugin` | `Spryker\Glue\CartsRestApi\Plugin\ResourceRoute\CartsResourceRoutePlugin` |
| `CartItemsResourceRoutePlugin` | `Spryker\Glue\CartsRestApi\Plugin\ResourceRoute\CartItemsResourceRoutePlugin` |
| `GuestCartsResourceRoutePlugin` | `Spryker\Glue\CartsRestApi\Plugin\ResourceRoute\GuestCartsResourceRoutePlugin` |
| `GuestCartItemsResourceRoutePlugin` | `Spryker\Glue\CartsRestApi\Plugin\ResourceRoute\GuestCartItemsResourceRoutePlugin` |
| `CustomerCartsResourceRoutePlugin` | `Spryker\Glue\CartsRestApi\Plugin\ResourceRoute\CustomerCartsResourceRoutePlugin` |

## 3. Remove relationship plugins from GlueApplicationDependencyProvider

In the same file, remove the following relationship plugin registrations from `getResourceRelationshipPlugins()`:

| Plugin to remove | Fully qualified class name | Was registered on resource |
|---|---|---|
| `SharedCartByCartIdResourceRelationshipPlugin` | `Spryker\Glue\SharedCartsRestApi\Plugin\GlueApplication\SharedCartByCartIdResourceRelationshipPlugin` | `carts` |
| `PromotionItemByQuoteTransferResourceRelationshipPlugin` | `Spryker\Glue\DiscountPromotionsRestApi\Plugin\GlueApplication\PromotionItemByQuoteTransferResourceRelationshipPlugin` | `carts` |
| `PromotionItemByQuoteTransferResourceRelationshipPlugin` | `Spryker\Glue\DiscountPromotionsRestApi\Plugin\GlueApplication\PromotionItemByQuoteTransferResourceRelationshipPlugin` | `guest-carts` |
| `CartByRestCheckoutDataResourceRelationshipPlugin` | `Spryker\Glue\CartsRestApi\Plugin\GlueApplication\CartByRestCheckoutDataResourceRelationshipPlugin` | `checkout-data` |
| `GuestCartByRestCheckoutDataResourceRelationshipPlugin` | `Spryker\Glue\CartsRestApi\Plugin\GlueApplication\GuestCartByRestCheckoutDataResourceRelationshipPlugin` | `checkout-data` |
| `SalesUnitsByCartItemResourceRelationshipPlugin` | `Spryker\Glue\ProductMeasurementUnitsRestApi\Plugin\GlueApplication\SalesUnitsByCartItemResourceRelationshipPlugin` | `cart-items` |
| `SalesUnitsByCartItemResourceRelationshipPlugin` | `Spryker\Glue\ProductMeasurementUnitsRestApi\Plugin\GlueApplication\SalesUnitsByCartItemResourceRelationshipPlugin` | `guest-cart-items` |

## 4. Delete the CartsRestApi Pyz module

Delete the entire `src/Pyz/CartsRestApi/` directory. This module contained:

- `Pyz\Glue\CartsRestApi\CartsRestApiConfig` — guest cart resource config, eager relationship config
- `Pyz\Glue\CartsRestApi\CartsRestApiDependencyProvider` — expander and mapper plugins for the legacy Glue REST API
- `Pyz\Zed\CartsRestApi\CartsRestApiConfig` — quote creation config during quote merging
- `Pyz\Zed\CartsRestApi\CartsRestApiDependencyProvider` — Zed-side cart quote expander and mapper plugins

These configurations and plugins have been relocated to the new `Cart` module (see steps 5 and 6).

## 5. Create Cart Glue dependency provider

Create a new file `src/Pyz/Glue/Cart/CartDependencyProvider.php`. This file does not exist yet in your project.

```php
<?php

declare(strict_types = 1);

namespace Pyz\Glue\Cart;

use Spryker\Glue\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Glue\ConfigurableBundle\Plugin\Cart\ConfiguredBundleCartItemResponseMapperPlugin;
use Spryker\Glue\DiscountPromotion\Plugin\Cart\DiscountPromotionCartItemRequestExpanderPlugin;
use Spryker\Glue\MerchantProductOffer\Plugin\Cart\MerchantProductOfferCartItemRequestExpanderPlugin;
use Spryker\Glue\MerchantProductOffer\Plugin\Cart\MerchantProductOfferCartItemResponseMapperPlugin;
use Spryker\Glue\ProductConfiguration\Plugin\Cart\ProductConfigurationCartItemRequestExpanderPlugin;
use Spryker\Glue\ProductConfiguration\Plugin\Cart\ProductConfigurationCartItemResponseMapperPlugin;
use Spryker\Glue\ProductMeasurementUnit\Plugin\Cart\SalesUnitCartItemRequestExpanderPlugin;
use Spryker\Glue\ProductMeasurementUnit\Plugin\Cart\SalesUnitCartItemResponseMapperPlugin;
use Spryker\Glue\ProductOption\Plugin\Cart\ProductOptionCartItemRequestExpanderPlugin;
use Spryker\Glue\ProductOption\Plugin\Cart\ProductOptionCartItemResponseMapperPlugin;
use Spryker\Glue\Sales\Plugin\Cart\OrderAmendmentCartResourceMapperPlugin;
use Spryker\Glue\SalesOrderThreshold\Plugin\Cart\SalesOrderThresholdCartResourceMapperPlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\CartExtension\Dependency\Plugin\CartItemRequestExpanderPluginInterface>
     */
    protected function getCartItemRequestExpanderPlugins(): array
    {
        return [
            new MerchantProductOfferCartItemRequestExpanderPlugin(),
            new ProductOptionCartItemRequestExpanderPlugin(),
            new SalesUnitCartItemRequestExpanderPlugin(),
            new ProductConfigurationCartItemRequestExpanderPlugin(),
            new DiscountPromotionCartItemRequestExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\CartExtension\Dependency\Plugin\CartItemStorefrontResourceMapperPluginInterface>
     */
    protected function getCartItemStorefrontResourceMapperPlugins(): array
    {
        return [
            new MerchantProductOfferCartItemResponseMapperPlugin(),
            new ProductOptionCartItemResponseMapperPlugin(),
            new SalesUnitCartItemResponseMapperPlugin(),
            new ProductConfigurationCartItemResponseMapperPlugin(),
            new ConfiguredBundleCartItemResponseMapperPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\CartExtension\Dependency\Plugin\CartStorefrontResourceMapperPluginInterface>
     */
    protected function getCartStorefrontResourceMapperPlugins(): array
    {
        return [
            new SalesOrderThresholdCartResourceMapperPlugin(),
            new OrderAmendmentCartResourceMapperPlugin(),
        ];
    }
}
```

## 6. Update Cart Zed dependency provider

If your project has a `src/Pyz/Zed/Cart/CartDependencyProvider.php`, add the following methods. If it does not exist yet, create it extending `Spryker\Zed\Cart\CartDependencyProvider`.

Add these plugin registrations:

```php
use Spryker\Zed\CompanyUser\Communication\Plugin\Cart\CustomerCompanyUserQuoteExpanderPlugin;
use Spryker\Zed\DiscountPromotion\Communication\Plugin\Cart\DiscountPromotionCartItemMapperPlugin;
use Spryker\Zed\MerchantProductOffer\Communication\Plugin\Cart\MerchantProductOfferCartItemMapperPlugin;
use Spryker\Zed\PersistentCart\Communication\Plugin\Cart\QuoteCreatorPlugin;
use Spryker\Zed\ProductBundle\Communication\Plugin\Cart\BundleItemQuoteItemReadValidatorPlugin;
use Spryker\Zed\ProductBundle\Communication\Plugin\Cart\BundleItemQuoteMergePersistentCartChangeExpanderPlugin;
use Spryker\Zed\ProductConfigurationCart\Communication\Plugin\Cart\ProductConfigurationCartItemMapperPlugin;
use Spryker\Zed\ProductMeasurementUnit\Communication\Plugin\Cart\SalesUnitCartItemMapperPlugin;
use Spryker\Zed\ProductOptionCartConnector\Communication\Plugin\Cart\ProductOptionCartItemMapperPlugin;
use Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Cart\SalesOrderThresholdQuoteExpanderPlugin;
use Spryker\Zed\SharedCart\Communication\Plugin\Cart\QuotePermissionGroupQuoteExpanderPlugin;
use Spryker\Zed\SharedCart\Communication\Plugin\Cart\SharedCartQuoteCollectionExpanderPlugin;

// In getQuoteCreatorPlugin():
return new QuoteCreatorPlugin();

// In getQuoteCollectionExpanderPlugins():
return [
    new SharedCartQuoteCollectionExpanderPlugin(),
];

// In getQuoteExpanderPlugins():
return [
    new QuotePermissionGroupQuoteExpanderPlugin(),
    new CustomerCompanyUserQuoteExpanderPlugin(),
    new SalesOrderThresholdQuoteExpanderPlugin(),
];

// In getCartItemMapperPlugins():
return [
    new ProductOptionCartItemMapperPlugin(),
    new DiscountPromotionCartItemMapperPlugin(),
    new SalesUnitCartItemMapperPlugin(),
    new MerchantProductOfferCartItemMapperPlugin(),
    new ProductConfigurationCartItemMapperPlugin(),
];

// In getQuoteItemReadValidatorPlugins():
return [
    new BundleItemQuoteItemReadValidatorPlugin(),
];

// In getQuoteMergePersistentCartChangeExpanderPlugins():
return [
    new BundleItemQuoteMergePersistentCartChangeExpanderPlugin(),
];
```

## 7. Create Cart Zed config

Create a new file `src/Pyz/Zed/Cart/CartConfig.php` to migrate the quote creation config from the deleted `CartsRestApiConfig`. This file does not exist yet in your project.

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartConfig as SprykerCartConfig;

class CartConfig extends SprykerCartConfig
{
    protected const bool IS_QUOTE_CREATION_WHILE_QUOTE_MERGING_ENABLED = true;
}
```

## 8. Register guest cart conversion on authentication

Wire the guest-to-customer cart conversion plugin into the OAuth post-authentication flow. If your project has a `src/Pyz/Zed/Oauth/OauthDependencyProvider.php`, add the method below. If it does not exist yet, create it extending `Spryker\Zed\Oauth\OauthDependencyProvider`.

```php
use Spryker\Zed\Cart\Communication\Plugin\Oauth\ConvertGuestCartOauthPostAuthenticationPlugin;

/**
 * @return array<\Spryker\Zed\OauthExtension\Dependency\Plugin\OauthPostAuthenticationPluginInterface>
 */
protected function getPostAuthenticationPlugins(): array
{
    return [
        new ConvertGuestCartOauthPostAuthenticationPlugin(),
    ];
}
```

## 9. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

| Plugin | Status |
|---|---|
| `SharedCartByCartIdResourceRelationshipPlugin` (`SharedCartsRestApi`) | Removed. Now provided by the `SharedCart` module through the `include` parameter. |
| `PromotionItemByQuoteTransferResourceRelationshipPlugin` (`DiscountPromotionsRestApi`) | Removed. Now provided by the `Cart` module through the `promotional-items` resource. |
| `CartByRestCheckoutDataResourceRelationshipPlugin` (`CartsRestApi`) | Removed. Now handled by the `Checkout` module. |
| `GuestCartByRestCheckoutDataResourceRelationshipPlugin` (`CartsRestApi`) | Removed. Now handled by the `Checkout` module. |
| `SalesUnitsByCartItemResourceRelationshipPlugin` (`ProductMeasurementUnitsRestApi`) | Removed. Now provided by the `Cart` module through cart item expander plugins. |
| `CartPermissionGroupByQuoteResourceRelationshipPlugin` (`CartPermissionGroupsRestApi`) | Remains on legacy Glue until all old Glue cart endpoints are fully decommissioned. Do not remove yet. |
| `CartItemsByQuoteResourceRelationshipPlugin` (`CartsRestApi`) | Remains on legacy Glue. Do not remove yet. |
| `GuestCartItemsByQuoteResourceRelationshipPlugin` (`CartsRestApi`) | Remains on legacy Glue. Do not remove yet. |
| `VoucherByQuoteResourceRelationshipPlugin` (`CartCodesRestApi`) | Remains on legacy Glue. Do not remove yet. |
| `CartRuleByQuoteResourceRelationshipPlugin` (`CartCodesRestApi`) | Remains on legacy Glue. Do not remove yet. |
| `BundleItemByQuoteResourceRelationshipPlugin` (`ProductBundleCartsRestApi`) | Remains on legacy Glue. Do not remove yet. |
| `GuestBundleItemByQuoteResourceRelationshipPlugin` (`ProductBundleCartsRestApi`) | Remains on legacy Glue. Do not remove yet. |
