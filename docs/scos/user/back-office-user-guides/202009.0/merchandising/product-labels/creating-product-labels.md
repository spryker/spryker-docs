---
title: Creating product labels
description: Back Office guide for creating product labels.
last_updated: Sep 23, 2020
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v6/docs/creating-product-labels
originalArticleId: ddbd7e1f-fe5e-4319-8af3-37182c5e8e40
redirect_from:
  - /v6/docs/creating-product-labels
  - /v6/docs/en/creating-product-labels
related:
  - title: Product Labels feature overview
    link: docs/scos/user/features/page.version/product-labels-feature-overview.html
---

This topic describes how to create and activate product labels.

To start working with product labels, go to **Merchandising** > **Product Labels**.

---
1. On the *Overview of Product Labels* page, select **Create Product Label**.
2. In the *General* section of the *Create a Product Label* page, do the following:
    1. enter:
    * **Name**
    * **Front-end Reference**
    * **Priority**
    2. If you want to activate the product label, select **Is active**.
3. In the *Behavior* section, select:
    * **Valid From** and **Valid to** dates.
    * **Is exclusive** if you want the product label to be exclusive.
4. In the *Store relation* section, select stores in **Select Stores**.

{% info_block infoBox %}

Even if there is only one store in your shop, you still need to select it for the product label to be displayed on the Storefront.

{% endinfo_block %}

5. In the *Translations* section, enter **Name** for all the locales.
See [Product Label: References](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/product-labels/references/reference-information-product-labels.html) to learn about the attributes on this page.
6. Switch to the *Products* tab.
7. In the *Select* column, select one or more products to assign the label to. 

{% info_block warningBox %}

Make sure the selected products are listed in the *Selected products to assign ({number of products})* tab.

{% endinfo_block %}

8. Click **Save**.
The page refreshes to display the success message about product label creation.

**Tips and tricks**
* Below the table, click **Select All** to assign the label to all the products in the *Available products* tab.
* Filter the products in the *Available products* tab by entering its name, SKU, or category name in the **Search** field.
* In the *Selected* column of the *Selected products to assign ({number of products})*, click **Remove** to remove a selected product.


**What's next?**

* To learn how to edit product labels, see [Editing Product Labels](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/product-labels/managing-product-labels.html#editing-product-labels).
* To learn how you can manage product labels, see [Managing Product Labels](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/product-labels/managing-product-labels.html).
* To learn more about the attributes you select and enter while creating and managing labels, see [Product Labels: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/product-labels/references/reference-information-product-labels.html).


