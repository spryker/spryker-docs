---
title: Discontinued Products overview
description: Discontinued products are shown during a certain period of time after the manufacturer or a distributor announces that the product is no longer produced.
originalLink: https://documentation.spryker.com/2021080/docs/discontinued-products-overview
originalArticleId: 25617203-917b-417c-b7a9-4f418fa14e35
redirect_from:
  - /2021080/docs/discontinued-products-overview
  - /2021080/docs/en/discontinued-products-overview
  - /docs/discontinued-products-overview
  - /docs/en/discontinued-products-overview
---

If a concrete product runs out of stock, it is tagged as out of stock and cannot be added to cart:
![Discontinued PDP](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Discontinued+Products/Discontinued+Products+Feature+Overview/discontinued-pdp-page.png)

Once the stock is updated with a positive number, the concrete product becomes available for purchase.

A *discontinued product* is a product which is no longer produced by its manufacturer. The discontinued product may have positive or negative stock.

When a Back Office user discountinues a product, they can define the date until which the product is displayed in the shop. Discontinued products have a certain period of time when they will still be shown on the website (active_until). This may be usefule, for example, when a product was discontinued but it's still in stock in the shop. On the define date, the product becomes inactive.

{% info_block warningBox %}

Only [concrete products](/docs/scos/user/features/{{page.version}}/product-feature-overview/product-feature-overview.html#abstract-and-concrete-products--variants)
can become discontinued.

{% endinfo_block %}

## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Discontinue a product](/docs/scos/user/user-guides/{{page.version}}/back-office-user-guide/catalog/products/managing-products/discontinuing-products.html)  |

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Product feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/product-feature-walkthrough.html) for developers.

{% endinfo_block %}
