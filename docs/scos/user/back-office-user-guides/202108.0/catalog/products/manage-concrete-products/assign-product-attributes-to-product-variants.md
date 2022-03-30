---
title: Assign product attributes to product variants
description: Learn how to assign product attributes to product variants in the Back Office
template: back-office-user-guide-template
---

This document describes how to assign product attributes to product variants in the Back Office.

## Prerequisites

1. Create the product attributes you want to add to the product variant. For instructions, see [Creating product variants](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/attributes/creating-product-attributes.html).
2. Create a product variant by [creating an abstract product](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-abstract-products/creating-abstract-products-and-product-bundles.html) or by [adding a product variant to an existing abstract product](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-concrete-products/creating-product-variants.html).  
3. To start working with products, go to **Catalog** > **Products**.

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
| ATTRIBUTE KEY | [Product attribute](/docs/scos/user/features/{{page.version}}/product-feature-overview/product-attributes-overview.html) to add to the product variant. |
| KEY | Product attribute key. |
| DEFAULT | Default value of the product attribute. This value is displayed on the Storefront if locale specific value is not specified. |     
