---
title: Creating product attributes
description: Learn how to create product attributes in the Back Office.
last_updated: Apr 22, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v6/docs/creating-product-attributes
originalArticleId: 1f6c5ff9-53b8-4573-b816-21a79aad0c57
redirect_from:
  - /v6/docs/creating-product-attributes
  - /v6/docs/en/creating-product-attributes
related:
  - title: Product Attributes
    link: docs/scos/user/features/page.version/product-feature-overview/product-attributes-overview.html
---

This document describes how to create product attributes.

To start working with attributes, go to **Catalog** > **Attributes**.

A new product usually needs a super attribute and a regular attribute. The super attribued is used to distinguish product variants and the regular attribued is used to define product characteristics.
***

**To create a product attribute:**
1. On the *Attributes* page, select **+ Create Product Attribute**.
2. On the *Create a Product Attribute* page, enter an **Attribute Key**.
{% info_block warningBox "Attribute key format" %}
The **Attribute Key** field accepts lower case letters, digits, numbers, underscores, hyphens, and colons.
{% endinfo_block %}
3. Select an **Input type**.
4. To make this attribute a supper attribute, select the **Super attribute** checkbox.
    This disables the **Allow input any value other than predefined** checkbox because a super attribute always uses predefined values.
5. In the **Predefined Values** field, enter a desired predefined value and press `Enter`.
6. Repeat the previous step until you add all the desired predefined values.
7. To allow adding the values that are different from the predefined ones, select **Allow input any value other than predefined ones**.
8. Select **Save**.
    This takes you to the **2. Translations** tab.
9. In the **2. Translations** tab, enter a **Translation** for the attribute key for all the locales.
10. Optional: Localize predefined parameter values:
    1. Select **Translate predefined values**.
    2. Enter a **Translation** for the predefined parameter values for all the locales.
11. Select **Save**.
    This takes you to the *View Product Attribute* page with the success message displayed.

**Tips and tricks**
To apply a translation to all the other locales, select ![copy to other languages icon](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Catalog/Attributes/Creating+product+attributes/copy-to-other-languages-icon.png) *Copy to other languages* next to the **Translation** you want to apply.
***

## Next steps
* Learn how to [manage the product attributes](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/attributes/managing-product-attributes.html). 
* Learn about the attributes used to created product attributes in [Reference information: product attributes](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/attributes/references/reference-information-attributes.html).

