---
title: Managing product relations
originalLink: https://documentation.spryker.com/2021080/docs/managing-product-relations
redirect_from:
  - /2021080/docs/managing-product-relations
  - /2021080/docs/en/managing-product-relations
---

This topic describes how you manage product relations.

## Prerequisites

To start working with product relations, go to **Merchandising** > **Product Relations**.

Review the reference information before you start, or just look up the necessary information as you go through the process.

## Viewing product relations

To view a product relation,  in the **Actions** column, click **View** next to the product relation you want to view. 

On the *View Product Relation: [Product relation key]* page, you can see the information:

* Product relation key and its relation type.
* Stores in which the product relation is displayed.
* The abstract product the relation is displayed for.
 Number, SKU, name, price, category, and the status of the related products.

**Tips & tricks**

In the upper right corner of the page, click:
* **Edit**:  To edit the product relation you are viewing.
* **List of product relations**: To return to the list of product relations.

For reference information, see [Reference information: Creating, editing, and viewing product relations](#reference-information-creating-editing-and-viewing-product-relations)

## Editing product relations

To edit a product relation:
1. On the *Product relations* page in the **Actions** column, click **Edit** next to the product relation you want to edit. The *Edit Product Relation: [Product Relation Key]* page opens.

2. Update the attributes in the *Settings* and *Products* tabs.

3. To keep the changes, click **Save**.

**Tips & tricks**
To return to the list of product relations, in the upper right corner of the page, click **List of product relations**

{% info_block warningBox "Saving changes" %}

Make sure to click **Save** before clicking **List of product relations** or going to any other Back Office section. Otherwise, the changes are discarded.  

{% endinfo_block %}

<a id="reference-information-creating-editing-and-viewing-product-relations"></a>

### Reference information: Creating, editing, and viewing product relations

This section describes the attributes you select and enter while creating, editing, and viewing product relations.

#### Product Relations page

On the *Product Relations* page, you can see product relations, including the following information:

* Product relation key
* Abstract product SKU and name
* Relation type: up-selling or related-products
* Status of the product relation: Active or Inactive
* Stores in which the product relation is displayed
* Number of products assigned to the 
* Product relation

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Products/Products/Product+Relations/Product+Relations%3A+Reference+Information/202006.0/product-relations-list.png)

On the *Product Relations* page, you can do the following:
* Create, view, edit or delete a product relation.
* Sort product relations by ID, Product Relation Key, Abstract SKU, Abstract Product Name, Relation type, Status, and # of Products.
* Search product relations by SKU, Product Relation Key, and Abstract Product Name.


#### Create/Edit/View Product Relation: [Product Relation ID] page

The following table describes the attributes you select and enter while creating (the *Create Product Relation: [Product Relation ID]* page), editing (the *Edit View Product Relation: [Product Relation ID]* page), and viewing (the *View Product Relation: [Product Relation ID]* page) a product relation:

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Product Relation Key | Unique product relation identifier. |
| Relation type | Drop-down list with two options: Related products and Upselling. This defines the location of the *Similar Products* section on the product details page.|
| Update regularly:  | Checkbox that defines if the product catalog should be checked against the specified rules on a regular basis. New products fulfilling the rules are added to related products automatically. Existing related products that no longer fulfill the rules are removed automatically. |
| Is active | Option to activate (make visible on the Storefront) or deactivate (make it invisible on the Storefront) the product relation.|
| Select product | Table for selecting a product that owns the relation. |
| Select stores | Defines the stores the product relation is displayed in. | 

#### Assigning related product rules, groups, and types

The rules and the group of rules are used to specify the specific conditions under which this or that similar product should appear on the *Abstract Product* page or in the cart.

Let's say you have a _Pen_ as an abstract product, and you need another abstract product _Pencil_ to be displayed as a similar product on the _Pen_ product details page. 

For this specific case, you will specify **Related products** as a relation type. As a rule, you can select from a wide range of abstract product attributes to specify, like SKU, category, size, and so on. You can also specify if the attribute you select is equal, greater, less (or any other value from the list) than a defined value:
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Products/Products/Product+Relations/Product+Relations%3A+Reference+Information/product-relations-reference.png)

Or you can set the _Pencil_ abstract product to appear as a similar product for a _Pen_ in the cart (once the _Pen_ is actually added to the cart). For that, you will select Upselling as a Relation type and set the appropriate rule.

However, if you have a specific requirement to display similar products for _Pen_ only if the SKU of a similar product is equal to some value and the brand is equal to a specific value, you will create a Group of rules:
![Group of rules](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Products/Products/Product+Relations/Product+Relations%3A+Reference+Information/group-of-rules.png)

So the place where a similar product will appear is defined by the relation type value. Whereas a similar product itself is defined by rules or a group of rules.

## Deleting product relations

To delete a product relation:
1. In the *Actions* column, click **Delete** next to the product relation you want to delete. 
2. On the *Delete Product Relation* page, click:
    * **No, I want to keep this product relation** to cancel the deletion.
    * **Yes, delete this product relation** to confirm the deletion. This deletes the product relation and redirects you to the updated list of product relations.

