---
title: Managing Merchant Relations
description: Use the procedures to create, edit, and delete merchant relations, or sort them by the company for which the merchant relation has been created.
last_updated: Nov 22, 2019
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v3/docs/managing-merchant-relations
originalArticleId: 0f5119a7-f2cf-4cba-8a61-020b7f49a33c
redirect_from:
  - /v3/docs/managing-merchant-relations
  - /v3/docs/en/managing-merchant-relations
related:
  - title: Managing Merchants
    link: docs/scos/user/back-office-user-guides/page.version/marketplace/merchants-and-merchant-relations/managing-merchants.html
  - title: Managing Merchant Order Thresholds
    link: docs/scos/user/back-office-user-guides/page.version/administration/thresholds/managing-merchant-order-thresholds.html
  - title: Merchants and Merchant Relations Feature Overview
    link: docs/scos/user/features/page.version/merchant-b2b-contracts-feature-overview.html
  - title: Creating Product Variants
    link: docs/scos/user/back-office-user-guides/page.version/catalog/products/manage-concrete-products/creating-product-variants.html
  - title: Creating Abstract Products
    link: docs/scos/user/back-office-user-guides/page.version/catalog/products/manage-abstract-products/creating-abstract-products-and-product-bundles.html
---

This article describes how you create and manage the Merchant Relations in the Back Office.
***
To start managing merchant relations, navigate to the **Merchants > Merchant Relations** section.
***
**Prerequisites**
To be able to create a merchant relation, you need to have a fully set up company account in the **Company Account** section as the company data drives from there.
***
## Creating a Merchant Relation
To create a merchant relation:
1. On the **Overview of Merchant relation** page, click **Add Merchant relation** in the top right corner.
2. On the **Create Merchant Relation** page, select the merchant in the **Merchant** drop-down list.
3. In the **Company** drop-down list, select the company with which you build the merchant relation, and click **Confirm**.
4. Select the business unit owner based on the company you selected and assigned business unit(s) based on the business unit owner. 
5. Once done, click **Save**.

The merchant is created and can be used to create merchant specific prices (see [Creating an Abstract Product](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-abstract-products/creating-abstract-products-and-product-bundles.html) and [Creating a Product Variant](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-concrete-products/creating-product-variants.html) to know more). As well as they can be used to create merchant relationship thresholds (see [Managing Merchant Relationships Thresholds](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/thresholds/managing-merchant-order-thresholds.html) for more details).
***
## Sorting the Merchant Relation Table
You can sort the table of merchant relations based on the company for which the merchant relation has been created.

To sort the **List of Merchant relations** table, select a specific company in the **Company** drop-down list that is above the table.
![Sorting merchant relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Merchants/Merchant+and+Merchant+Relations/Managing+Merchant+Relations/sorting-merchant-relations.png) 

Once the company is selected, the table is sorted to display only the merchant relations that are created with this specific company assigned.
***
## Editing a Merchant Relation
To edit a merchant relation:
1. On the **Overview of Merchant relation** page in the _Actions_ column, click **Edit** for a specific merchant relation.
2. On the **Edit Merchant Relation** page, you can update only the **Business unit owner** and **Assigned business units** values.
3. Once done, click **Save**.
***
## Deleting a Merchant Relation
To delete a merchant relation, click **Delete** in the _Actions_ column for a specific merchant relation on the **Overview of Merchant Relation** page.
