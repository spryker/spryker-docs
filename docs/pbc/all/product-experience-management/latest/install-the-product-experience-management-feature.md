---
title: Install the Product Experience Management feature
description: Learn how to install the Product Experience Management feature into your Spryker project.
last_updated: Apr 08 2026
template: feature-integration-guide-template
---

# Install the Product Experience Management feature

## Prerequisites

Install the required features:

| NAME | VERSION | REQUIRED |
| --- | --- | --- |
| Spryker Core | {{page.release_tag}} | Required |
| Product | {{page.release_tag}} | Required |
| Product Image | {{page.release_tag}} | Required |
| Price Product | {{page.release_tag}} | Required |
| Stock | {{page.release_tag}} | Required |
| Tax | {{page.release_tag}} | Required |
| Store | {{page.release_tag}} | Required |
| Locale | {{page.release_tag}} | Required |
| Category | {{page.release_tag}} | Required |
| Merchant | {{page.release_tag}} | Required |
| Shipment Type | {{page.release_tag}} | Required |
| File System | {{page.release_tag}} | Required |

## Install feature core

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/product-experience-management:"{{page.release_tag}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ProductExperienceManagement | vendor/spryker-feature/product-experience-management |

{% endinfo_block %}

### 2) Set up configuration

Configure the filesystem storage for import and export files. The feature requires two named filesystem entries: `product-experience-management-imports` and `product-experience-management-exports`.

#### Production (S3)

**config/Shared/config_default.php**

```php
use Spryker\Service\FlysystemAws3v3FileSystem\Plugin\Flysystem\Aws3v3FilesystemBuilderPlugin;
use Spryker\Shared\FileSystem\FileSystemConstants;

$config[FileSystemConstants::FILESYSTEM_SERVICE] = [
    // ... existing entries ...
    'product-experience-management-imports' => [
        'sprykerAdapterClass' => Aws3v3FilesystemBuilderPlugin::class,
        'key' => getenv('SPRYKER_S3_PEM_IMPORT_KEY') ?: '',
        'bucket' => getenv('SPRYKER_S3_PEM_IMPORT_BUCKET') ?: '',
        'secret' => getenv('SPRYKER_S3_PEM_IMPORT_SECRET') ?: '',
        'root' => '/',
        'path' => 'pem-imports/',
        'region' => getenv('SPRYKER_S3_PEM_IMPORT_REGION') ?: '',
        'version' => getenv('SPRYKER_S3_PEM_IMPORT_VERSION') ?: 'latest',
        'endpoint' => getenv('SPRYKER_S3_PEM_IMPORT_ENDPOINT') ?: null,
    ],
    'product-experience-management-exports' => [
        'sprykerAdapterClass' => Aws3v3FilesystemBuilderPlugin::class,
        'key' => getenv('SPRYKER_S3_PEM_EXPORT_KEY') ?: '',
        'bucket' => getenv('SPRYKER_S3_PEM_EXPORT_BUCKET') ?: '',
        'secret' => getenv('SPRYKER_S3_PEM_EXPORT_SECRET') ?: '',
        'root' => '/',
        'path' => 'pem-exports/',
        'region' => getenv('SPRYKER_S3_PEM_EXPORT_REGION') ?: '',
        'version' => getenv('SPRYKER_S3_PEM_EXPORT_VERSION') ?: 'latest',
        'endpoint' => getenv('SPRYKER_S3_PEM_EXPORT_ENDPOINT') ?: null,
    ],
];
```

#### Development (local filesystem)

**config/Shared/config_default-docker.dev.php**

```php
use Spryker\Service\FlysystemLocalFileSystem\Plugin\Flysystem\LocalFilesystemBuilderPlugin;
use Spryker\Shared\FileSystem\FileSystemConstants;

$config[FileSystemConstants::FILESYSTEM_SERVICE]['product-experience-management-imports'] = [
    'sprykerAdapterClass' => LocalFilesystemBuilderPlugin::class,
    'root' => '/data',
    'path' => '/data/pem-imports',
];

$config[FileSystemConstants::FILESYSTEM_SERVICE]['product-experience-management-exports'] = [
    'sprykerAdapterClass' => LocalFilesystemBuilderPlugin::class,
    'root' => '/data',
    'path' => '/data/pem-exports',
];
```

{% info_block warningBox "Verification" %}

Make sure the filesystem directories exist and are writable by the application. For local development, verify that `/data/pem-imports` and `/data/pem-exports` directories are created inside the Docker container.

{% endinfo_block %}

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
| ImportRowValidationCollection | class | created | src/Generated/Shared/Transfer/ImportRowValidationCollectionTransfer |
| ImportPublishEvent | class | created | src/Generated/Shared/Transfer/ImportPublishEventTransfer |

{% endinfo_block %}

### 4) Configure navigation

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
            <bundle>product-experience-management</bundle>
            <controller>job</controller>
            <action>index</action>
            <visible>1</visible>
        </import>
        <export>
            <label>Export</label>
            <title>Export</title>
            <bundle>product-experience-management</bundle>
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

Log in to the Back Office and verify that the **Import & Export** section appears in the main navigation with **Import** and **Export** sub-items.

{% endinfo_block %}

### 5) Set up console

#### Register the console command

Register the `import:job:run` console command that processes pending import job runs:

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
use SprykerFeature\Zed\ProductExperienceManagement\Communication\Console\ImportJobRunConsole;

// In getConsoleCommands():
new ImportJobRunConsole(),
```

{% info_block warningBox "Verification" %}

Run the following command and verify it completes without errors:

```bash
console import:job:run
```

The output should indicate that it processed the next pending import job run, or that no pending runs are available.

{% endinfo_block %}

#### Configure the scheduler

Register the import job run processor to run on a schedule so pending imports are picked up automatically:

**src/Pyz/Zed/SymfonyScheduler/SymfonySchedulerConfig.php**

```php
'import-job-run' => [
    'command' => $logger . '$PHP_BIN vendor/bin/console import:job:run',
    'schedule' => '* * * * *',
],
```

{% info_block warningBox "Verification" %}

Verify that the scheduler configuration is loaded:

```bash
console scheduler:setup
```

Check that `import-job-run` appears in the list of scheduled jobs.

{% endinfo_block %}
