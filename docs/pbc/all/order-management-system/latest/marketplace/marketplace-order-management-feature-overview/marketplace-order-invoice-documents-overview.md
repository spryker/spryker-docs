---
title: Marketplace order invoice documents feature overview
description: Learn how a marketplace order gets one invoice per merchant plus one for the items sold by the operator, and how merchants open their invoices in the Merchant Portal.
last_updated: Oct 20, 2026
template: concept-topic-template
related:
  - title: Order invoice documents feature overview
    link: docs/pbc/all/order-management-system/latest/base-shop/order-management-feature-overview/order-invoice-documents-overview.html
  - title: Install the Marketplace Order Invoice Documents feature
    link: docs/pbc/all/order-management-system/latest/marketplace/install-features/install-the-marketplace-order-invoice-documents-feature.html
  - title: View merchant order invoice documents in the Merchant Portal
    link: docs/pbc/all/order-management-system/latest/marketplace/view-merchant-order-invoice-documents.html
  - title: Customize the order invoice document
    link: docs/pbc/all/order-management-system/latest/base-shop/customize-the-order-invoice-document.html
---

{% info_block infoBox "Liability" %}

Spryker does not generate, validate, or assume legal responsibility for invoices or credit notes. The seller remains the invoice issuer and is responsible for the document's tax and legal compliance, including its format under applicable national e-invoicing mandates.

Spryker's role is limited to forwarding the document links from the seller, making it available to the correct buyer/seller.

Spryker does not transmit documents to national e-invoicing or clearance networks such as Peppol, KSeF, or SdI. Transmission remains the responsibility of the seller or their e-invoicing provider.

The [Order confirmation / invoice notification email feature](/docs/pbc/all/order-management-system/latest/base-shop/order-management-feature-overview/invoice-generation-overview.html) is non compliant with the latest EU e-invoicing requirements.

{% endinfo_block %}

The *Marketplace order invoice documents* feature extends the [Order invoice documents](/docs/pbc/all/order-management-system/latest/base-shop/order-management-feature-overview/order-invoice-documents-overview.html) feature for marketplace shops. A marketplace order contains items of one or several merchants and, optionally, items the marketplace operator sells. Instead of one invoice for the whole order, the feature creates one invoice per merchant plus one invoice for the items without a merchant. Each invoice shows only the items, expenses, and totals of its merchant, together with the merchant's requisites, and merchants open their invoices in the Merchant Portal.

The feature is provided by the `MerchantSalesInvoice` module. The `SalesInvoice` module stays unaware of merchants: `MerchantSalesInvoice` plugs into it through the plugin interfaces of the `SalesInvoiceExtension` module and stores the merchant of an invoice in the new `merchant_reference` column of the `spy_sales_order_invoice` table. Shops without `MerchantSalesInvoice` keep one invoice per order.

## How it works

1. A merchant ships items in the Merchant Portal. The merchant state machine runs the `ship` event, which moves the items of the marketplace order into the `shipped by merchant` state of the marketplace state machine.
2. Entering `shipped by merchant` triggers the `invoice-generate` event with the `MerchantInvoice/Generate` OMS command (`GenerateMerchantOrderInvoicesCommandPlugin`). The command groups the items of the event by merchant reference and asks `SalesInvoice` to generate one invoice per group. Items without a merchant reference form the operator's group.
3. `MerchantReferenceOrderInvoiceBeforeSavePlugin` stores the merchant reference of the group in the invoice. `MerchantOrderInvoiceExistenceCheckStrategyPlugin` makes sure that an order gets at most one invoice per merchant: a unique key on the order and the merchant reference backs the check.
4. When the invoice is rendered, in the email, on the Storefront, in the Back Office, or in the Merchant Portal, `MerchantOrderInvoiceRenderOrderExpanderPlugin` replaces the order in the template with a copy that contains only the items and expenses of the invoice's merchant and the totals of the [merchant order](/docs/pbc/all/order-management-system/latest/marketplace/marketplace-order-management-feature-overview/merchant-order-overview.html). It also adds the merchant to the invoice, so the template prints the merchant's name, registration number, and address. For the operator's invoice, the copy keeps the items and expenses without a merchant and recalculates the totals.
5. `MerchantOrderInvoicesExpanderPlugin` adds the merchant to every loaded invoice, so the Back Office **Documents** block shows a **Merchant** column, and the Storefront row shows the merchant through the `SoldByMerchantWidget`.

### Invoice per merchant order

The invoice of a merchant is created on the merchant's first `shipped by merchant` transition and is rendered from the whole merchant order. If the merchant ships the items of one order in several shipments, the later shipments do not create another invoice: the invoice created with the first shipment already lists all items of the merchant in that order. This mirrors the base shop, where the whole order is invoiced at once. Items canceled after the invoice was created are not reflected; credit notes are not supported.

The `MerchantInvoice/Generate` command also runs the manual `invoice-generate` event of the demo `DummyPayment01` process, so a Back Office user who triggers it on a marketplace order with the regular invoice payment method gets the same set of invoices: one per merchant plus one for the operator's items.

## Merchant Portal

The order details page of the Merchant Portal shows a **Documents** card with the invoices issued for the merchant's part of the order: the reference, the issue date, and a **PDF** link. The link opens the invoice page in a new tab, in the Merchant Portal layout, with a **Save as PDF** button and the document in a frame. The page answers with a 404 page unless the merchant order belongs to the merchant of the logged in merchant user and the invoice belongs to that merchant order's merchant. Merchant users receive access to the page through the `merchant-sales-invoice` ACL bundle, which `MerchantSalesInvoiceMerchantAclRuleExpanderPlugin` adds to every merchant. For details, see [View merchant order invoice documents in the Merchant Portal](/docs/pbc/all/order-management-system/latest/marketplace/view-merchant-order-invoice-documents.html).

## Back Office

The **Documents** block of the order page lists every invoice of the order with its reference, date, merchant, and the **PDF** link. `MerchantOrderInvoiceSalesListBlockRendererPlugin` of `MerchantSalesInvoice` renders the block with the **Merchant** column and replaces the block plugin of `SalesInvoice`. The operator's invoice shows an empty **Merchant** cell. For details, see [View order invoice documents](/docs/pbc/all/order-management-system/latest/base-shop/manage-in-the-back-office/orders/view-order-invoice-documents.html).

## Storefront

The **Documents** section of the order details page lists every invoice of the order. Each row shows the reference, the issue date, the merchant through the `SoldByMerchantWidget` of the `MerchantWidget` module, and the **PDF** link. Access follows the rules of the order details page; see [Order invoice documents feature overview](/docs/pbc/all/order-management-system/latest/base-shop/order-management-feature-overview/order-invoice-documents-overview.html#storefront).

## The document

Each invoice renders the invoice template of your project. The template receives the narrowed order and the invoice with the merchant, so it can print the merchant's requisites next to the operator's header; the demo template prints the merchant's name, registration number, and the address from the merchant profile. For the template and the extension points, see [Customize the order invoice document](/docs/pbc/all/order-management-system/latest/base-shop/customize-the-order-invoice-document.html).

## Current constraints

- One invoice per merchant order, created with the merchant's first shipment, plus one invoice for the items without a merchant. Shipments and partial deliveries do not get separate invoices.
- Invoice references stay in one sequence for all merchants, for example `Invoice-12`, `Invoice-13`.
- The invoice email goes to the customer only; merchants receive no email.
- Credit notes and delivery notes are not supported.
- The unique key on the order and the merchant reference does not cover the operator's invoice, whose merchant reference is `NULL`, which matches the base shop behavior for all invoices.
