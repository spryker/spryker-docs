---
title: Create marketplace concrete products
last_updated: Aug 11, 2021
description: This document describes how to create a marketplace concrete product in the Merchant Portal.
template: back-office-user-guide-template
related:
  - title: Marketplace Product feature overview
    link: docs/pbc/all/product-information-management/page.version/marketplace/marketplace-product-feature-overview.html
---

This document describes how to create marketplace concrete products.

## Prerequisites

To start working with marketplace concrete products, go to **Merchant Portal&nbsp;<span aria-label="and then">></span> Products**.

This document contains reference information. Make sure to review it before you start, or look up the necessary information as you go through the process.

## Creating a marketplace concrete product

You can create a marketplace concrete product in two ways:

- While [creating an abstract marketplace product](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/abstract-products/create-marketplace-abstract-products.html).
- By adding a concrete product to the existing abstract product.

To add a concrete product to the existing abstract product:
  1. Hover over the three dots next to the abstract product for which you will create a concrete product and click **Manage Product** or just click the line. The **[Product name]** drawer opens.
  2. Navigate to the **Concrete Products** tab.
  3. On the **Concrete Products** page, click **Add Concrete Products**. The **Create Concrete Products for [Abstract product name SKU]** drawer opens.
  4. Based on the super attributes selected while [creating an abstract product](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/abstract-products/create-marketplace-abstract-products.html), add or select values to the existing super attributes. Upon adding the super attribute values, the preview of the concrete products is displayed.

  {% info_block infoBox "Info" %}

  Removing a super attribute or its value removes the appropriate concrete products or concrete product values from the preview.

  {% endinfo_block %}

  4. Click **Save**.

  {% info_block infoBox "Info" %}

  You can remove a concrete product from the preview list by clicking the **Remove** icon.

  {% endinfo_block %}

Once the product is created, it needs to be [activated](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/concrete-products/edit-marketplace-concrete-products.html). Only the active marketplace products are displayed on the Marketplace Storefront.

### Reference information: Create Concrete Products for [Abstract product name SKU]

This page contains a drop-down menu that displays super attribute values based on a super attribute selected while [creating a marketplace abstract product](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/abstract-products/create-marketplace-abstract-products.html). When you select a product attribute value, a concrete product based on this value is displayed. In the **Concrete Products’ Preview** pane, you can view the products to be created.

By selecting **Autogenerate SKUs**, the SKU numbers for the concrete products are generated automatically, based on the SKU prefix of their abstract product.

By selecting **Same Name as Abstract Product**, the name of the abstract product is used for the concrete products as well.


## Next steps

[Manage concrete product](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/concrete-products/edit-marketplace-concrete-products.html)
