

This document describes how to install the Marketplace Order Management feature.

## Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
| --------- | ------ | ---------------|
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Order Management | {{page.version}} | [Install the Order Management feature](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html) |
| State Machine | {{page.version}} | [State Machine](https://github.com/spryker-feature/state-machine) |
| Marketplace Merchant | {{page.version}} | [Install the Marketplace Merchant feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-feature.html) |
| Marketplace Shipment | {{page.version}} | [Install the Marketplace Shipment feature](/docs/pbc/all/carrier-management/{{page.version}}/marketplace/install-features/install-marketplace-shipment-feature.html) |

## 1) Install required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/marketplace-order-management:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE  | EXPECTED DIRECTORY |
| -------- | ------------------- |
| MerchantOms | vendor/spryker/merchant-oms |
| MerchantOmsDataImport | vendor/spryker/merchant-oms-data-import |
| MerchantOmsGui | vendor/spryker/merchant-oms-gui |
| MerchantSalesOrder | vendor/spryker/merchant-sales-order |
| MerchantSalesOrderMerchantUserGui | vendor/spryker/merchant-sales-order-merchant-user-gui |
| MerchantSalesOrderDataExport | vendor/spryker/merchant-sales-order-data-export |
| ProductOfferSales | vendor/spryker/product-offer-sales |
| OmsProductOfferReservation | vendor/spryker/oms-product-offer-reservation |
| ProductOfferReservationGui | vendor/spryker/product-offer-reservation-gui |

{% endinfo_block %}

## 2) Set up configuration

1. Add the following configuration:

| CONFIGURATION | SPECIFICATION | NAMESPACE |
| ------------- | ------------ | ------------ |
| MainMerchantStateMachine | Adds the `MainMerchantStateMachine` configuration. | config/Zed/StateMachine/Merchant/MainMerchantStateMachine.xml |
| MerchantDefaultStateMachine | Adds the `MerchantDefaultStateMachine` configuration. | config/Zed/StateMachine/Merchant/MerchantDefaultStateMachine.xml |
| MarketplacePayment  | Adds the `MarketplacePayment` order management system. | config/Zed/oms/MarketplacePayment01.xml |
| Navigation  | Adds the navigation configuration. | config/Zed/navigation.xml |
| MerchantOmsConfig  | Adds the OMS processes configuration. | src/Pyz/Zed/MerchantOms/MerchantOmsConfig.php |

<details>
<summary>src/Pyz/Zed/MerchantOms/MerchantOmsConfig.php</summary>

```php
<?php

namespace Pyz\Zed\MerchantOms;

use Spryker\Zed\MerchantOms\MerchantOmsConfig as SprykerMerchantOmsConfig;

class MerchantOmsConfig extends SprykerMerchantOmsConfig
{
    /**
     * @var string
     */
    protected const MAIN_MERCHANT_OMS_PROCESS_NAME = 'MainMerchantStateMachine';
    /**
     * @var string
     */
    protected const MAIN_MERCHANT_STATE_MACHINE_INITIAL_STATE = 'created';

    /**
     * @return array<string>
     */
    public function getMerchantProcessInitialStateMap(): array
    {
        return array_merge(
            parent::getMerchantProcessInitialStateMap(),
            [
                static::MAIN_MERCHANT_OMS_PROCESS_NAME => static::MAIN_MERCHANT_STATE_MACHINE_INITIAL_STATE,
            ]
        );
    }

    /**
     * @api
     *
     * @return array<string>
     */
    public function getMerchantOmsProcesses(): array
    {
        return array_merge(
            parent::getMerchantOmsProcesses(),
            [
                static::MAIN_MERCHANT_OMS_PROCESS_NAME,
            ]
        );
    }
}
```

</details>

<details>
<summary>config/Zed/StateMachine/Merchant/MainMerchantStateMachine.xml</summary>

```xml
<?xml version="1.0"?>
<statemachine
    xmlns="spryker:state-machine-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:state-machine-01 http://static.spryker.com/state-machine-01.xsd"
>
    <process name="MainMerchantStateMachine" main="true">

        <states>
            <state name="created"/>
            <state name="new"/>
            <state name="canceled"/>
            <state name="left the merchant location"/>
            <state name="arrived at distribution center"/>
            <state name="shipped"/>
            <state name="delivered"/>
            <state name="closed"/>
        </states>

        <transitions>
            <transition happy="true">
                <source>created</source>
                <target>new</target>
                <event>initiate</event>
            </transition>

            <transition>
                <source>new</source>
                <target>closed</target>
                <event>close</event>
            </transition>

            <transition>
                <source>new</source>
                <target>canceled</target>
                <event>cancel</event>
            </transition>

            <transition>
                <source>canceled</source>
                <target>closed</target>
                <event>close</event>
            </transition>

            <transition happy="true">
                <source>new</source>
                <target>left the merchant location</target>
                <event>send to distribution</event>
            </transition>

            <transition happy="true">
                <source>left the merchant location</source>
                <target>arrived at distribution center</target>
                <event>confirm at center</event>
            </transition>

            <transition happy="true">
                <source>arrived at distribution center</source>
                <target>shipped</target>
                <event>ship</event>
            </transition>

            <transition happy="true">
                <source>shipped</source>
                <target>delivered</target>
                <event>deliver</event>
            </transition>

            <transition happy="true">
                <source>delivered</source>
                <target>closed</target>
                <event>close</event>
            </transition>
        </transitions>

        <events>
            <event name="initiate" onEnter="true"/>
            <event name="send to distribution" manual="true"/>
            <event name="confirm at center" manual="true"/>
            <event name="ship" manual="true" command="MarketplaceOrder/ShipOrderItem"/>
            <event name="deliver" manual="true" command="MarketplaceOrder/DeliverOrderItem"/>
            <event name="close"/>
            <event name="cancel" manual="true" command="MarketplaceOrder/CancelOrderItem"/>
        </events>

    </process>

</statemachine>

```

</details>

<details>
<summary>config/Zed/StateMachine/Merchant/MerchantDefaultStateMachine.xml</summary>

```xml
<?xml version="1.0"?>
<statemachine
    xmlns="spryker:state-machine-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:state-machine-01 http://static.spryker.com/state-machine-01.xsd"
>

    <process name="MerchantDefaultStateMachine" main="true">

        <states>
            <state name="created"/>
            <state name="new"/>
            <state name="canceled by merchant"/>
            <state name="shipped"/>
            <state name="delivered"/>
            <state name="closed"/>
        </states>

        <transitions>
            <transition happy="true">
                <source>created</source>
                <target>new</target>
                <event>initiate</event>
            </transition>

            <transition happy="true">
                <source>new</source>
                <target>shipped</target>
                <event>ship</event>
            </transition>

            <transition>
                <source>new</source>
                <target>closed</target>
                <event>close</event>
            </transition>

            <transition>
                <source>new</source>
                <target>canceled by merchant</target>
                <event>cancel by merchant</event>
            </transition>

            <transition>
                <source>canceled by merchant</source>
                <target>closed</target>
                <event>close</event>
            </transition>

            <transition happy="true">
                <source>shipped</source>
                <target>delivered</target>
                <event>deliver</event>
            </transition>

            <transition happy="true">
                <source>delivered</source>
                <target>closed</target>
                <event>close</event>
            </transition>
        </transitions>

        <events>
            <event name="initiate" onEnter="true"/>
            <event name="ship" manual="true" command="MarketplaceOrder/ShipOrderItem"/>
            <event name="deliver" manual="true" command="MarketplaceOrder/DeliverOrderItem"/>
            <event name="close"/>
            <event name="cancel by merchant" manual="true" command="MarketplaceOrder/CancelOrderItem"/>
        </events>

    </process>

</statemachine>

```

</details>

<details>
<summary>config/Zed/oms/MarketplacePayment01.xml</summary>

```xml
<?xml version="1.0"?>
<statemachine
    xmlns="spryker:oms-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd"
>

    <process name="MarketplacePayment01" main="true">
        <states>
            <state name="new" reserved="true" display="oms.state.new"/>
            <state name="paid" reserved="true" display="oms.state.paid"/>
            <state name="canceled" display="oms.state.canceled"/>
            <state name="refunded" display="oms.state.refunded"/>
            <state name="merchant split pending" reserved="true" display="oms.state.merchant-split-pending"/>
            <state name="sent to merchant" reserved="true" display="oms.state.sent-to-merchant"/>
            <state name="shipped by merchant" reserved="true" display="oms.state.shipped-by-merchant"/>
            <state name="delivered" reserved="true" display="oms.state.delivered"/>
            <state name="closed" display="oms.state.closed"/>
        </states>

        <transitions>
            <transition happy="true">
                <source>new</source>
                <target>paid</target>
                <event>pay</event>
            </transition>

            <transition happy="true" condition="MerchantSalesOrder/IsOrderPaid">
                <source>paid</source>
                <target>merchant split pending</target>
            </transition>

            <transition>
                <source>paid</source>
                <target>paid</target>
            </transition>

            <transition happy="true">
                <source>merchant split pending</source>
                <target>sent to merchant</target>
                <event>send to merchant</event>
            </transition>

            <transition>
                <source>sent to merchant</source>
                <target>canceled</target>
                <event>cancel</event>
            </transition>

            <transition>
                <source>canceled</source>
                <target>refunded</target>
                <event>refund</event>
            </transition>

            <transition>
                <source>refunded</source>
                <target>closed</target>
                <event>close</event>
            </transition>

            <transition happy="true">
                <source>sent to merchant</source>
                <target>shipped by merchant</target>
                <event>ship by merchant</event>
            </transition>

            <transition happy="true">
                <source>shipped by merchant</source>
                <target>delivered</target>
                <event>deliver</event>
            </transition>

            <transition happy="true">
                <source>delivered</source>
                <target>closed</target>
                <event>close</event>
            </transition>

        </transitions>

        <events>
            <event name="pay" manual="true"/>
            <event name="cancel" manual="true"/>
            <event name="refund" manual="true"/>
            <event name="send to merchant" onEnter="true" command="MerchantSalesOrder/CreateOrders"/>
            <event name="ship by merchant"/>
            <event name="deliver"/>
            <event name="close" manual="true" command="MerchantOms/CloseOrderItem"/>
        </events>
    </process>

</statemachine>
```

</details>

**config/Zed/navigation.xml**

```xml
<?xml version="1.0"?>
<config>
    <sales>
        <pages>
            <merchant-sales-order>
                <label>My orders</label>
                <title>My orders</title>
                <bundle>merchant-sales-order-merchant-user-gui</bundle>
                <controller>index</controller>
                <action>index</action>
                <visible>1</visible>
            </merchant-sales-order>
        </pages>
    </sales>
    <marketplace>
        <pages>
            <order-list>
                <label>Orders</label>
                <title>Orders</title>
                <bundle>sales</bundle>
                <controller>index</controller>
                <action>index</action>
            </order-list>
        </pages>
    </marketplace>
</config>
```

2. Build the navigation cache:

```bash
console navigation:build-cache
```

{% info_block warningBox "Verification" %}

Make sure that the Back Office navigation menu has the following items:
- **Marketplace&nbsp;<span aria-label="and then">></span> Orders**
- **Sales&nbsp;<span aria-label="and then">></span> My Orders**

{% endinfo_block %}


## 3) Set up database schema and transfer objects

1. Adjust the schema definition so entity changes trigger events:

**src/Pyz/Zed/OmsProductOfferReservation/Persistence/Propel/Schema/spy_oms_product_offer_reservation.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          name="zed"
          xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\OmsProductOfferReservation\Persistence"
          package="src.Orm.Zed.OmsProductOfferReservation.Persistence">

    <table name="spy_oms_product_offer_reservation">
        <behavior name="event">
            <parameter name="spy_oms_product_offer_reservation_all" column="*"/>
        </behavior>
    </table>

</database>
```

2. Apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in the database:

| DATABASE ENTITY | TYPE | EVENT |
| --------------- | ---- | ------ |
|spy_merchant.fk_state_machine_process |column |created  |
|spy_merchant_sales_order_item.fk_state_machine_item_state | column|created  |
|spy_merchant_sales_order | table |created |
|spy_merchant_sales_order_item | table |created |
|spy_merchant_sales_order_totals | table |created |
|spy_sales_expense.merchant_reference | column |created |
|spy_sales_order_item.merchant_reference | column |created  |
|spy_sales_order_item.product_offer_reference | column | created |

Make sure the following changes have been triggered in transfer objects:

| TRANSFER | TYPE | EVENT  | PATH  |
| --------- | ------- | ----- | ------------- |
| Merchant.fkStateMachineProcess | property | created | src/Generated/Shared/Transfer/MerchantTransfer |
| MerchantOrder | class | created | src/Generated/Shared/Transfer/MerchantOrderTransfer |
| MerchantOrderCriteria | class | created | src/Generated/Shared/Transfer/MerchantOrderCriteriaTransfer |
| MerchantOrderCollection | class | created | src/Generated/Shared/Transfer/MerchantOrderCollectionTransfer |
| MerchantOrderItem | class | created | src/Generated/Shared/Transfer/MerchantOrderItemTransfer |
| MerchantOrderItemCriteria | class | created | src/Generated/Shared/Transfer/MerchantOrderItemCriteriaTransfer |
| MerchantOrderItemCollection | class | created | src/Generated/Shared/Transfer/MerchantOrderItemCollectionTransfer |
| MerchantOrderItemResponse | class | created | src/Generated/Shared/Transfer/MerchantOrderItemResponseTransfer |
| MerchantOmsTriggerRequest | class | created | src/Generated/Shared/Transfer/MerchantOmsTriggerRequestTransfer |
| MerchantOmsTriggerResponse | class | created | src/Generated/Shared/Transfer/MerchantOmsTriggerResponseTransfer |
| OmsProductOfferReservationCriteria | class | created| src/Generated/Shared/Transfer/OmsProductOfferReservationCriteriaTransfer |
| OmsProductOfferReservation | class | created| src/Generated/Shared/Transfer/OmsProductOfferReservationTransfer |

{% endinfo_block %}

## 4) Add translations

1. Append glossary according to your configuration:

**data/import/common/common/glossary.csv**

```
merchant_sales_order.merchant_order_id,Merchant Order ID,en_US
merchant_sales_order.merchant_order_id,Händlerbestell-ID,de_DE
```

2. Import data:

```bash
console data:import glossary
```

3. Generate a new translation cache for Zed:

```bash
console translator:generate-cache
```

{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the `spy_glossary_key` and `spy_glossary_translation` tables.

{% endinfo_block %}

## 5) Import data

1. Prepare your data according to your requirements using the demo data:

**data/import/common/common/marketplace/merchant_oms_process.csv**

```
merchant_reference,merchant_oms_process_name
MER000001,MainMerchantStateMachine
MER000002,MerchantDefaultStateMachine
MER000006,MerchantDefaultStateMachine
MER000004,MerchantDefaultStateMachine
MER000003,MerchantDefaultStateMachine
MER000007,MerchantDefaultStateMachine
MER000005,MerchantDefaultStateMachine
```

|PAREMETER |REQUIRED  |TYPE  |DATA EXAMPLE | DESCRIPTION |
|---------|---------|---------|---------| ---------|
|merchant_reference     |  &check;       |  string       | spryker        |String identifier for merchant in the Spryker system. |
|merchant_oms_process_name     |    &check;     |     string   |  MainMerchantStateMachine       | String identifier for the State Machine processes.|

2. Register the following plugin to enable data import:

|PLUGIN  |SPECIFICATION  |PREREQUISITES  |NAMESPACE  |
|---------|---------|---------|---------|
|MerchantOmsProcessDataImportPlugin |  Imports Merchant State Machine data  |  |   Spryker\Zed\MerchantOmsDataImport\Communication\Plugin\DataImport  |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use Spryker\Zed\MerchantOmsDataImport\Communication\Plugin\DataImport;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    protected function getDataImporterPlugins(): array
    {
        return [
            new MerchantOmsProcessDataImportPlugin(),
        ];
    }
}
```

**data/import/local/full_EU.yml**

```yml
version: 0

actions:
  - data_entity: merchant-oms-process
    source: data/import/common/common/marketplace/merchant_oms_process.csv
```

**data/import/local/full_US.yml**

```yml
version: 0

actions:
  - data_entity: merchant-oms-process
    source: data/import/common/common/marketplace/merchant_oms_process.csv
```

3. Import data:

```bash
console data:import merchant-oms-process
```

{% info_block warningBox "Verification" %}

Make sure that in the `spy_merchant` table, merchants have correct `fk_process id` in their columns.

{% endinfo_block %}

## 6) Export data

1. Create and prepare your `data/export/config/merchant_order_export_config.yml` file according to your requirements using our demo config template:

<details>
<summary>data/export/config/merchant_order_export_config.yml</summary>

```yaml
version: 1

defaults:
    filter_criteria: &default_filter_criteria
        merchant_order_created_at:
            type: between
            from: '2020-05-01 00:00:00+09:00'
            to: '2021-12-31 23:59:59+09:00'
        merchant_order_updated_at:
            type: between
            from: '2021-01-08 09:00:12+12:00'
            to: '2021-12-31 23:59:59+09:00'

actions:
#Merchant orders data export
    - data_entity: merchant-order-expense
      destination: 'merchants/{merchant_name}/merchant-orders/{data_entity}s_{store_name}_{timestamp}.csv'
      filter_criteria:
          <<: *default_filter_criteria
          store_name: [DE]

    - data_entity: merchant-order-expense
      destination: 'merchants/{merchant_name}/merchant-orders/{data_entity}s_{store_name}_{timestamp}.csv'
      filter_criteria:
          <<: *default_filter_criteria
          store_name: [US]

    - data_entity: merchant-order-item
      destination: 'merchants/{merchant_name}/merchant-orders/{data_entity}s_{store_name}_{timestamp}.csv'
      filter_criteria:
          <<: *default_filter_criteria
          store_name: [DE]

    - data_entity: merchant-order-item
      destination: 'merchants/{merchant_name}/merchant-orders/{data_entity}s_{store_name}_{timestamp}.csv'
      filter_criteria:
          <<: *default_filter_criteria
          store_name: [US]

    - data_entity: merchant-order
      destination: 'merchants/{merchant_name}/merchant-orders/{data_entity}s_{store_name}_{timestamp}.csv'
      filter_criteria:
          <<: *default_filter_criteria
          store_name: [DE]

    - data_entity: merchant-order
      destination: 'merchants/{merchant_name}/merchant-orders/{data_entity}s_{store_name}_{timestamp}.csv'
      filter_criteria:
          <<: *default_filter_criteria
          store_name: [US]
```

</details>

| PARAMETER |  |  | REQUIRED | POSSIBLE VALUES | DESCRIPTION |
|---|---|---|---|---|---|
| data_entity |  |  | &check; | merchant-order merchant-order-item merchant-order-expense | String identifier for data entity that is expected to be  exported. |
| filter_criteria | store_name |  | &check; | All existing store names. | An existing store name for the data to filter on. |
|  | merchant_order_created_at | from |  | Date in format 'YYYY-MM-DD HH:mm:ss HH24:MI' | Date of merchant order creation from which the data needs to be filtered. |
|  |  | to |  | Date in format 'YYYY-MM-DD HH:mm:ss HH24:MI' | Date of merchant order creation up to which the data needs to be filtered. |
|  | merchant_order_updated_at | from |  | Date in format 'YYYY-MM-DD HH:mm:ss HH24:MI' | Date of merchant order update from which the data needs to be filtered. |
|  |  | to |  | Date in format 'YYYY-MM-DD HH:mm:ss HH24:MI' | Date of merchant order update up to which the data needs to be filtered. |

2. Register the following plugins to enable data export.

 PLUGIN | SPECIFICATION | PREREQUISITES| NAMESPACE|
| --------------- | -------------- | ------ | -------------- |
| MerchantOrderDataEntityExporterPlugin | Exports merchant order data. |   | Spryker\Zed\MerchantSalesOrderDataExport\Communication\Plugin\DataExport|
| MerchantOrderItemDataEntityExporterPlugin | Exports merchant order items data. |     | Spryker\Zed\MerchantSalesOrderDataExport\Communication\Plugin\DataExport |
| MerchantOrderExpenseDataEntityExporterPlugin  | Exports merchant order expense data. |     |Spryker\Zed\MerchantSalesOrderDataExport\Communication\Plugin\DataExport |

**src/Pyz/Zed/DataExport/DataExportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataExport;

use Spryker\Zed\DataExport\DataExportDependencyProvider as SprykerDataExportDependencyProvider;
use Spryker\Zed\MerchantSalesOrderDataExport\Communication\Plugin\DataExport\MerchantOrderDataEntityExporterPlugin;
use Spryker\Zed\MerchantSalesOrderDataExport\Communication\Plugin\DataExport\MerchantOrderExpenseDataEntityExporterPlugin;
use Spryker\Zed\MerchantSalesOrderDataExport\Communication\Plugin\DataExport\MerchantOrderItemDataEntityExporterPlugin;

class DataExportDependencyProvider extends SprykerDataExportDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\DataExportExtension\Dependency\Plugin\DataEntityExporterPluginInterface>
     */
    protected function getDataEntityExporterPlugins(): array
    {
        return [
            new MerchantOrderDataEntityExporterPlugin(),
            new MerchantOrderItemDataEntityExporterPlugin(),
            new MerchantOrderExpenseDataEntityExporterPlugin(),
        ];
    }
}
```

3. Export data:

```bash
console data:export --config=merchant_order_export_config.yml
```

## 7) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN  | SPECIFICATION | PREREQUISITES | NAMESPACE |
| ------------ | ----------- | ----- | ------------ |
| TriggerEventFromCsvFileConsole | Allows for updating merchant order status via CSV input.  |  |Spryker\Zed\MerchantOms\Communication\Console |
| EventTriggerMerchantOrderPostCreatePlugin  | Triggers new events for newly created merchant orders. | |Spryker\Zed\MerchantOms\Communication\Plugin\MerchantSalesOrder  |
| MerchantOmsMerchantOrderExpanderPlugin | Expands merchant order with merchant Oms data, such as item state and manual events.  | | Spryker\Zed\MerchantOms\Communication\Plugin\MerchantSalesOrder |
| MerchantStateMachineHandlerPlugin | Wires merchant order updates into the State Machine module. | |Spryker\Zed\MerchantOms\Communication\Plugin\StateMachine |
| MerchantOmsStateOrderItemsTableExpanderPlugin  |Expands the order item table with merchant order item state. | | Spryker\Zed\MerchantOmsGui\Communication\Plugin\Sales |
| MerchantOrderDataOrderExpanderPlugin  | Expands order data with merchant order details. | | Spryker\Zed\MerchantSalesOrder\Communication\Plugin\Sales |
| MerchantReferenceOrderItemExpanderPreSavePlugin  | Expands order items with merchant references before saving them to the database. | | Spryker\Zed\MerchantSalesOrder\Communication\Plugin\Sales |
| MerchantReferencesOrderExpanderPlugin  | Expands orders with merchant references from order items.  | |	Spryker\Zed\MerchantSalesOrder\Communication\Plugin\Sales  |
| ProductOfferReferenceOrderItemExpanderPreSavePlugin | Expands order items with product offer references before saving them to the database.  | | Spryker\Zed\ProductOfferSales\Communication\Plugin\Sales |
| DeliverMarketplaceOrderItemCommandPlugin | Triggers the `deliver` event on a marketplace order item. |  |   Pyz\Zed\MerchantOms\Communication\Plugin\Oms |
| ShipByMerchantMarketplaceOrderItemCommandPlugin | Triggers the `ship by merchant` event on a marketplace order item. |  |   Pyz\Zed\MerchantOms\Communication\Plugin\Oms |
| CancelMarketplaceOrderItemCommandPlugin | Triggers the `ship by merchant` event on a marketplace order item. |  |   Pyz\Zed\MerchantOms\Communication\Plugin\Oms |
| ShipmentFormTypePlugin | Returns `ShipmentFormType` class name resolution.  |  | Spryker\Zed\ShipmentGui\Communication\Plugin\Form |
| ItemFormTypePlugin | Returns `ItemFormType` class name resolution.  |  | Spryker\Zed\ShipmentGui\Communication\Plugin\Form |
| MerchantReferenceShipmentExpenseExpanderPlugin | Expands the expense transfer with merchant references from items. | | Spryker\Zed\MerchantSalesOrder\Communication\Plugin\Shipment |

**src/Pyz/Zed/MerchantOms/Communication/MerchantOmsCommunicationFactory.php**

```php
<?php

namespace Pyz\Zed\MerchantOms\Communication;

use Pyz\Zed\MerchantOms\MerchantOmsDependencyProvider;
use Spryker\Zed\MerchantOms\Communication\MerchantOmsCommunicationFactory as SprykerMerchantOmsCommunicationFactory;

/**
 * @method \Spryker\Zed\MerchantOms\MerchantOmsConfig getConfig()
 * @method \Spryker\Zed\MerchantOms\Business\MerchantOmsFacadeInterface getFacade()
 * @method \Spryker\Zed\MerchantOms\Persistence\MerchantOmsRepositoryInterface getRepository()
 */
class MerchantOmsCommunicationFactory extends SprykerMerchantOmsCommunicationFactory
{
    /**
     * @return \Pyz\Zed\Oms\Business\OmsFacadeInterface
     */
    public function getOmsFacade(): OmsFacadeInterface
    {
        return $this->getProvidedDependency(MerchantOmsDependencyProvider::FACADE_OMS);
    }
}
```

<details>
<summary>src/Pyz/Zed/Sales/SalesDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\MerchantOmsGui\Communication\Plugin\Sales\MerchantOmsStateOrderItemsTableExpanderPlugin;
use Spryker\Zed\MerchantSalesOrder\Communication\Plugin\Sales\MerchantOrderDataOrderExpanderPlugin;
use Spryker\Zed\MerchantSalesOrder\Communication\Plugin\Sales\MerchantReferenceOrderItemExpanderPreSavePlugin;
use Spryker\Zed\MerchantSalesOrder\Communication\Plugin\Sales\MerchantReferencesOrderExpanderPlugin;
use Spryker\Zed\ProductOfferSales\Communication\Plugin\Sales\ProductOfferReferenceOrderItemExpanderPreSavePlugin;
use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderExpanderPluginInterface>
     */
    protected function getOrderHydrationPlugins(): array
    {
        return [
            new MerchantOrderDataOrderExpanderPlugin(),
            new MerchantReferencesOrderExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemExpanderPreSavePluginInterface>
     */
    protected function getOrderItemExpanderPreSavePlugins(): array
    {
        return [
            new MerchantReferenceOrderItemExpanderPreSavePlugin(),
            new ProductOfferReferenceOrderItemExpanderPreSavePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemsTableExpanderPluginInterface>
     */
    protected function getOrderItemsTableExpanderPlugins(): array
    {
        return [
            new MerchantOmsStateOrderItemsTableExpanderPlugin(),
        ];
    }
}
```

</details>

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\MerchantOms\Communication\Console\TriggerEventFromCsvFileConsole;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container): array
    {
        return [
            new TriggerEventFromCsvFileConsole(),
        ];
    }
}
```

<details>
<summary>src/Pyz/Zed/MerchantSalesOrder/MerchantSalesOrderDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\MerchantSalesOrder;

use Spryker\Zed\MerchantOms\Communication\Plugin\MerchantSalesOrder\EventTriggerMerchantOrderPostCreatePlugin;
use Spryker\Zed\MerchantOms\Communication\Plugin\MerchantSalesOrder\MerchantOmsMerchantOrderExpanderPlugin;
use Spryker\Zed\MerchantSalesOrder\MerchantSalesOrderDependencyProvider as SprykerMerchantSalesOrderDependencyProvider;

class MerchantSalesOrderDependencyProvider extends SprykerMerchantSalesOrderDependencyProvider
{

    /**
     * @return array<\Spryker\Zed\MerchantSalesOrderExtension\Dependency\Plugin\MerchantOrderPostCreatePluginInterface>
     */
    protected function getMerchantOrderPostCreatePlugins(): array
    {
        return [
            new EventTriggerMerchantOrderPostCreatePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\MerchantSalesOrderExtension\Dependency\Plugin\MerchantOrderExpanderPluginInterface>
     */
    protected function getMerchantOrderExpanderPlugins(): array
    {
        return [
            new MerchantOmsMerchantOrderExpanderPlugin(),
        ];
    }
}
```

</details>

**src/Pyz/Zed/StateMachine/StateMachineDependencyProvider.php**

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\StateMachine;

use Spryker\Zed\MerchantOms\Communication\Plugin\StateMachine\MerchantStateMachineHandlerPlugin;
use Spryker\Zed\StateMachine\StateMachineDependencyProvider as SprykerStateMachineDependencyProvider;

class StateMachineDependencyProvider extends SprykerStateMachineDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\StateMachine\Dependency\Plugin\StateMachineHandlerInterface>
     */
    protected function getStateMachineHandlers()
    {
        return [
            new MerchantStateMachineHandlerPlugin(),
        ];
    }
```

**src/Pyz/Zed/MerchantOms/Communication/Plugin/Oms/DeliverMarketplaceOrderItemCommandPlugin.php**

```php
<?php

namespace Pyz\Zed\MerchantOms\Communication\Plugin\Oms;

class DeliverMarketplaceOrderItemCommandPlugin extends AbstractTriggerOmsEventCommandPlugin
{
    protected const EVENT_DELIVER = 'deliver';

    /**
     * @return string
     */
    public function getEventName(): string
    {
        return static::EVENT_DELIVER;
    }
}

```

**src/Pyz/Zed/MerchantOms/Communication/Plugin/Oms/ShipByMerchantMarketplaceOrderItemCommandPlugin.php**

```php
<?php

namespace Pyz\Zed\MerchantOms\Communication\Plugin\Oms;

class ShipByMerchantMarketplaceOrderItemCommandPlugin extends AbstractTriggerOmsEventCommandPlugin
{
    protected const EVENT_SHIP_BY_MERCHANT = 'ship by merchant';

    /**
     * @return string
     */
    public function getEventName(): string
    {
        return static::EVENT_SHIP_BY_MERCHANT;
    }
}
```

**src/Pyz/Zed/MerchantOms/Communication/Plugin/Oms/CancelMarketplaceOrderItemCommandPlugin.php**

```php
<?php

namespace Pyz\Zed\MerchantOms\Communication\Plugin\Oms;

class CancelMarketplaceOrderItemCommandPlugin extends AbstractTriggerOmsEventCommandPlugin
{
    /**
     * @var string
     */
    protected const EVENT_CANCEL = 'cancel';

    /**
     * @return string
     */
    public function getEventName(): string
    {
        return static::EVENT_CANCEL;
    }
}
```

**src/Pyz/Zed/MerchantOms/MerchantOmsDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\MerchantOms;

use Pyz\Zed\MerchantOms\Communication\Plugin\Oms\CancelMarketplaceOrderItemCommandPlugin;
use Pyz\Zed\MerchantOms\Communication\Plugin\Oms\DeliverMarketplaceOrderItemCommandPlugin;
use Pyz\Zed\MerchantOms\Communication\Plugin\Oms\ShipByMerchantMarketplaceOrderItemCommandPlugin;
use Spryker\Zed\MerchantOms\MerchantOmsDependencyProvider as SprykerMerchantOmsDependencyProvider;

class MerchantOmsDependencyProvider extends SprykerMerchantOmsDependencyProvider
{
    protected function getStateMachineCommandPlugins(): array
    {
        return [
            'MarketplaceOrder/ShipOrderItem' => new ShipByMerchantMarketplaceOrderItemCommandPlugin(),
            'MarketplaceOrder/DeliverOrderItem' => new DeliverMarketplaceOrderItemCommandPlugin(),
            'MarketplaceOrder/CancelOrderItem' => new CancelMarketplaceOrderItemCommandPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/MerchantSalesOrderMerchantUserGui/MerchantSalesOrderMerchantUserGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\MerchantSalesOrderMerchantUserGui;

use Spryker\Zed\Kernel\Communication\Form\FormTypeInterface;
use Spryker\Zed\MerchantSalesOrderMerchantUserGui\MerchantSalesOrderMerchantUserGuiDependencyProvider as SprykerMerchantSalesOrderMerchantUserGuiDependencyProvider;
use Spryker\Zed\ShipmentGui\Communication\Plugin\Form\ItemFormTypePlugin;
use Spryker\Zed\ShipmentGui\Communication\Plugin\Form\ShipmentFormTypePlugin;

class MerchantSalesOrderMerchantUserGuiDependencyProvider extends SprykerMerchantSalesOrderMerchantUserGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\Kernel\Communication\Form\FormTypeInterface
     */
    public function getShipmentFormTypePlugin(): FormTypeInterface
    {
        return new ShipmentFormTypePlugin();
    }

    /**
     * @return \Spryker\Zed\Kernel\Communication\Form\FormTypeInterface
     */
    public function getItemFormTypePlugin(): FormTypeInterface
    {
        return new ItemFormTypePlugin();
    }
}
```

**src/Pyz/Zed/Shipment/ShipmentDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Shipment;

use Spryker\Zed\MerchantSalesOrder\Communication\Plugin\Shipment\MerchantReferenceShipmentExpenseExpanderPlugin;
use Spryker\Zed\Shipment\ShipmentDependencyProvider as SprykerShipmentDependencyProvider;

class ShipmentDependencyProvider extends SprykerShipmentDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ShipmentExtension\Dependency\Plugin\ShipmentExpenseExpanderPluginInterface>
     */
    protected function getShipmentExpenseExpanderPlugins(): array
    {
        return [
            new MerchantReferenceShipmentExpenseExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\MerchantSalesOrderWidget\Widget\MerchantOrderReferenceForItemsWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            MerchantOrderReferenceForItemsWidget::class,
         ];
    }

}

```

{% info_block warningBox "Verification" %}

Make sure the following applies:

- After an order was split, the Merchant State Machine is executed on merchant orders.

- When retrieving an order in the *Sales* module, it's split by the merchant order and the order state is derived from the Merchant State Machine.

- After splitting an order into merchant orders, their IDs are displayed on the order details page on the Storefront.

{% endinfo_block %}


## Install related features

| FEATURE | REQUIRED FOR THE CURRENT FEATURE |INTEGRATION GUIDE |
| --- | --- | --- |
| Marketplace Order Management + Order Threshold |  |[Install the Marketplace Order Management + Order Threshold feature](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/install-features/install-the-marketplace-order-management-order-threshold-feature.html) |
| Marketplace Inventory Management + Order Management |  |  [Install the Marketplace Inventory Management + Marketplace Order Management feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/marketplace/install-features/install-the-marketplace-inventory-management-packaging-units-feature.html)  |
