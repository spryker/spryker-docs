---
title: Add volume prices to abstract products and product bundles
description: Learn how you can add volume prices to abstract products in the back office within your Spryker based products
last_updated: June 27, 2022
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/adding-volume-prices-to-abstract-products
originalArticleId: 5e6dac98-955a-4e8c-abad-ce2b0dd6bacf
redirect_from:
  - /2021080/docs/adding-volume-prices-to-abstract-products
  - /2021080/docs/en/adding-volume-prices-to-abstract-products
  - /docs/adding-volume-prices-to-abstract-products
  - /docs/en/adding-volume-prices-to-abstract-products
  - /docs/scos/user/back-office-user-guides/202001.0/catalog/products/manage-abstract-products/adding-volume-prices-to-abstract-products.html
  - /docs/scos/user/back-office-user-guides/202200.0/catalog/products/manage-abstract-products/adding-volume-prices-to-abstract-products.html
  - /docs/scos/user/back-office-user-guides/202311.0/catalog/products/manage-abstract-products/adding-volume-prices-to-abstract-products.html  
  - /docs/scos/user/back-office-user-guides/202311.0/catalog/products/manage-abstract-products-and-product-bundles/add-volume-prices-to-abstract-products-and-product-bundles.html
  - /docs/pbc/all/price-management/202204.0/base-shop/manage-in-the-back-office/add-volume-prices-to-abstract-products-and-product-bundles.html
---

This document describes how to add volume prices to abstract products.

## Prerequisites

- Define default or original gross prices for the stores you want to define volume prices for. To learn how to do that, see [Edit prices of an abstract product or product bundle](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/edit-abstract-products-and-product-bundles.html#edit-prices-of-an-abstract-product-or-product-bundle).

- Review the [reference information](#reference-information-add-volume-prices-to-abstract-products) before you start, or look up the necessary information as you go through the process.

## Add volume prices to an abstract product

1. Go to **Catalog&nbsp;<span aria-label="and then">></span> Products**.  
    This opens the **Product** page.
2. Next to the product you want to add volume prices for, click **Edit**.
3. On the **Edit Product Abstract: {SKU}** page, click the **Price & Tax** tab.
4. Next to the store you want to add volume prices for, click **Add Volume Price: {PRICE_TYPE}**.
5. On the **Add volume prices for product: {SKU}** page, enter a **Quantity**.
6. For the quantity you have entered, enter a **Gross price**.
7. Optional: For the quantity you have entered, enter a **Net price**.
8. Optional: To add more volume prices than the number of the rows displayed on the page, select **Save and add more rows**.
9. Repeat steps 4 to 7 until you add all the desired volume prices.
10. Select **Save and exit**.
    This opens the **Edit Product Abstract: {SKU}** page with a success message displayed.

## Reference information: Add volume prices to abstract products

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Quantity | Quantity of the product to which the prices from **Gross price** and **Net price** fields apply. |
| Gross price | Gross price of the product with the quantity equal or bigger than defined in the **Quantity** field. A gross price is a price after tax. |
| Net price | Net price of the product with the quantity equal or bigger than defined in the **Quantity** field. A net price is a price before tax. |

### Storefront example

Let's say you have a product that you want to sell with a special price if a user wants to buy a specific number of the same product. For example, a Smartphone with  flash memory of 16GB costs 25 Euros per item, but you defined that if a user buys three items, the price is 23 Euros instead of 25.

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/price-management/base-shop/manage-in-the-back-office/add-volume-prices-to-abstract-products-and-product-bundles.md/Volume-prices.mp4" type="video/mp4">
  </video>
</figure>
