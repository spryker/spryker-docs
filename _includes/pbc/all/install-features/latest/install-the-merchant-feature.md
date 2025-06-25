

This document describes how to install the Merchant feature.

## Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|-|-|-|
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/merchant
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                  | EXPECTED DIRECTORY                       |
|-------------------------|------------------------------------------|
| Merchant                | spryker/merchant                         |
| MerchantDataImport      | spryker/merchant-data-import             |
| MerchantGui             | spryker/merchant-gui                     |
| MerchantSearch          | spryker/merchant-search                  |
| MerchantSearchExtension | vendor/spryker/merchant-search-extension |
| MerchantStorage         | spryker/merchant-storage                 |


{% endinfo_block %}

## 2) Set up the database schema and transfer objects

1. Adjust the schema definition so entity changes trigger events:

**src/Pyz/Zed/MerchantSearch/Persistence/Propel/Schema/spy_merchant_search.schema.xml**

```xml
<?xml version="1.0"?>
  <database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd" name="zed"
            namespace="Orm\Zed\MerchantSearch\Persistence"
            package="src.Orm.Zed.MerchantSearch.Persistence">

      <table name="spy_merchant_search">
          <behavior name="synchronization">
              <parameter name="queue_pool" value="synchronizationPool"/>
          </behavior>
      </table>

  </database>

```

2. Apply database changes, generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in the database:

| DATABASE SECURITY    | TYPE | EVENT |
|----------------------|-|-|
| spy_merchant         | table | created |
| spy_merchant_store   | table | created |
| spy_merchant_storage | table | created |
| spy_merchant_search  | table | created |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure the following changes have occurred in transfer objects:

| TRANSFER                        | TYPE      | EVENT | PATH                                                                  |
|---------------------------------|-----------|-|-----------------------------------------------------------------------|
| Merchant                        | class     | Created | src/Generated/Shared/Transfer/Merchant                                |
| MerchantCriteria                | class     | Created | src/Generated/Shared/Transfer/MerchantCriteria                        |
| MerchantResponse                | class     | Created | src/Generated/Shared/Transfer/MerchantResponse                        |
| MerchantCollection              | class     | Created | src/Generated/Shared/Transfer/MerchantCollection                      |
| MerchantError                   | class     | Created | src/Generated/Shared/Transfer/MerchantError                           |
| MerchantSearch                  | class     | Created | src/Generated/Shared/Transfer/MerchantSearchTransfer                  |
| MerchantSearchCollection        | class     | Created | src/Generated/Shared/Transfer/MerchantSearchCollection                |
| MerchantSearchRequest           | class     | Created | src/Generated/Shared/Transfer/MerchantSearchRequest                   |
| MerchantStorage                 | class     | Created | src/Generated/Shared/Transfer/MerchantStorage                         |
| MerchantStorageProfile          | class     | Created | src/Generated/Shared/Transfer/MerchantStorageProfile                  |
| MerchantStorageProfileAddress   | class     | Created | src/Generated/Shared/Transfer/MerchantStorageProfileAddress           |
| MerchantStorageCriteria         | class     | Created | src/Generated/Shared/Transfer/MerchantStorageCriteria                 |
| MerchantStorageProfile          | class     | Created | src/Generated/Shared/Transfer/MerchantStorageProfile                  |
| DataImporterReaderConfiguration | class     | created | src/Generated/Shared/Transfer/DataImporterReaderConfigurationTransfer |
| SpyMerchantEntity               | class     | Created | src/Generated/Shared/Transfer/SpyMerchantEntityTransfer               |
| SpyMerchantStoreEntity          | class     | Created | src/Generated/Shared/Transfer/SpyMerchantStoreEntityTransfer          |
| SpyMerchantSearchEntity         | class     | Created | src/Generated/Shared/Transfer/SpyMerchantSearchEntityTransfer         |
| SpyMerchantStorageEntity        | class     | Created | src/Generated/Shared/Transfer/SpyMerchantStorageEntityTransfer        |


{% endinfo_block %}

## 3) Add Zed translations

Generate a new translation cache for Zed:

```bash
console translator:generate-cache
```

## 4) Import merchants data

1. Prepare data according to your requirements using the demo data:

**data/import/common/common/marketplace/merchant.csv**

```php
merchant_reference,merchant_name,registration_number,status,email,is_active,url.de_DE,url.en_US
MER000006,Sony Experts,HYY 134306,approved,michele@sony-experts.com,1,/de/merchant/sony-experts,/en/merchant/sony-experts
MER000005,Budget Cameras,HXX 134305,approved,jason.weidmann@budgetcamerasonline.com,1,/de/merchant/budget-cameras,/en/merchant/budget-cameras
MER000004,Impala Merchant,3,waiting-for-approval,impala.merchant@merchant.kudu,0,/en/merchant/impala-merchant-1,/de/merchant/impala-merchant-1
MER000003,Sugar Monster,4,waiting-for-approval,sugar.monster@merchant.kudu,0,/de/merchant/sugar-monster,/en/merchant/sugar-monster
MER000007,Restrictions Merchant,5,waiting-for-approval,restrictions.merchant@merchant.kudu,0,/de/merchant/restrictions-merchant,/en/merchant/restrictions-merchant
MER000001,Spryker,HRB 134310,approved,harald@spryker.com,1,/de/merchant/spryker,/en/merchant/spryker
MER000002,Video King,1234.4567,approved,martha@video-king.nl,1,/de/merchant/video-king,/en/merchant/video-king
```

| COLUMN | REQUIRED | DATA TYPE | DATA TYPE | DATA EXPLANATION |
|-|-|-|-|-|
| merchant_reference | &check; | string | MER000006 | Non-database identifier for a merchant. |
| merchant_name | &check; | string | Sony Experts | Merchant profile page URL for the de_DE locale. |
| registration_number |  | string | HYY 134306 | Official registration number as a legal entity of the merchant. |
| status | &check; | string | approved | Status of the merchant in the system. A status pseudo state machine can be configured to allow for transitions, but this is the initial status for a merchant while importing. |
| email | &check; | string | michele@sony-experts.com | Email to contact the merchant. |
| is_active |  | boolean | 1 | Defines if the merchant is active. |
| url | optional(per locale) | string | /de/merchant/sony-experts | Unique Storefront identifier for a merchant's page. |

**data/import/common/common/marketplace/merchant_store.csv**

```csv
merchant_reference,store_name
MER000001,DE
MER000002,DE
MER000006,DE
MER000005,DE
MER000004,DE
MER000003,DE
MER000007,DE
```

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
|-|-|-|-|-|
| merchant_reference | &check; | string | MER000006 | Merchant identifier. |
| store_name | &check; | string | DE | Store name to which the merchant will be assigned. |

2. Register the following plugins to enable data import:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantDataImportPlugin | Imports merchant data into the database. |  | Spryker\Zed\MerchantDataImport\Communication\Plugin\MerchantDataImportPlugin |
| MerchantStoreDataImportPlugin | Imports merchant store assignments into the database. | MerchantDataImportPlugin | Spryker\Zed\MerchantDataImport\Communication\Plugin\MerchantStoreDataImportPlugin |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\MerchantDataImport\Communication\Plugin\MerchantDataImportPlugin;
use Spryker\Zed\MerchantDataImport\Communication\Plugin\MerchantStoreDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    protected function getDataImporterPlugins(): array
    {
        return [
            new MerchantDataImportPlugin(),
            new MerchantStoreDataImportPlugin(),
        ];
    }
}
```

3. Import data:

```bash
console data:import merchant
console data:import merchant-store
```

{% info_block warningBox "Verification" %}

Make sure that the data has been added to the `spy_merchant` and `spy_merchant_store` tables.

{% endinfo_block %}

## 5) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| StoreRelationToggleFormTypePlugin | Adds the store relation toggle form to the MerchantGui Merchant creation and editing forms. |  | Spryker\Zed\Store\Communication\Plugin\Form\StoreRelationToggleFormTypePlugin |

**current/src/Pyz/Zed/MerchantGui/MerchantGuiDependencyProvider.php**

```php
<?php

/**
 * This file is part of the Spryker Commerce OS.
 * For full license information,  view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\MerchantGui;

use Spryker\Zed\Kernel\Communication\Form\FormTypeInterface;
use Spryker\Zed\MerchantGui\MerchantGuiDependencyProvider as SprykerMerchantGuiDependencyProvider;
use Spryker\Zed\Store\Communication\Plugin\Form\StoreRelationToggleFormTypePlugin;

class MerchantGuiDependencyProvider extends SprykerMerchantGuiDependencyProvider
{
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

Make sure that the merchant edit and create forms contain a **Store** toggle form.

{% endinfo_block %}

## 7) Configure export to Redis and Elasticsearch

This step publishes tables on change (create, edit) to `spy_merchant_profile_storage` and synchronizes data to Storage.

### Configure export to Redis

1. Set up event listeners and publishers:

| PLUGIN                                    | SPECIFICATION                                                                                                                           | PREREQUISITES                                                         | NAMESPACE                                                                                          |
|-------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| MerchantPublisherTriggerPlugin            | Registers the publishers that publish merchant entity changes to the storage.                                                               |                                                                       | Spryker\Zed\MerchantStorage\Communication\Plugin\Publisher\MerchantPublisherTriggerPlugin          |
| MerchantStoragePublisherPlugin            | Publishes merchant data to the `spy_merchant_storage` table.                                                                            |                                                                       | Spryker\Zed\MerchantStorage\Communication\Plugin\Publisher\Merchant\MerchantStoragePublisherPlugin |
| MerchantProductOfferStorageExpanderPlugin | Returns the `ProductOfferStorage` transfer object expanded with `Merchant`.                                                             |                                                                       | Spryker\Client\MerchantStorage\Plugin\ProductOfferStorage                                          |
| MerchantProductOfferStorageFilterPlugin   | Filters the `ProductOfferCollection` transfer object by an active and approved merchant.                                                |                                                                       | Spryker\Zed\MerchantStorage\Communication\Plugin\ProductOfferStorage                               |
| UrlStorageMerchantMapperPlugin            | Provides access to merchant storage data in the controller related to the `https://mysprykershop.com/merchant/{merchantReference}` URL. | Publish URL storage data to Redis by running `console sync:data url`. | Spryker\Client\MerchantStorage\Plugin                                                              |

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;
use Spryker\Zed\MerchantStorage\Communication\Plugin\Publisher\MerchantPublisherTriggerPlugin;
use Spryker\Zed\MerchantStorage\Communication\Plugin\Publisher\Merchant\MerchantStoragePublisherPlugin;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
   /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getPublisherPlugins(): array
    {
        return [
            new MerchantStoragePublisherPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface>
     */
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            new MerchantPublisherTriggerPlugin(),
        ];
    }
}
```

**src/Pyz/Client/ProductOfferStorage/ProductOfferStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\ProductOfferStorage;

use Spryker\Client\MerchantStorage\Plugin\ProductOfferStorage\MerchantProductOfferStorageExpanderPlugin;
use Spryker\Client\ProductOfferStorage\ProductOfferStorageDependencyProvider as SprykerProductOfferStorageDependencyProvider;

class ProductOfferStorageDependencyProvider extends SprykerProductOfferStorageDependencyProvider
{
    /**
     * @return array<\Spryker\Client\ProductOfferStorageExtension\Dependency\Plugin\ProductOfferStorageExpanderPluginInterface>
     */
    protected function getProductOfferStorageExpanderPlugins(): array
    {
        return [
            new MerchantProductOfferStorageExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/ProductOfferStorage/ProductOfferStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductOfferStorage;

use Spryker\Zed\MerchantStorage\Communication\Plugin\ProductOfferStorage\MerchantProductOfferStorageFilterPlugin;
use Spryker\Zed\ProductOfferStorage\ProductOfferStorageDependencyProvider as SprykerProductOfferStorageDependencyProvider;

class ProductOfferStorageDependencyProvider extends SprykerProductOfferStorageDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductOfferStorageExtension\Dependency\Plugin\ProductOfferStorageFilterPluginInterface>
     */
    protected function getProductOfferStorageFilterPlugins(): array
    {
        return [
            new MerchantProductOfferStorageFilterPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that, when you retrieve a product offer from storage, you can see the merchant transfer property.

{% endinfo_block %}


**src/Pyz/Client/UrlStorage/UrlStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\UrlStorage;

use Spryker\Client\MerchantStorage\Plugin\UrlStorageMerchantMapperPlugin;
use Spryker\Client\UrlStorage\UrlStorageDependencyProvider as SprykerUrlDependencyProvider;

class UrlStorageDependencyProvider extends SprykerUrlDependencyProvider
{
    /**
     * @return array<\Spryker\Client\UrlStorage\Dependency\Plugin\UrlStorageResourceMapperPluginInterface>
     */
    protected function getUrlStorageResourceMapperPlugins()
    {
        return [
            new UrlStorageMerchantMapperPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure the merchant page is accessible at `https://mysprykershop/de/merchant/spryker`.

{% endinfo_block %}

2. Register synchronization and synchronization error queues:

**src/Pyz/Client/RabbitMq/RabbitMqConfig.php**

```php
<?php

namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
use Spryker\Shared\MerchantStorage\MerchantStorageConfig;

/**
 * @SuppressWarnings(PHPMD.CouplingBetweenObjects)
 */
class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     *  QueueNameFoo, // Queue => QueueNameFoo, (Queue and error queue will be created: QueueNameFoo and QueueNameFoo.error)
     *  QueueNameBar => [
     *       RoutingKeyFoo => QueueNameBaz, // (Additional queues can be defined by several routing keys)
     *   ],
     *
     * @see https://www.rabbitmq.com/tutorials/amqp-concepts.html
     *
     * @return array
     */
    protected function getQueueConfiguration(): array
    {
        return [        
            MerchantStorageConfig::MERCHANT_SYNC_STORAGE_QUEUE,
        ];
    }
}

```

3. Configure message processors:

| PLUGIN                                            | SPECIFICATION                                                                                                        | PREREQUISITES | NAMESPACE                                              |
|---------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|---------------|--------------------------------------------------------|
| SynchronizationStorageQueueMessageProcessorPlugin | Configures all merchant profile messages to synchronize with Redis and marks messages as failed in case of an error. |               | Spryker\Zed\Synchronization\Communication\Plugin\Queue |

**src/Pyz/Zed/MerchantStorage/MerchantStorageConfig.php**

```php
<?php

namespace Pyz\Zed\MerchantStorage;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Zed\MerchantStorage\MerchantStorageConfig as BaseMerchantStorageConfig;

class MerchantStorageConfig extends BaseMerchantStorageConfig
{
    /**
     * @return string|null
     */
    public function getMerchantSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }
}
```

**src/Pyz/Zed/Queue/QueueDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Queue;

use Spryker\Shared\MerchantStorage\MerchantStorageConfig;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;
use Spryker\Zed\Synchronization\Communication\Plugin\Queue\SynchronizationSearchQueueMessageProcessorPlugin;

class QueueDependencyProvider extends SprykerDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface>
     */
    protected function getProcessorMessagePlugins(Container $container)
    {
        return [
            MerchantStorageConfig::MERCHANT_SYNC_STORAGE_QUEUE => new SynchronizationStorageQueueMessageProcessorPlugin(),
        ];
    }
}
```

4. Set up regenerate and resync features:

| PLUGIN                            | SPECIFICATION                                                                   | PREREQUISITES | NAMESPACE                                                        |
|-----------------------------------|---------------------------------------------------------------------------------|---------------|------------------------------------------------------------------|
| MerchantSynchronizationDataPlugin | Enables the content of an entire storage table to be synchronized into Storage. |               | Spryker\Zed\MerchantStorage\Communication\Plugin\Synchronization |

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\MerchantStorage\Communication\Plugin\Synchronization\MerchantSynchronizationDataPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface>
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new MerchantSynchronizationDataPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that, when merchant profile entities are created or updated through ORM, they are exported to Redis accordingly.

{% endinfo_block %}


#### Configure export to Elastica

This step publishes tables on change (create, edit) to `spy_merchant_search` and synchronizes the data to Search.

1. Set up event listeners and publishers by registering the plugins:

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;
use Spryker\Zed\MerchantSearch\Communication\Plugin\Publisher\Merchant\MerchantWritePublisherPlugin;
use Spryker\Zed\MerchantSearch\Communication\Plugin\Publisher\Merchant\MerchantDeletePublisherPlugin;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
   /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getPublisherPlugins(): array
    {
        return [
            new MerchantWritePublisherPlugin(),
            new MerchantDeletePublisherPlugin(),
        ];
    }
}
```

2. Register a synchronization queue:

**src/Pyz/Client/RabbitMq/RabbitMqConfig.php**

```php
<?php

namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
use Spryker\Shared\MerchantSearch\MerchantSearchConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     * @return array
     */
    protected function getQueueConfiguration(): array
    {
        return [
            MerchantSearchConfig::SYNC_SEARCH_MERCHANT,
        ];
    }
}
```

3. Configure message processors:

| PLUGIN                                           | SPECIFICATION                                                                                               | PREREQUISITES | NAMESPACE                                              |
|--------------------------------------------------|-------------------------------------------------------------------------------------------------------------|---------------|--------------------------------------------------------|
| SynchronizationSearchQueueMessageProcessorPlugin | Configures merchant messages to sync with the Elastica search and marks messages as failed in case of an error. |               | Spryker\Zed\Synchronization\Communication\Plugin\Queue |

**src/Pyz/Zed/Queue/QueueDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Queue;

use Spryker\Shared\MerchantSearch\MerchantSearchConfig;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;
use Spryker\Zed\Synchronization\Communication\Plugin\Queue\SynchronizationSearchQueueMessageProcessorPlugin;

class QueueDependencyProvider extends SprykerDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface>
     */
    protected function getProcessorMessagePlugins(Container $container)
    {
        return [
            MerchantSearchConfig::SYNC_SEARCH_MERCHANT => new SynchronizationSearchQueueMessageProcessorPlugin(),
        ];
    }
}
```

4. Set up regenerate and resync features:

| PLUGIN                                          | SPECIFICATION                                             | PREREQUISITES | NAMESPACE                                                       |
|-------------------------------------------------|-----------------------------------------------------------|---------------|-----------------------------------------------------------------|
| MerchantSynchronizationDataBulkRepositoryPlugin | Syncs the entire search table content into Search. |               | Spryker\Zed\MerchantSearch\Communication\Plugin\Synchronization |

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\MerchantSearch\Communication\Plugin\Synchronization\MerchantSynchronizationDataBulkRepositoryPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface>
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new MerchantSynchronizationDataBulkRepositoryPlugin(),
        ];
    }
}
```

5. Configure a synchronization pool name:

**src/Pyz/Zed/MerchantSearch/MerchantSearchConfig.php**

```php
<?php

namespace Pyz\Zed\MerchantSearch;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Zed\MerchantSearch\MerchantSearchConfig as SprykerMerchantSearchConfig;

class MerchantSearchConfig extends SprykerMerchantSearchConfig
{
    /**
     * @return string|null
     */
    public function getMerchantSearchSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }
}
```

6. Set up result formatters:

| PLUGIN                              | SPECIFICATION                                                         | PREREQUISITES | NAMESPACE                                                           |
|-------------------------------------|-----------------------------------------------------------------------|---------------|---------------------------------------------------------------------|
| MerchantSearchResultFormatterPlugin | Maps raw data from Elasticsearch to `MerchantSearchCollectionTransfer`. |               |  Spryker\Client\MerchantSearch\Plugin\Elasticsearch\ResultFormatter |

**src/Pyz/Client/MerchantSearch/MerchantSearchDependencyProvider.php**

```php
<?php

namespace Pyz\Client\MerchantSearch;

use Spryker\Client\MerchantSearch\MerchantSearchDependencyProvider as SprykerMerchantSearchDependencyProvider;
use Spryker\Client\MerchantSearch\Plugin\Elasticsearch\ResultFormatter\MerchantSearchResultFormatterPlugin;

class MerchantSearchDependencyProvider extends SprykerMerchantSearchDependencyProvider
{
    /**
     * @return array<\Spryker\Client\SearchExtension\Dependency\Plugin\ResultFormatterPluginInterface>
     */
    protected function getMerchantSearchResultFormatterPlugins(): array
    {
        return [
            new MerchantSearchResultFormatterPlugin(),
        ];
    }
}
```

7. Set up query expanders:

| PLUGIN                                     | SPECIFICATION                                                                     | PREREQUISITES | NAMESPACE                                                |
|--------------------------------------------|-----------------------------------------------------------------------------------|---------------|----------------------------------------------------------|
| PaginatedMerchantSearchQueryExpanderPlugin | Allows using pagination for the merchant search.                                      |               | Spryker\Client\MerchantSearch\Plugin\Elasticsearch\Query |
| StoreQueryExpanderPlugin                   | Allows searching to filter out merchants that don't belong to the current store. |               | Spryker\Client\SearchElasticsearch\Plugin\QueryExpander  |

**src/Pyz/Client/MerchantSearch/MerchantSearchDependencyProvider.php**

```php
<?php

namespace Pyz\Client\MerchantSearch;

use Spryker\Client\MerchantSearch\MerchantSearchDependencyProvider as SprykerMerchantSearchDependencyProvider;
use Spryker\Client\MerchantSearch\Plugin\Elasticsearch\Query\PaginatedMerchantSearchQueryExpanderPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\StoreQueryExpanderPlugin;

class MerchantSearchDependencyProvider extends SprykerMerchantSearchDependencyProvider
{
    /**
     * @return array<\Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface>
     */
    protected function getMerchantSearchQueryExpanderPlugins(): array
    {
        return [
            new PaginatedMerchantSearchQueryExpanderPlugin(),
            new StoreQueryExpanderPlugin(),
        ];
    }
}
```

8. Add the `merchant` source to the supported search sources:

**src/Pyz/Shared/SearchElasticsearch/SearchElasticsearchConfig.php**

```php
<?php

namespace Pyz\Shared\SearchElasticsearch;

use Spryker\Shared\SearchElasticsearch\SearchElasticsearchConfig as SprykerSearchElasticsearchConfig;

class SearchElasticsearchConfig extends SprykerSearchElasticsearchConfig
{
    protected const SUPPORTED_SOURCE_IDENTIFIERS = [
        'merchant',
    ];
}
```

{% info_block warningBox "Verification" %}

Make sure that, when merchant entities are created or updated through ORM, they're exported to Elastica accordingly.

| TARGET ENTITY | EXAMPLE OF EXPECTED DATA IDENTIFIER |
|---------------|-------------------------------------|
| Merchant      | merchant:1                          |

{% endinfo_block %}

<details>
<summary>Example of the expected data fragment</summary>

 ```json

 {
  "idMerchant": 1,
  "name": "Sony Experts",
  "registrationNumber": "HYY 134306",
  "email": "michele@sony-experts.com",
  "status": "approved",
  "isActive": true,
  "merchantReference": "MER000006",
  "fkStateMachineProcess": 1,
  "storeRelation": {
    "idEntity": 1,
    "idStores": [
      1
    ],
    "stores": [
      {
        "availableLocaleIsoCodes": [],
        "queuePools": [],
        "storesWithSharedPersistence": [],
        "idStore": 1,
        "name": "DE",
        "defaultCurrencyIsoCode": null,
        "availableCurrencyIsoCodes": [],
        "selectedCurrencyIsoCode": null,
        "timezone": null,
        "countries": []
      }
    ]
  },
  "addressCollection": null,
  "merchantProfile": null,
  "urlCollection": [
    {
      "url": "/de/merchant/sony-experts",
      "resourceType": null,
      "resourceId": null,
      "fkLocale": 46,
      "idUrl": 505,
      "fkResourceCategorynode": null,
      "fkRedirect": null,
      "fkResourcePage": null,
      "fkResourceRedirect": null,
      "fkResourceMerchant": 1,
      "urlPrefix": null,
      "localeName": "de_DE",
      "fkResourceProductAbstract": null,
      "fkResourceProductSet": null,
      "itemType": null,
      "itemId": null,
      "fkProductAbstract": null,
      "fkCategorynode": null,
      "fkPage": null
    },
    {
      "url": "/en/merchant/sony-experts",
      "resourceType": null,
      "resourceId": null,
      "fkLocale": 66,
      "idUrl": 506,
      "fkResourceCategorynode": null,
      "fkRedirect": null,
      "fkResourcePage": null,
      "fkResourceRedirect": null,
      "fkResourceMerchant": 1,
      "urlPrefix": null,
      "localeName": "en_US",
      "fkResourceProductAbstract": null,
      "fkResourceProductSet": null,
      "itemType": null,
      "itemId": null,
      "fkProductAbstract": null,
      "fkCategorynode": null,
      "fkPage": null
    }
  ],
  "categories": [
    {
      "idCategory": 2,
      "categoryKey": "cameras-and-camcorder",
      "isActive": true,
      "isInMenu": true,
      "isClickable": true,
      "isSearchable": true,
      "name": null,
      "url": null,
      "imageName": null,
      "categoryImageName": null,
      "metaTitle": null,
      "metaDescription": null,
      "metaKeywords": null,
      "fkCategoryTemplate": 1,
      "idCmsBlocks": [],
      "categoryNode": null,
      "nodeCollection": null,
      "parentCategoryNode": null,
      "localizedAttributes": [
        {
          "name": "Kameras & Camcorders",
          "url": null,
          "metaTitle": "Kameras & Camcorders",
          "metaDescription": "Kameras & Camcorders",
          "metaKeywords": "Kameras & Camcorders",
          "locale": {
            "idLocale": 46,
            "localeName": "de_DE",
            "name": null,
            "isActive": true
          },
          "image": null
        },
        {
          "name": "Cameras & Camcordersshhhhjjj",
          "url": null,
          "metaTitle": "Cameras & Camcorders",
          "metaDescription": "Cameras & Camcorders",
          "metaKeywords": "Cameras & Camcorders",
          "locale": {
            "idLocale": 66,
            "localeName": "en_US",
            "name": null,
            "isActive": true
          },
          "image": null
        }
      ],
      "extraParents": [],
      "imageSets": []
    }
  ],
  "stocks": [
    {
      "idStock": 7,
      "name": "Sony Experts MER000006 Warehouse 1",
      "isActive": true,
      "storeRelation": null
    }
  ]
}
```

</details>
