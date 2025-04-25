


This document describes how to install the [Approval Process feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/feature-overviews/approval-process-feature-overview.html).

## Install feature core

Follow the steps below to install the Approval Proces feature core.

### Prerequisites

To start feature integration, review and install the necessary features:

| NAME           | VERSION           | INSTALLATION GUIDE |
| -------------- | ----------------- | ----------------- |
| Company Account | {{page.version}}|[Company Account feature](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-company-account-feature.html)|
| Shared Carts | {{page.version}} |[Install the Shared Carts feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-shared-carts-feature.html)|
| Checkout | {{page.version}} |[Install the Checkout feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-checkout-feature.html)|
| Spryker Core | {{page.version}} |[Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)|

### 1) Install the required modules

```bash
composer require spryker-feature/approval-process:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following module has been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| QuoteApproval | vendor/spryker/quote-approval |

{% endinfo_block %}

### 2) Set up configuration

Add the following configuration to your project:

**src/Pyz/Shared/QuoteApproval/QuoteApprovalConfig.php**

```php
<?php

namespace Pyz\Shared\QuoteApproval;

use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Shared\QuoteApproval\QuoteApprovalConfig as SprykerQuoteApprovalConfig;

class QuoteApprovalConfig extends SprykerQuoteApprovalConfig
{
    /**
     * @return string[]
     */
    public function getRequiredQuoteFieldsForApprovalProcess(): array
    {
        return [
            QuoteTransfer::BILLING_ADDRESS,
            QuoteTransfer::PAYMENT,
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the configuration returns the billing address and payment keys.

{% endinfo_block %}

If you are using [Multiple Carts feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/feature-overviews/multiple-carts-feature-overview.html), add the following configuration to your project:

**src/Pyz/Client/MultiCart/MultiCartConfig.php**

```php
<?php

namespace Pyz\Client\MultiCart;

use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Client\MultiCart\MultiCartConfig as SprykerMultiCartConfig;

class MultiCartConfig extends SprykerMultiCartConfig
{
    /**
     * @return array<string|array<string>>
     */
    public function getQuoteFieldsAllowedForCustomerQuoteCollectionInSession(): array
    {
        return array_merge(parent::getQuoteFieldsAllowedForCustomerQuoteCollectionInSession(), [
            ...
            QuoteTransfer::QUOTE_APPROVALS,
            ...
        ]);
    }
}
```

### 3) Set up database schema and transfer objects

Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY | TYPE | EVENT |
| --- | --- | --- |
| spy_quote_approval | table | created |

Make sure the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| QuoteTransfer.quoteApprovals | column | created	 | src/Generated/Shared/Transfer/QuoteTransfer|
| QuoteActivationRequestTransfer | class | created | src/Generated/Shared/Transfer/QuoteApprovalTransfer |
| QuoteApprovalRequestTransfer | class | created | src/Generated/Shared/Transfer/QuoteApprovalRequestTransfer |
| QuoteApprovalResponseTransfer | class | created | src/Generated/Shared/Transfer/QuoteApprovalResponseTransfer |
| QuoteApprovalCollectionTransfer | class | created	 | src/Generated/Shared/Transfer/QuoteApprovalResponseTransfer |

{% endinfo_block %}

### 4) Add translations

Append glossary for the Approval Process feature:

**src/data/import/glossary.csv**

```yaml
quote_approval.request.send,Send Request,en_US
quote_approval.request.send,Anfrage Senden,de_DE
quote_approval.remove,Cancel Request,en_US
quote_approval.remove,Anfrage Abbrechen,de_DE
quote_approval.cart.require_approval,"You can't place this order because of your purchasing limit,  send your cart for approval or contact your manager.",en_US
quote_approval.cart.require_approval,"Sie können diese Bestellung aufgrund Ihres Einkaufslimits nicht aufgeben. Senden Sie Ihren Einkaufswagen zur Genehmigung oder wenden Sie sich an Ihren Kontakmanager.",de_DE
quote_approval.cart.waiting_approval,"You can't place this order because of pending approval request.",en_US
quote_approval.cart.waiting_approval,"Sie können diese Bestellung aufgrund einer ausstehenden Genehmigungsanfrage nicht aufgeben.",de_DE
quote_approval.create.approver_cant_approve_quote,"Selected approver cannot approve your request because of approver limit.",en_US
quote_approval.create.approver_cant_approve_quote,"Der ausgewählte Manager kann Ihre Anfrage aufgrund des Genehmigungslimits nicht genehmigen.",de_DE
quote_approval.create.you_cant_approve_quote,"You can't approve or decline this cart because it's amount higher that your Approver limit.",en_US
quote_approval.create.you_cant_approve_quote,"Sie können diesen Einkaufswagen nicht genehmigen oder ablehnen, weil dessen Betrag höher als ihr Genehmigungslimit ist.",de_DE
quote_approval.create.quote_already_approved,"This Cart was already approved.",en_US
quote_approval.create.quote_already_approved,"Dieser Einkaufswagen wurde schon zur Genehmigung gesendet.",de_DE
quote_approval.create.quote_already_declined,"This Cart was already declined.",en_US
quote_approval.create.quote_already_declined,"Dieser Einkaufswagen wurde schon abgelehnt.",de_DE
quote_approval.create.quote_already_cancelled,"You can't work with this Cart it was already sent to another approver.",en_US
quote_approval.create.quote_already_cancelled,"Sie können nicht mit diesem Einkaufswagen arbeiten, er wurde schon dem anderen Manager gesendet.",de_DE
quote_approval.create.quote_already_waiting_for_approval,"This Cart was already sent for approval.",en_US
quote_approval.create.quote_already_waiting_for_approval,"",de_DE
quote_approval.create.only_quote_owner_can_send_request,"You can't sent Cart for Approval, only Cart owner can do it.",en_US
quote_approval.create.only_quote_owner_can_send_request,"Sie können den Einkaufswagen zur Genehmigung nicht senden, das kann nur Inhaber des Einkaufswagens machen.",de_DE
quote_approval.cancel.do_not_have_permission,"You don't have permissions to cancel Approval request.",en_US
quote_approval.cancel.do_not_have_permission,"Sie haben nicht die notwendigen Rechte um die Genehmigungsanfrage zu abbrechen.",de_DE
quote_approval.request.approval_by,by,en_US
quote_approval.request.approval_by,von,de_DE
quote_approval.created,"Your request for Approval was send to %first_name% %last_name%.",en_US
quote_approval.created,"Ihre Anfrage zur Genehmigung wurde an %first_name% %last_name% gesendet.",de_DE
quote_approval.removed,"Your request for Approval was canceled.",en_US
quote_approval.removed,"Ihre Genehmigungsanfrage wurde abgebrochen.",de_DE
quote_approval.request.waiting_for_approval_from,Waiting for Approval from,en_US
quote_approval.request.waiting_for_approval_from,Wartet auf die Genehmigung von,de_DE
quote_approval.request.approved_by,Approved by,en_US
quote_approval.request.approved_by,Genehmigt von,de_DE
quote_approval.request.declined_by,Declined by,en_US
quote_approval.request.declined_by,Abgelehnt um,de_DE
```

Import the glossary data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the `spy_glossary` table in the database.

{% endinfo_block %}

### 4) Set up permission integration

Register the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ApproveQuotePermissionPlugin | Checks if the customer can approve the quote in the client layer. | None | Spryker\Client\QuoteApproval\Plugin\Permission |
| PlaceOrderPermissionPlugin | Checks if the customer can place an order in the client layer. | None | Spryker\Client\QuoteApproval\Plugin\Permission |
| RequestQuoteApprovalPermissionPlugin | Checks if the customer can request for approval in the client layer. | None | Spryker\Client\QuoteApproval\Plugin\Permission |
| ApproveQuotePermissionPlugin | Checks if the customer can approve quote approval in the Zed layer. | None | Spryker\Zed\QuoteApproval\Communication\Plugin\Permission |
| PlaceOrderPermissionPlugin | Checks if the customer can place an order in the Zed layer. | None | Spryker\Zed\QuoteApproval\Communication\Plugin\Permission |
| SanitizeQuoteApprovalQuoteLockPreResetPlugin | Allows complete removal of all the approval process-related data from the quote on cart lock reset. | None | Spryker\Zed\QuoteApproval\Communication\Plugin\Cart |

**src/Pyz/Client/Permission/PermissionDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Permission;

use Spryker\Client\Permission\PermissionDependencyProvider as SprykerPermissionDependencyProvider;
use Spryker\Client\QuoteApproval\Plugin\Permission\ApproveQuotePermissionPlugin;
use Spryker\Client\QuoteApproval\Plugin\Permission\PlaceOrderPermissionPlugin;
use Spryker\Client\QuoteApproval\Plugin\Permission\RequestQuoteApprovalPermissionPlugin;

class PermissionDependencyProvider extends SprykerPermissionDependencyProvider
{
    /**
     * @return \Spryker\Shared\PermissionExtension\Dependency\Plugin\PermissionPluginInterface[]
     */
    protected function getPermissionPlugins(): array
    {
        return [
            new RequestQuoteApprovalPermissionPlugin(),
            new PlaceOrderPermissionPlugin(),
            new ApproveQuotePermissionPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Permission/PermissionDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Permission;

use Spryker\Zed\Permission\PermissionDependencyProvider as SprykerPermissionDependencyProvider;
use Spryker\Zed\QuoteApproval\Communication\Plugin\Permission\ApproveQuotePermissionPlugin;
use Spryker\Zed\QuoteApproval\Communication\Plugin\Permission\PlaceOrderPermissionPlugin;

class PermissionDependencyProvider extends SprykerPermissionDependencyProvider
{
    /**
     * @return \Spryker\Shared\PermissionExtension\Dependency\Plugin\PermissionPluginInterface[]
     */
    protected function getPermissionPlugins()
    {
        return [
            new PlaceOrderPermissionPlugin(),
            new ApproveQuotePermissionPlugin(),
        ];
    }
}
```

**Pyz\Zed\Cart\CartDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\QuoteApproval\Communication\Plugin\Cart\SanitizeQuoteApprovalQuoteLockPreResetPlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\QuotePreUnlockPluginInterface[]
     */
    protected function getQuoteLockPreResetPlugins(): array
    {
        return [
            new SanitizeQuoteApprovalQuoteLockPreResetPlugin(),
        ];
    }
}
```

#### Synchronize permission plugins with storage:

Go to the Back Office, **Maintenance** menu, and click **Sync permissions**.

{% info_block warningBox "Verification" %}

Check that the following happens:
* The customer, with the `RequestQuoteApprovalPermission` permission, can request approval.
* The customer, with the `ApproveQuotePermission` permission, can approve the request.
* The customer, with the `PlaceOrderPermissionPlugin` permission, can place an order from the quote with the approved request for approval.
* When you reset the cart lock, all the approval process-related data is removed from the quote.

{% endinfo_block %}

#### Set up quote integration

Register the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| QuoteApprovalExpanderPlugin | Expands the quote with the QuoteApproval data. | None |  Spryker\Zed\QuoteApproval\Communication\Plugin\Quote |
| RemoveQuoteApprovalsBeforeQuoteDeletePlugin | Removes quote approvals from the database before the quote deletion. | None |  Spryker\Zed\QuoteApproval\Communication\Plugin\Quote |
| QuoteApprovalQuoteFieldsAllowedForSavingProviderPlugin | Returns required quote fields from the configuration if the approval request is not canceled. |None | Spryker\Zed\QuoteApproval\Communication\Plugin\Quote |

**src/Pyz/Zed/Quote/QuoteDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Quote;

use Spryker\Zed\Quote\QuoteDependencyProvider as SprykerQuoteDependencyProvider;
use Spryker\Zed\QuoteApproval\Communication\Plugin\Quote\QuoteApprovalExpanderPlugin;
use Spryker\Zed\QuoteApproval\Communication\Plugin\Quote\QuoteApprovalQuoteFieldsAllowedForSavingProviderPlugin;
use Spryker\Zed\QuoteApproval\Communication\Plugin\Quote\RemoveQuoteApprovalsBeforeQuoteDeletePlugin;

class QuoteDependencyProvider extends SprykerQuoteDependencyProvider
{
    /**
     * @return \Spryker\Zed\QuoteExtension\Dependency\Plugin\QuoteWritePluginInterface[]
     */
    protected function getQuoteDeleteBeforePlugins(): array
    {
        return [
            new RemoveQuoteApprovalsBeforeQuoteDeletePlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\QuoteExtension\Dependency\Plugin\QuoteExpanderPluginInterface[]
     */
    protected function getQuoteExpanderPlugins(): array
    {
        return [
            new QuoteApprovalExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\QuoteExtension\Dependency\Plugin\QuoteFieldsAllowedForSavingProviderPluginInterface[]
     */
    protected function getQuoteFieldsAllowedForSavingProviderPlugins(): array
    {
        return [
            new QuoteApprovalQuoteFieldsAllowedForSavingProviderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure the following:
* The quote is expanded with data from the database table `spy_quote_approval` on quote loading.
* The records from the database table `spy_quote_approval` related to the quote are removed before the quote deletion.
* The billing address and payment are saved with the quote in the `spy_quote` table after sending an approval request.

{% endinfo_block %}

#### Set up checkout integration

Register the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| QuoteApprovalCheckoutPreConditionPlugin | Checks if the quote is ready to checkout.| None |  Spryker\Zed\QuoteApproval\Communication\Plugin\Checkout |

**src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Checkout;

use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;
use Spryker\Zed\QuoteApproval\Communication\Plugin\Checkout\QuoteApprovalCheckoutPreConditionPlugin;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container ’
     *
     * @return \Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPreConditionPluginInterface[]
     */
    protected function getCheckoutPreConditions(Container $container)
    {
        return [
            new QuoteApprovalCheckoutPreConditionPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Check that the customer without `PlaceOrderPermission` can't proceed to checkout.

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the Approval Proces feature frontend.

### Prerequisites

To start feature integration, review and install the necessary features:

| NAME           | VERSION           | INSTALLATION GUIDE |
| -------------- | ----------------- | ----------------- |
| Company Account | {{page.version}}|[Company Account feature](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-company-account-feature.html)|
| Shared Carts | {{page.version}} |[Install the Shared Carts feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-shared-carts-feature.html)|
| Checkout | {{page.version}} |[Install the Checkout feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-checkout-feature.html)|
| Spryker Core | {{page.version}} |[Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)|
| Cart | {{page.version}} |[Install the Cart feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-cart-feature.html)|

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/approval-process: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following module has been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| QuoteApprovalWidget | vendor/spryker-shop/quote-approval-widget |

{% endinfo_block %}

### 2) Add translations

1. Append glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
quote_approval_widget.title,Approval Request,en_US
quote_approval_widget.title,Genehmigungsanfrage,de_DE
quote_approval_widget.limit.unlimited,Unlimited,en_US
quote_approval_widget.limit.unlimited,Unbegrenzt,de_DE
quote_approval_widget.no_approvers_found,Keine Genehmiger gefunden.,de_DE
quote_approval_widget.no_approvers_found,No approvers found.,en_US
quote_approval_widget.cart.status.approved,"Approved",en_US
quote_approval_widget.cart.status.approved,"Genehmigt",de_DE
quote_approval_widget.cart.status.declined,"Declined",en_US
quote_approval_widget.cart.status.declined,"Abgelehnt",de_DE
quote_approval_widget.cart.status.waiting,"Waiting",en_US
quote_approval_widget.cart.status.waiting,"Wartet",de_DE
quote_approval_widget.shared_cart_warning,"After a cart has been sent to approval, all of its shares will be dismissed.",en_US
quote_approval_widget.shared_cart_warning,"Nachdem der Warenkorb zur Genehmigung gesendet wurde, wird sein Sharing aufgehoben.",de_DE
quote_approval_widget.limit_text,"Your purchase limit's %amount%. To spend more, request approval from your manager.",en_US
quote_approval_widget.limit_text,"Ihr Einkaufsrahmen liegt bei %amount%. Um mehr auszugeben, fordern Sie bitte die Genehmigung bei Ihrem Manager an",de_DE
quote_approval_widget.no_limit_text,"You do not have a purchase limit",en_US
quote_approval_widget.no_limit_text,"Sie haben kein Einkaufslimit",de_DE
quote_approval_widget.quote_not_applicable_for_approval_process,"This cart can't be processed. Required information is missing.",en_US
quote_approval_widget.quote_not_applicable_for_approval_process,Diese Anfrage kann nicht bearbeitet werden. Es fehlen erforderliche Informationen.,de_DE
quote_approval_widget.cart.status,"Status",en_US
quote_approval_widget.cart.status,"Status",de_DE
quote_approval_widget.cart.approve,"Approve",en_US
quote_approval_widget.cart.approve,"Genehmigen",de_DE
quote_approval_widget.cart.decline,"Decline",en_US
quote_approval_widget.cart.decline,"Ablehnen",de_DE
quote_approval_widget.cart.cancel,"Cancel",en_US
quote_approval_widget.cart.cancel,"Abbrechen",de_DE
quote_approval_widget.cart.success_message.approved,"Request from %first_name% %last_name% was successfully approved",en_US
quote_approval_widget.cart.success_message.approved,"Anfrage von %first_name% %last_name% wurde erfolgreich genehmigt",de_DE
quote_approval_widget.cart.success_message.declined,"Request from %first_name% %last_name% was successfully declined",en_US
quote_approval_widget.cart.success_message.declined,"Anfrage von %first_name% %last_name% wurde erfolgreich abgelehnt",de_DE
quote_approval_widget.cart.success_message.canceled,"Request from %first_name% %last_name% was successfully canceled",en_US
quote_approval_widget.cart.success_message.canceled,"Anfrage von %first_name% %last_name% wurde erfolgreich abgebrochen",de_DE
```

2. Import the glossary data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data is added to the `spy_glossary` table in the database.

{% endinfo_block %}

### 3) Set up permission integration

Register the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| QuoteApprovalCheckerCheckoutAddressStepEnterPreCheckPlugin | Checks if the quote approval status is approved or waiting on the address step of checkout. | None | SprykerShop\Yves\QuoteApprovalWidget\Plugin\CheckoutPage |
| QuoteApprovalCheckerCheckoutPaymentStepEnterPreCheckPlugin | Checks if the quote approval status is approved or waiting on the payment step of checkout. | None | SprykerShop\Yves\QuoteApprovalWidget\Plugin\CheckoutPage |

**src/Pyz/Yves/CheckoutPage/CheckoutPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\CheckoutPage;

use SprykerShop\Yves\CheckoutPage\CheckoutPageDependencyProvider as SprykerShopCheckoutPageDependencyProvider;
use SprykerShop\Yves\QuoteApprovalWidget\Plugin\CheckoutPage\QuoteApprovalCheckerCheckoutAddressStepEnterPreCheckPlugin;
use SprykerShop\Yves\QuoteApprovalWidget\Plugin\CheckoutPage\QuoteApprovalCheckerCheckoutPaymentStepEnterPreCheckPlugin;

/**
 * @method \Pyz\Yves\CheckoutPage\CheckoutPageConfig getConfig()
 */
class CheckoutPageDependencyProvider extends SprykerShopCheckoutPageDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\CheckoutPageExtension\Dependency\Plugin\CheckoutAddressStepEnterPreCheckPluginInterface[]
     */
    protected function getCheckoutAddressStepEnterPreCheckPlugins(): array
    {
        return [
            new QuoteApprovalCheckerCheckoutAddressStepEnterPreCheckPlugin(),
        ];
    }

    /**
     * @return \SprykerShop\Yves\CheckoutPageExtension\Dependency\Plugin\CheckoutPaymentStepEnterPreCheckPluginInterface[]
     */
    protected function getCheckoutPaymentStepEnterPreCheckPlugins(): array
    {
        return [
            new QuoteApprovalCheckerCheckoutPaymentStepEnterPreCheckPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

On the storefront, make sure the following:
* The customer with the sent approval request can't open the address step on the cart page.
* The customer with the sent approval request can't open the payment step on the cart page.

{% endinfo_block %}

### 4) Set up widgets

1. Register the following global widgets:

| WIDGET | DESCRIPTION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
|  QuoteApprovalStatusWidget | Adds a quote approval status for the multicart list in the header and on the multicart list page. | None |  SprykerShop\Yves\QuoteApprovalWidget\Widget |
|  QuoteApprovalWidget | Adds an approval functionality to the Cart page. | None | SprykerShop\Yves\QuoteApprovalWidget\Widget |
|  QuoteApproveRequestWidget | Adds the request for quote approval functionality to the cart page. | None |  SprykerShop\Yves\QuoteApprovalWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\QuoteApprovalWidget\Widget\QuoteApprovalStatusWidget;
use SprykerShop\Yves\QuoteApprovalWidget\Widget\QuoteApprovalWidget;
use SprykerShop\Yves\QuoteApprovalWidget\Widget\QuoteApproveRequestWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return string[]
     */
    protected function getGlobalWidgets(): array
    {
        return [
            QuoteApprovalStatusWidget::class,
            QuoteApproveRequestWidget::class,
            QuoteApprovalWidget::class,
        ];
    }
}
```

2. Enable the Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Make sure that the plugin has been registered:

1. Open Yves and log in to the customer account.
2. Open `https://mysprykershop.com/company/company-role/` and assign `RequestQuoteApprovalPermission`, `PlaceOrderPermission`, and `ApproveQuotePermission` permissions to any role related to the current customer.
3. Add the record to the `spy_quote_approval` for the current customer quote ID and current customer company user as an approver.

| MODULE | TEST |
| --- | --- |
| QuoteApprovalStatusWidget | Hover over the multicart list in the header: contains the quote approval status column.<br>Open `https://mysprykershop.com/multi-cart/`. The table contains the quote approval status column. |
| QuoteApproveRequestWidget | Open `https://mysprykershop.com/checkout/summary/`. It contains the widget request for approval with list approvers. |
| QuoteApprovalWidget | Open the `https://mysprykershop.com/cart/`. It contains widget approver functionality with buttons to approve or decline. |

{% endinfo_block %}

### 4) Enable controllers

Register the following plugin:

| WIDGET | DESCRIPTION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| QuoteApprovalControllerProvider | Provides routes used in `QuoteApprovalWidget`.| None |  SprykerShop\Yves\QuoteApprovalWidget\Plugin\Provider |

**src/Pyz/Yves/ShopApplication/YvesBootstrap.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\QuoteApprovalWidget\Plugin\Provider\QuoteApprovalControllerProvider;
use SprykerShop\Yves\ShopApplication\YvesBootstrap as SprykerYvesBootstrap;

class YvesBootstrap extends SprykerYvesBootstrap
{
    /**
     * @param bool|null $isSsl
     *
     * @return \SprykerShop\Yves\ShopApplication\Plugin\Provider\AbstractYvesControllerProvider[]
     */
    protected function getControllerProviderStack($isSsl)
    {
        return [
            new QuoteApprovalControllerProvider($isSsl), #SharedCartFeature
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the plugin has been registered:

1. On the Storefront, log in to the customer account.
2. Open `https://mysprykershop.com/company/company-role/` and assign `RequestQuoteApprovalPermission`, `PlaceOrderPermission`, and `ApproveQuotePermission` permissions to any role related to the current customer.
3. For the current customer quote ID and current customer company user as an approver, add the record to `spy_quote_approval`.
4. Open `https://mysprykershop.com/cart/`.
5. Click the **Approve** button. Quote approval status becomes approved and the **Proceed to checkout** button must be displayed.
6. Create a new quote with items.
7. Open ` https://mysprykershop.com/cart/` and click the **Request for Approval** button. The quote approval status must become waiting, and the approver functionality must be shown.

{% endinfo_block %}
