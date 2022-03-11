---
title: Creating product relations
description: Use this procedure to create a product relation and enter all the required values in the Back Office.
last_updated: Jul 30, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/creating-product-relations
originalArticleId: 3e17c514-3483-4419-8e1d-d9ae1ecbd97c
redirect_from:
  - /2021080/docs/creating-product-relations
  - /2021080/docs/en/creating-product-relations
  - /docs/creating-product-relations
  - /docs/en/creating-product-relations
related:
  - title: Product Relations Feature Overview
    link: docs/scos/user/features/page.version/product-relations-feature-overview.html
---

This topic describes how you create a product relation.

## Prerequisites

To start working with product relations, go to **Merchandising** > **Product Relations**.

## Creating product relations

To create a product relation:
1. On the *Product Relations* page, in the top right corner, click **Create Product Relation**. The *Create Product Relation* page opens.
2. In  the *General* section of the *Settings* tab, do the following:
    * Enter a **Product Relation Key**.
    * Select a **Relation type**.
    * Select **Update regularly** for the related products to be updated automatically on a regular basis according to the product relation's rules.
    * Select the **Is active** checkbox to activate the product relation (to make it visible on the Storefront).
3. In the *Product owning the relation* section,  next to the products you want to create a product relation with, click **Select**.

4. In the *Store relation* section, select the stores you want the product relation to be displayed in.

5. Switch to the *Products* tab or click **Next**.

6. Click **Add rule** or **Add group**, depending on the conditions you want to specify. To learn more about rules, see [Related product rules](/docs/scos/user/features/{{page.version}}/product-relations-feature-overview.html#related-product-rules).  

7. For the rule/group, select the operator:
    * **AND**: the selected products are displayed if all the specified conditions are fulfilled
    * **OR**: the selected products are displayed if at least one of the specified conditions is fulfilled

8. Populate the required drop-downs and fields for the rule/group.

9. To keep the changes, click **Save**. The table is automatically updated to display the abstract product that fulfills the specified rules/groups.

**Tips and tricks**

* If you want a product relation to be displayed on the *Product details* page or the *Cart* page, define at least one **Store relation**.
* Filter the products in the *Select product* table by entering a product name or SKU in the **Search** field.
* You can delete a rule or group by clicking **Delete** for a specific entry.
* Go back to the *Product Relation* page by clicking **List of product relations** in the top right corner.

{% info_block warningBox "Saving changes" %}

Make sure to click **Save** before clicking **List of product relations** or going to any other Back Office section. Otherwise, the changes are discarded.  

{% endinfo_block %}

For reference information, see [Reference information: Creating, editing, and viewing product relations](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/product-relations/managing-product-relations.html#reference-information-creating-editing-and-viewing-product-relations)

**What's next?**

To learn more about how to edit, view, or delete a product relation, see [Managing product relations](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/product-relations/managing-product-relations.html).
