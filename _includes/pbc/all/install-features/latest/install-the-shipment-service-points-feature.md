


This document describes how to install the [Shipment](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/shipment-feature-overview.html) + Service Points feature.

## Prerequisites

Install the required features:

| NAME           | VERSION          | INSTALLATION GUIDE                                                                                                                        |
|----------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| Shipment       | {{page.version}} | [Install the Shipment feature](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-shipment-feature.html)  |
| Service Points | {{page.version}} | [Install the Service Points feature](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/install-features/install-the-service-points-feature.html) |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/shipment-service-points: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                                         | EXPECTED DIRECTORY                                                 |
|------------------------------------------------|--------------------------------------------------------------------|
| ShipmentTypeServicePoint                       | vendor/spryker/shipment-type-service-point                         |
| ShipmentTypeServicePointDataImport             | vendor/spryker/shipment-type-service-point-data-import             |
| ShipmentTypesServicePointsResourceRelationship | vendor/spryker/shipment-types-service-points-resource-relationship |

{% endinfo_block %}

## 2) Set up configuration

Add the following configuration:

| CONFIGURATION                                                                   | SPECIFICATION                                                                                                                              | NAMESPACE                |
|---------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|--------------------------|
| ShipmentsRestApiConfig::shouldExecuteShippingAddressValidationStrategyPlugins() | Returns a list of shipment type keys which are applicable for shipping address validation and setting address based on selected service point. | Pyz\Zed\ShipmentsRestApi |

**src/Pyz/Glue/CheckoutRestApi/CheckoutRestApiConfig.php**

```php
<?php

namespace Pyz\Glue\ShipmentTypeServicePointsRestApi;

use Spryker\Glue\ShipmentTypeServicePointsRestApi\ShipmentTypeServicePointsRestApiConfig as SprykerShipmentTypeServicePointsRestApiConfig;

class ShipmentTypeServicePointsRestApiConfig extends SprykerShipmentTypeServicePointsRestApiConfig
{
    /**
     * @var string
     */
    protected const SHIPMENT_TYPE_KEY_PICKUP = 'pickup';

    /**
     * @return list<string>
     */
    public function getApplicableShipmentTypeKeysForShippingAddress(): array
    {
        return [static::SHIPMENT_TYPE_KEY_PICKUP];
    }
}

```

## 3) Import data

1. Prepare data according to your requirements using our demo data:

**data/import/common/common/shipment_type_service_type.csv**

```csv
shipment_type_key,service_type_key
pickup,pickup
```

| COLUMN            | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION                 |
|-------------------|-----------|-----------|--------------|----------------------------------|
| shipment_type_key | ✓ | string    | pickup       | Unique key of the shipment type. |
| service_type_key  | ✓ | string    | pickup       | Unique key of the service type.  |

2. Enable data imports in your configuration file—for example:

**data/import/local/full_EU.yml**

```yml
    - data_entity: shipment-type-service-type
      source: data/import/common/common/shipment_type_service_type.csv
```

3. Register the following data import plugins:

| PLUGIN                                  | SPECIFICATION                                                        | PREREQUISITES | NAMESPACE                                                                       |
|-----------------------------------------|----------------------------------------------------------------------|---------------|---------------------------------------------------------------------------------|
| ShipmentTypeServiceTypeDataImportPlugin | Imports the data about relations between shipment and service types into the database. |               | \Spryker\Zed\ShipmentTypeServicePointDataImport\Communication\Plugin\DataImport |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ShipmentTypeServicePointDataImport\Communication\Plugin\DataImport\ShipmentTypeServiceTypeDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface>
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new ShipmentTypeServiceTypeDataImportPlugin(),
        ];
    }
}
```

4. To enable the behaviors, register the console commands:

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\ShipmentTypeServicePointDataImport\ShipmentTypeServicePointDataImportConfig;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @var string
     */
    protected const COMMAND_SEPARATOR = ':';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container): array
    {
        return [
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . ShipmentTypeServicePointDataImportConfig::IMPORT_TYPE_SHIPMENT_TYPE_SERVICE_TYPE),
        ];
    }
}
```

5. Import data:

```bash
console data:import:shipment-type-service-type
```

{% info_block warningBox "Verification" %}

Make sure that entities have been imported into the `spy_shipment_type_service_type` database table.

{% endinfo_block %}

## 4) Set up behavior

1. Enable the expanding of shipment type storage data with the service type by registering the following plugins:

| PLUGIN                                       | SPECIFICATION                                                                                                       | PREREQUISITES | NAMESPACE                                                                            |
|----------------------------------------------|---------------------------------------------------------------------------------------------------------------------|---------------|--------------------------------------------------------------------------------------|
| ServiceTypeShipmentTypeStorageExpanderPlugin | Expands `ShipmentTypeStorageTransfer` with the service type data by `ShipmentTypeStorageTransfer.servicetype.uuid`. |               | Spryker\Client\ShipmentTypeServicePointStorage\Plugin\ShipmentTypeStorage            |
| ServiceTypeShipmentTypeStorageExpanderPlugin | Expands `ShipmentTypeStorageTransfer.serviceType` with the service type UUID.                                       |               | Spryker\Zed\ShipmentTypeServicePointStorage\Communication\Plugin\ShipmentTypeStorage |

**src/Pyz/Client/ShipmentTypeStorage/ShipmentTypeStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\ShipmentTypeStorage;

use Spryker\Client\ShipmentTypeServicePointStorage\Plugin\ShipmentTypeStorage\ServiceTypeShipmentTypeStorageExpanderPlugin;
use Spryker\Client\ShipmentTypeStorage\ShipmentTypeStorageDependencyProvider as SprykerShipmentTypeStorageDependencyProvider;

class ShipmentTypeStorageDependencyProvider extends SprykerShipmentTypeStorageDependencyProvider
{
    /**
     * @return list<\Spryker\Client\ShipmentTypeStorageExtension\Dependency\Plugin\ShipmentTypeStorageExpanderPluginInterface>
     */
    protected function getShipmentTypeStorageExpanderPlugins(): array
    {
        return [
            new ServiceTypeShipmentTypeStorageExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/ShipmentTypeStorage/ShipmentTypeStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ShipmentTypeStorage;

use Spryker\Zed\ShipmentTypeServicePointStorage\Communication\Plugin\ShipmentTypeStorage\ServiceTypeShipmentTypeStorageExpanderPlugin;
use Spryker\Zed\ShipmentTypeStorage\ShipmentTypeStorageDependencyProvider as SprykerShipmentTypeStorageDependencyProvider;

class ShipmentTypeStorageDependencyProvider extends SprykerShipmentTypeStorageDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\ShipmentTypeStorageExtension\Dependency\Plugin\ShipmentTypeStorageExpanderPluginInterface>
     */
    protected function getShipmentTypeStorageExpanderPlugins(): array
    {
        return [
            new ServiceTypeShipmentTypeStorageExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that `shipment-type` storage data is expanded with the service type UUID:

1. Fill the `spy_shipment_type_service_point` tables with data.
2. Run the `console publish:trigger-events -r shipment_type` command.
3. Make sure that the `spy_shipment_type_storage.data` field includes the `service_type.uuid` data.

{% endinfo_block %}

2. Enable the relationship between `shipment-types` and `service-types` resources in the Storefront API by registering the following plugins:

| PLUGIN                                               | SPECIFICATION                                                            | PREREQUISITES | NAMESPACE                                                            |
|------------------------------------------------------|--------------------------------------------------------------------------|---------------|----------------------------------------------------------------------|
| ServiceTypeByShipmentTypesResourceRelationshipPlugin | Adds the `service-types` resource as a relationship to `shipment-types`. |               | Spryker\Glue\ShipmentTypeServicePointsRestApi\Plugin\GlueApplication |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\ShipmentTypesRestApi\ShipmentTypesRestApiConfig;
use Spryker\Glue\ShipmentTypeServicePointsRestApi\Plugin\GlueApplication\ServiceTypeByShipmentTypesResourceRelationshipPlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
     *
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
     */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection,
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            ShipmentTypesRestApiConfig::RESOURCE_SHIPMENT_TYPES,
            new ServiceTypeByShipmentTypesResourceRelationshipPlugin(),
        );

        return $resourceRelationshipCollection;
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that you can include the `service-types` relation in the `shipment-types` resource requests:
- `GET https://glue.mysprykershop.com/shipment-types?include=service-types`
- `GET https://glue.mysprykershop.com/shipment-types/{{shipment-type-uuid}}?include=service-types`

{% endinfo_block %}

3. Enable addresses to be set based on the selected service point and shipment type for the Storefront API checkout:

| PLUGIN                                                                | SPECIFICATION                                                                                                                                    | PREREQUISITES | NAMESPACE                                                             |
|-----------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------------------------------------------------------|
| ShipmentTypeServicePointCheckoutRequestAttributesValidatorPlugin      | Checks that a valid service point is provided for each element in `RestCheckoutRequestAttributesTransfer.shipments` with an applicable shipment type. |               | Spryker\Glue\ShipmentTypeServicePointsRestApi\Plugin\CheckoutRestApi  |
| ShipmentTypeServicePointCheckoutRequestExpanderPlugin                 | Maps a provided service point address to a shipping address.                    |               | Spryker\Glue\ShipmentTypeServicePointsRestApi\Plugin\CheckoutRestApi  |
| MultiShipmentTypeServicePointShippingAddressValidationStrategyPlugin  | Checks if a multi-shipment request is given and at least one of the provided shipment methods is related to an  applicable shipment type.              |               | Spryker\Glue\ShipmentTypeServicePointsRestApi\Plugin\ShipmentsRestApi |
| SingleShipmentTypeServicePointShippingAddressValidationStrategyPlugin | Checks if a single-shipment request is given and the given shipment method is related to an applicable shipment type.                                     |               | Spryker\Glue\ShipmentTypeServicePointsRestApi\Plugin\ShipmentsRestApi |

**src/Pyz/Glue/CheckoutRestApi/CheckoutRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\CheckoutRestApi;

use Spryker\Glue\CheckoutRestApi\CheckoutRestApiDependencyProvider as SprykerCheckoutRestApiDependencyProvider;
use Spryker\Glue\ShipmentTypeServicePointsRestApi\Plugin\CheckoutRestApi\ShipmentTypeServicePointCheckoutRequestAttributesValidatorPlugin;
use Spryker\Glue\ShipmentTypeServicePointsRestApi\Plugin\CheckoutRestApi\ShipmentTypeServicePointCheckoutRequestExpanderPlugin;

class CheckoutRestApiDependencyProvider extends SprykerCheckoutRestApiDependencyProvider
{
    /**
     * @return list<\Spryker\Glue\CheckoutRestApiExtension\Dependency\Plugin\CheckoutRequestAttributesValidatorPluginInterface>
     */
    protected function getCheckoutRequestAttributesValidatorPlugins(): array
    {
        return [
            new ShipmentTypeServicePointCheckoutRequestAttributesValidatorPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Glue\CheckoutRestApiExtension\Dependency\Plugin\CheckoutRequestExpanderPluginInterface>
     */
    protected function getCheckoutRequestExpanderPlugins(): array
    {
        return [
            new ShipmentTypeServicePointCheckoutRequestExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Glue/ShipmentsRestApi/ShipmentsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\ShipmentsRestApi;

use Spryker\Glue\ShipmentsRestApi\ShipmentsRestApiDependencyProvider as SprykerShipmentsRestApiDependencyProvider;
use Spryker\Glue\ShipmentTypeServicePointsRestApi\Plugin\ShipmentsRestApi\MultiShipmentTypeServicePointShippingAddressValidationStrategyPlugin;
use Spryker\Glue\ShipmentTypeServicePointsRestApi\Plugin\ShipmentsRestApi\SingleShipmentTypeServicePointShippingAddressValidationStrategyPlugin;

class ShipmentsRestApiDependencyProvider extends SprykerShipmentsRestApiDependencyProvider
{
    /**
     * @return list<\Spryker\Glue\ShipmentsRestApiExtension\Dependency\Plugin\ShippingAddressValidationStrategyPluginInterface>
     */
    protected function getShippingAddressValidationStrategyPlugins(): array
    {
        return [
            new MultiShipmentTypeServicePointShippingAddressValidationStrategyPlugin(),
            new SingleShipmentTypeServicePointShippingAddressValidationStrategyPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}
Make sure that validation plugins work as expected:

1. Create a cart and add some items to it.
2. Send the `POST https://glue.mysprykershop.com/checkout-data` request with incorrect request body by not providing a service point for one of the shipment methods.

```json
{
  "data": {
    "type": "checkout-data",
    "attributes": {
      "idCart": "{{cart_uuid}}",
      "customer": {
        "salutation": "Mr",
        "email": "spencor.hopkin@spryker.com",
        "firstName": "Spencor",
        "lastName": "Hopkin"
      },
      "shipments": [
        {
          "idShipmentMethod": "{{id_shipment_method}}",
          "items": [
            "{{item_group_key}}"
          ]
        }
      ]
    }
  }
}
```

3. Check that the response contains information about the validation error.

Make sure a service point address is set as a shipping address during checkout:

1. Create a cart and add some items to it.
2. Send the `POST https://glue.mysprykershop.com/checkout` request:

```json
{
  "data": {
    "type": "checkout",
    "attributes": {
      "idCart": "{{cart_uuid}}",
      "customer": {
        "salutation": "Mr",
        "email": "spencor.hopkin@spryker.com",
        "firstName": "Spencor",
        "lastName": "Hopkin"
      },
      "billingAddress": {
        "salutation": "Mr",
        "email": "spencor.hopkin@spryker.com",
        "firstName": "spencor",
        "lastName": "hopkin",
        "address1": "Seeburger Str. 270",
        "address2": "210",
        "address3": "",
        "zipCode": "10115",
        "city": "Berlin",
        "iso2Code": "DE",
        "company": "Spryker",
        "phone": "+380669455897",
        "isDefaultShipping": true,
        "isDefaultBilling": true
      },
      "payments": [
        {
          "dummyPaymentInvoice": {
            "dateOfBirth": "08.04.1986"
          },
          "paymentMethodName": "Invoice",
          "paymentProviderName": "dummyPayment",
          "paymentSelection": "dummyPaymentInvoice"
        }
      ],
      "servicePoints": [
        {
          "items": [
            "{{item_group_key}}"
          ],
          "idServicePoint": "{{id_service_point}}"
        }
      ],
      "shipments": [
        {
          "idShipmentMethod": "{{applicable_shipment_method_id}}",
          "items": [
            "{{item_group_key}}"
          ],
          "shippingAddress": {
            "salutation": "Mr",
            "email": "spencor.hopkin@spryker.com",
            "firstName": "spencor",
            "lastName": "hopkin",
            "address1": "Seeburger Str. 270",
            "address2": "210",
            "address3": "",
            "zipCode": "10115",
            "city": "Berlin",
            "iso2Code": "DE",
            "company": "Spryker",
            "phone": "+380669455897",
            "isDefaultShipping": true,
            "isDefaultBilling": true
          }
        }
      ]
    }
  }
}
```

3. In the database, check that `spy_sales_order_address` contains the service point address data for the created order.

{% endinfo_block %}
