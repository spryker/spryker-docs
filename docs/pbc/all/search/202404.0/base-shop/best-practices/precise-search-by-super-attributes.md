---
title: Precise search by super attributes
description: This document describes precise search by super attributes
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/precise-search-by-super-attributes
originalArticleId: 0af5d38e-725f-44a1-9bfd-dd9f85cdf29b
redirect_from:
  - /2021080/docs/precise-search-by-super-attributes
  - /2021080/docs/en/precise-search-by-super-attributes
  - /docs/scos/dev/best-practices/search-best-practices/precise-search-by-super-attributes.html
  - /docs/precise-search-by-super-attributes
  - /docs/en/precise-search-by-super-attributes
  - /v6/docs/precise-search-by-super-attributes
  - /v6/docs/en/precise-search-by-super-attributes
  - /docs/pbc/all/search/202212.0/best-practices/precise-search-by-super-attributes.html
related:
  - title: Data-driven ranking
    link: docs/pbc/all/search/page.version/base-shop/best-practices/data-driven-ranking.html
  - title: Full-text search
    link: docs/pbc/all/search/page.version/base-shop/best-practices/full-text-search.html
  - title: Generic faceted search
    link: docs/pbc/all/search/page.version/base-shop/best-practices/generic-faceted-search.html
  - title: On-site search
    link: docs/pbc/all/search/page.version/base-shop/best-practices/on-site-search.html
  - title: Other best practices
    link: docs/pbc/all/search/page.version/base-shop/best-practices/other-best-practices.html
  - title: Multi-term autocompletion
    link: docs/pbc/all/search/page.version/base-shop/best-practices/multi-term-auto-completion.html
  - title: Simple spelling suggestions
    link: docs/pbc/all/search/page.version/base-shop/best-practices/simple-spelling-suggestions.html
  - title: Naive product centric approach
    link: docs/pbc/all/search/page.version/base-shop/best-practices/naive-product-centric-approach.html
  - title: Personalization - dynamic pricing
    link: docs/pbc/all/search/page.version/base-shop/best-practices/personalization-dynamic-pricing.html
  - title: Usage-driven schema and document structure
    link: docs/pbc/all/search/page.version/base-shop/best-practices/usage-driven-schema-and-document-structure.html
---

## Task to achieve

Imagine a shop selling a laptop with 16/32Gb RAM and i5/i7 CPU options. One day there are only two models in stock: *16Gb + i5* and *32Gb + i7*.

Selecting *RAM: 16Gb + CPU: i7* shows you this abstract product in the catalog/search, while none of its concretes match the requirements.

As expected,  only products with at least one concrete matching selected super-attribute values must be shown. In the previously mentioned example, the search result must be empty.

## Possible solutions

The following solutions require [Product Page Search 3.0.0](https://github.com/spryker/product-page-search/releases/tag/3.0.0) or newer.

### Solution 1. Concrete products index as a support call
The solution consists of several steps: the idea, the implementation plan, and the possible downsides of the solution. 

#### Idea

The Search is done in two steps:
1. In the **product concrete index**, search is performed by super attributes, and matching product abstract IDs are displayed.
2. Those from the main index for product abstracts are then retrieved.

#### Implementation

1. Extend `ProductConcretePageSearchTransfer` with the new field *attributes*, where the desired attributes are stored as an array of string values:

```
<property name="attributes" type="string[]" singular="attribute"/>
```

2. Implement the Data expander with the interface `\Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductConcretePageDataExpanderPluginInterface` to fill into `ProductConcretePageSearchTransfer` super attributes from the concrete. 
3. Add this plugin in `ProductPageSearchDependencyProvider` into the plugins list `getProductConcretePageDataExpanderPlugins`.
3. Implement the query expander `ConcreteProductSearchQueryExpanderPlugin`, implementing the interface `QueryExpanderPluginInterface`. You have to add this plugin before `FacetQueryExpanderPlugin` in `CatalogDependencyProvider` into list `createCatalogSearchQueryExpanderPlugins`.

This plugin does the following:
- Filters out from the request values for super attributes and doesn't include those in the query.
- Makes a sub-search request such as  `CatalogClient::searchProductConcretesByFullText`, but searches by facets of super attributes from the request.
- Adds a list of unique abstract product IDs into the query.

An example implementation looks as follows:

```
some code here
```

4. Extend `FacetQueryExpanderPlugin`, which doesn't take into account facets used in the plugin `ConcreteProductSearchQueryExpanderPlugin`.

An example implementation looks as follows:

```
some code here
```

Make sure to use updated plugin in `CatalogDependencyProvider`.

#### Downsides

As you see from the implementation, the results of the last query abstract products index can't be actually paginated. You can't deal with smooth pagination since it's unknown how many concrete products to skip or query to get the next page with abstract products.


### Solution 2: Concrete products index is used as a main search index

The solution consists of several steps: the idea, implementation plan, and possible downsides of the solution. 

#### Idea

The search request is made on the concrete product index, which is extended with attributes, to allow filtering by those, and with abstract product data to fulfill the required abstract product information for catalog display.

#### Implementation plan

1. Update product concrete data loader.
2. Update `ProductConcretePageSearchPublisher` to load into `ProductConcreteTransfers` more data, needed to populate abstract product data.
3. Update `ProductConcreteSearchDataMapper` to use `productAbstractMapExpanderPlugins`.
4. Update the query plugin used to point to concrete index, using `ProductConcreteCatalogSearchQueryPlugin` in `CatalogDependencyProvider::createCatalogSearchQueryPlugin`.

#### Downsides

You get duplicate abstract products in the search results, accompanied by a single concrete product.

Consider merging duplicated abstract products, if you don't want duplicates on the page.
