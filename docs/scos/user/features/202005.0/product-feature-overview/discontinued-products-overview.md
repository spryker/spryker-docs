---
title: Discontinued Products Overview
description: Discontinued products are shown during a certain period of time after the manufacturer or a distributor announces that the product is no longer produced.
last_updated: Sep 14, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v5/docs/discontinued-products-overview
originalArticleId: 3633b954-e350-4c6e-a590-1043a2d9137d
redirect_from:
  - /v5/docs/discontinued-products-overview
  - /v5/docs/en/discontinued-products-overview
  - /v5/docs/discontinued-products
  - /v5/docs/en/discontinued-products
---

## Out of Stock vs. Discontinued Products
While we try to keep all the items in stock, we occasionally run out of products. In such a case the concrete product is tagged as out of stock and cannot be added to cart:
![Discontinued PDP](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Discontinued+Products/Discontinued+Products+Feature+Overview/discontinued-pdp-page.png) 

Once the stock is updated with the positive number - the concrete product will be available for purchase.

Products are **discontinued** when the manufacturer or a current distributor has communicated that the product will no longer be produced. Still, the discontinued product may have stock (the stock number can either be positive or negative).

Discontinued products have a certain period of time when they will still be shown on the website (active_until). After this period ends - the products will become deactivated.

{% info_block warningBox %}
Only [concrete products](/docs/scos/user/features/{{page.version}}/product-feature-overview/product-feature-overview.html-
{% endinfo_block %} can become discontinued.)

The schema below illustrates the relations between discontinued products, abstract and concrete products:
![Module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Discontinued+Products/Discontinued+Products+Feature+Overview/discontinued-schema.png) 

<!-- Last review date: Mar 1, 2019-- by Ahmed Sabaa, Yuliia Boiko -->
