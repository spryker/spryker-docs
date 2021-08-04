---
title: Spryker Core Feature Integration
originalLink: https://documentation.spryker.com/v3/docs/spryker-core-feature-integration-201907
redirect_from:
  - /v3/docs/spryker-core-feature-integration-201907
  - /v3/docs/en/spryker-core-feature-integration-201907
---

{% info_block errorBox %}
The following Feature Integration guide expects the basic feature to be in place. The current Feature Integration guide only adds the **Vault** and **Redis** functionality.
{% endinfo_block %}

## Install Feature Core
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core	 | 201907.0 |

### 1) Install the Required Modules Using Composer
Run the following command to install the required modules:

```bash
composer require spryker-feature/spryker-core: "^201907.0" --update-with-dependencies
```

<section contenteditable="false" class="warningBox"><div class="content">

**Verification**
Make sure that the following modules were installed:

| Module | Expected Directory |
| --- | --- |
| `UtilEncryption` | `vendor/spryker/util-encryption` |
| `Vault` | `vendor/spryker/vault` |
| `SessionExtension` | `vendor/spryker/session-extension` |
| `SessionRedis` | `vendor/spryker/session-redis` |
| `SessionFile` | `vendor/spryker/session-redis` |
| `StorageExtension` | `vendor/spryker/storage-extension` |
| `StorageRedis` | `vendor/spryker/storage-redis` |
</div></section>

### 2) Set up Database Schema and Transfer Objects
Run the following commands to apply the database changes and generate the entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

<section contenteditable="false" class="warningBox"><div class="content">

**Verification**    
Make sure that the following changes were applied by checking your database:

| Database Entity | Type | Event |
| --- | --- | --- |
| `spy_vault_deposit` | table | created |

</div></section>

<section contenteditable="false" class="warningBox"><div class="content">

**Verification**    
Make sure that the following changes in transfer objects:

| Transfer | Type | Event | Path | 
| --- | --- | --- | --- |
| `SpyVaultDepositEntity` | class | created | `src/Generated/Shared/Transfer/SpyVaultDepositEntityTransfer` |
| `VaultDeposit` | class | created | `src/Generated/Shared/Transfer/VaultDepositTransfer` |
| `RedisConfiguration` | class | created | `src/Generated/Shared/Transfer/RedisConfigurationTransfer` |
| `RedisCredentials` | class | created | `src/Generated/Shared/Transfer/RedisCredentialsTransfer` |
</div></section>

### 3) Set up Configuration
#### Vault
Add the following configuration to your project:

| Configuration | Specification | Namespace |
| --- | --- | --- |
| `VaultConstants::ENCRYPTION_KEY` | Used to encrypt vault data. | `Spryker\Shared\Vault` |

{% info_block errorBox "Security measures" %}
Make sure that the encryption key is secured in your live environment. This key protects all data stored in the Vault.
{% endinfo_block %}

<details open>
<summary>config/Shared/config_local.php</summary>
    
```php
<?php
 
use Spryker\Shared\Vault\VaultConstants;
 
$config[VaultConstants::ENCRYPTION_KEY] = "PLEASE ADJUST THIS ENCRYPTION KEY TO SECURE ONE"

```

</br>
</details>

{% info_block warningBox "Verification" %}
Once you have finished the full integration of the feature, make sure that:</br>You can store and retrieve data from the vault using `VaultFacade`:</br>`$secret = "actual_secret";` </br>`$vaultFacade->store("secret_category", "secret_id", $secret
{% endinfo_block %};`</br>`assertSame($secret, $vaultFacade->retrieve("secret_category", "secret_id"));`)

#### Redis
The following Session and Storage configuration constants were deprecated and moved into newly created dedicated modules:

| Deprecated | Specification | Replaced by |
| --- | --- | --- |
| `SessionRedisConstants::LOCKING_TIMEOUT_MILLISECONDS` | Defines Redis lock timeout in milliseconds. | `Spryker\Shared\SessionRedis` |
| `SessionRedisConstants::LOCKING_RETRY_DELAY_MICROSECONDS` | Defines the retry delay between the attempts to acquire Redis lock in microseconds. | `Spryker\Shared\SessionRedis` |
| `SessionRedisConstants::LOCKING_LOCK_TTL_MILLISECONDS` | Defines the time to live for Redis lock in milliseconds. | `Spryker\Shared\SessionRedis` |
| `SessionFileConstants::ZED_SESSION_FILE_PATH` | Defines the filesystem path for storing Zed sessions. | `Spryker\Shared\SessionFile` |
| `SessionRedisConstants::ZED_SESSION_REDIS_PROTOCOL` | Defines the protocol used while connecting to Redis as Zed session storage. | `Spryker\Shared\SessionRedis` |
| `SessionRedisConstants::ZED_SESSION_REDIS_PASSWORD` | Defines the password used while connecting to Redis as Zed session storage. | `Spryker\Shared\SessionRedis` |
| `SessionRedisConstants::ZED_SESSION_REDIS_HOST` | Defines the host used while connecting to Redis as Zed session storage. | `Spryker\Shared\SessionRedis` |
| `SessionRedisConstants::ZED_SESSION_REDIS_PORT` | Defines the protocol used while connecting to Redis as Zed session storage. | `Spryker\Shared\SessionRedis` |
| `SessionRedisConstants::ZED_SESSION_REDIS_DATABASE` | Defines the database used while connecting to Redis as Zed session storage. | `Spryker\Shared\SessionRedis` |
| `SessionRedisConstants::ZED_SESSION_REDIS_DATA_SOURCE_NAMES` | Defines the list of DSNs used while connecting to Redis as Zed session storage in replication mode. | `Spryker\Shared\SessionRedis` |
| `SessionRedisConstants::ZED_SESSION_REDIS_CLIENT_OPTIONS` | Defines the list of client options used while connecting to Redis as Zed session storage in replication mode. | `Spryker\Shared\SessionRedis` |
| `StorageRedisConstants::STORAGE_REDIS_PROTOCOL` | Defines the protocol used while connecting to Redis as key-value storage. | `Spryker\Shared\StorageRedis` |
| `StorageRedisConstants::STORAGE_REDIS_PASSWORD` | Defines the password used while connecting to Redis as key-value storage. | `Spryker\Shared\StorageRedis` |
| `StorageRedisConstants::STORAGE_REDIS_HOST` | Defines the host used while connecting to Redis as key-value storage. | `Spryker\Shared\StorageRedis` |
| `StorageRedisConstants::STORAGE_REDIS_PORT` | Defines the port used while connecting to Redis as key-value storage. | `Spryker\Shared\StorageRedis` |
| `StorageRedisConstants::STORAGE_REDIS_DATABASE` | Defines the database used while connecting to Redis as key-value storage. | `Spryker\Shared\StorageRedis` |
| `StorageRedisConstants::STORAGE_REDIS_PERSISTENT_CONNECTION` | Enables/disables data persistence for a Redis connection. | `Spryker\Shared\StorageRedis` |
| `StorageRedisConstants::STORAGE_REDIS_DATA_SOURCE_NAMES` | Specifies an array of DSN strings for a multi-instance cluster/replication Redis setup. | `Spryker\Shared\StorageRedis` |
| `StorageRedisConstants::STORAGE_REDIS_CONNECTION_OPTIONS` | Specifies an array of client options for connecting to Redis as key-value storage. | `Spryker\Shared\StorageRedis` |

#### General Storage
* In case of multi-instance Redis setup, extend your project with the following configuration:

<details open>
<summary>config/Shared/config_default.php</summary>

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

</br>
</details>

{% info_block warningBox "Note" %}
This configuration is used exclusively. In other words, you can't use any other Redis configuration.
{% endinfo_block %}

* In case of single-instance Redis setup, extend your project with the following configuration:

<details open>
<summary>config/Shared/config_default.php</summary>

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

</br>
</details>

{% info_block warningBox "Note" %}
All the values in the examples above should be replaced with the real ones used in the corresponding environment.
{% endinfo_block %}

#### Session Storage
If you're using Redis as session storage, extend your project with the following configuration:

<details open>
<summary>config/Shared/config_default.php</summary>

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

</br>
</details>

{% info_block warningBox "Note" %}
`SessionRedisConfig::SESSION_HANDLER_REDIS_LOCKING` and `SessionRedisConfig::SESSION_HANDLER_REDIS` can be used as values for `SessionConstants::ZED_SESSION_SAVE_HANDLER`.
{% endinfo_block %}

* In case of a multi-instance Redis setup, extend your project with the following configuration:

<details open>
<summary>config/Shared/config_default.php</summary>

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

</br>
</details>

{% info_block warningBox "Note" %}
This configuration is used exclusively. In other words, you can't use any other Redis configuration.
{% endinfo_block %}

* In case of a single-instance Redis setup, extend your project with the following configuration:

<details open>
<summary>config/Share/config_default.php</summary>

```php
<?php
 
use Spryker\Shared\SessionRedis\SessionRedisConstants;
 
$config[SessionRedisConstants::ZED_SESSION_REDIS_PROTOCOL] = 'tcp';
$config[SessionRedisConstants::ZED_SESSION_REDIS_HOST] = '127.0.0.1';
$config[SessionRedisConstants::ZED_SESSION_REDIS_PORT] = 6379;
$config[SessionRedisConstants::ZED_SESSION_REDIS_PASSWORD] = false;
$config[SessionRedisConstants::ZED_SESSION_REDIS_DATABASE] = 2;
```

</br>
</details>

If you're using file system as session storage, extend your project with the following configuration:

<details open>
<summary>config/Shared/config_default.php</summary>

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

</br>
</details>

{% info_block warningBox "Note" %}
All the values in the examples above should be replaced with the real ones used in the corresponding environment.
{% endinfo_block %}

### 3) Set up Behavior
Find the list of all the plugins installed along with new modules:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `SessionHandlerRedisProviderPlugin` | Provides a Redis-based session handler implementation for Zed sessions. | None | `Spryker\Zed\SessionRedis\Communication\Plugin\Session` |
| `SessionHandlerRedisLockingProviderPlugin` | Provides a Redis-based session handler implementation with session locking for Zed sessions. | None | `Spryker\Zed\SessionRedis\Communication\Plugin\Session` |
| `SessionHandlerFileProviderPlugin` | Provides a file-based session handler implementation for Zed sessions. | None | `Spryker\Zed\SessionFile\Communication\Plugin\Session` |
| `ZedSessionRedisLockReleaserPlugin` | Removes session lock from Redis by session id for Zed sessions. It's used when removing previously created locks by running the `session:lock:remove` console command. | None | `Spryker\Zed\SessionRedis\Communication\Plugin\Session` |
| `StorageRedisPlugin` | Provides a Redis-based storage implementation. | None | `Spryker\Client\StorageRedis\Plugin` |

<details open>
<summary>src/Pyz/Zed/Session/SessionDependencyProvider.php</summary>

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

</br>
</details>

<details open>
<summary>src/Pyz/Client/Storage/StorageDependencyProvider.php</summary>

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

</br>
</details>

{% info_block warningBox "Verification" %}
Visit `zed.mysprykershop.com` and make sure that Zed boots up without errors.
{% endinfo_block %}

Set up the console commands:

| Command | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `StorageRedisExportRdbConsole` | Exports Redis database as an **rdb** file. | None | `Spryker\Zed\StorageRedis\Communication\Console` |
| `StorageRedisImportRdbConsole` | Imports an **rdb** file. | None | `Spryker\Zed\StorageRedis\Communication\Console` |

<details open>
<summary>Pyz\Zed\Console\ConsoleDependencyProvider</summary>

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

</br>
</details>

{% info_block warningBox "Verification" %}
To verify that `StorageRedisExportRdbConsole` and `StorageRedisImportRdbConsole` are activated, check if `vendor/bin/console storage:redis:export-rdb` and `vendor/bin/console storage:redis:import-rdb` console commands exist.
{% endinfo_block %}

## Install Feature Frontend
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core | 201907.0 |

### 1) Set up Configuration
Add the following configuration to your project:

| Configuration | Specification | Namespace |
| --- | --- | --- |
| `SessionFileConstants::YVES_SESSION_FILE_PATH` | Defines the filesystem path for storing Yves sessions. | `Spryker\Shared\SessionFile` |
| `SessionRedisConstants::YVES_SESSION_REDIS_PROTOCOL` | Defines the protocol used while connecting to Redis as Yves session storage. | `Spryker\Shared\SessionRedis` |
| `SessionRedisConstants::YVES_SESSION_REDIS_PASSWORD` | Defines the password used while connecting to Redis as Yves session storage. | `Spryker\Shared\SessionRedis` |
| `SessionRedisConstants::YVES_SESSION_REDIS_HOST` | Defines the host used while connecting to Redis as Yves session storage. | `Spryker\Shared\SessionRedis` |
| `SessionRedisConstants::YVES_SESSION_REDIS_PORT` | Defines the port used while connecting to Redis as Yves session storage. | `Spryker\Shared\SessionRedis` |
| `SessionRedisConstants::YVES_SESSION_REDIS_DATABASE` | Defines the database used while connecting to Redis as Yves session storage. | `Spryker\Shared\SessionRedis` |
| `SessionRedisConstants::YVES_SESSION_REDIS_DATA_SOURCE_NAMES` | Defines the list of DSNs used while connecting to Redis as Yves session storage in replication mode. | `Spryker\Shared\SessionRedis` |
| `SessionRedisConstants::YVES_SESSION_REDIS_CLIENT_OPTIONS` |Defines the list of client options used while connection to Redis as Yves session storage in replication mode. | `Spryker\Shared\SessionRedis` |

<details open>
<summary>config/Shared/config_default.php</summary>

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

</br>
</details>

{% info_block warningBox "Note" %}
`SessionRedisConfig::SESSION_HANDLER_REDIS_LOCKING` and `SessionRedisConfig::SESSION_HANDLER_REDIS` can be used as values for session handler configuration option.
{% endinfo_block %}

* In case of a multi-instance Redis setup, extend your project with the following configuration:

<details open>
<summary>config/Shared/config_default.php</summary>

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

</br>
</details>

{% info_block warningBox "Note" %}
This configuration is used exclusively. In other words, you can't use any other Redis configuration.
{% endinfo_block %}

* In case of a single-instance Redis setup, extend your project with the following configuration:

<details open>
<summary>config/Share/config_default.php</summary>

```php
<?php
 
use Spryker\Shared\SessionRedis\SessionRedisConstants;
 
$config[SessionRedisConstants::YVES_SESSION_REDIS_PROTOCOL] = 'tcp';
$config[SessionRedisConstants::YVES_SESSION_REDIS_HOST] = '127.0.0.1';
$config[SessionRedisConstants::YVES_SESSION_REDIS_PORT] = 6379;
$config[SessionRedisConstants::YVES_SESSION_REDIS_PASSWORD] = false;
$config[SessionRedisConstants::YVES_SESSION_REDIS_DATABASE] = 1;
```

</br>
</details>

{% info_block warningBox "Verification" %}
Make sure you don't use the same Redis database for Yves and Zed sessions.
{% endinfo_block %}

* If you're using file system as session storage, extend your project with the following configuration:

<details open>
<summary>config/Shared/config_default.php</summary>

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

</br>
</details>

{% info_block warningBox "Note" %}
All the values in the examples above should be replaced with the real ones used in the corresponding environment.
{% endinfo_block %}

### 2) Set up Behavior
Find the list of all the plugins installed along with new modules:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `SessionHandlerRedisProviderPlugin` | Provides a Redis-based session handler implementation for Zed sessions. | None | `Spryker\Zed\SessionRedis\Communication\Plugin\Session` |
| `SessionHandlerRedisLockingProviderPlugin` | Provides a Redis-based session handler implementation with session locking for Zed sessions. | None | `Spryker\Zed\SessionRedis\Communication\Plugin\Session` |
| `SessionHandlerFileProviderPlugin` | Provides a file-based session handler implementation for Zed sessions. | None | `Spryker\Zed\SessionFile\Communication\Plugin\Session` |
| `ZedSessionRedisLockReleaserPlugin` | Removes session lock from Redis by session id for Zed sessions. It's used when removing previously created locks by running the `session:lock:remove` console command. | None | `Spryker\Zed\SessionRedis\Communication\Plugin\Session` |
| `StorageRedisPlugin` | Provides a Redis-based storage implementation. | None | `Spryker\Client\StorageRedis\Plugin` |

<details open>
<summary>src/Pyz/Yves/Session/SessionDependencyProvider.php</summary>

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

</br>
</details>

<details open>
<summary>src/Pyz/Zed/Session/SessionDependencyProvider.php</summary>

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

</br>
</details>

{% info_block warningBox "Verification" %}
Visit `mysprykershop.com` and make sure that Yves boots up without errors.
{% endinfo_block %}

<!-- Last review date: Sep 04, 2019 -->

<!--by Karoly Gerner, Andrii Tserkovnyi-->
