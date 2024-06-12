{% info_block warningBox %}

Dynamic Multistore is currently running under an *Early Access Release*. Early Access Releases are subject to specific legal terms, they are unsupported and do not provide production-ready SLAs. They can also be deprecated without a General Availability Release. Nevertheless, we welcome feedback from early adopters on these cutting-edge, exploratory features.

{% endinfo_block %}

This document describes how to install [Dynamic Multistore](/docs/pbc/all/dynamic-multistore/{{page.version}}/base-shop/dynamic-multistore-feature-overview.html).

## Install feature core

Follow the steps below to install the Dynamic Multistore feature core.
### Prerequisites

Follow the steps below to install the Dynamic Store feature:

### 1) Make sure that Country, Locale and Currency modules migrated to the required major version

In order to make Dynamic Store work, new major versions of 3 modules must be updated.

| NAME     | VERSION |
|----------|---------|
| Country  | ^4.0.0  |
| Locale   | ^4.0.0  |
| Currency | ^4.0.0  |

Migration guides can be found here:
[Country](/docs/pbc/all/dynamic-multistore/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-country-module.html)
[Locale](/docs/pbc/all/dynamic-multistore/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-locale-module.html)
[Currency](/docs/pbc/all/dynamic-multistore/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-currency-module.html)

### 2) Install the required modules using Composer

To continue feature integration, overview and install or update the required feature:

| NAME | VERSION |
| --- | --- |
|Spryker Core  | {{page.version}} |


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
| SecurityBlockerStorefrontCustomer  |spryker/security-blocker-storefront-customer | 
| StoreDataImport | vendor/spryker/store-data-import |
| StoreGui | vendor/spryker/store-gui |
| StoreContext | vendor/spryker/store-context |
| StoreContextGui | vendor/spryker/store-context-gui |
| StoreContextStorage | vendor/spryker/store-context-storage |
| StoreContextDataImport | vendor/spryker/store-context-data-import |

{% endinfo_block %}


### 3) Set up configuration

{% info_block warningBox "Configuration stores.php" %}

Before dynamic store was introduced, configuration for the store was stored in the file `config/Shared/stores.php`. Since the dynamic store is now enabled, configuration for the store is stored in the database, making the files `config/Shared/stores.php` and `config/Shared/default_store.php` deprecated. 

The default store configuration will now be imported using new data import modules such as `StoreDataImport`, `LocaleDataImport`, `CountryDataImport` and `StoreContextDataImport`. These modules will populate the store configuration in the database.

{% endinfo_block %}


#### Deploy and configuration file changes

1. Define the region stores context by domain

Since implementation dynamic multistore features you can define region or store by domains or by headers.
We recommend defining region by domains, which is supported by default for dynamic store. 

{% info_block infoBox "Recommendations for changing domain name" %}

We recommend making de.mysprykershop.com a mirror of eu.mysprykershop.com to preserve the availability of old links in search engines.

{% endinfo_block %}


2. Enable dynamic store feature

Due to a change in the ideology with shifting to the region instead of store configuration for deploy, you need to change the deploy file to enable it.
To use the new region configuration, create a new deployment file, such as `deploy.dynamic-store.yml` (or `deploy.dev.dynamic-store.yml` for development environment).

You can check example deploy file for EU region:

***deploy.dev.dynamic-store.yml***


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
        SPRYKER_YVES_HOST_EU: yves.eu.spryker.local # See the guide for installing dynamic store availability notification feature
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
                    email: no-reply@spryker.local
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
                    mp.eu.spryker.local: # Changed Merchant portal endpoint for EU region. Use new domain name for EU region.
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
                    yves.eu.spryker.local:
                        region: EU # Use region instead store name for all stores in EU region
                        services:
                            session:
                                namespace: 2
            # Same for other endpoints
            glue_eu: 
                application: glue
                endpoints:
                    glue.eu.spryker.local:
                        region: EU
            glue_storefront_eu:
                application: glue-storefront
                endpoints:
                    glue-storefront.eu.spryker.local:
                        region: EU
            glue_backend_eu:
                application: glue-backend
                endpoints:
                    glue-backend.eu.spryker.local:
                        region: EU
            backoffice_eu:
                application: backoffice
                endpoints:
                    backoffice.eu.spryker.local:
                        region: EU
                        primal: true
                        services:
                            session:
                                namespace: 3
            backend_gateway_eu:
                application: backend-gateway
                endpoints:
                    backend-gateway.eu.spryker.local:
                        region: EU
                        primal: true
            backend_api_eu:
                application: zed
                endpoints:
                    backend-api.eu.spryker.local:
                        region: EU
                        entry-point: BackendApi

    US:
        # ...
 
# ...
docker:
    # ...
    testing:
        region: EU # Use EU region for testing insted store. 

```

New configuration for the deploy file uses the region instead of the store name for services, endpoints, applications, etc.
The environment variable `SPRYKER_DYNAMIC_STORE_MODE` enables dynamic store feature.
Make sure that there are no mentions of the store is in the new deploy file. It can lead to broken deploy process

Please, check `deploy.dev.dynamic-store.yml` file for more details.


3. Adjust configuration 

Add the following configuration to your project:

| CONFIGURATION        | SPECIFICATION | NAMESPACE |
|----------------------|---------------| --- |
| Default RabbitMQ connection. (See below in `config/Shared/config_default.php`) | Configuration allows to set the connection for queues dynamically. Use environment variable `SPRYKER_CURRENT_REGION` to set the configuration for queues | - |
| RabbitMqConfig::getQueuePools() | Configures queue pools for regions. | Pyz\Client\RabbitMq |
| RabbitMqConfig::getDefaultLocaleCode() | Returns default locale code. | Pyz\Client\RabbitMq |
| RabbitMqConfig::getSynchronizationQueueConfiguration() | Adds StoreStorageConfig::STORE_SYNC_STORAGE_QUEUE to configure sync queue. | Pyz\Client\RabbitMq |
| Setup all cron jobs (See below in `config/Zed/cronjobs/jobs.php`)  | Adjust all cron jobs to use new configuration. | - |
| StoreStorageConfig::STORE_SYNC_STORAGE_QUEUE | Configures sync queue name as used for processing store messages. | Pyz\Zed\StoreStorage |



**config/Shared/config_default.php**

Change the following code block from:

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

to:

```php
<?php

$config[RabbitMqEnv::RABBITMQ_CONNECTIONS] = [];
$connectionKeys = array_keys($rabbitConnections);
$defaultKey = reset($connectionKeys);
if (getenv('SPRYKER_CURRENT_REGION')) {
    $defaultKey = getenv('SPRYKER_CURRENT_REGION');
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

Please make sure that the following configuration is working via run `vendor/bin/console queue:setup:run` and `vendor/bin/console queue:setup:status` commands.

{% endinfo_block %}



**src/Pyz/Client/RabbitMq/RabbitMqConfig.php**

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

{% info_block warningBox "Verification" %}

Please make sure that the following configuration is working via run `vendor/bin/console queue:worker:start` command.
If the command execution was successful without rabbitmq connection errors, then everything works correctly.

{% endinfo_block %}



**config/Zed/cronjobs/jenkins.php**

Change configuration for Jenkins jobs. With the Dynamic Store setup, commands will be executed per region instead of per store.
This means that the command that will be prepared for Jenkins will use `SPRYKER_CURRENT_REGION` env variable instead of `APPLICATION_STORE`.

Delete the variable `$allStores` and its usage in the configuration of the jobs through the `stores` parameter.

```
config/Zed/cronjobs/jenkins.php
```

The code block below should be delete from your configuration file if it was used before:


```php
$stores = require(APPLICATION_ROOT_DIR . '/config/Shared/stores.php');

$allStores = array_keys($stores);

```

Also please adjust each configuration of the job to remove the variable `$allStores`.
So, job configuration will be like this:

```php
$jobs[] = [
    'name' => 'job-name',
    'command' => '$PHP_BIN vendor/bin/console product:check-validity',
    'schedule' => '0 6 * * *',
    'enable' => true,
];
```
Please add the following code to the end of the jobs configuration file.

```php

if (getenv('SPRYKER_CURRENT_REGION')) {
    foreach ($jobs as $job) {
        $job['region'] = getenv('SPRYKER_CURRENT_REGION');
    }
}
```

You also can check this configuration in the file `config/Zed/cronjobs/jenkins.php` in the [Spryker Suite repository](https://github.com/spryker-shop/suite/blob/master/config/Zed/cronjobs/jenkins.php).

{% info_block warningBox “Verification” %}

Run the following commands:

```bash
vendor/bin/console scheduler:setup 
```
And check that the jobs are created in the Jenkins with region configuration.

{% endinfo_block %}


Enable additional queue that will be used to publish `Store` data to the `Storage`.

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

Please make sure that the following configuration is working via run `vendor/bin/console queue:setup` command.
Also check queue `sync.storage.store` in the RabbitMQ.

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
        <behavior name="\Spryker\Zed\AclEntity\Persistence\Propel\Behavior\AclEntityBehavior"/>
        <behavior name="event">
            <parameter name="spy_store_all" column="*"/>
        </behavior>
    </table>

</database>
```
**src/Pyz/Zed/StoreContext/Persistence/Propel/Schema/spy_store_context.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\StoreContext\Persistence" package="src.Orm.Zed.StoreContext.Persistence">

    <table name="spy_store_context" idMethod="native">
        <behavior name="event">
            <parameter name="spy_store_context_all" column="*"/>
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

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY                       | TYPE   | EVENT   |
|---------------------------------------|--------|---------|
| spy_store.fk_locale                   | column | added   |
| spy_country_store                     | table  | added   |
| spy_locale_store                      | table  | added   |
| spy_store_context                     | table  | added   |

{% endinfo_block %}


{% info_block warningBox "Verification" %}


In order to verify that the changes are taking effect, you need to suspend the scheduler.
1. Stop scheduler and run the following commands.

```bash
vendor/bin/console scheduler:suspend
```

2. Create store in the Back Office. Setup the store country and locale.
3. Check `event` queue in RabbitMQ.  Make sure events for update store, country and locale are in the queue.

Note: Don't forget to start scheduler after the verification.


{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| LocaleConditions | class | created | src/Generated/Shared/Transfer/LocaleConditionsTransfer  |
| StoreApplicationContext | class | created | src/Generated/Shared/Transfer/StoreApplicationContextTransfer  |
| StoreApplicationContextCollection | class | created | src/Generated/Shared/Transfer/StoreApplicationContextCollectionTransfer  |
| SearchContext.storeName | property | added | src/Generated/Shared/Transfer/SearchContextTransfer |
| SchedulerJob.region     | property | added | src/Generated/Shared/Transfer/SchedulerJobTransfer  |
| ProductConcrete.stores            | property | added | src/Generated/Shared/Transfer/ProductConcreteTransfer  |
| Customer.storeName                | property | added | src/Generated/Shared/Transfer/CustomerTransfer  |
| Store.applicationContextCollection | property | added | src/Generated/Shared/Transfer/StoreTransfer  |
| StoreStorage.applicationContextCollection | property | added | src/Generated/Shared/Transfer/StoreStorageTransfer  |



{% endinfo_block %}


### 3) Configure export to Storage

1.  Set up publisher plugins and trigger plugins:

| PLUGIN | SPECIFICATION | PRERQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| StoreWritePublisherPlugin | Publishes store data to storage table. | None | Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\Store |
| StoreSynchronizationTriggeringPublisherPlugin | Publishes store data to synchronization queue. | None | Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\Store |
| LocaleStoreWritePublisherPlugin | Publishes locale store data to storage table. | None | Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\LocaleStore |
| CountryStoreWritePublisherPlugin | Publishes country store data to storage table. | None | Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\CountryStore |
| ContextStoreWritePublisherPlugin | Publishes store context data to storage table. | None | Spryker\Zed\StoreContextStorage\Communication\Plugin\Publisher\ContextStoreWritePublisherPlugin| 
| StorePublisherTriggerPlugin  | Retrieves store data based on the provided limit and offset.| - | Spryker\Zed\StoreStorage\Communication\Plugin\Publisher |



**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**


```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;
use Spryker\Zed\StoreContextStorage\Communication\Plugin\Publisher\ContextStoreWritePublisherPlugin;
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
            new ContextStoreWritePublisherPlugin(),
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


{% info_block warningBox "Verification" %}

Ensure that, when a store created, updated, or deleted with local and country data.  And it is exported to or removed from Redis.

Storage type: Redis
Target entity: Store

Example expected data identifier: `kv:store:de`

Example expected data fragment:

@#todo check redis 

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

Import locale, store and country data:

1.  Prepare your data according to your requirements using our demo data:

Example for DE store locales configurations: 

**data/import/common/DE/locale_store.csv**

```csv
locale_name,store_name
en_US,DE
de_DE,DE
```

| Column | REQUIRED | Data Type | Data Example | Data Explanation |
| --- | --- | --- | --- | --- |
| locale_name | ✓ | string | en_US | Define locale name. |
 |store_name |mandatory |string | DE | Define store name. |


Example for DE store default locale:

**data/import/common/DE/default_locale_store.csv**

```
locale_name,store_name
en_US,DE
```

| Column | REQUIRED | Data Type | Data Example | Data Explanation |
| --- | --- | --- | --- | --- |
| locale_name | ✓ | string | en_US | Define locale name. |
| store_name |mandatory |string | DE | Define store name. |



Example for DE store coutry-store configurations:

**data/import/common/DE/country_store.csv**

```csv
store_name,country
DE,DE
DE,FR
```

| Column | REQUIRED | Data Type | Data Example | Data Explanation |
| --- | --- | --- | --- | --- |
| country | ✓ | string | DE | Define counry code. |
| store_name |mandatory |string | DE | Define store name. |


**data/import/common/DE/store_context.csv**

```csv
store_name,application_context_collection
DE,"[{""application"": null, ""timezone"": ""Europe/Berlin""}]"
```


| Column | REQUIRED | Data Type | Data Example | Data Explanation |
| --- | --- | --- | --- | --- |
| store_name |mandatory |string | DE | Define store name. |
| application_context_collection | ✓ | string | `[{""application"": null, ""timezone"": ""Europe/Berlin""}]` | Define store context collection in json. |


{% info_block warningBox “Verification” %}

Make sure that:

1.  The .csv files have an empty line in the end.
2.  For each `store_name` entry in csv files, there is a respective `name` entry in the table `spy_store` in the database.
3.  For each `locale_name` entry in csv files, there is a respective `locale_name` entry in the table `spy_locale` in the database.

{% endinfo_block %}


2. Update the following import action files with the following action:
    * `data/import/common/commerce_setup_import_config_{REGION\_STORE}.yml`
    * `data/import/local/full\_{REGION\_STORE}.yml`
    * `data/import/production/full\_{SPRYKER\_STORE}.yml`

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
    - data_entity: context-store
      source: data/import/common/{REGION}/store_context.csv
```


3. Adjust `src/Pyz/Zed/DataImport/DataImportConfig.php` to setup data file paths:

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
 

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| StockDataImportPlugin | Imports Store. | None | \Spryker\Zed\StoreDataImport\Communication\Plugin\DataImport |
| CountryStoreDataImportPlugin | Imports country store relations. | None | \Spryker\Zed\CountryDataImport\Communication\Plugin\DataImport |
| LocaleStoreDataImportPlugin | Imports locale store relations. | None | \Spryker\Zed\LocaleDataImport\Communication\Plugin\DataImport |
| DefaultLocaleStoreDataImportPlugin | Imports default locale store relations. | None | \Spryker\Zed\LocaleDataImport\Communication\Plugin\DataImport |
| StoreContextDataImportPlugin | Imports store application contexts (timezone etc.). | None | \Spryker\Zed\StoreContextDataImport\Communication\Plugin\DataImport |


**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
namespace Pyz\Zed\DataImport;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\StoreDataImport\Communication\Plugin\DataImport\StoreDataImportPlugin;
use Spryker\Zed\LocaleDataImport\Communication\Plugin\DataImport\DefaultLocaleStoreDataImportPlugin;
use Spryker\Zed\LocaleDataImport\Communication\Plugin\DataImport\LocaleStoreDataImportPlugin;
use Spryker\Zed\CountryDataImport\Communication\Plugin\DataImport\CountryStoreDataImportPlugin;
use Spryker\Zed\StoreContextDataImport\Communication\Plugin\DataImport\StoreContextDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    protected function getDataImporterPlugins(): array
    {
        return [
            new StoreDataImportPlugin(),
            new CountryStoreDataImportPlugin(),
            new LocaleStoreDataImportPlugin(),
            new DefaultLocaleStoreDataImportPlugin(),
            new StoreContextDataImportPlugin(),
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
use Spryker\Zed\StoreContextDataImport\StoreContextDataImportConfig;

/**
 * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
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
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . StoreContextDataImportConfig::IMPORT_TYPE_STORE_CONTEXT),
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
vendor/bin/console data:import:context-store
```

{% info_block warningBox "Verification" %}

Make sure that warehouse and warehouse address data have been added to the `spy_locale_store`, `spy_country_store` tables.

{% endinfo_block %}

### 5) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| StoreStorageStoreExpanderPlugin | Expands store on store getting. | None | Spryker\Client\StoreStorage\Plugin\Store |
| TimezoneStoreStorageStoreExpanderPlugin | Expands store with timezone. | None | Spryker\Client\StoreContextStorage\Plugin\Store |
| StoreMetaDataProviderPlugin  | Provides store meta data. | None | Spryker\Client\Store\Plugin\ZedRequest |
| LocaleMetaDataProviderPlugin | Provides locale meta data. | None | Spryker\Client\Locale\Plugin\ZedRequest |
| ConsoleLocaleApplicationPlugin |Provides locale service. | None | Spryker\Zed\Locale\Communication\Plugin\Application |
| BackofficeStoreApplicationPlugin | Provides store service. | None | Spryker\Zed\Store\Communication\Plugin\Application |
| RequestBackendGatewayApplicationPlugin | Provides zed request service. | None | Spryker\Zed\ZedRequest\Communication\Plugin\Application |
| StoreBackendGatewayApplicationPlugin | Provides store service. | None | Spryker\Zed\Store\Communication\Plugin\Application |
| LocaleBackendGatewayApplicationPlugin | Provides locale service. | None | Spryker\Zed\Locale\Communication\Plugin\Application |
| DefaultLocaleStorePreCreateValidationPlugin | Validates default locale before store is created. | None | Spryker\Zed\Locale\Communication\Plugin\Store |
| DefaultLocaleStorePreUpdateValidationPlugin | Validates default locale before store is updated. | None | Spryker\Zed\Locale\Communication\Plugin\Store |
| ContextStorePreCreateValidationPlugin | Validates store application context before store is created. | None | Spryker\Zed\StoreContext\Communication\Plugin\Store |
| ContextStorePreUpdateValidationPlugin | Validates store application context before store is updated. | None | Spryker\Zed\StoreContext\Communication\Plugin\Store |
| CountryStorePostCreatePlugin | Update country store data after store is created. | None | Spryker\Zed\Country\Communication\Plugin\Store |
| DefaultLocaleStorePostCreatePlugin | Update default locale data after store is created. | None | Spryker\Zed\Locale\Communication\Plugin\Store |
| LocaleStorePostCreatePlugin | Update locale store data after store is created. | None | Spryker\Zed\Locale\Communication\Plugin\Store |
| SearchSetupSourcesStorePostCreatePlugin | Update search setup after store is created. | None | Spryker\Zed\Search\Communication\Plugin\Store |
| ContextStorePostCreatePlugin | Updates store context after the store is created. | None | Spryker\Zed\StoreContext\Communication\Plugin\Store |
| CountryStorePostUpdatePlugin | Update country store data after store is updated. | None | Spryker\Zed\Country\Communication\Plugin\Store |
| DefaultLocaleStorePostUpdatePlugin | Update default locale data after store is updated. | None | Spryker\Zed\Locale\Communication\Plugin\Store |
| ContextStorePostUpdatePlugin | Updates store context after the store is updated. | None | Spryker\Zed\StoreContext\Communication\Plugin\Store |
| LocaleStorePostUpdatePlugin | Update locale store data after store is updated. | None | Spryker\Zed\Locale\Communication\Plugin\Store |
| CountryStoreCollectionExpanderPlugin | Expands country store collection. | None | Spryker\Zed\Country\Communication\Plugin\Store |
| LocaleStoreCollectionExpanderPlugin | Expands locale store collection. | None | Spryker\Zed\Locale\Communication\Plugin\Store |
| LocaleStoreFormExpanderPlugin | Adds locale selection fields to the Store form. | None | Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui |
| CountryStoreFormExpanderPlugin | Adds country selection fields to the Store form. | None | Spryker\Zed\CountryGui\Communication\Plugin\StoreGui |
| LocaleStoreFormViewExpanderPlugin | Adds rendered locale tabs and tables as variables in template. | None | Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui |
| CountryStoreFormViewExpanderPlugin | Adds rendered country tabs and tables as variables in template. | None | Spryker\Zed\CountryGui\Communication\Plugin\StoreGui |
| ContextStoreFormExpanderPlugin | Expands store form with application and timezone dropdowns. | None | Spryker\Zed\StoreContextGui\Communication\Plugin\StoreGui |
| LocaleStoreFormTabExpanderPlugin | Expands Store form with Locales tab. | None | Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui |
| CountryStoreFormTabExpanderPlugin | Expands Store form with Countries tab. | None | Spryker\Zed\CountryGui\Communication\Plugin\StoreGui |
| ContextStoreFormTabExpanderPlugin | Expands Store form with application context tab. | None | Spryker\Zed\StoreContextGui\Communication\Plugin\StoreGui |
| DefaultLocaleStoreViewExpanderPlugin | Returns template path for default locale and default locale ISO code.. | None | Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui |
| AssignedLocalesStoreViewExpanderPlugin | Returns table with assigned locales. | None | Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui |
| AssignedCountriesStoreViewExpanderPlugin | Returns table with assigned countries. | None | Spryker\Zed\CountryGui\Communication\Plugin\StoreGui |
| LocaleStoreTableExpanderPlugin | Expands locale table with store column. | None | Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui |
| CountryStoreTableExpanderPlugin | Expands table data rows of store table with country codes. | None | Spryker\Zed\CountryGui\Communication\Plugin\StoreGui |
| ContextStoreCollectionExpanderPlugin | Expands store collection with application contexts. | None | Spryker\Zed\StoreContext\Communication\Plugin\Store |


@#todo - add plugins in table 


**src/Pyz/Client/Store/StoreDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Store;

use Spryker\Client\Store\StoreDependencyProvider as SprykerStoreDependencyProvider;
use Spryker\Client\StoreContextStorage\Plugin\Store\TimezoneStoreStorageStoreExpanderPlugin;
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
            new TimezoneStoreStorageStoreExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make `StoreTransfer` expend with store data from database.

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

Make sure `store` and `locale` metadata is provided with Zed request.

{% endinfo_block %}

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**
```php
<?php
namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
use Spryker\Zed\Locale\Communication\Plugin\Application\ConsoleLocaleApplicationPlugin;
 

/**
 * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
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
 
{% info_block warningBox "Verification" %}

Make sure service container has `locale` service.

{% endinfo_block %}


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

{% info_block warningBox "Verification" %}

Make sure service container has `store` and `locale` services.

{% endinfo_block %}

**src/Pyz/Zed/Store/StoreDependencyProvider.php**

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
use Spryker\Zed\StoreContext\Communication\Plugin\Store\ContextStoreCollectionExpanderPlugin;
use Spryker\Zed\StoreContext\Communication\Plugin\Store\ContextStorePostCreatePlugin;
use Spryker\Zed\StoreContext\Communication\Plugin\Store\ContextStorePostUpdatePlugin;
use Spryker\Zed\StoreContext\Communication\Plugin\Store\ContextStorePreCreateValidationPlugin;
use Spryker\Zed\StoreContext\Communication\Plugin\Store\ContextStorePreUpdateValidationPlugin;
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
            new ContextStorePreCreateValidationPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreExtension\Dependency\Plugin\StorePreUpdateValidationPluginInterface>
     */
    protected function getStorePreUpdateValidationPlugins(): array
    {
        return [
            new DefaultLocaleStorePreUpdateValidationPlugin(),
            new ContextStorePreUpdateValidationPlugin(),
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
            new ContextStorePostCreatePlugin(),
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
            new ContextStorePostUpdatePlugin(),
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
            new ContextStoreCollectionExpanderPlugin(),
        ];
    }
}

```

{% info_block warningBox "Verification" %}

Steps to verify:
- Make sure that you get an error message if you try to create a store with a default locale that is not assigned to the store.
- Make sure that you get an error message if you try to update a store with a default locale that is not assigned to the store.
- Make sure that you can create a store with countries assigned to it.
- Make sure that you can update a store with a default locale assigned to it.
- Make sure that you can create a store with locales assigned to it.
- Make sure that you can update a store with countries assigned to it.
- Make sure that you can update a store with a default locale assigned to it.
- Make sure that you can update a store with locales assigned to it.

{% endinfo_block %}


**src/Pyz/Zed/StoreGui/StoreGuiDependencyProvider.php**

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
use Spryker\Zed\StoreContextGui\Communication\Plugin\StoreGui\ContextStoreFormExpanderPlugin;
use Spryker\Zed\StoreContextGui\Communication\Plugin\StoreGui\ContextStoreFormTabExpanderPlugin;
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
            new ContextStoreFormExpanderPlugin(),
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
            new ContextStoreFormTabExpanderPlugin(),
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

{% info_block warningBox "Verification" %}

Steps to verify:
- Make sure that you can see the locale selection fields on the Store form.
- Make sure that you can see the country selection fields on the Store form.
- Make sure that you can see the rendered locale tabs and tables on the Store form.
- Make sure that you can see the rendered country tabs and tables on the Store form.
- Make sure that you can see the Locales tab on the Store form.
- Make sure that you can see the Countries tab on the Store form.
- Make sure that you can see the Settings tab on the Store form.
- Make sure that you can see the default locale ISO code on the Store view page.
- Make sure that you can see the table with assigned locales on the Store view page.
- Make sure that you can see the table with assigned countries on the Store view page.
- Make sure that you can see the locale codes in the store table.   
- Make sure that you can see the countries in the store table.

{% endinfo_block %}


## Install feature frontend

### Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
|Spryker Core  | {{page.version}} |

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

Append glossary according to your configuration:

**data/import/common/common/glossary.csv**


```csv
store_widget.switcher.store,Store:,en_US
store_widget.switcher.store,Shop:,de_DE
```

Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data are added to the `spy_glossary` table.

{% endinfo_block %}


### 2) Set up configuration

Add the following configuration to your project:

| CONFIGURATION | SPECIFICATION | NAMESPACE |
| --- | --- | --- |
| RouterConfig::getAllowedLanguages() |  Returns a list of supported languages for Route manipulation. Will be used to strip of language information from a route before a route is matched. | Spryker\Yves\Router |


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
}
```

### 3) Set up widgets

1. Register the following plugins to enable widgets:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| StoreSwitcherWidget | Provides functionality to display a store dropdown. | None | SprykerShop\Yves\StoreWidget\Widget |


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
            ...
            StoreSwitcherWidget::class,
            ...
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that store switcher is displayed on the page.

{% endinfo_block %}


### 4) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
|StoreApplicationPlugin| Provides store data to the application.|None|SprykerShop\Yves\StoreWidget\Plugin\ShopApplication|

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


{% info_block warningBox "Verification" %}

Make sure the container has a store `store` service set. 

{% endinfo_block %}
