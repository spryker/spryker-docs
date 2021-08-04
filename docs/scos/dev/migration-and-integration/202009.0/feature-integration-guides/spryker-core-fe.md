---
title: Spryker core feature integration
originalLink: https://documentation.spryker.com/v6/docs/spryker-core-feature-integration
redirect_from:
  - /v6/docs/spryker-core-feature-integration
  - /v6/docs/en/spryker-core-feature-integration
---

{% info_block infoBox "Included features" %}

The following Feature integration guide expects the basic feature to be in place.
The current Feature integration guide only adds the following functionalities:
*     Vault
*     Redis Session
*     Store GUI

{% endinfo_block %}


## Install feature core

Follow the steps below to install Spryker Core feature core.

### 1) Install the required modules using Composer
Run the following command to install the required modules:

```bash
composer require "spryker-feature/spryker-core": "dev-master"
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:
| Module | Expected Directory |
| --- | --- |   
| `UtilEncryption` | `vendor/spryker/util-encryption` |
| `Vault` | `vendor/spryker/vault` |
| `SessionExtension` | `vendor/spryker/session-extension` |
| `SessionRedis` | `vendor/spryker/session-redis` |
| `SessionFile` | `vendor/spryker/session-file` |
| `StoreGui`   | `vendor/spryker/store-gui` |
| `StorageExtension` | `vendor/spryker/storage-extension` |
| `StorageRedis` | `vendor/spryker/storage-redis` |
 
{% endinfo_block %}



### 2) Set up database schema and transfer objects
Run the following commands to apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| Database Entity | Type | Event |
| --- | --- | --- |
| `spy_vault_deposit` | table | created |

{% endinfo_block %}
    

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:
| Transfer | Type | Event | Path | 
| --- | --- | --- | --- |
| `SpyVaultDepositEntity` | class | created | `src/Generated/Shared/Transfer/SpyVaultDepositEntityTransfer` |
| `VaultDeposit` | class | created | `src/Generated/Shared/Transfer/VaultDepositTransfer` |
| `RedisConfiguration` | class | created | `src/Generated/Shared/Transfer/RedisConfigurationTransfer` |
| `RedisCredentials` | class | created | `src/Generated/Shared/Transfer/RedisCredentialsTransfer` |


{% endinfo_block %}
    



### 3) Set up configuration

Set up the following configuration. 

#### Vault

Add the following configuration to your project:

| Configuration | Specification | Namespace |
| --- | --- | --- |
| `VaultConstants::ENCRYPTION_KEY` | Encrypts vault data. | `Spryker\Shared\Vault` |

{% info_block errorBox "Security measures" %}
Make sure that the encryption key is secured in your live environment. This key protects all data stored in the Vault.
{% endinfo_block %}

**config/Shared/config_local.php**    

```php
<?php
 
use Spryker\Shared\Vault\VaultConstants;
 
$config[VaultConstants::ENCRYPTION_KEY] = "PLEASE ADJUST THIS ENCRYPTION KEY TO SECURE ONE"

```


{% info_block warningBox "Verification" %}

Having finished integrating the feature, make sure that you can store and retrieve data from the vault using `VaultFacade`. Example:
```php
$secret = "actual_secret";
 
$vaultFacade->store("secret_category", "secret_id", $secret);
 
assertSame($secret, $vaultFacade->retrieve("secret_category", "secret_id"));
```

{% endinfo_block %}



#### Redis
Add the configuration to your project:

| Deprecated | Specification | Replaced by |
| --- | --- | --- |
| `SessionRedisConstants::LOCKING_TIMEOUT_MILLISECONDS` | Defines Redis lock timeout in milliseconds. | `Spryker\Shared\SessionRedis` |
| `SessionRedisConstants::LOCKING_RETRY_DELAY_MICROSECONDS` | Defines the retry delay between the attempts to acquire Redis lock in microseconds. | `Spryker\Shared\SessionRedis` |
| `SessionRedisConstants::LOCKING_LOCK_TTL_MILLISECONDS` | Defines the time to live for Redis lock in milliseconds. | `Spryker\Shared\SessionRedis` |
| `SessionFileConstants::ZED_SESSION_FILE_PATH` | Defines the filesystem path for storing Zed sessions. | `Spryker\Shared\SessionFile` |
| `SessionRedisConstants::ZED_SESSION_REDIS_SCHEME` | Defines the protocol used while connecting to Redis as Zed session storage. | `Spryker\Shared\SessionRedis` |
| `SessionRedisConstants::ZED_SESSION_REDIS_PASSWORD` | Defines the password used while connecting to Redis as Zed session storage. | `Spryker\Shared\SessionRedis` |
| `SessionRedisConstants::ZED_SESSION_REDIS_HOST` | Defines the host used while connecting to Redis as Zed session storage. | `Spryker\Shared\SessionRedis` |
| `SessionRedisConstants::ZED_SESSION_REDIS_PORT` | Defines the protocol used while connecting to Redis as Zed session storage. | `Spryker\Shared\SessionRedis` |
| `SessionRedisConstants::ZED_SESSION_REDIS_DATABASE` | Defines the database used while connecting to Redis as Zed session storage. | `Spryker\Shared\SessionRedis` |
| `SessionRedisConstants::ZED_SESSION_REDIS_DATA_SOURCE_NAMES` | Defines the list of DSNs used while connecting to Redis as Zed session storage in replication mode. | `Spryker\Shared\SessionRedis` |
| `SessionRedisConstants::ZED_SESSION_REDIS_CLIENT_OPTIONS` | Defines the list of client options used while connecting to Redis as Zed session storage in replication mode. | `Spryker\Shared\SessionRedis` |
| `StorageRedisConstants::STORAGE_REDIS_SCHEME` | Defines the protocol used while connecting to Redis as key-value storage. | `Spryker\Shared\StorageRedis` |
| `StorageRedisConstants::STORAGE_REDIS_PASSWORD` | Defines the password used while connecting to Redis as key-value storage. | `Spryker\Shared\StorageRedis` |
| `StorageRedisConstants::STORAGE_REDIS_HOST` | Defines the host used while connecting to Redis as key-value storage. | `Spryker\Shared\StorageRedis` |
| `StorageRedisConstants::STORAGE_REDIS_PORT` | Defines the port used while connecting to Redis as key-value storage. | `Spryker\Shared\StorageRedis` |
| `StorageRedisConstants::STORAGE_REDIS_DATABASE` | Defines the database used while connecting to Redis as key-value storage. | `Spryker\Shared\StorageRedis` |
| `StorageRedisConstants::STORAGE_REDIS_PERSISTENT_CONNECTION` | Enables/disables data persistence for a Redis connection. | `Spryker\Shared\StorageRedis` |
| `StorageRedisConstants::STORAGE_REDIS_DATA_SOURCE_NAMES` | Specifies an array of DSN strings for a multi-instance cluster/replication Redis setup. | `Spryker\Shared\StorageRedis` |
| `StorageRedisConstants::STORAGE_REDIS_CONNECTION_OPTIONS` | Specifies an array of client options for connecting to Redis as key-value storage. | `Spryker\Shared\StorageRedis` |

#### General storage
* In case of multi-instance Redis setup, extend your project with the following configuration:

**config/Shared/config_default.php**

```php
<?php
 
use Spryker\Shared\StorageRedis\StorageRedisConstants;
 
// ---------- KV storage
$config[StorageRedisConstants::STORAGE_REDIS_DATA_SOURCE_NAMES] = ['tcp://127.0.0.1:10009', 'tcp://10.0.0.1:6379'];
$config[StorageRedisConstants::STORAGE_REDIS_CONNECTION_OPTIONS] = [
    'replication' => 'sentinel',
    'service' => 'mymaster',
    'parameters' => [
        'password' => 'secret',
        'database' => 0,
    ],
];
```

{% info_block warningBox "Note" %}
This configuration is used exclusively. In other words, you can't use any other Redis configuration.
{% endinfo_block %}

* In case of single-instance Redis setup, extend your project with the following configuration:

**config/Shared/config_default.php**

```php
<?php
 
use Spryker\Shared\StorageRedis\StorageRedisConstants;
 
// ---------- KV storage
$config[StorageRedisConstants::STORAGE_REDIS_PERSISTENT_CONNECTION] = true;
$config[StorageRedisConstants::STORAGE_REDIS_PROTOCOL] = 'tcp';
$config[StorageRedisConstants::STORAGE_REDIS_HOST] = '127.0.0.1';
$config[StorageRedisConstants::STORAGE_REDIS_PORT] = 6379;
$config[StorageRedisConstants::STORAGE_REDIS_PASSWORD] = false;
$config[StorageRedisConstants::STORAGE_REDIS_DATABASE] = 0;
```

{% info_block warningBox "Note" %}
All the values in the examples above should be replaced with the real ones used in the corresponding environment.
{% endinfo_block %}

#### Session storage
If you're using Redis as session storage, extend your project with the following configuration:

**config/Shared/config_default.php**

```php
<?php
 
use Spryker\Shared\Session\SessionConfig;
use Spryker\Shared\Session\SessionConstants;
use Spryker\Shared\SessionRedis\SessionRedisConfig;
use Spryker\Shared\SessionRedis\SessionRedisConstants;
 
// ---------- Session
$config[SessionConstants::ZED_SESSION_SAVE_HANDLER] = SessionRedisConfig::SESSION_HANDLER_REDIS;
$config[SessionRedisConstants::ZED_SESSION_TIME_TO_LIVE] = SessionConfig::SESSION_LIFETIME_1_HOUR;
$config[SessionRedisConstants::LOCKING_TIMEOUT_MILLISECONDS] = 0;
$config[SessionRedisConstants::LOCKING_RETRY_DELAY_MICROSECONDS] = 0;
$config[SessionRedisConstants::LOCKING_LOCK_TTL_MILLISECONDS] = 0;
```

{% info_block warningBox "Note" %}
`SessionRedisConfig::SESSION_HANDLER_REDIS_LOCKING` and `SessionRedisConfig::SESSION_HANDLER_REDIS` can be used as values for `SessionConstants::ZED_SESSION_SAVE_HANDLER`.
{% endinfo_block %}

* In case of a multi-instance Redis setup, extend your project with the following configuration:

**config/Shared/config_default.php**

```php
<?php
 
use Spryker\Shared\SessionRedis\SessionRedisConstants;
 
$config[SessionRedisConstants::ZED_SESSION_REDIS_DATA_SOURCE_NAMES] = ['tcp://127.0.0.1:10009', 'tcp://10.0.0.1:6379'];
$config[SessionRedisConstants::ZED_SESSION_REDIS_CLIENT_OPTIONS] = [
    'replication' => 'sentinel',
    'service' => 'mymaster',
    'parameters' => [
        'password' => 'secret',
        'database' => 2,
    ],
];
```

{% info_block warningBox "Note" %}
This configuration is used exclusively. In other words, you can't use any other Redis configuration.
{% endinfo_block %}

* In case of a single-instance Redis setup, extend your project with the following configuration:

**config/Share/config_default.php**
```php
<?php
 
use Spryker\Shared\SessionRedis\SessionRedisConstants;
 
$config[SessionRedisConstants::ZED_SESSION_REDIS_PROTOCOL] = 'tcp';
$config[SessionRedisConstants::ZED_SESSION_REDIS_HOST] = '127.0.0.1';
$config[SessionRedisConstants::ZED_SESSION_REDIS_PORT] = 6379;
$config[SessionRedisConstants::ZED_SESSION_REDIS_PASSWORD] = false;
$config[SessionRedisConstants::ZED_SESSION_REDIS_DATABASE] = 2;
```

If you're using file system as session storage, extend your project with the following configuration:

**config/Shared/config_default.php**
```php
<?php
 
use Spryker\Shared\Session\SessionConfig;
use Spryker\Shared\Session\SessionConstants;
use Spryker\Shared\SessionFile\SessionFileConfig;
use Spryker\Shared\SessionFile\SessionFileConstants;
 
// ---------- Session
$config[SessionConstants::ZED_SESSION_SAVE_HANDLER] = SessionFileConfig::SESSION_HANDLER_FILE;
$config[SessionFileConstants::ZED_SESSION_TIME_TO_LIVE] = SessionConfig::SESSION_LIFETIME_1_HOUR;
$config[SessionFileConstants::ZED_SESSION_FILE_PATH] = session_save_path();
```

{% info_block warningBox "Note" %}
All the values in the examples above should be replaced with the real ones used in the corresponding environment.
{% endinfo_block %}

### 4) Set up behavior

Set up behavior as follows:

1. Install the following plugins with modules:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `SessionHandlerRedisProviderPlugin` | Provides a Redis-based session handler implementation for Zed sessions. | None | `Spryker\Zed\SessionRedis\Communication\Plugin\Session` |
| `SessionHandlerRedisLockingProviderPlugin` | Provides a Redis-based session handler implementation with session locking for Zed sessions. | None | `Spryker\Zed\SessionRedis\Communication\Plugin\Session` |
| `SessionHandlerFileProviderPlugin` | Provides a file-based session handler implementation for Zed sessions. | None | `Spryker\Zed\SessionFile\Communication\Plugin\Session` |
| `ZedSessionRedisLockReleaserPlugin` | Removes session lock from Redis by session id for Zed sessions. It's used when removing previously created locks by running the `session:lock:remove` console command. | None | `Spryker\Zed\SessionRedis\Communication\Plugin\Session` |
| `StorageRedisPlugin` | Provides a Redis-based storage implementation. | None | `Spryker\Client\StorageRedis\Plugin` |

**src/Pyz/Zed/Session/SessionDependencyProvider.php**

```php
<?php
 
namespace Pyz\Zed\Session;
 
use Spryker\Zed\Session\SessionDependencyProvider as SprykerSessionDependencyProvider;
use Spryker\Zed\SessionFile\Communication\Plugin\Session\SessionHandlerFileProviderPlugin;
use Spryker\Zed\SessionRedis\Communication\Plugin\Session\SessionHandlerRedisLockingProviderPlugin;
use Spryker\Zed\SessionRedis\Communication\Plugin\Session\SessionHandlerRedisProviderPlugin;
use Spryker\Zed\SessionRedis\Communication\Plugin\Session\ZedSessionRedisLockReleaserPlugin;
 
class SessionDependencyProvider extends SprykerSessionDependencyProvider
{
    /**
     * @return \Spryker\Shared\SessionExtension\Dependency\Plugin\SessionHandlerProviderPluginInterface[]
     */
    protected function getSessionHandlerPlugins(): array
    {
        return [
            new SessionHandlerRedisProviderPlugin(),
            new SessionHandlerRedisLockingProviderPlugin(),
            new SessionHandlerFileProviderPlugin(),
        ];
    }
 
    /**
     * @return \Spryker\Zed\SessionExtension\Dependency\Plugin\SessionLockReleaserPluginInterface[]
     */
    protected function getZedSessionLockReleaserPlugins(): array
    {
        return [
            new ZedSessionRedisLockReleaserPlugin(),
        ];
    }
}
```

**src/Pyz/Client/Storage/StorageDependencyProvider.php**

```php
<?php
 
namespace Pyz\Client\Storage;
 
use Spryker\Client\Storage\StorageDependencyProvider as SprykerStorageDependencyProvider;
use Spryker\Client\StorageExtension\Dependency\Plugin\StoragePluginInterface;
use Spryker\Client\StorageRedis\Plugin\StorageRedisPlugin;
 
class StorageDependencyProvider extends SprykerStorageDependencyProvider
{
    /**
     * @return \Spryker\Client\StorageExtension\Dependency\Plugin\StoragePluginInterface|null
     */
    protected function getStoragePlugin(): ?StoragePluginInterface
    {
        return new StorageRedisPlugin();
    }
}
```

{% info_block warningBox "Verification" %}
Visit `zed.mysprykershop.com` and make sure that Zed boots up without errors.
{% endinfo_block %}

2. Set up the console commands:

| Command | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `StorageRedisExportRdbConsole` | Exports Redis database as an **rdb** file. | None | `Spryker\Zed\StorageRedis\Communication\Console` |
| `StorageRedisImportRdbConsole` | Imports an **rdb** file. | None | `Spryker\Zed\StorageRedis\Communication\Console` |

**Pyz\Zed\Console\ConsoleDependencyProvider**

```php
<?php
 
namespace Pyz\Zed\Console;
 
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\StorageRedis\Communication\Console\StorageRedisExportRdbConsole;
use Spryker\Zed\StorageRedis\Communication\Console\StorageRedisImportRdbConsole;
 
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
            new StorageRedisExportRdbConsole(),
            new StorageRedisImportRdbConsole(),
        ];
 
        return $commands;
    }
}
```

{% info_block warningBox "Verification" %}
To verify that `StorageRedisExportRdbConsole` and `StorageRedisImportRdbConsole` are activated, check if `vendor/bin/console storage:redis:export-rdb` and `vendor/bin/console storage:redis:import-rdb` console commands exist.
{% endinfo_block %}

3. Run the following command to build navigation cache:

```bash
vendor/bin/console navigation:build-cache
```

{% info_block warningBox "Verification" %}

Make sure that the navigation for Store GUI is successfully generated by checking that, in the Back Office, the **Administration** menu item is present in the side bar and it has a **Stores** sub-item.

{% endinfo_block %}


### 5) Set up publish and synchronize

Follow the steps to set up Publish and Synchronize:
1. Change `RabbitMqConfig`:

**Pyz/Client/RabbitMq/RabbitMqConfig.php**

```php
<?php
 
namespace Pyz\Client\RabbitMq;
 
use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
use Spryker\Shared\Event\EventConfig;
use Spryker\Shared\Event\EventConstants;
use Spryker\Shared\GlossaryStorage\GlossaryStorageConfig;
use Spryker\Shared\Log\LogConstants;
use Spryker\Shared\UrlStorage\UrlStorageConstants;
 
class RabbitMqConfig extends SprykerRabbitMqConfig
{
    /**
     *  QueueNameFoo, // Queue => QueueNameFoo, (Queue and error queue will be created: QueueNameFoo and QueueNameFoo.error)
     *  QueueNameBar => [
     *       RoutingKeyFoo => QueueNameBaz, // (Additional queues can be defined by several routing keys)
     *   ],
     *
     * @see https://www.rabbitmq.com/tutorials/amqp-concepts.html
     *
     * @return array
     */
    protected function getQueueConfiguration(): array
    {
        return [
            EventConstants::EVENT_QUEUE => [
                EventConfig::EVENT_ROUTING_KEY_RETRY => EventConstants::EVENT_QUEUE_RETRY,
                EventConfig::EVENT_ROUTING_KEY_ERROR => EventConstants::EVENT_QUEUE_ERROR,
            ],
            GlossaryStorageConfig::SYNC_STORAGE_TRANSLATION,
            UrlStorageConstants::URL_SYNC_STORAGE_QUEUE,
            $this->get(LogConstants::LOG_QUEUE_NAME),
            // ...
        ];
    }
 
    /**
     * @return string
     */
    protected function getDefaultBoundQueueNamePrefix(): string
    {
        return 'error';
    }
}
```

2. Add `PublisherTriggerEventsConsole` to `ConsoleDependencyProvider`:
**Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php
 
namespace Pyz\Zed\Console;
 
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\Publisher\Communication\Console\PublisherTriggerEventsConsole;
 
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
            // ...
            new PublisherTriggerEventsConsole(),
            // ...
        ];
        // ...
    }
}
```


3. Add `PublisherSubscriber` to `EventDependencyProvider`:

**src/Pyz/Zed/Event/EventDependencyProvidder.php**

```php
<?php
 
namespace Pyz\Zed\Event;
 
use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;
use Spryker\Zed\Publisher\Communication\Plugin\Event\PublisherSubscriber;
 
class EventDependencyProvider extends SprykerEventDependencyProvider
{
    /**
     * @return \Spryker\Zed\Event\Dependency\EventSubscriberCollectionInterface
     */
    public function getEventSubscriberCollection()
    {
        $eventSubscriberCollection = parent::getEventSubscriberCollection();
        $eventSubscriberCollection->add(new GlossaryStorageEventSubscriber());
        $eventSubscriberCollection->add(new UrlStorageEventSubscriber());
        // ...
        $eventSubscriberCollection->add(new PublisherSubscriber());
 
        return $eventSubscriberCollection;
    }
}
```


## Install feature frontend

Follow the steps below to install the front end of Spryker Core feature.


### 1) Install the required modules using Composer
Run the following command to install the required modules:

```bash
composer require "spryker-feature/spryker-core": "dev-master"
```




### 2) Set up configuration
Add the following configuration to your project:

| Configuration | Specification | Namespace |
| --- | --- | --- |
| `SessionFileConstants::YVES_SESSION_FILE_PATH` | Defines the filesystem path for storing Yves sessions. | `Spryker\Shared\SessionFile` |
| `SessionRedisConstants::YVES_SESSION_REDIS_SCHEME` | Defines the protocol used while connecting to Redis as Yves session storage. | `Spryker\Shared\SessionRedis` |
| `SessionRedisConstants::YVES_SESSION_REDIS_PASSWORD` | Defines the password used while connecting to Redis as Yves session storage. | `Spryker\Shared\SessionRedis` |
| `SessionRedisConstants::YVES_SESSION_REDIS_HOST` | Defines the host used while connecting to Redis as Yves session storage. | `Spryker\Shared\SessionRedis` |
| `SessionRedisConstants::YVES_SESSION_REDIS_PORT` | Defines the port used while connecting to Redis as Yves session storage. | `Spryker\Shared\SessionRedis` |
| `SessionRedisConstants::YVES_SESSION_REDIS_DATABASE` | Defines the database used while connecting to Redis as Yves session storage. | `Spryker\Shared\SessionRedis` |
| `SessionRedisConstants::YVES_SESSION_REDIS_DATA_SOURCE_NAMES` | Defines the list of DSNs used while connecting to Redis as Yves session storage in replication mode. | `Spryker\Shared\SessionRedis` |
| `SessionRedisConstants::YVES_SESSION_REDIS_CLIENT_OPTIONS` |Defines the list of client options used while connection to Redis as Yves session storage in replication mode. | `Spryker\Shared\SessionRedis` |

**config/Shared/config_default.php**

```php
<?php
 
use Spryker\Shared\Session\SessionConfig;
use Spryker\Shared\Session\SessionConstants;
use Spryker\Shared\SessionRedis\SessionRedisConfig;
use Spryker\Shared\SessionRedis\SessionRedisConstants;
 
// ---------- Session
$config[SessionConstants::YVES_SESSION_SAVE_HANDLER] = SessionRedisConfig::SESSION_HANDLER_REDIS_LOCKING;
$config[SessionRedisConstants::YVES_SESSION_TIME_TO_LIVE] = SessionConfig::SESSION_LIFETIME_1_HOUR;
```

{% info_block warningBox "Note" %}
`SessionRedisConfig::SESSION_HANDLER_REDIS_LOCKING` and `SessionRedisConfig::SESSION_HANDLER_REDIS` can be used as values for session handler configuration option.
{% endinfo_block %}

* In case of a multi-instance Redis setup, extend your project with the following configuration:

**config/Shared/config_default.php**

```php
<?php
 
use Spryker\Shared\SessionRedis\SessionRedisConstants;
 
$config[SessionRedisConstants::YVES_SESSION_REDIS_DATA_SOURCE_NAMES] = ['tcp://127.0.0.1:10009', 'tcp://10.0.0.1:6379'];
$config[SessionRedisConstants::YVES_SESSION_REDIS_CLIENT_OPTIONS] = [
    'replication' => 'sentinel',
    'service' => 'mymaster',
    'parameters' => [
        'password' => 'secret',
        'database' => 1,
    ],
];
```

{% info_block warningBox "Note" %}
This configuration is used exclusively. In other words, you can't use any other Redis configuration.
{% endinfo_block %}

* In case of a single-instance Redis setup, extend your project with the following configuration:

**config/Share/config_default.php**

```php
<?php
 
use Spryker\Shared\SessionRedis\SessionRedisConstants;
 
$config[SessionRedisConstants::YVES_SESSION_REDIS_PROTOCOL] = 'tcp';
$config[SessionRedisConstants::YVES_SESSION_REDIS_HOST] = '127.0.0.1';
$config[SessionRedisConstants::YVES_SESSION_REDIS_PORT] = 6379;
$config[SessionRedisConstants::YVES_SESSION_REDIS_PASSWORD] = false;
$config[SessionRedisConstants::YVES_SESSION_REDIS_DATABASE] = 1;
```

{% info_block warningBox "Verification" %}
Make sure you don't use the same Redis database for Yves and Zed sessions.
{% endinfo_block %}

If you're using file system as session storage, extend your project with the following configuration:

**config/Shared/config_default.php**

```php
<?php
 
use Spryker\Shared\Session\SessionConfig;
use Spryker\Shared\Session\SessionConstants;
use Spryker\Shared\SessionFile\SessionFileConfig;
use Spryker\Shared\SessionFile\SessionFileConstants;
 
// ---------- Session
$config[SessionConstants::YVES_SESSION_SAVE_HANDLER] = SessionFileConfig::SESSION_HANDLER_FILE;
$config[SessionFileConstants::YVES_SESSION_TIME_TO_LIVE] = SessionConfig::SESSION_LIFETIME_1_HOUR;
$config[SessionFileConstants::YVES_SESSION_FILE_PATH] = session_save_path();
```

{% info_block warningBox "Note" %}
All the values in the examples above should be replaced with the real ones used in the corresponding environment.
{% endinfo_block %}

### 3) Set up behavior
Find the list of all the plugins and modules to install:
| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `SessionHandlerRedisProviderPlugin` | Provides a Redis-based session handler implementation for Zed sessions. | None | `Spryker\Zed\SessionRedis\Communication\Plugin\Session` |
| `SessionHandlerRedisLockingProviderPlugin` | Provides a Redis-based session handler implementation with session locking for Zed sessions. | None | `Spryker\Zed\SessionRedis\Communication\Plugin\Session` |
| `SessionHandlerFileProviderPlugin` | Provides a file-based session handler implementation for Zed sessions. | None | `Spryker\Zed\SessionFile\Communication\Plugin\Session` |
| `YvesSessionRedisLockReleaserPlugin` | Removes session lock from Redis by session id for Yves sessions. It is used when removing previously created locks by running `session:lock:remove console` command.. | None | `Spryker\Zed\SessionRedis\Communication\Plugin\Session` |


**src/Pyz/Yves/Session/SessionDependencyProvider.php**
```php
<?php
 
namespace Pyz\Yves\Session;
 
use Spryker\Yves\Session\SessionDependencyProvider as SprykerSessionDependencyProvider;
use Spryker\Yves\SessionFile\Plugin\Session\SessionHandlerFileProviderPlugin;
use Spryker\Yves\SessionRedis\Plugin\Session\SessionHandlerRedisLockingProviderPlugin;
use Spryker\Yves\SessionRedis\Plugin\Session\SessionHandlerRedisProviderPlugin;
 
class SessionDependencyProvider extends SprykerSessionDependencyProvider
{
    /**
     * @return \Spryker\Shared\SessionExtension\Dependency\Plugin\SessionHandlerProviderPluginInterface[]
     */
    protected function getSessionHandlerPlugins(): array
    {
        return [
            new SessionHandlerRedisProviderPlugin(),
            new SessionHandlerRedisLockingProviderPlugin(),
            new SessionHandlerFileProviderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Session/SessionDependencyProvider.php**

```php
<?php
 
namespace Pyz\Zed\Session;
 
use Spryker\Zed\Session\SessionDependencyProvider as SprykerSessionDependencyProvider;
use Spryker\Zed\SessionFile\Communication\Plugin\Session\SessionHandlerFileProviderPlugin;
use Spryker\Zed\SessionRedis\Communication\Plugin\Session\SessionHandlerRedisLockingProviderPlugin;
use Spryker\Zed\SessionRedis\Communication\Plugin\Session\SessionHandlerRedisProviderPlugin;
use Spryker\Zed\SessionRedis\Communication\Plugin\Session\YvesSessionRedisLockReleaserPlugin;
use Spryker\Zed\SessionRedis\Communication\Plugin\Session\ZedSessionRedisLockReleaserPlugin;
 
class SessionDependencyProvider extends SprykerSessionDependencyProvider
{
    /**
     * @return \Spryker\Zed\SessionExtension\Dependency\Plugin\SessionLockReleaserPluginInterface[]
     */
    protected function getYvesSessionLockReleaserPlugins(): array
    {
        return [
            new YvesSessionRedisLockReleaserPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}
Visit `mysprykershop.com` and make sure that Yves boots up without errors.
{% endinfo_block %}

## Related features

Find the list of related feature integration guides below:

| Feature | Link |
| --- | --- |
| Spryker Core API | [Glue API: Spryker Core Feature Integration](https://documentation.spryker.com/docs/glue-spryker-core-feature-integration) |

