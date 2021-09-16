---
title: Managing Merchant Relations
description: Use the procedures to create, edit, and delete merchant relations, or sort them by the company for which the merchant relation has been created.
originalLink: https://documentation.spryker.com/v2/docs/managing-merchant-relations
originalArticleId: 160c7ed8-06c1-4e33-8dc3-371b2218bc9f
redirect_from:
  - /v2/docs/managing-merchant-relations
  - /v2/docs/en/managing-merchant-relations
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

The merchant is created and can be used to create merchant specific prices (see [Creating an Abstract Product](/docs/scos/user/user-guides/{{page.version}}/back-office-user-guide/catalog/products/abstract-products/creating-abstract-products-and-product-bundles.html) and [Creating a Product Variant](/docs/scos/user/user-guides/{{page.version}}/back-office-user-guide/catalog/products/concrete-products/creating-product-variants.html) to know more). As well as they can be used to create merchant relationship thresholds (see [Managing Merchant Relationships Thresholds](/docs/scos/user/user-guides/{{page.version}}/back-office-user-guide/administration/thresholds/managing-merchant-order-thresholds.html) for more details).
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
