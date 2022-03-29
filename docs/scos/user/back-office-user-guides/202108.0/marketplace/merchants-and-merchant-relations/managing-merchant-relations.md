---
title: Managing merchant relations
description: Use the procedures to create, edit, and delete merchant relations, or sort them by the company for which the merchant relation has been created.
last_updated: Jun 16, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-merchant-relations
originalArticleId: caba074b-6e6c-4db0-bf93-0ecec4e10ba7
redirect_from:
  - /2021080/docs/managing-merchant-relations
  - /2021080/docs/en/managing-merchant-relations
  - /docs/managing-merchant-relations
  - /docs/en/managing-merchant-relations
related:
  - title: Merchants and Merchant Relations Feature Overview
    link: docs/scos/user/features/page.version/merchant-b2b-contracts-feature-overview.html
---

This article describes how to manage merchant relations.
To start working with merchant relations, go to **Marketplace** > **Merchant Relations**.

## Prerequisites

To be able to create a merchant relation, you need to have a fully set up company account in the **Company Account** section as the company data drives from there.

## Creating a merchant relation

To create a merchant relation:
1. On the *Overview of Merchant relation* page, click **Add Merchant relation** in the top right corner.
2. On the *Create Merchant Relation* page, select the merchant in the **Merchant** drop-down list.
3. In the *Company* drop-down list, select the company with which you build the merchant relation, and click **Confirm**.
4. Select the business unit owner based on the company you selected and assigned business unit(s) based on the business unit owner.
5. Once done, click **Save**.

The merchant is created and can be used to create merchant specific prices (see [Creating abstract products and product bundles](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-abstract-products/creating-abstract-products-and-product-bundles.html) and [Creating a product variant](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-concrete-products/creating-product-variants.html) to know more). As well as they can be used to create merchant relationship thresholds (see [Managing merchant order thresholds](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/thresholds/managing-merchant-order-thresholds.html) for more details).

## Sorting the merchant relation table

You can sort the table of merchant relations based on the company for which the merchant relation has been created.

To sort the *List of Merchant relations* table, select a specific company in the *Company* drop-down list that is above the table.

![Sorting merchant relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Merchants/Merchant+and+Merchant+Relations/Managing+Merchant+Relations/sorting-merchant-relations.png)

Once the company is selected, the table is sorted to display only the merchant relations that are created with this specific company assigned.

## Editing a merchant relation

To edit a merchant relation:
1. On the *Overview of Merchant relation* page in the _Actions_ column, click **Edit** for a specific merchant relation.
2. On the *Edit Merchant Relation* page, you can update only the **Business unit owner** and **Assigned business units** values.
3. Once done, click **Save**.

## Deleting a merchant relation

To delete a merchant relation, click **Delete** in the _Actions_ column for a specific merchant relation on the *Overview of Merchant Relation* page.
