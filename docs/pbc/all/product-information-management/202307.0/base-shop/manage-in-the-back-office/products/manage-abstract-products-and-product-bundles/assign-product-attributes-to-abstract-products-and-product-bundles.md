---
title: Assign product attributes to abstract products
description: Learn how to assign product attributes to abstract products in the Back Office
template: back-office-user-guide-template
last_updated: Jul 25, 2023
redirect_from:
  - /docs/scos/user/back-office-user-guides/202307.0/catalog/products/manage-abstract-products-and-product-bundles/assign-product-attributes-to-abstract-products-and-product-bundles.html
related:
  - title: Product feature overview
    link: docs/pbc/all/product-information-management/page.version/base-shop/feature-overviews/product-feature-overview/product-feature-overview.html
  - title: Product Attributes overview
    link: docs/pbc/all/product-information-management/page.version/base-shop/feature-overviews/product-feature-overview/product-attributes-overview.html
---

This document describes how to assign product attributes to abstract products in the Back Office.

By assigning a product attribute to an abstract product, you assign it to all its variants. This is useful when an abstract product has a lot of variants with the same attribute value. Alternatively, you can [assign product attributes to a product variant](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/products/manage-product-variants/assign-product-attributes-to-product-variants.html).

## Prerequisites

1. Create the product attributes you want to add to the abstract product. For instructions, see [Create product attributes](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/attributes/create-product-attributes.html).

2. Create the abstract product to assign the product attributes to. For instructions, see [Create abstract products](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/create-abstract-products-and-product-bundles.html).  


Review the [reference information](#reference-information-assign-product-attributes-to-abstract-products) before you start, or look up the necessary information as you go through the process.


## Assign product attributes to an abstract product

1. Go to **Catalog&nbsp;<span aria-label="and then">></span> Products**.
    This opens the **Product** page.
2. Next to the abstract product you want to assign product attributes to, click **Manage Attributes**.
3. Enter and select an **ATTRIBUTE KEY**.
4. Click **Add**.
    This adds the attribute to the **ATTRIBUTES** pane.
5. For the attribute you have added, enter attribute values for one or more locales.
6. Repeat steps 4-6 until you add all the needed attributes.

![Add product attributes to a product variant](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/back-office-user-guides/catalog/products/manage-product-variants/assign-product-attributes-to-product-variants.md/add-product-attributes-to-product-variants.png)

7. Click **Save**.
    A window with a success message opens. You've assigned product attributes to the abstract product.


## Reference information: Assign product attributes to abstract products

| ATTRIBUTE | DESCRIPTION |
|-|-|
| ATTRIBUTE KEY | [Product attribute](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-feature-overview/product-attributes-overview.html) to add to the abstract product. |
| KEY | Product attribute key. |
| **DEFAULT** locale | Default value of the product attribute. This value is displayed on the Storefront if a locale specific value is not specified. |     
