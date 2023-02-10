---
title: Algolia
description: Algolia empowers Builders with Search and Recommendation services to create world-class digital experiences.
---

Spryker is shipped with [Elasticsearch]((https://www.elastic.co/elasticsearch/)) as the default search engine. However, you can replace it with [Algolia](https://www.algolia.com/).

The Algolia search engine stands out due to its performance. With the Algolia app, your users can conduct advanced searches of active concrete products in your store. 

{% info_block infoBox "Product reviews" %}

Algolia searches in product reviews as well. However, product reviews are represented in product attributes in the Algolia search results.

{% endinfo_block %}

To use Algolia as your search engine, you need an account with Algolia. For details about Algolia integration, see [Integrate Algolia](/docs/pbc/all/search/integrate-algolia.html).

## Searchable attributes

Your users can search for active concrete products by the following attributes:

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

Here is an example of the search results with these attributes in Algolia:

![algolia-search-results](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/algolia/algolia/algolia-search-results.png)

## Indexes

An index is the place where the data used by Algolia is stored.

In case of the Spryker store, the index is a complete list of all active concrete products that can appear in search results.
There are separate indexes for each locale and sorting strategy. With the Algolia app, the search results in your store can be sorted by:

- Relevance
- From highest to lowest rating
- From lowest to highest rating
- By price in ascending order
- By price in descending order

For example, if you have two locales, there will be 10 indexes for your store in Algolia. One for each locale and sorting strategy:
![algolia-indexes](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/search/algolia/algolia/algolia-index.png)

The Algolia index is always kept up to date with product data changes. That means that if a Back Office user added or changed some searchable product attribute such as a description, the change is immediately reflected in the Algolia search results.
