---
title: Glue API- Checkout feature integration
originalLink: https://documentation.spryker.com/2021080/docs/glue-api-checkout-feature-integration
redirect_from:
  - /2021080/docs/glue-api-checkout-feature-integration
  - /2021080/docs/en/glue-api-checkout-feature-integration
---

Follow the steps below to install Checkout feature API.

## Prerequisites

To start feature integration, overview and install the necessary features:

| FEATURE                               | VERSION | INTEGRATION GUIDE                                            |
| :------------------------------------ | :------ | :----------------------------------------------------------- |
| Glue API: Spryker Core                | master  | [Glue API: Spryker Core feature integration](https://documentation.spryker.com/docs/glue-api-spryker-core-feature-integration) |
| Glue API: Cart                        | master  | [Glue API: Cart feature integration](https://documentation.spryker.com/docs/glue-api-cart-feature-integration) |
| Glue API: Customer Account Management | master  | [Glue API: Customer Account Management feature integration](https://documentation.spryker.com/docs/glue-api-customer-account-management-feature-integration) |
| Glue API: Payments                    | master  | [Glue API: Payments feature integration](https://documentation.spryker.com/docs/glue-api-payments-feature-integration) |
| Glue API: Shipment                   | master  | [Glue API: Shipment feature integration](https://documentation.spryker.com/docs/glue-api-shipment-feature-integration) |

## 1) Install the required modules using Composer

Install the required modules:


```bash
composer require spryker/checkout-rest-api:"3.5.0" spryker/order-payments-rest-api:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}



Make sure that the following modules have been installed:

| MODULE               | EXPECTED DIRECTORY                     |
| :------------------- | :------------------------------------- |
| CheckoutRestApi      | vendor/spryker/checkout-rest-api       |
| OrderPaymentsRestApi | vendor/spryker/order-payments-rest-api |

{% endinfo_block %}

## 2) Set up configuration

Add all the payment methods available in the shop to `CheckoutRestApiConfig`. For example:


<details open>
    <summary>src/Pyz/Glue/CheckoutRestApi/CheckoutRestApiConfig.php</summary>

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



{% info_block warningBox %}



If `CheckoutRestApiConfig::IS_PAYMENT_PROVIDER_METHOD_TO_STATE_MACHINE_MAPPING_ENABLED` is true, make sure that the payment methods and providers of your shop are configured in `CheckoutRestApiConfig::getPaymentProviderMethodToStateMachineMapping()`. 

Setting `CheckoutRestApiConfig::IS_PAYMENT_PROVIDER_METHOD_TO_STATE_MACHINE_MAPPING_ENABLED` to false ignores the Glue API level configuration. Subsequently, the `checkout-data` endpoint returns all the payment methods.

{% endinfo_block %}

{% info_block warningBox %}

For the `checkout-data` endpoint to keep returning shipment methods, keep `Pyz\Glue\CheckoutRestApi\CheckoutRestApiConfig::isShipmentMethodsMappedToAttributes()` set to true.

{% endinfo_block %}

{% info_block warningBox "Verification" %}


If `Pyz\Glue\CheckoutRestApi\CheckoutRestApiConfig::isShipmentMethodsMappedToAttributes()` is true, make sure the shipping method attributes are returned in the `shipmentMethods` after sending the `POST http://glue.mysprykershop.com/checkout-data` request:

<details open>
    <summary>Response sample</summary>

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


{% info_block warningBox %}

For the `checkout-data` endpoint to keep returning payment methods, keep `CheckoutRestApiConfig::isPaymentProvidersMappedToAttributes()` set to true.

{% endinfo_block %}

{% info_block warningBox "Verification" %}


If `Pyz\Glue\CheckoutRestApi\CheckoutRestApiConfig::isPaymentProvidersMappedToAttributes()` is true, make sure the payment methods attributes are returned in the `paymentProviders `attribute after sending the `POST http://glue.mysprykershop.com/checkout-data` request:

<details open>
    <summary>Response sample</summary>
    
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

## 3) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```


{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| TRANSFER                                             | TYPE     | EVENT      | PATH                                                         |
| :--------------------------------------------------- | :------- | :--------- | :----------------------------------------------------------- |
| RestCheckoutDataTransfer                             | class    | created    | src/Generated/Shared/Transfer/RestCheckoutDataTransfer.php   |
| RestCheckoutErrorTransfer                            | class    | created    | src/Generated/Shared/Transfer/RestCheckoutErrorTransfer.php  |
| RestCheckoutDataResponseTransfer                     | class    | created    | src/Generated/Shared/Transfer/RestCheckoutDataResponseTransfer.php |
| RestCheckoutRequestAttributesTransfer                | class    | created    | src/Generated/Shared/Transfer/RestCheckoutRequestAttributesTransfer.php |
| RestCustomerTransfer                                 | class    | created    | src/Generated/Shared/Transfer/RestCustomerTransfer.php       |
| RestAddressTransfer                                  | class    | created    | src/Generated/Shared/Transfer/RestAddressTransfer.php        |
| RestShipmentTransfer                                 | class    | created    | src/Generated/Shared/Transfer/RestShipmentTransfer.php       |
| RestPaymentTransfer                                  | class    | created    | src/Generated/Shared/Transfer/RestPaymentTransfer.php        |
| RestCheckoutDataResponseAttributesTransfer           | class    | created    | src/Generated/Shared/Transfer/RestCheckoutDataResponseAttributesTransfer.php |
| RestPaymentProviderTransfer                          | class    | created    | src/Generated/Shared/Transfer/RestPaymentProviderTransfer.php |
| RestPaymentMethodTransfer                            | class    | created    | src/Generated/Shared/Transfer/RestPaymentMethodTransfer.php  |
| RestShipmentMethodTransfer                           | class    | created    | src/Generated/Shared/Transfer/RestShipmentMethodTransfer.php |
| RestCheckoutResponseAttributesTransfer               | class    | created    | src/Generated/Shared/Transfer/RestCheckoutResponseAttributesTransfer.php |
| CheckoutResponseTransfer                             | class    | created    | src/Generated/Shared/Transfer/CheckoutResponseTransfer.php   |
| SaveOrderTransfer                                    | class    | created    | src/Generated/Shared/Transfer/SaveOrderTransfer.php          |
| CheckoutErrorTransfer                                | class    | created    | src/Generated/Shared/Transfer/CheckoutErrorTransfer.php      |
| AddressesTransfer                                    | class    | created    | src/Generated/Shared/Transfer/AddressesTransfer.php          |
| AddressTransfer                                      | class    | created    | src/Generated/Shared/Transfer/AddressTransfer.php            |
| ShipmentMethodTransfer                               | class    | created    | src/Generated/Shared/Transfer/ShipmentMethodTransfer.php     |
| ShipmentMethodsCollectionTransfer                    | class    | created    | src/Generated/Shared/Transfer/ShipmentMethodsCollectionTransfer.php |
| PaymentProviderCollectionTransfer                    | class    | created    | src/Generated/Shared/Transfer/PaymentProviderCollectionTransfer.php |
| PaymentProviderTransfer                              | class    | created    | src/Generated/Shared/Transfer/PaymentProviderTransfer.php    |
| PaymentMethodsTransfer                               | class    | created    | src/Generated/Shared/Transfer/PaymentMethodsTransfer.php     |
| PaymentMethodTransfer                                | class    | created    | src/Generated/Shared/Transfer/PaymentMethodTransfer.php      |
| QuoteTransfer                                        | class    | created    | src/Generated/Shared/Transfer/QuoteTransfer.php              |
| StoreTransfer                                        | class    | created    | src/Generated/Shared/Transfer/StoreTransfer.php              |
| MoneyValueTransfer                                   | class    | created    | src/Generated/Shared/Transfer/MoneyValueTransfer.php         |
| CurrencyTransfer                                     | class    | created    | src/Generated/Shared/Transfer/CurrencyTransfer.php           |
| QuoteResponseTransfer                                | class    | created    | src/Generated/Shared/Transfer/QuoteResponseTransfer.php      |
| QuoteErrorTransfer                                   | class    | created    | src/Generated/Shared/Transfer/QuoteErrorTransfer.php         |
| ShipmentTransfer                                     | class    | created    | src/Generated/Shared/Transfer/ShipmentTransfer.php           |
| RestErrorCollectionTransfer                          | class    | created    | src/Generated/Shared/Transfer/RestErrorCollectionTransfer.php |
| CheckoutDataTransfer                                 | class    | created    | src/Generated/Shared/Transfer/CheckoutDataTransfer.php       |
| ItemTransfer                                         | class    | created    | src/Generated/Shared/Transfer/ItemTransfer.php               |
| RestCheckoutResponseTransfer                         | class    | created    | src/Generated/Shared/Transfer/RestCheckoutResponseTransfer.php |
| RestErrorMessageTransfer                             | class    | created    | src/Generated/Shared/Transfer/RestErrorMessageTransfer.php   |
| RestCheckoutDataTransfer.quote                       | property | added      | src/Generated/Shared/Transfer/RestCheckoutDataTransfer.php   |
| RestCheckoutResponseTransfer.checkoutData            | property | added      | src/Generated/Shared/Transfer/RestCheckoutResponseTransfer.php |
| CheckoutDataTransfer.quote                           | property | added      | src/Generated/Shared/Transfer/CheckoutDataTransfer.php       |
| RestCheckoutDataResponseAttributesTransfer.addresses | property | deprecated | src/Generated/Shared/Transfer/RestCheckoutDataResponseAttributesTransfer.php |




{% endinfo_block %}


## 4) Set up behavior

Set up the following behaviors.

### Enable resources and relationships

Activate the following plugins:





| PLUGIN                                  | SPECIFICATION                                                | PREREQUISITES | NAMESPACE                                           |
| :-------------------------------------- | :----------------------------------------------------------- | :------------ | :-------------------------------------------------- |
| CheckoutDataResourcePlugin              | Registers the `сheckout-data` resource.                      | None          | Spryker\Glue\CheckoutRestApi\Plugin\GlueApplication |
| CheckoutResourcePlugin                  | Registers the `checkout` resource.                           | None          | Spryker\Glue\CheckoutRestApi\Plugin\GlueApplication |
| OrderRelationshipByOrderReferencePlugin | Adds a relationship to the `order` entity by order reference. | None          | Spryker\Glue\OrdersRestApi\Plugin                   |
| OrderPaymentsResourceRoutePlugin        | Registers the `order-payments` resource.                     | None          | Spryker\Glue\OrderPaymentsRestApi\Plugin            |




<details open>
    <summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\CheckoutRestApi\CheckoutRestApiConfig;
use Spryker\Glue\CheckoutRestApi\Plugin\GlueApplication\CheckoutDataResourcePlugin;
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

        return $resourceRelationshipCollection;
    }
}
```

</details>




{% info_block warningBox "Verification" %}


Make sure that the following plugins are activated:

| PLUGIN                                  | TEST                                                         |
| :-------------------------------------- | :----------------------------------------------------------- |
| CheckoutDataResourcePlugin              | Check if you get a valid response by sending the `POST http://glue.mysprykershop.com/checkout-data` request. |
| CheckoutResourcePlugin                  | Check if you get a valid response by sending the `POST http://glue.mysprykershop.com/checkout` request. |
| OrderRelationshipByOrderReferencePlugin | Check if you get order information from the `orders` resource by sending the `POST http://glue.mysprykershop.com/checkout?include=orders` request. |

{% endinfo_block %}

{% info_block warningBox "Verification" %}


To make sure that `OrderPaymentsResourceRoutePlugin` is activated, check if you get a valid response by sending the following request:

`http://glue.mysprykershop.com/order-payments`
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

{% endinfo_block %}

For more details, see [Implementing Checkout Steps for Glue API](https://documentation.spryker.com/docs/t-interacting-with-third-party-payment-providers-via-glue-api).

### Configure mapping

Mappers should be configured on a project level to map the data from the request into QuoteTransfer:





| PLUGIN                    | SPECIFICATION                                                | PREREQUISITES | NAMESPACE                                                    |
| :------------------------ | :----------------------------------------------------------- | :------------ | :----------------------------------------------------------- |
| CustomerQuoteMapperPlugin | Adds a mapper that maps customer information to `QuoteTransfer`. | None          | Spryker\Zed\CustomersRestApi\Communication\Plugin\CheckoutRestApi |
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




To make sure that `CustomerQuoteMapperPlugin` is activated, send the `POST http://glue.mysprykershop.com/checkout` request and check that the returned order information contains the customer information you have provided in the request.

To make sure that `AddressQuoteMapperPlugin` is activated, send a `POST http://glue.mysprykershop.com/checkout` request and check that the returned order information contains the billing and shipping address information you have provided in the request.

{% endinfo_block %}

### Configure the single payment method validator plugin

Activate the following plugins:





| PLUGIN                                                | SPECIFICATION                                                | PREREQUISITES | NAMESPACE                           |
| :---------------------------------------------------- | :----------------------------------------------------------- | :------------ | :---------------------------------- |
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



To make sure that `SinglePaymentCheckoutRequestAttributesValidatorPlugin` is activated, check that the following error is returned by sending the `POST http://glue.mysprykershop.com/checkout` request.

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

## Related features

Integrate the following related features.

| FEATURE      | REQUIRED FOR THE CURRENT FEATURE | INTEGRATION GUIDE                                            |
| :----------- | :------------------------------- | :----------------------------------------------------------- |
| Glue API: Shipment  | ✓                                | [Glue API: Shipment feature integration](https://documentation.spryker.com/docs/glue-api-shipment-feature-integration)  |
| Glue API: Payments   | ✓                                | [Glue API: Payments feature integration](https://documentation.spryker.com/docs/glue-api-payments-feature-integration) |


