---
title: Assign product attributes to product variants
description: Learn how to assign product attributes to product variants in the Back Office
template: back-office-user-guide-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/scos/user/back-office-user-guides/202311.0/catalog/products/manage-concrete-products/assign-product-attributes-to-product-variants.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/manage-in-the-back-office/products/manage-product-variants/assign-product-attributes-to-product-variants.html
related:
  - title: Product feature overview
    link: docs/pbc/all/product-information-management/page.version/base-shop/feature-overviews/product-feature-overview/product-feature-overview.html
  - title: Product Attributes overview
    link: docs/pbc/all/product-information-management/page.version/base-shop/feature-overviews/product-feature-overview/product-attributes-overview.html
---

This document describes how to assign product attributes to product variants in the Back Office.

## Prerequisites

1. Create the product attributes you want to add to the product variant. For instructions, see [Create product attributes](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/attributes/create-product-attributes.html).
2. Create a product variant by [creating an abstract product](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/create-abstract-products-and-product-bundles.html) or by [adding a product variant to an existing abstract product](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/products/manage-product-variants/create-product-variants.html).  
3. To start working with products, go to **Catalog&nbsp;<span aria-label="and then">></span> Products**.

Review the [reference information](#reference-information-assign-product-attributes-to-product-variants) before you start, or look up the necessary information as you go through the process.


## Assign product attributes to product variants

1. Next to the abstract product that contains the needed product variant, click **Edit**.
2. On the **Edit Product** page, click the **Variants** tab.
3. Next to the product variant you want to add product attributes to, click **Manage Attributes**.
4. For **ATTRIBUTE KEY**, start typing the name of a product attribute and select it from the suggested list.
5. Click **Add**.
    This adds the attribute to the **ATTRIBUTES** pane.
6. For the attribute you have added, enter attribute values for one or more locales.
7. Repeat steps 4-6 until you add all the needed attributes.

![Add product attributes to a product variant](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/back-office-user-guides/catalog/products/manage-product-variants/assign-product-attributes-to-product-variants.md/add-product-attributes-to-product-variants.png)

8. Click **Save**.
    A window with a success message opens. You've added product attributes to the product variant.


## Reference information: Assign product attributes to product variants

This section describes the attributes you see when creating a return.

| ATTRIBUTE | DESCRIPTION |
|-|-|
| ATTRIBUTE KEY | [Product attribute](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-feature-overview/product-attributes-overview.html) to add to the product variant. |
| KEY | Product attribute key. |
| DEFAULT | Default value of the product attribute. This value is displayed on the Storefront if locale specific value is not specified. |
