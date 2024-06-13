


This document describes how to install the [Order Management](/docs/scos/user/features/{{page.version}}/order-management-feature-overview/order-management-feature-overview.html) feature.

{% info_block warningBox "Included features" %}

The following feature integration guide expects the basic feature to be in place. It only adds the following functionalities:

- Order cancellation behavior
- Show `display names` for order item states
- Invoice generation
- Custom order reference
- Sales Orders Backend API

{% endinfo_block %}


## Install feature core

Follow the steps below to install the Order Management feature core.

###  Prerequisites

Install the required features:

| NAME                      | VERSION          | INSTALLATION GUIDE                                                                                                                                                                       |
|---------------------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core              | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                             |
| Mailing and Notifications | {{page.version}} | [Install the Mailing and Notifications feature](/docs/pbc/all/emails/{{page.version}}/install-the-mailing-and-notifications-feature.html)                          |
| Order Management          | {{page.version}} | [Install the Order Management feature](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html) |
| Persistent Cart           | {{page.version}} |                                                                                                                                                                                         |

### 1) Install the required modules

```bash
composer require spryker-feature/order-management: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                         | EXPECTED DIRECTORY                                |
|--------------------------------|---------------------------------------------------|
| OrderCustomReference           | vendor/spryker/order-custom-reference             |
| OrderCustomReferenceGui        | vendor/spryker/order-custom-reference-gui         |
| SalesOrdersBackendApi          | vendor/spryker/sales-orders-backend-api           |
| SalesOrdersBackendApiExtension | vendor/spryker/sales-orders-backend-api-extension |

 {% endinfo_block %}

## 2) Set up database schema and transfer objects

Apply database changes and generate transfer changes:

```bash
console transfer:generate
console propel:install
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in the database:

| DATABASE ENTITY                        | TYPE   | EVENT   |
|----------------------------------------|--------|---------|
| spy_sales_order_invoice                | table  | created |
| spy_sales_order.order_custom_reference | column | created |
| spy_sales_order.uuid                   | column | created |
| spy_sales_order_item.uuid              | column | created |
| spy_sales_order_address.uuid           | column | created |
| spy_sales_order_address_history.uuid   | column | created |
| spy_sales_order_totals.uuid            | column | created |
| spy_sales_order_note.uuid              | column | created |
| spy_sales_order_comment.uuid           | column | created |
| spy_sales_expense.uuid                 | column | created |
| spy_sales_order_item_metadata.uuid     | column | created |

Make sure the following changes have been applied in transfer objects:

| TRANSFER                                          | TYPE     | EVENT   | PATH                                                                 |
|---------------------------------------------------|----------|---------|----------------------------------------------------------------------|
| OrderInvoice                                      | class    | created | src/Generated/Shared/Transfer/OrderInvoiceTransfer                   |
| OrderInvoiceSendRequest                           | class    | created | src/Generated/Shared/Transfer/OrderInvoiceSendRequestTransfer        |
| OrderInvoiceSendResponse                          | class    | created | src/Generated/Shared/Transfer/OrderInvoiceSendResponseTransfer       |
| OrderInvoiceCriteria                              | class    | created | src/Generated/Shared/Transfer/OrderInvoiceCriteriaTransfer           |
| OrderInvoiceCollection                            | class    | created | src/Generated/Shared/Transfer/OrderInvoiceCollectionTransfer         |
| OrderInvoiceResponse                              | class    | created | src/Generated/Shared/Transfer/OrderInvoiceResponseTransfer           |
| OrderCustomReferenceResponse                      | class    | created | src/Generated/Shared/Transfer/OrderCustomReferenceResponseTransfer   |
| OrderResourceCollection                           | class    | created | src/Generated/Shared/Transfer/OrderResourceCollectionTransfer        |
| OrdersBackendApiAttributes                        | class    | created | src/Generated/Shared/Transfer/OrdersBackendApiAttributesTransfer     |
| OrderItemsBackendApiAttributes                    | class    | created | src/Generated/Shared/Transfer/OrderItemsBackendApiAttributesTransfer |
| Mail.recipientBccs                                | property | created | src/Generated/Shared/Transfer/MailTransfer                           |
| Quote.orderCustomReference                        | property | created | src/Generated/Shared/Transfer/QuoteTransfer                          |
| QuoteUpdateRequestAttributes.orderCustomReference | property | created | src/Generated/Shared/Transfer/QuoteUpdateRequestAttributesTransfer   |
| Order.orderCustomReference                        | property | created | src/Generated/Shared/Transfer/OrderTransfer                          |
| Item.uuid                                         | property | created | src/Generated/Shared/Transfer/ItemTransfer                           |

{% endinfo_block %}

### 3) Set up configuration

Set up the following configuration.

#### Configure OMS

{% info_block infoBox %}

- The `cancellable` flag allows proceeding to the `order cancel` process.
- The `display` attribute allows attaching the `display name` attribute to specific order item states.
- The `DummyInvoice` sub-process allows triggering `invoice-generate` events.

{% endinfo_block %}

1. Create the OMS sub-process file:

<details>
    <summary markdown='span'>config/Zed/oms/DummySubprocess/DummyInvoice01.xml</summary>

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
</details>

{% info_block warningBox "Verification" %}

Verify the invoice state machine configuration in the following step.

{% endinfo_block %}

2. Using the following process as an example, adjust your OMS state-machine configuration according to your project's requirements.

<details><summary markdown='span'>config/Zed/oms/DummyPayment01.xml</summary>

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

Ensure that you've configured OMS:

1. In the Back Office, go to **Administration&nbsp;<span aria-label="and then">></span> OMS**.

2. Select **DummyPayment01 [preview-version]** and check the following:

- The `new`, `payment pending`, `paid`, and `confirmed` states keep the `cancellable` tag inside.
- The `invoice generated` state has been added.

{% endinfo_block %}

#### Configure the fallback display name prefix

Adjust configuration according to your project's requirements:

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

#### Configure an order invoice template

1. Adjust the configuration according to your project's requirements:

**src/Pyz/Zed/SalesInvoice/SalesInvoiceConfig.php**

```php
<?php

namespace Pyz\Zed\SalesInvoice;

use Spryker\Zed\SalesInvoice\SalesInvoiceConfig as SprykerSalesInvoiceConfig;

class SalesInvoiceConfig extends SprykerSalesInvoiceConfig
{
    /**
     * @return string
     */
    public function getOrderInvoiceTemplatePath(): string
    {
        return 'SalesInvoice/Invoice/Invoice.twig';
    }
}
```

2. Using the example below, add an order invoice Twig template according to your project's requirements:

<details><summary markdown='span'>src/Pyz/Zed/SalesInvoice/Presentation/Invoice/Invoice.twig</summary>

```twig
{%- raw -%}
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
                <strong>{{ 'order_invoice.invoice_template.company.name' | trans }}</strong>
                <div class="spacing-bottom text-small">{{ 'order_invoice.invoice_template.company.group' | trans }}</div>
                <div class="spacing-bottom text-small">{{ 'order_invoice.invoice_template.company.address' | trans | raw }}</div>
            </td>
        </tr>
        <tr>
            <td width="300">
                <div class="spacing-bottom spacing-right">
                    <strong>{{ 'order_invoice.invoice_template.merchant.name' | trans }}</strong>
                    <div class="text-small">{{ 'order_invoice.invoice_template.merchant.address' | trans }}</div>
                </div>
                <div class="spacing-bottom">
                    {{ order.billingAddress.firstName }} {{ order.billingAddress.lastName }}<br>
                    {{ order.billingAddress.address1 }} {{ order.billingAddress.address2 }} {{ order.billingAddress.address3 }}<br>
                    {{ order.billingAddress.zipcode }} {{ order.billingAddress.city }}<br>
                    {{ order.billingAddress.region }}
                </div>
            </td>
            <td width="300" class="align-top">
                <div class="spacing-bottom">{{ invoice.issueDate | date('d. M Y') }}</div>
            </td>
        </tr>
    </table>

    <table>
        <tr>
            <td width="600">
                <div class="spacing-bottom">
                    <strong>{{ 'order_invoice.invoice_template.reference' | trans }} {{ invoice.reference }}</strong>
                </div>
            </td>
        </tr>
        <tr>
            <td width="600">
                <div class="spacing-bottom">{{ 'order_invoice.invoice_template.introduction' | trans }}</div>
            </td>
        </tr>
    </table>

    <table class="products-table">
        <thead>
            <tr class="background-gray">
                <th width="75"><strong>{{ 'order_invoice.invoice_template.table.number' | trans }}</strong></th>
                <th width="75"><strong>{{ 'order_invoice.invoice_template.table.quantity' | trans }}</strong></th>
                <th width="275" class="text-left"><strong>{{ 'order_invoice.invoice_template.table.name' | trans }}</strong></th>
                <th width="100"><strong>{{ 'order_invoice.invoice_template.table.tax' | trans }}</strong></th>
                <th width="75"><strong>{{ 'order_invoice.invoice_template.table.price' | trans | raw }}</strong></th>
            </tr>
        </thead>
        <tbody>
        {% set linenumber = 0 %}
        {% set renderedBundles = [] %}
        {% set taxes = {} %}
        {% set itemSumByTaxes = {} %}

        {% for item in order.items %}
            {# @var item \Generated\Shared\Transfer\ItemTransfer #}

            {% set taxRate = item.taxRate %}
            {% set rateSum = taxes[item.taxRate] | default(0) + item.sumTaxAmountFullAggregation %}
            {% set taxes = taxes | merge({ (taxRate): rateSum }) %}
            {% set rateItemSum = itemSumByTaxes[taxRate] | default(0) + item.sumPriceToPayAggregation %}
            {% set itemSumByTaxes = itemSumByTaxes | merge({ (taxRate): rateItemSum }) %}

            {% if item.productBundle is not defined or item.productBundle is null %}
                {% set linenumber = linenumber + 1 %}

                <tr>
                    <td class="text-center">{{ linenumber }}</td>
                    <td class="text-center">{{ item.quantity }}</td>
                    <td>{{ item.name }}</td>
                    <td class="text-center">{{ item.taxRate | number_format }}%</td>
                    <td class="text-center">{{ item.sumPriceToPayAggregation | money(true, order.currencyIsoCode) }}</td>
                </tr>
            {% endif %}

            {% if item.productBundle is defined and item.productBundle is not null %}
                {% if item.relatedBundleItemIdentifier not in renderedBundles %}
                    {# @var productBundle \Generated\Shared\Transfer\ItemTransfer #}

                    {% set linenumber = linenumber + 1 %}
                    {% set productBundle = item.productBundle %}

                    <tr>
                        <td class="text-center">{{ linenumber }}</td>
                        <td class="text-center">{{ productBundle.quantity }}</td>
                        <td>{{ productBundle.name }}</td>
                        <td class="text-center">{{ productBundle.taxRate | number_format }}%</td>
                        <td class="text-center">{{ productBundle.sumPriceToPayAggregation | money(true, order.currencyIsoCode) }}</td>
                    </tr>

                    {% for bundleditem in order.items %}
                        {% if item.relatedBundleItemIdentifier == bundleditem.relatedBundleItemIdentifier %}
                            <tr>
                                <td></td>
                                <td class="text-center">{{ bundleditem.quantity }}</td>
                                <td>{{ bundleditem.name }}</td>
                                <td class="text-center">{{ bundleditem.taxRate | number_format }}%</td>
                                <td class="text-center">{{ bundleditem.sumPriceToPayAggregation | money(true, order.currencyIsoCode) }}</td>
                            </tr>
                        {% endif %}
                    {% endfor %}

                    {% set renderedBundles = renderedBundles | merge([item.relatedBundleItemIdentifier]) %}
                {% endif %}
            {% endif %}
        {% endfor %}

        {% for expense in order.expenses %}
            {% set linenumber = linenumber + 1 %}
            {% set taxRate = expense.taxRate %}
            {% set rateSum = taxes[expense.taxRate] | default(0) + expense.sumTaxAmount %}
            {% set taxes = taxes | merge({ (taxRate): rateSum }) %}
            {% set rateItemSum = itemSumByTaxes[taxRate] | default(0) + expense.sumPriceToPayAggregation %}
            {% set itemSumByTaxes = itemSumByTaxes | merge({ (taxRate): rateItemSum }) %}

            <tr>
                <td class="text-center">{{ linenumber }}</td>
                <td></td>
                <td>{{ expense.name }}</td>
                <td class="text-center">{{ expense.taxRate | number_format }}%</td>
                <td class="text-center">{{ expense.sumPrice | money(true, order.currencyIsoCode) }}</td>
            </tr>
        {% endfor %}

        <tr class="background-gray">
            <td colspan="3"></td>
            <td>{{ 'order_invoice.invoice_template.table.subtotal' | trans }}</td>
            <td class="text-center">{{ order.totals.subtotal | money(true, order.currencyIsoCode) }}</td>
        </tr>
        <tr class="background-gray">
            <td colspan="3"></td>
            <td>{{ 'order_invoice.invoice_template.table.discount' | trans }}</td>
            <td class="text-center">{{ order.totals.discountTotal | money(true, order.currencyIsoCode) }}</td>
        </tr>

        {% for rate, tax in taxes %}
            <tr>
                <td colspan="2">{{ 'order_invoice.invoice_template.table.tax.included' | trans({ '%tax_rate%': rate | number_format }) }}</td>
                <td class="text-center">{{ (itemSumByTaxes[rate] - tax) | money(true, order.currencyIsoCode) }}</td>
                <td class="text-center">{{ 'order_invoice.invoice_template.table.tax.name' | trans }}</td>
                <td class="text-center">{{ tax | money(true, order.currencyIsoCode) }}</td>
            </tr>
        {% endfor %}

        <tr>
            <td colspan="2">{{ 'order_invoice.invoice_template.table.total.net' | trans }}</td>
            <td class="text-center">{{ (order.totals.grandTotal - order.totals.taxTotal.amount) | money(true, order.currencyIsoCode) }}</td>
            <td colspan="2"></td>
        </tr>
        <tr class="background-gray">
            <td colspan="3"></td>
            <td><strong>{{ 'order_invoice.invoice_template.table.grandtotal' | trans }}</strong></td>
            <td class="text-center">{{ order.totals.grandTotal | money(true, order.currencyIsoCode) }}</td>
        </tr>
        </tbody>
    </table>
</body>
</html>
{% endraw %}
```
</details>

{% info_block warningBox "Verification" %}

You will be able to verify the invoice template configuration in a later step.

{% endinfo_block %}


### 4) Add translations


{% info_block errorBox %}

An `oms.state.` prefixed translation key is a combination of the `OmsConfig::getFallbackDisplayNamePrefix()` and a normalized state machine name. If you have different OMS state-machine states or a fallback display name prefix, adjust the corresponding translations.

{% endinfo_block %}


{% info_block infoBox "Normalized state machine names" %}

By default, in state machine names, the following applies:

- Spaces are replaced with dashes.
- All the words are decapitalized.

{% endinfo_block %}

1. Append glossary according to your configuration:
<details><summary markdown='span'>src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php</summary>

**src/data/import/glossary.csv**
```csv
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
order_custom_reference.reference_saved,Custom order reference was successfully saved.,en_US
order_custom_reference.reference_saved,Ihre Bestellreferenz wurde erfolgreich gespeichert.,de_DE
order_custom_reference.reference_not_saved,Custom order reference has not been changed.,en_US
order_custom_reference.reference_not_saved,Ihre Bestellreferenz wurde nicht geändert.,de_DE
order_custom_reference.validation.error.message_invalid_length,Custom order reference length is invalid.,en_US
order_custom_reference.validation.error.message_invalid_length,Die Länge der Bestellreferenz ist ungültig.,de_DE
order_custom_reference.title,Custom Order Reference,en_US
order_custom_reference.title,Ihre Bestellreferenz,de_DE
order_custom_reference.form.placeholder,Add custom order reference,en_US
order_custom_reference.form.placeholder,Ihre Bestellreferenz hinzufügen,de_DE
order_custom_reference.save,Save,en_US
order_custom_reference.save,Speichern,de_DE
```
</details>

 1. Import data:

```bash
console data:import:glossary
```

{% info_block warningBox "Verification" %}

Ensure that in the database, the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}

### 5) Set up behavior

Set up the following behaviors.

#### Set up Order Item Display Name

| PLUGIN                                            | SPECIFICATION                                  | PREREQUISITES | NAMESPACE                                    |
|---------------------------------------------------|------------------------------------------------|---------------|----------------------------------------------|
| CurrencyIsoCodeOrderItemExpanderPlugin            | Expands order items with currency codes (ISO). |               | Spryker\Zed\Sales\Communication\Plugin\Sales |
| StateHistoryOrderItemExpanderPlugin               | Expands order items with history states.       |               | Spryker\Zed\Oms\Communication\Plugin\Sales   |
| ItemStateOrderItemExpanderPlugin                  | Expands order items with its item states.      |               | Spryker\Zed\Oms\Communication\Plugin\Sales   |
| OrderAggregatedItemStateSearchOrderExpanderPlugin | Expands orders with aggregated item states.    |               | Spryker\Zed\Oms\Communication\Plugin\Sales   |


<details><summary markdown='span'>src/Pyz/Zed/Sales/SalesDependencyProvider.php</summary>

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
     * @return list<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemExpanderPluginInterface>
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
     * @return list<\Spryker\Zed\SalesExtension\Dependency\Plugin\SearchOrderExpanderPluginInterface>
     */
    protected function getSearchOrderExpanderPlugins(): array
    {
        return [
            new OrderAggregatedItemStateSearchOrderExpanderPlugin()
        ];
    }
}
```
</details>

{% info_block warningBox "Verification" %}

- Make sure that every order item from the `SalesFacade::getOrderItems()` result contains the following:
  - Currency ISO code
  - State history code
  - Item state data
- Make sure that every order from the `SalesFacade::getCustomerOrders()` result contains aggregated item state data.

{% endinfo_block %}

### Set up order cancellation behavior

| PLUGIN                                 | SPECIFICATION                                       | PREREQUISITES | NAMESPACE                                    |
|----------------------------------------|-----------------------------------------------------|---------------|----------------------------------------------|
| IsCancellableOrderExpanderPlugin       | Checks if each order item has the cancellable flag. |               | Spryker\Zed\Sales\Communication\Plugin\Sales |
| IsCancellableSearchOrderExpanderPlugin | Checks if each order item has the cancellable flag. |               | Spryker\Zed\Oms\Communication\Plugin\Sales   |


<details><summary markdown='span'>src/Pyz/Zed/Sales/SalesDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;
use Spryker\Zed\Oms\Communication\Plugin\Sales\IsCancellableOrderExpanderPlugin;
use Spryker\Zed\Oms\Communication\Plugin\Sales\IsCancellableSearchOrderExpanderPlugin;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\SalesExtension\Dependency\Plugin\SearchOrderExpanderPluginInterface>
     */
    protected function getSearchOrderExpanderPlugins(): array
    {
        return [
            new IsCancellableSearchOrderExpanderPlugin(),
        ];
    }

    /**
     * @return list<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderExpanderPluginInterface>
     */
    protected function getOrderHydrationPlugins(): array
    {
        return [
            new IsCancellableOrderExpanderPlugin(),
        ];
    }
}
```
</details>

{% info_block warningBox "Verification" %}

Ensure that, on the following pages, each order contains the `isCancellable` flag:

- The Storefront:
  - *Order History*
  - *Overview*
- The Back Office:
  - *Overview of Orders*

{% endinfo_block %}

### Set up order invoice generation behavior

Set up the following order invoice generation behaviors.

#### Set up order invoice mail type

Set up the following plugin:

| PLUGIN                     | SPECIFICATION                                           | PREREQUISITES | NAMESPACE                                          |
|----------------------------|---------------------------------------------------------|---------------|----------------------------------------------------|
| OrderInvoiceMailTypePlugin | Email type that prepares an invoice email for an order. |               | Spryker\Zed\SalesInvoice\Communication\Plugin\Mail |


<details><summary markdown='span'>src/Pyz/Zed/Mail/MailDependencyProvider.php</summary>

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
</details>


#### Set up an order invoice OMS command

Set up the following plugin:

| PLUGIN                            | SPECIFICATION                                                              | PREREQUISITES | NAMESPACE                                         |
|-----------------------------------|----------------------------------------------------------------------------|---------------|---------------------------------------------------|
| GenerateOrderInvoiceCommandPlugin | A command in the OMS state machine that generates an invoice for an order. |               | Spryker\Zed\SalesInvoice\Communication\Plugin\Oms |


<details><summary markdown='span'>src/Pyz/Zed/Oms/OmsDependencyProvider.php</summary>

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
</details>

#### Set up an order invoice OMS command

1. Set up the following plugin:

| PLUGIN                  | SPECIFICATION                                                       | PREREQUISITES | NAMESPACE                                      |
|-------------------------|---------------------------------------------------------------------|---------------|------------------------------------------------|
| OrderInvoiceSendConsole | A console command that sends not-yet-sent order invoices via email. |               | Spryker\Zed\SalesInvoice\Communication\Console |

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
     * @return list<\Symfony\Component\Console\Command\Command>
     */
    protected function getConsoleCommands(Container $container): array
    {
        return [
            new OrderInvoiceSendConsole(),
        ];
    }
}
```

2. Adjust the scheduler project configuration:

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

3. Apply the scheduler configuration update:

```bash
vendor/bin/console scheduler:suspend
vendor/bin/console scheduler:setup
vendor/bin/console scheduler:resume
```

{% info_block warningBox "Verification" %}

Make sure that you've set up the invoice-related configuration:
1. Move at least one item in an order to the `invoice generated` state.
2. Make sure that, according to your `DummyInvoice01.xml` and `SalesInvoiceConfig::getOrderInvoiceTemplatePath()` configuration, the correct order invoice template has been assigned to the order (`spy_sales_order_invoice`).

Then, place an order with an invoice and make sure that you receive an invoice within the time configured in the scheduler.

{% endinfo_block %}

### Set up a custom order reference workflow

Enable the following behaviors by registering the plugins:

| PLUGIN                                                        | SPECIFICATION                                                                             | PREREQUISITES | NAMESPACE                                                   |
|---------------------------------------------------------------|-------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------|
| OrderCustomReferenceOrderPostSavePlugin                       | After an order is saved, persists `orderCustomReference` in the `spy_sales_order` schema. |               | Spryker\Zed\OrderCustomReference\Communication\Plugin\Sales |
| OrderCustomReferenceQuoteFieldsAllowedForSavingProviderPlugin | Returns the `QuoteTransfer` fields related to a custom order reference.                   |               | Spryker\Zed\OrderCustomReference\Communication\Plugin\Quote |

**src/Pyz/Zed/Sales/SalesDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\OrderCustomReference\Communication\Plugin\Sales\OrderCustomReferenceOrderPostSavePlugin;
use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderPostSavePluginInterface>
     */
    protected function getOrderPostSavePlugins()
    {
        return [
            new OrderCustomReferenceOrderPostSavePlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Quote/QuoteDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Quote;

use Spryker\Zed\OrderCustomReference\Communication\Plugin\Quote\OrderCustomReferenceQuoteFieldsAllowedForSavingProviderPlugin;
use Spryker\Zed\Quote\QuoteDependencyProvider as SprykerQuoteDependencyProvider;

class QuoteDependencyProvider extends SprykerQuoteDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\QuoteExtension\Dependency\Plugin\QuoteFieldsAllowedForSavingProviderPluginInterface>
     */
    protected function getQuoteFieldsAllowedForSavingProviderPlugins(): array
    {
        return [
            new OrderCustomReferenceQuoteFieldsAllowedForSavingProviderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Log in and make sure that, at `zed.mysprykershop.com/sales/detail`, you can see the *Custom Order Reference* section with the **Edit Reference** button in the order details.

{% endinfo_block %}

### Set up order-saving plugins

Set up the following plugins:

| PLUGIN                        | SPECIFICATION                                    | PREREQUISITES | NAMESPACE                                          |
|-------------------------------|--------------------------------------------------|---------------|----------------------------------------------------|
| OrderSaverPlugin              | Saves an order.                                  |               | Spryker\Zed\Sales\Communication\Plugin\Checkout    |
| OrderTotalsSaverPlugin        | Saves order totals.                              |               | Spryker\Zed\Sales\Communication\Plugin\Checkout    |
| SalesOrderShipmentSaverPlugin | Saves an order shipment. Adds shipment expenses. |               | Spryker\Zed\Shipment\Communication\Plugin\Checkout |
| OrderItemsSaverPlugin         | Saves order items.                               |               | Spryker\Zed\Sales\Communication\Plugin\Checkout    |


**src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Checkout;

use Spryker\Zed\Sales\Communication\Plugin\Checkout\OrderItemsSaverPlugin;
use Spryker\Zed\Sales\Communication\Plugin\Checkout\OrderSaverPlugin;
use Spryker\Zed\Sales\Communication\Plugin\Checkout\OrderTotalsSaverPlugin;
use Spryker\Zed\Shipment\Communication\Plugin\Checkout\SalesOrderShipmentSavePlugin;
use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Spryker\Zed\Checkout\Dependency\Plugin\CheckoutSaveOrderInterface>
     */
    protected function getCheckoutOrderSavers(Container $container)
    {
        return [
            new OrderSaverPlugin(),
            new OrderTotalsSaverPlugin(),
            new SalesOrderShipmentSavePlugin(),
            new OrderItemsSaverPlugin(),
        ];
    }
}
```

### Set up warehouse picking relationship plugins

Enable the following behaviors by registering the plugins:

| PLUGIN                                                         | SPECIFICATION                                                                      | PREREQUISITES | NAMESPACE                                                                                         |
|----------------------------------------------------------------|------------------------------------------------------------------------------------|---------------|---------------------------------------------------------------------------------------------------|
| SalesOrdersByPickingListItemsBackendResourceRelationshipPlugin | Adds `sales-orders` resources as a relationship to `picking-list-items` resources. |               | Spryker\Glue\SalesOrdersBackendApi\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector |


**src/Pyz/Glue/GlueBackendApiApplicationGlueJsonApiConventionConnector/GlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplicationGlueJsonApiConventionConnector;

use Spryker\Glue\GlueBackendApiApplicationGlueJsonApiConventionConnector\GlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider as SprykerGlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider;
use Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\PickingListsBackendApi\PickingListsBackendApiConfig;
use Spryker\Glue\SalesOrdersBackendApi\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector\SalesOrdersByPickingListItemsBackendResourceRelationshipPlugin;

class GlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider extends SprykerGlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider
{
    /**
     * @param \Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
     *
     * @return \Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
     */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection,
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            PickingListsBackendApiConfig::RESOURCE_PICKING_LIST_ITEMS,
            new SalesOrdersByPickingListItemsBackendResourceRelationshipPlugin(),
        );

        return $resourceRelationshipCollection;
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that, on the following Storefront pages, even if the `display` property is not set in the process definition, the item states are displayed correctly:

- *Customer overview*
- *Order history*
- *Order details*
- *Returns*
- *Return details*

2. Make sure you have the `sales-orders` resource as a relationship to `picking-list-items` when you do a request.

`GET https://glue-backend.mysprykershop.com/picking-lists/{% raw %}{{{% endraw %}picking-list-uuid{% raw %}}{{% endraw %}?include=picking-list-items,sales-orders`
<details>
  <summary markdown='span'>Response body example</summary>
```json
{
    "data": {
        "id": "14baa0f3-e6e7-5aa8-bc6c-c02ec39ca77b",
        "type": "picking-lists",
        "attributes": {
            "status": "picking-finished",
            "createdAt": "2023-03-23 15:47:07.000000",
            "updatedAt": "2023-03-30 12:47:45.000000"
        },
        "relationships": {
            "picking-list-items": {
                "data": [
                    {
                        "id": "65bb3aec-0a45-5ec6-9b12-bbca6551d87f",
                        "type": "picking-list-items"
                    }
                ]
            }
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/picking-lists/14baa0f3-e6e7-5aa8-bc6c-c02ec39ca77b?include=picking-list-items,sales-orders"
        }
    },
    "included": [
        {
            "id": "DE--1",
            "type": "sales-orders",
            "attributes": {
                "cartNote": null,
                "orderReference": "DE--1"
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/sales-orders/DE--1?include=picking-list-items,sales-orders"
            }
        },
        {
            "id": "65bb3aec-0a45-5ec6-9b12-bbca6551d87f",
            "type": "picking-list-items",
            "attributes": {
                "quantity": 1,
                "numberOfPicked": 1,
                "numberOfNotPicked": 0,
                "orderItem": {
                    "uuid": "31e21001-e544-5533-9754-51331c8c9ac5",
                    "sku": "141_29380410",
                    "quantity": 1,
                    "name": "Asus Zenbook US303UB",
                    "amountSalesUnit": null
                }
            },
            "relationships": {
                "sales-orders": {
                    "data": [
                        {
                            "id": "DE--1",
                            "type": "sales-orders"
                        }
                    ]
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/picking-list-items/65bb3aec-0a45-5ec6-9b12-bbca6551d87f?include=picking-list-items,sales-orders"
            }
        }
    ]
}
```
</details>

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the Order Management feature frontend.

### Prerequisites

To start the feature integration, overview and install the necessary features.

| NAME                        | VERSION          |
|-----------------------------|------------------|
| Spryker Core                | {{page.version}} |
| Cart                        | {{page.version}} |
| Checkout                    | {{page.version}} |
| Customer Account Management | {{page.version}} |

### 1) Install the required modules

```bash
composer require spryker-feature/order-management: "{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                     | EXPECTED DIRECTORY                                |
|----------------------------|---------------------------------------------------|
| OrderCustomReferenceWidget | vendor/spryker-shop/order-custom-reference-widget |

{% endinfo_block %}

### 2) Add translations

1. Append the glossary according to your configuration:

```
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

Ensure that in the database, the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}

### 3) Enable controllers

Register the following route provider on the Storefront:

| PROVIDER                             | NAMESPACE                                        |
|--------------------------------------|--------------------------------------------------|
| OrderCancelWidgetRouteProviderPlugin | SprykerShop\Yves\OrderCancelWidget\Plugin\Router |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerShop\Yves\OrderCancelWidget\Plugin\Router\OrderCancelWidgetRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return list<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
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

### 4) Set up behavior

Set up the following behaviors.

#### Set up an order cancellation behavior

Set up the following plugin:

| PLUGIN                  | SPECIFICATION                                | PREREQUISITES | NAMESPACE                                 |
|-------------------------|----------------------------------------------|---------------|-------------------------------------------|
| OrderCancelButtonWidget | Displays the **Cancel** button on the Storefront. |               | SprykerShop\Yves\OrderCancelWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\OrderCancelWidget\Widget\OrderCancelButtonWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return list<string>
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

Ensure the following:

- The `OrderCancelButtonWidget` widget has been registered.
- On the *Order Details* page on the Storefront, the **Cancel** button is displayed.
- In the *item state* table column on the *Customer Overview* and *Order History* pages on the Storefront, you can see the aggregated order item states.
- On the *Return Page* on the Storefront, aggregated return item states are displayed.
- On the *Order Detail* and *Return Detail* pages on the Storefront, item states are displayed.

{% endinfo_block %}

### 5) Enable a route provider plugin

Register the route provider in the Yves application:

| PROVIDER                                      | NAMESPACE                                                 |
|-----------------------------------------------|-----------------------------------------------------------|
| OrderCustomReferenceWidgetRouteProviderPlugin | SprykerShop\Yves\OrderCustomReferenceWidget\Plugin\Router |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Yves\Router\RouterDependencyProvider as SprykerRouterDependencyProvider;
use SprykerShop\Yves\OrderCustomReferenceWidget\Plugin\Router\OrderCustomReferenceWidgetRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return list<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        return [
            new OrderCustomReferenceWidgetRouteProviderPlugin(),
        ];
    }
}
```

### 5) Set up widgets

1. Register the following plugin to enable widgets:

| PLUGIN                     | DESCRIPTION                                                 | PREREQUISITES | NAMESPACE                                          |
|----------------------------|-------------------------------------------------------------|---------------|----------------------------------------------------|
| OrderCustomReferenceWidget | Edits and shows a custom order reference on the Storefront. |               | SprykerShop\Yves\OrderCustomReferenceWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\OrderCustomReferenceWidget\Widget\OrderCustomReferenceWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return list<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            OrderCustomReferenceWidget::class,
        ];
    }
}
```

2. Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

To make sure that you've registered the widget, log in as a customer on the Storefront and check that the **Custom order reference** form is present on the order view page.

{% endinfo_block %}

## Install related features

Integrate the following related features:

| FEATURE                                                            | REQUIRED FOR THE CURRENT FEATURE | INSTALLATION GUIDE                                                                                                                                                                                                                |
|--------------------------------------------------------------------|----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Install the Comments + Order Management feature                    |                                  | [Install the Comments + Order Management feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-comments-order-management-feature.html)                            |
| Install the Order Management Glue API                     |                                  | [Install the Order Management Glue API](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-order-management-feature-integration.html)                                                         |
| Install the Company Account + Order Management feature             |                                  | [Install the Company Account + Order Management feature](/docs/scos/dev/feature-integration-guides/{{page.version}}/company-account-order-management-feature-integration.html)                                                   |
| Install the Product + Order Management feature                     |                                  | [Install the Product + Order Management feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-order-management-feature.html)                 |
| Install the Customer Account Management + Order Management feature |                                  | [Install the Customer Account Management + Order Management feature](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-order-management-feature.html)                           |
| Packaging Units feature integration                                |                                  | [Packaging Units feature integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-packaging-units-feature.html)                                     |
| Install the Product + Order Management feature                     |                                  | [Install the Product + Order Management feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-order-management-feature.html)                 |
| Install the Product Options + Order Management feature             |                                  | [Install the Product Options + Order Management feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-options-order-management-feature.html) |
