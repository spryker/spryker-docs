---
title: Tutorial- Product
originalLink: https://documentation.spryker.com/v6/docs/t-product-challenge
redirect_from:
  - /v6/docs/t-product-challenge
  - /v6/docs/en/t-product-challenge
---

<!-- used to be: http://spryker.github.io/onboarding/product/ -->

## Challenge Description
Add information to the products regarding the country where the product is being produced (e.g.: Made in “China”). Don’t add this information as an attribute.

Display this information on the product details page in Yves.

**Bonus challenge**: Add a glossary key for “Made in”. Show this string translated in the product detail page.

## Challenge Solving Highlights
### ProductCountry module (Zed)
Create the `ProductCountry` module located in `src/Zed`.

Create the `ProductCountry` table under the persistence layer.

After defining the new table, run the database migration(`console propel:install`) and check that the table was added to your database.

Implement query by product id and query by country id under the persistence layer.

Implement `ProductCountryManager` and add the facade call. Implement `ProductCountryBusinessFactory`.

Implement the operations under `ProductCountryFacade`.

Manually add values to table in order to have relations between abstract products and countries (for testing few products would be enough).

### Collector module (Zed)
Update the query that aggregates the product data and aggregation/processing logic.

Add `product_country` to the data set that goes to Redis.

Run the collectors to bring data to Redis.

### Product module (Yves)
Update the Twig template that shows the product details (`src/Pyz/Yves/Product/Theme/default/product/detail.twig`) so that it also shows where the product is being produced.

## References

| Documentation | Description |
| --- | --- |
|  Core Extension| How to extend Spryker Core |
| Collector | Collector module documentation |
| Touch | Touch module documentation |
| Database Schema Definition | Defining the database Schema using Propel |
| Persistence Layer | Persistence layer overview |
| Product | Product module documentation |
| [Using Translations](/docs/scos/dev/tutorials/202001.0/advanced/t-using-transla) |Using translations in Yves  |
