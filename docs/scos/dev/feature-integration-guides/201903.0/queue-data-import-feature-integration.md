---
title: Queue Data Import feature integration
description: This guide will navigate you through the process of integrating the Queue Data feature in Spryker OS.
last_updated: Nov 22, 2019
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v2/docs/queue-data-import-feature-integration
originalArticleId: c1e1efc8-672e-4799-8cef-37475a458e84
redirect_from:
  - /v2/docs/queue-data-import-feature-integration
  - /v2/docs/en/queue-data-import-feature-integration
---

## Install Feature Core

### 1)  Install the required modules using Composer

Run the following command to install the required modules:

```bash
composer require spryker/data-import:"1.5.0" spryker/data-import-extension:"1.1.0" --update-with-dependencies`
```

{% info_block warningBox “Verification” %}

Make sure that the following modules have been installed:

| Module |Expected Directory  |
| --- | --- |
|DataImport  | `vendor/spryker/data-import` |
|  DataImportExtension| `vendor/spryker/data-import-extension` |

{% endinfo_block %}

### 2) Set up Transfer Objects

Run the following command to generate transfer changes:

```bash
console transfer:generate`
```

{% info_block warningBox “Verification” %}
   
Make sure that the following changes have been applied in the transfer objects:

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `DataSetItem` | class | created | `src/Generated/Shared/Transfer/DataSetItemTransfer.php` |
| `QueueWriterConfiguration` | class | created | `src/Generated/Shared/Transfer/QueueWriterConfigurationTransfer.php` |
| `DataImporterQueueDataImporterConfiguration` | class | created | `src/Generated/Shared/Transfer/DataImporterQueueDataImporterConfigurationTransfer.php` |
| `DataImporterQueueReaderConfiguration` | class | created | `src/Generated/Shared/Transfer/DataImporterQueueReaderConfigurationTransfer.php` |

{% endinfo_block %}

<!-- Last review date: May 6, 2019- by Pavlo Asaulenko and Dmitry Beirak -->
