


This document describes how to install the [Checkout](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/feature-overviews/checkout-feature-overview/checkout-feature-overview.html) feature API.

## Install feature core

Follow the steps below to install Checkout feature API.

### Prerequisites

Install the required features:

| FEATURE                                | VERSION          | INSTALLATION GUIDE                                                                                                                                                                        |
|----------------------------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Glue API: Spryker Core                 | {{page.version}} | [Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html)                                 |
| Glue API: Cart                         | {{page.version}} | [Install the Cart Glue API](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-cart-glue-api.html)                                                             |
| Glue API: Customer Account Management  | {{page.version}} | [Install the Customer Account Management Glue API](/docs/pbc/all/identity-access-management/{{page.version}}/install-and-upgrade/install-the-customer-account-management-glue-api.html) |
| Glue API: Payments                     | {{page.version}} | [Install the Payments Glue API](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/install-and-upgrade/install-the-payments-glue-api.html)                                         |
| Glue API: Shipment                     | {{page.version}} | [Install the Shipment Glue API](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/install-and-upgrade/install-the-shipment-glue-api.html)                                            |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/checkout-rest-api:"3.5.0" spryker/order-payments-rest-api:"^1.0.0" spryker/sales-order-thresholds-rest-api:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                      | EXPECTED DIRECTORY                             |
|-----------------------------|------------------------------------------------|
| CheckoutRestApi             | vendor/spryker/checkout-rest-api               |
| OrderPaymentsRestApi        | vendor/spryker/order-payments-rest-api         |
| SalesOrderThresholdsRestApi | vendor/spryker/sales-order-thresholds-rest-api |

{% endinfo_block %}

### 2) Set up configuration

Add all the payment methods available in the shop to `CheckoutRestApiConfig`—for example:

<details>
<summary markdown='span'>src/Pyz/Glue/CheckoutRestApi/CheckoutRestApiConfig.php</summary>

```php
<?php

namespace Pyz\Glue\CheckoutRestApi;

use Spryker\Glue\CheckoutRestApi\CheckoutRestApiConfig as SprykerCheckoutRestApiConfig;

class CheckoutRestApiConfig extends SprykerCheckoutRestApiConfig
{
    protected const PAYMENT_METHOD_REQUIRED_FIELDS = [
        'dummyPaymentInvoice' => ['dummyPaymentInvoice.dateOfBirth'],
        'dummyPaymentCreditCard' => [
            'dummyPaymentCreditCard.cardType',
            'dummyPaymentCreditCard.cardNumber',
            'dummyPaymentCreditCard.nameOnCard',
            'dummyPaymentCreditCard.cardExpiresMonth',
            'dummyPaymentCreditCard.cardExpiresYear',
            'dummyPaymentCreditCard.cardSecurityCode',
        ],
    ];

    /**
     * @uses \Spryker\Shared\DummyPayment\DummyPaymentConfig::PROVIDER_NAME
     */
    protected const DUMMY_PAYMENT_PROVIDER_NAME = 'DummyPayment';

    /**
     * @uses \Spryker\Shared\DummyPayment\DummyPaymentConfig::PAYMENT_METHOD_NAME_INVOICE
     */
    protected const DUMMY_PAYMENT_PAYMENT_METHOD_NAME_INVOICE = 'Invoice';

    /**
     * @uses \Spryker\Shared\DummyPayment\DummyPaymentConfig::PAYMENT_METHOD_NAME_CREDIT_CARD
     */
    protected const DUMMY_PAYMENT_PAYMENT_METHOD_NAME_CREDIT_CARD = 'Credit Card';

    /**
     * @uses \Spryker\Shared\DummyPayment\DummyPaymentConfig::PAYMENT_METHOD_INVOICE
     */
    protected const PAYMENT_METHOD_INVOICE = 'dummyPaymentInvoice';

    /**
     * @uses \Spryker\Shared\DummyPayment\DummyPaymentConfig::PAYMENT_METHOD_CREDIT_CARD
     */
    protected const PAYMENT_METHOD_CREDIT_CARD = 'dummyPaymentCreditCard';

    protected const IS_PAYMENT_PROVIDER_METHOD_TO_STATE_MACHINE_MAPPING_ENABLED = false;

    /**
     * @return array
     */
    public function getPaymentProviderMethodToStateMachineMapping(): array
    {
        return [
            static::DUMMY_PAYMENT_PROVIDER_NAME => [
                static::DUMMY_PAYMENT_PAYMENT_METHOD_NAME_CREDIT_CARD => static::PAYMENT_METHOD_CREDIT_CARD,
                static::DUMMY_PAYMENT_PAYMENT_METHOD_NAME_INVOICE => static::PAYMENT_METHOD_INVOICE,
            ],
        ];
    }

    /**
     * @return bool
     */
    public function isShipmentMethodsMappedToAttributes(): bool
    {
        return false;
    }

    /**
     * @return bool
     */
    public function isPaymentProvidersMappedToAttributes(): bool
    {
        return false;
    }

    /**
     * @return bool
     */
    public function isAddressesMappedToAttributes(): bool
    {
        return false;
    }
}
```
</details>

{% info_block infoBox "Info" %}

If `CheckoutRestApiConfig::IS_PAYMENT_PROVIDER_METHOD_TO_STATE_MACHINE_MAPPING_ENABLED` is true, make sure that the payment methods and providers of your shop are configured in `CheckoutRestApiConfig::getPaymentProviderMethodToStateMachineMapping()`.

Setting `CheckoutRestApiConfig::IS_PAYMENT_PROVIDER_METHOD_TO_STATE_MACHINE_MAPPING_ENABLED` to false ignores the Glue API level configuration. Subsequently, the `checkout-data` endpoint returns all the payment methods.

{% endinfo_block %}

{% info_block warningBox “Verification” %}

For the `checkout-data` endpoint to keep returning shipment methods, keep `Pyz\Glue\CheckoutRestApi\CheckoutRestApiConfig::isShipmentMethodsMappedToAttributes()` set to true.

If `Pyz\Glue\CheckoutRestApi\CheckoutRestApiConfig::isShipmentMethodsMappedToAttributes()` is true, make sure the shipping method attributes are returned in the `shipmentMethods` after sending the `POST https://glue.mysprykershop.com/checkout-data` request:

<details>
<summary markdown='span'>Response sample</summary>

```json
{
    "data": {
        "type": "checkout-data",
        "id": null,
        "attributes": {
            "addresses": [],
            "shipmentMethods": [
                {
                    "id": 4,
                    "name": "Air Sonic",
                    "carrierName": "Spryker Drone Shipment",
                    "price": 1000,
                    "taxRate": null,
                    "deliveryTime": null,
                    "currencyIsoCode": "EUR"
                },
                {
                    "id": 5,
                    "name": "Air Light",
                    "carrierName": "Spryker Drone Shipment",
                    "price": 1500,
                    "taxRate": null,
                    "deliveryTime": null,
                    "currencyIsoCode": "EUR"
                },
                {
                    "id": 2,
                    "name": "Express",
                    "carrierName": "Spryker Dummy Shipment",
                    "price": 590,
                    "taxRate": null,
                    "deliveryTime": null,
                    "currencyIsoCode": "EUR"
                },
                {
                    "id": 3,
                    "name": "Air Standard",
                    "carrierName": "Spryker Drone Shipment",
                    "price": 500,
                    "taxRate": null,
                    "deliveryTime": null,
                    "currencyIsoCode": "EUR"
                },
                {
                    "id": 1,
                    "name": "Standard",
                    "carrierName": "Spryker Dummy Shipment",
                    "price": 490,
                    "taxRate": null,
                    "deliveryTime": null,
                    "currencyIsoCode": "EUR"
                }
            ],
            ...
}
```
</details>

{% endinfo_block %}

{% info_block infoBox "Info" %}

For the `checkout-data` endpoint to keep returning payment methods, keep `CheckoutRestApiConfig::isPaymentProvidersMappedToAttributes()` set to true.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

If `Pyz\Glue\CheckoutRestApi\CheckoutRestApiConfig::isPaymentProvidersMappedToAttributes()` is true, make sure the payment methods attributes are returned in the `paymentProviders `attribute after sending the `POST https://glue.mysprykershop.com/checkout-data` request:

<details>
<summary markdown='span'>Response sample</summary>

```json
{
    "data": {
        "type": "checkout-data",
        "id": null,
        "attributes": {
            "addresses": [],
            "paymentProviders": [
                {
                    "paymentProviderName": "DummyPayment",
                    "paymentMethods": [
                        {
                            "paymentMethodName": "Invoice",
                            "paymentProviderName": null,
                            "requiredRequestData": [
                                "paymentMethod",
                                "paymentProvider",
                                "dummyPaymentInvoice.dateOfBirth"
                            ]
                        },
                        {
                            "paymentMethodName": "Credit Card",
                            "paymentProviderName": null,
                            "requiredRequestData": [
                                "paymentMethod",
                                "paymentProvider",
                                "dummyPaymentCreditCard.cardType",
                                "dummyPaymentCreditCard.cardNumber",
                                "dummyPaymentCreditCard.nameOnCard",
                                "dummyPaymentCreditCard.cardExpiresMonth",
                                "dummyPaymentCreditCard.cardExpiresYear",
                                "dummyPaymentCreditCard.cardSecurityCode"
                            ]
                        }
                    ]
                }
            ],
            ...
}
```
</details>

{% endinfo_block %}

### 3) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER                                             | TYPE     | EVENT       | PATH                                                                         |
|------------------------------------------------------|----------|-------------|------------------------------------------------------------------------------|
| RestCheckoutDataTransfer                             | class    | created     | src/Generated/Shared/Transfer/RestCheckoutDataTransfer.php                   |
| RestCheckoutErrorTransfer                            | class    | created     | src/Generated/Shared/Transfer/RestCheckoutErrorTransfer.php                  |
| RestCheckoutDataResponseTransfer                     | class    | created     | src/Generated/Shared/Transfer/RestCheckoutDataResponseTransfer.php           |
| RestCheckoutRequestAttributesTransfer                | class    | created     | src/Generated/Shared/Transfer/RestCheckoutRequestAttributesTransfer.php      |
| RestCustomerTransfer                                 | class    | created     | src/Generated/Shared/Transfer/RestCustomerTransfer.php                       |
| RestAddressTransfer                                  | class    | created     | src/Generated/Shared/Transfer/RestAddressTransfer.php                        |
| RestShipmentTransfer                                 | class    | created     | src/Generated/Shared/Transfer/RestShipmentTransfer.php                       |
| RestPaymentTransfer                                  | class    | created     | src/Generated/Shared/Transfer/RestPaymentTransfer.php                        |
| RestCheckoutDataResponseAttributesTransfer           | class    | created     | src/Generated/Shared/Transfer/RestCheckoutDataResponseAttributesTransfer.php |
| RestPaymentProviderTransfer                          | class    | created     | src/Generated/Shared/Transfer/RestPaymentProviderTransfer.php                |
| RestPaymentMethodTransfer                            | class    | created     | src/Generated/Shared/Transfer/RestPaymentMethodTransfer.php                  |
| RestShipmentMethodTransfer                           | class    | created     | src/Generated/Shared/Transfer/RestShipmentMethodTransfer.php                 |
| RestCheckoutResponseAttributesTransfer               | class    | created     | src/Generated/Shared/Transfer/RestCheckoutResponseAttributesTransfer.php     |
| CheckoutResponseTransfer                             | class    | created     | src/Generated/Shared/Transfer/CheckoutResponseTransfer.php                   |
| SaveOrderTransfer                                    | class    | created     | src/Generated/Shared/Transfer/SaveOrderTransfer.php                          |
| CheckoutErrorTransfer                                | class    | created     | src/Generated/Shared/Transfer/CheckoutErrorTransfer.php                      |
| AddressesTransfer                                    | class    | created     | src/Generated/Shared/Transfer/AddressesTransfer.php                          |
| AddressTransfer                                      | class    | created     | src/Generated/Shared/Transfer/AddressTransfer.php                            |
| ShipmentMethodTransfer                               | class    | created     | src/Generated/Shared/Transfer/ShipmentMethodTransfer.php                     |
| ShipmentMethodsCollectionTransfer                    | class    | created     | src/Generated/Shared/Transfer/ShipmentMethodsCollectionTransfer.php          |
| PaymentProviderCollectionTransfer                    | class    | created     | src/Generated/Shared/Transfer/PaymentProviderCollectionTransfer.php          |
| PaymentProviderTransfer                              | class    | created     | src/Generated/Shared/Transfer/PaymentProviderTransfer.php                    |
| PaymentMethodsTransfer                               | class    | created     | src/Generated/Shared/Transfer/PaymentMethodsTransfer.php                     |
| PaymentMethodTransfer                                | class    | created     | src/Generated/Shared/Transfer/PaymentMethodTransfer.php                      |
| QuoteTransfer                                        | class    | created     | src/Generated/Shared/Transfer/QuoteTransfer.php                              |
| StoreTransfer                                        | class    | created     | src/Generated/Shared/Transfer/StoreTransfer.php                              |
| MoneyValueTransfer                                   | class    | created     | src/Generated/Shared/Transfer/MoneyValueTransfer.php                         |
| CurrencyTransfer                                     | class    | created     | src/Generated/Shared/Transfer/CurrencyTransfer.php                           |
| QuoteResponseTransfer                                | class    | created     | src/Generated/Shared/Transfer/QuoteResponseTransfer.php                      |
| QuoteErrorTransfer                                   | class    | created     | src/Generated/Shared/Transfer/QuoteErrorTransfer.php                         |
| ShipmentTransfer                                     | class    | created     | src/Generated/Shared/Transfer/ShipmentTransfer.php                           |
| RestErrorCollectionTransfer                          | class    | created     | src/Generated/Shared/Transfer/RestErrorCollectionTransfer.php                |
| CheckoutDataTransfer                                 | class    | created     | src/Generated/Shared/Transfer/CheckoutDataTransfer.php                       |
| ItemTransfer                                         | class    | created     | src/Generated/Shared/Transfer/ItemTransfer.php                               |
| RestCheckoutResponseTransfer                         | class    | created     | src/Generated/Shared/Transfer/RestCheckoutResponseTransfer.php               |
| RestErrorMessageTransfer                             | class    | created     | src/Generated/Shared/Transfer/RestErrorMessageTransfer.php                   |
| RestCheckoutDataTransfer.quote                       | property | added       | src/Generated/Shared/Transfer/RestCheckoutDataTransfer.php                   |
| RestCheckoutResponseTransfer.checkoutData            | property | added       | src/Generated/Shared/Transfer/RestCheckoutResponseTransfer.php               |
| CheckoutDataTransfer.quote                           | property | added       | src/Generated/Shared/Transfer/CheckoutDataTransfer.php                       |
| RestCheckoutDataResponseAttributesTransfer.addresses | property | deprecated  | src/Generated/Shared/Transfer/RestCheckoutDataResponseAttributesTransfer.php |
| QuoteTransfer.salesOrderThresholdValues              | property | added       | src/Generated/Shared/Transfer/QuoteTransfer.php                              |
| RestCartsAttributesTransfer                          | class    | created     | src/Generated/Shared/Transfer/RestCartsAttributesTransfer.php                |
| SalesOrderThresholdTypeTransfer                      | class    | created     | src/Generated/Shared/Transfer/SalesOrderThresholdTypeTransfer.php            |
| SalesOrderThresholdValueTransfer                     | class    | created     | src/Generated/Shared/Transfer/SalesOrderThresholdValueTransfer.php           |
| RestCartsThresholdsTransfer                          | class    | created     | src/Generated/Shared/Transfer/RestCartsThresholdsTransfer.php                |

{% endinfo_block %}

### 4) Set up behavior

Set up the following behaviors.

#### Enable resources and relationships

Activate the following plugins:

| PLUGIN                                                | SPECIFICATION                                                                                                          | PREREQUISITES | NAMESPACE                                           |
|-------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------------------------------------|
| CheckoutDataResourcePlugin                            | Registers the `checkout-data` resource.                                                                                | None          | Spryker\Glue\CheckoutRestApi\Plugin\GlueApplication |
| CheckoutResourcePlugin                                | Registers the `checkout` resource.                                                                                     | None          | Spryker\Glue\CheckoutRestApi\Plugin\GlueApplication |
| OrderRelationshipByOrderReferencePlugin               | Adds a relationship to the `order` entity by order reference.                                                          | None          | Spryker\Glue\OrdersRestApi\Plugin                   |
| OrderPaymentsResourceRoutePlugin                      | Registers the `order-payments` resource.                                                                               | None          | Spryker\Glue\OrderPaymentsRestApi\Plugin            |
| CartByRestCheckoutDataResourceRelationshipPlugin      | Adds `carts` resource as relationship by `RestCheckoutDataTransfer.quote`. Applies only for registered customers.      | None          | Spryker\Glue\CartsRestApi\Plugin\GlueApplication    |
| GuestCartByRestCheckoutDataResourceRelationshipPlugin | Adds `guest-carts` resource as the relationship by `RestCheckoutDataTransfer.quote`. Applies only for guest customers. | None          | Spryker\Glue\CartsRestApi\Plugin\GlueApplication    |

<details>
<summary markdown='span'>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\CheckoutRestApi\CheckoutRestApiConfig;
use Spryker\Glue\CheckoutRestApi\Plugin\GlueApplication\CheckoutDataResourcePlugin;
use Spryker\Glue\CartsRestApi\Plugin\GlueApplication\CartByRestCheckoutDataResourceRelationshipPlugin;
use Spryker\Glue\CartsRestApi\Plugin\GlueApplication\GuestCartByRestCheckoutDataResourceRelationshipPlugin;
use Spryker\Glue\CheckoutRestApi\Plugin\GlueApplication\CheckoutResourcePlugin;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\OrderPaymentsRestApi\Plugin\OrderPaymentsResourceRoutePlugin;
use Spryker\Glue\OrdersRestApi\Plugin\OrderRelationshipByOrderReferencePlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new OrderPaymentsResourceRoutePlugin(),
            new CheckoutDataResourcePlugin(),
            new CheckoutResourcePlugin(),
        ];
    }

    /**
     * @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
     *
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
     */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            CheckoutRestApiConfig::RESOURCE_CHECKOUT,
            new OrderRelationshipByOrderReferencePlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            CheckoutRestApiConfig::RESOURCE_CHECKOUT_DATA,
            new CartByRestCheckoutDataResourceRelationshipPlugin(),
        );
        $resourceRelationshipCollection->addRelationship(
            CheckoutRestApiConfig::RESOURCE_CHECKOUT_DATA,
            new GuestCartByRestCheckoutDataResourceRelationshipPlugin(),
        );

        return $resourceRelationshipCollection;
    }
}
```
</details>

{% info_block warningBox "Verification" %}

Make sure that the following plugins are activated:

| PLUGIN                                                | TEST                                                                                                                                                                            |
|-------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| CheckoutDataResourcePlugin                            | Check if you get a valid response by sending the `POST https://glue.mysprykershop.com/checkout-data` request.                                                                   |
| CheckoutResourcePlugin                                | Check if you get a valid response by sending the `POST https://glue.mysprykershop.com/checkout` request.                                                                        |
| OrderRelationshipByOrderReferencePlugin               | Check if you get order information from the `orders` resource by sending the `POST https://glue.mysprykershop.com/checkout?include=orders` request.                             |
| CartByRestCheckoutDataResourceRelationshipPlugin      | Check if you get cart data as a relationship from the `checkout-data` resource by sending the `POST https://glue.mysprykershop.com/checkout-data?include=carts` request.        |
| GuestCartByRestCheckoutDataResourceRelationshipPlugin | Check if you get guest cart data as a relationship from the `checkout-data` resource by sending the `POST https://glue.mysprykershop.com/checkout?include=guest-carts` request. |

To make sure that `OrderPaymentsResourceRoutePlugin` is activated, check if you get a valid response by sending the following request:

**https://glue.mysprykershop.com/order-payments**

```json
{
    "data": {
        "type": "order-payments",
        "attributes": {
            "paymentIdentifier": {% raw %}{{{% endraw %}paymentIdentifier{% raw %}}}{% endraw %},
            "dataPayload": {% raw %}{{{% endraw %}dataPayload{% raw %}}}{% endraw %}
        }
    }
}
```

To ensure that `CartByRestCheckoutDataResourceRelationshipPlugin` is set up correctly:

1. Send a request with an authorization token to a `checkout-data` endpoint with `carts` relation—Ffr example, send the `POST https://glue.mysprykershop.com/checkout-data?include=carts` request with the request body:

```json
{"data":
    {"type": "checkout-data",
      "attributes":
      {
        "idCart": "_cart_id",
        "shipment": {
          "idShipmentMethod": 1
        }
      }
    }
}
```

2. Check that the cart data is returned as a relationship and contains `shipmentTotal` in cart totals:

```json
{
  "data": {
    "type": "checkout-data",
    ...
    },
    ...
    "relationships": {
      "carts": {
        "data": [
          {
            "type": "carts",
            "id": "_cart_id"
          }
        ]
      }
    }
  },
  "included": [
    {
      "type": "carts",
      "id": "_cart_id",
      "attributes": {
        ...
        "totals": {
        ...
          "shipmentTotal": ...
        }
      }
    }
  ]
}
```

Ensure that `GuestCartByRestCheckoutDataResourceRelationshipPlugin` is set up correctly:

1. Send a request with an anonymous customer ID to a `checkout-data` endpoint with `guest-carts` relation—for example, send the `POST https://glue.mysprykershop.com/checkout-data?include=guest-carts` request with the request body:

```json
{"data":
    {"type": "checkout-data",
      "attributes":
      {
        "idCart": "_cart_id",
        "shipment": {
          "idShipmentMethod": 1
        }
      }
    }
}
```

2. Check that the guest cart data is returned as a relationship and contains `shipmentTotal` in cart totals:

```json
{
  "data": {
    "type": "checkout-data",
    ...
    },
    ...
    "relationships": {
      "guest-carts": {
        "data": [
          {
            "type": "guest-carts",
            "id": "_cart_id"
          }
        ]
      }
    }
  },
  "included": [
    {
      "type": "guest-carts",
      "id": "_cart_id",
      "attributes": {
        ...
        "totals": {
        ...
          "shipmentTotal": ...
        }
      }
    }
  ]
}
```

{% endinfo_block %}

For more details, see [Implementing Checkout Steps for Glue API](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/interact-with-third-party-payment-providers-using-glue-api.html).

#### Configure mapping

Mappers must be configured on a project level to map the data from the request into `QuoteTransfer`:


| PLUGIN                    | SPECIFICATION                                                                        | PREREQUISITES | NAMESPACE                                                         |
|---------------------------|--------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------|
| CustomerQuoteMapperPlugin | Adds a mapper that maps customer information to `QuoteTransfer`.                     | None          | Spryker\Zed\CustomersRestApi\Communication\Plugin\CheckoutRestApi |
| AddressQuoteMapperPlugin  | Adds a mapper that maps billing and shipping address information to `QuoteTransfer`. | None          | Spryker\Zed\CustomersRestApi\Communication\Plugin\CheckoutRestApi |


**src/Pyz/Zed/CheckoutRestApi/CheckoutRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CheckoutRestApi;

use Spryker\Zed\CheckoutRestApi\CheckoutRestApiDependencyProvider as SprykerCheckoutRestApiDependencyProvider;
use Spryker\Zed\CustomersRestApi\Communication\Plugin\CheckoutRestApi\AddressQuoteMapperPlugin;
use Spryker\Zed\CustomersRestApi\Communication\Plugin\CheckoutRestApi\CustomerQuoteMapperPlugin;

class CheckoutRestApiDependencyProvider extends SprykerCheckoutRestApiDependencyProvider
{
    /**
     * @return \Spryker\Zed\CheckoutRestApiExtension\Dependency\Plugin\QuoteMapperPluginInterface[]
     */
    protected function getQuoteMapperPlugins(): array
    {
        return [
            new CustomerQuoteMapperPlugin(),
            new AddressQuoteMapperPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

To make sure that `CustomerQuoteMapperPlugin` is activated, send the `POST https://glue.mysprykershop.com/checkout` request and check that the returned order information contains the customer information you have provided in the request.

To make sure that `AddressQuoteMapperPlugin` is activated, send a `POST https://glue.mysprykershop.com/checkout` request and check that the returned order information contains the billing and shipping address information you have provided in the request.

{% endinfo_block %}

#### Configure the single payment method validator plugin

Activate the following plugins:

| PLUGIN                                                | SPECIFICATION                                                          | PREREQUISITES | NAMESPACE                           |
|-------------------------------------------------------|------------------------------------------------------------------------|---------------|-------------------------------------|
| SinglePaymentCheckoutRequestAttributesValidatorPlugin | Validates that checkout request data contains only one payment method. | None          | Spryker\Glue\CheckoutRestApi\Plugin |


**src/Pyz/Glue/CheckoutRestApi/CheckoutRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\CheckoutRestApi;

use Spryker\Glue\CheckoutRestApi\CheckoutRestApiDependencyProvider as SprykerCheckoutRestApiDependencyProvider;
use Spryker\Glue\CheckoutRestApi\Plugin\SinglePaymentCheckoutRequestAttributesValidatorPlugin;

class CheckoutRestApiDependencyProvider extends SprykerCheckoutRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\CheckoutRestApiExtension\Dependency\Plugin\CheckoutRequestAttributesValidatorPluginInterface[]
     */
    protected function getCheckoutRequestAttributesValidatorPlugins(): array
    {
        return [
            new SinglePaymentCheckoutRequestAttributesValidatorPlugin(),
        ];
    }
}


```


{% info_block warningBox "Verification" %}

To make sure that `SinglePaymentCheckoutRequestAttributesValidatorPlugin` is activated, check that the following error is returned by sending the `POST https://glue.mysprykershop.com/checkout` request.

```json
{
    "errors": [
        {
            "status": 400,
            "code": "1107",
            "detail": "Multiple payments are not allowed."
        }
    ]
}
```

{% endinfo_block %}

#### Configure minimum order value plugins

Activate the following plugins:

| PLUGIN                                             | SPECIFICATION                                                                                | PREREQUISITES | NAMESPACE                                                                    |
|----------------------------------------------------|----------------------------------------------------------------------------------------------|---------------|------------------------------------------------------------------------------|
| SalesOrderThresholdRestCartAttributesMapperPlugin  | Maps `QuoteTransfer.salesOrderThresholdValues` to `RestCartsAttributesTransfer.thresholds`.  | None          | Spryker\Glue\SalesOrderThresholdsRestApi\Plugin\CartsRestApi                 |
| SalesOrderThresholdCartTerminationPlugin           | Finds applicable thresholds and expands quote with sales order thresholds data.              | None          | Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Cart                    |
| SalesOrderThresholdQuoteExpanderPlugin             | Finds applicable thresholds and expands quote with sales order thresholds data.              | None          | Spryker\Zed\SalesOrderThresholdsRestApi\Communication\Plugin\CartsRestApi    |
| SalesOrderThresholdReadCheckoutDataValidatorPlugin | Finds applicable thresholds and adds error messages if threshold conditions are not matched. | None          | Spryker\Zed\SalesOrderThresholdsRestApi\Communication\Plugin\CheckoutRestApi |


**src/Pyz/Glue/CartsRestApi/CartsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\CartsRestApi;

use Spryker\Glue\CartsRestApi\CartsRestApiDependencyProvider as SprykerCartsRestApiDependencyProvider;
use Spryker\Glue\SalesOrderThresholdsRestApi\Plugin\CartsRestApi\SalesOrderThresholdRestCartAttributesMapperPlugin;

class CartsRestApiDependencyProvider extends SprykerCartsRestApiDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\CartsRestApiExtension\Dependency\Plugin\RestCartAttributesMapperPluginInterface>
     */
    protected function getRestCartAttributesMapperPlugins(): array
    {
        return [
            new SalesOrderThresholdRestCartAttributesMapperPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Cart/CartDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\SalesOrderThreshold\Communication\Plugin\Cart\SalesOrderThresholdCartTerminationPlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\CartExtension\Dependency\Plugin\CartTerminationPluginInterface>
     */
    protected function getTerminationPlugins(Container $container): array
    {
        return [
            new SalesOrderThresholdCartTerminationPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/CartsRestApi/CartsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CartsRestApi;

use Spryker\Zed\CartsRestApi\CartsRestApiDependencyProvider as SprykerCartsRestApiDependencyProvider;
use Spryker\Zed\SalesOrderThresholdsRestApi\Communication\Plugin\CartsRestApi\SalesOrderThresholdQuoteExpanderPlugin;

class CartsRestApiDependencyProvider extends SprykerCartsRestApiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\CartsRestApiExtension\Dependency\Plugin\QuoteExpanderPluginInterface>
     */
    protected function getQuoteExpanderPlugins(): array
    {
        return [
            new SalesOrderThresholdQuoteExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/CheckoutRestApi/CheckoutRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CheckoutRestApi;

use Spryker\Zed\CheckoutRestApi\CheckoutRestApiDependencyProvider as SprykerCheckoutRestApiDependencyProvider;
use Spryker\Zed\SalesOrderThresholdsRestApi\Communication\Plugin\CheckoutRestApi\SalesOrderThresholdReadCheckoutDataValidatorPlugin;

class CheckoutRestApiDependencyProvider extends SprykerCheckoutRestApiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\CheckoutRestApiExtension\Dependency\Plugin\ReadCheckoutDataValidatorPluginInterface>
     */
    protected function getReadCheckoutDataValidatorPlugins(): array
    {
        return [
            new SalesOrderThresholdReadCheckoutDataValidatorPlugin(),
        ];
    }
}
```


{% info_block warningBox "Verification" %}

Ensure that the plugins work correctly:

1. [Setting up Minimum Hard Threshold](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/thresholds/managing-global-thresholds.html).
2. Add a product to the cart with a price less minimum threshold value.
3. Check that the following error is returned by sending the `GET https://glue.mysprykershop.com/carts/{cart-uuid}` request.

```json
{
  "data": {
    "type": "carts",
    "id": "1ce91011-8d60-59ef-9fe0-4493ef3628b2",
    "attributes": {
      "priceMode": "GROSS_MODE",
      "currency": "EUR",
      "store": "DE",
      "name": "My Cart",
      "isDefault": true,
      "totals": {
        "expenseTotal": 0,
        "discountTotal": 0,
        "taxTotal": 4151,
        "subtotal": 26000,
        "grandTotal": 26000,
        "priceToPay": 26000
      },
      "discounts": [],
      "thresholds": [
        {
          "type": "hard-minimum-threshold",
          "threshold": 200000,
          "fee": null,
          "deltaWithSubtotal": 174000,
          "message": "You need to add items for €2,000.00 to pass a recommended threshold, but if you want can proceed to checkout."
        }
      ]
    },
    "links": {
      "self": "http://glue.de.spryker.local/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2"
    }
  }
}
```

4. Check that the following error is returned by sending the `POST https://glue.mysprykershop.com/checkout-data` request.

```json
{
  "errors": [
    {
      "code": "1101",
      "status": 422,
      "detail": "You need to add items for €2,000.00 to pass a recommended threshold, but if you want can proceed to checkout."
    }
  ]
}
```

5. Add more products to cart to satisfy minimum threshold.
6. Check result by sending the `GET https://glue.mysprykershop.com/carts/{cart-uuid}` request.

```json
{
  "data": {
    "type": "carts",
    "id": "1ce91011-8d60-59ef-9fe0-4493ef3628b2",
    "attributes": {
      "priceMode": "GROSS_MODE",
      "currency": "EUR",
      "store": "DE",
      "name": "My Cart",
      "isDefault": true,
      "totals": {
        "expenseTotal": 0,
        "discountTotal": 0,
        "taxTotal": 45664,
        "subtotal": 286000,
        "grandTotal": 286000,
        "priceToPay": 286000
      },
      "discounts": [],
      "thresholds": []
    },
    "links": {
      "self": "http://glue.de.spryker.local/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2"
    }
  }
}
```

7. Check result by sending the `POST https://glue.mysprykershop.com/checkout-data` request.

```json
{
  "data": {
    "type": "checkout-data",
    "id": null,
    "attributes": {
      "addresses": [],
      "paymentProviders": [],
      "shipmentMethods": [],
      "selectedShipmentMethods": [],
      "selectedPaymentMethods": []
    },
    "links": {
      "self": "http://glue.de.spryker.local/checkout-data"
    }
  }
}
```

{% endinfo_block %}

## Install related features

Integrate the following related features.

| FEATURE   | REQUIRED FOR THE CURRENT FEATURE | INSTALLATION GUIDE    |
| -------- | ----------------- | ---------------------- |
| Glue API: Shipment  | ✓                                | [Install the Shipment Glue API](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/install-and-upgrade/install-the-shipment-glue-api.html)  |
| Glue API: Payments   | ✓                                | [Install the Payments Glue API](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/install-and-upgrade/install-the-payments-glue-api.html) |
