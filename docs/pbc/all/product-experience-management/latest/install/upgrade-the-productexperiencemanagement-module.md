---
title: Upgrade the ProductExperienceManagement module
description: Learn how to upgrade the ProductExperienceManagement module to the version that moves the Back Office CSV import and export engine to the DataExchange module.
last_updated: Oct 29, 2026
template: module-upgrade-guide-template
---

## Upgrade from version 4.0.* to version 4.1.0

*Estimated migration time: 1 hour*

Up to version 4.0.*, the `ProductExperienceManagement` module contained both the product CSV import and the engine that runs any CSV import: the `spy_import_job*` tables, the Back Office *Import & Export* pages, the `import:job:run` console command, and the plugin interfaces for import steps. From version 4.1.0, the engine lives in the new `spryker/data-exchange` module and the plugin interfaces in `spryker/data-exchange-extension`; together they form the [Data Exchange Jobs](/docs/pbc/all/data-exchange/latest/data-exchange-jobs/data-exchange-jobs-feature-overview.html) feature. `ProductExperienceManagement` keeps only the product plugin: `ProductCsvImportSchemaPlugin`, the product import and export steps, and `ProductCsvExportPlaceholderProvider`.

The database tables, the transfer objects, the console command name, and the Back Office menu are unchanged. The following table lists what moved and what the project has to adjust.

<div class="width-100">

| BEFORE 4.1.0 | FROM 4.1.0 |
| --- | --- |
| `SprykerFeature\Zed\ProductExperienceManagement\Business\Dependency\Plugin\*` interfaces | `Spryker\Zed\DataExchangeExtension\Dependency\Plugin\*` interfaces |
| `SprykerFeature\Zed\ProductExperienceManagement\Business\Export\PlaceholderProvider\ExportPlaceholderProviderInterface` | `Spryker\Zed\DataExchangeExtension\Dependency\Plugin\ColumnPlaceholderProviderInterface`, returned by `ImportSchemaPluginInterface::getPlaceholderProvider()` |
| `ProductExperienceManagementFacadeInterface` methods `getImportJobCollection()`, `createImportJobCollection()`, `createImportJobRunCollection()`, `getImportJobRunCollection()`, `getImportJobRunErrorCollection()`, `exportData()`, `processNextPendingRun()` | The same methods on `Spryker\Zed\DataExchange\Business\DataExchangeFacadeInterface` |
| `SprykerFeature\Zed\ProductExperienceManagement\Communication\Console\ImportJobRunConsole` | `Spryker\Zed\DataExchange\Communication\Console\ImportJobRunConsole` |
| `ProductExperienceManagementDependencyProvider::PLUGINS_IMPORT_SCHEMA`, `PLUGINS_IMPORT_PRE_PROCESSOR`, `PLUGINS_IMPORT_POST_PROCESSOR` | `DataExchangeDependencyProvider::getImportSchemaPlugins()`, `getImportPreProcessorPlugins()`, `getImportPostProcessorPlugins()` |
| Engine settings in `ProductExperienceManagementConfig`: `IMPORT_ERROR_DISPLAY_THRESHOLD`, `getImportCsvBatchSize()`, `getExportCsvBatchSize()`, `getImportMaxFileSizeString()`, `getAllowedMimeTypesWithExtensions()`, `getImportFileSystemName()`, `getExportFileSystemName()` | The same settings in `Spryker\Zed\DataExchange\DataExchangeConfig` |
| `Orm\Zed\ProductExperienceManagement\Persistence\SpyImportJob*` entities and queries | `Orm\Zed\DataExchange\Persistence\SpyImportJob*` |
| `ImportJob*`, `ImportStep*`, and `ImportPublishEvent` transfers defined in `ProductExperienceManagement` | The same transfers defined in `DataExchange` and `DataExchangeExtension` |
| Back Office URLs `/product-experience-management/{job,run,export,template}` | `/data-exchange/{job,run,export,template}` |
| Filesystem entries `product-experience-management-imports` and `product-experience-management-exports` | `data-exchange-imports` and `data-exchange-exports` |

</div>

To upgrade, follow the steps below.

### 1) Update the module

```bash
composer require spryker/data-exchange:"^0.1.0" spryker-feature/product-experience-management:"^4.1.0" --update-with-dependencies
```

The module requires `spryker/data-exchange-extension` only; the engine `spryker/data-exchange` is required by the project, as in the command above.

### 2) Register the product schema plugin

Before 4.1.0, the product plugin was registered in the module's own dependency provider. The engine now reads its plugins from the `DataExchange` dependency provider:

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

The engine resolves the import, the template download, and the job creation through `getImportSchemaPlugins()`, and the export with data through `getExportSchemaPlugins()`; the product plugin implements both sides, so it is registered in both stacks. If your project overrides `getImportSchemaPlugins()`, `getImportPreProcessorPlugins()`, or `getImportPostProcessorPlugins()` in `Pyz\Zed\ProductExperienceManagement\ProductExperienceManagementDependencyProvider`, move the overrides to the class above and remove them from the old provider.

### 3) Rename the filesystem entries

Rename the two entries under `FileSystemConstants::FILESYSTEM_SERVICE` in every configuration file where they are defined, usually `config/Shared/config_default.php` and the environment-specific files:

| OLD NAME | NEW NAME |
| --- | --- |
| `product-experience-management-imports` | `data-exchange-imports` |
| `product-experience-management-exports` | `data-exchange-exports` |

Keep the adapter, bucket, and path settings of each entry. The engine reads the files of existing import runs from the renamed entries, so the files remain accessible as long as the new entries point at the same storage. If you prefer to keep the old names, override `getImportFileSystemName()` and `getExportFileSystemName()` in `Pyz\Zed\DataExchange\DataExchangeConfig` instead.

### 4) Update the navigation

Point the **Import** and **Export** pages of the `import-export` node at the new bundle:

**config/Zed/navigation.xml**

```xml
<import>
    <bundle>data-exchange</bundle>
    <controller>job</controller>
    <action>index</action>
</import>
<export>
    <bundle>data-exchange</bundle>
    <controller>export</controller>
    <action>index</action>
</export>
```

### 5) Update the console command registration

Replace the import of the console command in `src/Pyz/Zed/Console/ConsoleDependencyProvider.php`:

```php
use Spryker\Zed\DataExchange\Communication\Console\ImportJobRunConsole;
```

The command name `import:job:run` and the scheduler entry `import-job-run` are unchanged.

### 6) Move engine configuration overrides

If your project overrides engine settings in `Pyz\Zed\ProductExperienceManagement\ProductExperienceManagementConfig`, move them to `Pyz\Zed\DataExchange\DataExchangeConfig`. This applies to `IMPORT_ERROR_DISPLAY_THRESHOLD`, `getImportCsvBatchSize()`, `getExportCsvBatchSize()`, `getImportMaxFileSizeString()`, `getAllowedMimeTypesWithExtensions()`, `getImportFileSystemName()`, and `getExportFileSystemName()`. The product-specific settings `getProductConcreteStatuses()` and `getProductConcreteStatusActive()` stay in `ProductExperienceManagementConfig`.

### 7) Update custom import steps and schema plugins

If your project contains its own import steps or schema plugins, update them as follows:

- Replace `implements \SprykerFeature\Zed\ProductExperienceManagement\Business\Dependency\Plugin\ImportStepInterface` with `implements \Spryker\Zed\DataExchangeExtension\Dependency\Plugin\ImportStepInterface`. Steps that extend `AbstractProductCsvImportStep` need no change; its `createImportStepError()` and `createImportPublishEvent()` helpers are unchanged. In `ProductCsvImportSearchStep`, `ProductCsvImportPriceStep`, and `ProductCsvImportPriceStoreStep`, the nullable helpers `resolveAbstractSku()` and `resolveConcreteSku()` were renamed to `findAbstractSku()` and `findConcreteSku()`; update subclasses that call them.
- Replace the imports of `ImportSchemaPluginInterface`, `ExportSchemaPluginInterface`, `ExportStepInterface`, `ExportDataProviderInterface`, `ImportPreProcessorPluginInterface`, and `ImportPostProcessorPluginInterface` with the interfaces of the same names in `Spryker\Zed\DataExchangeExtension\Dependency\Plugin`.
- Implement the new `getPlaceholderProvider()` method in every schema plugin. `getType()`, `getSchema()`, and `getPlaceholderProvider()` now live in `SchemaPluginInterface`, the parent of `ImportSchemaPluginInterface` and `ExportSchemaPluginInterface`; a plugin that implements the export side must also be registered in `getExportSchemaPlugins()`. It returns a `ColumnPlaceholderProviderInterface` with the values of the placeholders used in the plugin's schema. Before 4.1.0, the engine used the product placeholder provider for every job type.

### 8) Update Back Office ACL rules

Back Office ACL rules and group rules are defined by bundle, controller, and action. Rules that grant the Import & Export pages through the `product-experience-management` bundle no longer match the moved pages, so the affected users lose access after the upgrade. Add rules for the `data-exchange` bundle with the controllers `job`, `run`, `export`, and `template` to the same groups, or widen the existing rules, before the upgrade is deployed.

### 9) Update facade and entity references

- Replace calls to the removed `ProductExperienceManagementFacadeInterface` methods listed in the table above with the same methods on `DataExchangeFacadeInterface`, available through `$container->getLocator()->dataExchange()->facade()`.
- Replace references to `Orm\Zed\ProductExperienceManagement\Persistence\SpyImportJob*` classes with `Orm\Zed\DataExchange\Persistence\SpyImportJob*`.
- Replace links to `/product-experience-management/job`, `/product-experience-management/run`, `/product-experience-management/export`, and `/product-experience-management/template` with the `/data-exchange/` counterparts, including in end-to-end tests.

### 9) Regenerate the code and the caches

```bash
console transfer:generate
console propel:install
console navigation:build-cache
console router:cache:warm-up:backoffice
console translator:generate-cache
console cache:empty-all
```

Build the Back Office frontend so that the export page's JavaScript is published from its new location:

```bash
console frontend:zed:build
```

{% info_block warningBox "Verification" %}

Log in to the Back Office and verify the following:

- **Import & Export&nbsp;> Import** lists the existing import jobs, and **Create Import Job** offers **products-csv-import** as a type.
- Uploading a CSV file for an existing job creates a run, and `console import:job:run` processes it.
- **Import & Export&nbsp;> Export** downloads a CSV file for an existing job.

{% endinfo_block %}
