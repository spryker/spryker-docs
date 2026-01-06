

## Install feature core

Follow the steps below to install feature core.

### 1) Install the required modules

Install the required modules:

```bash
composer require spryker/data-export:"^0.2.0" spryker/data-export-extension:"^0.1.0" spryker/sales-data-export:"^0.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE              | EXPECTED DIRECTORY                   |
|---------------------|--------------------------------------|
| DataExport          | vendor/spryker/data-export           |
| DataExportExtension | vendor/spryker/data-export-extension |
| SalesDataExport     | vendor/spryker/sales-data-export     |

{% endinfo_block %}

### 2) Set up transfer objects

1. Generate transfer changes:

```bash
vendor/bin/console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have occurred in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| DataExportBatch | class | created | src/Generated/Shared/Transfer/DataExportBatchTransfer.php |
| DataExportConfiguration | class | created |src/Generated/Shared/Transfer/DataExportConfigurationTransfer.php |
| DataExportConfigurations | class | created | src/Generated/Shared/Transfer/DataExportConfigurationsTransfer.php |
| DataExportConnectionConfiguration | class | created | src/Generated/Shared/Transfer/DataExportConnectionConfigurationTransfer.php |
| DataExportFormatConfiguration | class | created | src/Generated/Shared/Transfer/DataExportFormatConfigurationTransfer.php |
| DataExportFormatResponse | class | created | src/Generated/Shared/Transfer/DataExportFormatResponseTransfer.php |
| DataExportReport | class | created | src/Generated/Shared/Transfer/DataExportReportTransfer.php |
| DataExportResult | class | created | src/Generated/Shared/Transfer/DataExportResultTransfer.php |
| DataExportWriteResponse | class | created | src/Generated/Shared/Transfer/DataExportWriteResponseTransfer.php |

{% endinfo_block %}

### 3) Set up behavior

1. Register the console command in `ConsoleDependencyProvider`.

| COMMAND           | SPECIFICATION     | PREREQUISITES | NAMESPACE                                    |
|-------------------|-------------------|---------------|----------------------------------------------|
| DataExportConsole | Runs data export. |               | Spryker\Zed\DataExport\Communication\Console |

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\DataExport\Communication\Console\DataExportConsole;
use Spryker\Zed\Kernel\Container;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Symfony\Component\Console\Command\Command[]
     */
    protected function getConsoleCommands(Container $container): array
    {
        $commands = [
            new DataExportConsole(),
        ];

        return $commands;
    }
}
```

{% info_block warningBox "Verification" %}

Run `vendor/bin/console list` and make sure that the `data:export` command is on the list of the available commands.

{% endinfo_block %}

2. Add the data export configuration .yml file to the `data/export/config` folder:

<details>
  <summary>Data export config file</summary>

```yml
version: 1

defaults:
    filter_criteria: &default_filter_criteria
        order_created_at:
            type: between
            from: '2020-05-01 00:00:00'
            to: '2020-12-31 23:59:59'

actions:
    - data_entity: order-expense
      destination: '{data_entity}s_DE_{timestamp}.{extension}'
      filter_criteria:
          <<: *default_filter_criteria
          store_name: [DE]
    - data_entity: order-expense
      destination: '{data_entity}s_AT_{timestamp}.{extension}'
      filter_criteria:
          <<: *default_filter_criteria
          store_name: [AT]

    - data_entity: order-item
      destination: '{data_entity}s_DE_{timestamp}.{extension}'
      filter_criteria:
          <<: *default_filter_criteria
          store_name: [DE]
    - data_entity: order-item
      destination: '{data_entity}s_AT_{timestamp}.{extension}'
      filter_criteria:
          <<: *default_filter_criteria
          store_name: [AT]

    - data_entity: order
      destination: '{data_entity}s_DE_{timestamp}.{extension}'
      filter_criteria:
          <<: *default_filter_criteria
          store_name: [DE]
    - data_entity: order
      destination: '{data_entity}s_AT_{timestamp}.{extension}'
      filter_criteria:
          <<: *default_filter_criteria
          store_name: [AT]
 ```

 </details>

 3. Activate the following plugins:

| PLUGIN                                 | SPECIFICATION                                 | PREREQUISITES | NAMESPACE                                                   |
|----------------------------------------|-----------------------------------------------|---------------|-------------------------------------------------------------|
| OutputStreamDataExportConnectionPlugin | Writes a formatted data batch to the output stream. |               | Spryker\Service\DataExport\Plugin\DataExport                |
| OrderDataEntityExporterPlugin          | Adds the `order` data exporter.               |               | Spryker\Zed\SalesDataExport\Communication\Plugin\DataExport |
| OrderExpenseDataEntityExporterPlugin   | Adds the `order-expense` data exporter.       |               | Spryker\Zed\SalesDataExport\Communication\Plugin\DataExport |
| OrderItemDataEntityExporterPlugin      | Adds the `order-item` data exporter.          |               | Spryker\Zed\SalesDataExport\Communication\Plugin\DataExport |

**src/Pyz/Service/DataExport/DataExportDependencyProvider.php**

```php
<?php

namespace Pyz\Service\DataExport;

use Spryker\Service\DataExport\DataExportDependencyProvider as SprykerDataExportDependencyProvider;
use Spryker\Service\DataExport\Plugin\DataExport\OutputStreamDataExportConnectionPlugin;

class DataExportDependencyProvider extends SprykerDataExportDependencyProvider
{
    /**
     * @return list<\Spryker\Service\DataExportExtension\Dependency\Plugin\DataExportConnectionPluginInterface>
     */
    protected function getDataExportConnectionPlugins(): array
    {
        return [
            new OutputStreamDataExportConnectionPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/DataExport/DataExportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataExport;

use Spryker\Zed\DataExport\DataExportDependencyProvider as SprykerDataExportDependencyProvider;
use Spryker\Zed\SalesDataExport\Communication\Plugin\DataExport\OrderDataEntityExporterPlugin;
use Spryker\Zed\SalesDataExport\Communication\Plugin\DataExport\OrderExpenseDataEntityExporterPlugin;
use Spryker\Zed\SalesDataExport\Communication\Plugin\DataExport\OrderItemDataEntityExporterPlugin;

class DataExportDependencyProvider extends SprykerDataExportDependencyProvider
{
    /**
     * @return \Spryker\Zed\DataExportExtension\Dependency\Plugin\DataEntityExporterPluginInterface[]
     */
    protected function getDataEntityExporterPlugins(): array
    {
        return [
            new OrderDataEntityExporterPlugin(),
            new OrderItemDataEntityExporterPlugin(),
            new OrderExpenseDataEntityExporterPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Run the export:

```bash
vendor/bin/console data:export -c order_export_config.yml
```

Make sure the files with the exported data have been created in the `data/export` folder.

{% endinfo_block %}
