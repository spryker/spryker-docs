---
title: "Migrate CustomersRestApi to API Platform"
description: Step-by-step guide to migrate the CustomersRestApi module to the API Platform Customer module.
last_updated: Mar 31, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
  - title: How to integrate API Platform
    link: /docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html
---

This document describes how to migrate the `CustomersRestApi` Glue module to the API Platform `Customer` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

## Overview

The `CustomersRestApi` module provided the following storefront endpoints:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `GET /customers/{customerReference}` | Get customer | `CustomersResourceRoutePlugin` |
| `POST /customers` | Register customer | `CustomersResourceRoutePlugin` |
| `PATCH /customers/{customerReference}` | Update customer | `CustomersResourceRoutePlugin` |
| `DELETE /customers/{customerReference}` | Delete customer | `CustomersResourceRoutePlugin` |
| `GET /customers/{customerReference}/addresses` | List addresses | `AddressesResourceRoutePlugin` |
| `GET /customers/{customerReference}/addresses/{addressUuid}` | Get address | `AddressesResourceRoutePlugin` |
| `POST /customers/{customerReference}/addresses` | Create address | `AddressesResourceRoutePlugin` |
| `PATCH /customers/{customerReference}/addresses/{addressUuid}` | Update address | `AddressesResourceRoutePlugin` |
| `DELETE /customers/{customerReference}/addresses/{addressUuid}` | Delete address | `AddressesResourceRoutePlugin` |
| `POST /customer-forgotten-password` | Request password reset | `CustomerForgottenPasswordResourceRoutePlugin` |
| `PATCH /customer-restore-password` | Restore password | `CustomerRestorePasswordResourceRoutePlugin` |
| `PATCH /customer-password` | Change password | `CustomerPasswordResourceRoutePlugin` |
| `POST /customer-confirmation` | Confirm registration | `CustomerConfirmationResourceRoutePlugin` |

These are now served by the API Platform `Customer` module through auto-discovered YAML resource definitions.

## 1. Update module dependencies

Update the following modules in your `composer.json`:

```bash
composer require spryker/customer:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module's changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugins from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugins from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `CustomersResourceRoutePlugin` | `Spryker\Glue\CustomersRestApi\Plugin\CustomersResourceRoutePlugin` |
| `CustomerForgottenPasswordResourceRoutePlugin` | `Spryker\Glue\CustomersRestApi\Plugin\CustomerForgottenPasswordResourceRoutePlugin` |
| `CustomerRestorePasswordResourceRoutePlugin` | `Spryker\Glue\CustomersRestApi\Plugin\CustomerRestorePasswordResourceRoutePlugin` |
| `CustomerPasswordResourceRoutePlugin` | `Spryker\Glue\CustomersRestApi\Plugin\CustomerPasswordResourceRoutePlugin` |
| `CustomerConfirmationResourceRoutePlugin` | `Spryker\Glue\CustomersRestApi\Plugin\GlueApplication\CustomerConfirmationResourceRoutePlugin` |
| `AddressesResourceRoutePlugin` | `Spryker\Glue\CustomersRestApi\Plugin\AddressesResourceRoutePlugin` |

## 3. Remove relationship plugins from GlueApplicationDependencyProvider

In the same file, remove the following relationship plugin registrations from `getResourceRelationshipPlugins()`:

| Plugin to remove | Fully qualified class name | Was registered on resource |
|---|---|---|
| `CustomersToAddressesRelationshipPlugin` | `Spryker\Glue\CustomersRestApi\Plugin\CustomersToAddressesRelationshipPlugin` | `customers` |
| `AddressByCheckoutDataResourceRelationshipPlugin` | `Spryker\Glue\CustomersRestApi\Plugin\GlueApplication\AddressByCheckoutDataResourceRelationshipPlugin` | `checkout-data` |

{% info_block warningBox "Relationships" %}

`CustomersToAddressesRelationshipPlugin` is now handled by the `Customer` module through the `include` query parameter. Consumers can request `?include=addresses` on customer endpoints to get address data included in the response.

`AddressByCheckoutDataResourceRelationshipPlugin` is removed because checkout data relationships are now handled by the `Checkout` module's API Platform integration.

{% endinfo_block %}

## 4. Update Checkout Zed dependency provider

In `src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php`, add the following customer plugins.

In `getQuoteMapperPlugins()`, add:

```php
use Spryker\Zed\Customer\Communication\Plugin\Checkout\AddressQuoteMapperPlugin;
use Spryker\Zed\Customer\Communication\Plugin\Checkout\CustomerQuoteMapperPlugin;
```

```php
new CustomerQuoteMapperPlugin(),
new AddressQuoteMapperPlugin(),
```

In `getCheckoutDataValidatorPlugins()` and `getCheckoutDataValidatorPluginsForOrderAmendment()`, add:

```php
use Spryker\Zed\CustomersRestApi\Communication\Plugin\CheckoutRestApi\CustomerAddressCheckoutDataValidatorPlugin;
```

```php
new CustomerAddressCheckoutDataValidatorPlugin(),
```

## 5. Create Checkout Glue dependency provider

Create `src/Pyz/Glue/Checkout/CheckoutDependencyProvider.php`. The `BillingAddressCheckoutRequestAttributesValidatorPlugin` from `CustomersRestApi` has been replaced by `BillingAddressCheckoutValidatorPlugin` from the `Checkout` module.

`src/Pyz/Glue/Checkout/CheckoutDependencyProvider.php`

**Replace:**

```php
use Spryker\Glue\CustomersRestApi\Plugin\CheckoutRestApi\BillingAddressCheckoutRequestAttributesValidatorPlugin;
```

**With:**

```php
use Spryker\Glue\Checkout\Plugin\BillingAddressCheckoutValidatorPlugin;
```

Register `BillingAddressCheckoutValidatorPlugin` in `getCheckoutValidatorPlugins()`.

## 6. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## 7. Modules providing relationships to customers

The following modules previously registered relationship plugins against `CustomersRestApi` resources. After migration, these relationships are handled by API Platform automatically through the `include` parameter:

| Old relationship plugin | Old module | Status |
|---|---|---|
| `CustomersToAddressesRelationshipPlugin` | `CustomersRestApi` | Removed. Now provided by the `Customer` module through the `include` parameter. |
| `CustomerByCompanyUserResourceRelationshipPlugin` | `CustomersRestApi` | Remains on legacy Glue until `CompanyUser` is migrated. Do not remove yet. |
| `CustomerByQuoteRequestResourceRelationshipPlugin` | `CustomersRestApi` | Remains on legacy Glue until `QuoteRequest` is migrated. Do not remove yet. |

