---
title: Marketplace Product Offer Prices feature integration
last_updated: Dec 23, 2020
description: This document describes the process how to integrate the Marketplace Product Offer Prices feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Product Offer Prices feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Product Offer Prices feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
|-|-|-|
| Marketplace Product Offer | dev-master | [Marketplace Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-product-offer-feature-integration.html) |
| Prices | 202001.0 |[Prices feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-product-offer-feature-integration.html) |
| Spryker Core | 202001.0 | [Spryker Core feature integration](https://documentation.spryker.com/docs/spryker-core-feature-integration) |


### 1) Install the required modules using Composer

Install the required modules:
```bash
composer require spryker-feature/marketplace-product-offer-prices --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules were installed:

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
Adjust the schema definition so that entity changes will trigger events:

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

Apply database changes and to generate entity and transfer changes.

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

Make sure that the following changes were applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
|-|-|-|-|
| PriceProductOfferCriteria | class | created | src/Generated/Shared/Transfer/PriceProductOfferCriteriaTransfer |
| DataImporterReaderConfiguration | class | created | src/Generated/Shared/Transfer/DataImporterReaderConfigurationTransfer |
| Currency.Code | attribute | created | src/Generated/Shared/Transfer/CurrencyTransfer |
| PriceProductFilter.Filter | attribute | created | src/Generated/Shared/Transfer/PriceProductFilterTransfer |
| PriceProductFilter.value | attribute | created | src/Generated/Shared/Transfer/PriceProductFilterTransfer |

{% endinfo_block %}

### 3) Add Zed translations

Generate a new translation cache for Zed:
```bash
console translator:generate-cache
```

### 4) Configure export to Redis and Elasticsearch
#### Set up event listeners

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| PriceProductOfferStorageEventSubscriber | Registers listeners that are responsible for publishing Product Offer Prices to storage. |   | Spryker\Zed\PriceProduc |

**src/Pyz/Zed/Event/EventDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Event;

use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;
use Spryker\Zed\PriceProductOfferSearch\Communication\Plugin\Event\Subscriber\PriceProductOfferStorageEventSubscriber;

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

use ArrayObject;
use Generated\Shared\Transfer\RabbitMqOptionTransfer;
use Spryker\Client\RabbitMq\Model\Connection\Connection;
use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
use Spryker\Shared\PriceProductOfferStorage\PriceProductOfferStorageConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     * @return \ArrayObject
     */
    protected function getQueueOptions()
    {
        $queueOptionCollection = new ArrayObject();
        $queueOptionCollection->append($this->createQueueOption(PriceProductOfferStorageConfig::PRICE_PRODUCT_OFFER_OFFER_SYNC_STORAGE_QUEUE, MerchantProductOfferStorageConfig::PRICE_PRODUCT_OFFER_OFFER_SYNC_STORAGE_ERROR_QUEUE));

        return $queueOptionCollection;
    }

}
```

#### Configure message processors

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| SynchronizationStorageQueueMessageProcessorPlugin | Configures all Merchant Product Offers to sync with Redis storage, and marks messages as failed in case of error. |   | Spryker\Zed\Synchronization\Communication\Plugin\Queue |

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
     * @return \Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface[]
     */
    protected function getProcessorMessagePlugins(Container $container)
    {
        return [
            PriceProductOfferStorageConfig::PRICE_PRODUCT_OFFER_OFFER_SYNC_STORAGE_QUEUE => new SynchronizationStorageQueueMessageProcessorPlugin(),
        ];
    }
}
```

#### Set up re-generate and re-sync features

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| PriceProductOfferSynchronizationDataPlugin | Allows synchronizing the entire storage table content into Storage. |   | Spryker\Zed\PriceProductOfferStorage\Communication\Plugin\Synchronizatio |

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\PriceProductOfferStorage\Communication\Plugin\Synchronization\PriceProductOfferSynchronizationDataPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new PriceProductOfferSynchronizationDataPlugin(),
        ];
    }
}
```

Configure the synchronization pool name:

**src/Pyz/Zed/MerchantProductOfferStorage/MerchantProductOfferStorageConfig.php**

```php
<?php

namespace Pyz\Zed\PriceProductOfferStorage;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Shared\Publisher\PublisherConfig;
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

Make sure that when the following entities get updated via the ORM, the corresponding Redis keys have the correct values.

| TARGET ENTITY | EXAMPLE EXPECTED DATA IDENTIFIER |
|-|-|
| PriceProductOffer | `kv:product_concrete_product_offer_price:de:6` |

<details>
<summary markdown='span'>Example of expected data fragment</summary>

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
Prepare your data according to your requirements using our demo data:

**data/import/common/common/marketplace/merchant_product_offer.csv**

```csv
product_offer_reference,price_type,store,currency,value_net,value_gross,price_data.volume_prices
offer2,DEFAULT,DE,EUR,8144,10160,"[{""quantity"":5,""net_price"":6050,""gross_price"":7065}, {""quantity"":10,""net_price"":5045,""gross_price"":6058}, {""quantity"":20,""net_price"":4040,""gross_price"":5052}]"
offer2,DEFAULT,DE,CHF,10866,13184,
offer3,ORIGINAL,DE,EUR,17741,19712,
offer3,DEFAULT,DE,EUR,7741,9712,
offer3,ORIGINAL,DE,CHF,20402,22669,
offer3,DEFAULT,DE,CHF,10402,12669,
offer4,DEFAULT,DE,EUR,27741,29712,"[{""quantity"":5,""net_price"":6050,""gross_price"":7065}, {""quantity"":10,""net_price"":5045,""gross_price"":6058}, {""quantity"":20,""net_price"":4040,""gross_price"":5052}]"
```

| COLUMN | REQUIRED? | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
|-|-|-|-|-|
| product_offer_reference | &check; | string | offer1 | Product Offer reference that will have these prices |
| price_type | &check; | string | DEFAULT | Sets price type to product offer price |
| store | &check; | string | DE | Store in which this price will be shown |
| currency | &check; | string | EUR | Currency of the price |
| value_net | &check; | number | 8144 | Price of product offer when price mode === NET |
| value_gross | &check; | number | 10160 | Price of product offer when price mode === GROSS |
| price_data.volume_prices | optional | string | `"[{""quantity"":5,""net_price"":6050,""gross_price"":7065}, {""quantity"":10,""net_price"":5045,""gross_price"":6058}, {""quantity"":20,""net_price"":4040,""gross_price"":5052}]"` | JSON representation of the volume prices, each entry in the JSON array contains quantity at which `gross_price/net_price` will be activated |

Register the following plugins to enable data import:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| PriceProductOfferDataImportPlugin | Imports Price Product Offer data |   | Spryker\ |

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

Import data:

```bash
console data:import price-product-offer
```

{% info_block warningBox "Verification" %}

Make sure that the Product Offer Prices data is in the `spy_price_product_offer` table as well as its attached `spy_price_product` entities as foreign keys.

{% endinfo_block %}

### 6) Set up behavior
Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| PriceProductOfferProductOfferExpanderPlugin | Expands Product Offer entity with prices |   | Spryker\Zed\PriceProductOffer\Communication\Plugin\ProductOffer |
| PriceProductOfferProductOfferPostCreatePlugin | Saves Product Offer price data after Product Offer creation |   | Spryker\Zed\PriceProductOffer\Communication\Plugin\ProductOffer |
| PriceProductOfferProductOfferPostUpdatePlugin | Update Product Offer price data after Product Offer updating |   | Spryker\Zed\PriceProductOffer\Communication\Plugin\ProductOffer |
| PriceProductOfferPriceDimensionConcreteSaverPlugin | Saves product offer prices when product concrete prices are saved |   | Spryker\Zed\PriceProductOffer\Communication\Plugin\PriceProduct |
| PriceProductOfferPriceDimensionQueryCriteriaPlugin | Adds the product offer prices as extra price dimensions when reading product concrete prices |   | Spryker\Zed\PriceProductOffer\Communication\Plugin\PriceProduct |
| PriceProductOfferPriceProductDimensionExpanderStrategyPlugin | Sets PriceProductDimensionTransfer to PRODUCT_OFFER when it has Product Offer reference attached to it |   | Spryker\Zed\PriceProductOffer\Communication\Plugin\PriceProduct |
| LowestPriceProductOfferStorageCollectionSorterPlugin | Sorts ProductOfferCollectionTransfer Product Offers by lowest price first |   | Spryker\Client\PriceProductOfferStorage\Plugin\PriceProductStorage |
| PriceProductOfferStorageDimensionPlugin | Fetches an array of Product Offer PriceProductTransfers and attaches them to the list of PriceProductTransfers that are fetched for a product concrete  |   | Spryker\Client\PriceProductOfferStorage\Plugin\PriceProductStorage |
| PriceProductOfferStorageExpanderPlugin | Expands ProductOfferStorageTransfer with Product Offer price |   | Spryker\Client\PriceProductOfferStorage\Plugin\PriceProductStorage |
| PriceProductOfferStorageFilterExpanderPlugin | Expands PriceProductFilterTransfer with ProductOfferReference when a ProductViewTransfer has a ProductOfferReference |   | Spryker\Client\PriceProductOfferStorage\Plugin\PriceProductStorage |
| ProductOfferPriceProductFilterPlugin | Filters out inapplicable product offer prices and product concrete prices when a Product Offer is selected |   | Spryker\Service\PriceProductOfferStorage\Plugin\PriceProduct |
| PriceProductOfferVolumeExtractorPlugin | Maps out JSON entries from price_data of PriceProductTransfer to new PriceProductTransfers with volume prices |   | Spryker\Client\PriceProductOfferVolume\Plugin\PriceProductOfferStorage |
| PriceProductOfferVolumeFilterPlugin | Applies correct volume pricing when applicable and quantity is selected |   | Spryker\Service\PriceProductOfferVolume\Plugin\PriceProductOffer |

<details>
<summary markdown='span'>src/Pyz/Zed/ProductOffer/ProductOfferDependencyProvider.php</summary>

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
     * @return \Spryker\Zed\ProductOfferExtension\Dependency\Plugin\ProductOfferPostCreatePluginInterface[]
     */
    protected function getProductOfferPostCreatePlugins(): array
    {
        return [
            new PriceProductOfferProductOfferPostCreatePlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\ProductOfferExtension\Dependency\Plugin\ProductOfferPostUpdatePluginInterface[]
     */
    protected function getProductOfferPostUpdatePlugins(): array
    {
        return [
            new PriceProductOfferProductOfferPostUpdatePlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\ProductOfferExtension\Dependency\Plugin\ProductOfferExpanderPluginInterface[]
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

<details><summary markdown='span'>src/Pyz/Zed/PriceProduct/PriceProductDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\PriceProduct;

use Spryker\Zed\PriceProduct\PriceProductDependencyProvider as SprykerPriceProductDependencyProvider;
use Spryker\Zed\PriceProductOffer\Communication\Plugin\PriceProduct\PriceProductOfferPriceDimensionConcreteSaverPlugin;
use Spryker\Zed\PriceProductOffer\Communication\Plugin\PriceProduct\PriceProductOfferPriceDimensionQueryCriteriaPlugin;
use Spryker\Zed\PriceProductOffer\Communication\Plugin\PriceProduct\PriceProductOfferPriceProductDimensionExpanderStrategyPlugin;

class PriceProductDependencyProvider extends SprykerPriceProductDependencyProvider
{
    /**
     * {@inheritDoc}
     *
     * @return \Spryker\Zed\PriceProductExtension\Dependency\Plugin\PriceDimensionQueryCriteriaPluginInterface[]
     */
    protected function getPriceDimensionQueryCriteriaPlugins(): array
    {
        return array_merge(parent::getPriceDimensionQueryCriteriaPlugins(), [
            new PriceProductOfferPriceDimensionQueryCriteriaPlugin(),
        ]);
    }

    /**
     * @return \Spryker\Zed\PriceProductExtension\Dependency\Plugin\PriceDimensionConcreteSaverPluginInterface[]
     */
    protected function getPriceDimensionConcreteSaverPlugins(): array
    {
        return [
            new PriceProductOfferPriceDimensionConcreteSaverPlugin(),
        ];
    }

    /**
     * @return \Spryker\Service\PriceProductExtension\Dependency\Plugin\PriceProductDimensionExpanderStrategyPluginInterface[]
     */
    protected function getPriceProductDimensionExpanderStrategyPlugins(): array
    {
        return [
            new PriceProductOfferPriceProductDimensionExpanderStrategyPlugin(),
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
     * @return \Spryker\Client\PriceProductStorageExtension\Dependency\Plugin\PriceProductStoragePriceDimensionPluginInterface[]
     */
    public function getPriceDimensionStorageReaderPlugins(): array
    {
        return [
            new PriceProductOfferStorageDimensionPlugin(),
        ];
    }

    /**
     * @return \Spryker\Client\PriceProductStorageExtension\Dependency\Plugin\PriceProductFilterExpanderPluginInterface[]
     */
    protected function getPriceProductFilterExpanderPlugins(): array
    {
        return [
            new PriceProductOfferStorageFilterExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Client/MerchantProductOfferStorage/MerchantProductOfferStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\MerchantProductOfferStorage;

use Spryker\Client\MerchantProductOfferStorage\MerchantProductOfferStorageDependencyProvider as SprykerMerchantProductOfferStorageDependencyProvider;
use Spryker\Client\PriceProductOfferStorage\Plugin\PriceProductStorage\LowestPriceProductOfferStorageCollectionSorterPlugin;
use Spryker\Client\PriceProductOfferStorage\Plugin\PriceProductStorage\PriceProductOfferStorageExpanderPlugin;

class MerchantProductOfferStorageDependencyProvider extends SprykerMerchantProductOfferStorageDependencyProvider
{
    /**
     * @return \Spryker\Client\MerchantProductOfferStorageExtension\Dependency\Plugin\ProductOfferStorageExpanderPluginInterface[]
     */
    protected function getProductOfferStorageExpanderPlugins(): array
    {
        return [
            new PriceProductOfferStorageExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Client\MerchantProductOfferStorageExtension\Dependency\Plugin\ProductOfferStorageCollectionSorterPluginInterface
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

use Spryker\Service\PriceProduct\PriceProductDependencyProvider as SprykerPriceProductDependencyProvider;
use Spryker\Service\PriceProductOfferStorage\Plugin\PriceProduct\ProductOfferPriceProductFilterPlugin;
use Spryker\Service\PriceProductOfferVolume\Plugin\PriceProductOffer\PriceProductOfferVolumeFilterPlugin;
class PriceProductDependencyProvider extends SprykerPriceProductDependencyProvider
{
    /**
     * {@inheritDoc}
     *
     * @return \Spryker\Service\PriceProductExtension\Dependency\Plugin\PriceProductFilterPluginInterface[]
     */
    protected function getPriceProductDecisionPlugins(): array
    {
        return array_merge([
            new ProductOfferPriceProductFilterPlugin(),
            new PriceProductOfferVolumeFilterPlugin(),
        ], parent::getPriceProductDecisionPlugins());
    }
}
```

**src/Pyz/Client/PriceProductOfferStorage/PriceProductOfferStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\PriceProductOfferStorage;

use Spryker\Client\PriceProductOfferStorage\PriceProductOfferStorageDependencyProvider as SprykerPriceProductOfferStorageDependencyProvider;
use Spryker\Client\PriceProductOfferVolume\Plugin\PriceProductOfferStorage\PriceProductOfferVolumeExtractorPlugin;

class PriceProductOfferStorageDependencyProvider extends SprykerPriceProductOfferStorageDependencyProvider
{
    /**
     * @return \Spryker\Client\PriceProductOfferStorageExtension\Dependency\Plugin\PriceProductOfferStoragePriceExtractorPluginInterface[]
     */
    protected function getPriceProductOfferStoragePriceExtractorPlugins(): array
    {
        return [
            new PriceProductOfferVolumeExtractorPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that when a product offer is selected, its price is shown as the current price.

Make sure that product offer prices are saved when Product Concrete and product offer prices are saved.

Make sure that product offers are sorted by the lowest price first when fetched as a collection with product concrete.

Make sure that when a product offer with a volume price is selected and the selected quantity is over a certain threshold, its volume price is shown instead of the normal price.

{% endinfo_block %}
