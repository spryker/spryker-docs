---
title: Bypass the key-value storage
description: Learn how to bypass key-value storage in Spryker to enhance data publishing performance. Optimize backend data handling with this advanced guide.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/howto-replace-key-value-storage-with-database
originalArticleId: 76d0dff6-6837-4f27-a64b-d3eacf7134c7
redirect_from:
- /docs/scos/dev/tutorials-and-howtos/howtos/howto-replace-key-value-storage-with-database.html
---

One of the main ways of transferring data from Zed to Yves is the *Publish & Synchronization* mechanism. It works as follows:
- Storing the denormalized data that is saved in Zed and must be shared with Yves in specific infrastructural database tables.
- Synchronizing that data to fast key-value storage, like Redis, with the help of message queues.

Yves then reads the synchronized data directly from the storage. However, sometimes, you might need to exclude the second step and read data directly from the database. This document describes how to do that.

## Why to skip synchronization

Publish and Synchronize creates expected data duplication: the same data is stored both in the database and key-value storage. In high-load scenarios, like B2C, where there is usually a large number of customers, such data duplication is necessary to ensure performance when processing requests. In B2B, where there is normally a huge amount of data and a smaller number of customers, the duplication penalty is not justified.

## How the key-value bypass works

The regular Publish & Synchronization flow has two steps:

1. *Publish* the denormalized data to storage tables located in the database.
2. *Synchronize* the data to the key-value storage (Redis) with the help of dedicated queues.

In the following diagram, you can see a typical implementation of Publish & Synchronization, where the high-level `StorageExtension` module is configured to work on top of the `StorageRedis` module. The latter handles all low-level read/write operations on the Redis as storage.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/HowTo+-+Disable+Key-value+Storage+and+use+the+Database+Instead/p-and-s-diagram.png)
Key-Value Storage Bypass works by disabling the synchronization step and reading data directly from the database. This is done by using the newly created `StorageDatabase` module instead of `StorageRedis`.
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/HowTo+-+Disable+Key-value+Storage+and+use+the+Database+Instead/key-value+bypass.png)
This new module is responsible for interacting with the database in read-only mode and fetching the necessary data directly from storage tables. This makes the key-value storage unnecessary, allowing projects to avoid it. Any number of other vendor-specific modules can be created by providing implementations for interfaces from the `StorageExtension` module. The same is true for `StorageDatabase`, except that it interacts with the database.

{% info_block errorBox %}

There are two limitations of using the database as storage on Yves compared to the default storage engine. The following are scenarios when Yves actually writes data to storage:

- Caching of requests to storage: while using the database as storage, it's not possible to cache anything in Yves.
- Concurrent requests and caching for the Glue API.

{% endinfo_block %}

Out of the box, the `StorageDatabase` module can work with two RDBS vendors—MySQL or MariaDB and PostgreSQL. However, you can add support for any other database by providing the implementation for `Spryker\Client\StorageDatabaseExtension\Storage\Reader\StorageReaderInterface` as described in the following sections.

## Install the required modules

```bash
composer require spryker/storage:3.8.0 spryker/storage-database
```

## Configure the storage database

1. For the key-value storage bypass to work properly, add a set of new configuration values to the environment configuration of a project:

**config/Shared/config_default.php**

```php
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

The storage database is configured with the database credentials separately. Although most probably, those are the credentials for the Zed database.

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
     * - If true, then the alias_keys column is added to all the storage tables for which mappings are defined.
     * - The new column is populated with a JSON object containing mapping keys and their respective mapping data for each resource.
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

1. By changing `isSynchronizationEnabled` to false, you disable the synchronization for all modules (storage and search). To keep the search synchronization (essential for the search functionality), go through all installed `Search modules and modify the schema.xml` file, for example:

**spy_product_page_search.schema.xml**

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

2. If you are using the health check module functionality for publish and sync, create the following files:

**src/Pyz/Zed/PublishAndSynchronizeHealthCheckSearch/Persistence/Propel/Schema/spy_publish_and_synchronize_health_check_search.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\PublishAndSynchronizeHealthCheckSearch\Persistence" package="src.Orm.Zed.PublishAndSynchronizeHealthCheckSearch.Persistence">
    <table name="spy_publish_and_synchronize_health_check_search">
        <behavior name="synchronization">
            <parameter name="synchronization_enabled" value="true"/>
        </behavior>
    </table>
</database>
```

**src/Pyz/Zed/PublishAndSynchronizeHealthCheckStorage/Persistence/Propel/Schema/spy_publish_and_synchronize_health_check_storage.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\PublishAndSynchronizeHealthCheckStorage\Persistence" package="src.Orm.Zed.PublishAndSynchronizeHealthCheckStorage.Persistence">
    <table name="spy_publish_and_synchronize_health_check_storage">
        <behavior name="synchronization">
            <parameter name="synchronization_enabled" value="true"/>
        </behavior>
    </table>
</database>
```

{% endinfo_block %}

3. To apply all the changes to entities, install command and sync for storage data:

```bash
vendor/bin/console propel:install
vendor/bin/console event:trigger
```

4. Disable the storage caching. The cache does not work when reading the published data directly from the database. For this, modify the config on the project level:

**src/Pyz/Client/Storage/StorageConfig.php**

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

5. Disable cache and concurrent requests for Glue if you have it:

**src/Pyz/Glue/EntityTagsRestApi/EntityTagsRestApiConfig.php**

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

6. Configure resource to storage table mapping. Unlike Redis, in RDBMs, the data is stored across different tables. The correct storage table name for a resource is resolved from a resource key, by which the data is fetched.

For example, by default (with no mappings) the key `product_concrete:de_de:1` is translated into `spy_product_concrete_storage`. The default prefix is `spy`, the default suffix is `storage`, and the actual name of the table is taken from the resource key prefix—`product_concrete` in this case. You can adjust the process of resolving the table name if you need to do so. If, in the preceding example, the data for the key `product_concrete:de_de:1` needs to be fetched from the tabled named `pyz_product_foo`, configure the corresponding mapping instead:

**src/Pyz/Client/StorageDatabase/StorageDatabaseConfig.php**

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

The top-level key here, `product_concrete`, is the resource key prefix. Any table name fragment entries (prefix, name, suffix) can be omitted. In this case, a fragment is set to its default value according to the rules described above.

## Enable the storage database

Adjust the Storage module's dependency provider:

**src/Pyz/Client/Storage/StorageDependencyProvider.php**

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

## Select a storage engine

Out of the box, Spryker can interact with storage databases provided by two vendors: *PostgresSQL* and *MySQL*. To use PostgresSQL as the storage database engine, add the following dependency provider to the project:

**src/Pyz/Client/StorageDatabase/StorageDatabaseDependencyProvider.php**

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

## Optional: Remove storage queues initialization

Removing the initialization of storage queues improves the speed of message processing because workers don't spend time checking queues that are always empty.

The latest versions of Spryker define separate queues for each search and storage message processing group. Because synchronization behavior for storage was disabled, storage-related queues aren't needed.

To remove them, in `\Pyz\Client\RabbitMq\RabbitMqConfig::getSynchronizationQueueConfiguration`, remove all `_SYNC_STORAGE_QUEUE` constats except for `PublishAndSynchronizeHealthCheckStorageConfig::SYNC_STORAGE_PUBLISH_AND_SYNCHRONIZE_HEALTH_CHECK`. Examples of constants to remove:

**src/Pyz/Client/RabbitMq/RabbitMqConfig.php**

```php
<?php

namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    protected function getSynchronizationQueueConfiguration(): array
    {
        return [
            GlossaryStorageConfig::SYNC_STORAGE_TRANSLATION,
            UrlStorageConstants::URL_SYNC_STORAGE_QUEUE,
            AvailabilityStorageConstants::AVAILABILITY_SYNC_STORAGE_QUEUE,
            CustomerAccessStorageConstants::CUSTOMER_ACCESS_SYNC_STORAGE_QUEUE,
            CustomerStorageConfig::CUSTOMER_INVALIDATED_SYNC_STORAGE_QUEUE,
            CategoryStorageConstants::CATEGORY_SYNC_STORAGE_QUEUE,
            ProductStorageConstants::PRODUCT_SYNC_STORAGE_QUEUE,
            PriceProductStorageConstants::PRICE_SYNC_STORAGE_QUEUE,
            ProductPackagingUnitStorageConfig::PRODUCT_PACKAGING_UNIT_SYNC_STORAGE_QUEUE,
            ConfigurableBundleStorageConfig::CONFIGURABLE_BUNDLE_SYNC_STORAGE_QUEUE,
            CmsStorageConstants::CMS_SYNC_STORAGE_QUEUE,
            FileManagerStorageConstants::FILE_SYNC_STORAGE_QUEUE,
            ShoppingListStorageConfig::SHOPPING_LIST_SYNC_STORAGE_QUEUE,
            CompanyUserStorageConfig::COMPANY_USER_SYNC_STORAGE_QUEUE,
            ContentStorageConfig::CONTENT_SYNC_STORAGE_QUEUE,
            TaxProductStorageConfig::PRODUCT_ABSTRACT_TAX_SET_SYNC_STORAGE_QUEUE,
            TaxStorageConfig::TAX_SET_SYNC_STORAGE_QUEUE,
            MerchantStorageConfig::MERCHANT_SYNC_STORAGE_QUEUE,
            MerchantOpeningHoursStorageConfig::MERCHANT_OPENING_HOURS_SYNC_STORAGE_QUEUE,
            ProductOfferStorageConfig::PRODUCT_OFFER_SYNC_STORAGE_QUEUE,
            PriceProductOfferStorageConfig::PRICE_PRODUCT_OFFER_OFFER_SYNC_STORAGE_QUEUE,
            ProductOfferAvailabilityStorageConfig::PRODUCT_OFFER_AVAILABILITY_SYNC_STORAGE_QUEUE,
            ProductConfigurationStorageConfig::PRODUCT_CONFIGURATION_SYNC_STORAGE_QUEUE,
            StoreStorageConfig::STORE_SYNC_STORAGE_QUEUE,
            AssetStorageConfig::ASSET_SYNC_STORAGE_QUEUE,
            ServicePointStorageConfig::QUEUE_NAME_SYNC_STORAGE_SERVICE_POINT,
            ShipmentTypeStorageConfig::QUEUE_NAME_SYNC_STORAGE_SHIPMENT_TYPE,
            ProductOfferServicePointStorageConfig::QUEUE_NAME_SYNC_STORAGE_PRODUCT_OFFER_SERVICE,
            ProductOfferShipmentTypeStorageConfig::PRODUCT_OFFER_SHIPMENT_TYPE_SYNC_STORAGE_QUEUE,
        ];
    }
}
```
