---
title: Marketplace Product feature integration
last_updated: Dec 16, 2020
summary: This document describes the process how to integrate the Marketplace Product feature into a Spryker project.
---

## Install feature core

### Prerequisites

To start feature integration, overview and install the necessary features:

| Name            | Version | Link        |
| --------------- | -------- | ------------------ |
| Spryker Core         | master      | [[PUBLISHED\] Spryker Core Feature Integration - ongoing](https://spryker.atlassian.net/wiki/spaces/DOCS/pages/900924310) |
| Marketplace Merchant | master      | [[WIP\] Marketplace Merchant Feature Integration - ongoing](https://spryker.atlassian.net/wiki/spaces/DOCS/pages/1876853120) |
| Product Management   | master      | [[APPROVED\] Product Feature Integration - ongoing](https://spryker.atlassian.net/wiki/spaces/DOCS/pages/895912554) |

### 1) Install the required modules using composer

Run the following commands to install the required modules:

```bash
composer require spryker-feature/marketplace-product: "dev-master" --update-with-dependencies
```

Make sure that the following modules have been installed:

| Module              | Expected Directory                   |
| :------------------------ | :------------------------------------------ |
| MerchantProduct           | vendor/spryker/merchant-product             |
| MerchantProductDataImport | vendor/spryker/merchant-product-data-import |
| MerchantProductGui        | vendor/spryker/merchant-product-gui         |
| MerchantProductSearch     | vendor/spryker/merchant-product-search      |
| MerchantProductStorage    | vendor/spryker/merchant-product-storage     |

### 2) Set up the database schema

Adjust the schema definition so entity changes will trigger events:

src/Pyz/Zed/MerchantProduct/Persistence/Propel/Schema/spy_merchant_product_abstract.schema.xml

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



Run the following commands to apply database changes and to generate entity and transfer changes.

```bash
console transfer:generate 2console propel:install 3console transfer:generate 
```

Verify the following changes by checking your database

| Database entity               | Type  | Event   |
| ----------------------------- | ----- | ------- |
| spy_merchant_product_abstract | table | created |

## 3) Set up transfer objects

Run the following command to generate transfer changes:

```bash
console transfer:generate
```

Make sure that the following changes have been applied in transfer objects:

| Transfer  | Type | Event | Path  |
| ----------------- | ----- | ------ | -------------------------- |
| MerchantProductCriteria   | object | Created | src/Generated/Shared/Transfer/MerchantProductCriteriaTransfer |
| MerchantProduct           | object | Created | src/Generated/Shared/Transfer/MerchantProductTransfer        |
| MerchantProductCollection | object | Created | src/Generated/Shared/Transfer/MerchantProductCollectionTransfer |
| ProductAbstractMerchant   | object | Created | src/Generated/Shared/Transfer/ProductAbstractMerchantTransfer |
| MerchantSearchCollection  | object | Created | src/Generated/Shared/Transfer/MerchantSearchCollectionTransfer |
| MerchantProductStorage    | object | Created | src/Generated/Shared/Transfer/MerchantProductStorageTransfer |

### 3) Add translations

#### Zed translations

Run the following command to generate a new translation cache for Zed:

```bash
console translator:generate-cache
```

### 4) Set up behavior

Enable the following behaviors by registering the plugins:

| Plugin | Description  | Prerequisites | Namespace |
| --------------------- | ------------------- | --------- | -------------------- |
| MerchantProductProductAbstractViewActionViewDataExpanderPlugin | Expands view data for abstract product with merchant data.   | None          | Spryker\Zed\MerchantProductGui\Communication\Plugin\ProductManagement |
| MerchantProductProductTableQueryCriteriaExpanderPlugin       | Expands QueryCriteriaTransfer with QueryJoinTransfer for filtering by idMerchant. | None          | Spryker\Zed\MerchantProductGui\Communication\Plugin\ProductManagement |
| MerchantProductAbstractMapExpanderPlugin                     | Adds merchant names to product abstract search data.         | None          | Spryker\Zed\MerchantProductSearch\Communication\Plugin\ProductPageSearch |
| MerchantProductPageDataExpanderPlugin                        | Expands the provided ProductAbstractPageSearch transfer object's data by merchant names. | None          | Spryker\Zed\MerchantProductSearch\Communication\Plugin\ProductPageSearch |
| MerchantProductPageDataLoaderPlugin                          | Expands ProductPageLoadTransfer object with merchant data.   | None          | Spryker\Zed\MerchantProductSearch\Communication\Plugin\ProductPageSearch |
| MerchantProductAbstractStorageExpanderPlugin                 | Expands product abstract storage data with merchant references. | None          | Spryker\Zed\MerchantProductStorage\Communication\Plugin\ProductStorage |

src/Pyz/Zed/ProductManagement/ProductManagementDependencyProvider.php

```php
<?php

namespace Pyz\Zed\ProductManagement;

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
}
```

Make sure that when you can filter products by merchant at http://zed.de.demo-spryker.com/availability-gui.

src/Pyz/Zed/ProductPageSearch/ProductPageSearchDependencyProvider.php

```php
<?php

namespace Pyz\Zed\ProductPageSearch;

use Spryker\Zed\MerchantProductSearch\Communication\Plugin\ProductPageSearch\MerchantProductAbstractMapExpanderPlugin;
use Spryker\Zed\ProductPageSearch\ProductPageSearchDependencyProvider as SprykerProductPageSearchDependencyProvider;

class ProductPageSearchDependencyProvider extends SprykerProductPageSearchDependencyProvider
{
    /**
     * @return \Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductAbstractMapExpanderPluginInterface[]
     */
    protected function getProductAbstractMapExpanderPlugins(): array
    {
        return [
            new MerchantProductAbstractMapExpanderPlugin(),
        ];
    }
}
```

src/Pyz/Zed/ProductPageSearch/ProductPageSearchDependencyProvider.php

```php
<?php

namespace Pyz\Zed\ProductPageSearch;


use Spryker\Zed\MerchantProductSearch\Communication\Plugin\ProductPageSearch\MerchantProductPageDataExpanderPlugin as MerchantMerchantProductPageDataExpanderPlugin;

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
}
```

Make sure de_page Easticsearch index for any product that belongs (see spy_merchant_product_abstract) to active and approved merchant, contains merchant names. (indexes can be accessed by any  Elasticsearch client, e.g. Kibana - see for docker https://documentation.spryker.com/docs/services configuration details.)

src/Pyz/Zed/ProductPageSearch/ProductPageSearchDependencyProvider.php

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

Make sure that data in  spy_product_abstract_storage contains merchant_references's for merchant products.

### 5) Import data

#### Import Merchant Product data

Prepare your data according to your requirements using our demo data:

data/import/common/common/marketplace/merchant_product.csv

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



| Column  | Is Obligatory? | Data Type | Data Example | Data Explanation  |
| ------------ | ------------ | -------- | --------------- | ------------------------ |
| sku                | mandatory      | string    | 091                  | Product identifier.                                          |
| merchant_reference | mandatory      | string    | roan-gmbh-und-co-k-g | Merchant identifier.                                         |
| is_shared          | mandatory      | string    | 1                    | Defines if other merchant can create product offers for this merchant product. |

Register the following plugins to enable data import:

| Plugin  | Specification  | Prerequisites | Namespace  |
| ------------------ | ----------------- | --------- | -------------------------- |
| MerchantProductDataImportPlugin | Imports merchant product data into the database. | None          | Spryker\Zed\MerchantProductDataImport\Communication\Plugin |

 src/Pyz/Zed/DataImport/DataImportDependencyProvider.php

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


Run the following console command to import data:

```
console data:import merchant-product
```

Make sure that imported data is added to the spy_merchant_product.

 

## Install feature front end

### 1) Set up widgets

Register the following plugins to enable widgets:

| Plugin                      | Description                                | Prerequisites | Namespace                                     |
| -------------------------- | ----------------------------------------- | ------------ | -------------------------------------------- |
| MerchantProductWidget       | Displays alternative product.              | None          | SprykerShop\Yves\MerchantProductWidget\Widget |
| ProductSoldByMerchantWidget | Displays list of products for replacement. | None          | SprykerShop\Yves\MerchantProductWidget\Widget |

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
            ProductSoldByMerchantWidget::class,
            MerchantProductWidget::class,
        ];
    }
}
```

Run the following command to enable Javascript and CSS changes:

```
console frontend:yves:build
```

Make sure that on the product detail page for merchant products you can see the seller name.

Make sure that when you add merchant product to cart, on a cart page is has Sold By: widget shown.

### 2) Set up behavior

Enable the following behaviors by registering the plugins:

| Plugin  | Description    | Prerequisites | Namespace  |
| ----------------- | ---------------------- | ------------ | -------------------- |
| MerchantProductMerchantNameSearchConfigExpanderPlugin | Expands facet configuration with merchant name filter.       | None          | Spryker\Client\MerchantProductSearch\Plugin\Search          |
| ProductViewMerchantProductExpanderPlugin              | Expands ProductView transfer object with merchant reference. | None          | Spryker\Client\MerchantProductStorage\Plugin\ProductStorage |
| MerchantProductPreAddToCartPlugin                     | Sets merchant reference to item transfer on add to cart.     | None          | SprykerShop\Yves\MerchantProductWidget\Plugin\CartPage      |

src/Pyz/Client/SearchElasticsearch/SearchElasticsearchDependencyProvider.php

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

Make sure that when you enter the merchant name in the search field, the return list contains merchant products.

src/Pyz/Client/ProductStorage/ProductStorageDependencyProvider.php

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

Make sure that merchant product is selected on pdp by default.

src/Pyz/Yves/CartPage/CartPageDependencyProvider.php

```php
<?php

namespace Pyz\Yves\CartPage;

use SprykerShop\Yves\CartPage\CartPageDependencyProvider as SprykerCartPageDependencyProvider;
use SprykerShop\Yves\MerchantProductWidget\Plugin\CartPage\MerchantProductPreAddToCartPlugin;

class CartPageDependencyProvider extends SprykerCartPageDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\CartPageExtension\Dependency\Plugin\PreAddToCartPluginInterface[]
     */
    protected function getPreAddToCartPlugins(): array
    {
        return [
            new MerchantProductPreAddToCartPlugin(),
        ];
    }
}
```

Make sure when you add to cart merchant product, it have merchantReference set. (Can be checked in spy_quote table)

## Related features

| Feature   | Link    |
|-------------------- | --------- |
| Marketplace Product API                          | [[WIP\] GLUE: Marketplace Product Feature Integration - ongoing](https://spryker.atlassian.net/wiki/spaces/DOCS/pages/1950483252/WIP+GLUE+Marketplace+Merchant+Product+Feature+Integration+-+ongoing) |
| Marketplace Product + Inventory Management       | [[WIP\] Marketplace Product + Inventory Management Feature Integration - ongoing](https://spryker.atlassian.net/wiki/spaces/DOCS/pages/1951793295) |
| Marketplace Product  + Marketplace Product Offer | [[WIP\] Marketplace Product +  Marketplace Product Offer Feature Integration - ongoing](https://spryker.atlassian.net/wiki/spaces/DOCS/pages/1951858888) |