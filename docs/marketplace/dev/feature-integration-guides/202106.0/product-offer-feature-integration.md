---
title: Marketplace Product Offer feature integration
last_updated: Mar 29, 2021
description: This document describes the process how to integrate the Marketplace Product Offer feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Product Offer into a Spryker project.

## Install feature core
Follow the steps below to install the Marketplace Product Offer feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
| --------------- | ------- | -------|
| Spryker Core         | 202001.0   | [Spryker Core feature integration](https://documentation.spryker.com/docs/spryker-core-feature-integration) |
| Marketplace Merchant | dev-master | [Marketplace Merchants feature integration](docs/marketplace/dev/feature-integration-guides/marketplace-merchants-feature-integration.html) |
| Product              | 202001.0   | [Product feature integration](https://github.com/spryker-feature/product) |

###  1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker-feature/marketplace-product-offer --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules were installed:

| MODULE | EXPECTED DIRECTORY |
| ------------------ | ---------------------- |
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

{% endinfo_block %}

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

Apply database changes and to generate entity and transfer changes.

```bash
console transfer:generate``console propel:``install``console transfer:generate
```

{% info_block warningBox "Verification" %}

Verify that the following changes have been implemented by checking your database:

| DATABASE ENTITY | TYPE | EVENT |
| -------------------------- | ----- | ------ |
| spy_product_offer                            | table  | created |
| spy_product_offer_store                      | table  | created |
| spy_product_concrete_product_offers_storage  | table  | created |
| spy_product_offer_storage                    | table  | created |
| spy_sales_order_item.product_offer_reference | column | created |
| spy_product_offer_validity                   | table  | created |


Make sure that the following changes were applied in transfer objects:

| TRANSFER  | TYPE  | EVENT | PATH  |
| --------------- | -------- | ------ | ---------------- |
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

{% endinfo_block %}

### 3) Add Zed translations

Generate a new translation cache for Zed:

```bash
console translator:generate-cache
```

### 4) Configure export to Redis and Elasticsearch

To configure export to Redis and ElasticSearch, take the following steps:

#### Set up event listeners

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --------------- | ------------- | ----------- | ---------------- |
| MerchantProductOfferStorageEventSubscriber | Registers listeners responsible for publishing merchant product offers to storage. |           | Spryker\Zed\MerchantProductOfferStorage\Communication\Plugin\Event\Subscriber |
| MerchantProductOfferSearchEventSubscriber  | Registers listeners responsible for publishing merchant product offer search to storage. |           | Spryker\Zed\MerchantProductOfferSearch\Communication\Plugin\Event\Subscriber |
| MerchantSearchEventSubscriber              | Registers listeners responsible for publishing merchant search to storage. |           | Spryker\Zed\MerchantProductOfferSearch\Communication\Plugin\Event\Subscriber |

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

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| ----------------- | -------------- | -------- | ------------ |
| SynchronizationStorageQueueMessageProcessorPlugin | Configures all merchant product offers to sync with Redis storage and marks messages as failed in case of error. |           | Spryker\Zed\Synchronization\Communication\Plugin\Queue |

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

#### Set up re-generate and re-sync features

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| ----------------- | --------------- | ---------- | ---------------- |
| ProductConcreteProductOffersSynchronizationDataPlugin | Allows synchronizing the entire storage table content into Storage. |           | Spryker\Zed\MerchantProductOfferStorage\Communication\Plugin\Synchronization |
| ProductOfferSynchronizationDataPlugin                 | Allows synchronizing the entire storage table content into Storage. |           | Spryker\Zed\MerchantProductOfferStorage\Communication\Plugin\Synchronization |

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

{% info_block warningBox "Verification" %}

 Make sure that after setting up the event listeners, the following commands do the following:

   1. `console sync:data product_concrete_product_offers` exports data from `spy_product_concrete_product_offers_storage` table to Redis.
   2. `console sync:data product_offer` exports data from `spy_product_offer_storage` table to Redis.

Make sure that when the following entities get updated via the ORM, the corresponding Redis keys have the correct values.

| TARGET ENTITY | EXAMPLE EXPECTED DATA IDENTIFIER | EXAMPLE EXPECTED DATA FRAGMENT |
| ---------- | ------------------------- | ------------------ |
| ProductOffer  | kv:product_offer:offer2     | {“id_product_offer”:1,“id_merchant”:6,“product_offer_reference”:“offer1",“merchant_sku”:“GS952M00H-Q11"} |
| ProductOffer  | kv:product_concrete_product_offers:093_24495843 | [“offer3”,“offer4"]   |

{% endinfo_block %}

### 5) Import data

Prepare your data according to your requirements using our demo data:

**data/import/common/common/marketplace/merchant_product_offer.csv**

```yaml
product_offer_reference,concrete_sku,merchant_reference,merchant_sku,is_active,approval_status``offer1,093_24495843,MER000001,GS952M00H-Q11,1,approved``offer2,090_24495844,MER000002,,1,approved``offer3,091_25873091,MER000001,M9122A0AQ-C11,1,approved``offer4,091_25873091,MER000002,M9122A0AQ-C11,1,approved``offer5,092_24495842,MER000001,TH344E01G-Q11,0,approved``offer6,092_24495842,MER000002,OB054P005-Q11,1,approved``offer7,193_32124735,MER000001,,1,approved``offer8,001_25904006,MER000002,,1,approved``offer9,002_25904004,MER000002,,0,approved``offer10,003_26138343,MER000002,,0,waiting_for_approval``offer11,004_30663302,MER000002,,1,waiting_for_approval
```

| COLUMN | REQUIRED? | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| -------------- | ----------- | -------- | --------- | ------------------ |
| product_offer_reference | &check;      | string    | offer1        | Product offer reference that will be referenced to this merchant. |
| concrete_sku            | &check;        | string    | 093_24495843  | Concrete product SKU this product offer is attached to.      |
| merchant_reference      | &check;        | string    | `MER000002`   | Merchant identifier.                                         |
| merchant_sku            |        | string    | GS952M00H-Q11 | merchant internal SKU for the product offer.                 |
| is_active               |        | boolean   | 1             | Product offer status, defaults to 1.                          |
| approval_status         |        | string    | approved      | Approval status (Waiting for Approval – Approved – Denied). Denied and Waiting for Approval statuses mean that the offer is not visible on PDP regardless of Product Offer → Active = true.This can be configured (along with the transition between statuses in ProductOfferConfig). If not supplied, ProductOfferConfig → getDefaultStatus is applied. |

**data/import/marketplace/merchant_product_offer_store.csv**

```yaml
product_offer_reference,store_name``offer1,DE``offer1,AT``offer2,DE``offer2,AT``offer2,US
```

| COLUMN | REQUIRED? | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| ---------------- | ------------ | ------- | ------------- | ------- |
| product_offer_reference | &check;     | string    | roan-gmbh-und-co-k-g | Product Offer reference, unique identifier per Offer. |
| store_name              | &check;    | string    | DE  | The name of the store.  |

**vendor/spryker/spryker/Bundles/ProductOfferValidityDataImport/data/import/product_offer_validity.csv**

```yaml
product_offer_reference,valid_from,valid_to``offer1,,``offer2,2020-05-05,2020-12-31
```

| COLUMN | REQUIRED? | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| ------------ | ----------- | ------ | ----------- | ---------------- |
| product_offer_reference | &check; | string    | offer1       | Unique product offer identifier.             |
| valid_from              |  | `string`  | 2020-01-01   | Date since which the product offer is valid. |
| valid_to                |  | `string`  | 2020-01-01   | Date till which the product offer is valid.  |

Register the following plugins to enable data import:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| ------------------ | ---------------------- | ---------- | ---------------------- |
| MerchantProductOfferDataImportPlugin      | Imports merchant product offer data.          |           | Spryker\Zed\MerchantProductOfferDataImport\Communication\Plugin |
| MerchantProductOfferStoreDataImportPlugin | Imports the product offer to store relation data. |           | Spryker\Zed\MerchantProductOfferDataImport\Communication\Plugin |
| ProductOfferValidityDataImportPlugin      | Imports product offer validities.             |           | Spryker\Zed\ProductOfferValidityDataImport\Communication     |

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

Import data:

```bash
console data:``import` `merchant-product-offer``console data:``import` `merchant-product-offer-store``console data:``import` `product-offer-validity
```

{% info_block warningBox "Verification" %}

Make sure that the product offer data is attached to Merchants in `spy_product_offer`.

Make sure that the product offer data is attached to Stores in `spy_product_offer_store`.

Make sure that the product offer validity data is correctly imported in `spy_product_offer_validity`.

{% endinfo_block %}

### 6) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
| ---------------- | --------------- | -------------- | ---------------- |
| MerchantProductOfferTableExpanderPlugin              | Expands the  `ProductOfferGui` product table with merchant data.     |                            | Spryker\Zed\MerchantProductOfferGui\Communication\Plugin\ProductOfferGui |
| MerchantProductOfferViewSectionPlugin                | Adds a new merchant section to the `ProductOfferGui` view.     |                            | Spryker\Zed\MerchantProductOfferGui\Communication\Plugin     |
| ProductOfferValidityProductOfferViewSectionPlugin    | Adds a new validity section to the `ProductOfferGui` view.      |                            | Spryker\Zed\ProductOfferValidityGui\Communication\Plugin\ProductOfferGui |
| MerchantProductOfferListActionViewDataExpanderPlugin | Expands product offer view data with merchant data when showing it in the  `ProductOfferGui` module. |                            | Spryker\Zed\MerchantGui\Communication\Plugin\ProductOffer    |
| MerchantReferenceQueryExpanderPlugin                 | Adds filter by the merchant reference to the search query.           |                            | Spryker\Client\MerchantProductOfferSearch\Plugin             |
| MerchantNameSearchConfigExpanderPlugin               | Expands facet configuration with the merchant name filter.       |                            | Spryker\Client\MerchantProductOfferSearch\Plugin             |
| MerchantProductPageDataExpanderPlugin                | Expands the provided `ProductAbstractPageSearch` transfer object's data by merchant names. |                            | Spryker\Zed\MerchantProductOfferSearch\Communication\Plugin\PageDataExpander |
| MerchantProductPageDataLoaderPlugin                  | Expands the `ProductPageLoadTransfer` object with merchant data.   |                            | Spryker\Zed\MerchantProductOfferSearch\Communication\Plugin\PageDataLoader |
| MerchantNamesProductAbstractMapExpanderPlugin        | Adds merchant names to product abstract search data.         |                            | Spryker\Zed\MerchantProductOfferSearch\Communication\Plugin\PageMapExpander |
| MerchantReferencesProductAbstractsMapExpanderPlugin  | Adds merchant references to product abstract search data.    |                            | Spryker\Zed\MerchantProductOfferSearch\Communication\Plugin\PageMapExpander |
| DefaultProductOfferReferenceStrategyPlugin           | Sets the default selected product offer in PDP for a concrete product. It selects the first product offer in the list. | ProductViewOfferExpanderPlugin | Spryker\Client\MerchantProductOfferStorage\Plugin\MerchantProductOfferStorage |
| ProductOfferReferenceStrategyPlugin                  | Sets selected oroduct offer in `ProductConcreteTransfer` if one is already selected on PDP. | ProductViewOfferExpanderPlugin | Spryker\Client\MerchantProductOfferStorage\Plugin\MerchantProductOfferStorage |
| ProductViewOfferExpanderPlugin | Adds product offer data to `ProductViewTransfer` when a retrieving product. |                            | Spryker\Client\MerchantProductOfferStorage\Plugin\ProductStorage |
| ProductOfferValidityProductOfferPostCreatePlugin     | Creates product offer validity dates after the product offer is created. |                            | Spryker\Zed\ProductOfferValidity\Communication\Plugin\ProductOffer |
| ProductOfferValidityProductOfferPostUpdatePlugin     | Updates product offer validity dates after the product offer is updated. |                            | Spryker\Zed\ProductOfferValidity\Communication\Plugin\ProductOffer |
| ProductOfferValidityProductOfferExpanderPlugin       | Expands product offer data with validity dates when the product offer is fetched. |                            | Spryker\Zed\ProductOfferValidity\Communication\Plugin\ProductOffer |
| ProductOfferValidityConsole                          | Updates product offers to have the `isActive` flag to be `false` where their validity date is not current anymore. |                            | Spryker\Zed\ProductOfferValidity\Communication\Console       |

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

<details>
<summary markdown='span'>src/Pyz/Client/Search/SearchDependencyProvider.php</summary>

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

</details>

<details>
<summary markdown='span'>src/Pyz/Zed/ProductOfferGui/ProductOfferGuiDependencyProvider.php</summary>

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
</details>

<details>
<summary markdown='span'>src/Pyz/Zed/ProductPageSearch/ProductPageSearchDependencyProvider.php</summary>

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

</details>

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

<details>
<summary markdown='span'>src/Pyz/Zed/ProductOffer/ProductOfferDependencyProvider.php</summary>

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

</details>

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

{% info_block warningBox "Verification" %}

Make sure that a default product offer is given when retrieving product concrete data.

Make sure that validity data is saved when saving a product offer.

Make sure Merchant and Product Offer Validity sections exist on the product offer edit page in `ProductOfferGui`.

Make sure the Merchant column is in the Product Offers list in `ProductOfferGui`.

Make sure the console command invalidates expired product offers and reactivates product offers that are within their validity dates.

Make sure that when a merchant gets updated or published, or when a product offer gets published, created, or updated, the corresponding product abstracts get updated in the catalog search pages.
It means the following:
1. If a merchant gets deactivated, `ProductAbstract`s that were on the catalog search only because they had a product offer from that merchant get removed.
2. If a product offer gets created, and the `ProductAbstract` related to it was not available on catalog search, it would be available now.

{% endinfo_block %}

## Install feature front end

Follow the steps below to install the Marketplace Product Offer feature front end.

### Prerequisites

To start feature integration, integrate the following features:

| NAME | VERSION | INTEGRATION GUIDE |
| ---------- | ----- | --------------|
| Spryker Core | 202001.0 | [Spryker Core feature integration](https://documentation.spryker.com/docs/spryker-core-feature-integration)  |

### 1) Install the required modules using Composer

If installed before, not needed.

{% info_block warningBox "Verification" %}

Verify that the following modules were installed:

| MODULE | EXPECTED DIRECTORY |
| ---------- | -------------- |
| MerchantProductOfferWidget | spryker-shop/merchant-product-offer-widget |

{% endinfo_block %}

### 2) Add Yves Translations

Append glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
merchant_product_offer.view_seller,View Seller,en_US``merchant_product_offer.view_seller,Händler ansehen,de_DE``merchant_product_offer.sold_by,Sold by,en_US``merchant_product_offer.sold_by,Verkauft durch,de_DE
```

Import data:

```bash
console data:``import` `glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data is added to the `spy_glossary` table in the database.

{% endinfo_block %}

### 3) Set up widgets

Register the following plugins to enable widgets:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
| -------------- | --------------- | ------ | ---------------- |
| MerchantProductOfferWidget       | Shows the list of the offers with their prices for a concrete product. |           | SprykerShop\Yves\MerchantProductOfferWidget\Widget |
| ProductOfferSoldByMerchantWidget | Shows merchant data for an offer given a cart item.          |           | SprykerShop\Yves\MerchantProductOfferWidget\Widget |

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

Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Make sure that the following widgets were registered:

| MODULE | TEST |
| ----------------- | ----------------- |
| MerchantProductOfferWidget       | Go to a product concrete detail page that has offers, and you will see the default offer is selected, and the widget is displayed. |
| ProductOfferSoldByMerchantWidget | Go through the checkout process with an offer, and you will see the sold by text and merchant data throughout the checkout process. |

{% endinfo_block %}

## Related features

| FEATURE | REQUIRED FOR THE CURRENT FEATURE | INTEGRATION GUIDE |
| -------------- | -------------------------------- | ----------------- |
| Marketplace Product Offer API | | [Marketplace Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/glue/marketplace-product-offer-feature-integration.html) |
| Marketplace Product Offer + Cart | | [Marketplace Product Offer + Cart feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/product-offer-cart-feature-integration.html) |
