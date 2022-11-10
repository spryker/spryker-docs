---
title: Algolia
description: Algolia is a search engine that 
---

Algolia is a powerful search engine that stands out from others due to its speed, easy implementation, and good support.

## Attributes for searching
What are attributes for searching, spryker attributes for searching

The following data is sent to Algolia and can be seen o algolia side:

SKU

Name

Description

Keywords

Currency

Gross Price

Net Price

Product Abstract SKU

Rating (average approved rating for a respective abstract product)

Images

Categories

Attributes

Merchants

Example from Alglolia

Deactivated product can’t be found at shop

## Indexes

What is index in Algolia

### Searchable entities
What is searchable entity, what are our searchable entities

Our searchable entity is concrete products.

{% info_block infoBox "Product offers and product reviews" %}

Product offers and product reviews are represented in search results as part of the product attributes.

{% endinfo_block %}

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