---
title: Managing Product Sets
description: Use these procedures to view, update or change the order of product sets, as well as activate/deactivate and/or delete them in the Back Office.
last_updated: Dec 21, 2019
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v4/docs/managing-product-sets
originalArticleId: dcbe12ac-5e44-427e-9763-501005031663
redirect_from:
  - /v4/docs/managing-product-sets
  - /v4/docs/en/managing-product-sets
related:
  - title: Product Sets- Reference Information
    link: docs/scos/user/back-office-user-guides/page.version/merchandising/product-sets/references/product-sets-reference-information.html
  - title: Product Sets
    link: docs/scos/user/back-office-user-guides/page.version/merchandising/product-sets/product-sets.html
---

This article describes the managing actions that you can perform with a product set.
***

To start managing product sets, navigate to the **Products > Product Sets** section.
***

## Editing a Product Set

To edit a product set:
1. In the _Actions_ column of the **Product Sets** table, click **Edit** for the product set you want to update.
2. On the **Edit Product Set** page, update the needed attributes. The procedure is very similar to the procedure of creating a product set (see _Creating a Product Set_ article for more details). The only difference is that in the **Products** tab, in addition to the **Select Products to assign** table, you will see the **Products in this Set** table at the bottom of the page. In this table you can:
    1. Clear the checkbox in the _Selected_ column to remove a specific product from the set.
    2. Define the position of the products in the set by putting the appropriate numbers to the _Position_ column. The product that has 0 in the _Position_ column goes first.
![Editing a product set](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Products/Products/Product+Sets/Managing+Product+Sets/editing-product-set.png)

    {% info_block infoBox "Info" %}

    The attributes you see are described in [Product Sets: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/product-sets/references/product-sets-reference-information.html).

    {% endinfo_block %}

3. Once done, click **Submit**.

***

**Tips and tricks**

On this page, you can click **View** in the top right corner of the page and switch to the **View Product Set** page.
***

## Reordering Product Sets

The weight defines the order of the product sets displayed in the Product Sets section.

If you want to reorder the product sets, you:
1. Click **Reorder Product Sets** in the top right corner of the **Product Sets** page.
2. On the **Reorder Product Sets** page, define the order by putting the appropriate numbers in the _Weight_ column. Product Sets with higher numbers listed first.

![Reordering product sets](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Products/Products/Product+Sets/Managing+Product+Sets/reorder-product-sets.png)

3. Once done, click **Submit**.

***

## Viewing a Product Set

To view a product set:
1. In the _Actions_ column of the **Product Sets** table, click **View** for the product set you want to view.
2. On this page, you can:
    1. Switch to the **Edit Product Set** page by clicking **Edit** in the top right corner.
    2. Deactivate a product set by clicking **Deactivate** in the top right corner.
    3. Open the **View Product Abstract** page of a specific product included in the set by clicking the hyperlinked product name in the _Product details_ column of the **Products** table.

***

## Activating/Deactivating a Product Set

To activate/deactivate a product set:
1. In the _Actions_ column of the Product Sets table, click **Deactivate** for a specific product set.
    **Or**
2. Navigate to the **View Product Set** table and click **Deactivate** in the top right corner.

***

## Deleting a Product Set

**To delete a product set**, click **Delete** in the _Actions_ column of the **Product Sets** page.

This will not delete the products included in this set. Those products will continue existing in the system, and customers will be able to buy them. Only the logical connection between the products will be erased, and the product set will not be displayed for your customers.
