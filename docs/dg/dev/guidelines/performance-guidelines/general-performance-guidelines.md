---
title: General performance guidelines
description: This guideline explains how to optimize the server-side execution time for your Spryker based projects.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/performance-guidelines
originalArticleId: 5feb83b8-5196-44f9-8f6a-ffb208a2c162
redirect_from:
  - /docs/scos/dev/guidelines/performance-guidelines/general-performance-guidelines.html
  - /docs/scos/dev/guidelines/performance-guidelines.html
  - /docs/scos/dev/tuning-up-performance/202204.0/performance-guidelines.html
related:
  - title: Architecture performance guidelines
    link: docs/dg/dev/guidelines/performance-guidelines/architecture-performance-guidelines.html
  - title: Frontend performance guidelines
    link: docs/dg/dev/guidelines/performance-guidelines/front-end-performance-guidelines.html
  - title: Web Profiler Widget for Yves
    link: docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-web-profiler-widget-for-yves.html
  - title: Web Profiler for Zed
    link: docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-web-profiler-for-zed.html
---

Spryker is a fast application by design. These guidelines explain how to optimize the server-side execution time.

## Hosting recommendations

* *CPU*: Spryker's execution time depends on the CPU of the server. In general, more CPU capacity supports faster response times and allows a higher load.
* *Memory (Databases)*: Databases (Redis, Elasticsearch, and PostgreSQL) mainly consume RAM. When there is not enough RAM, you can face performance issues. The best amount of RAM depends on the amount of data that you have and needs to be measured from time to time.
* *Memory (PHP)*: The amount of memory does not impact on the execution time of PHP, but to squeeze everything out of your server, you need to define the `pm.max_children` configuration value of PHP-FPM. The max amount of parallel processes must not be higher than the available memory divided by the maximum consumption per process.
* *Latency*: You can see the highest speed of Spryker when Redis is installed on the same machine as the application, which helps to avoid latency. Redis has a blazing fast response time of 0.1 ms, but in cloud environments, you can often get additional 1-3ms of latency per `get()`. A caching mechanism that uses Spryker is described in the following sections of this document.

## Disable Xdebug

Xdebug slows down the application and is not necessary for a non-development environment.

## Use the newest version of PHP

For performance reasons, always use the newest stable version of PHP, as every new version ships with several improvements.


## Opcache activation

Make sure that Opcache is activated and properly configured:

| CONFIGURATION                   | PURPOSE                                                                                                                                                                                                                                                                               | PRODUCTION | DEVELOPMENT |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ----------- |
| `opcache.enable`                | Activates Opcache for web requests. Most developers disable this on development environments to avoid outdated code in caches. However, you can also activate it and check for changed files via `validate_timestamps` and `revalidate_freq` configurations.                          | 1          | 0           |
| `opcache.enable_cli`            | Activates Opcache for console commands.                                                                                                                                                                                                                                               | 1          | 0           |
| `opcache.max_accelerated_files` | Spryker and all the used open-source libraries contain a lot of PHP classes, so this value should be high (max is 100k).                                                                                                                                                              | ?          | 8192        |
| `opcache.memory_consumption`    | To avoid an automatic reset of the Opcache, these values must be high enough. You can look into the PHP info (for exaample, in Zed, browse to `/maintenance/php-info`) to see the current usage. You can count the number of classes in your codebase to get an idea of a good value. | ?          |             |
| `opcache.validate_timestamps`   | Boolean values that activate the check for the updated code. This check is time-consuming and must be disabled in production environments. However, you need to flush the cache during deployments—for example, by restarting PHP.                                                    | 0          | 1           |
| `opcache.revalidate_freq`       | Configures the frequency of checks if enabled by the `validate_timestamps` configuration. *0* means *on every request*,  which is recommended for development environments if you want to program with activated Opcache.	0	0                                                         | 0          | 0           |

```php
zend_extension=opcache.so
opcache.enable=1
opcache.enable_cli=1
opcache.max_accelerated_files=8192
opcache.memory_consumption=256

; Check if file updated on each request - for development
opcache.validate_timestamps=0
opcache.revalidate_freq=0
```

## Optimized Composer autoloader

A typical request in Yves requires up to 1000 PHP classes. Much time is needed to translate the class name to a file name. Composer is shipped with an autoloader that checks several paths to find a specific class. Composer also offers an optimized autoloader, which creates a map with all classes and their locations in the `vendor/composer/` directory. This map speeds up the autoloading by ~50%, and we recommend running it during every deployment:

```php
php composer dumpautoload -o
```

You can also optimize the autoloader by enabling some options in `composer.json`:

```json
"optimize-autoloader": true,
 "classmap-authoritative": true
```

For more details about composer autoloader optimization, see the [autoloader documentation.](https://getcomposer.org/doc/articles/autoloader-optimization.md)

## Deactivate all debug functions and the Symfony toolbar

The `config_default-production.php` file can disable all debuggers and the Symfony toolbar:

```php
$config[\Spryker\Shared\Application\ApplicationConstants::ENABLE_APPLICATION_DEBUG] = false;
$config[\SprykerShop\Shared\ShopApplication\ShopApplicationConstants::ENABLE_APPLICATION_DEBUG] = false;
$config[\Spryker\Shared\Application\ApplicationConstants::ENABLE_WEB_PROFILER] = false;
$config[\Spryker\Shared\Propel\PropelConstants::PROPEL_DEBUG] = false;
$config[\Spryker\Shared\WebProfiler\WebProfilerConstants::ENABLE_WEB_PROFILER] = false;
$config[\Spryker\Shared\Config\ConfigConstants::ENABLE_WEB_PROFILER] = false;

```

## Disable automatic queue creation

During the synchronization part of Publish & Sync, each time the `queue:task:start QUEUE-NAME` command is started, the RabbitMQ client tries to create all the configured queues and exchanges: `\Spryker\Client\RabbitMq\Model\Connection\Connection::__construct`. It takes up to 25% of CPU time per run. The effect becomes more significant for multi-store setups with each additional store.

For backward compatibility reasons, `RabbitMqEnv::RABBITMQ_ENABLE_RUNTIME_SETTING_UP` is enabled by default in the module configuration class: `\Spryker\Client\RabbitMq\RabbitMqConfig::isRuntimeSettingUpEnabled`. For production environments, we recommend disabling it by setting it to `false` in `config_default.php` or another config file.

Side effects:
- The application doesn't try to recreate queues and exchanges "on the fly" while interacting with RabbitMQ. If a queue is deleted, and the application attempts to access it, there will be an exception.
- The only way to create queues and exchanges to configure RabbitMQ is to run the `console queue:setup` CLI command defined in `\Spryker\Zed\RabbitMq\Communication\Console\QueueSetupConsole`. Make sure to *adjust your deploy scripts* accordingly.

## Disable INFO event logs

Publish & Sync process can work slower and generate hundreds of megabytes of `INFO`-level logs, which is good for troubleshooting and debugging, but not appropriate for production environments. By default `INFO` logs are enabled and generate about 60-100 MB per `queue:task:run ...` execution with 80-90% of CPU time only to write logs.

There are a few options to avoid this in production environments:

* Disable event logs using one of the following:
  * Set `EventConstants::LOG_FILE_PATH` to `null`.
  * Set `EventConstants::LOGGER_ACTIVE` to `false` in the appropriate config files, like `config_default.php`.
* Change the events log level in any config file, by setting `EventConstants::EVENT_LOGGER_LEVEL` to, for example, `\Monolog\Logger::WARNING` in newer (> 2.9.2) versions of `spryker/event`.
* For versions up to `spryker/event:2.9.2`: Override `LoggerConfig::createStreamHandler` to change the [event logger level](https://github.com/spryker/event/blob/master/src/Spryker/Zed/Event/Business/Logger/LoggerConfig.php).

## Activate Twig compiler

Twig files can be precompiled into PHP classes to speed the performance up. This behavior can be activated in the configuration. We highly recommend using the `FORCE_BYTECODE_INVALIDATION` option. Otherwise, Opcache may contain outdated content, as the files are modified during runtime.

```php
---//---
use Twig\Cache\FilesystemCache;
---//---
$currentStore = Store::getInstance()->getStoreName();

$config[TwigConstants::ZED_TWIG_OPTIONS] = [
    'cache' => new FilesystemCache(
        sprintf(
            '%s/src/Generated/Zed/Twig/codeBucket%s',
            APPLICATION_ROOT_DIR,
            $currentStore,
        ),
        FilesystemCache::FORCE_BYTECODE_INVALIDATION,
    ),
];

$config[TwigConstants::YVES_TWIG_OPTIONS] = [
    'cache' => new FilesystemCache(
        sprintf(
            '%s/src/Generated/Yves/Twig/codeBucket%s',
            APPLICATION_ROOT_DIR,
            $currentStore,
        ),
        FilesystemCache::FORCE_BYTECODE_INVALIDATION,
    ),
];

$config[TwigConstants::YVES_PATH_CACHE_FILE] = sprintf(
    '%s/src/Generated/Yves/Twig/codeBucket%s/.pathCache',
    APPLICATION_ROOT_DIR,
    $currentStore,
);

$config[TwigConstants::ZED_PATH_CACHE_FILE] = sprintf(
    '%s/src/Generated/Zed/Twig/codeBucket%s/.pathCache',
    APPLICATION_ROOT_DIR,
    $currentStore,
);
```

## Activate Twig path cache

Twig files can be in many places. To avoid time-consuming searches, we recommend activating the path cache (active by default). If you need to change this configuration, see `\Spryker\Yves\Twig\TwigConfig::getCacheFilePath()`.

## General Twig optimizations

Twig, together with [Atomic Frontend](/docs/dg/dev/frontend-development/{{site.version}}/yves/atomic-frontend/atomic-frontend.html), is an extremely flexible approach but at the same time not the fastest one. Check if you can reduce or optimize things there.
For example, the `{% raw %}{{{% endraw %} data.foo.bar.firstName {% raw %}}}{% endraw %}` `{% raw %}{{{% endraw %} data.foo.bar.lastName {% raw %}}}{% endraw %}` trigger many calls to the `Template::getAttribute()` method which is very slow.

Making calculations on the PHP side can help here a lot, as well as using `{% raw %}{{{% endraw %} set customer = data.foo.bar {% raw %}}}{% endraw %}` + `{% raw %}{{{% endraw %} customer.firstName {% raw %}}}{% endraw %}` `{% raw %}{{{% endraw %} customer.lastName {% raw %}}}{% endraw %}`.

## Activate Zed navigation cache

The navigation of Zed is defined in XML files that need to be parsed and merged. As it does not happen quite often, it's recommended to keep the cache activated at all times (even during development) and to run `vendor/bin/console navigation:build-cache` only when something has changed.

Zed navigation cache is activated by default:

```php
$config[\Spryker\Shared\ZedNavigation\ZedNavigationConstants::ZED_NAVIGATION_CACHE_ENABLED] = true;

```

## Redis Mget cache

Yves performs a high number of `get()` calls to Redis. If Redis is installed on the same machine, the expected time per `get()` is below 0.1 ms. However, if you run Spryker in a cloud environment, there is latency for each `get()` call to Redis. It can sum up to a few hundred milliseconds per request. To avoid this performance bottleneck, Spryker remembers all used `get()` calls per URL and performs a single `mget()` to retrieve all needed data in one call. This behavior is enabled by default.

If you see a high number of `get()` calls in your monitoring, make sure that `StorageCacheEventDispatcherPlugin` is registered in `Pyz\Yves\EventDispatcher\EventDispatcherDependencyProvider`. This plugin is responsible for the persistence of the cache data in Redis. For more information about the Redis Mget cache, see [Use Redis as a KV Storage](/docs/dg/dev/backend-development/client/use-and-configure-redis-as-a-key-value-storage.html#use-and-configure-redis-cache).

## ClassResolver optimizations

Spryker often uses the so-called class resolvers. Those resolvers are responsible for finding class names for certain overridable class names. For example, resolvers are  `ModuleFactory`, `ModuleConfig`, `ModuleClient`.

The process of resolving the right class name is done by building class name candidates. These candidates list contains a Store class name, for example, `\Pyz\Application\ModuleSTORE\ModuleFactory`, a project class name, for example, `\Pyz\Application\Module\ModuleFactory`, and a core class name, for example,`\Spryker\Application\Module\ModuleFactory`. Depending on the found class, the resolver returns the class instance, which is then used.

To speed up the overall page load, there are two features: resolvable class names cache and resolvable Instance cache.

### Activate resolvable class names cache

The resolvable class names cache is disabled by default. To activate it, by add the following configuration to your `config_*` files:

```php
$config[KernelConstants::RESOLVABLE_CLASS_NAMES_CACHE_ENABLED] = true;
```

Additionally, you need to build the cache file during your deployment. Add `\Spryker\Zed\Kernel\Communication\Console\ResolvableClassCacheConsole` to your `ConsoleDependencyProvider` if you don't have it, and run the following:

```bash
vendor/bin/console cache:class-resolver:build
```
This command builds a cache file, which is used by the `ClassResolver`.

### Activate resolved instance cache

On top of the resolvable class names cache, you can turn on an instance cache for the resolved classes by adding the following configuration to your `config_*` files:

```php
$config[KernelConstants::RESOLVED_INSTANCE_CACHE_ENABLED] = true;
```

This allows reusing an already resolved class instance during a request.

{% info_block warningBox "Warning" %}

Enabling this option can cause undesired behavior when the resolved class is stateful.

{% endinfo_block %}

## Reduce functionality

Check if you require all features you currently use and check all applied plugins if you need them. Some plugins can probably be removed. Specifically, check the following ones:

- `CheckoutDependencyProvider`
- `CalculationDependencyProvider`

There might be other DependencyProvider, and you must check if you can remove default applied features. Not all of them are used in all projects.

### Remove unneeded Twig functions

Check if you need the `can` method calls from Twig. For example, `{% raw %}{%{% endraw %} if can('SeePricePermissionPlugin') {% raw %}%}{% endraw %}`. Talking back from Twig to PHP is often slow, so try to avoid that by checking if you need all used Twig functions Spryker provides.

### Use the newest Spryker modules

Try to update the Spryker modules where you can, as we constantly add performance optimizations. Ideally, always use the latest versions of the Spryker modules.

The latest performance optimization releases can be found in:

- https://github.com/spryker/kernel/releases/tag/3.37.4
- https://github.com/spryker/catalog-price-product-connector/releases/tag/1.3.0
- https://github.com/spryker/catalog-search-rest-api/releases/tag/2.4.0
- https://github.com/spryker/category-storage/releases/tag/1.8.0
- https://github.com/spryker/customer-catalog/releases/tag/1.1.0
- https://github.com/spryker/price-product/releases/tag/4.15.2
- https://github.com/spryker/price-product-merchant-relationship-storage/releases/tag/1.9.0
- https://github.com/spryker/price-product-storage/releases/tag/4.4.0
- https://github.com/spryker/product-list-storage/releases/tag/1.11.0
- https://github.com/spryker/product-prices-rest-api/releases/tag/1.4.0
- https://github.com/spryker/quote/releases/tag/2.13.0
- https://github.com/spryker/store/releases/tag/1.14.0

## Performance profiling

We constantly check the performance of Spryker by using profiling tools and work on optimizations whenever we see the need for it. We fix the performance issues as soon as possible when we see them or get informed about them. Therefore, whenever you see a performance issue feel free to [contact us](https://spryker.force.com/support/s/create-request-case), ideally with a performance profile that can look at.
