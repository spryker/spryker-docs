

## Install feature core

### 1)  Install the required modules using Composer

Run the following command to install the required modules:

```bash
composer require spryker/data-import:"1.5.0" spryker/data-import-extension:"1.1.0" --update-with-dependencies`
```

{% info_block warningBox “Verification” %}

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

{% info_block warningBox “Verification” %}

Make sure that the following changes have been applied in the transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| DataSetItem | class | created | src/Generated/Shared/Transfer/DataSetItemTransfer.php |
| QueueWriterConfiguration | class | created | src/Generated/Shared/Transfer/QueueWriterConfigurationTransfer.php |
| DataImporterQueueDataImporterConfiguration | class | created | src/Generated/Shared/Transfer/DataImporterQueueDataImporterConfigurationTransfer.php |
| DataImporterQueueReaderConfiguration | class | created | src/Generated/Shared/Transfer/DataImporterQueueReaderConfigurationTransfer.php |

{% endinfo_block %}
