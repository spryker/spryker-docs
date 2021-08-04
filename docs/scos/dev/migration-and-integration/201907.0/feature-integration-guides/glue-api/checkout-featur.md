---
title: Checkout Feature Integration
originalLink: https://documentation.spryker.com/v3/docs/checkout-feature-integration-201907
redirect_from:
  - /v3/docs/checkout-feature-integration-201907
  - /v3/docs/en/checkout-feature-integration-201907
---

{% info_block errorBox %}
The following Feature Integration Guide expects the basic feature to be in place.</br>The current guide only adds the **Checkout API** functionality.
{% endinfo_block %}

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version | Required sub-feature |
| --- | --- | --- |
| Spryker Core | 201907.0 | [Glue Application](/docs/scos/dev/migration-and-integration/201907.0/feature-integration-guides/glue-api/glue-applicatio) |
| Cart | 201907.0 | [Cart API](/docs/scos/dev/migration-and-integration/201907.0/feature-integration-guides/glue-api/cart-feature-in) |
| Customer Account Management | 201907.0 | Login API |
| Payments | 201907.0 | [Payments API](/docs/scos/dev/migration-and-integration/201907.0/feature-integration-guides/glue-api/payments-api-fe) |
|Shipments| 201907.0 | | 

### 1)  Install the Required Modules Using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker/checkout-rest-api:"1.4.0" spryker/shipments-rest-api:"1.1.0" spryker/order-payments-rest-api:"^1.0.0" --update-with-dependencies
```

<section contenteditable="false" class="warningBox"><div class="content">
    Make sure that the following modules have been installed:
    
| Module | Expected Directory |
| --- | --- |
| `CheckoutRestApi` | `vendor/spryker/checkout-rest-api` |
| `OrderPaymentsRestApi` | `vendor/spryker/order-payments-rest-api` |
| `ShipmentsRestApi` | `vendor/spryker/shipments-rest-api` |
</div></section>

### 2) Set up Transfer Objects
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
|`RestCheckoutResponseTransfer` | class | created |`src/Generated/Shared/Transfer/RestCheckoutResponseTransfer.php`|
|`RestOrderPaymentsAttributesTransfer` |class  | created | `src/Generated/Shared/Transfer/RestOrderPaymentsAttributesTransfer.php`|
| `UpdateOrderPaymentRequestTransfer`|class  | created |`src/Generated/Shared/Transfer/UpdateOrderPaymentRequestTransfer.php` |
|`UpdateOrderPaymentResponseTransfer` |class  | created |`src/Generated/Shared/Transfer/UpdateOrderPaymentResponseTransfer.php` |
| `RestShipmentTransfer`|class  | created |`src/Generated/Shared/Transfer/RestShipmentTransfer.php` |

</div></section>

### 3) Set up Behavior
#### Enable resources and relationships
Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `CheckoutDataResourcePlugin` | Registers the `checkout-data` resource. | None | `Spryker\Glue\CheckoutRestApi\Plugin\GlueApplication` |
| `CheckoutResourcePlugin` | Registers the `checkout` resource. | None | `Spryker\Glue\CheckoutRestApi\Plugin\GlueApplication` |
| `OrderRelationshipByOrderReferencePlugin` | Adds a relationship to the order entity by order reference. | None | `Spryker\Glue\OrdersRestApi\Plugin` |
| `OrderPaymentsResourceRoutePlugin` | Registers the `order-payments` resource. | None | `Spryker\Glue\OrderPaymentsRestApi\Plugin` |

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

</br>
</details>

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
Make sure that the following endpoint is available: `http://glue.mysprykershop.com/order-payments`. To do so, execute a *POST* call with the following body:
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

#### Configure mapping
Mappers should be configured on the project level in order to map the data from the request to `QuoteTransfer`:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `CustomerQuoteMapperPlugin` | Maps customer information to `QuoteTransfer`. | None | `Spryker\Zed\CustomersRestApi\Communication\Plugin\CheckoutRestApi` |
| `AddressQuoteMapperPlugin` | Maps billing and shipping address information to `QuoteTransfer`. | None | `Spryker\Zed\CustomersRestApi\Communication\Plugin\CheckoutRestApi` |
| `PaymentsQuoteMapperPlugin` | Maps payments information to `QuoteTransfer`. | None | `Spryker\Zed\PaymentsRestApi\Communication\Plugin\CheckoutRestApi` |
| `ShipmentQuoteMapperPlugin` | Maps shipment information to `QuoteTransfer`. | None | `Spryker\Zed\ShipmentsRestApi\Communication\Plugin\CheckoutRestApi` |

<details open>
<summary>src/Pyz/Zed/CheckoutRestApi/CheckoutRestApiDependencyProvider.php</summary>

```json
<?php
 
namespace Pyz\Zed\CheckoutRestApi;
 
use Spryker\Zed\CheckoutRestApi\CheckoutRestApiDependencyProvider as SprykerCheckoutRestApiDependencyProvider;
use Spryker\Zed\CustomersRestApi\Communication\Plugin\CheckoutRestApi\AddressQuoteMapperPlugin;
use Spryker\Zed\CustomersRestApi\Communication\Plugin\CheckoutRestApi\CustomerQuoteMapperPlugin;
use Spryker\Zed\PaymentsRestApi\Communication\Plugin\CheckoutRestApi\PaymentsQuoteMapperPlugin;
use Spryker\Zed\ShipmentsRestApi\Communication\Plugin\CheckoutRestApi\ShipmentQuoteMapperPlugin;
 
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
			new PaymentsQuoteMapperPlugin(),
			new ShipmentQuoteMapperPlugin(),
		];
	}
}
```

</br>
</details>

{% info_block warningBox "Verification" %}
To make sure that `CustomerQuoteMapperPlugin` is activated, send a *POST* request to `http://glue.mysprykershop.com/checkout` and make sure that the order contains the customer information you provided in the request.
{% endinfo_block %}

{% info_block warningBox "Verification" %}
To make sure that `AddressQuoteMapperPlugin` is activated, send a *POST* request to `http://glue.mysprykershop.com/checkout` and make sure that the order contains the billing and shipping address information you provided in the request.
{% endinfo_block %}

{% info_block warningBox "Verification" %}
To verify `PaymentsQuoteMapperPlugin` activation, send a *POST* request to `http://glue.mysprykershop.com/checkout` and make sure that the order contains the payment method you provided in the request.
{% endinfo_block %}

{% info_block warningBox "Verification" %}
To verify `ShipmentQuoteMapperPlugin` activation, send a POST request to `http://glue.mysprykershop.com/checkout` and make sure that the order contains the shipment method you provided in the request.
{% endinfo_block %}

#### Configure the single payment method validator plugin
Activate the following plugin(s):

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `SinglePaymentCheckoutRequestAttributesValidatorPlugin` | Used for checkout request data validation.</br>The plugin ensures that a request contains one payment method only. | None | `Spryker\Glue\CheckoutRestApi\Plugin` |
| `ShipmentMethodCheckoutDataValidatorPlugin` | Verifies whether the specified shipment method is valid. | None | `Spryker\Zed\ShipmentsRestApi\Communication\Plugin\CheckoutRestApi` |

<details open>
<summary>src/Pyz/Glue/CheckoutRestApi/CheckoutRestApiDependencyProvider.php</summary>

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

</br>
</details>

<details open>
<summary>src/Pyz/Zed/CheckoutRestApi/CheckoutRestApiDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Zed\CheckoutRestApi;
 
use Spryker\Zed\CheckoutRestApi\CheckoutRestApiDependencyProvider as SprykerCheckoutRestApiDependencyProvider;
use Spryker\Zed\CustomersRestApi\Communication\Plugin\CheckoutRestApi\AddressQuoteMapperPlugin;
use Spryker\Zed\CustomersRestApi\Communication\Plugin\CheckoutRestApi\CustomerQuoteMapperPlugin;
use Spryker\Zed\PaymentsRestApi\Communication\Plugin\CheckoutRestApi\PaymentsQuoteMapperPlugin;
use Spryker\Zed\ShipmentsRestApi\Communication\Plugin\CheckoutRestApi\ShipmentQuoteMapperPlugin;
 
class CheckoutRestApiDependencyProvider extends SprykerCheckoutRestApiDependencyProvider
{
	/**
	* @return \Spryker\Zed\CheckoutRestApiExtension\Dependency\Plugin\CheckoutDataValidatorPluginInterface[]
	*/
	protected function getCheckoutDataValidatorPlugins(): array
	{
		return [
			new ShipmentMethodCheckoutDataValidatorPlugin(),
		];
	}
}
```

</br>
</details>

{% info_block warningBox "Verification" %}
To make sure that `SinglePaymentCheckoutRequestAttributesValidatorPlugin` is activated, send a POST request to the `http://glue.mysprykershop.com/checkout` endpoint with multiple payment methods and make sure that you get the following error:
{% endinfo_block %}

**Multiple Payments Error**

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

{% info_block warningBox "Verification" %}
To make sure that `ShipmentMethodCheckoutDataValidatorPlugin` is activated, send a POST request to the `http://glue.mysprykershop.com/checkout` endpoint with an invalid shipment method and make sure that you get a corresponding error message.
{% endinfo_block %}
