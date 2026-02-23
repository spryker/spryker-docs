---
title: Product Attachments overview
description: Learn how the Product Attachments feature enables Back Office users to manage product-related downloadable resources and display them on the product detail page.
last_updated: Feb 20, 2026
template: concept-topic-template
---

The Product Attachments feature lets Back Office users add external links to product-related resources—such as PDFs, manuals, or datasheets—directly to abstract products. Customers can access these resources in the **Downloads** section on the product detail page (PDP). This feature is particularly useful in B2B scenarios where technical documentation or compliance certificates are required for purchasing decisions.

## Back Office management

In the Back Office, the **Images** tab of the product management form has been renamed to **Media**. A new **Attachments** section is available within this tab.

### Adding attachments

For each attachment, you can configure the following fields:

| FIELD | DESCRIPTION |
| --- | --- |
| **URL** | The external link to the attachment resource—for example, a PDF hosted on a CDN. |
| **Label** | The display name shown to customers in the Downloads section on the PDP. |
| **Sort Order** | Determines the display order of attachments. Lower values are displayed first. |

### Default and locale-specific attachments

Attachments can be defined as default or locale-specific:

- **Default attachments**: Apply to all locales and are displayed in the Downloads section regardless of the storefront language.
- **Locale-specific attachments**: Apply to a specific locale only and are displayed when a customer browses in that locale.

## PDP Downloads section

The **Downloads** section on the PDP presents all applicable attachments to the customer:

- The section is hidden when no attachments are configured for the product.
- Each attachment opens in a new browser tab when clicked.
- Locale-specific and default attachments are combined in the Downloads section.
- When attachments have equal sort order values, locale-specific attachments are displayed before default attachments.

## Limitations

- Attachments are supported for abstract products only.
- Only URLs are supported; direct file uploads are not included in this feature.

## Related documents

| BACK OFFICE USER GUIDES | DEVELOPER GUIDES |
| --- | --- |
| [Create abstract products and product bundles](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/create-abstract-products-and-product-bundles.html) | [Install the Product Attachments feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-attachments-feature.html) |
