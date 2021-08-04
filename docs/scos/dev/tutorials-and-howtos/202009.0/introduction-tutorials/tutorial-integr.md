---
title: Tutorial - Integrating any search engine into a project
originalLink: https://documentation.spryker.com/v6/docs/tutorial-integrating-any-search-engine
redirect_from:
  - /v6/docs/tutorial-integrating-any-search-engine
  - /v6/docs/en/tutorial-integrating-any-search-engine
---

In a Spryker-based project, you can use any external search provider instead of the default Elasticsearch. This tutorial will teach you how to replace the default Elasticsearch with any other search engine.

## Challenge description
Every search engine comes along with its own functionalities and search approaches. However, integration of search & search suggestions is similar in most of the search platforms. 

In this tutorial, we will show you how to integrate the FACT-Finder (PHP) search platform. A system integrator development team could use this guide to integrate other platforms, taking into account the differences of the target search platform.

The integration is following the concept described in [Search Migration Concept](https://documentation.spryker.com/docs/search-migration-concept).

## Challenge solving highlights
To use FACT-Finder as a search data provider, you have to do the following:

1. [Execute search and search suggestion requests](#executing), which implies:

    1. Handling the search request.
    2. Building a query object from the customer’s request. Usually, the request contains a query string, facets, pagination. All project-specific parameters must be used.
    3. Making a request to FACT-Finder with the built query object.
    4. Mapping the response to the shop’s specific format.

2. [Handle search update events](#populate).

<a name="executing"></a>

### Executing search & search suggestion requests
To execute the search and search suggestion requests, follow the instructions below.

#### 1. Build and pass a query
To build a query, you have to define, for example, `FfSearchQueryTransfer` object, which should contain at least `searchString` (*string*, customer’s input) and `requestParams` (*string[]*, containing, for example, pagination and filters):

```
<transfer name="FfSearchQuery">
        <property name="searchString" type="string"/>
        <property name="requestParams" type="string[]" singular="requestParam"/>
    </transfer>
```
Then you create a query model, for example, `FactFinderQuery`. The basic version might look like this:

<details open>
<summary>Code sample</summary>

```PHP
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

This being done, you extend `Spryker\Client\Catalog\CatalogClient`, in particular `catalogSearch` and `catalogSuggestSearch`:

```PHP
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

#### 2. Executing the search request
To handle search requests through a different source, you need your own model implementing the `SearchAdapterPluginInterface` interface.

Template for this model is:

<details open>
<summary>Code sample</summary>

```PHP
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
    
`isApplicable` method in the template above validates that the request is supposed to be processed in this adapter, in our example via FACT-Finder. 

You have to make sure that all events affecting FACT-Finder-related product data are triggered with this type. For this purpose, the following change is required in `Pyz/Zed/ProductPageSearch/Persistence/Propel/Schema/spy_product_page_search.schema.xml`:   

```XML
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
#### 3. Requesting data from FACT-Finder
At this point, you have to implement method search in the aforementioned [adapter plugin](#executing).
Your search function will receive `FactFinderQuery` with `FFSearchQueryTransfer` in it as the first argument.

Prepare proper request to a FACT-Finder based on these parameters.

If you need specific `$resultFormatters` or `$requestParameters`, use the arrays proposed in the adapter plugin.    

#### 4. Mapping response
The general idea behind mapping of the response is to make sure you’re able to display the received data.

The FACT-Finder module provides a response in `FactFinderSdkSearchResponse`, but Spryker provides complete rendering of the search results and search suggestions based on the response from the default search provider, which is Elasticsearch. 

It means that in order to use the FACT-Finder response, you have to comply with the response structure produced there. This would be changed in the future, but for now, you have to implement mapping to the similar response Elasticsearch modules provides.
You have to respond with an object, supporting an array-based or `get`-based index. For example, creating a JSON object or a transfer object.

Example of a response from the search provider:
<details open>
<summary>Code sample</summary>

```
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

Returning this JSON data as an object will show you an empty result page.     
{% info_block infoBox %}

Refer to `CatalogDependencyProvider::createCatalogSearchResultFormatterPlugins` to see what is supported by Spryker’s templates.

{% endinfo_block %}
    
 Response structure for search suggestions should be investigated in the similar way.
    
<a name="populate"></a>
 
### Populating Fact Finder with Product Data
To handle search update events, follow the instructions below.


#### 1. Adjust the Adapter plugin
To handle search update events, you have to implement the following methods of the `SearchAdapterPluginInterface`:

* `deleteDocument` - when a single document is supposed to be removed. You will receive an internal identifier as a key.
* `deleteDocuments` -  when documents are supposed to be removed in bulk. You will receive a list of internal identifiers.
* `writeDocument`
* `writeDocuments`

#### 2. Handle the events
Since Spryker stores not only product data in Elasticsearch, but also CMS pages, categories, etc., you have to make sure that only product data is handled by the FACT-Finder adapter.

To achieve this, change schema for the search documents in `spy_product_page_search.schema.xml`. Make sure to use the same source identifier as used in the adapter class.
```XML
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

Having completed these steps, you should have the search engine integrated into your project.

## Using search service provider in Glue API
The current version of catalog-search in Glue has more requirements for the response.

It expects that `sort` value in the response supports `toArray` function and contains fields `sortParamNames`, `sortParamLocalizedNames`, `currentSortParam`, `currentSortOrder`. As a reference, use the `RestCatalogSearchSortTransfer` transfer object.    

    
