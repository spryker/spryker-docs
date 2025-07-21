


This document describes how to install the [Product Lists feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-lists-feature-overview.html).

## Install feature core

Follow the steps below to install the Product Lists feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE|
|---|---|---|
| Spryker Core | {{page.version}}  | [Install the Spryker Сore feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Product | {{page.version}}  | [Install the Product feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-feature.html) |
| Price | {{page.version}} | [Install the Prices feature](/docs/pbc/all/price-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-prices-feature.html)

### 1) Install the required modules

```bash
composer require spryker-feature/scheduled-prices:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| PriceProductSchedule | vendor/spryker/price-product-schedule |
| PriceProductScheduleDataImport | vendor/spryker/price-product-schedule-data-import |
| PriceProductScheduleGui | vendor/spryker/price-product-schedule-gui |

{% endinfo_block %}

### 2) Set up database schema and transfer objects

Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY | TYPE | EVENT |
| --- | --- | --- |
| spy_price_product_schedule | table | created |
| spy_price_product_schedule_list | table | created |

Make sure that the following changes in transfer objects have been applied:

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| PriceProductScheduleTransfer | class | created | src/Generated/Shared/Transfer/PriceProductScheduleTransfer |
| PriceProductScheduleCsvValidationResultTransfer | class | created | src/Generated/Shared/Transfer/PriceProductScheduleCsvValidationResultTransfer |
| PriceProductScheduleImportTransfer | class | created | src/Generated/Shared/Transfer/PriceProductScheduleImportTransfer |
| PriceProductScheduleImportMetaDataTransfer |     |     |     |
| PriceProductScheduleImportTransfer | class | created | src/Generated/Shared/Transfer/PriceProductScheduleImportMetaDataTransfer |
| PriceProductScheduleListTransfer | class | created | src/Generated/Shared/Transfer/PriceProductScheduleListTransfer |
| PriceProductScheduleListResponseTransfer | class | created | src/Generated/Shared/Transfer/PriceProductScheduleListResponseTransfer |
| PriceProductScheduleListImportRequestTransfer | class | created | src/Generated/Shared/Transfer/PriceProductScheduleListImportRequestTransfer |
| PriceProductScheduleListImportErrorTransfer |     |     |     |
| PriceProductScheduleImportTransfer | class | created | src/Generated/Shared/Transfer/PriceProductScheduleListImportErrorTransfer |
| PriceProductScheduleListImportResponseTransfer |     |     |     |
| PriceProductScheduleImportTransfer | class | created | src/Generated/Shared/Transfer/PriceProductScheduleListImportResponseTransfer |
| PriceProductScheduleListMetaDataTransfer | class | created | src/Generated/Shared/Transfer/PriceProductScheduleListMetaDataTransfer |
| PriceProductScheduleCriteriaFilterTransfer | class | created | src/Generated/Shared/Transfer/PriceProductScheduleCriteriaFilterTransfer |
| PriceProductScheduleResponseTransfer | class | created | src/Generated/Shared/Transfer/PriceProductScheduleResponseTransfer |
| PriceProductScheduleErrorTransfer | class | created | src/Generated/Shared/Transfer/PriceProductScheduleErrorTransfer |
| PriceProductScheduleRedirectTransfer | class | created | src/Generated/Shared/Transfer/PriceProductScheduleRedirectTransfer |
| SpyPriceProductScheduleEntityTransfer | class | created | src/Generated/Shared/Transfer/SpyPriceProductScheduleEntityTransfer |
| SpyPriceProductScheduleListEntityTransfer | class | created | src/Generated/Shared/Transfer/SpyPriceProductScheduleListEntityTransfer |

{% endinfo_block %}

### 3) Set up the configuration

Add the following configuration:

**src/Pyz/Zed/PriceProductScheduleGui/PriceProductScheduleGuiConfig.php**

```php
<?php

namespace Pyz\Zed\PriceProductScheduleGui;

use Spryker\Zed\PriceProductScheduleGui\PriceProductScheduleGuiConfig as SprykerPriceProductScheduleGuiConfig;

class PriceProductScheduleGuiConfig extends SprykerPriceProductScheduleGuiConfig
{
    /**
     * @var bool
     */
    protected const IS_FILE_EXTENSION_VALIDATION_ENABLED = true;
}
```

### 4) Import price product schedules

{% info_block infoBox "" %}

The following imported entities will be used as product price schedules in Spryker OS.

{% endinfo_block %}

1. Prepare your data according to your requirements using our demo data:

**vendor/spryker/spryker/Bundles/PriceProductScheduleDataImport/data/import**

```yaml
abstract_sku,concrete_sku,price_type,store,currency,value_net,value_gross,from_included,to_included
001,,DEFAULT,DE,CHF,9832,10924,2019-01-01T00:00:00-00:00,2019-12-31T23:59:59-00:00
001,,DEFAULT,DE,CHF,7762,8624,2019-05-01T00:00:00-00:00,2019-06-30T23:59:59-00:00
001,,DEFAULT,DE,CHF,3881,4312,2019-06-23T00:00:00-00:00,2019-07-19T23:59:59-00:00
001,,DEFAULT,DE,EUR,8549,9499,2019-01-01T00:00:00-00:00,2019-12-31T23:59:59-00:00
001,,DEFAULT,DE,EUR,6749,7499,2019-05-01T00:00:00-00:00,2019-06-30T23:59:59-00:00
001,,DEFAULT,DE,EUR,3375,3750,2019-06-23T00:00:00-00:00,2019-07-19T23:59:59-00:00
,060_26027598,DEFAULT,DE,CHF,30902,34337,2019-05-01T00:00:00-00:00,2019-06-30T23:59:59-00:00
,060_26027598,DEFAULT,DE,CHF,15451,17169,2019-06-23T00:00:00-00:00,2019-07-19T23:59:59-00:00
,060_26175504,DEFAULT,AT,CHF,32909,36566,2019-01-01T00:00:00-00:00,2019-12-31T23:59:59-00:00
,060_26175504,DEFAULT,AT,CHF,25981,28868,2019-05-01T00:00:00-00:00,2019-06-30T23:59:59-00:00
,060_26175504,DEFAULT,AT,CHF,12991,14434,2019-06-23T00:00:00-00:00,2019-07-19T23:59:59-00:00
,060_26175504,DEFAULT,AT,EUR,28616,31797,2019-01-01T00:00:00-00:00,2019-12-31T23:59:59-00:00
,060_26175504,DEFAULT,AT,EUR,22592,25103,2019-05-01T00:00:00-00:00,2019-06-30T23:59:59-00:00
,060_26175504,DEFAULT,AT,EUR,11296,12552,2019-06-23T00:00:00-00:00,2019-07-19T23:59:59-00:00
```

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| --- | --- | --- | --- | --- |
|  abstract_sku | optional | string | 001 | Existing abstract product SKU of the scheduled price. |
|  concrete_sku | optional | string | 060_26027598 | Existing concrete product SKU of the scheduled price. |
|  price_type | ✓ | string | DEFAULT | Name of a price type. By default, it's `DEFAULT`, but can be project specific (strike, sale, ...). |
|  store | ✓ | string | DE | Store name of the scheduled price. |
|  currency | ✓ | string | CHF | Currency ISO code. |
|  value_net | optional | integer | 9832 | Net price in cents. |
|  value_gross | optional | integer | 10924 | Gross price in cents. |
|  from_included | ✓ | datetime | 2019-01-01T00:00:00-00:00 | Start date of the scheduled price (should be less than `to_included`). |
|  to_included | ✓ | datetime | 2019-12-31T23:59:59-00:00 | End date of the scheduled price. |

2. Register the following plugin to enable data import:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| PriceProductScheduleDataImportPlugin | Imports scheduled prices data into database. | None |  \Spryker\Zed\PriceProductScheduleDataImport\Communication\Plugin |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\PriceProductScheduleDataImport\Communication\Plugin\PriceProductScheduleDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return array
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            new PriceProductScheduleDataImportPlugin(),
        ];
    }
}
```

3. Import data:

```bash
console data:import:product-price-schedule
```

{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the `spy_price_product_schedule` table in the database.

{% endinfo_block %}

### 5) Set up behavior

1. Enable the following behaviors by registering the console commands, view and tab plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
|  PriceProductScheduleApplyConsole | <ul><li>Applies scheduled prices for the current store.</li><li>Persists a price product store for the applied scheduled product price.</li><li>Disables irrelevant product price schedules for the applied scheduled products price.</li><li>Reverts product prices from the fallback price type for scheduled product prices that are finished.</li></ul> | None |  Spryker\Zed\PriceProductSchedule\Communication\Console |
|  PriceProductScheduleCleanupConsole | Deletes scheduled prices that have ended for the number of days provided as a parameter starting from the current date. | None |  Spryker\Zed\PriceProductSchedule\Communication\Console |
| ScheduledPriceProductConcreteFormEditTabsExpanderPlugin | Expands product concrete **Edit Product** page with the **Scheduled Prices** tab. | None |  Spryker\Zed\PriceProductScheduleGui\Communication\Plugin\ProductManagement|
| ScheduledPriceProductAbstractFormEditTabsExpanderPlugin | Expands product abstract **Edit Product** page with the **Scheduled Prices** tab. | None |  Spryker\Zed\PriceProductScheduleGui\Communication\Plugin\ProductManagement |
| ScheduledPriceProductAbstractEditViewExpanderPlugin | Expands the  **Scheduled Prices** tab of the **Edit Product abstract** page with scheduled prices data. | None |  Spryker\Zed\PriceProductScheduleGui\Communication\Plugin\ProductManagement |
| ScheduledPriceProductConcreteEditViewExpanderPlugin | Expands the **Scheduled Prices** tab of the **Edit Product concrete** page with the scheduled prices data. | None | Spryker\Zed\PriceProductScheduleGui\Communication\Plugin\ProductManagement |

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
use Spryker\Zed\PriceProductScheduleDataImport\PriceProductScheduleDataImportConfig;
use Spryker\Zed\PriceProductSchedule\Communication\Console\PriceProductScheduleApplyConsole;
use Spryker\Zed\PriceProductSchedule\Communication\Console\PriceProductScheduleCleanupConsole;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Symfony\Component\Console\Command\Command[]
     */
    protected function getConsoleCommands(Container $container)
    {
        $commands = [
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . ':' . PriceProductScheduleDataImportConfig::IMPORT_TYPE_PRODUCT_PRICE_SCHEDULE),
            new PriceProductScheduleApplyConsole(),
            new PriceProductScheduleCleanupConsole()
        ];

        return $commands;
    }
}
```

**src/Pyz/Zed/PriceProductScheduleDataImport/PriceProductScheduleDataImportConfig.php**

```php
<?php

namespace Pyz\Zed\PriceProductScheduleDataImport;

use Spryker\Zed\PriceProductScheduleDataImport\PriceProductScheduleDataImportConfig as SprykerPriceProductScheduleDataImportConfig;

class PriceProductScheduleDataImportConfig extends SprykerPriceProductScheduleDataImportConfig
{
    /**
     * @return string
     */
    protected function getModuleRoot(): string
    {
        $moduleRoot = realpath(APPLICATION_ROOT_DIR);

        return $moduleRoot . DIRECTORY_SEPARATOR;
    }
}
```

<details><summary>src/Pyz/Zed/ProductManagement/ProductManagementDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\ProductManagement;

use Spryker\Zed\ProductManagement\ProductManagementDependencyProvider as SprykerProductManagementDependencyProvider;
use Spryker\Zed\PriceProductScheduleGui\Communication\Plugin\ProductManagement\ScheduledPriceProductAbstractEditViewExpanderPlugin;
use Spryker\Zed\PriceProductScheduleGui\Communication\Plugin\ProductManagement\ScheduledPriceProductAbstractFormEditTabsExpanderPlugin;
use Spryker\Zed\PriceProductScheduleGui\Communication\Plugin\ProductManagement\ScheduledPriceProductConcreteEditViewExpanderPlugin;
use Spryker\Zed\PriceProductScheduleGui\Communication\Plugin\ProductManagement\ScheduledPriceProductConcreteFormEditTabsExpanderPlugin;


class ProductManagementDependencyProvider extends SprykerProductManagementDependencyProvider
{

    /**
     * @return \Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductConcreteFormEditTabsExpanderPluginInterface[]
     */
    protected function getProductConcreteFormEditTabsExpanderPlugins(): array
    {
        return [
            new ScheduledPriceProductConcreteFormEditTabsExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductAbstractFormEditTabsExpanderPluginInterface[]
     */
    protected function getProductAbstractFormEditTabsExpanderPlugins(): array
    {
        return [
            new ScheduledPriceProductAbstractFormEditTabsExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductAbstractEditViewExpanderPluginInterface[]
     */
    protected function getProductAbstractEditViewExpanderPlugins(): array
    {
        return [
            new ScheduledPriceProductAbstractEditViewExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\ProductManagementExtension\Dependency\Plugin\ProductConcreteEditViewExpanderPluginInterface[]
     */
    protected function getProductConcreteEditViewExpanderPlugins(): array
    {
        return [
            new ScheduledPriceProductConcreteEditViewExpanderPlugin(),
        ];
    }
}
```
</details>

2. Apply scheduled prices:

```bash
console price-product-schedule:apply
```

{% info_block warningBox "Verification" %}

In the Back Office, make sure that the following conditions are met:
1. Go to **Catalog&nbsp;<span aria-label="and then">></span> Products** and check the following: 
   1. Check that scheduled prices have been correctly applied.
   2. Click **Edit** to check that you can edit any abstract or concrete product.
   3. On the **Edit Product** page, you can find the **Scheduled Prices** tab with your scheduled prices which you can create, update, and delete.
2. Go to **Catalog&nbsp;<span aria-label="and then">></span> Scheduled Prices** and check the following:
   1. You can import scheduled prices and then see the list of previous imports.
   2. You can click the **View**, **Edit**, **Download**, and **Delete** buttons to see information about the import, edit the name of the import as well as edit and delete scheduled prices inside this import, and download all the prices inside the import, and delete the import.

{% endinfo_block %}

3. Clear applied scheduled prices:

```bash
console price-product-schedule:clean-up 1
```

{% info_block warningBox "Vreification" %}

Make sure that applied scheduled prices have been correctly removed from the database by checking the `spy_price_product_schedule` table.

{% endinfo_block %}

### 6) Set up cron job

Enable the `apply-price-product-schedule` console command in the cron-job list:

**config/Zed/cronjobs/jobs.php**

```php
<?php

/**
 * Notes:
 *
 * - jobs[]['name'] must not contains spaces or any other characters, that have to be urlencode()'d
 * - jobs[]['role'] default value is 'admin'
 */

$stores = require(APPLICATION_ROOT_DIR . '/config/Shared/stores.php');

$allStores = array_keys($stores);

/* PriceProductSchedule */
$jobs[] = [
    'name' => 'apply-price-product-schedule',
    'command' => '$PHP_BIN vendor/bin/console price-product-schedule:apply',
    'schedule' => '0 6 * * *',
    'enable' => true,
    'run_on_non_production' => true,
    'stores' => $allStores,
];
```

{% info_block warningBox "Verification" %}

In the Back Office, go to **Catalog&nbsp;<span aria-label="and then">></span> Products** and make sure that scheduled prices have been correctly applied.

{% endinfo_block %}
