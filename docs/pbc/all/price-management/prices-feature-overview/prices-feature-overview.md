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
  - /docs/scos/user/features/202200.0/prices-feature-overview/prices-feature-overview.html
  - /docs/scos/dev/feature-walkthroughs/202204.0/prices-feature-walkthrough/prices-feature-walkthrough.html
---

A price can be attached to an abstract product as well as to a concrete product. The price is stored as an integer, in the smallest unit of the currency—for example, for Euro that would be cents.

Each price is assigned to a price type (for example, gross price, net price), and for a price type, there can be *one* to *n* product prices defined. Price type entity is used to differentiate between use cases: for example, we have DEFAULT and ORIGINAL type where we use it for sale pricing.

The price can have a gross or net value which can be used based on a price mode selected by a customer in Yves. You can have a shop running in both modes and select the net mode for the business customer, for example. Price also has currency and store assigned to it.
![Price calculation](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Price/Price+Functionality/price_calculation.png)

## Price inheritance

As a general rule, if a concrete product doesn’t have a specific entity stored, then it inherits the values stored for its abstract product. This means that when getting the price entity for a specific product, first a check is made if a price is defined for the SKU corresponding to that product: if yes, then it returns that price, but if not, then it queries an abstract product linked to that product and checks if it has a price entity defined.

If it still can’t find a price, then it throws an exception. Basically, this doesn't happen if the products have been exported and are up to date.

The following diagram summarizes the logic for retrieving the price for a product:
![Price retrieval logic](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Price/Price+Functionality/price_retrieval_logic.png)

## Price calculation

The concerns for the product price calculation are the following:

* Retrieve the valid price for the product.
* Calculate the amount of tax.          
* Price for the options that were selected for the product (for example, frame or fabric).

## Related Business User articles

| OVERVIEWS | BACK OFFICE USER GUIDES |
|---| - |
| [Get a general idea of Volume Prices](/docs/scos/user/features/{{page.version}}/prices-feature-overview/volume-prices-overview.html) | [Define prices when creating abstract products and product bundles](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-abstract-products-and-product-bundles/create-abstract-products-and-product-bundles.html)   |
| | [Edit prices of an abstract product](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-abstract-products-and-product-bundles/edit-abstract-products-and-product-bundles.html#edit-prices-of-an-abstract-product-or-product-bundle)   |
| | [Define prices when creating a concrete product](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-concrete-products/creating-product-variants.html)  |
| | [Edit prices of a concrete product](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-concrete-products/editing-product-variants.html)   |

## Related Developer articles

| INTEGRATION GUIDES  | GLUE API GUIDES | DATA IMPORT | TUTORIALS AND HOWTOS | REFERENCES |
|---|---|---|---|---|
| [Prices feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/prices-feature-integration.html) | [Retrieving abstract product prices](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-products/abstract-products/retrieving-abstract-product-prices.html) | [File details: product_price.csv](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/catalog-setup/pricing/file-details-product-price.csv.html) | [HowTo: Handle twenty five million prices in Spryker Commerce OS](/docs/scos/dev/tutorials-and-howtos/howtos/howto-handle-twenty-five-million-prices-in-spryker-commerce-os.html) | [Money module: reference information](/docs/scos/dev/feature-walkthroughs/{{page.version}}/prices-feature-walkthrough/money-module-reference-information.html) |
| [Glue API: Product Price feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-product-price-feature-integration.html) | [Retrieving concrete product prices](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-products/concrete-products/retrieving-concrete-product-prices.html) |  |  | [PriceProduct module details: reference information](/docs/scos/dev/feature-walkthroughs/{{page.version}}/prices-feature-walkthrough/priceproduct-module-details-reference-information.html) |
