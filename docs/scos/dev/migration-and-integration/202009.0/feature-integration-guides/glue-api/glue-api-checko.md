---
title: Glue API- Checkout feature integration
originalLink: https://documentation.spryker.com/v6/docs/glue-api-checkout-feature-integration
redirect_from:
  - /v6/docs/glue-api-checkout-feature-integration
  - /v6/docs/en/glue-api-checkout-feature-integration
---

{% info_block errorBox %}
The following Feature Integration Guide expects the basic feature to be in place.</br>The current guide only adds the **Checkout API** functionality.
{% endinfo_block %}

Follow the steps below to install Checkout feature API.

## Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version | Required sub-feature |
| --- | --- | --- |
| Spryker Core | 202009.0 | [Glue Application](/docs/scos/dev/migration-and-integration/201907.0/feature-integration-guides/glue-api/glue-applicatio) |
| Cart | 202009.0 | [Cart API](/docs/scos/dev/migration-and-integration/201907.0/feature-integration-guides/glue-api/cart-feature-in) |
| Customer Account Management | 202009.0 | |
| Payments | 202009.0 | [Payments API](/docs/scos/dev/migration-and-integration/201907.0/feature-integration-guides/glue-api/payments-api-fe) |
|Shipments| 202009.0 | [Shipments API](https://documentation.spryker.com/docs/glue-api-shipment-feature-integration) | 

## 1)  Install the Required Modules Using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker/checkout-rest-api:"3.2.0" spryker/order-payments-rest-api:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:
    
| Module | Expected Directory |
| --- | --- |
| `CheckoutRestApi` | `vendor/spryker/checkout-rest-api` |
| `OrderPaymentsRestApi` | `vendor/spryker/order-payments-rest-api` |

{% endinfo_block %}

## 2) Set up Configuration
Put all the payment methods available in the shop to CheckoutRestApiConfig. For example:

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
}
```
 <br>
</details>

{% info_block infoBox "Note" %}

In case the `CheckoutRestApiConfig::IS_PAYMENT_PROVIDER_METHOD_TO_STATE_MACHINE_MAPPING_ENABLED` is *true*, make sure that payment methods and payment providers configured for your shop are also configured in `CheckoutRestApiConfig::getPaymentProviderMethodToStateMachineMapping()`. 
Setting `CheckoutRestApiConfig::IS_PAYMENT_PROVIDER_METHOD_TO_STATE_MACHINE_MAPPING_ENABLED` to *false* will ignore the GLUE level configuration and all payment methods will be returned in the checkout-data response.

{% endinfo_block %}

{% info_block infoBox "Note" %}

`CheckoutRestApiConfig::isShipmentMethodsMappedToAttributes()` must be set to *true* if you want to continue receiving shipment methods in the checkout-data attributes. This configuration defaults to true for backward compatibility.
In case the `Pyz\Glue\CheckoutRestApi\CheckoutRestApiConfig::isShipmentMethodsMappedToAttributes(`) is *true*, make sure the shipping methods attributes are returned. To verify that, send a POST request to the `http://glue.mysprykershop.com/checkout-data` endpoint and make sure that you get not empty `shipmentMethods` attribute in response:
<details open>
<summary>Response example</summary>
   
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
 <br>
</details>


{% endinfo_block %}

{% info_block infoBox "Note" %}

`CheckoutRestApiConfig::isPaymentProvidersMappedToAttributes()` must be set to *true* if you want to continue receiving payment methods in the checkout-data attributes. This configuration defaults to true for backward compatibility.
In case the `Pyz\Glue\CheckoutRestApi\CheckoutRestApiConfig::isPaymentProvidersMappedToAttributes()` is *true*, make sure the payment methods attributes are returned.  To verify that, send a POST request to the `http://glue.mysprykershop.com/checkout-data` endpoint and make sure that you get not empty `paymentProviders` attribute in response:
<details open>
<summary>Response example</summary>
   
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
 <br>
</details>



{% endinfo_block %}

## 3) Set up Transfer Objects
Run the following command to generate transfer changes:

```bash
console transfer:generate
```

<section contenteditable="false" class="warningBox"><div class="content">
    Make sure that the following changes have been applied in transfer objects:
    
| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `RestCheckoutDataTransfer` | class | created | `src/Generated/Shared/Transfer/RestCheckoutDataTransfer.php` |
| `RestCheckoutErrorTransfer` | class | created | `src/Generated/Shared/Transfer/RestCheckoutErrorTransfer.php` |
| `RestCheckoutDataResponseTransfer` | class | created | `src/Generated/Shared/Transfer/RestCheckoutDataResponseTransfer.php` |
| `RestCheckoutRequestAttributesTransfer`|class  | created | `src/Generated/Shared/Transfer/RestCheckoutRequestAttributesTransfer.php`|
|`RestCustomerTransfer` | class |created  |`src/Generated/Shared/Transfer/RestCustomerTransfer.php`|
|`RestAddressTransfer` | class |created  | `src/Generated/Shared/Transfer/RestAddressTransfer.php`|
| `RestShipmentTransfer`| class |  created| `src/Generated/Shared/Transfer/RestShipmentTransfer.php` |
| `RestPaymentTransfer`| class| created | `src/Generated/Shared/Transfer/RestPaymentTransfer.php`|
| `RestCheckoutDataResponseAttributesTransfer`| class | created |`src/Generated/Shared/Transfer/RestCheckoutDataResponseAttributesTransfer.php`|
|`RestPaymentProviderTransfer` |class  | created | `src/Generated/Shared/Transfer/RestPaymentProviderTransfer.php`|
|`RestPaymentMethodTransfer` | class |created  |`src/Generated/Shared/Transfer/RestPaymentMethodTransfer.php`|
|`RestShipmentMethodTransfer` | class | created | `src/Generated/Shared/Transfer/RestShipmentMethodTransfer.php`|
| `RestCheckoutResponseAttributesTransfer`| class | created |`src/Generated/Shared/Transfer/RestCheckoutResponseAttributesTransfer.php`|
|`CheckoutResponseTransfer` | class | created |`src/Generated/Shared/Transfer/CheckoutResponseTransfer.php`|
|`SaveOrderTransfer` |class  | created | `src/Generated/Shared/Transfer/SaveOrderTransfer.php`|
| `CheckoutErrorTransfer`|class  | created |`src/Generated/Shared/Transfer/CheckoutErrorTransfer.php` |
|`AddressesTransfer` |class  | created |`src/Generated/Shared/Transfer/AddressesTransfer.php` |
| `AddressTransfer`|class  | created |`src/Generated/Shared/Transfer/AddressTransfer.php` |
| `ShipmentMethodTransfer`|class  | created |`src/Generated/Shared/Transfer/ShipmentMethodTransfer.php` |
| `ShipmentMethodsCollectionTransfer`|class  | created |`src/Generated/Shared/Transfer/ShipmentMethodsCollectionTransfer.php` |
| `PaymentProviderCollectionTransfer`|class  | created |`src/Generated/Shared/Transfer/PaymentProviderCollectionTransfer.php` |
| `PaymentProviderTransfer`|class  | created |`src/Generated/Shared/Transfer/PaymentProviderTransfer.php` |
| `PaymentMethodsTransfer`|class  | created |`src/Generated/Shared/Transfer/PaymentMethodsTransfer.php` |
| `PaymentMethodTransfer`|class  | created |`src/Generated/Shared/Transfer/PaymentMethodTransfer.php` |
| `QuoteTransfer`|class  | created |`src/Generated/Shared/Transfer/QuoteTransfer.php` |
| `StoreTransfer`|class  | created |`src/Generated/Shared/Transfer/StoreTransfer.php` |
| `MoneyValueTransfer`|class  | created |`src/Generated/Shared/Transfer/MoneyValueTransfer.php` |
| `CurrencyTransfer`|class  | created |`src/Generated/Shared/Transfer/CurrencyTransfer.php` |
| `QuoteResponseTransfer`|class  | created |`src/Generated/Shared/Transfer/QuoteResponseTransfer.php` |
| `QuoteErrorTransfer`|class  | created |`src/Generated/Shared/Transfer/QuoteErrorTransfer.php` |
| `ShipmentTransfer`|class  | created |`src/Generated/Shared/Transfer/ShipmentTransfer.php` |
| `RestErrorCollectionTransfer`|class  | created |`src/Generated/Shared/Transfer/RestErrorCollectionTransfer.php` |
| `CheckoutDataTransfer`|class  | created |`src/Generated/Shared/Transfer/CheckoutDataTransfer.php` |
| `ItemTransfer`|class  | created |`src/Generated/Shared/Transfer/ItemTransfer.php` |
| `RestCheckoutResponseTransfer`|class  | created |`src/Generated/Shared/Transfer/RestCheckoutResponseTransfer.php` |
| `RestErrorMessageTransfer`|class  | created |`src/Generated/Shared/Transfer/RestErrorMessageTransfer.php` |

</div></section>

## 4) Set up Behavior
### Enable resources and relationships
Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `CheckoutDataResourcePlugin` | Registers the `checkout-data` resource. | None | `Spryker\Glue\CheckoutRestApi\Plugin\GlueApplication` |
| `CheckoutResourcePlugin` | Registers the `checkout` resource. | None | `Spryker\Glue\CheckoutRestApi\Plugin\GlueApplication` |
| `OrderRelationshipByOrderReferencePlugin` | Adds a relationship to the order entity by order reference. | None | `Spryker\Glue\OrdersRestApi\Plugin` |
| `OrderPaymentsResourceRoutePlugin` | Registers the `order-payments` resource. | None | `Spryker\Glue\OrderPaymentsRestApi\Plugin` |

src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php
    
```php
<?php
 
namespace Pyz\Glue\GlueApplication;
 
use Spryker\Glue\CheckoutRestApi\CheckoutRestApiConfig;
use Spryker\Glue\CheckoutRestApi\Plugin\GlueApplication\CheckoutDataResourcePlugin;
use Spryker\Glue\CheckoutRestApi\Plugin\GlueApplication\CheckoutResourcePlugin;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\OrdersRestApi\Plugin\OrderRelationshipByOrderReferencePlugin;
 
class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
	/**
	* @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
	*/
	protected function getResourceRoutePlugins(): array
	{
		return [
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

{% info_block warningBox "Verification" %}
To verify that `CheckoutDataResourcePlugin` is activated, send a *POST* request to `http://glue.mysprykershop.com/checkout-data` and make sure that you get a response different from **404 Not Found**.
{% endinfo_block %}

{% info_block warningBox "Verification" %}
To verify that `CheckoutResourcePlugin` is activated, send a *POST* request to `http://glue.mysprykershop.com/checkout` and make sure that you get a response different from **404 Not Found**.
{% endinfo_block %}

{% info_block warningBox "Verification" %}
To verify that `OrderRelationshipByOrderReferencePlugin` is activated, send a *POST* request to `http://glue.mysprykershop.com/checkout?include=orders` and make sure that you get a response that includes a section with the corresponding order resource.
{% endinfo_block %}

{% info_block warningBox "Verification" %}
To verify that `OrderPaymentsResourceRoutePlugin` is activated, make sure that the following endpoint is available: `http://glue.mysprykershop.com/order-payments`. To do so, send a *POST* request with the following body:
{% endinfo_block %}

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

For more details, see [Updating Payment Data](https://documentation.spryker.com/v4/docs/checking-out-purchases-and-getting-checkout-data-201907#updating-payment-data).

### Configure mapping
Mappers should be configured on the project level to map the data from the request to `QuoteTransfer`:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `CustomerQuoteMapperPlugin` | Adds a mapper that maps Customer information to `QuoteTransfer`. | None | `Spryker\Zed\CustomersRestApi\Communication\Plugin\CheckoutRestApi` |
| `AddressQuoteMapperPlugin` | Adds a mapper that maps billing and shipping address information to `QuoteTransfer`. | None | `Spryker\Zed\CustomersRestApi\Communication\Plugin\CheckoutRestApi` |

src/Pyz/Zed/CheckoutRestApi/CheckoutRestApiDependencyProvider.php

```json
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
To verify that `CustomerQuoteMapperPlugin` is activated, send a *POST* request to `http://glue.mysprykershop.com/checkout` and make sure that the order contains the customer information you provided in the request.
{% endinfo_block %}

{% info_block warningBox "Verification" %}
To verify that `AddressQuoteMapperPlugin` is activated, send a *POST* request to `http://glue.mysprykershop.com/checkout` and make sure that the order contains the billing and shipping address information you provided in the request.
{% endinfo_block %}

### Configure the single payment method validator plugin
Activate the following plugin(s):

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `SinglePaymentCheckoutRequestAttributesValidatorPlugin` | Used for checkout request data validation.</br>The plugin ensures that a request contains one payment method only. | None | `Spryker\Glue\CheckoutRestApi\Plugin` |


src/Pyz/Glue/CheckoutRestApi/CheckoutRestApiDependencyProvider.php

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
To verify that `SinglePaymentCheckoutRequestAttributesValidatorPlugin` is activated, send a *POST* request to the `http://glue.mysprykershop.com/checkout` endpoint with multiple payment methods and make sure that you get the following error:
{% endinfo_block %}
   
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

## Related Features

| Feature | Link |
| --- | --- |
| Shipment API | [Glue API: Shipment Feature Integration](https://documentation.spryker.com/docs/glue-api-shipment-feature-integration) |
| Payments API | [Glue API: Payments Feature Integration](https://documentation.spryker.com/docs/glue-api-payments-feature-integration) |



