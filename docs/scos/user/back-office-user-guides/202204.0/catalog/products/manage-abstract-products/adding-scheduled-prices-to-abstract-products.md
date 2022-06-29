---
title: Add scheduled prices to abstract products
description: Learn how to add scheduled prices to abstract products in the Back Office.
last_updated: June 27, 2022
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/adding-scheduled-prices-to-abstract-products
originalArticleId: 133e924e-f8f0-46b4-9cc0-29216ed21455
redirect_from:
  - /2021080/docs/adding-scheduled-prices-to-abstract-products
  - /2021080/docs/en/adding-scheduled-prices-to-abstract-products
  - /docs/adding-scheduled-prices-to-abstract-products
  - /docs/en/adding-scheduled-prices-to-abstract-products
  - /docs/scos/user/back-office-user-guides/202204.0/catalog/products/manage-abstract-products/adding-scheduled-prices-to-abstract-products.html
---


1. Go to **Catalog&nbsp;<span aria-label="and then">></span> Products**.
2. Next to the product you want to add a scheduled price for, click **Edit**.
3. On the **Edit Product Abstract: {SKU}** page, click the **Scheduled Prices** tab.
4. Click **Add scheduled price**.
5. Select a **STORE**.
6. Select a **CURRENCY**.
7. Enter a **NET PRICE**.
8. Optional: Enter a **GROSS PRICE**.
9. Select a **PRICE TYPE**.
10. Select a **START FROM (INCLUDED)** date and time.
11. Select a **FINISH AT (INCLUDED)** date and time.
12. Click **Save**.
    This opens the *Edit Product* page with the success message displayed. The scheduled price you've added is displayed in the table.

**Tips and tricks**
* You can add multiple scheduled prices for the same abstract product. Repeat the prior steps until you add the desired number of scheduled prices.
* If you want to add more than five scheduled prices, it might be quicker to [import the scheduled prices](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/scheduled-prices/creating-scheduled-prices.html).

## Reference information: Add scheduled price to abstract product

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Abstract SKU | Unique identifier of an abstract product. The field is disabled because you are adding a scheduled price to a particular abstract product. |
| Concrete SKU | Unique identifier of a concrete product. The field is disabled because you are adding a scheduled price to a particular abstract product. |
| STORE | [Store](/docs/scos/dev/tutorials-and-howtos/howtos/howto-set-up-multiple-stores.html) in which the scheduled price will be displayed. Unless you add the scheduled price to all the other stores, the regular price will be displayed in them.  |
| CURRENCY | Currency in which the scheduled price is defined. Unless you define the scheduled price for all the other currencies, the regular price will be displayed for them.  |
| NET PRICE | Net value of the product defined by the scheduled price. |
| GROSS PRICE |Gross value of product defined by the scheduled price.  |
| PRICE TYPE |  Price type in which price schedule is defined: DEFAULT or ORIGINAL.|
| START FROM (INCLUDED) | Date and time on which the scheduled price will be applied. |
| FINISH AT (INCLUDED) | Date and time on which the product price will be reverted to the regular price. |
