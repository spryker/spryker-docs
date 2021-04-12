---
title: Marketplace Inventory Management feature integration
last_updated: Dec 16, 2020
summary: This document describes the process how to integrate the Marketplace Inventory Management feature into a Spryker project.
---

## Install feature core
Follow the steps below to install the Marketplace Inventory Management feature core.

### Prerequisites
To start feature integration, overview and install the necessary features:

| NAME | VERSION | INTEGRATION GUIDE |
|-|-|-|
| Spryker Core | master | [Glue API: Spryker Core feature integration](https://documentation.spryker.com/docs/glue-api-spryker-core-feature-integration)  |
| Marketplace Product Offer | master | [Marketplace Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/product-offer-feature-integration.html)  |
| Inventory Management | master | [Inventory Management feature integration](https://documentation.spryker.com/docs/inventory-management-feature-integration)  |

### 1) Install the required modules using Composer
Run the following commands to install the required modules:

```bash
composer require spryker-feature/marketplace-inventory-management: "dev-master" --update-with-dependencies
```

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

### 2) Set up the database schema
Adjust the schema definition so entity changes will trigger events:

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

Run the following commands to apply database changes and to generate entity and transfer changes.

```bash
console transfer:generate
console propel:install
console transfer:generate
```

---
**Verification**

Verify the following changes by checking your database

| DATABASE ENTITY | TYPE | EVENT |
|-|-|-|
| spy_merchant_stock | table | created |
| spy_product_offer_stock | table | created |
| spy_product_offer_availability_storage | table | created |

---

### 3) Set up transfer objects
Run the following command to generate transfer changes:

```bash
console transfer:generate
```

---
**Verification**

Make sure that the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
|-|-|-|-|
| MerchantStock | object | Created | src/Generated/Shared/Transfer/MerchantStockTransfer |
| MerchantStockCriteria | object | Created | src/Generated/Shared/Transfer/MerchantStockCriteriaTransfer |
| ProductAvailabilityCriteria | object | Created | src/Generated/Shared/Transfer/ProductAvailabilityCriteriaTransfer |
| ProductConcreteAvailability | object | Created | src/Generated/Shared/Transfer/ProductConcreteAvailabilityTransfer |
| ProductOfferAvailabilityRequest | object | Created | src/Generated/Shared/Transfer/ProductOfferAvailabilityRequestTransfer |
| ProductOfferAvailabilityStorage | object | Created | src/Generated/Shared/Transfer/ProductOfferAvailabilityStorageTransfer |
| ProductOfferStock | object | Created | src/Generated/Shared/Transfer/ProductOfferStockTransfer |
| ProductOfferStockRequest | object | Created | src/Generated/Shared/Transfer/ProductOfferStockRequestTransfer |
| ReservationRequest | object | Created | src/Generated/Shared/Transfer/ReservationRequestTransfer |
| SpyMerchantStockEntity | object | Created | src/Generated/Shared/Transfer/SpyMerchantStockEntityTransfer |
| SpyMerchantUserEntity | object | Created | src/Generated/Shared/Transfer/SpyMerchantUserEntityTransfer |
| SpyProductOfferAvailabilityStorageEntity | object | Created | src/Generated/Shared/Transfer/SpyProductOfferAvailabilityStorageEntityTransfer |
| SpyProductOfferStockEntity | object | Created | src/Generated/Shared/Transfer/SpyProductOfferStockEntityTransfer |

---

### 4) Add translations
#### Zed translations

Run the following command to generate a new translation cache for Zed:

```bash
console translator:generate-cache
```

### 5) Set up behavior
Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantStockMerchantExpanderPlugin | Expands MerchantTransfer with related stocks. | None | Spryker\Zed\MerchantStock\Communication\Plugin\Merchant |
| MerchantStockMerchantPostCreatePlugin | Creates default stock for the merchant. | None | Spryker\Zed\MerchantStock\Communication\Plugin\Merchant |
| MerchantStockMerchantFormExpanderPlugin | Expands MerchantForm with form field for merchant warehouses. | None | Spryker\Zed\MerchantStockGui\Communication\Plugin\MerchantGui |
| ProductOfferStockProductOfferExpanderPlugin | Expands ProductOfferTransfer with Product Offer Stock. | None | Spryker\Zed\ProductOfferStock\Communication\Plugin\ProductOffer |
| ProductOfferStockProductOfferPostCreatePlugin | Persists product offer stock on product offer create. | None | Spryker\Zed\ProductOfferStock\Communication\Plugin\ProductOffer |
| ProductOfferStockProductOfferPostUpdatePlugin | Persists product offer stock on product offer updated. | None | Spryker\Zed\ProductOfferStock\Communication\Plugin\ProductOffer |
| ProductOfferAvailabilityStrategyPlugin | Reads product offer availability. | None | Spryker\Zed\ProductOfferAvailability\Communication\Plugin\Availability |

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
     * @return \Spryker\Zed\MerchantExtension\Dependency\Plugin\MerchantPostCreatePluginInterface[]
     */
    protected function getMerchantPostCreatePlugins(): array
    {
        return [
            new MerchantStockMerchantPostCreatePlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\MerchantExtension\Dependency\Plugin\MerchantExpanderPluginInterface[]
     */
    protected function getMerchantExpanderPlugins(): array
    {
        return [
            new MerchantStockMerchantExpanderPlugin(),
        ];
    }
}
```

---
**Verification**

Make sure that when you retrieve merchant using `MerchantFacade::get()` the response transfer contains merchant stocks.

Make sure that when you create a merchant in Zed UI, its stock also gets created in `spy_merchant_stock` table.

---

**src/Pyz/Zed/MerchantGui/MerchantGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\MerchantGui;

use Spryker\Zed\MerchantGui\MerchantGuiDependencyProvider as SprykerMerchantGuiDependencyProvider;
use Spryker\Zed\MerchantStockGui\Communication\Plugin\MerchantGui\MerchantStockMerchantFormExpanderPlugin;

class MerchantGuiDependencyProvider extends SprykerMerchantGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\MerchantGuiExtension\Dependency\Plugin\MerchantFormExpanderPluginInterface[]
     */
    protected function getMerchantFormExpanderPlugins(): array
    {
        return [
            new MerchantStockMerchantFormExpanderPlugin(),
        ];
    }
}
```

---
**Verification**

Make sure that when you edit some merchant on `http://zed.de.demo-spryker.com/merchant-gui/list-merchant`, you can see the `Wherehouses` field.

---

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
     * @return \Spryker\Zed\ProductOfferExtension\Dependency\Plugin\ProductOfferPostCreatePluginInterface[]
     */
    protected function getProductOfferPostCreatePlugins(): array
    {
        return [
            new ProductOfferStockProductOfferPostCreatePlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\ProductOfferExtension\Dependency\Plugin\ProductOfferPostUpdatePluginInterface[]
     */
    protected function getProductOfferPostUpdatePlugins(): array
    {
        return [
            new ProductOfferStockProductOfferPostUpdatePlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\ProductOfferExtension\Dependency\Plugin\ProductOfferExpanderPluginInterface[]
     */
    protected function getProductOfferExpanderPlugins(): array
    {
        return [
            new ProductOfferStockProductOfferExpanderPlugin(),
        ];
    }
}
```

---
**Verification**

Make sure that when you create a product offer using `ProductOfferFacade::create()` with provided stock data, it persists to `spy_product_offer_stock`.

Make sure that when you update a product offer using `ProductOfferFacade::create()` with provided stock data, it updates stock data in `spy_product_offer_stock`.

Make sure that when you retrieve a product offer using `ProductOfferFacade::findOne()` the response data contains info about product offer stocks.

---

**src/Pyz/Zed/Availability/AvailabilityDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Availability;

use Spryker\Zed\Availability\AvailabilityDependencyProvider as SprykerAvailabilityDependencyProvider;
use Spryker\Zed\ProductOfferAvailability\Communication\Plugin\Availability\ProductOfferAvailabilityStrategyPlugin;

class AvailabilityDependencyProvider extends SprykerAvailabilityDependencyProvider
{
    /**
     * @return \Spryker\Zed\AvailabilityExtension\Dependency\Plugin\AvailabilityStrategyPluginInterface[]
     */
    protected function getAvailabilityStrategyPlugins(): array
    {
        return [
            new ProductOfferAvailabilityStrategyPlugin(),
        ];
    }
}
```

---
**Verification**

Make sure that `AvailabilityFacade::findOrCreateProductConcreteAvailabilityBySkuForStore()` returns not a product, but a product offer availability if the product offer reference passed in the request.

---

### 6) Configure export to Redis

This step will publish tables on change (create, edit) to the `spy_product_offer_availability_storage` and synchronize the data to Storage.

#### Set up event, listeners, and publishers

| Plugin | Specification | Prerequisites | Namespace |
|-|-|-|-|
| ProductOfferAvailabilityStorageEventSubscriber | Registers listeners that are responsible for publishing product offer availability related changes to storage. | None | Spryker\Zed\ProductOfferAvailabilityStorage\Communication\Plugin\Event\Subscriber |

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

#### Register the synchronization queue and synchronization error queue

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
| SynchronizationStorageQueueMessageProcessorPlugin | Configures all product offer availability messages to sync with Redis storage, and marks messages as failed in case of error. | None | Spryker\Zed\Synchronization\Communication\Plugin\Queue |

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
     * @return \Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface[]
     */
    protected function getProcessorMessagePlugins(Container $container)
    {
        return [
            ProductOfferAvailabilityStorageConfig::PRODUCT_OFFER_AVAILABILITY_SYNC_STORAGE_QUEUE => new SynchronizationStorageQueueMessageProcessorPlugin(),
        ];
    }
}
```

#### Set up re-generate and re-sync features

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| ProductOfferAvailabilitySynchronizationDataBulkPlugin | Allows synchronizing the entire storage table content into Storage. | None | Spryker\Zed\ProductOfferAvailabilityStorage\Communication\Plugin\Synchronization |

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\ProductOfferAvailabilityStorage\Communication\Plugin\Synchronization\ProductOfferAvailabilitySynchronizationDataBulkPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new ProductOfferAvailabilitySynchronizationDataBulkPlugin(),
        ];
    }
}
```

---
**Verification**

Make sure that the command `console sync:data merchant_profile` exports data from `spy_product_offer_availability_storage` table to Redis.

Make sure that when a product offer availability entities get created or updated through ORM, it is exported to Redis accordingly.

---

### 8) Import data
Import the following data.

#### Import Merchant Stock data
Prepare your data according to your requirements using our demo data:

```bash
merchant_reference,stock_name
MER000001,Spryker MER000001 Warehouse 1
MER000002,Video King MER000002 Warehouse 1
MER000005,Budget Cameras MER000005 Warehouse 1
MER000006,Sony Experts MER000006 Warehouse 1
```

| COLUMN | REQUIRED? | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
|-|-|-|-|-|
| merchant_reference | mandatory | string | MER000001 | Merchant identifier. |
| stock_name | mandatory | string | Spryker MER000001 Warehouse 1 | Stock identifier. |

#### Import Product Offer Stock data

<details>
<summary markdown='span'>Prepare your data according to your requirements using our demo data:</summary>

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

| COLUMN | REQUIRED? | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
|-|-|-|-|-|
| product_offer_reference | mandatory | string | offer350 | Product offer identifier. |
| stock_name | mandatory | string | Spryker MER000001 Warehouse 1 | Stock identifier. |
| quantity | mandatory | int | 21 | The amount of available product offers. |
| is_never_out_of_stock | mandatory | int | 1 | Flag, the allows to make product offer always available, ignoring stock quantity. |

Register the following plugins to enable data import:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantStockDataImportPlugin | Imports merchant stock data into the database. | None | Spryker\Zed\MerchantStockDataImport\Communication\Plugin |
| ProductOfferStockDataImportPlugin | Imports product offer stock data into the database. | None | Spryker\Zed\ProductOfferStockDataImport\Communication\Plugin |

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

Run the following console command to import data:

```bash
console data:import merchant-stock
console data:import product-offer-stock
```

---
**Verification**

Make sure that imported data is added to the `spy_merchant_stock` and `spy_product_offer_stock` tables.

---
