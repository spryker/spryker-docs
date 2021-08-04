---
title: Managing Product Relations
originalLink: https://documentation.spryker.com/v1/docs/managing-product-relations
redirect_from:
  - /v1/docs/managing-product-relations
  - /v1/docs/en/managing-product-relations
---

This topic describes the managing actions that you can perform with the product options.
***
To start managing product options, navigate to the **Products > Product Options** section.
***
## Editing a Product Relation
**To edit a product relation:**

1. On the **Product relations** page, select **Edit** in the _Actions_ column for the relation you want to edit.
2. On the **Edit Product Relation** page > **Relation type** tab, you can only update the relation type for the abstract product.
3. On the **Assign Products** tab, you can update the **Assign related products** section by deleting, adding, or updating the rules and group of rules. 
4. Once done, click **Save**.

## Activating, Deactivating and Deleting Product Relations
**To activate, deactivate, or delete a product relation:**
1. On the **Product relations** page, find a specific relation. 
2. In the _Actions_ column, select one of the following:
    1. **Activate** to activate the relation. Once selected the Status is changed to _Active_.
    2. **Deactivate** to deactivate the product relation. Once selected the Status is changed to _Inactive_.
    3. **Delete** to delete the product relation. Once selected, the relation is deleted from the system.

## Viewing a Product Relation
There are 2 places where you can view the product relation:
* In the Back Office
* In the online store

**To view a product relation in the Back Office:**
1. On the **Product Relations** page, click **View** in the _Actions_ column for a specific product relation. 
2. On the View Product Relation page that opens, you can see the following details:
    * **General Information:** if this relation is in Active state, what is the relation type, what is the SKU and name of the abstract product for which the relation is created. The preview image is also available.
    * **Related products:** number, SKU, name, price, category and the status of the abstract product(s) that is defined to be a similar one.

**To view a product relation in the online store:**
1. On the **Product Relations** page, click **View in Shop** in the _Actions_ column for a specific product relation. 
    You are redirected to the abstract product PDP. 
2. On the PDP of an abstract product, scroll down to the Similar products section to see what products are assigned to it as "similars."
![Product relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Products/Products/Product+Relations/Managing+Product+Relations/product-relations.png){height="" width=""}

***
**Tips & Tricks**
When you select the **View in Shop** option, keep the following in mind:
* No matter what relation type is, you will be redirected to the abstract PDP page. So if the relation type is upselling, you will not be able to see the **Similar products** section until you add the product to cart and actually navigate to that cart.
* The relation you want to view in the online store must be active. If inactive, you will be redirected to the PDP, but there will be no **Similar products** section for the abstract product. The same applies to upselling.
***
**What's next?**
To learn about the attributes that you select and enter while managing product relations, see [Product Relations: Reference Information](/docs/scos/dev/user-guides/201811.0/back-office-user-guide/products/product-relations/references/product-relatio).
