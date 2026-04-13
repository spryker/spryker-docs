
This document describes how to install the [Purchasing Control feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/feature-overviews/purchasing-control-feature-overview.html).

## Install feature core

Follow the steps below to install the Purchasing Control feature core.

### Prerequisites

To start feature integration, review and install the necessary features:

| NAME | VERSION | INSTALLATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{page.release_tag}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Company Account | {{page.release_tag}} | [Install the Company Account feature](/docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-features/install-the-company-account-feature.html) |
| Checkout | {{page.release_tag}} | [Install the Checkout feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-checkout-feature.html) |
| Approval Process | {{page.release_tag}} | [Install the Approval Process feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-approval-process-feature.html) |

### 1) Install the required modules

```bash
composer require spryker-feature/purchasing-control:"{{page.release_tag}}" --update-with-dependencies
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
| CostCenterResponse | class | created | src/Generated/Shared/Transfer/CostCenterResponseTransfer.php |
| Budget | class | created | src/Generated/Shared/Transfer/BudgetTransfer.php |
| BudgetCollection | class | created | src/Generated/Shared/Transfer/BudgetCollectionTransfer.php |
| BudgetCriteria | class | created | src/Generated/Shared/Transfer/BudgetCriteriaTransfer.php |
| BudgetResponse | class | created | src/Generated/Shared/Transfer/BudgetResponseTransfer.php |
| BudgetConsumption | class | created | src/Generated/Shared/Transfer/BudgetConsumptionTransfer.php |
| Quote.idCostCenter | property | created | src/Generated/Shared/Transfer/QuoteTransfer.php |
| Quote.idBudget | property | created | src/Generated/Shared/Transfer/QuoteTransfer.php |
| Quote.costCenter | property | created | src/Generated/Shared/Transfer/QuoteTransfer.php |
| Quote.budget | property | created | src/Generated/Shared/Transfer/QuoteTransfer.php |

{% endinfo_block %}

### 3) Set up behavior

Enable the following behaviors by registering the plugins.

#### Set up Zed plugins

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| BudgetCheckoutPreConditionPlugin | Validates the cart grand total against the remaining budget before checkout proceeds. Blocks checkout or triggers the approval flow depending on the budget enforcement rule. | None | SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Checkout |
| CostCenterOrderSaverPlugin | Saves the selected cost center and budget references to the sales order during checkout. | None | SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Checkout |
| ConsumeBudgetCheckoutPostSavePlugin | Records budget consumption immediately after the order is saved so the remaining budget balance is accurate for concurrent buyers. Does nothing when no budget is selected on the quote. | None | SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Checkout |
| CostCenterQuoteExpanderPlugin | Expands the quote with the default cost center assigned to the buyer's business unit when no cost center is already set. | None | SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Quote |
| CostCenterQuoteFieldsAllowedForSavingProviderPlugin | Adds `idCostCenter` and `idBudget` to the list of quote fields persisted to the database. | None | SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Quote |
| RestoreBudgetOmsCommandPlugin | Deletes all budget consumption records for a sales order when the order is cancelled, restoring the consumed budget amount. | None | SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Oms |

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

**src/Pyz/Zed/Oms/OmsDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Oms;

use Spryker\Zed\Oms\Dependency\Plugin\Command\CommandCollectionInterface;
use Spryker\Zed\Oms\OmsDependencyProvider as SprykerOmsDependencyProvider;
use Spryker\Zed\Kernel\Container;
use SprykerFeature\Zed\PurchasingControl\Communication\Plugin\Oms\RestoreBudgetOmsCommandPlugin;

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
            $commandCollection->add(new RestoreBudgetOmsCommandPlugin(), 'CostCenter/RestoreBudget'); #PurchasingControlFeature

            return $commandCollection;
        });

        return $container;
    }
}
```

{% info_block warningBox "Verification" %}

When an order transitions to a cancelled state and the `CostCenter/RestoreBudget` OMS command runs, make sure the corresponding `spy_budget_consumption` records are deleted and the budget balance is restored.

{% endinfo_block %}

### 4) Configure Back Office navigation

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
                <label>Purchasing Control</label>
                <title>Purchasing Control</title>
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

In the Back Office, under **Customers**, make sure the **Purchasing Control** menu item is displayed and links to the cost center list page.

{% endinfo_block %}

### 5) Configure the OMS process

Add the `CostCenter/RestoreBudget` command to the `cancel` event in your OMS process XML. The following example uses `DummyPayment01`:

**config/Zed/oms/DummyPayment01.xml**

```xml
<events>
    ...
    <event name="cancel" manual="true" command="CostCenter/RestoreBudget"/>
    ...
</events>
```

{% info_block warningBox "Verification" %}

In the Back Office, open a placed order and trigger the **cancel** event. Make sure the `spy_budget_consumption` records for the order are deleted and the budget balance is restored.

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
| CostCenterSelectorWidget | Renders the cost center and budget selection UI in the cart or checkout. | SprykerFeature\Yves\PurchasingControl\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
use SprykerFeature\Yves\PurchasingControl\Widget\CostCenterSelectorWidget;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            // ...
            CostCenterSelectorWidget::class, #PurchasingControlFeature
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure the `CostCenterSelectorWidget` widget is available in Twig templates.

{% endinfo_block %}

### 3) Extend the checkout summary template

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

### 4) Set up routes

Register the following route provider plugin:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| CostCenterRouteProviderPlugin | Adds the `POST /cost-center/update-quote` route, which handles cost center and budget selection form submissions from the cart or checkout. | None | SprykerFeature\Yves\PurchasingControl\Plugin\Router |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
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
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure the route `cost-center-update-quote` is accessible and that submitting the cost center selector form in the cart updates the quote with the selected cost center and budget.

{% endinfo_block %}
