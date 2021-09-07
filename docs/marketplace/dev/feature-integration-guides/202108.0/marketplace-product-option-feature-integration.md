---
title: Marketplace Product Option feature integration
last_updated: Jul 28, 2021
Description: This document describes the process how to integrate the Marketplace Product Option feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Product Option feature into a Spryker project.


## Install feature core

Follow the steps below to install the Marketplace Product Option feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | LINK |
| --------------- | ------- | ---------- |
| Spryker Core         | master      | [Spryker Core Feature Integration](https://documentation.spryker.com/docs/spryker-core-feature-integration) |
| Marketplace Merchant | master      | [Marketplace Merchant Feature Integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-product-option-feature-integration.html) |


### 1) Install the required modules using Composer

1) Install the required modules:

```bash
composer require spryker-feature/marketplace-product-options:"202108.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| MerchantProductOption | vendor/spryker/merchant-product-option |
| MerchantProductOptionDataImport | vendor/spryker/merchant-product-option-data-import |
| MerchantProductOptionGui | vendor/spryker/merchant-product-option-gui |
| MerchantProductOptionStorage | vendor/spryker/merchant-product-option-storage |
| MerchantProductOptionExtension | vendor/spryker/merchant-product-option-extension |

{% endinfo_block %}


### 2) Set up the database schema and transfer objects

Adjust the schema definition so that entity changes will trigger events:

**src/Pyz/Zed/PriceProductOffer/Persistence/Propel/Schema/spy_price_product_offer.schema.xml**
```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\ProductOption\Persistence" package="src.Orm.Zed.ProductOption.Persistence">

    <table name="spy_product_option_group" identifierQuoting="true">
        <column name="key" type="VARCHAR" size="255" description="Key is an identifier for existing entities. This should never be changed."/>

        <unique name="spy_product_option_group-unique-key">
            <unique-column name="key"/>
        </unique>
    </table>
</database>

```

Apply database changes and to generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```


{% info_block warningBox "Verification" %}

Verify that the following changes have been implemented by checking your database:

| DATABASE ENTITY | TYPE | EVENT |
|-|-|-|
| spy_merchant_product_option_group | table | created |
| spy_product_option_group.key | column | created |

Make sure that the following changes were applied in transfer objects:

| TRANSFER  | TYPE  | EVENT | PATH |
| - | - | - | - |
| MerchantProductOptionGroup | class | created | src/Generated/Shared/Transfer/MerchantProductOptionGroupTransfer |
| MerchantProductOptionGroupCriteria | class | created | src/Generated/Shared/Transfer/MerchantProductOptionGroupCriteriaTransfer |
| MerchantProductOptionGroupCollection | class | created | src/Generated/Shared/Transfer/MerchantProductOptionGroupCollectionTransfer |
| ProductOptionGroup.merchant | attribute | created | src/Generated/Shared/Transfer/ProductOptionGroupTransfer |

{% endinfo_block %}

### 3) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantProductOptionListActionViewDataExpanderPlugin | Expands data with merchant collection. | None | Spryker\Zed\MerchantGui\Communication\Plugin\ProductOptionGui |
| MerchantProductOptionListTableQueryCriteriaExpanderPlugin | Expands `QueryCriteriaTransfer` with merchant product option group criteria for expanding default query running in `ProductOptionListTable`. | None | Spryker\Zed\MerchantProductOptionGui\Communication\Plugin\ProductOptionGui |
| MerchantProductOptionGroupExpanderPlugin | Expands a product option group data with related merchant. | None | Spryker\Zed\MerchantProductOption\Communication\Plugin\ProductOption |
| MerchantProductOptionCollectionFilterPlugin | Filters merchant product option group transfers by approval status and excludes product options with not approved merchant groups. | None | Spryker\Zed\MerchantProductOptionStorage\Communication\Plugin\ProductOptionStorage |
| MerchantProductOptionGroupWritePublisherPlugin | Retrieves all abstract product ids using merchant product option group ids from event transfers. | None | Spryker\Zed\MerchantProductOptionStorage\Communication\Plugin\Publisher\MerchantProductOption |


**src/Pyz/Zed/ProductOption/ProductOptionDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductOption;

use Spryker\Zed\MerchantGui\Communication\Plugin\ProductOptionGui\MerchantProductOptionListActionViewDataExpanderPlugin;
use Spryker\Zed\MerchantProductOption\Communication\Plugin\ProductOption\MerchantProductOptionGroupExpanderPlugin;
use Spryker\Zed\MerchantProductOptionGui\Communication\Plugin\ProductOptionGui\MerchantProductOptionListTableQueryCriteriaExpanderPlugin;
use Spryker\Zed\ProductOption\ProductOptionDependencyProvider as SprykerProductOptionDependencyProvider;

class ProductOptionDependencyProvider extends SprykerProductOptionDependencyProvider
{
    /**
     * @return \Spryker\Zed\ProductOptionGuiExtension\Dependency\Plugin\ProductOptionListActionViewDataExpanderPluginInterface[]
     */
    protected function getProductOptionListActionViewDataExpanderPlugins(): array
    {
        return [
            new MerchantProductOptionListActionViewDataExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\ProductOptionGuiExtension\Dependency\Plugin\ProductOptionListTableQueryCriteriaExpanderPluginInterface[]
     */
    protected function getProductOptionListTableQueryCriteriaExpanderPlugins(): array
    {
        return [
            new MerchantProductOptionListTableQueryCriteriaExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\ProductOptionExtension\Dependency\Plugin\ProductOptionGroupExpanderPluginInterface[]
     */
    protected function getProductOptionGroupExpanderPlugins(): array
    {
        return [
            new MerchantProductOptionGroupExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/ProductOptionStorage/ProductOptionStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductOptionStorage;

use Spryker\Zed\MerchantProductOptionStorage\Communication\Plugin\ProductOptionStorage\MerchantProductOptionCollectionFilterPlugin;
use Spryker\Zed\ProductOptionStorage\ProductOptionStorageDependencyProvider as SprykerProductOptionStorageDependencyProvider;

class ProductOptionStorageDependencyProvider extends SprykerProductOptionStorageDependencyProvider
{
    /**
     * @return \Spryker\Zed\ProductOptionStorageExtension\Dependency\Plugin\ProductOptionCollectionFilterPluginInterface[]
     */
    protected function getProductOptionCollectionFilterPlugins(): array
    {
        return [
            new MerchantProductOptionCollectionFilterPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\MerchantProductOptionStorage\Communication\Plugin\Publisher\MerchantProductOption\MerchantProductOptionGroupWritePublisherPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array
     */
    protected function getPublisherPlugins(): array
    {
        return [
            $this->getMerchantProductOptionStoragePlugins(),
        ];
    }
    
    /**
     * @return \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface[]
     */
    protected function getMerchantProductOptionStoragePlugins(): array
    {
        return [
            new MerchantProductOptionGroupWritePublisherPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure merchants can create product option groups and values in the merchant portal.
Make sure that merchant product option information is shown on product details page, when it is approved and active.
Make sure that merchant product option information is displayed in the cart, checkout and in the user account.
Make sure that merchant product options are part of a marketplace/merchant order and all totals are calculated correctly.

{% endinfo_block %}


### 4) Import data

Prepare your data according to your requirements using the demo data:

<details><summary>data/import/common/common/marketplace/merchant_product_option_group.csv</summary>

```csv
product_option_group_key,merchant_reference,approval_status,merchant_sku
insurance,MER000001,approved,spr-425453
```

</details>


#### Register data importer:

<details><summary>data/import/local/full_EU.yml</summary>

```yml
version: 0

actions:
    - data_entity: merchant-product-option-group
      source: data/import/common/common/marketplace/merchant_product_option_group.csv
```

</details>

<details><summary>data/import/local/full_US.yml</summary>

```yml
version: 0

actions:
    - data_entity: merchant-product-option-group
      source: data/import/common/common/marketplace/merchant_product_option_group.csv
```

</details>

Register the following plugin to enable data import:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantProductOptionGroupDataImportPlugin | Validates Merchant reference and inserts merchant product option groups into DB. | None | Spryker\Zed\MerchantProductOptionDataImport\Communication\Plugin\DataImport |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\MerchantProductOptionDataImport\Communication\Plugin\DataImport\MerchantProductOptionGroupDataImportPlugin;
use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return array
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new MerchantProductOptionGroupDataImportPlugin(),
        ];
    }
}
```

Import data:

```bash
console data:import merchant-product-option-group
```

{% info_block warningBox "Verification" %}

Make sure that the Merchant Product Option Group data is in the `spy_merchant_product_option_group` table.

{% endinfo_block %}
