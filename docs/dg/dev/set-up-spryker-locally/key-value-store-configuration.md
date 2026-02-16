---
title: Key-value store configuration
description: In Spryker, key-value storage (Redis or Valkey) is used as the key-value storage and the session data storage.
last_updated: Jun 19, 2025
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/redis-configruation
originalArticleId: ea89b3d3-30a2-41b6-8af7-cbd890ff5d18
redirect_from:
- /docs/scos/dev/set-up-spryker-locally/redis-configuration.html
- /docs/dg/dev/set-up-spryker-locally/redis-configuration
related:
  - title: Install module structure and configuration
    link: docs/scos/dev/set-up-spryker-locally/install-module-structure-and-configuration.html
  - title: Manage dependencies with Composer
    link: docs/dg/dev/set-up-spryker-locally/manage-dependencies-with-composer.html
---

In Spryker, key-value storage (Redis or Valkey) is used in two scenarios:

- Key-value storage. Modules: `Spryker.Storage`, `Spryker.Collector`, and `Spryker.Heartbeat`.
- Session data storage. Module: `Spryker.Session`.

Both Redis and Valkey are fully supported and compatible. Configuration parameters maintain Redis naming for backward compatibility.

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

## Advanced configuration for key-value store (Redis or Valkey)

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

For this configuration, one of the key-value store (Redis or Valkey) servers should be identified as master using the parameter `alias`.

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

The configuration under `StorageConstants::STORAGE_PREDIS_CLIENT_CONFIGURATION` is to be used exclusively, for example, no other storage configuration will be used for the key-value store (Redis or Valkey) client. If the configuration parameters are not set under the `StorageConstants::STORAGE_PREDIS_CLIENT_CONFIGURATION` key, the key-value store (Redis or Valkey) client will fall back to the regular configuration described above.

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

To resave storage data, run the command. The command supports several options to control scanning, filtering, TTL handling and dry runs. The base environment variables used to run the command in non-dev mode are shown below:

```bash
SPRYKER_REDIS_IS_DEV_MODE=0 NEWRELIC_ENABLED=false console storage:redis:re-save [options]
```

Description:

- Re-saves storage data with current settings. Uses bulk operations with an adaptive timeout between iterations. Safe to use in production.

Available options:

- --cursor (-c) <number>  Optional. Defines a cursor for resuming or controlling the SCAN iterator. Default: 0.
- --pattern (-p) <pattern> Optional. Glob-style pattern applied to keys (appended to the KV prefix). Default: "*". Example: "product:*".
- --ttl (-t) <seconds>     Optional. TTL in seconds to set for each matched key. If omitted, existing TTL is preserved (KEEPTTL) for existing keys. Warning: when provided, this TTL will be applied to all matched keys; use it only when you need to restore TTL values that were lost.
- --dry (-d)               Flag. Dry run: scans and counts matched keys without resaving or setting TTL. Use this to estimate the workload before executing.

Examples:

- Resave everything (default):

```bash
SPRYKER_REDIS_IS_DEV_MODE=0 NEWRELIC_ENABLED=false console storage:redis:re-save
```

- Resave only keys under the `cache:` prefix and set TTL to 1 hour:

```bash
SPRYKER_REDIS_IS_DEV_MODE=0 NEWRELIC_ENABLED=false console storage:redis:re-save --pattern="cache:*" --ttl=3600
```

- Dry run for a specific prefix to see how many keys would be processed:

```bash
SPRYKER_REDIS_IS_DEV_MODE=0 NEWRELIC_ENABLED=false console storage:redis:re-save --pattern="cache:*" --dry
```

- Resume a previously interrupted run from a specific SCAN cursor:

```bash
SPRYKER_REDIS_IS_DEV_MODE=0 NEWRELIC_ENABLED=false console storage:redis:re-save --cursor=12345
```

Notes and warnings:

- The `--ttl` option overwrites TTLs for all matched keys; apply it only if you intentionally want to set the same TTL across results (for example, restoring lost TTL values). If you want to preserve existing TTLs, omit `--ttl`.
- The command uses scanning (e.g., Redis SCAN) and is implemented to run safely in production using adaptive timeouts between bulk operations; nevertheless, run with `--dry` first if you are unsure about the scope.
- With separate storage databases per store, execute the command for each store individually.

If you use a Debian Docker image, you can disable instrumentation by adding the following parameter to the console command:

```bash
SPRYKER_REDIS_IS_DEV_MODE=0 php -dnewrelic.enabled=false console storage:redis:re-save
```

With separate storage databases per store, execute the command for each store individually.

## Storage GUI installation

The storage GUI lets you access original and compressed storage data in the Back Office, **Maintenance** > **Storage** menu.

StorageGui is supported starting from `spryker/storage-gui:1.1.0`. To build the UI changes, install dependencies and rebuild ZED UI:

```bash
console frontend:project:install-dependencies
console frontend:zed:build
```
