---
title: Install the Recurring Orders feature
description: Learn how to install the Recurring Orders feature into your Spryker project.
last_updated: Jul 30, 2026
template: feature-integration-guide-template
related:
  - title: Recurring Orders feature overview
    link: docs/pbc/all/order-experience-management/latest/base-shop/feature-overviews/recurring-orders-feature-overview.html
---

This document describes how to install the Recurring Orders feature.

## Install feature core

Follow the steps below to install the Recurring Orders feature core.

### Prerequisites

To start feature integration, review and install the necessary features:

| NAME | VERSION | INSTALLATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{page.release_tag}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Company Account | {{page.release_tag}} | [Install the Company Account feature](/docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-features/install-the-company-account-feature.html) |
| Checkout | {{page.release_tag}} | [Install the Checkout feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-checkout-feature.html) |
| Purchasing Control | {{page.release_tag}} | [Install the Purchasing Control feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-purchasing-control-feature.html) |

{% info_block infoBox "Purchasing Control" %}

The Purchasing Control feature is optional. Install it if you want buyers to assign a cost center and budget to a recurring order. Without it, the cost center and budget fields are not rendered on the recurring order forms.

{% endinfo_block %}

### 1) Install the required modules

{% info_block infoBox "Required modules" %}

```bash
composer require spryker-feature/order-experience-management:"^0.1.4" --update-with-dependencies
composer update \
  spryker/availability:"^9.32.0" \
  spryker/merchant:"^3.20.0" \
  spryker/merchant-product-option:"^1.4.0" \
  spryker/merchant-switcher:"^0.6.8" \
  spryker/product-approval:"^1.5.0" \
  spryker/product-bundle:"^7.28.0" \
  spryker/product-cart-connector:"^4.15.0" \
  spryker/product-configuration-cart:"^1.1.0" \
  spryker/product-discontinued:"^1.15.0" \
  spryker/product-offer:"^1.18.0" \
  spryker/product-packaging-unit:"^4.14.0" \
  spryker/product-quantity:"^3.8.0" \
  spryker-feature/purchasing-control:"^1.1.1" \
  spryker-shop/checkout-page:"^3.42.0" \
  spryker-shop/customer-page:"^2.80.0" \
  spryker-shop/product-search-widget:"^1.13.0" \
  --with-dependencies
```

{% endinfo_block %}

{% info_block infoBox "Product search widget" %}

`spryker-shop/product-search-widget` provides `ProductConcreteSearchWidget` and the `products-list` molecule that the **Review Required** page reuses in its add-product search bar. Install it even if your project does not use product search elsewhere.

{% endinfo_block %}

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
| spy_recurring_schedule | table | created |
| spy_recurring_schedule_item | table | created |
| spy_recurring_schedule_history | table | created |
| spy_recurring_schedule_forecast | table | created |

Make sure the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| RecurringSchedule | class | created | src/Generated/Shared/Transfer/RecurringScheduleTransfer.php |
| RecurringScheduleCollection | class | created | src/Generated/Shared/Transfer/RecurringScheduleCollectionTransfer.php |
| RecurringScheduleCriteria | class | created | src/Generated/Shared/Transfer/RecurringScheduleCriteriaTransfer.php |
| RecurringScheduleConditions | class | created | src/Generated/Shared/Transfer/RecurringScheduleConditionsTransfer.php |
| RecurringScheduleCollectionRequest | class | created | src/Generated/Shared/Transfer/RecurringScheduleCollectionRequestTransfer.php |
| RecurringScheduleCollectionResponse | class | created | src/Generated/Shared/Transfer/RecurringScheduleCollectionResponseTransfer.php |
| RecurringScheduleItem | class | created | src/Generated/Shared/Transfer/RecurringScheduleItemTransfer.php |
| RecurringScheduleItemAddition | class | created | src/Generated/Shared/Transfer/RecurringScheduleItemAdditionTransfer.php |
| RecurringScheduleHistory | class | created | src/Generated/Shared/Transfer/RecurringScheduleHistoryTransfer.php |
| RecurringScheduleValidationResult | class | created | src/Generated/Shared/Transfer/RecurringScheduleValidationResultTransfer.php |
| RecurringScheduleItemReview | class | created | src/Generated/Shared/Transfer/RecurringScheduleItemReviewTransfer.php |
| RecurringScheduleSubstituteOption | class | created | src/Generated/Shared/Transfer/RecurringScheduleSubstituteOptionTransfer.php |
| RecurringScheduleReviewResponse | class | created | src/Generated/Shared/Transfer/RecurringScheduleReviewResponseTransfer.php |
| RecurringScheduleEventRequest | class | created | src/Generated/Shared/Transfer/RecurringScheduleEventRequestTransfer.php |
| RecurringScheduleEventResponse | class | created | src/Generated/Shared/Transfer/RecurringScheduleEventResponseTransfer.php |
| RecurringScheduleStatusCount | class | created | src/Generated/Shared/Transfer/RecurringScheduleStatusCountTransfer.php |
| RecurringScheduleStatusCountCollection | class | created | src/Generated/Shared/Transfer/RecurringScheduleStatusCountCollectionTransfer.php |
| RecurringScheduleForecast | class | created | src/Generated/Shared/Transfer/RecurringScheduleForecastTransfer.php |
| RecurringScheduleForecastCollection | class | created | src/Generated/Shared/Transfer/RecurringScheduleForecastCollectionTransfer.php |
| RecurringScheduleForecastSnapshot | class | created | src/Generated/Shared/Transfer/RecurringScheduleForecastSnapshotTransfer.php |
| RecurringScheduleTableFilter | class | created | src/Generated/Shared/Transfer/RecurringScheduleTableFilterTransfer.php |
| RecurringScheduleDueData | class | created | src/Generated/Shared/Transfer/RecurringScheduleDueDataTransfer.php |
| RecurringScheduleError | class | created | src/Generated/Shared/Transfer/RecurringScheduleErrorTransfer.php |
| RecurringOrderSettings | class | created | src/Generated/Shared/Transfer/RecurringOrderSettingsTransfer.php |
| RecurringOrderQuoteUpdateRequest | class | created | src/Generated/Shared/Transfer/RecurringOrderQuoteUpdateRequestTransfer.php |
| RecurringOrderQuoteUpdateResponse | class | created | src/Generated/Shared/Transfer/RecurringOrderQuoteUpdateResponseTransfer.php |
| RecurringOrderReloadResult | class | created | src/Generated/Shared/Transfer/RecurringOrderReloadResultTransfer.php |
| Quote.recurringOrderSettings | property | created | src/Generated/Shared/Transfer/QuoteTransfer.php |

{% endinfo_block %}

### 3) Set up data import

Import the CMS blocks that provide the HTML and text templates for recurring order notification emails.

The CMS block definitions are provided in the module at `src/SprykerFeature/OrderExperienceManagement/data/import/cms_block.csv`. Copy the contents of that file and add them to **data/import/common/common/cms_block.csv**.

For each store you want to enable the email notifications in, add the corresponding block keys to **data/import/common/{store}/cms_block_store.csv**.

Import the data:

```bash
console data:import:cms-block
console data:import:cms-block-store
```

{% info_block warningBox "Verification" %}

In the Back Office, under **Content > Blocks**, make sure the CMS blocks from the module file are present and active.

{% endinfo_block %}

### 4) Set up behavior

Enable the following behaviors by registering the plugins.

#### Set up Checkout plugins

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| RecurringOrderCheckoutPreConditionPlugin | Validates the quote is eligible for a recurring order before checkout proceeds. Checks that the quote is not locked, not from an RFQ, not a guest session, the payment method is invoice-based, and the cadence type is registered and valid. | None | SprykerFeature\Zed\OrderExperienceManagement\Communication\Plugin\Checkout |
| RecurringOrdersCheckoutPostSavePlugin | Creates a recurring schedule and registers it with the state machine after the order is successfully saved. Does nothing when `recurringOrderSettings` is not set on the quote. | None | SprykerFeature\Zed\OrderExperienceManagement\Communication\Plugin\Checkout |

**src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Checkout;

use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;
use Spryker\Zed\Kernel\Container;
use SprykerFeature\Zed\OrderExperienceManagement\Communication\Plugin\Checkout\RecurringOrderCheckoutPreConditionPlugin;
use SprykerFeature\Zed\OrderExperienceManagement\Communication\Plugin\Checkout\RecurringOrdersCheckoutPostSavePlugin;

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
            new RecurringOrderCheckoutPreConditionPlugin(), #RecurringOrdersFeature
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
            new RecurringOrdersCheckoutPostSavePlugin(), #RecurringOrdersFeature
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Add a product to the cart, set a recurring order cadence on the quote, and complete checkout. Make sure a recurring schedule is created in `spy_recurring_schedule`.
2. Attempt to place a recurring order with a non-invoice payment method. Make sure checkout is blocked.
3. Attempt to place a recurring order with an invalid cadence type. Make sure checkout is blocked.

{% endinfo_block %}

#### Set up cadence type and schedule validator plugins

Register the built-in cadence type and schedule validator plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| WeeklyCadenceTypePlugin | Calculates the next trigger date 7 days after the current trigger date. | None | SprykerFeature\Zed\OrderExperienceManagement\Communication\Plugin\Cadence |
| BiWeeklyCadenceTypePlugin | Calculates the next trigger date 14 days after the current trigger date. | None | SprykerFeature\Zed\OrderExperienceManagement\Communication\Plugin\Cadence |
| MonthlyCadenceTypePlugin | Calculates the next trigger date on the same day of the following month. | None | SprykerFeature\Zed\OrderExperienceManagement\Communication\Plugin\Cadence |
| EveryNWeeksCadenceTypePlugin | Calculates the next trigger date every N weeks. Requires `cadenceValue` to be set on the schedule. | None | SprykerFeature\Zed\OrderExperienceManagement\Communication\Plugin\Cadence |
| PriceScheduleValidatorPlugin | Detects price increases on recurring schedule items compared to their stored reference prices before order placement. | None | SprykerFeature\Zed\OrderExperienceManagement\Communication\Plugin\ScheduleValidator |
| CheckoutPlaceabilityScheduleValidatorPlugin | Simulates a checkout to detect availability, discontinuation, or product approval issues on recurring schedule items before order placement. | None | SprykerFeature\Zed\OrderExperienceManagement\Communication\Plugin\ScheduleValidator |

**src/Pyz/Zed/OrderExperienceManagement/OrderExperienceManagementDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\OrderExperienceManagement;

use SprykerFeature\Zed\OrderExperienceManagement\Communication\Plugin\Cadence\BiWeeklyCadenceTypePlugin;
use SprykerFeature\Zed\OrderExperienceManagement\Communication\Plugin\Cadence\EveryNWeeksCadenceTypePlugin;
use SprykerFeature\Zed\OrderExperienceManagement\Communication\Plugin\Cadence\MonthlyCadenceTypePlugin;
use SprykerFeature\Zed\OrderExperienceManagement\Communication\Plugin\Cadence\WeeklyCadenceTypePlugin;
use SprykerFeature\Zed\OrderExperienceManagement\Communication\Plugin\ScheduleValidator\CheckoutPlaceabilityScheduleValidatorPlugin;
use SprykerFeature\Zed\OrderExperienceManagement\Communication\Plugin\ScheduleValidator\PriceScheduleValidatorPlugin;
use SprykerFeature\Zed\OrderExperienceManagement\OrderExperienceManagementDependencyProvider as SprykerOrderExperienceManagementDependencyProvider;

class OrderExperienceManagementDependencyProvider extends SprykerOrderExperienceManagementDependencyProvider
{
    /**
     * @return array<\SprykerFeature\Zed\OrderExperienceManagement\Dependency\Plugin\CadenceTypePluginInterface>
     */
    protected function getCadenceTypePlugins(): array
    {
        return [
            new WeeklyCadenceTypePlugin(), #RecurringOrdersFeature
            new BiWeeklyCadenceTypePlugin(), #RecurringOrdersFeature
            new MonthlyCadenceTypePlugin(), #RecurringOrdersFeature
            new EveryNWeeksCadenceTypePlugin(), #RecurringOrdersFeature
        ];
    }

    /**
     * @return array<\SprykerFeature\Zed\OrderExperienceManagement\Dependency\Plugin\ScheduleValidatorPluginInterface>
     */
    protected function getScheduleValidatorPlugins(): array
    {
        return [
            new PriceScheduleValidatorPlugin(), #RecurringOrdersFeature
            new CheckoutPlaceabilityScheduleValidatorPlugin(), #RecurringOrdersFeature
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure all four cadence types (weekly, bi-weekly, monthly, every N weeks) are available when setting up a recurring order on the storefront.

{% endinfo_block %}

#### Set up the state machine handler

Register the recurring orders state machine handler:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| RecurringOrdersStateMachineHandlerPlugin | Registers the `RecurringOrder` state machine process, maps commands and conditions to plugins, updates the state machine item state on each transition, and returns schedule items by state IDs. | None | SprykerFeature\Zed\OrderExperienceManagement\Communication\Plugin\StateMachine |

**src/Pyz/Zed/StateMachine/StateMachineDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\StateMachine;

use Spryker\Zed\StateMachine\StateMachineDependencyProvider as SprykerStateMachineDependencyProvider;
use SprykerFeature\Zed\OrderExperienceManagement\Communication\Plugin\StateMachine\RecurringOrdersStateMachineHandlerPlugin;

class StateMachineDependencyProvider extends SprykerStateMachineDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\StateMachine\Dependency\Plugin\StateMachineHandlerInterface>
     */
    protected function getStateMachineHandlers(): array
    {
        return [
            // ...
            new RecurringOrdersStateMachineHandlerPlugin(), #RecurringOrdersFeature
        ];
    }
}
```

Copy the state machine process XML from the module into your project. The example file is located at `src/SprykerFeature/OrderExperienceManagement/config/Zed/StateMachine/RecurringOrder/RecurringOrderStateMachine.xml` in the module. Add it to your project at the following path:

**config/Zed/StateMachine/RecurringOrder/RecurringOrderStateMachine.xml**

The handler plugin registers the following commands and conditions, so you do not need to register them individually. Reference them by name if you extend the process XML:

| TYPE | NAME | SPECIFICATION |
| --- | --- | --- |
| Condition | RecurringOrders/IsScheduleDue | Checks whether the schedule has entered its notification window. |
| Condition | RecurringOrders/IsPlacementDue | Checks whether the trigger date has been reached. |
| Condition | RecurringOrders/IsScheduleValid | Runs the registered schedule validator plugins and reports whether the schedule can be placed. |
| Condition | RecurringOrders/IsOrderPlaced | Checks whether the sales order has been created successfully. |
| Command | RecurringOrders/NotifyBuyer | Sends the pre-trigger notification email. |
| Command | RecurringOrders/PlaceOrder | Places the order from the stored quote data. |
| Command | RecurringOrders/CompletePlacement | Writes the placement result to the schedule history. |
| Command | RecurringOrders/AdvanceSchedule | Calculates and stores the next trigger date using the registered cadence type plugin. |

{% info_block warningBox "Verification" %}

In the Back Office, under **Maintenance > State Machine**, make sure the `RecurringOrderStateMachine` process is listed and the diagram renders correctly.

{% endinfo_block %}

#### Set up Mail plugins

Register the following mail type builder plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| RecurringOrderUpcomingNotificationMailTypeBuilderPlugin | Builds the pre-trigger notification email sent to the buyer a configurable number of hours before the scheduled order is placed. | None | SprykerFeature\Zed\OrderExperienceManagement\Communication\Plugin\Mail |
| RecurringOrderValidationFailedMailTypeBuilderPlugin | Builds the review-required notification email sent to the buyer when a price increase or product availability issue is detected. | None | SprykerFeature\Zed\OrderExperienceManagement\Communication\Plugin\Mail |
| RecurringOrderFailureMailTypeBuilderPlugin | Builds the order placement failure notification email sent to the buyer when order placement fails. | None | SprykerFeature\Zed\OrderExperienceManagement\Communication\Plugin\Mail |

**src/Pyz/Zed/Mail/MailDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Mail;

use Spryker\Zed\Mail\MailDependencyProvider as SprykerMailDependencyProvider;
use SprykerFeature\Zed\OrderExperienceManagement\Communication\Plugin\Mail\RecurringOrderFailureMailTypeBuilderPlugin;
use SprykerFeature\Zed\OrderExperienceManagement\Communication\Plugin\Mail\RecurringOrderUpcomingNotificationMailTypeBuilderPlugin;
use SprykerFeature\Zed\OrderExperienceManagement\Communication\Plugin\Mail\RecurringOrderValidationFailedMailTypeBuilderPlugin;

class MailDependencyProvider extends SprykerMailDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\MailExtension\Dependency\Plugin\MailTypeBuilderPluginInterface>
     */
    protected function getMailTypeBuilderPlugins(): array
    {
        return [
            // ...
            new RecurringOrderUpcomingNotificationMailTypeBuilderPlugin(), #RecurringOrdersFeature
            new RecurringOrderValidationFailedMailTypeBuilderPlugin(), #RecurringOrdersFeature
            new RecurringOrderFailureMailTypeBuilderPlugin(), #RecurringOrdersFeature
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Trigger a recurring order cycle and verify the following:
- A pre-trigger notification email is sent to the buyer within the configured notification window hours.
- When a price increase or product availability issue is detected, a review-required email is sent.
- When order placement fails, a failure notification email is sent.

{% endinfo_block %}

#### Set up permissions

By default, a company user can only see their own recurring orders. To allow users to view recurring orders across their company or business unit, register the following permission plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| SeeCompanyOrdersPermissionPlugin | Grants permission to view all recurring orders within the company. Assign to company roles that should have company-wide visibility. | None | Spryker\Zed\CompanySalesConnector\Communication\Plugin\Permission |
| SeeBusinessUnitOrdersPermissionPlugin | Grants permission to view all recurring orders within the company business unit. Assign to company roles that should have business-unit-wide visibility. | None | Spryker\Zed\CompanyBusinessUnitSalesConnector\Communication\Plugin\Permission |

**src/Pyz/Zed/Permission/PermissionDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Permission;

use Spryker\Zed\CompanyBusinessUnitSalesConnector\Communication\Plugin\Permission\SeeBusinessUnitOrdersPermissionPlugin;
use Spryker\Zed\CompanySalesConnector\Communication\Plugin\Permission\SeeCompanyOrdersPermissionPlugin;
use Spryker\Zed\Permission\PermissionDependencyProvider as SprykerPermissionDependencyProvider;

class PermissionDependencyProvider extends SprykerPermissionDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\PermissionExtension\Dependency\Plugin\PermissionPluginInterface>
     */
    protected function getPermissionPlugins(): array
    {
        return [
            // ...
            new SeeCompanyOrdersPermissionPlugin(), #RecurringOrdersFeature
            new SeeBusinessUnitOrdersPermissionPlugin(), #RecurringOrdersFeature
        ];
    }
}
```

**src/Pyz/Client/Permission/PermissionDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Permission;

use Spryker\Client\CompanyBusinessUnitSalesConnector\Plugin\Permission\SeeBusinessUnitOrdersPermissionPlugin;
use Spryker\Client\CompanySalesConnector\Plugin\Permission\SeeCompanyOrdersPermissionPlugin;
use Spryker\Client\Permission\PermissionDependencyProvider as SprykerPermissionDependencyProvider;

class PermissionDependencyProvider extends SprykerPermissionDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\PermissionExtension\Dependency\Plugin\PermissionPluginInterface>
     */
    protected function getPermissionPlugins(): array
    {
        return [
            // ...
            new SeeCompanyOrdersPermissionPlugin(), #RecurringOrdersFeature
            new SeeBusinessUnitOrdersPermissionPlugin(), #RecurringOrdersFeature
        ];
    }
}
```

{% info_block warningBox "Verification" %}

In the Back Office, under **Customers > Company Roles**, assign `SeeCompanyOrdersPermissionPlugin` to a company role. Make sure company users with that role can see all recurring orders within their company on the storefront.

Assign `SeeBusinessUnitOrdersPermissionPlugin` to a role. Make sure users with that role can see all recurring orders within their business unit.

{% endinfo_block %}

#### Set up console commands

Register the following console commands:

| COMMAND | CONSOLE CLASS | SPECIFICATION | NAMESPACE |
| --- | --- | --- | --- |
| `recurring-orders:forecast:refresh` | RecurringOrderForecastRefreshConsole | Recalculates the monthly recurring volume forecast—orders already placed plus schedules still due—and stores it as a snapshot in `spy_recurring_schedule_forecast`. The Back Office **Recurring Order Schedules** page reads the stored snapshot instead of recalculating on each request. | SprykerFeature\Zed\OrderExperienceManagement\Communication\Console |
| `recurring-orders:trigger-placement` | RecurringOrderTriggerConsole | Manually triggers order placement for a specific recurring schedule. Optional—intended for development and debugging. | SprykerFeature\Zed\OrderExperienceManagement\Communication\Console |

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\Kernel\Container;
use SprykerFeature\Zed\OrderExperienceManagement\Communication\Console\RecurringOrderForecastRefreshConsole;
use SprykerFeature\Zed\OrderExperienceManagement\Communication\Console\RecurringOrderTriggerConsole;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container): array
    {
        return [
            // ...
            new RecurringOrderForecastRefreshConsole(), #RecurringOrdersFeature
            new RecurringOrderTriggerConsole(), #RecurringOrdersFeature
        ];
    }
}
```

`RecurringOrderTriggerConsole` runs the same placement logic as the state machine `PlaceOrder` command, which makes it useful for development, debugging, and one-off operational tasks:

```bash
# Trigger placement by numeric ID
console recurring-orders:trigger-placement 42

# Trigger placement by UUID
console recurring-orders:trigger-placement 550e8400-e29b-41d4-a716-446655440000

# Run pre-placement validation first; aborts if validation fails
console recurring-orders:trigger-placement 42 --validate
```

The `--validate` flag runs all registered `ScheduleValidatorPlugin` implementations (for example, `PriceScheduleValidatorPlugin` and `CheckoutPlaceabilityScheduleValidatorPlugin`) before attempting placement. If any validator reports a failure, the command exits with an error and does not place the order.

{% info_block warningBox "Development use only" %}

`recurring-orders:trigger-placement` is intended for development and debugging. Do not use it in production automated pipelines—the state machine cron job is the intended trigger for production order placement.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Run `console recurring-orders:forecast:refresh`. Make sure the command completes successfully and a row with `forecast_key` set to `monthly` is created in `spy_recurring_schedule_forecast`.

{% endinfo_block %}

#### Set up cron jobs

The recurring orders state machine relies on a cron job to evaluate condition transitions, and the Back Office forecast relies on a cron job to refresh its snapshot. Register the jobs in your Jenkins configuration:

**config/Zed/cronjobs/jenkins.php**

```php
/* RecurringOrder StateMachine */
$jobs[] = [
    'name' => 'recurring-order-check-conditions',
    'command' => '$PHP_BIN vendor/bin/console state-machine:check-condition RecurringOrder',
    'schedule' => '* * * * *',
    'enable' => true,
];

/* RecurringOrder forecast */
$jobs[] = [
    'name' => 'recurring-order-forecast-refresh',
    'command' => '$PHP_BIN vendor/bin/console recurring-orders:forecast:refresh',
    'schedule' => '0 * * * *',
    'enable' => true,
];
```

{% info_block infoBox "Scheduling recommendation" %}

To have recurring orders placed before the business day starts, set trigger dates to an early morning time (for example, 01:00) and configure the schedule grace period to `18` hours or more. With an 18-hour window, the pre-trigger notification is sent the previous afternoon (after 12:00), allowing the buyer to review or skip before the order is placed overnight.

{% endinfo_block %}

If your project uses Symfony Scheduler instead of Jenkins, register the equivalent jobs in your scheduler config:

**src/Pyz/Zed/SymfonyScheduler/SymfonySchedulerConfig.php**

```php
'recurring-orders-check-condition' => [
    'command' => '$PHP_BIN vendor/bin/console state-machine:check-condition RecurringOrder',
    'schedule' => '* * * * *',
],
'recurring-orders-clear-locks' => [
    'command' => '$PHP_BIN vendor/bin/console state-machine:clear-locks',
    'schedule' => '0 6 * * *',
],
'recurring-orders-forecast-refresh' => [
    'command' => '$PHP_BIN vendor/bin/console recurring-orders:forecast:refresh',
    'schedule' => '0 * * * *',
],
```

{% info_block warningBox "Verification" %}

1. Activate a recurring schedule. Make sure the state machine condition check job runs and the schedule transitions from `draft` to `active` within one minute.
2. Make sure the forecast refresh job runs hourly and updates `calculated_at` in `spy_recurring_schedule_forecast`.

{% endinfo_block %}

#### Set up the Back Office navigation

To make the recurring order schedules list available in the Back Office, add the navigation entry to your project navigation:

**config/Zed/navigation.xml**

```xml
<recurring-order-schedules>
    <label>Recurring Order Schedules</label>
    <title>Recurring Order Schedules</title>
    <bundle>order-experience-management</bundle>
    <controller>recurring-schedule</controller>
    <action>index</action>
    <visible>1</visible>
</recurring-order-schedules>
```

Rebuild the navigation cache:

```bash
console navigation:build-cache
```

{% info_block warningBox "Verification" %}

In the Back Office, go to **Sales > Recurring Order Schedules**. Make sure the list of recurring order schedules is displayed with the status and cadence filters, and that the **Total Committed Recurring Volume** widget shows the already-placed and still-planned breakdown. Open a schedule and make sure the detail view renders the schedule items with their merchant and configurable bundle names, the customer, and a link to the source order.

{% endinfo_block %}

#### Configure product bundle field copying

{% info_block infoBox "Product Bundles feature" %}

This step is only required if your project uses the [Product Bundles feature](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-bundles-feature-overview.html).

{% endinfo_block %}

Override the allowed fields to copy so that shipment information is preserved when recurring orders re-create bundle items:

| CONFIGURATION METHOD | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| `getAllowedBundleItemFieldsToCopy()` | Returns the list of `ItemTransfer` fields copied from bundle items when they are duplicated during order re-creation. Adding `ItemTransfer::SHIPMENT` ensures the shipment is preserved on each recurring order placement. | None | Pyz\Zed\ProductBundle |

**src/Pyz/Zed/ProductBundle/ProductBundleConfig.php**

```php
<?php

namespace Pyz\Zed\ProductBundle;

use Generated\Shared\Transfer\ItemTransfer;
use Spryker\Zed\ProductBundle\ProductBundleConfig as SprykerProductBundleConfig;

class ProductBundleConfig extends SprykerProductBundleConfig
{
    /**
     * @return list<string>
     */
    public function getAllowedBundleItemFieldsToCopy(): array
    {
        return [
            ItemTransfer::SHIPMENT,
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Add a product bundle to the cart, set up a recurring order, and complete checkout. On the next scheduled order placement, make sure the bundle items are re-created with the correct shipment assignment.

{% endinfo_block %}

### 5) Configure module behavior

Override the following configuration methods in your project (if needed) to adjust the default behavior:

**src/Pyz/Zed/OrderExperienceManagement/OrderExperienceManagementConfig.php**

```php
<?php

namespace Pyz\Zed\OrderExperienceManagement;

use SprykerFeature\Shared\OrderExperienceManagement\OrderExperienceManagementConfig as SharedOrderExperienceManagementConfig;
use SprykerFeature\Zed\OrderExperienceManagement\OrderExperienceManagementConfig as SprykerOrderExperienceManagementConfig;

class OrderExperienceManagementConfig extends SprykerOrderExperienceManagementConfig
{
    /**
     * Specification:
     * - Returns the number of hours before the trigger date when the pre-trigger notification is sent.
     * - Default: 48 hours.
     * - Overriding this value affects all schedules that do not have a per-schedule override.
     *
     * @api
     */
    public function getDefaultNotificationWindowHours(): int
    {
        return 18;
    }

    /**
     * Specification:
     * - Returns a map of review reason groups to the checkout error types that resolve to them.
     * - Override to add custom checkout error types to existing groups or to introduce new groups.
     * - The key is a SharedOrderExperienceManagementConfig::REVIEW_REASON_GROUP_* constant.
     * - The value is a list of raw checkout error type strings reported by the checkout facade.
     *
     * @api
     *
     * @return array<string, array<string>>
     */
    public function getReviewReasonGroupMap(): array
    {
        return array_merge_recursive(parent::getReviewReasonGroupMap(), [
            SharedOrderExperienceManagementConfig::REVIEW_REASON_GROUP_UNAVAILABLE => [
                // Add project-specific checkout error types here.
            ],
        ]);
    }

    /**
     * Specification:
     * - Returns the review reason groups whose items are treated as non-purchasable.
     * - Items in these groups block order placement and must be removed before the order can proceed.
     * - Default: [REVIEW_REASON_GROUP_UNAVAILABLE, REVIEW_REASON_GROUP_OUT_OF_STOCK].
     * - Override to add REVIEW_REASON_GROUP_DISCONTINUED if discontinued items should also block placement.
     *
     * @api
     *
     * @return array<string>
     */
    public function getNonPurchasableReviewReasonGroups(): array
    {
        return [
            SharedOrderExperienceManagementConfig::REVIEW_REASON_GROUP_UNAVAILABLE,
            SharedOrderExperienceManagementConfig::REVIEW_REASON_GROUP_OUT_OF_STOCK,
            SharedOrderExperienceManagementConfig::REVIEW_REASON_GROUP_DISCONTINUED,
        ];
    }

    /**
     * Specification:
     * - Returns the relative date modifier used as the forecast period's lower bound.
     * - The bound applies to both forecast inputs: schedules still due to run and orders already placed.
     * - Use FORECAST_PERIOD_FROM_TODAY to cover only the remainder of the current month.
     *
     * @api
     */
    public function getForecastPeriodFrom(): string
    {
        return static::FORECAST_PERIOD_FROM_TODAY;
    }
}
```

| CONFIGURATION METHOD | DEFAULT | DESCRIPTION |
| --- | --- | --- |
| `getDefaultNotificationWindowHours()` | `48` | Number of hours before the trigger date when the pre-trigger notification is sent. Per-schedule overrides stored in `spy_recurring_schedule.notification_window_hours` take precedence. |
| `getReviewReasonGroupMap()` | See `OrderExperienceManagementConfig` | Maps review reason groups to checkout error types. Extend to map project-specific error types to the appropriate review group. |
| `getNonPurchasableReviewReasonGroups()` | `[REVIEW_REASON_GROUP_UNAVAILABLE, REVIEW_REASON_GROUP_OUT_OF_STOCK]` | Review reason groups whose items block order placement and must be removed before the order can proceed. Override to also block on `REVIEW_REASON_GROUP_DISCONTINUED`. |
| `getDefaultReviewReasonGroup()` | `REVIEW_REASON_GROUP_UNAVAILABLE` | Fallback review reason group used when a checkout error type does not match any known group. |
| `getForecastPeriodFrom()` | `FORECAST_PERIOD_FROM_MONTH_START` | Lower bound of the Back Office forecast period. Applies to both forecast inputs: schedules still due to run and orders already placed. Switch to `FORECAST_PERIOD_FROM_TODAY` to cover only the remainder of the current month. |
| `getForecastPeriodTo()` | `FORECAST_PERIOD_TO_MONTH_END` | Upper bound of the Back Office forecast period. Applies to both forecast inputs. |
| `getMonthlyForecastKey()` | `monthly` | Key under which the forecast snapshot is stored in `spy_recurring_schedule_forecast`. |
| `getBackOfficeFilterStatuses()` | Active, Paused, Review required, Cancelled, Failed | Statuses selectable in the Back Office **Recurring Order Schedules** filter. |
| `getBackOfficeFilterCadenceTypes()` | Weekly, Bi-weekly, Monthly, Every N weeks | Cadence types selectable in the Back Office **Recurring Order Schedules** filter. Extend it when you register a custom cadence type plugin. |
| `getSmStateNameToStatusMap()` | See `OrderExperienceManagementConfig` | Maps each state machine state name to the public schedule status it represents. Extend it when you add states to the process XML. |
| `getSupportedAddedItemShipmentTypeKeys()` | `[delivery, on_site_service]` | Shipment type keys accepted for products added on the **Review Required** page, in preference order. |
| `getStateMachineName()` | `RecurringOrder` | Name of the state machine. Must match the directory name under `config/Zed/StateMachine`. |
| `getProcessName()` | `RecurringOrderStateMachine` | Name of the state machine process definition file, without the `.xml` extension. |
| `getInitialState()` | `draft` | Initial state assigned to a newly created schedule. |
| `getBaseUrlYves()` | `SprykerConstants::BASE_URL_YVES` | Base storefront URL used to build the links included in notification emails. |
| `getRecurringOrderDetailUrlPath()` | `/recurring-orders` | Storefront path used to build the schedule detail link in notification emails. Update it if you change the route patterns. |
| `getRecurringOrderReviewUrlPath()` | `/recurring-orders/%s/review-required` | Storefront path used to build the review link in notification emails. Update it if you change the route patterns. |

### 6) Import Back Office translations

The module ships Back Office translations at `src/SprykerFeature/OrderExperienceManagement/data/translation/Zed/{locale}.csv`. These cover the **Recurring Order Schedules** page, the table filters, and the Back Office configuration labels.

Rebuild the translation cache:

```bash
console translator:generate-cache
```

{% info_block warningBox "Verification" %}

In the Back Office, open **Sales > Recurring Order Schedules**. Make sure the column headers, filter labels, and status badges are translated instead of showing raw glossary keys.

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the Recurring Orders feature frontend.

### 1) Set up routes

Register the following route provider plugin:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| RecurringOrderRouteProviderPlugin | Adds the storefront routes for the recurring order list, detail, edit, review, product search, product offer selection, shipment method, and schedule action pages. | None | SprykerFeature\Yves\OrderExperienceManagement\Plugin\Router |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerFeature\Yves\OrderExperienceManagement\Plugin\Router\RecurringOrderRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return array<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        return [
            // ...
            new RecurringOrderRouteProviderPlugin(), #RecurringOrdersFeature
        ];
    }
}
```

After registering the plugin, warm up the router caches:

```bash
vendor/bin/yves router:cache:warm-up
vendor/bin/console router:cache:warm-up
vendor/bin/console router:cache:warm-up:backend-gateway
```

{% info_block warningBox "Verification" %}

Make sure the following storefront routes are accessible:

| ROUTE NAME | PATTERN | PURPOSE |
| --- | --- | --- |
| recurring-orders | `/recurring-orders` | Recurring order list page. |
| recurring-orders/detail | `/recurring-orders/{uuid}` | Recurring order detail page. |
| recurring-orders/review-required | `/recurring-orders/{uuid}/review-required` | Review required page. |
| recurring-order/edit | `/recurring-order/{uuid}/edit` | Recurring schedule edit form. |
| recurring-order/form | `/recurring-order-form` | Recurring order setup form rendered at checkout. |
| recurring-order/save | `/recurring-order/save` | Saves recurring order settings on the quote. |
| recurring-order/clear | `/recurring-order/clear` | Removes recurring order settings from the quote. |
| recurring-order/pause | `/recurring-order/{uuid}/pause` | Pauses a schedule. |
| recurring-order/resume | `/recurring-order/{uuid}/resume` | Resumes a paused schedule. |
| recurring-order/skip | `/recurring-order/{uuid}/skip` | Skips the next placement. |
| recurring-order/cancel | `/recurring-order/{uuid}/cancel` | Cancels a schedule. |
| recurring-order/confirm | `/recurring-order/{uuid}/confirm` | Confirms a reviewed schedule. |
| recurring-order/retry | `/recurring-order/{uuid}/retry` | Retries a failed placement. |
| recurring-orders/shipment-methods | `/recurring-orders/{uuid}/shipment-methods` | Returns the shipment methods available for an added item. |
| recurring-orders/product-price | `/recurring-orders/{uuid}/product-price` | Returns the current price of an added item. |
| recurring-orders/product-concrete-search | `/recurring-orders/{uuid}/product-concrete-search` | Backs the add-product search bar on the review page. |
| recurring-order/product-offer-select | `/recurring-order/product-offer-select` | Renders the merchant offer selector for an added item. |

{% endinfo_block %}

### 2) Set up widgets

Register the following global widgets:

| WIDGET | DESCRIPTION | NAMESPACE |
| --- | --- | --- |
| RecurringOrderSelectorWidget | Renders the recurring order setup form at checkout. Visible only when the quote is eligible for a recurring order (invoice payment, not locked, not from RFQ, not guest). | SprykerFeature\Yves\OrderExperienceManagement\Widget |
| RecurringOrderMenuItemWidget | Renders the **Recurring Orders** navigation menu item in the storefront customer account menu. | SprykerFeature\Yves\OrderExperienceManagement\Widget |
| ProductConcreteSearchWidget | Backs the add-product search bar on the **Review Required** page. Also provides the `products-list` molecule the search results view reuses. | SprykerShop\Yves\ProductSearchWidget\Widget |
| CostCenterDetailWidget | Displays the selected cost center and budget on the cart page and in the recurring order detail sidebar. Takes a `QuoteTransfer` as input. Requires the [Purchasing Control feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-purchasing-control-feature.html). | SprykerFeature\Yves\PurchasingControl\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerFeature\Yves\OrderExperienceManagement\Widget\RecurringOrderMenuItemWidget;
use SprykerFeature\Yves\OrderExperienceManagement\Widget\RecurringOrderSelectorWidget;
use SprykerFeature\Yves\PurchasingControl\Widget\CostCenterDetailWidget;
use SprykerShop\Yves\ProductSearchWidget\Widget\ProductConcreteSearchWidget;
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
            RecurringOrderSelectorWidget::class, #RecurringOrdersFeature
            RecurringOrderMenuItemWidget::class, #RecurringOrdersFeature
            ProductConcreteSearchWidget::class, #RecurringOrdersFeature
            CostCenterDetailWidget::class, #RecurringOrdersFeature
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. On the checkout summary page with an invoice-based payment method, make sure the recurring order selector is displayed.
2. In the customer account, make sure the **Recurring Orders** menu item is displayed.
3. On the **Review Required** page, open the add-product search bar and make sure product suggestions are returned.
4. On the cart page, make sure the selected cost center and budget names are displayed.

{% endinfo_block %}

### 3) Set up form expander plugins

{% info_block infoBox "Purchasing Control feature" %}

This step is only required if your project uses the [Purchasing Control feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-purchasing-control-feature.html).

{% endinfo_block %}

Register the following form expander plugins to let buyers select a cost center and budget when they approve a review or edit a recurring schedule:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| CostCenterRecurringOrderApproveFormExpanderPlugin | Adds cost center and budget dropdowns to the review approve form and validates the selected pair server-side. Only active cost centers of the buyer's company business unit in the currency of the recurring order are offered. | Purchasing Control feature | SprykerFeature\Yves\PurchasingControl\Plugin\OrderExperienceManagement |
| CostCenterRecurringScheduleEditFormExpanderPlugin | Adds cost center and budget dropdowns to the recurring schedule edit form and validates the selected pair server-side. Only active cost centers of the buyer's company business unit in the currency of the recurring order are offered. | Purchasing Control feature | SprykerFeature\Yves\PurchasingControl\Plugin\OrderExperienceManagement |

**src/Pyz/Yves/OrderExperienceManagement/OrderExperienceManagementDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\OrderExperienceManagement;

use SprykerFeature\Yves\OrderExperienceManagement\OrderExperienceManagementDependencyProvider as SprykerOrderExperienceManagementDependencyProvider;
use SprykerFeature\Yves\PurchasingControl\Plugin\OrderExperienceManagement\CostCenterRecurringOrderApproveFormExpanderPlugin;
use SprykerFeature\Yves\PurchasingControl\Plugin\OrderExperienceManagement\CostCenterRecurringScheduleEditFormExpanderPlugin;

class OrderExperienceManagementDependencyProvider extends SprykerOrderExperienceManagementDependencyProvider
{
    /**
     * @return array<\SprykerFeature\Yves\OrderExperienceManagement\Dependency\Plugin\RecurringOrderApproveFormExpanderPluginInterface>
     */
    protected function getRecurringOrderApproveFormExpanderPlugins(): array
    {
        return [
            new CostCenterRecurringOrderApproveFormExpanderPlugin(), #RecurringOrdersFeature
        ];
    }

    /**
     * @return array<\SprykerFeature\Yves\OrderExperienceManagement\Dependency\Plugin\RecurringScheduleEditFormExpanderPluginInterface>
     */
    protected function getRecurringScheduleEditFormExpanderPlugins(): array
    {
        return [
            new CostCenterRecurringScheduleEditFormExpanderPlugin(), #RecurringOrdersFeature
        ];
    }
}
```

Both plugins offer only budgets whose enforcement rule is listed in `getRecurringOrderSelectableBudgetEnforcementRules()`. Budgets that require approval when the budget is exceeded are hidden, because a recurring order is placed unattended and cannot wait for an approval decision. To change which enforcement rules qualify, override the method in your project:

**src/Pyz/Yves/PurchasingControl/PurchasingControlConfig.php**

```php
<?php

namespace Pyz\Yves\PurchasingControl;

use SprykerFeature\Shared\PurchasingControl\PurchasingControlConfig as SharedPurchasingControlConfig;
use SprykerFeature\Yves\PurchasingControl\PurchasingControlConfig as SprykerPurchasingControlConfig;

class PurchasingControlConfig extends SprykerPurchasingControlConfig
{
    /**
     * @return array<string>
     */
    public function getRecurringOrderSelectableBudgetEnforcementRules(): array
    {
        return [
            SharedPurchasingControlConfig::ENFORCEMENT_RULE_BLOCK,
            SharedPurchasingControlConfig::ENFORCEMENT_RULE_WARN,
        ];
    }
}
```

| CONFIGURATION METHOD | DEFAULT | DESCRIPTION |
| --- | --- | --- |
| `getRecurringOrderSelectableBudgetEnforcementRules()` | `[ENFORCEMENT_RULE_BLOCK, ENFORCEMENT_RULE_WARN]` | Budget enforcement rules that can be selected on the recurring order forms. Budgets bound to any other rule—`ENFORCEMENT_RULE_REQUIRE_APPROVAL` in particular—are hidden from the budget selector. |

{% info_block warningBox "Verification" %}

1. Open the **Review Required** page for a schedule and make sure the **Cost Center** and **Budget** dropdowns are displayed on the approve form.
2. Open the recurring schedule edit form and make sure the same dropdowns are displayed.
3. Submit the form with a budget that does not belong to the selected cost center. Make sure the form is rejected with a validation error.
4. Set a budget's enforcement rule to **Require approval** in the Back Office. Make sure the budget is no longer offered in the recurring order budget selector.

{% endinfo_block %}

### 4) Add the recurring order selector to the checkout summary page

`spryker-shop/checkout-page` calls `RecurringOrderSelectorWidget` from its checkout summary template, so no change is required if your project uses the module template as is.

If your project overrides the checkout summary template, call the widget explicitly. Add it after any cost center or voucher sections, before the order form.

**src/Pyz/Yves/CheckoutPage/Theme/default/views/summary/summary.twig**

```twig
{% raw %}{% widget 'RecurringOrderSelectorWidget' args [data.cart] only %}{% endwidget %}{% endraw %}
```

{% info_block warningBox "Verification" %}

On the checkout summary page with an invoice-based payment method, make sure the **Set up as recurring order** checkbox and description are displayed.

{% endinfo_block %}

### 5) Add the menu item to the customer navigation sidebar

`spryker-shop/customer-page` calls `RecurringOrderMenuItemWidget` from the `customer-navigation` molecule, so no change is required if your project uses the module template as is.

If your project overrides the `customer-navigation` molecule, call the widget from the same position—directly after the **Order History** item. The widget renders an `<li>` element and must be placed inside a `<ul>` context.

**src/Pyz/Yves/CustomerPage/Theme/default/components/molecules/customer-navigation/customer-navigation.twig**

```twig
{% raw %}
{% widget 'RecurringOrderMenuItemWidget' args [data.activePage] only %}{% endwidget %}
{% endraw %}
```

{% info_block infoBox "Alternative: plain menu item" %}

If your sidebar template is built from a plain `data.items` array instead of widget calls, add the entry directly. Place it after the Order History item:

```twig
{% raw %}
{
    name: 'recurring-orders',
    url: path('recurring-orders'),
    label: 'recurring_orders.menu_item' | trans,
    icon: 'calendar',
},
{% endraw %}
```

{% endinfo_block %}

{% info_block warningBox "Verification" %}

In the storefront customer account, make sure the **Recurring Orders** menu item is displayed directly below **Order History** in the left sidebar navigation and links to `/recurring-orders`.

{% endinfo_block %}

### 6) Configure the storefront behavior

Override the following configuration methods in your project (if needed) to adjust the storefront behavior:

**src/Pyz/Yves/OrderExperienceManagement/OrderExperienceManagementConfig.php**

```php
<?php

namespace Pyz\Yves\OrderExperienceManagement;

use SprykerFeature\Yves\OrderExperienceManagement\OrderExperienceManagementConfig as SprykerOrderExperienceManagementConfig;

class OrderExperienceManagementConfig extends SprykerOrderExperienceManagementConfig
{
    /**
     * Specification:
     * - Returns the maximum number of company business units loaded into the review scope dropdown.
     * - Projects with more business units should raise this value or switch to an async autocomplete widget.
     *
     * @api
     */
    public function getBusinessUnitChoicesLimit(): int
    {
        return 250;
    }

    /**
     * Specification:
     * - Returns the number of recurring schedules shown per page on the list page.
     *
     * @api
     */
    public function getRecurringScheduleListItemsPerPage(): int
    {
        return 20;
    }
}
```

| CONFIGURATION METHOD | DEFAULT | DESCRIPTION |
| --- | --- | --- |
| `getSupportedCadenceTypes()` | Weekly, bi-weekly, monthly, every N weeks | Cadence types offered in the storefront recurring order forms, as `[glossary key => cadence value]`. Extend it when you register a custom cadence type plugin. |
| `getCadenceTypeEveryNWeeks()` | `every_n_weeks` | Cadence type that requires an additional numeric interval. |
| `getInvoicePaymentMethodKeys()` | `[invoice, purchaseOnAccount, dummyMarketplacePaymentInvoice]` | Payment method keys that qualify as invoice-based. Only quotes with a matching payment method can generate a recurring schedule. Override this in the shared config to apply it in Yves and Zed at once. |
| `getBusinessUnitChoicesLimit()` | `100` | Maximum number of company business units loaded into the review scope dropdown. |
| `getRecurringScheduleListItemsPerPage()` | `10` | Number of recurring schedules shown per page on the list page. |
| `getRecurringScheduleHistoryItemsPerPage()` | `10` | Number of execution history entries shown per page on the detail page. |
| `getSupportedAddedItemShipmentTypeKeys()` | `[delivery, on_site_service]` | Shipment type keys supported for products added on the **Review Required** page. |
| `getSubstitutableReviewReasons()` | `[discontinued, unavailable]` | Review reason groups for which a **Choose a substitute** action is offered. |
| `isUnavailableProductsExcludedFromAddProductSearch()` | `true` | When enabled, concrete products and merchant offers without availability are hidden from the add-product search bar and the offer selector. |
| `getStatusBadgeClassMap()`, `getStatusIconMap()`, `getHistoryEventTypeBadgeClassMap()`, `getReviewReasonLabelMap()`, `getReviewReasonBadgeMap()`, `getItemFlagLabelMap()`, `getItemFlagBadgeMap()` | See `OrderExperienceManagementConfig` | Presentation maps for statuses, history events, review reasons, and item flags. Extend them when you introduce custom statuses or review reasons. |
| `getErrorBannerStatuses()`, `getAttentionBannerStatuses()` | See `OrderExperienceManagementConfig` | Statuses that render the error banner and the attention banner on the list and detail pages. |
| `getRecurringScheduleStatusChoices()`, `getReviewScopeChoices()` | See `OrderExperienceManagementConfig` | Choices offered in the storefront status filter and the review scope selector. |

{% info_block infoBox "Overriding storefront molecules" %}

The module ships its storefront UI as molecules under `src/SprykerFeature/OrderExperienceManagement/src/SprykerFeature/Yves/OrderExperienceManagement/Theme/default/components/molecules`. To adjust the markup, override the molecule in your project at the same relative path under `src/Pyz/Yves/OrderExperienceManagement/Theme/default/components/molecules`. The most commonly customized molecules are `recurring-order-selector`, `recurring-order-list`, `schedule-detail`, `schedule-detail-sidebar`, `schedule-review`, `recurring-order-edit-form`, and `review-add-product-picker`.

The `schedule-detail-sidebar`, `schedule-review`, and `recurring-order-edit-form` molecules embed the `cost-center-detail` and `recurring-order-cost-center-budget` molecules from the `PurchasingControl` module. If your project does not use the Purchasing Control feature, these embeds resolve to nothing and the surrounding markup remains valid.

{% endinfo_block %}

### 7) Build the frontend

After making changes to Twig templates and registering new widgets, rebuild the Yves frontend assets:

```bash
npm run yves
```

{% info_block warningBox "Verification" %}

Reload the checkout summary page and make sure the recurring order selector renders without console errors.

{% endinfo_block %}

### 8) Import glossary data

The full list of glossary keys is provided in the module at `src/SprykerFeature/OrderExperienceManagement/data/import/glossary.csv`. Copy the contents of that file and add them to **data/import/common/common/glossary.csv**.

Import data:

```bash
console data:import:glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the `spy_glossary_key` and `spy_glossary_translation` tables.

{% endinfo_block %}

### 9) Configure the Back Office settings

Sync the recurring orders configuration settings to the database to make them editable in the Back Office:

```bash
console configuration:sync
```

{% info_block warningBox "Verification" %}

In the Back Office, go to **Configuration > Recurring Orders > General > Schedule**. Make sure the **Schedule Grace Period** field is displayed with a default value of `48`.

{% endinfo_block %}

{% info_block infoBox "Configurable settings" %}

| SETTING | KEY | DEFAULT | CONSTRAINTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| Schedule Grace Period | `grace_period_hours` | `48` | Required, between 1 and 720 | Number of hours before the trigger date when the pre-trigger notification email is sent to the buyer. Per-schedule overrides stored in `spy_recurring_schedule.notification_window_hours` take precedence over this global value. |

The setting is defined at `src/SprykerFeature/OrderExperienceManagement/resources/configuration/recurring_orders.configuration.yml` and applies globally—it has no per-store scope.

{% endinfo_block %}
