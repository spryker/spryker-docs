---
title: Prices feature overview
description: In the article, you can find the price definition, its types, how the price is inherited and calculated.
last_updated: Jul 9, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/prices-overview
originalArticleId: 003e8985-3230-4498-838b-234a10f1a810
redirect_from:
  - /2021080/docs/prices-overview
  - /2021080/docs/en/prices-overview
  - /docs/prices-overview
  - /docs/en/prices-overview
  - /2021080/docs/prices
  - /2021080/docs/en/prices
  - /docs/prices
  - /docs/en/prices
---

A price can be attached to an abstract product or a concrete product. The price is stored as an integer in the smallest unit of the currency—for example, for Euro, that would be cents (100 = 1,00 EUR).

Each price is assigned to a price type such as DEFAULT or ORIGINAL. There can be one to N product prices defined for a price type. The price type entity is used to differentiate between different use cases. You use DEFAULT to define the customer's price at the checkout. You use ORIGINAL to define the previous price of this product like a sale pricing.

The price can have GROSS or NET value which can be used based on a price mode selected by the customer in Yves. For example, you can run the shop in both price modes and select the NET mode for business customers. Price also has currency and store assigned to it.
![Price calculation](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Price/Price+Functionality/price_calculation.png)

## Price inheritance

As a general rule, if a concrete product doesn't have a specific entity stored, it inherits the values stored for its abstract product. It means that when getting the price entity for a particular product, first, a check is made if a price is defined for the SKU corresponding to that product: if yes, then it returns that price, but if not, then it queries an abstract product linked to that product and checks if it has a price entity defined.

If it still can't find a price, it throws an exception. It shouldn't happen if the prices of the products are up to date.

The following diagram summarizes the logic for retrieving the price for a product:
![Price retrieval logic](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Price/Price+Functionality/price_retrieval_logic.png)

## Price calculation

The concerns for the product price calculation are the following:

* Retrieve valid price for the product.
* Calculate the amount of tax.          
* Product Option prices selected for the product (warranty or gift wrapping).

## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Get a general idea of Volume Prices](/docs/scos/user/features/{{page.version}}/prices-feature-overview/volume-prices-overview.html)   |
| [Define prices when creating abstract products and product bundles](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-abstract-products/creating-abstract-products-and-product-bundles.html)   |
| [Edit prices of an abstract product](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-abstract-products/editing-abstract-products.html#editing-prices-of-an-abstract-product)   |
| [Define prices when creating a concrete product](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-concrete-products/creating-product-variants.html)  |
| [Edit prices of a concrete product](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-concrete-products/editing-product-variants.html)   |

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Prices feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/prices-feature-walkthrough/prices-feature-walkthrough.html) for developers.

{% endinfo_block %}
