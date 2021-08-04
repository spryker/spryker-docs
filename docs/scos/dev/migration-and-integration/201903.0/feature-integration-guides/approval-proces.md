---
title: Approval Process Feature Integration
originalLink: https://documentation.spryker.com/v2/docs/approval-process-feature-integration-201903
redirect_from:
  - /v2/docs/approval-process-feature-integration-201903
  - /v2/docs/en/approval-process-feature-integration-201903
---

## Install Feature Core
### Prerequisites
To start feature integration, review and install the necessary features:

| Name | Version |
| --- | --- |
| Company Account | 201903.0 |
| Shared Carts | 201903.0 |
| Checkout | 201903.0 |
| Spryker Core | 2018.11.0 |

### 1) Install the Required Modules Using Composer

Run the following command to install the required modules:
```bash
composer require spryker-feature/approval-process:"^201903.0" --update-with-dependencies
```
{% info_block warningBox "Verification" %}
Make sure that the following module has been installed:<table><thead><tr><th>Module</th><th>Expected Directory</th></tr></thead><tbody><tr><td>`QuoteApproval`</td><td>`vendor/spryker/quote-approval`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Set up the Database Schema and Transfer Objects
Run the following commands to:

* apply database changes
* generate entity and transfer changes

```bash
console transfer:generate
console propel:install
console transfer:generate 
```

{% info_block warningBox "Verification" %}
Make sure that the following change has been applied by checking your database:<table><thead><tr><th>Database Entity</th><th>Type</th><th>Event</th></tr></thead><tbody><tr><td>`spy_sales_order_threshold`</td><td>table</td><td>created</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that the following changes in transfer objects have been applied:<table><thead><tr><th>Transfer</th><th>Type</th><th>Event</th><th>Path</th></tr></thead><tbody><tr><td>`QuoteTransfer.quoteApprovals`</td><td>column</td><td>created</td><td>`src/Generated/Shared/Transfer/QuoteTransfer`</td></tr><tr><td>`QuoteActivationRequestTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/QuoteApprovalTransfer`</td></tr><tr><td>`QuoteApprovalRequestTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/QuoteApprovalRequestTransfer`</td></tr><tr><td>`QuoteApprovalResponseTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/QuoteApprovalResponseTransfer`</td></tr><tr><td>`QuoteApprovalCollectionTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/QuoteApprovalResponseTransfer`</td></tr></tbody></table>
{% endinfo_block %}

### 3) Add Translations

Append glossary for the approval process feature:
<details open>
<summary> src/data/import/glossary.csv</summary>

```bash

quote_approval.request.send,Send Request,en_US
quote_approval.request.send,Anfrage Senden,de_DE
quote_approval.remove,Cancel Request,en_US
quote_approval.remove,Anfrage Abbrechen,de_DE
quote_approval.cart.require_approval,"You can't place this order because of your purchasing limit, please send your cart for approval or contact your manager.",en_US
quote_approval.cart.require_approval,"Sie können diese Bestellung aufgrund Ihres Einkaufslimits nicht aufgeben. Senden Sie Ihren Einkaufswagen zur Genehmigung oder wenden Sie sich an Ihren Kontakmanager.",de_DE
quote_approval.create.approver_cant_approve_quote,"Selected approver cannot approve your request due to approver limit.",en_US
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
quote_approval.created,"Your request for Approval was send to %first_name% %last_name%".,en_US
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
</details>

To import the glossary data, run the following console command:
```bash
console data:import glossary 
```

{% info_block warningBox "Verification" %}
Make sure that the configured data has been added to the `spy_glossary` table in the database.
{% endinfo_block %}

### 4) Set up Behavior

#### Setup Permission Integration

To setup the permission integration, register the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
|  `ApproveQuotePermissionPlugin` | Permission check that verifies if the customer can approve quote approval in the client layer. | None |  `Spryker\Client\QuoteApproval\Plugin\Permission` |
|  `PlaceOrderPermissionPlugin` | Permission check that verifies if the customer can place an order in the client layer. | None |  `Spryker\Client\QuoteApproval\Plugin\Permission` |
|  `RequestQuoteApprovalPermissionPlugin` | Permission check that verifies if the customer can request for approval in the client layer. | None |  `Spryker\Client\QuoteApproval\Plugin\Permission` |
|  `ApproveQuotePermissionPlugin` | Permission check that verifies  if the customer can approve the quote approval in Zed layer. | None |  `Spryker\Zed\QuoteApproval\Communication\Plugin\Permission` |
|  `PlaceOrderPermissionPlugin` | Permission check that verifies if the customer can place an order in Zed layer. | None |  `Spryker\Zed\QuoteApproval\Communication\Plugin\Permission` |

<details open>
<summary> src/Pyz/Client/Permission/PermissionDependencyProvider.php</summary>
 
 ```php
?php
 
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
<br>
</details>

<details open>
<summary> src/Pyz/Zed/Permission/PermissionDependencyProvider.php</summary>

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
<br>
</details>

{% info_block warningBox "Verification" %}
 Check the following: <br />When the customer permission is `RequestQuoteApprovalPermission`, then this customer can *request for approval*.<br />When the customer permission is `ApproveQuotePermission`, then this customer can approve the *request for approval*.<br />When the customer permission is `PlaceOrderPermissionPlugin`, then this customer can place order from quote with the approved *request for approval*.
{% endinfo_block %}

#### Set up Quote Integration

To set up the quote integration, register the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
|  `QuoteApprovalExpanderPlugin` | Expands quote with `QuoteApproval` data. | None |  `Spryker\Zed\QuoteApproval\Communication\Plugin\Quote` |
|  `RemoveQuoteApprovalsBeforeQuoteDeletePlugin` | Removes quote approvals from database before quote deletion. | None |  `Spryker\Zed\QuoteApproval\Communication\Plugin\Quote` |

<details open>
<summary> src/Pyz/Zed/Quote/QuoteDependencyProvider.php</summary>

 ```php
<?php

namespace Pyz\Zed\Quote;
 
use Spryker\Zed\Quote\QuoteDependencyProvider as SprykerQuoteDependencyProvider;
use Spryker\Zed\QuoteApproval\Communication\Plugin\Quote\QuoteApprovalExpanderPlugin;
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
} 
```
</details>

 {% info_block warningBox "Verification" %}
Make sure that: </br>On quote loading, the quote is expanded with data from `table spy_quote_approval` database table. </br>  Before quote deletion, the records from `spy_quote_approval` database table related to quote is removed.
{% endinfo_block %}

#### Set up Checkout Integration

To set up the checkout integration, register the following plugin:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
|  `QuoteApprovalCheckoutPreCheckPlugin` | Verifies that quote applicable for checkout if any of these conditions are met:<ul><li>Quote has an approved quote approval.</li><li>The quote does not require approval.</li> </ul>| None |  `Spryker\Client\QuoteApproval\Plugin\Checkout` |
<details open>
<summary>src/Pyz/Client/Checkout/CheckoutDependencyProvider.php</summary>

 ```php
<?php

namespace Pyz\Client\Checkout;
 
use Spryker\Client\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;
use Spryker\Client\QuoteApproval\Plugin\Checkout\QuoteApprovalCheckoutPreCheckPlugin;
 
class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
	/**
	 * @return \Spryker\Client\CheckoutExtension\Dependency\Plugin\CheckoutPreCheckPluginInterface[]
	 */
	protected function getCheckoutPreCheckPlugins(): array
	{
		return [
			new QuoteApprovalCheckoutPreCheckPlugin(),
		];
	}
}
```
</details>

{% info_block warningBox "Verification" %}
Check that customer without `PlaceOrderPermission` permission is not able to proceed to checkout.
{% endinfo_block %}

## Install Feature Frontend

### Prerequisites

To start feature integration, review and install the necessary features:

| Name | Version |
| --- | --- |
| Cart | 201903.0 |
| Checkout | 201903.0 |
| Spryker Core | 201903.0 |

### 1) Install the Required Modules Using Composer
Run the following command to install the required modules:

```bash
composer require spryker-feature/approval-process: "^201903.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Make sure that the following module has been installed:<table><thead><tr><th>Module</th><th>Expected Directory</th></tr></thead><tbody><tr><td>`QuoteApprovalWidget`</td><td>`vendor/spryker-shop/quote-approval-widget`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Add Translations

Append glossary according to your configuration:

<details open>
<summary> src/data/import/glossary.csv</summary>

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
quote_approval_widget.limit_text,"Your purchase limit is %amount%. To spend more, request approval from your manager.",en_US
quote_approval_widget.limit_text,"Ihr Einkaufsrahmen liegt bei %amount%. Um mehr auszugeben, fordern Sie bitte die Genehmigung bei Ihrem Manager an",de_DE
quote_approval_widget.no_limit_text,"You do not have a purchase limit",en_US
quote_approval_widget.no_limit_text,"Sie haben kein Einkaufslimit",de_DE
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
<br>
</details>

Run the following console command to import the glossary data:
```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}
Make sure that  the configured data has been added to the `spy_glossary` table in the database.
{% endinfo_block %}

### 3) Set up Widgets
Register the following global widgets:

| Widget | Description | Prerequisites | Namespace |
| --- | --- | --- | --- |
|  `QuoteApprovalStatusWidgett` | Adds the quote approval status for a multi-cart list in the header and on the multi-cart list page. | None |  `SprykerShop\Yves\QuoteApprovalWidget\Widget` |
|  `QuoteApprovalWidget` | Adds an approver functionality to the Cart page. | None |  `SprykerShop\Yves\QuoteApprovalWidget\Widget` |
|  `QuoteApproveRequestWidget` | Adds the request for quote approve functionality to the Cart page. | None |  `SprykerShop\Yves\QuoteApprovalWidget\Widget` |

 <details open>
<summary>src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php</summary>

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
<br>
</details>

Run the following command to enable the Javascript and CSS changes:

```bash
console frontend:yves:build
```
{% info_block warningBox "Verification" %}
Make sure that the plugin has been registered:</br>1. Open Yves and log in with the customer credentials.</br>2. Open `https://mysprykershop.com/company/company-role/`and assign the following permission to any role related to the current customer: </br>- `RequestQuoteApprovalPermission`</br> - `PlaceOrderPermission`</br> - `ApproveQuotePermission`</br>3. Add the record to `spy_quote_approval` table with a current customer quote id and current customer company user as an approver.<table><thead><tr><th>Module</th><th>Test</th></tr></thead><tbody><tr><td>`QuoteApprovalStatusWidget`</td><td>Hover over the multicart list in the header. It should contain a Quote Approval Status column.Open `http://mysprykershop.com/multi-cart/`: table should contain the Quote Approval Status column.</td></tr><tr><td>`QuoteApproveRequestWidget`</td><td>Open `http://mysprykershop.com/cart/`. It should contain widget request for approval with a list approvers.</td></tr><tr><td>`QuoteApprovalWidget`</td><td>Open `http://mysprykershop.com/cart/`. It should contain the widget approver functionality with buttons to Approve or Decline.</td></tr></tbody></table>
{% endinfo_block %}

### 4) Enable Controllers

To enable the controllers, register the following plugin:

| Widget | Description | Prerequisites | Namespace |
| --- | --- | --- | --- |
|  `QuoteApprovalControllerProvider` | Provides routes used in `QuoteApprovalWidget`. | None |  `SprykerShop\Yves\QuoteApprovalWidget\Plugin\Provider` |

<details open>
<summary> src/Pyz/Yves/ShopApplication/YvesBootstrap.php</summary>

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
</details>

{% info_block warningBox "Verification" %}
Make sure that the plugin has been registered:</br>1. Open Yves and log in with the customer credentials.</br>2. Open `http://mysprykershop.com/company/company-role/`
{% endinfo_block %}and assign the following permission to any role related to the current customer:</br>- `RequestQuoteApprovalPermission`</br> - `PlaceOrderPermission`</br> - `ApproveQuotePermission`</br>3. Add the record to `spy_quote_approval` database table with a current customer quote id and current customer company user as an approver.)</br>4. Open `http://mysprykershop.com/cart/` and click **Approve**. Quote approval status should become approved and **Proceed to Checkout** icon must be shown.</br>5. Create a new quote with items.</br>6. Open  `http://mysprykershop.com/cart/`  and click **Request for Approval**. Quote approval status should become *Waiting* and *Approver* functionality must be shown.)
