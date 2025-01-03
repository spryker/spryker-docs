

This document describes how to install the Product Offer Shipment feature.

## Install feature core

Follow the steps below to install the Product Offer Shipment feature core.

## Prerequisites

To start feature integration, integrate the following required features:

| NAME          | VERSION          | INSTALLATION GUIDE                                                                                                                                         |
|---------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| Product Offer | {{page.version}} | [Install the Product Offer feature](/docs/pbc/all/offer-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-feature.html) |
| Shipment      | {{page.version}} | [Install the Shipment feature](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-shipment-feature.html)                   |

## 1) Install the required modules

1. Install the required modules using Composer:

```bash
composer require spryker-feature/product-offer-shipment:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                                   | EXPECTED DIRECTORY                                           |
|------------------------------------------|--------------------------------------------------------------|
| ProductOfferShipmentType                 | vendor/spryker/product-offer-shipment-type                   |
| ProductOfferShipmentTypeDataImport       | vendor/spryker/product-offer-shipment-type-data-import       |
| ProductOfferShipmentTypeGui              | vendor/spryker/product-offer-shipment-type-gui               |
| ProductOfferShipmentTypeStorage          | vendor/spryker/product-offer-shipment-type-storage           |
| ProductOfferShipmentTypeStorageExtension | vendor/spryker/product-offer-shipment-type-storage-extension |

{% endinfo_block %}



2. Optional: To install demo Click&Collect functionalities, install the following module:

```bash
composer require spryker/click-and-collect-example: "^0.4.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following module has been installed:

| MODULE                 | EXPECTED DIRECTORY                       |
|------------------------|------------------------------------------|
| ClickAndCollectExample | vendor/spryker/click-and-collect-example |

{% endinfo_block %}

### 2) Set up database schema and transfer objects

1. Adjust the schema definition so entity changes trigger events.

| AFFECTED ENTITY                 | TRIGGERED EVENTS                                                                                                                                |
|---------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| spy_product_offer_shipment_type | Entity.spy_product_offer_shipment_type.create<br>Entity.spy_product_offer_shipment_type.update<br>Entity.spy_product_offer_shipment_type.delete |

**src/Pyz/Zed/ProductOfferShipmentType/Persistence/Propel/Schema/spy_product_offer_shipment_type.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" namespace="Orm\Zed\ProductOfferShipmentType\Persistence" package="src.Orm.Zed.ProductOfferShipmentType.Persistence" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd">

    <table name="spy_product_offer_shipment_type">
        <behavior name="event">
            <parameter name="spy_product_offer_shipment_type_all" column="*"/>
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

Ensure that the following changes have been applied by checking your database:

| DATABASE ENTITY                         | TYPE  | EVENT   |
|-----------------------------------------|-------|---------|
| spy_product_offer_shipment_type         | table | created |
| spy_product_offer_shipment_type_storage | table | created |

Ensure the following transfers have been created:

| TRANSFER                                   | TYPE     | EVENT   | PATH                                                                             |
|--------------------------------------------|----------|---------|----------------------------------------------------------------------------------|
| ProductOfferShipmentTypeCriteria           | class    | created | src/Generated/Shared/Transfer/ProductOfferShipmentTypeCriteriaTransfer           |
| ProductOfferShipmentTypeConditions         | class    | created | src/Generated/Shared/Transfer/ProductOfferShipmentTypeConditionsTransfer         |
| ProductOfferShipmentTypeCollection         | class    | created | src/Generated/Shared/Transfer/ProductOfferShipmentTypeCollectionTransfer         |
| ProductOfferShipmentTypeIteratorCriteria   | class    | created | src/Generated/Shared/Transfer/ProductOfferShipmentTypeIteratorCriteriaTransfer   |
| ProductOfferShipmentTypeIteratorConditions | class    | created | src/Generated/Shared/Transfer/ProductOfferShipmentTypeIteratorConditionsTransfer |
| ProductOfferShipmentType                   | class    | created | src/Generated/Shared/Transfer/ProductOfferShipmentTypeTransfer                   |
| ProductOfferShipmentTypeStorage            | class    | created | src/Generated/Shared/Transfer/ProductOfferShipmentTypeStorageTransfer            |
| ProductOfferShipmentTypeCollectionRequest  | class    | created | src/Generated/Shared/Transfer/ProductOfferShipmentTypeCollectionRequestTransfer  |
| ProductOfferShipmentTypeCollectionResponse | class    | created | src/Generated/Shared/Transfer/ProductOfferShipmentTypeCollectionResponseTransfer |
| ProductOfferCriteria                       | class    | created | src/Generated/Shared/Transfer/ProductOfferCriteriaTransfer                       |
| ProductOfferConditions                     | class    | created | src/Generated/Shared/Transfer/ProductOfferConditionsTransfer                     |
| ProductOfferCollection                     | class    | created | src/Generated/Shared/Transfer/ProductOfferCollectionTransfer                     |
| ProductOffer                               | class    | created | src/Generated/Shared/Transfer/ProductOfferTransfer                               |
| ShipmentTypeCriteria                       | class    | created | src/Generated/Shared/Transfer/ShipmentTypeCriteriaTransfer                       |
| ShipmentTypeConditions                     | class    | created | src/Generated/Shared/Transfer/ShipmentTypeConditionsTransfer                     |
| ShipmentTypeCollection                     | class    | created | src/Generated/Shared/Transfer/ShipmentTypeCollectionTransfer                     |
| ShipmentType                               | class    | created | src/Generated/Shared/Transfer/ShipmentTypeTransfer                               |
| ProductOfferStorage                        | class    | created | src/Generated/Shared/Transfer/ProductOfferStorageTransfer                        |
| ShipmentTypeStorageCriteria                | class    | created | src/Generated/Shared/Transfer/ShipmentTypeStorageCriteriaTransfer                |
| ShipmentTypeStorageConditions              | class    | created | src/Generated/Shared/Transfer/ShipmentTypeStorageConditionsTransfer              |
| ShipmentTypeStorageCollection              | class    | created | src/Generated/Shared/Transfer/ShipmentTypeStorageCollectionTransfer              |
| ShipmentTypeStorage                        | class    | created | src/Generated/Shared/Transfer/ShipmentTypeStorageTransfer                        |
| StoreCollection                            | class    | created | src/Generated/Shared/Transfer/StoreCollectionTransfer                            |
| Store                                      | class    | created | src/Generated/Shared/Transfer/StoreTransfer                                      |
| StoreRelation                              | class    | created | src/Generated/Shared/Transfer/StoreRelationTransfer                              |
| Pagination                                 | class    | created | src/Generated/Shared/Transfer/PaginationTransfer                                 |
| CartChange                                 | class    | created | src/Generated/Shared/Transfer/CartChangeTransfer                                 |
| Sort                                       | class    | created | src/Generated/Shared/Transfer/SortTransfer                                       |
| DataImporterConfiguration                  | class    | created | src/Generated/Shared/Transfer/DataImportConfigurationTransfer                    |
| DataImporterReport                         | class    | created | src/Generated/Shared/Transfer/DataImporterReportTransfer                         |
| EventEntity                                | class    | created | src/Generated/Shared/Transfer/EventEntityTransfer                                |
| SynchronizationData                        | class    | created | src/Generated/Shared/Transfer/SynchronizationDataTransfer                        |
| Filter                                     | class    | created | src/Generated/Shared/Transfer/FilterTransfer                                     |
| Quote                                      | class    | created | src/Generated/Shared/Transfer/QuoteTransfer                                      |
| Item                                       | class    | created | src/Generated/Shared/Transfer/ItemTransfer                                       |
| ProductOfferStorageCriteria                | class    | created | src/Generated/Shared/Transfer/ProductOfferStorageCriteriaTransfer                |
| ProductOfferStorageCollection              | class    | created | src/Generated/Shared/Transfer/ProductOfferStorageCollectionTransfer              |
| Error                                      | class    | created | src/Generated/Shared/Transfer/ErrorTransfer                                      |
| ErrorCollection                            | class    | created | src/Generated/Shared/Transfer/ErrorCollectionTransfer                            |
| ProductOfferStorage.productConcreteSku     | property | added   | src/Generated/Shared/Transfer/ProductOfferStorageTransfer                        |
| ShipmentTypeStorage.key                    | property | added   | src/Generated/Shared/Transfer/ShipmentTypeStorageTransfer                        |

{% endinfo_block %}

### 3) Configure export to Redis

Configure tables to be published to `spy_product_offer_shipment_type_storage` and synchronized to the Storage on create, edit, and delete changes:

1. In `src/Pyz/Client/RabbitMq/RabbitMqConfig.php`, adjust the `RabbitMq` module configuration:

**src/Pyz/Client/RabbitMq/RabbitMqConfig.php**

```php
<?php

namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
use Spryker\Shared\ProductOfferShipmentTypeStorage\ProductOfferShipmentTypeStorageConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     * @return list<string>
     */
    protected function getSynchronizationQueueConfiguration(): array
    {
        return [
            ProductOfferShipmentTypeStorageConfig::PRODUCT_OFFER_SHIPMENT_TYPE_SYNC_STORAGE_QUEUE,
        ];
    }
}
```

2. Register the new queue message processor:

**src/Pyz/Zed/Queue/QueueDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Queue;

use Spryker\Shared\ProductOfferShipmentTypeStorage\ProductOfferShipmentTypeStorageConfig;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;
use Spryker\Zed\Synchronization\Communication\Plugin\Queue\SynchronizationStorageQueueMessageProcessorPlugin;

class QueueDependencyProvider extends SprykerDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<string, \Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface>
     */
    protected function getProcessorMessagePlugins(Container $container): array
    {
        return [
            ProductOfferShipmentTypeStorageConfig::PRODUCT_OFFER_SHIPMENT_TYPE_SYNC_STORAGE_QUEUE => new SynchronizationStorageQueueMessageProcessorPlugin(),
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
use Spryker\Zed\ShipmentTypeStorage\ProductOfferShipmentTypeStorageConfig as SprykerProductOfferShipmentTypeStorageConfig;

class ProductOfferShipmentTypeStorageConfig extends SprykerProductOfferShipmentTypeStorageConfig
{
    /**
     * @return string|null
     */
    public function getProductOfferShipmentTypeSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }
}
```

4. Set up publisher plugins:

| PLUGIN                                                        | SPECIFICATION                                                                                               | PREREQUISITES | NAMESPACE                                                                                           |
|---------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|---------------|-----------------------------------------------------------------------------------------------------|
| ProductOfferShipmentTypeWritePublisherPlugin                  | Publishes product offer shipment type data by `SpyProductOfferShipmentType` entity events.                  |               | Spryker\Zed\ProductOfferShipmentTypeStorage\Communication\Plugin\Publisher\ProductOfferShipmentType |
| ProductOfferProductOfferShipmentTypeWritePublisherPlugin      | Publishes product offer shipment type data by `SpyProductOffer` events.                                     |               | Spryker\Zed\ProductOfferShipmentTypeStorage\Communication\Plugin\Publisher\ProductOffer             |
| ProductOfferStoreProductOfferShipmentTypeWritePublisherPlugin | Publishes product offer shipment type data by `SpyProductOfferStore` events.                                |               | Spryker\Zed\ProductOfferShipmentTypeStorage\Communication\Plugin\Publisher\ProductOfferStore        |
| ShipmentTypeProductOfferShipmentTypeWritePublisherPlugin      | Publishes product offer shipment type data by `SpyShipmentType` events.                                     |               | Spryker\Zed\ProductOfferShipmentTypeStorage\Communication\Plugin\Publisher\ShipmentType             |
| ShipmentTypeStoreProductOfferShipmentTypeWritePublisherPlugin | Publishes product offer shipment type data by `SpyShipmentTypeStore` events.                                |               | Spryker\Zed\ProductOfferShipmentTypeStorage\Communication\Plugin\Publisher\ShipmentTypeStore        |
| ProductOfferShipmentTypePublisherTriggerPlugin                | Allows to populate product offer shipment type storage table with data and trigger further export to Redis. |               | Spryker\Zed\ProductOfferShipmentTypeStorage\Communication\Plugin\Publisher                          |

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\ProductOfferShipmentTypeStorage\Communication\Plugin\Publisher\ProductOffer\ProductOfferProductOfferShipmentTypeWritePublisherPlugin;
use Spryker\Zed\ProductOfferShipmentTypeStorage\Communication\Plugin\Publisher\ProductOfferShipmentType\ProductOfferShipmentTypeWritePublisherPlugin;
use Spryker\Zed\ProductOfferShipmentTypeStorage\Communication\Plugin\Publisher\ProductOfferShipmentTypePublisherTriggerPlugin;
use Spryker\Zed\ProductOfferShipmentTypeStorage\Communication\Plugin\Publisher\ProductOfferStore\ProductOfferStoreProductOfferShipmentTypeWritePublisherPlugin;
use Spryker\Zed\ProductOfferShipmentTypeStorage\Communication\Plugin\Publisher\ShipmentType\ShipmentTypeProductOfferShipmentTypeWritePublisherPlugin;
use Spryker\Zed\ProductOfferShipmentTypeStorage\Communication\Plugin\Publisher\ShipmentTypeStore\ShipmentTypeStoreProductOfferShipmentTypeWritePublisherPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array<int|string, \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>|array<string, array<int|string, \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>>
     */
    protected function getPublisherPlugins(): array
    {
        return array_merge(
            $this->getProductOfferShipmentTypeStoragePlugins(),
        );
    }

    /**
     * @return list<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface>
     */
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            return new ProductOfferShipmentTypePublisherTriggerPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getProductOfferShipmentTypeStoragePlugins(): array
    {
        return [
            new ProductOfferShipmentTypeWritePublisherPlugin(),
            new ProductOfferProductOfferShipmentTypeWritePublisherPlugin(),
            new ProductOfferStoreProductOfferShipmentTypeWritePublisherPlugin(),
            new ShipmentTypeProductOfferShipmentTypeWritePublisherPlugin(),
            new ShipmentTypeStoreProductOfferShipmentTypeWritePublisherPlugin(),
        ];
    }
}
```

5. Set up synchronization plugins:

| PLUGIN                                                          | SPECIFICATION                                                                            | PREREQUISITES | NAMESPACE                                                                        |
|-----------------------------------------------------------------|------------------------------------------------------------------------------------------|---------------|----------------------------------------------------------------------------------|
| ProductOfferShipmentTypeSynchronizationDataBulkRepositoryPlugin | Allows synchronizing the product offer shipment type storage table's content into Redis. |               | Spryker\Zed\ProductOfferShipmentTypeStorage\Communication\Plugin\Synchronization |

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\ProductOfferShipmentTypeStorage\Communication\Plugin\Synchronization\ProductOfferShipmentTypeSynchronizationDataBulkRepositoryPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface>
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new ProductOfferShipmentTypeSynchronizationDataBulkRepositoryPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the `product-offer-shipment-type` data is stored in storage correctly:

1. Fill the `spy_product_offer`, `spy_product_offer_store`, `spy_shipment_type`, `spy_shipment_type_store`, and `spy_product_offer_shipment_type` tables with data.
2. Run the `console publish:trigger-events -r product_offer` command.
3. Make sure that the `spy_product_offer_shipment_type_storage` table has been filled with respective data.
4. Make sure that, in your system, storage entries are displayed with the `kv:product_offer_shipment_type:{store}:{product_offer_reference}` mask.

Make sure that `product-offer-shipment-type` synchronization plugin works correctly:

1. Fill the `spy_product_offer_shipment_type_storage` table with some data.
2. Run the `console sync:data -r product_offer_shipment_type` command.
3. Make sure that, in your system, storage entries are displayed with the `kv:product_offer_shipment_type:{store}:{product_offer_reference}` mask.

Make sure that when a product offer shipment type relation is created or edited through BAPI, it's exported to Redis accordingly.

In Redis, make sure data is represented in the following format:
```json
{
    "product_offer_reference": "offer1",
    "shipment_type_uuids": [
        "174d9dc0-55ae-5c4b-a2f2-a419027029ef"
    ]
}
```
{% endinfo_block %}

### 4) Import shipment types for product offers

1. Prepare your data according to your requirements using our demo data:

**vendor/spryker/spryker/Bundles/ProductOfferShipmentTypeDataImport/data/import/product_offer_shipment_type.csv**
```csv
product_offer_reference,shipment_type_key
offer1,delivery
offer2,delivery
offer3,delivery
offer4,pickup
```

| COLUMN                  | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION            |
|-------------------------|-----------|-----------|--------------|-----------------------------|
| product_offer_reference | ✓ | string    | offer1       | Reference of product offer. |
| shipment_type_key       | ✓ | string    | delivery     | Key of the shipment type.   |

2. Register the following data import plugin:

| PLUGIN                                   | SPECIFICATION                                                      | PREREQUISITES | NAMESPACE                                                                       |
|------------------------------------------|--------------------------------------------------------------------|---------------|---------------------------------------------------------------------------------|
| ProductOfferShipmentTypeDataImportPlugin | Imports product offer shipment types data from the specified file. | None          | \Spryker\Zed\ProductOfferShipmentTypeDataImport\Communication\Plugin\DataImport |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**
```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ProductOfferShipmentTypeDataImport\Communication\Plugin\DataImport\ProductOfferShipmentTypeDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface>
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new ProductOfferShipmentTypeDataImportPlugin(),
        ];
    }
}
```

3. Enable the behaviors by registering the console commands:

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
use Spryker\Zed\ProductOfferShipmentTypeDataImport\ProductOfferShipmentTypeDataImportConfig;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container)
    {
        $commands = [
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . ':' . ProductOfferShipmentTypeDataImportConfig::IMPORT_TYPE_PRODUCT_OFFER_SHIPMENT_TYPE),
        ];

        return $commands;
    }
}
```

4. Import data:

```bash
console data:import:product-offer-shipment-type
```

{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the `spy_product_offer_shipment_type` table in the database.

{% endinfo_block %}

### 5) Add translations

1. Append the glossary according to your configuration:

```csv
product_offer_shipment_type.validation.product_offer_reference_not_found,Product offer '%product_offer_reference%' not found.,en_US
product_offer_shipment_type.validation.product_offer_reference_not_found,Product offer '%product_offer_reference%' nicht gefunden.,de_DE
product_offer_shipment_type.validation.shipment_type_uuid_not_found,Delivery types with uuids '%shipment_type_uuids%' not found.,en_US
product_offer_shipment_type.validation.shipment_type_uuid_not_found,Lieferarten mit den uuids '%shipment_type_uuids%' wurde nicht gefunden.,de_DE
product_offer_shipment_type.validation.product_offer_not_unique,A product offer with the same reference already exists in request.,de_DE
product_offer_shipment_type.validation.product_offer_not_unique,Ein Product Offer mit der gleichen Referenz liegt bereits in der Anfrage vor.,de_DE
product_offer_shipment_type.validation.shipment_type_not_unique,A delivery type for product offer '%product_offer_reference%' with the same uuid already exists in request.,de_DE
product_offer_shipment_type.validation.shipment_type_not_unique,Ein Lieferart für Product Offer '%product_offer_reference%' mit derselben UUID ist bereits in der Anfrage vorhanden.,de_DE
```

2. Import data:

```bash
console data:import glossary
```

### 6) Set up behavior

Enable the following plugins:

| PLUGIN                                                    | SPECIFICATION                                                                                                                 | PREREQUISITES | NAMESPACE                                                                            |
|-----------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|---------------|--------------------------------------------------------------------------------------|
| ShipmentTypeProductOfferPostCreatePlugin                  | Persists the product offer shipment type to persistence.                                                                          |               | Spryker\Zed\ProductOfferShipmentType\Communication\Plugins\ProductOffer              |
| ShipmentTypeProductOfferPostUpdatePlugin                  | Deletes redundant product offer shipment types from persistence. Persists missed product offer shipment types to persistence. |               | Spryker\Zed\ProductOfferShipmentType\Communication\Plugins\ProductOffer              |
| ShipmentTypeProductOfferExpanderPlugin                    | Expands `ProductOfferTransfer` with related shipment types.                                                                   |               | Spryker\Zed\ProductOfferShipmentType\Communication\Plugins\ProductOffer              |
| ShipmentTypeProductOfferStorageExpanderPlugin             | Expands `ProductOfferStorageTransfer` with shipment type storage data.   |               | Spryker\Zed\ProductOfferShipmentTypeStorage\Communication\Plugin\ProductOfferStorage |
| ShipmentTypeProductOfferAvailableShipmentTypeFilterPlugin | Filters out shipment types without the product offer shipment type relation.                                                  |               | Spryker\Client\ClickAndCollectExample\Plugin\ShipmentTypeStorage                     |
| ShipmentTypeProductOfferViewSectionPlugin                 | Expands the product offer view section with shipment types.                     |           | Spryker\Zed\ProductOfferShipmentTypeGui\Communication\Plugin\ProductOfferGui         |

<details open
><summary>src/Pyz/Zed/ProductOffer/ProductOfferDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\ProductOffer;

use Spryker\Zed\ProductOffer\ProductOfferDependencyProvider as SprykerProductOfferDependencyProvider;
use Spryker\Zed\ProductOfferShipmentType\Communication\Plugins\ProductOffer\ShipmentTypeProductOfferExpanderPlugin;
use Spryker\Zed\ProductOfferShipmentType\Communication\Plugins\ProductOffer\ShipmentTypeProductOfferPostCreatePlugin;
use Spryker\Zed\ProductOfferShipmentType\Communication\Plugins\ProductOffer\ShipmentTypeProductOfferPostUpdatePlugin;

class ProductOfferDependencyProvider extends SprykerProductOfferDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductOfferExtension\Dependency\Plugin\ProductOfferPostCreatePluginInterface>
     */
    protected function getProductOfferPostCreatePlugins(): array
    {
        return [
            new ShipmentTypeProductOfferPostCreatePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductOfferExtension\Dependency\Plugin\ProductOfferPostUpdatePluginInterface>
     */
    protected function getProductOfferPostUpdatePlugins(): array
    {
        return [
            new ShipmentTypeProductOfferPostUpdatePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductOfferExtension\Dependency\Plugin\ProductOfferExpanderPluginInterface>
     */
    protected function getProductOfferExpanderPlugins(): array
    {
        return [
            new ShipmentTypeProductOfferExpanderPlugin(),
        ];
    }
```
</details>

**src/Pyz/Client/ProductOfferStorage/ProductOfferStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\ProductOfferStorage;

use Spryker\Client\ProductOfferStorage\ProductOfferStorageDependencyProvider as SprykerProductOfferStorageDependencyProvider;
use Spryker\Zed\ProductOfferShipmentTypeStorage\Communication\Plugin\ProductOfferStorage\ShipmentTypeProductOfferStorageExpanderPlugin;

class ProductOfferStorageDependencyProvider extends SprykerProductOfferStorageDependencyProvider
{
    /**
     * @return list<\Spryker\Client\ProductOfferStorageExtension\Dependency\Plugin\ProductOfferStorageExpanderPluginInterface>
     */
    protected function getProductOfferStorageExpanderPlugins(): array
    {
        return [
            new ShipmentTypeProductOfferStorageExpanderPlugin(),
        ];
    }
}
```


**src/Pyz/Client/ShipmentTypeStorage/ShipmentTypeStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\ShipmentTypeStorage;

use Spryker\Client\ClickAndCollectExample\Plugin\ShipmentTypeStorage\ShipmentTypeProductOfferAvailableShipmentTypeFilterPlugin;
use Spryker\Client\ShipmentTypeStorage\ShipmentTypeStorageDependencyProvider as SprykerShipmentTypeStorageDependencyProvider;

class ShipmentTypeStorageDependencyProvider extends SprykerShipmentTypeStorageDependencyProvider
{
    /**
     * @return array<\Spryker\Client\ShipmentTypeStorageExtension\Dependency\Plugin\AvailableShipmentTypeFilterPluginInterface>
     */
    protected function getAvailableShipmentTypeFilterPlugins(): array
    {
        return [
            new ShipmentTypeProductOfferAvailableShipmentTypeFilterPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/ProductOfferGui/ProductOfferGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductOfferGui;

use Spryker\Zed\ProductOfferShipmentTypeGui\Communication\Plugin\ProductOfferGui\ShipmentTypeProductOfferViewSectionPlugin;

class ProductOfferGuiDependencyProvider extends SprykerProductOfferGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductOfferGuiExtension\Dependency\Plugin\ProductOfferViewSectionPluginInterface>
     */
    public function getProductOfferViewSectionPlugins(): array
    {
        return [
            new ServiceProductOfferViewSectionPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. In the Back Office, go to the **Marketplace&nbsp;<span aria-label="and then">></span> Offers**.
2. On the **Offers** page, next to a product offer, click **View**.
    This opens the **View Offer: {offer ID}** page.
3. Scroll down the page and make sure the **SHIPMENT TYPES** pane is displayed.


{% endinfo_block %}
