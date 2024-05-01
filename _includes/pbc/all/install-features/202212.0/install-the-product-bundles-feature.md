

This integration guide expects the basic feature to be in place. It adds only the Product Bundle storage configuration.

## Prerequisites

Install the required features:


| NAME | VERSION | INSTALLATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Product | {{page.version}} |[Install the Product feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-feature.html)|

## 1) Install required modules using Composer

Run the following command to install the required modules:

```bash
composer require spryker-feature/product-bundles --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Ensure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ProductBundle | vendor/spryker/product-bundle |
| ProductBundleStorage |vendor/spryker/product-bundle-storage|

{% endinfo_block %}

## 2) Set up database schema and transfer objects

Set up database schema and transfer objects:

1. Adjust the schema definition for entity changes to trigger events:

| AFFECTED ENTITY | TRIGGERED EVENTS |
| --- | --- |
| spy_product_bundle | Entity.spy_product_bundle.create  <br> Entity.spy_product_bundle.update  <br> Entity.spy_product_bundle.delete |
| spy_product_bundle_storage |Entity.spy_product_bundle_storage.create  <br> Entity.spy_product_bundle_storage.update <br> Entity.spy_product_bundle_storage.delete |

**src/Pyz/Zed/ProductBundle/Persistence/Propel/Schema/spy_product_bundle.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          name="zed"
          xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\ProductBundle\Persistence"
          package="src.Orm.Zed.ProductBundle.Persistence">

    <table name="spy_product_bundle">
        <behavior name="event">
            <parameter name="spy_product_bundle_all" column="*"/>
        </behavior>
    </table>

</database>
```

**src/Pyz/Zed/ProductBundleStorage/Persistence/Propel/Schema/spy_product_bundle_storage.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          name="zed"
          xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\ProductBundleStorage\Persistence" package="src.Orm.Zed.ProductBundleStorage.Persistence">

    <table name="spy_product_bundle_storage">
        <behavior name="synchronization">
            <parameter name="queue_pool" value="synchronizationPool"/>
        </behavior>
    </table>

</database>
```

2. Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Ensure that the following changes have been applied in transfer objects:

 TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| ProductBundleStorageTransfer | class | created | src/Generated/Shared/Transfer/ProductBundleStorageTransfer |
| ProductForProductBundleStorageTransfer| class| created |src/Generated/Shared/Transfer/ProductForProductBundleStorageTransfer|
| SynchronizationDataTransfer |class |created |src/Generated/Shared/Transfer/SynchronizationDataTransfer|
| ProductBundleCriteriaFilterTransfer |class| created |src/Generated/Shared/Transfer/ProductBundleCriteriaFilterTransfer|
| ProductBundleStorageCriteriaTransfer |class| created |src/Generated/Shared/Transfer/ProductBundleStorageCriteriaTransfer|
| ProductBundleCollectionTransfer| class| created| src/Generated/Shared/Transfer/ProductBundleCollectionTransfer|
| ProductBundleTransfer| class |created |src/Generated/Shared/Transfer/ProductBundleTransfer|
| FilterTransfer| class |created |src/Generated/Shared/Transfer/FilterTransfer|
| ProductForBundleTransfer| class |created| src/Generated/Shared/Transfer/ProductForBundleTransfer|

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Ensure that the following changes have been applied by checking your database:

| DATABASE ENTITY | TYPE | EVENT |
| --- | --- | --- |
| spy_product_bundle_storage | table | created |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Ensure that propel entities have been generated successfully by checking their existence under `src/Orm/Zed/ProductBundleStorage`.

{% endinfo_block %}

3. Change the generated entity classes `SpyProductBundleStorage` and `SpyProductBundleStorageQuery` to extend from Spryker core classes as shown in the table below:

| CLASS PATH | EXTENDS |
| --- | --- |
| src/Orm/Zed/ProductBundleStorage/Persistence/Base/SpyProductBundleStorage.php | Spryker\Zed\ProductBundleStorage\Persistence\Propel\AbstractSpyProductBundleStorage |
| src/Orm/Zed/ProductBundleStorage/Persistence/Base/SpyProductBundleStorageQuery.php | Spryker\Zed\ProductBundleStorage\Persistence\Propel\AbstractSpyProductBundleStorageQuery |

{% info_block warningBox "Verification" %}

Ensure that the changes have been implemented successfully by triggering the following methods and checking that the respective events are triggered:

| PATH | METHOD NAME | EVENT |
| --- | --- | --- |
| src/Orm/Zed/ProductBundle/Persistence/Base/SpyProductBundle.php | prepareSaveEventName() <br> addSaveEventToMemory()<br>  addDeleteEventToMemory() | Entity.spy_product_bundle.create  <br> Entity.spy_product_bundle.update<br>    Entity.spy_product_bundle.delete |
| src/Orm/Zed/ProductBundleStorage/Persistence/Base/SpyProductBundleStorage.php |sendToQueue() |Entity.spy_product_bundle_storage.create <br>   Entity.spy_product_bundle_storage.update   <br> Entity.spy_product_bundle_storage.delete|

{% endinfo_block %}

## 3) Configure export to Redis and Elasticsearch

To configure export to Redis and Elasticsearch, follow the steps below:

### Set up event listeners

Set up tables to be published to the `spy_product_bundle_storage` on change (create, edit, delete) and synchronization of the data to Storage.

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductBundlePublishWritePublisherPlugin | Publishes product bundle data when the publish product bundle event is triggered. | None | Spryker\Zed\ProductBundleStorage\Communication\Plugin\Publisher\ProductBundle |
| ProductBundleWritePublisherPlugin |Publishes product bundle data when product bundle create, update and delete events fire. | None |Spryker\Zed\ProductBundleStorage\Communication\Plugin\Publisher\ProductBundle|
| ProductBundleWritePublisherPlugin | Publishes product bundle data when the relevant concrete products create, update and delete events fire. | None | Spryker\Zed\ProductBundleStorage\Communication\Plugin\Publisher\ProductConcrete |
| ProductBundleSynchronizationDataBulkRepositoryPlugin| Synchronizes product bundle data to the storage. | None | Spryker\Zed\ProductBundleStorage\Communication\Plugin\Synchronization |


**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\ProductBundleStorage\Communication\Plugin\Publisher\ProductBundle\ProductBundlePublishWritePublisherPlugin;
use Spryker\Zed\ProductBundleStorage\Communication\Plugin\Publisher\ProductBundle\ProductBundleWritePublisherPlugin;
use Spryker\Zed\ProductBundleStorage\Communication\Plugin\Publisher\ProductConcrete\ProductBundleWritePublisherPlugin as ProductConcreteProductBundleWritePublisherPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array
     */
    protected function getPublisherPlugins(): array
    {
        return [
            new ProductBundlePublishWritePublisherPlugin(),
            new ProductBundleWritePublisherPlugin(),
            new ProductConcreteProductBundleWritePublisherPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\ProductBundleStorage\Communication\Plugin\Synchronization\ProductBundleSynchronizationDataBulkRepositoryPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new ProductBundleSynchronizationDataBulkRepositoryPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Ensure that, when a product bundle is created, updated, or deleted, it is exported to or removed from Redis.

Storage type: Redis
Target entity: Product Bundle

Example expected data identifier: `kv:product_bundle:1`

Example expected data fragment:

```json
{
    "id_product_concrete_bundle": 1,
    "bundled_products": [
        {
            "id_product_concrete": 118,
            "sku": "099_27207215",
            "quantity": 2
        },
        {
            "id_product_concrete": 140,
            "sku": "114_29911081",
            "quantity": 1
        }
    ]
}
```

{% endinfo_block %}

## 4) Import product bundles data

To import product bundles:

1. Adjust the concrete product import process to trigger product bundle publishing:

**src/Pyz/Zed/DataImport/Business/Model/ProductConcrete/Writer/ProductConcretePropelDataSetWriter.php**

```php
<?php

namespace Pyz\Zed\DataImport\Business\Model\ProductConcrete\Writer;

use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface;
use Spryker\Zed\DataImport\Business\Model\DataSet\DataSetWriterInterface;
use Spryker\Zed\DataImport\Business\Model\Publisher\DataImporterPublisher;

class ProductConcretePropelDataSetWriter implements DataSetWriterInterface
{
    /**
     * @uses \Spryker\Shared\ProductBundleStorage\ProductBundleStorageConfig::PRODUCT_BUNDLE_PUBLISH
     */
    protected const PRODUCT_BUNDLE_PUBLISH = 'ProductBundle.product_bundle.publish.write';

    /**
     * @param \Spryker\Zed\DataImport\Business\Model\DataSet\DataSetInterface $dataSet
     * @param int $idProduct
     *
     * @return void
     */
    protected function createOrUpdateBundles(DataSetInterface $dataSet, int $idProduct): void
    {
        DataImporterPublisher::addEvent(static::PRODUCT_BUNDLE_PUBLISH, $idProduct);
    }
}
```

2. Import data:

```bash
console data:import product-concrete
```

{% info_block warningBox "Verification" %}

Ensure that, in the database, the configured data has been added to the `spy_product_bundle` table and the `product_bundle` publishing has been triggered.

{% endinfo_block %}