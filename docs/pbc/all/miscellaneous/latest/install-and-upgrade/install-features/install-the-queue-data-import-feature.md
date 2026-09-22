---
title: Install the Queue Data Import feature
description: This guide will navigate you through the process of integrating the Queue Data feature in Spryker OS.
last_updated: Aug 6, 2026
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/queue-data-import-feature-integration
originalArticleId: 2181f26d-9254-4213-a2a8-e1544f9bdfea
redirect_from:
  - /2021080/docs/queue-data-import-feature-integration
  - /2021080/docs/en/queue-data-import-feature-integration
  - /docs/queue-data-import-feature-integration
  - /docs/en/queue-data-import-feature-integration
  - /docs/scos/dev/feature-integration-guides/202212.0/queue-data-import-feature-integration.html
  - /docs/scos/dev/feature-integration-guides/202204.0/queue-data-import-feature-integration.html
related:
  - title: Data import
    link: docs/dg/dev/data-import/latest/data-import.html
---

## Install feature core

### 1)  Install the required modules using Composer

Install the required modules using Composer:

```bash
composer require spryker/data-import:"1.5.0" spryker/data-import-extension:"1.1.0" --update-with-dependencies`
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
|DataImport |vendor/spryker/data-import|
|DataImportExtension| vendor/spryker/data-import-extension|

{% endinfo_block %}


### 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate`
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in the transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| DataSetItem | class | created | src/Generated/Shared/Transfer/DataSetItemTransfer.php |
| QueueWriterConfiguration | class | created | src/Generated/Shared/Transfer/QueueWriterConfigurationTransfer.php |
| DataImporterQueueDataImporterConfiguration | class | created | src/Generated/Shared/Transfer/DataImporterQueueDataImporterConfigurationTransfer.php |
| DataImporterQueueReaderConfiguration | class | created | src/Generated/Shared/Transfer/DataImporterQueueReaderConfigurationTransfer.php |

{% endinfo_block %}
