---
title: Add scheduled prices to abstract products and product bundles
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
  - /docs/scos/user/back-office-user-guides/202311.0/catalog/products/manage-abstract-products/adding-scheduled-prices-to-abstract-products.html
  - /docs/scos/user/back-office-user-guides/202311.0/catalog/products/manage-abstract-products-and-product-bundles/add-scheduled-prices-to-abstract-products-and-product-bundles.html
  - /docs/pbc/all/price-management/202204.0/base-shop/manage-in-the-back-office/add-scheduled-prices-to-abstract-products-and-product-bundles.html
---

This doc describes how to add scheduled prices to abstract products and product bundles in the Back Office.

## Prerequisites

* [Create an abstract product or product bundle](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/create-abstract-products-and-product-bundles.html) to add scheduled prices to.

* Review the [reference information](#reference-information-add-scheduled-prices-to-abstract-products-and-product-bundles) before you start, or look up the necessary information as you go through the process.

## Import scheduled prices for abstract products and product bundles

If you want to add more than five scheduled prices, it might be quicker to [import the scheduled prices](/docs/pbc/all/price-management/{{site.version}}/base-shop/manage-in-the-back-office/create-scheduled-prices.html).

## Add a scheduled price to an abstract product or product bundle

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
<br>You can add multiple scheduled prices for the same abstract product. Repeat the prior steps until you add the desired number of scheduled prices.


## Reference information: Add scheduled prices to abstract products and product bundles

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| ABSTRACT SKU | Unique identifier of an abstract product to import the scheduled price for. The field is disabled because you are adding the scheduled price to a particular abstract product. |
| CONCRETE SKU | Unique identifier of a concrete product to import the scheduled price for. The field is disabled because you are adding a scheduled price to a particular abstract product. |
| STORE | [Store](/docs/dg/dev/internationalization-and-multi-store/set-up-multiple-stores.html) in which the scheduled price will be displayed. If you want to add the scheduled price for multiple stores, you can repeat the full procedure for all of the needed stores.  |
| CURRENCY | Currency in which the scheduled price is defined. If you want to add the scheduled price for multiple currencies, you can repeat the full procedure for all of the needed currencies.  |
| NET PRICE | Net value of the product during the time period defined in **START FROM (INCLUDED)** and **FINISH AT (INCLUDED)**. |
| GROSS PRICE |Gross value of product during the time period defined in **START FROM (INCLUDED)** and **FINISH AT (INCLUDED)**.  |
| PRICE TYPE |  Price type in which price schedule is defined: DEFAULT or ORIGINAL.|
| START FROM (INCLUDED) | Date and time on which the scheduled price will be applied. |
| FINISH AT (INCLUDED) | Date and time on which the product price will be reverted to the regular price. |
