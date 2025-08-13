---
title: Edit product attributes
description: Learn how to edit product attributes in the Spryker Cloud Commerce OS Back Office.
last_updated: June 2, 2022
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-attributes
originalArticleId: 98bec018-82ee-4960-aed5-fc13ad8429d5
redirect_from:
  - /2021080/docs/managing-attributes
  - /2021080/docs/en/managing-attributes
  - /docs/managing-attributes
  - /docs/en/managing-attributes
  - /docs/scos/user/back-office-user-guides/202200.0/catalog/attributes/managing-product-attributes.html
  - /docs/scos/user/back-office-user-guides/202311.0/catalog/attributes/managing-product-attributes.html  
  - /docs/pbc/all/product-information-management/202204.0/base-shop/manage-in-the-back-office/attributes/edit-product-attributes.html
related:
  - title: Product Attributes
    link: docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-feature-overview/product-attributes-overview.html
---

This doc describes how to edit product attributes.

## Prerequisites

Review the [reference information](#reference-information-edit-product-attributes) before you start, or look up the necessary information as you go through the process.

## Edit a product attribute

1. Go to **Catalog&nbsp;<span aria-label="and then">></span> Attributes**.
    This opens the **Attributes** page.
2. Next to the product attribute you want to edit, select **Edit**.
This opens the **Edit Product Attributes** page.
3. Update **PREDEFINED VALUES**:
    - Enter and select the values you want to add.
    - Next to the values you want to remove, select **x**.
4. For **ALLOW INPUT ANY VALUE OTHER THAN PREDEFINED ONES**, do one of the following:
    - To start accepting custom values for this attribute, select the checkbox.
    - To stop accepting custom values for this attribute, clear the checkbox.
5. Select **Save**.
    This opens the **2. Translations** tab with a success message displayed.
6. For the **ATTRIBUTE KEY** of each locale, enter a **TRANSLATION**.
7. For **TRANSLATE PREDEFINED VALUES**, do one of the following:
    - To add translations for attribute values, select the checkbox.
    - To remove translations for attribute values, clear the checkbox.
8. If you selected **TRANSLATE PREDEFINED VALUES**, for all the attribute values of each locale, enter a **TRANSLATION**.
9. Click **Save**.
    This opens the **View Product Attribute** page with a success message displayed. Here you can see the updated attribute.

**Tips and tricks**
<br>To apply a translation to all the other locales, select ![copy to other languages icon](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Catalog/Attributes/Creating+product+attributes/copy-to-other-languages-icon.png) *Copy to other languages* next to the **Translation** you want to apply.

## Reference information: Edit product attributes

| ATTRIBUTE |DESCRIPTION |
| --- | --- |
| ATTRIBUTE KEY | Name that you use when [assigning the attribute to products](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/assign-product-attributes-to-abstract-products-and-product-bundles.html). |
| INPUT TYPE | Defines the data format of the attribute's values. |
| SUPER ATTRIBUTE | Defines if the attribute is a [super attribute](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-feature-overview/product-attributes-overview.html#super-attributes). Super attributes distinguish product variants of an abstract product.  |
| PREDEFINED VALUES | Values that you select from when assigning the attribute to products. For example, if the attribute is `color`, the values can be `red`, `green`, `black`, etc. |
| ALLOW INPUT ANY VALUE OTHER THAN PREDEFINED ONES | Defines if, when creating or updating products, you can enter custom values that are not defined in **PREDEFINED VALUES**. |
| TRANSLATION | Translations for attribute keys and values per locale. These translations are displayed on the Storefront.  |
| TRANSLATE PREDEFINED VALUES | Defines if predefined values are translated. |
