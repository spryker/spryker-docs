


This document describes how to install the [Marketplace Inventory Management](/docs/pbc/all/warehouse-management-system/{{page.version}}/marketplace/marketplace-inventory-management-feature-overview.html) feature.

## Install feature core

Follow the steps below to install the Marketplace Inventory Management feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|-|-|-|
| Spryker Core | {{page.version}} | [Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html)  |
| Marketplace Product Offer | {{page.version}} | [Install the Marketplace Product Offer feature](/docs/pbc/all/offer-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-feature.html)  |
| Inventory Management | {{page.version}} | [Install the Inventory Management feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-inventory-management-feature.html)  |

### 1) Install the required modules

```bash
composer require spryker-feature/marketplace-inventory-management:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| MerchantStock | vendor/spryker/merchant-stock |
| MerchantStockDataImport | vendor/spryker/merchant-stock-data-import |
| MerchantStockGui | vendor/spryker/merchant-stock-gui |
| ProductOfferStock | vendor/spryker/product-offer-stock |
| ProductOfferStockDataImport | vendor/spryker/product-offer-stock-data-import |
| ProductOfferStockGui | vendor/spryker/product-offer-stock-gui |
| ProductOfferStockGuiExtension | vendor/spryker/product-offer-stock-gui-extension |
| ProductOfferAvailability | vendor/spryker/product-offer-availability |
| ProductOfferAvailabilityStorage | vendor/spryker/product-offer-availability-storage |

{% endinfo_block %}


### 2) Set up the database schema

1. Adjust the schema definition so entity changes trigger events:

**src/Pyz/Zed/ProductOfferStock/Persistence/Propel/Schema/spy_product_offer_stock.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          name="zed"
          xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\ProductOfferStock\Persistence"
          package="src.Orm.Zed.ProductOfferStock.Persistence">

    <table name="spy_product_offer_stock">
        <behavior name="event">
            <parameter name="spy_product_offer_stock_all" column="*"/>
        </behavior>
    </table>
</database>
```

2. Apply database changes and to generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY | TYPE | EVENT |
|-|-|-|
| spy_merchant_stock | table | created |
| spy_product_offer_stock | table | created |
| spy_product_offer_availability_storage | table | created |

{% endinfo_block %}

### 3) Set up transfer objects

Generate transfers:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
|-|-|-|-|
| MerchantStock | class | Created | src/Generated/Shared/Transfer/MerchantStockTransfer |
| MerchantStockCriteria | class | Created | src/Generated/Shared/Transfer/MerchantStockCriteriaTransfer |
| ProductAvailabilityCriteria | class | Created | src/Generated/Shared/Transfer/ProductAvailabilityCriteriaTransfer |
| ProductConcreteAvailability | class | Created | src/Generated/Shared/Transfer/ProductConcreteAvailabilityTransfer |
| ProductOfferAvailabilityRequest | class | Created | src/Generated/Shared/Transfer/ProductOfferAvailabilityRequestTransfer |
| ProductOfferAvailabilityStorage | class | Created | src/Generated/Shared/Transfer/ProductOfferAvailabilityStorageTransfer |
| ProductOfferStock | class | Created | src/Generated/Shared/Transfer/ProductOfferStockTransfer |
| ProductOfferStockRequest | class | Created | src/Generated/Shared/Transfer/ProductOfferStockRequestTransfer |
| ReservationRequest | class | Created | src/Generated/Shared/Transfer/ReservationRequestTransfer |
| SpyMerchantStockEntity | class | Created | src/Generated/Shared/Transfer/SpyMerchantStockEntityTransfer |
| SpyMerchantUserEntity | class | Created | src/Generated/Shared/Transfer/SpyMerchantUserEntityTransfer |
| SpyProductOfferAvailabilityStorageEntity | class | Created | src/Generated/Shared/Transfer/SpyProductOfferAvailabilityStorageEntityTransfer |
| SpyProductOfferStockEntity | class | Created | src/Generated/Shared/Transfer/SpyProductOfferStockEntityTransfer |

{% endinfo_block %}

### 4) Add Zed translations

Generate a new translation cache for Zed:

```bash
console translator:generate-cache
```

### 5) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantStockMerchantExpanderPlugin | Expands `MerchantTransfer` with related stocks. |  | Spryker\Zed\MerchantStock\Communication\Plugin\Merchant |
| MerchantStockMerchantPostCreatePlugin | Creates default stock for the merchant. |  | Spryker\Zed\MerchantStock\Communication\Plugin\Merchant |
| MerchantStockMerchantFormExpanderPlugin | Expands `MerchantForm` with the form field for merchant warehouses. |  | Spryker\Zed\MerchantStockGui\Communication\Plugin\MerchantGui |
| ProductOfferStockProductOfferExpanderPlugin | Expands `ProductOfferTransfer` with product offer stock. |  | Spryker\Zed\ProductOfferStock\Communication\Plugin\ProductOffer |
| ProductOfferStockProductOfferPostCreatePlugin | Persists product offer stock on product offer create. |  | Spryker\Zed\ProductOfferStock\Communication\Plugin\ProductOffer |
| ProductOfferStockProductOfferPostUpdatePlugin | Persists product offer stock on product offer updated. |  | Spryker\Zed\ProductOfferStock\Communication\Plugin\ProductOffer |
| ProductOfferAvailabilityStrategyPlugin | Reads product offer availability. |  | Spryker\Zed\ProductOfferAvailability\Communication\Plugin\Availability |
| ProductOfferStockProductOfferViewSectionPlugin | Shows the stock section on the product offer view page in the Back Office. |  | Spryker\Zed\ProductOfferStockGui\Communication\Plugin\ProductOffer |
| MerchantStockAclEntityConfigurationExpanderPlugin | Expands the provided ACL entity metadata config transfer object with merchant stock composite data. |  | Spryker\Zed\MerchantStock\Communication\Plugin\AclMerchantPortal |
| ProductOfferStockAclEntityConfigurationExpanderPlugin | Expands the provided ACL entity metadata config transfer object with product offer composite data. |  | Spryker\Zed\ProductOfferStock\Communication\Plugin\AclMerchantPortal |
| ProductOfferAvailabilityStorageStrategyPlugin | Provides a product offer availability strategy, which defines whether the product offer is available for the current store. |  | Spryker\Client\ProductOfferAvailabilityStorage\Plugin\AvailabilityStorage |
| ProductOfferAvailabilityEventResourceBulkRepositoryPlugin | Triggers publish events for all or particular product offer availability (using the ID identifier), which sends them to the `spy_product_offer_availability_storage` table. |  | Spryker\Zed\ProductOfferAvailabilityStorage\Communication\Plugin\Event |

**src/Pyz/Zed/AclMerchantPortal/AclMerchantPortalDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\AclMerchantPortal;

use Spryker\Zed\AclMerchantPortal\AclMerchantPortalDependencyProvider as SprykerAclMerchantPortalDependencyProvider;
use Spryker\Zed\MerchantStock\Communication\Plugin\AclMerchantPortal\MerchantStockAclEntityConfigurationExpanderPlugin;
use Spryker\Zed\ProductOfferStock\Communication\Plugin\AclMerchantPortal\ProductOfferStockAclEntityConfigurationExpanderPlugin;

class AclMerchantPortalDependencyProvider extends SprykerAclMerchantPortalDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\AclMerchantPortalExtension\Dependency\Plugin\AclEntityConfigurationExpanderPluginInterface>
     */
    protected function getAclEntityConfigurationExpanderPlugins(): array
    {
        return [
            ...
            new MerchantStockAclEntityConfigurationExpanderPlugin(),
            new ProductOfferStockAclEntityConfigurationExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Client/AvailabilityStorage/AvailabilityStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\AvailabilityStorage;

use Spryker\Client\AvailabilityStorage\AvailabilityStorageDependencyProvider as SprykerAvailabilityStorageDependencyProvider;
use Spryker\Client\ProductOfferAvailabilityStorage\Plugin\AvailabilityStorage\ProductOfferAvailabilityStorageStrategyPlugin;

class AvailabilityStorageDependencyProvider extends SprykerAvailabilityStorageDependencyProvider
{
    /**
     * @return array<\Spryker\Client\AvailabilityStorageExtension\Dependency\Plugin\AvailabilityStorageStrategyPluginInterface>
     */
    protected function getAvailabilityStorageStrategyPlugins(): array
    {
        return [
            ...
            new ProductOfferAvailabilityStorageStrategyPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/EventBehavior/EventBehaviorDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\EventBehavior;

use Spryker\Zed\EventBehavior\EventBehaviorDependencyProvider as SprykerEventBehaviorDependencyProvider;
use Spryker\Zed\ProductOfferAvailabilityStorage\Communication\Plugin\Event\ProductOfferAvailabilityEventResourceBulkRepositoryPlugin;

class EventBehaviorDependencyProvider extends SprykerEventBehaviorDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\EventBehavior\Dependency\Plugin\EventResourcePluginInterface>
     */
    protected function getEventTriggerResourcePlugins(): array
    {
        return [
            ...
            new ProductOfferAvailabilityEventResourceBulkRepositoryPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Merchant/MerchantDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Merchant;

use Spryker\Zed\Merchant\MerchantDependencyProvider as SprykerMerchantDependencyProvider;
use Spryker\Zed\MerchantStock\Communication\Plugin\Merchant\MerchantStockMerchantExpanderPlugin;
use Spryker\Zed\MerchantStock\Communication\Plugin\Merchant\MerchantStockMerchantPostCreatePlugin;

class MerchantDependencyProvider extends SprykerMerchantDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\MerchantExtension\Dependency\Plugin\MerchantPostCreatePluginInterface>
     */
    protected function getMerchantPostCreatePlugins(): array
    {
        return [
            new MerchantStockMerchantPostCreatePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\MerchantExtension\Dependency\Plugin\MerchantExpanderPluginInterface>
     */
    protected function getMerchantExpanderPlugins(): array
    {
        return [
            new MerchantStockMerchantExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure the following actions take place as expected:
* When you retrieve a merchant using `MerchantFacade::get()`, the response transfer contains merchant stocks.
* When you create a merchant in the Back Office, its stock also gets created in the `spy_merchant_stock` table.

{% endinfo_block %}

**src/Pyz/Zed/MerchantGui/MerchantGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\MerchantGui;

use Spryker\Zed\MerchantGui\MerchantGuiDependencyProvider as SprykerMerchantGuiDependencyProvider;
use Spryker\Zed\MerchantStockGui\Communication\Plugin\MerchantGui\MerchantStockMerchantFormExpanderPlugin;

class MerchantGuiDependencyProvider extends SprykerMerchantGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\MerchantGuiExtension\Dependency\Plugin\MerchantFormExpanderPluginInterface>
     */
    protected function getMerchantFormExpanderPlugins(): array
    {
        return [
            new MerchantStockMerchantFormExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that when you edit a merchant on `http://zed.de.demo-spryker.com/merchant-gui/list-merchant`, the `Warehouses` field is displayed.

{% endinfo_block %}

**src/Pyz/Zed/ProductOfferGui/ProductOfferGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductOfferGui;

use Spryker\Zed\ProductOfferGui\ProductOfferGuiDependencyProvider as SprykerProductOfferGuiDependencyProvider;
use Spryker\Zed\ProductOfferStockGui\Communication\Plugin\ProductOffer\ProductOfferStockProductOfferViewSectionPlugin;

class ProductOfferGuiDependencyProvider extends SprykerProductOfferGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductOfferGuiExtension\Dependency\Plugin\ProductOfferViewSectionPluginInterface>
     */
    public function getProductOfferViewSectionPlugins(): array
    {
        return [
            new ProductOfferStockProductOfferViewSectionPlugin(),
        ];
    }
}

```

{% info_block warningBox "Verification" %}

Make sure that when you view some product offer at `http://zed.de.demo-spryker.com/product-offer-gui/view?id-product-offer={{idProductOffer}}`, you the `Stock` section is displayed.

{% endinfo_block %}

**src/Pyz/Zed/ProductOffer/ProductOfferDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductOffer;

use Spryker\Zed\ProductOffer\ProductOfferDependencyProvider as SprykerProductOfferDependencyProvider;
use Spryker\Zed\ProductOfferStock\Communication\Plugin\ProductOffer\ProductOfferStockProductOfferExpanderPlugin;
use Spryker\Zed\ProductOfferStock\Communication\Plugin\ProductOffer\ProductOfferStockProductOfferPostCreatePlugin;
use Spryker\Zed\ProductOfferStock\Communication\Plugin\ProductOffer\ProductOfferStockProductOfferPostUpdatePlugin;

class ProductOfferDependencyProvider extends SprykerProductOfferDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductOfferExtension\Dependency\Plugin\ProductOfferPostCreatePluginInterface>
     */
    protected function getProductOfferPostCreatePlugins(): array
    {
        return [
            new ProductOfferStockProductOfferPostCreatePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductOfferExtension\Dependency\Plugin\ProductOfferPostUpdatePluginInterface>
     */
    protected function getProductOfferPostUpdatePlugins(): array
    {
        return [
            new ProductOfferStockProductOfferPostUpdatePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductOfferExtension\Dependency\Plugin\ProductOfferExpanderPluginInterface>
     */
    protected function getProductOfferExpanderPlugins(): array
    {
        return [
            new ProductOfferStockProductOfferExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure the following actions take place as expected:
* When you create a product offer using `ProductOfferFacade::create()` with provided stock data, it persists to `spy_product_offer_stock`.
* When you update a product offer using `ProductOfferFacade::create()` with provided stock data, it updates stock data in `spy_product_offer_stock`.
* When you retrieve a product offer using `ProductOfferFacade::findOne()`, the response data contains info about product offer stocks.

{% endinfo_block %}

**src/Pyz/Zed/Availability/AvailabilityDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Availability;

use Spryker\Zed\Availability\AvailabilityDependencyProvider as SprykerAvailabilityDependencyProvider;
use Spryker\Zed\ProductOfferAvailability\Communication\Plugin\Availability\ProductOfferAvailabilityStrategyPlugin;

class AvailabilityDependencyProvider extends SprykerAvailabilityDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\AvailabilityExtension\Dependency\Plugin\AvailabilityStrategyPluginInterface>
     */
    protected function getAvailabilityStrategyPlugins(): array
    {
        return [
            new ProductOfferAvailabilityStrategyPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that `AvailabilityFacade::findOrCreateProductConcreteAvailabilityBySkuForStore()` returns not a product but a product offer availability if the product offer reference is passed in the request.

{% endinfo_block %}

### 6) Configure export to Redis

This step publishes tables on change (create, edit) to the `spy_product_offer_availability_storage` and synchronizes the data to the storage.

#### Set up event listeners

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| ProductOfferAvailabilityStorageEventSubscriber | Registers listeners that are responsible for publishing product offer availability-related changes to the storage. |  | Spryker\Zed\ProductOfferAvailabilityStorage\Communication\Plugin\Event\Subscriber |

**src/Pyz/Zed/Event/EventDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Event;

use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;
use Spryker\Zed\ProductOfferAvailabilityStorage\Communication\Plugin\Event\Subscriber\ProductOfferAvailabilityStorageEventSubscriber;


class EventDependencyProvider extends SprykerEventDependencyProvider
{
    /**
     * @return \Spryker\Zed\Event\Dependency\EventSubscriberCollectionInterface
     */
    public function getEventSubscriberCollection()
    {
        $eventSubscriberCollection = parent::getEventSubscriberCollection();
        $eventSubscriberCollection->add(new ProductOfferAvailabilityStorageEventSubscriber());

        return $eventSubscriberCollection;
    }
}
```

#### Set up publishers

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| ProductOfferAvailabilityProductOfferStoreStoragePublisherPlugin | Synchronizes product offer availability to the storage when the product offer store entity has changed. |  | Spryker\Zed\ProductOfferAvailabilityStorage\Communication\Plugin\Publisher\ProductOfferAvailability |

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;
use Spryker\Zed\ProductOfferAvailabilityStorage\Communication\Plugin\Publisher\ProductOfferAvailability\ProductOfferAvailabilityProductOfferStoreStoragePublisherPlugin;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getPublisherPlugins(): array
    {
        return array_merge(
            ...
            $this->getProductOfferAvailabilityStoragePlugins(),
        );
    }

    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getProductOfferAvailabilityStoragePlugins(): array
    {
        return [
            new ProductOfferAvailabilityProductOfferStoreStoragePublisherPlugin(),
        ];
    }
}
```

#### Register the synchronization queue and synchronization error queue

**src/Pyz/Client/RabbitMq/RabbitMqConfig.php**

```php
<?php

namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
use Spryker\Shared\ProductOfferAvailabilityStorage\ProductOfferAvailabilityStorageConfig;;

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
            ProductOfferAvailabilityStorageConfig::PRODUCT_OFFER_AVAILABILITY_SYNC_STORAGE_QUEUE,
        ];
    }
}
```

#### Configure message processors

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| SynchronizationStorageQueueMessageProcessorPlugin | Configures all product offer availability messages to sync with the Redis storage and marks messages as failed in case of error. |  | Spryker\Zed\Synchronization\Communication\Plugin\Queue |

**src/Pyz/Zed/ProductOfferAvailabilityStorage/ProductOfferAvailabilityStorageConfig.php**

```php
<?php

namespace Pyz\Zed\ProductOfferAvailabilityStorage;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Zed\ProductOfferAvailabilityStorage\ProductOfferAvailabilityStorageConfig as SprykerProductOfferAvailabilityStorageConfig;

class ProductOfferAvailabilityStorageConfig extends SprykerProductOfferAvailabilityStorageConfig
{
    /**
     * @return string|null
     */
    public function getProductOfferAvailabilitySynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }
}
```

**src/Pyz/Zed/Queue/QueueDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Queue;

use Spryker\Shared\ProductOfferAvailabilityStorage\ProductOfferAvailabilityStorageConfig;
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
            ProductOfferAvailabilityStorageConfig::PRODUCT_OFFER_AVAILABILITY_SYNC_STORAGE_QUEUE => new SynchronizationStorageQueueMessageProcessorPlugin(),
        ];
    }
}
```

#### Set up, regenerate, and resync features

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| ProductOfferAvailabilitySynchronizationDataBulkPlugin | Allows synchronizing the entire storage table content into the storage. |  | Spryker\Zed\ProductOfferAvailabilityStorage\Communication\Plugin\Synchronization |

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\ProductOfferAvailabilityStorage\Communication\Plugin\Synchronization\ProductOfferAvailabilitySynchronizationDataBulkPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface>
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new ProductOfferAvailabilitySynchronizationDataBulkPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure the following actions take place as expected:
* The command `console sync:data merchant_profile` exports data from the `spy_product_offer_availability_storage` table to Redis.
* When a product offer availability entity gets created or updated through ORM, it is exported to Redis accordingly.

{% endinfo_block %}

### 7) Import data

Import the following data.

#### Import merchant stock data

Prepare your data according to your requirements using the demo data:

**data/import/common/common/marketplace/merchant_stock.csv**

```
merchant_reference,stock_name
MER000001,Spryker MER000001 Warehouse 1
MER000002,Video King MER000002 Warehouse 1
MER000005,Budget Cameras MER000005 Warehouse 1
MER000006,Sony Experts MER000006 Warehouse 1
```

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
|-|-|-|-|-|
| merchant_reference | &check; | string | MER000001 | Merchant identifier. |
| stock_name | &check; | string | Spryker MER000001 Warehouse 1 | Stock identifier. |

#### Import product offer stock data

**data/import/common/common/marketplace/product_offer_stock.csv**

<details>
<summary markdown='span'>Prepare your data according to your requirements using the demo data:</summary>

```
product_offer_reference,stock_name,quantity,is_never_out_of_stock
offer1,Spryker MER000001 Warehouse 1,10,1
offer2,Video King MER000002 Warehouse 1,0,0
offer3,Spryker MER000001 Warehouse 1,10,0
offer4,Video King MER000002 Warehouse 1,0,0
offer5,Spryker MER000001 Warehouse 1,10,1
offer6,Video King MER000002 Warehouse 1,10,0
offer8,Video King MER000002 Warehouse 1,0,0
offer9,Video King MER000002 Warehouse 1,0,0
offer10,Video King MER000002 Warehouse 1,0,0
offer11,Video King MER000002 Warehouse 1,0,0
offer12,Video King MER000002 Warehouse 1,0,0
offer13,Video King MER000002 Warehouse 1,0,0
offer14,Video King MER000002 Warehouse 1,0,0
offer15,Video King MER000002 Warehouse 1,0,0
offer16,Video King MER000002 Warehouse 1,0,0
offer17,Video King MER000002 Warehouse 1,0,0
offer18,Video King MER000002 Warehouse 1,10,0
offer19,Video King MER000002 Warehouse 1,10,0
offer20,Video King MER000002 Warehouse 1,10,0
offer21,Video King MER000002 Warehouse 1,10,0
offer22,Video King MER000002 Warehouse 1,10,0
offer23,Video King MER000002 Warehouse 1,10,0
offer24,Video King MER000002 Warehouse 1,10,0
offer25,Video King MER000002 Warehouse 1,10,0
offer26,Video King MER000002 Warehouse 1,10,0
offer27,Video King MER000002 Warehouse 1,10,0
offer28,Video King MER000002 Warehouse 1,10,0
offer29,Video King MER000002 Warehouse 1,10,0
offer30,Video King MER000002 Warehouse 1,10,1
offer31,Video King MER000002 Warehouse 1,10,1
offer32,Video King MER000002 Warehouse 1,10,1
offer33,Video King MER000002 Warehouse 1,10,1
offer34,Video King MER000002 Warehouse 1,5,1
offer35,Video King MER000002 Warehouse 1,5,1
offer36,Video King MER000002 Warehouse 1,5,1
offer37,Video King MER000002 Warehouse 1,5,1
offer38,Video King MER000002 Warehouse 1,5,1
offer39,Video King MER000002 Warehouse 1,2,1
offer40,Video King MER000002 Warehouse 1,2,1
offer41,Video King MER000002 Warehouse 1,2,1
offer42,Video King MER000002 Warehouse 1,2,1
offer43,Video King MER000002 Warehouse 1,2,1
offer44,Video King MER000002 Warehouse 1,20,1
offer45,Video King MER000002 Warehouse 1,20,1
offer46,Video King MER000002 Warehouse 1,20,1
offer47,Video King MER000002 Warehouse 1,20,1
offer48,Video King MER000002 Warehouse 1,20,1
offer49,Budget Cameras MER000005 Warehouse 1,0,1
offer50,Budget Cameras MER000005 Warehouse 1,0,1
offer51,Budget Cameras MER000005 Warehouse 1,0,1
offer52,Budget Cameras MER000005 Warehouse 1,0,1
offer53,Budget Cameras MER000005 Warehouse 1,0,1
offer54,Budget Cameras MER000005 Warehouse 1,0,1
offer55,Budget Cameras MER000005 Warehouse 1,0,1
offer56,Budget Cameras MER000005 Warehouse 1,0,1
offer57,Budget Cameras MER000005 Warehouse 1,0,1
offer58,Budget Cameras MER000005 Warehouse 1,0,1
offer59,Budget Cameras MER000005 Warehouse 1,0,1
offer60,Budget Cameras MER000005 Warehouse 1,0,1
offer61,Budget Cameras MER000005 Warehouse 1,0,1
offer62,Budget Cameras MER000005 Warehouse 1,0,1
offer63,Budget Cameras MER000005 Warehouse 1,0,1
offer64,Budget Cameras MER000005 Warehouse 1,0,1
offer65,Budget Cameras MER000005 Warehouse 1,0,1
offer66,Budget Cameras MER000005 Warehouse 1,0,1
offer67,Budget Cameras MER000005 Warehouse 1,0,1
offer68,Budget Cameras MER000005 Warehouse 1,0,1
offer69,Budget Cameras MER000005 Warehouse 1,0,1
offer70,Budget Cameras MER000005 Warehouse 1,0,1
offer71,Budget Cameras MER000005 Warehouse 1,0,1
offer72,Budget Cameras MER000005 Warehouse 1,0,1
offer73,Budget Cameras MER000005 Warehouse 1,0,1
offer74,Budget Cameras MER000005 Warehouse 1,0,1
offer75,Budget Cameras MER000005 Warehouse 1,0,1
offer76,Budget Cameras MER000005 Warehouse 1,0,1
offer77,Budget Cameras MER000005 Warehouse 1,0,1
offer78,Budget Cameras MER000005 Warehouse 1,0,1
offer79,Budget Cameras MER000005 Warehouse 1,0,1
offer80,Budget Cameras MER000005 Warehouse 1,0,1
offer81,Budget Cameras MER000005 Warehouse 1,0,1
offer82,Budget Cameras MER000005 Warehouse 1,0,1
offer83,Budget Cameras MER000005 Warehouse 1,0,1
offer84,Budget Cameras MER000005 Warehouse 1,0,1
offer85,Budget Cameras MER000005 Warehouse 1,0,1
offer86,Budget Cameras MER000005 Warehouse 1,0,1
offer87,Budget Cameras MER000005 Warehouse 1,0,1
offer88,Budget Cameras MER000005 Warehouse 1,0,1
offer89,Budget Cameras MER000005 Warehouse 1,0,1
offer90,Sony Experts MER000006 Warehouse 1,0,1
offer91,Sony Experts MER000006 Warehouse 1,0,1
offer92,Sony Experts MER000006 Warehouse 1,0,1
offer93,Sony Experts MER000006 Warehouse 1,0,1
offer94,Sony Experts MER000006 Warehouse 1,0,1
offer95,Sony Experts MER000006 Warehouse 1,0,1
offer96,Sony Experts MER000006 Warehouse 1,0,1
offer97,Sony Experts MER000006 Warehouse 1,0,1
offer98,Sony Experts MER000006 Warehouse 1,0,1
offer99,Sony Experts MER000006 Warehouse 1,0,1
offer100,Sony Experts MER000006 Warehouse 1,0,1
offer101,Sony Experts MER000006 Warehouse 1,0,1
offer102,Sony Experts MER000006 Warehouse 1,0,1
offer103,Sony Experts MER000006 Warehouse 1,0,1
offer169,Sony Experts MER000006 Warehouse 1,0,1
offer170,Sony Experts MER000006 Warehouse 1,0,1
offer171,Sony Experts MER000006 Warehouse 1,0,1
offer172,Sony Experts MER000006 Warehouse 1,0,1
offer173,Sony Experts MER000006 Warehouse 1,0,1
offer348,Sony Experts MER000006 Warehouse 1,0,1
offer349,Sony Experts MER000006 Warehouse 1,0,1
offer350,Sony Experts MER000006 Warehouse 1,0,1
offer351,Sony Experts MER000006 Warehouse 1,0,1
offer352,Sony Experts MER000006 Warehouse 1,0,1
offer353,Sony Experts MER000006 Warehouse 1,0,1
offer354,Sony Experts MER000006 Warehouse 1,0,1
offer355,Sony Experts MER000006 Warehouse 1,0,1
offer356,Sony Experts MER000006 Warehouse 1,0,1
offer357,Sony Experts MER000006 Warehouse 1,0,1
offer358,Sony Experts MER000006 Warehouse 1,0,1
offer359,Sony Experts MER000006 Warehouse 1,0,1
offer360,Sony Experts MER000006 Warehouse 1,0,1
```

</details>

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
|-|-|-|-|-|
| product_offer_reference | &check; | string | offer350 | Product offer identifier. |
| stock_name | &check; | string | Spryker MER000001 Warehouse 1 | Stock identifier. |
| quantity | &check; | int | 21 | Amount of available product offers. |
| is_never_out_of_stock | &check; | int | 1 | Flag that lets you make a product offer always available, ignoring stock quantity. |

Register the following plugins to enable data import:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantStockDataImportPlugin | Imports merchant stock data into the database. |  | Spryker\Zed\MerchantStockDataImport\Communication\Plugin |
| ProductOfferStockDataImportPlugin | Imports product offer stock data into the database. |  | Spryker\Zed\ProductOfferStockDataImport\Communication\Plugin |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\MerchantStockDataImport\Communication\Plugin\MerchantStockDataImportPlugin;
use Spryker\Zed\ProductOfferStockDataImport\Communication\Plugin\ProductOfferStockDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    protected function getDataImporterPlugins(): array
    {
        return [
            new MerchantStockDataImportPlugin(),
            new ProductOfferStockDataImportPlugin(),
        ];
    }
}
```

**data/import/local/full_EU.yml**

```yml
version: 0

actions:
  - data_entity: merchant-stock
    source: data/import/common/common/marketplace/merchant_stock.csv
  - data_entity: product-offer-stock
    source: data/import/common/common/marketplace/product_offer_stock.csv
```

**data/import/local/full_US.yml**

```yml
version: 0

actions:
  - data_entity: merchant-stock
    source: data/import/common/common/marketplace/merchant_stock.csv
  - data_entity: product-offer-stock
    source: data/import/common/common/marketplace/product_offer_stock.csv
```

Import data:

```bash
console data:import merchant-stock
console data:import product-offer-stock
```

{% info_block warningBox "Warning" %}

Make sure that the imported data is added to the `spy_merchant_stock` and `spy_product_offer_stock` tables.

{% endinfo_block %}

## Install related features

| FEATURE                                             | REQUIRED FOR THE CURRENT FEATURE | INSTALLATION GUIDE                                                                                                                                                                                                       |
|-----------------------------------------------------|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Marketplace Inventory Management + Order Management |                           | [Marketplace Inventory Management + Order Management feature Integration](/docs/pbc/all/warehouse-management-system/{{page.version}}/marketplace/install-features/install-the-marketplace-inventory-management-packaging-units-feature.html) |
| Marketplace Inventory Management + Packaging Units  |                                  | [Marketplace Inventory Management + Packaging Units feature integration](/docs/pbc/all/warehouse-management-system/{{page.version}}/marketplace/install-features/install-the-marketplace-inventory-management-packaging-units-feature.html)   |
| Marketplace Product + Inventory Management          |                                  | [Marketplace Product + Inventory Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-inventory-management-feature-integration.html)                   |
