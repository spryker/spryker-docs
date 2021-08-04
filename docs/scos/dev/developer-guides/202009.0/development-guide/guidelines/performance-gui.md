---
title: Performance guidelines
originalLink: https://documentation.spryker.com/v6/docs/performance-guidelines
redirect_from:
  - /v6/docs/performance-guidelines
  - /v6/docs/en/performance-guidelines
---

Spryker is a fast application by design. These guidelines explain how to optimize the server-side execution time.

## Hosting recommendations

* **CPU**: Spryker's execution time depends on the CPU of the server. In general, we can say that more CPU capacity supports faster response times and allows a higher load.
* **Memory (Databases)**: Databases (Redis, Elasticsearch, and PostgreSQL) mainly consume RAM. When there is not enough RAM, you'll see performance issues. The best amount of RAM depends on the amount of data that you have and needs to be measured from time to time.
* **Memory (PHP)**: The amount of memory does not impact on the execution time of PHP, but to squeeze everything out of your server, you'll need to define the `pm.max_children` configuration value of PHP-FPM. The max amount of parallel processes must not be higher than the available memory divided by the maximum consumption per process.
* **Latency**: You'll see the highest speed of Spryker when Redis is installed on the same machine as the application, which helps to avoid latency. Redis has a blazing fast response time of 0.1 ms, but in cloud environments, you'll often get additional 1-3ms of latency per `get()`. A caching mechanism that uses Spryker is described in the next sections of this article.

## Disable Xdebug

Xdebug slows down the application a lot and is not necessary for a non-development environment.

## Use the newest version of PHP

For performance reasons, always use the newest stable version of PHP, as every new version ships with several improvements.


## Opcache activation

Make sure that Opcache is activated and properly configured:

| Configuration                   | Purpose                                                      | Production | Development |
| ------------------------------- | ------------------------------------------------------------ | ---------- | ----------- |
| `opcache.enable`                | Activates Opcache for web requests. Most developers disable this on development environments to avoid outdated code in caches, but you can also activate it and check for changed files via `validate_timestamps` and `revalidate_freq` configurations. | 1          | 0           |
| `opcache.enable_cli`            | Activates Opcache for console commands                        | 1          | 0           |
| `opcache.max_accelerated_files` | Spryker and all the used open source libraries contain a lot of PHP classes, so this value should be high (max is 100k). | ?          | 8192        |
| `opcache.memory_consumption`    | To avoid an automatic reset of the Opcache, these values must be high enough. You can look into the PHP info (e.g., in Zed browse to `/maintenance/php-info`) to see the current usage. You can count the number of classes in your codebase to get an idea of a good value. | ?          |             |
| `opcache.validate_timestamps`   | Boolean values that activate the check for the updated code. This check is time-consuming and should be disabled in production environments. However, you'll need to flush the cache during deployments (e.g., by restarting PHP). | 0          | 1           |
| `opcache.revalidate_freq`       | This configures the frequency of checks (if enabled via the `validate_timestamps` configuration). "0" means *on every request*  which is recommended for development environments in case you want to program with activated Opcache.	0	0 | 0          | 0           |

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

A typical request in Yves requires up to 1000 PHP classes. Much time is needed to translate the class name to a file name. Composer is shipped with an autoloader that checks several paths to find a specific class. Composer also offers an optimized autoloader which creates a map with all classes and their locations in the `vendor/composer/` directory. This map speeds up the autoloading by ~50%, and we recommend running it during every deployment:

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

The `config_default-production.php` file should disable all debuggers and the Symfony toolbar:

```php
$config[\Spryker\Shared\Application\ApplicationConstants::ENABLE_APPLICATION_DEBUG] = false;
$config[\SprykerShop\Shared\ShopApplication\ShopApplicationConstants::ENABLE_APPLICATION_DEBUG] = false;
$config[\Spryker\Shared\Application\ApplicationConstants::ENABLE_WEB_PROFILER] = false;
$config[\Spryker\Shared\Propel\PropelConstants::PROPEL_DEBUG] = false;
$config[\Spryker\Shared\WebProfiler\WebProfilerConstants::ENABLE_WEB_PROFILER] = false;
$config[\Spryker\Shared\Config\ConfigConstants::ENABLE_WEB_PROFILER] = false;
		
```

## Activate Twig compiler

Twig files can be pre-compiled into PHP classes to speed the performance up. This behavior can be activated in the configuration. We highly recommend using the `FORCE_BYTECODE_INVALIDATION` option. Otherwise, Opcache may contain outdated content, as the files are modified during runtime.

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

## Activate Twig path cache

Twig files can be in many places. To avoid time-consuming searches, we recommend to activate the path cache:

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

## General Twig optimizations

Twig, together with [Atomic Frontend](https://documentation.spryker.com/docs/atomic-front-end-general-overview), is an extremely flexible approach but at the same time not the fastest one. Check if you can reduce or optimize things there. 
For example, `{% raw %}{{{% endraw %} data.foo.bar.firstName {% raw %}}}{% endraw %}` `{% raw %}{{{% endraw %} data.foo.bar.lastName {% raw %}}}{% endraw %}` trigger many calls to the `Template::getAttribute()` method which is very slow. Making calculations on the PHP side can help here a lot, as well as using `{% raw %}{{{% endraw %} set customer = data.foo.bar {% raw %}}}{% endraw %}` + `{% raw %}{{{% endraw %} customer.firstName {% raw %}}}{% endraw %}` `{% raw %}{{{% endraw %} customer.lastName {% raw %}}}{% endraw %}`. 

## Activate Zed navigation cache

The navigation of Zed is defined in XML files that need to be parsed and merged. As it does not happen quite often, it is recommended to keep the cache activated at all times (even during development) and to run `vendor/bin/console navigation:build-cache` only when something has changed.

Zed navigation cache is activated by default:

```php
$config[\Spryker\Shared\ZedNavigation\ZedNavigationConstants::ZED_NAVIGATION_CACHE_ENABLED] = true;
		
```

## Activate class resolver cache

{% info_block warningBox "Compatibility" %}

We do not recommend using this feature with PHP 7.2 due the [bug](https://bugs.php.net/bug.php?id=75765).

{% endinfo_block %}

Spryker allows extending certain classes (such as facades, clients, etc.) in projects and in multiple stores. Therefore, each class can exist on the *core*, *project*, and *store* level. Also, Spryker supports multiple namespaces for each level. Because of this, there exist multiple possible locations to look up such classes. To avoid unnecessary usages of the expensive `class_exists()` function that does the job, there is a caching mechanism that writes all non-existing classes into a cache file, for example, `/data/DE/cache/Yves/unresolvable.cache` for Yves. Similar files are also created for Glue and Zed, one file per store.

```php
$config[\Spryker\Shared\Kernel\KernelConstants::AUTO_LOADER_UNRESOLVABLE_CACHE_ENABLED] = true;
```

{% info_block infoBox "Note" %}

It is recommended to disable this feature during development.

{% endinfo_block %}

You can also configure a path for the `unresolvable.cache` file as follows:

```php
$config[\Spryker\Shared\Kernel\KernelConstants::AUTO_LOADER_CACHE_FILE_PATH] = APPLICATION_ROOT_DIR . '/data/' . \Spryker\Shared\Kernel\Store::getInstance()->getStoreName() . '/cache/' . ucfirst(strtolower(APPLICATION)) . '/unresolvable.cache';
	
```
{% info_block warningBox "Warning" %}

You need to remove the cache files for each project deployment.

{% endinfo_block %}

See [EventDispatcher module migration guide](https://documentation.spryker.com/docs/migration-guide-eventdispatcher) for information on how to upgrade to a newer version of the EventDispatcher module.

See [Cache of Unresolved Entities for Zed ](https://documentation.spryker.com/docs/cache-of-unresolved-entities-for-zed) for information on how to integrate the Cache of Unresolved Entities for Zed feature into your project.


## Redis Mget cache

Yves performs a high number of `get()` calls to Redis. If Redis is installed on the same machine, the expected time per `get()` is below 0.1 ms. However, in case you run Spryker in a cloud environment, there is latency for each `get()` call to Redis. It can sum up to a few hundred milliseconds per request. To avoid this performance bottleneck, Spryker remembers all used `get()` calls per URL and performs a single `mget()` to retrieve all needed data in one call. This behavior is enabled by default. 

In case you see a high number of `get()` calls in your monitoring, make sure that `StorageCacheServiceProvider` is registered in `YvesBootstrap`. This provider is responsible for the persistence of the cache data in Redis. For more information about the Redis Mget cache, see [Using Redis as a KV Storage](https://documentation.spryker.com/v4/docs/redis-as-kv#using-redis-cache).

## ClassResolver optimizations
Spryker often uses the so-called class resolvers. Those resolvers are responsible for finding class names for certain overridable class names. Resolvables are for example `ModuleFactory`, `ModuleConfig`, `ModuleClient` etc. 

The process of resolving the right class name is done by building class name candidates. These candidates list contains a Store class name, for example, `\Pyz\Application\ModuleSTORE\ModuleFactory`, a project class name, for example, `\Pyz\Application\Module\ModuleFactory`, and a core class name, for example,`\Spryker\Application\Module\ModuleFactory`. Depending on the found class, the resolver returns the class instance, which is then used.

To speed up the overall page load, there are two features: resolvable class names cache and resolvable Instance cache.
 
### Resolvable class names cache
The resolvable class names cache is disabled by default. Activate it by adding the following configuration to your `config_*` files:
```PHP
$config[KernelConstants::RESOLVABLE_CLASS_NAMES_CACHE_ENABLED] = true;
```
Additionally, you need to build the cache file during your deployment. Add `\Spryker\Zed\Kernel\Communication\Console\ResolvableClassCacheConsole` to your `ConsoleDependencyProvider` if you don't have it, and run

```Bash
vendor/bin/console cache:class-resolver:build
```
This builds a cache file that will be used by the ClassResolver.

### Resolved instance cache
On top of the resolvable class names cache, you can turn on an instance cache for the resolved classes by adding the following configuration to your `config_*` files:
```PHP
$config[KernelConstants::RESOLVED_INSTANCE_CACHE_ENABLED] = true;
```
This allows reusing an already resolved class instance during a request.

{% info_block warningBox "Warning" %}

Enabling this option can lead to undesired behavior when the resolved class is stateful.

{% endinfo_block %}

## Reduce functionality

Check if you require all features you currently use and check all applied plugins if you need them. Some plugins can probably be removed. Specifically, check:
- CheckoutDependencyProvider
- CalculationDependencyProvider

There might be other DependencyProvider you should check if you can remove default applied features. Not all of them are used in all projects.

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

We constantly check the performance of Spryker by using profiling tools and work on optimizations whenever we see the need for it. We fix the performance issues as soon as possible when we see them or get informed about them. Therefore, whenever you see a performance issue feel free to [contact us](https://spryker.force.com/support/s/create-request-case), ideally with a performance profile, we can look at.

