---
title: Redis configuration
description: In Spryker, Redis is used as the key-value storage and the session data storage.
last_updated: Jun 19, 2025
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/redis-configruation
originalArticleId: ea89b3d3-30a2-41b6-8af7-cbd890ff5d18
redirect_from:
- /docs/scos/dev/set-up-spryker-locally/redis-configuration.html
related:
  - title: Install module structure and configuration
    link: docs/scos/dev/set-up-spryker-locally/install-module-structure-and-configuration.html
  - title: Manage dependencies with Composer
    link: docs/dg/dev/set-up-spryker-locally/manage-dependencies-with-composer.html
---

In Spryker, Redis is used in two scenarios:

- Key-value storage. Modules: `Spryker.Storage`, `Spryker.Collector`, and `Spryker.Heartbeat`.
- Session data storage. Module: `Spryker.Session`.

Each scenario uses a separate set of configuration values.

Advanced configuration allows to use Redis in replication mode, including support for Redis Sentinel.

## Standard configuration

Standard Redis client configuration uses the environment configuration values set under keys which are defined as constants in `config/Shared/config_default.php`. The standard environment configuration would look like this:

```php
$config[StorageConstants::STORAGE_REDIS_PROTOCOL] = 'tcp';
$config[StorageConstants::STORAGE_REDIS_HOST] = '127.0.0.1';
$config[StorageConstants::STORAGE_REDIS_PORT] = '10009';
$config[StorageConstants::STORAGE_REDIS_PASSWORD] = false;
$config[StorageConstants::STORAGE_REDIS_DATABASE] = 0;
```

## Advanced configuration for Redis key-value storage

To be able to use Redis replication, you need to define connection parameters using `StorageConstants::STORAGE_PREDIS_CLIENT_CONFIGURATION` value as key. Under this key, an array of DSN strings, which identify specific Redis nodes, should be set. In addition to configuration parameters, a set of configuration options has to be specified to enable Redis replication facilities. These options need to be stored under the `StorageConstants::STORAGE_PREDIS_CLIENT_OPTIONS` key.

Example (regular master-slave replication):

```php
$config[StorageConstants::STORAGE_PREDIS_CLIENT_CONFIGURATION] = [
    'tcp://10.0.0.1?alias=master',
    'tcp://10.0.0.2',
    'tcp://10.0.0.3',
];

$config[StorageConstants::STORAGE_PREDIS_CLIENT_OPTIONS] = [
    'replication' => true',
];
```

{% info_block infoBox %}

For this configuration, one of the Redis servers should be identified as master using the parameter `alias`.

{% endinfo_block %}

Configuration setup for Redis Sentinel would look like this:

```php
$config[StorageConstants::STORAGE_PREDIS_CLIENT_CONFIGURATION] = [
    'tcp://10.0.0.1',
    'tcp://10.0.0.2',
    'tcp://10.0.0.3',
];

$config[StorageConstants::STORAGE_PREDIS_CLIENT_OPTIONS] = [
    'replication' => 'sentinel',
    'service' => 'mymaster',
];
```

The configuration under `StorageConstants::STORAGE_PREDIS_CLIENT_CONFIGURATION` is to be used exclusively, for example, no other storage configuration will be used for the Redis client. If the configuration parameters are not set under the `StorageConstants::STORAGE_PREDIS_CLIENT_CONFIGURATION` key, the Redis client will fall back to the regular configuration described above.

## Advanced configuration for Redis session storage

All the configuration concepts described above are relevant for configuring Redis as a session storage. Two things to be considered are the name of configuration constants and the fact that Yves and Zed sessions have separate storages with distinct configuration sets. Redis session configuration uses constants from `\Spryker\Shared\Session\SessionConstants`. Configuration for Yves session to use Redis Sentinel would look like this:

```php
$config[SessionConstants::YVES_SESSION_PREDIS_CLIENT_CONFIGURATION] = [
    'tcp://10.0.0.1',
    'tcp://10.0.0.2',
    'tcp://10.0.0.3',
];

$config[SessionConstants::YVES_SESSION_PREDIS_CLIENT_OPTION] = [
    'replication' => 'sentinel',
    'service' => 'mymaster',
];
```

For Zed, it would look as follows:

```php
$config[SessionConstants::ZED_SESSION_PREDIS_CLIENT_CONFIGURATION] = [
    'tcp://10.0.0.1',
    'tcp://10.0.0.2',
    'tcp://10.0.0.3',
];

$config[SessionConstants::ZED_SESSION_PREDIS_CLIENT_OPTION] = [
    'replication' => 'sentinel',
    'service' => 'mymaster',
];
```

## Advanced configuration for Redis compression

The standard Redis client configuration uses environment variables defined as constants in `config/Shared/config_default.php`.  

Compression is supported starting from `spryker/redis:2.9.1`.  

By default, Redis compression is disabled:

```php
$config[RedisConstants::REDIS_COMPRESSION_ENABLED] = getenv('SPRYKER_KEY_VALUE_COMPRESSING_ENABLED') ?: false;
```

When compression is activated using the `SPRYKER_KEY_VALUE_COMPRESSING_ENABLED=true` environment variable, Redis compresses all data.

Compression settings can be changed on the project level while maintaining backward compatibility.

The following is the default compression configuration:


```php
namespace Spryker\Client\Redis;

class RedisConfig extends AbstractBundleConfig
{
    /**
     * Specification:
     * - These setting is used for the data compression level.
     *
     * @api
     *
     * @return int
     */
    public function getCompressionLevel(): int
    {
        return 3;
    }

    /**
     * Specification:
     * - These setting is used for the minimum size at which data compression begins.
     *
     * @api
     *
     * @return int
     */
    public function getMinBytesForCompression(): int
    {
        return 200;
    }
}
```

After enabling compression, we recommend resaving storage data.

The command to resave storage data is available starting from `spryker/storage-redis:1.7.0`. To enable the command for resaving storage data, add the following configuration:


```php
namespace Pyz\Zed\Console;

use Spryker\Zed\StorageRedis\Communication\Console\StorageRedisDataReSaveConsole;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container): array
    {
        $commands = [
            //....
            new StorageRedisDataReSaveConsole(),
            //....
        ];
    }
}
```

To resave storage data, run the command:

```bash
SPRYKER_REDIS_IS_DEV_MODE=0 console storage:redis:re-save
```

With separate storage databases per store, execute the command for each store individually.

## Storage Gui installation

StorageGui is supported starting from `spryker/storage-gui:1.1.0`.
The module contains the ui changes. To build them you need to install dependencies and rebuild zed ui.
- `console frontend:project:install-dependencies`
- `console frontend:zed:build`


The storage page available in backoffice `Maintenance -> Storage` menu. You have access to the storage data, also if you use the compression feature you can also have access to the original data here.


























































