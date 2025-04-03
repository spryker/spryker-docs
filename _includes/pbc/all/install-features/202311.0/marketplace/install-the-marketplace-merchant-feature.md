
This document describes how to install the Marketplace Merchant feature.

## Install feature core

Follow the steps below to install the Marketplace Merchant feature core.

### Prerequisites

Install the required features:

| NAME | VERSION |INTEGRATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Merchant | {{page.version}} | [Install the Merchant feature](/docs/pbc/all/merchant-management/{{page.version}}/base-shop/install-and-upgrade/install-the-merchant-feature.html) |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/marketplace-merchant:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| MerchantProfile | vendor/spryker/merchant-profile |
| MerchantProfileDataImport | vendor/spryker/merchant-profile-data-import |
| MerchantProfileGui | vendor/spryker/merchant-profile-gui |
| MerchantSearch | vendor/spryker/merchant-search |
| MerchantSearchExtension | vendor/spryker/merchant-search-extension |
| MerchantUser | vendor/spryker/merchant-user |
| MerchantUserGui |	vendor/spryker/merchant-user-gui |
| MerchantStorage | vendor/spryker/merchant-storage |

{% endinfo_block %}

### 2) Set up database schema and transfer objects

Set up database schema:

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
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have occurred in the database:

| DATABASE ENTITY | TYPE | EVENT |
|---|---|---|
| spy_merchant_storage | table | created |
| spy_merchant_search | table | created |
| spy_merchant_profile | table | created |
| spy_merchant_user | table | created |

{% endinfo_block %}

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have occurred in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
|---|---|---|---|
| MerchantProfileAddress | class | Created | src/Generated/Shared/Transfer/MerchantProfileAddressTransfer |
| MerchantProfileCollection | class | Created | src/Generated/Shared/Transfer/MerchantProfileCollectionTransfer|
| MerchantProfileCriteria | class | Created | src/Generated/Shared/Transfer/MerchantProfileCriteriaTransfer |
| MerchantProfileGlossaryAttributeValues | class | Created | src/Generated/Shared/Transfer/MerchantProfileGlossaryAttributeValuesTransfer |
| MerchantProfileLocalizedGlossaryAttributes | class | Created | src/Generated/Shared/Transfer/MerchantProfileLocalizedGlossaryAttributesTransfer |
| MerchantSearch | class | Created | src/Generated/Shared/Transfer/MerchantSearchTransfer |
| MerchantSearchCollection | class | Created | src/Generated/Shared/Transfer/MerchantSearchCollectionTransfer |
| MerchantUser | class | Created | src/Generated/Shared/Transfer/MerchantUserTransfer |
| MerchantUserCriteria | class | Created | src/Generated/Shared/Transfer/MerchantUserCriteriaTransfer |
| MerchantUserResponse | class | Created | src/Generated/Shared/Transfer/MerchantUserResponseTransfer |
| SpyMerchantProfileEntity | class | Created | src/Generated/Shared/Transfer/SpyMerchantProfileEntityTransfer |
| SpyMerchantSearchEntity | class | Created | src/Generated/Shared/Transfer/SpyMerchantSearchEntityTransfer |
| SpyMerchantStorageEntity |  class | Created | src/Generated/Shared/Transfer/SpyMerchantStorageEntityTransfer |
| SpyMerchantUserEntity | class | Created |src/Generated/Shared/Transfer/SpyMerchantUserEntityTransfer |
| UrlStorage.fkResourceMerchant | property | Created |src/Generated/Shared/Transfer/UrlStorageTransfer |

{% endinfo_block %}


### 3) Add Zed translations

Generate new translation cache for Zed:

```bash
console translator:generate-cache
```

### 4) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                               | DESCRIPTION                                                                                              | PREREQUISITES | NAMESPACE |
|------------------------------------------------------|----------------------------------------------------------------------------------------------------------|---------------|---|
| MerchantProfileExpanderPlugin                        | Expands merchant with profile data.                                                                      |               | Spryker\Zed\MerchantProfile\Communication\Plugin\Merchant |
| MerchantProfileMerchantPostCreatePlugin              | Creates merchant profile on merchant create action.                                                      |               | Spryker\Zed\MerchantProfile\Communication\Plugin\Merchant|
| MerchantProfileMerchantPostUpdatePlugin              | Updates merchant profile on merchant update action.m                                                     |               | Spryker\Zed\MerchantProfile\Communication\Plugin\Merchant |
| MerchantProfileContactPersonFormTabExpanderPlugin    | Adds an extra tab to merchant edit and create forms for editing and creating contact person data.        |               | Spryker\Zed\MerchantProfileGui\Communication\Plugin\MerchantGui\Tabs |
| MerchantProfileFormTabExpanderPlugin                 | Adds an extra tab to merchant edit and create forms for editing and creating merchant profile data.      |               | Spryker\Zed\MerchantProfileGui\Communication\Plugin\MerchantGui\Tabs |
| MerchantProfileLegalInformationFormTabExpanderPlugin | Adds an extra tab to merchant edit and create forms for editing and creating merchant legal information. |               | Spryker\Zed\MerchantProfileGui\Communication\Plugin\MerchantGui\Tabs |
| MerchantProfileFormExpanderPlugin                    | Expands MerchantForm with merchant profile fields.                                                       |               | Spryker\Zed\MerchantProfileGui\Communication\Plugin\MerchantGui |
| SyncMerchantUsersStatusMerchantPostUpdatePlugin      | Updates merchant users status by merchant status on merchant update.                                     |               | Spryker\Zed\MerchantUser\Communication\Plugin\Merchant |
| MerchantUserTabMerchantFormTabExpanderPlugin         | Adds an extra tab to merchant edit and create forms for editing and creating merchant user information.  |               | Spryker\Zed\MerchantUserGui\Communication\Plugin\MerchantGui |
| MerchantUserViewMerchantUpdateFormViewExpanderPlugin | Expands merchant `FormView` with the data for the merchant user tab.                                     |               | Spryker\Zed\MerchantUserGui\Communication\Plugin\MerchantGui |
| MerchantProductOfferStorageExpanderPlugin            | Returns `ProductOfferStorage` transfer object expanded with `Merchant`.                                  |               | Spryker\Client\MerchantStorage\Plugin\ProductOfferStorage |
| MerchantProductOfferStorageFilterPlugin              | Filters `ProductOfferCollection` transfer object by active and approved merchant.                        |               | Spryker\Zed\MerchantStorage\Communication\Plugin\ProductOfferStorage |

<details><summary>src/Pyz/Zed/Merchant/MerchantDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Merchant;

use Spryker\Zed\Merchant\MerchantDependencyProvider as SprykerMerchantDependencyProvider;
use Spryker\Zed\MerchantProfile\Communication\Plugin\Merchant\MerchantProfileExpanderPlugin;
use Spryker\Zed\MerchantProfile\Communication\Plugin\Merchant\MerchantProfileMerchantPostCreatePlugin;
use Spryker\Zed\MerchantProfile\Communication\Plugin\Merchant\MerchantProfileMerchantPostUpdatePlugin;
  use Spryker\Zed\MerchantUser\Communication\Plugin\Merchant\SyncMerchantUsersStatusMerchantPostUpdatePlugin;

class MerchantDependencyProvider extends SprykerMerchantDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\MerchantExtension\Dependency\Plugin\MerchantPostCreatePluginInterface>
     */
    protected function getMerchantPostCreatePlugins(): array
    {
        return [
            new MerchantProfileMerchantPostCreatePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\MerchantExtension\Dependency\Plugin\MerchantPostUpdatePluginInterface>
     */
    protected function getMerchantPostUpdatePlugins(): array
    {
        return [
            new MerchantProfileMerchantPostUpdatePlugin(),
            new SyncMerchantUsersStatusMerchantPostUpdatePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\MerchantExtension\Dependency\Plugin\MerchantExpanderPluginInterface>
     */
    protected function getMerchantExpanderPlugins(): array
    {
        return [
            new MerchantProfileExpanderPlugin(),
        ];
    }
}
```

</details>

{% info_block warningBox "Verification" %}

Make sure that:

* When you create a merchant using `MerchantFacade::createMerchant()`, its profile also gets created.
* When you update a merchant using `MerchantFacade::updateMerchant()`, its profile also gets updated.
* When you fetch a merchant using `MerchantFacade::findOne()`, its profile data also gets fetched.

{% endinfo_block %}

<details><summary>src/Pyz/Zed/MerchantGui/MerchantGuiDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\MerchantGui;

use Spryker\Zed\MerchantGui\MerchantGuiDependencyProvider as SprykerMerchantGuiDependencyProvider;
use Spryker\Zed\MerchantProfileGui\Communication\Plugin\MerchantGui\MerchantProfileFormExpanderPlugin;
use Spryker\Zed\MerchantProfileGui\Communication\Plugin\MerchantGui\Tabs\MerchantProfileContactPersonFormTabExpanderPlugin;
use Spryker\Zed\MerchantProfileGui\Communication\Plugin\MerchantGui\Tabs\MerchantProfileFormTabExpanderPlugin;
use Spryker\Zed\MerchantProfileGui\Communication\Plugin\MerchantGui\Tabs\MerchantProfileLegalInformationFormTabExpanderPlugin;
use Spryker\Zed\MerchantUserGui\Communication\Plugin\MerchantGui\MerchantUserTabMerchantFormTabExpanderPlugin;
use Spryker\Zed\MerchantUserGui\Communication\Plugin\MerchantGui\MerchantUserViewMerchantUpdateFormViewExpanderPlugin;

class MerchantGuiDependencyProvider extends SprykerMerchantGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\MerchantGuiExtension\Dependency\Plugin\MerchantFormExpanderPluginInterface>
     */
    protected function getMerchantFormExpanderPlugins(): array
    {
        return [
            new MerchantProfileFormExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\MerchantGuiExtension\Dependency\Plugin\MerchantFormTabExpanderPluginInterface>
     */
    protected function getMerchantFormTabsExpanderPlugins(): array
    {
        return [
            new MerchantProfileContactPersonFormTabExpanderPlugin(),
            new MerchantProfileFormTabExpanderPlugin(),
            new MerchantProfileLegalInformationFormTabExpanderPlugin(),
            new MerchantUserTabMerchantFormTabExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\MerchantGuiExtension\Dependency\Plugin\MerchantUpdateFormViewExpanderPluginInterface>
     */
    protected function getMerchantUpdateFormViewExpanderPlugins(): array
    {
        return [
            new MerchantUserViewMerchantUpdateFormViewExpanderPlugin(),
        ];
    }

}

```

</details>

{% info_block warningBox "Verification" %}

Make sure that when you edit a merchant in the **Merchants** section of the Back Office, you can see merchant profile related tabs: **Contact Person**, **Merchant Profile**, **Legal Information**, **Merchant User**.

{% endinfo_block %}

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

Make sure that when you retrieve a product offer from storage, you can see merchant transfer property.

{% endinfo_block %}

### 5) Configure navigation

Add marketplace section to `navigation.xml`:

**config/Zed/navigation.xml**

```xml
<?xml version="1.0"?>
<config>
    <marketplace>
        <label>Marketplace</label>
        <title>Marketplace</title>
        <icon>fa-shopping-basket</icon>
        <pages>
            <merchant>
                <label>Merchants</label>
                <title>Merchants</title>
                <bundle>merchant-gui</bundle>
                <controller>list-merchant</controller>
                <action>index</action>
            </merchant>
        </pages>
    </marketplace>
</config>
```

Execute the following command:

```bash
console navigation:build-cache
```

{% info_block warningBox "Verification" %}

Make sure that you can see the **Marketplace** button in the navigation menu of the Back Office.

{% endinfo_block %}

### 6) Configure export to Redis and Elasticsearch

This step publishes tables on change (create, edit) to `spy_merchant_profile_storage` and synchronizes data to Storage.

#### Configure export to Redis

1. Set up event listeners and publishers:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| MerchantPublisherTriggerPlugin | Registers the publishers that publish merchant entity changes to storage. |   | Spryker\Zed\MerchantStorage\Communication\Plugin\Publisher\MerchantPublisherTriggerPlugin |
| MerchantStoragePublisherPlugin | Publishes merchant data to the `spy_merchant_storage` table. |   | Spryker\Zed\MerchantStorage\Communication\Plugin\Publisher\Merchant\MerchantStoragePublisherPlugin |

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

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| SynchronizationStorageQueueMessageProcessorPlugin | Configures all merchant profile messages to synchronize with Redis and marks messages as failed in case of an error. |   | Spryker\Zed\Synchronization\Communication\Plugin\Queue |

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

4. Set up re-generate and re-sync features:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| MerchantSynchronizationDataPlugin | Enables the content of an entire storage table to be synchronized into Storage. |   | Spryker\Zed\MerchantStorage\Communication\Plugin\Synchronization |

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

Make sure that when merchant profile entities are created or updated through ORM, they are exported to Redis accordingly.

{% endinfo_block %}


##### Configure export to Elastica

This step publishes tables on change (create, edit) to `spy_merchant_search` and synchronizes the data to Search.

1. Setup event listeners and publishers by registering the plugins:

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

2. Register synchronization queue:

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

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| SynchronizationSearchQueueMessageProcessorPlugin | Configures merchant messages to sync with Elastica search and marks messages as failed in case of an error. |   | Spryker\Zed\Synchronization\Communication\Plugin\Queue |

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

4. Setup re-generate and re-sync features:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| MerchantSynchronizationDataBulkRepositoryPlugin | Synchronizes the entire search table content into Search. |   | Spryker\Zed\MerchantSearch\Communication\Plugin\Synchronization |

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

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| MerchantSearchResultFormatterPlugin | Maps raw data from Elasticsearch to MerchantSearchCollectionTransfer.    | Spryker\Client\MerchantSearch\Plugin\Elasticsearch\ResultFormatter |

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

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|----|----|----|----|
| PaginatedMerchantSearchQueryExpanderPlugin | Allows using pagination for merchant search. |   | Spryker\Client\MerchantSearch\Plugin\Elasticsearch\Query |
| StoreQueryExpanderPlugin | Allows searching to filter out merchants that do not belong to the current store. |   | Spryker\Client\SearchElasticsearch\Plugin\QueryExpander |

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

8. Add the `merchant` resource to the supported search sources:

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

Make sure that when merchant entities are created or updated through ORM, they are exported to Elastica accordingly.

| TARGET ENTITY | EXAMPLE OF EXPECTED DATA IDENTIFIER |
|---|---|
| Merchant | merchant:1 |

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
  "merchantProfile": {
    "idMerchantProfile": 3,
    "contactPersonRole": "Brand Manager",
    "contactPersonTitle": "Ms",
    "contactPersonFirstName": "Michele",
    "contactPersonLastName": "Nemeth",
    "contactPersonPhone": "030/123456789",
    "logoUrl": "https://d2s0ynfc62ej12.cloudfront.net/merchant/sonyexperts-logo.png",
    "publicEmail": "support@sony-experts.com",
    "publicPhone": "+49 30 234567691",
    "descriptionGlossaryKey": "merchant.description_glossary_key.1",
    "bannerUrlGlossaryKey": "merchant.banner_url_glossary_key.1",
    "deliveryTimeGlossaryKey": "merchant.delivery_time_glossary_key.1",
    "termsConditionsGlossaryKey": "merchant.terms_conditions_glossary_key.1",
    "cancellationPolicyGlossaryKey": "merchant.cancellation_policy_glossary_key.1",
    "imprintGlossaryKey": "merchant.imprint_glossary_key.1",
    "dataPrivacyGlossaryKey": "merchant.data_privacy_glossary_key.1",
    "fkMerchant": 1,
    "merchantName": "Sony Experts",
    "latitude": "11.547788",
    "longitude": "48.131058",
    "faxNumber": "+49 30 234567600",
    "merchantReference": "MER000006",
    "bannerUrl": null,
    "addressCollection": {
      "addresses": [
        {
          "idMerchantProfileAddress": 3,
          "fkCountry": 60,
          "countryName": "Germany",
          "address1": "Matthias-Pschorr-Straße",
          "address2": "1",
          "address3": "",
          "city": "München",
          "zipCode": "80336",
          "email": null,
          "fkMerchantProfile": 3
        }
      ]
    },
    "merchantProfileLocalizedGlossaryAttributes": []
  },
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

### 7) Import data

To import data:

1. Prepare merchant profile data according to your requirements using the demo data:

<details>
<summary>/data/import/common/common/marketplace/merchant_profile.csv</summary>

```
merchant_reference,contact_person_role,contact_person_title,contact_person_first_name,contact_person_last_name,contact_person_phone,banner_url,logo_url,public_email,public_phone,description_glossary_key.en_US,description_glossary_key.de_DE,banner_url_glossary_key.en_US,banner_url_glossary_key.de_DE,delivery_time_glossary_key.en_US,delivery_time_glossary_key.de_DE,terms_conditions_glossary_key.en_US,terms_conditions_glossary_key.de_DE,cancellation_policy_glossary_key.en_US,cancellation_policy_glossary_key.de_DE,imprint_glossary_key.en_US,imprint_glossary_key.de_DE,data_privacy_glossary_key.en_US,data_privacy_glossary_key.de_DE,is_active,fax_number
MER000001,E-Commerce Manager,Mr,Harald,Schmidt,+49 30 208498350,https://d2s0ynfc62ej12.cloudfront.net/merchant/spryker-banner.png,https://d2s0ynfc62ej12.cloudfront.net/merchant/spryker-logo.png,info@spryker.com,+49 30 234567891,Spryker is the main merchant at the Demo Marketplace.,Spryker ist der Haupthändler auf dem Demo-Marktplatz.,https://d2s0ynfc62ej12.cloudfront.net/merchant/spryker-banner.png,https://d2s0ynfc62ej12.cloudfront.net/merchant/spryker-banner.png,1-3 days,1-3 Tage,"<p><span style=""font-weight: bold;"">General Terms</span><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><span style=""font-weight: bold;"">Using your Information</span><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to allow us to deliver the type of content and product offerings in which you are most interested.<br><br><span style=""font-weight: bold;"">Protecting visitor information</span><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>","<p><span style=""font-weight: bold;"">§ 1 Geltungsbereich &amp; Abwehrklausel</span><br><br>(1) Für die über diesen Internet-Shop begründeten Rechtsbeziehungen zwischen dem Betreiber des Shops (nachfolgend „Anbieter") und seinen Kunden gelten ausschließlich die folgenden Allgemeinen Geschäftsbedingungen in der jeweiligen Fassung zum Zeitpunkt der Bestellung. <br><br>(2) Abweichende Allgemeine Geschäftsbedingungen des Kunden werden zurückgewiesen.<br><br><span style=""font-weight: bold;"">§ 2 Zustandekommen des Vertrages</span><br><br>(1) Die Präsentation der Waren im Internet-Shop stellt kein bindendes Angebot des Anbieters auf Abschluss eines Kaufvertrages dar. Der Kunde wird hierdurch lediglich aufgefordert, durch eine Bestellung ein Angebot abzugeben. <br><br>(2) Durch das Absenden der Bestellung im Internet-Shop gibt der Kunde ein verbindliches Angebot gerichtet auf den Abschluss eines Kaufvertrages über die im Warenkorb enthaltenen Waren ab. Mit dem Absenden der Bestellung erkennt der Kunde auch diese Geschäftsbedingungen als für das Rechtsverhältnis mit dem Anbieter allein maßgeblich an. <br><br>(3) Der Anbieter bestätigt den Eingang der Bestellung des Kunden durch Versendung einer Bestätigungs-Email. Diese Bestellbestätigung stellt noch nicht die Annahme des Vertragsangebotes durch den Anbieter dar. Sie dient lediglich der Information des Kunden, dass die Bestellung beim Anbieter eingegangen ist. Die Erklärung der Annahme des Vertragsangebotes erfolgt durch die Auslieferung der Ware oder eine ausdrückliche Annahmeerklärung.<br><br><span style=""font-weight: bold;"">§ 3 Eigentumsvorbehalt</span><br><br>Die gelieferte Ware verbleibt bis zur vollständigen Bezahlung im Eigentum des Anbieters.<br><br><span style=""font-weight: bold;"">§ 4 Fälligkeit</span><br><br>Die Zahlung des Kaufpreises ist mit Vertragsschluss fällig.</p>","You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it's not obligatory. To meet the withdrawal deadline, it's sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.","Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die letzte Ware in Besitz genommen hat. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist. Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.","<p>Spryker Systems GmbH<br><br>Julie-Wolfthorn-Straße 1<br>10115 Berlin<br>DE<br><br>Phone: +49 (30) 2084983 50<br>Email: info@spryker.com<br><br>Represented by<br>Managing Directors: Alexander Graf, Boris Lokschin<br>Register Court: Hamburg<br>Register Number: HRB 134310<br></p>","<p>Spryker Systems GmbH<br><br>Julie-Wolfthorn-Straße 1<br>10115 Berlin<br>DE<br><br>Phone: +49 (30) 2084983 50<br>Email: info@spryker.com<br><br>Vertreten durch<br>Geschäftsführer: Alexander Graf, Boris Lokschin<br>Registergericht: Hamburg<br>Registernummer: HRB 134310<br></p>",Spryker Systems GmbH values the privacy of your personal data.,Für die Abwicklung ihrer Bestellung gelten auch die Datenschutzbestimmungen von Spryker Systems GmbH.,1,+49 30 234567800
MER000002,Country Manager DE,Ms,Martha,Farmer,+31 123 345 678,https://d2s0ynfc62ej12.cloudfront.net/merchant/videoking-banner.png,https://d2s0ynfc62ej12.cloudfront.net/merchant/videoking-logo.png,hi@video-king.nl,+31 123 345 777,"Video King is a premium provider of video equipment. In business since 2010, we understand the needs of video professionals and enthusiasts and offer a wide variety of products with competitive prices. ","Video King ist ein Premium-Anbieter von Videogeräten. Wir sind seit 2010 im Geschäft, verstehen die Bedürfnisse von Videoprofis und -enthusiasten und bieten eine große Auswahl an Produkten zu wettbewerbsfähigen Preisen an. ",https://d2s0ynfc62ej12.cloudfront.net/merchant/videoking-banner.png,https://d2s0ynfc62ej12.cloudfront.net/merchant/videoking-banner.png,2-4 days,2-4 Tage,"<p><span style=""font-weight: bold;"">General Terms</span><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><span style=""font-weight: bold;"">Using your Information</span><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to allow us to deliver the type of content and product offerings in which you are most interested.<br><br><span style=""font-weight: bold;"">Protecting visitor information</span><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>","<p><span style=""font-weight: bold;"">§ 1 Geltungsbereich &amp; Abwehrklausel</span><br><br>(1) Für die über diesen Internet-Shop begründeten Rechtsbeziehungen zwischen dem Betreiber des Shops (nachfolgend „Anbieter") und seinen Kunden gelten ausschließlich die folgenden Allgemeinen Geschäftsbedingungen in der jeweiligen Fassung zum Zeitpunkt der Bestellung. <br><br>(2) Abweichende Allgemeine Geschäftsbedingungen des Kunden werden zurückgewiesen.<br><br><span style=""font-weight: bold;"">§ 2 Zustandekommen des Vertrages</span><br><br>(1) Die Präsentation der Waren im Internet-Shop stellt kein bindendes Angebot des Anbieters auf Abschluss eines Kaufvertrages dar. Der Kunde wird hierdurch lediglich aufgefordert, durch eine Bestellung ein Angebot abzugeben. <br><br>(2) Durch das Absenden der Bestellung im Internet-Shop gibt der Kunde ein verbindliches Angebot gerichtet auf den Abschluss eines Kaufvertrages über die im Warenkorb enthaltenen Waren ab. Mit dem Absenden der Bestellung erkennt der Kunde auch diese Geschäftsbedingungen als für das Rechtsverhältnis mit dem Anbieter allein maßgeblich an. <br><br>(3) Der Anbieter bestätigt den Eingang der Bestellung des Kunden durch Versendung einer Bestätigungs-Email. Diese Bestellbestätigung stellt noch nicht die Annahme des Vertragsangebotes durch den Anbieter dar. Sie dient lediglich der Information des Kunden, dass die Bestellung beim Anbieter eingegangen ist. Die Erklärung der Annahme des Vertragsangebotes erfolgt durch die Auslieferung der Ware oder eine ausdrückliche Annahmeerklärung.<br><br><span style=""font-weight: bold;"">§ 3 Eigentumsvorbehalt</span><br><br>Die gelieferte Ware verbleibt bis zur vollständigen Bezahlung im Eigentum des Anbieters.<br><br><span style=""font-weight: bold;"">§ 4 Fälligkeit</span><br><br>Die Zahlung des Kaufpreises ist mit Vertragsschluss fällig.</p>","You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it's not obligatory. To meet the withdrawal deadline, it's sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.","Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die letzte Ware in Besitz genommen hat. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist. Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.",<p>Video King<br><br>Gilzeweg 24<br>4854SG Bavel<br>NL <br><br>Phone: +31 123 45 6789<br>Email: hi@video-king.nl<br><br>Represented by<br>Managing Director: Max Mustermann<br>Register Court: Amsterdam<br>Register Number: 1234.4567<br></p>,<p>Video King<br><br>Gilzeweg 24<br>4854SG Bavel<br>NL<br><br>Telefon: +31 123 45 6789<br>Email: hi@video-king.nl<br><br>Vertreten durch<br>Geschäftsführer: Max Mustermann<br>Registergericht: Amsterdam<br>Registernummer: 1234.4567<br></p>,Video King values the privacy of your personal data.,Für die Abwicklung ihrer Bestellung gelten auch die Datenschutzbestimmungen von Video King.,1,+31 123 345 733
MER000006,Brand Manager,Ms,Michele,Nemeth,030/123456789,https://d2s0ynfc62ej12.cloudfront.net/merchant/sonyexperts-banner.png,https://d2s0ynfc62ej12.cloudfront.net/merchant/sonyexperts-logo.png,support@sony-experts.com,+49 30 234567691,"Capture your moment with the best cameras from Sony. From pocket-size to professional-style, they all pack features to deliver the best quality pictures.
Discover the range of Sony cameras, lenses and accessories, and capture your favorite moments with precision and style with the best cameras can offer.","Halten Sie Ihren Moment mit den besten Kameras von Sony fest. Vom Taschenformat bis hin zum professionellen Stil bieten sie alle Funktionen, um Bilder in bester Qualität zu liefern.
Entdecken Sie das Angebot an Kameras, Objektiven und Zubehör von Sony und fangen Sie Ihre Lieblingsmomente mit Präzision und Stil mit den besten Kameras ein, die das Unternehmen zu bieten hat.",https://d2s0ynfc62ej12.cloudfront.net/merchant/sonyexperts-banner.png,https://d2s0ynfc62ej12.cloudfront.net/merchant/sonyexperts-banner.png,1-3 days,1-3 Tage,"<p><span style=""font-weight: bold;"">General Terms</span><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><span style=""font-weight: bold;"">Using your Information</span><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to allow us to deliver the type of content and product offerings in which you are most interested.<br><br><span style=""font-weight: bold;"">Protecting visitor information</span><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>","<p><span style=""font-weight: bold;"">§ 1 Geltungsbereich &amp; Abwehrklausel</span><br><br>(1) Für die über diesen Internet-Shop begründeten Rechtsbeziehungen zwischen dem Betreiber des Shops (nachfolgend „Anbieter") und seinen Kunden gelten ausschließlich die folgenden Allgemeinen Geschäftsbedingungen in der jeweiligen Fassung zum Zeitpunkt der Bestellung. <br><br>(2) Abweichende Allgemeine Geschäftsbedingungen des Kunden werden zurückgewiesen.<br><br><span style=""font-weight: bold;"">§ 2 Zustandekommen des Vertrages</span><br><br>(1) Die Präsentation der Waren im Internet-Shop stellt kein bindendes Angebot des Anbieters auf Abschluss eines Kaufvertrages dar. Der Kunde wird hierdurch lediglich aufgefordert, durch eine Bestellung ein Angebot abzugeben. <br><br>(2) Durch das Absenden der Bestellung im Internet-Shop gibt der Kunde ein verbindliches Angebot gerichtet auf den Abschluss eines Kaufvertrages über die im Warenkorb enthaltenen Waren ab. Mit dem Absenden der Bestellung erkennt der Kunde auch diese Geschäftsbedingungen als für das Rechtsverhältnis mit dem Anbieter allein maßgeblich an. <br><br>(3) Der Anbieter bestätigt den Eingang der Bestellung des Kunden durch Versendung einer Bestätigungs-Email. Diese Bestellbestätigung stellt noch nicht die Annahme des Vertragsangebotes durch den Anbieter dar. Sie dient lediglich der Information des Kunden, dass die Bestellung beim Anbieter eingegangen ist. Die Erklärung der Annahme des Vertragsangebotes erfolgt durch die Auslieferung der Ware oder eine ausdrückliche Annahmeerklärung.<br><br><span style=""font-weight: bold;"">§ 3 Eigentumsvorbehalt</span><br><br>Die gelieferte Ware verbleibt bis zur vollständigen Bezahlung im Eigentum des Anbieters.<br><br><span style=""font-weight: bold;"">§ 4 Fälligkeit</span><br><br>Die Zahlung des Kaufpreises ist mit Vertragsschluss fällig.</p>","You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it's not obligatory. To meet the withdrawal deadline, it's sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.","Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die letzte Ware in Besitz genommen hat. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist. Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.",<p>Sony Experts<br><br>Matthias-Pschorr-Straße 1<br>80336 München<br>DE<br><br>Phone: 030 1234567<br>Email: support@sony-experts.com<br><br>Represented by<br>Managing Director: Max Mustermann<br>Register Court: Munich<br>Register Number: HYY 134306<br></p>,<p>Sony Experts<br><br>Matthias-Pschorr-Straße 1<br>80336 München<br>DE<br><br>Phone: 030 1234567<br>Email: support@sony-experts.com<br><br>Vertreten durch<br>Geschäftsführer: Max Mustermann<br>Registergericht: München<br>Registernummer: HYY 134306<br></p>,Sony Experts values the privacy of your personal data.,Für die Abwicklung ihrer Bestellung gelten auch die Datenschutzbestimmungen von Sony Experts.,1,+49 30 234567600
MER000004,,,,,,,,,,,,,,,,,,,,,,,,0,
MER000003,,,,,,,,,,,,,,,,,,,,,,,,0,
MER000007,,,,,,,,,,,,,,,,,,,,,,,,0,
MER000005,Merchandise Manager,Mr,Jason,Weidmann,030/123456789,https://d2s0ynfc62ej12.cloudfront.net/merchant/budgetcameras-banner.png,https://d2s0ynfc62ej12.cloudfront.net/merchant/budgetcameras-logo.png,support@budgetcamerasonline.com,+49 30 234567591,"DSLR and mirrorless cameras are by far the most popular with filmmakers on a tight budget when you can't afford multiple specialist cameras.
Budget Cameras is offering a great selection of digital cameras with the lowest prices.","DSLR- und spiegellose Kameras sind bei Filmemachern mit knappem Budget bei weitem am beliebtesten, wenn sie sich bestimmte Spezialkameras nicht leisten können.
Budget Cameras bietet eine große Auswahl an Digitalkameras mit den niedrigsten Preisen.",https://d2s0ynfc62ej12.cloudfront.net/merchant/budgetcameras-banner.png,https://d2s0ynfc62ej12.cloudfront.net/merchant/budgetcameras-banner.png,2-4 days,2-4 Tage,"<p><span style=""font-weight: bold;"">General Terms</span><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><span style=""font-weight: bold;"">Using your Information</span><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to allow us to deliver the type of content and product offerings in which you are most interested.<br><br><span style=""font-weight: bold;"">Protecting visitor information</span><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>","<p><span style=""font-weight: bold;"">§ 1 Geltungsbereich &amp; Abwehrklausel</span><br><br>(1) Für die über diesen Internet-Shop begründeten Rechtsbeziehungen zwischen dem Betreiber des Shops (nachfolgend „Anbieter") und seinen Kunden gelten ausschließlich die folgenden Allgemeinen Geschäftsbedingungen in der jeweiligen Fassung zum Zeitpunkt der Bestellung. <br><br>(2) Abweichende Allgemeine Geschäftsbedingungen des Kunden werden zurückgewiesen.<br><br><span style=""font-weight: bold;"">§ 2 Zustandekommen des Vertrages</span><br><br>(1) Die Präsentation der Waren im Internet-Shop stellt kein bindendes Angebot des Anbieters auf Abschluss eines Kaufvertrages dar. Der Kunde wird hierdurch lediglich aufgefordert, durch eine Bestellung ein Angebot abzugeben. <br><br>(2) Durch das Absenden der Bestellung im Internet-Shop gibt der Kunde ein verbindliches Angebot gerichtet auf den Abschluss eines Kaufvertrages über die im Warenkorb enthaltenen Waren ab. Mit dem Absenden der Bestellung erkennt der Kunde auch diese Geschäftsbedingungen als für das Rechtsverhältnis mit dem Anbieter allein maßgeblich an. <br><br>(3) Der Anbieter bestätigt den Eingang der Bestellung des Kunden durch Versendung einer Bestätigungs-Email. Diese Bestellbestätigung stellt noch nicht die Annahme des Vertragsangebotes durch den Anbieter dar. Sie dient lediglich der Information des Kunden, dass die Bestellung beim Anbieter eingegangen ist. Die Erklärung der Annahme des Vertragsangebotes erfolgt durch die Auslieferung der Ware oder eine ausdrückliche Annahmeerklärung.<br><br><span style=""font-weight: bold;"">§ 3 Eigentumsvorbehalt</span><br><br>Die gelieferte Ware verbleibt bis zur vollständigen Bezahlung im Eigentum des Anbieters.<br><br><span style=""font-weight: bold;"">§ 4 Fälligkeit</span><br><br>Die Zahlung des Kaufpreises ist mit Vertragsschluss fällig.</p>","You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it's not obligatory. To meet the withdrawal deadline, it's sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.","Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die letzte Ware in Besitz genommen hat. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist. Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.",<p>Budget Cameras<br><br>Spitalerstraße 3<br>20095 Hamburg<br>DE<br><br>Phone: 030 1234567<br>Email: support@budgetcamerasonline.com<br><br>Represented by<br>Managing Director: Max Mustermann<br>Register Court: Hamburg<br>Register Number: HXX 134305<br></p>,<p>Budget Cameras<br><br>Spitalerstraße 3<br>20095 Hamburg<br>DE<br><br>Phone: 030 1234567<br>Email: support@budgetcamerasonline.com<br><br>Vertreten durch<br>Geschäftsführer: Max Mustermann<br>Registergericht: Hamburg<br>Registernummer: HXX 134305<br></p>,Budget Cameras values the privacy of your personal data.,Für die Abwicklung ihrer Bestellung gelten auch die Datenschutzbestimmungen von Budget Cameras.,1,+49 30 234567500
```

</details>

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
|-|-|-|-|-|
| merchant_reference | &check; | String | MER000007 | Merchant identifier. |
| contact_person_role |   | String | E-Commerce Manager | Role of the contact person of a merchant. |
| contact_person_title |   | String | Mr | The title shown for the contact person of a merchant. |
| contact_person_first_name |   | String | Harald | First name of the contact person of a merchant. |
| contact_person_last_name |   | String | Schmidt | Last name of the contact person of a merchant. |
| contact_person_phone |   | String | 030 234567891a | Phone number of the contact person of a merchant. |
| banner_url |   | String | `http://cdn-link/banner.png` | Default banner URL of a merchant if a locale specific one does not exist. |
| logo_url |   | String | `http://cdn-link/logo.png` | Logo URL of a merchant. |
| public_email |   | String | `email@merchant-domain.com` | Public email for communication of a merchant. |
| public_phone |   | String | 030 234567891 | Public phone for communication of a merchant. |
| description_glossary_key.en_US |   | String | Lorem ipsum dolor sit amet | Description of a merchant in the en_US locale. |
| description_glossary_key.de_DE |   | String | Lorem ipsum dolor sit amet | Description of a merchant in the de_DE locale. |
| banner_url_glossary_key.en_US |   | String | `http://cdn-link/en-banner.png` | Locale specific banner URL of a merchant. |
| banner_url_glossary_key.de_DE |   | String | `http://cdn-link/en-banner.png` | Locale specific banner URL of a merchant. |
| delivery_time_glossary_key.en_US |   | String | 1-3 days | Average delivery time of a merchant in the en_US locale. |
| delivery_time_glossary_key.de_DE |   | String | 1-3 days | Average delivery time of a merchant in the de_DE locale. |
| terms_conditions_glossary_key.en_US |   | String | Lorem ipsum dolor sit amet | Terms and conditions of a merchant in the en_US locale. |
| terms_conditions_glossary_key.de_DE |   | String | Lorem ipsum dolor sit amet | Terms and conditions of a merchant in the de_DE locale. |
| cancellation_policy_glossary_key.en_US |   | String | Lorem ipsum dolor sit amet | Cancellation policy of a merchant in the en_US locale. |
| cancellation_policy_glossary_key.de_DE |   | String | Lorem ipsum dolor sit amet | Cancellation policy of a merchant in the de_DE locale. |
| imprint_glossary_key.en_US |   | String | Lorem ipsum dolor sit amet | Imprint of a merchant in the en_US locale. |
| imprint_glossary_key.de_DE |   | String | Lorem ipsum dolor sit amet | Imprint of a merchant in the de_DE locale. |
| data_privacy_glossary_key.en_US |   | String | Lorem ipsum dolor sit amet | Data privacy statement of a merchant in the en_US locale. |
| data_privacy_glossary_key.de_DE |   | String | Lorem ipsum dolor sit amet | Data privacy statement of a merchant in the de_DE locale. |
| fax_number |   | String | 030 234567800 | Fax number of a merchant. |

2. Prepare merchant profile address data according to your requirements using the demo data:

**/data/import/common/common/marketplace/merchant_profile_address.csv**

```
merchant_reference,country_iso2_code,country_iso3_code,address1,address2,address3,city,zip_code,longitude,latitude
MER000001,DE,DEU,Julie-Wolfthorn-Straße,1,,Berlin,10115,52.534105,13.384458
MER000002,NL,,Gilzeweg,24,,Bavel,4854SG,51.558107,4.838470
MER000006,DE,DEU,Matthias-Pschorr-Straße,1,,München,80336,48.131058,11.547788
MER000005,DE,DEU,Spitalerstraße,3,,Berlin,10115,,
MER000004,DE,DEU,Caroline-Michaelis-Straße,8,,Hamburg,20095,,
MER000003,DE,DEU,Caroline-Michaelis-Straße,8,,Berlin,10115,,
MER000007,DE,DEU,Caroline-Michaelis-Straße,8,,Berlin,10115,53.552463,10.004663
```

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
|-|-|-|-|-|
| merchant_reference | &check; | String | MER000006 | Merchant identifier. |
| country_iso2_code |   | String | DE | Country ISO-2 code the address exists in. |
| country_iso3_code |   | String | DEU | Country ISO-3 code the address exists in. |
| address1 |   | String | Caroline-Michaelis-Straße | Address line 1 of a merchant. |
| address2 |   | String | 8 | Address line 2 of a merchant. |
| address3 |   | String | Second floor | Address line 3 of a merchant. |
| city |   | String | Berlin | City address of a merchant. |
| zip_code |   | String | 10115 | Zip code address of a merchant. |
| longitude |   | String | 52.534105 | Longitude value of a merchant. |
| latitude |   | String | 13.384458 | Latitude value of a merchant. |

3. Register the following plugins to enable data import:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantProfileDataImportPlugin | Imports merchant profile data into the database. |   | Spryker\Zed\MerchantProfileDataImport\Communication\Plugin |
| MerchantProfileAddressDataImportPlugin | Imports merchant profile address data into the database. |   | Spryker\Zed\MerchantProfileDataImport\Communication\Plugin |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\MerchantProfileDataImport\Communication\Plugin\MerchantProfileDataImportPlugin;
use Spryker\Zed\MerchantProfileDataImport\Communication\Plugin\MerchantProfileAddressDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    protected function getDataImporterPlugins(): array
    {
        return [
            new MerchantProfileDataImportPlugin(),
            new MerchantProfileAddressDataImportPlugin(),
        ];
    }
}
```

4. Import data:

```bash
console data:import merchant-profile
console data:import merchant-profile-address
```

To import merchant user data, perform the following steps:
1. Prepare merchant user data according to your requirements using the demo data:

**/data/import/common/common/marketplace/merchant_user.csv**

```
merchant_reference,username
MER000006,michele@sony-experts.com
```

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
|-|-|-|-|-|
| merchant_reference | &check; | String | MER000006  | Identifier of the merchant in the system. Have to be unique. |
| username | &check; | String | `michele@sony-experts.com`  | Username of the merchant user. It is an email address that is used for logging into the Merchant Portal as a merchant user.  |

2. Create the Step model for writing merchant user data.

<details>
<summary>src/Pyz/Zed/DataImport/Business/Model/MerchantUser/MerchantUserWriterStep.php</summary>

```php
<?php

namespace Pyz\Zed\DataImport\Business\Model\MerchantUser;

use Generated\Shared\Transfer\MerchantUserCriteriaTransfer;
use Generated\Shared\Transfer\MerchantUserTransfer;
use Generated\Shared\Transfer\UserCriteriaTransfer;
use Orm\Zed\Merchant\Persistence\SpyMerchantQuery;
use Orm\Zed\User\Persistence\SpyUserQuery;
use Pyz\Zed\DataImport\Business\Exception\EntityNotFoundException;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\MerchantUser\Business\MerchantUserFacadeInterface;

class MerchantUserWriterStep implements DataImportStepInterface
{
    /**
     * @var \Spryker\Zed\MerchantUser\Business\MerchantUserFacadeInterface
     */
    protected $merchantUserFacade;

    /**
     * @param \Spryker\Zed\MerchantUser\Business\MerchantUserFacadeInterface $merchantUserFacade
     */
    public function __construct(MerchantUserFacadeInterface $merchantUserFacade)
    {
        $this->merchantUserFacade = $merchantUserFacade;
    }

    protected const MERCHANT_REFERENCE = 'merchant_reference';
    protected const USERNAME = 'username';

    /**
     * @inheritDoc
     */
    public function execute(DataSetInterface $dataSet): void
    {
        $idMerchant = $this->getIdMerchantByReference($dataSet[static::MERCHANT_REFERENCE]);
        $idUser = $this->getIdUserByUsername($dataSet[static::USERNAME]);

        $merchantUserTransfer = $this->merchantUserFacade->findMerchantUser(
            (new MerchantUserCriteriaTransfer())
                ->setIdUser($idUser)
                ->setIdMerchant($idMerchant)
        );

        if (!$merchantUserTransfer) {
            $userTransfer = $this->merchantUserFacade->findUser(
                (new UserCriteriaTransfer())->setIdUser($idUser)
            );

            $this->merchantUserFacade->createMerchantUser(
                (new MerchantUserTransfer())
                    ->setIdMerchant($idMerchant)
                    ->setUser($userTransfer)
            );
        }
    }

    /**
     * @param string $merchantReference
     *
     * @throws \Pyz\Zed\DataImport\Business\Exception\EntityNotFoundException
     *
     * @return int
     */
    protected function getIdMerchantByReference(string $merchantReference): int
    {
        $merchantEntity = SpyMerchantQuery::create()
            ->findOneByMerchantReference($merchantReference);

        if (!$merchantEntity) {
            throw new EntityNotFoundException(sprintf('Merchant with reference "%s" is not found.', $merchantReference));
        }

        return $merchantEntity->getIdMerchant();
    }

    /**
     * @param string $username
     *
     * @throws \Pyz\Zed\DataImport\Business\Exception\EntityNotFoundException
     *
     * @return int
     */
    protected function getIdUserByUsername(string $username): int
    {
        $userEntity = SpyUserQuery::create()
            ->findOneByUsername($username);

        if (!$userEntity) {
            throw new EntityNotFoundException(sprintf('User with username "%s" is not found.', $username));
        }

        return $userEntity->getIdUser();
    }
}
```

</details>

3. Add the merchant user import type to full import (if needed).

**src/Pyz/Zed/DataImport/DataImportConfig.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportConfig as SprykerDataImportConfig;

/**
 * @SuppressWarnings(PHPMD.ExcessiveClassComplexity)
 * @SuppressWarnings(PHPMD.CouplingBetweenObjects)
 * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
 */
class DataImportConfig extends SprykerDataImportConfig
{
    public const IMPORT_TYPE_MERCHANT_USER = 'merchant-user';

    /**
     * @return array<string>
     */
    public function getFullImportTypes(): array
    {
        return [
            static::IMPORT_TYPE_MERCHANT_USER,
        ];
    }
}
```

4. Enable merchant user data import command.

<details>
<summary>src/Pyz/Zed/DataImport/Business/DataImportBusinessFactory.php</summary>

```php
<?php

namespace Pyz\Zed\DataImport\Business;

use Generated\Shared\Transfer\DataImportConfigurationActionTransfer;
use Generated\Shared\Transfer\DataImporterConfigurationTransfer;
use Spryker\Zed\DataImport\Business\DataImportBusinessFactory as SprykerDataImportBusinessFactory;
use Spryker\Zed\DataImport\Business\Model\DataImporterInterface;
use Pyz\Zed\DataImport\Business\Model\MerchantUser\MerchantUserWriterStep;
use Pyz\Zed\DataImport\DataImportConfig;

/**
 * @method \Pyz\Zed\DataImport\DataImportConfig getConfig()
 * @SuppressWarnings(PHPMD.CyclomaticComplexity)
 * @SuppressWarnings(PHPMD.ExcessiveClassComplexity)
 * @SuppressWarnings(PHPMD.ExcessiveClassLength)
 */
class DataImportBusinessFactory extends SprykerDataImportBusinessFactory
{
    /**
     * @param \Generated\Shared\Transfer\DataImportConfigurationActionTransfer $dataImportConfigurationActionTransfer
     *
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface|null
     */
    public function getDataImporterByType(DataImportConfigurationActionTransfer $dataImportConfigurationActionTransfer): ?DataImporterInterface
    {
        switch ($dataImportConfigurationActionTransfer->getDataEntity()) {
            case DataImportConfig::IMPORT_TYPE_MERCHANT_USER:
                return $this->createMerchantUserImporter($dataImportConfigurationActionTransfer);
            default:
                return null;
        }
    }

    /**
     * @param \Generated\Shared\Transfer\DataImportConfigurationActionTransfer $dataImportConfigurationActionTransfer
     *
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface
     */
    public function createMerchantUserImporter(DataImportConfigurationActionTransfer $dataImportConfigurationActionTransfer)
    {
        $dataImporter = $this->getCsvDataImporterFromConfig(
            $this->getConfig()->buildImporterConfigurationByDataImportConfigAction($dataImportConfigurationActionTransfer)
        );

        $dataSetStepBroker = $this->createTransactionAwareDataSetStepBroker();
        $dataSetStepBroker->addStep(new MerchantUserWriterStep(
            $this->getMerchantUserFacade()
        ));

        $dataImporter->addDataSetStepBroker($dataSetStepBroker);

        return $dataImporter;
    }

    /**
     * @return \Spryker\Zed\MerchantUser\Business\MerchantUserFacadeInterface
     */
    protected function getMerchantUserFacade(): MerchantUserFacadeInterface
    {
        return $this->getProvidedDependency(DataImportDependencyProvider::FACADE_MERCHANT_USER);
    }
}
```

</details>

5. Create and prepare your data import configuration files according to your requirements using our demo config template:

**data/import/common/marketplace_import_config_EU.yml**

```yml
version: 0

actions:
  - data_entity: merchant-user
    source: data/import/common/common/merchant_user.csv
  - data_entity: merchant-profile
    source: data/import/common/common/marketplace/merchant_profile.csv
  - data_entity: merchant-profile-address
    source: data/import/common/common/marketplace/merchant_profile_address.csv
 ```

6. Import data.

```bash
console data:import merchant-user
```

{% info_block warningBox "Verification" %}

Make sure that the imported data has been added to the `spy_merchant_profile`, `spy_merchant_profile_address` and `spy_merchant_user` tables.

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the Marketplace Merchant feature front end.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|-|-|-|
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |

### 1) Install the required modules

Install the required modules using Composer:
```bash
composer require spryker-feature/marketplace-merchant: "{{page.version}}" --update-with-dependencies
```

| MODULE | EXPECTED DIRECTORY |
|-|-|
| MerchantProfileWidget | vendor/spryker-shop/merchant-profile-widget |
| MerchantWidget | vendor/spryker-shop/merchant-widget |
| MerchantPage | vendor/spryker-shop/merchant-page |

### 2) Add translations

Add Yves translations:

1. Append glossary according to your configuration:

**data/import/common/common/glossary.csv**

```
merchant.sold_by,Sold by,en_US
merchant.sold_by,Verkauft durch,de_DE
merchant_profile.email,Email Address,en_US
merchant_profile.email,Email,de_DE
merchant_profile.address,Address,en_US
merchant_profile.address,Adresse,de_DE
merchant_profile.phone,Phone,en_US
merchant_profile.phone,Telefon,de_DE
merchant_profile.terms_and_conditions,Terms & Conditions,en_US
merchant_profile.terms_and_conditions,AGB,de_DE
merchant_profile.cancellation_policy,Cancellation Policy,en_US
merchant_profile.cancellation_policy,Widerrufsbelehrung,de_DE
merchant_profile.imprint,Imprint,en_US
merchant_profile.imprint,Impressum,de_DE
merchant_profile.privacy,Data Privacy,en_US
merchant_profile.privacy,Datenschutz,de_DE
merchant_profile.delivery_time,Delivery Time,en_US
merchant_profile.delivery_time,Lieferzeit,de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the `spy_glossary_key` and `spy_glossary_translation` tables in the database.

{% endinfo_block %}

### 3) Set up widgets

Register the following plugins to enable widgets:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
| -------------- | --------------- | ------ | ---------------- |
| SoldByMerchantWidget      | Shows the list of the offers with their prices for a concrete product. |           | SprykerShop\Yves\MerchantWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\MerchantWidget\Widget\SoldByMerchantWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            SoldByMerchantWidget::class,
        ];
    }
}
```

Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Make sure the following widgets were registered:

| MODULE | TEST |
| ----------------- | ----------------- |
| SoldByMerchantWidget | Open product detail page, and you will see the sold by merchant text. (May require Marketplace Product integration) |

{% endinfo_block %}

### 4) Set up behavior

To set up behavior:

1. Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantPageResourceCreatorPlugin | Allows accessing a merchant page at `https://yves.mysprykershop.com/merchant/{merchantReference}`. |   | SprykerShop\Yves\MerchantPage\Plugin |
| UrlStorageMerchantMapperPlugin | Provides access to merchant storage data in the controller related to the `https://yves.mysprykershop.com/merchant/{merchantReference}` URL.  | Publish URL storage data to Redis by running `console sync:data url`. | Spryker\Client\MerchantStorage\Plugin |

**src/Pyz/Yves/StorageRouter/StorageRouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\StorageRouter;

use SprykerShop\Yves\MerchantPage\Plugin\MerchantPageResourceCreatorPlugin;
use SprykerShop\Yves\StorageRouter\StorageRouterDependencyProvider as SprykerShopStorageRouterDependencyProvider;

class StorageRouterDependencyProvider extends SprykerShopStorageRouterDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\StorageRouterExtension\Dependency\Plugin\ResourceCreatorPluginInterface>
     */
    protected function getResourceCreatorPlugins(): array
    {
        return [
            new MerchantPageResourceCreatorPlugin(),
        ];
    }
}
```

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

Make sure that you can open the merchant page at link `http://yves.de.demo-spryker.com/de/merchant/spryker`.

{% endinfo_block %}

2. Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Make sure that you can view merchant profile data at `http://yves.de.demo-spryker.com/de/merchant/spryker`.

{% endinfo_block %}

## Install related features

Integrate the following related features:

| FEATURE | REQUIRED FOR THE CURRENT FEATURE | INSTALLATION GUIDE |
| - | - | -|
| Marketplace Merchant API | &check;  |  [Install the Marketplace Merchant feature ](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-merchant-glue-api.html) |
