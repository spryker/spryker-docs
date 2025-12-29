This document describes how to install the Self-Service Portal (SSP) asset based catalog feature.

## Prerequisites

| FEATURE             | VERSION  | INSTALLATION GUIDE                                                                                                                                |
|---------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core        | 202512.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Self-Service Portal | 202512.0 | [Install Self-Service Portal](/docs/pbc/all/self-service-portal/latest/install/install-self-service-portal)                                       |

## Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/self-service-portal:"^202512.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following packages are now listed in `composer.lock`:

| MODULE            | EXPECTED DIRECTORY                         |
|-------------------|--------------------------------------------|
| SelfServicePortal | vendor/spryker-feature/self-service-portal |

{% endinfo_block %}

## Install required features

The Asset-Based Catalog feature depends on both Asset Management and Model Management features.

[Set up SSP Asset feature](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-asset-management-feature.html)

[Set up SSP Model feature](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-model-management-feature.html)


## Configure the event triggering for the catalog entities

**src/Pyz/Zed/SelfServicePortal/Persistence/Propel/Schema/spy_ssp_model_to_product_list.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed"
          xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\SelfServicePortal\Persistence" package="src.Orm.Zed.SelfServicePortal.Persistence">

    <table name="spy_ssp_model_to_product_list">
        <behavior name="event">
            <parameter name="spy_ssp_model_to_product_list_all" column="*"/>
        </behavior>
    </table>

</database>
```

**src/Pyz/Zed/SelfServicePortal/Persistence/Propel/Schema/spy_ssp_model_to_ssp_asset.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed"
          xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\SelfServicePortal\Persistence" package="src.Orm.Zed.SelfServicePortal.Persistence">

    <table name="spy_ssp_asset_to_ssp_model">
        <behavior name="event">
            <parameter name="spy_ssp_asset_to_ssp_model_all" column="*"/>
        </behavior>
    </table>

</database>
```

## Set up database schema

Apply schema updates:

```bash
console propel:install
```


{% info_block warningBox "Verification" %}
Make sure the following tables have been created in the database:

- `spy_ssp_model_to_product_list`
- `spy_ssp_asset_to_ssp_model`

{% endinfo_block %}

## Set up transfer objects

Generate transfer classes:

```bash
console transfer:generate
```

## Set up behavior


| PLUGIN                                  | SPECIFICATION                                                                           | PREREQUISITES | NAMESPACE                                                                            |
|-----------------------------------------|-----------------------------------------------------------------------------------------|---------------|--------------------------------------------------------------------------------------|
| SspModelAssetWritePublisherPlugin       | Publishes SSP model data by `SpySspModel` entity events.                                |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspAsset\Search  |
| SspAssetToModelWritePublisherPlugin     | Publishes SSP model data by `SpySspAssetToSspModel` entity events.                                |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspAsset\Storage |
| SspAssetToModelWritePublisherPlugin     | Publishes SSP asset data by `SpySspAssetToSspModel` entity events to the search engine. |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspAsset\Storage |

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\Publisher;

use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspAsset\Search\SspAssetToModelWritePublisherPlugin as SearchSspAssetToModelWritePublisherPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspAsset\Storage\SspAssetToModelWritePublisherPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspAsset\Search\SspModelAssetWritePublisherPlugin;

use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array<int|string, \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>|array<string, array<int|string, \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>>
     */
    protected function getPublisherPlugins(): array
    {
        return array_merge(
            $this->getSspAssetStoragePlugins(),
            $this->getSspAssetSearchPlugins(),
        );
    }

    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getSspAssetStoragePlugins(): array
    {
        return [
            new SspModelAssetWritePublisherPlugin(),
            new SspAssetToModelWritePublisherPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getSspAssetSearchPlugins(): array
    {
        return [
            new SearchSspAssetToModelWritePublisherPlugin(),
        ];
    }
}
```


### Set up widgets

| PLUGIN                        | SPECIFICATION                                                                           | PREREQUISITES | NAMESPACE                                    |
|-------------------------------|-----------------------------------------------------------------------------------------|---------------|----------------------------------------------|
| SspAssetInfoForItemWidget     | On the cart page, renders asset information for a cart item.                            |               | SprykerFeature\Yves\SelfServicePortal\Widget |
| SspItemAssetSelectorWidget    | On the product details page, renders an autocomplete form field for selecting an asset. |               | SprykerFeature\Yves\SelfServicePortal\Widget |
| SspCartItemAssetSelectorWidget | On the cart page, renders an autocomplete form field for selecting an asset.            |               | SprykerFeature\Yves\SelfServicePortal\Widget |
| AssetCompatibilityLabelWidget | Displays the compatibility label for assets.                                            |               | SprykerFeature\Yves\SelfServicePortal\Widget |
| SspAssetFilterNameWidget      | Displays the asset name in search result section.                                       |               | SprykerFeature\Yves\SelfServicePortal\Widget |
| SspAssetFilterWidget          | Display the asset data.                                                                 |               | SprykerFeature\Yves\SelfServicePortal\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerFeature\Yves\SelfServicePortal\Widget\SspAssetInfoForItemWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspItemAssetSelectorWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspAssetFilterNameWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\AssetCompatibilityLabelWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspAssetFilterWidget;
use SprykerFeature\Yves\SelfServicePortal\Widget\SspCartItemAssetSelectorWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            SspAssetInfoForItemWidget::class,
            AssetCompatibilityLabelWidget::class,
            SspAssetFilterNameWidget::class,
            SspAssetFilterWidget::class,
            SspCartItemAssetSelectorWidget::class,
            SspItemAssetSelectorWidget::class,
        ];
    }
}
```


## Import the Model relation data

Prepare your data according to your requirements using our demo data:

**data/import/common/common/product_list_to_concrete_product.csv**

```csv
product_list_key,concrete_sku
ssp-pl-001,service-001-1
```

| COLUMN           | REQUIRED | DATA TYPE | DATA EXAMPLE  | DATA EXPLANATION                                                    |
|------------------|----------|-----------|---------------|---------------------------------------------------------------------|
| product_list_key | ✓        | string    | ssp-pl-001    | Unique identifier for the product list used as a reference.         |
| concrete_sku     | ✓        | string    | service-001-1 | SKU of the concrete product to be associated with the product list. |

**data/import/common/common/ssp_model_asset.csv**

```csv
model_reference,asset_reference
MDL--1,AST--3
MDL--2,AST--4
```

| COLUMN          | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION                                                 |
|-----------------|----------|-----------|--------------|------------------------------------------------------------------|
| model_reference | ✓        | string    | MDL--1       | Unique identifier for the model used as a reference.             |
| asset_reference | ✓        | string    | AST--3       | Unique identifier for the asset to be associated with the model. |

**data/import/common/common/ssp_model_product_list.csv**

```csv
model_reference,product_list_key
MDL--2,ssp-pl-001
```

| COLUMN           | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION                                                        |
|------------------|----------|-----------|--------------|-------------------------------------------------------------------------|
| model_reference  | ✓        | string    | MDL--2       | Unique identifier for the model used as a reference.                    |
| product_list_key | ✓        | string    | ssp-pl-001   | Unique identifier for the product list to be associated with the model. |

## Extend the data import configuration

**/data/import/local/full_EU.yml**

```yaml
# ...

# SelfServicePortal
  - data_entity: ssp-model-asset
    source: data/import/common/common/ssp_model_asset.csv
  - data_entity: ssp-model-product-list
    source: data/import/common/common/ssp_model_product_list.csv
```


## Register the following data import plugins


| PLUGIN                              | SPECIFICATION                                       | PREREQUISITES | NAMESPACE                                                            |
|-------------------------------------|-----------------------------------------------------|---------------|----------------------------------------------------------------------|
| SspModelAssetDataImportPlugin       | Imports ssp asset model relations into persistence. |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport |
| SspModelProductListDataImportPlugin | Imports ssp asset model relations into persistence. |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport\SspModelAssetDataImportPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport\SspModelProductListDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface>
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new SspModelAssetDataImportPlugin(),
            new SspModelProductListDataImportPlugin(),
        ];
    }
}
```


### Import the data

{% info_block infoBox "Prerequisites" %}

Before importing the data, make sure you have imported demo data for the following entities:

- [Import product data](/docs/dg/dev/data-import/latest/importing-product-data-with-a-single-file.html#single-csv-file-for-combined-product-data-import) - required for `product-abstract` and `product-concrete` data imports
- [Import product lists](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-product-lists-feature.html#import-product-lists) - required for `product-list` data import
- [Import product lists product concrete relation](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-product-lists-feature.html#import-product-lists) - required for `product-list-product-concrete` data import

{% endinfo_block %}

```bash
console data:import product-list
console data:import product-abstract
console data:import product-concrete
console data:import product-list-product-concrete
console data:import ssp-model-product-list
console data:import ssp-asset
console data:import ssp-model-asset
console data:import merchant-product-offer
```
