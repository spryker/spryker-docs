

This document describes how to install the Product Offer + Service Points feature.

## Install feature core

Follow the steps below to install the Product Offer + Service Points feature core.

### Prerequisites

Install the required features:

| NAME           | VERSION          | INSTALLATION GUIDE                                                                                                                                                                        |
|----------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Product Offer  | {{page.version}} | [Install the Product Offer feature](/docs/pbc/all/offer-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-feature.html) |
| Service Points | {{page.version}} | [Install the Service Points feature](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/install-features/install-the-service-points-feature.html)                                                 |

### 1) Install the required modules

```bash
composer require spryker-feature/product-offer-service-points: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                             | EXPECTED DIRECTORY                                     |
|------------------------------------|--------------------------------------------------------|
| ProductOfferServicePoint           | vendor/spryker/product-offer-service-point             |
| ProductOfferServicePointDataImport | vendor/spryker/product-offer-service-point-data-import |
| ProductOfferServicePointGui        | vendor/spryker/product-offer-service-point-gui         |
| ProductOfferServicePointStorage    | vendor/spryker/product-offer-service-point-storage     |

{% endinfo_block %}

## 2) Set up database schema and transfer objects

1. Adjust the schema definition so entity changes trigger events.

| AFFECTED ENTITY               | TRIGGERED EVENTS                                                                                                              |
|-------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| spy_product_offer_service     | Entity.spy_product_offer_service.create<br>Entity.spy_product_offer_service.delete                                            |

**src/Pyz/Zed/ProductOfferServicePoint/Persistence/Propel/Schema/spy_product_offer_service.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\ProductOfferServicePoint\Persistence" package="src.Orm.Zed.ProductOfferServicePoint.Persistence">

    <table name="spy_product_offer_service">
        <behavior name="event">
            <parameter name="spy_product_offer_service_all" column="*"/>
        </behavior>
    </table>

</database>
```

2. Apply database changes and generate transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:entity:generate
console frontend:zed:build
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in the database:

| DATABASE ENTITY                   | TYPE   | EVENT   |
|-----------------------------------|--------|---------|
| spy_product_offer_service         | table  | created |
| spy_product_offer_service_storage | table  | created |

Make sure that propel entities have been generated successfully by checking their existence. Also, make generated entity classes extending respective Spryker core classes.

| CLASS NAMESPACE                                                                         | EXTENDS                                                                                                    |
|-----------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| \Orm\Zed\ProductOfferServicePoint\Persistence\SpyProductOfferService                    | \Spryker\Zed\ProductOfferServicePoint\Persistence\Propel\AbstractSpyProductOfferService                    |
| \Orm\Zed\ProductOfferServicePoint\Persistence\SpyProductOfferServiceQuery               | \Spryker\Zed\ProductOfferServicePoint\Persistence\Propel\AbstractSpyProductOfferServiceQuery               |
| \Orm\Zed\ProductOfferServicePointStorage\Persistence\SpyProductOfferServiceStorage      | \Spryker\Zed\ProductOfferServicePointStorage\Persistence\Propel\AbstractSpyProductOfferServiceStorage      |
| \Orm\Zed\ProductOfferServicePointStorage\Persistence\SpyProductOfferServiceStorageQuery | \Spryker\Zed\ProductOfferServicePointStorage\Persistence\Propel\AbstractSpyProductOfferServiceStorageQuery |

Make sure the following changes have been applied in transfer objects:

| TRANSFER                                  | TYPE  | EVENT   | PATH                                                                            |
|-------------------------------------------|-------|---------|---------------------------------------------------------------------------------|
| ServicePoint                              | class | created | src/Generated/Shared/Transfer/ServicePointTransfer                              |
| ServicePointCollection                    | class | created | src/Generated/Shared/Transfer/ServicePointCollectionTransfer                    |
| StoreRelation                             | class | created | src/Generated/Shared/Transfer/StoreRelationTransfer                             |
| Store                                     | class | created | src/Generated/Shared/Transfer/StoreTransfer                                     |
| Sort                                      | class | created | src/Generated/Shared/Transfer/SortTransfer                                      |
| Pagination                                | class | created | src/Generated/Shared/Transfer/PaginationTransfer                                |
| DataImporterConfiguration                 | class | created | src/Generated/Shared/Transfer/DataImporterConfigurationTransfer                 |
| DataImporterReport                        | class | created | src/Generated/Shared/Transfer/DataImporterReportTransfer                        |
| ServicePointStorage                       | class | created | src/Generated/Shared/Transfer/ServicePointStorageTransfer                       |
| ProductOfferService                       | class | created | src/Generated/Shared/Transfer/ProductOfferServiceTransfer                       |
| ProductOfferServices                      | class | created | src/Generated/Shared/Transfer/ProductOfferServicesTransfer                      |
| ProductOfferServiceCollection             | class | created | src/Generated/Shared/Transfer/ProductOfferServiceCollectionTransfer             |
| ProductOfferServiceCollectionRequest      | class | created | src/Generated/Shared/Transfer/ProductOfferServiceCollectionRequestTransfer      |
| ProductOfferServiceCollectionResponse     | class | created | src/Generated/Shared/Transfer/ProductOfferServiceCollectionResponseTransfer     |
| ProductOfferServiceCollectionResponse     | class | created | src/Generated/Shared/Transfer/ProductOfferServiceCollectionResponseTransfer     |
| ProductOfferServiceCriteria               | class | created | src/Generated/Shared/Transfer/ProductOfferServiceCriteriaTransfer               |
| ProductOfferServiceConditions             | class | created | src/Generated/Shared/Transfer/ProductOfferServiceConditionsTransfer             |
| IterableProductOfferServicesCriteria      | class | created | src/Generated/Shared/Transfer/IterableProductOfferServicesCriteriaTransfer      |
| IterableProductOfferServicesConditions    | class | created | src/Generated/Shared/Transfer/IterableProductOfferServicesConditionsTransfer    |
| ProductOfferServiceStorage                | class | created | src/Generated/Shared/Transfer/ProductOfferServiceStorageTransfer                |
| ProductOfferServiceStorageCollection      | class | created | src/Generated/Shared/Transfer/ProductOfferServiceStorageCollectionTransfer      |
| ServicePointStorageCollection             | class | created | src/Generated/Shared/Transfer/ServicePointStorageCollectionTransfer             |
| ServicePointStorageCriteria               | class | created | src/Generated/Shared/Transfer/ServicePointStorageCriteriaTransfer               |
| ServicePointStorageConditions             | class | created | src/Generated/Shared/Transfer/ServicePointStorageConditionsTransfer             |
| SynchronizationData                       | class | created | src/Generated/Shared/Transfer/SynchronizationDataTransfer                       |
| Filter                                    | class | created | src/Generated/Shared/Transfer/FilterTransfer                                    |

{% endinfo_block %}

### 3) Import service points

1. Prepare your data according to your requirements using our demo data:

**data/import/common/common/product_offer_service.csv**

```csv
product_offer_reference,service_key
offer419,s1
offer420,s1
offer421,s1
offer422,s1
offer423,s1
offer424,s1
```

| COLUMN                  | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION                       |
|-------------------------|-----------|-----------|--------------|----------------------------------------|
| product_offer_reference | ✓ | string    | offer419     | Unique reference of the product offer. |
| service_key             | ✓ | string    | s1           | Unique key of the service.             |

2. Enable data imports at your configuration file—for example:

**data/import/local/full_EU.yml**

```yml
    - data_entity: product-offer-service
      source: data/import/common/common/marketplace/product_offer_service.csv
```

3. Register the following data import plugins:

| PLUGIN                              | SPECIFICATION                                                 | PREREQUISITES | NAMESPACE                                                                       |
|-------------------------------------|---------------------------------------------------------------|---------------|---------------------------------------------------------------------------------|
| ProductOfferServiceDataImportPlugin | Imports product offer services into the database.             | None          | \Spryker\Zed\ProductOfferServicePointDataImport\Communication\Plugin\DataImport |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ProductOfferServicePointDataImport\Communication\Plugin\DataImport\ProductOfferServiceDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface>
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new ProductOfferServiceDataImportPlugin(),
        ];
    }
}
```

4. Enable the behaviors by registering the console commands:

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
use Spryker\Zed\ProductOfferServicePointDataImport\ProductOfferServicePointDataImportConfig;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container): array
    {
        $commands = [
            // ...
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . ProductOfferServicePointDataImportConfig::IMPORT_TYPE_PRODUCT_OFFER_SERVICE),
        ];

        return $commands;
    }
}
```

5. Import data:

```bash
console data:import:product-offer-service
```

{% info_block warningBox "Verification" %}

Make sure that entities were imported to the following database tables respectively:

- `spy_service_point`
- `spy_service_point_store`
- `spy_service_point_address`
- `spy_service_type`
- `spy_service`
- `spy_product_offer_service`

{% endinfo_block %}

### 4) Add translations

1. Append the glossary according to your configuration:

```csv
product_offer_service_point.validation.product_offer_reference_not_found,Product offer '%product_offer_reference%' not found.,en_US
product_offer_service_point.validation.product_offer_reference_not_found,Product offer '%product_offer_reference%' nicht gefunden.,de_DE
product_offer_service_point.validation.product_offer_has_multiple_service_points,Product offer '%product_offer_reference%' can have only one service point.,en_US
product_offer_service_point.validation.product_offer_has_multiple_service_points,Das Product Offer '%product_offer_reference%' kann nur einen Service Point haben.,de_DE
product_offer_service_point.validation.service_uuid_not_found,Services with uuids '%service_uuids%' not found.,en_US
product_offer_service_point.validation.service_uuid_not_found,Services mit den uuids '%service_uuids%' wurde nicht gefunden.,de_DE
product_offer_service_point.validation.service_not_unique,A service for product offer '%product_offer_reference%' with the same uuid already exists in request.,de_DE
product_offer_service_point.validation.service_not_unique,Ein Service für Product Offer '%product_offer_reference%' mit derselben UUID ist bereits in der Anfrage vorhanden.,de_DE
product_offer_service_point.validation.product_offer_not_unique,A product offer with the same reference already exists in request.,de_DE
product_offer_service_point.validation.product_offer_not_unique,Ein Product Offer mit der gleichen Referenz liegt bereits in der Anfrage vor.,de_DE
```

2. Import data:

```bash
console data:import glossary
```

### 5) Configure export to key-value storage (Redis or Valkey)

Configure tables to be published and synchronized to the Storage on create, edit, and delete changes.

1. In `src/Pyz/Client/RabbitMq/RabbitMqConfig.php`, adjust the `RabbitMq` module's configuration:

**src/Pyz/Client/RabbitMq/RabbitMqConfig.php**

```php
<?php

namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
use Spryker\Shared\ProductOfferServicePointStorage\ProductOfferServicePointStorageConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     * @return array<mixed>
     */
    protected function getSynchronizationQueueConfiguration(): array
    {
        return [
            ProductOfferServicePointStorageConfig::QUEUE_NAME_SYNC_STORAGE_PRODUCT_OFFER_SERVICE,
        ];
    }
}
```

2. Register new queue message processor:

**src/Pyz/Zed/Queue/QueueDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Queue;

use Spryker\Shared\ProductOfferServicePointStorage\ProductOfferServicePointStorageConfig;
use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;

class QueueDependencyProvider extends SprykerDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface>
     */
    protected function getProcessorMessagePlugins(Container $container): array
    {
        return [
            ProductOfferServicePointStorageConfig::QUEUE_NAME_SYNC_STORAGE_PRODUCT_OFFER_SERVICE => new SynchronizationStorageQueueMessageProcessorPlugin(),
        ];
    }
}
```

3. Configure synchronization pool and event queue name:

**src/Pyz/Zed/ProductOfferServicePointStorage/ProductOfferServicePointStorageConfig.php**

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information,  view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ProductOfferServicePointStorage;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Shared\Publisher\PublisherConfig;
use Spryker\Zed\ProductOfferServicePointStorage\ProductOfferServicePointStorageConfig as SprykerProductOfferServicePointStorageConfig;

class ProductOfferServicePointStorageConfig extends SprykerProductOfferServicePointStorageConfig
{
    /**
     * @return string|null
     */
    public function getProductOfferServiceSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }

    /**
     * @return string|null
     */
    public function getEventQueueName(): ?string
    {
        return PublisherConfig::PUBLISH_QUEUE;
    }
}
```

4. Set up publisher plugins:

| PLUGIN                                           | SPECIFICATION                                                                                         | PREREQUISITES | NAMESPACE                                                                                      |
|--------------------------------------------------|-------------------------------------------------------------------------------------------------------|---------------|------------------------------------------------------------------------------------------------|
| ProductOfferWritePublisherPlugin                 | Publishes product offer services data by `SpyProductOffer` entity events.                             |               | Spryker\Zed\ProductOfferServicePointStorage\Communication\Plugin\Publisher\ProductOffer        |
| ProductOfferServiceWriteByPublishPublisherPlugin | Publishes product offer service data by `SpyProductOfferService` publish events.                      |               | Spryker\Zed\ProductOfferServicePointStorage\Communication\Plugin\Publisher\ProductOfferService |
| ProductOfferServiceWritePublisherPlugin          | Publishes product offer service data by `SpyProductOfferService` entity events.                       |               | Spryker\Zed\ProductOfferServicePointStorage\Communication\Plugin\Publisher\ProductOfferService |
| ProductOfferStoreWritePublisherPlugin            | Publishes product offer services data by `SpyProductOfferStore` entity events.                        |               | Spryker\Zed\ProductOfferServicePointStorage\Communication\Plugin\Publisher\ProductOfferStore   |
| ServiceWritePublisherPlugin                      | Publishes product offer services data by `SpyService` entity events.                                  |               | Spryker\Zed\ProductOfferServicePointStorage\Communication\Plugin\Publisher\Service             |
| ServicePointWritePublisherPlugin                 | Publishes product offer services data by `SpyServicePoint` entity events.                             |               | Spryker\Zed\ProductOfferServicePointStorage\Communication\Plugin\Publisher\ServicePoint        |
| ServicePointStoreWritePublisherPlugin            | Publishes product offer services data by `SpyServicePointStore` entity events.                        |               | Spryker\Zed\ProductOfferServicePointStorage\Communication\Plugin\Publisher\ServicePointStore   |
| ProductOfferServicePublisherTriggerPlugin        | Allows to populate product offer service storage table with data and trigger further export to key-value storage (Redis or Valkey). |               | Spryker\Zed\ProductOfferServicePointStorage\Communication\Plugin\Publisher                     |

<details>
<summary>src/Pyz/Zed/Publisher/PublisherDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\ProductOfferServicePointStorage\Communication\Plugin\Publisher\ProductOffer\ProductOfferWritePublisherPlugin as ProductOfferServiceProductOfferWritePublisherPlugin;
use Spryker\Zed\ProductOfferServicePointStorage\Communication\Plugin\Publisher\ProductOfferService\ProductOfferServiceWriteByPublishPublisherPlugin;
use Spryker\Zed\ProductOfferServicePointStorage\Communication\Plugin\Publisher\ProductOfferService\ProductOfferServiceWritePublisherPlugin;
use Spryker\Zed\ProductOfferServicePointStorage\Communication\Plugin\Publisher\ProductOfferServicePublisherTriggerPlugin;
use Spryker\Zed\ProductOfferServicePointStorage\Communication\Plugin\Publisher\ProductOfferStore\ProductOfferStoreWritePublisherPlugin as ProductOfferServiceProductOfferStoreWritePublisherPlugin;
use Spryker\Zed\ProductOfferServicePointStorage\Communication\Plugin\Publisher\Service\ServiceWritePublisherPlugin as ProductOfferServiceServiceWritePublisherPlugin;
use Spryker\Zed\ProductOfferServicePointStorage\Communication\Plugin\Publisher\ServicePoint\ServicePointWritePublisherPlugin as ProductOfferServiceServicePointWritePublisherPlugin;
use Spryker\Zed\ProductOfferServicePointStorage\Communication\Plugin\Publisher\ServicePointStore\ServicePointStoreWritePublisherPlugin as ProductOfferServiceServicePointStoreWritePublisherPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array
     */
    protected function getPublisherPlugins(): array
    {
        return array_merge(
            $this->getProductOfferServicePointStoragePlugins(),
        );
    }

    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface>
     */
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            new ProductOfferServicePublisherTriggerPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getProductOfferServicePointStoragePlugins(): array
    {
        return [
            new ProductOfferServiceWritePublisherPlugin(),
            new ProductOfferServiceWriteByPublishPublisherPlugin(),
            new ProductOfferServiceProductOfferWritePublisherPlugin(),
            new ProductOfferServiceProductOfferStoreWritePublisherPlugin(),
            new ProductOfferServiceServiceWritePublisherPlugin(),
            new ProductOfferServiceServicePointWritePublisherPlugin(),
            new ProductOfferServiceServicePointStoreWritePublisherPlugin(),
        ];
    }
}
```

</details>

5. Set up synchronization plugins:

| PLUGIN                                                     | SPECIFICATION                                                                    | PREREQUISITES | NAMESPACE                                                                        |
|------------------------------------------------------------|----------------------------------------------------------------------------------|---------------|----------------------------------------------------------------------------------|
| ProductOfferServiceSynchronizationDataBulkRepositoryPlugin | Allows synchronizing the product offer service storage table content into key-value storage (Redis or Valkey). |               | Spryker\Zed\ProductOfferServicePointStorage\Communication\Plugin\Synchronization |

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\ProductOfferServicePointStorage\Communication\Plugin\Synchronization\ProductOfferServiceSynchronizationDataBulkRepositoryPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface>
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new ProductOfferServiceSynchronizationDataBulkRepositoryPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the `product-offer-service` trigger plugin works correctly:

1. Fill the `spy_product_offer_service` table with data.
2. Run the `console publish:trigger-events -r product_offer_service` command.
3. Make sure that the `spy_product_offer_service_storage` table has been filled with respective data.
4. Make sure that, in your system, storage entries are displayed with `kv:product_offer_service:{store}:{product_offer_reference}` mask.

Make sure that the `product-offer-service` synchronization plugin works correctly:

1. Fill the `spy_product_offer_service_storage` table with some data.
2. Run the `console sync:data -r product_offer_service` command.
3. Make sure that, in your system, storage entries are displayed with the `kv:product_offer_service:{store}:{product_offer_reference}` mask.

Make sure when a product offer service is created via DataImport, it's exported to key-value storage (Redis or Valkey) accordingly.

Make sure that, in key-value storage (Redis or Valkey), data is displayed in the following format:

```yaml
{
    "productOfferReference": "offer1",
    "servicePointUuid": "262feb9d-33a7-5c55-9b04-45b1fd22067e",
    "serviceUuids": ["f34c6ee7-8c73-4542-a621-846d91fafa56", "f34c6ee7-8c73-4542-a621-846d91fafa56", "f34c6ee7-8c73-4542-a621-846d91fafa56"],
    "_timestamp": 1683216744.8334839
}
```

{% endinfo_block %}

### 7) Set up behavior

To expand product offers with services, register the plugins:

| PLUGIN                                   | SPECIFICATION                                                           | PREREQUISITES | NAMESPACE                                                                    |
|------------------------------------------|-------------------------------------------------------------------------|---------------|------------------------------------------------------------------------------|
| ServiceProductOfferPostCreatePlugin      | Creates the product offer service entities.                             |               | Spryker\Zed\ProductOfferServicePoint\Communication\Plugin\ProductOffer       |
| ServiceProductOfferPostUpdatePlugin      | Updates the product offer service entities.                             |               | Spryker\Zed\ProductOfferServicePoint\Communication\Plugin\ProductOffer       |
| ServiceProductOfferExpanderPlugin        | Expands product offer transfers with services.                           |               | Spryker\Zed\ProductOfferServicePoint\Communication\Plugin\ProductOffer       |
| ServiceProductOfferStorageExpanderPlugin | Expands product offer storage transfers with services from the storage. |               | Spryker\Client\ProductOfferServicePointStorage\Plugin\ProductOfferStorage    |
| ServiceProductOfferViewSectionPlugin     | Expands the product offer view section with services.                   |               | Spryker\Zed\ProductOfferServicePointGui\Communication\Plugin\ProductOfferGui |

<details>
<summary>src/Pyz/Zed/ProductOffer/ProductOfferDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\ProductOffer;

use Spryker\Zed\ProductOffer\ProductOfferDependencyProvider as SprykerProductOfferDependencyProvider;
use Spryker\Zed\ProductOfferServicePoint\Communication\Plugin\ProductOffer\ServiceProductOfferExpanderPlugin;
use Spryker\Zed\ProductOfferServicePoint\Communication\Plugin\ProductOffer\ServiceProductOfferPostCreatePlugin;
use Spryker\Zed\ProductOfferServicePoint\Communication\Plugin\ProductOffer\ServiceProductOfferPostUpdatePlugin;

class ProductOfferDependencyProvider extends SprykerProductOfferDependencyProvider
{
        /**
     * @return array<\Spryker\Zed\ProductOfferExtension\Dependency\Plugin\ProductOfferPostCreatePluginInterface>
     */
    protected function getProductOfferPostCreatePlugins(): array
    {
        return [
            ...
            new ServiceProductOfferPostCreatePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductOfferExtension\Dependency\Plugin\ProductOfferPostUpdatePluginInterface>
     */
    protected function getProductOfferPostUpdatePlugins(): array
    {
        return [
            ...
            new ServiceProductOfferPostUpdatePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductOfferExtension\Dependency\Plugin\ProductOfferExpanderPluginInterface>
     */
    protected function getProductOfferExpanderPlugins(): array
    {
        return [
            ...
            new ServiceProductOfferExpanderPlugin(),
        ];
    }
}
```

</details>

**src/Pyz/Client/ProductOfferStorage/ProductOfferStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\ProductOfferStorage;

use Spryker\Client\ProductOfferServicePointStorage\Plugin\ProductOfferStorage\ServiceProductOfferStorageExpanderPlugin;
use Spryker\Client\ProductOfferStorage\ProductOfferStorageDependencyProvider as SprykerProductOfferStorageDependencyProvider;

class ProductOfferStorageDependencyProvider extends SprykerProductOfferStorageDependencyProvider
{
    /**
     * @return array<\Spryker\Client\ProductOfferStorageExtension\Dependency\Plugin\ProductOfferStorageExpanderPluginInterface>
     */
    protected function getProductOfferStorageExpanderPlugins(): array
    {
        return [
            new ServiceProductOfferStorageExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/ProductOfferGui/ProductOfferGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductOfferGui;

use Spryker\Zed\ProductOfferServicePointGui\Communication\Plugin\ProductOfferGui\ServiceProductOfferViewSectionPlugin;

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
3. Scroll down the page and make sure the **SERVICES** pane is displayed.

{% endinfo_block %}
