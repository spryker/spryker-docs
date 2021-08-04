---
title: Creating a Product List
originalLink: https://documentation.spryker.com/v1/docs/creating-a-product-list
redirect_from:
  - /v1/docs/creating-a-product-list
  - /v1/docs/en/creating-a-product-list
---

This article describes the steps you need to perform in order to create a product list for a specific merchant relation.
***
The product lists can be considered as conditions under which the companies see the products in the online store. Let's say you want to hide a specific set of products, or even a category, from one of the companies with which you have a signed contract. You will create a blacklist for that purpose assigning those specific products to it.
***
To start working with the product lists, navigate to the **Products > Product Lists** section.
***
**Prerequisites**
You should have a merchant relationship set up in **Merchants** > **Merchant Relations** in order to create a product list.
***
**To create a product list:**
1. Click **Create Product List** in the top right corner of the **Overview of Product Lists** page.
    On the **Create a Product List** page you see the following tabs:
    * General Information
    * Assign Categories
    * Assign Products
2. In the **General Information** tab:
    1. Enter the title of the product list.
    2. Select a type of the product list, either Whitelist or Blacklist.
    3. The owner type is Merchant Relationship by default and currently the only option.
    4. In the _Merchant relationship_ drop-down list, select the **Merchant relationship** you are creating the product list for. The values are taken from the **Merchant** > **Merchant Relations** section and are displayed in the _[Merchant Name] - [Business Unit]_ format.
    {% info_block infoBox "Note" %}
Once the general information is added, you can save the changes and proceed to the other setup in a later event. In case you want to make a full setup at a time, click **Next** to proceed to the **Assign Categories** tab, or just click on it.
{% endinfo_block %}
3. In the **Categories** tab, select from one to many categories in the **Categories** field.
{% info_block infoBox "Note" %}
This step is optional as you can either add the categories to the list **OR** add specific products instead. You can also do both.
{% endinfo_block %}
    Click **Next** to proceed to the **Assign Products** tab, or just click on it.

4. In the **Assign Products** tab, do one of the following: 
    1. Click **Browse** in the **Import Product List** area. Select the file to be uploaded. The file should contain **product_list_key** and **concrete_sku**.
    **OR**
    2. In the **Select Products to assign** table, select the products that will be added to the list in the **Selected** column.
 5. Once you are satisfied with the setup, click **Save**.

***
**Tips & Tricks**
Assigning products and categories to product lists is optional during the product list creation. You can create a product list with no values assigned and update it in a later event.

When you assign products, you can use the search field to filter the products by entering **SKU** or **product name**.

Please note that if all concrete products belonging to the abstract one are selected the entire abstract product is also selected. If an abstract product is selected, all concrete products belonging to that abstract are also selected.
When you assign categories, in the **Categories** field, start typing the name of the Category you wish to assign to a product list. The auto-suggested matching results are reflected in the drop-down list. 
***
**What's next?**

* To learn what managing actions you can do with the product lists, see the [Managing Product Lists](/docs/scos/dev/user-guides/201811.0/back-office-user-guide/products/product-lists/managing-produc) article.
* To learn more about the attributes you select and enter while creating a product list, see the [Product Lists: Reference Information](/docs/scos/dev/user-guides/201811.0/back-office-user-guide/products/product-lists/references/product-lists-r) article.
