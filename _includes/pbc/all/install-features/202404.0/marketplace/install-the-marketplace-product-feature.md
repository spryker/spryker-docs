

This document describes how to install the [Marketplace Product feature](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/marketplace-product-feature-overview.html).

## Install feature core

Follow the steps below to install the Marketplace Product feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE        |
| --------------- | -------- | ------------------ |
| Spryker Core         | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Marketplace Merchant | {{page.version}} | [Install the Marketplace Merchant feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-feature.html) |
| Product   | {{page.version}} | [Install the Product feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-feature.html) |

### 1) Install the required modules

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

1. Adjust the schema definition so that entity changes trigger the events:

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

2. Apply database changes and generate entity and transfer changes:

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

Make sure the following changes have been applied in transfer objects:

| TRANSFER  | TYPE     | EVENT | PATH                                                            |
| ----------------- |----------| ------ |-----------------------------------------------------------------|
| MerchantProductCriteria   | class    | Created | src/Generated/Shared/Transfer/MerchantProductCriteriaTransfer   |
| MerchantProduct           | class    | Created | src/Generated/Shared/Transfer/MerchantProductTransfer           |
| MerchantProductAbstract | class    | Created | src/Generated/Shared/Transfer/MerchantProductAbstractTransfer   |
| MerchantProductAbstractCollection | class    | Created | src/Generated/Shared/Transfer/MerchantProductAbstractCollectionTransfer |
| MerchantProductAbstractCriteria | class    | Created | src/Generated/Shared/Transfer/MerchantProductAbstractCriteriaTransfer |
| MerchantProductCollection | class    | Created | src/Generated/Shared/Transfer/MerchantProductCollectionTransfer |
| ProductAbstractMerchant   | class    | Created | src/Generated/Shared/Transfer/ProductAbstractMerchantTransfer   |
| MerchantSearchCollection  | class    | Created | src/Generated/Shared/Transfer/MerchantSearchCollectionTransfer  |
| MerchantProductStorage    | class    | Created | src/Generated/Shared/Transfer/MerchantProductStorageTransfer    |
| ProductAbstract.idMerchant | property | Created | src/Generated/Shared/Transfer/ProductAbstractTransfer           |
| MerchantProductView       | class    | Created | src/Generated/Shared/Transfer/MerchantProductViewTransfer       |
| PageMap.merchantReferences | property | Created | src/Generated/Shared/Transfer/PageMapTransfer                   |
| Pagination | class    | Created | src/Generated/Shared/Transfer/PaginationTransfer                   |

{% endinfo_block %}

### 3) Add translations

Generate a new translation cache for Zed:

```bash
console translator:generate-cache
```

### 4) Configure export to Redis and Elasticsearch

Install the following plugins:

| PLUGIN | DESCRIPTION  | PREREQUISITES | NAMESPACE |
| --------------------- | ------------------- | --------- | -------------------- |
| Merchant\MerchantProductSearchWritePublisherPlugin           | Publishes the product by merchant IDs to ES. |           | Spryker\Zed\MerchantProductSearch\Communication\Plugin\Publisher |
| MerchantProduct\MerchantProductSearchWritePublisherPlugin    | Publishes the product by merchant product abstract IDs to ES. |           | Spryker\Zed\MerchantProductSearch\Communication\Plugin\Publisher |
| MerchantProductSearchPublisherTriggerPlugin               | Allows publishing or republishing  merchant product search data manually. |           | Spryker\Zed\MerchantProductSearch\Communication\Plugin\Publisher |
| MerchantUpdatePublisherPlugin                                | Publishes the product by merchant IDs to Redis. |           | Spryker\Zed\MerchantProductStorage\Communication\Plugin\Publisher\Merchant |
| MerchantProductWritePublisherPlugin                          | Publishes the product by merchant product abstract IDs to Redis. |           | Spryker\Zed\MerchantProductStorage\Communication\Plugin\Publisher\MerchantProduct |
| MerchantProductPublisherTriggerPlugin                          | Allows publishing or republishing merchant product storage data manually. |           | Spryker\Zed\MerchantProductStorage\Communication\Plugin\Publisher |

<details><summary markdown='span'>src/Pyz/Zed/Publisher/PublisherDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\MerchantProductSearch\Communication\Plugin\Publisher\Merchant\MerchantProductSearchWritePublisherPlugin as MerchantMerchantProductSearchWritePublisherPlugin;
use Spryker\Zed\MerchantProductSearch\Communication\Plugin\Publisher\MerchantProduct\MerchantProductSearchWritePublisherPlugin;
use Spryker\Zed\MerchantProductSearch\Communication\Plugin\Publisher\MerchantProductSearchPublisherTriggerPlugin;
use Spryker\Zed\MerchantProductStorage\Communication\Plugin\Publisher\Merchant\MerchantUpdatePublisherPlugin;
use Spryker\Zed\MerchantProductStorage\Communication\Plugin\Publisher\MerchantProduct\MerchantProductWritePublisherPlugin;
use Spryker\Zed\MerchantProductStorage\Communication\Plugin\Publisher\MerchantProductPublisherTriggerPlugin;
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

    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface>
     */
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            new MerchantProductSearchPublisherTriggerPlugin(),
            new MerchantProductPublisherTriggerPlugin(),
        ];
    }
}
```
</details>

{% info_block warningBox "Verification" %}

Make sure that merchant product data appears in the search engine and storage.

{% endinfo_block %}

### 5) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN   | DESCRIPTION  | PREREQUISITES | NAMESPACE   |
|-------------|---------------------|---------------|---------------|
| MerchantProductProductAbstractViewActionViewDataExpanderPlugin | Expands view data for abstract product with merchant data.                                     |               | Spryker\Zed\MerchantProductGui\Communication\Plugin\ProductManagement    |
| MerchantProductProductAbstractListActionViewDataExpanderPlugin | Expands product list data for abstract product data for merchant filter.                       |               | Spryker\Zed\MerchantProductGui\Communication\Plugin\ProductManagement    |
| MerchantProductProductTableQueryCriteriaExpanderPlugin         | Expands QueryCriteriaTransfer with QueryJoinTransfer for filtering by idMerchant.              |               | Spryker\Zed\MerchantProductGui\Communication\Plugin\ProductManagement    |
| MerchantProductAbstractMapExpanderPlugin                       | Adds merchant names to product abstract search data.                                           |               | Spryker\Zed\MerchantProductSearch\Communication\Plugin\ProductPageSearch |
| MerchantProductPageDataExpanderPlugin                          | Expands the provided ProductAbstractPageSearch transfer object's data by merchant names.       |               | Spryker\Zed\MerchantProductSearch\Communication\Plugin\ProductPageSearch |
| MerchantProductPageDataLoaderPlugin                            | Expands ProductPageLoadTransfer object with merchant data.                                     |               | Spryker\Zed\MerchantProductSearch\Communication\Plugin\ProductPageSearch |
| MerchantProductAbstractStorageExpanderPlugin                   | Expands product abstract storage data with merchant references.                                |               | Spryker\Zed\MerchantProductStorage\Communication\Plugin\ProductStorage   |
| MerchantProductProductAbstractPostCreatePlugin                 | Creates a new merchant product abstract entity if `ProductAbstractTransfer.idMerchant` is set. | None          | Spryker\Zed\MerchantProduct\Communication\Plugin\Product                 |
| ProductApprovalProductAbstractEditViewExpanderPlugin           | Expands view data with abstract product approval status data.                                  | None          | Spryker\Zed\ProductApprovalGui\Communication\Plugin\ProductManagement    |
| MerchantProductProductAbstractEditViewExpanderPlugin           | Expands view data for abstract product with merchant data.                                     | None          | Spryker\Zed\MerchantProductGui\Communication\Plugin\ProductManagement    |
| MerchantProductProductConcretePageMapExpanderPlugin            | Expands `PageMap` transfer object with `merchant_reference`.                                   |               | Spryker\Zed\MerchantProductSearch\Communication\Plugin\ProductPageSearch |

**src/Pyz/Zed/Product/ProductDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Product;

use Spryker\Zed\MerchantProduct\Communication\Plugin\Product\MerchantProductProductAbstractPostCreatePlugin;

class ProductDependencyProvider extends SprykerProductDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductExtension\Dependency\Plugin\ProductAbstractPostCreatePluginInterface>
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

<details><summary markdown='span'>src/Pyz/Zed/ProductManagement/ProductManagementDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\ProductManagement;

use Spryker\Zed\MerchantProductGui\Communication\Plugin\ProductManagement\MerchantProductProductAbstractEditViewExpanderPlugin;
use Spryker\Zed\ProductApprovalGui\Communication\Plugin\ProductManagement\ProductApprovalProductAbstractEditViewExpanderPlugin;
use Spryker\Zed\MerchantGui\Communication\Plugin\ProductManagement\MerchantProductAbstractListActionViewDataExpanderPlugin;
use Spryker\Zed\MerchantProductGui\Communication\Plugin\ProductManagement\MerchantProductProductAbstractViewActionViewDataExpanderPlugin;
use Spryker\Zed\MerchantProductGui\Communication\Plugin\ProductManagement\MerchantProductProductTableQueryCriteriaExpanderPlugin;

class ProductManagementDependencyProvider extends SprykerProductManagementDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductAbstractViewActionViewDataExpanderPluginInterface>
     */
    protected function getProductAbstractViewActionViewDataExpanderPlugins(): array
    {
        return [
            new MerchantProductProductAbstractViewActionViewDataExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductTableQueryCriteriaExpanderPluginInterface>
     */
    protected function getProductTableQueryCriteriaExpanderPluginInterfaces(): array
    {
        return [
            new MerchantProductProductTableQueryCriteriaExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductAbstractListActionViewDataExpanderPluginInterface>
     */
    protected function getProductAbstractListActionViewDataExpanderPlugins(): array
    {
        return [
            new MerchantProductAbstractListActionViewDataExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductAbstractEditViewExpanderPluginInterface>
     */
    protected function getProductAbstractEditViewExpanderPlugins(): array
    {
        return [
            new ProductApprovalProductAbstractEditViewExpanderPlugin(),
            new MerchantProductProductAbstractEditViewExpanderPlugin(),
        ];
    }
}
```
</details>

{% info_block warningBox "Verification" %}

Make sure that you can filter products by merchants at `https://zed.de.demo-spryker.com/product-management`.

Make sure that you can see the merchant name at `https://zed.de.demo-spryker.com/product-management/view?id-product-abstract={id-product-abstract}}`. It is applicable only for products that are assigned to some merchant. For details, the [6) Import merchant product data](#import-merchant-product-data) step.

{% endinfo_block %}

<details><summary markdown='span'>src/Pyz/Zed/ProductPageSearch/ProductPageSearchDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\ProductPageSearch;

use Spryker\Shared\MerchantProductSearch\MerchantProductSearchConfig;
use Spryker\Zed\MerchantProductSearch\Communication\Plugin\ProductPageSearch\MerchantProductAbstractMapExpanderPlugin;
use Spryker\Zed\MerchantProductSearch\Communication\Plugin\ProductPageSearch\MerchantProductPageDataExpanderPlugin as MerchantMerchantProductPageDataExpanderPlugin;
use Spryker\Zed\MerchantProductSearch\Communication\Plugin\ProductPageSearch\MerchantProductPageDataLoaderPlugin as MerchantMerchantProductPageDataLoaderPlugin;
use Spryker\Zed\MerchantProductSearch\Communication\Plugin\ProductPageSearch\MerchantProductProductConcretePageMapExpanderPlugin;
use Spryker\Zed\ProductPageSearch\ProductPageSearchDependencyProvider as SprykerProductPageSearchDependencyProvider;

class ProductPageSearchDependencyProvider extends SprykerProductPageSearchDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductPageSearch\Dependency\Plugin\ProductPageDataExpanderInterface>
     */
    protected function getDataExpanderPlugins()
    {
        $dataExpanderPlugins = [];
        $dataExpanderPlugins[MerchantProductSearchConfig::PLUGIN_MERCHANT_PRODUCT_DATA] = new MerchantMerchantProductPageDataExpanderPlugin();

        return $dataExpanderPlugins;
    }

    /**
     * @return array<\Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductAbstractMapExpanderPluginInterface>
     */
    protected function getProductAbstractMapExpanderPlugins(): array
    {
        return [
            new MerchantProductAbstractMapExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductPageDataLoaderPluginInterface>
     */
    protected function getDataLoaderPlugins()
    {
        return [
            new MerchantMerchantProductPageDataLoaderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductConcretePageMapExpanderPluginInterface>
     */
    protected function getConcreteProductMapExpanderPlugins(): array
    {
        return [
            new MerchantProductProductConcretePageMapExpanderPlugin(),
        ];
    }
}
```
</details>

{% info_block warningBox "Verification" %}

Make sure the `de_page` Elasticsearch index for any product that belongs (see `spy_merchant_product_abstract`) to active and approved merchant and contains merchant names. Indexes can be accessed by any Elasticsearch client—for example, Kibana. For Docker configuration details, see [Configuring services](/docs/dg/dev/backend-development/messages-and-errors/registering-a-new-service.html).

{% endinfo_block %}

**src/Pyz/Zed/ProductStorage/ProductStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductStorage;

use Spryker\Zed\MerchantProductStorage\Communication\Plugin\ProductStorage\MerchantProductAbstractStorageExpanderPlugin;
use Spryker\Zed\ProductStorage\ProductStorageDependencyProvider as SprykerProductStorageDependencyProvider;

class ProductStorageDependencyProvider extends SprykerProductStorageDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductStorageExtension\Dependency\Plugin\ProductAbstractStorageExpanderPluginInterface>
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

Make sure that data contains `merchant_references` for merchant products in `spy_product_abstract_storage`.

{% endinfo_block %}

### 6) Import merchant product data

1. Prepare your data according to your requirements using the demo data:

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

| COLUMN  | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION  |
| ------------ | ------------ | -------- | --------------- | ------------------------ |
| sku                | &check;      | string    | 091                  | Product identifier.                                          |
| merchant_reference | &check;      | string    | roan-gmbh-und-co-k-g | Merchant identifier.                                         |
| is_shared          | &check;      | string    | 1                    | Defines if other merchant can create product offers for this merchant product. |

2. Register the following plugins to enable data import:

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

**data/import/local/full_EU.yml**

```yml
version: 0

actions:
  - data_entity: merchant-product
    source: data/import/common/common/marketplace/merchant_product.csv
```

**data/import/local/full_US.yml**

```yml
version: 0

actions:
  - data_entity: merchant-product
    source: data/import/common/common/marketplace/merchant_product.csv
```

3. Import data:

```bash
console data:import merchant-product
```

{% info_block warningBox "Verification" %}

Make sure that the imported data is added to the `spy_merchant_product` table.

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the Marketplace Product feature frontend.

### 1) Set up widgets

1. Register the following plugins to enable widgets:

| PLUGIN  | DESCRIPTION | Prerequisites | NAMESPACE |
| ----------- | ----------- | ---------- | --------- |
| MerchantProductWidget | Displays alternative product. |  | SprykerShop\Yves\MerchantProductWidget\Widget |

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\MerchantProductWidget\Widget\MerchantProductWidget;
use SprykerShop\Yves\MerchantProductWidget\Widget\ProductSoldByMerchantWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<string>
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

2. Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Make sure that the following is true:
* For the merchant products, you can see the merchant name on the product details page.
* When you add a merchant product to the cart, it has the **Sold By** widget displayed on the cart page.

{% endinfo_block %}

### 2) Add Yves translations

1. Append glossary according to your configuration:

**data/import/common/common/glossary.csv**

```
merchant_product.message.invalid,Product "%sku%" with Merchant "%merchant_reference%" not found.,en_US
merchant_product.message.invalid,Der Produkt "%sku%" mit dem Händler "%merchant_reference%" ist nicht gefunden.,de_DE
merchant_product.sold_by,Sold by,en_US
merchant_product.sold_by,Verkauft durch,de_DE
product.filter.merchant_name,Merchant,en_US
product.filter.merchant_name,Händler,de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data is added to the `spy_glossary_key` and `spy_glossary_translation` tables in the database.

{% endinfo_block %}

### 3) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN  | DESCRIPTION    | PREREQUISITES | NAMESPACE  |
| ----------------- | ---------------------- | ------------ | -------------------- |
| MerchantProductMerchantNameSearchConfigExpanderPlugin | Expands facet configuration with merchant name filter.       |           | Spryker\Client\MerchantProductSearch\Plugin\Search          |
| ProductViewMerchantProductExpanderPlugin              | Expands ProductView transfer object with merchant reference. |           | Spryker\Client\MerchantProductStorage\Plugin\ProductStorage |
| MerchantReferenceQueryExpanderPlugin  | Adds filter by merchant reference to query. |               | Spryker\Client\MerchantProductSearch\Plugin\Search |

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
     * @return array<\Spryker\Client\SearchExtension\Dependency\Plugin\SearchConfigExpanderPluginInterface>
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
     * @return array<\Spryker\Client\SearchExtension\Dependency\Plugin\SearchConfigExpanderPluginInterface>
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

Make sure that when you enter the merchant name in the search field, the return list contains merchant products.

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
     * @return array<\Spryker\Client\ProductStorage\Dependency\Plugin\ProductViewExpanderPluginInterface>
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

**src/Pyz/Client/Catalog/CatalogDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Catalog;

use Spryker\Client\Catalog\CatalogDependencyProvider as SprykerCatalogDependencyProvider;
use Spryker\Client\MerchantProductSearch\Plugin\Search\MerchantReferenceQueryExpanderPlugin;

class CatalogDependencyProvider extends SprykerCatalogDependencyProvider
{
    /**
     * @return array<\Spryker\Client\Search\Dependency\Plugin\QueryExpanderPluginInterface>|array<\Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface>
     */
    protected function getProductConcreteCatalogSearchQueryExpanderPlugins(): array
    {
        return [
            new MerchantReferenceQueryExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure you can filter concrete products by merchant reference while searching by full text.

{% endinfo_block %}

## Install related features

| FEATURE | REQUIRED FOR THE CURRENT FEATURE | INSTALLATION GUIDE |
| - | - | - |
| Marketplace Product API | | [Install the Marketplace Product Glue API](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-glue-api.html) |
| Marketplace Product + Marketplace Product Offer | | [Install the Marketplace Product + Marketplace Product Offer feature](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-marketplace-product-offer-feature.html) |
| Marketplace Product + Inventory Management | | [Install the Marketplace Product + Inventory Management feature](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-inventory-management-feature.html) |
| Marketplace Product + Cart | | [Install the Marketplace Product + Cart feature](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-cart-feature.html) |
| Marketplace Product + Quick Add to Cart | | [Install the Marketplace Product + Quick Add to Cart feature](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-quick-add-to-cart-feature.html) |
