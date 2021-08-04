---
title: Performance Guidelines
originalLink: https://documentation.spryker.com/v5/docs/performance-guidelines
redirect_from:
  - /v5/docs/performance-guidelines
  - /v5/docs/en/performance-guidelines
---

Spryker is a fast application by design. This guideline explains how to optimize the server-side execution time.

## Hosting Recommendations

* **CPU**: Spryker's execution time depends on the CPU of the server. In general, we can say that more CPU capacity supports faster response times and allows a higher load.
* **Memory (Databases)**: Databases (Redis, Elasticsearch, and PostgreSQL) mainly consume RAM. When there is not enough RAM, you'll see performance issues. The best amount of RAM depends on the amount of data that you have and needs to be measured from time to time.
* **Memory (PHP)**: The amount of memory does not have an impact on the execution time of PHP, but to squeeze everything out of your server you'll need to define the `pm.max_children` configuration value of PHP-FPM. The max amount of parallel processes must not be higher than the available memory divided by the maximum consumption per process.
* **Latency**: You'll see the highest speed of Spryker when Redis is installed on the same machine than the application to avoid latency. Redis has a blazing fast response time of 0.1ms, but in cloud environments, you'll often get additional 1-3ms of latency per `get()`. A caching mechanism that uses Spryker is described below.

## Disable Xdebug

Xdebug slows down the application a lot and is not necessary for a non-development environment.

## Use the Newest Version of PHP

For performance reason, you should always use the newest stable version of PHP, as every new version ships with several improvements.

## Opcache Activation

Make sure that the Opcache is activated and well configured.

| Configuration                   | Purpose                                                      | Production | Development |
| ------------------------------- | ------------------------------------------------------------ | ---------- | ----------- |
| `opcache.enable`                | Activates opcache for web requests. Most developers disable this on development environments to avoid outdated code in caches, but you can also activate it and check for changed files via `validate_timestamps` and `revalidate_freq` configurations. | 1          | 0           |
| `opcache.enable_cli`            | Activates opcache for console comands                        | 1          | 0           |
| `opcache.max_accelerated_files` | Spryker and all the used open source libraries contain a lot of PHP classes, so this value should be high (Max is 100k) | ?          | 8192        |
| `opcache.memory_consumption`    | To avoid an automatic reset of the opcache, these values must be high enough. You can look into the PHP info (e.g., in Zed browse to `/maintenance/php-info`) to see the current usage. You can count the number of classes in your code base to get a feeling for good value here. | ?          |             |
| `opcache.validate_timestamps`   | Boolean values that activates the check for the updated code. This check is time-consuming and should be disabled in production environments. However, you'll need to flush the cache during deployments (e.g., by restarting PHP). | 0          | 1           |
| `opcache.revalidate_freq`       | This configures the frequency of checks (if enabled via the `validate_timestamps` configuration). "0" means on every request which is recommended for development environments in case you want to program with activated opcache.	0	0 | 0          | 0           |

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

## Optimized Composer Autoloader

A typical request in Yves required up to 1000 PHP classes. Much time is needed to translate the class name to a filename. Composer is shipped with an autoloader that checks several paths to find a specific class. Composer also offers an optimized autoloader which creates a map with all classes and their locations in the `vendor/composer/` directory. This map speeds up the autoloading by ~50%, and we recommend to run this during every deployment.

```php
php composer dumpautoload -o
```

You can also optimize autoloader by enabling some options in `composer.json`:

```json
"optimize-autoloader": true,
 "classmap-authoritative": true
```

You can find more details about composer autoloader optimization in the [documentation.](https://getcomposer.org/doc/articles/autoloader-optimization.md)

## Deactivate All Debug Functions And the Symfony Toolbar

The `config_default-production.php` file should disable all debuggers and the Symfony toolbar.

```php
$config[\Spryker\Shared\Application\ApplicationConstants::ENABLE_APPLICATION_DEBUG] = false;
$config[\SprykerShop\Shared\ShopApplication\ShopApplicationConstants::ENABLE_APPLICATION_DEBUG] = false;
$config[\Spryker\Shared\Application\ApplicationConstants::ENABLE_WEB_PROFILER] = false;
$config[\Spryker\Shared\Propel\PropelConstants::PROPEL_DEBUG] = false;
$config[\Spryker\Shared\WebProfiler\WebProfilerConstants::ENABLE_WEB_PROFILER] = false;
$config[\Spryker\Shared\Config\ConfigConstants::ENABLE_WEB_PROFILER] = false;
		
```

## Activate Twig Compiler

Twig files can be pre-compiled into PHP classes to speed it up. It can be activated in the configuration. We highly recommend using the `FORCE_BYTECODE_INVALIDATION` option. Otherwise, the opcache may contain outdated content, as these files are modified during runtime.

```php
$config[\Spryker\Shared\Twig\TwigConstants::ZED_TWIG_OPTIONS] = [
'cache' => new Twig_Cache_Filesystem(sprintf(
'%s/data/%s/cache/Zed/twig',
APPLICATION_ROOT_DIR, $CURRENT_STORE),
Twig_Cache_Filesystem::FORCE_BYTECODE_INVALIDATION),
];
 
$config[\Spryker\Shared\Twig\TwigConstants::YVES_TWIG_OPTIONS] = [
'cache' => new Twig_Cache_Filesystem(sprintf(
'%s/data/%s/cache/Yves/twig',
APPLICATION_ROOT_DIR, $CURRENT_STORE),
Twig_Cache_Filesystem::FORCE_BYTECODE_INVALIDATION),
		];
```

## Activate Twig Path Cache

Twig files can be in a lot of places. To avoid time consuming searches, we recommend to activate the path cache.

```php
$config[\Spryker\Shared\Twig\TwigConstants::YVES_PATH_CACHE_FILE] = sprintf(
'%s/data/%s/cache/Yves/twig/.pathCache',
APPLICATION_ROOT_DIR,
$CURRENT_STORE
);
$config[\Spryker\Shared\Twig\TwigConstants::ZED_PATH_CACHE_FILE] = sprintf(
'%s/data/%s/cache/Zed/twig/.pathCache',
APPLICATION_ROOT_DIR,
$CURRENT_STORE
);
```

## Activate Zed Navigation Cache (Default On)

The navigation of Zed is defined in XML files that need to be parsed and merged. As it does not happen quite often, it is recommended to keep the cache activated all the times (even during development) and to run `vendor/bin/console navigation:build-cache` only when anything has changed.

```php
$config[\Spryker\Shared\ZedNavigation\ZedNavigationConstants::ZED_NAVIGATION_CACHE_ENABLED] = true;
		
```

## Activate Class Resolver Cache

{% info_block warningBox "Compatibility" %}

We do not recommend using this feature with PHP 7.2 due the [bug](https://bugs.php.net/bug.php?id=75765).

{% endinfo_block %}

Spryker allows extending certain classes (such as facades, clients, etc.) in projects and in multiple stores. Therefore each class can exist on the *core*, *project*, and *store* level. In addition to that, Spryker supports multiple namespaces for each level. Because of this, there exist multiple possible locations to look up such classes. To avoid unnecessary usages of the expensive `class_exists()` function that does the job, Spryker provides a caching mechanism that writes all non-existing classes into a cache file, for example, `/data/DE/cache/Yves/unresolvable.cache` for Yves. Similar files are also created for Glue and Zed, one file for each store.

```php
$config[\Spryker\Shared\Kernel\KernelConstants::AUTO_LOADER_UNRESOLVABLE_CACHE_ENABLED] = true;
```

{% info_block infoBox "Note" %}

It is recommended to disable the feature during development.

{% endinfo_block %}

You can also configure a path for the `unresolvable.cache` file as follows:

```php
$config[\Spryker\Shared\Kernel\KernelConstants::AUTO_LOADER_CACHE_FILE_PATH] = APPLICATION_ROOT_DIR . '/data/' . \Spryker\Shared\Kernel\Store::getInstance()->getStoreName() . '/cache/' . ucfirst(strtolower(APPLICATION)) . '/unresolvable.cache';
	
```
{% info_block warningBox "Warning" %}

You need to remove the cache files for each project deployment.

{% endinfo_block %}

See [EventDispatcher module migration guide](https://documentation.spryker.com/docs/en/migration-guide-eventdispatcher) for information on how to upgrade to a newer version of EventDispatcher module.

See [Cache of Unresolved Entities for Zed ](https://documentation.spryker.com/docs/en/cache-of-unresolved-entities-for-zed)for information on how to integrate the Cache of Unresolved Entities for Zed feature into your project.


## Redis Mget Cache (Default: On)

Yves performs a high number of `get()` calls to Redis. In case Redis is installed on the same machine, then the expected time per `get()` is below 0.1 ms. However, in case you run Spryker on a cloud environment, there is latency for each `get()` call to Redis. It can sum up to a few hundred milliseconds per request. To avoid this performance bottleneck, Spryker remembers all used `get()` calls per URL and performs a single `mget()` to retrieve all needed data in one call. This behavior works out of the box. In case you see a high number of `get()` calls in your monitoring, you should make sure that the `StorageCacheServiceProvider` is registered in `YvesBootstrap`. This provider is responsible for the persistence of the cache data in Redis. For more information about the Redis Mget cache, see [Using Redis as a KV Storage](https://documentation.spryker.com/docs/en/redis-as-kv#using-redis-cache).

## ClassResolver Optimizations
Spryker often uses the so-called class resolvers. Those resolvers are responsible for finding class names for certain overridable class names. Resolvables are for example `ModuleFactory`, `ModuleConfig`, `ModuleClient` etc. The process of resolving the right class name is done by building class name candidates. These candidates list contains a Store class name, e.g. `\Pyz\Application\ModuleSTORE\ModuleFactory`, a project class name e.g. `\Pyz\Application\Module\ModuleFactory` and a core class name e.g. `\Spryker\Application\Module\ModuleFactory`. Depending on the found class, the resolver returns the class instance which is then used.
To speed the overall page load, there are two features: Resolvable Class Names Cache and Resolvable Instance Cache.

### Resolvable Class Names Cache
The resolvable class names cache is disabled by default. Activate it by adding the following configuration to your `config_*` files:
```PHP
$config[KernelConstants::RESOLVABLE_CLASS_NAMES_CACHE_ENABLED] = true;
```
Additionally, you need to build the cache file during your deployment. If you don't have the `\Spryker\Zed\Kernel\Communication\Console\ResolvableClassCacheConsole` added in your `ConsoleDependencyProvider` , add it and run the following command:
```Bash
vendor/bin/console cache:class-resolver:build
```
This will build a cache file that will be used by the ClassResolver.

### Resolved Instance Cache
On top of the resolvable class names cache, you can turn on an instance cache for the resolved classes by adding the following configuration to your `config_*` files:
```PHP
$config[KernelConstants::RESOLVED_INSTANCE_CACHE_ENABLED] = true;
```
This will allow reusing an already resolved class instance during a request.

{% info_block warningBox "Warning" %}

Enabling this option can lead to undesired behavior when the resolved class is stateful.

{% endinfo_block %}

