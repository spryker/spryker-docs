This document describes how to install the [Marketplace Product Options feature](/docs/pbc/all/product-information-management/latest/marketplace/marketplace-product-options-feature-overview.html).

## Install feature core

Follow the steps below to install the Marketplace Product Options feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
| --------------- | ------- | ---------- |
| Spryker Core         | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Product Options      | 202507.0 | [Install the Product Options feature](https://spryker.atlassian.net/wiki/spaces/DOCS/pages/903151851/EMPTY+Product+Options+Feature+Integration+-+ongoing) |  
| Marketplace Merchant | 202507.0 | [Install the Marketplace Merchant feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-feature.html) |


### 1) Install the required modules

```bash
composer require spryker-feature/marketplace-product-options:"202507.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| MerchantProductOption | vendor/spryker/merchant-product-option |
| MerchantProductOptionDataImport | vendor/spryker/merchant-product-option-data-import |
| MerchantProductOptionGui | vendor/spryker/merchant-product-option-gui |
| MerchantProductOptionStorage | vendor/spryker/merchant-product-option-storage |

{% endinfo_block %}


### 2) Set up the database schema and transfer objects

1. Adjust the schema definition to guarantee a unique identifier for each option group:

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
| spy_merchant_product_option_group | table | created |
| spy_product_option_group.key | column | created |

Make sure that the following changes were applied in transfer objects:

| TRANSFER  | TYPE  | EVENT | PATH |
| - | - | - | - |
| MerchantProductOptionGroup | class | created | src/Generated/Shared/Transfer/MerchantProductOptionGroupTransfer |
| MerchantProductOptionGroupCriteria | class | created | src/Generated/Shared/Transfer/MerchantProductOptionGroupCriteriaTransfer |
| MerchantProductOptionGroupCollection | class | created | src/Generated/Shared/Transfer/MerchantProductOptionGroupCollectionTransfer |
| MerchantProductOptionGroupConditions | class | created | src/Generated/Shared/Transfer/MerchantProductOptionGroupConditionsTransfer |
| Pagination | class | created | src/Generated/Shared/Transfer/PaginationTransfer |
| ProductOptionGroup.merchant | attribute | created | src/Generated/Shared/Transfer/ProductOptionGroupTransfer |

{% endinfo_block %}

### 3) Add translations

1. Append glossary according to your configuration:

**data/import/common/common/glossary.csv**

```yaml
checkout.item.option.pre.condition.validation.error.exists,"Product option of %name% is not available anymore.",en_US
checkout.item.option.pre.condition.validation.error.exists,"Produktoption von %name% ist nicht mehr verfügbar.",de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data is added to the `spy_glossary_key` and `spy_glossary_translation` tables in the database.

{% endinfo_block %}

### 4) Import data

1. Prepare your data according to your requirements using the demo data:

**data/import/common/common/marketplace/merchant_product_option_group.csv**

```csv
product_option_group_key,merchant_reference,approval_status,merchant_sku
insurance,MER000001,approved,spr-425453
```

2. Add the `product_option_group_key` column to `product_option.csv`:

**data/import/common/common/product_option.csv**

```csv
abstract_product_skus,option_group_id,tax_set_name,group_name_translation_key,group_name.en_US,group_name.de_DE,option_name_translation_key,option_name.en_US,option_name.de_DE,sku,product_option_group_key
ilyakubanov marked this conversation as resolved.
"012,013,014,015,016,017,018,019,020,021,022,023,024,025,026,027,028,029,030,031,032,033,034,035,036,037,038,039,040,041,042,043,044,045,046,047,048,049,050,051,052,053,054,055,056,057,058,059,060,061,062,063,064,065,066,067,068,069,070,071,072,073,074,075,076,077,078,079,080,081,082,083,084,085,086,087,088,089,090,091,092,093,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,200,201,202,203,204,205",1,Entertainment Electronics,product.option.group.name.warranty,Warranty,Garantie,product.option.warranty_1,One (1) year limited warranty,Ein (1) Jahr begrenzte Garantie,OP_1_year_warranty,warranty
,1,Entertainment Electronics,product.option.group.name.warranty,Warranty,Garantie,product.option.warranty_2,Two (2) year limited warranty,Zwei (2) Jahre begrenzte Garantie,OP_2_year_warranty,warranty
,1,Entertainment Electronics,product.option.group.name.warranty,Warranty,Garantie,product.option.warranty_3,Three (3) year limited warranty,Drei (3) Jahre begrenzte Garantie,OP_3_year_warranty,warranty
"001,002,003,004,005,006,007,008,009,010,011,012,024,025,026,027,028,029,030,031,032,033,034,035,036,037,038,039,040,041,042,043,044,045,046,047,048,049,050,051,052,053,054,055,056,057,058,059,060,061,062,063,064,065,066,067,068,069,070,083,084,085,086,087,088,089,090,091,092,093,094,095,096,097,098,099,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214",2,Entertainment Electronics,product.option.group.name.insurance,Insurance,Versicherungsschutz,product.option.insurance,Two (2) year insurance coverage,Zwei (2) Jahre Versicherungsschutz,OP_insurance,insurance
"001,002,003,004,005,006,007,008,009,010,018,019,020,021,022,023,024,025,026,027,028,029,030,031,032,033,034,035,036,037,038,039,040,041,042,043,044,045,046,047,048,049,050,051,052,053,054,055,056,057,058,059,060,061,062,063,064,065,066,067,068,069,070,071,084,085,086,087,088,089,090,091,092,093,094,095,096,097,098,099,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210",3,Entertainment Electronics,product.option.group.name.gift_wrapping,Gift wrapping,Geschenkverpackung,product.option.gift_wrapping,Gift wrapping,Geschenkverpackung,OP_gift_wrapping,wrapping
```

#### Register data importer

Add merchant product option group import entities to import configuration for all needed application stores:

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


2. To enable the data import, register the following plugin:

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

3. Modify `ProductOptionWriterStep`:

**src/Pyz/Zed/DataImport/Business/Model/ProductOption/ProductOptionWriterStep.php**

```php
<?php

namespace Pyz\Zed\DataImport\Business\Model\ProductOption;

use Pyz\Zed\DataImport\Business\Model\Tax\TaxSetNameToIdTaxSetStep;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;

class ProductOptionWriterStep extends PublishAwareStep implements DataImportStepInterface
{
    ...
    public function execute(DataSetInterface $dataSet)
    {
        $productOptionGroupEntity = SpyProductOptionGroupQuery::create()
            ->filterByName($dataSet[self::KEY_GROUP_NAME_TRANSLATION_KEY])
            ->filterByKey($dataSet[self::KEY_PRODUCT_OPTION_GROUP_KEY])
            ->findOneOrCreate();
        $productOptionGroupEntity
            ->setName($dataSet[static::KEY_OPTION_NAME_TRANSLATION_KEY])
            ->setActive($this->isActive($dataSet, $productOptionGroupEntity))
            ->setFkTaxSet($dataSet[TaxSetNameToIdTaxSetStep::KEY_TARGET])
            ->save();
        ...
    }
}
```

4. Import data:

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
| MerchantProductOptionGroupWritePublisherPlugin | Retrieves all abstract product IDs using the merchant product option group IDs from the event transfers. | None | Spryker\Zed\MerchantProductOptionStorage\Communication\Plugin\Publisher\MerchantProductOption |
| MerchantProductOptionGroupPublisherTriggerPlugin | Allows publishing or republishing merchant product option group storage data manually. | None | Spryker\Zed\MerchantProductOptionStorage\Communication\Plugin\Publisher |


<details>
<summary>src/Pyz/Zed/ProductOption/ProductOptionDependencyProvider.php</summary>

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
     * @return array<\Spryker\Zed\ProductOptionGuiExtension\Dependency\Plugin\ProductOptionListActionViewDataExpanderPluginInterface>
     */
    protected function getProductOptionListActionViewDataExpanderPlugins(): array
    {
        return [
            new MerchantProductOptionListActionViewDataExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductOptionGuiExtension\Dependency\Plugin\ProductOptionListTableQueryCriteriaExpanderPluginInterface>
     */
    protected function getProductOptionListTableQueryCriteriaExpanderPlugins(): array
    {
        return [
            new MerchantProductOptionListTableQueryCriteriaExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\ProductOptionExtension\Dependency\Plugin\ProductOptionGroupExpanderPluginInterface>
     */
    protected function getProductOptionGroupExpanderPlugins(): array
    {
        return [
            new MerchantProductOptionGroupExpanderPlugin(),
        ];
    }
}
```

</details>

**src/Pyz/Zed/ProductOptionStorage/ProductOptionStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductOptionStorage;

use Spryker\Zed\MerchantProductOptionStorage\Communication\Plugin\ProductOptionStorage\MerchantProductOptionCollectionFilterPlugin;
use Spryker\Zed\ProductOptionStorage\ProductOptionStorageDependencyProvider as SprykerProductOptionStorageDependencyProvider;

class ProductOptionStorageDependencyProvider extends SprykerProductOptionStorageDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductOptionStorageExtension\Dependency\Plugin\ProductOptionCollectionFilterPluginInterface>
     */
    protected function getProductOptionCollectionFilterPlugins(): array
    {
        return [
            new MerchantProductOptionCollectionFilterPlugin(),
        ];
    }
}
```

<details>
<summary>src/Pyz/Zed/Publisher/PublisherDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\MerchantProductOptionStorage\Communication\Plugin\Publisher\MerchantProductOption\MerchantProductOptionGroupWritePublisherPlugin;
use Spryker\Zed\MerchantProductOptionStorage\Communication\Plugin\Publisher\MerchantProductOptionGroupPublisherTriggerPlugin;
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
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getMerchantProductOptionStoragePlugins(): array
    {
        return [
            new MerchantProductOptionGroupWritePublisherPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface>
     */
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            new MerchantProductOptionGroupPublisherTriggerPlugin(),
        ];
    }
}
```

</details>

{% info_block warningBox "Verification" %}

Make sure the following is true:
- Merchants can create product option groups and values in the Merchant Portal.
- Merchant product option information is shown on a product details page when it's approved and active.
- Merchant product option information is displayed in the cart, checkout, and user account.
- Merchant product options are a part of the marketplace or merchant order, and all totals are calculated correctly.

{% endinfo_block %}

## Install related features

| FEATURE | REQUIRED FOR THE CURRENT FEATURE | INSTALLATION GUIDE |
| -------------- | -------------------------------- | ----------------- |
| Marketplace Product Options + Cart | | [Install the Marketplace Product Options + Cart feature](/docs/pbc/all/product-information-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-options-cart-feature.html) |
| Marketplace Product Options + Checkout | | [Install the Marketplace Product Options + Checkout feature](/docs/pbc/all/product-information-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-options-checkout-feature.html) |
