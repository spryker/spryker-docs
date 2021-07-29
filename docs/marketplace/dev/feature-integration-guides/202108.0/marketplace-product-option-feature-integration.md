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
| Marketplace Merchant | master      | [Marketplace Merchant Feature Integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-merchant-feature-integration.html) |
| Marketplace Product + Marketplace Product Offer | master | [Marketplace Product + Marketplace Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-product-marketplace-product-offer-feature-integration.html) |


### 1) Install the required modules using Composer

1) Install the required modules:

```bash
composer require spryker-feature/marketplace-product-options:"dev-master" --update-with-dependencies
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

### 3) Adjust Product Option Importer

**src/Pyz/Zed/DataImport/Business/Model/ProductOption/ProductOptionWriterStep.php**

```php
<?php

namespace Pyz\Zed\DataImport\Business\Model\ProductOption;

use Spryker\Zed\DataImport\Business\Model\DataImportStep\PublishAwareStep;
use Spryker\Zed\DataImport\Business\Model\DataImportStep\DataImportStepInterface;

class ProductOptionWriterStep extends PublishAwareStep implements DataImportStepInterface
{
    public const KEY_PRODUCT_OPTION_GROUP_KEY = 'product_option_group_key';
    // ...

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     *
     * @return void
     */
    public function execute(DataSetInterface $dataSet)
    {
        $productOptionGroupEntity = SpyProductOptionGroupQuery::create()
            ->filterByKey($dataSet[self::KEY_PRODUCT_OPTION_GROUP_KEY])
            ->findOneOrCreate();

        $productOptionGroupEntity->fromArray($dataSet->getArrayCopy());
        $productOptionGroupEntity
            ->setName($dataSet[static::KEY_OPTION_NAME_TRANSLATION_KEY])
            ->setActive($this->isActive($dataSet, $productOptionGroupEntity))
            ->setFkTaxSet($dataSet[TaxSetNameToIdTaxSetStep::KEY_TARGET])
            ->save();
        // ...
    }
}
```

### 4) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantProductOptionCartPreCheckPlugin | Checks the approval status for merchant product options. | None | Spryker\Zed\MerchantProductOption\Communication\Plugin\Cart |
| MerchantProductOptionCheckoutPreConditionPlugin | Checks the approval status for merchant product option groups. | None | Spryker\Zed\MerchantProductOption\Communication\Plugin\Checkout |
| MerchantProductOptionGroupDataImportPlugin | Validates Merchant reference and inserts merchant product option groups into DB. | None | Spryker\Zed\MerchantProductOptionDataImport\Communication\Plugin\DataImport |
| MerchantProductOptionListActionViewDataExpanderPlugin | Expands data with merchant collection. | None | Spryker\Zed\MerchantGui\Communication\Plugin\ProductOptionGui |
| MerchantProductOptionListTableQueryCriteriaExpanderPlugin | Expands `QueryCriteriaTransfer` with merchant product option group criteria for expanding default query running in `ProductOptionListTable`. | None | Spryker\Zed\MerchantProductOptionGui\Communication\Plugin\ProductOptionGui |
| MerchantProductOptionGroupExpanderPlugin | Expands a product option group data with related merchant. | None | Spryker\Zed\MerchantProductOption\Communication\Plugin\ProductOption |
| MerchantProductOptionCollectionFilterPlugin | Filters merchant product option group transfers by approval status and excludes product options with not approved merchant groups. | None | Spryker\Zed\MerchantProductOptionStorage\Communication\Plugin\ProductOptionStorage |
| MerchantProductOptionGroupWritePublisherPlugin | Retrieves all abstract product ids using merchant product option group ids from event transfers. | None | Spryker\Zed\MerchantProductOptionStorage\Communication\Plugin\Publisher\MerchantProductOption |


**src/Pyz/Zed/Cart/CartDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\MerchantProductOption\Communication\Plugin\Cart\MerchantProductOptionCartPreCheckPlugin;
use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\CartPreCheckPluginInterface[]
     */
    protected function getCartPreCheckPlugins(Container $container): array
    {
        return [
            // ...
            new MerchantProductOptionCartPreCheckPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Checkout;

use Spryker\Zed\MerchantProductOption\Communication\Plugin\Checkout\MerchantProductOptionCheckoutPreConditionPlugin;
use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPreConditionPluginInterface[]
     */
    protected function getCheckoutPreConditions(Container $container)
    {
        return [
            // ...
            new MerchantProductOptionCheckoutPreConditionPlugin(),
        ];
    }
}
```

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
            // ...
            new MerchantProductOptionGroupDataImportPlugin(),
        ];
    }
}
```


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
        return array_merge(
            // ...
            $this->getMerchantProductOptionStoragePlugins()
        );
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


### 5) Add Yves translations

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


### 6) Import data

Prepare your data according to your requirements using the demo data:

<details><summary>data/import/common/common/marketplace/merchant_product_option_group.csv</summary>

```csv
product_option_group_key,merchant_reference,approval_status,merchant_sku
insurance,MER000001,approved,spr-425453
```

</details>

#### Adjust the following files:

<details><summary>data/import/common/AT/product_option_price.csv</summary>

```csv
OP_1_year_warranty,AT,EUR,0,0
OP_2_year_warranty,AT,EUR,700,900
OP_3_year_warranty,AT,EUR,1700,1800
OP_1_year_warranty,AT,CHF,0,0
OP_2_year_warranty,AT,CHF,800,1100
OP_3_year_warranty,AT,CHF,1900,2200
```

</details>

<details><summary>data/import/common/DE/product_option_price.csv</summary>

```csv
OP_1_year_warranty,DE,EUR,0,0
OP_2_year_warranty,DE,EUR,800,1000
OP_3_year_warranty,DE,EUR,1800,2000
OP_1_year_warranty,DE,CHF,0,0
OP_2_year_warranty,DE,CHF,900,1200
OP_3_year_warranty,DE,CHF,2000,2300
```

</details>

<details><summary>data/import/common/common/product_option.csv</summary>

```csv
abstract_product_skus,option_group_id,tax_set_name,group_name_translation_key,group_name.en_US,group_name.de_DE,option_name_translation_key,option_name.en_US,option_name.de_DE,sku,product_option_group_key
"012,013,014,015,016,017,018,019,020,021,022,023,024,025,026,027,028,029,030,031,032,033,034,035,036,037,038,039,040,041,042,043,044,045,046,047,048,049,050,051,052,053,054,055,056,057,058,059,060,061,062,063,064,065,066,067,068,069,070,071,072,073,074,075,076,077,078,079,080,081,082,083,084,085,086,087,088,089,090,091,092,093,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,200,201,202,203,204,205",1,Entertainment Electronics,product.option.group.name.warranty,Warranty,Garantie,product.option.warranty_1,One (1) year limited warranty,Ein (1) Jahr begrenzte Garantie,OP_1_year_warranty,warranty
,1,Entertainment Electronics,product.option.group.name.warranty,Warranty,Garantie,product.option.warranty_2,Two (2) year limited warranty,Zwei (2) Jahre begrenzte Garantie,OP_2_year_warranty,warranty
,1,Entertainment Electronics,product.option.group.name.warranty,Warranty,Garantie,product.option.warranty_3,Three (3) year limited warranty,Drei (3) Jahre begrenzte Garantie,OP_3_year_warranty,warranty
"001,002,003,004,005,006,007,008,009,010,011,012,024,025,026,027,028,029,030,031,032,033,034,035,036,037,038,039,040,041,042,043,044,045,046,047,048,049,050,051,052,053,054,055,056,057,058,059,060,061,062,063,064,065,066,067,068,069,070,083,084,085,086,087,088,089,090,091,092,093,094,095,096,097,098,099,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214",2,Entertainment Electronics,product.option.group.name.insurance,Insurance,Versicherungsschutz,product.option.insurance,Two (2) year insurance coverage,Zwei (2) Jahre Versicherungsschutz,OP_insurance,insurance
"001,002,003,004,005,006,007,008,009,010,018,019,020,021,022,023,024,025,026,027,028,029,030,031,032,033,034,035,036,037,038,039,040,041,042,043,044,045,046,047,048,049,050,051,052,053,054,055,056,057,058,059,060,061,062,063,064,065,066,067,068,069,070,071,084,085,086,087,088,089,090,091,092,093,094,095,096,097,098,099,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210",3,Entertainment Electronics,product.option.group.name.gift_wrapping,Gift wrapping,Geschenkverpackung,product.option.gift_wrapping,Gift wrapping,Geschenkverpackung,OP_gift_wrapping,wrapping
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

Import data:

```bash
console data:import product-option
console data:import product-option-price
console data:import merchant-product-option-group
```

{% info_block warningBox "Verification" %}

Make sure that the Merchant Product Option Group data is in the `spy_merchant_product_option_group` table.

{% endinfo_block %}
