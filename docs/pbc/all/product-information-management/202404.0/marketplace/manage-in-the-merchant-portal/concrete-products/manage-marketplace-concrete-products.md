---
title: Managing marketplace concrete products
last_updated: May 05, 2022
description: This document describes how to modify marketplace concrete products in the Merchant Portal.
template: back-office-user-guide-template
related:
  - title: Marketplace Product feature overview
    link: docs/pbc/all/product-information-management/page.version/marketplace/marketplace-product-feature-overview.html
  - title: Marketplace Inventory Management feature overview
    link: docs/pbc/all/warehouse-management-system/page.version/marketplace/marketplace-inventory-management-feature-overview.html
---

This document describes how to edit a marketplace concrete product in the Merchant Portal.

## Prerequisites

To start working with marketplace concrete products, go to the **Merchant Portal** > **Products**.  Hover over the three dots next to the abstract product for which you manage a concrete product and click **Manage Product** or just click the line. This takes you to the *[Product name]* drawer. Navigate to the *Concrete Products* tab.

This document contains reference information. Make sure to review it before you start, or look up the necessary information as you go through the process.

## Filtering and sorting concrete products

You can use the following drop-down menus to filter the marketplace concrete products on the *Concrete Products* page:

- Status of the concrete product
- Validity dates

Select one or more sorting parameters from the drop-down menu on the *Concrete Products* page to sort the existing concrete products. Choose among the following sort criteria:

- SKU
- Name
- Status
- Valid from
- Valid to

By default, the table is sorted descendingly by SKU.

## Activating and deactivating a concrete product

To activate a marketplace concrete product:

1. On the *Concrete Products* page, next to the concrete product you want to activate, hover over the three dots and click **Manage Product** or just click the line. This takes you to the *Concrete Product SKU, Name* page.
2. In the *Status* pane, select *Concrete Product is online* to make the concrete product online.
3. Click **Save**.

To deactivate the product, clear *Concrete Product is online* to make the concrete product offline.

## Editing marketplace concrete product details

To edit an existing marketplace concrete product:

1. On the *Concrete Products* page, next to the concrete product you want to edit, hover over the three dots and click **Manage Product** or just click the line. This takes you to the *Concrete Product SKU, Name* page.
2. In the *Stock* pane, populate the *Quantity* field.
3. In the *Name* pane, edit *Name* for every locale.
4. In the *Description* pane, edit *Description* for every locale.
5. In the *Validity Dates & Time* pane, populate the *Valid from* and *Valid to* fields.
6. In the *Searchability* pane, from the drop-down menu select the locales where the product is searchable.
7. Click **Save**.

### Reference information: *Concrete Product SKU, Name* page

| PANE    | ATTRIBUTE     | DESCRIPTION | REQUIRED |
| -------------- | ---------------- | ----------- | --------- |
| Status         |                  | Defines the status of the concrete product. |           |
|                |  Concrete Product is active    | The selected check box makes the product active and available in store. |               |
| Stock          |                  | Defines the stock of the concrete product. |           |
|                 |   Reserved Stock           | Number of items of this concrete product that are reserved according to *Orders*. |               |
|                  |  Quantity                 | Number of items available in the warehouse. The default is 0. | ✓ |
|                  |  Always in Stock           | The selected check box makes the product always available for purchase. |               |
| Name                  |  | Name of your product displayed on the Storefront. | ✓ |
|               |  Use Abstract Product name for all locales   | Select the check box to take over the name of the abstract. |              |
| Description           |  | Product description. |           |
|              |  Use Abstract Product description for all locales    | Select the check box to take over the description of the abstract.. |       |
| Validity Dates & Time |  | Defines the period of time when the product is in active state. The **Valid from** date triggers the activation, while the **Valid to** date triggers the deactivation. Either no dates can be selected, or both. |           |
| Price                 |  | In this pane, you can manage prices for your concrete product. See [Managing marketplace concrete product prices](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/concrete-products/manage marketplace-concrete-product-prices.html) for more details. |           |
| Images                |  | In this pane, you can manage image sets for your concrete product. See [Managing concrete product image sets](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/concrete-products/manage-marketplace-concrete-products-image-sets.html) for more details. |           |
| Attributes            |  | In this pane, you can manage attributes for your product. See [Managing concrete product attributes](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/concrete-products/manage-marketplace-concrete-product-attributes.html) for more details. |           |
| Searchability         |  | Defines the stores where the concrete product can be searched via the Search function in the online store. If not selected, no values will be displayed when searching for this product. |           |

## Next steps

- [Manage concrete product prices](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/concrete-products/manage-marketplace-concrete-product-prices.html)
- [Manage concrete product image sets](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/concrete-products/manage-marketplace-concrete-products-image-sets.html)
- [Manage concrete product attributes](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/concrete-products/manage-marketplace-concrete-product-attributes.html)
