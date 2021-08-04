---
title: Configuring the Search Query
originalLink: https://documentation.spryker.com/v3/docs/configuring-search-query
redirect_from:
  - /v3/docs/configuring-search-query
  - /v3/docs/en/configuring-search-query
---

Once we have all necessary data in Elasticsearch, it’s time to display them in Yves.

In order to achieve this, we first need to query Elasticsearch, which will return raw data for us that we need to Process Query Result to display it in our templates.

In the `SearchClient` you can find the `search()` method `(\Spryker\Client\Search\SearchClientInterface::search())`.

This is the method that you need to call to execute any search query. It expects to receive an instance of `\Spryker\Client\Search\Dependency\Plugin\QueryInterface` as first parameter, which represents the query itself, and a collection of `\Spryker\Client\Search\Dependency\Plugin\ResultFormatterPluginInterface` instances which will be applied on the response data to format it.

## Querying Elasticsearch
The first thing we need to do is to implement the QueryInterface. To communicate with Elasticsearch, Spryker uses the [Elastica](http://elastica.io/) library as a Data Query Language.

Inside the `QueryInterface` you need to create an instance of `\Elastica\Query`, configure it to fit your needs, then return it with `getSearchQuery()`.

This is the point where configuring the query is completely up to you, use Elastica to alter the query for your needs, add filters, aggregations, boosts, sorting, pagination or anything else you like and Elasticsearch enables you.
{% info_block infoBox %}
The `QueryInterface` instance is a stateful class; sometimes `getSearchQuery(
{% endinfo_block %}` method is called multiple times and alters the original query (see: Expandig queries), so you need to make sure that it returns the same instance. This can be achieved by creating the \Elastica\Query instance atconstruction time and just return it in the `getSearchQuery()` method.)

<details open>
<summary>Query</summary>
   
```
<?php

namespace Pyz\Client\Catalog\Plugin\Query;

use Elastica\Query;
use Elastica\Query\MatchAll;
use Generated\Shared\Search\PageIndexMap;
use Spryker\Client\Kernel\AbstractPlugin;
use Spryker\Client\Search\Dependency\Plugin\QueryInterface;

class MatchAllQueryPlugin extends AbstractPlugin implements QueryInterface
{

    /**
     * @var \Elastica\Query
     */
    protected $query;

    /**
     * @param string $searchString
     */
    public function __construct()
    {
        $this-->query = $this->createSearchQuery();
    }

    /**
     * @return \Elastica\Query
     */
    public function getSearchQuery()
    {
        return $this-->query;
    }

    /**
     * @return \Elastica\Query
     */
    protected function createSearchQuery()
    {
        $query = new Query();
        $query = $this->addMatchAllQuery($query);
        $query->setSource([PageIndexMap::SEARCH_RESULT_DATA]);

        return $query;
    }

    /**
     * @param \Elastica\Query $baseQuery
     *
     * @return \Elastica\Query
     */
    protected function addMatchAllQuery(Query $baseQuery)
    {
        $baseQuery->setQuery(new MatchAll());

        return $baseQuery;
    }

}
```
 <br>
</details>

In the example above, a simple query is created, which will return all the documents from our mapping type.
To execute this query you need to call the `search()` method of the `SearchClient`.

## Expanding Queries
Query expanders are a way to reuse partial queries to build more complex ones.

The suggested way to create queries is to create the simplest possible query as a base query for your usecase, then use query expanders to expand it with other reusable behaviors, such as pagination, sorting, etc.

You can create a new expander by implementing `\Spryker\Client\Search\Dependency\Plugin\QueryExpanderPluginInterface`.

Again, if you use query expanders, make sure that your base query is expandable, so it provides the same instance by calling `getSearchQuery()` multiple times.

To expand a base query with a collection of expanders, you’ll need to use `expandQuery()` method from the `SearchClient`:

```
<?php
    // ...

    /**
     * @var \Spryker\Client\Search\SearchClientInterface
     */
    protected $searchClient;

    // ...

    /**
     * @param \Spryker\Client\Search\Dependency\Plugin\QueryInterface $baseQuery
     * @param \Spryker\Client\Search\Dependency\Plugin\QueryExpanderPluginInterface[] $queryExpanders
     * @param array $requestParameters
     *
     * @return \Spryker\Client\Search\Dependency\Plugin\QueryInterface
     */
    protected function expandBaseQuery(QueryInterface $baseQuery, array $queryExpanders, array $requestParameters)
    {
        $searchQuery =  $this
            ->searchClient
            ->expandQuery($baseQuery, $queryExpanders, $requestParameters);

        return $searchQuery;
    }

    // ...
```
### Query Expander Plugins
Spryker provides the following query expander plugins:

#### Filtering by Store
The Filter by Store feature is a background capability that enables filtering content according to the request’s store.
To filter content according to the request’s store, use `\Spryker\Client\Search\Plugin\Elasticsearch\QueryExpander\StoreQueryExpanderPlugin`

#### Filtering by Locale
The Filter by Locale feature is a background capability that enables filtering content according to the request’s locale.
To filter content according to the request’s store, use `\Spryker\Client\Search\Plugin\Elasticsearch\QueryExpander\LocalizedQueryExpanderPlugin`

#### Filtering by "Is Active" Flag
To display only active records in search results you can use `\Spryker\Client\Search\Plugin\Elasticsearch\QueryExpander\IsActiveQueryExpanderPlugin`. Add this to expander plugin stack, for example `\Pyz\Client\Catalog\CatalogDependencyProvider::createSuggestionQueryExpanderPlugins`. You also have to export is-active field by your search collector. The value for it is boolean.

#### Filtering by "Is Active" Within a Given Date Range
To display only record which are active within given date range use `\Spryker\Client\Search\Plugin\Elasticsearch\QueryExpander\IsActiveInDateRangeQueryExpanderPlugin` Add this plugin to expander plugin stack, for example `\Pyz\Client\Catalog\CatalogDependencyProvider::createSuggestionQueryExpanderPlugins` You also have to export `active-from` and  `active-to` by your search collector. The value is any valid Elasticsearch Date datatype value you can read more about it [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/date.html#date).

#### Faceted Navigation and Filters
The Faceted Navigation and Filtering feature adds the ability to re-filter search results by specific criteria. Commonly displayed on the left side of the catalog page.

The responsibility of `\Spryker\Client\Search\Plugin\Elasticsearch\QueryExpander\FacetQueryExpanderPlugin` is to add the necessary aggregations to your query based on a predefined configuration (see: [Configure Search Features](/docs/scos/dev/features/202001.0/search-and-filter/search-widget-for-concrete-products/configure-searc) ). You can use this plugin to get the necessary data for faceted navigation of your search results. If you use this plugin, also make sure to add the `\Spryker\Client\Search\Plugin\Elasticsearch\ResultFormatter\FacetResultFormatterPlugin` to your result formatter collection, which takes care of processing the returned raw aggregation data.

In order to optimize facet aggregations, Search module combines all fields in groups of simple faceted aggregations (e.g. string-facet). But in some cases you need more control on facet generation.

To manage each facet filter separately, find `aggregationParams` field in `FacetConfigTransfer`. If no custom parameters are set to a facet config, it will be grouped by default.

But if your project requires more, feel free to replace default behavior in provided extension points. `FacetQueryExpanderPlugin`, `FacetResultFormatterPlugin` are good points to start.

#### Paginating the Results
Provides information about paginating the catalog pages and their current state.

`\Spryker\Client\Search\Plugin\Elasticsearch\QueryExpander\PaginatedQueryExpanderPlugin` takes care of paginating your results based on the predefined configuration. If you use this plugin, also make sure to add the `\Spryker\Client\Search\Plugin\Elasticsearch\ResultFormatter\PaginatedResultFormatterPlugin` to your result formatter collection.

#### Sorting the Results
Provides information and functionality necessary for sorting results.
`\Spryker\Client\Search\Plugin\Elasticsearch\QueryExpander\SortedQueryExpanderPlugin` takes care of sorting your results based on the predefined configuration. The necessary result formatter for this plugin is `\Spryker\Client\Search\Plugin\Elasticsearch\ResultFormatter\SortedResultFormatterPlugin`

#### Spelling Suggestion
Adds a spelling correction suggestion to search results.
Use `\Spryker\Client\Search\Plugin\Elasticsearch\QueryExpander\SpellingSuggestionQueryExpanderPlugin` to let Elasticsearch provide “did you mean” suggestions for full-text search typos. The suggestions are collected from the `suggestion_terms` field of `page` index map, so you need to make sure to store only those information inside this field that you’d like to use for this purpose. The necessary result formatter for this plugin is `\Spryker\Client\Search\Plugin\Elasticsearch\ResultFormatter\SpellingSuggestionResultFormatterPlugin`

#### Suggestions by Page Type
Provides results by page type such as products, category and CMS pages.
Use `\Spryker\Client\Search\Plugin\Elasticsearch\QueryExpander\SuggestionByTypeQueryExpanderPlugin` to return sets of documents matching a full-text search query grouped by type, i.e. “product”, “category”, “cms page”, etc. Typical usage for this plugin is suggesting the top results by type when the user is typing to the search field. The necessary result formatter for this plugin is` \Spryker\Client\Search\Plugin\Elasticsearch\ResultFormatter\SuggestionByTypeResultFormatterPlugin`

#### Autocompletion
Will add the functionality to predict the rest of the word or search string.
`\Spryker\Client\Search\Plugin\Elasticsearch\QueryExpander\CompletionQueryExpanderPlugin` provides top completion terms for full-text search queries. Typical usage for this plugins is autocompleting the input of the user with the top result when they type something to the full-text search field and also to provide more suggestions for them as they type. The suggestions are collected from the `completion_terms` field of `page` index map, so you need to make sure to store only those information inside this field that you’d like to use for this purpose. The necessary result formatter for this plugin is `\Spryker\Client\Search\Plugin\Elasticsearch\ResultFormatter\CompletionResultFormatterPlugin`

{% info_block infoBox "Autocompletion preparations" %}
In order to enable autocompletion when the user types, you'll need to add some analyzers to the full-text search fields. Without doing this the standard analyzer of Elasticsearch will only provide suggestions after each completed word. The solution to provide mid-word suggestions is to add [edge ngram filter](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-edgengram-tokenfilter.html
{% endinfo_block %} to the fields in which we are searching. To add this behavior to our `page` index, you'll need to add the following settings to your `src/Pyz/Shared/Search/IndexMap/search.json` file. Changing the analyzers is not possible for existing indexes, so you'll need to set it up from the ground.)
<details open>
<summary>Click to expand the code sample</summary>
   
```
<?php

{
  "settings": {
    "analysis": {
      "analyzer": {
        "fulltext_index_analyzer": {
          "tokenizer": "standard",
          "filter": [
            "lowercase",
            "fulltext_index_ngram_filter"
          ]
        },
        "fulltext_search_analyzer": {
          "tokenizer": "standard",
          "filter": [
            "lowercase"
          ]
        }
      },
      "filter": {
        "fulltext_index_ngram_filter": {
          "type": "edge_ngram",
          "min_gram": 2,
          "max_gram": 20
        }
      }
    }
  },
  "mappings": {
    "page": {
      "properties": {
        "full-text": {
          "analyzer": "fulltext_index_analyzer",
          "search_analyzer": "fulltext_search_analyzer"
        },
        "full-text-boosted": {
          "analyzer": "fulltext_index_analyzer",
          "search_analyzer": "fulltext_search_analyzer"
        }
      }
    }
  }
}
```
 <br>
</details>

#### Process Query Result
After you’ve created your query, you also need to take care of processing the raw response from Elasticsearch. This is done by providing a collection of `\Spryker\Client\Search\Dependency\Plugin\ResultFormatterPluginInterface`.
To create one, you need to extend `\Spryker\Client\Search\Plugin\Elasticsearch\ResultFormatter\AbstractElasticsearchResultFormatterPlugin`
It’s also possible to not provide any result formatters; in this case the raw response will be returned at the end.
<details open>
<summary>Click to expand the code sample</summary>
   
```
<?php

namespace Pyz\Client\Catalog\Plugin\ResultFormatter;

use Elastica\Result;
use Elastica\ResultSet;
use Generated\Shared\Search\PageIndexMap;
use Spryker\Client\Search\Plugin\Elasticsearch\ResultFormatter\AbstractElasticsearchResultFormatterPlugin;

class DummyResultFormatterPlugin extends AbstractElasticsearchResultFormatterPlugin
{

    const NAME = 'test';

    /**
     * @return string
     */
    public function getName()
    {
        return static::NAME;
    }

    /**
     * @param \Elastica\ResultSet $searchResult
     * @param array $requestParameters
     *
     * @return array
     */
    protected function formatSearchResult(ResultSet $searchResult, array $requestParameters)
    {
        $results = [];

        foreach ($resultSet->getResults() as $result) {
            $results[] = $this->formatResult($result);
        }

        return $results;
    }

    /**
     * @param \Elastica\Result $result
     *
     * @return mixed
     */
    protected function formatResult(Result $result)
    {
        // do something with the result ...
        return $result;
    }

}
```
 <br>
</details>
To execute the previously created query along with this result formatter plugin, you need to call the `search()` method of the `SearchClient` and provide this formatter to its second parameter.

When you use result formatter plugins, the result of the `SearchClient::search()` method will be an associative array, where the keys are the name of each result formatters (provided by `getName()` method) and the values are the response for each result formatter.

This way in your controller, where at the end you get the response, you can simply provide everything you got right to the template to care of.
<!--
 Last review date: Oct. 2nd, 2017 by Denis Turkov and Tamás Nyulas
-->
