---
title: Install the Recurring Orders feature
description: Learn how to install the Recurring Orders feature into your Spryker project.
last_updated: Jun 18, 2026
template: feature-integration-guide-template
label: early-access
related:
  - title: Recurring Orders feature overview
    link: docs/pbc/all/order-experience-management/latest/base-shop/feature-overviews/recurring-orders-feature-overview.html
---

{% info_block warningBox "Experimental feature" %}

Experimental feature — not recommended for production use.

{% endinfo_block %}

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

### 1) Install the required modules

{% info_block infoBox "Required modules" %}

```bash
composer require spryker-feature/order-experience-management:"^0.1.0" --update-with-dependencies
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
  spryker-feature/purchasing-control:"^1.1.0" \
  spryker-shop/checkout-page:"^3.42.0" \
  spryker-shop/customer-page:"^2.80.0" \
  --with-dependencies
```

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
| RecurringScheduleHistory | class | created | src/Generated/Shared/Transfer/RecurringScheduleHistoryTransfer.php |
| RecurringScheduleValidationResult | class | created | src/Generated/Shared/Transfer/RecurringScheduleValidationResultTransfer.php |
| RecurringScheduleItemReview | class | created | src/Generated/Shared/Transfer/RecurringScheduleItemReviewTransfer.php |
| RecurringScheduleReviewResponse | class | created | src/Generated/Shared/Transfer/RecurringScheduleReviewResponseTransfer.php |
| RecurringScheduleEventRequest | class | created | src/Generated/Shared/Transfer/RecurringScheduleEventRequestTransfer.php |
| RecurringScheduleEventResponse | class | created | src/Generated/Shared/Transfer/RecurringScheduleEventResponseTransfer.php |
| RecurringScheduleStatusCountCollection | class | created | src/Generated/Shared/Transfer/RecurringScheduleStatusCountCollectionTransfer.php |
| RecurringOrderSettings | class | created | src/Generated/Shared/Transfer/RecurringOrderSettingsTransfer.php |
| RecurringOrderQuoteUpdateRequest | class | created | src/Generated/Shared/Transfer/RecurringOrderQuoteUpdateRequestTransfer.php |
| RecurringOrderQuoteUpdateResponse | class | created | src/Generated/Shared/Transfer/RecurringOrderQuoteUpdateResponseTransfer.php |
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

#### Set up the Subscription dependency provider

Register the built-in cadence type and schedule validator plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| WeeklyCadenceTypePlugin | Calculates the next trigger date 7 days after the current trigger date. | None | SprykerFeature\Zed\OrderExperienceManagement\Communication\Plugin\Cadence |
| BiWeeklyCadenceTypePlugin | Calculates the next trigger date 14 days after the current trigger date. | None | SprykerFeature\Zed\OrderExperienceManagement\Communication\Plugin\Cadence |
| MonthlyCadenceTypePlugin | Calculates the next trigger date on the same day of the following month. | None | SprykerFeature\Zed\OrderExperienceManagement\Communication\Plugin\Cadence |
| EveryNWeeksCadenceTypePlugin | Calculates the next trigger date every N weeks. Requires `cadenceValue` to be set on the schedule. | None | SprykerFeature\Zed\OrderExperienceManagement\Communication\Plugin\Cadence |
| PriceScheduleValidatorPlugin | Detects price increases on recurring schedule items compared to their stored reference prices before order placement. | None | SprykerFeature\Zed\OrderExperienceManagement\Communication\Plugin\ScheduleValidator |
| CheckoutPlaceabilityScheduleValidatorPlugin | Simulates a checkout to detect availability or product approval issues on recurring schedule items before order placement. | None | SprykerFeature\Zed\OrderExperienceManagement\Communication\Plugin\ScheduleValidator |

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

Sync the permission plugins to the database:

```bash
console sync:data permission
```

{% info_block warningBox "Verification" %}

In the Back Office, under **Customers > Company Roles**, assign `SeeCompanyOrdersPermissionPlugin` to a company role. Make sure company users with that role can see all recurring orders within their company on the storefront.

Assign `SeeBusinessUnitOrdersPermissionPlugin` to a role. Make sure users with that role can see all recurring orders within their business unit.

{% endinfo_block %}

#### Set up cron jobs

The recurring orders state machine relies on a cron job to evaluate condition transitions. Register the job in your Jenkins configuration:

**config/Zed/cronjobs/jenkins.php**

```php
/* RecurringOrder StateMachine */
$jobs[] = [
    'name' => 'recurring-order-check-conditions',
    'command' => '$PHP_BIN vendor/bin/console state-machine:check-condition RecurringOrder',
    'schedule' => '* * * * *',
    'enable' => true,
];
```

{% info_block infoBox "Scheduling recommendation" %}

To have recurring orders placed before the business day starts, set trigger dates to an early morning time (for example, 01:00) and configure `DEFAULT_NOTIFICATION_WINDOW_HOURS` to `18` (for example) or more. With an 18-hour window, the pre-trigger notification is sent the previous afternoon (after 12:00), allowing the buyer to review or skip before the order is placed overnight.

{% endinfo_block %}

If your project uses Symfony Scheduler instead of Jenkins, register the equivalent job in your scheduler config:

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
```

{% info_block warningBox "Verification" %}

Activate a recurring schedule. Make sure the state machine condition check job runs and the schedule transitions from `draft` to `active` within one minute.

{% endinfo_block %}

#### Optional: Register the trigger console command

`RecurringOrderTriggerConsole` lets you manually trigger order placement for a specific recurring schedule from the CLI. It runs the same placement logic as the state machine `PlaceOrderCommand`, which makes it useful for development, debugging, and one-off operational tasks.

To enable it, register the command in your console dependency provider:

**src/Pyz/Zed/Console/ConsoleDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Console;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
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
            new RecurringOrderTriggerConsole(), #RecurringOrdersFeature
        ];
    }
}
```

Usage:

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

This command is intended for development and debugging. Do not use it in production automated pipelines — the state machine cron job is the intended trigger for production order placement.

{% endinfo_block %}

#### Configure product bundle field copying

{% info_block infoBox "Product Bundles feature" %}

This step is only required if your project uses the [Product Bundles feature](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-bundles-feature-overview.html).

{% endinfo_block %}

Override the allowed fields to copy so that shipment information is preserved when recurring orders re-create bundle items:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
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
     * - Default: [REVIEW_REASON_GROUP_UNAVAILABLE].
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
            SharedOrderExperienceManagementConfig::REVIEW_REASON_GROUP_DISCONTINUED,
        ];
    }
}
```

| CONFIGURATION METHOD | DEFAULT | DESCRIPTION |
| --- | --- | --- |
| `getDefaultNotificationWindowHours()` | `48` | Number of hours before the trigger date when the pre-trigger notification is sent. Per-schedule overrides stored in `spy_recurring_schedule.notification_window_hours` take precedence. |
| `getReviewReasonGroupMap()` | See `OrderExperienceManagementConfig` | Maps review reason groups to checkout error types. Extend to map project-specific error types to the appropriate review group. |
| `getNonPurchasableReviewReasonGroups()` | `[REVIEW_REASON_GROUP_UNAVAILABLE]` | Review reason groups whose items block order placement and must be removed before the order can proceed. Override to also block on `REVIEW_REASON_GROUP_DISCONTINUED`. |

## Install feature frontend

Follow the steps below to install the Recurring Orders feature frontend.

### 1) Set up routes

Register the following route provider plugin:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| RecurringOrderRouteProviderPlugin | Adds storefront routes for the recurring order list, detail, create, clear, pause, resume, skip, cancel, confirm, review, and approve-review actions. | None | SprykerFeature\Yves\OrderExperienceManagement\Plugin\Router |

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
- `/recurring-orders` — recurring order list page.
- `/recurring-orders/{uuid}` — recurring order detail page.
- `/recurring-orders/{uuid}/review-required` — review required page.
- POST `/recurring-order/save` — saves recurring order settings on the quote.
- POST `/recurring-order/clear` — removes recurring order settings from the quote.

{% endinfo_block %}

### 2) Set up widgets

Register the following global widgets:

| WIDGET | DESCRIPTION | NAMESPACE |
| --- | --- | --- |
| RecurringOrderSelectorWidget | Renders the recurring order setup form at checkout. Visible only when the quote is eligible for a recurring order (invoice payment, not locked, not from RFQ, not guest). | SprykerFeature\Yves\OrderExperienceManagement\Widget |
| RecurringOrderMenuItemWidget | Renders the Recurring Orders navigation menu item in the storefront company menu. | SprykerFeature\Yves\OrderExperienceManagement\Widget |
| CostCenterDetailWidget | Displays the selected cost center and budget on the cart page. Takes a `QuoteTransfer` as input. Requires the [Purchasing Control feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-purchasing-control-feature.html). | SprykerFeature\Yves\PurchasingControl\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerFeature\Yves\PurchasingControl\Widget\CostCenterDetailWidget;
use SprykerFeature\Yves\OrderExperienceManagement\Widget\RecurringOrderMenuItemWidget;
use SprykerFeature\Yves\OrderExperienceManagement\Widget\RecurringOrderSelectorWidget;
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
            CostCenterDetailWidget::class, #RecurringOrdersFeature
        ];
    }
}
```

### 3) Add the recurring order selector to the checkout summary page

The `RecurringOrderSelectorWidget` is not rendered automatically — it must be explicitly called from the checkout summary template. Add it after any cost center or voucher sections, before the order form.

**src/Pyz/Yves/CheckoutPage/Theme/default/views/summary/summary.twig**

```twig
{% raw %}{% widget 'RecurringOrderSelectorWidget' args [data.cart] only %}{% endwidget %}{% endraw %}
```

{% info_block warningBox "Verification" %}

On the checkout summary page with an invoice-based payment method, make sure the **Set up as recurring order** checkbox and description are displayed.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

- On the cart page, make sure the selected cost center and budget names are displayed.

{% endinfo_block %}

### 4) Add the menu item to the customer navigation sidebar

To make the **Recurring Orders** menu item appear in the customer account sidebar, add a plain data entry to the `data.items` array in your project's customer navigation sidebar template. Place it after the Order History item.

**src/Pyz/Yves/CustomerPage/Theme/default/components/molecules/navigation-sidebar/navigation-sidebar.twig**

```twig
{% raw %}
{% define data = {
    items: [
        {# ... existing items ... #}
        {
            name: 'order',
            url: path('customer/order'),
            label: 'customer.account.order_history' | trans,
            icon: 'history',
        },
        {
            name: 'recurring-orders',
            url: path('recurring-orders'),
            label: 'recurring_orders.menu_item' | trans,
            icon: 'calendar',
        },
        {# ... remaining items ... #}
    ]
} %}
{% endraw %}
```

{% info_block warningBox "Verification" %}

In the storefront customer account, make sure the **Recurring Orders** menu item appears directly below **Order History** in the left sidebar navigation and links to `/recurring-orders`.

{% endinfo_block %}

{% info_block infoBox "Alternative: widget-based menu item" %}

If your project's navigation sidebar template doesn't use a plain `data.items` array — for example, it's built from a custom navigation plugin or uses a different template structure — you can render the menu item via `RecurringOrderMenuItemWidget` instead. Make sure the widget is registered in `ShopApplicationDependencyProvider` (see [Set up widgets](#2-set-up-widgets)), then call it from the `postContent` block of your sidebar template:

```twig
{% raw %}
{% block postContent %}
    {# ... existing widget calls ... #}
    {% widget 'RecurringOrderMenuItemWidget' args [data.activePage] only %}{% endwidget %}
{% endblock %}
{% endraw %}
```

The widget renders an `<li>` element and must be placed inside a `<ul>` context.

{% endinfo_block %}

### 5) Build the frontend

After making changes to Twig templates and registering new widgets, rebuild the Yves frontend assets:

```bash
npm run yves
```

{% info_block warningBox "Verification" %}

Reload the checkout summary page and make sure the recurring order selector renders without console errors.

{% endinfo_block %}

### 7) Import glossary data

The full list of glossary keys is provided in the module at `src/SprykerFeature/OrderExperienceManagement/data/import/glossary.csv`. Copy the contents of that file and add them to **data/import/common/common/glossary.csv**.

Import data:

```bash
console data:import:glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the `spy_glossary_key` and `spy_glossary_translation` tables.

{% endinfo_block %}

### 8) Configure the Back Office settings

Sync the recurring orders configuration settings to the database to make them editable in the Back Office:

```bash
console configuration:sync
```

{% info_block warningBox "Verification" %}

In the Back Office, go to **Configuration > Recurring Orders > General > Schedule**. Make sure the **Schedule Grace Period** field is displayed with a default value of `48`.

{% endinfo_block %}

{% info_block infoBox "Configurable settings" %}

| SETTING | DEFAULT | DESCRIPTION |
| --- | --- | --- |
| Schedule Grace Period | `48` | Number of hours before the trigger date when the pre-trigger notification email is sent to the buyer. Per-schedule overrides stored in `spy_recurring_schedule.notification_window_hours` take precedence over this global value. |

{% endinfo_block %}
