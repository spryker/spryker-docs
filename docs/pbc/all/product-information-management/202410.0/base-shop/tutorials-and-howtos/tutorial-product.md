---
title: "Tutorial: Product"
description: Learn how to add information to products regarding country of manufacturer to display on product details page with your Spryker project.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/t-product-challenge
originalArticleId: a6596169-fd8f-4b34-b365-e258cd29026e
redirect_from:
  - /2021080/docs/t-product-challenge
  - /2021080/docs/en/t-product-challenge
  - /docs/t-product-challenge
  - /docs/en/t-product-challenge
  - /v6/docs/t-product-challenge
  - /v6/docs/en/t-product-challenge
  - /v5/docs/t-product-challenge
  - /v5/docs/en/t-product-challenge
  - /v4/docs/t-product-challenge
  - /v4/docs/en/t-product-challenge
  - /v3/docs/t-product-challenge
  - /v3/docs/en/t-product-challenge
  - /v2/docs/t-product-challenge
  - /v2/docs/en/t-product-challenge
  - /v1/docs/t-product-challenge
  - /v1/docs/en/t-product-challenge
  - /docs/scos/dev/tutorials-and-howtos/advanced-tutorials/tutorial-product.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/tutorials-and-howtos/tutorial-product.html
related:
  - title: Extend the core
    link: docs/dg/dev/backend-development/extend-spryker/spryker-os-module-customisation/extend-the-core.html
  - title: About the Persistence layer
    link: docs/dg/dev/backend-development/zed/persistence-layer/persistence-layer.html
  - title: Using translations
    link: docs/dg/dev/internationalization-and-multi-store/managing-translations-with-twig-translator.html
---

<!-- used to be: http://spryker.github.io/onboarding/product/ -->


This tutorial shows how to add information to products regarding the country where the product was manufactured (for example, Made in "China") and display it on the product details page rather than just adding it as an attribute.

**Bonus challenge**: Add a glossary key for "Made in". Show this string translated in the product detail page.

## ProductCountry module (Zed)

1. Create the `ProductCountry` module located in `src/Zed`.
2. Create the `ProductCountry` table under the persistence layer.
3. After defining the new table, run the database migration and check that the table was added to your database.

```bash
console propel:install
```

4. Implement query by product ID and query by country ID under the persistence layer.
5. Implement `ProductCountryManager` and add the facade call. Implement `ProductCountryBusinessFactory`.
6. Implement the operations under `ProductCountryFacade`.
7. To have relations between abstract products and countries (for testing few products would be enough), manually add values to the table.

### Collector module (Zed)

1. Update the query that aggregates the product data and aggregation/processing logic.
2. Add `product_country` to the data set that goes to the key-value store (Redis or Valkey).
3. Run the collectors to bring data to the key-value store (Redis or Valkey).

### Product module (Yves)

Update the Twig template that shows the product details (`src/Pyz/Yves/Product/Theme/default/product/detail.twig`) so that it also shows where the product is being produced.
