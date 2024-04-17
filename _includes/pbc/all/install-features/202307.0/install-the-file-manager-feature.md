


This document describes how to install the [File Manager feature](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/file-manager-feature-overview.html).

## Install feature core

Follow the steps below to install the File Manager feature core.

### Prerequisites

Install the required features:

| NAME         | VERSION          | INSTALLATION GUIDE                                                                                                                                           |
|--------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |

### 1) Install the required modules

```bash
composer require spryker-feature/file-manager:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                | EXPECTED DIRECTORY                      |
|-----------------------|-----------------------------------------|
| FileManager           | vendor/spryker/file-manager             |
| FileManagerDataImport | vendor/spryker/file-manager-data-import |
| FileManagerGui        | vendor/spryker/file-manager-gui         |
| FileManagerStorage    | vendor/spryker/file-manager-storage     |

{% endinfo_block %}

### 2) Set up the database schema

1. Adjust the schema definition so entity changes trigger events:

**src/Pyz/Zed/FileManager/Persistence/Propel/Schema/spy_file_manager.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\FileManager\Persistence" package="src.Orm.Zed.FileManager.Persistence">

   <table name="spy_file">
      <behavior name="event">
         <parameter name="spy_file_all" column="*"/>
      </behavior>
   </table>

   <table name="spy_file_info">
      <behavior name="event">
         <parameter name="spy_file_info_all" column="*"/>
      </behavior>
   </table>

   <table name="spy_file_localized_attributes">
      <behavior name="event">
         <parameter name="spy_file_localized_attributes_all" column="*"/>
      </behavior>
   </table>

   <table name="spy_file_directory_localized_attributes">
      <behavior name="event">
         <parameter name="spy_file_directory_localized_attributes_all" column="*"/>
      </behavior>
   </table>
</database>
```

**src/Pyz/Zed/FileManagerStorage/Persistence/Propel/Schema/spy_file_storage.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\FileManagerStorage\Persistence" package="src.Orm.Zed.FileManagerStorage.Persistence">

    <table name="spy_file_storage">
        <behavior name="synchronization">
            <parameter name="queue_pool" value="synchronizationPool"/>
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

Make sure the following changes have been applied in the database::

| DATABASE ENTITY                         | TYPE    | EVENT   |
|-----------------------------------------|---------|---------|
| spy_file                                | table   | created |
| spy_file_info                           | table   | created |
| spy_file_localized_attributes           | table   | created |
| spy_file_directory                      | table   | created |
| spy_file_directory_localized_attributes | table   | created |
| spy_mime_type                           | table   | created |
| spy_file_storage                        | table   | created |

Ensure the following transfers have been created:

| TRANSFER                         | TYPE  | EVENT   | PATH                                                                   |
|----------------------------------|-------|---------|------------------------------------------------------------------------|
| DataImporterConfiguration        | class | created | src/Generated/Shared/Transfer/DataImporterConfigurationTransfer        |
| DataImporterReport               | class | created | src/Generated/Shared/Transfer/DataImporterReportTransfer               |
| FileManagerData                  | class | created | src/Generated/Shared/Transfer/FileManagerDataTransfer                  |
| File                             | class | created | src/Generated/Shared/Transfer/FileTransfer                             |
| FileUpload                       | class | created | src/Generated/Shared/Transfer/FileUploadTransfer                       |
| FileInfo                         | class | created | src/Generated/Shared/Transfer/FileInfoTransfer                         |
| FileLocalizedAttributes          | class | created | src/Generated/Shared/Transfer/FileLocalizedAttributesTransfer          |
| FileDirectory                    | class | created | src/Generated/Shared/Transfer/FileDirectoryTransfer                    |
| FileDirectoryLocalizedAttributes | class | created | src/Generated/Shared/Transfer/FileDirectoryLocalizedAttributesTransfer |
| FileDirectoryTree                | class | created | src/Generated/Shared/Transfer/FileDirectoryTreeTransfer                |
| FileDirectoryTreeNode            | class | created | src/Generated/Shared/Transfer/FileDirectoryTreeNodeTransfer            |
| FileStorageData                  | class | created | src/Generated/Shared/Transfer/FileStorageDataTransfer                  |
| FileStorage                      | class | created | src/Generated/Shared/Transfer/FilterTransfer                           |
| Filter                           | class | created | src/Generated/Shared/Transfer/FileSystemStreamTransfer                 |
| FileSystemStream                 | class | created | src/Generated/Shared/Transfer/FileSystemStreamTransfer                 |
| FileSystemQuery                  | class | created | src/Generated/Shared/Transfer/FileSystemQueryTransfer                  |
| FileSystemContent                | class | created | src/Generated/Shared/Transfer/FileSystemContentTransfer                |
| FileSystemDelete                 | class | created | src/Generated/Shared/Transfer/FileSystemDeleteTransfer                 |
| FileSystemDeleteDirectory        | class | created | src/Generated/Shared/Transfer/FileSystemDeleteDirectoryTransfer        |
| FileSystemRename                 | class | created | src/Generated/Shared/Transfer/FileSystemRenameTransfer                 |
| FileSystemCopy                   | class | created | src/Generated/Shared/Transfer/FileSystemCopyTransfer                   |
| FileSystemCreateDirectory        | class | created | src/Generated/Shared/Transfer/FileSystemCreateDirectoryTransfer        |
| FileSystemList                   | class | created | src/Generated/Shared/Transfer/FileSystemListTransfer                   |
| FileSystemVisibility             | class | created | src/Generated/Shared/Transfer/FileSystemVisibilityTransfer             |
| FileInfoLocalizedAttributes      | class | created | src/Generated/Shared/Transfer/FileInfoLocalizedAttributesTransfer      |
| Locale                           | class | created | src/Generated/Shared/Transfer/LocaleTransfer                           |
| MimeType                         | class | created | src/Generated/Shared/Transfer/MimeTypeTransfer                         |
| MimeTypeCollection               | class | created | src/Generated/Shared/Transfer/MimeTypeCollectionTransfer               |
| MimeTypeResponse                 | class | created | src/Generated/Shared/Transfer/MimeTypeResponseTransfer                 |
| SynchronizationData              | class | created | src/Generated/Shared/Transfer/SynchronizationDataTransfer              |
| TabsView                         | class | created | src/Generated/Shared/Transfer/TabsViewTransfer                         |
| TabItem                          | class | created | src/Generated/Shared/Transfer/TabItemTransfer                          |

{% endinfo_block %}

## 3) Set up the configuration

3. Add the following configuration to your project:

{% info_block warningBox "Note" %}

The web server's maximum file size configuration - `max-request-body-size` has higher priority then the module configuration and can be adjusted using `deploy.*.yml`.
For additional details, refer to the [Docker SDK configuration reference](/docs/dg/dev/sdks/the-docker-sdk/docker-sdk-configuration-reference.html)

{% endinfo_block %}

| CONFIGURATION                                  | SPECIFICATION         | NAMESPACE                     |
|------------------------------------------------|-----------------------|-------------------------------|
| FileManagerConstants::STORAGE_NAME             | Storage name          | Spryker\Shared\FileManager    |
| FileManagerGuiConstants::DEFAULT_FILE_MAX_SIZE | Default max file size | Spryker\Shared\FileManagerGui |

**config/Shared/config_default.php**

```php
use Spryker\Shared\FileManager\FileManagerConstants;
use Spryker\Shared\FileManagerGui\FileManagerGuiConstants;

$config[FileManagerConstants::STORAGE_NAME] = 'files';
$config[FileManagerGuiConstants::DEFAULT_FILE_MAX_SIZE] = '10M';
```

### 4) Import data

repare import data according to your requirements using demo data:

**data/import/common/common/mime_type.csv**

```csv
name,is_allowed
text/csv,0
```

#### Set up configuration

1. Add the importer configuration:

**data/import/local/full_EU.yml**

```yml
version: 0

actions:
    - data_entity: mime-type
      source: data/import/common/common/mime_type.csv
```

2. Adjust the data import configuration:

**src/Pyz/Zed/DataImport/DataImportConfig.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportConfig as SprykerDataImportConfig;
use Spryker\Zed\FileManagerDataImport\FileManagerDataImportConfig;

class DataImportConfig extends SprykerDataImportConfig
{
    /**
     * @return array<string>
     */
    public function getFullImportTypes(): array
    {
        return [            
            FileManagerDataImportConfig::IMPORT_TYPE_MIME_TYPE,
        ];
    }
}
```

#### Set up behavior

Enable the following behavior:

| PLUGIN                        | SPECIFICATION            | PREREQUISITES | NAMESPACE                                               |
|-------------------------------|--------------------------|---------------|---------------------------------------------------------|
| FileManagerDataImportPlugin   | Imports mime types data. |               | Spryker\Zed\FileManagerDataImport\Communication\Plugin  |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\FileManagerDataImport\Communication\Plugin\FileManagerDataImportPlugin;
use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface>
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new FileManagerDataImportPlugin(),
        ];
    }
}
```

#### Run import

```bash
console data:import mime-type
```

{% info_block warningBox "Verification" %}

Make sure that the imported data is added to the `spy_mime_type` table.

{% endinfo_block %}

### 5) Set up storage configuration

**src/Pyz/Zed/FileManagerStorage/FileManagerStorageConfig.php**

```php
<?php

namespace Pyz\Zed\FileManagerStorage;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Shared\Publisher\PublisherConfig;
use Spryker\Zed\FileManagerStorage\FileManagerStorageConfig as SprykerFileManagerStorageConfig;

class FileManagerStorageConfig extends SprykerFileManagerStorageConfig
{
    /**
     * @return string|null
     */
    public function getFileManagerSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }

    /**
     * @return string|null
     */
    public function getEventQueueName(): ?string
    {
        return PublisherConfig::PUBLISH_QUEUE;
    }
}
```

#### Set up RabbitMQ configuration

**src/Pyz/Client/RabbitMq/RabbitMqConfig.php**

```php
<?php

namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
use Spryker\Shared\FileManagerStorage\FileManagerStorageConstants;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
/**
     * @return array<mixed>
     */
    protected function getSynchronizationQueueConfiguration(): array
    {
        return [
            FileManagerStorageConstants::FILE_SYNC_STORAGE_QUEUE,
        ];
    }

}
```

### 6) Set up the following behaviors

| PLUGIN                                            | DESCRIPTION                                                                                                        | PREREQUISITES | NAMESPACE                                                            |
|---------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|---------------|----------------------------------------------------------------------|
| FileManagerStorageSubscriber                      | Registers listeners that are responsible for publishing file information to storage when a related entity changes. |               | Spryker\Zed\FileManagerStorage\Communication\Plugin\Event\Subscriber |
| SynchronizationStorageQueueMessageProcessorPlugin | Reads messages from the synchronization queue and saves them to the storage.                                       |               | Spryker\Zed\Synchronization\Communication\Plugin\Queue               |
| FileSynchronizationDataBulkPlugin                 | Allows synchronizing the entire storage table content into Storage.                                                |               | Spryker\Zed\Synchronization\Communication\Plugin\Queue               |
| FileManagerPublisherTriggerPlugin                 | Allows publishing or re-publishing price product storage data manually.                                            |               | Spryker\Zed\FileManagerStorage\Communication\Plugin\Publisher        |

**src/Pyz/Zed/Event/EventDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Event;

use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;
use Spryker\Zed\FileManagerStorage\Communication\Plugin\Event\Subscriber\FileManagerStorageSubscriber;

class EventDependencyProvider extends SprykerEventDependencyProvider
{
    /**
     * @return \Spryker\Zed\Event\Dependency\EventSubscriberCollectionInterface
     */
    public function getEventSubscriberCollection(): EventSubscriberCollectionInterface
    {
        $eventSubscriberCollection = parent::getEventSubscriberCollection();

        /* Storage Events */
        $eventSubscriberCollection->add(new FileManagerStorageSubscriber());

        return $eventSubscriberCollection;
    }
}
```

**src/Pyz/Zed/Queue/QueueDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Queue;

use Spryker\Shared\FileManagerStorage\FileManagerStorageConstants;
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
            FileManagerStorageConstants::FILE_SYNC_STORAGE_QUEUE => new SynchronizationStorageQueueMessageProcessorPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\FileManagerStorage\Communication\Plugin\Synchronization\FileSynchronizationDataBulkPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface>
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new FileSynchronizationDataBulkPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\FileManagerStorage\Communication\Plugin\Publisher\FileManagerPublisherTriggerPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface>
     */
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            new FileManagerPublisherTriggerPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

When a file data is created, updated, or deleted, make sure it is exported or removed from Redis accordingly.

{% endinfo_block %}
