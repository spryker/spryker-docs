---
title: Reference information- product relations
originalLink: https://documentation.spryker.com/v6/docs/product-relations-reference-information
redirect_from:
  - /v6/docs/product-relations-reference-information
  - /v6/docs/en/product-relations-reference-information
---

This topic describes the reference information for working with product relations.
***
## Product relations page
On the page, you can see product relations, including the following information:

*     Product relation key
*     Abstract product SKU and name
*     Relation type: up-selling or related-products
*     Status of the product relation: Active or Inactive
*     Stores in which the product relation is displayed
*     Number of products assigned to the 
*     product relation

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Products/Products/Product+Relations/Product+Relations%3A+Reference+Information/202006.0/product-relations-list.png){height="" width=""}

On the page, you can do the following:

*     Create, view, edit or delete a product relation
*     Sort product relations by ID, Product Relation Key, Abstract SKU, Abstract Product Name, Relation type, Status, and # of Products
*     Search product relations by SKU, Product Relation Key, and Abstract Product Name 
***


## Create/Edit/View Product Relation pages
The following table describes the attributes you select and enter while creating, editing, and viewing a product relation.

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| **Product Relation Key** | Unique product relation identifier. |
| **Relation type** | Drop-down list with two options: Related products and Upselling. This defines the location of the *Similar Products* section on the product details page.|
| **Update regularly:**  | A checkbox that defines if the product catalog should be checked against the specified rules on a regular basis. New products fulfilling the rules are added to related products automatically. Existing related products that no longer fulfill the rules are removed automatically. |
| **Is active** | Option to activate (make visible on the Storefront) or deactivate (make it invisible on the Storefront) the product relation.|
| **Select product** | Table for selecting a product that owns the relation. |
| **Select stores** | Defines the stores the product relation is displayed in. | 

## Assigning Related Product Rules, Groups, and Types
The rules, as well as the group of rules, are used in order to specify the specific conditions under which this or that similar product should appear on the **Abstract Product** page, or in the cart.

Let's say you have a _Pen_ as an abstract product, and you need another abstract product _Pencil_ to be displayed as a similar product on the _Pen_ product details page. 

For this specific case, you will specify **Related products** as a relation type. As a rule, you can select from a wide range of abstract product attributes to specify, like SKU, category, size, and so on. You can also specify if the attribute you select is equal, greater, less (or any other value from the list) than a defined value:
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Products/Products/Product+Relations/Product+Relations%3A+Reference+Information/product-relations-reference.png){height="" width=""}

Or you can set the _Pencil_ abstract product to appear as a similar product for a _Pen_ in the cart (once the _Pen_ is actually added to the cart). For that, you will select Upselling as a Relation type and set the appropriate rule.

But if you have a specific requirement to display similar products for _Pen_ only if the SKU of a similar product is equal to some value and the brand is equal to a specific value, you will create a Group of rules:
![Group of rules](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Products/Products/Product+Relations/Product+Relations%3A+Reference+Information/group-of-rules.png){height="" width=""}

So the place where a similar product will appear is defined by the relation type value. While a similar product itself is defined by rules or group of rules.


