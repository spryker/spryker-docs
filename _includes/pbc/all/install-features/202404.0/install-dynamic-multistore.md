{% info_block warningBox %}

Dynamic Multistore is currently running under an *Early Access Release*. Early Access Releases are subject to specific legal terms, they are unsupported and don't provide production-ready SLAs. They can also be deprecated without a General Availability Release. Nevertheless, we welcome feedback from early adopters on these cutting-edge, exploratory features.

{% endinfo_block %}

This document describes how to install [Dynamic Multistore](/docs/pbc/all/dynamic-multistore/{{page.version}}/base-shop/dynamic-multistore-feature-overview.html).

## Install feature core

Follow the steps below to install the Dynamic Multistore feature core.

### Prerequisites

1. Upgrade the following modules:

| NAME     | VERSION |  UPGRADE GUIDE |
|----------|---------|---|
| Country  | ^4.0.0  | [Upgrade the Country module](/docs/pbc/all/dynamic-multistore/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-country-module.html) |
| Locale   | ^4.0.0  | [Upgrade the Locale module](/docs/pbc/all/dynamic-multistore/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-locale-module.html) |
| Currency | ^4.0.0  | [Upgrade the Currency module](/docs/pbc/all/dynamic-multistore/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-currency-module.html) |


2. Install the following features:

| NAME | VERSION | INSTALLATION GUIDE |
| --- | --- | --- |
|Spryker Core  | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |


### 2) Install the required modules

Install the required modules using Composer:

```bash
composer require "spryker-feature/spryker-core":"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| CountryDataImport | vendor/spryker/country-data-import |
| СountryGui | vendor/spryker/country-gui |
| LocaleDataImport | vendor/spryker/locale-data-import |
| LocaleGui | vendor/spryker/locale-gui |   
| StoreContextGui | vendor/spryker/store-context-gui |
| StoreDataImport | vendor/spryker/store-data-import |
| StoreGui | vendor/spryker/store-gui |

{% endinfo_block %}


### 3) Set up configuration

Before the introduction of dynamic multistore, configuration was managed in `config/Shared/stores.php`. With dynamic multistore, configuration is managed in the database. `config/Shared/stores.php` and `config/Shared/default_store.php` are now obsolete.

The default configuration is imported using data import modules, such as StoreDataImport, LocaleDataImport, CountryDataImport, and other feature-related imports, like CurrencyDataImport.

Take the following steps to set up configuration.

#### Define the region stores context by domain

With dynamic multistore, you can define region or store using domains or headers. We recommend defining region using domains.

{% info_block infoBox "Changing the domain name" %}

We recommend making `de.mysprykershop.com` a mirror of `eu.mysprykershop.com` to preserve the availability of old links in search engines.

{% endinfo_block %}


#### Enable the dynamic store feature

To use the new region configuration, create a new deployment file, like `deploy.dynamic-store.yml` or `deploy.dev.dynamic-store.yml`. Example of file with region configuration:

<details>
<summary>deploy.dev.dynamic-store.yml</summary>

```yml
version: '0.1'

namespace: spryker-dynamic-store
tag: 'dev'

environment: docker.dev
image:
    # ...
    environment:
        # ...
        SPRYKER_DYNAMIC_STORE_MODE: true # This will enable dynamic store be default and will be used by the application to define its behaviour
        SPRYKER_YVES_HOST_EU: yves.eu.mysprykershop.com # See the guide for installing dynamic store availability notification feature
    node:
        version: 16
        npm: 8

regions:
    EU:
        # Services for EU region. Use one of the following services: mail, database, broker, key_value_store, search for all stores in EU region.
        # Stores MUST not be defined in the deploy file as it was before due to their dynamic nature
        services:
            mail:
                sender:
                    name: Spryker No-Reply
                    email: no-reply@mysprykershop.com
            database:
                database: eu-docker
                username: spryker
                password: secret

            broker:
                namespace: eu-docker
            key_value_store:
                namespace: 1
            search:
                namespace: eu_search
    # ...

groups:
    EU:
        region: EU
        applications:
            merchant_portal_eu:
                application: merchant-portal
                endpoints:
                    mp.eu.mysprykershop.com: # Changed Merchant portal endpoint for EU region. Use new domain name for EU region.
                        region: EU
                        entry-point: MerchantPortal
                        primal: true
                        services:
                            session:
                                namespace: 7
            # Changed Yves endpoint for EU region. Use new domain name for all stores in EU region.
            yves_eu:
                application: yves
                endpoints:
                    yves.eu.mysprykershop.com:
                        region: EU # Use region instead store name for all stores in EU region
                        services:
                            session:
                                namespace: 2
            # Same for other endpoints
            glue_eu:
                application: glue
                endpoints:
                    glue.eu.mysprykershop.com:
                        region: EU
            glue_storefront_eu:
                application: glue-storefront
                endpoints:
                    glue-storefront.eu.mysprykershop.com:
                        region: EU
            glue_backend_eu:
                application: glue-backend
                endpoints:
                    glue-backend.eu.mysprykershop.com:
                        region: EU
            backoffice_eu:
                application: backoffice
                endpoints:
                    backoffice.eu.mysprykershop.com:
                        region: EU
                        primal: true
                        services:
                            session:
                                namespace: 3
            backend_gateway_eu:
                application: backend-gateway
                endpoints:
                    backend-gateway.eu.mysprykershop.com:
                        region: EU
                        primal: true
            backend_api_eu:
                application: zed
                endpoints:
                    backend-api.eu.mysprykershop.com:
                        region: EU
                        entry-point: BackendApi

    US:
        # ...

# ...
docker:
    # ...
    testing:
        region: EU # Use EU region for testing instead store.

```

</details>

In this configuration, region is used for entities like services, endpoints, or applications. The `SPRYKER_DYNAMIC_STORE_MODE`  variable enables the dynamic multistore feature. Make sure store is not used in the new configuration to avoid deployment failures.


3. Add the following configuration:

| CONFIGURATION        | SPECIFICATION | NAMESPACE |
|----------------------|---------------| --- |
| Default RabbitMQ connection: `config/Shared/config_default.php`. | Enables the connection for queues to be set dynamically. Use the `SPRYKER_CURRENT_REGION` environment variable to set the configuration for queues. |  |
| RabbitMqConfig::getQueuePools() | Configures queue pools for regions. | Pyz\Client\RabbitMq |
| RabbitMqConfig::getDefaultLocaleCode() | Returns the default locale code. | Pyz\Client\RabbitMq |
| RabbitMqConfig::getSynchronizationQueueConfiguration() | Adds `1StoreStorageConfig::STORE_SYNC_STORAGE_QUEUE1` to configure the sync queue. | Pyz\Client\RabbitMq |
| Setup cron jobs: `config/Zed/cronjobs/jobs.php`.  | Adjust all cron jobs to use the new configuration. |  |
| StoreStorageConfig::STORE_SYNC_STORAGE_QUEUE | Configures the sync queue name to be used for processing store messages. | Pyz\Zed\StoreStorage |



**config/Shared/config_default.php**

Original code block:
```php
<?php

$config[RabbitMqEnv::RABBITMQ_CONNECTIONS] = [];
foreach ($rabbitConnections as $key => $connection) {
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key] = $defaultConnection;
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][RabbitMqEnv::RABBITMQ_CONNECTION_NAME] = $key . '-connection';
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][RabbitMqEnv::RABBITMQ_STORE_NAMES] = [$key];
    foreach ($connection as $constant => $value) {
        $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][constant(RabbitMqEnv::class . '::' . $constant)] = $value;
    }
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][RabbitMqEnv::RABBITMQ_DEFAULT_CONNECTION] = $key === APPLICATION_STORE;
}
```

Update the prior code snippet to the following:

```php
$config[RabbitMqEnv::RABBITMQ_CONNECTIONS] = [];
$connectionKeys = array_keys($rabbitConnections);
$defaultKey = reset($connectionKeys);

if (getenv('SPRYKER_CURRENT_REGION')) {
    $defaultKey = getenv('SPRYKER_CURRENT_REGION');
}

if (getenv('APPLICATION_STORE') && (bool)getenv('SPRYKER_DYNAMIC_STORE_MODE') === false) {
    $defaultKey = getenv('APPLICATION_STORE');
}

foreach ($rabbitConnections as $key => $connection) {
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key] = $defaultConnection;
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][RabbitMqEnv::RABBITMQ_CONNECTION_NAME] = $key . '-connection';
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][RabbitMqEnv::RABBITMQ_STORE_NAMES] = [$key];

    foreach ($connection as $constant => $value) {
        $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][constant(RabbitMqEnv::class . '::' . $constant)] = $value;
    }

    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][RabbitMqEnv::RABBITMQ_DEFAULT_CONNECTION] = $key === $defaultKey;
}
```

{% info_block warningBox "Verification" %}

Make sure you can run `vendor/bin/console queue:setup` with a successful result.

{% endinfo_block %}

<details>
<summary>src/Pyz/Client/RabbitMq/RabbitMqConfig.php</summary>

```php
<?php

namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
use Spryker\Shared\StoreStorage\StoreStorageConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     * @return array<array<string>>
     */
    public function getQueuePools(): array
    {
        return [
            'synchronizationPool' => $this->getQueueConnectionNames(),
        ];
    }

    /**
     * @return string|null
     */
    public function getDefaultLocaleCode(): ?string
    {
        return 'en_US';
    }


    /**
     * @return array<mixed>
     */
    protected function getSynchronizationQueueConfiguration(): array
    {
        return [
            ...
            StoreStorageConfig::STORE_SYNC_STORAGE_QUEUE,
            ...
        ];
    }

    /**
     * @return array<string>
     */
    protected function getQueueConnectionNames(): array
    {
        return array_map(
            function (array $connection): string {
                return $connection[RabbitMqEnv::RABBITMQ_CONNECTION_NAME];
            },
            $this->get(RabbitMqEnv::RABBITMQ_CONNECTIONS),
        );
    }    
}    

```

</details>

{% info_block warningBox "Verification" %}

Run `vendor/bin/console queue:worker:start` and make sure RabbitMQ connection errors are not returned.

{% endinfo_block %}

#### Configure Jenkins

With the dynamic store setup, commands for Jenkins are executed per region instead of per store. The command for Jenkins uses the `SPRYKER_CURRENT_REGION` variable instead of `APPLICATION_STORE`.

1. In `config/Zed/cronjobs/jenkins.php`, remove the `$allStores` variable and its usage in the configuration of the jobs through the `stores` parameter. Example of updated job configuration:
```php
$jobs[] = [
    'name' => 'job-name',
    'command' => '$PHP_BIN vendor/bin/console product:check-validity',
    'schedule' => '0 6 * * *',
    'enable' => true,
];
```

2. Remove the following configuration if exists:


```php
$stores = require(APPLICATION_ROOT_DIR . '/config/Shared/stores.php');

$allStores = array_keys($stores);

```


3. Add the following code to the end of the jobs configuration file:

```php

if (getenv('SPRYKER_CURRENT_REGION')) {
    foreach ($jobs as $job) {
        $job['region'] = getenv('SPRYKER_CURRENT_REGION');
    }
}
```

For an example of an updated file, see [jenkins.php in the Spryker Suite repository](https://github.com/spryker-shop/suite/blob/master/config/Zed/cronjobs/jenkins.php).

{% info_block warningBox “Verification” %}

1. Remove Jenkins jobs per store:

```bash
vendor/bin/console scheduler:clean
```

If any jobs have not been automatically removed, remove them manually.

2. Set up Jenkins jobs:

```bash
vendor/bin/console scheduler:setup
```

Make sure jobs with region configuration have been created.

{% endinfo_block %}


4. Enable the queue to publish `Store` data to the `Storage`.

**src/Pyz/Zed/Queue/QueueDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Queue;

use Spryker\Zed\Kernel\Container;
use Spryker\Shared\StoreStorage\StoreStorageConfig;
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
            StoreStorageConfig::STORE_SYNC_STORAGE_QUEUE => new SynchronizationStorageQueueMessageProcessorPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Set up the queue infrastructure:

```bash
vendor/bin/console queue:setup
```

Make sure the `sync.storage.store` queue exists in RabbitMQ.

{% endinfo_block %}



### 2) Set up the database schema and transfer objects

1. Adjust the schema definition so entity change triggers events:

**src/Pyz/Zed/Country/Persistence/Propel/Schema/spy_country.schema.xml**

```xml

<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed"
          xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\Country\Persistence" package="src.Orm.Zed.Country.Persistence">

    <table name="spy_country_store" idMethod="native">
        <behavior name="event">
            <parameter name="spy_country_store_all" column="*"/>
        </behavior>
    </table>

</database>

```

**src/Pyz/Zed/Locale/Persistence/Propel/Schema/spy_locale.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed"
          xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\Locale\Persistence" package="src.Orm.Zed.Locale.Persistence">

    <table name="spy_locale_store" idMethod="native">
        <behavior name="event">
            <parameter name="spy_locale_store_all" column="*"/>
        </behavior>
    </table>

</database>

```

**src/Pyz/Zed/Store/Persistence/Propel/Schema/spy_store.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed"
          xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\Store\Persistence" package="src.Orm.Zed.Store.Persistence">

    <table name="spy_store">
        <behavior name="event">
            <parameter name="spy_store_all" column="*"/>
        </behavior>
    </table>

</database>
```

2. Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in the database:

| DATABASE ENTITY                       | TYPE   | EVENT   |
|---------------------------------------|--------|---------|
| spy_store.fk_locale                   | column | added   |
| spy_country_store                     | table  | added   |
| spy_locale_store                      | table  | added   |

{% endinfo_block %}


{% info_block warningBox "Verification" %}


1. Stop the scheduler:

```bash
vendor/bin/console scheduler:suspend
```

2. In the Back Office, set up a store with a country and locale.
    Make sure the store is created successfully.

3. Restart the scheduler:

```bash
vendor/bin/console scheduler:resume
```

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| LocaleConditions | class | created | src/Generated/Shared/Transfer/LocaleConditionsTransfer  |
| SearchContext.storeName | property | added | src/Generated/Shared/Transfer/SearchContextTransfer |
| SchedulerJob.region     | property | added | src/Generated/Shared/Transfer/SchedulerJobTransfer  |
| ProductConcrete.stores  | property | added | src/Generated/Shared/Transfer/ProductConcreteTransfer  |
| Customer.storeName      | property | added | src/Generated/Shared/Transfer/CustomerTransfer  |


{% endinfo_block %}


### 3) Configure export to Storage

1.  Set up publisher plugins and trigger plugins:

| PLUGIN | SPECIFICATION | PRERQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| StoreWritePublisherPlugin | Publishes store data to a storage table. |  | Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\Store |
| StoreSynchronizationTriggeringPublisherPlugin | Publishes store data to the synchronization queue. |  | Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\Store |
| LocaleStoreWritePublisherPlugin | Publishes locale store data to a storage table. |  | Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\LocaleStore |
| CountryStoreWritePublisherPlugin | Publishes country store data to a storage table. |  | Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\CountryStore |
| StorePublisherTriggerPlugin  | Retrieves store data based on the provided limit and offset. | | Spryker\Zed\StoreStorage\Communication\Plugin\Publisher |


<details>
<summary>src/Pyz/Zed/Publisher/PublisherDependencyProvider.php</summary>


```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;
use Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\CountryStore\CountryStoreWritePublisherPlugin;
use Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\LocaleStore\LocaleStoreWritePublisherPlugin;
use Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\Store\StoreSynchronizationTriggeringPublisherPlugin;
use Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\Store\StoreWritePublisherPlugin;
use Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\StorePublisherTriggerPlugin;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    protected function getPublisherPlugins(): array
    {
        return array_merge(
            // ...
            $this->getStoreStoragePlugins(),
        );
    }

    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getStoreStoragePlugins(): array
    {
        return [
            new StoreWritePublisherPlugin(),
            new StoreSynchronizationTriggeringPublisherPlugin(),
            new CountryStoreWritePublisherPlugin(),
            new LocaleStoreWritePublisherPlugin(),

        ];
    }

    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface>
     */
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            new StorePublisherTriggerPlugin(),
        ];
    }
}
```

</details>


{% info_block warningBox "Verification" %}

When a store’s data is created, updated, or deleted, including local and country information, make sure it is correctly exported to or removed from Redis.

Storage type: Redis
Target entity: Store

Example expected data identifier: `kv:store:de`

Example expected data fragment:

```json
{
  "id_store": 1,
  "name": "DE",
  "default_locale_iso_code": "en_US",
  "available_locale_iso_codes": [
    "de_DE",
    "en_US"
  ],
  "stores_with_shared_persistence": [],
  "countries": [
    "CH",
    "DE"
  ],
  "country_names": [
    "Switzerland",
    "Germany"
  ],
  "_timestamp": 100000000.000000
}
```

{% endinfo_block %}

### 4) Import data

Import locale, store, and country data:

1.  Prepare your data according to your requirements using our demo data:

Example of locales configuration for the DE store:

**data/import/common/DE/locale_store.csv**
```csv
locale_name,store_name
en_US,DE
de_DE,DE

```

| Column | REQUIRED | Data Type | Data Example | Data Explanation |
| --- | --- | --- | --- | --- |
| locale_name | ✓ | string | en_US | Locale name. |
 |store_name | ✓ |string | DE | Store name. |


Example of the default locale configuration for the DE store:

**data/import/common/DE/default_locale_store.csv**
```
locale_name,store_name
en_US,DE

```

| Column | REQUIRED | Data Type | Data Example | Data Explanation |
| --- | --- | --- | --- | --- |
| locale_name | ✓ | string | en_US | Locale name. |
| store_name |✓ |string | DE | Store name. |


Example of coutry-store configuration for the DE store:

**data/import/common/DE/country_store.csv**

```csv
store_name,country
DE,DE
DE,FR

```

| Column | REQUIRED | Data Type | Data Example | Data Explanation |
| --- | --- | --- | --- | --- |
| country | ✓ | string | DE | Country code. |
| store_name |✓ |string | DE | Store name. |


{% info_block warningBox “Verification” %}

Make sure the following applies:

*  For each `store_name` entry in the imported csv files, a respective `name` entry has been added to the `spy_store` database table.
*  For each `locale_name` entry in the imported csv files, a respective `locale_name` entry has been added to the `spy_locale` database table.

{% endinfo_block %}


2. Update the following import action files with the following action:
    * `data/import/common/commerce_setup_import_config_{REGION\STORE}.yml`
    * `data/import/local/full\_{REGION\STORE}.yml`
    * `data/import/production/full\_{SPRYKER\STORE}.yml`

```yaml
data_import:
    - data_entity: store
      source: data/import/common/{REGION}/store.csv
    - data_entity: country-store
      source: data/import/common/{REGION}/country_store.csv
    - data_entity: locale-store
      source: data/import/common/{REGION}/locale_store.csv
    - data_entity: default-locale-store
      source: data/import/common/{REGION}/default_locale_store.csv
```


3. Adjust `src/Pyz/Zed/DataImport/DataImportConfig.php` to set up data file paths:

```php
namespace Pyz\Zed\DataImport;


use Spryker\Zed\DataImport\DataImportConfig as SprykerDataImportConfig;

class DataImportConfig extends SprykerDataImportConfig
{
    public function getDefaultYamlConfigPath(): ?string
    {
        $regionDir = defined('APPLICATION_REGION') ? APPLICATION_REGION : 'EU';

        return APPLICATION_ROOT_DIR . DIRECTORY_SEPARATOR . 'data/import/local/full_' . $regionDir . '.yml';
    }
}
```

3. Register the following plugins to enable data import:


| PLUGIN | SPECIFICATION                                            | PREREQUISITES | NAMESPACE |
| --- |----------------------------------------------------------| --- | --- |
| StockDataImportPlugin | Imports stock.                                           |  | \Spryker\Zed\StoreDataImport\Communication\Plugin\DataImport |
| CountryStoreDataImportPlugin | Imports country store relations.                         |  | \Spryker\Zed\CountryDataImport\Communication\Plugin\DataImport |
| LocaleStoreDataImportPlugin | Imports locale store relations.                          |  | \Spryker\Zed\LocaleDataImport\Communication\Plugin\DataImport |
| DefaultLocaleStoreDataImportPlugin | Imports relations between the default locale and stores. |  | \Spryker\Zed\LocaleDataImport\Communication\Plugin\DataImport |


**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
namespace Pyz\Zed\DataImport;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\StoreDataImport\Communication\Plugin\DataImport\StoreDataImportPlugin;
use Spryker\Zed\LocaleDataImport\Communication\Plugin\DataImport\DefaultLocaleStoreDataImportPlugin;
use Spryker\Zed\LocaleDataImport\Communication\Plugin\DataImport\LocaleStoreDataImportPlugin;
use Spryker\Zed\CountryDataImport\Communication\Plugin\DataImport\CountryStoreDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    protected function getDataImporterPlugins(): array
    {
        return [
            new StoreDataImportPlugin(),
            new CountryStoreDataImportPlugin(),
            new LocaleStoreDataImportPlugin(),
            new DefaultLocaleStoreDataImportPlugin(),
        ];     
    }
}
```

4. Enable behaviors by registering the console commands:

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php
namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
use Spryker\Zed\StoreDataImport\StoreDataImportConfig;
use Spryker\Zed\Locale\Communication\Plugin\Application\ConsoleLocaleApplicationPlugin;
use Spryker\Zed\LocaleDataImport\LocaleDataImportConfig;
use Spryker\Zed\CountryDataImport\CountryDataImportConfig;

/**
 * @method \Pyz\Zed\Console\ConsoleConfig getConfig()
 */
class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @var string
     */
    protected const COMMAND_SEPARATOR = ':';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container): array
    {
        return [
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . CountryDataImportConfig::IMPORT_TYPE_COUNTRY_STORE),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . LocaleDataImportConfig::IMPORT_TYPE_LOCALE_STORE),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . LocaleDataImportConfig::IMPORT_TYPE_DEFAULT_LOCALE_STORE),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . StoreDataImportConfig::IMPORT_TYPE_STORE),            
        ];
    }

}
```


5. Import data:

```bash
vendor/bin/console data:import:locale-store
vendor/bin/console data:import:default-locale-store
vendor/bin/console data:import:country-store
```

{% info_block warningBox "Verification" %}

Make sure the data for locale-store and country-store relationships have been added to the `spy_locale_store` and `spy_country_store` tables.

{% endinfo_block %}

### 5) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| StoreStorageStoreExpanderPlugin | Expands a store on store getting. |  | Spryker\Client\StoreStorage\Plugin\Store |
| StoreMetaDataProviderPlugin  | Provides store metadata. |  | Spryker\Client\Store\Plugin\ZedRequest |
| LocaleMetaDataProviderPlugin | Provides locale metadata. |  | Spryker\Client\Locale\Plugin\ZedRequest |
| ConsoleLocaleApplicationPlugin | Provides a locale service. |  | Spryker\Zed\Locale\Communication\Plugin\Application |
| BackofficeStoreApplicationPlugin | Provides a store service. |  | Spryker\Zed\Store\Communication\Plugin\Application |
| RequestBackendGatewayApplicationPlugin | Provides a zed request service. |  | Spryker\Zed\ZedRequest\Communication\Plugin\Application |
| StoreBackendGatewayApplicationPlugin | Provides a store service. |  | Spryker\Zed\Store\Communication\Plugin\Application |
| LocaleBackendGatewayApplicationPlugin | Provides a locale service. |  | Spryker\Zed\Locale\Communication\Plugin\Application |
| DefaultLocaleStorePreCreateValidationPlugin | Validates the default locale before a store is created. |  | Spryker\Zed\Locale\Communication\Plugin\Store |
| DefaultLocaleStorePreUpdateValidationPlugin | Validates the default locale before a store is updated. |  | Spryker\Zed\Locale\Communication\Plugin\Store |
| CountryStorePostCreatePlugin | Updates country store data after a store is created. |  | Spryker\Zed\Country\Communication\Plugin\Store |
| DefaultLocaleStorePostCreatePlugin | Updates default locale data after a store is created. |  | Spryker\Zed\Locale\Communication\Plugin\Store |
| LocaleStorePostCreatePlugin | Updates locale store data after a store is created. |  | Spryker\Zed\Locale\Communication\Plugin\Store |
| SearchSetupSourcesStorePostCreatePlugin | Updates the search setup after a store is created. |  | Spryker\Zed\Search\Communication\Plugin\Store |
| CountryStorePostUpdatePlugin | Updates country store data after a store is updated. |  | Spryker\Zed\Country\Communication\Plugin\Store |
| DefaultLocaleStorePostUpdatePlugin | Updates default locale data after a store is updated. |  | Spryker\Zed\Locale\Communication\Plugin\Store |
| LocaleStorePostUpdatePlugin | Updates locale store data after a store is updated. |  | Spryker\Zed\Locale\Communication\Plugin\Store |
| CountryStoreCollectionExpanderPlugin | Expands the country store collection. |  | Spryker\Zed\Country\Communication\Plugin\Store |
| LocaleStoreCollectionExpanderPlugin | Expands the locale store collection. |  | Spryker\Zed\Locale\Communication\Plugin\Store |
| LocaleStoreFormExpanderPlugin | Adds locale selection fields to the Store form. |  | Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui |
| CountryStoreFormExpanderPlugin | Adds country selection fields to the Store form. |  | Spryker\Zed\CountryGui\Communication\Plugin\StoreGui |
| LocaleStoreFormViewExpanderPlugin | Adds rendered locale tabs and tables as variables in a template. |  | Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui |
| CountryStoreFormViewExpanderPlugin | Adds rendered country tabs and tables as variables in a template. |  | Spryker\Zed\CountryGui\Communication\Plugin\StoreGui |
| LocaleStoreFormTabExpanderPlugin | Expands the Store form with the Locales tab. |  | Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui |
| CountryStoreFormTabExpanderPlugin | Expands the Store form with the Countries tab. |  | Spryker\Zed\CountryGui\Communication\Plugin\StoreGui |
| DefaultLocaleStoreViewExpanderPlugin | Returns a template path for the default locale and default locale ISO code. |  | Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui |
| AssignedLocalesStoreViewExpanderPlugin | Returns a table with assigned locales. |  | Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui |
| AssignedCountriesStoreViewExpanderPlugin | Returns a table with assigned countries. |  | Spryker\Zed\CountryGui\Communication\Plugin\StoreGui |
| LocaleStoreTableExpanderPlugin | Expands the locale table with a store column. |  | Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui |
| CountryStoreTableExpanderPlugin | Expands the table data rows of store table with country codes. |  | Spryker\Zed\CountryGui\Communication\Plugin\StoreGui |


**src/Pyz/Client/Store/StoreDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Store;

use Spryker\Client\Store\StoreDependencyProvider as SprykerStoreDependencyProvider;
use Spryker\Client\StoreStorage\Plugin\Store\StoreStorageStoreExpanderPlugin;

class StoreDependencyProvider extends SprykerStoreDependencyProvider
{
    /**
     * @return array<\Spryker\Client\StoreExtension\Dependency\Plugin\StoreExpanderPluginInterface>
     */
    protected function getStoreExpanderPlugins(): array
    {
        return [
            new StoreStorageStoreExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure `StoreTransfer` has been expanded with store data, like countries or currency ISO codes, from the database.

{% endinfo_block %}


**src/Pyz/Client/ZedRequest/ZedRequestDependencyProvider.php**

```php
<?php

namespace Pyz\Client\ZedRequest;

use Spryker\Client\Locale\Plugin\ZedRequest\LocaleMetaDataProviderPlugin;
use Spryker\Client\Store\Plugin\ZedRequest\StoreMetaDataProviderPlugin;
use Spryker\Client\ZedRequest\ZedRequestDependencyProvider as SprykerZedRequestDependencyProvider;

class ZedRequestDependencyProvider extends SprykerZedRequestDependencyProvider
{
    /**
     * @return array<\Spryker\Client\ZedRequestExtension\Dependency\Plugin\MetaDataProviderPluginInterface>
     */
    protected function getMetaDataProviderPlugins(): array
    {
        return [
            'store' => new StoreMetaDataProviderPlugin(),
            'locale' => new LocaleMetaDataProviderPlugin(),            
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure `store` and `locale` metadata is provided with Zed requests.

{% endinfo_block %}

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**
```php
<?php
namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
use Spryker\Zed\Locale\Communication\Plugin\Application\ConsoleLocaleApplicationPlugin;

/**
 * @method \Pyz\Zed\Console\ConsoleConfig getConfig()
 */
class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    public function getApplicationPlugins(Container $container): array
    {
        $applicationPlugins = parent::getApplicationPlugins($container);

        $applicationPlugins[] = new ConsoleLocaleApplicationPlugin();

        return $applicationPlugins;
    }

}
```

**src/Pyz/Zed/Application/ApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Application;

use Spryker\Zed\Application\ApplicationDependencyProvider as SprykerApplicationDependencyProvider;
use Spryker\Zed\Locale\Communication\Plugin\Application\LocaleBackendGatewayApplicationPlugin;
use Spryker\Zed\Store\Communication\Plugin\Application\BackofficeStoreApplicationPlugin;
use Spryker\Zed\Store\Communication\Plugin\Application\StoreBackendGatewayApplicationPlugin;
use Spryker\Zed\ZedRequest\Communication\Plugin\Application\RequestBackendGatewayApplicationPlugin;

class ApplicationDependencyProvider extends SprykerApplicationDependencyProvider
{

    /**
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    protected function getBackofficeApplicationPlugins(): array
    {
        return [
            new BackofficeStoreApplicationPlugin(),
        ];
    }


    /**
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    protected function getBackendGatewayApplicationPlugins(): array
    {
        return [
            new RequestBackendGatewayApplicationPlugin(),
            new StoreBackendGatewayApplicationPlugin(),
            new LocaleBackendGatewayApplicationPlugin(),
        ];
    }
}
```

<details>
<summary>src/Pyz/Zed/Store/StoreDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Store;

use Spryker\Zed\Country\Communication\Plugin\Store\CountryStoreCollectionExpanderPlugin;
use Spryker\Zed\Country\Communication\Plugin\Store\CountryStorePostCreatePlugin;
use Spryker\Zed\Country\Communication\Plugin\Store\CountryStorePostUpdatePlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\DefaultLocaleStorePostCreatePlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\DefaultLocaleStorePostUpdatePlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\DefaultLocaleStorePreCreateValidationPlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\DefaultLocaleStorePreUpdateValidationPlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\LocaleStoreCollectionExpanderPlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\LocaleStorePostCreatePlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\LocaleStorePostUpdatePlugin;
use Spryker\Zed\Search\Communication\Plugin\Store\SearchSetupSourcesStorePostCreatePlugin;
use Spryker\Zed\Store\StoreDependencyProvider as SprykerStoreDependencyProvider;

class StoreDependencyProvider extends SprykerStoreDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\StoreExtension\Dependency\Plugin\StorePreCreateValidationPluginInterface>
     */
    protected function getStorePreCreateValidationPlugins(): array
    {
        return [
            new DefaultLocaleStorePreCreateValidationPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreExtension\Dependency\Plugin\StorePreUpdateValidationPluginInterface>
     */
    protected function getStorePreUpdateValidationPlugins(): array
    {
        return [
            new DefaultLocaleStorePreUpdateValidationPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreExtension\Dependency\Plugin\StorePostCreatePluginInterface>
     */
    protected function getStorePostCreatePlugins(): array
    {
        return [
            new CountryStorePostCreatePlugin(),
            new DefaultLocaleStorePostCreatePlugin(),
            new LocaleStorePostCreatePlugin(),
            new SearchSetupSourcesStorePostCreatePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreExtension\Dependency\Plugin\StorePostUpdatePluginInterface>
     */
    protected function getStorePostUpdatePlugins(): array
    {
        return [
            new CountryStorePostUpdatePlugin(),
            new DefaultLocaleStorePostUpdatePlugin(),
            new LocaleStorePostUpdatePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreExtension\Dependency\Plugin\StoreCollectionExpanderPluginInterface>
     */
    protected function getStoreCollectionExpanderPlugins(): array
    {
        return [
            new CountryStoreCollectionExpanderPlugin(),
            new LocaleStoreCollectionExpanderPlugin(),
        ];
    }
}

```

</details>

{% info_block warningBox "Verification" %}

Steps to verify:
- Make sure that, when you try to create a store with a default locale that is not assigned to the store, an error message is returned.
- Make sure that, when you try to update a store with a default locale that is not assigned to the store, an error message is returned.
- Make sure you can create a store with countries assigned to it.
- Make sure you can update a store with a default locale assigned to it.
- Make sure you can create a store with locales assigned to it.
- Make sure you can update a store with countries assigned to it.
- Make sure you can update a store with a default locale assigned to it.
- Make sure you can update a store with locales assigned to it.

{% endinfo_block %}

<details>
<summary>src/Pyz/Zed/StoreGui/StoreGuiDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\StoreGui;

use Spryker\Zed\CountryGui\Communication\Plugin\StoreGui\AssignedCountriesStoreViewExpanderPlugin;
use Spryker\Zed\CountryGui\Communication\Plugin\StoreGui\CountryStoreFormExpanderPlugin;
use Spryker\Zed\CountryGui\Communication\Plugin\StoreGui\CountryStoreFormTabExpanderPlugin;
use Spryker\Zed\CountryGui\Communication\Plugin\StoreGui\CountryStoreFormViewExpanderPlugin;
use Spryker\Zed\CountryGui\Communication\Plugin\StoreGui\CountryStoreTableExpanderPlugin;
use Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui\AssignedLocalesStoreViewExpanderPlugin;
use Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui\DefaultLocaleStoreViewExpanderPlugin;
use Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui\LocaleStoreFormExpanderPlugin;
use Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui\LocaleStoreFormTabExpanderPlugin;
use Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui\LocaleStoreFormViewExpanderPlugin;
use Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui\LocaleStoreTableExpanderPlugin;
use Spryker\Zed\StoreGui\StoreGuiDependencyProvider as SprykerStoreGuiDependencyProvider;

class StoreGuiDependencyProvider extends SprykerStoreGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\StoreGuiExtension\Dependency\Plugin\StoreFormExpanderPluginInterface>
     */
    protected function getStoreFormExpanderPlugins(): array
    {
        return [
            new LocaleStoreFormExpanderPlugin(),
            new CountryStoreFormExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreGuiExtension\Dependency\Plugin\StoreFormViewExpanderPluginInterface>
     */
    protected function getStoreFormViewExpanderPlugins(): array
    {
        return [
            new LocaleStoreFormViewExpanderPlugin(),
            new CountryStoreFormViewExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreGuiExtension\Dependency\Plugin\StoreFormTabExpanderPluginInterface>
     */
    protected function getStoreFormTabsExpanderPlugins(): array
    {
        return [
            new LocaleStoreFormTabExpanderPlugin(),
            new CountryStoreFormTabExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreGuiExtension\Dependency\Plugin\StoreViewExpanderPluginInterface>
     */
    protected function getStoreViewExpanderPlugins(): array
    {
        return [
            new DefaultLocaleStoreViewExpanderPlugin(),
            new AssignedLocalesStoreViewExpanderPlugin(),
            new AssignedCountriesStoreViewExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreGuiExtension\Dependency\Plugin\StoreTableExpanderPluginInterface>
     */
    protected function getStoreTableExpanderPlugins(): array
    {
        return [
            new LocaleStoreTableExpanderPlugin(),
            new CountryStoreTableExpanderPlugin(),
        ];
    }
}

```

</details>

{% info_block warningBox "Verification" %}

Steps to verify:
- Make sure the locale selection fields are displayed on the Store form.
- Make sure the country selection fields are displayed on the Store form.
- Make sure the rendered locale tabs and tables are displayed on the Store form.
- Make sure the rendered country tabs and tables are displayed on the Store form.
- Make sure the Locales tab is displayed on the Store form.
- Make sure the Countries tab is displayed on the Store form.
- Make sure the default locale ISO code is displayed on the Store view page.
- Make sure the table with assigned locales is displayed on the Store view page.
- Make sure the table with assigned countries is displayed on the Store view page.
- Make sure the locale codes are displayed in the store table.   
- Make sure the countries are displayed in the store table.

{% endinfo_block %}

## Install feature frontend

Take the following steps to install the feature frontend.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
| --- | --- | --- |
|Spryker Core  | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require "spryker-feature/spryker-core":"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| StoreWidget | vendor/spryker-shop/store-widget |

{% endinfo_block %}


### 2) Add translations

1. Append the glossary according to your configuration:

**data/import/common/common/glossary.csv**


```csv
store_widget.switcher.store,Store:,en_US
store_widget.switcher.store,Shop:,de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}


### 2) Set up configuration

Add the following configuration to your project:

| CONFIGURATION                       | SPECIFICATION | NAMESPACE |
|-------------------------------------| --- | --- |
| RouterConfig::getAllowedLanguages() |  Returns a list of supported languages for Route manipulation. Used to strip a route of language information before it's matched. | Spryker\Yves\Router |
| RouterConfig::getAllowedStores()    |  Returns a list of supported stores for Route manipulation. Used to strip a route of store information before it's matched. | Spryker\Yves\Router |


**src/Pyz/Yves/Router/RouterConfig.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Client\Kernel\Container;
use Spryker\Yves\Router\RouterConfig as SprykerRouterConfig;

/**
 * @method \Spryker\Shared\Router\RouterConfig getSharedConfig()
 */
class RouterConfig extends SprykerRouterConfig
{
    /**
     * @see \Spryker\Yves\Router\Plugin\RouterEnhancer\LanguagePrefixRouterEnhancerPlugin
     *
     * @return array<string>
     */
    public function getAllowedLanguages(): array
    {
        return (new Container())->getLocator()->locale()->client()->getAllowedLanguages();
    }

    /**
     * @return array<string>
     */
    public function getAllowedStores(): array
    {
        return (new Container())->getLocator()->storeStorage()->client()->getStoreNames();
    }
}
```

### 3) Set up widgets

Register the following plugins to enable widgets:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| StoreSwitcherWidget | Displays a store dropdown. |  | SprykerShop\Yves\StoreWidget\Widget |


**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**


```php
<?php
namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
use SprykerShop\Yves\StoreWidget\Widget\StoreSwitcherWidget;


class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    protected function getGlobalWidgets(): array
    {
        return [
            StoreSwitcherWidget::class,
        ];
    }
}
```

### 4) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
|StoreApplicationPlugin| Provides store data to the application.||SprykerShop\Yves\StoreWidget\Plugin\ShopApplication|

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php
namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
use SprykerShop\Yves\StoreWidget\Plugin\ShopApplication\StoreApplicationPlugin;


class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    protected function getApplicationPlugins(): array
    {
        return [
            new StoreApplicationPlugin(),
        ];
    }    
}
```

## Launch and set up environment

Rebuild the application with assets and activete new endpoints:

```bash
docker/sdk boot && docker/sdk up --assets
```

{% info_block warningBox "Verification" %}

- Make sure your store is accessible at `https://yves.eu.mysprykershop.com` or `https://backoffice.eu.mysprykershop.com`.
- Make sure the store switcher is displayed on the Storefront.

{% endinfo_block %}
