This document describes how to install the Self-Service Portal (SSP) Model Management feature.

{% info_block warningBox "Install all SSP features" %}

For the Self-Service Portal to work correctly, you must install all SSP features. Each feature depends on the others for proper functionality.

{% endinfo_block %}

## Features SSP Model Management depends on

- [Install the SSP Asset Management feature](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-asset-management-feature.html)
- [Install the SSP Dashboard Management feature](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-dashboard-management-feature.html)
- [Install the SSP File Management feature](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-file-management-feature.html)
- [Install the SSP Inquiry Management feature](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-inquiry-management-feature.html)
- [Install the SSP Service Management feature](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-service-management-feature.html)
- [Install the Asset-Based Catalog feature](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-asset-based-catalog-feature.html)

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

## Set up configuration

Add the following configuration to `config/Shared/config_default.php`:

| CONFIGURATION                                              | SPECIFICATION                                                                                                                                                                                                                             | NAMESPACE                               |
|------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------|
| FileSystemConstants::FILESYSTEM_SERVICE                    | Defines the Flysystem service configuration for handling asset file storage. This configuration specifies the adapter, such as local or S3, and the root path for storing model files, ensuring they're managed securely and efficiently. | Spryker\Shared\FileSystem               |
| KernelConstants::CORE_NAMESPACES                           | Defines the core namespaces.                                                                                                                                                                                                              | Spryker\Shared\Kernel                   |
| SelfServicePortalConstants::SSP_MODEL_IMAGE_STORAGE_NAME   | Defines the unique identifier for the Flysystem storage instance used for SSP models. This name links the model management feature to the specific filesystem configuration defined in `FileSystemConstants::FILESYSTEM_SERVICE`.         | Spryker\Shared\Kernel                   |
| SelfServicePortalConfig::QUEUE_NAME_SYNC_STORAGE_SSP_MODEL | Defines queue name as used for processing SSP model storage messages.                                                                                                                                                                     | SprykerFeature\Shared\SelfServicePortal |

**config/Shared/config_default.php**

```php
<?php

use Spryker\Service\FlysystemLocalFileSystem\Plugin\Flysystem\LocalFilesystemBuilderPlugin;
use Spryker\Shared\FileSystem\FileSystemConstants;
use Spryker\Service\FlysystemAws3v3FileSystem\Plugin\Flysystem\Aws3v3FilesystemBuilderPlugin;
use SprykerFeature\Shared\SelfServicePortal\SelfServicePortalConstants;

$config[FileSystemConstants::FILESYSTEM_SERVICE] = [
     'ssp-model-image' => [
        'sprykerAdapterClass' => Aws3v3FilesystemBuilderPlugin::class,
        'key' => getenv('SPRYKER_S3_SSP_MODELS_KEY') ?: '',
        'secret' => getenv('SPRYKER_S3_SSP_MODELS_SECRET') ?: '',
        'bucket' => getenv('SPRYKER_S3_SSP_MODELS_BUCKET') ?: '',
        'region' => getenv('AWS_REGION') ?: 'eu-central-1',
        'version' => 'latest',
        'root' => '/ssp-model-image',
        'path' => '',
    ],
];

$config[KernelConstants::CORE_NAMESPACES] = [
    ...
    'SprykerFeature',
];
$config[SelfServicePortalConstants::SSP_MODEL_IMAGE_STORAGE_NAME] = 'ssp-model-image';
```

{% info_block infoBox "Cloud environment variables" %}

In cloud environments, set the following environment variables:

- `SPRYKER_S3_SSP_MODELS_KEY` - AWS S3 access key for SSP model file storage
- `SPRYKER_S3_SSP_MODELS_SECRET` - AWS S3 secret key for SSP model file storage
- `SPRYKER_S3_SSP_MODELS_BUCKET` - AWS S3 bucket name for SSP model file storage
- `AWS_REGION` - AWS region (defaults to `eu-central-1` if not set)

{% endinfo_block %}

## Configure synchronization queues

**src/Pyz/Client/RabbitMq/RabbitMqConfig.php**

```php
<?php

namespace Pyz\Client\RabbitMq;

use SprykerFeature\Shared\SelfServicePortal\SelfServicePortalConfig;
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

namespace Pyz\Zed\Queue;

use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;
use Spryker\Zed\Synchronization\Communication\Plugin\Queue\SynchronizationStorageQueueMessageProcessorPlugin;
use SprykerFeature\Shared\SelfServicePortal\SelfServicePortalConfig;

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

Set up the queue infrastructure:

```bash
vendor/bin/console queue:setup
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

Apply changes:

```bash
console propel:install
```

{% info_block warningBox "Verification" %}
Make sure the following tables have been created in the database:

- `spy_ssp_model`
- `spy_ssp_model_storage`

{% endinfo_block %}

## Set up transfer objects

Generate transfer classes:

```bash
console transfer:generate
```

## Configure navigation

Add the `Models` section to `navigation.xml`:

**config/Zed/navigation.xml**

```xml
<?xml version="1.0"?>
<config>
   <ssp>
      <label>Customer Portal</label>
      <title>Customer Portal</title>
      <icon>fa-id-badge</icon>
      <pages>
         <self-service-portal-model>
            <label>Models</label>
            <title>Models</title>
            <bundle>self-service-portal</bundle>
            <controller>list-model</controller>
            <action>index</action>
         </self-service-portal-model>
      </pages>
   </ssp>
</config>
```

Generate routers and navigation cache

```bash
console router:cache:warm-up:backoffice
console navigation:build-cache 
```

{% info_block warningBox "Verification" %}
Make sure that, in the Back Office, the **Customer portal** > **Models** section is available.
{% endinfo_block %}

## Set up behavior

| PLUGIN                                              | SPECIFICATION                                                                                      | PREREQUISITES | NAMESPACE                                                                            |
|-----------------------------------------------------|----------------------------------------------------------------------------------------------------|---------------|--------------------------------------------------------------------------------------|
| SspModelPublisherTriggerPlugin                      | Retrieves SSP models by provided limit and offset.                                                 |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher                  |
| SspModelWritePublisherPlugin                        | Publishes SSP model data by `SpySspModel` entity events.                                           |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspModel\Storage |
| SspModelToProductListWritePublisherPlugin           | Publishes SSP model data by `SpySspModelToProductList` entity events.                              |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Publisher\SspModel\Storage |
| SspModelListSynchronizationDataBulkRepositoryPlugin | Retrieves a collection of SSP model storage transfers according to provided offset, limit and IDs. |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Synchronization\Storage    |
| SspModelProductListUsedByTableExpanderPlugin        | Expands table data by adding SSP models related to the product list.                               |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductListGui             |

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Publisher;

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
        return [
            new SspModelWritePublisherPlugin(),
            new SspModelToProductListWritePublisherPlugin(),
        ];
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
}
```

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\Synchronization\Storage\SspModelListSynchronizationDataBulkRepositoryPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

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

**src/Pyz/Zed/ProductListGui/ProductListGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductListGui;

use Spryker\Zed\ProductListGui\ProductListGuiDependencyProvider as SprykerProductListGuiDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\ProductListGui\SspModelProductListUsedByTableExpanderPlugin;

class ProductListGuiDependencyProvider extends SprykerProductListGuiDependencyProvider
{
 
    /**
     * @return array<\Spryker\Zed\ProductListGuiExtension\Dependency\Plugin\ProductListUsedByTableExpanderPluginInterface>
     */
    protected function getProductListUsedByTableExpanderPlugins(): array
    {
        return [
            new SspModelProductListUsedByTableExpanderPlugin(),
        ];
    }
}
```

### Set up widgets

{% info_block infoBox "Info" %}

No widgets are required for the Model Management feature.

{% endinfo_block %}

### Add translations

[Here you can find how to import translations for Self-Service Portal feature](/docs/pbc/all/self-service-portal/latest/install/ssp-glossary-data-import.html)

Import translations:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Verify models in the Back Office:

1. In the Back Office, go to **Customer Portal** > **Models**.
2. Click **Create Model**.
3. Fill in the required fields (name).
4. Optional: Upload an image or provide an image URL, set model code.
5. Click **Save**.
   Make sure the model gets saved and this opens the model details page.
6. Go to **Customer Portal** > **Models**.
   Make sure the model you've created is displayed in the list.

{% endinfo_block %}

## Demo data for EU region / DE store

### Add model demo data

Prepare your data according to your requirements using our demo data:

**data/import/common/common/ssp_model.csv**

```csv
reference,name,code,image_url
MDL--1,OfficeJet Pro,9025e,https://d2s0ynfc62ej12.cloudfront.net/image/AdobeStock_125577546.jpeg
MDL--2,Casa,F-08,https://d2s0ynfc62ej12.cloudfront.net/image/AdobeStock_223498915.jpeg
```

| COLUMN    | REQUIRED | DATA TYPE | DATA EXAMPLE                                                            | DATA EXPLANATION                                     |
|-----------|----------|-----------|-------------------------------------------------------------------------|------------------------------------------------------|
| reference | ✓        | string    | MDL--1                                                                  | Unique identifier for the model used as a reference. |
| name      |          | string    | OfficeJet Pro                                                           | The display name of the model.                       |
| code      | ✓        | string    | 9025e                                                                   | The model code for identification purposes.          |
| image_url |          | string    | `https://d2s0ynfc62ej12.cloudfront.net/image/AdobeStock_125577546.jpeg` | URL to an image of the model.                        |

#### Extend the data import configuration

**/data/import/local/full_EU.yml**

```yaml
# ...
# SelfServicePortal
- data_entity: ssp-model
  source: data/import/common/common/ssp_model.csv
```

### Register the following data import plugins

| PLUGIN                   | SPECIFICATION                         | PREREQUISITES | NAMESPACE                                                            |
|--------------------------|---------------------------------------|---------------|----------------------------------------------------------------------|
| SspModelDataImportPlugin | Imports a ssp model into persistence. |               | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\DataImport\SspModelDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface>
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new SspModelDataImportPlugin(),
        ];
    }
}
```

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
        ];

        return $commands;
    }
}
```

### Import the data

```bash
console data:import:ssp-model
```

{% info_block warningBox "Verification" %}

Make sure the configured data has been added to the following database tables:

- `spy_ssp_model`
- `spy_ssp_model_storage`

{% endinfo_block %}

