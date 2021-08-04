---
title: Creating a Product Label
originalLink: https://documentation.spryker.com/v2/docs/creating-a-product-label
redirect_from:
  - /v2/docs/creating-a-product-label
  - /v2/docs/en/creating-a-product-label
---

This topic describes how you create and activate product labels.
***
To start working with product labels, navigate to **Products > Product Labels**.
***
When you add a product and add the valid from/to dates, you trigger a dynamic label **New** to be assigned to this product.
But if you want to add another eye-catching label to the product, you need to create it first. Please note, the labels have the priorities. The newly created label will always have the lowest priority and will be displayed at the end of all the attributes already assigned to a product until you have prioritized them.
***
**To create a product label:**

1. In the top right corner of the **Product Labels** page, click **Create Product Label**.
2. On the **Create the Product Label** page > **General Information** tab, do the following:
        1. Enter the name of your label in the **Name** field.
        2. **Optional:** You can activate the product right away by selecting the **Is Active** checkbox.
        3. **Optional:** If you want this label to be the only one displayed for a product, select the **Is Exclusive** checkbox. Even if you have other labels assigned, only the exclusive one will be displayed.
        4. **Optional:** Define the validity period for the label by setting the valid from and to dates.
        5. **Optional:** The **Front-end Reference** defines the location and the look of a product label.
        6. **Optional:** If needed, define the translations for each locale setup in your store.
3. Switch to the **Products** tab. 
4. In the **Available products** table, define the product(s) to which this label needs to be assigned by selecting respective checkboxes in the _Select_ column. 
5. Once done, click **Save**.
***
**Tips & Tricks**
* If a product has one exclusive and no or several non-exclusive labels, only the exclusive one is applied to the product.
* If you want to assign labels to all products in the table, click **Select All**.
* To find a specific product or filter products by categories or name, start typing in the Search field. The list of matching items would be displayed.
***
If you did not select the **Is Active** checkbox while creating the label, your label will be inactive. 
***
**To activate the label:**
1. You can edit the label and select the respective checkbox
**OR**
3. On the **Overview of Product Label** page, click **Activate** in the _Actions_ column.

The same applies if you want to deactivate the label. Clear the checkbox on the **Edit** page, or click **Deactivate** in the _Actions_ column.
***
**What's next?**

* To learn how the product labels are managed, see [Managing Product Labels](/docs/scos/dev/user-guides/201903.0/back-office-user-guide/products/product-labels/managing-produc). 
* To learn how you can prioritize the labels, see [Prioritizing Labels](/docs/scos/dev/user-guides/201903.0/back-office-user-guide/products/product-labels/prioritizing-la).
* To learn more about the attributes you select and enter while creating or managing the labels or see some examples of product labels, see the [References](/docs/scos/dev/user-guides/201903.0/back-office-user-guide/products/product-labels/references/product-labels-) section.
