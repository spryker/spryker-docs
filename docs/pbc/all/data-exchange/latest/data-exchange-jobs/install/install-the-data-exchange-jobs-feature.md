---
title: Install the Data Exchange Jobs feature
description: Learn how to install the Data Exchange Jobs feature, the engine behind the Back Office Import & Export pages, into your Spryker project.
last_updated: Oct 29, 2026
template: feature-integration-guide-template
---

This document describes how to install the Data Exchange Jobs feature: the engine that stores import jobs and runs, processes uploaded files, and provides the Back Office **Import & Export** pages. The engine imports and exports no data on its own; a data type is added by registering a schema plugin. To install the product data type, see [Install the Back Office Product CSV Import and Export feature](/docs/pbc/all/product-experience-management/latest/install/install-the-back-office-product-csv-import-and-export-feature.html). To add your own data type, see [Add a custom data type to Data Exchange Jobs](/docs/pbc/all/data-exchange/latest/data-exchange-jobs/tutorials-and-howtos/add-a-custom-data-type-to-data-exchange-jobs.html).

## Prerequisites

Install the required features:

| NAME | VERSION | REQUIRED |
| --- | --- | --- |
| Spryker Core | {{page.release_tag}} | Required |
| File System | {{page.release_tag}} | Required |

## Install feature core

### 1) Install the required modules

```bash
composer require spryker/data-exchange:"{{page.release_tag}}" spryker/data-exchange-extension:"{{page.release_tag}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| DataExchange | vendor/spryker/data-exchange |
| DataExchangeExtension | vendor/spryker/data-exchange-extension |

{% endinfo_block %}

### 2) Set up configuration

#### Filesystems

The engine reads uploaded files from and writes exported files to two named filesystem entries: `data-exchange-imports` and `data-exchange-exports`. The names are returned by `getImportFileSystemName()` and `getExportFileSystemName()` of `DataExchangeConfig`; override the methods on the project level if you need different names.

##### Production (S3)

**config/Shared/config_default.php**

To enable an IAM role configuration, use `IamAws3v3FilesystemBuilderPlugin`:

```php
use Spryker\Service\FlysystemAws3v3FileSystem\Plugin\Flysystem\IamAws3v3FilesystemBuilderPlugin;
use Spryker\Shared\FileSystem\FileSystemConstants;

$config[FileSystemConstants::FILESYSTEM_SERVICE] = [
    // ... existing entries ...
    'data-exchange-imports' => [
        'sprykerAdapterClass' => IamAws3v3FilesystemBuilderPlugin::class,
        'bucket' => getenv('SPRYKER_S3_PEM_IMPORT_BUCKET') ?: '',
        'region' => getenv('AWS_REGION') ?: '',
        'path' => 'data-exchange-imports/',
    ],
    'data-exchange-exports' => [
        'sprykerAdapterClass' => IamAws3v3FilesystemBuilderPlugin::class,
        'bucket' => getenv('SPRYKER_S3_PEM_EXPORT_BUCKET') ?: '',
        'region' => getenv('AWS_REGION') ?: '',
        'path' => 'data-exchange-exports/',
    ],
];
```

{% info_block warningBox "IAM authentication required" %}

These filesystems authenticate through the IAM role attached to the workload, which resolves AWS credentials automatically. Access keys (`key` and `secret`) are not supported. The environment variable names keep the `SPRYKER_S3_PEM_` prefix of the module the engine was extracted from, so existing cloud environments need no changes. For more details, see [AWS S3 filesystem builder plugins](/docs/dg/dev/backend-development/data-manipulation/data-ingestion/structural-preparations/flysystem.html#aws-s3-filesystem-builder-plugins).

{% endinfo_block %}

##### Development (local filesystem)

**config/Shared/config_default-docker.dev.php**

```php
use Spryker\Service\FlysystemLocalFileSystem\Plugin\Flysystem\LocalFilesystemBuilderPlugin;
use Spryker\Shared\FileSystem\FileSystemConstants;

$config[FileSystemConstants::FILESYSTEM_SERVICE]['data-exchange-imports'] = [
    'sprykerAdapterClass' => LocalFilesystemBuilderPlugin::class,
    'root' => '/data',
    'path' => '/data/data-exchange-imports',
];

$config[FileSystemConstants::FILESYSTEM_SERVICE]['data-exchange-exports'] = [
    'sprykerAdapterClass' => LocalFilesystemBuilderPlugin::class,
    'root' => '/data',
    'path' => '/data/data-exchange-exports',
];
```

{% info_block warningBox "Verification" %}

Make sure the filesystem directories exist and are writable by the application. For local development, verify that the `/data/data-exchange-imports` and `/data/data-exchange-exports` directories are created inside the Docker container.

{% endinfo_block %}

#### Engine limits and error display

The following settings are defined in `Spryker\Zed\DataExchange\DataExchangeConfig`:

| SETTING | DEFAULT | DESCRIPTION |
| --- | --- | --- |
| `IMPORT_CSV_BATCH_SIZE` | `1000` | Number of CSV rows handed to the import steps at once. |
| `EXPORT_CSV_BATCH_SIZE` | `1000` | Number of rows the export data provider returns at once. |
| `IMPORT_MAX_FILE_SIZE_MB` | `50` | Maximum size of an uploaded CSV file in megabytes. |
| `IMPORT_ERROR_DISPLAY_THRESHOLD` | `10` | Maximum number of import errors displayed inline on the import job run detail page. When a run produces more errors than this threshold, the errors are offered as a downloadable summary instead. |
| `getAllowedMimeTypesWithExtensions()` | `text/csv`, `text/plain` | MIME types accepted by the upload form. |

To change the defaults, extend the module configuration on the project level:

**src/Pyz/Zed/DataExchange/DataExchangeConfig.php**

```php
<?php

namespace Pyz\Zed\DataExchange;

use Spryker\Zed\DataExchange\DataExchangeConfig as SprykerDataExchangeConfig;

class DataExchangeConfig extends SprykerDataExchangeConfig
{
    protected const int IMPORT_ERROR_DISPLAY_THRESHOLD = 20;
}
```

### 3) Set up the database schema and transfer objects

Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY | TYPE | EVENT |
| --- | --- | --- |
| spy_import_job | table | created |
| spy_import_job_run | table | created |
| spy_import_job_run_error | table | created |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure the following changes in transfer objects have been applied:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| ImportJob | class | created | src/Generated/Shared/Transfer/ImportJobTransfer |
| ImportJobRun | class | created | src/Generated/Shared/Transfer/ImportJobRunTransfer |
| ImportJobRunFileInfo | class | created | src/Generated/Shared/Transfer/ImportJobRunFileInfoTransfer |
| ImportJobRunError | class | created | src/Generated/Shared/Transfer/ImportJobRunErrorTransfer |
| ImportJobCollection | class | created | src/Generated/Shared/Transfer/ImportJobCollectionTransfer |
| ImportJobRunCollection | class | created | src/Generated/Shared/Transfer/ImportJobRunCollectionTransfer |
| ImportJobRunErrorCollection | class | created | src/Generated/Shared/Transfer/ImportJobRunErrorCollectionTransfer |
| ImportJobRunCollectionRequest | class | created | src/Generated/Shared/Transfer/ImportJobRunCollectionRequestTransfer |
| ImportJobRunCollectionResponse | class | created | src/Generated/Shared/Transfer/ImportJobRunCollectionResponseTransfer |
| ImportJobCollectionRequest | class | created | src/Generated/Shared/Transfer/ImportJobCollectionRequestTransfer |
| ImportJobCollectionResponse | class | created | src/Generated/Shared/Transfer/ImportJobCollectionResponseTransfer |
| ImportJobCriteria | class | created | src/Generated/Shared/Transfer/ImportJobCriteriaTransfer |
| ImportJobConditions | class | created | src/Generated/Shared/Transfer/ImportJobConditionsTransfer |
| ImportJobRunCriteria | class | created | src/Generated/Shared/Transfer/ImportJobRunCriteriaTransfer |
| ImportJobRunConditions | class | created | src/Generated/Shared/Transfer/ImportJobRunConditionsTransfer |
| ImportJobRunErrorCriteria | class | created | src/Generated/Shared/Transfer/ImportJobRunErrorCriteriaTransfer |
| ImportJobRunErrorConditions | class | created | src/Generated/Shared/Transfer/ImportJobRunErrorConditionsTransfer |
| ImportJobExportResult | class | created | src/Generated/Shared/Transfer/ImportJobExportResultTransfer |
| ImportStepResponse | class | created | src/Generated/Shared/Transfer/ImportStepResponseTransfer |
| ImportStepError | class | created | src/Generated/Shared/Transfer/ImportStepErrorTransfer |
| ImportPublishEvent | class | created | src/Generated/Shared/Transfer/ImportPublishEventTransfer |

{% endinfo_block %}

### 4) Register the schema plugins

The engine learns about job types from the schema plugins registered in the `DataExchange` dependency provider. Register one plugin per data type. The following example registers the product data type of the Product Experience Management capability; see [Add a custom data type to Data Exchange Jobs](/docs/pbc/all/data-exchange/latest/data-exchange-jobs/tutorials-and-howtos/add-a-custom-data-type-to-data-exchange-jobs.html) for your own types.

<div class="width-100">

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductCsvImportSchemaPlugin | Provides the *products-csv-import* job type: its column schema, import steps, export steps, and placeholder values. | Product Experience Management feature | SprykerFeature\Zed\ProductExperienceManagement\Communication\Plugin |

</div>

**src/Pyz/Zed/DataExchange/DataExchangeDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataExchange;

use Spryker\Zed\DataExchange\DataExchangeDependencyProvider as SprykerDataExchangeDependencyProvider;
use SprykerFeature\Zed\ProductExperienceManagement\Communication\Plugin\ProductCsvImportSchemaPlugin;

class DataExchangeDependencyProvider extends SprykerDataExchangeDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\DataExchangeExtension\Dependency\Plugin\ImportSchemaPluginInterface>
     */
    protected function getImportSchemaPlugins(): array
    {
        return [
            new ProductCsvImportSchemaPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\DataExchangeExtension\Dependency\Plugin\ExportSchemaPluginInterface>
     */
    protected function getExportSchemaPlugins(): array
    {
        return [
            new ProductCsvImportSchemaPlugin(),
        ];
    }
}
```

`getImportSchemaPlugins()` serves the import, the template download, and the job creation; `getExportSchemaPlugins()` serves the export with data. A type that is not exportable is registered in the import stack only. The same dependency provider offers `getImportPreProcessorPlugins()` and `getImportPostProcessorPlugins()` for plugins that run once before and once after the rows of a run are processed.

{% info_block warningBox "Verification" %}

Log in to the Back Office, go to **Import & Export&nbsp;> Import**, and click **Create Import Job**. Make sure that every registered job type is offered in the **Type** field.

{% endinfo_block %}

### 5) Configure navigation

Add the following entry to the Back Office navigation:

**config/Zed/navigation.xml**

```xml
<import-export>
    <label>Import &amp; Export</label>
    <title>Import &amp; Export</title>
    <icon>swap_vert</icon>
    <pages>
        <import>
            <label>Import</label>
            <title>Import</title>
            <bundle>data-exchange</bundle>
            <controller>job</controller>
            <action>index</action>
            <visible>1</visible>
        </import>
        <export>
            <label>Export</label>
            <title>Export</title>
            <bundle>data-exchange</bundle>
            <controller>export</controller>
            <action>index</action>
            <visible>1</visible>
        </export>
    </pages>
</import-export>
```

Build the navigation cache:

```bash
console navigation:cache:remove
```

{% info_block warningBox "Verification" %}

Log in to the Back Office and verify that the **Import & Export** section appears in the main navigation with the **Import** and **Export** sub-items.

{% endinfo_block %}

### 6) Set up console

#### Register the console command

Register the `import:job:run` console command that processes pending import job runs:

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
use Spryker\Zed\DataExchange\Communication\Console\ImportJobRunConsole;

// In getConsoleCommands():
new ImportJobRunConsole(),
```

{% info_block warningBox "Verification" %}

Execute the following and verify it completes without errors:

```bash
console import:job:run
```

The command prints `Processing next pending import job run...` and `Done.` and exits with code 0. It processes the oldest pending import job run; when no run is pending, nothing is processed.

{% endinfo_block %}

#### Configure the scheduler

Register the command to run on a schedule so that pending runs are picked up automatically:

**src/Pyz/SymfonyScheduler/src/Pyz/Client/SymfonyScheduler/SymfonySchedulerConfig.php**

```php
'import-job-run' => [
    'command' => '$PHP_BIN vendor/bin/console import:job:run',
    'schedule' => '* * * * *',
],
```

Add the entry to the array that `getJobs()` returns. If the other entries in your file prefix the command with the `$logger` variable to redirect the output to the scheduler log, prefix this one in the same way.

{% info_block warningBox "Verification" %}

Verify that the scheduler configuration is loaded:

```bash
console scheduler:setup
```

Check that `import-job-run` appears in the list of scheduled jobs.

{% endinfo_block %}

### 7) Build the Back Office frontend

The **Export** page ships a JavaScript entry point. Build the Back Office frontend to publish it:

```bash
console frontend:zed:build
```

{% info_block warningBox "Verification" %}

Log in to the Back Office, go to **Import & Export&nbsp;> Export**, select a job, and make sure that the download link changes to the selected job.

{% endinfo_block %}
