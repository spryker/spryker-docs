---
title: Create product relations
description: Learn how to create product relations in the Back Office.
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

This document describes how to create product relations in the Back Office.

## Prerequisites

1. Learn how [related product rules] work.
To start working with product relations, go to **Merchandising** > **Product Relations**.

## Define general settings of a product relation

1. On the **Product Relations** page, click **Create Product Relation**.
    The **Create Product Relation** page opens.
2. Enter a **PRODUCT RELATION KEY**.
3. Select a **RELATION TYPE**.
4. For the related products to be updated automatically on a regular basis according to the product relation's rules, select the **UPDATE REGULARLY** checkbox.
5. To activate the product relation after creating it, select the **IS ACTIVE** checkbox.
6. In the **Product owning the relation** pane, next to the product you want to create a product relation with, click **Select**.

7. In the **Store relation** pane, select the stores you want the product relation to be displayed in.

8. Сlick **Next**.

## Define related products by adding condition rules

In the **Products** tab, you need to define the condition rules. Based on the rules, products are automatically selected to be displayed as related products.

You can define conditions using one rule or by combining rules into groups and sub-groups. When you open the **Products** tab, there is a preadded rule. The rule is in a box, which is the root group.

The **AND** and **OR** combination operators are used to combine rules in each group. Currently they are greyed out because there is only one rule in the group. To add one more rule to this group, click **Add rule**. This adds one more rule entry and the operators for this group become active. Based on how you can combine these rules, click one of the operators.

To add a subgroup, click **Add group**. Inside the main box, this adds a separate box with its own operators and a preadded rule. The rules in this sub-group combined will be used as a single rule when combinging it with the rules in the root group.

To define a rule, select a parameter, a relation operator, and a value.

Add the needed rules and groups based on your requirements. 
