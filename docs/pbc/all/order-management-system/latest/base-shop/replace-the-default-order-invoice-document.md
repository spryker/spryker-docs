---
title: Replace the default order invoice document
description: Learn how to replace or extend the default HTML invoice document with your own generator plugin, for example a PDF or an XRechnung XML from your ERP or e-invoicing provider.
last_updated: Oct 06, 2026
template: howto-guide-template
related:
  - title: Order invoice documents feature overview
    link: docs/pbc/all/order-management-system/latest/base-shop/order-management-feature-overview/order-invoice-documents-overview.html
  - title: Install the Order Invoice Documents feature
    link: docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-order-invoice-documents-feature.html
---

{% info_block infoBox "Liability" %}

Spryker does not generate, validate, or assume legal responsibility for invoices or credit notes. The seller remains the invoice issuer and is responsible for the document's tax and legal compliance, including its format under applicable national e-invoicing mandates.

Spryker's role is limited to forwarding the document links from the seller, making it available to the correct buyer/seller.

Spryker does not transmit documents to national e-invoicing or clearance networks such as Peppol, KSeF, or SdI. Transmission remains the responsibility of the seller or their e-invoicing provider.

The legacy [Order confirmation / invoice notification email feature](/docs/pbc/all/order-management-system/latest/base-shop/order-management-feature-overview/invoice-generation-overview.html) is non compliant with the latest EU e-invoicing requirements.

{% endinfo_block %}

The [Order invoice documents](/docs/pbc/all/order-management-system/latest/base-shop/order-management-feature-overview/order-invoice-documents-overview.html) feature stores the files that *order invoice file generator plugins* return for an invoice. The default plugin produces a demo HTML document. This document describes how to replace it with a document generated on your side, for example a PDF and an XRechnung XML produced by your ERP or e-invoicing provider, or how to change only the look of the default document.

## Prerequisites

Install the feature. For details, see [Install the Order Invoice Documents feature](/docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-order-invoice-documents-feature.html).

## Change only the template

The default document is rendered from the invoice template configured in `SalesInvoiceConfig::getOrderInvoiceTemplatePath()`. Changing the template changes both the invoice email and the default document. To change only the **Save as PDF** toolbar, override the `orderInvoiceDocumentToolbar` block in your invoice template or point `SalesInvoiceConfig::getOrderInvoiceDocumentTemplatePath()` to your own wrapper template.

## Provide your own document

1. Implement `OrderInvoiceFileGeneratorPluginInterface` from the `SalesInvoiceExtension` module. The plugin receives the persisted invoice and the fully loaded order and returns one `OrderInvoiceFileTransfer` per file. Every file needs `format`, `fileName`, `extension`, `mimeType`, and `content`:

**src/Pyz/Zed/SalesInvoice/Communication/Plugin/SalesInvoice/ErpOrderInvoiceFileGeneratorPlugin.php**

```php
<?php

namespace Pyz\Zed\SalesInvoice\Communication\Plugin\SalesInvoice;

use Generated\Shared\Transfer\OrderInvoiceFileTransfer;
use Generated\Shared\Transfer\OrderInvoiceTransfer;
use Generated\Shared\Transfer\OrderTransfer;
use Spryker\Zed\Kernel\Communication\AbstractPlugin;
use Spryker\Zed\SalesInvoiceExtension\Dependency\Plugin\OrderInvoiceFileGeneratorPluginInterface;

class ErpOrderInvoiceFileGeneratorPlugin extends AbstractPlugin implements OrderInvoiceFileGeneratorPluginInterface
{
    /**
     * @return array<\Generated\Shared\Transfer\OrderInvoiceFileTransfer>
     */
    public function generate(OrderInvoiceTransfer $orderInvoiceTransfer, OrderTransfer $orderTransfer): array
    {
        $erpInvoice = $this->getFactory()->createErpInvoiceClient()->fetchInvoice($orderTransfer->getOrderReferenceOrFail());

        return [
            (new OrderInvoiceFileTransfer())
                ->setFormat('pdf')
                ->setExtension('pdf')
                ->setMimeType('application/pdf')
                ->setFileName($orderInvoiceTransfer->getReferenceOrFail() . '.pdf')
                ->setContent($erpInvoice->getPdfContent()),
            (new OrderInvoiceFileTransfer())
                ->setFormat('xrechnung')
                ->setExtension('xml')
                ->setMimeType('application/xml')
                ->setFileName($orderInvoiceTransfer->getReferenceOrFail() . '.xml')
                ->setContent($erpInvoice->getXRechnungContent()),
        ];
    }
}
```

2. Register the plugin instead of, or next to, the default one:

**src/Pyz/Zed/SalesInvoice/SalesInvoiceDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\SalesInvoice;

use Pyz\Zed\SalesInvoice\Communication\Plugin\SalesInvoice\ErpOrderInvoiceFileGeneratorPlugin;
use Spryker\Zed\SalesInvoice\SalesInvoiceDependencyProvider as SprykerSalesInvoiceDependencyProvider;

class SalesInvoiceDependencyProvider extends SprykerSalesInvoiceDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SalesInvoiceExtension\Dependency\Plugin\OrderInvoiceFileGeneratorPluginInterface>
     */
    protected function getOrderInvoiceFileGeneratorPlugins(): array
    {
        return [
            new ErpOrderInvoiceFileGeneratorPlugin(),
        ];
    }
}
```

3. Optionally, add a label for every new format. The link text in the Storefront section and in the Back Office block is the glossary entry `sales_invoice.format.<format>`; without it, the raw format is shown:

```yaml
sales_invoice.format.xrechnung,XRechnung (XML),en_US
sales_invoice.format.xrechnung,XRechnung (XML),de_DE
```

The module validates the returned files and stores them. Keep the following rules in mind:

- The `extension` consists of lowercase letters and digits only, up to 16 characters.
- The `fileName` must not contain path separators or the `%` character.
- Every `format` can be returned only once per invoice; use the format to tell the files apart.
- The plugin must not persist anything. The module writes the files to the configured file system and builds their storage paths.
- A failing plugin or file system makes the `invoice-generate` event fail. The invoice keeps its number, OMS logs the error, and re-triggering the event generates the missing files.

Files with the MIME type `text/html` open inline in a new tab; all other files are downloaded.

## Disable the file generation

To keep the invoice email but generate no documents, either leave `SalesInvoiceConfig::isOrderInvoiceFileGenerationEnabled()` at `false` or register no generator plugin. In both cases, the Storefront section and the Back Office block show their empty state.

## Next steps

- [View order invoice documents](/docs/pbc/all/order-management-system/latest/base-shop/manage-in-the-back-office/orders/view-order-invoice-documents.html)
