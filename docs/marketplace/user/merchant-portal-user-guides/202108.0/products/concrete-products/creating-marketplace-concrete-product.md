---
title: Creating a marketplace concrete product
last_updated: Aug 11, 2021
description: This document describes how to create a marketplace concrete product in the Merchant Portal.
template: back-office-user-guide-template
---

This document describes how to create a marketplace concrete product.

## Prerequisites

To start working with marketplace concrete products, go to **Merchant Portal** > **Products**.

Review the reference information before you start, or just look up the necessary information as you go through the process.

## Creating a marketplace concrete product

You can create a marketplace concrete product following two scenarios:

- while [creating an abstract marketplace product](/docs/marketplace/user/merchant-portal-user-guides/{{ page.version }}/products/abstract-products/creating-marketplace-abstract-product.html)
- By adding a concrete product to the existing abstract product. To do so:
  1. Hover over the three dots next to the abstract product for which you will create a concrete product and click **Manage Product** or just click the line. This takes you to the *[Product name]* drawer. Navigate to the *Concrete Products* tab.
  2. On the *Concrete Products* page, click **Add Concrete Products**. *Create Concrete Products for [Abstract product name SKU]* drawer opens.
  3. Based on the super attribute(s) selected while [creating an abstract product](/docs/marketplace/user/merchant-portal-user-guides/{{ page.version }}/products/abstract-products/creating-marketplace-abstract-product.html), add or select values to the existing super attribute(s). Upon adding the super attribute values, the preview of the concrete products is displayed.

  {% info_block infoBox "Info" %}

  Removing a super attribute or its value will remove the appropriate concrete product(s) or concrete product values from the preview.

  {% endinfo_block %}

  4. Click **Save**.

  **Tips and Tricks** </br>

  You can remove a concrete product from the preview list by clicking the **Remove** icon.

Once the product is created, it needs to be [activated](/docs/marketplace/user/merchant-portal-user-guides/{{ page.version }}/products/concrete-products/managing-marketplace-concrete-product.html#deactivating-a-concrete-product). Only the active marketplace products are displayed on the Marketplace Storefront.

### Reference information: Create Concrete Products for [Abstract product name SKU]

This page contains a drop-down menu that displays the super attribute values based on the super attribute selected while [creating a marketplace abstract product](/docs/marketplace/user/merchant-portal-user-guides/{{ page.version }}/products/abstract-products/creating-marketplace-abstract-product.html). When you select a product attribute value, a concrete product based on this value is displayed. In the *Concrete Products’ Preview* pane you can view the products to be created.

By selecting **Autogenerate SKUs**, the SKU numbers for the concrete products are generated automatically, based on the SKU prefix of their abstract product.

By selecting **Same Name as Abstract Product**, the name of the abstract product is used for the concrete products as well.


## Next steps

[Manage concrete product](/docs/marketplace/user/merchant-portal-user-guides/{{ page.version }}/products/concrete-products/managing-marketplace-concrete-product.html)
