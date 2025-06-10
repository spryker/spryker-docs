


This document describes how to install the Warehouse picking feature.

## Prerequisites

Install the required features:

| NAME                                    | VERSION          | INSTALLATION GUIDE                                                                                                                                                                  |
|-----------------------------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Warehouse User Management               | {{page.version}} | [Install the Warehouse User Management feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/install-and-upgrade/install-the-warehouse-user-management-feature.html)                     |
| Order Management     | {{site.version}} | [Install the Order Management feature](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html) |
| Inventory Management | {{site.version}} | [Install the Inventory Management feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-inventory-management-feature.html) |
| Shipment                                | {{page.version}} | [Install the Shipment feature](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-shipment-feature.html)                                                       |
| Push Notification                       | {{page.version}} | [Install the Push Notification feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-push-notification-feature.html)                                     |
| Spryker Core Back Office                | {{page.version}} | [Install the Spryker Core Back Office feature](/docs/pbc/all/identity-access-management/{{page.version}}/install-and-upgrade/install-the-spryker-core-back-office-feature.html)                        |

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


{% endinfo_block %}


2. Optional: To install the [demo multi-shipment picking strategy](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/warehouse-picking-feature-overview.html#example-of-a-picklist-generation-strategy), install the module:

```bash
composer require spryker/picking-list-multi-shipment-picking-strategy-example: "^0.2.1" --update-with-dependencies
```

{% info_block warningBox "Verification" %}


Make sure the following module has been installed:

| MODULE                                         | EXPECTED DIRECTORY                                                  |
|------------------------------------------------|---------------------------------------------------------------------|
| PickingListMultiShipmentPickingStrategyExample | vendor/spryker/picking-list-multi-shipment-picking-strategy-example |


{% endinfo_block %}


3. Optional: To install early access [OAuth authorization](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/warehouse-picking-feature-overview.html#fulfillment-app-oauth), install the module:

```bash
composer require spryker-eco/authorization-picking-app-backend-api: "^0.2.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following module has been installed:

| MODULE                            | EXPECTED DIRECTORY                                       |
|-----------------------------------|----------------------------------------------------------|
| AuthorizationPickingAppBackendApi | vendor/spryker-eco/authorization-picking-app-backend-api |
| OauthCodeFlow                     | vendor/spryker/oauth-code-flow                           |

{% endinfo_block %}

## 2) Set up database schema and transfer objects

1. Apply the database changes and generate entity and transfer changes:

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



Optional: If you've installed the early access OAuth authorization, make sure the following changes have been applied by checking your database:

| DATABASE ENTITY               | TYPE  | EVENT   |
|-------------------------------|-------|---------|
| spy_oauth_code_flow_auth_code | table | created |


Optional: If you've installed the early access OAuth authorization, make sure the following changes have been triggered in transfer objects:

| TRANSFER                               | TYPE     | EVENT   | PATH                                                     |
|----------------------------------------|----------|---------|----------------------------------------------------------|
| OauthRequest.responseType              | property | created | src/Generated/Shared/Transfer/OauthRequestTransfer       |
| OauthRequest.redirectUri               | property | created | src/Generated/Shared/Transfer/OauthRequestTransfer       |
| OauthRequest.state                     | property | created | src/Generated/Shared/Transfer/OauthRequestTransfer       |
| OauthRequest.code                      | property | created | src/Generated/Shared/Transfer/OauthRequestTransfer       |
| OauthRequest.codeChallenge             | property | created | src/Generated/Shared/Transfer/AuthCodeAttributesTransfer |
| OauthRequest.codeChallengeMethod       | property | created | src/Generated/Shared/Transfer/OauthRequestTransfer       |
| OauthRequest.codeVerifier              | property | created | src/Generated/Shared/Transfer/OauthRequestTransfer       |
| OauthResponse.state                    | property | created | src/Generated/Shared/Transfer/OauthResponseTransfer      |
| OauthResponse.code                     | property | created | src/Generated/Shared/Transfer/OauthResponseTransfer      |
| ApiTokenAttributes.code                | property | created | src/Generated/Shared/Transfer/ApiTokenAttributesTransfer |
| ApiTokenAttributes.clientId            | property | created | src/Generated/Shared/Transfer/ApiTokenAttributesTransfer |
| ApiTokenAttributes.redirectUri         | property | created | src/Generated/Shared/Transfer/ApiTokenAttributesTransfer |
| ApiTokenAttributes.codeVerifier        | property | created | src/Generated/Shared/Transfer/ApiTokenAttributesTransfer |
| AuthCodeAttributes.username            | property | created | src/Generated/Shared/Transfer/AuthCodeAttributesTransfer |
| AuthCodeAttributes.password            | property | created | src/Generated/Shared/Transfer/AuthCodeAttributesTransfer |
| AuthCodeAttributes.responseType        | property | created | src/Generated/Shared/Transfer/AuthCodeAttributesTransfer |
| AuthCodeAttributes.clientId            | property | created | src/Generated/Shared/Transfer/AuthCodeAttributesTransfer |
| AuthCodeAttributes.scope               | property | created | src/Generated/Shared/Transfer/AuthCodeAttributesTransfer |
| AuthCodeAttributes.redirectUri         | property | created | src/Generated/Shared/Transfer/AuthCodeAttributesTransfer |
| AuthCodeAttributes.state               | property | created | src/Generated/Shared/Transfer/AuthCodeAttributesTransfer |
| AuthCodeAttributes.codeChallenge       | property | created | src/Generated/Shared/Transfer/AuthCodeAttributesTransfer |
| AuthCodeAttributes.codeChallengeMethod | property | created | src/Generated/Shared/Transfer/AuthCodeAttributesTransfer |
| AuthCode.identifier                    | property | created | src/Generated/Shared/Transfer/AuthCodeTransfer           |
| AuthCode.expiresAt                     | property | created | src/Generated/Shared/Transfer/AuthCodeTransfer           |

{% endinfo_block %}


## 3) Set up configuration

Set up the following configuration.

### Configure Glue API resources

To make the `picking-lists` and `picking-list-items` resources protected, adjust the protected paths' configuration:

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

### Configure OMS

1. Add the `DummyPicking` subprocess that describes the warehouse picking in the system.

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

2. Add the `DummyPicking` subprocess to the `DummyPayment01` process as an example. Consider OMS configuration using the `DummyPayment01` process as an example.

<details><summary>config/Zed/oms/DummyPayment01.xml</summary>

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
3. Make sure the OMS transition diagram shows the transition from `waiting` to `picking list generation scheduled` and from `picking finished` to `exported`.

{% endinfo_block %}

### Configure the push notification provider

Add the configuration:

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

### Optional: Configure the OAuth client

If you've installed the early access OAuth authorization, configure the OAuth client as follows:

1. Configure the value of the `SPRYKER_OAUTH_CLIENT_CONFIGURATION` environment variable that represents the OAuth client configuration:

```json
[
  {
    "identifier": "the-client-identifier-of-your-app",
    "secret": "frontend-secret",
    "isConfidential": true,
    "name": "Name of your app",
    "redirectUri": "https://my-app.com",
    "isDefault": true
  }
]
```

For security reasons, we recommended using a different OAuth client for each application. By application, we mean a separate application that uses the same OAuth server.

2. Set up the OAuth client:

```bash
console setup:init-db
```

{% info_block warningBox "Verification" %}

To verify the OAuth client exists in the database, run the following SQL query:

```sql
SELECT * FROM spy_oauth_client WHERE identifier = 'the-client-identifier-of-your-app';
```

  Make sure the output contains one record and the redirect URI is not empty. If the record doesn't exist, create it.

{% endinfo_block %}

## 4) Import warehouse picking list strategies

1. Prepare your data according to your requirements using our demo data:

- Base shop:
**data/import/common/common/warehouse.csv**

```csv
name,is_active,picking_list_strategy
Warehouse1,1,multi-shipment
Warehouse2,1,multi-shipment
Warehouse3,0,multi-shipment
```

- Marketplace:

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

{% info_block warningBox "Verification" %}

Make sure the defined picking list strategies have been imported to the `spy_stock` database table.

{% endinfo_block %}

## 5) Add translations

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

## 6) Set up behavior

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

<details><summary>src/Pyz/Zed/Oms/OmsDependencyProvider.php</summary>

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

### Optional: Set up the multi-shipment picking strategy

If you've installed the demo picking strategy, enable the demo multi-shipment picking strategy plugin:

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

### Optional: Set up the OAuth authorization

If you've installed the OAuth authorization, enable the following plugins:

| PLUGIN                                                       | SPECIFICATION                                                                                             | PREREQUISITES | NAMESPACE                                                                |
|--------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|---------------|--------------------------------------------------------------------------|
| AuthorizeResource                                            | Registers the OAuth `authorize` resource.                                                                 |               | SprykerEco\Glue\AuthorizationPickingAppBackendApi\Plugin\GlueApplication |
| UserAuthCodeOauthRequestGrantTypeConfigurationProviderPlugin | Builds `OauthGrantTypeConfigurationTransfer` from the configuration of `AuthorizationCode` grant type data. |               | Spryker\Zed\OauthCodeFlow\Communication\Plugin\Oauth                     |

**src/Pyz/Glue/GlueBackendApiApplication/GlueBackendApiApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplication;

use Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider as SprykerGlueBackendApiApplicationDependencyProvider;
use SprykerEco\Glue\AuthorizationPickingAppBackendApi\Plugin\GlueApplication\AuthorizeResource;

class GlueBackendApiApplicationDependencyProvider extends SprykerGlueBackendApiApplicationDependencyProvider
{   
    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceInterface>
     */
    protected function getResourcePlugins(): array
    {
        return [
            new AuthorizeResource(),
        ];
    }
}
```

**src/Pyz/Zed/Oauth/OauthDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Oauth;

use Spryker\Zed\OauthCodeFlow\Communication\Plugin\Oauth\UserAuthCodeOauthRequestGrantTypeConfigurationProviderPlugin;
use Spryker\Zed\Oauth\OauthDependencyProvider as SprykerOauthDependencyProvider;

class OauthDependencyProvider extends SprykerOauthDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\OauthExtension\Dependency\Plugin\OauthRequestGrantTypeConfigurationProviderPluginInterface>
     */
    protected function getOauthRequestGrantTypeConfigurationProviderPlugins(): array
    {
        return [
            new UserAuthCodeOauthRequestGrantTypeConfigurationProviderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Authenticate as a Back Office user with the the OAuth server:

```http
POST /authorize/ HTTP/1.1
Host: glue-backend.mysprykershop.com
Content-Type: application/x-www-form-urlencoded
Accept: application/json
Content-Length: 210

username={username}&password={password}&response_type=code&client_id={client_id}&state={state}&code_challenge={code_challenge}&code_challenge_method=S256&redirect_uri={redirect_uri}
```

| PARAMETER             | TYPE   | EXAMPLE                                 | DESCRIPTION                                                                                                                                                                                                                                                                      |
|-----------------------|--------|-----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| username              | string | some@user.com                           | The username of the Back Office user.                                                                                                                                                                                                                                            |
| password              | string | some-password                           | The password of the Back Office user.                                                                                                                                                                                                                                            |
| response_type         | string | code                                    | Defines how the authorization server should respond to the client after the resource owner grants the access to the external application.                                                                                                                                            |
| client_id             | string | the-client-identifier-can-be-any-string | Public identifier for the client application that is requesting access to a user's resources.                                                                                                                                                                                    |
| state                 | string | some-random-string                      | Used to mitigate the risk of cross-site request forgery attacks.                                                                                                                                                                                                                 |
| code_challenge        | string | some-random-string                      | Used in the Authorization Code Grant flow with a Proof Key for Code Exchange (PKCE) to enhance the security of the authorization process. PKCE is designed to protect against certain types of attacks, especially when the authorization code is exchanged for an access token. |
| code_challenge_method | string | S256                                    | Used in the Authorization Code Grant flow with PKCE. Defines the method used to transform the `code_verifier` into the `code_challenge` before initiating the authorization request.                                                                                             |
| redirect_uri          | string | `https://some-redirect-url`             | Used in the authorization request to specify where the authorization server should redirect the user after the user grants or denies permission.                                                                                                                                 |

For more detailed information about the Authorization (Code Grant flow) Request with PKCE, see to [Authorization Request](https://www.oauth.com/oauth2-servers/pkce/authorization-request/).

  Check that the response contains the 201 response with a code.

2. Using the code you've retrieved in the previous step, authenticate as a Back Office user:

```http
POST /token/ HTTP/1.1
Host: glue-backend.mysprykershop.com
Content-Type: application/x-www-form-urlencoded
Accept: application/json
Content-Length: 1051

grant_type=authorization_code&code={code}&client_id={client_id}&code_verifier={code_verifier}
```

| Parameter name | Type   | Example                                 | Description                                                                                                                                                                                        |
|----------------|--------|-----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| grant_type     | string | authorization_code                      | Specifies the type of grant requested by the client. In this case, it's the Authorization Code Grant flow.                                                                                         |
| code           | string | some-code                               | The authorization code provided by the OAuth server.                                                                                                                                               |
| client_id      | string | the-client-identifier-can-be-any-string | Public identifier for the client application that is requesting access to a user's resources.                                                                                                      |
| code_verifier  | string | some-random-string                      | A random string generated by the client in the Authorization Code Grant flow with PKCE. It's used to verify the identity of the client when exchanging the authorization code for an access token. |

Check that the response contains the 201 response with an auth token. Check that you can send requests to protected resources using the auth token.

{% endinfo_block %}

### Set up the backend API

To enable the Backend API, register these plugins:

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
4. Use the warehouse user access token as the request header: `Authorization: Bearer {{YOUR_ACCESS_TOKEN}}`.

Make sure that you can send the following requests:

- Retrieve picklists: `GET https://glue-backend.mysprykershop.com/picking-lists`.

- Retrieve picklists with picking list items included: `GET https://glue-backend.mysprykershop.com/picking-lists?include=picking-list-items`.

- Retrieve picklists with the users information included:  `GET https://glue-backend.mysprykershop.com/picking-lists?include=users`.

- Retrieve picklists with warehouse information included: `GET https://glue-backend.mysprykershop.com/picking-lists?include=warehouses`.

- Retrieve a picking list: `GET https://glue-backend.mysprykershop.com/picking-lists/{% raw %}{{{% endraw %}picking-list-uuid{% raw %}}{{% endraw %}`.

- Start picking: `PATCH https://glue-backend.mysprykershop.com/picking-lists/{% raw %}{{{% endraw %}picking-list-uuid{% raw %}}{{% endraw %}/start-picking`

- Retrieve items from a picklist: `GET https://glue-backend.mysprykershop.com/picking-lists/{% raw %}{{{% endraw %}picking-list-uuid{% raw %}}{{% endraw %}/picking-list-items`.

- Retrieve an item from a picklist: `GET https://glue-backend.mysprykershop.com/picking-lists/{% raw %}{{{% endraw %}picking-list-uuid{% raw %}}{{% endraw %}/picking-list-items/{% raw %}{{{% endraw %}picking-list-item-uuid{% raw %}{{{% endraw %}`.

- Pick one or more items from a picklist:

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

Make sure push notification generation works:

1. Place an order with a product from the warehouse with the `multi-shipment` picking strategy.
2. In the Back Office, go to **Sales&nbsp;<span aria-label="and then">></span> Orders&nbsp;**.
3. On the **Orders** page, next the order you've placed, click **View**.
4. To make the order ready for picking, manually change the state of the order. For instructions, see [Change the state of order items](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/manage-in-the-back-office/orders/change-the-state-of-order-items.html).
  The order state should be **ready for picking**.

5. Check the `spy_push_notification` database table to ensure that a push notification has been created.

{% endinfo_block %}
