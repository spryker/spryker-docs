---
title: Product Relations- Reference Information
originalLink: https://documentation.spryker.com/v2/docs/product-relations-reference-information
redirect_from:
  - /v2/docs/product-relations-reference-information
  - /v2/docs/en/product-relations-reference-information
---

This topic describes the attributes you select and enter while creating or managing product relations.
***
## Product relations page
On the **Product relations** page, the following information is presented in a tabled view for each product relation:

* Product relation order number
* Abstract product SKU and name
* Relation type (either up-selling or related-products)
* The number of products assigned to this product relation
* The status of the product relation (either Active or Inactive)
* The actions that you can perform fora specific product relation (View, View in Shop, Edit, Activate/Deactivate, Delete)

By default, the table is sorted by the order number column. You can sort the table by any of the available columns, except for the _Actions_ column.

## Create New Product Relation page
The following table describes the attributes that you select and enter while creating a new product relation.

| Attribute | Description |
| --- | --- |
| **Update regularly:**  | A checkbox that, once selected, the product relation will be updated automatically on a regular basis according to the relation's conditions.|
| **Relation type** | A drop-down list that allows you to select the type of product relation that needs to be created - Related products, or Upselling. This defines where the similar products section is going to be displayed.|
| **Select product** | A table where all products available for selection are listed.|
| **Assign related products** | A set of rules under which the products will be included in a similar section. The query contains the following parameters: _attribute_ + _operator_ + _value_.|

## Assigning Related Product Rules, Groups, and Types
The rules, as well as the group of rules, are used in order to specify the specific conditions under which this or that similar product should appear on the **Abstract Product** page, or in the cart.

Let's say you have a _Pen_ as an abstract product, and you need another abstract product _Pencil_ to be displayed as a similar product on the _Pen_ product details page. 

For this specific case, you will specify **Related products** as a relation type. As a rule, you can select from a wide range of abstract product attributes to specify, like SKU, category, size, and so on. You can also specify if the attribute you select is equal, greater, less (or any other value from the list) than a defined value:
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Products/Products/Product+Relations/Product+Relations%3A+Reference+Information/product-relations-reference.png){height="" width=""}

Or you can set the _Pencil_ abstract product to appear as a similar product for a _Pen_ in the cart (once the _Pen_ is actually added to the cart). For that, you will select Upselling as a Relation type and set the appropriate rule.

But if you have a specific requirement to display similar products for _Pen_ only if the SKU of a similar product is equal to some value and the brand is equal to a specific value, you will create a Group of rules:
![Group of rules](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Products/Products/Product+Relations/Product+Relations%3A+Reference+Information/group-of-rules.png){height="" width=""}

So the place where a similar product will appear is defined by the relation type value. While a similar product itself is defined by rules or group of rules.

**Related Products Relation type:**
![Related products relation type](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Products/Products/Product+Relations/Product+Relations%3A+Reference+Information/related-products-in-product-relation.gif){height="" width=""}

**Upselling Relation Type**
![Upselling relation type](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Products/Products/Product+Relations/Product+Relations%3A+Reference+Information/upselling-relation-type.gif){height="" width=""}
