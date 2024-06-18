This document describes how to install the Shopping Lists feature.

## Install feature core

Follow the steps below to install feature core.

### Prerequisites

Install the required features:

| NAME                        | VERSION          | INTEGRATE GUIDE                                                                                                                                                         |
|-----------------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Company Account             | {{page.version}} | [Company account feature integration](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-company-account-feature.html)                              |
| Customer Account Management | {{page.version}} | [Customer Account Management](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-feature.html) |
| Spryker Core                | {{page.version}} | [Spryker Core feature integration](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                    |
| Cart                        | {{page.version}} | [Cart feature integration](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-cart-feature.html)                                                    |
| Prices                      | {{page.version}} | [Install the Prices feature](/docs/pbc/all/price-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-prices-feature.html)                      |
| Product                     | {{page.version}} | [Product feature integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-feature.html)                                              |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/shopping-lists:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE              | EXPECTED DIRECTORY                   |
|---------------------|--------------------------------------|
| ShoppingList        | vendor/spryker/shopping-list         |
| ShoppingListNote    | vendor/spryker/shopping-list-note    |
| ShoppingListSession | vendor/spryker/shopping-list-session |

{% endinfo_block %}

### 2) Set up the database schema and transfer objects

1. Adjust the schema definition so that entity changes can trigger events.

| AFFECTED ENTITY                         | TRIGGERED EVENTS                                                                                                                                                         |
|-----------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| spy_shopping_list                       | Entity.spy_shopping_list.create<br>Entity.spy_shopping_list.update<br>Entity.spy_shopping_list.delete                                                                    |
| spy_shopping_list_item                  | Entity.spy_shopping_list_item.create<br>Entity.spy_shopping_list_item.update<br>Entity.spy_shopping_list_item.delete                                                     |
| spy_shopping_list_company_user          | Entity.spy_shopping_list_company_user.create<br>Entity.spy_shopping_list_company_user.update<br>Entity.spy_shopping_list_company_user.delete                             |
| spy_shopping_list_company_business_unit | Entity.spy_shopping_list_company_business_unit.create`<br>Entity.spy_shopping_list_company_business_unit.update<br>Entity.spy_shopping_list_company_business_unit.delete |

**src/Pyz/Zed/ShoppingList/Persistence/Propel/Schema/spy_shopping_list.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          name="zed"
          xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\ShoppingList\Persistence"
          package="src.Orm.Zed.ShoppingList.Persistence">

    <table name="spy_shopping_list">
        <behavior name="event">
            <parameter name="spy_shopping_list_all" column="*"/>
        </behavior>
    </table>

    <table name="spy_shopping_list_item">
        <behavior name="event">
            <parameter name="spy_shopping_list_item_all" column="*"/>
        </behavior>
    </table>

    <table name="spy_shopping_list_company_user">
        <behavior name="event">
            <parameter name="spy_shopping_list_company_user_all" column="*"/>
        </behavior>
    </table>

    <table name="spy_shopping_list_company_business_unit">
        <behavior name="event">
            <parameter name="spy_shopping_list_company_business_unit_all" column="*"/>
        </behavior>
    </table>
</database>
```

**src/Pyz/Zed/ShoppingListStorage/Persistence/Propel/Schema/spy_shopping_list_customer_storage.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed"
          xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\ShoppingListStorage\Persistence"
          package="src.Orm.Zed.ShoppingListStorage.Persistence">

    <table name="spy_shopping_list_customer_storage">
        <behavior name="synchronization">
            <parameter name="queue_pool" value="synchronizationPool"/>
        </behavior>
    </table>
</database>
```

2. Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied when checking your database:

| DATABASE ENTITY                                   | TYPE  | EVENT   |
|---------------------------------------------------|-------|---------|
| spy_shopping_list                                 | table | created |
| spy_shopping_list_item                            | table | created |
| spy_shopping_list_company_user                    | table | created |
| spy_shopping_list_company_business_unit           | table | created |
| spy_shopping_list_company_business_unit_blacklist | table | created |
| spy_shopping_list_customer_storage                | table | created |
| spy_shopping_list_permission_group                | table | created |
| spy_shopping_list_permission_group_to_permission  | table | created |
| spy_shopping_list_item_note                       | table | created |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER                                         | TYPE  | EVENT   | PATH                                                                                   |
|--------------------------------------------------|-------|---------|----------------------------------------------------------------------------------------|
| ShoppingList                                     | class | created | src/Generated/Shared/Transfer/ShoppingListTransfer                                     |
| ShoppingListCollection                           | class | created | src/Generated/Shared/Transfer/ShoppingListCollectionTransfer                           |
| ShoppingListOverviewRequest                      | class | created | src/Generated/Shared/Transfer/ShoppingListOverviewRequestTransfer                      |
| ShoppingListOverviewResponse                     | class | created | src/Generated/Shared/Transfer/ShoppingListOverviewResponseTransfer                     |
| ShoppingListResponse                             | class | created | src/Generated/Shared/Transfer/ShoppingListResponseTransfer                             |
| ShoppingListCompanyUser                          | class | created | src/Generated/Shared/Transfer/ShoppingListCompanyUserTransfer                          |
| ShoppingListCompanyUserCollection                | class | created | src/Generated/Shared/Transfer/ShoppingListCompanyUserCollectionTransfer                |
| ShoppingListCompanyBusinessUnit                  | class | created | src/Generated/Shared/Transfer/ShoppingListCompanyBusinessUnitTransfer                  |
| ShoppingListCompanyBusinessUnitCollection        | class | created | src/Generated/Shared/Transfer/ShoppingListCompanyBusinessUnitCollectionTransfer        |
| ShoppingListCustomerStorage                      | class | created | src/Generated/Shared/Transfer/ShoppingListCustomerStorageTransfer                      |
| ShoppingListPermissionGroup                      | class | created | src/Generated/Shared/Transfer/ShoppingListPermissionGroupTransfer                      |
| ShoppingListPermissionGroupCollection            | class | created | src/Generated/Shared/Transfer/ShoppingListPermissionGroupCollectionTransfer            |
| ShoppingListAddToCartRequest                     | class | created | src/Generated/Shared/Transfer/ShoppingListAddToCartRequestTransfer                     |
| ShoppingListAddToCartRequestCollection           | class | created | src/Generated/Shared/Transfer/ShoppingListAddToCartRequestCollectionTransfer           |
| ShoppingListSession                              | class | created | src/Generated/Shared/Transfer/ShoppingListSessionTransfer                              |
| ShoppingListShareRequest                         | class | created | src/Generated/Shared/Transfer/ShoppingListShareRequestTransfer                         |
| ShoppingListShareResponse                        | class | created | src/Generated/Shared/Transfer/ShoppingListShareResponseTransfer                        |
| ShoppingListDismissRequest                       | class | created | src/Generated/Shared/Transfer/ShoppingListDismissRequestTransfer                       |
| ShoppingListCompanyBusinessUnitBlacklist         | class | created | src/Generated/Shared/Transfer/ShoppingListCompanyBusinessUnitBlacklistTransfer         |
| ShoppingListFromCartRequest                      | class | created | src/Generated/Shared/Transfer/ShoppingListFromCartRequestTransfer                      |
| ShoppingListItem                                 | class | created | src/Generated/Shared/Transfer/ShoppingListItemTransfer                                 |
| ShoppingListItemCollection                       | class | created | src/Generated/Shared/Transfer/ShoppingListItemCollectionTransfer                       |
| ShoppingListItemResponse                         | class | created | src/Generated/Shared/Transfer/ShoppingListItemResponseTransfer                         |
| ShoppingListPreAddItemCheckResponse              | class | created | src/Generated/Shared/Transfer/ShoppingListPreAddItemCheckResponseTransfer              |
| ItemCollection                                   | class | created | src/Generated/Shared/Transfer/ItemCollectionTransfer                                   |
| SpyShoppingListEntity                            | class | created | src/Generated/Shared/Transfer/SpyShoppingListEntityTransfer                            |
| SpyShoppingListCompanyUserEntity                 | class | created | src/Generated/Shared/Transfer/SpyShoppingListCompanyUserEntityTransfer                 |
| SpyShoppingListCompanyBusinessUnit               | class | created | src/Generated/Shared/Transfer/SpyShoppingListCompanyBusinessUnitTransfer               |
| SpyShoppingListCompanyBusinessUnitBlacklist      | class | created | src/Generated/Shared/Transfer/SpyShoppingListItemEntityTransfer                        |
| SpyShoppingListCustomerStorageEntity             | class | created | src/Generated/Shared/Transfer/SpyShoppingListCustomerStorageEntityTransfer             |
| SpyShoppingListPermissionGroupEntity             | class | created | src/Generated/Shared/Transfer/SpyShoppingListPermissionGroupEntityTransfer             |
| SpyShoppingListPermissionGroupToPermissionEntity | class | created | src/Generated/Shared/Transfer/SpyShoppingListPermissionGroupToPermissionEntityTransfer |
| SpyShoppingListItemEntity                        | class | created | src/Generated/Shared/Transfer/SpyShoppingListItemEntityTransfer                        |
| SpyShoppingListItemNoteEntity                    | class | created | src/Generated/Shared/Transfer/SpyShoppingListItemEntityTransfer                        |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Trigger the following methods and make sure the prior events have been triggered:

| PATH                                                                     | METHOD NAME                                                                  |
|--------------------------------------------------------------------------|------------------------------------------------------------------------------|
| src/Orm/Zed/ShoppingList/Persistence/Base/SpyShoppingList.php            | prepareSaveEventName()<br>addSaveEventToMemory()<br>addDeleteEventToMemory() |
| src/Orm/Zed/ShoppingList/Persistence/Base/SpyShoppingListItem.php        | prepareSaveEventName()<br>addSaveEventToMemory()<br>addDeleteEventToMemory() |
| src/Orm/Zed/ShoppingList/Persistence/Base/SpyShoppingListCompanyUser.php | prepareSaveEventName()<br>addSaveEventToMemory()<br>addDeleteEventToMemory() |
| src/Orm/Zed/ShoppingList/Persistence/Base/SpyShoppingList.php            | prepareSaveEventName()<br>addSaveEventToMemory()<br>addDeleteEventToMemory() |

{% endinfo_block %}

### 3) Add translations

1. Append the glossary:

**src/data/import/glossary.csv**

```yaml
customer.account.shopping_list.item.add.success,Item %sku% was added to the List.,en_US
customer.account.shopping_list.item.add.success,Artikel %sku% wurde zu der Liste hinzugefügt.,de_DE
customer.account.shopping_list.item.add.failed,Item %sku% could not be added to the List.,en_US
customer.account.shopping_list.item.add.failed,Artikel %sku% konnte der Liste nicht hinzugefügt werden.,de_DE
customer.account.shopping_list.create.success,"List '%name%' was created successfully.",en_US
customer.account.shopping_list.create.success,"Einkaufsliste '%name%' wurde erfolgreich erstellt.",de_DE
customer.account.shopping_list.error.cannot_update,Cannot update shopping list.,en_US
customer.account.shopping_list.error.cannot_update,Die Liste konnte nicht aktualisiert werden.,de_DE
customer.account.shopping_list.share.share_shopping_list_fail,This shopping list has been shared before with this entity,en_US
customer.account.shopping_list.share.share_shopping_list_fail,Diese Einkaufsliste wurde bereits mit dieser Entität geteilt,de_DE
customer.account.shopping_list.quick_add,"Quick add",en_US
customer.account.shopping_list.quick_add,"Schnell hinzufügen",de_DE
customer.account.shopping_list.quick_add.submit,Add,en_US
customer.account.shopping_list.quick_add.submit,Hinzufügen,de_DE
customer.account.shopping_list_item.error.product_not_active,Product is not active.,en_US
customer.account.shopping_list_item.error.product_not_active,Produkt ist nicht aktiv,de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}

### 4) Configure export to Redis

This step publishes tables on change (create, edit, delete) to the `spy_shopping_list_storage` and syncs the
data to Storage.

#### Set up event listeners

1. Register the following plugins:

| PLUGIN                             | SPECIFICATION                                                                                                                      | PREREQUISITES | NAMESPACE                                                             |
|------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------------------------------------------------------|
| ShoppingListStorageEventSubscriber | Registers the listeners that are responsible for publishing shopping list data based on changes to shopping lists and related entities. |       | Spryker\Zed\ShoppingListStorage\Communication\Plugin\Event\Subscriber |

**src/Pyz/Zed/Event/EventDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Event;

use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;
use Spryker\Zed\ShoppingListStorage\Communication\Plugin\Event\Subscriber\ShoppingListStorageEventSubscriber;

class EventDependencyProvider extends SprykerEventDependencyProvider
{
	public function getEventSubscriberCollection()
	{
		$eventSubscriberCollection = parent::getEventSubscriberCollection();
		$eventSubscriberCollection->add(new ShoppingListStorageEventSubscriber());

		return $eventSubscriberCollection;
	}
}
```

2. Register synchronization and synchronization error queues:

<details>
	<summary>src/Pyz/Client/RabbitMq/RabbitMqConfig.php</summary>

```php
<?php

namespace Pyz\Client\RabbitMq;

use ArrayObject;
use Generated\Shared\Transfer\RabbitMqOptionTransfer;
use Spryker\Client\RabbitMq\Model\Connection\Connection;
use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
use Spryker\Shared\ShoppingListStorage\ShoppingListStorageConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
	/**
	 * @return \ArrayObject
	 */
	protected function getQueueOptions()
	{
		$queueOptionCollection = new ArrayObject();
		$queueOptionCollection->append($this->createQueueOption(ShoppingListStorageConfig::SHOPPING_LIST_SYNC_STORAGE_QUEUE, ShoppingListStorageConfig::SHOPPING_LIST_SYNC_STORAGE_ERROR_QUEUE));

		return $queueOptionCollection;
	}

	/**
	 * @param string $queueName
	 * @param string $errorQueueName
	 * @param string $routingKey
	 *
	 * @return \Generated\Shared\Transfer\RabbitMqOptionTransfer
	 */
	protected function createQueueOption($queueName, $errorQueueName, $routingKey = 'error')
	{
		$queueOptionTransfer = new RabbitMqOptionTransfer();
		$queueOptionTransfer
			->setQueueName($queueName)
			->setDurable(true)
			->setType('direct')
			->setDeclarationType(Connection::RABBIT_MQ_EXCHANGE)
			->addBindingQueueItem($this->createQueueBinding($queueName))
			->addBindingQueueItem($this->createErrorQueueBinding($errorQueueName, $routingKey));

		return $queueOptionTransfer;
	}

	/**
	 * @param string $queueName
	 *
	 * @return \Generated\Shared\Transfer\RabbitMqOptionTransfer
	 */
	protected function createQueueBinding($queueName)
	{
		$queueOptionTransfer = new RabbitMqOptionTransfer();
		$queueOptionTransfer
			->setQueueName($queueName)
			->setDurable(true)
			->setNoWait(false)
			->addRoutingKey('');

		return $queueOptionTransfer;
	}

	/**
	 * @param string $errorQueueName
	 * @param string $routingKey
	 *
	 * @return \Generated\Shared\Transfer\RabbitMqOptionTransfer
	 */
	protected function createErrorQueueBinding($errorQueueName, $routingKey)
	{
		$queueOptionTransfer = new RabbitMqOptionTransfer();
		$queueOptionTransfer
			->setQueueName($errorQueueName)
			->setDurable(true)
			->setNoWait(false)
			->addRoutingKey($routingKey);

			return $queueOptionTransfer;
	}
}
```

</details>

#### Configure message processors

| PLUGIN                                            | SPECIFICATION                                                                                                    | PREREQUISITES | NAMESPACE                                              |
|---------------------------------------------------|------------------------------------------------------------------------------------------------------------------|---------------|--------------------------------------------------------|
| SynchronizationStorageQueueMessageProcessorPlugin | Configures all shopping list messages to sync with Redis storage and marks messages as failed in case of an error. |           | Spryker\Zed\Synchronization\Communication\Plugin\Queue |

**src/Pyz/Zed/Queue/QueueDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Queue;

use Spryker\Shared\ShoppingListStorage\ShoppingListStorageConfig;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;
use Spryker\Zed\Synchronization\Communication\Plugin\Queue\SynchronizationStorageQueueMessageProcessorPlugin;

class QueueDependencyProvider extends SprykerDependencyProvider
{
	/**
 	 * @param \Spryker\Zed\Kernel\Container $container
	 *
	 * @return \Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface[]
	 */
	protected function getProcessorMessagePlugins(Container $container)
	{
		return [
			ShoppingListStorageConfig::SHOPPING_LIST_SYNC_STORAGE_QUEUE => new SynchronizationStorageQueueMessageProcessorPlugin(),
		];
	}
}
```

#### Add synchronization plugins

| PLUGIN                                    | SPECIFICATION                                    | PREREQUISITES | NAMESPACE                                                            |
|-------------------------------------------|--------------------------------------------------|---------------|----------------------------------------------------------------------|
| ShoppingListSynchronizationDataBulkPlugin | Populating empty storage table with data. |           | Spryker\Zed\ShoppingListStorage\Communication\Plugin\Synchronization |

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\ShoppingListStorage\Communication\Plugin\Synchronization\ShoppingListSynchronizationDataBulkPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
	/**
	 * @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
	 */
	protected function getSynchronizationDataPlugins(): array
	{
		return [
			new ShoppingListSynchronizationDataBulkPlugin(),
		];
	}
}
```

{% info_block warningBox "Verification" %}

- Make sure `console sync:data --help` has `shopping_list_customer` as an available resource in the list.
- Make sure that, after at least one message is pushed through Spryker into any RabbitMQ queue, `sync.storage.shopping_list` and `sync.storage.shopping_list.error` queues are created.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure when shopping lists are exported or created, updated, deleted manually in the Back Office, they are exported
 or removed from Redis accordingly.

| STORAGE TYPE | TARGET ENTITY | EXAMPLE EXPECTED DATA IDENTIFIER |   
|--------------|---------------|----------------------------------|
| Redis        | Shopping List | `shopping_list_customer:de--1`   |

{% endinfo_block %}

Example expected data fragment:

```json
{
  "updated_at": 1565796408,
  "_timestamp": 1565796408.2470579
}
```

### 5) Import data

1. Add infrastructural data:

| PLUGIN                                 | SPECIFICATION                                                             | PREREQUISITES | NAMESPACE                                     |
|----------------------------------------|---------------------------------------------------------------------------|---------------|-----------------------------------------------|
| ShoppingListPermissionsInstallerPlugin | Installs infrastructural shopping list permissions and permission groups. |           | Spryker\Zed\ShoppingList\Communication\Plugin |

**src/Pyz/Zed/Installer/InstallerDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Installer;

use Spryker\Zed\Installer\InstallerDependencyProvider as SprykerInstallerDependencyProvider;
use Spryker\Zed\ShoppingList\Communication\Plugin\ShoppingListPermissionsInstallerPlugin;

class InstallerDependencyProvider extends SprykerInstallerDependencyProvider
{
	/**
	* @return \Spryker\Zed\Installer\Dependency\Plugin\InstallerPluginInterface[]
	*/
	public function getInstallerPlugins()
	{
		return [
			new ShoppingListPermissionsInstallerPlugin(),
		];
	}
}
```

2. Execute registered installer plugins and install infrastructural data:

```bash
console setup:init-db
```

{% info_block warningBox "Verification" %}

Make sure the following occurred in the database:
* Permission groups have been added to the `spy_shoppping_list_permission_group` table.
* Permissions have been added to the `spy_permission`
* The relations between them have been added to the `spy_shopping_list_permission_group_to_permission` table.

{% endinfo_block %}

#### Import shopping lists

1. Prepare your data according to your requirements using our demo data:

**vendor/spryker/shopping-list-data-import/data/import/shopping_list.csv**
```yaml
shopping_list_key,name,owner_customer_reference
Laptops,Laptops,DE--21
Cameras,Cameras,DE--21
Workstations,WorkstationsDE--21
```

| COLUMN                   | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION                                                              |
|--------------------------|----------|-----------|--------------|-------------------------------------------------------------------------------|
| shopping_list_key        | ✓        | string    | Laptops      | This identifier is used to refer to a shopping list in other imports. |
| name                     | ✓        | string    | Laptops      | Name of the shopping list.                                                    |
| owner_customer_reference | ✓        | string    | DE--21       | Customer reference of the shopping list owner.                                |

2. Register the following plugin to enable data import:

| PLUGIN                       | SPECIFICATION                                  | PREREQUISITES | NAMESPACE                                                          |
|------------------------------|------------------------------------------------|---------------|--------------------------------------------------------------------|
| ShoppingListDataImportPlugin | Imports demo shopping lists into the database. |           | Spryker\Zed\ShoppingListDataImport\Communication\Plugin\DataImport |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ShoppingListDataImport\Communication\Plugin\DataImport\ShoppingListDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
	protected function getDataImporterPlugins(): array
	{
		return [
			new ShoppingListDataImportPlugin(),
		];
	}
}
```

3. Import data:

```bash
console data:import shopping-list
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the `spy_shopping_list` table.

{% endinfo_block %}

#### Import shopping list items

1. Prepare your data according to your requirements using our demo data:

**vendor/spryker/shopping-list-data-import/data/import/shopping_list_item.csv**

```yaml
shopping_list_key,product_sku,quantity
Laptops,134_29759322,1
Laptops,136_24425591,1
Laptops,135_29836399,3
Laptops,138_30657838,1
Laptops,139_24699831,1
Laptops,141_29380410,1
Laptops,145_29885473,1
Laptops,152_27104941,1
Laptops,137_29283479,1
Laptops,142_30943081,1
Laptops,140_22766487,1
Cameras,013_25904584,1
Cameras,184_17365820,1
Cameras,035_17360369,1
Cameras,017_21748906,1
Cameras,185_25904533,1
Cameras,187_26306352,1
Cameras,015_25904009,5
Cameras,001_25904006,1
Cameras,198_19692589,5
Cameras,027_26976107,2
Cameras,186_25904506,1
Cameras,033_32125568,1
Workstations,115_27295368,1
Workstations,118_29804739,1
Workstations,124_31623088,1
Workstations,126_26280142,1
Workstations,119_29804808,1
Workstations,128_29955336,1
Workstations,127_20723326,1
Workstations,117_30585828,1
Workstations,129_30706500,1
```

| COLUMN            | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION                                                             |
|-------------------|----------|-----------|--------------|------------------------------------------------------------------------------|
| shopping_list_key | ✓        | string    | Laptops      | Identifier of a shopping list to add an item to.        |
| product_sku       | ✓        | string    | 187_26306352 | SKU of a concrete product to add as a shopping list item. |
| quantity          | ✓        | integer   | 3            | Number of products to add.             |

2. Register the following plugin to enable data import:

| PLUGIN                           | SPECIFICATION                                       | PREREQUISITES                                              | NAMESPACE                                                          |
|----------------------------------|-----------------------------------------------------|------------------------------------------------------------|--------------------------------------------------------------------|
| ShoppingListItemDataImportPlugin | Imports demo shopping list items into the database. | Assumes that the shopping list keys exist in the database. | Spryker\Zed\ShoppingListDataImport\Communication\Plugin\DataImport |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ShoppingListDataImport\Communication\Plugin\DataImport\ShoppingListItemDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
	protected function getDataImporterPlugins(): array
	{
		return [
			new ShoppingListItemDataImportPlugin(),
		];
	}
}
```

3. Import data:

```bash
console data:import shopping-list-item
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the `spy_shopping_list_item` table.

{% endinfo_block %}

#### Import shopping list company users

1. Prepare your data according to your requirements using our demo data:

**vendor/spryker/shopping-list-data-import/data/import/shopping_list_company_user.csv**

```yaml
shopping_list_key,company_user_key,permission_group_name
Laptops,Spryker--7,FULL_ACCESS
Cameras,Spryker--7,READ_ONLY
Workstations,Spryker--7,READ_ONLY
Laptops,Spryker--1,FULL_ACCESS
Workstations,Spryker--1,FULL_ACCESS
Workstations,Spryker--2,READ_ONLY
Workstations,Spryker--3,READ_ONLY
Workstations,Spryker--6,READ_ONLY
```

| COLUMN                | REQUIRED | DATA TYPE | DATA EXAMPLE | DATA EXPLANATION                                                               |
|-----------------------|----------|-----------|--------------|--------------------------------------------------------------------------------|
| shopping_list_key     | ✓        | string    | Laptops      | Defines a shopping list to assign to a company user.    |
| company_user_key      | ✓        | string    | Spryker--7   | Defines a company user to share a shopping list with. |
| permission_group_name | ✓        | integer   | READ_ONLY    | Defines a company user's permissions to access a shopping list.      |

2. Register the following plugin to enable data import:

| PLUGIN                                  | SPECIFICATION                                                | PREREQUISITES                                                                                            | NAMESPACE                                                          |
|-----------------------------------------|--------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| ShoppingListCompanyUserDataImportPlugin | Imports the demo data about shopping lists shared with company users. | Assumes that the shopping list keys, company user keys, and the permission groups exist in the database. | Spryker\Zed\ShoppingListDataImport\Communication\Plugin\DataImport |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ShoppingListDataImport\Communication\Plugin\DataImport\ShoppingListCompanyUserDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
	protected function getDataImporterPlugins(): array
	{
		return [
			new ShoppingListCompanyUserDataImportPlugin(),
		];
	}
}
```

3. Import data:

```bash
console data:import shopping-list-company-user
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the `spy_shopping_list_company_user` table.

{% endinfo_block %}

#### Import shopping list company business units

1. Prepare your data according to your requirements using our demo data:

**vendor/spryker/shopping-list-data-import/data/import/shopping_list_company_business_unit.csv**

```yaml
shopping_list_key,business_unit_key,permission_group_name
Laptops,spryker_systems_HR,FULL_ACCESS
Cameras,spryker_systems_Zurich,FULL_ACCESS
Workstations,spryker_systems_Berlin,READ_ONLY
```

| COLUMN                | REQUIRED | DATA TYPE | DATA EXAMPLE       | DATA EXPLANATION                                                                        |
|-----------------------|----------|-----------|--------------------|-----------------------------------------------------------------------------------------|
| shopping_list_key     | ✓        | string    | Laptops            | Defines a shopping list to assign to a business unit.                                |
| business_unit_key     | ✓        | string    | spryker_systems_HR | Defines a business unit to share a shopping list with. |
| permission_group_name | ✓        | integer   | FULL_ACCESS        | Defines a business unit's permissions to access a shopping list.             |

2. Register the following plugin to enable data import:

| PLUGIN                                          | SPECIFICATION                                                         | PREREQUISITES                                                                                                     | NAMESPACE                                                          |
|-------------------------------------------------|-----------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| ShoppingListCompanyBusinessUnitDataImportPlugin | Imports the demo data of shopping lists shared with company business units. | Assumes that the shopping list keys, company business unit keys, and the permission groups exist in the database. | Spryker\Zed\ShoppingListDataImport\Communication\Plugin\DataImport |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\ShoppingListDataImport\Communication\Plugin\DataImport\ShoppingListCompanyBusinessUnitDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
	protected function getDataImporterPlugins(): array
	{
		return [
			new ShoppingListCompanyBusinessUnitDataImportPlugin(),
		];
	}
}
```

3. Import data:

```bash
console data:import shopping-list-company-business-unit
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the `spy_shopping_list_company_busines_unit`
table.

{% endinfo_block %}

### 6) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                                            | SPECIFICATION                                                                                                                                                                                                                                                                                                                                                    | PREREQUISITES                                                                                                                                        | NAMESPACE                                                         |
|-------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|
| ReadShoppingListPermissionPlugin                                  | Provides the ability to read a set of shopping lists on the Client side using the `can()` twig function.                                                                                                                                                                                                                                                     |                                                                                                                                                  | Spryker\Client\ShoppingList\Plugin                                |
| WriteShoppingListPermissionPlugin                                 | Provides the ability to write to a set of shopping lists on the Client side using the `can()` twig function.                                                                                                                                                                                                                                                 |                                                                                                                                                  | Spryker\Client\ShoppingList\Plugin                                |
| ReadShoppingListPermissionPlugin                                  | Provides the ability to read a set of shopping lists on the Zed side using `PermissionAwareTrait`.                                                                                                                                                                                                                                                       |                                                                                                                                                  | Spryker\Zed\ShoppingList\Communication\Plugin                     |
| WriteShoppingListPermissionPlugin                                 | Provides the ability to write to a set of shopping lists on the Zed side using `PermissionAwareTrait`.                                                                                                                                                                                                                                                   |                                                                                                                                                  | Spryker\Zed\ShoppingList\Communication\Plugin                     |
| ShoppingListPermissionStoragePlugin                               | Retrieves a set of shopping lists permissions related to a company user.                |                                                                                                                                                  | Spryker\Zed\ShoppingList\Communication\Plugin                     |
| ShoppingListPermissionCustomerExpanderPlugin                      | Expands `CustomerTransfer::PERMISSIONS` data with a set of permissions that enable the customer to read or write to shopping lists.                  | Expects `CustomerTransfer` to contain `CompanyUserTransfer` with `idCompanyUser`.<br> Hint: `CompanyUser.CustomerTransferCompanyUserExpanderPlugin`. | Spryker\Zed\ShoppingList\Communication\Plugin                     |
| ShoppingListItemProductConcreteActiveAddItemPreCheckPlugin        | Checks if a concrete product within the shopping list item is active.                                 |                                   | Spryker\Zed\ShoppingList\Communication\Plugin                     |
| ShoppingListItemNoteToItemCartNoteMapperPlugin                    | Maps shopping list item notes to cart item notes when creating a cart out of a shopping list.                                   |                                                                                                                                                  | Spryker\Client\ShoppingListNote\Plugin                            |
| ItemCartNoteToShoppingListItemNoteMapperPlugin                    | Maps cart item notes to shopping list notes when creating a shopping list out of a cart.                                                                                                                                                                                                                                                                           |                                                                                                                                                  | Spryker\Zed\ShoppingListNote\Communication\Plugin                 |
| ShoppingListItemNoteBeforeDeletePlugin                            | Deletes a shopping list item note before deleting a shopping list item.                                                                                                                                                                                                                                                                                          |                                                                                                                                                  | Spryker\Zed\ShoppingListNote\Communication\Plugin                 |
| ShoppingListCollectionOutdatedPlugin                              | Used to determine if a shopping list collection needs to be updated according to the last update date.                                 |                                                                                                                                                  | Spryker\Zed\ShoppingListNote\Communication\Plugin                 |
| ShoppingListCompanyUserPreDeletePlugin                            | Removes company user relations from shared shopping lists.                                                                                                                                                                                                                                                                                                       |                                                                                                                                                  | Spryker\Zed\ShoppingList\Communication\Plugin\CompanyUser         |
| CompanyBusinessUnitPreDeletePlugin                                | Remove a company business unit from the shared shopping list.                                                                                                                                                                                                                                                                                                          |                                                                                                                                                  | Spryker\Zed\ShoppingList\Communication\Plugin\CompanyBusinessUnit |
| ShoppingListItemProductConcreteHasValidStoreAddItemPreCheckPlugin | Go to the product page and select a concrete product. Then open another tab and log into the Back Office. Find a concrete product selected on PDP by a concrete SKU. Uncheck the current store option on the product edit page. Press "Add to shopping list" on the PDP tab to check that the product store validation is enabled. An error message will appear. |                                                                                                                                                  | Spryker\Zed\ShoppingList\Communication\Plugin\ShoppingList        |
| ShoppingListItemCollectionNoteExpanderPlugin                      | Populates shopping list item notes.                                                                                                                                                                                                                                                                                                                              |                                                                                                                                                  | Spryker\Zed\ShoppingListNote\Communication\Plugin                 |
| ShoppingListItemNoteBulkPostSavePlugin                            | Creates, updates, or deletes note for a shopping list item.                                                                                                                                                                                                                                                                                                         |                                                                                                                                                  | Spryker\Zed\ShoppingListNote\Communication\Plugin                 |
| SanitizeCustomerShoppingListsImpersonationSessionFinisherPlugin   | Removes a customer shopping list collection from the  session.                                                                                                                                                                                                                                                                                                          |                                                                                                                                                  | Spryker\Client\ShoppingListSession\Plugin\Agent                   |

**src/Pyz/Client/Permission/PermissionDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Permission;

use Spryker\Client\Permission\PermissionDependencyProvider as SprykerPermissionDependencyProvider;
use Spryker\Client\ShoppingList\Plugin\ReadShoppingListPermissionPlugin;
use Spryker\Client\ShoppingList\Plugin\WriteShoppingListPermissionPlugin;

class PermissionDependencyProvider extends SprykerPermissionDependencyProvider
{
	/**
	* @return \Spryker\Shared\PermissionExtension\Dependency\Plugin\PermissionPluginInterface[]
	*/
	protected function getPermissionPlugins(): array
	{
		return [
			new ReadShoppingListPermissionPlugin(),
			new WriteShoppingListPermissionPlugin(),
		];
	}
}
```

**src/Pyz/Zed/Permission/PermissionDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Permission;

use Spryker\Zed\Permission\PermissionDependencyProvider as SprykerPermissionDependencyProvider;
use Spryker\Zed\ShoppingList\Communication\Plugin\ReadShoppingListPermissionPlugin;
use Spryker\Zed\ShoppingList\Communication\Plugin\ShoppingListPermissionStoragePlugin;
use Spryker\Zed\ShoppingList\Communication\Plugin\WriteShoppingListPermissionPlugin;

class PermissionDependencyProvider extends SprykerPermissionDependencyProvider
{
    /**
     * @return \Spryker\Zed\PermissionExtension\Dependency\Plugin\PermissionStoragePluginInterface[]
     */
    protected function getPermissionStoragePlugins(): array
    {
        return [
            new ShoppingListPermissionStoragePlugin(),
        ];
    }

/**
     * @return \Spryker\Shared\PermissionExtension\Dependency\Plugin\PermissionPluginInterface[]
     */
    protected function getPermissionPlugins()
    {
        return [
            new ReadShoppingListPermissionPlugin(),
            new WriteShoppingListPermissionPlugin(),
        ];
    }
}
```

<details>
<summary>src/Pyz/Zed/ShoppingList/ShoppingListDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\ShoppingList;

use Spryker\Zed\ShoppingList\Communication\Plugin\ShoppingListItemProductConcreteActiveAddItemPreCheckPlugin;
use Spryker\Zed\ShoppingList\Communication\Plugin\ShoppingList\ShoppingListItemProductConcreteHasValidStoreAddItemPreCheckPlugin;
use Spryker\Zed\ShoppingListNote\Communication\Plugin\ItemCartNoteToShoppingListItemNoteMapperPlugin;
use Spryker\Zed\ShoppingListNote\Communication\Plugin\ShoppingListItemCollectionNoteExpanderPlugin;
use Spryker\Zed\ShoppingListNote\Communication\Plugin\ShoppingListItemNoteBeforeDeletePlugin;
use Spryker\Zed\ShoppingListNote\Communication\Plugin\ShoppingListItemNoteBulkPostSavePlugin;
use Spryker\Zed\ShoppingList\ShoppingListDependencyProvider as SprykerShoppingListDependencyProvider;

class ShoppingListDependencyProvider extends SprykerShoppingListDependencyProvider
{
    /**
     * @return \Spryker\Shared\ShoppingListExtension\Dependency\Plugin\AddItemPreCheckPluginInterface[]
     */
    protected function getAddItemPreCheckPlugins(): array
    {
        return [
            new ShoppingListItemProductConcreteActiveAddItemPreCheckPlugin(),
            new ShoppingListItemProductConcreteHasValidStoreAddItemPreCheckPlugin(),
         ];
    }

    /**
     * @return array<\Spryker\Zed\ShoppingListExtension\Dependency\Plugin\ItemToShoppingListItemMapperPluginInterface>
     */
    protected function getItemToShoppingListItemMapperPlugins(): array
    {
        return [
            new ItemCartNoteToShoppingListItemNoteMapperPlugin(),
        ];
    }


    /**
     * @return array<\Spryker\Zed\ShoppingListExtension\Dependency\Plugin\ShoppingListItemBulkPostSavePluginInterface>
     */
    protected function getShoppingListItemBulkPostSavePlugins(): array
    {
        return [
            new ShoppingListItemNoteBulkPostSavePlugin(), #ShoppingListNoteFeature
        ];
    }


	 /**
     * @return array<\Spryker\Zed\ShoppingListExtension\Dependency\Plugin\ShoppingListItemCollectionExpanderPluginInterface>
     */
    protected function getItemCollectionExpanderPlugins(): array
    {
        return [
            new ShoppingListItemCollectionNoteExpanderPlugin(),
        ];
    }

   /**
	 * @return \Spryker\Zed\ShoppingListExtension\Dependency\Plugin\ShoppingListItemBeforeDeletePluginInterface[]
	 */
	protected function getBeforeDeleteShoppingListItemPlugins(): array
	{
		return [
			new ShoppingListItemNoteBeforeDeletePlugin(),
		];
	}
}
```

</details>

**src/Pyz/Client/ShoppingList/ShoppingListDependencyProvider.php**

```php
<?php

namespace Pyz\Client\ShoppingList;

use Spryker\Client\ShoppingList\ShoppingListDependencyProvider as SprykerShoppingListDependencyProvider;
use Spryker\Client\ShoppingListNote\Plugin\ShoppingListItemNoteToItemCartNoteMapperPlugin;


class ShoppingListDependencyProvider extends SprykerShoppingListDependencyProvider
{
	/**
	 * @return \Spryker\Client\ShoppingListExtension\Dependency\Plugin\ShoppingListItemToItemMapperPluginInterface[]
	 */
	protected function getShoppingListItemToItemMapperPlugins(): array
	{
		return [
			new ShoppingListItemNoteToItemCartNoteMapperPlugin(),
		];
	}
}
```

**src/Pyz/Client/ShoppingListSession/ShoppingListSessionDependencyProvider.php**

```php
<?php

namespace Pyz\Client\ShoppingListSession;

use Spryker\Client\ShoppingListSession\ShoppingListSessionDependencyProvider as SprykerShoppingListSessionDependencyProvider;
use Spryker\Client\ShoppingListStorage\Dependency\Plugin\ShoppingListSession\ShoppingListCollectionOutdatedPlugin;

class ShoppingListSessionDependencyProvider extends SprykerShoppingListSessionDependencyProvider
{
	/**
	 * @return \Spryker\Client\ShoppingListSessionExtension\Dependency\Plugin\ShoppingListCollectionOutdatedPluginInterface[]
	 */
	protected function getShoppingListCollectionOutdatedPlugins(): array
	{
		return [
			new ShoppingListCollectionOutdatedPlugin(),
		];
	}
}
```

**src/Pyz/Zed/CompanyUser/CompanyUserDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CompanyUser;

use Spryker\Zed\CompanyUser\CompanyUserDependencyProvider as SprykerCompanyUserDependencyProvider;
use Spryker\Zed\ShoppingList\Communication\Plugin\CompanyUser\ShoppingListCompanyUserPreDeletePlugin;

class CompanyUserDependencyProvider extends SprykerCompanyUserDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\CompanyUserExtension\Dependency\Plugin\CompanyUserPreDeletePluginInterface>
     */
    protected function getCompanyUserPreDeletePlugins(): array
    {
        return [
            new ShoppingListCompanyUserPreDeletePlugin(),
        ];
    }
}
```

**src/Pyz/Zed/CompanyBusinessUnit/CompanyBusinessUnitDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CompanyBusinessUnit;

use Spryker\Zed\CompanyBusinessUnit\CompanyBusinessUnitDependencyProvider as SprykerCompanyBusinessUnitDependencyProvider;
use Spryker\Zed\ShoppingList\Communication\Plugin\CompanyBusinessUnit\CompanyBusinessUnitPreDeletePlugin;

class CompanyBusinessUnitDependencyProvider extends SprykerCompanyBusinessUnitDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\CompanyBusinessUnitExtension\Dependency\Plugin\CompanyBusinessUnitPreDeletePluginInterface>
     */
    protected function getCompanyBusinessUnitPreDeletePlugins(): array
    {
        return [
            new CompanyBusinessUnitPreDeletePlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Customer/CustomerDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Customer;

use Spryker\Zed\Customer\CustomerDependencyProvider as SprykerCustomerDependencyProvider;
use Spryker\Zed\ShoppingList\Communication\Plugin\ShoppingListPermissionCustomerExpanderPlugin;

class CustomerDependencyProvider extends SprykerCustomerDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\Customer\Dependency\Plugin\CustomerTransferExpanderPluginInterface>
     */
    protected function getCustomerTransferExpanderPlugins(): array
    {
        return [
            new ShoppingListPermissionCustomerExpanderPlugin(),
        ];
    }

}
```

**src/Pyz/Client/Agent/AgentDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Agent;

use Spryker\Client\Agent\AgentDependencyProvider as SprykerAgentDependencyProvider;
use Spryker\Client\ShoppingListSession\Plugin\Agent\SanitizeCustomerShoppingListsImpersonationSessionFinisherPlugin;

class AgentDependencyProvider extends SprykerAgentDependencyProvider
{
    /**
     * @return array<\Spryker\Client\AgentExtension\Dependency\Plugin\ImpersonationSessionFinisherPluginInterface>
     */
    protected function getImpersonationSessionFinisherPlugins(): array
    {
        return [
            new SanitizeCustomerShoppingListsImpersonationSessionFinisherPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Share User A's shopping list with User B.
2. Change the shopping list from User A's profile.
 	Make sure User B can see the updates in this shopping list.

Also, make sure shared shopping lists have the permission group you've configured.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure the following applies:
* When saving a shopping list item, shopping list item notes are also saved.
* When deleting a shopping list item, shopping list item notes are also deleted.

Also, make sure that shopping list item notes are transferred to cart item notes when creating a cart from a shopping list.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that shopping list collection in session and in storage is always up to date. You can check this by changing
the `updated_at` value of the session shopping list collection to be older than the one in the shopping list customer storage.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

To verify that `ShoppingListItemProductConcreteActiveAddItemPreCheckPlugin` is set up correctly, make sure that
non-active products can't be added to the shopping list.

{% endinfo_block %}

## Install feature frontend

Take the following steps to install the feature frontend.

### Prerequisites

Install the following required features:

| NAME                        | VERSION          | INTEGRATE GUIDE                                                                                                                                                         |
|-----------------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core                | {{page.version}} | [Spryker Core feature integration](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                    |
| Company Account             | {{page.version}} | [Company account feature integration](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-company-account-feature.html)                              |
| Multiple Carts              | {{page.version}} | [Multiple Carts feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-multiple-carts-feature.html)                                                           |
| Product                     | {{page.version}} | [Product feature integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-feature.html)                                              |
| Customer Account Management | {{page.version}} | [Customer Account Management](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/customer-account-management-feature-overview/customer-account-management-feature-overview.html) |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/shopping-lists:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                 | EXPECTED DIRECTORY                            |
|------------------------|-----------------------------------------------|
| ShoppingListPage       | vendor/spryker-shop/shopping-list-page        |
| ShoppingListWidget     | vendor/spryker-shop/shopping-list-widget      |
| ShoppingListNoteWidget | vendor/spryker-shop/shopping-list-note-widget |

{% endinfo_block %}

### 2) Add translations

1. Append glossary according to your configuration:

<details open>
<summary markdown='span'>src/data/import/glossary.csv</summary>

```yaml
customer.account.shopping_list.overview.edit,Edit,en_US
customer.account.shopping_list.overview.edit,Bearbeiten,de_DE
shopping_list.item_note,Note:,en_US
shopping_list.item_note,Hinweis:,de_DE
shopping_list.item_note.add,"Add a note +",en_US
shopping_list.item_note.add,"Füg ein Notiz hinzu +",de_DE
customer.account.shopping_list.overview.share,Share,en_US
customer.account.shopping_list.overview.share,Teilen,de_DE
customer.account.shopping_list.overview.print,Print,en_US
customer.account.shopping_list.overview.print,Drucken,de_DE
customer.account.shopping_list.overview.delete,Delete,en_US
customer.account.shopping_list.overview.delete,Löschen,de_DE
customer.account.shopping_list.overview.owner,Owner,en_US
customer.account.shopping_list.overview.owner,Inhaber,de_DE
customer.account.shopping_list.access,Access,en_US
customer.account.shopping_list.access,Zugriff,de_DE
company.account.company_user,Users,en_US
company.account.company_user,Benutzer,de_DE
customer.account.shopping_list.delete.warning,Warning,en_US
customer.account.shopping_list.delete.warning,Warnung,de_DE
customer.account.shopping_list.delete.you_are_trying_to_delete_shopping_list,"You are trying to delete shopping list <a href=""%link%"">%name%</a>",en_US
customer.account.shopping_list.delete.you_are_trying_to_delete_shopping_list,"Sie versuchen die Einkaufsliste<a href=""%link%"">%name%</a> zu löschen",de_DE
customer.account.shopping_list.delete.it_belongs_to_follow,It belongs to following,en_US
customer.account.shopping_list.delete.it_belongs_to_follow,Es gehört zu folgenden,de_DE
company.account.business_unit,Business Units,en_US
company.account.business_unit,Geschäftseinheiten,de_DE
customer.account.shopping_list.delete.it_wll_be_deleted_from_all_of_them,It will be deleted from all of them,en_US
customer.account.shopping_list.delete.it_wll_be_deleted_from_all_of_them,Es wird von allen gelöscht,de_DE
customer.account.shopping_list.overview.name,Name,en_US
customer.account.shopping_list.overview.name,Name,de_DE
customer.account.shopping_list.overview.created_date,Date of creation,en_US
customer.account.shopping_list.overview.created_date,Erstelldatum,de_DE
customer.account.shopping_list.overview.item_count,Number of Items,en_US
customer.account.shopping_list.overview.item_count,Anzahl der Teile,de_DE
customer.account.shopping_list.overview.actions,Actions,en_US
customer.account.shopping_list.overview.actions,Aktion,de_DE
customer.account.shopping_list.overview.add_shopping_list_to_cart,Add selected to,en_US
customer.account.shopping_list.overview.add_shopping_list_to_cart,Hinzufügen zu,de_DE
customer.account.shopping_list.product,Product,en_US
customer.account.shopping_list.product,Produkt,de_DE
customer.account.shopping_list.price,Price,en_US
customer.account.shopping_list.price,Preis,de_DE
customer.account.shopping_list.quantity,Quantity,en_US
customer.account.shopping_list.quantity,Anzahl,de_DE
customer.account.shopping_list.availability,Availability,en_US
customer.account.shopping_list.availability,Verfügbarkeit,de_DE
product_alternative_widget.not_applicable,N/A,en_US
product_alternative_widget.not_applicable,N/A,de_DE
customer.account.shopping_list.available,Available,en_US
customer.account.shopping_list.available,Verfügbar,de_DE
customer.account.shopping_list.not_available,Currently not available,en_US
customer.account.shopping_list.not_available,Nicht verfügbar,de_DE
customer.account.shopping_list.remove,Remove,en_US
customer.account.shopping_list.remove,Löschen,de_DE
customer.account.shopping_list.permissions.FULL_ACCESS,Full access,en_US
customer.account.shopping_list.permissions.FULL_ACCESS,Voller Zugriff,de_DE
customer.account.shopping_list.permissions.READ_ONLY,Read only,en_US
customer.account.shopping_list.permissions.READ_ONLY,Schreibgeschützt,de_DE
customer.account.shopping_list.permissions.NO_ACCESS,No access,en_US
customer.account.shopping_list.permissions.NO_ACCESS,Kein Zugriff,de_DE
customer.account.shopping_list,Shopping lists,en_US
customer.account.shopping_list,Einkaufslisten,de_DE
customer.account,Customer Account,en_US
customer.account,Mein Konto,de_DE
customer.account.shopping_list.create_from_cart.title,Add to shopping list,en_US
customer.account.shopping_list.create_from_cart.title,Auf die Merkliste,de_DE
customer.account.shopping_list.shopping_cart,Shopping cart,en_US
customer.account.shopping_list.shopping_cart,Einkaufswagen,de_DE
customer.account.shopping_list.create_from_cart.form_title,'%cart_name%' add to shopping list,en_US
customer.account.shopping_list.create_from_cart.form_title,'%cart_name%' auf die Merkliste,de_DE
customer.account.shopping_list.share.from.share,Share,en_US
customer.account.shopping_list.share.from.share,Teilen,de_DE
customer.account.shopping_list.share.from.share_with,Share Shopping List with:,en_US
customer.account.shopping_list.share.from.share_with,Einkaufsliste teilen mit:,de_DE
customer.account.shopping_list.share.select_company_business_unit,Select business unit,en_US
customer.account.shopping_list.share.select_company_business_unit,Wählen Sie die Geschäftseinheit aus,de_DE
customer.account.shopping_list.share.select_company_user,Select user,en_US
customer.account.shopping_list.share.select_company_user,Benutzer wählen,de_DE
customer.account.print_shopping_list.title.shopping_list_id,Shopping List ID,en_US
customer.account.print_shopping_list.title.shopping_list_id,Einkaufslisten-ID,de_DE
customer.account.print_shopping_list.title.shopping_list_name,Shopping List Name,en_US
customer.account.print_shopping_list.title.shopping_list_name,Name der Einkaufsliste,de_DE
customer.account.print_shopping_list.table.barcode,Barcode,en_US
customer.account.print_shopping_list.table.barcode,Barcode,de_DE
customer.account.print_shopping_list.table.product_sku,Product SKU,en_US
customer.account.print_shopping_list.table.product_sku,Produkt Artikelnummer,de_DE
customer.account.print_shopping_list.table.product_name,Product name,en_US
customer.account.print_shopping_list.table.product_name,Produktname,de_DE
customer.account.print_shopping_list.table.default_price,Default price,en_US
customer.account.print_shopping_list.table.default_price,Standardpreis,de_DE
customer.account.print_shopping_list.table.note,Note,en_US
customer.account.print_shopping_list.table.note,Notiz,de_DE
customer.account.shopping_list.print_shopping_list,Print,en_US
customer.account.shopping_list.print_shopping_list,Drucken,de_DE
customer.account.shopping_list.add_selected_items_to_cart,Add selected items to cart,en_US
customer.account.shopping_list.add_selected_items_to_cart,Ausgewählte Artikel in den Warenkorb legen,de_DE
customer.account.shopping_list.add_all_available_to_cart,Add all available products to cart,en_US
customer.account.shopping_list.add_all_available_to_cart,Alle Produkte zum Warenkorb hinzufügen,de_DE
customer.account.shopping_list.empty,Currently there are no items in your shopping list.,en_US
customer.account.shopping_list.empty,Zurzeit ist kein Produkt auf deiner Einkaufsliste.,de_DE
customer.account.shopping_list.overview.dismiss,Dismiss,en_US
customer.account.shopping_list.overview.dismiss,Ablehnen,de_DE
customer.account.shopping_list.overview.warning,Warning,en_US
customer.account.shopping_list.overview.warning,Warnung,de_DE
shopping_list_page.dismiss_confirmation.trying_to_dismiss,"Are you sure that you what to dismiss shopping list?",en_US
shopping_list_page.dismiss_confirmation.trying_to_dismiss,"Sind Sie sicher, dass Sie den Einkaufsliste ablehnen wollen?",de_DE
shopping_list_page.dismiss.failed,Shopping list was not dismissed.,en_US
shopping_list_page.dismiss.failed,Einkaufsliste wurde nicht abgelehnt,de_DE
shopping_list_page.dismiss.success,Shopping list was dismissed successfully.,en_US
shopping_list_page.dismiss.success,"Einkaufsliste wurde erfolgreich abgelehnt.",de_DE
general.cancel.button,Cancel,en_US
general.cancel.button,Abbrechen,de_DE
customer.account.shopping_list.overview.add_new,Add new shopping list,en_US
customer.account.shopping_list.overview.add_new,Neue Einkaufsliste hinzufügen,de_DE
forms.submit-btn,Submit,en_US
forms.submit-btn,Speichern,de_DE
general.back.button,Back,en_US
general.back.button,Zurück,de_DE
shopping_list.cart.items_add.success,Items were added to the List,en_US
shopping_list.cart.items_add.success,Artikel wurden zu der Liste hinzugefügt,de_DE
shopping_list.cart.items_add.failed,Items could not be added to the List,en_US
shopping_list.cart.items_add.failed,Artikel konnten der Liste nicht hinzugefügt werden,de_DE
customer.account.shopping_list.item.remove.success,Product removed successfully.,en_US
customer.account.shopping_list.item.remove.success,Produkt erfolgreich entfernt.,de_DE
customer.account.shopping_list.item.remove.failed,Product was not removed from shopping list.,en_US
customer.account.shopping_list.item.remove.failed,Artikel wurde nicht von der Einkaufsliste entfernt,de_DE
customer.account.shopping_list.item.added_to_cart.failed,Item was not added to cart.,en_US
customer.account.shopping_list.item.added_to_cart.failed,Produkt konnte nicht in den Warenkorb gelegt werden.,de_DE
customer.account.shopping_list.item.added_to_cart,Item added to cart successfully.,en_US
customer.account.shopping_list.item.added_to_cart,Produkt erfolgreich in den Warenkorb gelegt.,de_DE
customer.account.shopping_list.item.added_all_available_to_cart.failed,Not all items are added to cart successfully,en_US
customer.account.shopping_list.item.added_all_available_to_cart.failed,Nicht alle Artikel konnten erfolgreich in den Warenkorb gelegt werden.,de_DE
customer.account.shopping_list.item.added_all_available_to_cart,Available items added to cart successfully.,en_US
customer.account.shopping_list.item.added_all_available_to_cart,Verfügbare Produkte wurden erfolgreich in den Warenkorb gelegt.,de_DE
customer.account.shopping_list.item.select_item,At least one product should be selected.,en_US
customer.account.shopping_list.item.select_item,Mindestens ein Produkt sollte ausgewählt werden.,de_DE
customer.account.shopping_list.delete.success,Shopping list deleted successfully.,en_US
customer.account.shopping_list.delete.success,Einkaufsliste erfolgreich gelöscht.,de_DE
customer.account.shopping_list.delete.failed,Shopping list was not deleted.,en_US
customer.account.shopping_list.delete.failed,Einkaufsliste konnte nicht gelöscht.,de_DE
shopping_list_page.dismiss.failed,Shopping list was not dismissed.,en_US
shopping_list_page.dismiss.failed,Einkaufsliste wurde nicht abgelehnt,de_DE
shopping_list_page.dismiss.success,Shopping list was dismissed successfully.,en_US
shopping_list_page.dismiss.success,"Einkaufsliste wurde erfolgreich abgelehnt.",de_DE
customer.account.shopping_list.updated,Shopping list updated successfully,en_US
customer.account.shopping_list.updated,Einkaufsliste erfolgreich aktualisiert.,de_DE
customer.account.shopping_list.items.added_to_cart.not_found,There are no products available for adding to cart.,en_US
customer.account.shopping_list.items.added_to_cart.not_found,Es sind keine Produkte zum Hinzufügen in den Warenkorb verfügbar.,de_DE
customer.account.shopping_list.items.added_to_cart.failed,Items were not added to cart.,en_US
customer.account.shopping_list.items.added_to_cart.failed,Produkte konnten nicht in den Warenkorb gelegt werden.,de_DE
customer.account.shopping_list.items.added_to_cart,Items added to cart successfully.,en_US
customer.account.shopping_list.items.added_to_cart,Produkte erfolgreich in den Warenkorb gelegen.,de_DE
customer.account.shopping_list.share.share_shopping_list_successful,Sharing shopping list was successful,en_US
customer.account.shopping_list.share.share_shopping_list_successful,Einkaufsliste wurde erfolgreich geteilt,de_DE
customer.account.shopping_list.clear.success,Shopping list was successfully cleared.,en_US
customer.account.shopping_list.clear.success,Einkaufsliste wurde erfolgreich gelöscht.,de_DE
customer.account.shopping_list.share.error.one_id_required,Please choose either customer or business unit to share the shopping list with,en_US
customer.account.shopping_list.share.error.one_id_required,"Bitte wählen Sie entweder einen Kunden oder eine Geschäftseinheit aus, mit welchem Sie die Einkaufsliste teilen möchten.",de_DE
cart.add-to-shopping-list.form.add_new,Add new shopping list,en_US
cart.add-to-shopping-list.form.add_new,Einkaufsliste erstellen,de_DE
cart.add-to-shopping-list.form.placeholder,Enter name of a new shopping list,en_US
cart.add-to-shopping-list.form.placeholder,Geben Sie den Namen einer neuen Einkaufsliste ein,de_DE
cart.add-to-shopping-list.form.error.empty_name,"Please, enter shopping list name",en_US
cart.add-to-shopping-list.form.error.empty_name,Bitte geben Sie den Namen der Einkaufsliste ein,de_DE
customer.account.shopping_list.create_from_cart.choose_shopping_list,Choose shopping list,en_US
customer.account.shopping_list.create_from_cart.choose_shopping_list,Wählen Sie die Einkaufsliste,de_DE
customer.account.shopping_list.create_from_cart.name,Name,en_US
customer.account.shopping_list.create_from_cart.name,Name,de_DE
customer.account.shopping_list.item.not_added,Failed to add product to shopping list.,en_US
customer.account.shopping_list.item.not_added,Hinzufügen zur Einkaufsliste fehlgeschlagen.,de_DE
widget.shopping_list.multi_cart.to_shopping_list,To shopping list,en_US
widget.shopping_list.multi_cart.to_shopping_list,Zur Einkaufsliste,de_DE
shopping_list_widget.items,Items,en_US
shopping_list_widget.items,Artikel,de_DE
shopping_list_widget.full_access,Full access,en_US
shopping_list_widget.full_access,Ohne Einschränkung,de_DE
shopping_list_widget.read_only,Read only,en_US
shopping_list_widget.read_only,Schreibgeschützt,de_DE
widget.shopping_list.multi_cart.to_shopping_list,To shopping list,en_US
widget.shopping_list.multi_cart.to_shopping_list,Zur Einkaufsliste,de_DE
shopping_list.item_quantity,Anzahl,de_DE
shopping_list.item_quantity,Quantity,en_US
page.detail.add-to-shopping-list,Add to Shopping list,en_US
page.detail.add-to-shopping-list,In die Einkaufsliste,de_DE
shopping_list.shopping_list,Shopping list,en_US
shopping_list.shopping_list,Einkaufsliste,de_DE
shopping_list.no_lists_created,You do not have any shopping lists yet.,en_US
shopping_list.no_lists_created,Du hast noch keine Einkaufslisten.,de_DE
shopping_list.create_new_list,Create new list,en_US
shopping_list.create_new_list,Erstelle eine neue Liste,de_DE
product_quick_add_widget.form.quantity,"# Qty",en_US
product_quick_add_widget.form.quantity,"# Anzahl",de_DE
product_quick_add_widget.form.error.quantity.required,"Quantity must be at least 1",en_US
product_quick_add_widget.form.error.quantity.required,"Die Anzahl muss mindestens 1 sein",de_DE
product_quick_add_widget.form.error.quantity.max_value_constraint,"Provided quantity is too high",en_US
product_quick_add_widget.form.error.quantity.max_value_constraint,"Die Menge ist leider zu groß",de_DE
product_quick_add_widget.form.error.redirect_route_empty,"Redirect router should not be empty",en_US
product_quick_add_widget.form.error.redirect_route_empty,"Redirect Router kann nicht leer sein",de_DE
product_quick_add_widget.form.error.sku.empty,"SKU should not be empty",en_US
product_quick_add_widget.form.error.sku.empty,"SKU kann nicht leer sein",de_DE
```

</details>

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}

### 3) Set up router plugins

| PLUGIN                                | SPECIFICATION                                                | PREREQUISITES | NAMESPACE                                                                                |
|---------------------------------------|--------------------------------------------------------------|---------------|------------------------------------------------------------------------------------------|
| ShoppingListPageRouteProviderPlugin   | Adds the shopping list routes to the Yves application.        |           | \SprykerShop\Yves\ShoppingListPage\Plugin\Router                                         |
| ShoppingListWidgetRouteProviderPlugin | Adds the shopping list widget routes to the Yves application. |           | \SprykerShop\Yves\ShoppingListWidget\Plugin\Router\ShoppingListWidgetRouteProviderPlugin |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use SprykerShop\Yves\ShoppingListPage\Plugin\Router\ShoppingListPageRouteProviderPlugin;
use SprykerShop\Yves\ShoppingListWidget\Plugin\Router\ShoppingListWidgetRouteProviderPlugin;
use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return array<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        return [
            new ShoppingListPageRouteProviderPlugin(),
            new ShoppingListWidgetRouteProviderPlugin(),
        ];
    }
}
```

### 4) Set up quick order plugin

| PLUGIN                                          | SPECIFICATION                                            | PREREQUISITES | NAMESPACE                                                  |
|-------------------------------------------------|----------------------------------------------------------|---------------|------------------------------------------------------------|
| ShoppingListQuickOrderFormHandlerStrategyPlugin | Adds products to shopping lists using the quick order feature. |           | \SprykerShop\Yves\ShoppingListWidget\Plugin\QuickOrderPage |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\QuickOrderPage;

use SprykerShop\Yves\QuickOrderPage\QuickOrderPageDependencyProvider as SprykerQuickOrderPageDependencyProvider;
use SprykerShop\Yves\ShoppingListWidget\Plugin\QuickOrderPage\ShoppingListQuickOrderFormHandlerStrategyPlugin;

class QuickOrderPageDependencyProvider extends SprykerQuickOrderPageDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\QuickOrderPageExtension\Dependency\Plugin\QuickOrderFormHandlerStrategyPluginInterface>
     */
    protected function getQuickOrderFormHandlerStrategyPlugins(): array
    {
        return [
            new ShoppingListQuickOrderFormHandlerStrategyPlugin(), #ShoppingListFeature
        ];
    }

}
```

### 5) Set up the shopping list note form plugin

| PLUGIN                                 | SPECIFICATION                                                                   | PREREQUISITES | NAMESPACE                                                       |
|----------------------------------------|---------------------------------------------------------------------------------|---------------|-----------------------------------------------------------------|
| ShoppingListItemNoteFormExpanderPlugin | Adds the `ShoppingListItemNote` form fields to builder using `ShoppingListItemNoteForm`. |           | SprykerShop\Yves\ShoppingListNoteWidget\Plugin\ShoppingListPage |

**Yves/ShoppingListPage/ShoppingListPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShoppingListPage;

use SprykerShop\Yves\ShoppingListPage\ShoppingListPageDependencyProvider as SprykerShoppingListPageDependencyProvider;
use SprykerShop\Yves\ShoppingListNoteWidget\Plugin\ShoppingListPage\ShoppingListItemNoteFormExpanderPlugin;

class ShoppingListPageDependencyProvider extends SprykerShoppingListPageDependencyProvider
{

    /**
     * @return array<\SprykerShop\Yves\ShoppingListPageExtension\Dependency\Plugin\ShoppingListItemFormExpanderPluginInterface>
     */
    protected function getShoppingListItemFormExpanderPlugins(): array
    {
        return [
            new ShoppingListItemNoteFormExpanderPlugin()
        ];
    }

}
```

### 6) Set up widgets

1. Enable global widgets:

| WIDGET                           | DESCRIPTION                                                                                                       | NAMESPACE                                      |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------|------------------------------------------------|
| ShoppingListNavigationMenuWidget | Shows a top navigation submenu containing all of the current logged-in customer shopping lists.                  | SprykerShop\Yves\ShoppingListWidget\Widget     |
| ShoppingListMenuItemWidget       | Shows customer shopping lists in the customer account navigation side menu.                                       | SprykerShop\Yves\ShoppingListWidget\Widget     |
| AddToShoppingListWidget          | Enables customers to add a product with an SKU to one of the shopping lists they have write access to. | SprykerShop\Yves\ShoppingListWidget\Widget     |
| ShoppingListItemNoteWidget       | Enables customers to create, save, and remove notes from shopping list items.                                       | SprykerShop\Yves\ShoppingListNoteWidget\Widget |
| ShoppingListDismissWidget        | Enables customers to dismiss a shopping list that was shared.                                                   | SprykerShop\Yves\ShoppingListPage\Widget       |
| ShoppingListSubtotalWidget       | Enables customers to see the shopping list subtotal price.                                                        | SprykerShop\Yves\ShoppingListWidget\Widget     |
| CreateShoppingListFromCartWidget | Enables customers to move products from cart to a shopping list.                                         | SprykerShop\Yves\ShoppingListWidget\Widget     |
| AddItemsToShoppingListWidget     | Displays available shopping lists.                                                                                | SprykerShop\Yves\ShoppingListWidget\Widget     |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
use SprykerShop\Yves\ShoppingListNoteWidget\Widget\ShoppingListItemNoteWidget;
use SprykerShop\Yves\ShoppingListPage\Widget\ShoppingListDismissWidget;
use SprykerShop\Yves\ShoppingListWidget\Widget\AddToShoppingListWidget;
use SprykerShop\Yves\ShoppingListWidget\Widget\ShoppingListMenuItemWidget;
use SprykerShop\Yves\ShoppingListWidget\Widget\ShoppingListNavigationMenuWidget;
use SprykerShop\Yves\ShoppingListWidget\Widget\ShoppingListSubtotalWidget;
use SprykerShop\Yves\ShoppingListWidget\Widget\CreateShoppingListFromCartWidget;
use SprykerShop\Yves\ShoppingListWidget\Widget\AddItemsToShoppingListWidget;


class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
	/**
	* @return string[]
	*/
	protected function getGlobalWidgets(): array
	{
		return [
			AddToShoppingListWidget::class,
			ShoppingListItemNoteWidget::class,
			ShoppingListMenuItemWidget::class,
			ShoppingListNavigationMenuWidget::class,
			ShoppingListDismissWidget::class,
			ShoppingListSubtotalWidget::class,
			CreateShoppingListFromCartWidget::class
			AddItemsToShoppingListWidget::class
		];
	}
}
```

{% info_block warningBox "" %}

`ShoppingListWidget` uses Javascript for some functionality:

| FUNCTIONALITY                                                                                | PATH                                                                                                                                                                         |
|----------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Injects the item quantity from the item quantity drop-down into the Shopping List Save Form. | vendor/spryker/spryker-shop/Bundles/shopping-list-widget/src/SprykerShop/Yves/ShoppingListWidget/Theme/default/components/molecules/form-data-injector/form-data-injector.ts |

{% endinfo_block %}

2. Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Make sure the following widgets have been registered:

| MODULE                           | VERIFICATION                                                                                                                                                        |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| AddToShoppingListWidget          | Go to the product details page and add a product to a shopping list.                                                                                       |
| ShoppingListItemNoteWidget       | Go to a shopping list and save a note to the item.                                                                                                        |
| ShoppingListMenuItemWidget       | Log in with a customer who's part of a company account that has a shopping list. The Shopping List Widget should be displayed in the top navigation bar.             |
| ShoppingListNavigationMenuWidget | Log in with a customer who's part of a company account and go to the **My Account** page. The Shopping List side navigation should be displayed on the left side.      |
| ShoppingListDismissWidget        | Share a shopping list with a customer. Log in as the customer you've shared the list with. Go to the Shopping List Page with and make sure that the action block contains the **Dismiss** button.                               |
| ShoppingListSubtotalWidget       | Log in as a company user. Create a Shopping List and add any product to it. Subtotal price should be displayed on *View Shopping List* and *Edit Shopping List* pages.              |
| CreateShoppingListFromCartWidget | On the cart page in the **Save cart to a shopping list** form, write the name of a shopping list and click **Add to shopping list**. |
| AddItemsToShoppingListWidget     | The list of the available shopping lists should be displayed to the company user. |

{% endinfo_block %}
