---
title: "Migrate CheckoutRestApi to API Platform"
description: Step-by-step guide to migrate the CheckoutRestApi module to the API Platform Checkout module.
last_updated: Apr 07, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `CheckoutRestApi` Glue module to the API Platform `Checkout` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

Migrating `CheckoutRestApi` requires these modules to be migrated first:
- [Migrate CartsRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-cartsrestapi.html)
- [Migrate CustomersRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-customersrestapi.html)

## Overview

The `CheckoutRestApi` module provided the following storefront endpoints:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `POST /checkout` | Submit order | `CheckoutResourcePlugin` |
| `POST /checkout-data` | Validate and preview checkout data | `CheckoutDataResourcePlugin` |

These are now served by the API Platform `Checkout` module.

## 1. Update module dependencies

```bash
composer require spryker/checkout:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugins from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugins from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `CheckoutResourcePlugin` | `Spryker\Glue\CheckoutRestApi\Plugin\GlueApplication\CheckoutResourcePlugin` |
| `CheckoutDataResourcePlugin` | `Spryker\Glue\CheckoutRestApi\Plugin\GlueApplication\CheckoutDataResourcePlugin` |

## 3. Remove checkout-data relationship plugins

In the `getResourceRelationshipPlugins()` method, remove the following relationship registrations, which were all registered on `CheckoutRestApiConfig::RESOURCE_CHECKOUT_DATA`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `ShipmentsByCheckoutDataResourceRelationshipPlugin` | `Spryker\Glue\ShipmentsRestApi\Plugin\GlueApplication\ShipmentsByCheckoutDataResourceRelationshipPlugin` |
| `PaymentMethodsByCheckoutDataResourceRelationshipPlugin` | `Spryker\Glue\PaymentsRestApi\Plugin\GlueApplication\PaymentMethodsByCheckoutDataResourceRelationshipPlugin` |
| `CompanyBusinessUnitAddressByCheckoutDataResourceRelationshipPlugin` | `Spryker\Glue\CompanyBusinessUnitAddressesRestApi\Plugin\GlueApplication\CompanyBusinessUnitAddressByCheckoutDataResourceRelationshipPlugin` |
| `AddressByCheckoutDataResourceRelationshipPlugin` | `Spryker\Glue\CustomersRestApi\Plugin\GlueApplication\AddressByCheckoutDataResourceRelationshipPlugin` |
| `CartByRestCheckoutDataResourceRelationshipPlugin` | `Spryker\Glue\CartsRestApi\Plugin\GlueApplication\CartByRestCheckoutDataResourceRelationshipPlugin` |
| `GuestCartByRestCheckoutDataResourceRelationshipPlugin` | `Spryker\Glue\CartsRestApi\Plugin\GlueApplication\GuestCartByRestCheckoutDataResourceRelationshipPlugin` |
| `ServicePointsByCheckoutDataResourceRelationshipPlugin` | `Spryker\Glue\ServicePointsRestApi\Plugin\GlueApplication\ServicePointsByCheckoutDataResourceRelationshipPlugin` |

## 4. Delete the obsolete Pyz CheckoutRestApi module

The project-level `CheckoutRestApi` Glue and Zed Pyz override modules are no longer needed. Delete the entire directory:

```text
src/Pyz/CheckoutRestApi/
```

This removes:
- `src/Pyz/Glue/CheckoutRestApi/CheckoutRestApiConfig.php` — payment method required fields and flags are now configured in `src/Pyz/Glue/Checkout/CheckoutConfig.php`
- `src/Pyz/Glue/CheckoutRestApi/CheckoutRestApiDependencyProvider.php` — validator and mapper plugins are now registered in `src/Pyz/Glue/Checkout/CheckoutDependencyProvider.php`
- `src/Pyz/Shared/CheckoutRestApi/Transfer/checkout_rest_api.transfer.xml` — the `RestPayment` transfer properties for `DummyPayment` are no longer needed here
- `src/Pyz/Zed/CheckoutRestApi/CheckoutRestApiConfig.php` — recalculation flags are now set in `src/Pyz/Zed/Checkout/CheckoutConfig.php`
- `src/Pyz/Zed/CheckoutRestApi/CheckoutRestApiDependencyProvider.php` — quote mapper and validator plugins are now registered in `src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php`

## 5. Create the Pyz Checkout Glue Config

Create `src/Pyz/Glue/Checkout/CheckoutConfig.php` to carry over payment method configuration and flags from the deleted `CheckoutRestApiConfig.php`:

```php
<?php

declare(strict_types = 1);

namespace Pyz\Glue\Checkout;

use Generated\Shared\Transfer\RestCustomerTransfer;
use Spryker\Glue\Checkout\CheckoutConfig as SprykerCheckoutConfig;

class CheckoutConfig extends SprykerCheckoutConfig
{
    protected const PAYMENT_METHOD_REQUIRED_FIELDS = [
        'dummyPaymentInvoice' => [
            'dummyPaymentInvoice.dateOfBirth',
        ],
        'dummyPaymentCreditCard' => [
            'dummyPaymentCreditCard.cardType',
            'dummyPaymentCreditCard.cardNumber',
            'dummyPaymentCreditCard.nameOnCard',
            'dummyPaymentCreditCard.cardExpiresMonth',
            'dummyPaymentCreditCard.cardExpiresYear',
            'dummyPaymentCreditCard.cardSecurityCode',
        ],
    ];

    public function getPaymentProviderMethodToStateMachineMapping(): array
    {
        return [
            'DummyPayment' => [
                'Credit Card' => 'dummyPaymentCreditCard',
                'Invoice' => 'dummyPaymentInvoice',
            ],
        ];
    }

    public function isShipmentMethodsMappedToAttributes(): bool
    {
        return false;
    }

    public function isPaymentProvidersMappedToAttributes(): bool
    {
        return false;
    }

    public function isAddressesMappedToAttributes(): bool
    {
        return false;
    }

    /**
     * @return list<string>
     */
    public function getRequiredCustomerRequestDataForGuestCheckout(): array
    {
        return array_merge(parent::getRequiredCustomerRequestDataForGuestCheckout(), [
            RestCustomerTransfer::FIRST_NAME,
            RestCustomerTransfer::LAST_NAME,
        ]);
    }
}
```

{% info_block infoBox "Project-specific values" %}

Adjust `PAYMENT_METHOD_REQUIRED_FIELDS` and `getPaymentProviderMethodToStateMachineMapping()` to match your payment provider setup.

{% endinfo_block %}

## 6. Create the Pyz Checkout Glue DependencyProvider

Create `src/Pyz/Glue/Checkout/CheckoutDependencyProvider.php` to wire validators and expanders:

```php
<?php

declare(strict_types = 1);

namespace Pyz\Glue\Checkout;

use Spryker\Glue\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;
use Spryker\Glue\Checkout\Plugin\BillingAddressCheckoutValidatorPlugin;
use Spryker\Glue\Checkout\Plugin\SinglePaymentCheckoutValidatorPlugin;
use Spryker\Glue\CompanyUser\Plugin\Checkout\CompanyUserCheckoutRequestExpanderPlugin;
use Spryker\Glue\ServicePoint\Plugin\Checkout\ServicePointCheckoutValidatorPlugin;
use Spryker\Glue\ShipmentType\Plugin\Checkout\MultiShipmentAddressCheckoutValidatorPlugin;
use Spryker\Glue\ShipmentType\Plugin\Checkout\ShipmentTypeServicePointCheckoutValidatorPlugin;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\CheckoutExtension\Dependency\Plugin\CheckoutRequestExpanderPluginInterface>
     */
    protected function getCheckoutRequestExpanderPlugins(): array
    {
        return [
            new CompanyUserCheckoutRequestExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\CheckoutExtension\Dependency\Plugin\CheckoutValidatorPluginInterface>
     */
    protected function getCheckoutValidatorPlugins(): array
    {
        return [
            new SinglePaymentCheckoutValidatorPlugin(),
            new BillingAddressCheckoutValidatorPlugin(),
            new ServicePointCheckoutValidatorPlugin(),
            new ShipmentTypeServicePointCheckoutValidatorPlugin(),
            new MultiShipmentAddressCheckoutValidatorPlugin(),
        ];
    }
}
```

## 7. Update the Pyz Zed Checkout Config

In `src/Pyz/Zed/Checkout/CheckoutConfig.php`, add the recalculation flags previously in `src/Pyz/Zed/CheckoutRestApi/CheckoutRestApiConfig.php`:

```php
public function shouldExecuteQuotePostRecalculationPlugins(): bool
{
    return false;
}

public function isRecalculationEnabledForQuoteMapperPlugins(): bool
{
    return false;
}
```

## 8. Update the Pyz Zed Checkout DependencyProvider

In `src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php`, add the following methods with plugins previously registered in `src/Pyz/Zed/CheckoutRestApi/CheckoutRestApiDependencyProvider.php`:

```php
use Spryker\Zed\ClickAndCollectExample\Communication\Plugin\Checkout\ClickAndCollectExampleReplaceCheckoutDataValidatorPlugin;
use Spryker\Zed\ClickAndCollectExample\Communication\Plugin\Checkout\ClickAndCollectExampleReplaceReadCheckoutDataValidatorPlugin;
use Spryker\Zed\CompanyUnitAddress\Communication\Plugin\Checkout\CompanyBusinessUnitAddressCheckoutDataExpanderPlugin;
use Spryker\Zed\CompanyUnitAddress\Communication\Plugin\Checkout\CompanyBusinessUnitAddressCheckoutDataValidatorPlugin;
use Spryker\Zed\CompanyUnitAddress\Communication\Plugin\Checkout\CompanyBusinessUnitAddressQuoteMapperPlugin;
use Spryker\Zed\CompanyUser\Communication\Plugin\Checkout\CompanyUserQuoteMapperPlugin;
use Spryker\Zed\Country\Communication\Plugin\Checkout\CountriesCheckoutDataValidatorPlugin;
use Spryker\Zed\Customer\Communication\Plugin\Checkout\AddressQuoteMapperPlugin;
use Spryker\Zed\Customer\Communication\Plugin\Checkout\CustomerAddressCheckoutDataValidatorPlugin;
use Spryker\Zed\Customer\Communication\Plugin\Checkout\CustomerQuoteMapperPlugin;
use Spryker\Zed\Payment\Communication\Plugin\Checkout\PaymentsQuoteMapperPlugin;
use Spryker\Zed\Payment\Communication\Plugin\Checkout\SelectedPaymentMethodCheckoutDataExpanderPlugin;
use Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Checkout\SalesOrderThresholdReadCheckoutDataValidatorPlugin;
use Spryker\Zed\ServicePoint\Communication\Plugin\Checkout\ServicePointQuoteMapperPlugin;
use Spryker\Zed\ServicePointCart\Communication\Plugin\Checkout\ReplaceServicePointQuoteItemsQuoteMapperPlugin;
use Spryker\Zed\Shipment\Communication\Plugin\Checkout\ItemsCheckoutDataValidatorPlugin;
use Spryker\Zed\Shipment\Communication\Plugin\Checkout\ItemsReadCheckoutDataValidatorPlugin;
use Spryker\Zed\Shipment\Communication\Plugin\Checkout\ShipmentCheckoutDataExpanderPlugin;
use Spryker\Zed\Shipment\Communication\Plugin\Checkout\ShipmentMethodCheckoutDataValidatorPlugin;
use Spryker\Zed\Shipment\Communication\Plugin\Checkout\ShipmentsQuoteMapperPlugin;
use Spryker\Zed\ShipmentType\Communication\Plugin\Checkout\ShipmentTypeCheckoutDataValidatorPlugin;
use Spryker\Zed\ShipmentType\Communication\Plugin\Checkout\ShipmentTypeReadCheckoutDataValidatorPlugin;
use Spryker\Zed\ShipmentTypeServicePoint\Communication\Plugin\Checkout\ShipmentTypeServicePointQuoteMapperPlugin;
```

Add the following methods to the class:

```php
/**
 * @return array<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\QuoteMapperPluginInterface>
 */
protected function getQuoteMapperPlugins(): array
{
    return [
        new CustomerQuoteMapperPlugin(),
        new CompanyUserQuoteMapperPlugin(),
        new AddressQuoteMapperPlugin(),
        new CompanyBusinessUnitAddressQuoteMapperPlugin(),
        new ShipmentsQuoteMapperPlugin(),
        new ServicePointQuoteMapperPlugin(),
        new ShipmentTypeServicePointQuoteMapperPlugin(),
        new ReplaceServicePointQuoteItemsQuoteMapperPlugin(),
        new PaymentsQuoteMapperPlugin(),
    ];
}

/**
 * @return list<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutDataValidatorPluginInterface>
 */
protected function getCheckoutDataValidatorPlugins(): array
{
    return [
        new CountriesCheckoutDataValidatorPlugin(),
        new ShipmentMethodCheckoutDataValidatorPlugin(),
        new ItemsCheckoutDataValidatorPlugin(),
        new CustomerAddressCheckoutDataValidatorPlugin(),
        new CompanyBusinessUnitAddressCheckoutDataValidatorPlugin(),
        new ShipmentTypeCheckoutDataValidatorPlugin(),
        new ClickAndCollectExampleReplaceCheckoutDataValidatorPlugin(),
    ];
}

/**
 * @return array<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\ReadCheckoutDataValidatorPluginInterface>
 */
protected function getReadCheckoutDataValidatorPlugins(): array
{
    return [
        new ItemsReadCheckoutDataValidatorPlugin(),
        new SalesOrderThresholdReadCheckoutDataValidatorPlugin(),
        new ShipmentTypeReadCheckoutDataValidatorPlugin(),
        new ClickAndCollectExampleReplaceReadCheckoutDataValidatorPlugin(),
    ];
}

/**
 * @return array<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutDataExpanderPluginInterface>
 */
protected function getCheckoutDataExpanderPlugins(): array
{
    return [
        new CompanyBusinessUnitAddressCheckoutDataExpanderPlugin(),
        new ShipmentCheckoutDataExpanderPlugin(),
        new SelectedPaymentMethodCheckoutDataExpanderPlugin(),
    ];
}
```

{% info_block infoBox "Project-specific plugins" %}

Adjust these plugin lists to match your project's checkout requirements. The plugins shown reflect the Spryker Suite reference configuration.

{% endinfo_block %}

## 9. Delete the obsolete CustomerAccessRestApi config

Once `CheckoutRestApi`, `CartsRestApi`, `ProductPricesRestApi`, and `WishlistsRestApi` have all been migrated, delete:

```text
src/Pyz/Glue/CustomerAccessRestApi/CustomerAccessRestApiConfig.php
```

This config mapped legacy resource type constants to customer access content types. API Platform resources use their own resource type names and do not depend on this mapping.

## 10. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

| Plugin | Status | Notes |
|---|---|---|
| `ShipmentsByCheckoutDataResourceRelationshipPlugin` | Removed | Checkout data relationships are handled by the API Platform `?include=` parameter. |
| `PaymentMethodsByCheckoutDataResourceRelationshipPlugin` | Removed | Same as above. |
| `CompanyBusinessUnitAddressByCheckoutDataResourceRelationshipPlugin` | Removed | Same as above. |
| `AddressByCheckoutDataResourceRelationshipPlugin` | Removed | Same as above. |
| `CartByRestCheckoutDataResourceRelationshipPlugin` | Removed | Same as above. |
| `GuestCartByRestCheckoutDataResourceRelationshipPlugin` | Removed | Same as above. |
| `ServicePointsByCheckoutDataResourceRelationshipPlugin` | Removed | Same as above. |
