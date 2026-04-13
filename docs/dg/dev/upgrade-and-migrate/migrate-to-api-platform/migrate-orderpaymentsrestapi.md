---
title: "Migrate OrderPaymentsRestApi and PaymentsRestApi to API Platform"
description: Step-by-step guide to migrate the OrderPaymentsRestApi and PaymentsRestApi modules to the API Platform Payment module.
last_updated: Apr 07, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `OrderPaymentsRestApi` and `PaymentsRestApi` Glue modules to the API Platform `Payment` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

## Overview

These two modules provided the following storefront endpoints:

| Endpoint | Operation | Old plugin | Source module |
|---|---|---|---|
| `POST /order-payments` | Submit payment for order | `OrderPaymentsResourceRoutePlugin` | `OrderPaymentsRestApi` |
| `POST /payments` | Initiate payment | `PaymentsResourceRoutePlugin` | `PaymentsRestApi` |
| `POST /payment-cancellations` | Cancel payment | `PaymentCancellationsResourceRoutePlugin` | `PaymentsRestApi` |
| `GET /customers/{id}/payment-customers` | Get payment customer data | `PaymentCustomersResourceRoutePlugin` | `PaymentsRestApi` |

These are now served by the API Platform `Payment` module.

## 1. Update module dependencies

```bash
composer require spryker/payment:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugins from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugins from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `OrderPaymentsResourceRoutePlugin` | `Spryker\Glue\OrderPaymentsRestApi\Plugin\OrderPaymentsResourceRoutePlugin` |
| `PaymentsResourceRoutePlugin` | `Spryker\Glue\PaymentsRestApi\Plugin\GlueApplication\PaymentsResourceRoutePlugin` |
| `PaymentCancellationsResourceRoutePlugin` | `Spryker\Glue\PaymentsRestApi\Plugin\GlueApplication\PaymentCancellationsResourceRoutePlugin` |

{% info_block infoBox "PaymentCustomersResourceRoutePlugin" %}

`PaymentCustomersResourceRoutePlugin` is a sub-resource route and may not be present in all projects. Remove it if it is registered in your `getResourceRoutePlugins()`.

{% endinfo_block %}

## 3. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

| Plugin | Registered on resource | Status | Notes |
|---|---|---|---|
| `PaymentMethodsByCheckoutDataResourceRelationshipPlugin` | `checkout-data` | Removed | The `Checkout` API Platform module handles payment method relationships. This plugin was removed as part of [Migrate CheckoutRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-checkoutrestapi.html). |
