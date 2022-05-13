---
title: Shopping Lists feature integration
description: This guide walks you through the process of installing the Shopping lists feature into your project.
last_updated: Jan 28, 2020
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v1/docs/shopping-lists-feature-integration-201811
originalArticleId: d8898b5e-8b5e-42ac-b44e-b644f3878d42
redirect_from:
  - /v1/docs/shopping-lists-feature-integration-201811
  - /v1/docs/en/shopping-lists-feature-integration-201811
---

## Install Feature Core
### Prerequisites
To start Shopping Lists feature integration, review and install the necessary features:

| Name |Version  |
| --- | --- |
| Company Account	 | 2018.11.0 |
| Customer Account Management	 | 2018.11.0 |
|Spryker Core	  | 2018.11.0 |
|  Cart| 2018.11.0 |
|  Prices|  2018.11.0|
|  Product  |2018.11.0|

### 1) Install Require Modules using Composer

Run the following command to install the required modules:

```yaml
composer require spryker-feature/shopping-lists:"^2018.11.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Make sure that the following modules were installed:<table><thead><tr><td>Module</td><td>Expected Directory</td></tr></thead><tbody><tr><td>`ShoppingList`</td><td>`vendor/spryker/shopping-list`</td></tr><tr><td>`ShoppingListNote`</td><td>`vendor/spryker/shopping-list-note`</td></tr><tr><td>`ShoppingListSession`</td><td>`vendor/spryker/shopping-list-session`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Set up the Database Schema

Adjust the schema definition so that entity changes will trigger events.

| Affected Entity |Triggered Events  |
| --- | --- |
|  `spy_shopping_list`| `Entity.spy_shopping_list.create`<br>`Entity.spy_shopping_list.update`<br>`Entity.spy_shopping_list.delete` |
| `spy_shopping_list_item` | `Entity.spy_shopping_list_item.create`<br>`Entity.spy_shopping_list_item.update`<br>`Entity.spy_shopping_list_item.delete` |
| `spy_shopping_list_company_user` | `Entity.spy_shopping_list_company_user.create`<br>`Entity.spy_shopping_list_company_user.update`<br>`Entity.spy_shopping_list_company_user.delete` |
|`spy_shopping_list_company_business_unit `|`Entity.spy_shopping_list_company_business_unit.create`<br>`Entity.spy_shopping_list_company_business_unit.update`<br>`Entity.spy_shopping_list_company_business_unit.delete` |

<details open>
<summary markdown='span'>src/Pyz/Zed/ShoppingList/Persistence/Propel/Schema/spy_shopping_list.schema.xml</summary>

```html
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
<br>
</details>

Run the following commands to apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}
Make sure that the following changes have been applied by checking your database:<table><thead><tr><td>Database Entity</td><td>Type</td><td>Event</td></tr></thead><tbody><tr><td>`spy_shopping_list`</td><td>table</td><td>created</td></tr><tr><td>`spy_shopping_list_item`</td><td>table</td><td>created</td></tr><tr><td>`spy_shopping_list_company_user`</td><td>table</td><td>created</td></tr><tr><td>`spy_shopping_list_company_business_unit`</td><td>table</td><td>created</td></tr><tr><td>`spy_shopping_list_company_business_unit_blacklist`</td><td>table</td><td>created</td></tr><tr><td>`spy_shopping_list_permission_group`</td><td>table</td><td>created</td></tr><tr><td>`spy_shopping_list_permission_group_to_permission`</td><td>table</td><td>created</td></tr><tr><td>`spy_shopping_list_item_note`</td><td>table</td><td>created</td></tr></tbody></table>
{% endinfo_block %}

| Database Entity |Type  | Event |
| --- | --- | --- |
| `spy_shopping_list` |table  |created  |
| `spy_shopping_list_item` |table  |created  |
| `spy_shopping_list_company_user` |table  |created  |
| `spy_shopping_list_company_business_unit` |table  |created  |
| `spy_shopping_list_company_business_unit_blacklist` |table  |created  |
| `spy_shopping_list_permission_group` |table  |created  |
| `spy_shopping_list_permission_group_to_permission` |table  |created  |
| `spy_shopping_list_item_note` |table  |created  |

{% info_block warningBox "Verification" %}

Verify the following changes in transfer objects

|Transfer|Type|Event|Path|
|--- |--- |--- |--- |
|`ShoppingList`|class|created|`src/Generated/Shared/Transfer/ShoppingListTransfer`|
|`ShoppingListCollection`|class|created|`src/Generated/Shared/Transfer/ShoppingListCollectionTransfer`|
|`ShoppingListOverviewRequest`|class|created|`src/Generated/Shared/Transfer/ShoppingListOverviewRequestTransfer`|
|`ShoppingListOverviewResponse`|class|created|`src/Generated/Shared/Transfer/ShoppingListOverviewResponseTransfer`|
|`ShoppingListResponse`|class|created|`src/Generated/Shared/Transfer/ShoppingListResponseTransfer`|
|`ShoppingListCompanyUser`|class|created|`src/Generated/Shared/Transfer/ShoppingListCompanyUserTransfer`|
|`ShoppingListCompanyUserCollection`|class|created|`src/Generated/Shared/Transfer/ShoppingListCompanyUserCollectionTransfer`|
|`ShoppingListCompanyBusinessUnit`|class|created|`src/Generated/Shared/Transfer/ShoppingListCompanyBusinessUnitTransfer`|
|`ShoppingListCompanyBusinessUnitCollection`|class|created|`src/Generated/Shared/Transfer/ShoppingListCompanyBusinessUnitCollectionTransfer`|
|`ShoppingListPermissionGroup`|class|created|`src/Generated/Shared/Transfer/ShoppingListPermissionGroupTransfer`|
|`ShoppingListPermissionGroupCollection`|class|created|`src/Generated/Shared/Transfer/ShoppingListPermissionGroupCollectionTransfer`|
|`ShoppingListAddToCartRequest`|class|created|`src/Generated/Shared/Transfer/ShoppingListAddToCartRequestTransfer`|
|`ShoppingListAddToCartRequestCollection`|class|created|`src/Generated/Shared/Transfer/ShoppingListAddToCartRequestCollectionTransfer`|
|`ShoppingListShareRequest`|class|created|`src/Generated/Shared/Transfer/ShoppingListShareRequestTransfer`|
|`ShoppingListShareResponse`|class|created|`src/Generated/Shared/Transfer/ShoppingListShareResponseTransfer`|
|`ShoppingListDismissRequest`|class|created|`src/Generated/Shared/Transfer/ShoppingListDismissRequestTransfer`|
|`ShoppingListCompanyBusinessUnitBlacklist`|class|created|`src/Generated/Shared/Transfer/ShoppingListCompanyBusinessUnitBlacklistTransfer`|
|`ShoppingListFromCartRequest`|class|created|`src/Generated/Shared/Transfer/ShoppingListFromCartRequestTransfer`|
|`ShoppingListItem`|class|created|`src/Generated/Shared/Transfer/ShoppingListItemTransfer`|
|`ShoppingListItemCollection`|class|created|`src/Generated/Shared/Transfer/ShoppingListItemCollectionTransfer`|
|`ShoppingListItemResponse`|class|created|`src/Generated/Shared/Transfer/ShoppingListItemResponseTransfer`|
|`ShoppingListPreAddItemCheckResponse`|class|created|`src/Generated/Shared/Transfer/ShoppingListPreAddItemCheckResponseTransfer`|
|`ItemCollection`|class|created|`src/Generated/Shared/Transfer/ItemCollectionTransfer`|
|`SpyShoppingListEntity`|class|created|`src/Generated/Shared/SpyShoppingListEntityTransfer`|
|`SpyShoppingListCompanyUserEntity`|class|created|`src/Generated/Shared/SpyShoppingListCompanyUserEntityTransfer`|
|`SpyShoppingListCompanyBusinessUnit`|class|created|`src/Generated/Shared/SpyShoppingListCompanyBusinessUnitTransfer`|
|`SpyShoppingListCompanyBusinessUnitBlacklist`|class|created|`src/Generated/Shared/SpyShoppingListItemEntityTransfer`|
|`SpyShoppingListPermissionGroupEntity`|class|created|`src/Generated/Shared/SpyShoppingListPermissionGroupEntityTransfer`|
|`SpyShoppingListPermissionGroupToPermissionEntity`|class|created|`src/Generated/Shared/SpyShoppingListPermissionGroupToPermissionEntityTransfer`|
|`SpyShoppingListItemEntity`|class|created|`src/Generated/Shared/SpyShoppingListItemEntityTransfer`|
|`SpyShoppingListItemNoteEntity`|class|created|`src/Generated/Shared/SpyShoppingListItemEntityTransfer`|

{% endinfo_block %}
   
{% info_block warningBox "Verification" %}

Make sure that the changes were implemented successfully. For this purpose, trigger the following methods and make sure that the above events have been triggered:

|Path|Method Name|
|--- |--- |
|`src/Orm/Zed/ShoppingList/Persistence/Base/SpyShoppingList.php`|`prepareSaveEventName()`<br>`addSaveEventToMemory()`<br>`addDeleteEventToMemory()`|
|`src/Orm/Zed/ShoppingList/Persistence/Base/SpyShoppingListItem.php`|`prepareSaveEventName()`<br>`addSaveEventToMemory()`<br>`addDeleteEventToMemory()`|
|`src/Orm/Zed/ShoppingList/Persistence/Base/SpyShoppingListCompanyUser.php`|`prepareSaveEventName()`<br>`addSaveEventToMemory()`<br> `addDeleteEventToMemory()`|
|`src/Orm/Zed/ShoppingList/Persistence/Base/SpyShoppingList.php`|`prepareSaveEventName()`<br>`addSaveEventToMemory()`<br>`addDeleteEventToMemory()`|

{% endinfo_block %}

### 3) Add Translations

Append glossary for feature:

<details open>
<summary markdown='span'>src/data/import/glossary.csv</summary>

```yaml
customer.account.shopping_list.item.add.success,Item %sku% was added to the List.,en_US
customer.account.shopping_list.item.add.success,Artikel %sku% wurde zu der Liste hinzugefügt.,de_DE
customer.account.shopping_list.item.add.failed,Item %sku% could not be added to the List.,en_US
customer.account.shopping_list.item.add.failed,Artikel %sku% konnte der Liste nicht hinzugefügt werden.,de_DE
customer.account.shopping_list.create.success,"List '%name%' was created successfully.",en_US
customer.account.shopping_list.create.success,"Einkaufsliste '%name%' wurde erfolgreich erstellt.",de_DE
customer.account.shopping_list.error.cannot_update,Cannot update shopping list.,en_UScustomer.account.shopping_list.error.cannot_update,Die Liste konnte nicht aktualisiert werden.,de_DE
customer.account.shopping_list.share.share_shopping_list_fail,This shopping list has been shared before with this entity,en_US
customer.account.shopping_list.share.share_shopping_list_fail,Diese Einkaufsliste wurde bereits mit dieser Entität geteilt,de_DE
```

<br>
 </details>
    
Run the following console command to import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that in the database the configured data are added to the `spy_glossary` table.

{% endinfo_block %}

### 4) Configure Export to Redis

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
|`ShoppingListStorageEventSubscriber`  | Registers listeners that are responsible for publishing shopping list data based on changes to shopping lists or related entities|None  | `Spryker\Zed\ShoppingListStorage\Communication\Plugin\Event\Subscriber` |

<details open>
<summary markdown='span'>src/Pyz/Zed/Event/EventDependencyProvider.php</summary>

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
  
 <br>
 </details>

#### Set up Re-Sync Features

|  Plugin|  Specification| Prerequisites | Namespace |
| --- | --- | --- | --- |
|  `ShoppingListSynchronizationDataPlugin`| Allows populating empty storage table with data. | None| `Spryker\Zed\ShoppingListStorage\Communication\Plugin\Synchronization` |

<details open>
<summary markdown='span'>src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Zed\Synchronization;
 
use Spryker\Zed\ShoppingListStorage\Communication\Plugin\Synchronization\ShoppingListSynchronizationDataPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;
 
class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
	/**
	 * @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
	 */
	protected function getSynchronizationDataPlugins(): array
	{
		return [
			new ShoppingListSynchronizationDataPlugin(),
		];
	}
}
```
<br>
</details>

### 5) Import Data
Add Infrastructural Data

| Plugin | Specification | Prerequisites |Namespace |
| --- | --- | --- | --- |
|  `ShoppingListPermissionsInstallerPlugin`|  Installs infrastructural shopping list permissions and permission groups| None |`Spryker\Zed\ShoppingList\Communication\Plugin`  |

<details open>
<summary markdown='span'>src/Pyz/Zed/Installer/InstallerDependencyProvider.php</summary>

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
<br>
</details>

Run the following console command to execute registered installer plugins and install infrastructural data:

```bash
console setup:init-db
```

{% info_block warningBox "Verification" %}

Make sure that in the database the permission groups are added to `spy_shoppping_list_permission_group` table and the permissions are added to `spy_permission` table and the relations between them are added to `spy_shopping_list_permission_group_to_permission` table.

{% endinfo_block %}

#### Import Shopping Lists

{% info_block infoBox "Info" %}
The following imported entities will be used as shopping lists in Spryker OS.
{% endinfo_block %}

Prepare your data according to your requirements using our demo data:

<details open>
<summary markdown='span'>vendor/spryker/shopping-list-data-import/data/import/shopping_list.csv</summary>

```yaml
shopping_list_key,name,owner_customer_reference
Laptops,Laptops,DE--21
Cameras,Cameras,DE--21
Workstations,Workstations,DE--21
```
<br>
</details>


| Column |Is obligatory?  |Data Type  | Data Example | Data Explanation |
| --- | --- | --- | --- | --- |
|`shopping_list_key |mandatory`	  | string |Laptops  | The key that will identify the shopping list to be referred in future imports|
|`name`  |mandatory	  | string | Laptops | The name of the shopping list |
| `owner_customer_reference` |mandatory	  | string | DE--21 |The customer reference of the owner of the shopping list  |

Register the following plugin to enable the data import:

|  Plugin| Specification | Prerequisites |Data Explanation  |
| --- | --- | --- | --- |
|`ShoppingListDataImportPlugin`|  Imports demo shopping lists into database.| None | `Spryker\Zed\ShoppingListDataImport\Communication\Plugin\DataImport`|

<details open>
<summary markdown='span'>src/Pyz/Zed/DataImport/DataImportDependencyProvider.php</summary>

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

<br>
</details>

Run the following console command to import the data:

```bash
console data:import shopping-list
```

{% info_block warningBox "Verification" %}

Make sure that in the database that the configured data is added to the `spy_shopping_list` table.

{% endinfo_block %}

#### Import Shopping List Items

{% info_block infoBox "Information" %}
The following imported entities will be used as shopping list items in Spryker OS.
{% endinfo_block %}

Prepare your data according to your requirements using our demo data:

<details open>
<summary markdown='span'>vendor/spryker/shopping-list-data-import/data/import/shopping_list_item.csv</summary>

```bash
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

<br>
</details>

| Column |Is obligatory?  |Data Type  |Data Example  |Data Explanation  |
| --- | --- | --- | --- | --- | 
|`shopping_list_key`  | mandatory | string |Laptops	  |  The key that will identify the shopping list to add data to|
|`product_sku`  | mandatory | string | 187_26306352	 | The SKU of the concrete product variant that will be added to the shopping list |
| `quantity` | mandatory | integer | 3 |  The number of products that will be added to the shopping list|

Register the following plugin to enable the data import:

| Plugin |  Specification| Prerequisites |  Namespace|
| --- | --- | --- | --- |
|`ShoppingListItemDataImportPlugin`  |Imports demo shopping list items into database. | Assumes that the shopping list keys exist in database |`Spryker\Zed\ShoppingListDataImport\Communication\Plugin\DataImport` |

<details open>
<summary markdown='span'>src/Pyz/Zed/DataImport/DataImportDependencyProvider.php</summary>

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
<br>
</details>

Run the following console command to import the data

```bash
console data:import shopping-list-item
```

{% info_block warningBox "Verification" %}

Make sure that in the database that the configured data is added to the `spy_shopping_list_item` table.

{% endinfo_block %}

#### Import Shopping List Company Users

{% info_block infoBox "Information" %}
The following imported entities will be used as shopping lists being directly shared with specific company users in Spryker OS.
{% endinfo_block %}
Prepare your data according to your requirements using our demo data:

<details open>
<summary markdown='span'>vendor/spryker/shopping-list-data-import/data/import/shopping_list_company_user.csv</summary>

```bash
shopping_list_key,company_user_key,permission_group_name
Laptops,Spryker--7,FULL_ACCESS
Cameras,Spryker--7,READ_ONLY
Workstations,Spryker--7,READ_ONLY
Laptops,Spryker--1,FULL_ACCESS
Workstations,Spryker--1,FULL_ACCESS
Workstations,Spryker--2,READ_ONLY
Workstations,Spryker--3,READ_ONLY
Workstations,Spryker--6,READ_ONL
```
<br>
</details>


|  Column|Is obligatory?  | Data Type | Data Example | Data Explanation |
| --- | --- | --- | --- | --- |
|`shopping_list_key`  | mandatory |string  |Laptops  |The key that will identify the shopping list to add data to  |
| `company_user_key` |mandatory  | string | Spryker--7 | The key that will identify the company user that the shopping list is shared with |
| `permission_group_name` | mandatory | integer| READ_ONLY |  The permission group that will be assigned to the shared company user|

Register the following plugin to enable the data import:

| Plugin | Specification |Prerequisites  | Namespace |
| --- | --- | --- | --- |
| `ShoppingListCompanyUserDataImportPlugin` | Imports demo shopping lists sharing data with company users | Assumes that the shopping list keys, company user keys and the permission groups exist in database | `Spryker\Zed\ShoppingListDataImport\Communication\Plugin\DataImport` |

<details open>
<summary markdown='span'>src/Pyz/Zed/DataImport/DataImportDependencyProvider.php</summary>

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
<br>
</details>

Run the following console command to import the data:

```bash
console data:import shopping-list-company-user
```

{% info_block warningBox "Verification" %}

Make sure that in the database that the configured data is added to the `spy_shopping_list_company_user` table.

{% endinfo_block %}

#### Import Shopping List Company Business Units

{% info_block infoBox "Information" %}
The following imported entities will be used as shopping lists being directly shared with specific company business units in Spryker OS.
{% endinfo_block %}

Prepare your data according to your requirements using our demo data:

<details>
<summary markdown='span'>vendor/spryker/shopping-list-data-import/data/import/shopping_list_company_business_unit.csv</summary>

```yaml
shopping_list_key,business_unit_key,permission_group_name
Laptops,spryker_systems_HR,FULL_ACCESS
Cameras,spryker_systems_Zurich,FULL_ACCESS
Workstations,spryker_systems_Berlin,READ_ONLY
```
<br>
</details>


| Column |Is obligatory?  | Data Type |  Data Example| Data Explanation |
| --- | --- | --- | --- | --- |
|`shopping_list_key`  |mandatory |  string| Laptops |The key that will identify the shopping list to add data to  |
|`business_unit_key` | mandatory | string |spryker_systems_HR  | The key that will identify the company business unit that the shopping list is shared with |
| `permission_group_name` | mandatory |  integer|FULL_ACCESS  | The permission group that will be assigned to the shared company business unit |

Register the following plugin to enable the data import:

|Plugin  | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
|`ShoppingListCompanyBusinessUnitDataImportPlugin`| 	Imports demo shopping lists sharing data with company business units| 	Assumes that the shopping list keys, company business unit keys and the permission groups exist in database	| `Spryker\Zed\ShoppingListDataImport\Communication\Plugin\DataImport`| 

<details open>
<summary markdown='span'>src/Pyz/Zed/DataImport/DataImportDependencyProvider.php</summary>

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
<br>
</details>

Run the following console command to import the data

```bash
console data:import shopping-list-company-business-unit
```

{% info_block warningBox "Verification" %}

Make sure that in the database that the configured data is added to the `spy_shopping_list_company_busines_unit` table.

{% endinfo_block %}

### 6) Set up Behavior

#### Implementation
Enable the following behaviors by registering the plugins:

|Plugin|Specification|Prerequisites|Namespace|
|--- |--- |--- |--- |
|`ReadShoppingListPermissionPlugin`|Provides the ability to read a certain set of shopping lists on the Client side using twig function `can()`|None|`Spryker\Client\ShoppingList\Plugin`|
|`WriteShoppingListPermissionPlugin`|Provides the ability to write to a certain set of shopping lists on the Client side using twig function `can()`|None|`Spryker\Client\ShoppingList\Plugin`|
|`ReadShoppingListPermissionPlugin`|Provides the ability to read a certain set of shopping lists on the Zed side using `PermissionAwareTrait`|None|`Spryker\Zed\ShoppingList\Communication\Plugin`|
|`WriteShoppingListPermissionPlugin`|Provides the ability to write to a certain set of shopping lists on the Zed side using `PermissionAwareTrait`|None|`Spryker\Zed\ShoppingList\Communication\Plugin`|
|`ShoppingListPermissionStoragePlugin`|Retrieves a set of shopping lists permissions related to a certain company user|None|`Spryker\Zed\ShoppingList\Communication\Plugin`|
|`ShoppingListPermissionCustomerExpanderPlugin`|Expands `CustomerTransfer::PERMISSIONS` data with a set of permissions that allow the customer to read or write to shopping lists|Expects `CustomerTransfer` to contain a `CompanyUserTransfer` with `idCompanyUser`.<br>(hint: CompanyUser.CustomerTransferCompanyUserExpanderPlugin)|`Spryker\Zed\ShoppingList\Communication\Plugin`|
|`ShoppingListItemNoteToItemCartNoteMapperPlugin`|Maps shopping list item notes to cart item notes when creating a cart out of a shopping list|None|`Spryker\Client\ShoppingListNote\Plugin`|
|`ItemCartNoteToShoppingListItemNoteMapperPlugin`|Maps cart item notes to shopping list notes when creating shopping list out of a cart|None|`Spryker\Zed\ShoppingListNote\Communication\Plugin`|
|`ShoppingListItemNoteBeforeDeletePlugin`|Deletes shopping list item note before deleting shopping list item|None|`Spryker\Zed\ShoppingListNote\Communication\Plugin`|
|`ShoppingListItemNoteExpanderPlugin`|Expands `ShoppingListItemTransfer` with `ShoppingListItemNoteTransfer`|None|`Spryker\Zed\ShoppingListNote\Communication\Plugin`|
|`ShoppingListItemNotePostSavePlugin`|Saves shopping list item note when saving shopping list item|None|`Spryker\Zed\ShoppingListNote\Communication\Plugin`|

<details open>
<summary markdown='span'>src/Pyz/Client/Permission/PermissionDependencyProvider.php</summary>

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
<br>
</details>

<details open>
<summary markdown='span'>src/Pyz/Zed/Permission/PermissionDependencyProvider.php</summary>

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
<br>
</details>

<details open>
<summary markdown='span'>src/Pyz/Zed/Customer/CustomerDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Zed\Customer;
 
use Spryker\Zed\Customer\CustomerDependencyProvider as SprykerCustomerDependencyProvider;
use Spryker\Zed\ShoppingList\Communication\Plugin\ShoppingListPermissionCustomerExpanderPlugin;
 
class CustomerDependencyProvider extends SprykerCustomerDependencyProvider
{
	/**
	 * @return \Spryker\Zed\Customer\Dependency\Plugin\CustomerTransferExpanderPluginInterface[]
	 */
	protected function getCustomerTransferExpanderPlugins()
	{
		return [
			new ShoppingListPermissionCustomerExpanderPlugin(),
		];
	}
}
```
<br>
</details>

<details open>
<summary markdown='span'>src/Pyz/Zed/ShoppingList/ShoppingListDependencyProvider.php</summary>

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
<br>
</details>

<details open>
<summary markdown='span'>src/Pyz/Zed/ShoppingList/ShoppingListDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Client\ShoppingList;
 
use Spryker\Client\ShoppingList\ShoppingListDependencyProvider as SprykerShoppingListDependencyProvider;
use Spryker\Zed\ShoppingListNote\Communication\Plugin\ItemCartNoteToShoppingListItemNoteMapperPlugin;
use Spryker\Zed\ShoppingListNote\Communication\Plugin\ShoppingListItemNoteBeforeDeletePlugin;
use Spryker\Zed\ShoppingListNote\Communication\Plugin\ShoppingListItemNoteExpanderPlugin;
use Spryker\Zed\ShoppingListNote\Communication\Plugin\ShoppingListItemNotePostSavePlugin;
 
class ShoppingListDependencyProvider extends SprykerShoppingListDependencyProvider
{
	/**
	 * @return \Spryker\Zed\ShoppingListExtension\Dependency\Plugin\ShoppingListItemPostSavePluginInterface[]
	 */
	protected function getShoppingListItemPostSavePlugins(): array
	{
		return [
			new ShoppingListItemNotePostSavePlugin(),
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
 
	/**
	 * @return \Spryker\Zed\ShoppingListExtension\Dependency\Plugin\ItemExpanderPluginInterface[]
	 */
	protected function getItemExpanderPlugins(): array
	{
		return [
			new ShoppingListItemNoteExpanderPlugin(),
		];
	}
 
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
<br>
</details>

{% info_block warningBox "Verification" %}


Share User A's shopping list with User B, then change the shopping list from User A's profile, User B should get the updated shopping list. Also make sure that sharing shopping lists should have correct permission group (the ones you had in your installation).
Make sure that shopping list item notes are being saved on shopping list item save and deleted on shopping list item delete. Also make sure that shopping list item notes are transferred to cart item notes when creating a cart from a shopping list.

{% endinfo_block %}

<!--### 7) Related Features
Here you can find a list of integration guides for related features.

| Feature | Recommended Version | Link |
| --- | --- | --- |
| Shopping Lists Product Options	|2018-10	  |N/A  |-->


## Install Feature Frontend
### Prerequisites

Please overview and install the necessary features before beginning the integration step.

| Name |Version  |
| --- | --- |
|Spryker Core  | 2018.11.0 |
|Company Account  | 2018.11.0 |
|Multiple Carts |2018.11.0  |
|Product  |2018.11.0  |
|Customer Account Management  | 2018.11.0 |

### 1) Install Require Modules using Composer

Run the following command to install the required modules:

```bash
composer require spryker-feature/shopping-lists:"^2018.11.0" --update-with-dependencie
```
{% info_block warningBox "Verification" %}

Make sure that he following modules were installed:

| Module |Expected Directory |  
| --- | --- |
|`ShoppingListPage`	|`vendor/spryker-shop/shopping-list-page`|
|`ShoppingListWidget`|	`vendor/spryker-shop/shopping-list-widget`|
|`ShoppingListNoteWidget`	|`vendor/spryker-shop/shopping-list-note-widget`|

{% endinfo_block %}

### 2) Add Translations

#### Implementation
Append glossary according to your configuration:

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
customer.account.shopping_list.delete.you_are_trying_to_delete_shopping_list,"Sie versuchen die Einkaufsliste <a href=""%link%"">%name%</a> zu löschen",de_DE
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
```
<br>
</details>

Run the following console command to import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that in the database the configured data are added to the `spy_glossary` table.

{% endinfo_block %}

### 3) Set up Widgets

Enable global widgets:

|Widget|Description|Namespace|
|--- |--- |--- |
|`ShoppingListNavigationMenuWidget`|Shows a top-navigation sub-menu containing all of the current logged-in customer shopping lists|`SprykerShop\Yves\ShoppingListWidget\Widget`|
|`ShoppingListMenuItemWidget`|Shows customer shopping lists in customer account navigation side menu.|`SprykerShop\Yves\ShoppingListWidget\Widget`|
|`AddToShoppingListWidget`|Allows customer to be able to add a product with an sku to one of the shopping lists they have write access for|`SprykerShop\Yves\ShoppingListWidget\Widget`|
|`ShoppingListItemNoteWidget`|Allows customer to create/save/remove notes from shopping list items|`SprykerShop\Yves\ShoppingListNoteWidget\Widget`|

<details open>
<summary markdown='span'>src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Yves\ShopApplication;
 
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
use SprykerShop\Yves\ShoppingListNoteWidget\Widget\ShoppingListItemNoteWidget;
use SprykerShop\Yves\ShoppingListWidget\Widget\AddToShoppingListWidget;
use SprykerShop\Yves\ShoppingListWidget\Widget\ShoppingListMenuItemWidget;
use SprykerShop\Yves\ShoppingListWidget\Widget\ShoppingListNavigationMenuWidget;
 
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
		];
	}
}
```
<br>
</details>


{% info_block infoBox "Additional Information" %}
`ShoppingListWidget` uses Javascript for some functionality:
{% endinfo_block %}

| Functionality | Path |
| --- | --- |
| Injects item quantity from item quantity dropdown into shopping list save form. |`vendor/spryker/spryker-shop/Bundles/shopping-list-widget/src/SprykerShop/Yves/ShoppingListWidget/Theme/default/components/molecules/form-data-injector/form-data-injector.ts`  |

Run the following command to enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Make sure that the following widgets were registered:

|Module|Test|
|--- |--- |
|`AddToShoppingListWidget`|Go to the product detail page and add a product to a shopping list|
|`ShoppingListItemNoteWidget`|Go to a shopping list save a note to an item|
|`ShoppingListMenuItemWidget`|Login with a customer with a company account that has a shopping and you should see the shopping list widget in the top navigation bar|
|`ShoppingListNavigationMenuWidget`|Login with a customer with a company account and go to My Account page, the shopping list side navigation should show on the left side|

{% endinfo_block %}

<!--### 4) Related Features

Here you can find a list of integration guides for  related features:
|Feature|Recommended Version|Link|
|--- |--- |--- |
|Shopping Lists Product Options|2018-10|N/A| -->

