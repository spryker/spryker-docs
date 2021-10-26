---
title: Adding Volume Prices to Abstract Products
description: Use the guide to set or update discounts to products purchased in bulk from the Back Office.
last_updated: Feb 4, 2020
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v3/docs/adding-volume-prices
originalArticleId: ab30786f-db7c-4d4e-9065-b93c48762fab
redirect_from:
  - /v3/docs/adding-volume-prices
  - /v3/docs/en/adding-volume-prices
related:
  - title: Abstract Product- Reference Information
    link: docs/scos/user/back-office-user-guides/page.version/catalog/products/references/abstract-product-reference-information.html
  - title: Abstract and Concrete Products
    link: docs/scos/user/back-office-user-guides/page.version/catalog/products/abstract-and-concrete-products.html
  - title: Concrete Product- Reference Information
    link: docs/scos/user/back-office-user-guides/page.version/catalog/products/references/concrete-product-reference-information.html
  - title: Products- Reference Information
    link: docs/scos/user/back-office-user-guides/page.version/catalog/products/references/products-reference-information.html
---

This article describes the procedure of adding the volume prices for the product.
***
Volume price is a pricing strategy that allows discounts for bulk purchases. Typically, the greater the number of units purchased, the greater the discount allowed.
Unlike the discount rules, the volume prices are set up for each specific concrete product or product variant.
***
{% info_block warningBox "Note" %}
The volume prices only work with the default prices set up.
{% endinfo_block %}
**To set up a volume price:**
1. Navigate to the **Price & Tax** tab of either an **abstract** or **concrete** product.
2. For each currency set up in your store, you see the **Add Product Volume Price** option in the currency abbreviation column (_if the price is defined for the currency_):
    ![Add product volume prices](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Products/Products/Managing+products/Adding+Volume+Prices/add-product-volume-price.png)
3. Click **Add Product Volume Price**.
4. On the **Add volume prices** page, define the quantity of products for which a special price will be applied (_gross and net for B2B cases_)  and click either **Save and add more rows** if you have entered all the rows on the screen and need to enter more conditions, or **Save and exit** if you have set up everything you need.
{% info_block warningBox "Note" %}
Once the column prices are set up, the **Add Product Volume Price** option becomes **Edit Product Volume Price**. You use this option to edit the defined prices or to add more.
{% endinfo_block %}
