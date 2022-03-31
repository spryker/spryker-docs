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

| NAME | VERSION | INTEGRATION GUIDE |
| --------------- | ------- | ---------- |
| Spryker Core         | {{page.version}} | [Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/spryker-core-feature-integration.html) |
| Product Options      | {{page.version}} | [Product Options feature integration](https://spryker.atlassian.net/wiki/spaces/DOCS/pages/903151851/EMPTY+Product+Options+Feature+Integration+-+ongoing) |  
| Marketplace Merchant | {{page.version}} | [Marketplace Merchant feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-merchant-feature-integration.html) |


### 1) Install the required modules using Composer

1) Install the required modules:

```bash
composer require spryker-feature/marketplace-product-options:"{{page.version}}" --update-with-dependencies
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

Adjust the schema definition to guarantee unique identifier for each option group:

**src/Pyz/Zed/DataImport/Persistence/Propel/Schema/spy_product_option.schema.xml**

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

### 3) Add translations

Append glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
checkout.item.option.pre.condition.validation.error.exists,"Product option of %name% is not available anymore.",en_US
checkout.item.option.pre.condition.validation.error.exists,"Produktoption von %name% ist nicht mehr verfügbar.",de_DE
```

Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data is added to the `spy_glossary` table in the database.

{% endinfo_block %}

### 4) Import data

Prepare your data according to your requirements using the demo data:

**data/import/common/common/marketplace/merchant_product_option_group.csv**

```csv
product_option_group_key,merchant_reference,approval_status,merchant_sku
insurance,MER000001,approved,spr-425453
```


#### Register data importer:

**data/import/local/full_EU.yml**

```yml
version: 0

actions:
    - data_entity: merchant-product-option-group
      source: data/import/common/common/marketplace/merchant_product_option_group.csv
```


**data/import/local/full_US.yml**

```yml
version: 0

actions:
    - data_entity: merchant-product-option-group
      source: data/import/common/common/marketplace/merchant_product_option_group.csv
```


Register the following plugin to enable the data import:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantProductOptionGroupDataImportPlugin | Validates Merchant reference and inserts merchant product option groups into the datanbase. | None | Spryker\Zed\MerchantProductOptionDataImport\Communication\Plugin\DataImport |

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

### 5) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantProductOptionListActionViewDataExpanderPlugin | Expands data with the merchant collection. | None | Spryker\Zed\MerchantGui\Communication\Plugin\ProductOptionGui |
| MerchantProductOptionListTableQueryCriteriaExpanderPlugin | Extends `QueryCriteriaTransfer` with the merchant product option group criteria for expanding default query running in `ProductOptionListTable`. | None | Spryker\Zed\MerchantProductOptionGui\Communication\Plugin\ProductOptionGui |
| MerchantProductOptionGroupExpanderPlugin | Expands a product option group data with the related merchant. | None | Spryker\Zed\MerchantProductOption\Communication\Plugin\ProductOption |
| MerchantProductOptionCollectionFilterPlugin | Filters merchant product option group transfers by approval status and excludes the product options with the not approved merchant groups. | None | Spryker\Zed\MerchantProductOptionStorage\Communication\Plugin\ProductOptionStorage |
| MerchantProductOptionGroupWritePublisherPlugin | Retrieves all abstract product IDs using the  merchant product option group IDs from the event transfers. | None | Spryker\Zed\MerchantProductOptionStorage\Communication\Plugin\Publisher\MerchantProductOption |


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

Make sure merchants can create product option groups and values in the Merchant Portal.
Make sure that merchant product option information is shown on product details page, when it is approved and active.
Make sure that merchant product option information is displayed in the cart, checkout and in the user account.
Make sure that merchant product options are a part of the marketplace/merchant order and all totals are calculated correctly.

{% endinfo_block %}

## Related features

| FEATURE | REQUIRED FOR THE CURRENT FEATURE | INTEGRATION GUIDE |
| -------------- | -------------------------------- | ----------------- |
| Marketplace Product Option + Cart | | [Marketplace Product Option + Cart feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-option-cart-feature-integration.html) |
| Marketplace Product Option + Checkout | | [Marketplace Product Option + Checkout feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-option-checkout-feature-integration.html) |
