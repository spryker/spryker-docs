---
title: Marketplace Product feature integration
last_updated: Sep 10, 2021
description: This document describes the process how to integrate the Marketplace Product feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Product feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Product feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE        |
| --------------- | -------- | ------------------ |
| Spryker Core         | {{page.version}} | [Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/spryker-core-feature-integration.html) |
| Marketplace Merchant | {{page.version}} | [Marketplace Merchant feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-merchant-feature-integration.html) |
| Product   | {{page.version}} | [Product feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/product-feature-integration.html) |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker-feature/marketplace-product:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE              | EXPECTED DIRECTORY                   |
| ------------------- | ------------------------------------ |
| MerchantProduct           | vendor/spryker/merchant-product             |
| MerchantProductDataImport | vendor/spryker/merchant-product-data-import |
| MerchantProductGui        | vendor/spryker/merchant-product-gui         |
| MerchantProductSearch     | vendor/spryker/merchant-product-search      |
| MerchantProductStorage    | vendor/spryker/merchant-product-storage     |
| MerchantProductWidget     | vendor/spryker-shop/merchant-product-widget |

{% endinfo_block %}

### 2) Set up the database schema and transfer objects

Adjust the schema definition so that entity changes will trigger the events:

**src/Pyz/Zed/MerchantProduct/Persistence/Propel/Schema/spy_merchant_product_abstract.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          name="zed"
          xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\MerchantProduct\Persistence"
          package="src.Orm.Zed.MerchantProduct.Persistence">

    <table name="spy_merchant_product_abstract" phpName="SpyMerchantProductAbstract">
        <behavior name="event">
            <parameter name="spy_merchant_product_abstract_all" column="*"/>
        </behavior>
    </table>
</database>
```

Apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Verify that the following changes have been applied by checking your database:

| DATABASE ENTITY               | TYPE  | EVENT   |
| ----------------------------- | ----- | ------- |
| spy_merchant_product_abstract | table | created |

{% endinfo_block %}

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| TRANSFER  | TYPE | EVENT | PATH  |
| ----------------- | ----- | ------ | -------------------------- |
| MerchantProductCriteria   | class | Created | src/Generated/Shared/Transfer/MerchantProductCriteriaTransfer |
| MerchantProduct           | class | Created | src/Generated/Shared/Transfer/MerchantProductTransfer        |
| MerchantProductCollection | class | Created | src/Generated/Shared/Transfer/MerchantProductCollectionTransfer |
| ProductAbstractMerchant   | class | Created | src/Generated/Shared/Transfer/ProductAbstractMerchantTransfer |
| MerchantSearchCollection  | class | Created | src/Generated/Shared/Transfer/MerchantSearchCollectionTransfer |
| MerchantProductStorage    | class | Created | src/Generated/Shared/Transfer/MerchantProductStorageTransfer |
| ProductAbstract.idMerchant | property | Created | src/Generated/Shared/Transfer/ProductAbstractTransfer |
| MerchantProductView       | class | Created | src/Generated/Shared/Transfer/MerchantProductViewTransfer |

{% endinfo_block %}

### 3) Add translations

Generate new translation cache for Zed:

```bash
console translator:generate-cache
```

### 4) Configure export to Redis and Elasticsearch

Install the following plugins:

| PLUGIN | DESCRIPTION  | PREREQUISITES | NAMESPACE |
| --------------------- | ------------------- | --------- | -------------------- |
| Merchant\MerchantProductSearchWritePublisherPlugin           | Publishes the product by merchant ids to ES. |           | Spryker\Zed\MerchantProductSearch\Communication\Plugin\Publisher |
| MerchantProduct\MerchantProductSearchWritePublisherPlugin    | Publishes the product by merchant product abstract ids to ES. |           | Spryker\Zed\MerchantProductSearch\Communication\Plugin\Publisher |
| MerchantUpdatePublisherPlugin                                | Publishes the product by merchant ids to Redis. |           | Spryker\Zed\MerchantProductStorage\Communication\Plugin\Publisher\Merchant |
| MerchantProductWritePublisherPlugin                          | Publishes the product by merchant product abstract ids to Redis. |           | Spryker\Zed\MerchantProductStorage\Communication\Plugin\Publisher\MerchantProduct |

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\MerchantProductSearch\Communication\Plugin\Publisher\Merchant\MerchantProductSearchWritePublisherPlugin as MerchantMerchantProductSearchWritePublisherPlugin;
use Spryker\Zed\MerchantProductSearch\Communication\Plugin\Publisher\MerchantProduct\MerchantProductSearchWritePublisherPlugin;
use Spryker\Zed\MerchantProductStorage\Communication\Plugin\Publisher\Merchant\MerchantUpdatePublisherPlugin;
use Spryker\Zed\MerchantProductStorage\Communication\Plugin\Publisher\MerchantProduct\MerchantProductWritePublisherPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array
     */
    protected function getPublisherPlugins(): array
    {
        return [
            new MerchantProductWritePublisherPlugin(),
            new MerchantUpdatePublisherPlugin(),
            new MerchantMerchantProductSearchWritePublisherPlugin(),
            new MerchantProductSearchWritePublisherPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the merchant product data appears in the search engine and in the storage.

{% endinfo_block %}

### 5) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION  | PREREQUISITES | NAMESPACE |
| --------------------- | ------------------- | --------- | -------------------- |
| MerchantProductProductAbstractViewActionViewDataExpanderPlugin | Expands view data for abstract product with merchant data.   |           | Spryker\Zed\MerchantProductGui\Communication\Plugin\ProductManagement |
| MerchantProductProductAbstractListActionViewDataExpanderPlugin | Expands product list data for abstract product data for merchant filter.   |           | Spryker\Zed\MerchantProductGui\Communication\Plugin\ProductManagement |
| MerchantProductProductTableQueryCriteriaExpanderPlugin       | Expands QueryCriteriaTransfer with QueryJoinTransfer for filtering by idMerchant. |           | Spryker\Zed\MerchantProductGui\Communication\Plugin\ProductManagement |
| MerchantProductAbstractMapExpanderPlugin                     | Adds merchant names to product abstract search data.         |           | Spryker\Zed\MerchantProductSearch\Communication\Plugin\ProductPageSearch |
| MerchantProductPageDataExpanderPlugin                        | Expands the provided ProductAbstractPageSearch transfer object's data by merchant names. |           | Spryker\Zed\MerchantProductSearch\Communication\Plugin\ProductPageSearch |
| MerchantProductPageDataLoaderPlugin                          | Expands ProductPageLoadTransfer object with merchant data.   |           | Spryker\Zed\MerchantProductSearch\Communication\Plugin\ProductPageSearch |
| MerchantProductAbstractStorageExpanderPlugin                 | Expands product abstract storage data with merchant references. |           | Spryker\Zed\MerchantProductStorage\Communication\Plugin\ProductStorage |
| MerchantProductProductAbstractPostCreatePlugin | Creates a new merchant product abstract entity if `ProductAbstractTransfer.idMerchant` is set. | None | Spryker\Zed\MerchantProduct\Communication\Plugin\Product |

**src/Pyz/Zed/Product/ProductDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Product;

use Spryker\Zed\MerchantProduct\Communication\Plugin\Product\MerchantProductProductAbstractPostCreatePlugin;

class ProductDependencyProvider extends SprykerProductDependencyProvider
{
    /**
     * @return \Spryker\Zed\ProductExtension\Dependency\Plugin\ProductAbstractPostCreatePluginInterface[]
     */
    protected function getProductAbstractPostCreatePlugins(): array
    {
        return [
            new MerchantProductProductAbstractPostCreatePlugin(),
        ];
    }
}
```
{% info_block warningBox "Verification" %}

Make sure that you can create a new product in the Merchant Portal and observe it after creation in the product data table.

{% endinfo_block %}

**src/Pyz/Zed/ProductManagement/ProductManagementDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductManagement;

use Spryker\Zed\MerchantGui\Communication\Plugin\ProductManagement\MerchantProductAbstractListActionViewDataExpanderPlugin;
use Spryker\Zed\MerchantProductGui\Communication\Plugin\ProductManagement\MerchantProductProductAbstractViewActionViewDataExpanderPlugin;
use Spryker\Zed\MerchantProductGui\Communication\Plugin\ProductManagement\MerchantProductProductTableQueryCriteriaExpanderPlugin;

class ProductManagementDependencyProvider extends SprykerProductManagementDependencyProvider
{
    /**
     * @return \Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductAbstractViewActionViewDataExpanderPluginInterface[]
     */
    protected function getProductAbstractViewActionViewDataExpanderPlugins(): array
    {
        return [
            new MerchantProductProductAbstractViewActionViewDataExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductTableQueryCriteriaExpanderPluginInterface[]
     */
    protected function getProductTableQueryCriteriaExpanderPluginInterfaces(): array
    {
        return [
            new MerchantProductProductTableQueryCriteriaExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductAbstractListActionViewDataExpanderPluginInterface[]
     */
    protected function getProductAbstractListActionViewDataExpanderPlugins(): array
    {
        return [
            new MerchantProductAbstractListActionViewDataExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that you can filter products by merchant in `http://zed.de.demo-spryker.com/product-management`.
Make sure that you can see the merchant name in `http://zed.de.demo-spryker.com/product-management/view?id-product-abstract={id-product-abstract}}`. (Applicable only for products that are assigned to some merchant. See import step.)

{% endinfo_block %}

**src/Pyz/Zed/ProductPageSearch/ProductPageSearchDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductPageSearch;

use Spryker\Shared\MerchantProductSearch\MerchantProductSearchConfig;
use Spryker\Zed\MerchantProductSearch\Communication\Plugin\ProductPageSearch\MerchantProductAbstractMapExpanderPlugin;
use Spryker\Zed\MerchantProductSearch\Communication\Plugin\ProductPageSearch\MerchantProductPageDataExpanderPlugin as MerchantMerchantProductPageDataExpanderPlugin;
use Spryker\Zed\MerchantProductSearch\Communication\Plugin\ProductPageSearch\MerchantProductPageDataLoaderPlugin as MerchantMerchantProductPageDataLoaderPlugin;
use Spryker\Zed\ProductPageSearch\ProductPageSearchDependencyProvider as SprykerProductPageSearchDependencyProvider;

class ProductPageSearchDependencyProvider extends SprykerProductPageSearchDependencyProvider
{
    /**
     * @return \Spryker\Zed\ProductPageSearch\Dependency\Plugin\ProductPageDataExpanderInterface[]
     */
    protected function getDataExpanderPlugins()
    {
        $dataExpanderPlugins = [];
        $dataExpanderPlugins[MerchantProductSearchConfig::PLUGIN_MERCHANT_PRODUCT_DATA] = new MerchantMerchantProductPageDataExpanderPlugin();

        return $dataExpanderPlugins;
    }

    /**
     * @return \Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductAbstractMapExpanderPluginInterface[]
     */
    protected function getProductAbstractMapExpanderPlugins(): array
    {
        return [
            new MerchantProductAbstractMapExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductPageDataLoaderPluginInterface[]
     */
    protected function getDataLoaderPlugins()
    {
        return [
            new MerchantMerchantProductPageDataLoaderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure the `de_page` Elasticsearch index for any product that belongs (see `spy_merchant_product_abstract`) to active and approved merchant, contains merchant names. (indexes can be accessed by any Elasticsearch client, for example, Kibana. For Docker configuration details, see [Configuring services](/docs/scos/dev/back-end-development/messages-and-errors/registering-a-new-service.html).

{% endinfo_block %}

**src/Pyz/Client/ProductStorage/ProductStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductStorage;

use Spryker\Zed\MerchantProductStorage\Communication\Plugin\ProductStorage\MerchantProductAbstractStorageExpanderPlugin;
use Spryker\Zed\ProductStorage\ProductStorageDependencyProvider as SprykerProductStorageDependencyProvider;

class ProductStorageDependencyProvider extends SprykerProductStorageDependencyProvider
{
    /**
     * @return \Spryker\Zed\ProductStorageExtension\Dependency\Plugin\ProductAbstractStorageExpanderPluginInterface[]
     */
    protected function getProductAbstractStorageExpanderPlugins(): array
    {
        return [
            new MerchantProductAbstractStorageExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that data contains `merchant_references` for marketplace products in the `spy_product_abstract_storage`.

{% endinfo_block %}

### 6) Import merchant product data

Prepare your data according to your requirements using the demo data:

<details>
<summary markdown='span'>data/import/common/common/marketplace/merchant_product.csv</summary>

```yaml
sku,merchant_reference,is_shared
001,MER000001,1
002,MER000001,1
003,MER000001,1
004,MER000001,1
005,MER000001,1
006,MER000001,1
007,MER000001,1
008,MER000001,1
009,MER000001,1
010,MER000001,1
011,MER000001,1
012,MER000001,1
013,MER000001,1
014,MER000001,1
015,MER000001,1
016,MER000001,1
017,MER000001,1
018,MER000001,1
019,MER000001,1
020,MER000001,1
021,MER000001,1
022,MER000001,1
023,MER000001,1
024,MER000001,1
025,MER000001,1
026,MER000001,1
027,MER000001,1
028,MER000001,1
029,MER000001,1
030,MER000001,1
031,MER000001,1
032,MER000001,1
033,MER000001,1
034,MER000001,1
035,MER000001,1
036,MER000001,1
037,MER000001,1
038,MER000001,1
039,MER000001,1
040,MER000001,1
041,MER000001,1
042,MER000001,1
043,MER000001,1
044,MER000001,1
045,MER000001,1
046,MER000001,1
047,MER000001,1
048,MER000001,1
049,MER000001,1
050,MER000001,1
051,MER000001,1
052,MER000001,1
053,MER000001,1
054,MER000001,1
055,MER000001,1
056,MER000001,1
057,MER000001,1
058,MER000001,1
059,MER000001,1
060,MER000001,1
061,MER000001,1
062,MER000001,1
063,MER000001,1
064,MER000001,1
065,MER000001,1
066,MER000001,1
067,MER000001,1
068,MER000001,1
069,MER000001,1
070,MER000001,1
071,MER000001,1
072,MER000001,1
074,MER000001,1
075,MER000001,1
076,MER000001,1
077,MER000001,1
078,MER000001,1
079,MER000001,1
080,MER000001,1
081,MER000001,1
082,MER000001,1
083,MER000001,1
084,MER000001,1
085,MER000001,1
086,MER000001,1
087,MER000001,1
088,MER000001,1
089,MER000001,1
090,MER000001,1
091,MER000001,1
092,MER000001,1
093,MER000001,1
094,MER000001,1
095,MER000001,1
096,MER000001,1
097,MER000001,1
098,MER000001,1
099,MER000001,1
100,MER000001,1
101,MER000001,1
102,MER000001,1
103,MER000001,1
104,MER000001,1
105,MER000001,1
106,MER000001,1
107,MER000001,1
108,MER000001,1
109,MER000001,1
110,MER000001,1
111,MER000001,1
184,MER000002,1
185,MER000002,1
186,MER000002,1
187,MER000002,1
188,MER000002,1
189,MER000002,1
190,MER000002,1
191,MER000002,1
192,MER000002,1
193,MER000002,1
194,MER000002,1
195,MER000002,1
196,MER000002,1
197,MER000002,1
198,MER000002,1
199,MER000002,1
200,MER000002,1
201,MER000002,1
202,MER000002,1
203,MER000002,1
204,MER000002,1
205,MER000002,1
206,MER000002,1
207,MER000002,1
208,MER000002,1
209,MER000002,1
```
</details>

| COLUMN  | REQUIRED? | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION  |
| ------------ | ------------ | -------- | --------------- | ------------------------ |
| sku                | &check;      | string    | 091                  | Product identifier.                                          |
| merchant_reference | &check;      | string    | roan-gmbh-und-co-k-g | Merchant identifier.                                         |
| is_shared          | &check;      | string    | 1                    | Defines if other merchant can create product offers for this merchant product. |

Register the following plugins to enable data import:

| PLUGIN  | SPECIFICATION  | PREREQUISITES | NAMESPACE  |
| ------------------ | ----------------- | --------- | -------------------------- |
| MerchantProductDataImportPlugin | Imports merchant product data into the database. |           | Spryker\Zed\MerchantProductDataImport\Communication\Plugin |

 **src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\MerchantProductDataImport\Communication\Plugin\MerchantProductDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    protected function getDataImporterPlugins(): array
    {
        return [
            new MerchantProductDataImportPlugin(),
        ];
    }
}
```

Import data:

```bash
console data:import merchant-product
```

{% info_block warningBox "Verification" %}

Make sure that the imported data is added to the `spy_merchant_product` table.

{% endinfo_block %}

## Install feature front end

Follow the steps below to install the Marketplace Product feature front end.

### 1) Set up widgets

Register the following plugins to enable widgets:

| PLUGIN  | DESCRIPTION | Prerequisites | NAMESPACE |
| ----------- | ----------- | ---------- | --------- |
| MerchantProductWidget | Displays alternative product. |  | SprykerShop\Yves\MerchantProductWidget\Widget |
| ProductSoldByMerchantWidget | Displays merchant product. |  | SprykerShop\Yves\MerchantProductWidget\Widget |

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\MerchantProductWidget\Widget\MerchantProductWidget;
use SprykerShop\Yves\MerchantProductWidget\Widget\ProductSoldByMerchantWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return string[]
     */
    protected function getGlobalWidgets(): array
    {
        return [
            MerchantProductWidget::class,
            ProductSoldByMerchantWidget::class,
        ];
    }
}
```

Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Make sure that  for the marketplace products you can see the merchant name on the product details page.

Make sure that when you add merchant product to cart, on a cart page is has the *Sold By* widget displayed.

{% endinfo_block %}

### 2) Add Yves translations

Append glossary according to your configuration:

**src/data/import/common/common/glossary.csv**

```
merchant_product.message.invalid,Product "%sku%" with Merchant "%merchant_reference%" not found.,en_US
merchant_product.message.invalid,Der Produkt "%sku%" mit dem Händler "%merchant_reference%" ist nicht gefunden.,de_DE
merchant_product.sold_by,Sold by,en_US
merchant_product.sold_by,Verkauft durch,de_DE
```

Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data is added to the `spy_glossary` table in the database.

{% endinfo_block %}

### 3) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN  | DESCRIPTION    | PREREQUISITES | NAMESPACE  |
| ----------------- | ---------------------- | ------------ | -------------------- |
| MerchantProductMerchantNameSearchConfigExpanderPlugin | Expands facet configuration with merchant name filter.       |           | Spryker\Client\MerchantProductSearch\Plugin\Search          |
| ProductViewMerchantProductExpanderPlugin              | Expands ProductView transfer object with merchant reference. |           | Spryker\Client\MerchantProductStorage\Plugin\ProductStorage |

**src/Pyz/Client/Search/SearchDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Search;

use Spryker\Client\Kernel\Container;
use Spryker\Client\MerchantProductSearch\Plugin\Search\MerchantProductMerchantNameSearchConfigExpanderPlugin;
use Spryker\Client\Search\SearchDependencyProvider as SprykerSearchDependencyProvider;

class SearchDependencyProvider extends SprykerSearchDependencyProvider
{
    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\SearchConfigExpanderPluginInterface[]
     */
    protected function createSearchConfigExpanderPlugins(Container $container): array
    {
        $searchConfigExpanderPlugins = parent::createSearchConfigExpanderPlugins($container);

        $searchConfigExpanderPlugins[] = new MerchantProductMerchantNameSearchConfigExpanderPlugin();

        return $searchConfigExpanderPlugins;
    }
}
```

**src/Pyz/Client/SearchElasticsearch/SearchElasticsearchDependencyProvider.php**

```php
<?php

namespace Pyz\Client\SearchElasticsearch;

use Spryker\Client\Kernel\Container;
use Spryker\Client\MerchantProductSearch\Plugin\Search\MerchantProductMerchantNameSearchConfigExpanderPlugin;
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
            new MerchantProductMerchantNameSearchConfigExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that when you enter the merchant name in the search field, the return list contains marketplace products.

{% endinfo_block %}

**src/Pyz/Client/ProductStorage/ProductStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\ProductStorage;


use Spryker\Client\MerchantProductStorage\Plugin\ProductStorage\ProductViewMerchantProductExpanderPlugin;
use Spryker\Client\ProductStorage\ProductStorageDependencyProvider as SprykerProductStorageDependencyProvider;

class ProductStorageDependencyProvider extends SprykerProductStorageDependencyProvider
{
    /**
     * @return \Spryker\Client\ProductStorage\Dependency\Plugin\ProductViewExpanderPluginInterface[]
     */
    protected function getProductViewExpanderPlugins()
    {
        return [
            new ProductViewMerchantProductExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the merchant product is selected on the product details page by default.

{% endinfo_block %}

## Related features

| FEATURE | REQUIRED FOR THE CURRENT FEATURE | INTEGRATION GUIDE |
| - | - | - |
| Marketplace Product API | | [Glue API: Marketplace Product feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-feature-integration.html) |
| Marketplace Product + Marketplace Product Offer | | [Marketplace Product + Marketplace Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-marketplace-product-offer-feature-integration.html) |
| Marketplace Product + Inventory Management | | [Marketplace Product + Inventory Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-inventory-management-feature-integration.html) |
| Marketplace Product + Cart | | [Marketplace Product + Cart feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-cart-feature-integration.html) |
