---
title: "Migrate CustomersRestApi to API Platform"
description: Step-by-step guide to migrate the CustomersRestApi module to the API Platform Customer module.
last_updated: Mar 31, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
  - title: How to integrate API Platform
    link: docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html
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

These relationships are now resolved automatically by API Platform through the `include` query parameter. Consumers can request `?include=addresses` on customer endpoints to get address data included in the response.

{% endinfo_block %}

## 4. Update Checkout Zed dependency provider

The `AddressQuoteMapperPlugin` and `CustomerQuoteMapperPlugin` have been moved from `CustomersRestApi` to the core `Customer` module. Update the namespace in your checkout dependency provider.

`src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php`

**Replace:**

```php
use Spryker\Zed\CustomersRestApi\Communication\Plugin\CheckoutRestApi\AddressQuoteMapperPlugin;
use Spryker\Zed\CustomersRestApi\Communication\Plugin\CheckoutRestApi\CustomerQuoteMapperPlugin;
```

**With:**

```php
use Spryker\Zed\Customer\Communication\Plugin\Checkout\AddressQuoteMapperPlugin;
use Spryker\Zed\Customer\Communication\Plugin\Checkout\CustomerQuoteMapperPlugin;
```

Register these in the `getQuoteMapperPlugins()` method if not already present.

## 5. Update Checkout Glue dependency provider

If you have a `BillingAddressCheckoutRequestAttributesValidatorPlugin` from `CustomersRestApi`, replace it with the new API Platform equivalent.

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
docker/sdk cli "GLUE_APPLICATION=storefront console api:generate"
docker/sdk cli console cache:clear
```

## 7. Modules providing relationships to customers

The following modules previously registered relationship plugins against `CustomersRestApi` resources. After migration, these relationships are handled by API Platform automatically through the `include` parameter:

| Old relationship plugin | Old module | Now provided by |
|---|---|---|
| `CustomersToAddressesRelationshipPlugin` | `CustomersRestApi` | `Customer` module (customers-addresses resource) |
| `WishlistRelationshipByResourceIdPlugin` | `WishlistsRestApi` | Not yet migrated — remains on legacy Glue |
| `CustomerByCompanyUserResourceRelationshipPlugin` | `CustomersRestApi` | `CompanyUser` module (includes customer data) |

## Verification

1. Test customer registration:

   ```bash
   curl -X POST https://glue-storefront.mysprykershop.com/customers \
     -H "Content-Type: application/vnd.api+json" \
     -d '{"data":{"type":"customers","attributes":{"firstName":"John","lastName":"Doe","email":"john.doe@example.com","password":"Change123!","confirmPassword":"Change123!","acceptedTerms":true}}}'
   ```

2. Test getting a customer (authenticated):

   ```bash
   curl -X GET https://glue-storefront.mysprykershop.com/customers/{customerReference} \
     -H "Authorization: Bearer {access_token}" \
     -H "Accept: application/vnd.api+json"
   ```

3. Test customer addresses with include:

   ```bash
   curl -X GET https://glue-storefront.mysprykershop.com/customers/{customerReference}?include=addresses \
     -H "Authorization: Bearer {access_token}" \
     -H "Accept: application/vnd.api+json"
   ```

4. Verify that password reset, password change, and registration confirmation endpoints work as expected.
