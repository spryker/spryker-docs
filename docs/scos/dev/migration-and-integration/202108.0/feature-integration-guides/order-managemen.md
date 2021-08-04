---
title: Order management feature integration
originalLink: https://documentation.spryker.com/2021080/docs/order-management-feature-integration
redirect_from:
  - /2021080/docs/order-management-feature-integration
  - /2021080/docs/en/order-management-feature-integration
---

{% info_block warningBox "Included features" %}

The following feature integration guide expects the basic feature to be in place.

The current Feature Integration guide only adds the following functionalities:

*     Order cancellation behavior
*     Show `display names` for order item states 
*     Invoice generation


{% endinfo_block %}

## Install Feature Core

Follow the steps below to install the Order Management feature core.

### Prerequisites

To start feature integration, overview and install the necessary features:


| Name | Version |
| --- | --- |
| Spryker Core |  202009.0 |
| Mailing & Notifications |  202009.0 |

### 1) Install the Required Modules Using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/order-management: "202009.0" --update-with-dependencies
```

### Set up Database Schema and Transfer Objects
Run the following commands to apply database changes and generate transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:entity:generate
```
{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in database:

| Datatabase Entity | Type | Event |
| --- | --- | --- |
| `spy_sales_order_invoice` | table | created |

{% endinfo_block %}
{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `OrderInvoice` | class | created | `src/Generated/Shared/Transfer/OrderInvoiceTransfer` |
| `OrderInvoiceSendRequest` | class | created | `src/Generated/Shared/Transfer/OrderInvoiceSendRequestTransfer` |
| `OrderInvoiceSendResponse` | class | created |`src/Generated/Shared/Transfer/OrderInvoiceSendResponseTransfer` |
| `OrderInvoiceCriteria` | class | created | `src/Generated/Shared/Transfer/OrderInvoiceCriteriaTransfer` |
| `OrderInvoiceCollection` | class | created | `src/Generated/Shared/Transfer/OrderInvoiceCollectionTransfer` |
| `OrderInvoiceResponse` | class | created | `src/Generated/Shared/Transfer/OrderInvoiceResponseTransfer` |
| `Mail.recipientBccs` | property | created | `src/Generated/Shared/Transfer/MailTransfer` |

{% endinfo_block %}

### 3) Set up Configuration 

Set up the following configuration.

#### 2.1) Configure OMS
{% info_block infoBox "Info" %}

The `cancellable` flag allows to proceed to the `order cancel` process.

The `display` attribute allows to attach the `display name` attribute to specific order item states.

The` DummyInvoice` sub-process allows triggering `invoice-generate` events.

{% endinfo_block %}
Create the OMS sub-process file.
**config/Zed/oms/DummySubprocess/DummyInvoice01.xml**
```xml
<?xml version="1.0"?>
<statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd">

    <process name="DummyInvoice">
        <states>
            <state name="invoice generated"/>
        </states>

        <transitions>
            <transition>
                <source>confirmed</source>
                <target>invoice generated</target>
                <event>invoice-generate</event>
            </transition>

            <transition>
                <source>invoice generated</source>
                <target>waiting</target>
                <target>invoice-generated</target>
            </transition>
        </transitions>

        <events>
            <event name="invoice-generate" manual="true" command="Invoice/Generate"/>
            <event name="invoice-generated" onEnter="true"/>
        </events>
    </process>

</statemachine>
```
{% info_block warningBox "Verification" %}

The verification of the invoice state machine configuration will be checked in a later step.

{% endinfo_block %}

Using the `DummyPayment01.xml` process as an example, adjust your OMS state-machine configuration according to your project’s requirements.

<details open>
    <summary>config/Zed/oms/DummyPayment01.xml</summary>
    
```xml
<?xml version="1.0"?>
<statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd">

    <process name="DummyPayment01" main="true">

        <subprocesses>
            <process>DummyInvoice</process>
        </subprocesses>

        <states>
            <state name="new" reserved="true" display="oms.state.new">
                <flag>cancellable</flag>
            </state>
            <state name="payment pending" reserved="true" display="oms.state.payment-pending">
                <flag>cancellable</flag>
            </state>
            <state name="invalid" display="oms.state.invalid">
                <flag>exclude from customer</flag>
            </state>
            <state name="cancelled" display="oms.state.canceled">
                <flag>exclude from customer</flag>
            </state>
            <state name="paid" reserved="true" display="oms.state.paid">
                <flag>cancellable</flag>
            </state>
            <state name="confirmed" reserved="true" display="oms.state.confirmed">
                <flag>cancellable</flag>
            </state>
            <state name="waiting" reserved="true" display="oms.state.waiting"/>
            <state name="exported" reserved="true" display="oms.state.exported"/>
            <state name="shipped" reserved="true" display="oms.state.shipped"/>
            <state name="delivered" display="oms.state.delivered"/>
            <state name="closed" display="oms.state.closed"/>
        </states>

        <transitions>
            <transition happy="true" condition="DummyPayment/IsAuthorized">
                <source>new</source>
                <target>payment pending</target>
                <event>authorize</event>
            </transition>

            <transition>
                <source>new</source>
                <target>invalid</target>
                <event>authorize</event>
            </transition>

            <transition>
                <source>new</source>
                <target>cancelled</target>
                <event>cancel</event>
            </transition>

            <transition happy="true" condition="DummyPayment/IsPayed">
                <source>payment pending</source>
                <target>paid</target>
                <event>pay</event>
            </transition>

            <transition>
                <source>payment pending</source>
                <target>cancelled</target>
                <event>pay</event>
            </transition>

            <transition>
                <source>payment pending</source>
                <target>cancelled</target>
                <event>cancel</event>
            </transition>

            <transition happy="true">
                <source>paid</source>
                <target>confirmed</target>
                <event>confirm</event>
            </transition>

            <transition happy="true">
                <source>confirmed</source>
                <target>waiting</target>
                <event>skip timeout</event>
            </transition>

            <transition>
                <source>confirmed</source>
                <target>cancelled</target>
                <event>cancel</event>
            </transition>

            <transition happy="true">
                <source>waiting</source>
                <target>exported</target>
                <event>check giftcard purchase</event>
            </transition>

            <transition happy="true" condition="GiftCard/IsGiftCard">
                <source>waiting</source>
                <target>gift card purchased</target>
                <event>check giftcard purchase</event>
            </transition>

            <transition happy="true">
                <source>gift card shipped</source>
                <target>delivered</target>
                <event>complete gift card creation</event>
            </transition>

            <transition happy="true">
                <source>exported</source>
                <target>shipped</target>
                <event>ship</event>
            </transition>

            <transition happy="true">
                <source>shipped</source>
                <target>delivered</target>
                <event>stock-update</event>
            </transition>

            <transition happy="true">
                <source>delivered</source>
                <target>closed</target>
                <event>close</event>
            </transition>

        </transitions>

        <events>
            <event name="authorize" onEnter="true"/>
            <event name="pay" manual="true" timeout="1 hour" timeoutProcessor="OmsTimeout/Initiation" command="DummyPayment/Pay"/>
            <event name="confirm" onEnter="true" manual="true" command="Oms/SendOrderConfirmation"/>
            <event name="skip timeout" manual="true" timeout="30 minute"/>
            <event name="cancel" manual="true"/>
            <event name="export" onEnter="true" manual="true" command="Oms/SendOrderShipped"/>
            <event name="ship" manual="true" command="Oms/SendOrderShipped"/>
            <event name="stock-update" manual="true"/>
            <event name="close" manual="true" timeout="1 hour"/>
        </events>
    </process>

    <process name="DummyInvoice" file="DummySubprocess/DummyInvoice01.xml"/>

</statemachine>
```
</details>

{% info_block warningBox "Verification" %}

Ensure that you’ve configured the OMS:

1. Go to the Back Office > **Administration** > **OMS**.

2. Select *DummyPayment01 [preview-version]*.

2. Ensure that the `new`, `payment pending`, `paid`, and `confirmed` states keep the `cancellable` tag inside.

4. Ensure that `invoice generated` state was added.

{% endinfo_block %}

### 2.2) Configure Fallback Display Name Prefix 

Adjust configuration according to your project’s needs:


**src/Pyz/Zed/Oms/OmsConfig.php**
```php
<?php

namespace Pyz\Zed\Oms;

use Spryker\Zed\Oms\OmsConfig as SprykerOmsConfig;

class OmsConfig extends SprykerOmsConfig
{
    /**
     * Specification:
     * - Uses fallback prefix in concatenation with the normalized state name, in case the display property is not defined for the state.
     *    
     * @return string
     */
    public function getFallbackDisplayNamePrefix(): string
    {
        return 'oms.state.';
    }
}
```
	
{% info_block warningBox "Verification" %}

Once you've finished [setting up behavior](#set-up-behavior), ensure that, on the following Storefront pages, the item states are displayed correctly even if the `display` property is not set in the process definition:

* *Customer overview*
* *Order history*
* *Order details*
* *Returns*
* *Return details*


{% endinfo_block %}
#### 3.2) Configure Order Invoice Template

Adjust configuration according to your project’s needs:

**src/Pyz/Zed/SalesInvoice/SalesInvoiceConfig.php**
```php
<?php

namespace Pyz\Zed\SalesInvoice;

use Spryker\Zed\SalesInvoice\SalesInvoiceConfig as SprykerSalesInvoiceConfig;

class SalesInvoiceConfig extends SprykerSalesInvoiceConfig
{
    /**
     * @api
     *
     * @return string
     */
    public function getOrderInvoiceTemplatePath(): string
    {
        return 'SalesInvoice/Invoice/Invoice.twig';
    }
}
```
Add oder invoice twig template. For example:
<details open>
    <summary>src/Pyz/Zed/SalesInvoice/Presentation/Invoice/Invoice.twig</summary>
    
```html
{# @var order \Generated\Shared\Transfer\OrderTransfer #}
{# @var invoice \Generated\Shared\Transfer\OrderInvoiceTransfer #}

<!doctype html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0 " />
    <title></title>

    <style type="text/css">
        body {
            margin: 0;
            padding: 0;
            font-size: 16px;
            box-sizing: border-box;
        }
        table {
            max-width: 600px;
            margin: 0 auto;
            border-collapse: collapse;
        }
        .products-table {
            border: 1px solid #000;
        }
        .products-table td,
        .products-table th {
            padding: 5px 10px;
        }
        .background-gray {
            background: #e6e6e6;
        }
        .text-small {
            font-size: 13px;
        }
        .spacing-bottom {
            padding-bottom: 15px;
        }
        .spacing-right {
            padding-right: 15px;
        }
        .align-top {
            vertical-align: top;
        }
        .text-left {
            text-align: left;
        }
        .text-center {
            text-align: center;
        }
    </style>
</head>
<body>
    <table>
        <tr>
            <td width="300" class="align-top">
                <img src="" width="200" alt="Logo">
            </td>
            <td width="300">
                <strong>{% raw %}{{{% endraw %} 'order_invoice.invoice_template.company.name' | trans {% raw %}}}{% endraw %}</strong>
                <div class="spacing-bottom text-small">{% raw %}{{{% endraw %} 'order_invoice.invoice_template.company.group' | trans {% raw %}}}{% endraw %}</div>
                <div class="spacing-bottom text-small">{% raw %}{{{% endraw %} 'order_invoice.invoice_template.company.address' | trans | raw {% raw %}}}{% endraw %}</div>
            </td>
        </tr>
        <tr>
            <td width="300">
                <div class="spacing-bottom spacing-right">
                    <strong>{% raw %}{{{% endraw %} 'order_invoice.invoice_template.merchant.name' | trans {% raw %}}}{% endraw %}</strong>
                    <div class="text-small">{% raw %}{{{% endraw %} 'order_invoice.invoice_template.merchant.address' | trans {% raw %}}}{% endraw %}</div>
                </div>
                <div class="spacing-bottom">
                    {% raw %}{{{% endraw %} order.billingAddress.firstName {% raw %}}}{% endraw %} {% raw %}{{{% endraw %} order.billingAddress.lastName {% raw %}}}{% endraw %}<br>
                    {% raw %}{{{% endraw %} order.billingAddress.address1 {% raw %}}}{% endraw %} {% raw %}{{{% endraw %} order.billingAddress.address2 {% raw %}}}{% endraw %} {% raw %}{{{% endraw %} order.billingAddress.address3 {% raw %}}}{% endraw %}<br>
                    {% raw %}{{{% endraw %} order.billingAddress.zipcode {% raw %}}}{% endraw %} {% raw %}{{{% endraw %} order.billingAddress.city {% raw %}}}{% endraw %}<br>
                    {% raw %}{{{% endraw %} order.billingAddress.region {% raw %}}}{% endraw %}
                </div>
            </td>
            <td width="300" class="align-top">
                <div class="spacing-bottom">{% raw %}{{{% endraw %} invoice.issueDate | date('d. M Y') {% raw %}}}{% endraw %}</div>
            </td>
        </tr>
    </table>

    <table>
        <tr>
            <td width="600">
                <div class="spacing-bottom">
                    <strong>{% raw %}{{{% endraw %} 'order_invoice.invoice_template.reference' | trans {% raw %}}}{% endraw %} {% raw %}{{{% endraw %} invoice.reference {% raw %}}}{% endraw %}</strong>
                </div>
            </td>
        </tr>
        <tr>
            <td width="600">
                <div class="spacing-bottom">{% raw %}{{{% endraw %} 'order_invoice.invoice_template.introduction' | trans {% raw %}}}{% endraw %}</div>
            </td>
        </tr>
    </table>

    <table class="products-table">
        <thead>
            <tr class="background-gray">
                <th width="75"><strong>{% raw %}{{{% endraw %} 'order_invoice.invoice_template.table.number' | trans {% raw %}}}{% endraw %}</strong></th>
                <th width="75"><strong>{% raw %}{{{% endraw %} 'order_invoice.invoice_template.table.quantity' | trans {% raw %}}}{% endraw %}</strong></th>
                <th width="275" class="text-left"><strong>{% raw %}{{{% endraw %} 'order_invoice.invoice_template.table.name' | trans {% raw %}}}{% endraw %}</strong></th>
                <th width="100"><strong>{% raw %}{{{% endraw %} 'order_invoice.invoice_template.table.tax' | trans {% raw %}}}{% endraw %}</strong></th>
                <th width="75"><strong>{% raw %}{{{% endraw %} 'order_invoice.invoice_template.table.price' | trans | raw {% raw %}}}{% endraw %}</strong></th>
            </tr>
        </thead>
        <tbody>
        {% raw %}{%{% endraw %} set linenumber = 0 {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} set renderedBundles = [] {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} set taxes = {} {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} set itemSumByTaxes = {} {% raw %}%}{% endraw %}

        {% raw %}{%{% endraw %} for item in order.items {% raw %}%}{% endraw %}
            {# @var item \Generated\Shared\Transfer\ItemTransfer #}

            {% raw %}{%{% endraw %} set taxRate = item.taxRate {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} set rateSum = taxes[item.taxRate] | default(0) + item.sumTaxAmountFullAggregation {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} set taxes = taxes | merge({ (taxRate): rateSum }) {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} set rateItemSum = itemSumByTaxes[taxRate] | default(0) + item.sumPriceToPayAggregation {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} set itemSumByTaxes = itemSumByTaxes | merge({ (taxRate): rateItemSum }) {% raw %}%}{% endraw %}

            {% raw %}{%{% endraw %} if item.productBundle is not defined or item.productBundle is null {% raw %}%}{% endraw %}
                {% raw %}{%{% endraw %} set linenumber = linenumber + 1 {% raw %}%}{% endraw %}

                <tr>
                    <td class="text-center">{% raw %}{{{% endraw %} linenumber {% raw %}}}{% endraw %}</td>
                    <td class="text-center">{% raw %}{{{% endraw %} item.quantity {% raw %}}}{% endraw %}</td>
                    <td>{% raw %}{{{% endraw %} item.name {% raw %}}}{% endraw %}</td>
                    <td class="text-center">{% raw %}{{{% endraw %} item.taxRate | number_format {% raw %}}}{% endraw %}%</td>
                    <td class="text-center">{% raw %}{{{% endraw %} item.sumPriceToPayAggregation | money(true, order.currencyIsoCode) {% raw %}}}{% endraw %}</td>
                </tr>
            {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}

            {% raw %}{%{% endraw %} if item.productBundle is defined and item.productBundle is not null {% raw %}%}{% endraw %}
                {% raw %}{%{% endraw %} if item.relatedBundleItemIdentifier not in renderedBundles {% raw %}%}{% endraw %}
                    {# @var productBundle \Generated\Shared\Transfer\ItemTransfer #}

                    {% raw %}{%{% endraw %} set linenumber = linenumber + 1 {% raw %}%}{% endraw %}
                    {% raw %}{%{% endraw %} set productBundle = item.productBundle {% raw %}%}{% endraw %}

                    <tr>
                        <td class="text-center">{% raw %}{{{% endraw %} linenumber {% raw %}}}{% endraw %}</td>
                        <td class="text-center">{% raw %}{{{% endraw %} productBundle.quantity {% raw %}}}{% endraw %}</td>
                        <td>{% raw %}{{{% endraw %} productBundle.name {% raw %}}}{% endraw %}</td>
                        <td class="text-center">{% raw %}{{{% endraw %} productBundle.taxRate | number_format {% raw %}}}{% endraw %}%</td>
                        <td class="text-center">{% raw %}{{{% endraw %} productBundle.sumPriceToPayAggregation | money(true, order.currencyIsoCode) {% raw %}}}{% endraw %}</td>
                    </tr>

                    {% raw %}{%{% endraw %} for bundleditem in order.items {% raw %}%}{% endraw %}
                        {% raw %}{%{% endraw %} if item.relatedBundleItemIdentifier == bundleditem.relatedBundleItemIdentifier {% raw %}%}{% endraw %}
                            <tr>
                                <td></td>
                                <td class="text-center">{% raw %}{{{% endraw %} bundleditem.quantity {% raw %}}}{% endraw %}</td>
                                <td>{% raw %}{{{% endraw %} bundleditem.name {% raw %}}}{% endraw %}</td>
                                <td class="text-center">{% raw %}{{{% endraw %} bundleditem.taxRate | number_format {% raw %}}}{% endraw %}%</td>
                                <td class="text-center">{% raw %}{{{% endraw %} bundleditem.sumPriceToPayAggregation | money(true, order.currencyIsoCode) {% raw %}}}{% endraw %}</td>
                            </tr>
                        {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
                    {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}

                    {% raw %}{%{% endraw %} set renderedBundles = renderedBundles | merge([item.relatedBundleItemIdentifier]) {% raw %}%}{% endraw %}
                {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
        {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}

        {% raw %}{%{% endraw %} for expense in order.expenses {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} set linenumber = linenumber + 1 {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} set taxRate = expense.taxRate {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} set rateSum = taxes[expense.taxRate] | default(0) + expense.sumTaxAmount {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} set taxes = taxes | merge({ (taxRate): rateSum }) {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} set rateItemSum = itemSumByTaxes[taxRate] | default(0) + expense.sumPriceToPayAggregation {% raw %}%}{% endraw %}
            {% raw %}{%{% endraw %} set itemSumByTaxes = itemSumByTaxes | merge({ (taxRate): rateItemSum }) {% raw %}%}{% endraw %}

            <tr>
                <td class="text-center">{% raw %}{{{% endraw %} linenumber {% raw %}}}{% endraw %}</td>
                <td></td>
                <td>{% raw %}{{{% endraw %} expense.name {% raw %}}}{% endraw %}</td>
                <td class="text-center">{% raw %}{{{% endraw %} expense.taxRate | number_format {% raw %}}}{% endraw %}%</td>
                <td class="text-center">{% raw %}{{{% endraw %} expense.sumPrice | money(true, order.currencyIsoCode) {% raw %}}}{% endraw %}</td>
            </tr>
        {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}

        <tr class="background-gray">
            <td colspan="3"></td>
            <td>{% raw %}{{{% endraw %} 'order_invoice.invoice_template.table.subtotal' | trans {% raw %}}}{% endraw %}</td>
            <td class="text-center">{% raw %}{{{% endraw %} order.totals.subtotal | money(true, order.currencyIsoCode) {% raw %}}}{% endraw %}</td>
        </tr>
        <tr class="background-gray">
            <td colspan="3"></td>
            <td>{% raw %}{{{% endraw %} 'order_invoice.invoice_template.table.discount' | trans {% raw %}}}{% endraw %}</td>
            <td class="text-center">{% raw %}{{{% endraw %} order.totals.discountTotal | money(true, order.currencyIsoCode) {% raw %}}}{% endraw %}</td>
        </tr>

        {% raw %}{%{% endraw %} for rate, tax in taxes {% raw %}%}{% endraw %}
            <tr>
                <td colspan="2">{% raw %}{{{% endraw %} 'order_invoice.invoice_template.table.tax.included' | trans({ '%tax_rate%': rate | number_format }) {% raw %}}}{% endraw %}</td>
                <td class="text-center">{% raw %}{{{% endraw %} (itemSumByTaxes[rate] - tax) | money(true, order.currencyIsoCode) {% raw %}}}{% endraw %}</td>
                <td class="text-center">{% raw %}{{{% endraw %} 'order_invoice.invoice_template.table.tax.name' | trans {% raw %}}}{% endraw %}</td>
                <td class="text-center">{% raw %}{{{% endraw %} tax | money(true, order.currencyIsoCode) {% raw %}}}{% endraw %}</td>
            </tr>
        {% raw %}{%{% endraw %} endfor {% raw %}%}{% endraw %}

        <tr>
            <td colspan="2">{% raw %}{{{% endraw %} 'order_invoice.invoice_template.table.total.net' | trans {% raw %}}}{% endraw %}</td>
            <td class="text-center">{% raw %}{{{% endraw %} (order.totals.grandTotal - order.totals.taxTotal.amount) | money(true, order.currencyIsoCode) {% raw %}}}{% endraw %}</td>
            <td colspan="2"></td>
        </tr>
        <tr class="background-gray">
            <td colspan="3"></td>
            <td><strong>{% raw %}{{{% endraw %} 'order_invoice.invoice_template.table.grandtotal' | trans {% raw %}}}{% endraw %}</strong></td>
            <td class="text-center">{% raw %}{{{% endraw %} order.totals.grandTotal | money(true, order.currencyIsoCode) {% raw %}}}{% endraw %}</td>
        </tr>
        </tbody>
    </table>
</body>
</html>
```
</details>

{% info_block warningBox "Verification" %}

The verification of the invoice template configuration will be checked in a later step.

{% endinfo_block %}



 ### 4) Add Translations
{% info_block errorBox %}

An `oms.state.` prefixed translation key is a combination of the `OmsConfig::getFallbackDisplayNamePrefix()` and a normalized state machine name. If you have different OMS state-machine states or a fallback display name prefix, adjust the corresponding translations.

{% endinfo_block %}

{% info_block infoBox "Normalized state machine names" %}

By default, in state machine names:

* Spaces are replaced with dashes.
* All the words are decapitalized.

{% endinfo_block %}


Add translations as follows:

1. Append glossary according to your configuration:

```yaml
sales.error.customer_order_not_found,Customer Order not found.,en_US
sales.error.customer_order_not_found,Die Bestellung wurde nicht gefunden.,de_DE
sales.error.order_cannot_be_canceled_due_to_wrong_item_state,Order cannot be canceled due to wrong item state.,en_US
sales.error.order_cannot_be_canceled_due_to_wrong_item_state,Die Bestellung kann wegen dem falschen Artikelstatus nicht storniert werden.,de_DE
oms.state.new,New,en_US
oms.state.new,Neu,de_DE
oms.state.payment-pending,Payment pending,en_US
oms.state.payment-pending,Ausstehende Zahlung,de_DE
oms.state.invalid,Ivalid,en_US
oms.state.invalid,Ungültig,de_DE
oms.state.canceled,Canceled,en_US
oms.state.canceled,Abgebrochen,de_DE
oms.state.paid,Paid,en_US
oms.state.paid,Bezahlt,de_DE
oms.state.confirmed,Confirmed,en_US
oms.state.confirmed,Bestätigt,de_DE
oms.state.waiting,Waiting,en_US
oms.state.waiting,Warten,de_DE
oms.state.exported,Exported,en_US
oms.state.exported,Exportiert,de_DE
oms.state.shipped,Shipped,en_US
oms.state.shipped,Versandt,de_DE
oms.state.delivered,Delivered,en_US
oms.state.delivered,Geliefert,de_DE
quote_request.status.closed,Closed,en_US
quote_request.status.closed,Geschlossen,de_DE
mail.order_invoice.subject,"Invoice: %invoiceReference%",en_US
mail.order_invoice.subject,"Rechnung: %invoiceReference%",de_DE
```

2. Import data:

```bash
console data:import:glossary
```

{% info_block warningBox "Verification" %}

Ensure that, in the database, the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}

### 5) Set up Behavior

Set up the following behaviors.

#### 5.1) Set up Order Item Display Name


| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `CurrencyIsoCodeOrderItemExpanderPlugin` | Expands order items with currency codes (ISO). | None | `Spryker\Zed\Sales\Communication\Plugin\Sales` |
| `StateHistoryOrderItemExpanderPlugin` | Expands order items with history states. | None | `Spryker\Zed\Oms\Communication\Plugin\Sales` |
| `ItemStateOrderItemExpanderPlugin` | Expands order items with its item states. | None | `Spryker\Zed\Oms\Communication\Plugin\Sales` |
| `OrderAggregatedItemStateSearchOrderExpanderPlugin` | Expands orders with aggregated item states. | None | `Spryker\Zed\Oms\Communication\Plugin\Sales` |

**src/Pyz/Zed/Sales/SalesDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\Communication\Plugin\Sales\CurrencyIsoCodeOrderItemExpanderPlugin;
use Spryker\Zed\Oms\Communication\Plugin\Sales\ItemStateOrderItemExpanderPlugin;
use Spryker\Zed\Oms\Communication\Plugin\Sales\OrderAggregatedItemStateSearchOrderExpanderPlugin;
use Spryker\Zed\Oms\Communication\Plugin\Sales\StateHistoryOrderItemExpanderPlugin;
use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemExpanderPluginInterface[]
     */
    protected function getOrderItemExpanderPlugins(): array
    {
        return [
            new CurrencyIsoCodeOrderItemExpanderPlugin(),
            new StateHistoryOrderItemExpanderPlugin(),
            new ItemStateOrderItemExpanderPlugin(),
        ];
    }
    
    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\SearchOrderExpanderPluginInterface[]
     */
    protected function getSearchOrderExpanderPlugins(): array
    {
        return [
            new OrderAggregatedItemStateSearchOrderExpanderPlugin()
        ];
    }
}   
```
{% info_block warningBox "Verification" %}

Ensure that:

* Every order item from the `SalesFacade::getOrderItems()` result contains:
    * Currency ISO code
    * State history code
    * Item state data
* Every order from the `SalesFacade::getCustomerOrders()` result contains aggregated item state data.


{% endinfo_block %}

#### 5.2) Set up Order Cancellation Behavior


| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| IsCancellableOrderExpanderPlugin | Checks if each order item has the cancellable flag. | None | Spryker\Zed\Sales\Communication\Plugin\Sales |
| IsCancellableSearchOrderExpanderPlugin | Checks if each order item has the cancellable flag. | None | Spryker\Zed\Oms\Communication\Plugin\Sales |

**src/Pyz/Zed/Sales/SalesDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;
use Spryker\Zed\Oms\Communication\Plugin\Sales\IsCancellableOrderExpanderPlugin;
use Spryker\Zed\Oms\Communication\Plugin\Sales\IsCancellableSearchOrderExpanderPlugin;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\SearchOrderExpanderPluginInterface[]
     */
    protected function getSearchOrderExpanderPlugins(): array
    {
        return [
            new IsCancellableSearchOrderExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\OrderExpanderPluginInterface[]
     */
    protected function getOrderHydrationPlugins(): array
    {
        return [
            new IsCancellableOrderExpanderPlugin(),
        ];
    }
}   
```

{% info_block warningBox "Verification" %}

Ensure that, on the following pages, each order contains the `isCancellable` flag:

* The Storefront:
    * *Order History*
    * *Overview* 
* The Back Office:
    * *Overview of Orders*


{% endinfo_block %}

#### 5.3) Set up Order Invoice Generation Behavior
##### 5.3.1) Setup Order Invoice Mail Type

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `OrderInvoiceMailTypePlugin` | An email type that prepares invoice email for an order. | cell | cell |
**src/Pyz/Zed/Mail/MailDependencyProvider.php**
```php
<?php

namespace Pyz\Zed\Mail;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Mail\Business\Model\Mail\MailTypeCollectionAddInterface;
use Spryker\Zed\Mail\Business\Model\Provider\MailProviderCollectionAddInterface;
use Spryker\Zed\Mail\MailDependencyProvider as SprykerMailDependencyProvider;
use Spryker\Zed\SalesInvoice\Communication\Plugin\Mail\OrderInvoiceMailTypePlugin;

class MailDependencyProvider extends SprykerMailDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideBusinessLayerDependencies(Container $container)
    {
        $container = parent::provideBusinessLayerDependencies($container);

        $container->extend(static::MAIL_TYPE_COLLECTION, function (MailTypeCollectionAddInterface $mailCollection) {
            $mailCollection
                ->add(new OrderInvoiceMailTypePlugin());

            return $mailCollection;
        });

        return $container;
    }
}
```
##### 5.3.2) Set up Order Invoice OMS Command

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `GenerateOrderInvoiceCommandPlugin` | A command in OMS state machine, that generates invoice for order. | None | `Spryker\Zed\SalesInvoice\Communication\Plugin\Oms` |

**src/Pyz/Zed/Oms/OmsDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Oms;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Oms\Dependency\Plugin\Command\CommandCollectionInterface;
use Spryker\Zed\Oms\OmsDependencyProvider as SprykerOmsDependencyProvider;
use Spryker\Zed\SalesInvoice\Communication\Plugin\Oms\GenerateOrderInvoiceCommandPlugin;

class OmsDependencyProvider extends SprykerOmsDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    protected function extendCommandPlugins(Container $container): Container
    {
        $container->extend(static::COMMAND_PLUGINS, function (CommandCollectionInterface $commandCollection) {
            $commandCollection->add(new GenerateOrderInvoiceCommandPlugin(), 'Invoice/Generate');
            return $commandCollection;
        });

        return $container;
    }
}
```

#### 5.3.3) Set up Order Invoice OMS Command

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `OrderInvoiceSendConsole` | A console command that sends not-yet-sent order invoices via email. | None | `Spryker\Zed\SalesInvoice\Communication\Console` |

**src/Pyz/Zed/Oms/OmsDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Oms;

use Spryker\Zed\Console\ConsoleDependencyProvider as SprykerConsoleDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\SalesInvoice\Communication\Console\OrderInvoiceSendConsole;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Symfony\Component\Console\Command\Command[]
     */
    protected function getConsoleCommands(Container $container): array
    {
        $commands = [
            new OrderInvoiceSendConsole(),
        ];
        
        return $commands;
    }
}
```
Adjust scheduler project configuration:

**config/Zed/cronjobs/jenkins.php**
```php
/* Order invoice */
$jobs[] = [
    'name' => 'order-invoice-send',
    'command' => '$PHP_BIN vendor/bin/console order:invoice:send',
    'schedule' => '*/5 * * * *',
    'enable' => true,
    'stores' => $allStores,
];
```
To apply scheduler configuration update, run next commands:
```bash
vendor/bin/console scheduler:suspend
vendor/bin/console scheduler:setup
vendor/bin/console scheduler:resume
```
{% info_block warningBox "Verification" %}

Once all invoice related configuration was set up, ensure that the right order invoice template was assigned to the order (`spy_sales_order_invoice`) after moving at least 1 item in the order to `invoice generated` state based on your `DummyInvoice01.xml` and `SalesInvoiceConfig::getOrderInvoiceTemplatePath()` configuration.

{% endinfo_block %}
{% info_block warningBox "Verification" %}

The email with the invoice based on the configured invoice template should be sent to the email address of the order’s customer within the scheduled (5 mins) time.

{% endinfo_block %}

## Install Feature Front End

Follow the steps below to install the feature front end.

### Prerequisites

Overview and install the necessary features before beginning the integration step.

| Name | Version |
| --- | --- |
| Spryker Core | 202009.0 |



### 1) Install the Required Modules Using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/order-management: "202009.0" --update-with-dependencies
```


### 2) Add Translations

Add translations as follows:

1. Append glossary according to your configuration:

```yaml
order_cancel_widget.cancel_order,Cancel Order,en_US
order_cancel_widget.cancel_order,Bestellung stornieren,de_DE
order_cancel_widget.order.cancelled,Order was canceled successfully.,en_US
order_cancel_widget.order.cancelled,Die Bestellung wurde erfolgreich storniert.,de_DE
```

2. Import data:

```bash
console data:import:glossary
```

{% info_block warningBox "Verification" %}

Ensure that, in the database, the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}


### 3) Enable Controllers

Register the following route provider(s) on the Storefront:

 

| Provider | Namespace |
| --- | --- |
| `OrderCancelWidgetRouteProviderPlugin` | `SprykerShop\Yves\OrderCancelWidget\Plugin\Router`|

	
**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerShop\Yves\OrderCancelWidget\Plugin\Router\OrderCancelWidgetRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return \Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface[]
     */
    protected function getRouteProvider(): array
    {
        return [
            new OrderCancelWidgetRouteProviderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Ensure that the `yves.mysprykershop.com/order/cancel` route is available for POST requests.

{% endinfo_block %}


### 4) Set up Behavior

Set up the following behaviors.

#### 4.1) Set up Order Cancellation Behavior
 

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `OrderCancelButtonWidget` | Shows a **Cancel** button on the Storefront. | None | `SprykerShop\Yves\OrderCancelWidget\Widget` |

	
**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\OrderCancelWidget\Widget\OrderCancelButtonWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return string[]
     */
    protected function getGlobalWidgets(): array
    {
        return [
            OrderCancelButtonWidget::class,
        ];
    }
}
```
{% info_block warningBox "Verification" %}

Ensure that:

* The `OrderCancelButtonWidget` widget has been registered.
* The **Cancel** button is displayed on the *Order Details* page on the Storefront.


{% endinfo_block %}


#### 4.2) Set up Order Item Display Names


{% info_block warningBox "Verification" %}

Ensure that:

* You can see the aggregated order item states in the *item state* table column on the *Customer Overview* and *Order History* pages on the Storefront;
* Aggregated return item states are displayed on the *Return Page* on the Storefront.
* Item states are displayed on the *Order Details* and *Return Details* pages on the Storefront.


{% endinfo_block %}

