---
title: Prices feature overview
description: In the article, you can find the price definition, its types, how the price is inherited and calculated.
last_updated: Jul 9, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2020090/docs/prices-overview
originalArticleId: 10ce44da-34bb-4770-98ad-f0cf357a6ccd
redirect_from:
  - /2020090/docs/prices-overview
  - /2020090/docs/en/prices-overview
  - /docs/prices-overview
  - /docs/en/prices-overview
  - /2020090/docs/prices
  - /2020090/docs/en/prices
  - /docs/prices
  - /docs/en/prices
---

A price can be attached to an abstract product as well as to a concrete product. The price is stored as an integer, in the smallest unit of the currency (e.g. for Euro that would be cents).

Each price is assigned to a price type ( e.g. gross price, net price ) and for a price type there can be one to n product prices defined. Price type entity is used to differentiate between use cases: for example we have DEFAULT and ORIGINAL type where we use it for sale pricing.

The price can have gross or net value which can be used based on a price mode selected by customer in Yves. You can have shop running in both modes and select net mode for business customer, for example. Price also has currency and store assigned to it.
![Price calculation](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Price/Price+Functionality/price_calculation.png)

## Price inheritance

As a general rule, if a concrete product doesn’t have a specific entity stored, then it inherits the values stored for its abstract product. This means that when getting the price entity for a specific product, first a check is made if a price is defined for the SKU corresponding to that product: if yes, then it returns that price, but if not, then it queries an abstract product linked to that product and checks if it has a price entity defined.

If it still can’t find a price, then it throws an exception (basically this shouldn’t happen if the products have been exported and are up to date).

The diagram bellow summarizes the logic for retrieving the price for a product:
![Price retrieval logic](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Price/Price+Functionality/price_retrieval_logic.png)

## Price calculation

The concerns for the product price calculation are the following :

* retrieve valid price for the product
* calculate amount of tax

price for the options that were selected for the product (e.g.: frame, fabric, etc.)

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
