


This document describes how to install the Warehouse picking feature.

## Prerequisites

Install the required features:

| NAME                                    | VERSION          | INSTALLATION GUIDE                                                                                                                                                                  |
|-----------------------------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Warehouse User Management               | {{page.version}} | [Install the Warehouse User Management feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/fulfillment-app/install-and-upgrade/install-features/install-the-warehouse-user-management-feature.html)                     |
| Order Management + Inventory Management | {{page.version}} | [Order Management and Inventory Management feature](/docs/scos/dev/feature-integration-guides/{{page.version}}/install-the-order-management-and-inventory-management-feature.html) |
| Shipment                                | {{page.version}} | [Install the Shipment feature](/docs/scos/dev/feature-integration-guides/{{page.version}}/shipment-feature-integration.html)                                                       |
| Push Notification                       | {{page.version}} | [Install the Push Notification feature](/docs/scos/dev/feature-integration-guides/{{page.version}}/install-the-push-notification-feature.html)                                     |
| Spryker Core Back Office                | {{page.version}} | [Install the Spryker Core Back Office feature](/docs/scos/dev/feature-integration-guides/{{page.version}}/install-the-spryker-core-back-office-feature.html)                        |

## 1) Install the required modules

1. Install the required modules using Composer:

```bash
composer require spryker-feature/warehouse-picking: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                           | EXPECTED DIRECTORY                                  |
|----------------------------------|-----------------------------------------------------|
| PickingList                      | vendor/spryker/picking-list                         |
| PickingListExtension             | vendor/spryker/picking-list-extension               |
| PickingListPushNotification      | vendor/spryker/picking-list-push-notification       |
| PickingListsBackendApi           | vendor/spryker/picking-lists-backend-api            |
| PickingListsBackendApiExtension  | vendor/spryker/picking-lists-backend-api-extension  |
| PickingListsUsersBackendApi      | vendor/spryker/picking-lists-users-backend-api      |
| PickingListsWarehousesBackendApi | vendor/spryker/picking-lists-warehouses-backend-api |

2. Optional: To install the demo multi-shipment picking strategy, install the module:

```bash
composer require spryker/picking-list-multi-shipment-picking-strategy-example: "^0.1.0" --update-with-dependencies
```

Make sure the following module has been installed:

| MODULE                                         | EXPECTED DIRECTORY                                                  |
|------------------------------------------------|---------------------------------------------------------------------|
| PickingListMultiShipmentPickingStrategyExample | vendor/spryker/picking-list-multi-shipment-picking-strategy-example |

{% endinfo_block %}

## 2) Set up database schema and transfer objects

Apply the database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied by checking your database:

| DATABASE ENTITY                 | TYPE   | EVENT   |
|---------------------------------|--------|---------|
| spy_picking_list                | table  | created |
| spy_picking_list_item           | table  | created |
| spy_sales_order_item.uuid       | column | created |
| spy_stock.picking_list_strategy | column | created |

Make sure the following changes have been triggered in transfer objects:

| TRANSFER                                       | TYPE     | EVENT   | PATH                                                                          |
|------------------------------------------------|----------|---------|-------------------------------------------------------------------------------|
| PickingListCriteria                            | class    | created | src/Generated/Shared/Transfer/PickingListCriteriaTransfer                     |
| PickingListConditions                          | class    | created | src/Generated/Shared/Transfer/PickingListConditionsTransfer                   |
| PickingListCollection                          | class    | created | src/Generated/Shared/Transfer/PickingListCollectionTransfer                   |
| PickingList                                    | class    | created | src/Generated/Shared/Transfer/PickingListTransfer                             |
| PickingListItemCriteria                        | class    | created | src/Generated/Shared/Transfer/PickingListItemCriteriaTransfer                 |
| PickingListItemConditions                      | class    | created | src/Generated/Shared/Transfer/PickingListItemConditionsTransfer               |
| PickingListItemCollection                      | class    | created | src/Generated/Shared/Transfer/PickingListItemCollectionTransfer               |
| PickingListItem                                | class    | created | src/Generated/Shared/Transfer/PickingListItemTransfer                         |
| PickingListCollectionRequest                   | class    | created | src/Generated/Shared/Transfer/PickingListCollectionRequestTransfer            |
| PickingListCollectionResponse                  | class    | created | src/Generated/Shared/Transfer/PickingListCollectionResponseTransfer           |
| GeneratePickingListsRequest                    | class    | created | src/Generated/Shared/Transfer/GeneratePickingListsRequestTransfer             |
| PickingListOrderItemGroup                      | class    | created | src/Generated/Shared/Transfer/PickingListOrderItemGroupTransfer               |
| PickingListGenerationFinishedRequest           | class    | created | src/Generated/Shared/Transfer/PickingListGenerationFinishedRequestTransfer    |
| PickingListGenerationFinishedResponse          | class    | created | src/Generated/Shared/Transfer/PickingListGenerationFinishedResponseTransfer   |
| PickingStartedRequest                          | class    | created | src/Generated/Shared/Transfer/PickingStartedRequestTransfer                   |
| PickingStartedResponse                         | class    | created | src/Generated/Shared/Transfer/PickingStartedResponseTransfer                  |
| PickingFinishedRequest                         | class    | created | src/Generated/Shared/Transfer/PickingFinishedRequestTransfer                  |
| PickingFinishedResponse                        | class    | created | src/Generated/Shared/Transfer/PickingFinishedResponseTransfer                 |
| StockCollection                                | class    | created | src/Generated/Shared/Transfer/StockCollectionTransferTransfer                 |
| StockConditions                                | class    | created | src/Generated/Shared/Transfer/StockConditionsTransferTransfer                 |
| PickingListsRequestBackendApiAttributes        | class    | created | src/Generated/Shared/Transfer/PickingListsRequestBackendApiAttributesTransfer |
| PickingListsBackendApiAttributes               | class    | created | src/Generated/Shared/Transfer/PickingListsBackendApiAttributesTransfer        |
| PickingListItemsBackendApiAttributes           | class    | created | src/Generated/Shared/Transfer/PickingListItemsBackendApiAttributesTransfer    |
| OrderItemsBackendApiAttributes                 | class    | created | src/Generated/Shared/Transfer/OrderItemsBackendApiAttributesTransfer          |
| UsersBackendApiAttributes                      | class    | created | src/Generated/Shared/Transfer/UsersBackendApiAttributesTransfer               |
| UserResourceCollection                         | class    | created | src/Generated/Shared/Transfer/UserResourceCollectionTransfer                  |
| WarehousesBackendApiAttributes                 | class    | created | src/Generated/Shared/Transfer/WarehousesBackendApiAttributesTransfer          |
| WarehouseResourceCollection                    | class    | created | src/Generated/Shared/Transfer/WarehouseResourceCollectionTransfer             |
| Item.uuid                                      | property | created | src/Generated/Shared/Transfer/ItemTransfer                                    |
| User.uuid                                      | property | created | src/Generated/Shared/Transfer/UserTransfer                                    |
| Stock.pickingListStrategy                      | property | created | src/Generated/Shared/Transfer/StockTransfer                                   |
| PushNotificationCollectionRequest.pickingLists | property | created | src/Generated/Shared/Transfer/PushNotificationCollectionRequestTransfer       |

{% endinfo_block %}

## 3) Set up configuration

1. To make the `picking-lists` and `picking-list-items` resources protected, adjust the protected paths' configuration:

**src/Pyz/Shared/GlueBackendApiApplicationAuthorizationConnector/GlueBackendApiApplicationAuthorizationConnectorConfig.php**

```php
<?php

namespace Pyz\Shared\GlueBackendApiApplicationAuthorizationConnector;

use Spryker\Shared\GlueBackendApiApplicationAuthorizationConnector\GlueBackendApiApplicationAuthorizationConnectorConfig as SprykerGlueBackendApiApplicationAuthorizationConnectorConfig;

class GlueBackendApiApplicationAuthorizationConnectorConfig extends SprykerGlueBackendApiApplicationAuthorizationConnectorConfig
{
    /**
     * @return array<string, mixed>
     */
    public function getProtectedPaths(): array
    {
        return [
            '/\/picking-lists.*/' => [
                'isRegularExpression' => true,
                'methods' => [
                    'patch',
                ],
            ],
        ];
    }
}
```

2. To configure OMS, add the `DummyPicking` subprocess that describes the warehouse picking in the system.

**config/Zed/oms/DummySubprocess/DummyPicking.xml**

```xml
<?xml version="1.0"?>
<statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd"
>

   <process name="DummyPicking">
      <states>
         <state name="picking list generation scheduled" display="oms.state.confirmed"/>
         <state name="picking list generation started" display="oms.state.confirmed"/>
         <state name="ready for picking" display="oms.state.confirmed"/>
         <state name="picking started" display="oms.state.confirmed"/>
         <state name="picking finished" display="oms.state.confirmed"/>
      </states>

      <transitions>
         <transition happy="true">
            <source>picking list generation scheduled</source>
            <target>picking list generation started</target>
            <event>generate picking lists</event>
         </transition>

         <transition happy="true" condition="PickingList/isPickingListGenerationFinished">
            <source>picking list generation started</source>
            <target>ready for picking</target>
            <event>prepare for picking</event>
         </transition>

         <transition happy="true" condition="PickingList/isPickingStarted">
            <source>ready for picking</source>
            <target>picking started</target>
            <event>start picking</event>
         </transition>

         <transition happy="true" condition="PickingList/isPickingFinished">
            <source>picking started</source>
            <target>picking finished</target>
            <event>finish picking</event>
         </transition>
      </transitions>

      <events>
         <event name="picking list generation schedule" manual="true"/>
         <event name="generate picking lists" onEnter="true" command="PickingList/GeneratePickingLists"/>
         <event name="prepare for picking" timeout="1 second" manual="true"/>
         <event name="start picking" timeout="1 second" manual="true"/>
         <event name="finish picking" timeout="1 second" manual="true"/>
      </events>
   </process>
</statemachine>
```

3. Add the `DummyPicking` subprocess to the `DummyPayment01` process as an example. Consider OMS configuration using the `DummyPayment01` process as an example.

<details><summary markdown='span'>config/Zed/oms/DummyPayment01.xml</summary>

```xml
<?xml version="1.0"?>
<statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd"
>

    <process name="DummyPayment01" main="true">
        <subprocesses>
            <process>DummyPicking</process> <!-- Registering the subprocess. -->
        </subprocesses>

        <transitions>
            <!-- We will find the following transition and substitute it with the provided below. -->
            <!--            <transition happy="true">-->
            <!--                <source>waiting</source>-->
            <!--                <target>exported</target>-->
            <!--                <event>check giftcard purchase</event>-->
            <!--            </transition>-->
            <!-- / -->

            <transition happy="true">
                <source>waiting</source>
                <target>picking list generation scheduled</target>
                <event>picking list generation schedule</event>
            </transition>

            <transition happy="true">
                <source>picking finished</source>
                <target>exported</target>
                <event>finish picking</event>
            </transition>

        </transitions>

    </process>

    <process name="DummyPicking"
            file="DummySubprocess/DummyPicking01.xml"/> <!-- Include the subprocess file to be loaded by the state machine. -->

</statemachine>
```
</details>

{% info_block warningBox "Verification" %}

1. In the Back Office, go to **Administration&nbsp;<span aria-label="and then">></span> OMS**.
2. Click the `DummyPayment01` process.
    Make sure the OMS transition diagram shows the transition from `waiting` to `picking list generation scheduled` and from `picking finished` to `exported`.

{% endinfo_block %}

4. Configure the Push Notification provider:

**src/Pyz/Zed/PickingListPushNotification/PickingListPushNotificationConfig.php**

```php
<?php

namespace Pyz\Zed\PickingListPushNotification;

use Spryker\Zed\PickingListPushNotification\PickingListPushNotificationConfig as SprykerPickingListPushNotificationConfig;

class PickingListPushNotificationConfig extends SprykerPickingListPushNotificationConfig
{
    /**
     * @uses \Spryker\Zed\PushNotificationWebPushPhp\PushNotificationWebPushPhpConfig::WEB_PUSH_PHP_PROVIDER_NAME
     *
     * @var string
     */
    protected const PUSH_NOTIFICATION_PROVIDER_NAME = 'web-push-php';

    /**
     * @return string
     */
    public function getPushNotificationProviderName(): string
    {
        return static::PUSH_NOTIFICATION_PROVIDER_NAME;
    }
}
```

## 4) Import warehouse picking list strategies

1. Prepare your data according to your requirements using our demo data:

* Base shop:
**data/import/common/common/warehouse.csv**
```csv
name,is_active,picking_list_strategy
Warehouse1,1,multi-shipment
Warehouse2,1,multi-shipment
Warehouse3,0,multi-shipment
```

* Marketplace:

**data/import/common/common/marketplace/warehouse.csv**
```csv
name,is_active,picking_list_strategy
Warehouse1,1,multi-shipment
Warehouse2,1,multi-shipment
Warehouse3,0,multi-shipment
Spryker MER000001 Warehouse 1,1,multi-shipment
Video King MER000002 Warehouse 1,1,multi-shipment
Budget Cameras MER000005 Warehouse 1,1,multi-shipment
Sony Experts MER000006 Warehouse 1,1,multi-shipment
```

| COLUMN                | REQUIRED | DATA TYPE | DATA EXAMPLE   | DATA EXPLANATION                                                     |
|-----------------------|-----------|-----------|----------------|----------------------------------------------------------------------|
| name                  | ✓ | string    | Warehouse1     | Name of the warehouse.                                               |
| is_active             | ✓ | bool      | 1              | Defines if the warehouse is active.                                  |
| picking_list_strategy | optional  | string    | multi-shipment | Defines the picking generation strategy used for the given warehouse |

2. Import data:

```bash
console data:import stock
```

{% info_block warningBox “Verification” %}

Make sure the defined picking list strategies have been imported to the `spy_stock` database table.

{% endinfo_block %}

## 4) Add translations

1. Append glossary according to your configuration:

```csv
picking_list.validation.wrong_request_body,Wrong request body.,en_US
picking_list.validation.wrong_request_body,Falscher Anforderungstext.,de_DE
picking_list.validation.picked_by_another_user,Picklist is already being picked by another user.,en_US
picking_list.validation.picked_by_another_user,Die Kommisionierliste wird bereits von einem anderen Nutzer bearbeitet.,de_DE
picking_list.validation.picking_list_entity_not_found,The picking list entity was not found.,en_US
picking_list.validation.picking_list_entity_not_found,Picking List Entität wurde nicht gefunden.,de_DE
picking_list.validation.picking_list_item_entity_not_found,The picking list item entity was not found.,en_US
picking_list.validation.picking_list_item_entity_not_found,Picking List Item Entität wurde nicht gefunden.,de_DE
picking_list.validation.only_full_quantity_picking_allowed,You can pick items only in full quantity.,en_US
picking_list.validation.only_full_quantity_picking_allowed,Sie können Produkte nur in der gesamten Menge sammeln.,de_DE
picking_list.validation.incorrect_quantity,Incorrect quantity.,en_US
picking_list.validation.incorrect_quantity,Falsche Menge.,de_DE
picking_list.validation.wrong_property_picking_list_item_quantity,Wrong pickingListItem.quantity property.,en_US
picking_list.validation.wrong_property_picking_list_item_quantity,Falsche pickingListItem.quantity eigenschaft.,de_DE
picking_list.validation.wrong_property_picking_list_item_number_of_picked,Wrong pickingListItem.numberOfPicked property.,en_US
picking_list.validation.wrong_property_picking_list_item_number_of_picked,Falsche pickingListItem.numberOfPicked eigenschaft.,de_DE
picking_list.validation.wrong_property_picking_list_item_number_of_not_picked,Wrong pickingListItem.numberOfNotPicked property.,en_US
picking_list.validation.wrong_property_picking_list_item_number_of_not_picked,Falsche pickingListItem.numberOfNotPicked eigenschaft.,de_DE
picking_list.validation.picking_list.validation.picking_list_duplicated,PickingList duplicated.,en_US
picking_list.validation.picking_list.validation.picking_list_duplicated,PickingList dupliziert.,de_DE
picking_list.validation.picking_list.validation.picking_list_item_duplicated,PickingListItem duplicated.,en_US
picking_list.validation.picking_list.validation.picking_list_item_duplicated,PickingListItem dupliziert.,de_DE
picking_list_push_notification.validation.warehouse_entity_not_found,Warehouse not found.,en_US
picking_list_push_notification.validation.warehouse_entity_not_found,Lager nicht gefunden.,de_DE
```

2. Import data:

```bash
console data:import glossary
```

## 5) Set up behavior

1. Enable the following behaviors by registering the plugins:

| PLUGIN                                                   | SPECIFICATION                                                                        | PREREQUISITES | NAMESPACE                                                                     |
|----------------------------------------------------------|--------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------------------|
| GeneratePickingListsCommandByOrderPlugin                 | Generates picking lists based on a warehouse strategy.                             |               | Spryker\Zed\PickingList\Communication\Plugin\Oms                              |
| IsPickingFinishedConditionPlugin                         | Checks if all picking lists are finished for a given sales order.                  |               | Spryker\Zed\PickingList\Communication\Plugin\Oms                              |
| IsPickingListGenerationFinishedConditionPlugin           | Checks if picking lists generation is finished for a given sales order.            |               | Spryker\Zed\PickingList\Communication\Plugin\Oms                              |
| IsPickingStartedConditionPlugin                          | Checks if picking of at least one picking list is started for a given sales order. |               | Spryker\Zed\PickingList\Communication\Plugin\Oms                              |
| UnassignPickingListUserPostSavePlugin                    | Removes a user assignment from picking lists.                                          |               | Spryker\Zed\PickingList\Communication\Plugin\User                             |
| PushNotificationPickingListPostCreatePlugin              | Creates a push notification after creating a picking list.                           |               | Spryker\Zed\PickingListPushNotification\Communication\Plugin\PickingList      |
| PushNotificationPickingListPostUpdatePlugin              | Creates a push notification after updating a picking list.                           |               | Spryker\Zed\PickingListPushNotification\Communication\Plugin\PickingList      |
| WarehouseUserPushNotificationSubscriptionValidatorPlugin | Validates whether a user has a warehouse assignment.                               |               | Spryker\Zed\PickingListPushNotification\Communication\Plugin\PushNotification |

<details open><summary markdown='span'>src/Pyz/Zed/Oms/OmsDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Oms;

use Spryker\Zed\Oms\OmsDependencyProvider as SprykerOmsDependencyProvider;
use Spryker\Zed\PickingList\Communication\Plugin\Oms\GeneratePickingListsCommandByOrderPlugin;
use Spryker\Zed\PickingList\Communication\Plugin\Oms\IsPickingFinishedConditionPlugin;
use Spryker\Zed\PickingList\Communication\Plugin\Oms\IsPickingListGenerationFinishedConditionPlugin;
use Spryker\Zed\PickingList\Communication\Plugin\Oms\IsPickingStartedConditionPlugin;

class OmsDependencyProvider extends SprykerOmsDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendCommandPlugins(Container $container): Container
    {
        $container->extend(self::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
            $commandCollection->add(new GeneratePickingListsCommandByOrderPlugin(), 'PickingList/GeneratePickingLists');

            return $commandCollection;
        });

        return $container;
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendConditionPlugins(Container $container): Container
    {
        $container->extend(self::CONDITION_PLUGINS, function (ConditionCollectionInterface $conditionCollection) {
            $conditionCollection->add(new IsPickingListGenerationFinishedConditionPlugin(), 'PickingList/isPickingListGenerationFinished');
            $conditionCollection->add(new IsPickingStartedConditionPlugin(), 'PickingList/isPickingStarted');
            $conditionCollection->add(new IsPickingFinishedConditionPlugin(), 'PickingList/isPickingFinished');

            return $conditionCollection;
        });

        return $container;
    }
}
```
</details>

**src/Pyz/Zed/PickingList/PickingListDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\PickingList;

use Spryker\Zed\PickingList\PickingListDependencyProvider as SprykerPickingListDependencyProvider;
use Spryker\Zed\PickingListPushNotification\Communication\Plugin\PickingList\PushNotificationPickingListPostCreatePlugin;
use Spryker\Zed\PickingListPushNotification\Communication\Plugin\PickingList\PushNotificationPickingListPostUpdatePlugin;

class PickingListDependencyProvider extends SprykerPickingListDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\PickingListExtension\Dependency\Plugin\PickingListPostCreatePluginInterface>
     */
    protected function getPickingListPostCreatePlugins(): array
    {
        return [
            new PushNotificationPickingListPostCreatePlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\PickingListExtension\Dependency\Plugin\PickingListPostUpdatePluginInterface>
     */
    protected function getPickingListPostUpdatePlugins(): array
    {
        return [
            new PushNotificationPickingListPostUpdatePlugin(),
        ];
    }
}
```

**src/Pyz/Zed/PushNotification/PushNotificationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\PushNotification;

use Spryker\Zed\PickingListPushNotification\Communication\Plugin\PushNotification\WarehouseUserPushNotificationSubscriptionValidatorPlugin;
use Spryker\Zed\PushNotification\PushNotificationDependencyProvider as SprykerPushNotificationDependencyProvider;

class PushNotificationDependencyProvider extends SprykerPushNotificationDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\PushNotificationExtension\Dependency\Plugin\PushNotificationSubscriptionValidatorPluginInterface>
     */
    protected function getPushNotificationSubscriptionValidatorPlugins(): array
    {
        return [
            new WarehouseUserPushNotificationSubscriptionValidatorPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/User/UserDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\User;

use Spryker\Zed\PickingList\Communication\Plugin\User\UnassignPickingListUserPostSavePlugin;
use Spryker\Zed\User\UserDependencyProvider as SprykerUserDependencyProvider;

class UserDependencyProvider extends SprykerUserDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\UserExtension\Dependency\Plugin\UserPostSavePluginInterface>
     */
    protected function getPostSavePlugins(): array
    {
        return [
            new UnassignPickingListUserPostSavePlugin(),
        ];
    }
}
```

2. If you've installed the demo picking strategy module in [Install the required modules](#install-the-required-modules), enable the demo multi-shipment picking strategy plugin:

| PLUGIN                                          | SPECIFICATION                                            | PREREQUISITES | NAMESPACE                                                                                   |
|-------------------------------------------------|----------------------------------------------------------|---------------|---------------------------------------------------------------------------------------------|
| MultiShipmentPickingListGeneratorStrategyPlugin | Generates picking lists based on a warehouse strategy. |               | Spryker\Zed\PickingListMultiShipmentPickingStrategyExample\Communication\Plugin\PickingList |

**src/Pyz/Zed/PickingList/PickingListDependencyProvider.php**

```php
<?php


namespace Pyz\Zed\PickingList;

use Spryker\Zed\PickingListMultiShipmentPickingStrategyExample\Communication\Plugin\PickingList\MultiShipmentPickingListGeneratorStrategyPlugin;
use Spryker\Zed\PickingList\PickingListDependencyProvider as SprykerPickingListDependencyProvider;

class PickingListDependencyProvider extends SprykerPickingListDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\PickingListExtension\Dependency\Plugin\PickingListGeneratorStrategyPluginInterface>
     */
    protected function getPickingListGeneratorStrategyPlugins(): array
    {
        return [
            new MultiShipmentPickingListGeneratorStrategyPlugin(),
        ];
    }
}
```

3. To enable the Backend API, register these plugins:

| PLUGIN                                                          | SPECIFICATION                                                                      | PREREQUISITES | NAMESPACE                                                                                                    |
|-----------------------------------------------------------------|------------------------------------------------------------------------------------|---------------|--------------------------------------------------------------------------------------------------------------|
| PickingListsBackendResourcePlugin                               | Registers the `picking-lists` resource.                                            |               | Spryker\Glue\PickingListsBackendApi\Plugin\GlueBackendApiApplication                                         |
| PickingListStartPickingBackendResourcePlugin                    | Registers the `picking-lists` and `start-picking` resources.                  |               | Spryker\Glue\PickingListsBackendApi\Plugin\GlueBackendApiApplication                                         |
| PickingListItemsBackendResourcePlugin                           | Registers the `picking-list-items` resource.                                       |               | Spryker\Glue\PickingListsBackendApi\Plugin\GlueBackendApiApplication                                         |
| PickingListItemsByPickingListsBackendResourceRelationshipPlugin | Adds the `picking-list-items` resource as a relationship to the `picking-lists` resource. |               | Spryker\Glue\PickingListsBackendApi\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector           |
| UsersByPickingListsBackendResourceRelationshipPlugin            | Adds the `users` resource as a relationship to the `picking-lists` resource.             |               | Spryker\Glue\PickingListsUsersBackendApi\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector      |
| WarehousesByPickingListsBackendResourceRelationshipPlugin       | Adds the `warehouses` resource as a relationship to the `picking-lists` resource.       |               | Spryker\Glue\PickingListsWarehousesBackendApi\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector |

**src/Pyz/Glue/GlueBackendApiApplication/GlueBackendApiApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplication;

use Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider as SprykerGlueBackendApiApplicationDependencyProvider;
use Spryker\Glue\PickingListsBackendApi\Plugin\GlueBackendApiApplication\PickingListStartPickingBackendResourcePlugin;
use Spryker\Glue\PickingListsBackendApi\Plugin\GlueBackendApiApplication\PickingListsBackendResourcePlugin;
use Spryker\Glue\PickingListsBackendApi\Plugin\GlueBackendApiApplication\PickingListItemsBackendResourcePlugin;

class GlueBackendApiApplicationDependencyProvider extends SprykerGlueBackendApiApplicationDependencyProvider
{
    /**
     * @return list<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceInterface>
     */
    protected function getResourcePlugins(): array
    {
        return [
            new PickingListsBackendResourcePlugin(),
            new PickingListStartPickingBackendResourcePlugin(),
            new PickingListItemsBackendResourcePlugin()
        ];
    }
}
```

**src/Pyz/Glue/GlueBackendApiApplicationGlueJsonApiConventionConnector/GlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplicationGlueJsonApiConventionConnector;

use Spryker\Glue\GlueBackendApiApplicationGlueJsonApiConventionConnector\GlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider as SprykerGlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider;
use Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\PickingListsBackendApi\PickingListsBackendApiConfig;
use Spryker\Glue\PickingListsBackendApi\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector\PickingListItemsByPickingListsBackendResourceRelationshipPlugin;
use Spryker\Glue\PickingListsUsersBackendApi\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector\UsersByPickingListsBackendResourceRelationshipPlugin;
use Spryker\Glue\PickingListsWarehousesBackendApi\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector\WarehousesByPickingListsBackendResourceRelationshipPlugin;

class GlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider extends SprykerGlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider
{
    /**
     * @param \Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
     *
     * @return \Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
     */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection,
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            PickingListsBackendApiConfig::RESOURCE_PICKING_LISTS,
            new PickingListItemsByPickingListsBackendResourceRelationshipPlugin(),
        );

        $resourceRelationshipCollection->addRelationship(
            PickingListsBackendApiConfig::RESOURCE_PICKING_LISTS,
            new UsersByPickingListsBackendResourceRelationshipPlugin(),
        );

        $resourceRelationshipCollection->addRelationship(
            PickingListsBackendApiConfig::RESOURCE_PICKING_LISTS,
            new WarehousesByPickingListsBackendResourceRelationshipPlugin(),
        );

        return $resourceRelationshipCollection;
    }
}
```

{% info_block warningBox "Verification" %}

As a prerequisite, do the following:

1. [Assign a warehouse to a warhouse user](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/assign-and-deassign-warehouses-from-warehouse-users.html).
2. Place an order with a product that has the highest stock in the warehouse you've assigned the user to.
3. Obtain the access token of the warehouse user.
4. Use the warehouse user access token as the request header `Authorization: Bearer {{YOUR_ACCESS_TOKEN}}`.

Make sure that you can send the following requests:

* To get a collection of available picking lists for a warehouse user, send the request: `GET https://glue-backend.mysprykershop.com/picking-lists`.

* To get a collection of available picking lists with picking list items for a warehouse user, send the request: `GET https://glue-backend.mysprykershop.com/picking-lists?include=picking-list-items`.

* To get a collection of available picking lists with included users resources for a warehouse user, send the request: `GET https://glue-backend.mysprykershop.com/picking-lists?include=users`.

* To get a collection of available picking lists with included warehouses resources for a warehouse user, send the request: `GET https://glue-backend.mysprykershop.com/picking-lists?include=warehouses`.

* To get a single picking list for a warehouse user, send the request: `GET https://glue-backend.mysprykershop.com/picking-lists/{% raw %}{{{% endraw %}picking-list-uuid{% raw %}}{{% endraw %}`.

* To start a pick-up operation for a warehouse user, send the request: `PATCH https://glue-backend.mysprykershop.com/picking-lists/{% raw %}{{{% endraw %}picking-list-uuid{% raw %}}{{% endraw %}/start-picking`

* To get a collection of the picking list items for a particular picking list, send the request: `GET https://glue-backend.mysprykershop.com/picking-lists/{% raw %}{{{% endraw %}picking-list-uuid{% raw %}}{{% endraw %}/picking-list-items`.

* To get a single picking list item for a particular picking list, send the request: `GET https://glue-backend.mysprykershop.com/picking-lists/{% raw %}{{{% endraw %}picking-list-uuid{% raw %}}{{% endraw %}/picking-list-items/{% raw %}{{{% endraw %}picking-list-item-uuid{% raw %}{{{% endraw %}`.

* To pick the picking list items, send the following request. The endpoint works in a bulk mode:

`PATCH https://glue-backend.mysprykershop.com/picking-lists/{% raw %}{{{% endraw %}picking-list-uuid{% raw %}}{{% endraw %}/picking-list-items/{% raw %}{{{% endraw %}picking-list-item-uuid{% raw %}{{{% endraw %}`

```json
{
  "data": [
    {
      "id": "{{picking-list-item-uuid1}}",
      "type": "picking-list-items",
      "attributes": {
        "numberOfPicked": "{{number of picked}}",
        "numberOfNotPicked": "{{number of not picked}}"
      }
    },
    {
      "id": "{{picking-list-item-uuid2}}",
      "type": "picking-list-items",
      "attributes": {
        "numberOfPicked": "{{number of picked}}",
        "numberOfNotPicked": "{{number of not picked}}"
      }
    }
  ]
}
```

Make sure that push notification generation work for the picking list feature:

1. Make an order with a products from the warehouse with `multi-shipment` picking strategy.
2. Log to the Back Office and navigate to **Sales&nbsp;<span aria-label="and then">></span> Orders&nbsp;**. The **Orders** page opens.
3. Select your order and click the **View** button.
4. Wait until the order item status became **Ready for picking**.
5. Check the `spy_push_notification` database table to ensure that a push notification has been created.

{% endinfo_block %}
