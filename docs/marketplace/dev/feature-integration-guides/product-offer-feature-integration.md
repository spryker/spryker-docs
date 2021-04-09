---
title: Marketplace Product Offer feature integration
last_updated: Mar 29, 2021
summary: This document describes the process how to integrate the Marketplace Product Offer feature into a Spryker project.
---

## Install feature core

### Prerequisites

To start feature integration, overview, and install the necessary features:

| Name                 | Version    |
| --------------- | ------- |
| Spryker Core         | 202001.0   |
| Marketplace Merchant | dev-master |
| Product              | 202001.0   |

###  1) Install the required modules using composer

Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/marketplace-product-offer --update-with-dependencies
```

---
**Verificaiton**

Make sure that the following modules were installed:

| Module                         | Expected Directory                         |
| ---------------------------- | ------------------------------------- |
| MerchantProductOffer           | spryker/merchant-product-offer             |
| MerchantProductOfferDataImport | spryker/merchant-product-offer-data-import |
| MerchantProductOfferGui        | spryker/merchant-product-offer-gui         |
| MerchantProductOfferSearch     | spryker/merchant-product-offer-search      |
| MerchantProductOfferStorage    | spryker/merchant-product-offer-storage     |
| ProductOffer                   | spryker/product-offer                      |
| ProductOfferGui                | spryker/product-offer-gui                  |
| ProductOfferSales              | spryker/product-offer-sales                |
| ProductOfferValidity           | spryker/product-offer-validity             |
| ProductOfferValidityGui        | spryker/product-offer-validity-gui         |
| ProductOfferValidityDataImport | spryker/product-offer-validity-data-import |

---

### 2) Set up database schema

Adjust the schema definition so that entity changes will trigger events:

**src/Pyz/Zed/ProductOffer/Persistence/Propel/Schema/spy_product_offer.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          name="zed"
          xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\ProductOffer\Persistence"
          package="src.Orm.Zed.ProductOffer.Persistence">

    <table name="spy_product_offer" phpName="SpyProductOffer">
        <behavior name="event">
            <parameter name="spy_product_offer_all" column="*"/>
            <parameter name="spy_product_offer_product_offer_reference" column="product_offer_reference" keep-additional="true"/>
            <parameter name="spy_product_offer_concrete_sku" column="concrete_sku" keep-additional="true"/>
        </behavior>
    </table>

    <table name="spy_product_offer_store" phpName="SpyProductOfferStore">
        <behavior name="event">
            <parameter name="spy_product_offer_store_all" column="*"/>
        </behavior>
    </table>
</database>
```

Run the following commands to apply database changes and to generate entity and transfer changes.

```bash
console transfer:generate``console propel:``install``console transfer:generate
```

---
**Verificaiton**

Verify that the following changes have been implemented by checking your database:

| Database entity                              | Type   | Event   |
| ------------------------------------------- | ----- | ------ |
| spy_product_offer                            | table  | created |
| spy_product_offer_store                      | table  | created |
| spy_product_concrete_product_offers_storage  | table  | created |
| spy_product_offer_storage                    | table  | created |
| spy_sales_order_item.product_offer_reference | column | created |
| spy_product_offer_validity                   | table  | created |


Make sure that the following changes were applied in transfer objects:

| Transfer                           | Type      | Event   | Path            |
| --------------------------------- | -------- | ------ | ----------------------------------------------------------- |
| MerchantProductOfferCriteriaFilter | class     | created | src/Generated/Shared/Transfer/MerchantProductOfferCriteriaFilterTransfer |
| DataImporterConfiguration          | class     | created | src/Generated/Shared/Transfer/DataImporterConfigurationTransfer |
| ProductOffer                       | class     | created | src/Generated/Shared/Transfer/ProductOfferTransfer           |
| StringFacetMap                     | class     | created | src/Generated/Shared/Transfer/StringFacetMapTransfer         |
| ProductOffer.idProductConcrete     | attribute | created | src/Generated/Shared/Transfer/ProductOfferTransfer           |
| ProductOfferResponse.isSuccessful  | attribute | created | src/Generated/Shared/Transfer/ProductOfferResponseTransfer   |
| ProductOfferCriteriaFilter         | class     | created | src/Generated/Shared/Transfer/ProductOfferCriteriaFilterTransfer |
| Item.productOfferReference         | attribute | created | src/Generated/Shared/Transfer/ItemTransfer                   |
| ProductOfferValidity               | class     | created | src/Generated/Shared/Transfer/ProductOfferValidityTransfer   |
| ProductOffer.productOfferValidity  | attribute | created | src/Generated/Shared/Transfer/ProductOfferTransfer           |

---

### 3) Add translations

#### Zed translations

Run the following command to generate a new translation cache for Zed:

```bash
console translator:generate-cache
```

### 4) Configure Export to Redis and ElasticSearch

#### Set up Event Listeners

| Plugin      | Specification        | Prerequisites | Namespace       |
| ------------------- | --------------- | ----------- | :---------------------- |
| MerchantProductOfferStorageEventSubscriber | Registers listeners that are responsible for publishing Merchant Product Offers to storage. | None          | Spryker\Zed\MerchantProductOfferStorage\Communication\Plugin\Event\Subscriber |
| MerchantProductOfferSearchEventSubscriber  | Registers listeners that are responsible for publishing Merchant Product Offer search to storage. | None          | Spryker\Zed\MerchantProductOfferSearch\Communication\Plugin\Event\Subscriber |
| MerchantSearchEventSubscriber              | Registers listeners that are responsible for publishing Merchant search to storage. | None          | Spryker\Zed\MerchantProductOfferSearch\Communication\Plugin\Event\Subscriber |

**src/Pyz/Zed/Event/EventDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Event;

use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;
use Spryker\Zed\MerchantProductOfferSearch\Communication\Plugin\Event\Subscriber\MerchantProductOfferSearchEventSubscriber;
use Spryker\Zed\MerchantProductOfferSearch\Communication\Plugin\Event\Subscriber\MerchantSearchEventSubscriber;
use Spryker\Zed\MerchantProductOfferStorage\Communication\Plugin\Event\Subscriber\MerchantProductOfferStorageEventSubscriber;

class EventDependencyProvider extends SprykerEventDependencyProvider
{
    public function getEventSubscriberCollection()
    {
        $eventSubscriberCollection = parent::getEventSubscriberCollection();
        $eventSubscriberCollection->add(new MerchantSearchEventSubscriber());
        $eventSubscriberCollection->add(new MerchantProductOfferSearchEventSubscriber());
        $eventSubscriberCollection->add(new MerchantProductOfferStorageEventSubscriber());

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
use Spryker\Shared\MerchantProductOfferStorage\MerchantProductOfferStorageConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     * @return array
     */
    protected function getSynchronizationQueueConfiguration(): array
    {
        return [
            MerchantProductOfferStorageConfig::MERCHANT_PRODUCT_OFFER_SYNC_STORAGE_QUEUE,
        ];
    }

}
```

#### Configure message processors

| Plugin  | Specification  | Prerequisites | Namespace   |
| ----------------- | -------------- | -------- | ------------ |
| SynchronizationStorageQueueMessageProcessorPlugin | Configures all Merchant Product Offers to sync with Redis storage, and marks messages as failed in case of error. | None          | Spryker\Zed\Synchronization\Communication\Plugin\Queue |

**src/Pyz/Zed/Queue/QueueDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Queue;

use Spryker\Shared\MerchantProductOfferStorage\MerchantProductOfferStorageConfig;
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
            MerchantProductOfferStorageConfig::MERCHANT_PRODUCT_OFFER_SYNC_STORAGE_QUEUE => new SynchronizationStorageQueueMessageProcessorPlugin(),
        ];
    }
}
```

### Set up re-generate and re-sync features

| Plugin | Specification  | Prerequisites | Namespace   |
| ----------------- | --------------- | ---------- | ---------------- |
| ProductConcreteProductOffersSynchronizationDataPlugin | Allows synchronizing the entire storage table content into Storage. | None          | Spryker\Zed\MerchantProductOfferStorage\Communication\Plugin\Synchronization |
| ProductOfferSynchronizationDataPlugin                 | Allows synchronizing the entire storage table content into Storage. | None          | Spryker\Zed\MerchantProductOfferStorage\Communication\Plugin\Synchronization |

**rc/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\MerchantProductOfferStorage\Communication\Plugin\Synchronization\ProductConcreteProductOffersSynchronizationDataPlugin;
use Spryker\Zed\MerchantProductOfferStorage\Communication\Plugin\Synchronization\ProductOfferSynchronizationDataPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new ProductConcreteProductOffersSynchronizationDataPlugin(),
            new ProductOfferSynchronizationDataPlugin(),
        ];
    }
}
```

Configure synchronization pool name:

**src/Pyz/Zed/MerchantProductOfferStorage/MerchantProductOfferStorageConfig.php**

```php
<?php

namespace Pyz\Zed\MerchantProductOfferStorage;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Shared\Publisher\PublisherConfig;
use Spryker\Zed\MerchantProductOfferStorage\MerchantProductOfferStorageConfig as SprykerMerchantProductOfferStorageConfig;

class MerchantProductOfferStorageConfig extends SprykerMerchantProductOfferStorageConfig
{
    /**
     * @api
     *
     * @return string|null
     */
    public function getMerchantProductOfferSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }
}
```

---
**Verificaiton**

 Make sure that after setting up the event listeners, the following commands do the following:

   1. `console sync:data product_concrete_product_offers` exports data from `spy_product_concrete_product_offers_storage` table to Redis.
   2. `console sync:data product_offer` exports data from `spy_product_offer_storage` table to Redis.

Make sure that when the following entities get updated via the ORM, the corresponding Redis keys have the correct values.

   | Target Entity | Example expected data identifier    | Example expected data fragment    |
   | ---------- | --------------------------- | ------------------ |
   | ProductOffer  | kv:product_offer:offer2                         | {“id_product_offer”:1,“id_merchant”:6,“product_offer_reference”:“offer1",“merchant_sku”:“GS952M00H-Q11"} |
   | ProductOffer  | kv:product_concrete_product_offers:093_24495843 | [“offer3”,“offer4"]                                          |

---

### 5) Import data

Prepare your data according to your requirements using our demo data:

**data/import/common/common/marketplace/merchant_product_offer.csv**

```yaml
product_offer_reference,concrete_sku,merchant_reference,merchant_sku,is_active,approval_status``offer1,093_24495843,MER000001,GS952M00H-Q11,1,approved``offer2,090_24495844,MER000002,,1,approved``offer3,091_25873091,MER000001,M9122A0AQ-C11,1,approved``offer4,091_25873091,MER000002,M9122A0AQ-C11,1,approved``offer5,092_24495842,MER000001,TH344E01G-Q11,0,approved``offer6,092_24495842,MER000002,OB054P005-Q11,1,approved``offer7,193_32124735,MER000001,,1,approved``offer8,001_25904006,MER000002,,1,approved``offer9,002_25904004,MER000002,,0,approved``offer10,003_26138343,MER000002,,0,waiting_for_approval``offer11,004_30663302,MER000002,,1,waiting_for_approval
```

| Column    | Is Obligatory? | Data Type | Data Example  | Data Explanation      |
| -------------- | ----------- | -------- | --------- | ------------------ |
| product_offer_reference | mandatory      | string    | offer1        | Product Offer reference that will be referenced to this Merchant. |
| concrete_sku            | mandatory      | string    | 093_24495843  | Concrete product SKU this Product Offer is attached to.      |
| merchant_reference      | mandatory      | string    | `MER000002`   | Merchant identifier.                                         |
| merchant_sku            | optional       | string    | GS952M00H-Q11 | Merchant internal SKU for the Product Offer.                 |
| is_active               | optional       | boolean   | 1             | Product Offer status, defaults to 1                          |
| approval_status         | optional       | string    | approved      | Approval Status (Waiting for Approval – Approved – Denied)Denied and Waiting for Approval statuses mean that the Offer is not visible on PDP regardless of Product Offer → Active = true.This can be configured (along with the transition between statuses in ProductOfferConfig). If not supplied, ProductOfferConfig → getDefaultStatus is applied |

**data/import/marketplace/merchant_product_offer_store.csv**

```yaml
product_offer_reference,store_name``offer1,DE``offer1,AT``offer2,DE``offer2,AT``offer2,US
```

| Column    | Is Obligatory? | Data Type | Data Example      | Data Explanation            |
| --------------------- | ------------ | ------- | ----------------- | :---------------------------------------------------- |
| product_offer_reference | mandatory      | string    | roan-gmbh-und-co-k-g | Product Offer reference, unique identifier per Offer. |
| store_name              | mandatory      | string    | DE                   | The name of the store.                                |

**vendor/spryker/spryker/Bundles/ProductOfferValidityDataImport/data/import/product_offer_validity.csv**

```yaml
product_offer_reference,valid_from,valid_to``offer1,,``offer2,2020-05-05,2020-12-31
```

| Column                  | Is Obligatory? | Data Type | Data Example | Data explanation      |
| -------------------- | ----------- | ------ | ----------- | ------------------------------- |
| product_offer_reference | mandatory      | string    | offer1       | Unique Product Offer identifier.             |
| valid_from              | optional       | `string`  | 2020-01-01   | Date since which the Product Offer is valid. |
| valid_to                | optional       | `string`  | 2020-01-01   | Date till which the Product Offer is valid.  |

Register the following plugins to enable data import:

| Plugin | Specification    | Prerequisites | Namespace   |
| ------------------ | ---------------------- | ---------- | ---------------------- |
| MerchantProductOfferDataImportPlugin      | Imports Merchant Product Offer data          | None          | Spryker\Zed\MerchantProductOfferDataImport\Communication\Plugin |
| MerchantProductOfferStoreDataImportPlugin | Imports Product Offer to store relation data | None          | Spryker\Zed\MerchantProductOfferDataImport\Communication\Plugin |
| ProductOfferValidityDataImportPlugin      | Imports Product Offer validities             | None          | Spryker\Zed\ProductOfferValidityDataImport\Communication     |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\MerchantProductOfferDataImport\Communication\Plugin\MerchantProductOfferDataImportPlugin;
use Spryker\Zed\MerchantProductOfferDataImport\Communication\Plugin\MerchantProductOfferStoreDataImportPlugin;
use Spryker\Zed\ProductOfferValidityDataImport\Communication\ProductOfferValidityDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    protected function getDataImporterPlugins(): array
    {
        return [
            new MerchantProductOfferDataImportPlugin(),
            new MerchantProductOfferStoreDataImportPlugin(),
            new ProductOfferValidityDataImportPlugin(),
        ];
    }
}
```

Run the following console command to import data:

```bash
console data:``import` `merchant-product-offer``console data:``import` `merchant-product-offer-store``console data:``import` `product-offer-validity
```

---
**Verificaiton**

Make sure that the Product Offer data is attached to Merchants in `spy_product_offer`.

Make sure that the Product Offer data is attached to Stores in `spy_product_offer_store`.

Make sure that the Product Offer validity data is correctly imported in `spy_product_offer_validity`.

---

## 6) Set up behavior

Enable the following behaviors by registering the plugins:

| Plugin   | Description  | Prerequisites  | Namespace  |
| -------------------------- | ------------------------ | ------------------------- | ----------------------------- |
| MerchantProductOfferTableExpanderPlugin              | Expands ProductOfferGui product table with Merchant data     | None                           | Spryker\Zed\MerchantProductOfferGui\Communication\Plugin\ProductOfferGui |
| MerchantProductOfferViewSectionPlugin                | Adds a new Merchant section to the ProductOfferGui view      | None                           | Spryker\Zed\MerchantProductOfferGui\Communication\Plugin     |
| ProductOfferValidityProductOfferViewSectionPlugin    | Adds a new validity section to the ProductOfferGui view      | None                           | Spryker\Zed\ProductOfferValidityGui\Communication\Plugin\ProductOfferGui |
| MerchantProductOfferListActionViewDataExpanderPlugin | Expands Product Offer view data with Merchant data when showing it in ProductOfferGui module | None                           | Spryker\Zed\MerchantGui\Communication\Plugin\ProductOffer    |
| MerchantReferenceQueryExpanderPlugin                 | Adds filter by Merchant reference to search query.           | None                           | Spryker\Client\MerchantProductOfferSearch\Plugin             |
| MerchantNameSearchConfigExpanderPlugin               | Expands facet configuration with Merchant name filter.       | None                           | Spryker\Client\MerchantProductOfferSearch\Plugin             |
| MerchantProductPageDataExpanderPlugin                | Expands the provided ProductAbstractPageSearch transfer object's data by Merchant names. | None                           | Spryker\Zed\MerchantProductOfferSearch\Communication\Plugin\PageDataExpander |
| MerchantProductPageDataLoaderPlugin                  | Expands ProductPageLoadTransfer object with Merchant data.   | None                           | Spryker\Zed\MerchantProductOfferSearch\Communication\Plugin\PageDataLoader |
| MerchantNamesProductAbstractMapExpanderPlugin        | Adds Merchant names to product abstract search data.         | None                           | Spryker\Zed\MerchantProductOfferSearch\Communication\Plugin\PageMapExpander |
| MerchantReferencesProductAbstractsMapExpanderPlugin  | Adds Merchant references to product abstract search data.    | None                           | Spryker\Zed\MerchantProductOfferSearch\Communication\Plugin\PageMapExpander |
| DefaultProductOfferReferenceStrategyPlugin           | Sets default selected Product Offer in PDP for a product concrete. It selects the first Product Offer in the list. | ProductViewOfferExpanderPlugin | Spryker\Client\MerchantProductOfferStorage\Plugin\MerchantProductOfferStorage |
| ProductOfferReferenceStrategyPlugin                  | Sets selected Product Offer in ProductConcreteTransfer if one is already selected on PDP | ProductViewOfferExpanderPlugin | Spryker\Client\MerchantProductOfferStorage\Plugin\MerchantProductOfferStorage |
| ProductViewOfferExpanderPlugin                       | Adds Product Offer data to ProductViewTransfer when retrieving product. | None                           | Spryker\Client\MerchantProductOfferStorage\Plugin\ProductStorage |
| ProductOfferValidityProductOfferPostCreatePlugin     | Creates Product Offer validity dates after Product Offer is created | None                           | Spryker\Zed\ProductOfferValidity\Communication\Plugin\ProductOffer |
| ProductOfferValidityProductOfferPostUpdatePlugin     | Updates Product Offer validity dates after Product Offer is updated | None                           | Spryker\Zed\ProductOfferValidity\Communication\Plugin\ProductOffer |
| ProductOfferValidityProductOfferExpanderPlugin       | Expands Product Offer data with validity dates when Product Offer is fetched | None                           | Spryker\Zed\ProductOfferValidity\Communication\Plugin\ProductOffer |
| ProductOfferValidityConsole                          | Updates Product Offers to have isActive flag to be false where their validity date is not current anymore | None                           | Spryker\Zed\ProductOfferValidity\Communication\Console       |

**src/Pyz/Client/Catalog/CatalogDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Catalog;

use Spryker\Client\Catalog\CatalogDependencyProvider as SprykerCatalogDependencyProvider;
use Spryker\Client\MerchantProductOfferSearch\Plugin\MerchantReferenceQueryExpanderPlugin;

class CatalogDependencyProvider extends SprykerCatalogDependencyProvider
{
    /**
     * @return \Spryker\Client\Search\Dependency\Plugin\QueryExpanderPluginInterface[]|\Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface[]
     */
    protected function createCatalogSearchQueryExpanderPlugins()
    {
        return [
            new MerchantReferenceQueryExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Client\Search\Dependency\Plugin\QueryExpanderPluginInterface[]|\Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface[]
     */
    protected function createSuggestionQueryExpanderPlugins()
    {
        return [
            new MerchantReferenceQueryExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Client/Search/SearchDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Search;

use Spryker\Client\Kernel\Container;
use Spryker\Client\MerchantProductOfferSearch\Plugin\MerchantNameSearchConfigExpanderPlugin;
use Spryker\Client\Search\SearchDependencyProvider as SprykerSearchDependencyProvider;

class SearchDependencyProvider extends SprykerSearchDependencyProvider
{
    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Search\Dependency\Plugin\SearchConfigExpanderPluginInterface[]
     */
    protected function createSearchConfigExpanderPlugins(Container $container)
    {
        $searchConfigExpanderPlugins = parent::createSearchConfigExpanderPlugins($container);

        $searchConfigExpanderPlugins[] = new MerchantNameSearchConfigExpanderPlugin();

        return $searchConfigExpanderPlugins;
    }
}
```

**src/Pyz/Client/SearchElasticsearch/SearchElasticsearchDependencyProvider.php**

```php
<?php

namespace Pyz\Client\SearchElasticsearch;

use Spryker\Client\Kernel\Container;
use Spryker\Client\MerchantProductOfferSearch\Plugin\MerchantNameSearchConfigExpanderPlugin;
use Spryker\Client\SearchElasticsearch\SearchElasticsearchDependencyProvider as SprykerSearchElasticsearchDependencyProvider;

class SearchElasticsearchDependencyProvider extends SprykerSearchElasticsearchDependencyProvider
{
    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\SearchConfigExpanderPluginInterface[]
     */
    protected function getSearchConfigExpanderPlugins(Container $container): array
    {
        return [
            new MerchantNameSearchConfigExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/ProductOfferGui/ProductOfferGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductOfferGui;

use Spryker\Zed\MerchantGui\Communication\Plugin\ProductOffer\MerchantProductOfferListActionViewDataExpanderPlugin;
use Spryker\Zed\MerchantProductOfferGui\Communication\Plugin\MerchantProductOfferTableExpanderPlugin;
use Spryker\Zed\MerchantProductOfferGui\Communication\Plugin\ProductOfferGui\MerchantProductOfferViewSectionPlugin;
use Spryker\Zed\ProductOfferGui\ProductOfferGuiDependencyProvider as SprykerProductOfferGuiDependencyProvider;
use Spryker\Zed\ProductOfferValidityGui\Communication\Plugin\ProductOfferGui\ProductOfferValidityProductOfferViewSectionPlugin;

class ProductOfferGuiDependencyProvider extends SprykerProductOfferGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\ProductOfferGuiExtension\Dependency\Plugin\ProductOfferListActionViewDataExpanderPluginInterface[]
     */
    protected function getProductOfferListActionViewDataExpanderPlugins(): array
    {
        return [
            new MerchantProductOfferListActionViewDataExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\ProductOfferGuiExtension\Dependency\Plugin\ProductOfferTableExpanderPluginInterface[]
     */
    protected function getProductOfferTableExpanderPlugins(): array
    {
        return [
            new MerchantProductOfferTableExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\ProductOfferGuiExtension\Dependency\Plugin\ProductOfferViewSectionPluginInterface[]
     */
    public function getProductOfferViewSectionPlugins(): array
    {
        return [
            new MerchantProductOfferViewSectionPlugin(),
            new ProductOfferValidityProductOfferViewSectionPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/ProductPageSearch/ProductPageSearchDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductPageSearch;

use Spryker\Shared\MerchantProductOfferSearch\MerchantProductOfferSearchConfig;
use Spryker\Zed\MerchantProductOfferSearch\Communication\Plugin\PageDataExpander\MerchantProductPageDataExpanderPlugin;
use Spryker\Zed\MerchantProductOfferSearch\Communication\Plugin\PageDataLoader\MerchantProductPageDataLoaderPlugin;
use Spryker\Zed\MerchantProductOfferSearch\Communication\Plugin\PageMapExpander\MerchantNamesProductAbstractMapExpanderPlugin;
use Spryker\Zed\MerchantProductOfferSearch\Communication\Plugin\PageMapExpander\MerchantReferencesProductAbstractsMapExpanderPlugin;
use Spryker\Zed\ProductPageSearch\ProductPageSearchDependencyProvider as SprykerProductPageSearchDependencyProvider;

class ProductPageSearchDependencyProvider extends SprykerProductPageSearchDependencyProvider
{
    /**
     * @return \Spryker\Zed\ProductPageSearch\Dependency\Plugin\ProductPageDataExpanderInterface[]
     */
    protected function getDataExpanderPlugins()
    {
        $dataExpanderPlugins = [];

        $dataExpanderPlugins[MerchantProductOfferSearchConfig::PLUGIN_PRODUCT_MERCHANT_DATA] = new MerchantProductPageDataExpanderPlugin();

        return $dataExpanderPlugins;
    }

    /**
     * @return \Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductPageDataLoaderPluginInterface[]
     */
    protected function getDataLoaderPlugins()
    {
        return [
            new MerchantProductPageDataLoaderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductAbstractMapExpanderPluginInterface[]
     */
    protected function getProductAbstractMapExpanderPlugins(): array
    {
        return [
            new MerchantNamesProductAbstractMapExpanderPlugin(),
            new MerchantReferencesProductAbstractsMapExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Client/MerchantProductOfferStorage/MerchantProductOfferStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\MerchantProductOfferStorage;

use Spryker\Client\MerchantProductOfferStorage\MerchantProductOfferStorageDependencyProvider as SprykerMerchantProductOfferStorageDependencyProvider;
use Spryker\Client\MerchantProductOfferStorage\Plugin\MerchantProductOfferStorage\DefaultProductOfferReferenceStrategyPlugin;
use Spryker\Client\MerchantProductOfferStorage\Plugin\MerchantProductOfferStorage\ProductOfferReferenceStrategyPlugin;

class MerchantProductOfferStorageDependencyProvider extends SprykerMerchantProductOfferStorageDependencyProvider
{
    /**
     * @return \Spryker\Client\MerchantProductOfferStorageExtension\Dependency\Plugin\ProductOfferReferenceStrategyPluginInterface[]
     */
    protected function getProductOfferReferenceStrategyPlugins(): array
    {
        return [
            new ProductOfferReferenceStrategyPlugin(),
            new DefaultProductOfferReferenceStrategyPlugin(),
        ];
    }
}
```

**src/Pyz/Client/ProductStorage/ProductStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\ProductStorage;

use Spryker\Client\MerchantProductOfferStorage\Plugin\ProductStorage\ProductViewOfferExpanderPlugin;
use Spryker\Client\ProductStorage\ProductStorageDependencyProvider as SprykerProductStorageDependencyProvider;

class ProductStorageDependencyProvider extends SprykerProductStorageDependencyProvider
{
    /**
     * @return \Spryker\Client\ProductStorage\Dependency\Plugin\ProductViewExpanderPluginInterface[]
     */
    protected function getProductViewExpanderPlugins()
    {
        return [
            new ProductViewOfferExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/ProductOffer/ProductOfferDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductOffer;

use Spryker\Zed\ProductOffer\ProductOfferDependencyProvider as SprykerProductOfferDependencyProvider;
use Spryker\Zed\ProductOfferValidity\Communication\Plugin\ProductOffer\ProductOfferValidityProductOfferExpanderPlugin;
use Spryker\Zed\ProductOfferValidity\Communication\Plugin\ProductOffer\ProductOfferValidityProductOfferPostCreatePlugin;
use Spryker\Zed\ProductOfferValidity\Communication\Plugin\ProductOffer\ProductOfferValidityProductOfferPostUpdatePlugin;

class ProductOfferDependencyProvider extends SprykerProductOfferDependencyProvider
{
    /**
     * @return \Spryker\Zed\ProductOfferExtension\Dependency\Plugin\ProductOfferPostCreatePluginInterface[]
     */
    protected function getProductOfferPostCreatePlugins(): array
    {
        return [
            new ProductOfferValidityProductOfferPostCreatePlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\ProductOfferExtension\Dependency\Plugin\ProductOfferPostUpdatePluginInterface[]
     */
    protected function getProductOfferPostUpdatePlugins(): array
    {
        return [
            new ProductOfferValidityProductOfferPostUpdatePlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\ProductOfferExtension\Dependency\Plugin\ProductOfferExpanderPluginInterface[]
     */
    protected function getProductOfferExpanderPlugins(): array
    {
        return [
            new ProductOfferValidityProductOfferExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\ProductOfferValidity\Communication\Console\ProductOfferValidityConsole;

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
            new ProductOfferValidityConsole(),
        ];

        return $commands;
    }
}
```

---
**Verificaiton**

Make sure that a default Product Offer is given when retrieving product concrete data.

Make sure that validity data is saved when saving a product offer.

Make sure Merchant and Product Offer Validity sections exist in Product Offer edit page in `ProductOfferGui`.

Make sure Merchant column is in Product Offers list in `ProductOfferGui`.

Make sure console command invalidates expired Product Offers are reactivates Product Offers that are within their validity datesMake sure that when a merchant gets updated or published, or when a product offer gets published, created or updated, the corresponding product abstracts get updated in the catalog search pages.
   1. Meaning that if a merchant gets deactivated, `ProductAbstracts` that were on the catalog search only because they had a Product Offer from that merchant get removed.
   2. Meaning that if a product offer gets created and the `ProductAbstract` related to it was not available on catalog search, would now be available

---

## Install feature front end

### Prerequisites

To start feature integration, overview, and install the necessary features:

| Name         | Version  |
| ---------- | ----- |
| Spryker Core | 202001.0 |

### 1) Install the required modules using composer

If installed before, not needed.

---
**Verificaiton**

Verify that the following modules were installed:

| Module                     | Expected Directory                         |
| ---------------------- | ------------------------------------- |
| MerchantProductOfferWidget | spryker-shop/merchant-product-offer-widget |

---

### 2) Add Yves Translations

Append glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
merchant_product_offer.view_seller,View Seller,en_US``merchant_product_offer.view_seller,Händler ansehen,de_DE``merchant_product_offer.sold_by,Sold by,en_US``merchant_product_offer.sold_by,Verkauft durch,de_DE
```

Run the following console command to import data:

```bash
console data:``import` `glossary
```

---
**Verificaiton**

Make sure that the configured data is added to the `spy_glossary` table in the database.

---

### 3) Set up widgets

Register the following plugins to enable widgets:

| Plugin     | Description    | Prerequisites | Namespace         |
| ------------------ | ------------------- | ------ | ------------------------------- |
| MerchantProductOfferWidget       | Shows the list of the Offers with their prices for a product concrete. | None          | SprykerShop\Yves\MerchantProductOfferWidget\Widget |
| ProductOfferSoldByMerchantWidget | Shows Merchant data for an Offer given a cart item.          | None          | SprykerShop\Yves\MerchantProductOfferWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\MerchantProductOfferWidget\Widget\MerchantProductOfferWidget;
use SprykerShop\Yves\MerchantProductOfferWidget\Widget\ProductOfferSoldByMerchantWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return string[]
     */
    protected function getGlobalWidgets(): array
    {
        return [
            MerchantProductOfferWidget::class,
            ProductOfferSoldByMerchantWidget::class,
        ];
    }
}
```

Run the following command to enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

---
**Verificaiton**

Make sure that the following widgets were registered:

| Module      | Test             |
| ------------------------------ | --------------------------- |
| MerchantProductOfferWidget       | Go to a product concrete detail page that has Offers, and you will see the default Offer selected and the widget displayed. |
| ProductOfferSoldByMerchantWidget | Go through the checkout process with an Offer, and you will see the sold by text and Merchant data throughout the checkout process. |

---

## Related features

| Feature        | Link        |
| ---------------------- | ---------------------- |
| Marketplace Product Offer API    | [Marketplace Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/glue/marketplace-product-offer-feature-integration.html) |
| Marketplace Product Offer + Cart | [Marketplace Product Offer + Cart feature integration](/docs/marketplace/dev/feature-integration-guides/product-offer-cart-feature-integration.html) |
