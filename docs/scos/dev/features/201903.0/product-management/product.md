---
title: Product
originalLink: https://documentation.spryker.com/v2/docs/product
redirect_from:
  - /v2/docs/product
  - /v2/docs/en/product
---

Product data is central data for shops. It contains characteristics that describe the product as well as characteristics that control behavior of the shop. For example the color of a product is an important information that the customer might need, whereas the weight of the product can be used to calculate the delivery costs.

Typically, product data is maintained and enriched in an external Product Information Management (PIM) system. As soon as all characteristics are gathered, they can be exported to Spryker. An import interface will transform the incoming product data into the Spryker specific data structure and persist it. After persisting the product, the data is exported to Redis and Elasticsearch. This way, Yves can access the relevant product data very fast. A basic UI allows to access the product data from Zed back-end.

![Product information management](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Product+Management/Product/product_information_management.png){height="" width=""}
