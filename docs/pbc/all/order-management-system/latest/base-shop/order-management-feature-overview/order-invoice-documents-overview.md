---
title: Order invoice documents feature overview
description: Learn how buyers on the Storefront and Back Office users open the invoice of an order as a page they can save as PDF, and what the feature does not do.
last_updated: Oct 21, 2026
template: concept-topic-template
related:
  - title: Install the Order Invoice Documents feature
    link: docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-order-invoice-documents-feature.html
  - title: View order invoice documents
    link: docs/pbc/all/order-management-system/latest/base-shop/manage-in-the-back-office/orders/view-order-invoice-documents.html
  - title: Customize the order invoice document
    link: docs/pbc/all/order-management-system/latest/base-shop/customize-the-order-invoice-document.html
  - title: Marketplace order invoice documents feature overview
    link: docs/pbc/all/order-management-system/latest/marketplace/marketplace-order-management-feature-overview/marketplace-order-invoice-documents-overview.html
---

{% include pbc/all/order-management-system/order-invoice-liability.md %} <!-- To edit, see /_includes/pbc/all/order-management-system/order-invoice-liability.md -->

The *Order invoice documents* feature makes the invoice of an order visible in two places:

- On the Storefront, in a **Documents** section of the order details page in the customer's order history.
- In the Back Office, in a **Documents** block of the order page.

Both places list the invoices of the order with a **PDF** link. The link opens the invoice in a new browser tab, rendered on request from the project's invoice template, the same HTML the [invoice notification email](/docs/pbc/all/order-management-system/latest/base-shop/order-management-feature-overview/invoice-generation-overview.html) contains, with a **Save as PDF** button that opens the browser's print dialog, where the PDF printer produces the file. Nothing is generated or stored in advance: the feature extends the `SalesInvoice` module with an order expander plugin, a Storefront client, a widget, two controllers, and a Back Office block, and reuses the module's existing invoice reading and rendering. A project adjusts the document through the invoice template and the existing plugins of the module, or delivers its own file format with its own download actions; see [Customize the order invoice document](/docs/pbc/all/order-management-system/latest/base-shop/customize-the-order-invoice-document.html).

## How it works

1. A Back Office user triggers the `invoice-generate` event on a confirmed order. `SalesInvoice` creates the invoice record with its reference, for example `Invoice-12`, and sends the invoice email as before. This step is unchanged.
2. The Storefront widget and the Back Office block list the invoices of the order. The Back Office block reads it from the facade of the module. The Storefront widget makes no request: `OrderInvoiceOrderExpanderPlugin` adds the invoice to the order while the Sales module reads it, so the order details page already carries it. The invoice page reaches the `SalesInvoice` facade through the new `SalesInvoice` client and its Zed gateway, sending the current customer along. The facade reads the order through the Sales module with the rules of the order details page; Back Office and OMS pass no customer, so nothing is checked for them.
3. The **PDF** link opens a page in the application's blank layout, without navigation, with the invoice reference, the date, the **Save as PDF** button and a frame. The page asks the facade for the same invoice with the rendered HTML (`OrderInvoiceCriteriaTransfer.expandWithRenderedInvoice`) and shows that HTML inside the frame. The button prints the frame, so the PDF contains only the invoice.

## Storefront

Below the order totals, the **Documents** section lists the invoices of the order: the reference, the issue date, and the **PDF** link. If the [Marketplace order invoice documents](/docs/pbc/all/order-management-system/latest/marketplace/marketplace-order-management-feature-overview/marketplace-order-invoice-documents-overview.html) feature is installed, the rows also show the merchant of each invoice. Orders without an invoice show *No documents*.

The invoice can be opened by every customer who may open the order details page: `SalesInvoiceFacade::getOrderInvoices()` reads the order through `SalesFacade::getCustomerOrder()`, the method behind the order details page, which accepts the customer who placed the order and every customer a `CustomerOrderAccessCheckPluginInterface` plugin of the Sales module accepts. With the business-unit and company plugins of your project, a company user with the **See business unit orders** or **See company orders** permission opens the invoices of those orders too. For an order the customer may not see, `SalesFacade::getCustomerOrder()` throws `InvalidSalesOrderException`; the module does not catch it, so the Storefront shows an error page. This case is not reachable through the links the shop renders. A request for an unknown invoice of an accessible order answers with a 404 page. Anonymous visitors are redirected to the login page by the customer firewall.

## Back Office

The order page shows a **Documents** block with the columns **Reference No.**, **Date**, and **Files**. If the [Marketplace order invoice documents](/docs/pbc/all/order-management-system/latest/marketplace/marketplace-order-management-feature-overview/marketplace-order-invoice-documents-overview.html) feature is installed, the block also shows the merchant of each invoice. The **PDF** link opens the invoice page in a new tab. Access follows the existing Back Office permissions of the `SalesInvoice` module; no new ACL rules are added. Orders without an invoice show *No documents for this order*. For details, see [View order invoice documents](/docs/pbc/all/order-management-system/latest/base-shop/manage-in-the-back-office/orders/view-order-invoice-documents.html).

## The document

The page shows the invoice template configured in `SalesInvoiceConfig::getOrderInvoiceTemplatePath()`. Changing the template changes both the email and the page. The document inherits the constraints of the [invoice template](/docs/pbc/all/order-management-system/latest/base-shop/order-management-feature-overview/invoice-generation-overview.html#invoice-template): product options and mixed tax rates are not fully represented, and it is not a structured e-invoice (EN 16931, XRechnung, ZUGFeRD). The PDF is produced by the browser, so page breaks and margins depend on it.

To change the page around the document (button, frame), override the Storefront view `@SalesInvoice/views/order-invoice/order-invoice.twig` or the Back Office template `@SalesInvoice/Document/index.twig` in your project.

## Current constraints

- One invoice per order: the invoice is generated once by the invoice notification email flow. Marketplace shops get one invoice per merchant plus one for the items without a merchant with the [Marketplace order invoice documents](/docs/pbc/all/order-management-system/latest/marketplace/marketplace-order-management-feature-overview/marketplace-order-invoice-documents-overview.html) feature.
- Credit notes and delivery notes are not supported. Compliant e-invoice formats and documents of an external system are not provided by Spryker; a project adds them with its own download actions, see [Customize the order invoice document](/docs/pbc/all/order-management-system/latest/base-shop/customize-the-order-invoice-document.html).
- The invoices are not exposed through the Storefront API or the Back Office API.
- The invoice email does not contain the document as an attachment.
