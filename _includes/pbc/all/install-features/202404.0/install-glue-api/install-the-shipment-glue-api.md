


This document describes how to install the [Shipment](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/shipment-feature-overview.html) Glue API.

## Prerequisites

Install the required features:

| FEATURE                    | VERSION          | INSTALLATION GUIDE                                                                                                                                                                                  |
|----------------------------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Glue API: Spryker Core     | {{page.version}} | [Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html)                             |
| Shipment                   | {{page.version}} | [Install the Shipment feature](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-shipment-feature.html)                                 |
| Glue API: Checkout         | {{page.version}} | [Install the Checkout Glue API](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-checkout-glue-api.html)                                                    |
| Glue API: Glue Application | {{page.version}} | [Install the Glue Application Glue API](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html)                         |
| Glue API: Order Management | {{page.version}} | [Install the Order Management Glue API](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-order-management-glue-api.html) |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/shipments-rest-api:"1.11.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE           | EXPECTED DIRECTORY                |
|------------------|-----------------------------------|
| ShipmentsRestApi | vendor/spryker/shipments-rest-api |

{% endinfo_block %}

## 2) Set up configuration

Add the following configuration:

| CONFIGURATION                                                                   | SPECIFICATION                                                                                                                                 | NAMESPACE                |
|---------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|--------------------------|
| ShipmentsRestApiConfig::shouldExecuteShippingAddressValidationStrategyPlugins() | Defines if the stack of `ShippingAddressValidationStrategyPluginInterface` plugins should be executed during shipment checkout data validation. | Pyz\Zed\ShipmentsRestApi |

**src/Pyz/Glue/CheckoutRestApi/CheckoutRestApiConfig.php**

```php
<?php

namespace Pyz\Glue\ShipmentsRestApi;

use Spryker\Glue\ShipmentsRestApi\ShipmentsRestApiConfig as SprykerShipmentsRestApiConfig;

class ShipmentsRestApiConfig extends SprykerShipmentsRestApiConfig
{
    /**
     * @return bool
     */
    public function shouldExecuteShippingAddressValidationStrategyPlugins(): bool
    {
        return true;
    }
}
```

## 3) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER                                   | TYPE     | EVENT   | PATH                                                                         |
|--------------------------------------------|----------|---------|------------------------------------------------------------------------------|
| RestCheckoutDataTransfer                   | class    | created | src/Generated/Shared/Transfer/RestCheckoutDataTransfer.php                   |
| RestCheckoutRequestAttributesTransfer      | class    | created | src/Generated/Shared/Transfer/RestCheckoutRequestAttributesTransfer.php      |
| RestShipmentTransfer                       | class    | created | src/Generated/Shared/Transfer/RestShipmentTransfer.php                       |
| RestCheckoutDataResponseAttributesTransfer | class    | created | src/Generated/Shared/Transfer/RestCheckoutDataResponseAttributesTransfer.php |
| RestShipmentMethodTransfer                 | class    | created | src/Generated/Shared/Transfer/RestShipmentMethodTransfer.php                 |
| CheckoutResponseTransfer                   | class    | created | src/Generated/Shared/Transfer/CheckoutResponseTransfer.php                   |
| CheckoutErrorTransfer                      | class    | created | src/Generated/Shared/Transfer/CheckoutErrorTransfer.php                      |
| AddressTransfer                            | class    | created | src/Generated/Shared/Transfer/AddressTransfer.php                            |
| ShipmentMethodTransfer                     | class    | created | src/Generated/Shared/Transfer/ShipmentMethodTransfer.php                     |
| ShipmentMethodsTransfer                    | class    | created | src/Generated/Shared/Transfer/ShipmentMethodsTransfer.php                    |
| QuoteTransfer                              | class    | created | src/Generated/Shared/Transfer/QuoteTransfer.php                              |
| StoreTransfer                              | class    | created | src/Generated/Shared/Transfer/StoreTransfer.php                              |
| MoneyValueTransfer                         | class    | created | src/Generated/Shared/Transfer/MoneyValueTransfer.php                         |
| CurrencyTransfer                           | class    | created | src/Generated/Shared/Transfer/CurrencyTransfer.php                           |
| ShipmentTransfer                           | class    | created | src/Generated/Shared/Transfer/ShipmentTransfer.php                           |
| CheckoutDataTransfer                       | class    | created | src/Generated/Shared/Transfer/CheckoutDataTransfer.php                       |
| ExpenseTransfer                            | class    | created | src/Generated/Shared/Transfer/ExpenseTransfer.php                            |
| ItemTransfer                               | class    | created | src/Generated/Shared/Transfer/ItemTransfer.php                               |
| RestShipmentMethodsAttributesTransfer      | class    | created | src/Generated/Shared/Transfer/RestShipmentMethodsAttributesTransfer.php      |
| RestShipmentsAttributesTransfer            | class    | created | src/Generated/Shared/Transfer/RestShipmentsAttributesTransfer.php            |
| RestShipmentsTransfer                      | class    | created | src/Generated/Shared/Transfer/RestShipmentsTransfer.php                      |
| RestAddressTransfer                        | class    | created | src/Generated/Shared/Transfer/RestAddressTransfer.php                        |
| RestCartsTotalsTransfer                    | class    | created | src/Generated/Shared/Transfer/RestCartsTotalsTransfer.php                    |
| CountryTransfer                            | class    | created | src/Generated/Shared/Transfer/CountryTransfer.php                            |
| RestErrorCollectionTransfer                | class    | created | src/Generated/Shared/Transfer/RestErrorCollectionTransfer.php                |
| RestErrorMessageTransfer                   | class    | created | src/Generated/Shared/Transfer/RestErrorMessageTransfer.php                   |
| ShipmentGroupTransfer                      | class    | created | src/Generated/Shared/Transfer/ShipmentGroupTransfer.php                      |
| ShipmentMethodsCollectionTransfer          | class    | created | src/Generated/Shared/Transfer/ShipmentMethodsCollectionTransfer.php          |
| RestOrderShipmentsAttributesTransfer       | class    | created | src/Generated/Shared/Transfer/RestOrderShipmentsAttributesTransfer.php       |
| RestOrderAddressTransfer                   | class    | created | src/Generated/Shared/Transfer/RestOrderAddressTransfer.php                   |
| OrderTransfer                              | class    | created | src/Generated/Shared/Transfer/OrderTransfer.php                              |
| RestOrderDetailsAttributesTransfer         | class    | created | src/Generated/Shared/Transfer/RestOrderDetailsAttributesTransfer.php         |
| RestOrderItemsAttributesTransfer           | class    | created | src/Generated/Shared/Transfer/RestOrderItemsAttributesTransfer.php           |
| ShipmentCarrierTransfer                    | class    | created | src/Generated/Shared/Transfer/ShipmentCarrierTransfer.php                    |
| RestOrderExpensesAttributesTransfer        | class    | created | src/Generated/Shared/Transfer/RestOrderExpensesAttributesTransfer.php        |
| GiftCardMetadataTransfer                   | class    | created | src/Generated/Shared/Transfer/GiftCardMetadataTransfer.php                   |
| QuoteTransfer.bundleItems                  | property | added   | src/Generated/Shared/Transfer/QuoteTransfer.php                              |
| ShipmentMethodTransfer.name                | property | added   | src/Generated/Shared/Transfer/ShipmentMethodTransfer.php                     |
| ExpenseTransfer.idSalesExpense             | property | added   | src/Generated/Shared/Transfer/ExpenseTransfer.php                            |
| CheckoutErrorTransfer.parameters           | property | added   | src/Generated/Shared/Transfer/CheckoutErrorTransfer.php                      |
| ShipmentMethodsTransfer.shipmentHash       | property | added   | src/Generated/Shared/Transfer/ShipmentMethodsTransfer.php                    |

{% endinfo_block %}

## 4) Add translations

Add translations as follows:

1. Append glossary according to your configuration:

```text
checkout.validation.item.no_shipment_selected,No shipment selected for the cart item %id%.,en_US
checkout.validation.item.no_shipment_selected,Es wurde keine Lieferung für den Warenkorbartikel %id% ausgewählt.,de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}

## 5) Set up behavior

Set up the following behaviors.

### Enable resources and relationships

Activate the following plugins:

| PLUGIN                                                  | SPECIFICATION                                                                                               | PREREQUISITES | NAMESPACE                                            |
|---------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|---------------|------------------------------------------------------|
| ShipmentMethodsByCheckoutDataResourceRelationshipPlugin | If `RestCheckoutDataTransfer` is provided as payload, adds the `shipment-methods` resource as a relationship. |               | Spryker\Glue\ShipmentsRestApi\Plugin\GlueApplication |
| OrderShipmentByOrderResourceRelationshipPlugin          | If `OrderTransfer` is provided as payload, adds the `order-shipments` resource as a relationship .        |               | Spryker\Glue\ShipmentsRestApi\Plugin\GlueApplication |
| ShipmentMethodsByShipmentResourceRelationshipPlugin     | If `ShipmentGroupTransfer` is provided as payload, adds the `shipment-methods` resource as a relationship.     |               | Spryker\Glue\ShipmentsRestApi\Plugin\GlueApplication |
| ShipmentsByCheckoutDataResourceRelationshipPlugin       | If `RestCheckoutDataTransfer` is provided as payload, adds the `shipments` resource as a relationship.              |               | Spryker\Glue\ShipmentsRestApi\Plugin\GlueApplication |


<details>
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
        $resourceRelationshipCollection->addRelationship(
            OrdersRestApiConfig::RESOURCE_ORDERS,
            new OrderShipmentByOrderResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            ShipmentsRestApiConfig::RESOURCE_SHIPMENTS,
            new ShipmentMethodsByShipmentResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            CheckoutRestApiConfig::RESOURCE_CHECKOUT_DATA,
            new ShipmentsByCheckoutDataResourceRelationshipPlugin()
        );

        return $resourceRelationshipCollection;
    }
}
```
</details>

{% info_block warningBox "Verification" %}

* To make sure that `ShipmentMethodsByCheckoutDataResourceRelationshipPlugin` is activated, check that the information from the `shipment-methods` resource is returned by sending the `POST https://glue.mysprykershop.com/checkout-data?include=shipment-methods` request.
* To make sure that `OrderShipmentByOrderResourceRelationshipPlugin` is activated, make sure that the information from the `order-shipments` resource is returned by sending the `GET https://glue.mysprykershop.com/orders?include=order-shipments` request.
* To make sure that `ShipmentMethodsByShipmentResourceRelationshipPlugin` is activated, make sure that the information from the `shipment-methods` resource is returned by sending the `GET https://glue.mysprykershop.com/shipments?include=shipment-methods` request.
* To make sure that `ShipmentsByCheckoutDataResourceRelationshipPlugin` is activated, make sure that the information from the `shipments` resource is returned by sending the `POST https://glue.mysprykershop.com/checkout-data?include=shipments` request.

{% endinfo_block %}

### Configure mapping

To map the data from requests to `QuoteTransfer`, configure the following mappers on the project level:

| PLUGIN                                         | SPECIFICATION                                                                       | PREREQUISITES | NAMESPACE                                                         |
|------------------------------------------------|-------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------|
| ShipmentQuoteMapperPlugin                      | Maps shipment information to `QuoteTransfer`.                    |               | Spryker\Zed\ShipmentsRestApi\Communication\Plugin\CheckoutRestApi |
| ShipmentRestOrderDetailsAttributesMapperPlugin | Maps the shipments from `OrderTransfer` to `RestOrderDetailsAttributesTransfer`.    |               | Spryker\Glue\ShipmentsRestApi\Plugin\OrdersRestApi                |
| ShipmentsQuoteMapperPlugin                     | Maps the shipments from `RestCheckoutRequestAttributesTransfer` to `QuoteTransfer`. |               | Spryker\Zed\ShipmentsRestApi\Communication\Plugin\CheckoutRestApi |


**src/Pyz/Zed/CheckoutRestApi/CheckoutRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CheckoutRestApi;

use Spryker\Zed\CheckoutRestApi\CheckoutRestApiDependencyProvider as SprykerCheckoutRestApiDependencyProvider;
use Spryker\Zed\ShipmentsRestApi\Communication\Plugin\CheckoutRestApi\ShipmentQuoteMapperPlugin;
use Spryker\Zed\ShipmentsRestApi\Communication\Plugin\CheckoutRestApi\ShipmentsQuoteMapperPlugin;

class CheckoutRestApiDependencyProvider extends SprykerCheckoutRestApiDependencyProvider
{
    /**
     * @return \Spryker\Zed\CheckoutRestApiExtension\Dependency\Plugin\QuoteMapperPluginInterface[]
     */
    protected function getQuoteMapperPlugins(): array
    {
        return [
            new ShipmentQuoteMapperPlugin(),
            new ShipmentsQuoteMapperPlugin(),
        ];
    }
}
```


**src/Pyz/Glue/OrdersRestApi/OrdersRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\OrdersRestApi;

use Spryker\Glue\OrdersRestApi\OrdersRestApiDependencyProvider as SprykerOrdersRestApiDependencyProvider;
use Spryker\Glue\ShipmentsRestApi\Plugin\OrdersRestApi\ShipmentRestOrderDetailsAttributesMapperPlugin;

class OrdersRestApiDependencyProvider extends SprykerOrdersRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\OrdersRestApiExtension\Dependency\Plugin\RestOrderDetailsAttributesMapperPluginInterface[]
     */
    protected function getRestOrderDetailsAttributesMapperPlugins(): array
    {
        return [
            new ShipmentRestOrderDetailsAttributesMapperPlugin(),
        ];
    }
}
```


{% info_block warningBox "Verification" %}

* To verify that `ShipmentQuoteMapperPlugin` is activated, send the `POST https://glue.mysprykershop.com/checkout` request and check that the order contains the shipment method you've provided in the request.
* To verify that `ShipmentQuoteMapperPlugin` is activated, send the `POST https://glue.mysprykershop.com/checkout?include=shipments` and check that the order contains the shipments you've provided in the request.
* To verify that `ShipmentRestOrderDetailsAttributesMapperPlugin` is activated, send the `GET https://glue.mysprykershop.com/orders?include=order-shipments` request and make sure that the order contains the shipments you've provided in the request.

{% endinfo_block %}

### Configure the shipment method validator plugin and selected shipment method mapper plugin

Activate the following plugins:

| PLUGIN                                                 | SPECIFICATION                                                                     | PREREQUISITES | NAMESPACE                                                         |
|--------------------------------------------------------|-----------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------|
| SelectedShipmentMethodCheckoutDataResponseMapperPlugin | Maps the selected shipment method data to the `checkout-data`resource attributes. |               | Spryker\Glue\ShipmentsRestApi\Plugin\CheckoutRestApi              |
| ShipmentMethodCheckoutDataValidatorPlugin              | Validates shipment methods.                                                       |               | Spryker\Zed\ShipmentsRestApi\Communication\Plugin\CheckoutRestApi |


**src/Pyz/Glue/CheckoutRestApi/CheckoutRestApiDependencyProvider.php**

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


**src/Pyz/Zed/CheckoutRestApi/CheckoutRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CheckoutRestApi;

use Spryker\Zed\CheckoutRestApi\CheckoutRestApiDependencyProvider as SprykerCheckoutRestApiDependencyProvider;
use \Spryker\Zed\ShipmentsRestApi\Communication\Plugin\CheckoutRestApi\ShipmentMethodCheckoutDataValidatorPlugin;

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

{% info_block warningBox "Verification" %}

To verify that `SelectedShipmentMethodCheckoutDataResponseMapperPlugin` is activated, send the `POST https://glue.mysprykershop.com/checkout-data` request with a shipment a method ID and check that, in the response, the `selectedShipmentMethods` is not empty:

**Response sample**

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

To verify that `ShipmentMethodCheckoutDataValidatorPlugin` is activated, send the `POST https://glue.mysprykershop.com/checkout` request and make sure you get the shipment method not found error.

{% endinfo_block %}

### Configure the multi-shipment method validator and expander plugins

Activate the following plugins:

| PLUGIN                                      | SPECIFICATION                                                                                   | PREREQUISITES | NAMESPACE                                                         |
|---------------------------------------------|-------------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------|
| AddressSourceCheckoutRequestValidatorPlugin | Validates the attributes of given shipments and returns an array of errors if necessary.        |               | Spryker\Glue\ShipmentsRestApi\Plugin\CheckoutRestApi              |
| ShipmentDataCheckoutRequestValidatorPlugin  | Checks if `RestCheckoutRequestAttributesTransfer` provides shipment data per item or per order. |               | Spryker\Glue\ShipmentsRestApi\Plugin\CheckoutRestApi              |
| ItemsCheckoutDataValidatorPlugin            | Checks if `CheckoutDataTransfer` provides shipment data per item and per bundle item.           |               | Spryker\Zed\ShipmentsRestApi\Communication\Plugin\CheckoutRestApi |
| ItemsReadCheckoutDataValidatorPlugin        | Checks if `CheckoutDataTransfer` provides shipment data per item and bundle item.               |               | Spryker\Zed\ShipmentsRestApi\Communication\Plugin\CheckoutRestApi |
| ShipmentCheckoutDataExpanderPlugin          | Expands `RestCheckoutDataTransfer` with available shipment methods.                             |               | Spryker\Zed\ShipmentsRestApi\Communication\Plugin\CheckoutRestApi |


**src/Pyz/Glue/CheckoutRestApi/CheckoutRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\CheckoutRestApi;

use Spryker\Glue\CheckoutRestApi\CheckoutRestApiDependencyProvider as SprykerCheckoutRestApiDependencyProvider;
use Spryker\Glue\ShipmentsRestApi\Plugin\CheckoutRestApi\AddressSourceCheckoutRequestValidatorPlugin;
use Spryker\Glue\ShipmentsRestApi\Plugin\CheckoutRestApi\ShipmentDataCheckoutRequestValidatorPlugin;

class CheckoutRestApiDependencyProvider extends SprykerCheckoutRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\CheckoutRestApiExtension\Dependency\Plugin\CheckoutRequestValidatorPluginInterface[]
     */
    protected function getCheckoutRequestValidatorPlugins(): array
    {
        return [
            new ShipmentDataCheckoutRequestValidatorPlugin(),
            new AddressSourceCheckoutRequestValidatorPlugin(),
        ];
    }
}
```


<details>
<summary>src/Pyz/Zed/CheckoutRestApi/CheckoutRestApiDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\CheckoutRestApi;

use Spryker\Zed\CheckoutRestApi\CheckoutRestApiDependencyProvider as SprykerCheckoutRestApiDependencyProvider;
use Spryker\Zed\ShipmentsRestApi\Communication\Plugin\CheckoutRestApi\ItemsCheckoutDataValidatorPlugin;
use Spryker\Zed\ShipmentsRestApi\Communication\Plugin\CheckoutRestApi\ItemsReadCheckoutDataValidatorPlugin;
use Spryker\Zed\ShipmentsRestApi\Communication\Plugin\CheckoutRestApi\ShipmentCheckoutDataExpanderPlugin;

class CheckoutRestApiDependencyProvider extends SprykerCheckoutRestApiDependencyProvider
{
    /**
     * @return \Spryker\Zed\CheckoutRestApiExtension\Dependency\Plugin\CheckoutDataValidatorPluginInterface[]
     */
    protected function getCheckoutDataValidatorPlugins(): array
    {
        return [
            new ItemsCheckoutDataValidatorPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\CheckoutRestApiExtension\Dependency\Plugin\ReadCheckoutDataValidatorPluginInterface[]
     */
    protected function getReadCheckoutDataValidatorPlugins(): array
    {
        return [
            new ItemsReadCheckoutDataValidatorPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\CheckoutRestApiExtension\Dependency\Plugin\CheckoutDataExpanderPluginInterface[]
     */
    protected function getCheckoutDataExpanderPlugins(): array
    {
        return [
            new ShipmentCheckoutDataExpanderPlugin(),
        ];
    }
}
```
</details>

{% info_block warningBox "Verification" %}

To verify the plugins are activated, send the `POST https://glue.mysprykershop.com/checkout` request with invalid shipments and make sure errors are returned.

{% endinfo_block %}

## Install related features

| FEATURE            | REQUIRED FOR THE CURRENT FEATURE | INSTALLATION GUIDE                                                                                                                               |
|--------------------|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Glue API: Checkout | &check;                                | [Install the Checkout Glue API](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-checkout-glue-api.html) |
