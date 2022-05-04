---
title: Managing product attributes
description: Use the Managing Attributes procedures to view and updated product attributes in the Back Office.
last_updated: Apr 22, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v6/docs/managing-attributes
originalArticleId: f8bb80e7-5ff2-406e-97cf-4e3391cf9d99
redirect_from:
  - /v6/docs/managing-attributes
  - /v6/docs/en/managing-attributes
related:
  - title: Product Attributes
    link: docs/scos/user/features/page.version/product-feature-overview/product-attributes-overview.html
---

This topic describes how to manage product attributes.

To start managing attributes, go to **Catalog** > **Attributes**.


***
## Viewing product attributes

To view a product attribute, select **View** next to the product attribute you want to view. 

On the *View Product Attributes* page that opens, you can see the general information of the attribute, its predefined values, and translations.

To edit the product attribute, select **Edit** in the top right corner of the page.

## Editing product attributes

To edit a product attribute:
1. Select **Edit** next to the product attribute you want to edit. 
    On the *Edit Product Attributes* page that opends, the **Attribute Key**, **Input type**, and **Super attribute** are disabled. You can define them only when [creating a product attribute](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/attributes/creating-product-attributes.html).
2. Update **Predefined Values**:
    * Delete one or more predefined values by selecting **x** next to the each value you want to remove.
    * Add predefined values:
        1. Enter a predefined value and press `Enter`.
        2.  Repeat the previous step until you add all the desired values.


3. Select **Save**.
    This takes you to the **2. Translations** tab with the success message displayed. 
4. Update translations:
    * Update the **Translation** of the desired attribute keys for the desired locales.
    * Update the **Translation** of the desired predefined attribute values for the desired locales.
    * To localize predefined parameter values:
        1. Select **Translate predefined values**.
        2. Enter a **Translation** for the predefined parameter values for all the locales.
    * To delocalize all the predefined parameter values for all the locales, clear the **Translate predefined values** checkbox.
5. Select **Save**.
    This takes you to the *View Product Attribute* page with the success message displayed.

**Tips and tricks**
To apply a translation to all the other locales, select ![copy to other languages icon](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Catalog/Attributes/Creating+product+attributes/copy-to-other-languages-icon.png) *Copy to other languages* next to the **Translation** you want to apply.
***

