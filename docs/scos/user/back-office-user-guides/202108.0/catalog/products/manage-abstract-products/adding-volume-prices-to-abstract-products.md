---
title: Adding volume prices to abstract products
last_updated: Aug 10, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/adding-volume-prices-to-abstract-products
originalArticleId: 5e6dac98-955a-4e8c-abad-ce2b0dd6bacf
redirect_from:
  - /2021080/docs/adding-volume-prices-to-abstract-products
  - /2021080/docs/en/adding-volume-prices-to-abstract-products
  - /docs/adding-volume-prices-to-abstract-products
  - /docs/en/adding-volume-prices-to-abstract-products
---

This document describes how to add volume prices to abstract products.

## Prerequisites

To start working with abstract products, go to  **Catalog > Products**.

Define default product prices for the stores you want to define volume prices for. To learn how to do that, see [Editing prices of an abstract product](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-abstract-products/editing-abstract-products.html#editing-prices-of-an-abstract-product).

Review the [reference information](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-abstract-products/adding-volume-prices-to-abstract-products.html#reference-information-adding-volume-prices-to-abstract-products) before you start, or look up the necessary information as you go through the process.

## Adding volume prices to abstract products

To add volume prices to abstract products:
1. Next to the product you want to add volume prices for, select **Edit**.
2. On the *Edit Product* page, switch to the *Price & Tax* tab.
3. Next to the store you want to add volume prices for, select **> Add Product Volume Price**.
4. On the *Add volume prices* page, enter a **Quantity**.
5. Enter a **Gross price**.
6. Optional: Enter a **Net price**.
7. Optional: To add more volume prices than the number of the rows displayed on the page, select **Save and add more rows**.
8. Repeat steps 4 to 7 until you add all the desired volume prices.
9. Select **Save and exit**.
    This opens the *Edit Product* page with the success message displayed.

## Reference information: Adding volume prices to abstract products

 The following table describes attributes you see, enter, and select when adding volume prices:

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Quantity | Defines the quantity of the product to which the prices from **Gross price** and **Net price** fields apply. |
| Gross price | Gross price of the product with the quantity equal or bigger than defined in the **Quantity** field. A gross prices is a price after tax. |
| Net price | Net price of the product with the quantity equal or bigger than defined in the **Quantity** field.  A net price is a price before tax. |

**The Storefront example:**
<br>Let's say you have a product that you want to sell with a special price if a user wants to buy a specific number of the same product. For example, a Smartphone with a flash memory equals 16GB costs 25 Euros per item, but you have defined that if a user buys three items, the cost will be 23 Euros instead of 25.

![Volume prices](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Products/Products/Managing+products/Products:+Reference+Information/Volume-prices.gif)
