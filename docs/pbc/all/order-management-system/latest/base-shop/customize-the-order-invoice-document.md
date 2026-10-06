---
title: Customize the order invoice document
description: Learn how to change the content and the look of the order invoice document with your own template, add data to it with an expander plugin, and set the reference or the template per invoice with a before-save plugin.
last_updated: Oct 06, 2026
template: howto-guide-template
related:
  - title: Order invoice documents feature overview
    link: docs/pbc/all/order-management-system/latest/base-shop/order-management-feature-overview/order-invoice-documents-overview.html
  - title: Install the Order Invoice Documents feature
    link: docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-order-invoice-documents-feature.html
  - title: View order invoice documents
    link: docs/pbc/all/order-management-system/latest/base-shop/manage-in-the-back-office/orders/view-order-invoice-documents.html
---

{% info_block infoBox "Liability" %}

Spryker does not generate, validate, or assume legal responsibility for invoices or credit notes. The seller remains the invoice issuer and is responsible for the document's tax and legal compliance, including its format under applicable national e-invoicing mandates.

Spryker's role is limited to forwarding the document links from the seller, making it available to the correct buyer/seller.

Spryker does not transmit documents to national e-invoicing or clearance networks such as Peppol, KSeF, or SdI. Transmission remains the responsibility of the seller or their e-invoicing provider.

The [Order confirmation / invoice notification email feature](/docs/pbc/all/order-management-system/latest/base-shop/order-management-feature-overview/invoice-generation-overview.html) is non compliant with the latest EU e-invoicing requirements.

{% endinfo_block %}

The [Order invoice documents](/docs/pbc/all/order-management-system/latest/base-shop/order-management-feature-overview/order-invoice-documents-overview.html) feature shows the invoice that the `SalesInvoice` module renders from a Twig template. The same rendered document goes into the invoice email and onto the invoice page. This document describes the three places where a project changes what the document contains and how it looks:

- The invoice template: content, layout, and styles of the document.
- An expander plugin: data that the template can use but the invoice does not store.
- A before-save plugin: the reference and the template path of every new invoice.

The feature renders HTML only. A PDF is produced by the browser's print dialog from the invoice page; there is no plugin for other file formats.

## Prerequisites

Install the feature. For details, see [Install the Order Invoice Documents feature](/docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-order-invoice-documents-feature.html).

## Change the invoice template

`SalesInvoiceConfig::getOrderInvoiceTemplatePath()` returns the Twig template of the document. On a project, it points to a project template:

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
        return '@SalesInvoice/Invoice/invoice.twig';
    }
}
```

The template lives in `src/Pyz/Zed/SalesInvoice/Presentation/Invoice/invoice.twig`. It receives two variables:

| Variable | Transfer | Contains |
|---|---|---|
| `invoice` | `OrderInvoiceTransfer` | `reference`, `issueDate`, `templatePath`, and the properties your expander plugins add. |
| `order` | `OrderTransfer` | The fully loaded order: `items`, `expenses`, `totals`, `billingAddress`, `currencyIsoCode`, `locale`, `merchants`. |

Edit the template to change the content, the layout, or the styles. Keep the following in mind:

- The template is a complete HTML document. Keep the styles inline or in a `<style>` block: the document is shown inside a frame and sent as an email body, so external stylesheets are not loaded.
- Translate text with the `trans` filter. The keys are glossary keys and are translated into the locale of the order.
- Every invoice stores the path of the template it was generated with. Changing the path in the config affects new invoices only; invoices generated earlier keep rendering with the template they were created with, so do not delete a template that generated invoices still reference.

## Add data to the document

The invoice stores only its reference, issue date, and template path. To show data that comes from somewhere else, for example a VAT ID or a payment deadline, add the property to the `OrderInvoice` transfer and fill it with an expander plugin. The plugin runs every time invoices are loaded, before the document is rendered, so the template and the **Documents** lists see the added data.

1. Add the property:

**src/Pyz/Shared/SalesInvoice/Transfer/sales_invoice.transfer.xml**

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">

    <transfer name="OrderInvoice">
        <property name="paymentDeadline" type="string"/>
    </transfer>

</transfers>
```

2. Implement `OrderInvoicesExpanderPluginInterface` from the `SalesInvoiceExtension` module. The plugin receives all loaded invoices at once and returns them:

**src/Pyz/Zed/SalesInvoice/Communication/Plugin/SalesInvoice/PaymentDeadlineOrderInvoicesExpanderPlugin.php**

```php
<?php

namespace Pyz\Zed\SalesInvoice\Communication\Plugin\SalesInvoice;

use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\SalesInvoiceExtension\Dependency\Plugin\OrderInvoicesExpanderPluginInterface;

class PaymentDeadlineOrderInvoicesExpanderPlugin extends AbstractPlugin implements OrderInvoicesExpanderPluginInterface
{
    protected const int PAYMENT_TERM_DAYS = 14;

    /**
     * @param array<\Generated\Shared\Transfer\OrderInvoiceTransfer> $orderInvoiceTransfers
     *
     * @return array<\Generated\Shared\Transfer\OrderInvoiceTransfer>
     */
    public function expand(array $orderInvoiceTransfers): array
    {
        foreach ($orderInvoiceTransfers as $orderInvoiceTransfer) {
            $paymentDeadline = (new \DateTime($orderInvoiceTransfer->getIssueDateOrFail()))
                ->modify(sprintf('+%d days', static::PAYMENT_TERM_DAYS))
                ->format('Y-m-d');

            $orderInvoiceTransfer->setPaymentDeadline($paymentDeadline);
        }

        return $orderInvoiceTransfers;
    }
}
```

3. Register the plugin:

**src/Pyz/Zed/SalesInvoice/SalesInvoiceDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\SalesInvoice;

use Pyz\Zed\SalesInvoice\Communication\Plugin\SalesInvoice\PaymentDeadlineOrderInvoicesExpanderPlugin;
use Spryker\Zed\SalesInvoice\SalesInvoiceDependencyProvider as SprykerSalesInvoiceDependencyProvider;

class SalesInvoiceDependencyProvider extends SprykerSalesInvoiceDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SalesInvoiceExtension\Dependency\Plugin\OrderInvoicesExpanderPluginInterface>
     */
    protected function getOrderInvoicesExpanderPlugins(): array
    {
        return [
            new PaymentDeadlineOrderInvoicesExpanderPlugin(),
        ];
    }
}
```

4. Use the property in the template:

```twig
<p>{{ 'order_invoice.invoice_template.payment_deadline' | trans }}: {{ invoice.paymentDeadline | formatDate }}</p>
```

Then regenerate the transfers:

```bash
console transfer:generate
```

## Set the reference or the template per invoice

`OrderInvoiceBeforeSavePluginInterface` from the `SalesInvoiceExtension` module runs during the `invoice-generate` OMS event, after the module has set the reference, the issue date, and the template path, and before the invoice is saved. The plugin receives the invoice and the order and returns the invoice. Use it to apply your own numbering scheme or to pick a template per store, locale, or customer type:

**src/Pyz/Zed/SalesInvoice/Communication/Plugin/SalesInvoice/StoreTemplateOrderInvoiceBeforeSavePlugin.php**

```php
<?php

namespace Pyz\Zed\SalesInvoice\Communication\Plugin\SalesInvoice;

use Generated\Shared\Transfer\OrderInvoiceTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\SalesInvoiceExtension\Dependency\Plugin\OrderInvoiceBeforeSavePluginInterface;

class StoreTemplateOrderInvoiceBeforeSavePlugin extends AbstractPlugin implements OrderInvoiceBeforeSavePluginInterface
{
    protected const string TEMPLATE_PATH_AT = '@SalesInvoice/Invoice/invoice-at.twig';

    public function execute(OrderInvoiceTransfer $orderInvoiceTransfer, OrderTransfer $orderTransfer): OrderInvoiceTransfer
    {
        if ($orderTransfer->getStore() === 'AT') {
            $orderInvoiceTransfer->setTemplatePath(static::TEMPLATE_PATH_AT);
        }

        return $orderInvoiceTransfer;
    }
}
```

Register it in the same dependency provider:

```php
    /**
     * @return array<\Spryker\Zed\SalesInvoiceExtension\Dependency\Plugin\OrderInvoiceBeforeSavePluginInterface>
     */
    protected function getOrderInvoiceBeforeSavePlugins(): array
    {
        return [
            new StoreTemplateOrderInvoiceBeforeSavePlugin(),
        ];
    }
```

The reference set by the plugin must stay unique: the module generates it from the `SalesInvoiceConfig::getOrderInvoiceReferenceSequence()` sequence, and a plugin that replaces it is responsible for its uniqueness.

## Verify the changes

1. Place an order and trigger the `invoice-generate` event in the Back Office.
2. Open the order in the Back Office and click **PDF** in the **Documents** block: the document shows your template and your data.
3. Open the same order in the Storefront under **My Account** > **Order History** and click **PDF** in the **Documents** section.
4. Check the invoice email: it contains the same document.
