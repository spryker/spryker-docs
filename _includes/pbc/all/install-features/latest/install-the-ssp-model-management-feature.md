This document describes how to install the Self-Service Portal (SSP) Model Management feature.

## Prerequisites

| FEATURE             | VERSION  | INSTALLATION GUIDE                                                                                                                                |
|---------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core        | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Self-Service Portal | 202507.0 | [Install Self-Service Portal](/docs/pbc/all/self-service-portal/latest/install/install-self-service-portal)                                       |

## Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/self-service-portal:"^5.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following packages are now listed in `composer.lock`:

| MODULE            | EXPECTED DIRECTORY                         |
|-------------------|--------------------------------------------|
| SelfServicePortal | vendor/spryker-feature/self-service-portal |

{% endinfo_block %}

## Set up configuration

Add the following configuration to `config/Shared/config_default.php`:

| CONFIGURATION                                              | SPECIFICATION                                                         | NAMESPACE                               |
|------------------------------------------------------------|-----------------------------------------------------------------------|-----------------------------------------|
| SelfServicePortalConfig::QUEUE_NAME_SYNC_STORAGE_SSP_MODEL | Defines queue name as used for processing SSP model storage messages. | SprykerFeature\Shared\SelfServicePortal |

## Configure synchronization queues

**src/Pyz/Client/RabbitMq/RabbitMqConfig.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Client\RabbitMq;

use Pyz\Shared\SelfServicePortal\SelfServicePortalConfig;
use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;

/**
 * @SuppressWarnings(PHPMD.CouplingBetweenObjects)
 */
class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     * @return array<mixed>
     */
    protected function getSynchronizationQueueConfiguration(): array
    {
        return [
            SelfServicePortalConfig::QUEUE_NAME_SYNC_STORAGE_SSP_MODEL,
        ];
    }
}
```

**src/Pyz/Zed/Queue/QueueDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\Queue;

use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;
use Spryker\Zed\Synchronization\Communication\Plugin\Queue\SynchronizationStorageQueueMessageProcessorPlugin;

class QueueDependencyProvider extends SprykerDependencyProvider
{

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface>
     */
    protected function getProcessorMessagePlugins(Container $container): array 
    {
        return [  
            SelfServicePortalConfig::QUEUE_NAME_SYNC_STORAGE_SSP_MODEL => new SynchronizationStorageQueueMessageProcessorPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}
Make sure that, in the RabbitMQ management interface, the following queues are available:

- `sync.storage.ssp_model`
- `sync.storage.ssp_model.error`

{% endinfo_block %}

## Configure the event triggering for the model entity

**src/Pyz/Zed/SelfServicePortal/Persistence/Propel/Schema/spy_ssp_model.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed"
          xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\SelfServicePortal\Persistence" package="src.Orm.Zed.SelfServicePortal.Persistence">

    <table name="spy_ssp_model">
        <behavior name="event">
            <parameter name="spy_ssp_model_all" column="*"/>
        </behavior>
    </table>

</database>
```

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

- `spy_ssp_model`
- `spy_ssp_model_storage`
- `spy_ssp_model_to_product_list`
- `spy_sales_order_item_ssp_asset`
- `spy_ssp_asset_to_ssp_model`

{% endinfo_block %}

## Set up transfer objects

Generate transfer classes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}
Make sure the following transfer objects have been generated:

| TRANSFER                   | TYPE     | EVENT   | PATH                                                             |
|----------------------------|----------|---------|------------------------------------------------------------------|
| SspModel                   | transfer | created | src/Generated/Shared/Transfer/SspModelTransfer                   |
| SspModelCriteria           | transfer | created | src/Generated/Shared/Transfer/SspModelCriteriaTransfer           |
| SspModelConditions         | transfer | created | src/Generated/Shared/Transfer/SspModelConditionsTransfer         |
| SspModelCollection         | transfer | created | src/Generated/Shared/Transfer/SspModelCollectionTransfer         |
| SspModelCollectionRequest  | transfer | created | src/Generated/Shared/Transfer/SspModelCollectionRequestTransfer  |
| SspModelCollectionResponse | transfer | created | src/Generated/Shared/Transfer/SspModelCollectionResponseTransfer |
| SspModelStorage            | transfer | created | src/Generated/Shared/Transfer/SspModelStorageTransfer            |
| SspModelStorageCollection  | transfer | created | src/Generated/Shared/Transfer/SspModelStorageCollectionTransfer  |
| SspModelStorageCriteria    | transfer | created | src/Generated/Shared/Transfer/SspModelStorageCriteriaTransfer    |
| SspModelStorageConditions  | transfer | created | src/Generated/Shared/Transfer/SspModelStorageConditionsTransfer  |

{% endinfo_block %}

## Import the Model data

Prepare your data according to your requirements using our demo data:

**data/import/common/common/product_list_to_concrete_product.csv**

```csv
product_list_key,concrete_sku
ssp-pl-001,service-001-1
ssp-pl-001,service-002-1
ssp-pl-001,service-003-1
ssp-pl-001,service-004-1
```

| COLUMN           | REQUIRED | DATA TYPE | DATA EXAMPLE  | DATA EXPLANATION                                                    |
|------------------|----------|-----------|---------------|---------------------------------------------------------------------|
| product_list_key | ✓        | string    | ssp-pl-001    | Unique identifier for the product list used as a reference.         |
| concrete_sku     | ✓        | string    | service-001-1 | SKU of the concrete product to be associated with the product list. |

**data/import/common/common/ssp_model.csv**

```csv
reference,name,code,image_url
MDL--1,OfficeJet Pro,9025e,https://d2s0ynfc62ej12.cloudfront.net/image/AdobeStock_125577546.jpeg
MDL--2,Casa,F-08,https://d2s0ynfc62ej12.cloudfront.net/image/AdobeStock_223498915.jpeg
```

| COLUMN    | REQUIRED | DATA TYPE | DATA EXAMPLE                                                          | DATA EXPLANATION                                     |
|-----------|----------|-----------|-----------------------------------------------------------------------|------------------------------------------------------|
| reference | ✓        | string    | MDL--1                                                                | Unique identifier for the model used as a reference. |
| name      |          | string    | OfficeJet Pro                                                         | The display name of the model.                       |
| code      | ✓        | string    | 9025e                                                                 | The model code for identification purposes.          |
| image_url |          | string    | https://d2s0ynfc62ej12.cloudfront.net/image/AdobeStock_125577546.jpeg | URL to an image of the model.                        |

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

## Extend the data import configuration:

**/data/import/local/full_EU.yml**

```yaml
# ...

# SelfServicePortal
    source: data/import/common/common/ssp_model.csv
  - data_entity: ssp-model-asset
    source: data/import/common/common/ssp_model_asset.csv
  - data_entity: ssp-model-product-list
    source: data/import/common/common/ssp_model_product_list.csv
```

## Register the following data import plugins:

| PLUGIN                              | SPECIFICATION                                       | PREREQUISITES | NAMESPACE                                                            |
|-------------------------------------|-----------------------------------------------------|---------------|----------------------------------------------------------------------|
| SspModelDataImportPlugin            | Imports a ssp model into persistence.               |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport |
| SspModelAssetDataImportPlugin       | Imports ssp asset model relations into persistence. |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport |
| SspModelProductListDataImportPlugin | Imports ssp asset model relations into persistence. |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport\SspModelDataImportPlugin;
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
            new SspModelDataImportPlugin(),
            new SspModelAssetDataImportPlugin(),
            new SspModelProductListDataImportPlugin(),
        ];
    }
}
```

4. Enable the behaviors by registering the console commands:

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
use SprykerFeature\Zed\SelfServicePortal\SelfServicePortalConfig;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container)
    {
        $commands = [
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . SelfServicePortalConfig::IMPORT_TYPE_SSP_MODEL),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . SelfServicePortalConfig::IMPORT_TYPE_SSP_MODEL_ASSET),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . SelfServicePortalConfig::IMPORT_TYPE_SSP_MODEL_PRODUCT_LIST),
        ];

        return $commands;
    }
}
```

4. Import the data:

```bash
console data:import:ssp-model
console data:import:ssp-model-asset
console data:import:ssp-model-product-list
```

{% info_block warningBox "Verification" %}

Make sure the configured data has been added to the following database tables:

- `spy_ssp_model`
- `spy_ssp_asset_to_ssp_model`
- `spy_ssp_model_storage`
- `spy_ssp_model_to_product_list`
  {% endinfo_block %}

## Set up behavior

| PLUGIN                                              | SPECIFICATION                                                                                      | PREREQUISITES | NAMESPACE                                                                            |
|-----------------------------------------------------|----------------------------------------------------------------------------------------------------|---------------|--------------------------------------------------------------------------------------|
| SspModelPublisherTriggerPlugin                      | Retrieves SSP models by provided limit and offset.                                                 |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher;                 |
| SspModelWritePublisherPlugin                        | Publishes SSP model data by `SpySspModel` entity events.                                           |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspModel\Storage |
| SspModelToProductListWritePublisherPlugin           | Publishes SSP model data by `SpySspModelToProductList` entity events.                              |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspModel\Storage |
| SearchSspAssetToModelWritePublisherPlugin           | Publishes SSP asset data by `SpySspAssetToSspModel` entity events.                                 |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspAsset\Search  |
| SspModelListSynchronizationDataBulkRepositoryPlugin | Retrieves a collection of SSP model storage transfers according to provided offset, limit and IDs. |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Synchronization\Storage    |

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\Publisher;

use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspAsset\Search\SspAssetToModelWritePublisherPlugin as SearchSspAssetToModelWritePublisherPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspModel\Storage\SspModelWritePublisherPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspModel\Storage\SspModelToProductListWritePublisherPlugin;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspModelPublisherTriggerPlugin;

use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array<int|string, \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>|array<string, array<int|string, \Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>>
     */
    protected function getPublisherPlugins(): array
    {
        return array_merge(
           $this->getSspModelStoragePlugins(),
        );
    }

    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface>
     */
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            new SspModelPublisherTriggerPlugin(),
        ];
    }
   
    /**
     * @return list<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getSspModelStoragePlugins(): array
    {
        return [
            new SspModelWritePublisherPlugin(),
            new SspModelToProductListWritePublisherPlugin(),
        ];
    }
    
     /**
     * @return list<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getSspAssetSearchPlugins(): array
    {
        return [
            new SearchSspAssetToModelWritePublisherPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

declare(strict_types = 1);

namespace Pyz\Zed\Synchronization;

use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Synchronization\Storage\SspModelListSynchronizationDataBulkRepositoryPlugin;;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface>
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new SspModelListSynchronizationDataBulkRepositoryPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. On the Storefront, log in with the company user you've assigned the role to.
   Make sure the **My Assets** menu item is displayed.
2. Go to **Customer Account** > **My Assets**.
3. Click **Create Asset**.
4. Upload an image and fill in the required fields.
5. Click **Save**.
   Make sure the asset gets saved and this opens the asset details page.

{% endinfo_block %}

## Set up frontend templates
[`src/Pyz/Yves/CatalogPage/Theme/default/components/molecules/sort/sort.twig`](https://github.com/spryker-shop/b2b-demo-shop/pull/822/files?file-filters%5B%5D=.scss&file-filters%5B%5D=.ts&file-filters%5B%5D=.twig&show-viewed-files=true#diff-b82014b258cd751113519031eec426902dc873d89a95c80e5027dd99914a8353)
[`src/Pyz/Yves/CatalogPage/Theme/default/components/organisms/filter-section/filter-section.twig`](https://github.com/spryker-shop/b2b-demo-shop/pull/822/files?file-filters%5B%5D=.scss&file-filters%5B%5D=.ts&file-filters%5B%5D=.twig&show-viewed-files=true#diff-fca7e1df593bbf7891861d2a1c43015eff5fbb46a09ec04903d08bd53310cf21)
[`src/Pyz/Yves/SelfServicePortal/Theme/default/components/molecules/asset-finder/asset-finder.ts`](https://github.com/spryker-shop/b2b-demo-shop/pull/822/files?file-filters%5B%5D=.scss&file-filters%5B%5D=.ts&file-filters%5B%5D=.twig&show-viewed-files=true#diff-b37bfae7fc611bc18bfddb693dfd1e57cdc9ffb7cdf83decde931ac3de332c9c)
[`src/Pyz/Yves/SelfServicePortal/Theme/default/components/molecules/asset-finder/asset-finder.twig`](https://github.com/spryker-shop/b2b-demo-shop/pull/822/files?file-filters%5B%5D=.scss&file-filters%5B%5D=.ts&file-filters%5B%5D=.twig&show-viewed-files=true#diff-de4a3705133b93463c213ec2f4b3d482d4dcc4d4b49247631b37ea728fc072e1)
[`src/Pyz/Yves/SelfServicePortal/Theme/default/components/molecules/asset-list/asset-list.scss`](https://github.com/spryker-shop/b2b-demo-shop/pull/822/files?file-filters%5B%5D=.scss&file-filters%5B%5D=.ts&file-filters%5B%5D=.twig&show-viewed-files=true#diff-052282c197c07f15fb6d729df046f2673c16f6fd0d67c6cff93c4da32dea8ba7)
[`src/Pyz/Yves/SelfServicePortal/Theme/default/components/molecules/asset-list/asset-list.twig`](https://github.com/spryker-shop/b2b-demo-shop/pull/822/files?file-filters%5B%5D=.scss&file-filters%5B%5D=.ts&file-filters%5B%5D=.twig&show-viewed-files=true#diff-7bf406253ca401be2e5a6754c3a01335f3b02ce10a18edc36ce28fc05a9ff9c8)
[`src/Pyz/Yves/SelfServicePortal/Theme/default/components/molecules/asset-selector/asset-selector.scss`](https://github.com/spryker-shop/b2b-demo-shop/pull/822/files?file-filters%5B%5D=.scss&file-filters%5B%5D=.ts&file-filters%5B%5D=.twig&show-viewed-files=true#diff-4d9a709cd47475a2895e45718177e61dd2ce231dc14ad071c9ab1410e5de3f18)
[`src/Pyz/Yves/SelfServicePortal/Theme/default/components/molecules/asset-selector/asset-selector.twig`](https://github.com/spryker-shop/b2b-demo-shop/pull/822/files?file-filters%5B%5D=.scss&file-filters%5B%5D=.ts&file-filters%5B%5D=.twig&show-viewed-files=true#diff-5205fa69d2249f1eb17be5597c177327dd64232d69def1d9af031b01cad894da)
[`src/Pyz/Yves/SelfServicePortal/Theme/default/components/molecules/service-point-shipment-types/service-point-shipment-types.twig`](https://github.com/spryker-shop/b2b-demo-shop/pull/822/files?file-filters%5B%5D=.scss&file-filters%5B%5D=.ts&file-filters%5B%5D=.twig&show-viewed-files=true#diff-a121877cb09b3adf2f9468311f6828f14655d2db035b790b9b818989a46963e1)
[`src/Pyz/Yves/SelfServicePortal/Theme/default/views/asset-filter/asset-filter.twig`](https://github.com/spryker-shop/b2b-demo-shop/pull/822/files?file-filters%5B%5D=.scss&file-filters%5B%5D=.ts&file-filters%5B%5D=.twig&show-viewed-files=true#diff-1b433d8e0608a26e14b6127ece330851365d965798eec52e45af9b39f0d38b34)
[`src/Pyz/Yves/SelfServicePortal/Theme/default/views/item-asset-selector/item-asset-selector.twig`](https://github.com/spryker-shop/b2b-demo-shop/pull/822/files?file-filters%5B%5D=.scss&file-filters%5B%5D=.ts&file-filters%5B%5D=.twig&show-viewed-files=true#diff-6c9d43b28bcafa509a0e6733627587aa4f29e3f6ae34f311f7b7bac780412694)