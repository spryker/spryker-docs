---
title: HowTo - Make a Product Searchable and Shown on the Storefront
originalLink: https://documentation.spryker.com/v5/docs/ht-make-product-shown-on-frontend-by-url
redirect_from:
  - /v5/docs/ht-make-product-shown-on-frontend-by-url
  - /v5/docs/en/ht-make-product-shown-on-frontend-by-url
---

{% info_block infoBox %}
The article describes the flow on how to make a product searchable and displayed on the Storefront.
{% endinfo_block %}

There are a number of conditions that should be fulfilled to make your product searchable and shown on Yves by URL. What is important is to make sure that your product meets the following conditions:

* It is assigned to categories. See the [Category](https://documentation.spryker.com/docs/en/assigning-products-to-categories) section for details on how to assign products to categories.
* It is in stock in the warehouse for the current store. See the [Availability](https://documentation.spryker.com/docs/en/managing-products-availability) section to learn how to check products' availability.
* The product's status is **Active**. See the [Products](https://documentation.spryker.com/docs/en/managing-products#activating-a-product) section to learn how to manage products, including status change.
* It has a price in the current locale. See the [Products](https://documentation.spryker.com/docs/en/managing-products) section for more details.
* It has been marked as searchable in the Back Office. See the [Products](https://documentation.spryker.com/docs/en/concrete-product-reference-information) section for more details
* It has product variants - abstract product will not be displayed on Yves unless it has product variants. See [Products](https://documentation.spryker.com/docs/en/creating-a-product-variant) to learn how to create product variants.
