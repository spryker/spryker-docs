---
title: "Tutorial: Integrate any search engine into a project"
description: Learn how to integrate any external search engine instead of the default Elasticsearch.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/tutorial-integrating-any-search-engine
originalArticleId: 1e7707ed-2b13-41d8-bdb8-c6013ac4587b
redirect_from:
  - /2021080/docs/tutorial-integrating-any-search-engine
  - /2021080/docs/en/tutorial-integrating-any-search-engine
  - /docs/tutorial-integrating-any-search-engine
  - /docs/en/tutorial-integrating-any-search-engine
  - /v6/docs/tutorial-integrating-any-search-engine
  - /v6/docs/en/tutorial-integrating-any-search-engine
  - /docs/scos/dev/tutorials-and-howtos/introduction-tutorials/tutorial-integrating-any-search-engine-into-a-project.html
  - /docs/pbc/all/search/202307.0/tutorials-and-howtos/tutorial-integrate-any-search-engine-into-a-project.html
---

In a Spryker-based project, you can use any external search provider instead of the default Elasticsearch. This tutorial shows how to replace the default Elasticsearch with any other search engine.

## Challenge description

Every search engine comes along with its own functionalities and search approaches. However, in most search platforms, the integration of search and search suggestions is similar.

This tutorial shows how to integrate the FACT-Finder (PHP) search platform. A system integrator development team can use this guide to integrate other platforms, taking into account the differences between the target search platform.

The integration is following the concept described in [Search Migration Concept](/docs/pbc/all/search/{{site.version}}/base-shop/install-and-upgrade/search-migration-concept.html).

## Challenge solving highlights

To use FACT-Finder as a search data provider, do the following:

1. [Execute search and search suggestion requests](#executing), which implies the following actions:

    1. Handling the search request.
    2. Building a query object from the customer’s request. Usually, the request contains a query string, facets, and pagination. All project-specific parameters must be used.
    3. Making a request to FACT-Finder with the built query object.
    4. Mapping the response to the shop’s specific format.

2. [Handle search update events](#populate).

<a name="executing"></a>

### Executing search and search suggestion requests

To execute the search and search suggestion requests, follow these steps:

#### 1. Build and pass a query

1. Define, for example, the `FfSearchQueryTransfer` object, which must contain at least `searchString` (string, customer’s input) and `requestParams` (string, containing, for example, pagination and filters):

```xml
<transfer name="FfSearchQuery">
        <property name="searchString" type="string"/>
        <property name="requestParams" type="string[]" singular="requestParam"/>
    </transfer>
```

2. Create a query model—for example, `FactFinderQuery`. The basic version can look like this:

<details>
<summary markdown='span'>Code sample</summary>

```php
class FactFinderQuery implements QueryInterface, SearchContextAwareQueryInterface
{
    /**
     * @var FfSearchQueryTransfer
     */
    private $searchQueryTransfer;

    /**
     * @var SearchContextTransfer
     */
    private $searchContextTransfer;

    /**
     * @param FfSearchQueryTransfer $queryTransfer
     */
    public function __construct(FfSearchQueryTransfer $queryTransfer)
    {
        $this->searchQueryTransfer = $queryTransfer;
    }

    /**
     * @inheritDoc
     */
    public function getSearchQuery()
    {
        return $this->searchQueryTransfer;
    }

    /**
     * @inheritDoc
     */
    public function getSearchContext(): SearchContextTransfer
    {
        $this->searchContextTransfer = $this->searchContextTransfer ?? (new SearchContextTransfer())->setSourceIdentifier(FFSearchAdapterPlugin::FF);

        return $this->searchContextTransfer;
    }

    /**
     * @inheritDoc
     */
    public function setSearchContext(SearchContextTransfer $searchContextTransfer): void
    {
        $this->searchContextTransfer = $searchContextTransfer;
    }
}
```

</details>

3. In particular `catalogSearch` and `catalogSuggestSearch`, extend `Spryker\Client\Catalog\CatalogClient`:

```php
public function catalogSuggestSearch($searchString, array $requestParameters = [])
    {
        $searchQuery = $this->buildFFSearchQuery($searchString, $requestParams);

        return $this
            ->getFactory()
            ->getSearchClient()
            ->search($searchQuery);
    }

    private function buildFFSearchQuery($searchString, $requestParams): FactFinderQuery
    {
        $ffSearchQueryTransfer = new FfSearchQueryTransfer();
        $ffSearchQueryTransfer->setSearchString($searchString)
           ->setRequestParams($requestParams);

        $searchQuery = new FactFinderQuery($ffSearchQueryTransfer);
    }
```

#### 2. Execute the search request

To handle search requests through a different source, you need your own model implementing the `SearchAdapterPluginInterface` interface.

The following is a template for this model:

<details>
<summary markdown='span'>Code sample:</summary>

```php
class FFSearchAdapterPlugin implements SearchAdapterPluginInterface
{
    const FACT_FINDER = 'FACT_FINDER';

    /**
     * @inheritDoc
     */
    public function search(QueryInterface $searchQuery, array $resultFormatters = [], array $requestParameters = [])
    {
        return <MAPPED DATA>;
    }

    /**
     * @inheritDoc
     */
    public function readDocument(SearchDocumentTransfer $searchDocumentTransfer): SearchDocumentTransfer
    {
        // TODO: Implement readDocument() method.
    }

    /**
     * @inheritDoc
     */
    public function deleteDocument(SearchDocumentTransfer $searchDocumentTransfer): bool
    {
        // TODO: Implement deleteDocument() method.
    }

    /**
     * @inheritDoc
     */
    public function deleteDocuments(array $searchDocumentTransfers): bool
    {
        // TODO: Implement deleteDocuments() method.
    }

    /**
     * @inheritDoc
     */
    public function isApplicable(SearchContextTransfer $searchContextTransfer): bool
    {
        return $searchContextTransfer->getSourceIdentifier() === self::FACT_FINDER;
    }

    /**
     * @inheritDoc
     */
    public function writeDocument(SearchDocumentTransfer $searchDocumentTransfer): bool
    {
        // TODO: Implement writeDocument() method.
    }

    /**
     * @inheritDoc
     */
    public function writeDocuments(array $searchContextTransfers): bool
    {
        // TODO: Implement writeDocuments() method.
    }

    /**
     * @inheritDoc
     */
    public function getName(): string
    {
        return self::FACT_FINDER;
    }
}
```

</details>

The `isApplicable` method in the preceding template validates that the request is supposed to be processed in this adapter—in this example, by FACT-Finder.

Make sure that all events affecting FACT-Finder-related product data are triggered with this type. For this purpose, the following change is required in `Pyz/Zed/ProductPageSearch/Persistence/Propel/Schema/spy_product_page_search.schema.xml`:

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\ProductPageSearch\Persistence"
          package="src.Orm.Zed.ProductPageSearch.Persistence">

    <table name="spy_product_abstract_page_search">
        <behavior name="synchronization">
            <parameter name="params" value='{"type":"FACT_FINDER"}'/>
        </behavior>
    </table>

    <table name="spy_product_concrete_page_search">
        <behavior name="synchronization">
            <parameter name="params" value='{"type":"FACT_FINDER"}'/>
        </behavior>
    </table>

</database>
```

#### 3. Request data from FACT-Finder

Implement method search in the adapter plugin.
Your search function receives `FactFinderQuery` with `FFSearchQueryTransfer` in it as the first argument.

Prepare proper request to a FACT-Finder based on these parameters.

If you need specific `$resultFormatters` or `$requestParameters`, use the arrays proposed in the adapter plugin.

#### 4. Map response

The general idea behind the mapping of the response is to make sure you can display the received data.

The FACT-Finder module provides a response in `FactFinderSdkSearchResponse`, but Spryker provides the complete rendering of the search results and search suggestions based on the response from the default search provider, which is Elasticsearch.

It means that in order to use the FACT-Finder response, you have to comply with the response structure produced there. This will be changed in the future, but for now, you have to implement mapping to the similar response Elasticsearch modules provides.
You have to respond with an object, supporting an array-based or `get`-based index—for example, creating a JSON object or a transfer object.

<details><summary markdown='span'>Code sample of a response from the search provider:</summary>

```json
{
  "facets": {
    "category": {},
    "price-DEFAULT-EUR-GROSS_MODE": {},
    "rating": {},
    "label": {},
    "color": {},
    "storage_capacity": {},
    "brand": {},
    "touchscreen": {},
    "weight": {},
    "merchant_name": {}
  },
  "sort": {
    "sortParamNames": [],
    "sortParamLocalizedNames": [],
    "currentSortParam": "",
    "currentSortOrder": ""
  },
  "pagination": {},
  "products": [
    {
      "images": [
        {
          "fk_product_image_set": 277,
          "id_product_image": 277,
          "product_image_key": "product_image_277",
          "updated_at": "2020-08-20 10:03:03.710824",
          "external_url_small": "https:\/\/images.icecat.biz\/img\/gallery_mediums\/29231675_7943.jpg",
          "external_url_large": "https:\/\/images.icecat.biz\/img\/gallery\/29231675_7943.jpg",
          "created_at": "2020-08-20 10:03:03.710824",
          "id_product_image_set_to_product_image": 277,
          "sort_order": 0,
          "fk_product_image": 277
        }
      ],
      "id_product_labels": [],
      "price": 19700,
      "abstract_name": "Samsung Galaxy S4 Mini",
      "id_product_abstract": 63,
      "type": "product_abstract",
      "prices": {
        "DEFAULT": 19700,
        "ORIGINAL": 20000
      },
      "abstract_sku": "063",
      "url": "\/en\/samsung-galaxy-s4-mini-63"
    }
  ],
  "spellingSuggestion": null
}
```

</details>   

Returning this JSON data as an object shows you an empty result page.

{% info_block infoBox %}

To see what is supported by Spryker’s template, refer to `CatalogDependencyProvider::createCatalogSearchResultFormatterPlugins`.

{% endinfo_block %}

The response structure for search suggestions must be investigated in a similar way.

<a name="populate"></a>

### Populate Fact Finder with product data

To handle search update events, use the instructions from the following sections.


#### 1. Adjust the Adapter plugin

To handle search update events, you have to implement the following methods of the `SearchAdapterPluginInterface`:

* `deleteDocument`—when a single document is supposed to be removed. You will receive an internal identifier as a key
* `deleteDocuments`—when documents are supposed to be removed in bulk. You will receive a list of internal identifiers
* `writeDocument`
* `writeDocuments`

#### 2. Handle the events

Since Spryker stores not only product data in Elasticsearch, but also CMS pages and categories, you have to make sure that only product data is handled by the FACT-Finder adapter.

To achieve this, in `spy_product_page_search.schema.xml`, change the schema for the search documents. Make sure to use the same source identifier as used in the adapter class.

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="zed" xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\ProductPageSearch\Persistence"
          package="src.Orm.Zed.ProductPageSearch.Persistence">

    <table name="spy_product_abstract_page_search">
        <behavior name="synchronization">
            <parameter name="params" value='{"type":"FACT_FINDER"}'/>
        </behavior>
    </table>

    <table name="spy_product_concrete_page_search">
        <behavior name="synchronization">
            <parameter name="params" value='{"type":"FACT_FINDER"}'/>
        </behavior>
    </table>

</database>
```

#### 3. Map data

To load and map data properly, you might have to adjust data loaders, expanders, and mappers in `ProductPageSearchDependencyProvider`, both for product abstract and product concrete.

After completing these steps, the search engine is integrated into your project.

## Using search service provider in Glue API

The current version of the catalog search in Glue has more requirements for the response.

It expects that `sort` value in the response supports `toArray` function and contains `sortParamNames`, `sortParamLocalizedNames`, `currentSortParam`, and `currentSortOrder` fields. As a reference, use the `RestCatalogSearchSortTransfer` transfer object.
