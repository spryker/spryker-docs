---
title: Performance Guidelines
originalLink: https://documentation.spryker.com/v3/docs/performance-guidelines
redirect_from:
  - /v3/docs/performance-guidelines
  - /v3/docs/en/performance-guidelines
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
php composer.phar dumpautoload -o
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

## Activate Zed Navigation Cache (Default On

The navigation of Zed is defined in XML files that need to be parsed and merged. As it does not happen quite often, it is recommended to keep the cache activated all the times (even during development) and to run `vendor/bin/console navigation:build-cache` only when anything has changed.

```php
$config[\Spryker\Shared\ZedNavigation\ZedNavigationConstants::ZED_NAVIGATION_CACHE_ENABLED] = true;
		
```

## Activate Class Resolver Cache

Spryker allows to extend some classes (like facades, clients, etc.) in projects and also for multiple stores. Therefore each class can exist on core-, project- and store-level. We also support multiple namespaces for each level, so there are several possible places for any of these classes. To avoid unnecessary usages of the expensive `class_exists()` function, Spryker provides a caching mechanism that writes all non-existing classes into a cache file (see for example `/data/DE/cache/Yves/unresolvable.cache`, the same applies for different stores and Zed as well). This cache file must be removed during every deployment, and it is not recommended to active this during development.

```php
$config[\Spryker\Shared\Kernel\KernelConstants::AUTO_LOADER_UNRESOLVABLE_CACHE_ENABLED] = true;
```

You can also configure a path for the `unresolvable.cache` file:

```php
$config[\Spryker\Shared\Kernel\KernelConstants::AUTO_LOADER_CACHE_FILE_PATH] = APPLICATION_ROOT_DIR . '/data/' . \Spryker\Shared\Kernel\Store::getInstance()->getStoreName() . '/cache/' . ucfirst(strtolower(APPLICATION)) . '/unresolvable.cache';
	
```

## Redis Mget Cache (Default: On)

Yves performs a high number of `get()` calls to Redis. In case Redis is installed on the same machine, then the expected time per `get()` is below 0.1 ms. However, in case you run Spryker on a cloud environment, there is latency for each `get()` call to Redis. It can sum up to a few hundred milliseconds per request. To avoid this performance bottleneck, Spryker remembers all used `get()` calls per URL and performs a single `mget()` to retrieve all needed data in one call. This behavior works out of the box. In case you see a high number of `get()` calls in your monitoring, you should make sure that the `StorageCacheServiceProvider` is registered in `YvesBootstrap`. This provider is responsible for the persistence of the cache data in Redis. For more information about the Redis Mget cache, see [Using Redis as a KV Storage](https://documentation.spryker.com/v4/docs/redis-as-kv#using-redis-cache).

<!-- Last review date: May 3, 2019-- by Denis Turkov -->
