

This document describes how to install the Merchant Opening Hours feature.

## Install feature core

Follow the steps below to install the Merchant Opening Hours feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
| - | - | - |
| Spryker Core | {{page.version}}   | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Marketplace Merchant | {{page.version}} | [Install the Marketplace Merchant feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-feature.html)

###  1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/merchant-opening-hours
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed: `ModuleExpected DirectoryMerchantOpeningHoursspryker/merchant-opening-hoursMerchantOpeningHoursDataImportspryker/merchant-opening-hours-data-importMerchantOpeningHoursStoragespryker/merchant-opening-hours-storageWeekdaySchedulespryker/weekday-schedule`

{% endinfo_block %}

### 2) Set up database schema

Adjust the schema definition so entity changes will trigger events:

**src/Pyz/Zed/MerchantOpeningHours/Persistence/Propel/Schema/spy_merchant_opening_hours.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\MerchantOpeningHours\Persistence"
          package="src.Orm.Zed.MerchantOpeningHours.Persistence">

    <table name="spy_merchant_opening_hours_date_schedule" phpName="SpyMerchantOpeningHoursDateSchedule" identifierQuoting="true">
        <behavior name="event">
            <parameter name="spy_merchant_opening_hours_date_schedule_all" column="*"/>
        </behavior>
    </table>

    <table name="spy_merchant_opening_hours_weekday_schedule" phpName="SpyMerchantOpeningHoursWeekdaySchedule" identifierQuoting="true">
        <behavior name="event">
            <parameter name="spy_merchant_opening_hours_weekday_schedule_all" column="*"/>
        </behavior>
    </table>

</database>
```

**src/Pyz/Zed/MerchantOpeningHoursStorage/Persistence/Propel/Schema/spy_merchant_opening_hours_storage.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          name="zed"
          xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\MerchantOpeningHoursStorage\Persistence"
          package="src.Orm.Zed.MerchantOpeningHoursStorage.Persistence">

    <table name="spy_merchant_opening_hours_storage" phpName="SpyMerchantOpeningHoursStorage">
        <behavior name="synchronization">
            <parameter name="queue_pool" value="synchronizationPool"/>
        </behavior>
    </table>

</database>
```

Generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Verify the following changes have been applied by checking your database:

| DATABASE ENTITY | TYPE | EVENT |
| ------------------------------------------ | ---- | ------ |
| spy_merchant_opening_hours_weekday_schedule | table | created |
| spy_merchant_opening_hours_date_schedule    | table | created |
| spy_weekday_schedule                        | table | created |
| spy_date_schedule                           | table | created |


Make sure that the following changes in transfer objects:

| TRANSFER  | TYPE  | EVENT | PATH  |
| ------------------- | ---- | ------ | ---------------------- |
| WeekdaySchedule                 | class | created | src/Generated/Shared/Transfer/WeekdayScheduleTransfer        |
| DataImporterReaderConfiguration | class | created | src/Generated/Shared/Transfer/DataImporterReaderConfigurationTransfer |
| MerchantCriteria                | class | created | src/Generated/Shared/Transfer/MerchantCriteriaTransfer       |
| MerchantOpeningHoursStorage     | class | created | src/Generated/Shared/Transfer/MerchantOpeningHoursStorageTransfer |

{% endinfo_block %}

### 3) Add Zed translations

Generate a new translation cache for Zed:

```bash
console translator:generate-cache
```

### 4) Configure export to Redis

This step publishes change events to `spy_merchant_opening_hours_storage` and synchronizes the data to the storage.

#### Set up event listeners and publishers

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| ----------- | -------------- | ------------- | ------------- |
| MerchantOpeningHoursDateScheduleWritePublisherPlugin |  |   | Spryker\Zed\MerchantOpeningHoursStorage\Communication\Plugin\Publisher\MerchantOpeningHours |
| MerchantOpeningHoursWeekdayScheduleWritePublisherPlugin |  |   | Spryker\Zed\MerchantOpeningHoursStorage\Communication\Plugin\Publisher\MerchantOpeningHours |
| MerchantOpeningHoursWritePublisherPlugin | Registers publisher that are responsible for publishing merchant opening hours entity changes to storage. |   | Spryker\Zed\MerchantOpeningHoursStorage\Communication\Plugin\Publisher\MerchantOpeningHours |

**src/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\MerchantOpeningHoursStorage\Communication\Plugin\Publisher\MerchantOpeningHours\MerchantOpeningHoursDateScheduleWritePublisherPlugin;
use Spryker\Zed\MerchantOpeningHoursStorage\Communication\Plugin\Publisher\MerchantOpeningHours\MerchantOpeningHoursWeekdayScheduleWritePublisherPlugin;
use Spryker\Zed\MerchantOpeningHoursStorage\Communication\Plugin\Publisher\MerchantOpeningHours\MerchantOpeningHoursWritePublisherPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array
     */
    protected function getPublisherPlugins(): array
    {
        return [
            new MerchantOpeningHoursWritePublisherPlugin(),
            new MerchantOpeningHoursWeekdayScheduleWritePublisherPlugin(),
            new MerchantOpeningHoursDateScheduleWritePublisherPlugin(),
        ];
    }
}
```

#### Configure message processors

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --------------- | --------------- | ------------ | ----------------- |
| SynchronizationStorageQueueMessageProcessorPlugin | Configures all merchant profile and merchant opening hours messages to sync with Redis storage, and marks messages as failed in case of error. |   | Spryker\Zed\Synchronization\Communication\Plugin\Queue |

**src/Pyz/Zed/Queue/QueueDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Queue;

use Spryker\Shared\MerchantOpeningHoursStorageConfig\MerchantOpeningHoursStorageConfig;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;
use Spryker\Zed\Synchronization\Communication\Plugin\Queue\SynchronizationSearchQueueMessageProcessorPlugin;

class QueueDependencyProvider extends SprykerDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface>
     */
    protected function getProcessorMessagePlugins(Container $container)
    {
        return [
            MerchantOpeningHoursStorageConfig::MERCHANT_OPENING_HOURS_SYNC_STORAGE_QUEUE => new SynchronizationStorageQueueMessageProcessorPlugin(),
        ];
    }
}
```

# Register the synchronization queue and synchronization error queue:

**src/Pyz/Client/RabbitMq/RabbitMqConfig.php**

```php
<?php

namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
use Spryker\Shared\MerchantOpeningHoursStorage\MerchantOpeningHoursStorageConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     * @return array
     */
    protected function getSynchronizationQueueConfiguration(): array
    {
        return [
            MerchantOpeningHoursStorageConfig::MERCHANT_OPENING_HOURS_SYNC_STORAGE_QUEUE,
        ];
    }

}
```

### Set up, re-generate, and re-sync features

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| ------------------- | ------------------ | ------------- | --------------- |
| MerchantOpeningHoursSynchronizationDataBulkPlugin | Allows synchronizing the entire storage table content into Storage. |   | `Spryker\Zed\MerchantOpeningHoursStorage\Communication\Plugin\Synchronization` |

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\MerchantOpeningHoursStorage\Communication\Plugin\Synchronization\MerchantOpeningHoursSynchronizationDataBulkPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface>
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new MerchantOpeningHoursSynchronizationDataBulkPlugin(),
        ];
    }
}
```

#### Configure synchronization pool name

**src/Pyz/Zed/MerchantOpeningHoursStorage/MerchantOpeningHoursStorageConfig.php**

```php
<?php

namespace Pyz\Zed\MerchantOpeningHoursStorage;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Zed\MerchantOpeningHoursStorage\MerchantOpeningHoursStorageConfig as SprykerMerchantOpeningHoursStorageStorageConfig;

class MerchantOpeningHoursStorageConfig extends SprykerMerchantOpeningHoursStorageStorageConfig
{
    /**
     * @return string|null
     */
    public function getMerchantOpeningHoursSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }
}
```

{% info_block warningBox "Verification" %}

1. Make sure that after step 1 the command `console sync:data merchant_opening_hours` exports data from the `spy_merchant_opening_hours_storage` table to Redis.

2. Make sure that when merchant opening hours entities get created or updated through ORM, it is exported to Redis accordingly.

| TARGET ENTITY | EXAMPLE EXPECTED DATA IDENTIFIER |
| ---------------- | ----------------- |
| MerchantOpeningHours | kv:merchant_opening_hours:1 |

<details>
<summary>Example expected data fragment</summary>

```json
{
   "weekday_schedule":[
      {
         "day":"MONDAY",
         "time_from":"07:00:00.000000",
         "time_to":"13:00:00.000000"
      },
      {
         "day":"MONDAY",
         "time_from":"14:00:00.000000",
         "time_to":"20:00:00.000000"
      },
      {
         "day":"TUESDAY",
         "time_from":"07:00:00.000000",
         "time_to":"20:00:00.000000"
      },
      {
         "day":"WEDNESDAY",
         "time_from":"07:00:00.000000",
         "time_to":"20:00:00.000000"
      },
      {
         "day":"THURSDAY",
         "time_from":"07:00:00.000000",
         "time_to":"20:00:00.000000"
      },
      {
         "day":"FRIDAY",
         "time_from":"07:00:00.000000",
         "time_to":"20:00:00.000000"
      },
      {
         "day":"SATURDAY",
         "time_from":"07:00:00.000000",
         "time_to":"20:00:00.000000"
      },
      {
         "day":"SUNDAY",
         "time_from":null,
         "time_to":null
      }
   ],
   "date_schedule":[
      {
         "date":"2022-01-01",
         "time_from":null,
         "time_to":null,
         "note":"merchant_weekday_schedule.new_year"
      },
      {
         "date":"2023-12-31",
         "time_from":"10:00:00.000000",
         "time_to":"17:00:00.000000",
         "note":""
      }
   ]
}
```
</details>

{% endinfo_block %}

### 5) Import Merchants Opening Hours data

Prepare your data according to your requirements using the demo data:

<details>
<summary>data/import/common/common/marketplace/merchant_open_hours_date_schedule.csv</summary>

```
merchant_reference,date,time_from,time_to,note_glossary_key
MER000001,2022-01-01,,,merchant_weekday_schedule.new_year
MER000001,2022-04-09,,,merchant_weekday_schedule.good_friday
MER000001,2022-04-17,,,merchant_weekday_schedule.easter_sunday
MER000001,2022-04-18,,,merchant_weekday_schedule.easter_monday
MER000001,2022-05-01,,,merchant_weekday_schedule.may_day
MER000001,2022-05-26,,,merchant_weekday_schedule.ascension_of_christ
MER000001,2022-06-05,,,merchant_weekday_schedule.whit_sunday
MER000001,2022-06-06,,,merchant_weekday_schedule.whit_monday
MER000001,2022-06-16,,,merchant_weekday_schedule.corpus_christi
MER000001,2022-10-03,,,merchant_weekday_schedule.day_of_german_unity
MER000001,2022-11-01,,,merchant_weekday_schedule.all_saints_day
MER000001,2022-12-25,,,merchant_weekday_schedule.1st_christmas_day
MER000001,2022-12-26,,,merchant_weekday_schedule.2nd_christmas_day
MER000001,2023-11-27,13:00:00,18:00:00,merchant_weekday_schedule.sunday_opening
MER000001,2023-12-31,10:00:00,17:00:00,
MER000002,2022-01-01,,,merchant_weekday_schedule.new_year
MER000002,2022-04-09,,,merchant_weekday_schedule.good_friday
MER000002,2022-04-17,,,merchant_weekday_schedule.easter_sunday
MER000002,2022-04-18,,,merchant_weekday_schedule.easter_monday
MER000002,2022-05-01,,,merchant_weekday_schedule.may_day
MER000002,2022-05-26,,,merchant_weekday_schedule.ascension_of_christ
MER000002,2022-06-05,,,merchant_weekday_schedule.whit_sunday
MER000002,2022-06-06,,,merchant_weekday_schedule.whit_monday
MER000002,2022-06-16,,,merchant_weekday_schedule.corpus_christi
MER000002,2022-10-03,,,merchant_weekday_schedule.day_of_german_unity
MER000002,2022-11-01,,,merchant_weekday_schedule.all_saints_day
MER000002,2022-12-25,,,merchant_weekday_schedule.1st_christmas_day
MER000002,2022-12-26,,,merchant_weekday_schedule.2nd_christmas_day
MER000006,2022-01-01,,,merchant_weekday_schedule.new_year
MER000006,2022-04-09,,,merchant_weekday_schedule.good_friday
MER000006,2022-04-17,,,merchant_weekday_schedule.easter_sunday
MER000006,2022-04-18,,,merchant_weekday_schedule.easter_monday
MER000006,2022-05-01,,,merchant_weekday_schedule.may_day
MER000006,2022-05-26,,,merchant_weekday_schedule.ascension_of_christ
MER000006,2022-06-05,,,merchant_weekday_schedule.whit_sunday
MER000006,2022-06-06,,,merchant_weekday_schedule.whit_monday
MER000006,2022-06-16,,,merchant_weekday_schedule.corpus_christi
MER000006,2022-10-03,,,merchant_weekday_schedule.day_of_german_unity
MER000006,2022-11-01,,,merchant_weekday_schedule.all_saints_day
MER000006,2022-12-25,,,merchant_weekday_schedule.1st_christmas_day
MER000006,2022-12-26,,,merchant_weekday_schedule.2nd_christmas_day
MER000006,2023-11-27,13:00:00,18:00:00,merchant_weekday_schedule.sunday_opening
MER000006,2023-12-31,10:00:00,17:00:00,
MER000005,2022-01-01,,,merchant_weekday_schedule.new_year
MER000005,2022-04-09,,,merchant_weekday_schedule.good_friday
MER000005,2022-04-17,,,merchant_weekday_schedule.easter_sunday
MER000005,2022-04-18,,,merchant_weekday_schedule.easter_monday
MER000005,2022-05-01,,,merchant_weekday_schedule.may_day
MER000005,2022-05-26,,,merchant_weekday_schedule.ascension_of_christ
MER000005,2022-06-05,,,merchant_weekday_schedule.whit_sunday
MER000005,2022-06-06,,,merchant_weekday_schedule.whit_monday
MER000005,2022-06-16,,,merchant_weekday_schedule.corpus_christi
MER000005,2022-10-03,,,merchant_weekday_schedule.day_of_german_unity
MER000005,2022-11-01,,,merchant_weekday_schedule.all_saints_day
MER000005,2022-12-25,,,merchant_weekday_schedule.1st_christmas_day
MER000005,2022-12-26,,,merchant_weekday_schedule.2nd_christmas_day
MER000005,2023-11-27,13:00:00,18:00:00,merchant_weekday_schedule.sunday_opening
MER000005,2023-12-31,10:00:00,13:00:00,
MER000005,2023-12-31,14:00:00,17:00:00,
```
</details>

| COLUMN              | REQUIRED | DATA TYPE | DATA EXAMPLE                                  | DATA EXPLANATION                                                                  |
|---------------------|-----------|-----------|-----------------------------------------------|-----------------------------------------------------------------------------------|
| merchant_reference  | &check;   | string    | MER000005                                     | Merchant identifier.                                                              |
| date                | &check;   | string    | 2022-01-01                                    | Date with special opening hours                                                   |
| time_from           |           | string    | 10:00:00                                      | Time start when the merchant is open on this special date. Empty means open ended |
| time_to             |           | string    | 13:00:00                                      | Time end when the merchant is open on this special date. Empty means open ended   |
| note                |           | string    | merchant_weekday_schedule.day_of_german_unity | Glossary key to show a note next to special opening hours                         |

**data/import/common/common/marketplace/merchant_open_hours_week_day_schedule.csv**

```
merchant_reference,week_day_key,time_from,time_to
MER000001,MONDAY,7:00:00,13:00:00
MER000001,MONDAY,14:00:00,20:00:00
MER000001,TUESDAY,7:00:00,20:00:00
MER000001,WEDNESDAY,7:00:00,20:00:00
MER000001,THURSDAY,7:00:00,20:00:00
MER000001,FRIDAY,7:00:00,20:00:00
MER000001,SATURDAY,7:00:00,20:00:00
MER000001,SUNDAY,,
MER000002,MONDAY,8:00:00,13:00:00
MER000002,MONDAY,14:00:00,19:00:00
MER000002,TUESDAY,8:00:00,19:00:00
MER000002,WEDNESDAY,8:00:00,19:00:00
MER000002,THURSDAY,8:00:00,19:00:00
MER000002,FRIDAY,8:00:00,19:00:00
MER000002,SATURDAY,8:00:00,19:00:00
MER000002,SUNDAY,,
MER000006,MONDAY,7:00:00,13:00:00
MER000006,MONDAY,14:00:00,20:00:00
MER000006,TUESDAY,7:00:00,20:00:00
MER000006,WEDNESDAY,7:00:00,20:00:00
MER000006,THURSDAY,7:00:00,20:00:00
MER000006,FRIDAY,7:00:00,20:00:00
MER000006,SATURDAY,7:00:00,20:00:00
MER000006,SUNDAY,,
MER000005,MONDAY,8:00:00,13:00:00
MER000005,MONDAY,14:00:00,19:00:00
MER000005,TUESDAY,8:00:00,19:00:00
MER000005,WEDNESDAY,8:00:00,19:00:00
MER000005,THURSDAY,8:00:00,19:00:00
MER000005,FRIDAY,8:00:00,19:00:00
MER000005,SATURDAY,8:00:00,19:00:00
MER000005,SUNDAY,,
```

| COLUMN | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION |
| ----------- | ---------- | --------- | ------------ | ---------------- |
| `merchant_reference` | &check; | string | MER000005 | Merchant identifier.  |
| week_day_key | &check; | `string`  | MONDAY | Day of the week to assign opening hours to a merchant.It is an enum in database with the following values:MONDAYTUESDAYWEDNESDAYTHURSDAYFRIDAYSATURDAYSUNDAY. |
| `time_from`   |  | string | `8:00:00`  | Time start when the merchant is open on this week day. Empty means open ended. |
| `time_to`  |   | string | `19:00:00`| Time end when the merchant is open on this week day. Empty means open ended. |

Register the following plugins to enable data import:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| -------------------- | ----------- | ------------- | ------------ |
| MerchantOpeningHoursDateScheduleDataImportPlugin | Imports special dates opening hours into the database.  |   | Spryker\Zed\MerchantOpeningHoursDataImport\Communication\Plugin |
| MerchantOpeningHoursWeekdayScheduleDataImportPlugin | Imports weekly schedule opening hours into the database. |  | Spryker\Zed\MerchantOpeningHoursDataImport\Communication\Plugin |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\MerchantOpeningHoursDataImport\Communication\Plugin\MerchantOpeningHoursDateScheduleDataImportPlugin;
use Spryker\Zed\MerchantOpeningHoursDataImport\Communication\Plugin\MerchantOpeningHoursWeekdayScheduleDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    protected function getDataImporterPlugins(): array
    {
        return [
            new MerchantOpeningHoursDateScheduleDataImportPlugin(),
            new MerchantOpeningHoursWeekdayScheduleDataImportPlugin(),
        ];
    }
}
```

**data/import/local/full_EU.yml**

```yml
version: 0

actions:
  - data_entity: merchant-opening-hours-date-schedule
    source: data/import/common/common/marketplace/merchant_open_hours_date_schedule.csv
  - data_entity: merchant-opening-hours-weekday-schedule
    source: data/import/common/common/marketplace/merchant_open_hours_week_day_schedule.csv
```

**data/import/local/full_US.yml**

```yml
version: 0

actions:
  - data_entity: merchant-opening-hours-date-schedule
    source: data/import/common/common/marketplace/merchant_open_hours_date_schedule.csv
  - data_entity: merchant-opening-hours-weekday-schedule
    source: data/import/common/common/marketplace/merchant_open_hours_week_day_schedule.csv
```

Import data:

```bash
console data:import merchant-opening-hours-date-schedule
console data:import merchant-opening-hours-weekday-schedule
```
{% info_block warningBox "Verification" %}

Make sure that the opening hours data is added to the `spy_merchant_opening_hours_weekday_schedule` and `spy_merchant_opening_hours_date_schedule` tables in the database.

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the Merchant Opening Hours feature frontend.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
| - | - | - |
| Spryker Core | {{page.version}} | [Spryker Core](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)



### 1) Install the required modules

If installed before, not needed.

{% info_block warningBox "Verification" %}

Verify if the following modules were installed:

| MODULE | EXPECTED DIRECTORY |
| ------------------- | ------------------- |
| MerchantOpeningHoursWidget | spryker-shop/merchant-opening-hours-widget |

{% endinfo_block %}

### 2) Add Yves translations

Append glossary according to your configuration:

**data/import/common/common/glossary.csv**

```yaml
merchant_weekday_schedule.new_year,New Year's Day,en_US
merchant_weekday_schedule.new_year,Neujahrstag,de_DE
merchant_weekday_schedule.good_friday,Good Friday,en_US
merchant_weekday_schedule.good_friday,Karfreitag,de_DE
merchant_weekday_schedule.easter_sunday,Easter Sunday,en_US
merchant_weekday_schedule.easter_sunday,Ostersonntag,de_DE
merchant_weekday_schedule.easter_monday,Easter Monday,en_US
merchant_weekday_schedule.easter_monday,Ostermontag,de_DE
merchant_weekday_schedule.may_day,May Day,en_US
merchant_weekday_schedule.may_day,Maifeiertag,de_DE
merchant_weekday_schedule.ascension_of_christ,Ascension of Christ,en_US
merchant_weekday_schedule.ascension_of_christ,Christi Himmelfahrt,de_DE
merchant_weekday_schedule.whit_sunday,Whit Sunday,en_US
merchant_weekday_schedule.whit_sunday,Pfingstsonntag,de_DE
merchant_weekday_schedule.whit_monday,Whit Monday,en_US
merchant_weekday_schedule.whit_monday,Pfingstmontag,de_DE
merchant_weekday_schedule.corpus_christi,Corpus Christi,en_US
merchant_weekday_schedule.corpus_christi,Fronleichnam,de_DE
merchant_weekday_schedule.day_of_german_unity,Day of German unity,en_US
merchant_weekday_schedule.day_of_german_unity,Tag der Deutschen Einheit,de_DE
merchant_weekday_schedule.all_saints_day,All Saints' Day,en_US
merchant_weekday_schedule.all_saints_day,Allerheiligen,de_DE
merchant_weekday_schedule.1st_christmas_day,1st Christmas day,en_US
merchant_weekday_schedule.1st_christmas_day,1. Weihnachtstag,de_DE
merchant_weekday_schedule.2nd_christmas_day,2nd Christmas day,en_US
merchant_weekday_schedule.2nd_christmas_day,2. Weihnachtstag,de_DE
merchant_weekday_schedule.sunday_opening,Sunday Opening,en_US
merchant_weekday_schedule.sunday_opening,Verkaufsoffener Sonntag,de_DE
merchant_opening_hours.opening_hours_title,Opening Hours,en_US
merchant_opening_hours.opening_hours_title,Öffnungszeiten,de_DE
merchant_opening_hours.special_opening_hours_title,Special Opening Hours,en_US
merchant_opening_hours.special_opening_hours_title,Besondere Öffnungszeiten,de_DE
merchant_opening_hours.public_holidays_title,Public Holidays,en_US
merchant_opening_hours.public_holidays_title,Feiertage,de_DE
merchant_opening_hours.opening_hours_closed,Closed,en_US
merchant_opening_hours.opening_hours_closed,Geschlossen,de_DE
merchant_opening_hours.day.title.monday,Monday,en_US
merchant_opening_hours.day.title.monday,Montag,de_DE
merchant_opening_hours.day.title.tuesday,Tuesday,en_US
merchant_opening_hours.day.title.tuesday,Dienstag,de_DE
merchant_opening_hours.day.title.wednesday,Wednesday,en_US
merchant_opening_hours.day.title.wednesday,Mittwoch,de_DE
merchant_opening_hours.day.title.thursday,Thursday,en_US
merchant_opening_hours.day.title.thursday,Donnerstag,de_DE
merchant_opening_hours.day.title.friday,Friday,en_US
merchant_opening_hours.day.title.friday,Freitag,de_DE
merchant_opening_hours.day.title.saturday,Saturday,en_US
merchant_opening_hours.day.title.saturday,Samstag,de_DE
merchant_opening_hours.day.title.sunday,Sunday,en_US
merchant_opening_hours.day.title.sunday,Sonntag,de_DE
```

Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the spy_glossary table.

{% endinfo_block %}

## 3) Set up widgets

Register the following plugins to enable widgets:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
| --------------- | ------------------ | ------------- | --------------- |
| MerchantOpeningHoursWidget | Displays merchant working hours. |   | SprykerShop\Yves\MerchantOpeningHoursWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\MerchantOpeningHoursWidget\Widget\MerchantOpeningHoursWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            MerchantOpeningHoursWidget::class,
        ];
    }
}
```

Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Make sure that the following widget was registered:

| MODULE | TEST |
| ------------- | ------------- |
| MerchantOpeningHoursWidget | Go to a merchant page on the storefront and ensure that merchant working hours are displayed. |

{% endinfo_block %}

## Install related features

| FEATURE |  REQUIRED FOR THE CURRENT FEATURE | INSTALLATION GUIDE |
| - | - | - |
| Merchant Opening Hours API |  | [Install the Merchant Opening Hours Glue API](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-glue-api/install-the-merchant-category-glue-api.html) |
