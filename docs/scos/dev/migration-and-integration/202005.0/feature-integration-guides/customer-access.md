---
title: Customer Access Feature Integration
originalLink: https://documentation.spryker.com/v5/docs/customer-access-feature-integration
redirect_from:
  - /v5/docs/customer-access-feature-integration
  - /v5/docs/en/customer-access-feature-integration
---

## Install Feature Core

### Prerequisites

To start feature integration, overview and install the necessary features:

| Name | Version |
|---|---|
| Spryker Core | master |

### 1) Install the Required Modules Using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/customer-access:"^master" --update-with-dependencies 
```

{% info_block warningBox "Verification" %}
Make sure that the following modules were installed:<table><thead><tr><td>Module</td><td>Expected Directory</td></tr></thead><tbody><tr><td>`CustomerAccess`</td><td>`vendor/spryker/customer-access`</td></tr><tr><td>`CustomerAccessPermission`</td><td>`vendor/spryker/customer-access-permission`</td></tr><tr><td>`CustomerAccessStorage`</td><td>`vendor/spryker/customer-access-storage`</td></tr><tr><td>`CustomerAccessGui`</td><td>`vendor/spryker/customer-access-gui`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Set up Configuration

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

### 3) Set up the Database Schema

Adjust the schema definition so entity changes will trigger events.

| Affected Entity | Triggered Events |
|---|---|
|  `spy_unauthenticated_customer_access` | `Entity.spy_unauthenticated_customer_access.create``Entity.spy_unauthenticated_customer_access.update``Entity.spy_unauthenticated_customer_access.delete` |

**src/Pyz/Zed/CustomerAccess/Persistence/Propel/Schema/spy_unauthenticated_customer_access.schema.xml**

 ```html
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
Make sure that the following changes by checking your database:<table><thead><tr><td>Database Entity</td><td>Type</td><td>Event</td></tr></thead><tbody><tr><td>`spy_unauthenticated_customer_access`</td><td>table</td><td>created</td></tr><tr><td>`spy_unauthenticated_customer_access_storage`</td><td>table</td><td>created</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that the following changes in transfer objects:<table><thead><tr class="TableStyle-PatternedRows2-Head-Header1"><td>Transfer</td><td>Type</td><td>Event</td><td>Path</td></tr></thead><tbody><tr><td>`CustomerAccess`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CustomerAccessTransfer`</td></tr><tr><td>`ContentTypeAccess`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/ContentTypeAccessTransfer`</td></tr><tr><td>`SpyUnauthenticatedCustomerAccessEntity`</td><td>class</td><td>created</td><td>`src/Generated/Shared/SpyUnauthenticatedCustomerAccessEntity`</td></tr><tr><td>`SpyUnauthenticatedCustomerAccessStorageEntityTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/SpyUnauthenticatedCustomerAccessStorageEntity`</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that the changes were implemented successfully. For this purpose, trigger the following methods and make sure that the above events have been triggered:<table><thead><tr><td>Path</td><td>Method Name</td></tr></thead><tbody><tr><td>`src/Orm/Zed/CustomerAccess/Persistence/SpyUnauthenticatedCustomerAccess.php`</td><td>`prepareSaveEventName(
{% endinfo_block %}`<br>`addSaveEventToMemory()`<br>`addDeleteEventToMemory()`</td></tr></tbody></table>)

### 3) Configure Export to Redis

This step will publish tables on change (create, edit, delete) to the `spy_unauthenticated_customer_access_storage` and synchronize the data to Storage.

#### Set up Event Listeners

| Plugin | Specification | Prerequisites | Namespace |
|---|---|---|---|
|  `CustomerAccessStorageEventSubscriber` | Registers listeners that are responsible for publishing customer access data based on changes to customer access entities | None |  `Spryker\Zed\CustomerAccessStorage\Communication\Plugin\Event\Subscriber` |

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
Make sure that when a product list is created, updated or deleted, they are exported (or removed
{% endinfo_block %} to Redis and Elasticsearch accordingly.)

| Target Entity | Example Expected Data Identifier | 
|---|---|
|  `spy_unauthenticated_customer_access` |  `kv:unauthenticated_customer_access` |

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

#### Set up Re-Sync Features

| Plugin | Specification | Prerequisites | Namespace |
|---|---|---|---|
|  `CustomerAccessSynchronizationDataPlugin` | Allows populating empty storage table with data. | None |  `Spryker\Zed\CustomerAccessStorage\Communication\Plugin\Synchronization` |

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

### 5) Import Data

#### Add Infrastructural Data

| Plugin | Specification | Prerequisites | Namespace |
|---|---|---|---|
|  `CustomerAccessInstallerPlugin` | Installs configured content types | None |  `Spryker\Zed\CustomerAccess\Communication\Plugin` |

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

### 6) Set up Behavior

Enable the following behaviors by registering the plugins:

| Plugin | Specification | Prerequisites | Namespace |
|---|---|---|---|
|  `SeePricePermissionPlugin` | Provides the ability to see prices on all pages | None |  `Spryker\Client\CustomerAccessPermission\Plugin` |
|  `SeeOrderPlaceSubmitPermissionPlugin` | Provides ability to place order after going through checkout process | None |  `Spryker\Client\CustomerAccessPermission\Plugin` |
|  `SeeAddToCartPermissionPlugin` | Provides ability to add item to cart on product detail page | None |  `Spryker\Client\CustomerAccessPermission\Plugin` |
|  `SeeWishlistPermissionPlugin` | Provides ability to add item to wish list on product detail page | None |  `Spryker\Client\CustomerAccessPermission\Plugin` |
|  `SeeShoppingListPermissionPlugin` | Provides ability to add item to shopping list on product detail page | None |  `Spryker\Client\CustomerAccessPermission\Plugin` |
|  `CustomerAccessPermissionStoragePlugin` | Provides ability to fetch customer access permissions on customer login | None |  `Spryker\Client\CustomerAccessPermission\Plugin` |

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
Make sure that everything works fine (checks should be done for not logged-in customers
{% endinfo_block %}:<ul><li>`SeePricePermissionPlugin` will show or hide prices at all pages depending on configuration value</li><li>`SeeOrderPlaceSubmitPermissionPlugin` will allow or disallow order submitting after going through the checkout process depending on configuration value</li><li>`SeeAddToCartPermissionPlugin` is responsible for "Add to Cart" button on PDP. It will be available or not depending on configuration value</li><li>`SeeWishlistPermissionPlugin` takes care about "Add to Wishlist" button on PDP. It will be shown or not depending on configuration value</li><li>`SeeShoppingListPermissionPlugin` will allow or disallow adding product to shopping list from PDP depending on configuration value</li><li>`CustomerAccessPermissionStoragePlugin` is responsible for customer permissions retrieving</li></ul>)

## Install Feature Frontend

### Prerequisites

Overview and install the necessary features before beginning the integration step.

| Name | Version |
|---|---|
| Spryker Core | master |

### 1) Add Translations
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
