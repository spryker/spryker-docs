---
title: Managing product attributes
originalLink: https://documentation.spryker.com/2021080/docs/managing-attributes
redirect_from:
  - /2021080/docs/managing-attributes
  - /2021080/docs/en/managing-attributes
---

This topic describes how to manage product attributes.

## Prerequisites

To start managing attributes, go to **Catalog** > **Attributes**.

Review the reference information before you start, or just look up the necessary information as you go through the process.

## Viewing product attributes

To view a product attribute, select **View** next to the product attribute you want to view. 

On the *View Product Attributes* page that opens, you can see the general information of the attribute, its predefined values, and translations.

To edit the product attribute, select **Edit** in the top right corner of the page.

## Editing product attributes

To edit a product attribute:
1. Select **Edit** next to the product attribute you want to edit. 
    On the *Edit Product Attributes* page that opends, the **Attribute Key**, **Input type**, and **Super attribute** are disabled. You can define them only when [creating a product attribute](https://documentation.spryker.com/docs/creating-product-attributes).
2. Update **Predefined Values**:
    * Delete one or more predefined values by selecting **x** next to the each value you want to remove.
    * Add predefined values:
        1. Enter a predefined value and press `Enter`.
        2.  Repeat the previous step until you add all the desired values.


3. Select **Save**.
    This takes you to the *2. Translations* tab with the success message displayed. 
4. Update translations:
    * Update the **Translation** of the desired attribute keys for the desired locales.
    * Update the **Translation** of the desired predefined attribute values for the desired locales.
    * To localize predefined parameter values:
        1. Select **Translate predefined values**.
        2. Enter a **Translation** for the predefined parameter values for all the locales.
    * To delocalize all the predefined parameter values for all the locales, clear the **Translate predefined values** checkbox.
5. Select **Save**.
    This takes you to the *View Product Attribute* page with the success message displayed.

**Tips & tricks**
To apply a translation to all the other locales, select ![copy to other languages icon](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Catalog/Attributes/Creating+product+attributes/copy-to-other-languages-icon.png) *Copy to other languages* next to the **Translation** you want to apply.

### Reference information: Editing product attributes

This section describes attributes that you see, select and enter when editing product attributes.

| ATTRIBUTE |DESCRIPTION |
| --- | --- |
| Attribute Key |  Name of the attribute, for example, `color`. |
| Input type | Ddata format of the of the attribute value. |
| Super attribute | Defined if the product attribute is a super attribute. Super attributes distinguish concrete products of an abstract product.  |
| Predefined values | Values for you attribute, e.g., if the attribute is a *color*, the values for it can be _red_, _green_, _black_, etc. |
| Allow input any value other than predefined ones | Checkbox that defines whether you can enter the values other than the predefined ones when creating or updating a product variant. |
| Translation | Translation for either an attribute key into the other language based on the locales for which you add the translation.|
| Translate predefined values | Checkbox that defines if the predefined values will also be translated. If selected, the predefined value itself and the *Translation* field for it appears. |

