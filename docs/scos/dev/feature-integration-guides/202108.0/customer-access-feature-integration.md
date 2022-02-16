---
title: Customer Access feature integration
description: The guide walks you through the process of installing the Customer Access feature in the project.
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/customer-access-feature-integration
originalArticleId: d0b476f0-c6dd-4126-812e-bb37f259cd03
redirect_from:
  - /2021080/docs/customer-access-feature-integration
  - /2021080/docs/en/customer-access-feature-integration
  - /docs/customer-access-feature-integration
  - /docs/en/customer-access-feature-integration
---

## Install Feature Core

### Prerequisites

To start feature integration, overview and install the necessary features:

| NAME | VERSION |
|---|---|
| Spryker Core | {{page.version}} |

### 1) Install the required modules using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/customer-access:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules were installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| CustomerAccess | vendor/spryker/customer-access |
| CustomerAccessPermission | vendor/spryker/customer-access-permission |
| CustomerAccessStorage | vendor/spryker/customer-access-storage |
| CustomerAccessGui | vendor/spryker/customer-access-gui |

{% endinfo_block %}

### 2) Set up configuration

Add your custom project configuration to adjust the module behavior.

{% info_block infoBox "Info" %}

These are going to be the setup content types in your system, so make sure that you cover all types of content you would like hidden from unauthenticated users.

{% endinfo_block %}

**src/Pyz/Zed/CustomerAccess/CustomerAccessConfig.php**

```php
<?php

namespace Pyz\Zed\CustomerAccess;

use Spryker\Shared\CustomerAccess\CustomerAccessConfig as SprykerSharedCustomerAccessConfig;
use Spryker\Zed\CustomerAccess\CustomerAccessConfig as SprykerCustomerAccessConfig;

class CustomerAccessConfig extends SprykerCustomerAccessConfig
{
 /**
 * @return array
 */
 public function getContentTypes(): array
 {
            return [
                     SprykerSharedCustomerAccessConfig::CONTENT_TYPE_PRICE,
                                    SprykerSharedCustomerAccessConfig::CONTENT_TYPE_ORDER_PLACE_SUBMIT,
                SprykerSharedCustomerAccessConfig::CONTENT_TYPE_ADD_TO_CART,
                    SprykerSharedCustomerAccessConfig::CONTENT_TYPE_WISHLIST,
             SprykerSharedCustomerAccessConfig::CONTENT_TYPE_SHOPPING_LIST,
            ];
       }
}
```

{% info_block infoBox "Info" %}

The verification of this step will happen when you import the infrastructural data related to this feature.

{% endinfo_block %}

### 3) Set up the database schema

Adjust the schema definition so entity changes will trigger events.

| AFFECTED ENTITY | TRIGGERED EVENTS |
|---|---|
| spy_unauthenticated_customer_access | Entity.spy_unauthenticated_customer_access.create<br>Entity.spy_unauthenticated_customer_access.update<br>Entity.spy_unauthenticated_customer_access.delete |

**src/Pyz/Zed/CustomerAccess/Persistence/Propel/Schema/spy_unauthenticated_customer_access.schema.xml**

 ```xml
<?xml version="1.0"?>
<database xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:noNamespaceSchemaLocation="http://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\CustomerAccess\Persistence" package="src.Orm.Zed.CustomerAccess.Persistence">
 <table name="spy_unauthenticated_customer_access" idMethod="native" phpName="SpyUnauthenticatedCustomerAccess">
 <behavior name="event">
 <parameter name="spy_unauthenticated_customer_access_all" column="*"/>
 </behavior>
 </table>
</database>
 ```

Run the following commands to apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes by checking your database:

| DATABASE ENTITY | TYPE | EVENT |
| --- | --- | --- |
| spy_unauthenticated_customer_access | table | created |
| spy_unauthenticated_customer_access_storage | table | created |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the following changes in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| CustomerAccess | class | created | src/Generated/Shared/Transfer/CustomerAccessTransfer |
| ContentTypeAccess | class | created | src/Generated/Shared/Transfer/ContentTypeAccessTransfer |
| SpyUnauthenticatedCustomerAccessEntity | class | created | src/Generated/Shared/SpyUnauthenticatedCustomerAccessEntity |
| SpyUnauthenticatedCustomerAccessStorageEntityTransfer | class | created | src/Generated/Shared/SpyUnauthenticatedCustomerAccessStorageEntity |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the changes were implemented successfully. For this purpose, trigger the following methods and make sure that the above events have been triggered:

| PATH | METHOD NAME |
| --- | --- |
| src/Orm/Zed/CustomerAccess/Persistence/SpyUnauthenticatedCustomerAccess.php | prepareSaveEventName()<br>addSaveEventToMemory()<br>addDeleteEventToMemory() |

{% endinfo_block %}

### 3) Configure export to Redis

This step will publish tables on change (create, edit, delete) to the `spy_unauthenticated_customer_access_storage` and synchronize the data to Storage.

#### Set up event listeners

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| CustomerAccessStorageEventSubscriber | Registers listeners that are responsible for publishing customer access data based on changes to customer access entities | None |  Spryker\Zed\CustomerAccessStorage\Communication\Plugin\Event\Subscriber |

**src/Pyz/Zed/Event/EventDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Event;

use Spryker\Zed\CustomerAccessStorage\Communication\Plugin\Event\Subscriber\CustomerAccessStorageEventSubscriber;
use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;

class EventDependencyProvider extends SprykerEventDependencyProvider
{
 public function getEventSubscriberCollection()
 {
 $eventSubscriberCollection = parent::getEventSubscriberCollection();
 $eventSubscriberCollection->add(new CustomerAccessStorageEventSubscriber());

 return $eventSubscriberCollection;
 }
}
```

{% info_block warningBox "Verification" %}

Make sure that when a product list is created, updated or deleted, they are exported (or removed to Redis and Elasticsearch accordingly.)

| TARGET ENTITY | EXAMPLE EXPECTED DATA IDENTIFIER |
|---|---|
| spy_unauthenticated_customer_access | kv:unauthenticated_customer_access |

**Example Expected Data Fragment**

```xml
{
								"content_type_access": [
								{
								"id_unauthenticated_customer_access": 1,
								"content_type": "price",
								"is_restricted": true
								},
								{
								"id_unauthenticated_customer_access": 2,
								"content_type": "order-place-submit",
								"is_restricted": true
								},
								{
								"id_unauthenticated_customer_access": 3,
								"content_type": "add-to-cart",
								"is_restricted": true
								},
								{
								"id_unauthenticated_customer_access": 4,
								"content_type": "wishlist",
								"is_restricted": true
								},
								{
								"id_unauthenticated_customer_access": 5,
								"content_type": "shopping-list",
								"is_restricted": true
								}
								],
								"_timestamp": 1553177014.3275149
					}
```

{% endinfo_block %}

#### Set up re-sync features

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| CustomerAccessSynchronizationDataPlugin | Allows populating empty storage table with data. | None | Spryker\Zed\CustomerAccessStorage\Communication\Plugin\Synchronization |

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\CustomerAccessStorage\Communication\Plugin\Synchronization\CustomerAccessSynchronizationDataPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
 /**
 * @return \Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface[]
 */
 protected function getSynchronizationDataPlugins(): array
 {
 return [
 new CustomerAccessSynchronizationDataPlugin(),
 ];
 }
}
```

### 5) Import data

#### Add infrastructural data

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| CustomerAccessInstallerPlugin | Installs configured content types | None |  Spryker\Zed\CustomerAccess\Communication\Plugin |

**src/Pyz/Zed/Installer/InstallerDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Installer;

use Spryker\Zed\CustomerAccess\Communication\Plugin\CustomerAccessInstallerPlugin;
use Spryker\Zed\Installer\InstallerDependencyProvider as SprykerInstallerDependencyProvider;

class InstallerDependencyProvider extends SprykerInstallerDependencyProvider
{
 /**
 * @return \Spryker\Zed\Installer\Dependency\Plugin\InstallerPluginInterface[]
 */
 public function getInstallerPlugins()
 {
 return [
 new CustomerAccessInstallerPlugin(),
 ];
 }
}
```

Run the following console command to execute registered installer plugins and install infrastructural data:

```bash
console setup:init-db
```

{% info_block warningBox "Verification" %}

Make sure that all configured content types above are saved in the database table `spy_unauthenticated_customer_access` with the configured content type access.

{% endinfo_block %}

### 6) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| SeePricePermissionPlugin | Provides the ability to see prices on all pages | None |  Spryker\Client\CustomerAccessPermission\Plugin |
| SeeOrderPlaceSubmitPermissionPlugin | Provides ability to place order after going through checkout process | None | Spryker\Client\CustomerAccessPermission\Plugin |
| SeeAddToCartPermissionPlugin | Provides ability to add item to cart on product detail page | None | Spryker\Client\CustomerAccessPermission\Plugin |
| SeeWishlistPermissionPlugin | Provides ability to add item to wish list on product detail page | None | Spryker\Client\CustomerAccessPermission\Plugin |
| SeeShoppingListPermissionPlugin | Provides ability to add item to shopping list on product detail page | None | Spryker\Client\CustomerAccessPermission\Plugin |
| CustomerAccessPermissionStoragePlugin | Provides ability to fetch customer access permissions on customer login | None | Spryker\Client\CustomerAccessPermission\Plugin |

**src/Pyz/Client/Permission/PermissionDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Permission;

use Spryker\Client\CustomerAccessPermission\Plugin\CustomerAccessPermissionStoragePlugin;
use Spryker\Client\CustomerAccessPermission\Plugin\SeeAddToCartPermissionPlugin;
use Spryker\Client\CustomerAccessPermission\Plugin\SeeOrderPlaceSubmitPermissionPlugin;
use Spryker\Client\CustomerAccessPermission\Plugin\SeePricePermissionPlugin;
use Spryker\Client\CustomerAccessPermission\Plugin\SeeShoppingListPermissionPlugin;
use Spryker\Client\CustomerAccessPermission\Plugin\SeeWishlistPermissionPlugin;
use Spryker\Client\Permission\PermissionDependencyProvider as SprykerPermissionDependencyProvider;

class PermissionDependencyProvider extends SprykerPermissionDependencyProvider
{
 /**
 * @return \Spryker\Client\PermissionExtension\Dependency\Plugin\PermissionStoragePluginInterface[]
 */
 protected function getPermissionStoragePlugins(): array
 {
 return [
 new CustomerAccessPermissionStoragePlugin(),
 ];
 }
 /**
 * @return \Spryker\Shared\PermissionExtension\Dependency\Plugin\PermissionPluginInterface[]
 */
 protected function getPermissionPlugins(): array
 {
 return [
 new SeePricePermissionPlugin(),
 new SeeOrderPlaceSubmitPermissionPlugin(),
 new SeeAddToCartPermissionPlugin(),
 new SeeWishlistPermissionPlugin(),
 new SeeShoppingListPermissionPlugin(),
 ];
 }
}
```

{% info_block warningBox "Verification" %}

Make sure that everything works fine (checks should be done for not logged-in customers:
- `SeePricePermissionPlugin` will show or hide prices at all pages depending on configuration value.
- `SeeOrderPlaceSubmitPermissionPlugin` will allow or disallow order submitting after going through the checkout process depending on configuration value.
- `SeeAddToCartPermissionPlugin` is responsible for "Add to Cart" button on PDP. It will be available or not depending on configuration value.
- `SeeWishlistPermissionPlugin` takes care about "Add to Wishlist" button on PDP. It will be shown or not depending on configuration value.
- `SeeShoppingListPermissionPlugin` will allow or disallow adding product to shopping list from PDP depending on configuration value.
- `CustomerAccessPermissionStoragePlugin` is responsible for customer permissions retrieving.

{% endinfo_block %}

## Install feature frontend

### Prerequisites

Overview and install the necessary features before beginning the integration step.

| NAME | VERSION |
|---|---|
| Spryker Core | {{page.version}} |

### 1) Add translations

Append glossary according to your configuration:

**src/data/import/glossary.csv**

```html
customer.access.cannot_see_price,Please login to see the price,en_US
customer.access.cannot_see_price,Bitte melden Sie sich an um den Preis zu sehen,de_DE
```

Run the following console command to import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that in the database the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}
