---
title: View merchant order invoice documents in the Merchant Portal
description: Learn how a merchant opens the invoices of a merchant order in the Merchant Portal and saves them as PDF.
template: back-office-user-guide-template
last_updated: Oct 20, 2026
related:
  - title: Marketplace order invoice documents feature overview
    link: docs/pbc/all/order-management-system/latest/marketplace/marketplace-order-management-feature-overview/marketplace-order-invoice-documents-overview.html
  - title: Managing merchant orders
    link: docs/pbc/all/order-management-system/latest/marketplace/manage-merchant-orders.html
---

This document describes how to open the [invoices](/docs/pbc/all/order-management-system/latest/marketplace/marketplace-order-management-feature-overview/marketplace-order-invoice-documents-overview.html) of a merchant order in the Merchant Portal.

## Prerequisites

The merchant order must have a generated invoice. In the default marketplace state machine, the invoice of a merchant is generated when the merchant ships the items of the order. For details, see [Managing merchant orders](/docs/pbc/all/order-management-system/latest/marketplace/manage-merchant-orders.html).

## Viewing merchant order invoice documents

1. Go to **Merchant Portal&nbsp;<span aria-label="and then">></span> Orders**.
2. Click the order you want to check or click **Details** next to it.
    This opens the **Order *[Order ID]*** page.
3. Scroll to the **Documents** card. The invoices issued for your part of the order are listed with their reference and date.
4. In the **Files** column, click **PDF**.
    The invoice page opens in a new browser tab. To save the invoice as a PDF file, click **Save as PDF** and select the PDF printer in the print dialog.

Merchant orders without an invoice show *No documents for this order*.

You can open only the invoices of your own merchant orders. A link to the invoice of another merchant or to the invoice of the marketplace operator answers with a 404 page.

### Reference information: Viewing merchant order invoice documents

| ATTRIBUTE | DESCRIPTION |
|---|---|
| Reference No. | Reference of the invoice, for example `Invoice-12`. |
| Date | Issue date of the invoice. |
| Files | The **PDF** link that opens the invoice page. |
