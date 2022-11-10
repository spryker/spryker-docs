---
title: Algolia
description: Algolia is a search engine that 
---

Algolia is a powerful search engine that stands out from others due to its speed, easy implementation, and good support. With the Algolia app, your users can conduct advanced search of active concrete products in your store. Deactivated products are not included in the search results.

{% info_block infoBox "Product offers and product reviews" %}

The search is made in product offers and product reviews as well, however these entities are represented in product attributes in the Algolia search results.

{% endinfo_block %}

To use Algolia as your search engine, you need an account with Algolia. For details, see [Integrate Algolia](/docs/pbc/all/search/integrate-algolia.html)

## Searchable attributes

Your users can search for concrete products by the following attributes:

- SKU
- Name
- Description
- Keywords
- Currency
- Gross Price
- Net Price
- Product Abstract SKU
- Rating (average approved rating for a respective abstract product)
- Images
- Categories
- Attributes
- Merchants

Here is an example of the search results in Algolia:

![algolia-search-results](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/algolia/algolia-search-results.png)

## Indexes

An index is the place where the data used by Algolia is stored.

In case of the Spryker store, the index is a complete list of all active concrete products that can be in search results.
There are separate indexes per locale and per sorting strategy. With the Algolia app, the search results in your store can be sorted by:

- Relevance
- From highest to lowest rating
- From lowest to highest rating
- By price in ascending order
- By price in descending order

For example, if you have two locales, there will be 10 indexes for your store in Algolia: one per each local and sorting strategy:

### Searchable entities
What is searchable entity, what are our searchable entities

Our searchable entity is concrete products.



### Sorting strategies
What is sorting strategy, what are our sorting strategies

search results in shop can be sorted by:

Relevance

From highest to lowest rating

From lowest to highest rating

By price in ascending order

By price in descending order

Per searchable entity, there is 1 index per locale, and per sorting strategy.

When a record is changed in the Back Office, Algolia index automatically gets updated as well.