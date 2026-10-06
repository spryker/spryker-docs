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
---

{% info_block infoBox "Liability" %}

Spryker does not generate, validate, or assume legal responsibility for invoices or credit notes. The seller remains the invoice issuer and is responsible for the document's tax and legal compliance, including its format under applicable national e-invoicing mandates.

Spryker's role is limited to forwarding the document links from the seller, making it available to the correct buyer/seller.

Spryker does not transmit documents to national e-invoicing or clearance networks such as Peppol, KSeF, or SdI. Transmission remains the responsibility of the seller or their e-invoicing provider.

The legacy [Order confirmation / invoice notification email feature](/docs/pbc/all/order-management-system/latest/base-shop/order-management-feature-overview/invoice-generation-overview.html) is non compliant with the latest EU e-invoicing requirements.

{% endinfo_block %}

The *Order invoice documents* feature makes the invoice of an order visible in two places:

- On the Storefront, in a **Documents** section of the order details page in the customer's order history.
- In the Back Office, in a **Documents** block of the order page.

Both places list the invoices of the order with a **PDF** link. The link opens the invoice in a new browser tab, rendered on request from the project's invoice template, the same HTML the [legacy invoice notification email](/docs/pbc/all/order-management-system/latest/base-shop/order-management-feature-overview/invoice-generation-overview.html) contains. A **Save as PDF** button on that page opens the browser's print dialog, where the PDF printer produces the file. Nothing is generated or stored in advance: the feature extends the `SalesInvoice` module with a Storefront client, a widget, two controllers, and a Back Office block, and reuses the module's existing invoice reading and rendering.

## How it works

1. A Back Office user triggers the `invoice-generate` event on a confirmed order. `SalesInvoice` creates the invoice record with its reference, for example `Invoice-12`, and sends the invoice email as before. This step is unchanged.
2. The Storefront widget and the Back Office block ask the `SalesInvoice` facade for the invoices of the order. The Storefront reaches the facade through the new `SalesInvoice` client and its Zed gateway.
3. The **PDF** link opens a page in the application's blank layout, without navigation, with the invoice reference, the date, the **Save as PDF** button and a frame. The page asks the facade for the same invoice with the rendered HTML (`OrderInvoiceCriteriaTransfer.expandWithRenderedInvoice`) and shows that HTML inside the frame. The button prints the frame, so the PDF contains only the invoice.

## Storefront

Below the order totals, the **Documents** section lists every invoice of the order: the reference, the issue date, the merchant names of the order, and the **PDF** link. Orders without an invoice show *No documents*.

A document can be opened only by the order owner. In B2B shops, company users who may see the orders of their company or business unit can open their documents as well. Every other request, including a request for an unknown invoice or an anonymous visitor, answers with a 404 page, so the URL does not reveal whether an order or an invoice exists.

## Back Office

The order page shows a **Documents** block with the columns **Reference No.**, **Date**, **Merchant**, and **Documents**. The **PDF** link opens the invoice page inside the Back Office layout in a new tab. Access follows the existing Back Office permissions of the `SalesInvoice` module; no new ACL rules are added. Orders without an invoice show *No documents for this order*. For details, see [View order invoice documents](/docs/pbc/all/order-management-system/latest/base-shop/manage-in-the-back-office/orders/view-order-invoice-documents.html).

## The document

The page shows the invoice template configured in `SalesInvoiceConfig::getOrderInvoiceTemplatePath()`. Changing the template changes both the email and the page. The document inherits the constraints of the [legacy invoice template](/docs/pbc/all/order-management-system/latest/base-shop/order-management-feature-overview/invoice-generation-overview.html#invoice-template): product options and mixed tax rates are not fully represented, and it is not a structured e-invoice (EN 16931, XRechnung, ZUGFeRD). The PDF is produced by the browser, so page breaks and margins depend on it.

To change the page around the document (button, frame), override the Storefront view `@SalesInvoice/views/order-invoice/order-invoice.twig` or the Back Office template `@SalesInvoice/Document/index.twig` in your project.

## Current constraints

- One invoice per order: the invoice is generated once by the legacy flow.
- Credit notes, delivery notes, compliant e-invoice formats, and documents provided by an external system are not supported.
- In marketplace shops, the document covers the whole order; there is no document per merchant.
- The invoices are not exposed through the Storefront API or the Back Office API.
- The invoice email does not contain the document as an attachment.

## Next steps

- [Install the Order Invoice Documents feature](/docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-order-invoice-documents-feature.html)
- [View order invoice documents](/docs/pbc/all/order-management-system/latest/base-shop/manage-in-the-back-office/orders/view-order-invoice-documents.html)
