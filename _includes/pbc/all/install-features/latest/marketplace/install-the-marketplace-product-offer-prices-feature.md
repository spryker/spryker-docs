

This document describes how to install the [Marketplace Product Offer Prices](/docs/pbc/all/price-management/latest/marketplace/marketplace-product-offer-prices-feature-overview.html) feature.

## Install feature core

Follow the steps below to install the Marketplace Product Offer Prices feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|---|---|---|
| Spryker Core | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Prices | 202507.0 |[Install the Prices feature](/docs/pbc/all/price-management/latest/base-shop/install-and-upgrade/install-features/install-the-prices-feature.html) |
| Marketplace Product Offer | 202507.0 | [Install the Marketplace Product Offer feature](/docs/pbc/all/offer-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-feature.html) |


### 1) Install the required modules

```bash
composer require spryker-feature/marketplace-product-offer-prices:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| PriceProductOffer | spryker/price-product-offer |
| PriceProductOfferDataImport | spryker/price-product-offer-data-import |
| PriceProductOfferGui | spryker/price-product-offer-gui |
| PriceProductOfferStorage | spryker/price-product-offer-storage |
| PriceProductOfferStorageExtension | spryker/price-product-offer-storage-extension |
| PriceProductOfferVolume | spryker/price-product-offer-volume |
| PriceProductOfferVolumeGui | spryker/price-product-offer-volume-gui |

{% endinfo_block %}

### 2) Set up the database schema

1. Adjust the schema definition so that entity changes trigger events:

**src/Pyz/Zed/PriceProductOffer/Persistence/Propel/Schema/spy_price_product_offer.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          name="zed"
          xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\PriceProductOffer\Persistence"
          package="src.Orm.Zed.PriceProductOffer.Persistence"
>
  <table name="spy_price_product_offer" class="SpyPriceProductOffer">
    <behavior name="event">
      <parameter name="spy_price_product_offer_all" column="*"/>
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

Verify that the following changes have been implemented by checking your database:

| DATABASE ENTITY | TYPE | EVENT |
|-|-|-|
| spy_price_product_offer | table | created |
| spy_product_concrete_product_offer_price_storage | table | created |

Make sure the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
|-|-|-|-|
| PriceProductOffer | class | created | src/Generated/Shared/Transfer/PriceProductOfferTransfer |
| PriceProductOfferCriteria | class | created | src/Generated/Shared/Transfer/PriceProductOfferCriteriaTransfer |
| PriceProductOfferCollection | class | created |  src/Generated/Shared/Transfer/PriceProductOfferCollectionTransfer |
| PriceProductStoreCriteria | class | created | src/Generated/Shared/Transfer/PriceProductStoreCriteriaTransfer |
| Pagination | class | created | src/Generated/Shared/Transfer/PaginationTransfer |
| PriceProductCriteria.productOfferReference | property | created | src/Generated/Shared/Transfer/PriceProductCriteriaTransfer |
| PriceProduct.concreteSku | property | created | src/Generated/Shared/Transfer/PriceProductTransfer |
| PriceProductDimension.productOfferReference | property | created | src/Generated/Shared/Transfer/PriceProductDimensionTransfer |
| PriceProductDimension.idProductOffer | property | created | src/Generated/Shared/Transfer/PriceProductDimensionTransfer |
| PriceProductDimension.idPriceProductOffer | property | created | src/Generated/Shared/Transfer/PriceProductDimensionTransfer |
| ProductOffer.prices | property | created | src/Generated/Shared/Transfer/ProductOfferTransfer |
| PriceProductFilterIdentifier.productOfferReference | property | created | src/Generated/Shared/Transfer/PriceProductFilterIdentifierTransfer |
| ProductOfferStorage.price | property | created | src/Generated/Shared/Transfer/ProductOfferStorageTransfer |
| PriceProductFilter.productOfferReference | property | created |src/Generated/Shared/Transfer/PriceProductFilterTransfer |

{% endinfo_block %}

### 3) Add Zed translations

Generate a new translation cache for Zed:

```bash
console translator:generate-cache
```

### 4) Configure export to Redis

To configure export to Redis, take the steps in the following section:

#### Set up event listeners

{% info_block infoBox %}

In this step, you enable publishing of table changes - create, edit, delete to `spy_product_concrete_product_offer_price_storage` and synchronization of data to Storage.

{% endinfo_block %}

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| PriceProductOfferStorageEventSubscriber | Registers listeners that are responsible for publishing Product Offer Prices to storage. |   | Spryker\Zed\PriceProductOfferStorage\Communication\Plugin\Event\Subscriber |

**src/Pyz/Zed/Event/EventDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Event;

use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;
use Spryker\Zed\PriceProductOfferStorage\Communication\Plugin\Event\Subscriber\PriceProductOfferStorageEventSubscriber;

class EventDependencyProvider extends SprykerEventDependencyProvider
{
    public function getEventSubscriberCollection()
    {
        $eventSubscriberCollection = parent::getEventSubscriberCollection();
        $eventSubscriberCollection->add(new PriceProductOfferStorageEventSubscriber());

        return $eventSubscriberCollection;
    }
}
```

Register the synchronization queue and synchronization error queue:

**src/Pyz/Client/RabbitMq/RabbitMqConfig.php**

```php
<?php

namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
use Spryker\Shared\PriceProductOfferStorage\PriceProductOfferStorageConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     * @return array
     */
    protected function getQueueConfiguration(): array
    {
        return [
            PriceProductOfferStorageConfig::PRICE_PRODUCT_OFFER_OFFER_SYNC_STORAGE_QUEUE,
        ];
    }
}
```

Configure message processors:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| SynchronizationStorageQueueMessageProcessorPlugin | Configures all merchant product offers to sync with Redis storage, and marks messages as failed in case of error. |   | Spryker\Zed\Synchronization\Communication\Plugin\Queue |

**src/Pyz/Zed/Queue/QueueDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Queue;

use Spryker\Shared\PriceProductOfferStorage\PriceProductOfferStorageConfig;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;
use Spryker\Zed\Synchronization\Communication\Plugin\Queue\SynchronizationStorageQueueMessageProcessorPlugin;

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
            PriceProductOfferStorageConfig::PRICE_PRODUCT_OFFER_OFFER_SYNC_STORAGE_QUEUE => new SynchronizationStorageQueueMessageProcessorPlugin(),
        ];
    }
}
```

Set up publisher:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| PriceProductStoreWritePublisherPlugin | Publishes product offer prices data by update events from the `spy_price_product_store` table. |   | Spryker\Zed\PriceProductOfferStorage\Communication\Plugin\Publisher\PriceProductOffer |
| PriceProductOfferPublisherTriggerPlugin | Allows publishing or republishing price product storage data manually. |   | Spryker\Zed\PriceProductOfferStorage\Communication\Plugin\Publisher |

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\PriceProductOfferStorage\Communication\Plugin\Publisher\PriceProductOffer\PriceProductStoreWritePublisherPlugin;
use Spryker\Zed\PriceProductOfferStorage\Communication\Plugin\Publisher\PriceProductOfferPublisherTriggerPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array
     */
    protected function getPublisherPlugins(): array
    {
        return array_merge(
            $this->getPriceProductOfferStoragePlugins(),
        );
    }

    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getPriceProductOfferStoragePlugins(): array
    {
        return [
            new PriceProductStoreWritePublisherPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface>
     */
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            new PriceProductOfferPublisherTriggerPlugin(),
        ];
    }
}
```

#### Set up, regenerate, and resync features

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| PriceProductOfferSynchronizationDataBulkRepositoryPlugin | Allows synchronizing the entire storage table content into Storage. |   | Spryker\Zed\PriceProductOfferStorage\Communication\Plugin\Synchronization |

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\PriceProductOfferStorage\Communication\Plugin\Synchronization\PriceProductOfferSynchronizationDataBulkRepositoryPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface>
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new PriceProductOfferSynchronizationDataBulkRepositoryPlugin(),
        ];
    }
}
```

#### Configure the synchronization pool name

**src/Pyz/Zed/PriceProductOfferStorage/PriceProductOfferStorageConfig.php**

```php
<?php

namespace Pyz\Zed\PriceProductOfferStorage;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Zed\PriceProductOfferStorage\PriceProductOfferStorageConfig as SprykerPriceProductOfferStorageConfig;

class PriceProductOfferStorageConfig extends SprykerPriceProductOfferStorageConfig
{
    /**
     * @return string|null
     */
    public function getPriceProductOfferSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that after setting up the event listeners, `console sync:data product_concrete_product_offer_price` exports data from the `spy_product_concrete_product_offer_price_storage` table to Redis.

Make sure that when the following entities get updated through the ORM, the corresponding Redis keys have the correct values.

| TARGET ENTITY | EXAMPLE EXPECTED DATA IDENTIFIER |
|-|-|
| PriceProductOffer | `kv:product_concrete_product_offer_price:de:6` |

<details>
<summary>An example of the expected data fragment</summary>

```json
[
  {
    "id_price_product_offer": "34",
    "product_offer_reference": "offer13",
    "price_type": "DEFAULT",
    "currency": "CHF",
    "net_price": "33923",
    "gross_price": "37692",
    "price_data": "{\"volume_prices\":null}"
  },
  {
    "id_price_product_offer": "35",
    "product_offer_reference": "offer13",
    "price_type": "DEFAULT",
    "currency": "EUR",
    "net_price": "29498",
    "gross_price": "32775",
    "price_data": "{\"volume_prices\":null}"
  },
  {
    "id_price_product_offer": "36",
    "product_offer_reference": "offer13",
    "price_type": "ORIGINAL",
    "currency": "CHF",
    "net_price": "34218",
    "gross_price": "38019",
    "price_data": "{\"volume_prices\":null}"
  },
  {
    "id_price_product_offer": "37",
    "product_offer_reference": "offer13",
    "price_type": "ORIGINAL",
    "currency": "EUR",
    "net_price": "29754",
    "gross_price": "33060",
    "price_data": "{\"volume_prices\":null}"
  },
  {
    "id_price_product_offer": "150",
    "product_offer_reference": "offer54",
    "price_type": "DEFAULT",
    "currency": "CHF",
    "net_price": "32138",
    "gross_price": "35708",
    "price_data": "{\"volume_prices\":null}"
  },
  {
    "id_price_product_offer": "151",
    "product_offer_reference": "offer54",
    "price_type": "DEFAULT",
    "currency": "EUR",
    "net_price": "27945",
    "gross_price": "31050",
    "price_data": "{\"volume_prices\":null}"
  },
  {
    "id_price_product_offer": "152",
    "product_offer_reference": "offer54",
    "price_type": "ORIGINAL",
    "currency": "CHF",
    "net_price": "32417",
    "gross_price": "36018",
    "price_data": "{\"volume_prices\":null}"
  },
  {
    "id_price_product_offer": "153",
    "product_offer_reference": "offer54",
    "price_type": "ORIGINAL",
    "currency": "EUR",
    "net_price": "28188",
    "gross_price": "31320",
    "price_data": "{\"volume_prices\":null}"
  }
]
```

</details>

{% endinfo_block %}

### 5) Import data

Prepare your data according to your requirements using the demo data:

<details><summary>data/import/common/common/marketplace/price_product_offer.csv</summary>

```csv
product_offer_reference,price_type,store,currency,value_net,value_gross,price_data.volume_prices
offer2,DEFAULT,DE,EUR,8144,10160,"[{""quantity"":5,""net_price"":6050,""gross_price"":7065}, {""quantity"":10,""net_price"":5045,""gross_price"":6058}, {""quantity"":20,""net_price"":4040,""gross_price"":5052}]"
offer2,DEFAULT,DE,CHF,10866,13184,
offer3,ORIGINAL,DE,EUR,17741,19712,
offer3,DEFAULT,DE,EUR,7741,9712,
offer3,ORIGINAL,DE,CHF,20402,22669,
offer3,DEFAULT,DE,CHF,10402,12669,
offer4,DEFAULT,DE,EUR,27741,29712,"[{""quantity"":6,""net_price"":60500,""gross_price"":70650}, {""quantity"":10,""net_price"":5045,""gross_price"":6058}, {""quantity"":20,""net_price"":4040,""gross_price"":5052}, {""quantity"":25,""net_price"":400,""gross_price"":505}]"
offer4,DEFAULT,DE,CHF,30402,32669,
offer5,ORIGINAL,DE,EUR,15713,17459,
offer5,DEFAULT,DE,EUR,5713,7459,
offer5,DEFAULT,DE,CHF,8070,10000,
offer6,DEFAULT,DE,EUR,25713,27459,
offer6,DEFAULT,DE,CHF,28070,30010,
offer8,DEFAULT,DE,CHF,9832,10925,
offer8,DEFAULT,DE,EUR,475,475,"[{""quantity"":5,""net_price"":150,""gross_price"":1000}, {""quantity"":10,""net_price"":145,""gross_price"":""""}, {""quantity"":20,""net_price"":140,""gross_price"":""""}]"
offer8,ORIGINAL,DE,CHF,12354,13727,
offer8,ORIGINAL,DE,EUR,10743,11936,
offer9,DEFAULT,DE,CHF,9832,10925,
offer9,DEFAULT,DE,EUR,8550,9500,
offer10,DEFAULT,DE,CHF,6392,7102,
offer10,DEFAULT,DE,EUR,5558,6175,
offer10,ORIGINAL,DE,CHF,7866,8740,
offer10,ORIGINAL,DE,EUR,6840,7600,
offer11,DEFAULT,DE,CHF,6883,7648,
offer11,DEFAULT,DE,EUR,5985,6650,
offer12,DEFAULT,DE,CHF,6883,7648,
offer12,DEFAULT,DE,EUR,5985,6650,
offer13,DEFAULT,DE,CHF,33923,37692,
offer13,DEFAULT,DE,EUR,29498,32775,
offer13,ORIGINAL,DE,CHF,34218,38019,
offer13,ORIGINAL,DE,EUR,29754,33060,
offer14,DEFAULT,DE,CHF,33923,37692,
offer14,DEFAULT,DE,EUR,29498,32775,
offer15,DEFAULT,DE,CHF,33923,37692,
offer15,DEFAULT,DE,EUR,29498,32775,
offer16,DEFAULT,DE,CHF,9832,10925,
offer16,DEFAULT,DE,EUR,8550,9500,
offer17,DEFAULT,DE,CHF,34021,37801,
offer17,DEFAULT,DE,EUR,29583,32870,
offer17,ORIGINAL,DE,CHF,35004,38893,
offer17,ORIGINAL,DE,EUR,30438,33820,
offer18,DEFAULT,DE,CHF,35987,39986,
offer18,DEFAULT,DE,EUR,31293,34770,
offer19,DEFAULT,DE,CHF,35987,39986,
offer19,DEFAULT,DE,EUR,31293,34770,
offer20,DEFAULT,DE,CHF,5604,6227,
offer20,DEFAULT,DE,EUR,4873,5415,
offer21,DEFAULT,DE,CHF,4503,5003,
offer21,DEFAULT,DE,EUR,3915,4351,
offer22,DEFAULT,DE,CHF,5900,6555,
offer22,DEFAULT,DE,EUR,5130,5700,
offer22,ORIGINAL,DE,CHF,7866,8740,
offer22,ORIGINAL,DE,EUR,6840,7600,
offer23,DEFAULT,DE,CHF,9832,10925,
offer23,DEFAULT,DE,EUR,8550,9500,
offer24,DEFAULT,DE,CHF,339909,377677,
offer24,DEFAULT,DE,EUR,295573,328415,
offer25,DEFAULT,DE,CHF,34020,37800,
offer25,DEFAULT,DE,EUR,29583,32870,
offer26,DEFAULT,DE,CHF,9832,10925,
offer26,DEFAULT,DE,EUR,8550,9500,
offer27,DEFAULT,DE,CHF,10403,11559,
offer27,DEFAULT,DE,EUR,9046,10051,
offer27,ORIGINAL,DE,CHF,10422,11580,
offer27,ORIGINAL,DE,EUR,9063,10070,
offer28,DEFAULT,DE,CHF,10502,11668,
offer28,DEFAULT,DE,EUR,9132,10146,
offer29,DEFAULT,DE,CHF,25565,28405,
offer29,DEFAULT,DE,EUR,22230,24700,
offer30,DEFAULT,DE,CHF,26277,29195,
offer30,DEFAULT,DE,EUR,22849,25387,
offer31,DEFAULT,DE,CHF,43756,48617,
offer31,DEFAULT,DE,EUR,38048,42275,
offer31,ORIGINAL,DE,CHF,44739,49709,
offer31,ORIGINAL,DE,EUR,38903,43225,
offer32,DEFAULT,DE,CHF,29498,32775,
offer32,DEFAULT,DE,EUR,25650,28500,
offer33,DEFAULT,DE,CHF,4130,4589,
offer33,DEFAULT,DE,EUR,3591,3990,
offer34,DEFAULT,DE,CHF,4819,5354,
offer34,DEFAULT,DE,EUR,4190,4655,
offer34,ORIGINAL,DE,CHF,5113,5681,
offer34,ORIGINAL,DE,EUR,4446,4940,
offer35,DEFAULT,DE,CHF,2950,3278,
offer35,DEFAULT,DE,EUR,2565,2850,
offer36,DEFAULT,DE,CHF,40337,44820,
offer36,DEFAULT,DE,EUR,35076,38973,
offer36,ORIGINAL,DE,CHF,41297,45885,
offer36,ORIGINAL,DE,EUR,35910,39900,
offer37,DEFAULT,DE,CHF,44270,49190,
offer37,DEFAULT,DE,EUR,38496,42773,
offer37,ORIGINAL,DE,CHF,46213,51348,
offer37,ORIGINAL,DE,EUR,40185,44650,
offer38,DEFAULT,DE,CHF,39354,43727,
offer38,DEFAULT,DE,EUR,34221,38023,
offer38,ORIGINAL,DE,CHF,40314,44793,
offer38,ORIGINAL,DE,EUR,35055,38950,
offer39,DEFAULT,DE,CHF,2754,3059,
offer39,DEFAULT,DE,EUR,2394,2660,
offer40,DEFAULT,DE,CHF,2459,2732,
offer40,DEFAULT,DE,EUR,2138,2375,
offer40,ORIGINAL,DE,CHF,2754,3059,
offer40,ORIGINAL,DE,EUR,2394,2660,
offer41,DEFAULT,DE,CHF,30500,33889,
offer41,DEFAULT,DE,EUR,26522,29469,
offer42,DEFAULT,DE,CHF,29249,32499,
offer42,DEFAULT,DE,EUR,25434,28260,
offer43,DEFAULT,DE,CHF,17698,19665,
offer43,DEFAULT,DE,EUR,15390,17100,
offer43,ORIGINAL,DE,CHF,18682,20758,
offer43,ORIGINAL,DE,EUR,16245,18050,
offer44,DEFAULT,DE,CHF,16715,18572,
offer44,DEFAULT,DE,EUR,14535,16150,
offer45,DEFAULT,DE,CHF,15732,17480,
offer45,DEFAULT,DE,EUR,13680,15200,
offer46,DEFAULT,DE,CHF,15633,17370,
offer46,DEFAULT,DE,EUR,13594,15105,
offer47,DEFAULT,DE,CHF,15535,17261,"[{""quantity"":4,""net_price"":null,""gross_price"":36500}, {""quantity"":7,""net_price"":null,""gross_price"":35800}, {""quantity"":17,""net_price"":null,""gross_price"":35200}, {""quantity"":22,""net_price"":null,""gross_price"":30000}]"
offer47,DEFAULT,DE,EUR,13509,15010,"[{""quantity"":4,""net_price"":null,""gross_price"":16500}, {""quantity"":7,""net_price"":null,""gross_price"":15800}, {""quantity"":17,""net_price"":null,""gross_price"":15200}]"
offer47,ORIGINAL,DE,CHF,16869,18743,
offer47,ORIGINAL,DE,EUR,14668,16299,
offer48,DEFAULT,DE,CHF,10206,11341,"[{""quantity"":3,""net_price"":40500,""gross_price"":40650}, {""quantity"":9,""net_price"":40450,""gross_price"":40580}, {""quantity"":17,""net_price"":40400,""gross_price"":40520}]"
offer48,DEFAULT,DE,EUR,8875,9861,"[{""quantity"":3,""net_price"":10500,""gross_price"":10650}, {""quantity"":9,""net_price"":10450,""gross_price"":10580}, {""quantity"":17,""net_price"":10400,""gross_price"":10520}]"
offer49,DEFAULT,DE,CHF,450,450,
offer49,DEFAULT,DE,CHF,9290,10280,
offer49,DEFAULT,DE,CHF,9300,10290,
offer49,DEFAULT,DE,CHF,9315,10350,
offer49,DEFAULT,DE,EUR,450,450,
offer49,DEFAULT,DE,EUR,8030,8930,
offer49,DEFAULT,DE,EUR,8040,8940,
offer49,DEFAULT,DE,EUR,8100,9000,
offer49,ORIGINAL,DE,CHF,11704,13005,
offer49,ORIGINAL,DE,EUR,10178,11308,
offer50,DEFAULT,DE,CHF,9315,10350,
offer50,DEFAULT,DE,EUR,8100,9000,
offer51,DEFAULT,DE,CHF,6056,6728,
offer51,DEFAULT,DE,EUR,5265,5850,
offer51,ORIGINAL,DE,CHF,7452,8280,
offer51,ORIGINAL,DE,EUR,6480,7200,
offer52,DEFAULT,DE,CHF,6521,7245,
offer52,DEFAULT,DE,EUR,5670,6300,
offer53,DEFAULT,DE,CHF,6521,7245,
offer53,DEFAULT,DE,EUR,5670,6300,
offer54,DEFAULT,DE,CHF,32138,35708,
offer54,DEFAULT,DE,EUR,27945,31050,
offer54,ORIGINAL,DE,CHF,32417,36018,
offer54,ORIGINAL,DE,EUR,28188,31320,
offer55,DEFAULT,DE,CHF,32138,35708,
offer55,DEFAULT,DE,EUR,27945,31050,
offer56,DEFAULT,DE,CHF,32138,35708,
offer56,DEFAULT,DE,EUR,27945,31050,
offer57,DEFAULT,DE,CHF,9315,10350,
offer57,DEFAULT,DE,EUR,8100,9000,
offer58,DEFAULT,DE,CHF,32230,35811,
offer58,DEFAULT,DE,EUR,28026,31140,
offer58,ORIGINAL,DE,CHF,33162,36846,
offer58,ORIGINAL,DE,EUR,28836,32040,
offer59,DEFAULT,DE,CHF,34093,37881,
offer59,DEFAULT,DE,EUR,29646,32940,
offer60,DEFAULT,DE,CHF,34093,37881,
offer60,DEFAULT,DE,EUR,29646,32940,
offer61,DEFAULT,DE,CHF,5309,5899,
offer61,DEFAULT,DE,EUR,4617,5130,
offer62,DEFAULT,DE,CHF,4266,4740,
offer62,DEFAULT,DE,EUR,3709,4122,
offer63,DEFAULT,DE,CHF,5589,6210,
offer63,DEFAULT,DE,EUR,4860,5400,
offer63,ORIGINAL,DE,CHF,7452,8280,
offer63,ORIGINAL,DE,EUR,6480,7200,
offer64,DEFAULT,DE,CHF,9315,10350,
offer64,DEFAULT,DE,EUR,8100,9000,
offer65,DEFAULT,DE,CHF,322019,357799,
offer65,DEFAULT,DE,EUR,280017,311130,
offer66,DEFAULT,DE,CHF,32229,35811,
offer66,DEFAULT,DE,EUR,28026,31140,
offer67,DEFAULT,DE,CHF,9315,10350,
offer67,DEFAULT,DE,EUR,8100,9000,
offer68,DEFAULT,DE,CHF,9855,10951,
offer68,DEFAULT,DE,EUR,8570,9522,
offer68,ORIGINAL,DE,CHF,9873,10971,
offer68,ORIGINAL,DE,EUR,8586,9540,
offer69,DEFAULT,DE,CHF,9949,11054,
offer69,DEFAULT,DE,EUR,8651,9612,
offer70,DEFAULT,DE,CHF,24219,26910,
offer70,DEFAULT,DE,EUR,21060,23400,
offer71,DEFAULT,DE,CHF,24894,27658,
offer71,DEFAULT,DE,EUR,21646,24051,
offer72,DEFAULT,DE,CHF,41453,46058,
offer72,DEFAULT,DE,EUR,36045,40050,
offer72,ORIGINAL,DE,CHF,42384,47093,
offer72,ORIGINAL,DE,EUR,36855,40950,
offer73,DEFAULT,DE,CHF,27945,31050,
offer73,DEFAULT,DE,EUR,24300,27000,
offer74,DEFAULT,DE,CHF,3913,4347,
offer74,DEFAULT,DE,EUR,3402,3780,
offer75,DEFAULT,DE,CHF,4565,5072,
offer75,DEFAULT,DE,EUR,3969,4410,
offer75,ORIGINAL,DE,CHF,4844,5382,
offer75,ORIGINAL,DE,EUR,4212,4680,
offer76,DEFAULT,DE,CHF,2795,3105,
offer76,DEFAULT,DE,EUR,2430,2700,
offer77,DEFAULT,DE,CHF,38214,42461,
offer77,DEFAULT,DE,EUR,33230,36922,
offer77,ORIGINAL,DE,CHF,39123,43470,
offer77,ORIGINAL,DE,EUR,34020,37800,
offer78,DEFAULT,DE,CHF,41940,46601,
offer78,DEFAULT,DE,EUR,36470,40522,
offer78,ORIGINAL,DE,CHF,43781,48645,
offer78,ORIGINAL,DE,EUR,38070,42300,
offer79,DEFAULT,DE,CHF,37283,41426,
offer79,DEFAULT,DE,EUR,32420,36022,
offer79,ORIGINAL,DE,CHF,38192,42435,
offer79,ORIGINAL,DE,EUR,33210,36900,
offer80,DEFAULT,DE,CHF,2609,2898,
offer80,DEFAULT,DE,EUR,2268,2520,
offer81,DEFAULT,DE,CHF,2330,2588,
offer81,DEFAULT,DE,EUR,2025,2250,
offer81,ORIGINAL,DE,CHF,2609,2898,
offer81,ORIGINAL,DE,EUR,2268,2520,
offer82,DEFAULT,DE,CHF,28895,32105,
offer82,DEFAULT,DE,EUR,25126,27918,
offer83,DEFAULT,DE,CHF,27710,30789,
offer83,DEFAULT,DE,EUR,24095,26773,
offer84,DEFAULT,DE,CHF,16767,18630,
offer84,DEFAULT,DE,EUR,14580,16200,
offer84,ORIGINAL,DE,CHF,17699,19665,
offer84,ORIGINAL,DE,EUR,15390,17100,
offer85,DEFAULT,DE,CHF,15835,17595,
offer85,DEFAULT,DE,EUR,13770,15300,
offer86,DEFAULT,DE,CHF,14904,16560,
offer86,DEFAULT,DE,EUR,12960,14400,
offer87,DEFAULT,DE,CHF,14810,16456,
offer87,DEFAULT,DE,EUR,12879,14310,
offer88,DEFAULT,DE,CHF,14717,16353,"[{""quantity"":4,""net_price"":35000,""gross_price"":null}, {""quantity"":7,""net_price"":34500,""gross_price"":null}, {""quantity"":17,""net_price"":34000,""gross_price"":null}, {""quantity"":22,""net_price"":29000,""gross_price"":null}]"
offer88,DEFAULT,DE,EUR,12798,14220,"[{""quantity"":4,""net_price"":15000,""gross_price"":null}, {""quantity"":7,""net_price"":14500,""gross_price"":null}, {""quantity"":17,""net_price"":14000,""gross_price"":null}]"
offer88,ORIGINAL,DE,CHF,15981,17757,
offer88,ORIGINAL,DE,EUR,13896,15441,
offer89,DEFAULT,DE,CHF,9669,10744,"[{""quantity"":2,""net_price"":40050,""gross_price"":40065}, {""quantity"":7,""net_price"":40045,""gross_price"":40058}, {""quantity"":18,""net_price"":40040,""gross_price"":40052}]"
offer89,DEFAULT,DE,EUR,8408,9342,"[{""quantity"":2,""net_price"":10050,""gross_price"":10065}, {""quantity"":7,""net_price"":10045,""gross_price"":10058}, {""quantity"":18,""net_price"":10040,""gross_price"":10052}]"
offer90,DEFAULT,DE,CHF,8797,9775,
offer90,DEFAULT,DE,EUR,7650,8500,
offer91,DEFAULT,DE,CHF,304129,337921,
offer91,DEFAULT,DE,EUR,264460,293845,
offer92,DEFAULT,DE,CHF,30439,33821,
offer92,DEFAULT,DE,EUR,26469,29410,
offer93,DEFAULT,DE,CHF,8797,9775,
offer93,DEFAULT,DE,EUR,7650,8500,
offer94,DEFAULT,DE,CHF,9308,10342,
offer94,DEFAULT,DE,EUR,8094,8993,
offer94,ORIGINAL,DE,CHF,9325,10361,
offer94,ORIGINAL,DE,EUR,8109,9010,
offer95,DEFAULT,DE,CHF,9396,10440,
offer95,DEFAULT,DE,EUR,8171,9078,
offer96,DEFAULT,DE,CHF,22874,25415,
offer96,DEFAULT,DE,EUR,19890,22100,
offer97,DEFAULT,DE,CHF,23511,26122,
offer97,DEFAULT,DE,EUR,20444,22715,
offer98,DEFAULT,DE,CHF,39150,43499,
offer98,DEFAULT,DE,EUR,34043,37825,
offer98,ORIGINAL,DE,CHF,40030,44477,
offer98,ORIGINAL,DE,EUR,34808,38675,
offer99,DEFAULT,DE,CHF,26393,29325,
offer99,DEFAULT,DE,EUR,22950,25500,
offer100,DEFAULT,DE,CHF,3695,4106,
offer100,DEFAULT,DE,EUR,3213,3570,"[{""quantity"":5,""net_price"":150,""gross_price"":1000}, {""quantity"":10,""net_price"":145,""gross_price"":""""}, {""quantity"":20,""net_price"":140,""gross_price"":""""}]"
offer101,DEFAULT,DE,CHF,4312,4790,"[{""quantity"":5,""net_price"":150,""gross_price"":1000}, {""quantity"":10,""net_price"":145,""gross_price"":""""}, {""quantity"":20,""net_price"":140,""gross_price"":""""}]"
offer101,DEFAULT,DE,EUR,3749,4165,"[{""quantity"":5,""net_price"":150,""gross_price"":1000}, {""quantity"":10,""net_price"":145,""gross_price"":""""}, {""quantity"":20,""net_price"":140,""gross_price"":null}]"
offer101,ORIGINAL,DE,CHF,4575,5083,
offer101,ORIGINAL,DE,EUR,3978,4420,
offer102,DEFAULT,DE,CHF,2640,2933,
offer102,DEFAULT,DE,EUR,2295,2550,
offer103,DEFAULT,DE,CHF,36091,40102,
offer103,DEFAULT,DE,EUR,31384,34871,
offer103,ORIGINAL,DE,CHF,36950,41055,
offer103,ORIGINAL,DE,EUR,32130,35700,
offer169,DEFAULT,DE,CHF,31417,34908,
offer169,DEFAULT,DE,EUR,27319,30355,
offer170,DEFAULT,DE,CHF,12805,14227,
offer170,DEFAULT,DE,EUR,11135,12371,
offer170,ORIGINAL,DE,CHF,13197,14663,
offer170,ORIGINAL,DE,EUR,11475,12750,
offer171,DEFAULT,DE,CHF,22508,25009,
offer171,DEFAULT,DE,EUR,19573,21747,
offer172,DEFAULT,DE,CHF,37392,41546,
offer172,DEFAULT,DE,EUR,32515,36127,
offer173,DEFAULT,DE,CHF,22183,24647,
offer173,DEFAULT,DE,EUR,19290,21432,
offer173,ORIGINAL,DE,CHF,22874,25415,
offer173,ORIGINAL,DE,EUR,19890,22100,
offer348,DEFAULT,DE,CHF,15831,17590,
offer348,DEFAULT,DE,EUR,13766,15295,
offer349,DEFAULT,DE,CHF,25391,28212,
offer349,DEFAULT,DE,EUR,22079,24532,
offer350,DEFAULT,DE,CHF,34721,38579,
offer350,DEFAULT,DE,EUR,30192,33547,
offer351,DEFAULT,DE,CHF,21942,24379,
offer351,DEFAULT,DE,EUR,19080,21199,
offer352,DEFAULT,DE,CHF,20243,22493,
offer352,DEFAULT,DE,EUR,17603,19559,
offer353,DEFAULT,DE,CHF,5522,6137,
offer353,DEFAULT,DE,EUR,4802,5336,
offer353,ORIGINAL,DE,CHF,6159,6843,
offer353,ORIGINAL,DE,EUR,5355,5950,
offer354,DEFAULT,DE,CHF,28952,32169,
offer354,DEFAULT,DE,EUR,25176,27973,
offer355,DEFAULT,DE,CHF,28952,32169,
offer355,DEFAULT,DE,EUR,25176,27973,
offer356,DEFAULT,DE,CHF,12199,13554,
offer356,DEFAULT,DE,EUR,10608,11786,
offer357,DEFAULT,DE,CHF,17819,19799,
offer357,DEFAULT,DE,EUR,15495,17216,
offer358,DEFAULT,DE,CHF,3447,3831,
offer358,DEFAULT,DE,EUR,2998,3331,
offer358,ORIGINAL,DE,CHF,4399,4888,
offer358,ORIGINAL,DE,EUR,3825,4250,
offer359,DEFAULT,DE,CHF,23438,26042,
offer359,DEFAULT,DE,EUR,20381,22645,
offer359,ORIGINAL,DE,CHF,23754,26393,
offer359,ORIGINAL,DE,EUR,20655,22950,
offer360,DEFAULT,DE,CHF,39337,43707,
offer360,DEFAULT,DE,EUR,34206,38007,
offer402,DEFAULT,DE,EUR,28000,25000,"[{""quantity"":2,""net_price"":150,""gross_price"":165}, {""quantity"":7,""net_price"":145,""gross_price"":158}, {""quantity"":17,""net_price"":140,""gross_price"":152}]"
offer403,DEFAULT,DE,EUR,27000,24000,"[{""quantity"":2,""net_price"":150,""gross_price"":165}, {""quantity"":7,""net_price"":145,""gross_price"":158}, {""quantity"":17,""net_price"":140,""gross_price"":152}]"
offer404,DEFAULT,DE,EUR,26000,23000,"[{""quantity"":2,""net_price"":150,""gross_price"":165}, {""quantity"":7,""net_price"":145,""gross_price"":158}, {""quantity"":17,""net_price"":140,""gross_price"":152}]"
offer405,DEFAULT,DE,EUR,25000,22000,"[{""quantity"":4,""net_price"":15000,""gross_price"":16500}, {""quantity"":7,""net_price"":14500,""gross_price"":15800}, {""quantity"":15,""net_price"":14000,""gross_price"":15200}]"
offer410,DEFAULT,DE,EUR,20000,17000,"[{""quantity"":2,""net_price"":150,""gross_price"":165}, {""quantity"":7,""net_price"":145,""gross_price"":158}, {""quantity"":17,""net_price"":140,""gross_price"":152}]"
offer411,DEFAULT,DE,EUR,19000,16000,"[{""quantity"":3,""net_price"":10500,""gross_price"":10650}, {""quantity"":9,""net_price"":10450,""gross_price"":10580}, {""quantity"":17,""net_price"":10400,""gross_price"":10520}]"
offer412,DEFAULT,DE,EUR,18000,15000,"[{""quantity"":2,""net_price"":10050,""gross_price"":10065}, {""quantity"":7,""net_price"":10045,""gross_price"":10058}, {""quantity"":18,""net_price"":10040,""gross_price"":10052}]"
offer413,DEFAULT,DE,EUR,17000,14000,"[{""quantity"":4,""net_price"":null,""gross_price"":16500}, {""quantity"":7,""net_price"":null,""gross_price"":15800}, {""quantity"":17,""net_price"":null,""gross_price"":15200}]"
offer414,DEFAULT,DE,EUR,16000,13000,"[{""quantity"":4,""net_price"":15000,""gross_price"":null}, {""quantity"":7,""net_price"":14500,""gross_price"":null}, {""quantity"":17,""net_price"":14000,""gross_price"":null}]"
offer415,DEFAULT,DE,EUR,15000,12000,"[{""quantity"":3,""net_price"":10500,""gross_price"":10650}, {""quantity"":9,""net_price"":10450,""gross_price"":10580}, {""quantity"":17,""net_price"":10400,""gross_price"":10520}]"
offer416,DEFAULT,DE,EUR,14000,11000,"[{""quantity"":2,""net_price"":10050,""gross_price"":10065}, {""quantity"":7,""net_price"":10045,""gross_price"":10058}, {""quantity"":18,""net_price"":10040,""gross_price"":10052}]"
offer417,DEFAULT,DE,EUR,13000,10000,"[{""quantity"":4,""net_price"":null,""gross_price"":16500}, {""quantity"":7,""net_price"":null,""gross_price"":15800}, {""quantity"":17,""net_price"":null,""gross_price"":15200}, {""quantity"":22,""net_price"":null,""gross_price"":10000}]]"
offer418,DEFAULT,DE,EUR,12000,9000,"[{""quantity"":4,""net_price"":15000,""gross_price"":null}, {""quantity"":7,""net_price"":14500,""gross_price"":null}, {""quantity"":17,""net_price"":14000,""gross_price"":null}, {""quantity"":22,""net_price"":9000,""gross_price"":null}]"
offer402,DEFAULT,DE,CHF,48000,43000,"[{""quantity"":2,""net_price"":150,""gross_price"":165}, {""quantity"":7,""net_price"":145,""gross_price"":158}, {""quantity"":17,""net_price"":140,""gross_price"":152}]"
offer403,DEFAULT,DE,CHF,47000,42000,"[{""quantity"":2,""net_price"":150,""gross_price"":165}, {""quantity"":7,""net_price"":145,""gross_price"":158}, {""quantity"":17,""net_price"":140,""gross_price"":152}]"
offer404,DEFAULT,DE,CHF,46000,41000,"[{""quantity"":2,""net_price"":150,""gross_price"":165}, {""quantity"":7,""net_price"":145,""gross_price"":158}, {""quantity"":17,""net_price"":140,""gross_price"":152}]"
offer405,DEFAULT,DE,CHF,45000,40000,"[{""quantity"":2,""net_price"":150,""gross_price"":165}, {""quantity"":7,""net_price"":145,""gross_price"":158}, {""quantity"":17,""net_price"":140,""gross_price"":152}]"
offer410,DEFAULT,DE,CHF,40000,35000,"[{""quantity"":5,""net_price"":150,""gross_price"":165}, {""quantity"":10,""net_price"":145,""gross_price"":158}, {""quantity"":20,""net_price"":140,""gross_price"":152}]"
offer411,DEFAULT,DE,CHF,39000,34000,"[{""quantity"":3,""net_price"":10500,""gross_price"":10650}, {""quantity"":9,""net_price"":10450,""gross_price"":10580}, {""quantity"":17,""net_price"":10400,""gross_price"":10520}]"
offer412,DEFAULT,DE,CHF,38000,33000,"[{""quantity"":2,""net_price"":10050,""gross_price"":10065}, {""quantity"":7,""net_price"":10045,""gross_price"":10058}, {""quantity"":18,""net_price"":10040,""gross_price"":10052}]"
offer413,DEFAULT,DE,CHF,37000,32000,"[{""quantity"":4,""net_price"":null,""gross_price"":16500}, {""quantity"":7,""net_price"":null,""gross_price"":15800}, {""quantity"":17,""net_price"":null,""gross_price"":15200}]"
offer414,DEFAULT,DE,CHF,36000,31000,"[{""quantity"":4,""net_price"":15000,""gross_price"":null}, {""quantity"":7,""net_price"":14500,""gross_price"":null}, {""quantity"":17,""net_price"":14000,""gross_price"":null}]"
offer416,DEFAULT,DE,CHF,34000,29000,"[{""quantity"":3,""net_price"":10500,""gross_price"":10650}, {""quantity"":9,""net_price"":10450,""gross_price"":10580}, {""quantity"":17,""net_price"":10400,""gross_price"":10520}]"
offer417,DEFAULT,DE,CHF,33000,28000,"[{""quantity"":2,""net_price"":10050,""gross_price"":10065}, {""quantity"":7,""net_price"":10045,""gross_price"":10058}, {""quantity"":18,""net_price"":10040,""gross_price"":10052}]"
offer415,DEFAULT,DE,CHF,35000,30000,"[{""quantity"":4,""net_price"":null,""gross_price"":16500}, {""quantity"":7,""net_price"":null,""gross_price"":15800}, {""quantity"":17,""net_price"":null,""gross_price"":15200}]"
offer418,DEFAULT,DE,CHF,32000,27000,"[{""quantity"":4,""net_price"":15000,""gross_price"":null}, {""quantity"":7,""net_price"":14500,""gross_price"":null}, {""quantity"":17,""net_price"":14000,""gross_price"":null}]"
```

</details>

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
|-|-|-|-|-|
| product_offer_reference | &check; | string | offer1 | Product offer reference that will have these prices |
| price_type | &check; | string | DEFAULT | Sets price type to product offer price |
| store | &check; | string | DE | Store in which this price will be shown |
| currency | &check; | string | EUR | Currency of the price |
| value_net | &check; | number | 8144 | Price of product offer when price mode === NET |
| value_gross | &check; | number | 10160 | Price of product offer when price mode === GROSS |
| price_data.volume_prices | optional | string | `"[{""quantity"":5,""net_price"":6050,""gross_price"":7065}, {""quantity"":10,""net_price"":5045,""gross_price"":6058}, {""quantity"":20,""net_price"":4040,""gross_price"":5052}]"` | JSON representation of the volume prices, each entry in the JSON array contains quantity at which `gross_price/net_price` will be activated |

Register the following plugins to enable data import:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| PriceProductOfferDataImportPlugin | Imports Product Offer Price data |   | Spryker\Zed\PriceProductOfferDataImport\Communication\Plugin |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\PriceProductOfferDataImport\Communication\Plugin\PriceProductOfferDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    protected function getDataImporterPlugins(): array
    {
        return [
            new PriceProductOfferDataImportPlugin(),
        ];
    }
}
```

**data/import/local/full_EU.yml**

```yml
version: 0

actions:
  - data_entity: price-product-offer
    source: data/import/common/DE/price_product_offer.csv
  - data_entity: price-product-offer
    source: data/import/common/AT/price_product_offer.csv
```

**data/import/local/full_US.yml**

```yml
version: 0

actions:
  - data_entity: price-product-offer
    source: data/import/common/US/price_product_offer.csv
```

Import data:

```bash
console data:import price-product-offer
```

{% info_block warningBox "Verification" %}

Make sure that the Product Offer Prices data is in the `spy_price_product_offer` table and its attached `spy_price_product` entities as foreign keys.

{% endinfo_block %}

### 6) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| PriceProductOfferProductOfferExpanderPlugin | Expands the Product Offer entity with prices. |   | Spryker\Zed\PriceProductOffer\Communication\Plugin\ProductOffer |
| PriceProductOfferProductOfferPostCreatePlugin | Saves the Product Offer Price data after the Product Offer creation. |   | Spryker\Zed\PriceProductOffer\Communication\Plugin\ProductOffer |
| PriceProductOfferProductOfferPostUpdatePlugin | Updates the Product Offer Price data after Product Offer updating. |   | Spryker\Zed\PriceProductOffer\Communication\Plugin\ProductOffer |
| PriceProductOfferPriceDimensionConcreteSaverPlugin | Saves product offer prices when product concrete prices are saved. |   | Spryker\Zed\PriceProductOffer\Communication\Plugin\PriceProduct |
| PriceProductOfferPriceDimensionQueryCriteriaPlugin | Adds the product offer prices as extra price dimensions when reading product concrete prices. |   | Spryker\Zed\PriceProductOffer\Communication\Plugin\PriceProduct |
| PriceProductOfferPriceProductDimensionExpanderStrategyPlugin | Sets `PriceProductDimensionTransfer` to `PRODUCT_OFFER` when it has the product offer reference attached to it. |   | Spryker\Zed\PriceProductOffer\Communication\Plugin\PriceProduct |
| LowestPriceProductOfferStorageCollectionSorterPlugin | Sorts product offers of `ProductOfferCollectionTransfer` by the lowest price first. |   | Spryker\Client\PriceProductOfferStorage\Plugin\ProductOfferStorage |
| PriceProductOfferStorageDimensionPlugin | Fetches an array of the Product Offer `PriceProductTransfers` and attaches them to the list of `PriceProductTransfers` that are fetched for a product concrete.  |   | Spryker\Client\PriceProductOfferStorage\Plugin\PriceProductStorage |
| PriceProductOfferStorageExpanderPlugin | Expands `ProductOfferStorageTransfer` with Product Offer Price |   | Spryker\Client\PriceProductOfferStorage\Plugin\MerchantProductOfferStorage |
| PriceProductOfferStorageFilterExpanderPlugin | Expands `PriceProductFilterTransfer` with `ProductOfferReference` when `ProductViewTransfer` has `ProductOfferReference`. |   | Spryker\Client\PriceProductOfferStorage\Plugin\PriceProductStorage |
| PriceProductOfferPriceProductFilterPlugin | Filters out inapplicable product offer prices and product concrete prices when a product offer is selected. |   | Spryker\Service\PriceProductOfferStorage\Plugin\PriceProduct |
| PriceProductOfferVolumeExtractorPlugin | Extracts volume prices from the price product offer collection. |  | Spryker\Zed\PriceProductOfferVolume\Communication\Plugin\PriceProductOffer |
| PriceProductOfferVolumeExpanderPlugin | Expands `PriceProductTransfer` with `volumeQuantity` |   | Spryker\Zed\PriceProductOfferVolume\Communication\Plugin\PriceProductOffer |
| PriceProductOfferVolumeValidatorPlugin | Validates volume prices. |   | Spryker\Zed\PriceProductOfferVolume\Communication\Plugin\PriceProductOffer |
| PriceProductOfferVolumeFilterPlugin | Applies correct volume pricing when applicable and quantity is selected. |   | Spryker\Service\PriceProductOfferVolume\Plugin\PriceProductOffer |
| PriceProductOfferProductOfferViewSectionPlugin | Returns template for render price product offer information. |   | Spryker\Zed\PriceProductOfferGui\Communication\Plugin\ProductOfferGui |
| PriceProductVolumeValidatorPlugin | Validates volume prices. |   | Spryker\Zed\PriceProductVolume\Communication\Plugin\PriceProduct |

<details>
<summary>src/Pyz/Zed/ProductOffer/ProductOfferDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\ProductOffer;

use Spryker\Zed\PriceProductOffer\Communication\Plugin\ProductOffer\PriceProductOfferProductOfferExpanderPlugin;
use Spryker\Zed\PriceProductOffer\Communication\Plugin\ProductOffer\PriceProductOfferProductOfferPostCreatePlugin;
use Spryker\Zed\PriceProductOffer\Communication\Plugin\ProductOffer\PriceProductOfferProductOfferPostUpdatePlugin;
use Spryker\Zed\ProductOffer\ProductOfferDependencyProvider as SprykerProductOfferDependencyProvider;

class ProductOfferDependencyProvider extends SprykerProductOfferDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductOfferExtension\Dependency\Plugin\ProductOfferPostCreatePluginInterface>
     */
    protected function getProductOfferPostCreatePlugins(): array
    {
        return [
            new PriceProductOfferProductOfferPostCreatePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductOfferExtension\Dependency\Plugin\ProductOfferPostUpdatePluginInterface>
     */
    protected function getProductOfferPostUpdatePlugins(): array
    {
        return [
            new PriceProductOfferProductOfferPostUpdatePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductOfferExtension\Dependency\Plugin\ProductOfferExpanderPluginInterface>
     */
    protected function getProductOfferExpanderPlugins(): array
    {
        return [
            new PriceProductOfferProductOfferExpanderPlugin(),
        ];
    }
}
```

</details>

<details>
<summary>src/Pyz/Zed/PriceProduct/PriceProductDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\PriceProduct;

use Spryker\Zed\PriceProduct\PriceProductDependencyProvider as SprykerPriceProductDependencyProvider;
use Spryker\Zed\PriceProductOffer\Communication\Plugin\PriceProduct\PriceProductOfferPriceDimensionConcreteSaverPlugin;
use Spryker\Zed\PriceProductOffer\Communication\Plugin\PriceProduct\PriceProductOfferPriceDimensionQueryCriteriaPlugin;
use Spryker\Zed\PriceProductOffer\Communication\Plugin\PriceProduct\PriceProductOfferPriceProductDimensionExpanderStrategyPlugin;
use Spryker\Zed\PriceProductVolume\Communication\Plugin\PriceProduct\PriceProductVolumeValidatorPlugin;

class PriceProductDependencyProvider extends SprykerPriceProductDependencyProvider
{
    /**
     * {@inheritDoc}
     *
     * @return array<\Spryker\Zed\PriceProductExtension\Dependency\Plugin\PriceDimensionQueryCriteriaPluginInterface>
     */
    protected function getPriceDimensionQueryCriteriaPlugins(): array
    {
        return array_merge(parent::getPriceDimensionQueryCriteriaPlugins(), [
            new PriceProductOfferPriceDimensionQueryCriteriaPlugin(),
        ]);
    }

    /**
     * @return array<\Spryker\Zed\PriceProductExtension\Dependency\Plugin\PriceDimensionConcreteSaverPluginInterface>
     */
    protected function getPriceDimensionConcreteSaverPlugins(): array
    {
        return [
            new PriceProductOfferPriceDimensionConcreteSaverPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Service\PriceProductExtension\Dependency\Plugin\PriceProductDimensionExpanderStrategyPluginInterface>
     */
    protected function getPriceProductDimensionExpanderStrategyPlugins(): array
    {
        return [
            new PriceProductOfferPriceProductDimensionExpanderStrategyPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\PriceProductExtension\Dependency\Plugin\PriceProductValidatorPluginInterface>
     */
    protected function getPriceProductValidatorPlugins(): array
    {
        return [
            new PriceProductVolumeValidatorPlugin(),
        ];
    }
}
```

</details>

**src/Pyz/Client/PriceProductStorage/PriceProductStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\PriceProductStorage;

use Spryker\Client\PriceProductOfferStorage\Plugin\PriceProductStorage\PriceProductOfferStorageDimensionPlugin;
use Spryker\Client\PriceProductOfferStorage\Plugin\PriceProductStorage\PriceProductOfferStorageFilterExpanderPlugin;
use Spryker\Client\PriceProductStorage\PriceProductStorageDependencyProvider as SprykerPriceProductStorageDependencyProvider;

class PriceProductStorageDependencyProvider extends SprykerPriceProductStorageDependencyProvider
{
    /**
     * @return array<\Spryker\Client\PriceProductStorageExtension\Dependency\Plugin\PriceProductStoragePriceDimensionPluginInterface>
     */
    public function getPriceDimensionStorageReaderPlugins(): array
    {
        return [
            new PriceProductOfferStorageDimensionPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Client\PriceProductStorageExtension\Dependency\Plugin\PriceProductFilterExpanderPluginInterface>
     */
    protected function getPriceProductFilterExpanderPlugins(): array
    {
        return [
            new PriceProductOfferStorageFilterExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Client/ProductOfferStorage/ProductOfferStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\ProductOfferStorage;

use Spryker\Client\PriceProductOfferStorage\Plugin\ProductOfferStorage\LowestPriceProductOfferStorageCollectionSorterPlugin;
use Spryker\Client\PriceProductOfferStorage\Plugin\ProductOfferStorage\PriceProductOfferStorageExpanderPlugin;
use Spryker\Client\ProductOfferStorage\ProductOfferStorageDependencyProvider as SprykerProductOfferStorageDependencyProvider;
use Spryker\Client\ProductOfferStorageExtension\Dependency\Plugin\ProductOfferStorageCollectionSorterPluginInterface;

class ProductOfferStorageDependencyProvider extends SprykerProductOfferStorageDependencyProvider
{
    /**
     * @return array<\Spryker\Client\ProductOfferStorageExtension\Dependency\Plugin\ProductOfferStorageExpanderPluginInterface>
     */
    protected function getProductOfferStorageExpanderPlugins(): array
    {
        return [
            new PriceProductOfferStorageExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Client\ProductOfferStorageExtension\Dependency\Plugin\ProductOfferStorageCollectionSorterPluginInterface
     */
    protected function createProductOfferStorageCollectionSorterPlugin(): ProductOfferStorageCollectionSorterPluginInterface
    {
        return new LowestPriceProductOfferStorageCollectionSorterPlugin();
    }
}

```

**src/Pyz/Service/PriceProduct/PriceProductDependencyProvider.php**

```php
<?php

namespace Pyz\Service\PriceProduct;

use Spryker\Service\Pri123ceProduct\PriceProductDependencyProvider as SprykerPriceProductDependencyProvider;
use Spryker\Service\PriceProductOffer\Plugin\PriceProduct\PriceProductOfferPriceProductFilterPlugin;
use Spryker\Service\PriceProductOfferVolume\Plugin\PriceProductOffer\PriceProductOfferVolumeFilterPlugin;

class PriceProductDependencyProvider extends SprykerPriceProductDependencyProvider
{
    /**
     * {@inheritDoc}
     *
     * @return array<\Spryker\Service\PriceProductExtension\Dependency\Plugin\PriceProductFilterPluginInterface>
     */
    protected function getPriceProductDecisionPlugins(): array
    {
        return array_merge([
            new PriceProductOfferPriceProductFilterPlugin(),
            new PriceProductOfferVolumeFilterPlugin(),
        ], parent::getPriceProductDecisionPlugins());
    }
}
```

<details>
<summary>src/Pyz/Zed/PriceProductOffer/PriceProductOfferDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\PriceProductOffer;

use Spryker\Zed\PriceProductOffer\PriceProductOfferDependencyProvider as SprykerPriceProductOfferDependencyProvider;
use Spryker\Zed\PriceProductOfferVolume\Communication\Plugin\PriceProductOffer\PriceProductOfferVolumeExpanderPlugin;
use Spryker\Zed\PriceProductOfferVolume\Communication\Plugin\PriceProductOffer\PriceProductOfferVolumeExtractorPlugin;
use Spryker\Zed\PriceProductOfferVolume\Communication\Plugin\PriceProductOffer\PriceProductOfferVolumeValidatorPlugin;

class PriceProductOfferDependencyProvider extends SprykerPriceProductOfferDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\PriceProductOfferExtension\Dependency\Plugin\PriceProductOfferExtractorPluginInterface>
     */
    protected function getPriceProductOfferExtractorPlugins(): array
    {
        return [
            new PriceProductOfferVolumeExtractorPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\PriceProductOfferExtension\Dependency\Plugin\PriceProductOfferExpanderPluginInterface>
     */
    protected function getPriceProductOfferExpanderPlugins(): array
    {
        return [
            new PriceProductOfferVolumeExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\PriceProductOfferExtension\Dependency\Plugin\PriceProductOfferValidatorPluginInterface>
     */
    protected function getPriceProductOfferValidatorPlugins(): array
    {
        return [
            new PriceProductOfferVolumeValidatorPlugin(),
        ];
    }
}
```

</details>

**src/Pyz/Client/PriceProductOfferStorage/PriceProductOfferStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\PriceProductOfferStorage;

use Spryker\Client\PriceProductOfferStorage\PriceProductOfferStorageDependencyProvider as SprykerPriceProductOfferStorageDependencyProvider;
use Spryker\Client\PriceProductOfferVolume\Plugin\PriceProductOfferStorage\PriceProductOfferVolumeExtractorPlugin;

class PriceProductOfferStorageDependencyProvider extends SprykerPriceProductOfferStorageDependencyProvider
{
    /**
     * @return array<\Spryker\Client\PriceProductOfferStorageExtension\Dependency\Plugin\PriceProductOfferStoragePriceExtractorPluginInterface>
     */
    protected function getPriceProductOfferStoragePriceExtractorPlugins(): array
    {
        return [
            new PriceProductOfferVolumeExtractorPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/ProductOfferGui/ProductOfferGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductOfferGui;

use Spryker\Zed\PriceProductOfferGui\Communication\Plugin\ProductOfferGui\PriceProductOfferProductOfferViewSectionPlugin;
use Spryker\Zed\ProductOfferGui\ProductOfferGuiDependencyProvider as SprykerProductOfferGuiDependencyProvider;

class ProductOfferGuiDependencyProvider extends SprykerProductOfferGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductOfferGuiExtension\Dependency\Plugin\ProductOfferViewSectionPluginInterface>
     */
    public function getProductOfferViewSectionPlugins(): array
    {
        return [
            new PriceProductOfferProductOfferViewSectionPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure the following:
- When a product offer is selected, its price is shown as the current price.
- Product offer prices are saved when a product concrete and product offer prices are saved.
- Product offers are first sorted by the lowest price when fetched as a collection with product concrete.
- When a product offer with a volume price is selected, and the selected quantity is over a certain threshold, its volume price is shown instead of the normal price.

{% endinfo_block %}

## Install related features

| FEATURE | REQUIRED FOR THE CURRENT FEATURE | INSTALLATION GUIDE |
| -------------- | -------------------------------- | ----------------- |
| Marketplace Product Offer + Prices API | | [Install the Marketplace Product Offer + Prices Glue API](/docs/pbc/all/price-management/latest/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-offer-prices-glue-api.html) |
