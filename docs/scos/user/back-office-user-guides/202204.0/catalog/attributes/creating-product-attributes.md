---
title: Create product attributes
description: Learn how to create product attributes in the Back Office.
last_updated: Aug 11, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/creating-product-attributes
originalArticleId: 1b1f5ddd-b2e3-4095-a1e0-abb9b298fd46
redirect_from:
  - /2021080/docs/creating-product-attributes
  - /2021080/docs/en/creating-product-attributes
  - /docs/creating-product-attributes
  - /docs/en/creating-product-attributes
  - /docs/scos/user/back-office-user-guides/202200.0/catalog/attributes/creating-product-attributes.html
  - /docs/scos/user/back-office-user-guides/202204.0/catalog/attributes/creating-product-attributes.html  
related:
  - title: Product Attributes
    link: docs/scos/user/features/page.version/product-feature-overview/product-attributes-overview.html
---

This doc describes how to create product attributes in the Back Office.

A new product usually needs a super attribute and a regular attribute. The super attribute is used to distinguish product variants and the regular attribute is used to define product characteristics.

## Prerequisites

To start working with attributes, go to **Catalog&nbsp;<span aria-label="and then">></span> Attributes**.

Review the reference information before you start, or look up the necessary information as you go through the process.

## Create a product attribute

1. On the **Attributes** page, click **Create Product Attribute**.
2. On the **Create a Product Attribute** page, enter an **ATTRIBUTE KEY**.
3. Select an **INPUT TYPE**.
4. Optional: To make this attribute a supper attribute, select the **SUPER ATTRIBUTE** checkbox.
    This disables the **ALLOW INPUT ANY VALUE OTHER THAN PREDEFINED ONES** checkbox because a super attribute can have only predefined values.
5. In the **PREDEFINED VALUES** field, enter a predefined value and press `Enter`.
6. Repeat the previous step until you add all the needed predefined values.
7. Optional: To allow adding the values that are different from the predefined ones, select **ALLOW INPUT ANY VALUE OTHER THAN PREDEFINED ONES**.
8. Select **Save**.
    This opens the **2. Translations** tab.
9. In the **2. Translations** tab, enter a **TRANSLATION** for each locale.
10. Optional: To localize predefined parameter values, do the following:
    1. Select **TRANSLATE PREDEFINED VALUES**.
    2. Enter a **Translation** for the predefined parameter values for all the locales.
11. Click **Save**.
    This opens the **View Product Attribute** page with a success message displayed. Now you can use this attribute for [creating abstract products](/docs/scos/user/back-office-user-guides/202204.0/catalog/products/manage-abstract-products/creating-abstract-products-and-product-bundles.html).

**Tips and tricks**
<br>To apply a translation to all the other locales, select ![copy to other languages icon](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Catalog/Attributes/Creating+product+attributes/copy-to-other-languages-icon.png) *Copy to other languages* next to the **TRANSLATION** you want to apply.

## Reference information: Create product attributes

| ATTRIBUTE |DESCRIPTION |
| --- | --- |
| ATTRIBUTE KEY |  Name of the attribute you create, for example, `color`. Accepts lower case letters, digits, numbers, underscores, hyphens, and colons. |
| INPUT TYPE | Defines the data format of the of the attribute value. |
| Super attribute | Defined if the product attribute is a super attribute. Super attributes distinguish concrete products of an abstract product.  |
| PREDEFINED VALUES | Values for you attribute, e.g., if the attribute you create is a *color*, the values for it can be _red_, _green_, _black_, etc. |
| ALLOW INPUT ANY VALUE OTHER THAN PREDEFINED ONES | Checkbox that defines whether you can enter the values other than the predefined ones when creating or updating a product variant. |
| TRANSLATION | Translation for either an attribute key into the other language based on the locales for which you add the translation.|
| TRANSLATE PREDEFINED VALUES | Checkbox that defines if the predefined values will also be translated. If selected, the predefined value itself and the *Translation* field for it appears. |

The super attributes are displayed in the *Variants* tab of the *Create a Product* page of an abstract product.
![Create a product](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Products/Products/Attributes/Attributes:+Reference+Information/create-product.png)

Once you select any super attribute, you will be able to select among its values.
![Select a superattribute](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Products/Products/Attributes/Attributes:+Reference+Information/select-superattribute.png)

The descriptive attributes are displayed on the *Attribute Management* page of the abstract and concrete product. Unlike the super attributes that are defined during the abstract product creation, the descriptive attributes can be added and removed at any point in time.
![Attribute management](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Products/Products/Attributes/Attributes:+Reference+Information/attribute-management.png)

In the online store, the descriptive attributes are displayed on the product details page of a specific product:
![Descriptive attributes](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Products/Products/Attributes/Attributes:+Reference+Information/descriptive-attributes.png)

## Next steps
* Assign the attribute to a new abstract product. For instructions, see [Create abstract products and product bundles](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-abstract-products/creating-abstract-products-and-product-bundles.html).
* Assign the attribute to an existing abstract product. For instructions, see [Assign product attributes to abstract products](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-abstract-products/assign-product-attributes-to-abstract-products.html)
