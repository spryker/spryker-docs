---
title: HowTo - Make a Product Searchable and Shown on Yves by URL
originalLink: https://documentation.spryker.com/v2/docs/ht-make-product-shown-on-frontend-by-url
redirect_from:
  - /v2/docs/ht-make-product-shown-on-frontend-by-url
  - /v2/docs/en/ht-make-product-shown-on-frontend-by-url
---

{% info_block infoBox %}
The article describes the flow on how to make a product searchable and displayed on Yves using a URL.
{% endinfo_block %}

There are a number of conditions that should be fulfilled to make your product searchable and shown on Yves by URL. What is important is to make sure that your product meets the following conditions:

* It is assigned to categories. See the [Category](/docs/scos/dev/user-guides/201903.0/back-office-user-guide/category/assigning-produ) section for details on how to assign products to categories.
* It is in stock in the warehouse for the current store. See the [Availability](/docs/scos/dev/user-guides/201903.0/back-office-user-guide/products/availability/managing-produc) section to learn how to check products' availability.
* The product's status is **Active**. See the [Products](https://documentation.spryker.com/v2/docs/managing-products#activating-a-product) section to learn how to manage products, including status change.
* It has a price in the current locale. See the [Products](/docs/scos/dev/user-guides/201903.0/back-office-user-guide/products/products/managing-products/managing-produc) section for more details.
* It has been marked as searchable in the Back Office. See the [Products](/docs/scos/dev/user-guides/201903.0/back-office-user-guide/products/products/references/concrete-produc) section for more details
* It has product variants - abstract product will not be displayed on Yves unless it has product variants. See [Products](/docs/scos/dev/user-guides/201903.0/back-office-user-guide/products/products/concrete-products/creating-a-prod) to learn how to create product variants.
