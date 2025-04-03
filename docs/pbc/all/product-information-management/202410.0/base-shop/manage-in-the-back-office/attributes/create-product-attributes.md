---
title: Create product attributes
description: Learn how to create product attributes in the Spryker Cloud Commerce OS Back Office.
last_updated: Oct 15, 2024
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/creating-product-attributes
originalArticleId: 1b1f5ddd-b2e3-4095-a1e0-abb9b298fd46
redirect_from:
  - /docs/scos/user/back-office-user-guides/202108.0/catalog/attributes/creating-product-attributes.html
  - /docs/scos/user/back-office-user-guides/202200.0/catalog/attributes/creating-product-attributes.html
  - /docs/scos/user/back-office-user-guides/202311.0/catalog/attributes/creating-product-attributes.html  
  - /docs/scos/user/back-office-user-guides/202311.0/catalog/attributes/create-product-attributes.html  
  - /docs/pbc/all/product-information-management/202204.0/base-shop/manage-in-the-back-office/attributes/create-product-attributes.html
related:
  - title: Product Attributes
    link: docs/pbc/all/product-information-management/page.version/base-shop/feature-overviews/product-feature-overview/product-attributes-overview.html
---

This doc describes how to create product attributes in the Back Office.

A new product usually needs a super attribute and a regular attribute. The super attribute is used to distinguish product variants and the regular attribute is used to define product characteristics.

## Prerequisites

Review the [reference information](#reference-information-create-product-attributes) before you start, or look up the necessary information as you go through the process.

## Create a product attribute

1. Go to **Catalog&nbsp;<span aria-label="and then">></span> Attributes**.
2. On the **Attributes** page, click **Create Product Attribute**.
3. On the **Create a Product Attribute** page, enter an **ATTRIBUTE KEY**.
4. Select an **INPUT TYPE**.
5. Optional: To make this attribute a supper attribute, select the **SUPER ATTRIBUTE** checkbox.
    This disables the **ALLOW INPUT ANY VALUE OTHER THAN PREDEFINED ONES** checkbox because a super attribute can have only predefined values.
6. In the **PREDEFINED VALUES** field, enter a predefined value and press `Enter`.
7. Repeat the previous step until you add all the needed predefined values.
8. Optional: To allow adding the values that are different from the predefined ones, select **ALLOW INPUT ANY VALUE OTHER THAN PREDEFINED ONES**.
9. Select **Save**.
    This opens the **2. Translations** tab.
10. In the **2. Translations** tab, enter a **TRANSLATION** for each locale.
11. Optional: To localize predefined parameter values, do the following:
    1. Select **TRANSLATE PREDEFINED VALUES**.
    2. Enter a **Translation** for the predefined parameter values for all the locales.
12. Click **Save**.
    This opens the **View Product Attribute** page with a success message displayed. Now you can use this attribute for [creating abstract products](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/create-abstract-products-and-product-bundles.html).

**Tips and tricks**
<br>To apply a translation to all the other locales, select ![copy to other languages icon](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Catalog/Attributes/Creating+product+attributes/copy-to-other-languages-icon.png) *Copy to other languages* next to the **TRANSLATION** you want to apply.

## Reference information: Create product attributes

| ATTRIBUTE |DESCRIPTION |
| --- | --- |
| ATTRIBUTE KEY | Name that you will use when [assigning the attribute to products](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/assign-product-attributes-to-abstract-products-and-product-bundles.html). For example, `color`. Accepts lower case letters, digits, numbers, underscores, hyphens, and colons. |
| INPUT TYPE | Defines the data format of the attribute's values. |
| SUPER ATTRIBUTE | Defines if the attribute is to be a [super attribute](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-feature-overview/product-attributes-overview.html#super-attributes). Super attributes distinguish product variants of an abstract product.  |
| PREDEFINED VALUES | Values that you will be selecting from when assigning the attribute to products. For example, if the attribute is `color`, the values can be `red`, `green`, `black`, etc. |
| ALLOW INPUT ANY VALUE OTHER THAN PREDEFINED ONES | Defines if, when creating or updating products, you can enter custom values that are not defined in **PREDEFINED VALUES**. |
| TRANSLATION | Translations for attribute keys and values per locale. These translations will be displayed on the Storefront.  |
| TRANSLATE PREDEFINED VALUES | Defines if predefined values are to be translated. |

## Next steps

* Assign the attribute to a new abstract product. For instructions, see [Create abstract products and product bundles](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/create-abstract-products-and-product-bundles.html).
* Assign the attribute to an existing abstract product. For instructions, see [Assign product attributes to abstract products](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/assign-product-attributes-to-abstract-products-and-product-bundles.html)
