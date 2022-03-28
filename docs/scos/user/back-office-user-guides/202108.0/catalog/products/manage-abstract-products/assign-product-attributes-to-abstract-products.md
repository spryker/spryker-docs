---
title: Assign product attributes to abstract products
description: Learn how to assign product attributes to abstract products in the Back Office
template: back-office-user-guide-template
---

This document describes how to assign product attributes to abstract products in the Back Office.

By assigning a product attribute to an abstract product, you assign it to all its variants. This is useful when you have an abstract product has a lot of variants with the same attribute value. Alternatively, you can [assign product attributes to a product variant](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-concrete-products/assign-product-attributes-to-product-variants.html).

## Prerequisites

1. Create the product attributes you want to add to the abstract product. For instructions, see [Creating product variants](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/attributes/creating-product-attributes.html).

2. Create the abstract product to assign the product attributes to. For instructions, see [creating an abstract product](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-abstract-products/creating-abstract-products-and-product-bundles.html).  
3. To start working with products, go to **Catalog** > **Products**.

Review the [reference information](#reference-information-assign-product-attributes-to-abstract-products) before you start, or look up the necessary information as you go through the process.


## Assign product attributes to an abstract product

1. Next to the abstract product you want to assign product attributes to, click **Manage Attributes**.
2. For **ATTRIBUTE KEY**, start typing the name of a product attribute and select it from the suggested list.
3. Click **Add**.
    This adds the attribute to the **ATTRIBUTES** pane.
4. For the attribute you have added, enter attribute values for one or more locales.
5. Repeat steps 4-6 until you add all the needed attributes.

![Add product attributes to a product variant](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/user/back-office-user-guides/catalog/products/manage-product-variants/assign-product-attributes-to-product-variants.md/add-product-attributes-to-product-variants.png)

6. Click **Save**.
    A window with a success message opens. You've assigned product attributes to the abstract product.


## Reference information: Assign product attributes to abstract products

This section describes the attributes you see when creating a return.

| ATTRIBUTE | DESCRIPTION |
|-|-|
| ATTRIBUTE KEY | [Product attribute](/docs/scos/user/features/{{page.version}}/product-feature-overview/product-attributes-overview.html) to add to the abstract product. |
| KEY | Product attribute key. |
| DEFAULT | Default value of the product attribute. This value is displayed on the Storefront if locale specific value is not specified. |     
