---
title: Creating a Product Attribute
originalLink: https://documentation.spryker.com/v5/docs/creating-a-product-attribute
redirect_from:
  - /v5/docs/creating-a-product-attribute
  - /v5/docs/en/creating-a-product-attribute
---

This topic describes how to create a product attribute.

To start working with attributes, go to **Catalog > Attributes**.

For a new product in your store, you need to create both super attribute and product attribute. The first one is needed to define the product variants and the second one to define the product characteristics.
***
**To create a new product attribute:**
1. On the **Product Attributes** page, click **Create Product Attributes**.
2. On the **Create a Product Attribute** page:
    1. In the **Attribute Key** field, add a new attribute to the product.
    {% info_block warningBox "Note" %}
Keep in mind that it should not contain any special symbols.
{% endinfo_block %}
    2. In the **Input type** drop-down list, select the type of data input.
    3. Select the **Super attribute** checkbox to create a super attribute OR do not select the checkbox if you are creating a product descriptive attribute.
    When the check box is selected, the **Allow input any value other than predefined** option becomes disabled as a super attribute always uses predefined values.
    4. In the **Predefined Values** field, add from one to many values by typing them and clicking **Enter** after each.
    5. Select the **Allow input any value other than predefined ones** checkbox if you want to allow adding  values different than the predefined ones.
3. Click **Save**.
    Once Save is selected, the **Translation** tab becomes enabled.
4. In the **Translations** tab, add the translation for your attribute key.
5. Click **Save**.

**Tips & Tricks**
If you want to apply this translation to other languages, click **Copy to other languages** icon next to the translation field.
***
**What's next?**
Learn how the product attributes are managed in the [Managing Product Attributes](https://documentation.spryker.com/docs/en/managing-attributes) article. 

Review the [References](https://documentation.spryker.com/docs/en/attributes-reference-information) section to learn more about the attributes you populate for the Attribute entity and the examples of how the attributes are used. 

