This document describes how to install [Dynamic Multistore](/docs/pbc/all/dynamic-multistore/{{page.version}}/base-shop/dynamic-multistore-feature-overview.html).

## Install feature core

Follow the steps below to install the Dynamic Multistore feature core.

### Prerequisites for projects below version 202307.0

{% info_block warningBox "Project version" %}

If your project is of version 202307.0 or later, go to [Enable the dynamic store feature](/docs/pbc/all/dynamic-multistore/{{page.version}}/base-shop/install-and-upgrade/install-features/install-dynamic-multistore.html#enable-the-dynamic-store-feature).

{% endinfo_block %}

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


3. Install the required modules:

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

{% info_block warningBox "Dependencies issues" %}

You might need to update or install related dependencies. For more details on how to update modules, see [Updating Spryker](/docs/dg/dev/updating-spryker/updating-spryker.html#spryker-product-structure).

{% endinfo_block %}


### 1) Enable the dynamic store feature

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

In this configuration, region is used for entities like services, endpoints, or applications. The `SPRYKER_DYNAMIC_STORE_MODE` variable enables the dynamic multistore feature. Make sure stores are not used in the new configuration to avoid deployment failures.


#### Configure deployment recipe files


If you have deployment hooks in the deployment file, you need to remove stores from the recipe files.

Here's how a deployment files with hooks looks like:

```yml
SPRYKER_HOOK_BEFORE_DEPLOY: 'vendor/bin/install -r pre-deploy -vvv'
SPRYKER_HOOK_AFTER_DEPLOY: 'true'
SPRYKER_HOOK_INSTALL: 'vendor/bin/install -r production --no-ansi -vvv'
SPRYKER_HOOK_DESTRUCTIVE_INSTALL: 'vendor/bin/install -r destructive --no-ansi -vvv'
```

And here's a recipe file with stores:

```yml
env:
    NEW_RELIC_ENABLED: 0

stores:
    - DE
    - AT

sections:
    .....
```

Remove the stores section and add a region to environment variables:

```yml
env:
    NEW_RELIC_ENABLED: 0
    SPRYKER_CURRENT_REGION: EU

sections:
    .....
```

### 2) Set up configuration

Before the introduction of dynamic multistore, configuration was managed in `config/Shared/stores.php`. With dynamic multistore, configuration is managed in the database. `config/Shared/stores.php` and `config/Shared/default_store.php` are now obsolete.

The default configuration is imported using data import modules, such as StoreDataImport, LocaleDataImport, CountryDataImport, and other feature-related imports, like CurrencyDataImport.

Take the following steps to set up configuration.

#### Define the region stores context by domain

With dynamic multistore, you can define region or store using domains or headers. We recommend defining region using domains.

{% info_block infoBox "Changing the domain name" %}

To preserve the availability of old links in search engines, we recommend making `de.mysprykershop.com` a mirror of `eu.mysprykershop.com`.

{% endinfo_block %}


#### Configure the application

1. Add the following configuration:

| CONFIGURATION        | SPECIFICATION | NAMESPACE |
|----------------------|---------------| --- |
|  Default RabbitMQ connection configuration: `config/Shared/config_default.php`. | Enables the connection for queues to be set dynamically. Use the `SPRYKER_CURRENT_REGION` environment variable to set the configuration for queues. |  |
| RabbitMqConfig::getQueuePools() | Configures queue pools for regions. | Pyz\Client\RabbitMq |
| RabbitMqConfig::getDefaultLocaleCode() | Returns the default locale code. | Pyz\Client\RabbitMq |
| RabbitMqConfig::getSynchronizationQueueConfiguration() | Adds `1StoreStorageConfig::STORE_SYNC_STORAGE_QUEUE1` to configure the sync queue. | Pyz\Client\RabbitMq |
| StoreStorageConfig::STORE_SYNC_STORAGE_QUEUE | Configures the sync queue name to be used for processing store messages. | Pyz\Zed\StoreStorage |


2. Update the configuration:
**config/Shared/config_default.php**

Original configuration:
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

Updated configuration:
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


3. Add the following to the end of the jobs configuration file:

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


5. Set up the queue infrastructure:

```bash
vendor/bin/console queue:setup
```

{% info_block warningBox "Verification" %}

Make sure the `sync.storage.store` queue exists in RabbitMQ.

{% endinfo_block %}



### 3) Set up the database schema and transfer objects

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

Make sure the following changes have been applied in the database:

| DATABASE ENTITY                       | TYPE   | EVENT   |
|---------------------------------------|--------|---------|
| spy_store.fk_locale                   | column | added   |
| spy_country_store                     | table  | added   |
| spy_locale_store                      | table  | added   |
| spy_store_context                     | table  | added   |

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
| StoreApplicationContext | class | created | src/Generated/Shared/Transfer/StoreApplicationContextTransfer  |
| StoreApplicationContextCollection | class | created | src/Generated/Shared/Transfer/StoreApplicationContextCollectionTransfer  |
| SearchContext.storeName | property | added | src/Generated/Shared/Transfer/SearchContextTransfer |
| SchedulerJob.region     | property | added | src/Generated/Shared/Transfer/SchedulerJobTransfer  |
| ProductConcrete.stores  | property | added | src/Generated/Shared/Transfer/ProductConcreteTransfer  |
| Customer.storeName      | property | added | src/Generated/Shared/Transfer/CustomerTransfer  |
| Store.applicationContextCollection | property | added | src/Generated/Shared/Transfer/StoreTransfer  |
| StoreStorage.applicationContextCollection | property | added | src/Generated/Shared/Transfer/StoreStorageTransfer  |


{% endinfo_block %}


### 4) Configure export to Storage

1.  Set up publisher plugins and trigger plugins:

| PLUGIN | SPECIFICATION | PRERQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| StoreWritePublisherPlugin | Publishes store data to storage table. |  | Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\Store |
| StoreSynchronizationTriggeringPublisherPlugin | Publishes store data to a synchronization queue. |  | Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\Store |
| LocaleStoreWritePublisherPlugin | Publishes locale store data to a storage table. |  | Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\LocaleStore |
| CountryStoreWritePublisherPlugin | Publishes country store data to a storage table. |  | Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\CountryStore |
| ContextStoreWritePublisherPlugin | Publishes store context data to a storage table. |  | Spryker\Zed\StoreContextStorage\Communication\Plugin\Publisher\ContextStoreWritePublisherPlugin|
| StorePublisherTriggerPlugin  | Retrieves store data based on the provided limit and offset. | | Spryker\Zed\StoreStorage\Communication\Plugin\Publisher |


<details>
<summary>src/Pyz/Zed/Publisher/PublisherDependencyProvider.php</summary>


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
  "default_currency_iso_code": "EUR",
  "available_currency_iso_codes": [
    "EUR",
    "CHF"
  ],
  "available_locale_iso_codes": [
    "en_US",
    "de_DE"
  ],
  "stores_with_shared_persistence": [],
  "countries": [
    "DE",
    "CH"
  ],
  "country_names": [
    "Germany",
    "Switzerland"
  ],
  "application_context_collection": {
    "application_contexts": [
      {
        "application": null,
        "timezone": "Europe/Berlin"
      }
    ]
  },
  "_timestamp": 100000000.000000
}
```

{% endinfo_block %}

### 5) Import data

Import locale, store, and country data:

1.  Prepare your data according to your requirements using our demo data:

Example of locales configuration for the DE store:

| COLUMN     | REQUIRED | Data Type | Data Example | Data Explanation |
|------------| --- | --- | --- | --- |
|name        | ✓ | string | DE | Define store name. |

**data/import/common/{REGION}/store.csv**
```csv
name
DE
AT

```

| Column     | REQUIRED | Data Type | Data Example | Data Explanation |
|------------| --- | --- | --- | --- |
|name        | ✓ |string | DE | Define store name. |

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


Example of country-store configuration for the DE store:

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

**data/import/common/DE/store_context.csv**
```csv
store_name,application_context_collection
DE,"[{""application"": null, ""timezone"": ""Europe/Berlin""}]"
```


| Column | REQUIRED | Data Type | Data Example | Data Explanation |
| --- | --- | --- | --- | --- |
| store_name |mandatory |string | DE | Define store name. |
| application_context_collection | ✓ | string | `[{""application"": null, ""timezone"": ""Europe/Berlin""}]` | Defines a store context collection in JSON. |


{% info_block warningBox “Verification” %}

Make sure the following applies:

*  For each `store_name` entry in the imported CSV files, a respective `name` entry has been added to the `spy_store` database table.
*  For each `locale_name` entry in the imported CSV files, a respective `locale_name` entry has been added to the `spy_locale` database table.

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
    - data_entity: context-store
      source: data/import/common/{REGION}/store_context.csv      
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
| StoreDataImportPlugin | Imports stores. |  | \Spryker\Zed\StoreDataImport\Communication\Plugin\DataImport |
| CountryStoreDataImportPlugin | Imports country to store relations. |  | \Spryker\Zed\CountryDataImport\Communication\Plugin\DataImport |
| LocaleStoreDataImportPlugin | Imports locale to store relations. |  | \Spryker\Zed\LocaleDataImport\Communication\Plugin\DataImport |
| DefaultLocaleStoreDataImportPlugin | Imports default locale to store relations. |  | \Spryker\Zed\LocaleDataImport\Communication\Plugin\DataImport |
| StoreContextDataImportPlugin | Imports store application contexts like timezone. |  | \Spryker\Zed\StoreContextDataImport\Communication\Plugin\DataImport |


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

<details>
  <summary>src/Pyz/Zed/Console/ConsoleDependencyProvider.php</summary>

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

</details>


5. Import data:

```bash
vendor/bin/console data:import:locale-store
vendor/bin/console data:import:default-locale-store
vendor/bin/console data:import:country-store
vendor/bin/console data:import:context-store
```

{% info_block warningBox "Verification" %}

Make sure the data for locale-store and country-store relationships have been added to the `spy_locale_store` and `spy_country_store` tables.

{% endinfo_block %}

### 6) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| StoreStorageStoreExpanderPlugin | Expands store on store getting. |  | Spryker\Client\StoreStorage\Plugin\Store |
| TimezoneStoreStorageStoreExpanderPlugin | Expands store with a timezone. |  | Spryker\Client\StoreContextStorage\Plugin\Store |
| StoreMetaDataProviderPlugin  | Provides store metadata. |  | Spryker\Client\Store\Plugin\ZedRequest |
| LocaleMetaDataProviderPlugin | Provides locale metadata. |  | Spryker\Client\Locale\Plugin\ZedRequest |
| ConsoleLocaleApplicationPlugin |Provides a locale service. |  | Spryker\Zed\Locale\Communication\Plugin\Application |
| BackofficeStoreApplicationPlugin | Provides a store service. |  | Spryker\Zed\Store\Communication\Plugin\Application |
| RequestBackendGatewayApplicationPlugin | Provides a zed request service. |  | Spryker\Zed\ZedRequest\Communication\Plugin\Application |
| StoreBackendGatewayApplicationPlugin | Provides a store service. |  | Spryker\Zed\Store\Communication\Plugin\Application |
| LocaleBackendGatewayApplicationPlugin | Provides a locale service. |  | Spryker\Zed\Locale\Communication\Plugin\Application |
| DefaultLocaleStorePreCreateValidationPlugin | Validates the default locale before a store is created. |  | Spryker\Zed\Locale\Communication\Plugin\Store |
| DefaultLocaleStorePreUpdateValidationPlugin | Validates the default locale before a store is updated. |  | Spryker\Zed\Locale\Communication\Plugin\Store |
| ContextStorePreCreateValidationPlugin | Validates store application context before a store is created. |  | Spryker\Zed\StoreContext\Communication\Plugin\Store |
| ContextStorePreUpdateValidationPlugin | Validates store application context before a store is updated. |  | Spryker\Zed\StoreContext\Communication\Plugin\Store |
| CountryStorePostCreatePlugin | Updates country store data after a store is created. |  | Spryker\Zed\Country\Communication\Plugin\Store |
| DefaultLocaleStorePostCreatePlugin | Updates default locale data after a store is created. |  | Spryker\Zed\Locale\Communication\Plugin\Store |
| LocaleStorePostCreatePlugin | Updates locale store data after a store is created. |  | Spryker\Zed\Locale\Communication\Plugin\Store |
| SearchSetupSourcesStorePostCreatePlugin | Updates search setup after a store is created. |  | Spryker\Zed\Search\Communication\Plugin\Store |
| ContextStorePostCreatePlugin | Updates store context after a store is created. |  | Spryker\Zed\StoreContext\Communication\Plugin\Store |
| CountryStorePostUpdatePlugin | Updates country store data after a store is updated. |  | Spryker\Zed\Country\Communication\Plugin\Store |
| DefaultLocaleStorePostUpdatePlugin | Updates default locale data after a store is updated. |  | Spryker\Zed\Locale\Communication\Plugin\Store |
| ContextStorePostUpdatePlugin | Updates store context after the store is updated. |  | Spryker\Zed\StoreContext\Communication\Plugin\Store |
| LocaleStorePostUpdatePlugin | Updates locale store data after a store is updated. |  | Spryker\Zed\Locale\Communication\Plugin\Store |
| CountryStoreCollectionExpanderPlugin | Expands a country store collection. |  | Spryker\Zed\Country\Communication\Plugin\Store |
| LocaleStoreCollectionExpanderPlugin | Expands a locale store collection. |  | Spryker\Zed\Locale\Communication\Plugin\Store |
| LocaleStoreFormExpanderPlugin | Adds locale selection fields to the Store form. |  | Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui |
| CountryStoreFormExpanderPlugin | Adds country selection fields to the Store form. |  | Spryker\Zed\CountryGui\Communication\Plugin\StoreGui |
| LocaleStoreFormViewExpanderPlugin | Adds rendered locale tabs and tables as variables in a template. |  | Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui |
| CountryStoreFormViewExpanderPlugin | Adds rendered country tabs and tables as variables in a template. |  | Spryker\Zed\CountryGui\Communication\Plugin\StoreGui |
| ContextStoreFormExpanderPlugin | Expands the store form with application and timezone dropdowns. |  | Spryker\Zed\StoreContextGui\Communication\Plugin\StoreGui |
| LocaleStoreFormTabExpanderPlugin | Expands the Store form with the Locales tab. |  | Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui |
| CountryStoreFormTabExpanderPlugin | Expands the Store form with the Countries tab. |  | Spryker\Zed\CountryGui\Communication\Plugin\StoreGui |
| ContextStoreFormTabExpanderPlugin | Expands Store form with the application context tab. |  | Spryker\Zed\StoreContextGui\Communication\Plugin\StoreGui |
| DefaultLocaleStoreViewExpanderPlugin | Returns a template path for the default locale and default locale ISO code. |  | Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui |
| AssignedLocalesStoreViewExpanderPlugin | Returns a table with assigned locales. |  | Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui |
| AssignedCountriesStoreViewExpanderPlugin | Returns a table with assigned countries. |  | Spryker\Zed\CountryGui\Communication\Plugin\StoreGui |
| LocaleStoreTableExpanderPlugin | Expands the locale table with a store column. |  | Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui |
| CountryStoreTableExpanderPlugin | Expands table data rows of the store table with country codes. |  | Spryker\Zed\CountryGui\Communication\Plugin\StoreGui |
| ContextStoreCollectionExpanderPlugin | Expands a store collection with application contexts. |  | Spryker\Zed\StoreContext\Communication\Plugin\Store |


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

</details>

{% info_block warningBox "Verification" %}

Make sure the following applies:
- When you try to create a store with a default locale that is not assigned to the store, an error message is returned.
- When you try to update a store with a default locale that is not assigned to the store, an error message is returned.
- You can create a store with countries assigned to it.
- You can update a store with a default locale assigned to it.
- You can create a store with locales assigned to it.
- You can update a store with countries assigned to it.
- You can update a store with a default locale assigned to it.
- You can update a store with locales assigned to it.
- You can create a store with a store context assigned to it.
- You can update a store with a store context assigned to it.

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

</details>

{% info_block warningBox "Verification" %}

- Make sure the locale selection fields are displayed on the Store form.
- Make sure the country selection fields are displayed on the Store form.
- Make sure the rendered locale tabs and tables are displayed on the Store form.
- Make sure the rendered country tabs and tables are displayed on the Store form.
- Make sure the **Locales** tab is displayed on the Store form.
- Make sure the **Countries** tab is displayed on the Store form.
- Make sure the **Settings** tab is displayed on the Store form.
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


### 3) Set up configuration

Add the following configuration:

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

### 4) Set up widgets

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

### 5) Set up behavior

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

Rebuild the application with assets and activate new endpoints:

```bash
docker/sdk boot && docker/sdk up --assets
```

{% info_block warningBox "Verification" %}

- Make sure your store is accessible at `https://yves.eu.mysprykershop.com` or `https://backoffice.eu.mysprykershop.com`.
- Make sure the store switcher is displayed on the Storefront.

{% endinfo_block %}

## Store in URL

If you want a store name as part of the URL path, follow the steps below.

{% info_block warningBox "Verification" %}

If you are working with pre-generated internal URLs in Twig templates, you must now wrap them using the new Twig function `generatePath()`.
This function is provided by the `GeneratePathTwigPlugin` plugin.
This ensures the URLs include the necessary context (store name) based on the current request.

{% endinfo_block %}

Enable the store name in URL functionality:

**config/Shared/config_default.php**

```php
<?php
use Spryker\Shared\Locale\LocaleConstants;
use Spryker\Shared\Router\RouterConstants;
use SprykerShop\Shared\ShopUi\ShopUiConstants;
use SprykerShop\Shared\StorageRouter\StorageRouterConstants;
use SprykerShop\Shared\StoreWidget\StoreWidgetConstants;

$config[RouterConstants::IS_STORE_ROUTING_ENABLED]
    = $config[StoreWidgetConstants::IS_STORE_ROUTING_ENABLED]
    = $config[StorageRouterConstants::IS_STORE_ROUTING_ENABLED]
    = $config[ShopUiConstants::IS_STORE_ROUTING_ENABLED]
    = $config[LocaleConstants::IS_STORE_ROUTING_ENABLED] = true;

```

Enable the following behaviors by registering the plugins and Twig command:

| PLUGIN | SPECIFICATION                                                                                                                                                                                                                                                                                      | PREREQUISITES | NAMESPACE |
| --- |----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| --- | --- |
|StorePrefixRouterEnhancerPlugin| Extracts and adding the current store name to the Route parameters, and for prefixing the generated URL with the current store name. Through the \Spryker\Yves\Router\RouterConfig::getAllowedStores() configuration, you tell this plugin what store names it has to work with.                   ||Spryker\Yves\Router\Plugin\RouterEnhancer|
|LanguagePrefixRouterEnhancerPlugin| Extracts and adding the current language to the Route parameters, and to prefix the generated URLs with the current language. Through the \Spryker\Yves\Router\RouterConfig::getAllowedLanguages() configuration, you tell this plugin what languages it has to work with.                         ||Spryker\Yves\Router\Plugin\RouterEnhancer|
|StorePrefixStorageRouterEnhancerPlugin| Extracts and adding the current store name to the Route parameters, and for prefixing the generated URL with the current store name. Through the \SprykerShop\Yves\StorageRouter\StorageRouterConfig::getAllowedStores() configuration, you tell this plugin what store names it has to work with. ||SprykerShop\Yves\StorageRouter\Plugin\RouterEnhancer|
|GeneratePathTwigPlugin| Wrapper on Symfony Router `generate()` function.                                                                                                                                                                                                                                                   ||SprykerShop\Yves\ShopUi\Plugin\Twig|



{% info_block warningBox "Verification" %}

In the RouterDependencyProvider::getRouterEnhancerPlugins() stack, the order of plugin execution has changed:
•   By default store name placed before the language prefix in the URL. Example: `https://yves.eu.mysprykershop.com/DE/en/`.    
•	So the `StorePrefixRouterEnhancerPlugin` must now be executed before the `LanguagePrefixRouterEnhancerPlugin`.
•	Ensure your plugin stack reflects this updated order to maintain the correct routing behavior.

{% endinfo_block %}

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php
namespace Pyz\Yves\Router;

use Spryker\Yves\Router\Plugin\RouterEnhancer\LanguagePrefixRouterEnhancerPlugin;
use Spryker\Yves\Router\Plugin\RouterEnhancer\StorePrefixRouterEnhancerPlugin;
use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;


class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return array<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouterEnhancerPluginInterface>
     */
    protected function getRouterEnhancerPlugins(): array
    {
        return [
            new StorePrefixRouterEnhancerPlugin(),
            new LanguagePrefixRouterEnhancerPlugin(),
        ];
    }
}
```

**src/Pyz/Yves/StorageRouter/StorageRouterDependencyProvider.php**

```php
<?php
namespace Pyz\Yves\StorageRouter;

use SprykerShop\Yves\StorageRouter\Plugin\RouterEnhancer\StorePrefixStorageRouterEnhancerPlugin;
use SprykerShop\Yves\StorageRouter\StorageRouterDependencyProvider as SprykerShopStorageRouterDependencyProvider;


class StorageRouterDependencyProvider extends SprykerShopStorageRouterDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\StorageRouterExtension\Dependency\Plugin\StorageRouterEnhancerPluginInterface>
     */
    protected function getStorageRouterEnhancerPlugins(): array
    {
        return [
            new StorePrefixStorageRouterEnhancerPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

We do not need `LanguagePrefixRouterEnhancerPlugin` for the StorageRouter, as the language is already part of the URL for the StorageRouter.

{% endinfo_block %}

**src/Pyz/Yves/Twig/TwigDependencyProvider.php**

```php
<?php
namespace Pyz\Yves\Twig;

use Spryker\Yves\Twig\TwigDependencyProvider as SprykerTwigDependencyProvider;
use SprykerShop\Yves\ShopUi\Plugin\Twig\GeneratePathTwigPlugin;


class TwigDependencyProvider extends SprykerTwigDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\TwigExtension\Dependency\Plugin\TwigPluginInterface>
     */
    protected function getTwigPlugins(): array
    {
        return [
            new GeneratePathTwigPlugin(),
        ];
    }
}
```
