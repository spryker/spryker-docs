---
title: Install the Recurring Orders feature
description: Learn how to install the Recurring Orders feature into your Spryker project.
last_updated: Aug 5, 2026
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
| SSP Service Management | {{page.release_tag}} | [Install the SSP Service Management feature](/docs/pbc/all/self-service-portal/latest/install/install-the-ssp-service-management-feature.html) |

{% info_block infoBox "Optional features" %}

Both Purchasing Control and SSP Service Management are optional:

- Install Purchasing Control if you want buyers to assign a cost center and budget to a recurring order. Without it, the cost center and budget fields are not rendered on the recurring order forms.
- Install SSP Service Management if your catalog contains service products. It restricts which service products buyers can add to a recurring schedule on the **Review Required** page. Without it, no service-specific restriction is applied.

{% endinfo_block %}

### 1) Install the required modules

{% info_block infoBox "Required modules" %}

```bash
composer require spryker-feature/order-experience-management:"^0.1.4" --update-with-dependencies
composer update \
  spryker/availability:"^9.32.0" \
  spryker/merchant:"^3.20.0" \
  spryker/merchant-product:"^1.3.0" \
  spryker/merchant-product-option:"^1.4.0" \
  spryker/merchant-storage:"^1.0.0" \
  spryker/merchant-switcher:"^0.6.8" \
  spryker/product-alternative-storage:"^1.15.0" \
  spryker/product-approval:"^1.5.0" \
  spryker/product-bundle:"^7.28.0" \
  spryker/product-cart-connector:"^4.15.0" \
  spryker/product-configuration-cart:"^1.1.0" \
  spryker/product-discontinued:"^1.15.0" \
  spryker/product-measurement-unit:"^5.0.0" \
  spryker/product-offer:"^1.18.0" \
  spryker/product-offer-storage:"^1.0.0" \
  spryker/product-packaging-unit:"^4.14.0" \
  spryker/product-packaging-unit-storage:"^5.5.0" \
  spryker/product-quantity:"^3.8.0" \
  spryker/shipment-type-storage:"^1.0.0" \
  spryker-feature/purchasing-control:"^1.1.1" \
  spryker-shop/checkout-page:"^3.42.0" \
  spryker-shop/customer-page:"^2.80.0" \
  spryker-shop/merchant-product-offer-widget:"^2.0.0" \
  spryker-shop/product-search-widget:"^1.13.0" \
  --with-dependencies
```

{% endinfo_block %}

{% info_block infoBox "Modules required by the add-product flow" %}

The **Review Required** page lets buyers add products to the order being placed. That flow pulls in the following modules, so install them even if your project does not use the corresponding functionality elsewhere:

| MODULE | PURPOSE |
| --- | --- |
| `spryker-shop/product-search-widget` | Provides `ProductConcreteSearchWidget` and the `products-list` molecule that the add-product search bar reuses. |
| `spryker-shop/merchant-product-offer-widget` | Backs the merchant offer selector rendered for an added product in a marketplace setup. |
| `spryker/product-alternative-storage` | Provides the alternative products offered as substitutes for discontinued and substituted items. |
| `spryker/shipment-type-storage` | Resolves the shipment types of an added product to decide whether a recurring order can serve it. |
| `spryker/product-measurement-unit`, `spryker/product-packaging-unit-storage` | Detect products sold in measurement or packaging units so they can be excluded from the add-product picker. |

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
| RecurringScheduleShippingAddressChoice | class | created | src/Generated/Shared/Transfer/RecurringScheduleShippingAddressChoiceTransfer.php |
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

#### Set up added item validator plugins

Added item validator plugins reject a product the buyer added on the **Review Required** page. They run after the item is resolved through the cart, so they see the resolved price, shipment, and any data the cart item expanders added. They also run after the module's own availability, price, and shipment checks, so they are only reached when those pass.

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ServiceProductAddedItemValidatorPlugin | Rejects a service item whose resolved shipment method is not one a recurring order can serve. A service fulfilled on site or in a service center needs an appointment, which a recurring order places unattended and therefore cannot book. | SSP Service Management feature | SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\OrderExperienceManagement |

**src/Pyz/Zed/OrderExperienceManagement/OrderExperienceManagementDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\OrderExperienceManagement;

use SprykerFeature\Zed\OrderExperienceManagement\OrderExperienceManagementDependencyProvider as SprykerOrderExperienceManagementDependencyProvider;
use SprykerFeature\Zed\SelfServicePortal\Communication\Plugin\OrderExperienceManagement\ServiceProductAddedItemValidatorPlugin;

class OrderExperienceManagementDependencyProvider extends SprykerOrderExperienceManagementDependencyProvider
{
    /**
     * @return array<\SprykerFeature\Zed\OrderExperienceManagement\Dependency\Plugin\AddedItemValidatorPluginInterface>
     */
    protected function getAddedItemValidatorPlugins(): array
    {
        return [
            new ServiceProductAddedItemValidatorPlugin(), #RecurringOrdersFeature
        ];
    }
}
```

`ServiceProductAddedItemValidatorPlugin` reads the accepted shipment type keys from `SelfServicePortalConfig`. The module default is an empty list, which accepts service products with any shipment type. Define the shipment types your project can serve unattended:

**src/Pyz/Shared/SelfServicePortal/SelfServicePortalConfig.php**

```php
<?php

namespace Pyz\Shared\SelfServicePortal;

use SprykerFeature\Shared\SelfServicePortal\SelfServicePortalConfig as SprykerSelfServicePortalConfig;

class SelfServicePortalConfig extends SprykerSelfServicePortalConfig
{
    /**
     * @return array<string>
     */
    public function getRecurringOrderServiceShipmentTypeKeys(): array
    {
        return [
            self::SHIPMENT_TYPE_DELIVERY,
        ];
    }
}
```

| CONFIGURATION METHOD | DEFAULT | DESCRIPTION |
| --- | --- | --- |
| `getRecurringOrderServiceShipmentTypeKeys()` | `[]` | Shipment type keys a service product must support to be part of a recurring order. An empty list accepts service products with any shipment type. Override it in the shared config to apply it in Yves and Zed at once. |

{% info_block infoBox "Custom added item validators" %}

To reject added products for a project-specific reason, implement `SprykerFeature\Zed\OrderExperienceManagement\Dependency\Plugin\AddedItemValidatorPluginInterface`. Return an `ErrorTransfer` carrying your own glossary key to reject the addition, or `null` to accept it. Pair it with an `AddedProductConcreteRestrictionPluginInterface` implementation in Yves so the product is hidden from the picker as well as rejected on approval.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Open the **Review Required** page for a schedule and add a service product whose shipment type is not in `getRecurringOrderServiceShipmentTypeKeys()`. Make sure the approval is rejected with an error message naming the product SKU.

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
| `getSmStateNameToStatusMap()` | See `OrderExperienceManagementConfig` | Maps each state machine state name to the public schedule status it represents. State names that are not in the map resolve to no status. Extend it when you add states to the process XML. |
| `getSupportedAddedItemShipmentTypeKeys()` | `[delivery, on-site-service]` | Shipment type keys accepted for products added on the **Review Required** page, in preference order. When an offer or store exposes several supported types, the first one is used. |
| `getSubstitutableReviewReasons()` | `[discontinued, substituted]` | Review reason groups for which a substitute product can be offered on the **Review Required** page. |
| `getPriceChangeReviewReasons()` | `[price_increased]` | Review reason groups counted as price changes in the **Review Required** summary. |
| `getUnavailableReviewReasons()` | `[unavailable, out_of_stock]` | Review reason groups counted as unavailable items in the **Review Required** summary. |
| `isMeasurementUnitProductAdditionRestricted()` | `true` | Defines whether products sold in measurement units can be added on the **Review Required** page. The picker offers no sales unit selector, so a typed quantity would silently mean N times the store default sales unit instead of N base units. |
| `isPackagingUnitProductAdditionRestricted()` | `true` | Defines whether products sold in packaging units can be added on the **Review Required** page. The picker offers no amount input, so the resolved item would carry no amount, stay unsplit, and reserve no stock for the lead product. |
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
| CostCenterDetailWidget | Displays the selected cost center and budget in the recurring order detail sidebar, which is its only caller. Takes a `QuoteTransfer` and an optional flag that adds a budget usage summary. Only active cost centers are resolved, so a deactivated cost center makes the widget render nothing. Requires the [Purchasing Control feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-purchasing-control-feature.html). | SprykerFeature\Yves\PurchasingControl\Widget |

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
4. On the recurring order detail page, make sure the selected cost center and budget names are displayed in the sidebar.

{% endinfo_block %}

### 3) Set up storefront plugins

{% info_block infoBox "Optional features" %}

Each plugin in this step comes from an optional feature. Register only the plugins whose feature your project uses.

{% endinfo_block %}

Register the following plugins to let buyers select a cost center and budget on the recurring order forms, and to restrict which products they can add on the **Review Required** page:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| CostCenterRecurringOrderApproveFormExpanderPlugin | Adds cost center and budget dropdowns to the review approve form and validates the selected pair server-side. Only active cost centers of the buyer's company business unit in the currency of the recurring order are offered. | Purchasing Control feature | SprykerFeature\Yves\PurchasingControl\Plugin\OrderExperienceManagement |
| CostCenterRecurringScheduleEditFormExpanderPlugin | Adds cost center and budget dropdowns to the recurring schedule edit form and validates the selected pair server-side. Only active cost centers of the buyer's company business unit in the currency of the recurring order are offered. | Purchasing Control feature | SprykerFeature\Yves\PurchasingControl\Plugin\OrderExperienceManagement |
| ServiceProductAddedProductConcreteRestrictionPlugin | Hides a service product from the add-product search bar and the offer selector when its shipment types do not include one a recurring order can serve. | SSP Service Management feature | SprykerFeature\Yves\SelfServicePortal\Plugin\OrderExperienceManagement |

**src/Pyz/Yves/OrderExperienceManagement/OrderExperienceManagementDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\OrderExperienceManagement;

use SprykerFeature\Yves\OrderExperienceManagement\OrderExperienceManagementDependencyProvider as SprykerOrderExperienceManagementDependencyProvider;
use SprykerFeature\Yves\PurchasingControl\Plugin\OrderExperienceManagement\CostCenterRecurringOrderApproveFormExpanderPlugin;
use SprykerFeature\Yves\PurchasingControl\Plugin\OrderExperienceManagement\CostCenterRecurringScheduleEditFormExpanderPlugin;
use SprykerFeature\Yves\SelfServicePortal\Plugin\OrderExperienceManagement\ServiceProductAddedProductConcreteRestrictionPlugin;

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

    /**
     * @return array<\SprykerFeature\Yves\OrderExperienceManagement\Dependency\Plugin\AddedProductConcreteRestrictionPluginInterface>
     */
    protected function getAddedProductConcreteRestrictionPlugins(): array
    {
        return [
            new ServiceProductAddedProductConcreteRestrictionPlugin(), #RecurringOrdersFeature
        ];
    }
}
```

{% info_block infoBox "Custom product restrictions" %}

To hide additional products from the add-product picker, implement `SprykerFeature\Yves\OrderExperienceManagement\Dependency\Plugin\AddedProductConcreteRestrictionPluginInterface`. The plugin receives a `ProductViewTransfer` resolved from product storage with all view expanders applied, so it can rely on the data your own module publishes there. Returning `true` removes the product from the search results and makes the offer selector return no choices for it.

A storefront restriction only hides the product. To also reject a crafted request, register a matching `AddedItemValidatorPluginInterface` implementation in Zed—see [Set up added item validator plugins](#set-up-added-item-validator-plugins).

{% endinfo_block %}

Both cost center plugins offer only budgets whose enforcement rule is listed in `getRecurringOrderSelectableBudgetEnforcementRules()`. Budgets that require approval when the budget is exceeded are hidden, because a recurring order is placed unattended and cannot wait for an approval decision. To change which enforcement rules qualify, override the method in your project:

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
5. On the **Review Required** page, search for a service product whose shipment type is not in `getRecurringOrderServiceShipmentTypeKeys()`. Make sure the product is not offered in the add-product search results.

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
     * - Returns the maximum number of company business units loaded into the recurring order search scope dropdown.
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
| `getBusinessUnitChoicesLimit()` | `100` | Maximum number of company business units loaded into the recurring order search scope dropdown. Projects with more business units should raise this value or switch to an async autocomplete widget. |
| `getRecurringScheduleListItemsPerPage()` | `10` | Number of recurring schedules shown per page on the list page. |
| `getRecurringScheduleHistoryItemsPerPage()` | `10` | Number of execution history entries shown per page on the detail page. |
| `getSupportedAddedItemShipmentTypeKeys()` | `[delivery, on-site-service]` | Shipment type keys supported for products added on the **Review Required** page. |
| `getSubstitutableReviewReasons()` | `[discontinued, substituted]` | Review reason groups for which a **Choose a substitute** action is offered. |
| `getPriceChangeReviewReasons()` | `[price_increased]` | Review reason groups whose lines are marked as price changes the buyer accepts by confirming the order. |
| `isUnavailableProductsExcludedFromAddProductSearch()` | `true` | When enabled, concrete products and merchant offers without availability are hidden from the add-product search bar and the offer selector. |
| `isMeasurementUnitProductAdditionRestricted()` | `true` | When enabled, products sold in measurement units are hidden from the add-product picker. Reads the value from the shared config. |
| `isPackagingUnitProductAdditionRestricted()` | `true` | When enabled, products sold in packaging units are hidden from the add-product picker. Reads the value from the shared config. |
| `getStatusBadgeClassMap()`, `getStatusIconMap()`, `getHistoryEventTypeBadgeClassMap()`, `getReviewReasonLabelMap()`, `getReviewReasonBadgeMap()`, `getItemFlagLabelMap()`, `getItemFlagBadgeMap()` | See `OrderExperienceManagementConfig` | Presentation maps for statuses, history events, review reasons, and item flags. Extend them when you introduce custom statuses or review reasons. |
| `getErrorBannerStatuses()`, `getAttentionBannerStatuses()` | See `OrderExperienceManagementConfig` | Statuses that render the error banner and the attention banner on the list and detail pages. |
| `getRecurringScheduleStatusChoices()`, `getReviewScopeChoices()` | See `OrderExperienceManagementConfig` | Choices offered in the storefront status filter and the review scope selector. |

{% info_block infoBox "Overriding storefront molecules" %}

The module ships its storefront UI as molecules under `src/SprykerFeature/OrderExperienceManagement/src/SprykerFeature/Yves/OrderExperienceManagement/Theme/default/components/molecules`. To adjust the markup, override the molecule in your project at the same relative path under `src/Pyz/Yves/OrderExperienceManagement/Theme/default/components/molecules`. The most commonly customized molecules are `recurring-order-selector`, `recurring-order-list`, `schedule-detail`, `schedule-detail-sidebar`, `schedule-review`, and `recurring-order-edit-form`.

The **Review Required** page is composed of the `review-` molecules: `review-flagged-items`, `review-unchanged-items`, `review-quantity-control`, `review-substitute`, `review-add-product`, `review-add-product-picker`, `review-shipment-selection`, `review-scope-selector`, `review-change-summary`, `review-summary-banner`, `review-blocking-errors`, and `review-footer`.

The `schedule-detail-sidebar`, `schedule-review`, and `recurring-order-edit-form` molecules embed the `cost-center-detail`, `recurring-order-cost-center-budget`, and `recurring-order-budget-summary` molecules from the `PurchasingControl` module. If your project does not use the Purchasing Control feature, these embeds resolve to nothing and the surrounding markup remains valid.

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

Import the following glossary keys for Storefront translations:

**data/import/common/common/glossary.csv**

```csv
recurring_orders.attention_banner.link.failed,View Failed,en_US
recurring_orders.attention_banner.link.failed,Fehlgeschlagene anzeigen,de_DE
recurring_orders.attention_banner.link.paused,View Paused,en_US
recurring_orders.attention_banner.link.paused,Pausierte anzeigen,de_DE
recurring_orders.attention_banner.link.review_required,View Review Required,en_US
recurring_orders.attention_banner.link.review_required,Zu prüfende anzeigen,de_DE
recurring_orders.attention_banner.message,You have %count% recurring schedule(s) that require your attention.,en_US
recurring_orders.attention_banner.message,"Sie haben %count% wiederkehrende(n) Zeitplan/Zeitpläne, die Ihre Aufmerksamkeit erfordern.",de_DE
recurring_orders.cadence.bi_weekly,Bi-weekly,en_US
recurring_orders.cadence.bi_weekly,Zweiwöchentlich,de_DE
recurring_orders.cadence.every_n_weeks,Every N weeks,en_US
recurring_orders.cadence.every_n_weeks,Alle N Wochen,de_DE
recurring_orders.cadence.monthly,Monthly,en_US
recurring_orders.cadence.monthly,Monatlich,de_DE
recurring_orders.cadence.weekly,Weekly,en_US
recurring_orders.cadence.weekly,Wöchentlich,de_DE
recurring_orders.checkout.cadence_label,Frequency,en_US
recurring_orders.checkout.cadence_label,Häufigkeit,de_DE
recurring_orders.checkout.cadence_placeholder,Select frequency,en_US
recurring_orders.checkout.cadence_placeholder,Häufigkeit auswählen,de_DE
recurring_orders.checkout.cadence_value_label,Interval (weeks),en_US
recurring_orders.checkout.cadence_value_label,Intervall (Wochen),de_DE
recurring_orders.checkout.confirm_button,Confirm,en_US
recurring_orders.checkout.confirm_button,Bestätigen,de_DE
recurring_orders.checkout.enable_description,"Get this order delivered automatically on your schedule. Skip and cancel anytime.",en_US
recurring_orders.checkout.enable_description,"Lassen Sie sich diese Bestellung automatisch nach Ihrem Zeitplan liefern. Jederzeit überspringen und stornieren.",de_DE
recurring_orders.checkout.enable_label,Set up as recurring order,en_US
recurring_orders.checkout.enable_label,Als wiederkehrende Bestellung einrichten,de_DE
recurring_orders.checkout.remove_button,Remove,en_US
recurring_orders.checkout.remove_button,Entfernen,de_DE
recurring_orders.checkout.schedule_name_label,Schedule name,en_US
recurring_orders.checkout.schedule_name_label,Name des Zeitplans,de_DE
recurring_orders.checkout.section_title,Recurring Order,en_US
recurring_orders.checkout.section_title,Wiederkehrende Bestellung,de_DE
recurring_orders.checkout.start_date_label,Start date,en_US
recurring_orders.checkout.start_date_label,Startdatum,de_DE
recurring_orders.checkout.start_date_tooltip,"The date your first recurring delivery is placed. Today's order is placed as normal, recurring deliveries then repeat on your selected frequency from this date.",en_US
recurring_orders.checkout.start_date_tooltip,"Das Datum, an dem Ihre erste wiederkehrende Lieferung erfolgt. Die heutige Bestellung wird wie gewohnt aufgegeben, wiederkehrende Lieferungen wiederholen sich danach ab diesem Datum in der von Ihnen gewählten Häufigkeit.",de_DE
recurring_orders.checkout.start_date_tooltip_label,More information about the start date,en_US
recurring_orders.checkout.start_date_tooltip_label,Weitere Informationen zum Startdatum,de_DE
recurring_orders.checkout.first_order_notice,Your first recurring order starts on %date%,en_US
recurring_orders.checkout.first_order_notice,Ihre erste wiederkehrende Bestellung beginnt am %date%,de_DE
recurring_orders.checkout.validation.start_date_required,Please choose a start date.,en_US
recurring_orders.checkout.validation.start_date_required,Bitte wählen Sie ein Startdatum aus.,de_DE
recurring_orders.checkout.validation.start_date_in_past,The start date cannot be in the past.,en_US
recurring_orders.checkout.validation.start_date_in_past,Das Startdatum darf nicht in der Vergangenheit liegen.,de_DE
recurring_orders.checkout.error.start_date_in_past,The recurring order start date cannot be in the past.,en_US
recurring_orders.checkout.error.start_date_in_past,Das Startdatum der wiederkehrenden Bestellung darf nicht in der Vergangenheit liegen.,de_DE
recurring_orders.checkout.error.start_date_required,Please choose a start date for the recurring order.,en_US
recurring_orders.checkout.error.start_date_required,Bitte wählen Sie ein Startdatum für die wiederkehrende Bestellung aus.,de_DE
recurring_orders.detail.access_denied,You do not have access to this recurring order.,en_US
recurring_orders.detail.access_denied,Sie haben keinen Zugriff auf diese wiederkehrende Bestellung.,de_DE
recurring_orders.detail.action.error,An error occurred while processing the action. Please try again.,en_US
recurring_orders.detail.action.error,Bei der Verarbeitung der Aktion ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.,de_DE
recurring_orders.detail.actions.cancel,Cancel Schedule,en_US
recurring_orders.detail.actions.cancel,Zeitplan abbrechen,de_DE
recurring_orders.detail.actions.pause,Pause,en_US
recurring_orders.detail.actions.pause,Pausieren,de_DE
recurring_orders.detail.actions.resume,Resume,en_US
recurring_orders.detail.actions.resume,Fortsetzen,de_DE
recurring_orders.detail.actions.retry,Retry Again,en_US
recurring_orders.detail.actions.retry,Erneut versuchen,de_DE
recurring_orders.detail.actions.review,Review,en_US
recurring_orders.detail.actions.review,Überprüfen,de_DE
recurring_orders.detail.actions.skip,Skip This Execution,en_US
recurring_orders.detail.actions.skip,Diese Ausführung überspringen,de_DE
recurring_orders.detail.cancel.modal.title,Cancel Schedule?,en_US
recurring_orders.detail.cancel.modal.title,Zeitplan abbrechen?,de_DE
recurring_orders.detail.cancel.modal.warning,This action is permanent. The schedule will stop immediately and cannot be reactivated.,en_US
recurring_orders.detail.cancel.modal.warning,Diese Aktion ist dauerhaft. Der Zeitplan wird sofort gestoppt und kann nicht reaktiviert werden.,de_DE
recurring_orders.detail.error.failed.title,The last order attempt failed for the following reasons:,en_US
recurring_orders.detail.error.failed.title,Der letzte Bestellversuch ist aus den folgenden Gründen fehlgeschlagen:,de_DE
recurring_orders.detail.estimated_total.info,Estimated Grand Total displays the sum of order items excl. shipping costs or discounts.,en_US
recurring_orders.detail.estimated_total.info,Der geschätzte Gesamtbetrag enthält die Summe der Artikel ohne Versandkosten oder Rabatte.,de_DE
recurring_orders.detail.estimated_total.label,Estimated Total,en_US
recurring_orders.detail.estimated_total.label,Geschätzter Gesamtbetrag,de_DE
recurring_orders.detail.skip.modal.title,Skip this execution?,en_US
recurring_orders.detail.skip.modal.title,Diese Ausführung überspringen?,de_DE
recurring_orders.detail.skip.modal.execution_being_skipped,Execution being skipped,en_US
recurring_orders.detail.skip.modal.execution_being_skipped,Übersprungene Ausführung,de_DE
recurring_orders.detail.skip.modal.next_scheduled_execution,Next scheduled execution,en_US
recurring_orders.detail.skip.modal.next_scheduled_execution,Nächste geplante Ausführung,de_DE
recurring_orders.detail.skip.modal.summary,The %skippedDate% order will not be placed. The schedule will continue and trigger next on %nextDate%.,en_US
recurring_orders.detail.skip.modal.summary,Die Bestellung vom %skippedDate% wird nicht aufgegeben. Der Zeitplan läuft weiter und wird als Nächstes am %nextDate% ausgelöst.,de_DE
recurring_orders.detail.skip.modal.confirm,Skip this execution,en_US
recurring_orders.detail.skip.modal.confirm,Diese Ausführung überspringen,de_DE
recurring_orders.detail.history.description,View all past and upcoming executions for this schedule,en_US
recurring_orders.detail.history.description,Alle vergangenen und bevorstehenden Ausführungen für diesen Zeitplan anzeigen,de_DE
recurring_orders.detail.history.actions,Actions,en_US
recurring_orders.detail.history.actions,Aktionen,de_DE
recurring_orders.detail.history.date,Date,en_US
recurring_orders.detail.history.date,Datum,de_DE
recurring_orders.detail.history.empty,No execution history yet.,en_US
recurring_orders.detail.history.empty,Noch kein Ausführungsverlauf vorhanden.,de_DE
recurring_orders.detail.history.order_reference,Order Reference,en_US
recurring_orders.detail.history.order_reference,Bestellreferenz,de_DE
recurring_orders.detail.history.status,Status,en_US
recurring_orders.detail.history.status,Status,de_DE
recurring_orders.detail.history.title,Past scheduled orders,en_US
recurring_orders.detail.history.title,Ausführungsverlauf,de_DE
recurring_orders.detail.history.view_order,View Order,en_US
recurring_orders.detail.history.view_order,Bestellung anzeigen,de_DE
recurring_orders.detail.next_execution.paused,Schedule is paused. Resume to set next execution date.,en_US
recurring_orders.detail.next_execution.paused,"Zeitplan ist pausiert. Setzen Sie ihn fort, um das nächste Ausführungsdatum festzulegen.",de_DE
recurring_orders.detail.next_execution.title,Next Scheduled Execution,en_US
recurring_orders.detail.next_execution.title,Nächste geplante Ausführung,de_DE
recurring_orders.detail.order_items.column.product,Product,en_US
recurring_orders.detail.order_items.column.product,Produkt,de_DE
recurring_orders.detail.order_items.column.quantity,Qty,en_US
recurring_orders.detail.order_items.column.quantity,Menge,de_DE
recurring_orders.detail.order_items.column.total,Total,en_US
recurring_orders.detail.order_items.column.total,Gesamt,de_DE
recurring_orders.detail.order_items.empty,No items found.,en_US
recurring_orders.detail.order_items.empty,Keine Artikel gefunden.,de_DE
recurring_orders.detail.order_items.label,Order Items,en_US
recurring_orders.detail.order_items.label,Bestellartikel,de_DE
recurring_orders.detail.order_items.one_time_label,Just this order,en_US
recurring_orders.detail.order_items.one_time_label,Nur diese Bestellung,de_DE
recurring_orders.detail.order_items.recurring_quantity_label,Recurring: %quantity%,en_US
recurring_orders.detail.order_items.recurring_quantity_label,Wiederkehrend: %quantity%,de_DE
recurring_orders.detail.pause.modal.title,Pause Schedule?,en_US
recurring_orders.detail.pause.modal.title,Pausenplan?,de_DE
recurring_orders.detail.pause.modal.warning,Do you want to pause the schedule now?,en_US
recurring_orders.detail.pause.modal.warning,Möchten Sie den Zeitplan jetzt pausieren?,de_DE
recurring_orders.detail.resume.modal.title,Resume schedule,en_US
recurring_orders.detail.resume.modal.title,Zeitplan fortsetzen,de_DE
recurring_orders.detail.edit.title,Edit schedule,en_US
recurring_orders.detail.edit.title,Zeitplan bearbeiten,de_DE
recurring_orders.detail.edit.actions.save,Save changes,en_US
recurring_orders.detail.edit.actions.save,Änderungen speichern,de_DE
recurring_orders.detail.edit.success,Recurring order updated.,en_US
recurring_orders.detail.edit.success,Wiederkehrende Bestellung aktualisiert.,de_DE
recurring_orders.detail.edit.error,Recurring order could not be updated.,en_US
recurring_orders.detail.edit.error,Wiederkehrende Bestellung konnte nicht aktualisiert werden.,de_DE
recurring_orders.detail.edit.error.schedule_not_found,Recurring order %uuid% not found or access denied.,en_US
recurring_orders.detail.edit.error.schedule_not_found,Wiederkehrende Bestellung %uuid% nicht gefunden oder Zugriff verweigert.,de_DE
recurring_orders.detail.edit.name_label,Name,en_US
recurring_orders.detail.edit.name_label,Name,de_DE
recurring_orders.detail.edit.frequency_label,Frequency,en_US
recurring_orders.detail.edit.frequency_label,Häufigkeit,de_DE
recurring_orders.detail.edit.cadence_value_label,Interval,en_US
recurring_orders.detail.edit.cadence_value_label,Intervall,de_DE
recurring_orders.detail.edit.starting_date_label,Next Execution Date,en_US
recurring_orders.detail.edit.starting_date_label,Nächstes Ausführungsdatum,de_DE
recurring_orders.detail.edit.validation.name_required,Please enter a name.,en_US
recurring_orders.detail.edit.validation.name_required,Bitte geben Sie einen Namen ein.,de_DE
recurring_orders.detail.edit.validation.starting_date_required,Please select a starting date.,en_US
recurring_orders.detail.edit.validation.starting_date_required,Bitte wählen Sie ein Startdatum.,de_DE
recurring_orders.detail.edit.validation.starting_date_in_past,The starting date cannot be in the past.,en_US
recurring_orders.detail.edit.validation.starting_date_in_past,Das Startdatum darf nicht in der Vergangenheit liegen.,de_DE
recurring_orders.detail.resume.date_label,Next execution date,en_US
recurring_orders.detail.resume.date_label,Datum der nächsten Ausführung,de_DE
recurring_orders.detail.review_required.attention,Recurring order could not be processed automatically and requires your attention.,en_US
recurring_orders.detail.review_required.attention,Der wiederkehrende Auftrag konnte nicht automatisch verarbeitet werden und erfordert Ihre Aufmerksamkeit.,de_DE
recurring_orders.detail.sidebar.cadence,Cadence,en_US
recurring_orders.detail.sidebar.cadence,Häufigkeit,de_DE
recurring_orders.detail.sidebar.created,Created,en_US
recurring_orders.detail.sidebar.created,Erstellt,de_DE
recurring_orders.detail.sidebar.created_by,Created By,en_US
recurring_orders.detail.sidebar.created_by,Erstellt von,de_DE
recurring_orders.detail.sidebar.status,Status,en_US
recurring_orders.detail.sidebar.status,Status,de_DE
recurring_orders.detail.sidebar.title,Schedule Details,en_US
recurring_orders.detail.sidebar.title,Zeitplandetails,de_DE
recurring_orders.detail.source_order,Original order,en_US
recurring_orders.detail.source_order,Ursprüngliche Bestellung,de_DE
recurring_orders.detail.title,Recurring Order Details,en_US
recurring_orders.detail.title,Wiederkehrende Bestellung – Details,de_DE
recurring_orders.error.items_not_purchasable,The following items can no longer be purchased and the recurring order was not placed: %skus%,en_US
recurring_orders.error.items_not_purchasable,"Die folgenden Artikel können nicht mehr gekauft werden, und die wiederkehrende Bestellung wurde nicht aufgegeben: %skus%",de_DE
recurring_orders.history.errors.show,Show errors,en_US
recurring_orders.history.errors.show,Fehler anzeigen,de_DE
recurring_orders.history.event.cancelled,Cancelled,en_US
recurring_orders.history.event.cancelled,Abgebrochen,de_DE
recurring_orders.history.event.failed,Failed,en_US
recurring_orders.history.event.failed,Fehlgeschlagen,de_DE
recurring_orders.history.event.paused,Paused,en_US
recurring_orders.history.event.paused,Pausiert,de_DE
recurring_orders.history.event.placed,Completed,en_US
recurring_orders.history.event.placed,Abgeschlossen,de_DE
recurring_orders.history.event.resumed,Resumed,en_US
recurring_orders.history.event.resumed,Fortgesetzt,de_DE
recurring_orders.history.event.skipped,Skipped,en_US
recurring_orders.history.event.skipped,Übersprungen,de_DE
recurring_orders.item.configurable_bundle_label,Bundle: %name%,en_US
recurring_orders.item.configurable_bundle_label,Bundle: %name%,de_DE
recurring_orders.list.column.actions,Actions,en_US
recurring_orders.list.column.actions,Aktionen,de_DE
recurring_orders.list.column.frequency,Frequency,en_US
recurring_orders.list.column.frequency,Häufigkeit,de_DE
recurring_orders.list.column.name,Schedule Name,en_US
recurring_orders.list.column.name,Zeitplanname,de_DE
recurring_orders.list.column.next_order_date,Next Order Date,en_US
recurring_orders.list.column.next_order_date,Nächstes Bestelldatum,de_DE
recurring_orders.list.column.status,Status,en_US
recurring_orders.list.column.status,Status,de_DE
recurring_orders.list.empty,No recurring orders found.,en_US
recurring_orders.list.empty,Keine wiederkehrenden Bestellungen gefunden.,de_DE
recurring_orders.list.form.scope,Show schedules for,en_US
recurring_orders.list.form.scope,Zeitpläne anzeigen für,de_DE
recurring_orders.list.form.search,Search,en_US
recurring_orders.list.form.search,Suche,de_DE
recurring_orders.list.form.search_placeholder,Search schedules...,en_US
recurring_orders.list.form.search_placeholder,Zeitpläne suchen...,de_DE
recurring_orders.list.form.status,Status,en_US
recurring_orders.list.form.status,Status,de_DE
recurring_orders.list.form.status.all,All statuses,en_US
recurring_orders.list.form.status.all,Alle Status,de_DE
recurring_orders.list.scope.company,All Company Schedules,en_US
recurring_orders.list.scope.company,Alle Unternehmensbestellungen,de_DE
recurring_orders.list.scope.my_business_unit,My Business Unit,en_US
recurring_orders.list.scope.my_business_unit,Meine Geschäftseinheit,de_DE
recurring_orders.list.scope.my_schedules,My Schedules,en_US
recurring_orders.list.scope.my_schedules,Meine Zeitpläne,de_DE
recurring_orders.list.title,Recurring Orders,en_US
recurring_orders.list.title,Wiederkehrende Bestellungen,de_DE
recurring_orders.mail.notify_buyer_placement_failure.body.cta,Review Order,en_US
recurring_orders.mail.notify_buyer_placement_failure.body.cta,Bestellung prüfen,de_DE
recurring_orders.mail.notify_buyer_placement_failure.body.detail,Please review the order details and failure reason in your recurring orders dashboard.,en_US
recurring_orders.mail.notify_buyer_placement_failure.body.detail,Bitte überprüfen Sie die Bestelldetails und den Fehlergrund in Ihrem Dashboard für Folgebestellungen.,de_DE
recurring_orders.mail.notify_buyer_placement_failure.body.intro,"We were unable to place your recurring order ""%schedule_name%"" automatically.",en_US
recurring_orders.mail.notify_buyer_placement_failure.body.intro,"Ihre Folgebestellung ""%schedule_name%"" konnte nicht automatisch aufgegeben werden.",de_DE
recurring_orders.mail.notify_buyer_placement_failure.body.sign_off,Best regards,en_US
recurring_orders.mail.notify_buyer_placement_failure.body.sign_off,Mit freundlichen Grüßen,de_DE
recurring_orders.mail.notify_buyer_placement_failure.salutation,Hello,en_US
recurring_orders.mail.notify_buyer_placement_failure.salutation,Hallo,de_DE
recurring_orders.mail.notify_buyer_placement_failure.subject,"Recurring order ""%schedule_name%"" could not be placed",en_US
recurring_orders.mail.notify_buyer_placement_failure.subject,"Folgebestellung ""%schedule_name%"" konnte nicht aufgegeben werden",de_DE
recurring_orders.mail.notify_buyer_upcoming_order.body.cta,View Order,en_US
recurring_orders.mail.notify_buyer_upcoming_order.body.cta,Bestellung ansehen,de_DE
recurring_orders.mail.notify_buyer_upcoming_order.body.intro,"Your recurring order ""%schedule_name%"" is scheduled for %execution_date%. We will process it automatically on that date.",en_US
recurring_orders.mail.notify_buyer_upcoming_order.body.intro,"Ihre wiederkehrende Bestellung ""%schedule_name%"" ist für %execution_date% geplant. Wir werden sie automatisch an diesem Datum verarbeiten.",de_DE
recurring_orders.mail.notify_buyer_upcoming_order.body.review,"If you need to make changes, please review and update your order before %expiry_date%.",en_US
recurring_orders.mail.notify_buyer_upcoming_order.body.review,"Wenn Sie Änderungen vornehmen möchten, überprüfen und aktualisieren Sie bitte Ihre Bestellung vor dem %expiry_date%.",de_DE
recurring_orders.mail.notify_buyer_upcoming_order.salutation,Hello,en_US
recurring_orders.mail.notify_buyer_upcoming_order.salutation,Hallo,de_DE
recurring_orders.mail.notify_buyer_upcoming_order.subject,"Upcoming recurring order: ""%schedule_name%"" on %execution_date%",en_US
recurring_orders.mail.notify_buyer_upcoming_order.subject,"Bevorstehende Folgebestellung: ""%schedule_name%"" am %execution_date%",de_DE
recurring_orders.mail.notify_buyer_validation_failed.body.cta,Review Order,en_US
recurring_orders.mail.notify_buyer_validation_failed.body.cta,Bestellung überprüfen,de_DE
recurring_orders.mail.notify_buyer_validation_failed.body.detail,Please review your order details and make any necessary adjustments before the scheduled date.,en_US
recurring_orders.mail.notify_buyer_validation_failed.body.detail,Bitte überprüfen Sie Ihre Bestelldetails und nehmen Sie gegebenenfalls Anpassungen vor dem geplanten Datum vor.,de_DE
recurring_orders.mail.notify_buyer_validation_failed.body.intro,"Your recurring order ""%schedule_name%"", scheduled for %execution_date%, could not be processed automatically and requires your attention.",en_US
recurring_orders.mail.notify_buyer_validation_failed.body.intro,"Ihre wiederkehrende Bestellung ""%schedule_name%"", geplant für %execution_date%, konnte nicht automatisch verarbeitet werden und erfordert Ihre Aufmerksamkeit.",de_DE
recurring_orders.mail.notify_buyer_validation_failed.salutation,Hello,en_US
recurring_orders.mail.notify_buyer_validation_failed.salutation,Hallo,de_DE
recurring_orders.mail.notify_buyer_validation_failed.subject,"Action Required: ""%schedule_name%"" — your order needs attention",en_US
recurring_orders.mail.notify_buyer_validation_failed.subject,"Handlung erforderlich: ""%schedule_name%"" – Ihre Bestellung erfordert Aufmerksamkeit",de_DE
recurring_orders.menu_item,Recurring Orders,en_US
recurring_orders.menu_item,Wiederkehrende Bestellungen,de_DE
recurring_orders.review.all_items_removed,The order cannot be placed - all items are unavailable and the schedule cannot be executed without items.,en_US
recurring_orders.review.all_items_removed,Die Bestellung kann nicht aufgegeben werden - alle Artikel sind nicht verfügbar und der Zeitplan kann ohne Artikel nicht ausgeführt werden.,de_DE
recurring_orders.review.approve_error,The changes could not be applied. Please try again.,en_US
recurring_orders.review.approve_error,Die Änderungen konnten nicht übernommen werden. Bitte versuchen Sie es erneut.,de_DE
recurring_orders.review.add_product.error.no_price,No price is available for product %sku%. Please remove it or choose a different product.,en_US
recurring_orders.review.add_product.error.no_price,Für das Produkt %sku% ist kein Preis verfügbar. Bitte entfernen Sie es oder wählen Sie ein anderes Produkt.,de_DE
recurring_orders.review.add_product.error.not_available,Product %sku% is not available. Please remove it or choose a different product.,en_US
recurring_orders.review.add_product.error.not_available,Das Produkt %sku% ist nicht verfügbar. Bitte entfernen Sie es oder wählen Sie ein anderes Produkt.,de_DE
recurring_orders.review.add_product.error.shipment_unavailable,No shipment method is available for product %sku%. Please remove it or choose a different product.,en_US
recurring_orders.review.add_product.error.shipment_unavailable,Für das Produkt %sku% ist keine Versandart verfügbar. Bitte entfernen Sie es oder wählen Sie ein anderes Produkt.,de_DE
recurring_orders.review.add_product.error.measurement_unit_not_supported,Product %sku% is sold in measurement units and cannot be added here. Please choose a different product.,en_US
recurring_orders.review.add_product.error.measurement_unit_not_supported,Das Produkt %sku% wird in Maßeinheiten verkauft und kann hier nicht hinzugefügt werden. Bitte wählen Sie ein anderes Produkt.,de_DE
recurring_orders.review.add_product.error.packaging_unit_not_supported,Product %sku% is sold in packaging units and cannot be added here. Please choose a different product.,en_US
recurring_orders.review.add_product.error.packaging_unit_not_supported,Das Produkt %sku% wird in Verpackungseinheiten verkauft und kann hier nicht hinzugefügt werden. Bitte wählen Sie ein anderes Produkt.,de_DE
recurring_orders.review.add_product.error.not_placeable,The added products cannot be scheduled. Please review your selection and try again.,en_US
recurring_orders.review.add_product.error.not_placeable,Die hinzugefügten Produkte können nicht eingeplant werden. Bitte überprüfen Sie Ihre Auswahl und versuchen Sie es erneut.,de_DE
recurring_orders.review.approve_failed,The changes could not be applied.,en_US
recurring_orders.review.approve_failed,Die Änderungen konnten nicht übernommen werden.,de_DE
recurring_orders.review.approve_success,Your changes were applied and the order was placed.,en_US
recurring_orders.review.approve_success,Ihre Änderungen wurden übernommen und die Bestellung wurde aufgegeben.,de_DE
recurring_orders.review.back_to_detail,Back to schedule detail,en_US
recurring_orders.review.back_to_detail,Zurück zur Zeitplanübersicht,de_DE
recurring_orders.review.banner.price_change,%count% price change,en_US
recurring_orders.review.banner.price_change,%count% Preisänderung,de_DE
recurring_orders.review.banner.substituted,%count% product substituted,en_US
recurring_orders.review.banner.substituted,%count% Produkt ersetzt,de_DE
recurring_orders.review.banner.unavailable,%count% unavailable,en_US
recurring_orders.review.banner.unavailable,%count% nicht verfügbar,de_DE
recurring_orders.review.blocking.title,Cannot proceed — blocking issues,en_US
recurring_orders.review.blocking.title,Kann nicht fortfahren — blockierende Probleme,de_DE
recurring_orders.review.column.current_price,Current price,en_US
recurring_orders.review.column.current_price,Aktueller Preis,de_DE
recurring_orders.review.column.previous_price,Previous price,en_US
recurring_orders.review.column.previous_price,Vorheriger Preis,de_DE
recurring_orders.review.column.reason,Reason,en_US
recurring_orders.review.column.reason,Grund,de_DE
recurring_orders.review.cta.accept_and_place,Accept changes & place order,en_US
recurring_orders.review.cta.accept_and_place,Änderungen akzeptieren & Bestellung aufgeben,de_DE
recurring_orders.review.execution_scheduled,Execution scheduled for %date%,en_US
recurring_orders.review.execution_scheduled,Ausführung geplant für %date%,de_DE
recurring_orders.review.flagged.title,Items requiring your review,en_US
recurring_orders.review.flagged.title,Zu überprüfende Artikel,de_DE
recurring_orders.review.footer.helper,Accepting these changes will update this order and future executions of the schedule.,en_US
recurring_orders.review.footer.helper,"Wenn Sie diese Änderungen akzeptieren, werden diese Bestellung und zukünftige Ausführungen des Zeitplans aktualisiert.",de_DE
recurring_orders.review.footer.new_total,New total,en_US
recurring_orders.review.footer.new_total,Neue Summe,de_DE
recurring_orders.review.footer.summary,Removed products: %removed%,en_US
recurring_orders.review.footer.summary,Entfernte Produkte: %removed%,de_DE
recurring_orders.review.invalid_form,The request could not be processed. Please review and try again.,en_US
recurring_orders.review.invalid_form,Die Anfrage konnte nicht verarbeitet werden. Bitte überprüfen Sie sie und versuchen Sie es erneut.,de_DE
recurring_orders.review.modal.accepted_prices,Accepted price changes,en_US
recurring_orders.review.modal.accepted_prices,Akzeptierte Preisänderungen,de_DE
recurring_orders.review.modal.body,Removing unavailable items and accepting updated prices will affect this order and all future executions of this schedule. These changes will become the new reference state for the recurring order going forward.,en_US
recurring_orders.review.modal.body,Das Entfernen nicht verfügbarer Artikel und das Akzeptieren aktualisierter Preise wirken sich auf diese Bestellung und alle zukünftigen Ausführungen dieses Zeitplans aus. Diese Änderungen werden zum neuen Referenzzustand der wiederkehrenden Bestellung.,de_DE
recurring_orders.review.modal.headline,Confirm order and apply changes,en_US
recurring_orders.review.modal.headline,Bestellung bestätigen und Änderungen übernehmen,de_DE
recurring_orders.review.modal.new_total,New order total,en_US
recurring_orders.review.modal.new_total,Neue Bestellsumme,de_DE
recurring_orders.review.modal.original_total,Original order total,en_US
recurring_orders.review.modal.original_total,Ursprüngliche Bestellsumme,de_DE
recurring_orders.review.modal.removed_items,Removed products,en_US
recurring_orders.review.modal.removed_items,Entfernte Produkte,de_DE
recurring_orders.review.modal.substituted_items,Substituted products,en_US
recurring_orders.review.modal.substituted_items,Ersetzte Produkte,de_DE
recurring_orders.review.modal.added_products,Added products,en_US
recurring_orders.review.modal.added_products,Hinzugefügte Produkte,de_DE
recurring_orders.review.quantity_label,Quantity (every future order),en_US
recurring_orders.review.quantity_label,Menge (jede zukünftige Bestellung),de_DE
recurring_orders.review.scope.label,Apply these changes to,en_US
recurring_orders.review.scope.label,Diese Änderungen anwenden auf,de_DE
recurring_orders.review.scope.this_order,Just this order,en_US
recurring_orders.review.scope.this_order,Nur diese Bestellung,de_DE
recurring_orders.review.scope.every_future,Every future order,en_US
recurring_orders.review.scope.every_future,Jede zukünftige Bestellung,de_DE
recurring_orders.review.remove.label,Remove from schedule,en_US
recurring_orders.review.remove.label,Aus Zeitplan entfernen,de_DE
recurring_orders.review.remove.undo,Undo removal,en_US
recurring_orders.review.remove.undo,Entfernen rückgängig machen,de_DE
recurring_orders.review.quantity.decrease,Decrease quantity,en_US
recurring_orders.review.quantity.decrease,Menge verringern,de_DE
recurring_orders.review.quantity.increase,Increase quantity,en_US
recurring_orders.review.quantity.increase,Menge erhöhen,de_DE
recurring_orders.review.scope_required,Please choose whether each quantity change applies to just this order or every future order.,en_US
recurring_orders.review.scope_required,Bitte wählen Sie ob jede Mengenänderung nur für diese Bestellung oder für jede zukünftige Bestellung gilt.,de_DE
recurring_orders.review.quantity_invalid,Please enter a quantity of at least 1. To drop an item use the remove action instead.,en_US
recurring_orders.review.quantity_invalid,Bitte geben Sie eine Menge von mindestens 1 ein. Verwenden Sie zum Entfernen eines Artikels die Entfernen-Aktion.,de_DE
recurring_orders.review.not_available,This schedule does not require review.,en_US
recurring_orders.review.not_available,Dieser Zeitplan erfordert keine Überprüfung.,de_DE
recurring_orders.review.currency_mismatch,This recurring order can only be reviewed in its own currency. Please switch back to it to make changes.,en_US
recurring_orders.review.currency_mismatch,Diese wiederkehrende Bestellung kann nur in ihrer eigenen Währung überprüft werden. Bitte wechseln Sie zurück, um Änderungen vorzunehmen.,de_DE
recurring_orders.review.price_mode_mismatch,This recurring order can only be reviewed in its own price mode (gross/net). Please switch back to it to make changes.,en_US
recurring_orders.review.price_mode_mismatch,Diese wiederkehrende Bestellung kann nur in ihrem eigenen Preismodus (brutto/netto) überprüft werden. Bitte wechseln Sie zurück, um Änderungen vorzunehmen.,de_DE
recurring_orders.review.prices_changed,Prices changed again since you reviewed. Please review the updated order before approving.,en_US
recurring_orders.review.prices_changed,Die Preise haben sich seit Ihrer Überprüfung erneut geändert. Bitte überprüfen Sie die aktualisierte Bestellung vor der Genehmigung.,de_DE
recurring_orders.review.reason.discontinued,Discontinued,en_US
recurring_orders.review.reason.discontinued,Eingestellt,de_DE
recurring_orders.review.reason.not_approved,Not approved,en_US
recurring_orders.review.reason.not_approved,Nicht genehmigt,de_DE
recurring_orders.review.reason.price_increased,Price increased,en_US
recurring_orders.review.reason.price_increased,Preis erhöht,de_DE
recurring_orders.review.reason.price_unavailable,Price unavailable,en_US
recurring_orders.review.reason.price_unavailable,Preis nicht verfügbar,de_DE
recurring_orders.review.reason.substituted,Substituted,en_US
recurring_orders.review.reason.substituted,Ersetzt,de_DE
recurring_orders.review.substitute.label,Substitute,en_US
recurring_orders.review.substitute.label,Ersatzprodukt,de_DE
recurring_orders.review.substitute.select,Select Substitute,en_US
recurring_orders.review.substitute.select,Ersatzprodukt auswählen,de_DE
recurring_orders.review.substitute.change,Change,en_US
recurring_orders.review.substitute.change,Ändern,de_DE
recurring_orders.review.substitute.remove,Remove,en_US
recurring_orders.review.substitute.remove,Entfernen,de_DE
recurring_orders.review.reason.unavailable,Unavailable,en_US
recurring_orders.review.reason.unavailable,Nicht verfügbar,de_DE
recurring_orders.review.reason.out_of_stock,Out Of Stock,en_US
recurring_orders.review.reason.out_of_stock,Nicht auf Lager,de_DE
recurring_orders.review.title,Review Required — %name%,en_US
recurring_orders.review.title,Überprüfung erforderlich — %name%,de_DE
recurring_orders.review.unchanged.title,Unchanged items (%count%),en_US
recurring_orders.review.unchanged.title,Unveränderte Artikel (%count%),de_DE
recurring_orders.review.unchanged.title.plural,%count% unchanged items,en_US
recurring_orders.review.unchanged.title.plural,%count% unveränderte Artikel,de_DE
recurring_orders.status.active,Active,en_US
recurring_orders.status.active,Aktiv,de_DE
recurring_orders.status.cancelled,Cancelled,en_US
recurring_orders.status.cancelled,Abgebrochen,de_DE
recurring_orders.status.draft,Draft,en_US
recurring_orders.status.draft,Entwurf,de_DE
recurring_orders.status.failed,Failed,en_US
recurring_orders.status.failed,Fehlgeschlagen,de_DE
recurring_orders.status.paused,Paused,en_US
recurring_orders.status.paused,Pausiert,de_DE
recurring_orders.status.review_required,Review Required,en_US
recurring_orders.status.review_required,Überprüfung erforderlich,de_DE
recurring_orders.checkout.validation.cadence_required,Please select a frequency.,en_US
recurring_orders.checkout.validation.cadence_required,Bitte wählen Sie eine Häufigkeit aus.,de_DE
recurring_orders.checkout.validation.settings_not_confirmed,Please confirm your recurring order settings before submitting.,en_US
recurring_orders.checkout.validation.settings_not_confirmed,Bitte bestätigen Sie Ihre Einstellungen für die wiederkehrende Bestellung vor dem Absenden.,de_DE
recurring_orders.detail.resume.validation.date_required,Please select a resume date.,en_US
recurring_orders.detail.resume.validation.date_required,Bitte wählen Sie ein Fortsetzungsdatum aus.,de_DE
recurring_orders.detail.resume.validation.date_in_past,The resume date must be in the future.,en_US
recurring_orders.detail.resume.validation.date_in_past,Das Fortsetzungsdatum muss in der Zukunft liegen.,de_DE
recurring_orders.scheduled.order.errors.title,The following issues were found with your recurring order and it could not be placed:,en_US
recurring_orders.scheduled.order.errors.title,Die folgenden Probleme wurden bei Ihrer wiederkehrenden Bestellung festgestellt und sie konnte nicht aufgegeben werden:,de_DE
recurring_orders.review.add_product.add,Add,en_US
recurring_orders.review.add_product.add,Hinzufügen,de_DE
recurring_orders.review.add_product.clear,Clear,en_US
recurring_orders.review.add_product.clear,Zurücksetzen,de_DE
recurring_orders.review.add_product.label,Add a product — name or SKU,en_US
recurring_orders.review.add_product.label,Produkt hinzufügen — Name oder SKU,de_DE
recurring_orders.review.add_product.modal.title,Add a product,en_US
recurring_orders.review.add_product.modal.title,Produkt hinzufügen,de_DE
recurring_orders.review.add_product.open_modal,Add product,en_US
recurring_orders.review.add_product.open_modal,Produkt hinzufügen,de_DE
recurring_orders.review.add_product.price,Price,en_US
recurring_orders.review.add_product.price,Preis,de_DE
recurring_orders.review.add_product.quantity,Quantity,en_US
recurring_orders.review.add_product.quantity,Menge,de_DE
recurring_orders.review.add_product.remove,Remove,en_US
recurring_orders.review.add_product.remove,Entfernen,de_DE
recurring_orders.review.add_product.shipment_address,Delivery address,en_US
recurring_orders.review.add_product.shipment_address,Lieferadresse,de_DE
recurring_orders.review.add_product.shipment_address.group.company_unit_address,Business unit addresses,en_US
recurring_orders.review.add_product.shipment_address.group.company_unit_address,Adressen der Geschäftseinheit,de_DE
recurring_orders.review.add_product.shipment_address.group.schedule,Saved with this schedule,en_US
recurring_orders.review.add_product.shipment_address.group.schedule,Mit diesem Zeitplan gespeichert,de_DE
recurring_orders.review.add_product.shipment_address.placeholder,Select a delivery address,en_US
recurring_orders.review.add_product.shipment_address.placeholder,Lieferadresse auswählen,de_DE
recurring_orders.review.add_product.shipment_method,Shipment method,en_US
recurring_orders.review.add_product.shipment_method,Versandart,de_DE
recurring_orders.review.add_product.shipment_method.none,No shipment methods available for this address.,en_US
recurring_orders.review.add_product.shipment_method.none,Für diese Adresse sind keine Versandarten verfügbar.,de_DE
recurring_orders.review.add_product.shipment_method.placeholder,Select a shipment method,en_US
recurring_orders.review.add_product.shipment_method.placeholder,Versandart auswählen,de_DE
recurring_orders.review.add_product.title,Added products (%count%),en_US
recurring_orders.review.add_product.title,Hinzugefügte Produkte (%count%),de_DE
recurring_orders.review.add_product.title.singular,Added product (%count%),en_US
recurring_orders.review.add_product.title.singular,Hinzugefügtes Produkt (%count%),de_DE
recurring_orders.review.substitute.delta_higher,Higher price,en_US
recurring_orders.review.substitute.delta_higher,Höherer Preis,de_DE
recurring_orders.review.substitute.delta_lower,Lower price,en_US
recurring_orders.review.substitute.delta_lower,Niedrigerer Preis,de_DE
recurring_orders.review.substitute.delta_same,Same price,en_US
recurring_orders.review.substitute.delta_same,Gleicher Preis,de_DE
recurring_orders.review.substitute.modal.confirm,Use this substitute,en_US
recurring_orders.review.substitute.modal.confirm,Diesen Ersatz verwenden,de_DE
recurring_orders.review.substitute.modal.description,%product% is no longer available. Select a replacement to use for this order.,en_US
recurring_orders.review.substitute.modal.description,%product% ist nicht mehr verfügbar. Wählen Sie einen Ersatz für diese Bestellung.,de_DE
recurring_orders.review.substitute.modal.title,Choose a substitute,en_US
recurring_orders.review.substitute.modal.title,Ersatzprodukt wählen,de_DE
recurring_orders.review.substitute.unavailable,unavailable,en_US
recurring_orders.review.substitute.unavailable,nicht verfügbar,de_DE
recurring_orders.checkout.error.not_eligible,This cart cannot be placed as a recurring order.,en_US
recurring_orders.checkout.error.not_eligible,Dieser Warenkorb kann nicht als wiederkehrende Bestellung aufgegeben werden.,de_DE
recurring_orders.checkout.error.cadence_value_required,Please choose an interval for the recurring order.,en_US
recurring_orders.checkout.error.cadence_value_required,Bitte wählen Sie ein Intervall für die wiederkehrende Bestellung aus.,de_DE
recurring_orders.error.quote_not_found,The cart could not be found or access was denied.,en_US
recurring_orders.error.quote_not_found,Der Warenkorb wurde nicht gefunden oder der Zugriff wurde verweigert.,de_DE
recurring_orders.review.reason.configurable_bundle_unavailable,Configurable bundle unavailable,en_US
recurring_orders.review.reason.configurable_bundle_unavailable,Konfigurierbares Bundle nicht verfügbar,de_DE
recurring_orders.review.product-discontinued.message,"This product is discontinued. Choose a replacement to keep it in your order.",en_US
recurring_orders.review.product-discontinued.message,"Dieses Produkt wurde eingestellt. Wählen Sie einen Ersatz aus, damit es in Ihrer Bestellung bleibt.",de_DE
recurring_orders.review.substitute.sold-by,Sold by,en_US
recurring_orders.review.substitute.sold-by,Verkauft durch,de_DE
```

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
