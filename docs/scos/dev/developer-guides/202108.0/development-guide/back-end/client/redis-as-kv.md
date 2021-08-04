---
title: Using and Configuring Redis as a Key-value Storage
originalLink: https://documentation.spryker.com/2021080/docs/redis-as-kv
redirect_from:
  - /2021080/docs/redis-as-kv
  - /2021080/docs/en/redis-as-kv
---

This article describes how Redis is used within Spryker.The current functionality can be extended according to your needs.

## About Redis

Redis is a key-value data storage, and for the values, it supports a large collection of data structures, such as strings, hashes, lists, or sets.

The following table shows how translations are stored:

| Locale | Key                                          | Value     |
| ------ | -------------------------------------------- | --------- |
| de_DE  | `kv:de.de_de.glossary.translation.global.cart` | Warenkorb |
| en_US  | `kv:de.en_us.glossary.translation.global.cart` | Cart      |

The values for the translations are stored as strings, but more complex types, such as product information, are stored in JSON format.

The key name follows this format: `kv:{store}{locale}{resource-type}{key}`.

## Redis data storage

The data stored in Redis includes:

* URL mappings
* Product details
* Product category details
* Stock information
* Translations
* CMS pages and blocks

## How data is loaded into Redis

Data is loaded in Redis through a dedicated console command. This console command is executed when the application is initially installed, but you can execute it also from the command line:

```php
console sync:data
```

See [Publish and Synchronization](https://documentation.spryker.com/docs/publish-and-synchronization) to find out more about how the Publish and Synchronization works and how to extend it.

## How data is kept in sync

Of course, the data stored in the SQL database is the subject of change; data can be updated or deleted, or new entries can be added. The data currently stored in Redis is a snapshot of the data in the SQL database from when the last update was run. The key-value data storage must be kept in sync with the data persisted in the SQL database. To achieve this, you must set up a cron job that runs on a specified time interval and updates the key-value data storage.

For more information, see [Cronjob Scheduling](https://documentation.spryker.com/docs/cronjob-scheduling).

You must also find out which data has changed because you don’t want to completely reload the content stored in Redis. The Touch module takes care of marking the items that were updated in the meantime. You must keep in mind that every time you make an update/delete/insert for data that’s also stored in Redis, you must touch that data so that it’s marked for export when the next storage update task will run.

## Browsing the data from Redis

To be able to browse the data that’s stored in Redis, you must set up Redis Desktop Manager(RDS). [Install RDS](http://redisdesktop.com/download) and then configure as shown on the screenshot below.

Find the current Redis Port in `config/Shared/config_default-development.php`.
![Redis setup](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Yves/Using+Redis+as+a+KV+Storage/redis-setup.png){height="" width=""}

Make sure that your virtual machine is up and running.

## Using the data stored in Redis
This section describes how you can use data stored in Redis.

### Translations

To show content translated according to the selected locale, you can use the translation extension from the `twig` file; you just have to specify the key name and pipe it to the `trans` extension. When rendered, the value that corresponds to the selected locale for that key will be shown.

For example,

```html
<button>{% raw %}{{{% endraw %} "page.detail.add-to-cart"|trans {% raw %}}}{% endraw %}</button>
```

The caption for the button depends on the selected locale:

| Locale | Key                                                      | Value            |
| ------ | -------------------------------------------------------- | ---------------- |
| de_DE  | `kv:de.de_de.glossary.translation.page.detail.add-to-cart` | In den Warenkorb |
| en_US  | `kv:de.en_us.glossary.translation.page.detail.add-to-cart` | Add to Cart      |

### Accessing the Redis data storage

Redis data storage is accessed using the `StorageClient`.

The `StorageClient` can be obtained as an external dependency for Yves, in the client layer. In the dependency provider of the client layer from your module, add the `StorageClient` dependency as in the example below:

```php
<?php

    const CLIENT_STORAGE = 'CLIENT_STORAGE';

    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Kernel\Container
     */
    public function provideServiceLayerDependencies(Container $container)
    {
        $container[static::CLIENT_STORAGE] = function (Container $container) {
            return $container->getLocator()->storage()->client();
        };

        return $container;
    }
```

Add a method that retrieves an instance of the key-value storage in the factory of the client layer of your module:

```php
<?php

     /**
     * @return \Spryker\Client\Storage\StorageClientInterface
     */
    public function getStorageClient()
    {
        return $this->getProvidedDependency(MyBundleDependencyProvider::CLIENT_STORAGE);
    }
```

To retrieve the value for a given key, you can use the `get($key)` operation from the `StorageClient`.

```php
<?php
$storedValue = $this->storageClient->get($myKey);
```

## Using a password for accessing Redis

It is possible to define a password to restrict access to Redis. Spryker provides the `\Spryker\Shared\Storage\StorageConstants::STORAGE_REDIS_PASSWORD` configuration option that can be used to configure the Redis client to authenticate Spryker.

To activate this, specify the `redis` protocol for `\Spryker\Shared\Storage\StorageConstants::STORAGE_REDIS_SCHEME` (the Spryker Demo Shop uses `tcp` by default).

## Using and configuring Redis cache

To boost the performance in Spryker even more, we have built a caching mechanism to cache all used Redis keys on any page in the shop.

A page in the shop often contains many different Redis entries for various content and information it has. For example, a product title, a description, and attributes on a product details page. All of this data is stored in many Redis key-value pairs. To retrieve the data for a page, multiple Redis GET requests are needed, so if a page uses a 100 Redis key-values pairs, then a 100 Redis GET requests are needed to retrieve the data.

To optimize the data retrieval from Redis, we designed an algorithm to store all the needed keys in a given page in the shop in only one Redis key and then use one Redis MGET (multi-get) request to retrieve all the data. Using the implemented algorithm, only two requests to Redis are needed for most of the pages: one GET request to get the cache entry and one MGET requests to get all the data.

The Redis cache for a page is basically a key-value pair. The key of the cache is the prefix **StorageClient_** followed by the URL of the page, while the value of the cache is simply a list of all Redis keys used on the cached page.

When accessing a new page, the algorithm checks if a cache for it is already built. If yes, the page uses or refreshes the cache if needed, otherwise, the algorithm builds a new cache.

Spryker provides three caching strategies to build the list of the keys in the cache entry:

* **Replacement strategy.** This strategy overwrites the list of the keys in a cache with a new one every time a cached page is accessed. This strategy is useful with static pages where the list of keys for these do not change often. This is the default strategy when a strategy is not specified.
* **Incremental strategy.** This strategy increments the list of keys inside the cache until the limit is exceeded. The default limit is 1000 keys. The incremental strategy is useful with a page that uses configurators, for example, variants where the cache stores all the different combinations.
* **Inactive strategy.** This strategy deactivates the cache for a specified page.

All the cache entries have a default TTL of one day. The cache will be removed after one day, and a new one will be generated for different pages when accessing them.

### How to add and configure the cache

The cache works on the controller level. This means that you can define what strategy a controller uses for all of its actions. By default, the cache is active and uses the Replace strategy.

To specify what cache strategy a controller uses, only two steps are required:

1. Use the Yves **AbstractController**

```php
use Pyz\Yves\Application\Controller\AbstractController;
```

2. Define the cache strategy by assigning the value to the **STORAGE_CACHE_STRATEGY** constant. For example, an incremental strategy is defined in the following code.

```php
 const STORAGE_CACHE_STRATEGY = StorageConstants::STORAGE_CACHE_STRATEGY_INCREMENTAL;
```

That is it!

To change the default configuration values for the TTL and the key-size limit for the incremental strategy, you can extend the **StorageConfig** and override the following methods:

* **getStorageCacheIncrementalStrategyKeySizeLimit** to change the limit size for the incremental strategy.
* **getStorageCacheTtl** to change the TTL for the cache.

