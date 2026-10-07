---
title: Order invoice documents feature overview
description: Learn how buyers on the Storefront and Back Office users open the invoice of an order as a page they can save as PDF, and what the feature does not do.
last_updated: Oct 06, 2026
template: concept-topic-template
related:
  - title: Install the Order Invoice Documents feature
    link: docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-order-invoice-documents-feature.html
  - title: View order invoice documents
    link: docs/pbc/all/order-management-system/latest/base-shop/manage-in-the-back-office/orders/view-order-invoice-documents.html
  - title: Customize the order invoice document
    link: docs/pbc/all/order-management-system/latest/base-shop/customize-the-order-invoice-document.html
---

{% info_block infoBox "Liability" %}

Spryker does not generate, validate, or assume legal responsibility for invoices or credit notes. The seller remains the invoice issuer and is responsible for the document's tax and legal compliance, including its format under applicable national e-invoicing mandates.

Spryker's role is limited to forwarding the document links from the seller, making it available to the correct buyer/seller.

Spryker does not transmit documents to national e-invoicing or clearance networks such as Peppol, KSeF, or SdI. Transmission remains the responsibility of the seller or their e-invoicing provider.

The [Order confirmation / invoice notification email feature](/docs/pbc/all/order-management-system/latest/base-shop/order-management-feature-overview/invoice-generation-overview.html) is non compliant with the latest EU e-invoicing requirements.

{% endinfo_block %}

The *Order invoice documents* feature makes the invoice of an order visible in two places:

- On the Storefront, in a **Documents** section of the order details page in the customer's order history.
- In the Back Office, in a **Documents** block of the order page.

Both places list the invoices of the order with one link per document. Which documents an invoice has is decided by *document provider plugins*. The default plugin provides a **PDF** document: the invoice rendered on request from the project's invoice template, the same HTML the [invoice notification email](/docs/pbc/all/order-management-system/latest/base-shop/order-management-feature-overview/invoice-generation-overview.html) contains. It opens in a new browser tab with a **Save as PDF** button that opens the browser's print dialog, where the PDF printer produces the file. A project replaces the plugin to generate its own formats on the fly, for example a PDF or an XRechnung XML, or to link the documents of an external system. Nothing is generated or stored in advance: the feature extends the `SalesInvoice` module with a plugin interface, a Storefront client, a widget, two controllers, and a Back Office block, and reuses the module's existing invoice reading and rendering.

## How it works

1. A Back Office user triggers the `invoice-generate` event on a confirmed order. `SalesInvoice` creates the invoice record with its reference, for example `Invoice-12`, and sends the invoice email as before. This step is unchanged.
2. The Storefront widget and the Back Office block ask the `SalesInvoice` facade for the invoices of the order with their documents. The facade asks every `OrderInvoiceDocumentProviderPluginInterface` plugin for the documents of each invoice: a format, a file name, a MIME type, and optionally the URL of an external system. The Storefront reaches the facade through the new `SalesInvoice` client and its Zed gateway, sending the current customer along, so Zed checks with the Sales module whether the customer may see the order.
3. A document link opens the document action with the format of the document. A document with a URL redirects to it. An HTML document, such as the one of the default plugin, opens as a page in the application's blank layout, without navigation, with the invoice reference, the date, the **Save as PDF** button and the document in a frame; the button prints the frame, so the PDF contains only the invoice. Any other document is downloaded: the plugin that listed it provides its content at that moment, with the rendered invoice HTML at hand.

## Storefront

Below the order totals, the **Documents** section lists every invoice of the order: the reference, the issue date, the merchant names of the order, and one link per document, labelled by its format, for example **PDF**. Orders without an invoice show *No documents*.

A document can be opened only by the order owner. In B2B shops, company users who may see the orders of their company or business unit can open their documents as well; the check is the one of the Sales module, `SalesFacade::getCustomerOrder()`. Every other request, including a request for an unknown invoice or format, answers with a 404 page, so the URL does not reveal whether an order or an invoice exists. Anonymous visitors are redirected to the login page by the customer firewall.

## Back Office

The order page shows a **Documents** block with the columns **Reference No.**, **Date**, **Merchant**, and **Documents**, with one link per document. The **PDF** link of the default document opens the invoice page in a new tab. Access follows the existing Back Office permissions of the `SalesInvoice` module; no new ACL rules are added. Orders without an invoice show *No documents for this order*. For details, see [View order invoice documents](/docs/pbc/all/order-management-system/latest/base-shop/manage-in-the-back-office/orders/view-order-invoice-documents.html).

## The documents

The default document is the invoice template configured in `SalesInvoiceConfig::getOrderInvoiceTemplatePath()`. Changing the template changes both the email and the page. To provide your own documents, implement the document provider plugin; see [Customize the order invoice document](/docs/pbc/all/order-management-system/latest/base-shop/customize-the-order-invoice-document.html). The document inherits the constraints of the [invoice template](/docs/pbc/all/order-management-system/latest/base-shop/order-management-feature-overview/invoice-generation-overview.html#invoice-template): product options and mixed tax rates are not fully represented, and it is not a structured e-invoice (EN 16931, XRechnung, ZUGFeRD). The PDF is produced by the browser, so page breaks and margins depend on it.

To change the page around the document (button, frame), override the Storefront view `@SalesInvoice/views/order-invoice/order-invoice.twig` or the Back Office template `@SalesInvoice/Document/index.twig` in your project.

## Current constraints

- One invoice per order: the invoice is generated once by the invoice notification email flow.
- Credit notes and delivery notes are not supported. Compliant e-invoice formats and documents of an external system are not provided by Spryker; a project provides them through the document provider plugin.
- In marketplace shops, the document covers the whole order; there is no document per merchant.
- The invoices are not exposed through the Storefront API or the Back Office API.
- The invoice email does not contain the document as an attachment.
