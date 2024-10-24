

This document describes how to install the [Customer Access feature](/docs/pbc/all/customer-relationship-management/{{site.version}}/base-shop/customer-access-feature-overview.html).

## Install Feature Core

Follow the steps below to install the Customer Access feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE|
|---|---|---|
| Spryker Core | {{site.version}}| [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |

### 1) Install the required modules

```bash
composer require spryker-feature/customer-access:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                   | EXPECTED DIRECTORY                        |
|--------------------------|-------------------------------------------|
| CustomerAccess           | vendor/spryker/customer-access            |
| CustomerAccessPermission | vendor/spryker/customer-access-permission |
| CustomerAccessStorage    | vendor/spryker/customer-access-storage    |
| CustomerAccessGui        | vendor/spryker/customer-access-gui        |

{% endinfo_block %}

### 2) Set up configuration

Add your custom project configuration to adjust the module behavior.

{% info_block infoBox "Info" %}

These are going to be the setup content types in your system, so make sure that you cover all types of content you want to hide from unauthenticated users.

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
     * @return array<string>
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

The verification of this step happens when you import the infrastructural data related to this feature.

{% endinfo_block %}

### 3) Set up the database schema

1. Adjust the schema definition so entity changes trigger events.

| AFFECTED ENTITY                     | TRIGGERED EVENTS                                                                                                                                            |
|-------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| spy_unauthenticated_customer_access | Entity.spy_unauthenticated_customer_access.create<br>Entity.spy_unauthenticated_customer_access.update<br>Entity.spy_unauthenticated_customer_access.delete |

**src/Pyz/Zed/CustomerAccess/Persistence/Propel/Schema/spy_unauthenticated_customer_access.schema.xml**

 ```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd" namespace="Orm\Zed\CustomerAccess\Persistence" package="src.Orm.Zed.CustomerAccess.Persistence">

    <table name="spy_unauthenticated_customer_access" idMethod="native" phpName="SpyUnauthenticatedCustomerAccess">
        <behavior name="event">
            <parameter name="spy_unauthenticated_customer_access_all" column="*"/>
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

Make sure the following changes have been applied in the database:

| DATABASE ENTITY                             | TYPE  | EVENT   |
|---------------------------------------------|-------|---------|
| spy_unauthenticated_customer_access         | table | created |
| spy_unauthenticated_customer_access_storage | table | created |

Make sure that the following changes in transfer objects:

| TRANSFER          | TYPE  | EVENT   | PATH                                                    |
|-------------------|-------|---------|---------------------------------------------------------|
| CustomerAccess    | class | created | src/Generated/Shared/Transfer/CustomerAccessTransfer    |
| ContentTypeAccess | class | created | src/Generated/Shared/Transfer/ContentTypeAccessTransfer |

Make sure that the changes were implemented successfully. To achieve this, trigger the following methods and make sure that the above events have been triggered:

| PATH                                                                        | METHOD NAME                                                                  |
|-----------------------------------------------------------------------------|------------------------------------------------------------------------------|
| src/Orm/Zed/CustomerAccess/Persistence/SpyUnauthenticatedCustomerAccess.php | prepareSaveEventName()<br>addSaveEventToMemory()<br>addDeleteEventToMemory() |

{% endinfo_block %}

### 3) Configure export to Redis

This step publishes tables on change (create, edit, delete) to the `spy_unauthenticated_customer_access_storage` and synchronizes the data to Storage.

#### Set up event listeners

| PLUGIN                               | SPECIFICATION                                                                                                             | PREREQUISITES | NAMESPACE                                                               |
|--------------------------------------|---------------------------------------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------------|
| CustomerAccessStorageEventSubscriber | Registers listeners that are responsible for publishing customer access data based on changes to customer access entities |               | Spryker\Zed\CustomerAccessStorage\Communication\Plugin\Event\Subscriber |

**src/Pyz/Zed/Event/EventDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Event;

use Spryker\Zed\CustomerAccessStorage\Communication\Plugin\Event\Subscriber\CustomerAccessStorageEventSubscriber;
use Spryker\Zed\Event\Dependency\EventSubscriberCollectionInterface;
use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;

class EventDependencyProvider extends SprykerEventDependencyProvider
{
    /**
     * @return \Spryker\Zed\Event\Dependency\EventSubscriberCollectionInterface
     */
    public function getEventSubscriberCollection(): EventSubscriberCollectionInterface
    {
        $eventSubscriberCollection = parent::getEventSubscriberCollection();
        $eventSubscriberCollection->add(new CustomerAccessStorageEventSubscriber());

        return $eventSubscriberCollection;
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that when a customer access rule is created, updated, or deleted, it is exported (or removed) to Redis.

| TARGET ENTITY                       | EXAMPLE EXPECTED DATA IDENTIFIER   |
|-------------------------------------|------------------------------------|
| spy_unauthenticated_customer_access | kv:unauthenticated_customer_access |

**Example Expected Data Fragment**

```json
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

#### Set up publisher trigger plugins

Add the following plugins to your project:

| PLUGIN                               | SPECIFICATION                                                                     | PREREQUISITES | NAMESPACE                                                        |
|--------------------------------------|-----------------------------------------------------------------------------------|---------------|------------------------------------------------------------------|
| CustomerAccessPublisherTriggerPlugin | Allows publishing or re-publishing unauthenticated customer access data manually. |               | Spryker\Zed\CustomerAccessStorage\Communication\Plugin\Publisher |

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\CustomerAccessStorage\Communication\Plugin\Publisher\CustomerAccessPublisherTriggerPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherTriggerPluginInterface>
     */
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            new CustomerAccessPublisherTriggerPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that a new publish message is added to the queue when you run the console command:

```bash
console publish:trigger-events -r unauthenticated_customer_access
```

{% endinfo_block %}

#### Set up resync features

| PLUGIN                                      | SPECIFICATION                                    | PREREQUISITES | NAMESPACE                                                              |
|---------------------------------------------|--------------------------------------------------|---------------|------------------------------------------------------------------------|
| CustomerAccessSynchronizationDataBulkPlugin | Allows populating empty storage table with data. |               | Spryker\Zed\CustomerAccessStorage\Communication\Plugin\Synchronization |

**src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\CustomerAccessStorage\Communication\Plugin\Synchronization\CustomerAccessSynchronizationDataBulkPlugin;
use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface>
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            new CustomerAccessSynchronizationDataBulkPlugin(),
        ];
    }
}
```

### 5) Add infrastructural data

| PLUGIN  SPECIFICATION | NAMESPACE |
|---|---|---|
| CustomerAccessInstallerPlugin | Installs configured content types | Spryker\Zed\CustomerAccess\Communication\Plugin |

**src/Pyz/Zed/Installer/InstallerDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Installer;

use Spryker\Zed\CustomerAccess\Communication\Plugin\CustomerAccessInstallerPlugin;
use Spryker\Zed\Installer\InstallerDependencyProvider as SprykerInstallerDependencyProvider;

class InstallerDependencyProvider extends SprykerInstallerDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\Installer\Dependency\Plugin\InstallerPluginInterface>
     */
    public function getInstallerPlugins(): array
    {
        return [
            new CustomerAccessInstallerPlugin(),
        ];
    }
}
```

Execute registered installer plugins and install infrastructural data:

```bash
console setup:init-db
```

{% info_block warningBox "Verification" %}

Make sure that all configured content types above are saved in the `spy_unauthenticated_customer_access` database table with the configured content type access.

{% endinfo_block %}

### 6) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                | SPECIFICATION                                                           | PREREQUISITES | NAMESPACE                                      |
|---------------------------------------|-------------------------------------------------------------------------|---------------|------------------------------------------------|
| SeePricePermissionPlugin              | Provides the ability to see prices on all pages                         |               | Spryker\Client\CustomerAccessPermission\Plugin |
| SeeOrderPlaceSubmitPermissionPlugin   | Provides ability to place order after going through checkout process    |               | Spryker\Client\CustomerAccessPermission\Plugin |
| SeeAddToCartPermissionPlugin          | Provides ability to add item to cart on product detail page             |               | Spryker\Client\CustomerAccessPermission\Plugin |
| SeeWishlistPermissionPlugin           | Provides ability to add item to wish list on product detail page        |               | Spryker\Client\CustomerAccessPermission\Plugin |
| SeeShoppingListPermissionPlugin       | Provides ability to add item to shopping list on product detail page    |               | Spryker\Client\CustomerAccessPermission\Plugin |
| CustomerAccessPermissionStoragePlugin | Provides ability to fetch customer access permissions on customer login |               | Spryker\Client\CustomerAccessPermission\Plugin |

<details>
<summary>src/Pyz/Client/Permission/PermissionDependencyProvider.php</summary>

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
     * @return array<\Spryker\Client\PermissionExtension\Dependency\Plugin\PermissionStoragePluginInterface>
     */
    protected function getPermissionStoragePlugins(): array
    {
        return [
            new CustomerAccessPermissionStoragePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Shared\PermissionExtension\Dependency\Plugin\PermissionPluginInterface>
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
</details>

{% info_block warningBox "Verification" %}

Make sure that everything works—checks must be done for not logged-in customers:
- `SeePricePermissionPlugin` shows or hides prices at all pages depending on configuration value.
- `SeeOrderPlaceSubmitPermissionPlugin` allows or denies order submitting after going through the checkout process depending on configuration value.
- `SeeAddToCartPermissionPlugin` is responsible for the **Add to Cart** button on the product details page (PDP). It is available or not depending on the configuration value.
- `SeeWishlistPermissionPlugin` takes care about the **Add to Wishlist** button on PDP. It is shown or not depending on the configuration value.
- `SeeShoppingListPermissionPlugin` allows or denies adding a product to a shopping list from PDP depending on the configuration value.
- `CustomerAccessPermissionStoragePlugin` is responsible for customer permissions retrieving.

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the Customer Access feature frontend.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE|
|---|---|---|
| Spryker Core | {{site.version}}| [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |


### 1) Add translations

1. Append glossary according to your configuration:

**data/import/common/common/glossary.csv**

```html
customer.access.cannot_see_price,Please login to see the price,en_US
customer.access.cannot_see_price,Bitte melden Sie sich an um den Preis zu sehen,de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}
