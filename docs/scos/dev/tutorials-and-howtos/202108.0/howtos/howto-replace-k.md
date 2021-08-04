---
title: HowTo - Replace key-value storage with database
originalLink: https://documentation.spryker.com/2021080/docs/howto-replace-key-value-storage-with-database
redirect_from:
  - /2021080/docs/howto-replace-key-value-storage-with-database
  - /2021080/docs/en/howto-replace-key-value-storage-with-database
---

One of the main ways of transferring data from Zed to Yves is the Publish & Synchronization mechanism. It works by:
1. storing the denormalized data, that is saved in Zed and should be shared with Yves, in specific infrastructural database tables,
2. synchronizing that data to a fast key-value storage (e.g., Redis) with the help of message queues.

Yves then reads the synchronized data directly from the storage. However, sometimes, you might need to exclude the second step and read data directly from the database. This article describes how to do that.

## Why You May Need to Skip Synchronization
Publish and Synchronize creates expected data duplication: the same data is stored both in the database and in the key-value storage. In high-load scenarios, like B2C, where there is usually a large number of customers, such data duplication is necessary to ensure performance when processing requests. In B2B, where there is normally a huge amount of data and a smaller number of customers, the duplication penalty is not justified.

## How the Key-value Bypass Works
The regular Publish & Synchronization flow has two steps:

1. **Publish** the denormalized data to storage tables located in the database;
2. **Synchronize** the data to the key-value storage (Redis) with the help of dedicated queues.

In the diagram below, you can see a typical implementation of Publish & Synchronization, where the high-level *StorageExtension* module is configured to work on top of the *StorageRedis* module. The latter handles all low-level read/write operations on the Redis as storage.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/HowTo+-+Disable+Key-value+Storage+and+use+the+Database+Instead/p-and-s-diagram.png)
Key-Value Storage Bypass works by disabling the synchronization step and reading data directly from the database. This is done by using the newly created StorageDatabase module instead of *StorageRedis*.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/HowTo+-+Disable+Key-value+Storage+and+use+the+Database+Instead/key-value+bypass.png)
This new module is responsible for interacting with the database in read-only mode and fetching the necessary data directly from storage tables. This makes the key-value storage unnecessary, allowing projects to avoid it. Any number of other vendor-specific modules can be created by providing implementations for interfaces from the *StorageExtension* module. The same is true for StorageDatabase except that it interacts with the database.
{% info_block errorBox %}
There are two limitations of using the database as storage on Yves compared to the default storage engine. Scenarios, when Yves actually writes data to storage, are:<ul><li>Caching of requests to storage: while using the database as storage it is not possible to cache anything in Yves at the moment</li> <li> Concurrent requests and caching for the Glue API.</li></ul>
{% endinfo_block %}
Out of the box, the `StorageDatabase` module can work with two RDBS vendors - MySQL or MariaDB and PostgreSQL. But you can add support for any other database by providing the implementation for `Spryker\Client\StorageDatabaseExtension\Storage\Reader\StorageReaderInterface` as described below.

## Installation
Install the required modules by running
```Bash
composer require spryker/storage:3.8.0 spryker/storage-database 
```

## Configuring the Storage Database (DevOps)

1. For the key-value storage bypass to work properly, add a set of new configuration values to the environment configuration of a project:

config/Shared/config_default.php
  
```PHP
<?php
use Spryker\Shared\StorageDatabase\StorageDatabaseConfig;
use Spryker\Shared\StorageDatabase\StorageDatabaseConstants;
 
// ---------- Database storage
$config[StorageDatabaseConstants::DB_DEBUG] = false;
$config[StorageDatabaseConstants::DB_ENGINE] = StorageDatabaseConfig::DB_ENGINE_PGSQL;
$config[StorageDatabaseConstants::DB_HOST] = '127.0.0.1';
$config[StorageDatabaseConstants::DB_PORT] = 5432;
$config[StorageDatabaseConstants::DB_USERNAME] = 'development';
$config[StorageDatabaseConstants::DB_PASSWORD] = 'mate20mg';
$config[StorageDatabaseConstants::DB_DATABASE] = 'DE_development_zed';
```

The storage database is configured with the database credentials separately, although most probably those will be the credentials for the Zed database.

2. Modify the synchronization behavior config on the project level:

```php
namespace Pyz\Zed\SynchronizationBehavior;
 
use Spryker\Zed\SynchronizationBehavior\SynchronizationBehaviorConfig as SprykerSynchronizationBehaviorConfig;
 
class SynchronizationBehaviorConfig extends SprykerSynchronizationBehaviorConfig
{
    /**
     * Specification:
     * - Enables/disables synchronization for all the modules.
     * - This value can be overridden on a per-module basis.
     *
     * @api
     *
     * @return bool
     */
    public function isSynchronizationEnabled(): bool
    {
        return false;
    }
 
    /**
     * Specification:
     * - If true, then the alias_keys column is added to all the storage tables, for which mappings are defined.
     * - The new column is populated with JSON object, containing mapping keys and their respective mapping data for each resource.
     *
     * @api
     *
     * @return bool
     */
    public function isAliasKeysEnabled(): bool
    {
        return true;
    }
}
```
{% info_block infoBox %}
By changing `isSynchronizationEnabled` to false you disable the synchronization for all modules (storage and search
{% endinfo_block %}. To keep the search synchronization (essential for the search functionality), go through all installed `Search modules and modify the schema.xml` file, for example:)

spy_product_page_search.schema.xml

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\ProductPageSearch\Persistence"
          package="src.Orm.Zed.ProductPageSearch.Persistence">
 
    <table name="spy_product_abstract_page_search">
        <behavior name="synchronization">
            <parameter name="synchronization_enabled" value="true"/>
        </behavior>
    </table>
 
</database>
```

3. Run the propel install command and sync for storage data to apply all the changes to entities:

```bash
vendor/bin/console propel:install
vendor/bin/console event:trigger
```
4. Disable the storage caching. As mentioned above, at the moment the cache would not work when reading the published data directly from the database. For this you need to modify config on the project level:

src/Pyz/Client/Storage/StorageConfig.php

```php    
<?php
 
namespace Pyz\Client\Storage;
 
use Spryker\Client\Storage\StorageConfig as SprykerStorageConfig;
 
class StorageConfig extends SprykerStorageConfig
{
    /**
     * @return bool
     */
    public function isStorageCachingEnabled(): bool
    {
        return false;
    }
}    
```

5. Disable cache and concurrent requests for Glue (if you have it):

```php
<?php
  
namespace Pyz\Glue\EntityTagsRestApi;
  
use Spryker\Glue\CartsRestApi\CartsRestApiConfig;
use Spryker\Glue\EntityTagsRestApi\EntityTagsRestApiConfig as SprykerEntityTagsRestApiConfig;
  
class EntityTagsRestApiConfig extends SprykerEntityTagsRestApiConfig
{
    /**
     * @return string[]
     */
    public function getEntityTagRequiredResources(): array
    {
        return [];
    }
}
```

6. Configure resource to storage table mapping. Unlike Redis, in RDBMs the data is stored across different tables. The correct storage table name for a resource is resolved from a resource key, by which the data is fetched.

For example, by default (with no mappings) the key `product_concrete:de_de:1` would be translated into `spy_product_concrete_storage` - the default prefix is `spy`, the default suffix is `storage`, and the actual name of the table is taken from the resource key prefix - `product_concrete` in this case. You can adjust the process of resolving the table name, should you need to do so. Say, if in the example above the data for  key `product_concrete:de_de:1` needs to be fetched from the tabled named `pyz_product_foo` instead, you need to configure the corresponding mapping:

Pyz\Client\StorageDatabase\StorageDatabaseConfig

```php
<?php
 
namespace Pyz\Client\StorageDatabase;
 
use Spryker\Client\StorageDatabase\StorageConfig as SprykerStorageDatabaseConfig;
 
class StorageDatabaseConfig extends SprykerStorageDatabaseConfig
{
    public function getResourceNameToStorageTableMap(): array
    {
        return [
            'translation' => [
                \Spryker\Shared\StorageDatabase\StorageDatabaseConfig::KEY_STORAGE_TABLE_NAME => 'glossary',
            ],
            'product_search_config_extension' => [
                \Spryker\Shared\StorageDatabase\StorageDatabaseConfig::KEY_STORAGE_TABLE_PREFIX => 'spy',
                \Spryker\Shared\StorageDatabase\StorageDatabaseConfig::KEY_STORAGE_TABLE_NAME => 'product_search_config',
                \Spryker\Shared\StorageDatabase\StorageDatabaseConfig::KEY_STORAGE_TABLE_SUFFIX => 'storage',
            ],
        ];
    }
}
```

The top level key here, `product_concrete`, is the resource key prefix. Any of the table name fragment entries (prefix, name, suffix) can be omitted. In this case, a fragment will be set to its default value according to the rules described above.

## Enabling the Storage Database
Adjust the Storage module's dependency provider as shown below:

Pyz\Client\StorageDatabase\StorageDatabaseConfig

```php
<?php
 
namespace Pyz\Client\Storage;
 
use Spryker\Client\Storage\StorageDependencyProvider as SprykerStorageDependencyProvider;
use Spryker\Client\StorageDatabase\Plugin\StorageDatabasePlugin;
use Spryker\Client\StorageExtension\Dependency\Plugin\StoragePluginInterface;
 
class StorageDependencyProvider extends SprykerStorageDependencyProvider
{
    /**
     * @return \Spryker\Client\StorageExtension\Dependency\Plugin\StoragePluginInterface|null
     */
    protected function getStoragePlugin(): ?StoragePluginInterface
    {
        return new StorageDatabasePlugin();
    }
}
```

## Selecting a Storage Engine
As mentioned above, out of the box, Spryker can interact with storage databases provided by two vendors: **PostgresSQL** and **MySQL**. To use PostgresSQL as the storage database engine, add the following dependency provider to the project:

Pyz\Client\StorageDatabase\StorageDatabaseDependencyProvider

```php
<?php
 
namespace Pyz\Client\StorageDatabase;
 
use Spryker\Client\StorageDatabase\Plugin\PostgreSqlStorageReaderPlugin;
use Spryker\Client\StorageDatabase\StorageDatabaseDependencyProvider as SprykerStorageDatabaseDependencyProvider;
use Spryker\Client\StorageDatabaseExtension\Dependency\Plugin\StorageReaderPluginInterface;
 
/**
 * @method \Spryker\Client\StorageDatabase\StorageDatabaseConfig getConfig()
 */
class StorageDatabaseDependencyProvider extends SprykerStorageDatabaseDependencyProvider
{
    /**
     * @return \Spryker\Client\StorageDatabaseExtension\Dependency\Plugin\StorageReaderPluginInterface|null
     */
    protected function getStorageReaderProviderPlugin(): ?StorageReaderPluginInterface
    {
        return new PostgreSqlStorageReaderPlugin();
    }
}
```

{% info_block infoBox %}
To use MySQL or MariaDB, replace `Spryker\Client\StorageDatabase\Plugin\PostgreSqlStorageReaderProviderPlugin` with `Spryker\Client\StorageDatabase\Plugin\MySqlStorageReaderPlugin`.
{% endinfo_block %}
