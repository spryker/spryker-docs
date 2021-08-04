---
title: Precise search by super attributes
originalLink: https://documentation.spryker.com/2021080/docs/precise-search-by-super-attributes
redirect_from:
  - /2021080/docs/precise-search-by-super-attributes
  - /2021080/docs/en/precise-search-by-super-attributes
---

## Task to achieve

Imagine shop selling laptop (abstract product) with Ram: *16/32Gb* and CPU: *i5/i7* options. One day there’re only 2 models in stock: **16Gb + i5** and **32Gb + i7**.

Selecting in the search **Ram: 16Gb + CPU: i7** will show you this abstract product in the catalog/search, while none of it's concretes matched the requirements.

It's expected, that only products with at least one concrete matching selected super-attribute values should be shown. In the mentioned example, search result should be empty.

## Possible solutions

Both mentioned solutions require [Product Page Search 3.0.0](https://github.com/spryker/product-page-search/releases/tag/3.0.0) or newer.

### Solution 1. Concrete products index as a support call

#### Idea
Search is made in 2 steps:
1. perform search  by super attributes in the **product concrete index** and get matching product abstract Ids
2. then retrieve those from the main index for product abstracts.

#### Implementation

First of all, you have to extend ***ProductConcretePageSearchTransfer*** with new field *attributes*, where desired attributes would be stored as an array of string values :
```
<property name="attributes" type="string[]" singular="attribute"/>
```
Next you have to implement Data expander with an interface *\Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductConcretePageDataExpanderPluginInterface* in order to fill into *ProductConcretePageSearchTransfer* super attributes from the concrete. Add this plugin in ***ProductPageSearchDependencyProvider*** into plugins list *getProductConcretePageDataExpanderPlugins*.

Next step is to implement query expander ConcreteProductSearchQueryExpanderPlugin, implementing interface **QueryExpanderPluginInterface**. You have to add this plugin before FacetQueryExpanderPlugin in **CatalogDependencyProvider** into list **createCatalogSearchQueryExpanderPlugins**.

This plugin will:
- filter out from the request  values for super attributes, and do not include those into query.
- make a sub-search request like CatalogClient::searchProductConcretesByFullText, but search by facets of super attributes from the request
 - add into query list of unique abstract product Ids
Implementation could look like follows:
```
some code here
```

Next step is to extend **FacetQueryExpanderPlugin**, which will not take into account facets, used in the plugin **ConcreteProductSearchQueryExpanderPlugin**.
Implementation could look like follows:
```
some code here
```
Make sure to use updated plugin in the **CatalogDependencyProvider**

#### Downsides

As you see from the implementation, we cannot actually paginate results of the last query abstract products index. It’s impossible to deal with smooth pagination, since it’s unknown how many concretes should be skip or queried to get next page with abstract products.


### Solution 2: Concrete products index is used as a main search index

#### Idea
Search request is made on the concrete product index, which is extended with attributes, to allow fiter by those, and with abstract product data to fulfill required abstract product information for catalog display.

#### Implementation Plan

Update product concrete data loader

Update ProductConcretePageSearchPublisher to load into ProductConcreteTransfers more data, needed to populate abstract product data.

Update ProductConcreteSearchDataMapper to use productAbstractMapExpanderPlugins

Update query plugin used to point to concrete index, using ProductConcreteCatalogSearchQueryPlugin in CatalogDependencyProvider::createCatalogSearchQueryPlugin 

#### Downsides

You will get duplicate abstract products in the search results, accompanied with a single concrete product.

Please consider merging same abstract products, if you do not need duplicates on the page.
