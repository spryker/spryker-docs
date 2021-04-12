---
title: Marketplace Order Management feature integration
description: {Meta description}
tags: [, ]
---

This document describes how to integrate the Marketplace Order Management feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Order Management feature core.

### Prerequisites

| NAME | VERSION | INTEGRATION GUIDE |
| --------- | ------ | ---------------|
| Spryker Core | 202001.0 | [Spryker core feature integration](https://documentation.spryker.com/docs/spryker-core-feature-integration) |
| Order Management | 202001.0 | [Order Management feature integration](https://documentation.spryker.com/docs/order-management-feature-integration) |
| Shipment | 202001.0 | [Shipment feature integration](https://documentation.spryker.com/docs/shipment-feature-integration) |
| State Machine | 202001.0 | [State Machine feature integration](https://github.com/spryker-feature/state-machine) |
| Marketplace Merchant | dev-master | [Marketplace Merchants feature integration](docs/marketplace/dev/feature-integration-guides/marketplace-merchants-feature-integration.html) |

### 1) Install required modules using Сomposer

Install the required modules:

```bash
composer require spryker-feature/marketplace-order-management --update-with-dependencies
```
---
**Verification**

Make sure that the following modules have been installed:

| MODULE  | EXPECTED DIRECTORY |
| -------- | ------------------- |
| MerchantOms | spryker/merchant-oms |
| MerchantOmsDataImport | spryker/merchant-oms-data-import |
| MerchantOmsGui | spryker/merchant-oms-gui |
| MerchantSalesOrder | spryker/merchant-sales-order |
| MerchantSalesOrderMerchantUserGui | spryker/merchant-sales-order-merchant-user-gui |
| MerchantSalesOrderDataExport | spryker/merchant-sales-order-data-export |
| ProductOfferSales | spryker/product-offer-sales |

---
### 2) Set up database schema and transfer objects
Apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

---
**Verification**

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY | TYPE | EVENT |
| --------------- | ---- | ------ |
|spy_merchant.fk_state_machine_process |column |created  |
|spy_merchant_sales_order_item.fk_state_machine_item_state | column|created  |
|spy_merchant_sales_order | table |created |
|spy_merchant_sales_order_item | table |created |
|spy_merchant_sales_order_totals | table |created |
|spy_sales_expense.merchant_reference | column |created |
|spy_sales_order_item.merchant_reference | column |created  |

Make sure that the following changes have been triggered in transfer objects:

| TRANSFER | TYPE | EVENT  | PATH  |
| --------- | ------- | ----- | ------------- |
| MerchantOrderCriteria.idMerchant | attribute | created | src/Generated/Shared/Transfer/MerchantOrderCriteriaTransfer |
| DataImporterConfiguration | class | created | src/Generated/Shared/Transfer/DataImporterConfigurationTransfer |
| StateMachineItem.stateName | attribute | created | src/Generated/Shared/Transfer/StateMachineItemTransfer |
| Merchant.merchantReference | attribute | created | src/Generated/Shared/Transfer/MerchantTransfer |
| MerchantOrderItem.idMerchantOrderItem | attribute | created | src/Generated/Shared/Transfer/MerchantOrderItemTransfer |
| Item.productOfferReference | attribute | created| src/Generated/Shared/Transfer/ItemTransfer |

---

### 3) Add translations
Generate a new translation cache for Zed:

```bash
console translator:generate-cache
```

### 4) Import data

Import data as follows:

1. Prepare your data according to your requirements using our demo data:

**data/import/common/common/marketplace/merchant_product_offer.csv**
```csv
merchant_reference,merchant_oms_process_name
MER000001,MainMerchantStateMachine
MER000002,MerchantDefaultStateMachine
MER000006,MerchantDefaultStateMachine
MER000004,MerchantDefaultStateMachine
MER000003,MerchantDefaultStateMachine
MER000007,MerchantDefaultStateMachine
MER000005,MerchantDefaultStateMachine
```


|PAREMETER |REQUIRED?  |TYPE  |DATA EXAMPLE | DESCRIPTION |
|---------|---------|---------|---------| ---------|
|merchant_reference     |  ✓       |  string       | spryker        |String identifier for merchant in the Spryker system. |
|merchant_oms_process_name     |    ✓     |     string   |  MainMerchantStateMachine       | String identifier for the State Machine processes.|

2. Register the following plugin to enable data import:


|PLUGIN  |SPECIFICATION  |PREREQUISITES  |NAMESPACE  |
|---------|---------|---------|---------|
|MerchantOmsProcessDataImportPlugin |  Imports Merchant State Machine data  |    None     |   Spryker\Zed\MerchantOmsDataImport\Communication\Plugin\DataImport  |

<details>
<summary markdown='span'>src/Pyz/Zed/DataImport/DataImportDependencyProvider.php</summary>

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
</details>

1. Import data:

```bash
console data:import merchant-oms-process
```

---
**Verification**

Make sure that in the `spy_merchant` table, merchants have correct `fk_process id` in their columns.

---

### 5) Export data

Export data as follows:

1. Create and prepare your `data/export/config/merchant_order_export_config.yml` file  according to your requirements using our demo config template:

<details>
<summary markdown='span'>data/export/config/merchant_order_export_config.yml</summary>

```xml
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

<table>
<thead>
  <tr>
    <th colspan="3">PARAMETER</th>
    <th>REQUIRED</th>
    <th>POSSIBLE VALUES</th>
    <th>DESCRIPTION</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td colspan="3">data_entity</td>
    <td>✓</td>
    <td>merchant-order<br>merchant-order-item<br>merchant-order-expense</td>
    <td>String identifier for data entity that is expected to be  exported.</td>
  </tr>
  <tr>
    <td rowspan="5">filter_criteria</td>
    <td colspan="2">store_name</td>
    <td>✓</td>
    <td>All existing store names.</td>
    <td>An existing store name for the data to filter on.</td>
  </tr>
  <tr>
    <td rowspan="2">merchant_order_created_at</td>
    <td>from</td>
    <td></td>
    <td>Date in format 'YYYY-MM-DD HH:mm:ss HH24:MI'</td>
    <td>Date of merchant order creation from which the data needs to be filtered.</td>
  </tr>
  <tr>
    <td>to</td>
    <td></td>
    <td>Date in format 'YYYY-MM-DD HH:mm:ss HH24:MI'</td>
    <td>Date of merchant order creation up to  which the data needs to be filtered.</td>
  </tr>
  <tr>
    <td rowspan="2">merchant_order_updated_at</td>
    <td>from</td>
    <td></td>
    <td>Date in format 'YYYY-MM-DD HH:mm:ss HH24:MI'</td>
    <td>Date of merchant order update from which the data needs to be filtered.</td>
  </tr>
  <tr>
    <td>to</td>
    <td></td>
    <td>Date in format 'YYYY-MM-DD HH:mm:ss HH24:MI'</td>
    <td>Date of merchant order update up to  which the data needs to be filtered.</td>
  </tr>
</tbody>
</table>

2. Register the following plugins to enable data export:

 PLUGIN | SPECIFICATION | PREREQUISITES| NAMESPACE|
| --------------- | -------------- | ------ | -------------- |
| MerchantOrderDataEntityExporterPlugin | Exports Merchant Order data | None | Spryker\Zed\MerchantSalesOrderDataExport\Communication\Plugin\DataExport|
| MerchantOrderItemDataEntityExporterPlugin | Exports Merchant Order Items data | None   | Spryker\Zed\MerchantSalesOrderDataExport\Communication\Plugin\DataExport |
|MerchantOrderExpenseDataEntityExporterPlugin  | Exports Merchant Order Expense data | None   |Spryker\Zed\MerchantSalesOrderDataExport\Communication\Plugin\DataExport |

<details>
<summary markdown='span'>src/Pyz/Zed/DataExport/DataExportDependencyProvider.php</summary>

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
     * @return \Spryker\Zed\DataExportExtension\Dependency\Plugin\DataEntityExporterPluginInterface[]
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
</details>

3. Export data:

```bash
console data:export --config=merchant_order_export_config.yml
```

### 6) Set up behavior
Enable the following behaviors by registering the plugins:

| PLUGIN  | SPECIFICATION | PREREQUISITES | NAMESPACE |
| ------------ | ----------- | ----- | ------------ |
| TriggerEventFromCsvFileConsole |Allows for updating Merchant order status via CSV input.  |  |Spryker\Zed\MerchantOms\Communication\Console |
|EventTriggerMerchantOrderPostCreatePlugin  | Triggers new events for the newly created merchant orders | |Spryker\Zed\MerchantOms\Communication\Plugin\MerchantSalesOrder  |
| MerchantOmsMerchantOrderExpanderPlugin |Expands merchant order with merchant Oms data (item state and manual events)  | | Spryker\Zed\MerchantOms\Communication\Plugin\MerchantSalesOrder |
| MerchantStateMachineHandlerPlugin | Wires merchant order updates in the State Machine module | |Spryker\Zed\MerchantOms\Communication\Plugin\StateMachine |
|MerchantOmsStateOrderItemsTableExpanderPlugin  |Expands the order item table with merchant order item state  | | Spryker\Zed\MerchantOmsGui\Communication\Plugin\Sales |
|MerchantOrderDataOrderExpanderPlugin  | Expands order data with merchant order details | | Spryker\Zed\MerchantSalesOrder\Communication\Plugin\Sales |
|MerchantReferenceOrderItemExpanderPreSavePlugin  | Expands order item with merchant reference before saving an order item to the database | | Spryker\Zed\MerchantSalesOrder\Communication\Plugin\Sales |
|MerchantReferencesOrderExpanderPlugin  |Expands order with merchant references from order items  | |	Spryker\Zed\MerchantSalesOrder\Communication\Plugin\Sales  |
| MerchantReferenceShipmentExpenseExpanderPlugin | Expands expense transfer with merchant reference from items | | Spryker\Zed\MerchantSalesOrder\Communication\Plugin\Shipment |
| ProductOfferReferenceOrderItemExpanderPreSavePlugin |Expands order item with product offer reference before saving the order item to the database  | | Spryker\Zed\ProductOfferSales\Communication\Plugin\Sales |

<details>
<summary markdown='span'>src/Pyz/Zed/Sales/SalesDependencyProvider.php</summary>

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
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\OrderExpanderPluginInterface[]
     */
    protected function getOrderHydrationPlugins(): array
    {
        return [
            new MerchantOrderDataOrderExpanderPlugin(),
            new MerchantReferencesOrderExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemExpanderPreSavePluginInterface[]
     */
    protected function getOrderItemExpanderPreSavePlugins(): array
    {
        return [
            new MerchantReferenceOrderItemExpanderPreSavePlugin(),
            new ProductOfferReferenceOrderItemExpanderPreSavePlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemsTableExpanderPluginInterface[]
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

<details>
<summary markdown='span'>src/Pyz/Zed/Console/ConsoleDependencyProvider.php</summary>

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
     * @return \Symfony\Component\Console\Command\Command[]
     */
    protected function getConsoleCommands(Container $container): array
    {
        return [
            new TriggerEventFromCsvFileConsole(),
        ];
    }
}
```
</details>

<details>
<summary markdown='span'>src/Pyz/Zed/MerchantSalesOrder/MerchantSalesOrderDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\MerchantSalesOrder;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\MerchantOms\Communication\Plugin\MerchantSalesOrder\EventTriggerMerchantOrderPostCreatePlugin;
use Spryker\Zed\MerchantOms\Communication\Plugin\MerchantSalesOrder\MerchantOmsMerchantOrderExpanderPlugin;
use Spryker\Zed\MerchantSalesOrder\MerchantSalesOrderDependencyProvider as SprykerMerchantSalesOrderDependencyProvider;

class MerchantSalesOrderDependencyProvider extends SprykerMerchantSalesOrderDependencyProvider
{
    /**
     * @return \Spryker\Zed\MerchantSalesOrderExtension\Dependency\Plugin\MerchantOrderPostCreatePluginInterface[]
     */
    protected function getMerchantOrderPostCreatePlugins(): array
    {
        return [
            new EventTriggerMerchantOrderPostCreatePlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\MerchantSalesOrderExtension\Dependency\Plugin\MerchantOrderExpanderPluginInterface[]
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

<details>
<summary markdown='span'>src/Pyz/Zed/StateMachine/StateMachineDependencyProvider.php</summary>

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\StateMachine;

use Spryker\Zed\MerchantOms\Communication\Plugin\StateMachine\MerchantStateMachineHandlerPlugin;
use Spryker\Zed\StateMachine\StateMachineDependencyProvider as SprykerStateMachineDependencyProvider;

class StateMachineDependencyProvider extends SprykerStateMachineDependencyProvider
{
    /**
     * @return \Spryker\Zed\StateMachine\Dependency\Plugin\StateMachineHandlerInterface[]
     */
    protected function getStateMachineHandlers()
    {
        return [
            new MerchantStateMachineHandlerPlugin(),
        ];
    }
```
</details>

<details>
<summary markdown='span'>src/Pyz/Zed/Shipment/ShipmentDependencyProvider.php</summary>

```php
?php

namespace Pyz\Zed\Shipment;

use Spryker\Zed\MerchantSalesOrder\Communication\Plugin\Shipment\MerchantReferenceShipmentExpenseExpanderPlugin;
use Spryker\Zed\Shipment\ShipmentDependencyProvider as SprykerShipmentDependencyProvider;

class ShipmentDependencyProvider extends SprykerShipmentDependencyProvider
{
    /**
     * @return \Spryker\Zed\ShipmentExtension\Dependency\Plugin\ShipmentExpenseExpanderPluginInterface[]
     */
    protected function getShipmentExpenseExpanderPlugins(): array
    {
        return [
            new MerchantReferenceShipmentExpenseExpanderPlugin(),
        ];
    }
}

```
</details>

---
**Verification**
1. Make sure that the Merchant State Machine is executed on Merchant Orders after the order has been split.
2. Make sure that when retrieving an order in the Sales module, it is split by the Merchant Order and that the Order state is derived from the Merchant State Machine.

---

## Install feature front end

Follow the steps below to install the Marketplace Order Management feature front end.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
| --------- | ------ | --------------|
| Spryker Core | 202001.0 | [Spryker core feature integration](https://documentation.spryker.com/docs/spryker-core-feature-integration) |

### 1) Install the required modules using Сomposer

If installed before, not needed.

Make sure that the following modules have been installed:

| MODULE  | EXPECTED DIRECTORY <!--for public Demo Shops--> |
| -------- | ------------------- |
| SalesMerchantPortalGui | spryker/sales-merchant-portal-gui |

### 2) Set up transfers

Apply database changes and to generate entity and transfer changes:

```bash
console transfer:generate
```

---
**Verification**

Ensure the following transfers have been created:

| TRANSFER | TYPE | EVENT  | PATH  |
| --------- | ------- | ----- | ------------- |
| MerchantOrderTableCriteria | class | created | src/Generated/Shared/Transfer/MerchantOrderCriteriaTransfer |
| MerchantOrderItemTableCriteria | class | created | src/Generated/Shared/Transfer/DataImporterConfigurationTransfer |

---

### 3) Set up plugins
Register the following plugins to enable widgets:

| PLUGIN | SPECIFICATION | PREREQUISITES   | NAMESPACE   |
| --------------- | -------------- | ------ | -------------- |
| OrdersMerchantDashboardCardPlugin | Adds the Sales widget to MerchantDashboard |  |   Spryker\Zed\SalesMerchantPortalGui\Communication\Plugin |

<details>
<summary markdown='span'>src/Pyz/Zed/DashboardMerchantPortalGui/DashboardMerchantPortalGuiDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\DashboardMerchantPortalGui;

use Spryker\Zed\DashboardMerchantPortalGui\DashboardMerchantPortalGuiDependencyProvider as SprykerDashboardMerchantPortalGuiDependencyProvider;
use Spryker\Zed\SalesMerchantPortalGui\Communication\Plugin\DashboardMerchantPortalGui\OrdersMerchantDashboardCardPlugin;

class DashboardMerchantPortalGuiDependencyProvider extends SprykerDashboardMerchantPortalGuiDependencyProvider
{
    protected function getDashboardCardPlugins(): array
    {
        return [
            new OrdersMerchantDashboardCardPlugin(),
        ];
    }
}

```

</details>

---
**Verification**

Make sure that the following widgets have been registered by adding the respective code snippets to a Twig template:

| WIDGET | VERIFICATION |
| ----------- | ---------- |
| SalesMerchantPortalGui| Open MerchantDashboard at `http://mysprykershop.com/dashboard-merchant-portal-gui` and check that Sales widget is available. |

---

## Related features
Integrate the following related features:

| FEATURE | INTEGRATION GUIDE |
| --- | --- |
  | Marketplace Order Management + Order Threshold |[Marketplace Order Management + Order Threshold feature integration](/docs/marketplace/dev/feature-integration-guides/marketplace-order-management-order-threshold-feature-integration.html) |
  | Marketplace Order Management + Cart | [Marketplace Order Management + Cart feature integration](/docs/marketplace/dev/feature-integration-guides/marketplace-order-management-cart-feature-integration.html)|
