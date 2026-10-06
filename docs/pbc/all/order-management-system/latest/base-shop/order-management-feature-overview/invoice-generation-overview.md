---
title: Order confirmation / invoice notification email (legacy)
description: Learn what the legacy invoice notification email does, why it is not an e-invoice, and what you must do yourself to comply with e-invoicing mandates.
last_updated: Oct 06, 2026
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/invoice-generation-overview
originalArticleId: 34bc81a9-6809-4998-8ccb-956963c063a0
redirect_from:
  - /2021080/docs/invoice-generation-overview
  - /2021080/docs/en/invoice-generation-overview
  - /docs/invoice-generation-overview
  - /docs/en/invoice-generation-overview
  - /docs/scos/user/features/202311.0/order-management-feature-overview/invoice-generation-overview.html
  - /docs/scos/user/features/202204.0/order-management-feature-overview/invoice-generation-overview.html
---

{% info_block infoBox "Liability" %}

Spryker does not generate, validate, or assume legal responsibility for invoices or credit notes by default. The seller remains the invoice issuer and is responsible for the document's tax and legal compliance, including its format under applicable national e-invoicing mandates.

{% endinfo_block %}

Through this legacy feature, invoices can be generated and sent to the customer's email when they place an order in the shop. Before you rely on it, consider the following:

- The emailed document is not a structured e-invoice and does not comply with the EU ViDA EN 16931, XRechnung, or ZUGFeRD requirements.
- It is not persisted in the Back Office or on the Storefront; the only retention path is a BCC copy.
- It requires a project-level template; none is shipped by default.
- Product options and mixed tax rates are not fully represented, so the document should not be relied upon for tax-relevant purposes.

Sellers subject to a mandate must generate compliant invoices and credit notes in their ERP or via a certified e-invoicing provider. Order data can be retrieved from Spryker to feed that system through the [Orders data export](/docs/pbc/all/order-management-system/latest/base-shop/import-and-export-data/orders-data-export/orders-data-export.html) and the [Storefront API](/docs/pbc/all/order-management-system/latest/base-shop/glue-api-retrieve-orders.html).

To let buyers and Back Office users open this emailed invoice as a page they can save as PDF, use the [Order invoice documents](/docs/pbc/all/order-management-system/latest/base-shop/order-management-feature-overview/order-invoice-documents-overview.html) feature. It shows the same document on demand; it does not make the legacy email compliant.

## Legacy invoice generation

Invoices can be generated and sent to the customer's email every time they place an order in the shop.

{% info_block infoBox "" %}

You can send a hidden copy of the invoice to yourself or your employees. Keep in mind that sending the hidden copy to yourself is the only way to keep invoices for your reference, as the generated invoices are not saved in the Back Office or on the Storefront.

{% endinfo_block %}

You can generate an invoice only once the order has acquired the `confirmed` state. The invoice generation and sending are triggered in the Back Office by initiating the `invoice-generate` event on the **View Order** page. For details about how a Back Office user initiates events for orders, see [Change the state of order items](/docs/pbc/all/order-management-system/latest/base-shop/manage-in-the-back-office/orders/change-the-state-of-order-items.html). After generating the invoice, the OMS state of the order changes to `exported`.

{% info_block infoBox "" %}

You can use the default OMS states to be displayed on the **Order Details** pages on the Storefront or set custom states so they make more sense for the Storefront users. For details about how to set the custom states for orders on the Storefront, see [Display custom names for order item states on the Storefront](/docs/pbc/all/order-management-system/latest/base-shop/display-custom-names-for-order-item-states-on-the-storefront.html).

{% endinfo_block %}

By default, the invoice can be generated only for the whole order (not for individual order items) and only once. However, on the project level, you can set up a configuration that forces the repeated invoice generation by running a console command. For details, see [Email invoices using BCC](/docs/pbc/all/order-management-system/latest/base-shop/email-invoices-using-bcc.html).

## Invoice template

The invoice template is not provided out of the box and needs to be added in the `SalesInvoiceConfig.php` file. Otherwise, an exception is thrown, and the invoice is not generated.

Check out the example of the Spryker invoice template:
![Generated Invoice](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Order+Management/Invoice+Generation/generated-invoice.png)

In the generated invoice template, the following data is *not hardcoded*:

- Customer billing address
- Invoice creation date
- Invoice number
- All order data in the table

All other text is hardcoded. This text is glossary keys, and you can change them for your project as you want.

{% info_block infoBox "Product bundles" %}

Keep in mind that a bundled product always has a 0-tax rate. However, all of the bundled items are represented separately in the invoice and can have their own tax rates, which are reflected in the invoice. For example, in the preceding image, Sony Bundle is the bundled product with a 0% tax rate, and *Sony HDR-AS20*, *Sony SmartWatch 3*, *Sony Xperia Z3 Compact* are its bundled items with their tax rates.

{% endinfo_block %}

## Current constraints

- Product options are not fully supported in the generated invoice. If product options have one tax rate and the product itself another, the tax rate difference is not reflected in the invoice. The invoice shows prices that already include tax rates of products and product options.
- PDF files of the invoices are not generated.

## Related Business User documents

| BACK OFFICE USER GUIDES |
|---|
| [Trigger the invoice notification email in the Back Office](/docs/pbc/all/order-management-system/latest/base-shop/manage-in-the-back-office/orders/change-the-state-of-order-items.html) |
