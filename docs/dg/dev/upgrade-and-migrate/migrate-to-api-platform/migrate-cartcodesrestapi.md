---
title: "Migrate CartCodesRestApi to API Platform"
description: Step-by-step guide to migrate the CartCodesRestApi module to the API Platform CartCode module.
last_updated: Mar 31, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `CartCodesRestApi` Glue module to the API Platform `CartCode` module.

## Prerequisites

- Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html).
- Migrate `CartsRestApi` first, as described in [Migrate CartsRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-cartsrestapi.html). The `CartCode` module depends on the `Cart` module for cart resource resolution.

## Overview

The `CartCodesRestApi` module provided the following storefront endpoints:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `POST /carts/{cartId}/cart-codes` | Apply code to cart | `CartCodesResourceRoutePlugin` |
| `DELETE /carts/{cartId}/cart-codes/{code}` | Remove code from cart | `CartCodesResourceRoutePlugin` |
| `POST /carts/{cartId}/vouchers` | Apply voucher to cart | `CartVouchersResourceRoutePlugin` |
| `DELETE /carts/{cartId}/vouchers/{code}` | Remove voucher from cart | `CartVouchersResourceRoutePlugin` |
| `POST /guest-carts/{guestCartId}/guest-cart-codes` | Apply code to guest cart | `GuestCartCodesResourceRoutePlugin` |
| `DELETE /guest-carts/{guestCartId}/guest-cart-codes/{code}` | Remove code from guest cart | `GuestCartCodesResourceRoutePlugin` |
| `POST /guest-carts/{guestCartId}/guest-cart-vouchers` | Apply voucher to guest cart | `GuestCartVouchersResourceRoutePlugin` |
| `DELETE /guest-carts/{guestCartId}/guest-cart-vouchers/{code}` | Remove voucher from guest cart | `GuestCartVouchersResourceRoutePlugin` |

These are now served by the API Platform `CartCode` module.

## 1. Update module dependencies

```bash
composer require spryker/cart-code:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugins from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugins from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `CartVouchersResourceRoutePlugin` | `Spryker\Glue\CartCodesRestApi\Plugin\GlueApplication\CartVouchersResourceRoutePlugin` |
| `GuestCartVouchersResourceRoutePlugin` | `Spryker\Glue\CartCodesRestApi\Plugin\GlueApplication\GuestCartVouchersResourceRoutePlugin` |
| `CartCodesResourceRoutePlugin` | `Spryker\Glue\CartCodesRestApi\Plugin\GlueApplication\CartCodesResourceRoutePlugin` |
| `GuestCartCodesResourceRoutePlugin` | `Spryker\Glue\CartCodesRestApi\Plugin\GlueApplication\GuestCartCodesResourceRoutePlugin` |

## 3. Delete the CartCodesRestApi Pyz module

Delete the entire `src/Pyz/CartCodesRestApi/` directory. This module contained:

- `Pyz\Glue\CartCodesRestApi\CartCodesRestApiDependencyProvider` — had `DiscountPromotionDiscountMapperPlugin` in `getDiscountMapperPlugins()`

This mapping is now handled internally by the `CartCode` module.

## 4. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

| Plugin | Status |
|---|---|
| `VoucherByQuoteResourceRelationshipPlugin` (`CartCodesRestApi`) | Remains on legacy Glue for old cart endpoints. Do not remove yet. |
| `CartRuleByQuoteResourceRelationshipPlugin` (`CartCodesRestApi`) | Remains on legacy Glue for old cart endpoints. Do not remove yet. |
