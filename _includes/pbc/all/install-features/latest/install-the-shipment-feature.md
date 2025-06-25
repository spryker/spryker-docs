


{% info_block errorBox %}

The following feature installation guide expects the basic feature to be in place. It only adds the following functionalities:
- Shipment Back Office UI
- Delivery method per store
- Shipment data import
- Sales order item extension

{% endinfo_block %}

## Install feature core

Follow the steps below to install the Shipment feature core.

### Prerequisites

Install the required features:


| NAME             | VERSION          | INSTALLATION GUIDE                                                                                                                                           |
|------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core     | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Order Management | 202507.0 | [Install the Order Management feature](/docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html)                |

### 1) Install the required modules

```bash
composer require spryker-feature/shipment:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                  | EXPECTED DIRECTORY                        |
|-------------------------|-------------------------------------------|
| SalesShipmentType       | vendor/spryker/sales-shipment-type        |
| ShipmentDataImport      | vendor/spryker/shipment-data-import       |
| ShipmentGui             | vendor/spryker/shipment-gui               |
| Shipment                | vendor/spryker/shipment                   |
| ShipmentsBackendApi     | vendor/spryker/shipments-backend-api      |
| ShipmentType            | vendor/spryker/shipment-type              |
| ShipmentTypeDataImport  | vendor/spryker/shipment-type-data-import  |
| ShipmentTypesRestApi    | vendor/spryker/shipment-types-rest-api    |
| ShipmentTypeStorage     | vendor/spryker/shipment-type-storage      |
| ShipmentTypesBackendApi | vendor/spryker/shipment-types-backend-api |

{% endinfo_block %}

### 2) Set up configuration

1. Add the following configuration:

| CONFIGURATION                                                | SPECIFICATION                                                                                                                                                                         | NAMESPACE            |
|--------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------|
| ShipmentConfig::getShipmentHashFields()                      | Used to group items by shipment using the shipment type UUID.                                       | Pyz\Service\Shipment |
| ShipmentConfig::shouldExecuteQuotePostRecalculationPlugins() | Defines if the stack of `QuotePostRecalculatePluginStrategyInterface` plugins should be executed after quote recalculation in the `ShipmentFacade::expandQuoteWithShipmentGroups()` method. | Pyz\Zed\Shipment     |

**src/Pyz/Service/Shipment/ShipmentConfig.php**

```php
<?php

namespace Pyz\Service\Shipment;

use Generated\Shared\Transfer\ShipmentTransfer;
use Spryker\Service\Shipment\ShipmentConfig as SprykerShipmentConfig;

class ShipmentConfig extends SprykerShipmentConfig
{
    /**
     * @return list<string>
     */
    public function getShipmentHashFields(): array
    {
        return array_merge(parent::getShipmentHashFields(), [ShipmentTransfer::SHIPMENT_TYPE_UUID]);
    }
}
```

**src/Pyz/Zed/Shipment/ShipmentConfig.php**

```php
<?php

namespace Pyz\Zed\Shipment;

use Spryker\Zed\Shipment\ShipmentConfig as SprykerShipmentConfig;

class ShipmentConfig extends SprykerShipmentConfig
{
    /**
     * @return bool
     */
    public function shouldExecuteQuotePostRecalculationPlugins(): bool
    {
        return false;
    }
}
```

2. To make the `shipment-types` resource protected, adjust the protected paths' configuration:

**src/Pyz/Shared/GlueBackendApiApplicationAuthorizationConnector/GlueBackendApiApplicationAuthorizationConnectorConfig.php**

```php
<?php

namespace Pyz\Shared\GlueBackendApiApplicationAuthorizationConnector;

use Spryker\Shared\GlueBackendApiApplicationAuthorizationConnector\GlueBackendApiApplicationAuthorizationConnectorConfig as SprykerGlueBackendApiApplicationAuthorizationConnectorConfig;

class GlueBackendApiApplicationAuthorizationConnectorConfig extends SprykerGlueBackendApiApplicationAuthorizationConnectorConfig
{
    /**
     * @return array<string, mixed>
     */
    public function getProtectedPaths(): array
    {
        return [
               '/\/shipment-types.*/' => [
                'isRegularExpression' => true,
            ],
        ];
    }
}
```

### 3) To enable the Storefront API, register the following plugins

| PLUGIN                                                   | SPECIFICATION                                                                                            | PREREQUISITES | NAMESPACE                                                             |
|----------------------------------------------------------|----------------------------------------------------------------------------------------------------------|---------------|-----------------------------------------------------------------------|
| ShipmentTypesResourceRoutePlugin                         | Registers the `shipment-types` resource.                                                                 |               | Spryker\Glue\ShipmentTypesRestApi\Plugin\GlueApplication              |
| ShipmentTypesByShipmentMethodsResourceRelationshipPlugin | Adds the `shipment-types` resources as a relationship to `shipment-methods` resources.                       |               | Spryker\Glue\ShipmentTypesRestApi\Plugin\GlueApplication              |
| SelectedShipmentTypesCheckoutDataResponseMapperPlugin    | Maps the selected shipment types to `RestCheckoutDataResponseAttributesTransfer.selectedShipmentTypes`.      |               | Spryker\Glue\ShipmentTypesRestApi\Plugin\CheckoutRestApi              |
| ItemShipmentTypeQuoteMapperPlugin                        | Maps shipment types taken from shipment methods to `Quote.items.shipmentType`.                           |               | Spryker\Zed\ShipmentTypesRestApi\Communication\Plugin\CheckoutRestApi |
| ShipmentTypeCheckoutDataValidatorPlugin                  | Validates whether the shipment type related to the shipment method is active and belongs to the quote store. |               | Spryker\Zed\ShipmentTypesRestApi\Communication\Plugin\CheckoutRestApi |
| ShipmentTypeReadCheckoutDataValidatorPlugin              | Validates whether the shipment type related to the shipment method is active and belongs to the quote store. |               | Spryker\Zed\ShipmentTypesRestApi\Communication\Plugin\CheckoutRestApi |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\ShipmentTypesRestApi\Plugin\GlueApplication\ShipmentTypesByShipmentMethodsResourceRelationshipPlugin;
use Spryker\Glue\ShipmentTypesRestApi\Plugin\GlueApplication\ShipmentTypesResourceRoutePlugin;
use Spryker\Glue\ShipmentsRestApi\ShipmentsRestApiConfig;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * {@inheritDoc}
     *
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface>
     */
    protected function getResourceRoutePlugins(): array
    {
        new ShipmentTypesResourceRoutePlugin(),
    }

    /**
     * {@inheritDoc}
     *
     * @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
     *
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
     */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection,
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            ShipmentsRestApiConfig::RESOURCE_SHIPMENT_METHODS,
            new ShipmentTypesByShipmentMethodsResourceRelationshipPlugin(),
        );

        return $resourceRelationshipCollection;
    }
}
```

{% info_block warningBox "Verification" %}

- Make sure that you can send the following requests:

- `GET https://glue.mysprykershop.com/shipment-types`
- `GET https://glue.mysprykershop.com/shipment-types/{{shipment-type-uuid}}`

{% endinfo_block %}

{% info_block warningBox "Verification" %}

- Make sure you have the `shipment-types` resource as a relationship to `shipment-methods` when you send a request with the multi-shipment request structure.

`POST https://glue-backend.mysprykershop.com/checkout-data?include=shipments,shipment-methods,shipment-types`
<details>
  <summary>Request body example</summary>
  ```json
  {
      "data": {
          "type": "checkout-data",
          "attributes": {
              "customer": {
                  "salutation": "Mr",
                  "email": "spencor.hopkin@spryker.com",
                  "firstName": "Spencor",
                  "lastName": "Hopkin"
              },
              "idCart": "d60de64b-08c7-564d-8916-d7756f2dc865",
              "payments": [
                  {
                      "paymentMethodName": "credit card",
                      "paymentProviderName": "DummyPayment"
                  }
              ],
              "shipments": [
                  {
                      "items": [
                          "139_24699831_c45147dee729311ef5b5c3003946c48f"
                      ],
                      "shippingAddress": {
                          "salutation": "Mr",
                          "email": "spencor.hopkin@spryker.com",
                          "firstName": "Spencor",
                          "lastName": "Hopkin",
                          "address1": "West road",
                          "address2": "212",
                          "address3": "",
                          "zipCode": "61000",
                          "city": "Berlin",
                          "iso2Code": "DE",
                          "company": "Spryker",
                          "isDefaultShipping": true,
                          "isDefaultBilling": true
                      },
                      "idShipmentMethod": 1,
                      "requestedDeliveryDate": null
                  }
              ]
          }
      }
  }
  ```
</details>

<details>
  <summary>Response body example</summary>
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
              "selectedPaymentMethods": [],
              "selectedServicePoints": [],
              "selectedShipmentTypes": []
          },
          "links": {
              "self": "http://glue.de.spryker.local/checkout-data?include=shipments,shipment-methods,shipment-types"
          },
          "relationships": {
              "shipments": {
                  "data": [
                      {
                          "type": "shipments",
                          "id": "d96343e971c91e3ecb098976d1e2cc9b"
                      }
                  ]
              }
          }
      },
      "included": [
          {
              "type": "shipment-types",
              "id": "9e1bd563-3106-52d1-9717-18e8d491e3b3",
              "attributes": {
                  "name": "Delivery",
                  "key": "delivery"
              },
              "links": {
                  "self": "http://glue.de.spryker.local/shipment-types/9e1bd563-3106-52d1-9717-18e8d491e3b3"
              }
          },
          {
              "type": "shipment-methods",
              "id": "1",
              "attributes": {
                  "name": "Standard",
                  "carrierName": "Spryker Dummy Shipment",
                  "deliveryTime": null,
                  "price": 490,
                  "currencyIsoCode": "EUR"
              },
              "links": {
                  "self": "http://glue.de.spryker.local/shipment-methods/1"
              },
              "relationships": {
                  "shipment-types": {
                      "data": [
                          {
                              "type": "shipment-types",
                              "id": "9e1bd563-3106-52d1-9717-18e8d491e3b3"
                          }
                      ]
                  }
              }
          },
          {
              "type": "shipments",
              "id": "d96343e971c91e3ecb098976d1e2cc9b",
              "attributes": {
                  "items": [
                      "139_24699831_eb160de1de89d9058fcb0b968dbbbd68"
                  ],
                  "requestedDeliveryDate": null,
                  "shippingAddress": {
                      "id": null,
                      "salutation": "Mr",
                      "firstName": "Spencor",
                      "lastName": "Hopkin",
                      "address1": "West road",
                      "address2": "212",
                      "address3": "",
                      "zipCode": "61000",
                      "city": "Berlin",
                      "country": null,
                      "iso2Code": "DE",
                      "company": "Spryker",
                      "phone": null,
                      "isDefaultBilling": true,
                      "isDefaultShipping": true,
                      "idCompanyBusinessUnitAddress": null
                  },
                  "selectedShipmentMethod": {
                      "id": 1,
                      "name": "Standard",
                      "carrierName": "Spryker Dummy Shipment",
                      "price": 490,
                      "taxRate": "19.00",
                      "deliveryTime": null,
                      "currencyIsoCode": "EUR"
                  }
              },
              "links": {
                  "self": "http://glue.de.spryker.local/shipments/d96343e971c91e3ecb098976d1e2cc9b"
              },
              "relationships": {
                  "shipment-methods": {
                      "data": [
                          {
                              "type": "shipment-methods",
                              "id": "1"
                          }
                      ]
                  }
              }
          }
      ]
  }
  ```
</details>
{% endinfo_block %}

**src/Pyz/Glue/CheckoutRestApi/CheckoutRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\CheckoutRestApi;

use Spryker\Glue\CheckoutRestApi\CheckoutRestApiDependencyProvider as SprykerCheckoutRestApiDependencyProvider;
use Spryker\Glue\ShipmentTypesRestApi\Plugin\CheckoutRestApi\SelectedShipmentTypesCheckoutDataResponseMapperPlugin;

class CheckoutRestApiDependencyProvider extends SprykerCheckoutRestApiDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\CheckoutRestApiExtension\Dependency\Plugin\CheckoutDataResponseMapperPluginInterface>
     */
    protected function getCheckoutDataResponseMapperPlugins(): array
    {
        return [
            new SelectedShipmentTypesCheckoutDataResponseMapperPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

- Make sure you have the `selectedShipmentTypes` field in the response when you send a request with a single-shipment request structure.

`POST https://glue-backend.mysprykershop.com/checkout-data`
<details>
  <summary>Request body example</summary>
  ```json
  {
      "data": {
          "type": "checkout-data",
          "attributes": {
              "customer": {
                  "salutation": "Mr",
                  "email": "spencor.hopkin@spryker.com",
                  "firstName": "Spencor",
                  "lastName": "Hopkin"
              },
              "idCart": "d60de64b-08c7-564d-8916-d7756f2dc865",
              "billingAddress": {
                  "salutation": "Mr",
                  "email": "spencor.hopkin@spryker.com",
                  "firstName": "Spencor",
                  "lastName": "Hopkin",
                  "address1": "West road",
                  "address2": "212",
                  "address3": "",
                  "zipCode": "61000",
                  "city": "Berlin",
                  "iso2Code": "DE",
                  "company": "Spryker",
                  "isDefaultShipping": true,
                  "isDefaultBilling": true
              },
              "shippingAddress": {
                  "salutation": "Mr",
                  "email": "spencor.hopkin@spryker.com",
                  "firstName": "Spencor",
                  "lastName": "Hopkin",
                  "address1": "West road",
                  "address2": "212",
                  "address3": "",
                  "zipCode": "61000",
                  "city": "Berlin",
                  "iso2Code": "DE",
                  "company": "Spryker",
                  "isDefaultShipping": true,
                  "isDefaultBilling": true
              },
              "payments": [
                  {
                      "paymentMethodName": "credit card",
                      "paymentProviderName": "DummyPayment"
                  }
              ],
              "shipment": {
                  "idShipmentMethod": 1
              }
          }
      }
  }
  ```
</details>

<details>
  <summary>Response body example</summary>
  ```json
  {
      "data": {
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
              "selectedPaymentMethods": [],
              "selectedServicePoints": [],
              "selectedShipmentTypes": [
                  {
                      "id": "9e1bd563-3106-52d1-9717-18e8d491e3b3",
                      "name": "Delivery",
                      "key": "delivery"
                  }
              ]
          },
          "links": {
              "self": "http://glue.de.spryker.local/checkout-data"
          }
      }
  }
  ```
</details>

{% endinfo_block %}

**src/Pyz/Zed/CheckoutRestApi/CheckoutRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CheckoutRestApi;

use Spryker\Zed\CheckoutRestApi\CheckoutRestApiDependencyProvider as SprykerCheckoutRestApiDependencyProvider;
use Spryker\Zed\ShipmentTypesRestApi\Communication\Plugin\CheckoutRestApi\ItemShipmentTypeQuoteMapperPlugin;
use Spryker\Zed\ShipmentTypesRestApi\Communication\Plugin\CheckoutRestApi\ShipmentTypeCheckoutDataValidatorPlugin;
use Spryker\Zed\ShipmentTypesRestApi\Communication\Plugin\CheckoutRestApi\ShipmentTypeReadCheckoutDataValidatorPlugin;

class CheckoutRestApiDependencyProvider extends SprykerCheckoutRestApiDependencyProvider
{
/**
     * @return array<\Spryker\Zed\CheckoutRestApiExtension\Dependency\Plugin\QuoteMapperPluginInterface>
     */
    protected function getQuoteMapperPlugins(): array
    {
        return [
            new ItemShipmentTypeQuoteMapperPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\CheckoutRestApiExtension\Dependency\Plugin\CheckoutDataValidatorPluginInterface>
     */
    protected function getCheckoutDataValidatorPlugins(): array
    {
        return [
            new ShipmentTypeCheckoutDataValidatorPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\CheckoutRestApiExtension\Dependency\Plugin\ReadCheckoutDataValidatorPluginInterface>
     */
    protected function getReadCheckoutDataValidatorPlugins(): array
    {
        return [
            new ShipmentTypeReadCheckoutDataValidatorPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Deactivate one of the shipment types and send a request with the corresponding shipment method:
`POST https://glue-backend.mysprykershop.com/checkout-data`
<details>
  <summary>Request body example</summary>
  ```json
    {
        "data": {
            "type": "checkout-data",
            "attributes": {
                "customer": {
                    "salutation": "Mr",
                    "email": "spencor.hopkin@spryker.com",
                    "firstName": "Spencor",
                    "lastName": "Hopkin"
                },
                "idCart": "d60de64b-08c7-564d-8916-d7756f2dc865",
                "payments": [
                    {
                        "paymentMethodName": "credit card",
                        "paymentProviderName": "DummyPayment"
                    }
                ],
                "shipments": [
                    {
                        "items": [
                            "139_24699831_c45147dee729311ef5b5c3003946c48f"
                        ],
                        "shippingAddress": {
                            "salutation": "Mr",
                            "email": "spencor.hopkin@spryker.com",
                            "firstName": "Spencor",
                            "lastName": "Hopkin",
                            "address1": "West road",
                            "address2": "212",
                            "address3": "",
                            "zipCode": "61000",
                            "city": "Berlin",
                            "iso2Code": "DE",
                            "company": "Spryker",
                            "isDefaultShipping": true,
                            "isDefaultBilling": true
                        },
                        "idShipmentMethod": 1,
                        "requestedDeliveryDate": null
                    }
                ]
            }
        }
    }
  ```
</details>

<details>
  <summary>Response body example</summary>
    ```json
    {
        "errors": [
            {
                "code": "1101",
                "status": 422,
                "detail": "Selected delivery type \"Delivery\" is not available."
            }
        ]
    }
    ```
</details>
{% endinfo_block %}

### 4) Set up database schema and transfer objects

1. Adjust the schema definition so entity changes trigger events.

<div class="width-100">

| AFFECTED ENTITY           | TRIGGERED EVENTS                                                                                                        |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------|
| spy_shipment_type         | Entity.spy_shipment_type.create<br>Entity.spy_shipment_type.update<br>Entity.spy_shipment_type.delete                   |
| spy_shipment_type_store   | Entity.spy_shipment_type_store.create<br>Entity.spy_shipment_type_store.update<br>Entity.spy_shipment_type_store.delete |
| spy_shipment_carrier      | Entity.spy_shipment_carrier.create<br>Entity.spy_shipment_carrier.update<br>Entity.spy_shipment_carrier.delete |
| spy_shipment_method       | Entity.spy_shipment_method.create<br>Entity.spy_shipment_method.update<br>Entity.spy_shipment_method.delete |
| spy_shipment_method_store | Entity.spy_shipment_method_store.create<br>Entity.spy_shipment_method_store.update<br>Entity.spy_shipment_method_store.delete |


</div>


**src/Pyz/Zed/ShipmentType/Persistence/Propel/Schema/spy_shipment_type.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" namespace="Orm\Zed\ShipmentType\Persistence" package="src.Orm.Zed.ShipmentType.Persistence" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd">

    <table name="spy_shipment_type" idMethod="native" allowPkInsert="true" identifierQuoting="true">
        <behavior name="event">
            <parameter name="spy_shipment_type_all" column="*"/>
        </behavior>
    </table>

    <table name="spy_shipment_type_store" idMethod="native" allowPkInsert="true">
        <behavior name="event">
            <parameter name="spy_shipment_type_store_all" column="*"/>
        </behavior>
    </table>

</database>
```

**src/Pyz/Zed/Shipment/Persistence/Propel/Schema/spy_shipment.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" namespace="Orm\Zed\Shipment\Persistence" package="src.Orm.Zed.Shipment.Persistence" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd">

    <table name="spy_shipment_carrier">
        <behavior name="event">
            <parameter name="spy_shipment_carrier_is_active" column="is_active"/>
        </behavior>
    </table>

    <table name="spy_shipment_method">
        <behavior name="event">
            <parameter name="spy_shipment_method_is_active" column="is_active"/>
            <parameter name="spy_shipment_method_fk_shipment_type" column="fk_shipment_type"/>
            <parameter name="spy_shipment_method_fk_shipment_carrier" column="fk_shipment_carrier"/>
        </behavior>
    </table>

    <table name="spy_shipment_method_store">
        <behavior name="event">
            <parameter name="spy_shipment_method_store_all" column="*"/>
        </behavior>
    </table>

</database>
```

2. Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied by checking your database:

| DATABASE ENTITY                      | TYPE   | EVENT   |
|--------------------------------------|--------|---------|
| spy_sales_shipment_type              | table  | created |
| spy_shipment_method_store            | table  | created |
| spy_shipment_type                    | table  | created |
| spy_shipment_type_storage            | table  | created |
| spy_shipment_type_store              | table  | created |
| spy_sales_shipment.fk_shipment_type  | column | created |
| spy_sales_shipment.uuid              | column | created |
| spy_shipment_carrier.uuid            | column | created |
| spy_shipment_method.fk_shipment_type | column | created |
| spy_shipment_method.uuid             | column | created |
| spy_shipment_method_price.uuid       | column | created |

Make sure the following changes have been applied in transfer objects:

| TRANSFER                                | TYPE     | EVENT   | PATH                                                                     |
|-----------------------------------------|----------|---------|--------------------------------------------------------------------------|
| ShipmentTransfer                        | class    | created | src/Generated/Shared/Transfer/ShipmentTransfer                           |
| StoreTransfer                           | class    | created | src/Generated/Shared/Transfer/StoreTransfer                              |
| DataImporterConfigurationTransfer       | class    | created | src/Generated/Shared/Transfer/DataImporterConfigurationTransfer          |
| DataImporterReaderConfigurationTransfer | class    | created | src/Generated/Shared/Transfer/DataImporterReaderConfigurationTransfer    |
| DataImporterReportTransfer              | class    | created | src/Generated/Shared/Transfer/DataImporterReportTransfer                 |
| DataImporterReportMessageTransfer       | class    | created | src/Generated/Shared/Transfer/DataImporterReportMessageTransfer          |
| TotalsTransfer                          | class    | created | src/Generated/Shared/Transfer/TotalsTransfer                             |
| SalesShipmentCriteria                   | class    | created | src/Generated/Shared/Transfer/SalesShipmentCriteriaTransfer              |
| SalesShipmentConditions                 | class    | created | src/Generated/Shared/Transfer/SalesShipmentConditionsTransfer            |
| SalesShipmentCollection                 | class    | created | src/Generated/Shared/Transfer/SalesShipmentCollectionTransfer            |
| ShipmentTypeCollectionTransfer          | class    | created | src/Generated/Shared/Transfer/ShipmentTypeCollectionTransfer             |
| ShipmentTypeTransfer                    | class    | created | src/Generated/Shared/Transfer/ShipmentTypeTransfer                       |
| ShipmentTypeCriteriaTransfer            | class    | created | src/Generated/Shared/Transfer/ShipmentTypeCriteriaTransfer               |
| ShipmentTypeConditionsTransfer          | class    | created | src/Generated/Shared/Transfer/ShipmentTypeConditionsTransfer             |
| ShipmentTypeStorageCollectionTransfer   | class    | created | src/Generated/Shared/Transfer/ShipmentTypeStorageCollectionTransfer      |
| ShipmentTypeStorageTransfer             | class    | created | src/Generated/Shared/Transfer/ShipmentTypeStorageTransfer                |
| ShipmentTypeStorageCriteriaTransfer     | class    | created | src/Generated/Shared/Transfer/ShipmentTypeStorageCriteriaTransfer        |
| ShipmentTypeStorageConditionsTransfer   | class    | created | src/Generated/Shared/Transfer/ShipmentTypeStorageConditionsTransfer      |
| ShipmentMethodCollectionTransfer        | class    | created | src/Generated/Shared/Transfer/ShipmentMethodCollectionTransfer           |
| SalesShipmentTypeTransfer               | class    | created | src/Generated/Shared/Transfer/SalesShipmentTypeTransfer                  |
| RestShipmentTypesAttributesTransfer     | class    | created | src/Generated/Shared/Transfer/RestShipmentTypesAttributesTransfer        |
| SalesShipmentResourceCollection         | class    | created | src/Generated/Shared/Transfer/SalesShipmentResourceCollectionTransfer    |
| SalesShipmentsBackendApiAttributes      | class    | created | src/Generated/Shared/Transfer/SalesShipmentsBackendApiAttributesTransfer |
| RestErrorMessageTransfer                | class    | created | src/Generated/Shared/Transfer/RestErrorMessageTransfer                   |
| ShipmentMethodTransfer.shipmentType     | property | created | src/Generated/Shared/Transfer/ShipmentMethodTransfer                     |
| ShipmentTransfer.shipmentTypeUuid       | property | created | src/Generated/Shared/Transfer/ShipmentTransfer                           |
| ItemTransfer.shipmentType               | property | created | src/Generated/Shared/Transfer/ItemTransfer                               |

{% endinfo_block %}

### 5) Add translations

1. Append glossary according to your configuration:

```csv
shipment_type.name.shipment_type_delivery,Delivery,en_US
shipment_type.name.shipment_type_delivery,Lieferung,de_DE
shipment_type.name.shipment_type_pickup,Pickup,en_US
shipment_type.name.shipment_type_pickup,Abholung,de_DE
shipment_type.validation.shipment_type_entity_not_found,A delivery type entity was not found.,en_US
shipment_type.validation.shipment_type_entity_not_found,Lieferart wurde nicht gefunden.,de_DE
shipment_type.validation.shipment_type_key_exists,A delivery type with the same key already exists.,en_US
shipment_type.validation.shipment_type_key_exists,Es existiert bereits eine Lieferart mit dem gleichen Schlüssel.,de_DE
shipment_type.validation.shipment_type_key_is_not_unique,At least two delivery types in this request have the same key.,en_US
shipment_type.validation.shipment_type_key_is_not_unique,Mindestens zwei Lieferarten in dieser Anfrage haben den gleichen Schlüssel.,de_DE
shipment_type.validation.shipment_type_key_invalid_length,A delivery type key must have a length from %min% to %max% characters.,en_US
shipment_type.validation.shipment_type_key_invalid_length,Der Lieferart-Schlüssel muss eine Länge von %min% bis %max% Zeichen haben.,de_DE
shipment_type.validation.shipment_type_name_invalid_length,A delivery type name must have a length from %min% to %max% characters.,en_US
shipment_type.validation.shipment_type_name_invalid_length,Der Lieferart-Name muss eine Länge von %min% bis %max% Zeichen haben.,de_DE
shipment_type.validation.store_does_not_exist,A store with the name ‘%name%’ does not exist.,en_US
shipment_type.validation.store_does_not_exist,Store mit dem Namen ‘%name%’ existiert nicht.,de_DE
shipment_types_rest_api.error.shipment_type_not_available,Selected delivery type "%name%" is not available.,en_US
shipment_types_rest_api.error.shipment_type_not_available,Die ausgewählte Lieferart "%name%" ist nicht verfügbar.,de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the `spy_glossary_key` and `spy_glossary_translation` tables.

{% endinfo_block %}

### 6) Configure export to Redis

Configure tables to be published to `spy_shipment_type_storage` and synchronized to the Storage on create, edit, and delete changes:

1. In `src/Pyz/Client/RabbitMq/RabbitMqConfig.php`, adjust the `RabbitMq` module configuration:

**src/Pyz/Client/RabbitMq/RabbitMqConfig.php**

```php
<?php

namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
use Spryker\Shared\ShipmentTypeStorage\ShipmentTypeStorageConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     * @return array<mixed>
     */
    protected function getSynchronizationQueueConfiguration(): array
    {
        return [
            ShipmentTypeStorageConfig::QUEUE_NAME_SYNC_STORAGE_SHIPMENT_TYPE,
        ];
    }
}
```

2. Register the queue message processor:

**src/Pyz/Zed/Queue/QueueDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Queue;

use Spryker\Shared\ShipmentTypeStorage\ShipmentTypeStorageConfig;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;
use Spryker\Zed\Synchronization\Communication\Plugin\Queue\SynchronizationStorageQueueMessageProcessorPlugin;

class QueueDependencyProvider extends SprykerDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface>
     */
    protected function getProcessorMessagePlugins(Container $container): array
    {
        return [
            ShipmentTypeStorageConfig::QUEUE_NAME_SYNC_STORAGE_SHIPMENT_TYPE => new SynchronizationStorageQueueMessageProcessorPlugin(),
        ];
    }
}

```

3. Configure the synchronization pool and event queue name:

**src/Pyz/Zed/ShipmentTypeStorage/ShipmentTypeStorageConfig.php**

```php
<?php

namespace Pyz\Zed\ShipmentTypeStorage;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Zed\ShipmentTypeStorage\ShipmentTypeStorageConfig as SprykerShipmentTypeStorageConfig;

class ShipmentTypeStorageConfig extends SprykerShipmentTypeStorageConfig
{
    /**
     * @return string|null
     */
    public function getShipmentTypeStorageSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }
}
```

4. Set up publisher plugins:

| PLUGIN                                                 | SPECIFICATION                                                                                   | PREREQUISITES | NAMESPACE                                                                          |
|--------------------------------------------------------|-------------------------------------------------------------------------------------------------|---------------|------------------------------------------------------------------------------------|
| ShipmentTypeWriterPublisherPlugin                      | Publishes shipment type data by `SpyShipmentType` entity events.                                |               | Spryker\Zed\ShipmentTypeStorage\Communication\Plugin\Publisher\ShipmentType        |
| ShipmentTypeStoreWriterPublisherPlugin                 | Publishes shipment type data by `SpyShipmentTypeStore` events.                                  |               | Spryker\Zed\ShipmentTypeStorage\Communication\Plugin\Publisher\ShipmentTypeStore   |
| ShipmentCarrierShipmentTypeWriterPublisherPlugin       | Publishes shipment type data by `SpyShipmentCarrier` entity events.                             |               | Spryker\Zed\ShipmentTypeStorage\Communication\Plugin\Publisher\ShipmentCarrier     |
| ShipmentMethodPublishShipmentTypeWriterPublisherPlugin | Publishes shipment type data by `ShipmentMethod` publish events.                                |               | Spryker\Zed\ShipmentTypeStorage\Communication\Plugin\Publisher\ShipmentMethod      |
| ShipmentMethodShipmentTypeWriterPublisherPlugin        | Publishes shipment type data by `SpyShipmentMethod` entity events.                              |               | Spryker\Zed\ShipmentTypeStorage\Communication\Plugin\Publisher\ShipmentMethod      |
| ShipmentMethodStoreShipmentTypeWriterPublisherPlugin   | Publishes shipment type data by `SpyShipmentMethodStore` entity events.                         |               | Spryker\Zed\ShipmentTypeStorage\Communication\Plugin\Publisher\ShipmentMethodStore |
| ShipmentTypePublisherTriggerPlugin                     | Enables populating the shipment type storage table with data and triggering the export to Redis. |               | Spryker\Zed\ShipmentTypeStorage\Communication\Plugin\Publisher                     |

<details><summary>src/Pyz/Zed/Publisher/PublisherDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;
use Spryker\Zed\ShipmentTypeStorage\Communication\Plugin\Publisher\ShipmentCarrier\ShipmentCarrierShipmentTypeWriterPublisherPlugin;
use Spryker\Zed\ShipmentTypeStorage\Communication\Plugin\Publisher\ShipmentMethod\ShipmentMethodPublishShipmentTypeWriterPublisherPlugin;
use Spryker\Zed\ShipmentTypeStorage\Communication\Plugin\Publisher\ShipmentMethod\ShipmentMethodShipmentTypeWriterPublisherPlugin;
use Spryker\Zed\ShipmentTypeStorage\Communication\Plugin\Publisher\ShipmentMethodStore\ShipmentMethodStoreShipmentTypeWriterPublisherPlugin;
use Spryker\Zed\ShipmentTypeStorage\Communication\Plugin\Publisher\ShipmentType\ShipmentTypeWriterPublisherPlugin;
use Spryker\Zed\ShipmentTypeStorage\Communication\Plugin\Publisher\ShipmentTypePublisherTriggerPlugin;
use Spryker\Zed\ShipmentTypeStorage\Communication\Plugin\Publisher\ShipmentTypeStore\ShipmentTypeStoreWriterPublisherPlugin;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array<int|string, \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>|array<string, array<int|string, \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>>
     */
    protected function getPublisherPlugins(): array
    {
        return array_merge(
            $this->getShipmentTypeStoragePlugins(),
        );
    }

    /**
     * @return list<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface>
     */
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            new ShipmentTypePublisherTriggerPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getShipmentTypeStoragePlugins(): array
    {
        return [
            new ShipmentTypeWriterPublisherPlugin(),
            new ShipmentTypeStoreWriterPublisherPlugin(),
            new ShipmentCarrierShipmentTypeWriterPublisherPlugin(),
            new ShipmentMethodPublishShipmentTypeWriterPublisherPlugin(),
            new ShipmentMethodShipmentTypeWriterPublisherPlugin(),
            new ShipmentMethodStoreShipmentTypeWriterPublisherPlugin(),
        ];
    }
}
```

</details>

5. Set up synchronization plugins:

| PLUGIN                                              | SPECIFICATION                                                            | PREREQUISITES | NAMESPACE                                                            |
|-----------------------------------------------------|--------------------------------------------------------------------------|---------------|----------------------------------------------------------------------|
| ShipmentTypeSynchronizationDataBulkRepositoryPlugin | Enables synchronizing the shipment type storage table's content into Redis. |               | Spryker\Zed\ShipmentTypeStorage\Communication\Plugin\Synchronization |

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\ShipmentTypeStorage\Communication\Plugin\Synchronization\ShipmentTypeSynchronizationDataBulkRepositoryPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface>
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new ShipmentTypeSynchronizationDataBulkRepositoryPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the `shipment-type` trigger plugin works correctly:

1. Fill the `spy_shipment_type` and `spy_shipment_type_store` tables with data.
2. Run the `console publish:trigger-events -r shipment_type` command.
3. Make sure that the `spy_shipment_type_storage` table has been filled with respective data.
4. Make sure that, in your system, storage entries are displayed with the `kv:shipment_type:{store}:{shipment_type_id}` mask.

Make sure that `shipment-type` synchronization plugin works correctly:

1. Fill the `spy_shipment_type_storage` table with some data.
2. Run the `console sync:data -r shipment_type` command.
3. Make sure that, in your system, storage entries are displayed with the `kv:shipment_type:{store}:{shipment_type_id}` mask.

Make sure that when a shipment type is created or edited through BAPI, it's exported to Redis accordingly.

In Redis, make sure data is represented in the following format:

```json
{
    "id_shipment_type": 1,
    "uuid": "174d9dc0-55ae-5c4b-a2f2-a419027029ef",
    "name": "Pickup",
    "key": "pickup",
    "_timestamp": 1684933897.870368
}
```

{% endinfo_block %}

### 7) Import shipment methods

{% info_block infoBox "Info" %}

The following imported entities are used as shipment methods in Spryker OS.

{% endinfo_block %}

1. Prepare your data according to your requirements using our demo data:

**vendor/spryker/spryker/Bundles/ShipmentDataImport/data/import/shipment.csv**

```yaml
shipment_method_key,name,carrier,taxSetName
spryker_dummy_shipment-standard,Standard,Spryker Dummy Shipment,Shipment Taxes
spryker_dummy_shipment-express,Express,Spryker Dummy Shipment,Shipment Taxes
spryker_drone_shipment-air_standard,Air Standard,Spryker Drone Shipment,Shipment Taxes
spryker_drone_shipment-air_sonic,Air Sonic,Spryker Drone Shipment,Shipment Taxes
spryker_drone_shipment-air_light,Air Light,Spryker Drone Shipment,Shipment Taxes
spryker_no_shipment,NoShipment,NoShipment,Tax Exempt
free_pickup,Free Pickup,pickup,Tax Exempt
```

| COLUMN              | REQUIRED | DATA TYPE | DATA EXAMPLE                    | DATA EXPLANATION              |
|---------------------|-----------|-----------|---------------------------------|-------------------------------|
| shipment_method_key | ✓ | string    | spryker_dummy_shipment-standard | Shipment method key.   |
| name                | ✓ | string    | Standard                        | Shipment method name.  |
| carrier             | ✓ | string    | Spryker Dummy Shipment          | Shipment carrier name. |
| taxSetName          | ✓ | string    | Shipment Taxes                  | Tax set name.                 |

**vendor/spryker/spryker/Bundles/ShipmentDataImport/data/import/shipment_method_store.csv**

```yaml
shipment_method_key,store
spryker_dummy_shipment-standard,AT
spryker_dummy_shipment-standard,DE
spryker_dummy_shipment-standard,US
spryker_dummy_shipment-express,AT
spryker_dummy_shipment-express,DE
spryker_dummy_shipment-express,US
spryker_drone_shipment-air_standard,AT
spryker_drone_shipment-air_standard,DE
spryker_drone_shipment-air_standard,US
spryker_drone_shipment-air_sonic,AT
spryker_drone_shipment-air_sonic,DE
spryker_drone_shipment-air_sonic,US
spryker_drone_shipment-air_light,AT
spryker_drone_shipment-air_light,DE
spryker_drone_shipment-air_light,US
spryker_no_shipment,AT
spryker_no_shipment,DE
spryker_no_shipment,US
```

| COLUMN              | REQUIRED | DATA TYPE | DATA EXAMPLE                    | DATA EXPLANATION                    |
|---------------------|-----------|-----------|---------------------------------|-------------------------------------|
| shipment_method_key | ✓ | string    | spryker_dummy_shipment-standard | Existing shipping method key. |
| store               | ✓ | string    | DE                              | Existing store name.          |

**vendor/spryker/spryker/Bundles/ShipmentDataImport/data/import/shipment_price.csv**

```yaml
shipment_method_key,store,currency,value_net,value_gross
spryker_dummy_shipment-standard,AT,EUR,290,390
spryker_dummy_shipment-express,AT,EUR,390,490
spryker_drone_shipment-air_standard,AT,EUR,350,400
spryker_drone_shipment-air_sonic,AT,EUR,700,900
spryker_drone_shipment-air_light,AT,EUR,1100,1200
spryker_dummy_shipment-standard,AT,CHF,350,460
spryker_dummy_shipment-express,AT,CHF,460,580
spryker_drone_shipment-air_standard,AT,CHF,420,480
spryker_drone_shipment-air_sonic,AT,CHF,720,1100
spryker_drone_shipment-air_light,AT,CHF,1300,1600
spryker_no_shipment,AT,EUR,0,0
spryker_no_shipment,AT,CHF,0,0
free_pickup,AT,EUR,,0
free_pickup,AT,CHF,,0
spryker_dummy_shipment-standard,DE,EUR,390,490
spryker_dummy_shipment-express,DE,EUR,490,590
spryker_drone_shipment-air_standard,DE,EUR,450,500
spryker_drone_shipment-air_sonic,DE,EUR,800,1000
spryker_drone_shipment-air_light,DE,EUR,1200,1500
spryker_dummy_shipment-standard,DE,CHF,450,560
spryker_dummy_shipment-express,DE,CHF,560,680
spryker_drone_shipment-air_standard,DE,CHF,520,580
spryker_drone_shipment-air_sonic,DE,CHF,920,1200
spryker_drone_shipment-air_light,DE,CHF,1400,1700
spryker_no_shipment,DE,EUR,0,0
spryker_no_shipment,DE,CHF,0,0
free_pickup,DE,EUR,,0
free_pickup,DE,CHF,,0
spryker_dummy_shipment-standard,US,EUR,390,490
spryker_dummy_shipment-express,US,EUR,490,590
spryker_drone_shipment-air_standard,US,EUR,450,500
spryker_drone_shipment-air_sonic,US,EUR,800,1000
spryker_drone_shipment-air_light,US,EUR,1200,1500
spryker_dummy_shipment-standard,US,CHF,450,560
spryker_dummy_shipment-express,US,CHF,560,680
spryker_drone_shipment-air_standard,US,CHF,520,580
spryker_drone_shipment-air_sonic,US,CHF,920,1200
spryker_drone_shipment-air_light,US,CHF,1400,1700
spryker_no_shipment,US,EUR,0,0
spryker_no_shipment,US,CHF,0,0
```

| COLUMN              | REQUIRED | DATA TYPE | DATA EXAMPLE                    | DATA EXPLANATION                    |
|---------------------|-----------|-----------|---------------------------------|-------------------------------------|
| shipment_method_key | ✓ | string    | spryker_dummy_shipment-standard | Existing shipping method key. |
| store               | ✓ | string    | DE                              | Existing store name.          |
| currency            | ✓ | string    | EUR                             | Existing currency name.       |
| value_net           | optional  | integer   | 390                             | Net price, in coins.                 |
| value_gross         | optional  | integer   | 490                             | Gross price, in coins.               |

**vendor/spryker/spryker/Bundles/ShipmentTypeDataImport/data/import/shipment_type.csv**

```yaml
key,name,is_active
pickup,Pickup,1
delivery,Delivery,1
```

| COLUMN    | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION             |
|-----------|-----------|-----------|--------------|------------------------------|
| key       | ✓ | string    | pickup       | Key for the shipment type.   |
| name      | ✓ | string    | Pickup       | Name for the shipment type.  |
| is_active | ✓ | string    | 1            | Status of the shipment type. |

**vendor/spryker/spryker/Bundles/ShipmentTypeDataImport/data/import/shipment_type_store.csv**

```yaml
shipment_type_key,store_name
pickup,AT
delivery,AT
pickup,DE
delivery,DE
pickup,US
delivery,US
```

| COLUMN            | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION                  |
|-------------------|-----------|-----------|--------------|-----------------------------------|
| shipment_type_key | ✓ | string    | pickup       | Key of an existing shipping type. |
| store_name        | ✓ | string    | DE           | Name of an existing store.        |

**vendor/spryker/spryker/Bundles/ShipmentTypeDataImport/data/import/shipment_method_shipment_type.csv**

```yaml
shipment_method_key,shipment_type_key
spryker_dummy_shipment-standard,delivery
spryker_dummy_shipment-express,delivery
spryker_drone_shipment-air_standard,delivery
spryker_drone_shipment-air_sonic,delivery
spryker_drone_shipment-air_light,delivery
spryker_no_shipment,delivery
free_pickup,pickup
```

| COLUMN              | REQUIRED | DATA TYPE | DATA EXAMPLE                    | DATA EXPLANATION                    |
|---------------------|-----------|-----------|---------------------------------|-------------------------------------|
| shipment_method_key | ✓ | string    | spryker_dummy_shipment-standard | Key of an existing shipping method. |
| shipment_type_key   | ✓ | string    | delivery                        | Key of an existing shipping type.   |

1. Register the following data import plugins:

| PLUGIN                                     | SPECIFICATION                                                             | PREREQUISITES | NAMESPACE                                                           |
|--------------------------------------------|---------------------------------------------------------------------------|---------------|---------------------------------------------------------------------|
| ShipmentDataImportPlugin                   | Imports shipment method data into the database.                           | None          | \Spryker\Zed\ShipmentDataImport\Communication\Plugin                |
| ShipmentMethodPriceDataImportPlugin        | Imports shipment method price data into the database.                     | None          | \Spryker\Zed\ShipmentDataImport\Communication\Plugin                |
| ShipmentMethodStoreDataImportPlugin        | Imports shipment method store data into the database.                     | None          | \Spryker\Zed\ShipmentDataImport\Communication\Plugin                |
| ShipmentTypeDataImportPlugin               | Imports shipment types data from the specified file.                      | None          | \Spryker\Zed\ShipmentTypeDataImport\Communication\Plugin\DataImport |
| ShipmentTypeStoreDataImportPlugin          | Imports shipment type stores data from the specified file.                | None          | \Spryker\Zed\ShipmentTypeDataImport\Communication\Plugin\DataImport |
| ShipmentMethodShipmentTypeDataImportPlugin | Imports shipment types for shipment methods data from the specified file. | None          | \Spryker\Zed\ShipmentTypeDataImport\Communication\Plugin\DataImport |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ShipmentDataImport\Communication\Plugin\ShipmentDataImportPlugin;
use Spryker\Zed\ShipmentDataImport\Communication\Plugin\ShipmentMethodPriceDataImportPlugin;
use Spryker\Zed\ShipmentDataImport\Communication\Plugin\ShipmentMethodStoreDataImportPlugin;
use Spryker\Zed\ShipmentTypeDataImport\Communication\Plugin\DataImport\ShipmentMethodShipmentTypeDataImportPlugin;
use Spryker\Zed\ShipmentTypeDataImport\Communication\Plugin\DataImport\ShipmentTypeDataImportPlugin;
use Spryker\Zed\ShipmentTypeDataImport\Communication\Plugin\DataImport\ShipmentTypeStoreDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return array
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new ShipmentDataImportPlugin(),
            new ShipmentMethodPriceDataImportPlugin(),
            new ShipmentMethodStoreDataImportPlugin(),
            new ShipmentTypeDataImportPlugin(),
            new ShipmentTypeStoreDataImportPlugin(),
            new ShipmentMethodShipmentTypeDataImportPlugin(),

        ];
    }
}
```

2. Enable the behaviors by registering the console commands:

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
use Spryker\Zed\ShipmentDataImport\ShipmentDataImportConfig;
use Spryker\Zed\ShipmentTypeDataImport\ShipmentTypeDataImportConfig;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Symfony\Component\Console\Command\Command[]
     */
    protected function getConsoleCommands(Container $container)
    {
        $commands = [
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . ':' . ShipmentDataImportConfig::IMPORT_TYPE_SHIPMENT),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . ':' . ShipmentDataImportConfig::IMPORT_TYPE_SHIPMENT_PRICE),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . ':' . ShipmentDataImportConfig::IMPORT_TYPE_SHIPMENT_METHOD_STORE),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . ':' . ShipmentTypeDataImportConfig::IMPORT_TYPE_SHIPMENT_TYPE),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . ':' . ShipmentTypeDataImportConfig::IMPORT_TYPE_SHIPMENT_TYPE_STORE),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . ':' . ShipmentTypeDataImportConfig::IMPORT_TYPE_SHIPMENT_METHOD_SHIPMENT_TYPE),
        ];

        return $commands;
    }
}
```

3. Import data:

```bash
console data:import shipment
console data:import shipment-price
console data:import shipment-method-store
console data:import shipment-type
console data:import shipment-type-store
console data:import shipment-method-shipment-type
```

{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the `spy_shipment_method`, `spy_shipment_method_price`,
`spy_shipment_method_store`, `spy_shipment_type`, and `spy_shipment_type_store` tables in the database.

{% endinfo_block %}

### 8) Set up behavior

1. Configure the data import to use your data on the project level:

**src/Pyz/Zed/ShipmentDataImport/ShipmentDataImportConfig**

```php
<?php

namespace Pyz\Zed\ShipmentDataImport;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Spryker\Zed\ShipmentDataImport\ShipmentDataImportConfig as SprykerShipmentDataImportConfig;

class ShipmentDataImportConfig extends SprykerShipmentDataImportConfig
{
    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getShipmentDataImporterConfiguration(): DataImporterConfigurationTransfer
    {
        return $this->buildImporterConfiguration('shipment.csv', static::IMPORT_TYPE_SHIPMENT);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getShipmentMethodPriceDataImporterConfiguration(): DataImporterConfigurationTransfer
    {
        return $this->buildImporterConfiguration('shipment_price.csv', static::IMPORT_TYPE_SHIPMENT_PRICE);
    }
}
```

**src/Pyz/Zed/ShipmentTypeDataImport/ShipmentTypeDataImportConfig**

```php
<?php

namespace Pyz\Zed\ShipmentTypeDataImport;

use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Spryker\Zed\ShipmentTypeDataImport\ShipmentTypeDataImportConfig as SprykerShipmentTypeDataImportConfig;

class ShipmentTypeDataImportConfig extends SprykerShipmentTypeDataImportConfig
{
    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getShipmentTypeDataImporterConfiguration(): DataImporterConfigurationTransfer
    {
        return $this->buildImporterConfiguration('shipment_type.csv', static::IMPORT_TYPE_SHIPMENT_TYPE);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getShipmentTypeStoreDataImporterConfiguration(): DataImporterConfigurationTransfer
    {
        return $this->buildImporterConfiguration('shipment_type_store.csv', static::IMPORT_TYPE_SHIPMENT_TYPE_STORE);
    }

    /**
     * @return \Generated\Shared\Transfer\DataImporterConfigurationTransfer
     */
    public function getShipmentMethodShipmentTypeDataImporterConfiguration(): DataImporterConfigurationTransfer
    {
        return $this->buildImporterConfiguration('shipment_method_shipment_type.csv', static::IMPORT_TYPE_SHIPMENT_METHOD_SHIPMENT_TYPE);
    }
}
```

2. Configure shipment GUI module with money and store plugins:

| PLUGIN                            | SPECIFICATION                                                                                              | PREREQUISITES | NAMESPACE                                             |
|-----------------------------------|------------------------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------|
| MoneyCollectionFormTypePlugin     | Represents the money collection fields based on stores, currencies, and price types defined in the system. | None          | Spryker\Zed\MoneyGui\Communication\Plugin\Form        |
| StoreRelationToggleFormTypePlugin | Represents a store relation toggle form based on stores registered in the system.                          | None          | Spryker\Zed\Store\Communication\Plugin\Form           |
| ShipmentTotalCalculatorPlugin     | Calculates shipment total using expenses.                                                                  | None          | Spryker\Zed\Shipment\Communication\Plugin\Calculation |

**src/Pyz/Zed/ShipmentGui/ShipmentGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ShipmentGui;

use Spryker\Zed\Kernel\Communication\Form\FormTypeInterface;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\MoneyGui\Communication\Plugin\Form\MoneyCollectionFormTypePlugin;
use Spryker\Zed\ShipmentGui\ShipmentGuiDependencyProvider as SprykerShipmentGuiDependencyProvider;
use Spryker\Zed\Store\Communication\Plugin\Form\StoreRelationToggleFormTypePlugin;

class ShipmentGuiDependencyProvider extends SprykerShipmentGuiDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Communication\Form\FormTypeInterface
     */
    protected function getMoneyCollectionFormTypePlugin(Container $container): FormTypeInterface
    {
        return new MoneyCollectionFormTypePlugin();
    }

    /**
     * @return \Spryker\Zed\Kernel\Communication\Form\FormTypeInterface
     */
    protected function getStoreRelationFormTypePlugin(): FormTypeInterface
    {
        return new StoreRelationToggleFormTypePlugin();
    }
}
```

{% info_block warningBox "Verification" %}

Make sure you can complete the following actions in the Back Office:

1. Navigate to **Administration&nbsp;<span aria-label="and then">></span> Shipments&nbsp;<span aria-label="and then">></span> Delivery Methods**. The **Delivery Methods** page opens.
2. Check that, in the **DELIVERY METHODS** table, the list of shipment methods is displayed.
3. Check that, for any shipment method of your choice, in the **Actions** column, you can click **View**, **Edit**, and **Delete** to complete a respective action.

{% endinfo_block %}

**src/Pyz/Zed/Calculation/CalculationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Calculation;

use Spryker\Zed\Calculation\CalculationDependencyProvider as SprykerCalculationDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Shipment\Communication\Plugin\Calculation\ShipmentTotalCalculatorPlugin;

class CalculationDependencyProvider extends SprykerCalculationDependencyProvider
{
    protected function getQuoteCalculatorPluginStack(Container $container)
    {
        return [
            new ShipmentTotalCalculatorPlugin(),
        ];
    }
}
```

3. Configure the sales order item shipment expander plugins:

| PLUGIN                          | SPECIFICATION                                | PREREQUISITES | NAMESPACE                                                                       |
|---------------------------------|----------------------------------------------|---------------|---------------------------------------------------------------------------------|
| ShipmentOrderItemExpanderPlugin | Expands the sales order items with shipment. |               | Spryker\Zed\Shipment\Communication\Plugin\Sales\ShipmentOrderItemExpanderPlugin |


**src/Pyz/Zed/Sales/SalesDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;
use Spryker\Zed\Shipment\Communication\Plugin\Sales\ShipmentOrderItemExpanderPlugin;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{

 /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemExpanderPluginInterface>
     */
    protected function getOrderItemExpanderPlugins(): array
    {
        return [
            new ShipmentOrderItemExpanderPlugin(),
        ];
    }
}
```

4. Configure the shipment type expander plugins:

| PLUGIN                                             | SPECIFICATION                                                                                                               | PREREQUISITES | NAMESPACE                                               |
|----------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|---------------|---------------------------------------------------------|
| ShipmentTypeItemExpanderPlugin                     | Expands `CartChange.items.shipment` transfer with `shipmentTypeUuid` taken from `CartChange.items.shipmentType.uuid`.       |               | Spryker\Zed\ShipmentTypeCart\Communication\Plugin\Cart  |
| ShipmentTypeQuoteExpanderPlugin                    | Expands `QuoteTransfer.items.shipment` transfer with `shipmentTypeUuid` taken from `QuoteTransfer.items.shipmentType.uuid`. |               | Spryker\Zed\ShipmentTypeCart\Communication\Plugin\Quote |
| ShipmentTypeShipmentMethodCollectionExpanderPlugin | Expands `ShipmentMethodCollectionTransfer.shipmentMethod` with shipment type.                                               |               | Spryker\Zed\ShipmentType\Communication\Plugin\Shipment  |

**src/Pyz/Zed/Cart/CartDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\ShipmentTypeCart\Communication\Plugin\Cart\ShipmentTypeItemExpanderPlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Spryker\Zed\CartExtension\Dependency\Plugin\ItemExpanderPluginInterface>
     */
    protected function getExpanderPlugins(Container $container): array
    {
        return [
            new ShipmentTypeItemExpanderPlugin(),
        ];
    }
}

```

**src/Pyz/Zed/Quote/QuoteDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Quote;

use Spryker\Zed\Quote\QuoteDependencyProvider as SprykerQuoteDependencyProvider;
use Spryker\Zed\ShipmentTypeCart\Communication\Plugin\Quote\ShipmentTypeQuoteExpanderPlugin;

class QuoteDependencyProvider extends SprykerQuoteDependencyProvider
{

    /**
     * @return list<\Spryker\Zed\QuoteExtension\Dependency\Plugin\QuoteExpanderPluginInterface>
     */
    protected function getQuoteExpanderPlugins(): array
    {
        return [
            new ShipmentTypeQuoteExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Shipment/ShipmentDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Shipment;

use Spryker\Zed\Shipment\ShipmentDependencyProvider as SprykerShipmentDependencyProvider;
use Spryker\Zed\ShipmentType\Communication\Plugin\Shipment\ShipmentTypeShipmentMethodCollectionExpanderPlugin;

class ShipmentDependencyProvider extends SprykerShipmentDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\ShipmentExtension\Dependency\Plugin\ShipmentMethodCollectionExpanderPluginInterface>
     */
    protected function getShipmentMethodCollectionExpanderPlugins(): array
    {
        return [
            new ShipmentTypeShipmentMethodCollectionExpanderPlugin(),
        ];
    }
}
```

5. Configure shipment type filter plugins:

| PLUGIN                                             | SPECIFICATION | PREREQUISITES | NAMESPACE |
|----------------------------------------------------|---------------|---------------|-----------|
| ShipmentTypeShipmentMethodFilterPlugin             |               |               |           |

**src/Pyz/Zed/Shipment/ShipmentDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Shipment;

use Spryker\Zed\Shipment\ShipmentDependencyProvider as SprykerShipmentDependencyProvider;
use Spryker\Zed\ShipmentType\Communication\Plugin\Shipment\ShipmentTypeShipmentMethodFilterPlugin;

class ShipmentDependencyProvider extends SprykerShipmentDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Spryker\Zed\ShipmentExtension\Dependency\Plugin\ShipmentMethodFilterPluginInterface>
     */
    protected function getMethodFilterPlugins(Container $container): array
    {
        return [
            new ShipmentTypeShipmentMethodFilterPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that during checkout on the Shipment step, you can only see shipment methods that have relation to active shipment types related to the current store or shipment methods without shipment type relation:

1. In the `spy_shipment_type` DB table, set `isActive = 0` to deactivate one of the shipment types.
2. Set its ID as `fk_shipment_type` in `spy_shipment_method_table`.
3. In the Storefront, add an item to the cart, do a checkout, and proceed to the Shipment step.
4. Check that there's no shipment method related to inactive shipment type in the shipment form.

{% endinfo_block %}

6. Configure shipment type order saver plugins:

| PLUGIN                                | SPECIFICATION                                                                                                            | PREREQUISITES                                                       | NAMESPACE                                                   |
|---------------------------------------|--------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|-------------------------------------------------------------|
| ShipmentTypeCheckoutDoSaveOrderPlugin | Persists shipment type data to the `spy_sales_shipment_type` table and updates `spy_sales_shipment` with `fk_shipment_type`. | Should be executed after the `SalesOrderShipmentSavePlugin` plugin. | Spryker\Zed\SalesShipmentType\Communication\Plugin\Checkout |


**src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Checkout;

use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\SalesShipmentType\Communication\Plugin\Checkout\ShipmentTypeCheckoutDoSaveOrderPlugin;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Spryker\Zed\Checkout\Dependency\Plugin\CheckoutSaveOrderInterface>|list<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutDoSaveOrderInterface>
     */
    protected function getCheckoutOrderSavers(Container $container): array
    {
        return [
            new ShipmentTypeCheckoutDoSaveOrderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that when you place an order, the selected shipment type is persisted to `spy_sales_shipment_type` and `spy_sales_shipment.fk_sales_shipment_type` is updated.

{% endinfo_block %}

7. To enable the Backend API, register these plugins:

| PLUGIN                                                        | SPECIFICATION                                                                         | PREREQUISITES | NAMESPACE                                                                                       |
|---------------------------------------------------------------|---------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------------------------------------|
| ShipmentTypesBackendResourcePlugin                            | Registers the `shipment-types` resource.                                              |               | Spryker\Glue\ShipmentTypesBackendApi\Plugin\GlueBackendApiApplication                           |
| SalesShipmentsByPickingListsBackendResourceRelationshipPlugin | Adds `sales-shipments` resources as a relationship to `picking-list-items` resources. |               | Spryker\Glue\ShipmentsBackendApi\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector |

**src/Pyz/Glue/GlueBackendApiApplication/GlueBackendApiApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplication;

use Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider as SprykerGlueBackendApiApplicationDependencyProvider;
use Spryker\Glue\ShipmentTypesBackendApi\Plugin\GlueBackendApiApplication\ShipmentTypesBackendResourcePlugin;

class GlueBackendApiApplicationDependencyProvider extends SprykerGlueBackendApiApplicationDependencyProvider
{
    /**
     * @return list<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceInterface>
     */
    protected function getResourcePlugins(): array
    {
        return [
            new ShipmentTypesBackendResourcePlugin(),
        ];
    }
}
```

**src/Pyz/Glue/GlueBackendApiApplicationGlueJsonApiConventionConnector/GlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplicationGlueJsonApiConventionConnector;

use Spryker\Glue\GlueBackendApiApplicationGlueJsonApiConventionConnector\GlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider as SprykerGlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider;
use Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\PickingListsBackendApi\PickingListsBackendApiConfig;
use Spryker\Glue\ShipmentsBackendApi\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector\SalesShipmentsByPickingListsBackendResourceRelationshipPlugin;

class GlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider extends SprykerGlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider
{
    /**
     * @param \Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
     *
     * @return \Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
     */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection,
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            PickingListsBackendApiConfig::RESOURCE_PICKING_LIST_ITEMS,
            new SalesShipmentsByPickingListsBackendResourceRelationshipPlugin(),
        );

        return $resourceRelationshipCollection;
    }
}
```

{% info_block warningBox "Verification" %}

1. Make sure that you can send the following requests:

- `GET https://glue-backend.mysprykershop.com/shipment-types`
- `GET https://glue-backend.mysprykershop.com/shipment-types/{% raw %}{{{% endraw %}shipment-types-uuid{% raw %}}{{% endraw %}`
- `POST https://glue-backend.mysprykershop.com/shipment-types`

    ```json
    {
        "data": {
            "type": "shipment-types",
            "attributes": {
                "name": "Some Shipment Type",
                "key": "some-shipment-type",
                "isActive": true,
                "stores": ["DE", "AT"]
            }
        }
    }
    ```

- `PATCH https://glue-backend.mysprykershop.com/shipment-types/{% raw %}{{{% endraw %}shipment-types{% raw %}}{{% endraw %}`

    ```json
    {
        "data": {
            "type": "shipment-types",
            "attributes": {
                "isActive": false
            }
        }
    }
    ```

2. Make sure you have a `sales-shipments` resource as a relationship to `picking-list-items` when you do a request.

`GET https://glue-backend.mysprykershop.com/picking-lists/{% raw %}{{{% endraw %}picking-list-uuid{% raw %}}{{% endraw %}?include=picking-list-items,sales-shipments`
<details>
  <summary>Response body example</summary>
```json
{
    "data": {
        "id": "14baa0f3-e6e7-5aa8-bc6c-c02ec39ca77b",
        "type": "picking-lists",
        "attributes": {
            "status": "picking-finished",
            "createdAt": "2023-03-23 15:47:07.000000",
            "updatedAt": "2023-03-30 12:47:45.000000"
        },
        "relationships": {
            "picking-list-items": {
                "data": [
                    {
                        "id": "65bb3aec-0a45-5ec6-9b12-bbca6551d87f",
                        "type": "picking-list-items"
                    }
                ]
            }
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/picking-lists/14baa0f3-e6e7-5aa8-bc6c-c02ec39ca77b?include=picking-list-items,sales-shipments"
        }
    },
    "included": [
        {
            "id": "84935e86-ef86-507f-9c23-54942486d8cb",
            "type": "sales-shipments",
            "attributes": {
                "requestedDeliveryDate": "2023-04-20"
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/sales-shipments/84935e86-ef86-507f-9c23-54942486d8cb?include=picking-list-items,sales-shipments"
            }
        },
        {
            "id": "65bb3aec-0a45-5ec6-9b12-bbca6551d87f",
            "type": "picking-list-items",
            "attributes": {
                "quantity": 1,
                "numberOfPicked": 1,
                "numberOfNotPicked": 0,
                "orderItem": {
                    "uuid": "31e21001-e544-5533-9754-51331c8c9ac5",
                    "sku": "141_29380410",
                    "quantity": 1,
                    "name": "Asus Zenbook US303UB",
                    "amountSalesUnit": null
                }
            },
            "relationships": {
                "sales-shipments": {
                    "data": [
                        {
                            "id": "84935e86-ef86-507f-9c23-54942486d8cb",
                            "type": "sales-shipments"
                        }
                    ]
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/picking-list-items/65bb3aec-0a45-5ec6-9b12-bbca6551d87f?include=picking-list-items,sales-shipments"
            }
        }
    ]
}
```
</details>
{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the feature frontend.

### Prerequisites

Install the required features:

| NAME         | VERSION          | INSTALLATION GUIDE                                                                                                                                                            |
|--------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core | 202507.0 | [Install the Spryker Сore feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                  |
| Product      | 202507.0 | [Isntall the Product feature](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-product-feature.html) |

### 1) Install the required modules

```bash
composer require spryker-feature/shipment:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE             | EXPECTED DIRECTORY                       |
|--------------------|------------------------------------------|
| ShipmentTypeWidget | vendor/spryker-shop/shipment-type-widget |
| ShipmentPage       | vendor/spryker-shop/shipment-page        |

{% endinfo_block %}

### 2) Set up configuration

Add the following configuration:

1. Disable shipment points to be selected for product bundles during checkout:

| CONFIGURATION    | SPECIFICATION | NAMESPACE                   |
|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|-----------------------------|
| ShipmentTypeWidgetConfig::getNotApplicableServicePointAddressStepFormItemPropertiesForHydration() | Defines the list of properties in an `ItemTransfer` that are not intended for form hydration.            | Pyz\Yves\ShipmentTypeWidget |
| ProductBundleConfig::getAllowedBundleItemFieldsToCopy()   | Defines the list of allowed fields to be copied from a source bundle item to destination bundled items. | Pyz\Zed\ProductBundle       |

**src/Pyz/Yves/ShipmentTypeWidget/ShipmentTypeWidgetConfig.php**

```php
<?php

namespace Pyz\Yves\ShipmentTypeWidget;

use Generated\Shared\Transfer\ItemTransfer;
use SprykerShop\Yves\ShipmentTypeWidget\ShipmentTypeWidgetConfig as SprykerShipmentTypeWidgetConfig;

class ShipmentTypeWidgetConfig extends SprykerShipmentTypeWidgetConfig
{
    /**
     * @return list<string>
     */
    public function getNotApplicableShipmentTypeAddressStepFormItemPropertiesForHydration(): array
    {
        return [
            ItemTransfer::BUNDLE_ITEM_IDENTIFIER,
            ItemTransfer::RELATED_BUNDLE_ITEM_IDENTIFIER,
        ];
    }
}
```

**src/Pyz/Zed/ProductBundle/ProductBundleConfig.php**

```php
<?php

namespace Pyz\Zed\ProductBundle;

use Generated\Shared\Transfer\ItemTransfer;
use Spryker\Zed\ProductBundle\ProductBundleConfig as SprykerProductBundleConfig;

class ProductBundleConfig extends SprykerProductBundleConfig
{
    /**
     * @return list<string>
     */
    public function getAllowedBundleItemFieldsToCopy(): array
    {
        return [
            ItemTransfer::SHIPMENT,
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure you can't select shipment points for product bundles on the address checkout step.

{% endinfo_block %}

### 3) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                                       | SPECIFICATION                                                                                               | PREREQUISITES | NAMESPACE                                                  |
|--------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|---------------|------------------------------------------------------------|
| ShipmentTypeCheckoutPageStepEnginePreRenderPlugin            | Expands the `Quote.items.shipment` transfer with `shipmentTypeUuid` taken from `Quote.items.shipmentType.uuid`. |               | SprykerShop\Yves\ShipmentTypeWidget\Plugin\CheckoutPage    |
| ShipmentTypeCheckoutAddressStepPreGroupItemsByShipmentPlugin | Cleans `Shipment.shipmentTypeUuid` from each item in `Quote.items`.                                         |               | SprykerShop\Yves\ShipmentTypeWidget\Plugin\CustomerPage    |
| ShipmentReorderItemSanitizerPlugin                           | Sets the `ItemTransfer.shipment` property to `null` for each item after reorder.                            |               | SprykerShop\Yves\ShipmentPage\Plugin\CustomerReorderWidget |

**src/Pyz/Yves/CheckoutPage/CheckoutPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\CheckoutPage;

use SprykerShop\Yves\CheckoutPage\CheckoutPageDependencyProvider as SprykerShopCheckoutPageDependencyProvider;
use SprykerShop\Yves\ShipmentTypeWidget\Plugin\CheckoutPage\ShipmentTypeCheckoutPageStepEnginePreRenderPlugin;

class CheckoutPageDependencyProvider extends SprykerShopCheckoutPageDependencyProvider
{
    /**
     * @return list<\SprykerShop\Yves\CheckoutPageExtension\Dependency\Plugin\StepEngine\CheckoutPageStepEnginePreRenderPluginInterface>
     */
    protected function getCheckoutPageStepEnginePreRenderPlugins(): array
    {
        return [
            new ShipmentTypeCheckoutPageStepEnginePreRenderPlugin(),
        ];
    }
```

**src/Pyz/Yves/CustomerPage/CustomerPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\CustomerPage;

use SprykerShop\Yves\CustomerPage\CustomerPageDependencyProvider as SprykerShopCustomerPageDependencyProvider;
use SprykerShop\Yves\ShipmentTypeWidget\Plugin\CustomerPage\ShipmentTypeCheckoutAddressStepPreGroupItemsByShipmentPlugin;

class CustomerPageDependencyProvider extends SprykerShopCustomerPageDependencyProvider
{
    /**
     * @return list<\SprykerShop\Yves\CustomerPageExtension\Dependency\Plugin\CheckoutAddressStepPreGroupItemsByShipmentPluginInterface>
     */
    protected function getCheckoutAddressStepPreGroupItemsByShipmentPlugins(): array
    {
        return [
            new ShipmentTypeCheckoutAddressStepPreGroupItemsByShipmentPlugin(),
        ];
    }
}
```

**src/Pyz/Yves/CustomerReorderWidget/CustomerReorderWidgetDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\CustomerReorderWidget;

use SprykerShop\Yves\CustomerReorderWidget\CustomerReorderWidgetDependencyProvider as SprykerCustomerReorderWidgetDependencyProvider;
use SprykerShop\Yves\ShipmentPage\Plugin\CustomerReorderWidget\ShipmentReorderItemSanitizerPlugin;

class CustomerReorderWidgetDependencyProvider extends SprykerCustomerReorderWidgetDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\CustomerReorderWidgetExtension\Dependency\Plugin\ReorderItemSanitizerPluginInterface>
     */
    protected function getReorderItemSanitizerPlugins(): array
    {
        return [
            new ShipmentReorderItemSanitizerPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that after completing the reordering process, the address selection step functions correctly, and the address type is selected as "single address".

{% endinfo_block %}
