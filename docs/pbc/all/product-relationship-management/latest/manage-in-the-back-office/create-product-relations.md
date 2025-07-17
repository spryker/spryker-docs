---
title: Create product relations
description: Learn how to create product relations in the Spryker Cloud Commerce OS Back Office.
last_updated: Jul 30, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/creating-product-relations
originalArticleId: 3e17c514-3483-4419-8e1d-d9ae1ecbd97c
redirect_from:
  - /2021080/docs/creating-product-relations
  - /2021080/docs/en/creating-product-relations
  - /docs/creating-product-relations
  - /docs/en/creating-product-relations
  - /docs/scos/user/back-office-user-guides/202204.0/merchandising/product-relations/create-product-relations.html
related:
  - title: Edit product relations
    link: docs/pbc/all/product-relationship-management/page.version/manage-in-the-back-office/edit-product-relations.html
  - title: View product relations
    link: docs/pbc/all/product-relationship-management/page.version/manage-in-the-back-office/view-product-relations.html
  - title: Product Relations feature overview
    link: docs/pbc/all/product-relationship-management/page.version/product-relationship-management.html
---

This document describes how to create product relations in the Back Office.

## Prerequisites

1. Learn how [related product rules](/docs/pbc/all/product-relationship-management/latest/product-relationship-management.html#related-product-rules) work.
2. If you are new to product relations, you might want to start with [Best practices: Promote products with product relations](/docs/pbc/all/product-relationship-management/latest/manage-in-the-back-office/best-practices-promote-products-with-product-relations.html).
3. To start working with product relations, go to **Merchandising&nbsp;<span aria-label="and then">></span> Product Relations**.

## Define general settings of a product relation

1. On the **Product Relations** page, click **Create Product Relation**.
    The **Create Product Relation** page opens.
2. Enter a **PRODUCT RELATION KEY**.
3. Select a **RELATION TYPE**.
4. For the related products to be updated automatically on a regular basis according to the product relation's rules, select the **UPDATE REGULARLY** checkbox.
5. To activate the product relation after creating it, select the **IS ACTIVE** checkbox.
6. In the **Product owning the relation** pane, next to the product you want to display related products for, click **Select**.

7. In the **Store relation** pane, select the stores you want the product relation to be displayed in.

8. Сlick **Next**.

## Define related products by adding condition rules

In the **Products** tab, you need to define the condition rules. Based on the rules, products are automatically selected to be displayed as related products.

You can define conditions using one rule or by combining rules into groups and sub-groups. When you open the **Products** tab, there is a pre-added rule. The rule is in a box, which is the root group.

The **AND** and **OR** combination operators are used to combine rules in each group. Currently they are greyed out because there is only one rule in the group. To add one more rule to this group, click **Add rule**. This adds one more rule entry and the operators for this group become active. Based on how you can combine these rules, click one of the operators.

To add a subgroup, click **Add group**. Inside the main box, this adds a separate box with its own operators and a pre-added rule. The rules in this sub-group combined will be used as a single rule when combining it with the rules in the root group.

To define a rule, select a parameter, a relation operator, and a value.

Add the needed rules and groups based on your requirements.


## Reference information: Create product relations

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| PRODUCT RELATION KEY | Unique product relation identifier. |
| RELATION TYPE | Defines how the product relation will be displayed on the Storefront: <ul><li>**Related products**: related products are displayed on the product details page of the product owning the relation.</li><li>**Upselling**: when the product owning the relation is added to cart, related products are displayed on the cart page.</li></ul>|
| UPDATE REGULARLY  | Defines if the product catalog will be checked against the specified rules regularly. New products fulfilling the rules are added to related products automatically. Existing related products that no longer fulfill the rules are removed automatically. |
| IS ACTIVE | Defines if the product relation is visible on the Storefront. |
| Select product | Table for selecting a product that owns the relation. |
| SELECT STORES | Defines the stores the product relation is displayed in. |
