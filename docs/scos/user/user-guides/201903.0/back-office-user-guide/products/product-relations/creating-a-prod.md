---
title: Creating a Product Relation
originalLink: https://documentation.spryker.com/v2/docs/creating-a-product-relation
redirect_from:
  - /v2/docs/creating-a-product-relation
  - /v2/docs/en/creating-a-product-relation
---

This topic describes the procedure that needs to be performed in order to create a product relation.
***
To start working with product relations, navigate to the **Products > Product Relations** section.
***
**To create a product relation:**
1. On the **Product Relations** page, click **Create Relation** in the top right corner.
2. On the **Add Product Relations** page > **Relation Type** tab:
    1. Either select the checkbox for **Update regularly** or leave the checkbox blank. 
    2. In the **Relation type** drop-down, select the type (Related products or Upselling). See [Product Relations: Reference Information](/docs/scos/dev/user-guides/201903.0/back-office-user-guide/products/product-relations/references/product-relatio) to know more about the product relation types and see some examples of how those types are used.
    3. In the **Select product** section, find an abstract product for which the relation needs to be added and click **Select** in the _Actions_ column.
    {% info_block infoBox "Tip" %}
To easily find the product in the table, you can enter the abstract product SKU or name into the **Search** field. You can add only one product here.
{% endinfo_block %}
3. Click **Next** to proceed to the **Assign Products** tab or just click on the tab. 
4. On the **Assign products** tab, in the **Assign related products** section:
    1. Click **Add rule** or **Add group**, depending on the conditions you want to specify. See [Product Relations: Reference Information](/docs/scos/dev/user-guides/201903.0/back-office-user-guide/products/product-relations/references/product-relatio) to know more about rules and groups.
    2. For your rule/group, select the **AND** or **OR** operator. You use AND operator if you need several conditions to be met, and OR if you need one or another condition to be met.
    3. Populate the required drop-downs and fields for your rule/group.
    4. Click **Save** so that your changes are saved and the table automatically updated to display the abstract product(s) that meet the specified rules/groups.
***
**Tips & Tricks**
You can delete a rule or group by clicking **Delete** for a specific entry.
When adding the query, you can check the products that meet those criteria. 

In the **Assign related products** table, click **View** to get to the **View Product Abstract** page, or **View > in Shop** to see the product in the online store.

While defining the rules for the products to be assigned, you select **Add group** in case you need a set of conditions to be met in order to display the **Similar Products** section.

**Add rule** is normally used when there is only one condition that should be met in order to display the **Similar Products** section for the abstract product. You can specify as many rules/groups as you need. 
***
You can add as many abstract products as you need.
**Activating a Product Relation**
Your product relation is created, but not active.

To activate the created product relation, click **Activate** in the top-right corner of the Edit Product Relations page.
***
**Tips & Tricks**
On this page, you also can:
* Click **View** in the _Actions_ column to view the assigned abstract product in Back Office. 
* Click **View in shop** to view the assigned abstract product in Yves. 
***
**What's next?**

* To know how the product relations can be managed, see the [Managing Product Relations](/docs/scos/dev/user-guides/201903.0/back-office-user-guide/products/product-relations/managing-produc) article.
* To know more about the attributes you select and enter while creating a product relation, see [Product Relations: Reference Information](/docs/scos/dev/user-guides/201903.0/back-office-user-guide/products/product-relations/references/product-relatio).
