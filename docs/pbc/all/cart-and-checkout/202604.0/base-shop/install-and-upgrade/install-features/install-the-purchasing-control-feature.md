---
title: Install the Purchasing Control feature
description: Learn how to install the Purchasing Control feature into your Spryker project.
last_updated: May 27, 2026
template: feature-integration-guide-template
label: early-access
related:
  - title: Purchasing Control feature overview
    link: docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/feature-overviews/purchasing-control-feature-overview.html
  - title: Install the Approval Process feature
    link: docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-approval-process-feature.html
---

{% info_block warningBox "Experimental feature" %}

Experimental feature - not recommended for production use.

{% endinfo_block %}

This document describes how to install the [Purchasing Control feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/feature-overviews/purchasing-control-feature-overview.html).

## Install feature core

Follow the steps below to install the Purchasing Control feature core.

### Prerequisites

To start feature integration, review and install the necessary features:

| NAME | VERSION | INSTALLATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{page.release_tag}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Company Account | {{page.release_tag}} | [Install the Company Account feature](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-company-account-feature.html) |
| Checkout | {{page.release_tag}} | [Install the Checkout feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-checkout-feature.html) |
| Approval Process | {{page.release_tag}} | [Install the Approval Process feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-approval-process-feature.html) |

### 1) Install the required modules

```bash
composer require spryker-feature/purchasing-control:"^1.0.0" spryker/sales:"^11.83.0" spryker/sales-extension:"^1.15.0" spryker-shop/checkout-page:"^3.40.0" spryker-shop/company-page:"^2.36.0" spryker-shop/customer-page:"^2.77.0" spryker-shop/shop-ui:"^1.108.0" --update-with-dependencies --ignore-platform-req=ext-grpc
```

### 2) Set up database schema and transfer objects

Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in the database:

| DATABASE ENTITY | TYPE | EVENT |
| --- | --- | --- |
| spy_cost_center | table | created |
| spy_cost_center_to_company_business_unit | table | created |
| spy_budget | table | created |
| spy_budget_consumption | table | created |
| spy_quote.fk_cost_center | column | created |
| spy_quote.fk_budget | column | created |
| spy_sales_order.fk_cost_center | column | created |
| spy_sales_order.fk_budget | column | created |

Make sure the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| CostCenter | class | created | src/Generated/Shared/Transfer/CostCenterTransfer.php |
| CostCenterCollection | class | created | src/Generated/Shared/Transfer/CostCenterCollectionTransfer.php |
| CostCenterCriteria | class | created | src/Generated/Shared/Transfer/CostCenterCriteriaTransfer.php |
| CostCenterConditions | class | created | src/Generated/Shared/Transfer/CostCenterConditionsTransfer.php |
| CostCenterCollectionRequest | class | created | src/Generated/Shared/Transfer/CostCenterCollectionRequestTransfer.php |
| CostCenterCollectionResponse | class | created | src/Generated/Shared/Transfer/CostCenterCollectionResponseTransfer.php |
| CostCenterResponse | class | created | src/Generated/Shared/Transfer/CostCenterResponseTransfer.php |
| CostCenterQuoteUpdateRequest | class | created | src/Generated/Shared/Transfer/CostCenterQuoteUpdateRequestTransfer.php |
| CostCenterQuoteUpdateResponse | class | created | src/Generated/Shared/Transfer/CostCenterQuoteUpdateResponseTransfer.php |
| Budget | class | created | src/Generated/Shared/Transfer/BudgetTransfer.php |
| BudgetCollection | class | created | src/Generated/Shared/Transfer/BudgetCollectionTransfer.php |
| BudgetCriteria | class | created | src/Generated/Shared/Transfer/BudgetCriteriaTransfer.php |
| BudgetConditions | class | created | src/Generated/Shared/Transfer/BudgetConditionsTransfer.php |
| BudgetCollectionRequest | class | created | src/Generated/Shared/Transfer/BudgetCollectionRequestTransfer.php |
| BudgetCollectionResponse | class | created | src/Generated/Shared/Transfer/BudgetCollectionResponseTransfer.php |
| BudgetResponse | class | created | src/Generated/Shared/Transfer/BudgetResponseTransfer.php |
| BudgetConsumption | class | created | src/Generated/Shared/Transfer/BudgetConsumptionTransfer.php |
| BudgetConsumptionCollection | class | created | src/Generated/Shared/Transfer/BudgetConsumptionCollectionTransfer.php |
| BudgetConsumptionCriteria | class | created | src/Generated/Shared/Transfer/BudgetConsumptionCriteriaTransfer.php |
| BudgetConsumptionConditions | class | created | src/Generated/Shared/Transfer/BudgetConsumptionConditionsTransfer.php |
| Quote.idCostCenter | property | created | src/Generated/Shared/Transfer/QuoteTransfer.php |
| Quote.idBudget | property | created | src/Generated/Shared/Transfer/QuoteTransfer.php |
| Quote.costCenter | property | created | src/Generated/Shared/Transfer/QuoteTransfer.php |
| Quote.budget | property | created | src/Generated/Shared/Transfer/QuoteTransfer.php |
| Order.fkCostCenter | property | created | src/Generated/Shared/Transfer/OrderTransfer.php |
| Order.fkBudget | property | created | src/Generated/Shared/Transfer/OrderTransfer.php |
| Order.costCenter | property | created | src/Generated/Shared/Transfer/OrderTransfer.php |
| Order.budget | property | created | src/Generated/Shared/Transfer/OrderTransfer.php |
| OrderTableCriteria.costCenterIds | property | created | src/Generated/Shared/Transfer/OrderTableCriteriaTransfer.php |
| OrderTableCriteria.budgetIds | property | created | src/Generated/Shared/Transfer/OrderTableCriteriaTransfer.php |

{% endinfo_block %}

### 3) Set up data import

Register the following data import plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| CostCenterDataImportPlugin | Imports cost centers from `cost_center.csv`. Creates or updates cost centers by key, name, description, and active status. | None | SprykerFeature\Zed\PurchasingControl\Communication\Plugin\DataImport |
| BudgetDataImportPlugin | Imports budgets from `budget.csv`. Resolves the cost center by key and creates or updates budgets by cost center and name. | None | SprykerFeature\Zed\PurchasingControl\Communication\Plugin\DataImport |
| CostCenterToCompanyBusinessUnitDataImportPlugin | Imports cost center to company business unit relations from `cost_center_company_business_unit.csv`. Skips already existing relations. | None | SprykerFeature\Zed\PurchasingControl\Communication\Plugin\DataImport |

**src/Pyz/Zed/DataImport/DataImportDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DataImport;

use Spryker\Zed\DataImport\DataImportDependencyProvider as SprykerDataImportDependencyProvider;
use SprykerFeature\Zed\PurchasingControl\Communication\Plugin\DataImport\BudgetDataImportPlugin;
use SprykerFeature\Zed\PurchasingControl\Communication\Plugin\DataImport\CostCenterDataImportPlugin;
use SprykerFeature\Zed\PurchasingControl\Communication\Plugin\DataImport\CostCenterToCompanyBusinessUnitDataImportPlugin;

class DataImportDependencyProvider extends SprykerDataImportDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\DataImport\Dependency\Plugin\DataImportPluginInterface>
     */
    protected function getDataImporterPlugins(): array
    {
        return [
            // ...
            new CostCenterDataImportPlugin(), #PurchasingControlFeature
            new BudgetDataImportPlugin(), #PurchasingControlFeature
            new CostCenterToCompanyBusinessUnitDataImportPlugin(), #PurchasingControlFeature
        ];
    }
}
```

Create the CSV import files:

**data/import/common/common/cost_center.csv**

```csv
key,name,description,is_active
cc-marketing,Marketing,Marketing and communications expenses,1
cc-it,IT & Operations,IT infrastructure and software licenses,1
```

**data/import/common/common/budget.csv**

```csv
cost_center_key,name,amount,currency_iso_code,starts_at,ends_at,enforcement_rule,is_active
cc-marketing,Marketing Q2 2026,50000,EUR,2026-04-01,2026-06-30,warn,1
cc-it,IT Software Licenses 2026,100000,EUR,2026-01-01,2026-12-31,block,1
cc-it,IT Hardware Approvals 2026,200000,EUR,2026-01-01,2026-12-31,require_approval,1
```

**data/import/common/common/cost_center_company_business_unit.csv**

```csv
cost_center_key,business_unit_key
cc-marketing,spryker_systems_berlin
cc-it,spryker_systems_berlin
```

Import the data:

```bash
console data:import purchasing-control-cost-center
console data:import purchasing-control-budget
console data:import purchasing-control-cost-center-to-company-business-unit
```

{% info_block warningBox "Verification" %}

In the Back Office, under **Customers > Cost Centers**, make sure the imported cost centers and budgets are displayed. Make sure the cost centers are assigned to the expected business units.

{% endinfo_block %}

### 4) Set up behavior

Enable the following behaviors by registering the plugins.

#### Set up Zed plugins

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ManageCostCentersPermissionPlugin | Grants permission to create, update, and manage cost centers. Assign this permission to company roles that should have access to Purchasing Control management pages. | None | SprykerFeature\Shared\PurchasingControl\Plugin\Permission |
| BudgetCheckoutPreConditionPlugin | Validates the cart grand total against the remaining budget before checkout proceeds. Blocks checkout or triggers the approval flow depending on the budget enforcement rule. | None | SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Checkout |
| CostCenterOrderSaverPlugin | Saves the selected cost center and budget references to the sales order during checkout. | None | SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Checkout |
| ConsumeBudgetCheckoutPostSavePlugin | Records budget consumption immediately after the order is saved so the remaining budget balance is accurate for concurrent buyers. Does nothing when no budget is selected on the quote. | None | SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Checkout |
| CostCenterQuoteExpanderPlugin | Expands the quote with the default cost center assigned to the buyer's business unit when no cost center is already set. | None | SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Quote |
| CostCenterQuoteFieldsAllowedForSavingProviderPlugin | Adds `idCostCenter` and `idBudget` to the list of quote fields persisted to the database. | None | SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Quote |
| RestoreBudgetOnCancelOmsCommandPlugin | Restores the budget balance by deducting the amount of the canceled order items. Also deducts the shipment group total if all items in the group are canceled. | None | SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Oms |
| RestoreBudgetOnRefundOmsCommandPlugin | Restores the budget balance by deducting the refundable amount of the refunded order items. When refund with shipment is enabled, also deducts the shipment group expense refundable amount if all items in the group are refunded. | None | SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Oms |
| CostCenterOrderExpanderPlugin | Expands `OrderTransfer` with the assigned cost center and company name, and with the assigned budget when present. Does nothing when no cost center is assigned to the order. | None | SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Sales |
| CostCenterSearchOrderExpanderPlugin | Expands each `OrderTransfer` in a list with `CostCenterTransfer` and `BudgetTransfer` when assigned. Used for order search results. | None | SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Sales |
| CostCenterOrderSearchQueryExpanderPlugin | Expands `QueryJoinCollectionTransfer` with `WHERE` conditions for `fk_cost_center` and `fk_budget` when filter fields of type `costCenter` or `budget` are present. | None | SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Sales |
| CostCenterOrdersTableQueryExpanderPlugin | Adds a `LEFT JOIN` from `spy_sales_order.fk_cost_center` to `spy_cost_center.id_cost_center` and exposes `cost_center_name` as a virtual column on the Back Office orders table query. | None | SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Sales |
| CostCenterOrdersTableHeaderExpanderPlugin | Inserts a **Cost Center** column before the **Actions** column in the Back Office orders table. | None | SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Sales |
| CostCenterOrdersTableFilterFormExpanderPlugin | Adds cost center and budget multi-select filter fields to the Back Office orders table filter form. Budget choices are loaded via AJAX filtered by the selected cost centers. | None | SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Sales |
| CostCenterOrdersTableCriteriaFilterExpanderPlugin | Filters the Back Office orders table by `costCenterIds` and `budgetIds` when present on `OrderTableCriteriaTransfer`. | None | SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Sales |
| CostCenterSalesTablePlugin | Normalizes the `cost_center_name` column to `-` for orders that have no cost center assigned. | None | SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Sales |

#### Set up permissions

**src/Pyz/Zed/Permission/PermissionDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Permission;

use Spryker\Zed\Permission\PermissionDependencyProvider as SprykerPermissionDependencyProvider;
use SprykerFeature\Shared\PurchasingControl\Plugin\Permission\ManageCostCentersPermissionPlugin;

class PermissionDependencyProvider extends SprykerPermissionDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\PermissionExtension\Dependency\Plugin\PermissionPluginInterface>
     */
    protected function getPermissionPlugins(): array
    {
        return [
            // ...
            new ManageCostCentersPermissionPlugin(), #PurchasingControlFeature
        ];
    }
}
```

**src/Pyz/Client/Permission/PermissionDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Permission;

use Spryker\Client\Permission\PermissionDependencyProvider as SprykerPermissionDependencyProvider;
use SprykerFeature\Shared\PurchasingControl\Plugin\Permission\ManageCostCentersPermissionPlugin;

class PermissionDependencyProvider extends SprykerPermissionDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\PermissionExtension\Dependency\Plugin\PermissionPluginInterface>
     */
    protected function getPermissionPlugins(): array
    {
        return [
            // ...
            new ManageCostCentersPermissionPlugin(), #PurchasingControlFeature
        ];
    }
}
```

Sync the permission plugins to the database:

```bash
console sync:data permission
```

{% info_block warningBox "Verification" %}

In the Back Office, under **Customers > Company Roles**, assign the **ManageCostCentersPermissionPlugin** permission to a company role. Make sure company users with that role can access the cost center management pages on the Storefront.

{% endinfo_block %}

{% info_block infoBox "Require Approval enforcement rule" %}

If you configure budgets with the **Require Approval** enforcement rule, the following [Approval Process](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-approval-process-feature.html) permissions must be registered and assigned to company roles for the approval workflow to function:

| PERMISSION | REQUIRES |
| --- | --- |
| Buy up to grand total (`PlaceOrderPermissionPlugin`) | Send cart for approval |
| Send cart for approval (`RequestQuoteApprovalPermissionPlugin`) | Buy up to grand total |
| Approve up to grand total (`ApproveQuotePermissionPlugin`) | None |

For plugin registration details, see [Install the Approval Process feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-approval-process-feature.html).

{% endinfo_block %}

#### Set up Checkout plugins

**src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Checkout;

use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;
use Spryker\Zed\Kernel\Container;
use SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Checkout\BudgetCheckoutPreConditionPlugin;
use SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Checkout\ConsumeBudgetCheckoutPostSavePlugin;
use SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Checkout\CostCenterOrderSaverPlugin;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPreConditionPluginInterface>
     */
    protected function getCheckoutPreConditions(Container $container): array
    {
        return [
            // ...
            new BudgetCheckoutPreConditionPlugin(), #PurchasingControlFeature
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Spryker\Zed\Checkout\Dependency\Plugin\CheckoutSaveOrderInterface|\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutDoSaveOrderInterface>
     */
    protected function getCheckoutOrderSavers(Container $container): array
    {
        return [
            // ...
            new CostCenterOrderSaverPlugin(), #PurchasingControlFeature
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPostSaveInterface>
     */
    protected function getCheckoutPostHooks(Container $container): array
    {
        return [
            // ...
            new ConsumeBudgetCheckoutPostSavePlugin(), #PurchasingControlFeature
        ];
    }
}
```

{% info_block warningBox "Verification" %}

When a buyer places an order with a budget selected, verify the following:
- Checkout is blocked when the order exceeds a budget with the **Block** enforcement rule.
- An approval request is triggered when the order exceeds a budget with the **Require Approval** rule.
- A warning is displayed when the order exceeds a budget with the **Warn** rule.
- A `spy_budget_consumption` record is created after the order is successfully placed.
- The cost center and budget IDs are saved on the `spy_sales_order` record.

{% endinfo_block %}

#### Set up Quote plugins

**src/Pyz/Zed/Quote/QuoteDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Quote;

use Spryker\Zed\Quote\QuoteDependencyProvider as SprykerQuoteDependencyProvider;
use SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Quote\CostCenterQuoteExpanderPlugin;
use SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Quote\CostCenterQuoteFieldsAllowedForSavingProviderPlugin;

class QuoteDependencyProvider extends SprykerQuoteDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\QuoteExtension\Dependency\Plugin\QuoteExpanderPluginInterface>
     */
    protected function getQuoteExpanderPlugins(): array
    {
        return [
            // ...
            new CostCenterQuoteExpanderPlugin(), #PurchasingControlFeature
        ];
    }

    /**
     * @return array<\Spryker\Zed\QuoteExtension\Dependency\Plugin\QuoteFieldsAllowedForSavingProviderPluginInterface>
     */
    protected function getQuoteFieldsAllowedForSavingProviderPlugins(): array
    {
        return [
            // ...
            new CostCenterQuoteFieldsAllowedForSavingProviderPlugin(), #PurchasingControlFeature
        ];
    }
}
```

{% info_block warningBox "Verification" %}

When a buyer with an assigned business unit opens a cart, make sure the quote is automatically expanded with the default cost center of their business unit.

Make sure `idCostCenter` and `idBudget` are persisted to the `spy_quote` table when the quote is saved.

{% endinfo_block %}

#### Set up Sales plugins

**src/Pyz/Zed/Sales/SalesDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;
use SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Sales\CostCenterOrderExpanderPlugin;
use SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Sales\CostCenterOrderSearchQueryExpanderPlugin;
use SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Sales\CostCenterOrdersTableCriteriaFilterExpanderPlugin;
use SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Sales\CostCenterOrdersTableFilterFormExpanderPlugin;
use SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Sales\CostCenterOrdersTableHeaderExpanderPlugin;
use SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Sales\CostCenterOrdersTableQueryExpanderPlugin;
use SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Sales\CostCenterSalesTablePlugin;
use SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Sales\CostCenterSearchOrderExpanderPlugin;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\Sales\Dependency\Plugin\OrderExpanderPreSavePluginInterface>
     */
    protected function getOrderHydrationPlugins(): array
    {
        return [
            // ...
            new CostCenterOrderExpanderPlugin(), #PurchasingControlFeature
        ];
    }

    /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\SearchOrderExpanderPluginInterface>
     */
    protected function getSearchOrderExpanderPlugins(): array
    {
        return [
            // ...
            new CostCenterSearchOrderExpanderPlugin(), #PurchasingControlFeature
        ];
    }

    /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\SearchOrderQueryExpanderPluginInterface>
     */
    protected function getOrderSearchQueryExpanderPlugins(): array
    {
        return [
            // ...
            new CostCenterOrderSearchQueryExpanderPlugin(), #PurchasingControlFeature
        ];
    }

    /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrdersTableQueryExpanderPluginInterface>
     */
    protected function getOrdersTableQueryExpanderPlugins(): array
    {
        return [
            // ...
            new CostCenterOrdersTableQueryExpanderPlugin(), #PurchasingControlFeature
        ];
    }

    /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrdersTableHeaderExpanderPluginInterface>
     */
    protected function getOrdersTableHeaderExpanderPlugins(): array
    {
        return [
            // ...
            new CostCenterOrdersTableHeaderExpanderPlugin(), #PurchasingControlFeature
        ];
    }

    /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrdersTableFilterFormExpanderPluginInterface>
     */
    protected function getOrdersTableFilterFormExpanderPlugins(): array
    {
        return [
            // ...
            new CostCenterOrdersTableFilterFormExpanderPlugin(), #PurchasingControlFeature
        ];
    }

    /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrdersTableCriteriaFilterExpanderPluginInterface>
     */
    protected function getOrdersTableCriteriaFilterExpanderPlugins(): array
    {
        return [
            // ...
            new CostCenterOrdersTableCriteriaFilterExpanderPlugin(), #PurchasingControlFeature
        ];
    }

    /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\SalesTablePluginInterface>
     */
    protected function getSalesTablePlugins(): array
    {
        return [
            // ...
            new CostCenterSalesTablePlugin(), #PurchasingControlFeature
        ];
    }
}
```

{% info_block warningBox "Verification" %}

- In the Back Office, open **Sales > Orders**. Make sure the **Cost Center** column is displayed in the orders table.
- Make sure the orders table filter form includes cost center and budget multi-select fields.
- Open an individual order. Make sure the cost center and budget names are displayed on the order detail page.
- In the storefront, open **My Account > Orders**. Make sure the cost center and budget data appear on completed orders.

{% endinfo_block %}

### 5) Configure Back Office navigation

Add the Purchasing Control section to the Back Office navigation:

**config/Zed/navigation.xml**

```xml
<?xml version="1.0"?>
<config>
    <customer>
        ...
        <pages>
            ...
            <purchasing-control>
                <label>Cost Centers</label>
                <title>Cost Centers</title>
                <bundle>purchasing-control</bundle>
                <controller>cost-center</controller>
                <action>index</action>
            </purchasing-control>
        </pages>
    </customer>
</config>
```

Rebuild the navigation cache:

```bash
console navigation:build-cache
```

{% info_block warningBox "Verification" %}

In the Back Office, under **Customers**, make sure the **Cost Centers** menu item is displayed and links to the cost center list page.

{% endinfo_block %}

### 6) Configure the OMS process

Register the OMS command plugins and configure the OMS process XML.

#### Register OMS command plugins

**src/Pyz/Zed/Oms/OmsDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Oms;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Oms\Dependency\Plugin\Command\CommandCollectionInterface;
use Spryker\Zed\Oms\OmsDependencyProvider as SprykerOmsDependencyProvider;
use SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Oms\RestoreBudgetOnCancelOmsCommandPlugin;
use SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Oms\RestoreBudgetOnRefundOmsCommandPlugin;

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
            // ...
            $commandCollection->add(new RestoreBudgetOnCancelOmsCommandPlugin(), 'CostCenter/RestoreBudgetOnCancel'); #PurchasingControlFeature
            $commandCollection->add(new RestoreBudgetOnRefundOmsCommandPlugin(), 'CostCenter/RestoreBudgetOnRefund'); #PurchasingControlFeature

            return $commandCollection;
        });

        return $container;
    }
}
```

#### Configure the OMS process XML

Add the `CostCenter/RestoreBudgetOnCancel` and `CostCenter/RestoreBudgetOnRefund` commands to the relevant events in your OMS process XML. The following example uses `DummyPayment01`:

**config/Zed/oms/DummyPayment01.xml**

```xml
<events>
    ...
    <event name="cancel" manual="true" command="CostCenter/RestoreBudgetOnCancel"/>
    <event name="refund" manual="true" command="CostCenter/RestoreBudgetOnRefund"/>
    ...
</events>
```

#### Configure budget restoration behavior

By default, shipment costs are not included when restoring the budget on refund. To include shipment costs, override `isRefundWithShipmentEnabled()` in your project config:

**src/Pyz/Zed/PurchasingControl/PurchasingControlConfig.php**

```php
<?php

namespace Pyz\Zed\PurchasingControl;

use SprykerFeature\Zed\PurchasingControl\PurchasingControlConfig as SprykerPurchasingControlConfig;

class PurchasingControlConfig extends SprykerPurchasingControlConfig
{
    protected const bool REFUND_WITH_SHIPMENT_ENABLED = true;
}
```

{% info_block warningBox "Verification" %}

- Place an order with a budget selected. Cancel one item (partial cancel). Make sure the budget balance is increased by the amount of the canceled item only, not the full order total.
- Cancel all items of an order. Make sure the full consumed amount is restored to the budget balance.
- Trigger a refund on an order. Make sure the refunded items' amounts are restored to the budget balance.

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the Purchasing Control feature frontend.

### 1) Import data

Import the following glossary keys for Storefront translations:

**data/import/common/common/glossary.csv**

```csv
purchasing_control.selector.placeholder,Select cost center,en_US
purchasing_control.selector.placeholder,Kostenstelle wählen,de_DE
purchasing_control.budget.selector.label,Budget,en_US
purchasing_control.budget.selector.label,Budget,de_DE
purchasing_control.budget.selector.placeholder,Select budget,en_US
purchasing_control.budget.selector.placeholder,Budget wählen,de_DE
purchasing_control.budget.remaining,Remaining budget,en_US
purchasing_control.budget.remaining,Verbleibendes Budget,de_DE
purchasing_control.summary.cost_center_label,Cost Center,en_US
purchasing_control.summary.cost_center_label,Kostenstelle,de_DE
purchasing_control.summary.budget_label,Budget,en_US
purchasing_control.summary.budget_label,Budget,de_DE
purchasing_control.summary.budget_remaining,remaining,en_US
purchasing_control.summary.budget_remaining,verbleibend,de_DE
purchasing_control.validation.block,"Your order exceeds the allocated budget. Please adjust your order or contact your manager.",en_US
purchasing_control.validation.block,"Ihre Bestellung überschreitet das zugewiesene Budget. Bitte passen Sie Ihre Bestellung an oder kontaktieren Sie Ihren Manager.",de_DE
purchasing_control.validation.warn,Your order exceeds the allocated budget.,en_US
purchasing_control.validation.warn,Ihre Bestellung überschreitet das zugewiesene Budget.,de_DE
purchasing_control.validation.require-approval,This order exceeds the budget. Please send it for approval.,en_US
purchasing_control.validation.require-approval,Diese Bestellung überschreitet das Budget. Bitte senden Sie sie zur Genehmigung.,de_DE
purchasing_control.validation.required,"Please select a cost center and budget before placing your order.",en_US
purchasing_control.validation.required,"Bitte wählen Sie vor der Bestellung eine Kostenstelle und ein Budget aus.",de_DE
```

Import data:

```bash
console data:import:glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the `spy_glossary_key` and `spy_glossary_translation` tables.

{% endinfo_block %}

### 2) Set up widgets

Register the following global widgets:

| WIDGET | DESCRIPTION | NAMESPACE |
| --- | --- | --- |
| PurchasingControlSummaryWidget | Displays cost center count and budget summaries on the company dashboard. | SprykerFeature\Yves\PurchasingControl\Widget |
| CostCenterSelectorWidget | Renders the cost center and budget selection UI at checkout. | SprykerFeature\Yves\PurchasingControl\Widget |
| CostCenterMenuItemWidget | Renders the Purchasing Control navigation menu item in the storefront company menu. | SprykerFeature\Yves\PurchasingControl\Widget |
| CostCenterBudgetFilterWidget | Renders the cost center and budget filter controls on the order history page. | SprykerFeature\Yves\PurchasingControl\Widget |
| CostCenterOrderDetailWidget | Displays the assigned cost center and budget on the order detail page. | SprykerFeature\Yves\PurchasingControl\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerFeature\Yves\PurchasingControl\Widget\CostCenterBudgetFilterWidget;
use SprykerFeature\Yves\PurchasingControl\Widget\CostCenterMenuItemWidget;
use SprykerFeature\Yves\PurchasingControl\Widget\CostCenterOrderDetailWidget;
use SprykerFeature\Yves\PurchasingControl\Widget\CostCenterSelectorWidget;
use SprykerFeature\Yves\PurchasingControl\Widget\PurchasingControlSummaryWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            // ...
            CostCenterMenuItemWidget::class, #PurchasingControlFeature
            PurchasingControlSummaryWidget::class, #PurchasingControlFeature
            CostCenterSelectorWidget::class, #PurchasingControlFeature
            CostCenterOrderDetailWidget::class, #PurchasingControlFeature
            CostCenterBudgetFilterWidget::class, #PurchasingControlFeature
        ];
    }
}
```

{% info_block warningBox "Verification" %}

- Make sure all five widgets are available in Twig templates.
- On the storefront company dashboard, make sure the **Purchasing Control** summary widget displays cost center and budget data.
- On the checkout summary page, make sure the cost center and budget selector is displayed.
- On the order detail page, make sure the assigned cost center and budget names are displayed.
- On the order history page, make sure the cost center and budget filter controls are displayed.

{% endinfo_block %}

### 3) Extend the ShopUi select component

Extend the ShopUi `select` atom to render HTML attributes for the cost center and budget selectors:

**src/Pyz/Yves/ShopUi/Theme/default/components/atoms/select/select.twig**

```twig
{% raw %}{% block attributes %}
    {%- for attrname, attrvalue in attr | default({}) -%}
        {%- if attrvalue is same as(true) -%} {{ attrname }}="{{ attrname }}"
        {%- elseif attrvalue is not same as(false) -%} {{ attrname }}="{{ attrvalue }}"
        {%- endif -%}
    {%- endfor -%}
{% endblock %}{% endraw %}
```

{% info_block warningBox "Verification" %}

Make sure the cost center and budget dropdowns correctly disable unavailable options.

{% endinfo_block %}

### 4) Extend the checkout summary template

Add the `CostCenterSelectorWidget` to the checkout summary page, placing it directly above the `QuoteApprovalWidget` call:

**src/SprykerShop/CheckoutPage/src/SprykerShop/Yves/CheckoutPage/Theme/default/views/summary/summary.twig**

```twig
<div class="box">
    {% raw %}{% widget 'CostCenterSelectorWidget' args [data.cart] only %}{% endwidget %}{% endraw %}
    {% raw %}{% widget 'QuoteApprovalWidget' args [data.cart] only %}{% endwidget %}{% endraw %}
</div>
```

{% info_block warningBox "Verification" %}

On the checkout summary page, make sure the cost center and budget selector is displayed above the approval widget.

{% endinfo_block %}

### 5) Set up routes

Register the following route provider plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| CostCenterRouteProviderPlugin | Adds storefront routes for cost center list, create, update, and quote update actions. | None | SprykerFeature\Yves\PurchasingControl\Plugin\Router |
| BudgetRouteProviderPlugin | Adds storefront routes for budget list, create, and update actions. | None | SprykerFeature\Yves\PurchasingControl\Plugin\Router |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerFeature\Yves\PurchasingControl\Plugin\Router\BudgetRouteProviderPlugin;
use SprykerFeature\Yves\PurchasingControl\Plugin\Router\CostCenterRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return array<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        return [
            // ...
            new CostCenterRouteProviderPlugin(), #PurchasingControlFeature
            new BudgetRouteProviderPlugin(), #PurchasingControlFeature
        ];
    }
}
```

{% info_block warningBox "Verification" %}

- Make sure the cost center list, create, and update pages are accessible under `/company/cost-center`.
- Make sure submitting the cost center selector form in the cart updates the quote with the selected cost center and budget.
- Make sure the budget list, create, and update pages are accessible.

{% endinfo_block %}

### 6) Extend the order search form

Register the following plugins to add cost center and budget filter fields to the storefront order history search form:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| CostCenterOrderSearchFormExpanderPlugin | Adds cost center and budget filter dropdowns to the order history search form. Only adds fields when the current customer is a company user. | None | SprykerFeature\Yves\PurchasingControl\Plugin\CustomerPage |
| CostCenterOrderSearchFormHandlerPlugin | Maps selected cost center and budget IDs from the filter form to `FilterFieldTransfer` entries on `OrderListTransfer`. | None | SprykerFeature\Yves\PurchasingControl\Plugin\CustomerPage |

**src/Pyz/Yves/CustomerPage/CustomerPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\CustomerPage;

use SprykerShop\Yves\CustomerPage\CustomerPageDependencyProvider as SprykerShopCustomerPageDependencyProvider;
use SprykerFeature\Yves\PurchasingControl\Plugin\CustomerPage\CostCenterOrderSearchFormExpanderPlugin;
use SprykerFeature\Yves\PurchasingControl\Plugin\CustomerPage\CostCenterOrderSearchFormHandlerPlugin;

class CustomerPageDependencyProvider extends SprykerShopCustomerPageDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\CustomerPageExtension\Dependency\Plugin\OrderSearchFormExpanderPluginInterface>
     */
    protected function getOrderSearchFormExpanderPlugins(): array
    {
        return [
            // ...
            new CostCenterOrderSearchFormExpanderPlugin(), #PurchasingControlFeature
        ];
    }

    /**
     * @return array<\SprykerShop\Yves\CustomerPageExtension\Dependency\Plugin\OrderSearchFormHandlerPluginInterface>
     */
    protected function getOrderSearchFormHandlerPlugins(): array
    {
        return [
            // ...
            new CostCenterOrderSearchFormHandlerPlugin(), #PurchasingControlFeature
        ];
    }
}
```

{% info_block warningBox "Verification" %}

On the storefront **My Account > Orders** page, make sure company users see cost center and budget filter dropdowns. Make sure filtering by cost center or budget returns the expected orders.

{% endinfo_block %}
