---
title: Glue API- Shipment feature integration
originalLink: https://documentation.spryker.com/v6/docs/glue-api-shipment-feature-integration
redirect_from:
  - /v6/docs/glue-api-shipment-feature-integration
  - /v6/docs/en/glue-api-shipment-feature-integration
---

Follow the steps below to install Shipment feature API.

## Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version | Required sub-feature|
| --- | --- |--- |
| Spryker Core	 | master |[Spryker Core API](https://documentation.spryker.com/docs/glue-spryker-core-feature-integration) |
| Shipments	 | master | |

## 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:
```bash
composer require spryker/shipments-rest-api:"1.3.0" --update-with-dependencies
```
{% info_block warningBox "Verification" %}

Make sure that the following modules were installed:

| Module | Expected Directory |
| --- | --- |
| ShipmentsRestApi | vendor/spryker/shipments-rest-api |

{% endinfo_block %}

## 2) Set up Transfer Objects
Run the following commands to generate transfer changes:

```bash
console transfer:generate
```

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| RestCheckoutDataTransfer | class | created | src/Generated/Shared/Transfer/RestCheckoutDataTransfer.php |
| RestCheckoutRequestAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestCheckoutRequestAttributesTransfer.php |
| RestShipmentTransfer | class | created | src/Generated/Shared/Transfer/RestShipmentTransfer.php |
| RestCheckoutDataResponseAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestCheckoutDataResponseAttributesTransfer.php |
| RestShipmentMethodTransfer | class | created | src/Generated/Shared/Transfer/RestShipmentMethodTransfer.php |
| CheckoutResponseTransfer | class | created | src/Generated/Shared/Transfer/CheckoutResponseTransfer.php |
| CheckoutErrorTransfer | class | created | src/Generated/Shared/Transfer/CheckoutErrorTransfer.php |
| AddressTransfer | class | created | src/Generated/Shared/Transfer/AddressTransfer.php |
| ShipmentMethodTransfer | class | created | src/Generated/Shared/Transfer/ShipmentMethodTransfer.php |
| ShipmentMethodsTransfer | class | created | src/Generated/Shared/Transfer/ShipmentMethodsTransfer.php |
| QuoteTransfer | class | created | src/Generated/Shared/Transfer/QuoteTransfer.php |
| StoreTransfer | class | created | src/Generated/Shared/Transfer/StoreTransfer.php |
| MoneyValueTransfer | class | created | src/Generated/Shared/Transfer/MoneyValueTransfer.php |
| CurrencyTransfer | class | created | src/Generated/Shared/Transfer/CurrencyTransfer.php |
| ShipmentTransfer | class | created | src/Generated/Shared/Transfer/ShipmentTransfer.php |
| CheckoutDataTransfer | class | created | src/Generated/Shared/Transfer/CheckoutDataTransfer.php |
| ExpenseTransfer | class | created | src/Generated/Shared/Transfer/ExpenseTransfer.php |
| ItemTransfer | class | created | src/Generated/Shared/Transfer/ItemTransfer.php |
| RestShipmentMethodsAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestShipmentMethodsAttributesTransfer.php |


## 3) Set up Behavior
### Enable resources and relationships

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| ShipmentMethodsByCheckoutDataResourceRelationshipPlugin | Adds `shipment-methods` resource as relationship in case `RestCheckoutDataTransfer` is provided as payload. | None | Spryker\Glue\ShipmentsRestApi\Plugin\GlueApplication |

<details open>
<summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>
   
```php
<?php
 
namespace Pyz\Glue\GlueApplication;
 
use Spryker\Glue\CheckoutRestApi\CheckoutRestApiConfig;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\ShipmentsRestApi\Plugin\GlueApplication\ShipmentMethodsByCheckoutDataResourceRelationshipPlugin;
 
class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
     *
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
     */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            CheckoutRestApiConfig::RESOURCE_CHECKOUT_DATA,
            new ShipmentMethodsByCheckoutDataResourceRelationshipPlugin()
        );
 
        return $resourceRelationshipCollection;
    }
}
```
 <br>
</details>

{% info_block warningBox "Verification" %}

To verify that `ShipmentMethodsByCheckoutDataResourceRelationshipPlugin` is activated, send a *POST* request to `http://glue.mysprykershop.com/checkout-data?include=shipment-methods` and make sure that you get a response that includes a section with the `shipment-methods` resource.

{% endinfo_block %}

### Configure mapping
Mappers should be configured on a project level in order to map the data from the request into `QuoteTransfer`:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| ShipmentQuoteMapperPlugin | Adds a mapper that maps Shipment information to `QuoteTransfer`. | None | Spryker\Zed\ShipmentsRestApi\Communication\Plugin\CheckoutRestApi |

<details open>
<summary>src/Pyz/Zed/CheckoutRestApi/CheckoutRestApiDependencyProvider.php</summary>
   
```php
<?php
 
namespace Pyz\Zed\CheckoutRestApi;
 
use Spryker\Zed\CheckoutRestApi\CheckoutRestApiDependencyProvider as SprykerCheckoutRestApiDependencyProvider;
use Spryker\Zed\ShipmentsRestApi\Communication\Plugin\CheckoutRestApi\ShipmentQuoteMapperPlugin;
 
class CheckoutRestApiDependencyProvider extends SprykerCheckoutRestApiDependencyProvider
{
    /**
     * @return \Spryker\Zed\CheckoutRestApiExtension\Dependency\Plugin\QuoteMapperPluginInterface[]
     */
    protected function getQuoteMapperPlugins(): array
    {
        return [
            new ShipmentQuoteMapperPlugin(),
        ];
    }
}
```
 <br>
</details>

{% info_block warningBox "Verification" %}

To verify that `ShipmentQuoteMapperPlugin` is activated, send a *POST* request to `http://glue.mysprykershop.com/checkout` and make sure that the order contains the shipment method you provided in the request.

{% endinfo_block %}


### Configure the shipment method validator plugin and selected shipment method mapper plugin

Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| SelectedShipmentMethodCheckoutDataResponseMapperPlugin | Maps the selected shipment method data to the `checkout-data` resource attributes. | None | Spryker\Glue\ShipmentsRestApi\Plugin\CheckoutRestApi |
| ShipmentMethodCheckoutDataValidatorPlugin | Verifies if a shipment method is valid. | None | Spryker\Zed\ShipmentsRestApi\Communication\Plugin\CheckoutRestApi |

<details open>
<summary>src/Pyz/Glue/CheckoutRestApi/CheckoutRestApiDependencyProvider.php</summary>
   
```php
<?php
 
namespace Pyz\Glue\CheckoutRestApi;
 
use Spryker\Glue\CheckoutRestApi\CheckoutRestApiDependencyProvider as SprykerCheckoutRestApiDependencyProvider;
use Spryker\Glue\ShipmentsRestApi\Plugin\CheckoutRestApi\SelectedShipmentMethodCheckoutDataResponseMapperPlugin;
 
class CheckoutRestApiDependencyProvider extends SprykerCheckoutRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\CheckoutRestApiExtension\Dependency\Plugin\CheckoutDataResponseMapperPluginInterface[]
     */
    protected function getCheckoutDataResponseMapperPlugins(): array
    {
        return [
            new SelectedShipmentMethodCheckoutDataResponseMapperPlugin(),
        ];
    }
}
```
 <br>
</details>

<details open>
<summary>src/Pyz/Zed/CheckoutRestApi/CheckoutRestApiDependencyProvider.php</summary>
   
```php
<?php
 
namespace Pyz\Zed\CheckoutRestApi;
 
use Spryker\Zed\CheckoutRestApi\CheckoutRestApiDependencyProvider as SprykerCheckoutRestApiDependencyProvider;
use Spryker\Zed\ShipmentsRestApi\Communication\Plugin\CheckoutRestApi\ShipmentMethodCheckoutDataValidatorPlugin;
 
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
 <br>
</details>

{% info_block warningBox "Verification" %}

To verify that `SelectedShipmentMethodCheckoutDataResponseMapperPlugin` is activated, send a *POST* request to the `http://glue.mysprykershop.com/checkout-data` endpoint with shipment method id and make sure that you get not empty `selectedShipmentMethods` attribute in response:
<details open>
<summary>Response example</summary>
   
```json
{
    "data":
    {
        "type": "checkout-data",
        "id": null,
        "attributes": {
            "addresses": [],
            "paymentProviders": [],
            "shipmentMethods": [],
            "selectedShipmentMethods": [
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
    }
}
```
 <br>
</details>


{% endinfo_block %}

{% info_block warningBox "Verification" %}

To verify that `ShipmentMethodCheckoutDataValidatorPlugin` is activated, send a *POST* request to the `http://glue.mysprykershop.com/checkout` endpoint with an invalid shipping method ID and make sure that you get the error saying that a shipment method is not found.

{% endinfo_block %}

## Related Features

| Feature | Link |
| --- | --- |
| Checkout API | [Glue API: Checkout Feature Integration](https://documentation.spryker.com/docs/checkout-feature-integration-201907) |



