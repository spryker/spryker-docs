---
title: Discontinued products overview
description: Discontinued products are shown during a certain period of time after the manufacturer or a distributor announces that the product is no longer produced.
last_updated: Jun 2, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/discontinued-product-overview
originalArticleId: aadff485-b78f-40e5-b4b8-f2525b0953d1
redirect_from:
  - /v6/docs/discontinued-product-overview
  - /v6/docs/en/discontinued-product-overview
---

If a concrete product runs out of stock, it is tagged as out of stock and cannot be added to cart:
![Discontinued PDP](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Discontinued+Products/Discontinued+Products+Feature+Overview/discontinued-pdp-page.png)

Once the stock is updated with a positive number, the concrete product becomes available for purchase.

A *discontinued product* is a product which is no longer produced by its manufacturer. The discontinued product may have positive or negative stock.

When a Back Office user discountinues a product, they can define the date until which the product is displayed in the shop. Discontinued products have a certain period of time when they will still be shown on the website (active_until). This may be useful, for example, when a product was discontinued but it's still in stock in the shop. On the define date, the product becomes inactive.

{% info_block warningBox %}

Only [concrete products](/docs/scos/user/features/{{page.version}}/product-feature-overview/product-feature-overview.html) can become discontinued.

{% endinfo_block %}

The schema below illustrates the relations between discontinued products, abstract and concrete products:
![Module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Discontinued+Products/Discontinued+Products+Feature+Overview/discontinued-schema.png)

