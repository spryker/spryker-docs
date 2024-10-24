---
title: Configure a search query
description: This document explains how to configure a search query.
last_updated: Jul 29, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/configuring-search-query
originalArticleId: a769773d-0ce1-4c0c-86e9-02755c0f9999
redirect_from:
  - /2021080/docs/configuring-search-query
  - /2021080/docs/en/configuring-search-query
  - /docs/configuring-search-query
  - /docs/en/configuring-search-query
  - /v6/docs/configuring-search-query
  - /v6/docs/en/configuring-search-query
  - /v5/docs/configuring-search-query
  - /v5/docs/en/configuring-search-query
  - /v4/docs/configuring-search-query
  - /v4/docs/en/configuring-search-query
  - /v3/docs/configuring-search-query
  - /v3/docs/en/configuring-search-query
  - /v2/docs/configuring-search-query
  - /v2/docs/en/configuring-search-query
  - /v1/docs/configuring-search-query
  - /v1/docs/en/configuring-search-query
  - /v6/docs/search-query
  - /v6/docs/en/search-query
  - /v4/docs/search-query
  - /v4/docs/en/search-query
  - /v5/docs/search-query
  - /v5/docs/en/search-query
  - /v3/docs/search-query
  - /v3/docs/en/search-query
  - /v2/docs/search-query
  - /v2/docs/en/search-query
  - /docs/scos/dev/back-end-development/data-manipulation/data-interaction/search/configuring-the-search-query.html
  - /docs/scos/dev/back-end-development/data-manipulation/data-interaction/search/configure-a-search-query.html
  - /docs/pbc/all/search/202311.0/tutorials-and-howtos/configure-a-search-query.html
related:
  - title: Configure Elasticsearch
    link: docs/pbc/all/search/page.version/base-shop/tutorials-and-howtos/configure-elasticsearch.html
  - title: Configure search for multi-currency
    link: docs/pbc/all/search/page.version/base-shop/tutorials-and-howtos/configure-search-for-multi-currency.html
  - title: Configure search features
    link: docs/pbc/all/search/page.version/base-shop/tutorials-and-howtos/configure-search-features.html
  - title: Expand search data
    link: docs/pbc/all/search/page.version/base-shop/tutorials-and-howtos/expand-search-data.html
  - title: Facet filter overview and configuration
    link: docs/pbc/all/search/page.version/base-shop/tutorials-and-howtos/facet-filter-overview-and-configuration.html
---

Once you have all the necessary data in Elasticsearch, you can display it on Yves.

To achieve this, [query Elasticsearch](#query-elasticsearch), which returns raw data needed for [processing the query result](#process-query-result) to display it in the templates.

In `SearchClient`, you can find the `search()` method `(\Spryker\Client\Search\SearchClientInterface::search())`. Call this method to execute any search query. It expects to receive an instance of `\Spryker\Client\SearchExtension\Dependency\Plugin\QueryInterface` as the first parameter, which represents the query itself, and a collection of `\Spryker\Client\SearchExtension\Dependency\Plugin\ResultFormatterPluginInterface` instances, which are applied to the response data to format it.

## Query Elasticsearch

The first step is implementing the `QueryInterface`. To communicate with Elasticsearch, Spryker uses the [Elastica](http://elastica.io/) library as a Data Query Language.

Inside `QueryInterface`, create an instance of `\Elastica\Query`, configure it to fit your needs, and then return it with `getSearchQuery()`.

This is the point where configuring the query is completely up to you. Use Elastica to alter the query to your needs, add filters, aggregations, boosts, sorting, pagination, or anything else you like and Elasticsearch allows you.

{% info_block infoBox %}

The `QueryInterface` instance is a stateful class; sometimes, the `getSearchQuery()` method is called multiple times and alters the original query (see [Expanding queries](#expand-queries)), so make sure that it returns the same instance. This can be achieved by creating the `\Elastica\Query` instance at construction time and returning it in the `getSearchQuery()` method.

{% endinfo_block %}

Besides, this new `QueryInterface ` instance has to implement `Spryker\Client\SearchExtension\Dependency\Plugin\SearchContextAwareQueryInterface`. To be compliant with this interface, implementations for the `::setSearchContext()` and `::getSearchContext()` methods must be provided. This is needed for setting and maintaining a search context that is later used during the search process, particularly for resolving the correct Elasticsearch index for search. For more information, see [Search migration concept](/docs/pbc/all/search/{{site.version}}/base-shop/install-and-upgrade/search-migration-concept.html).


<details>
<summary>Query</summary>

```php
<?php

namespace Pyz\Client\Catalog\Plugin\Query;

use Elastica\Query;
use Elastica\Query\MatchAll;
use Generated\Shared\Search\PageIndexMap;
use Spryker\Client\Kernel\AbstractPlugin;
use Spryker\Client\SearchExtension\Dependency\Plugin\QueryInterface;
use Spryker\Client\SearchExtension\Dependency\Plugin\SearchContextAwareQueryInterface;

class MatchAllQueryPlugin extends AbstractPlugin implements QueryInterface, SearchContextAwareQueryInterface
{

    protected const SOURCE_IDENTIFIER = 'page';

    /**
     * @var \Elastica\Query
     */
    protected $query;

    /**
     * @var \Generated\Shared\Transfer\SearchContextTransfer
     */
    protected $searchContextTransfer;

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

    /**
     * @return \Generated\Shared\Transfer\SearchContextTransfer
     */
    public function getSearchContext(): SearchContextTransfer
    {
        if (!$this->hasSearchContext()) {
            $this->setupDefaultSearchContext();
        }

        return $this->searchContextTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\SearchContextTransfer $searchContextTransfer
     *
     * @return void
     */
    public function setSearchContext(SearchContextTransfer $searchContextTransfer): void
    {
        $this->searchContextTransfer = $searchContextTransfer;
    }

    /**
     * @return void
     */
    protected function setupDefaultSearchContext(): void
    {
        $searchContextTransfer = new SearchContextTransfer();
        $searchContextTransfer->setSourceIdentifier(static::SOURCE_IDENTIFIER);

        $this->searchContextTransfer = $searchContextTransfer;
    }

    /**
     * @return bool
     */
    protected function hasSearchContext(): bool
    {
        return (bool)$this->searchContextTransfer;
    }

}
```
</details>

In the preceding example, a simple query is created, which returns all the documents from your mapping type.
To execute this query, you need to call the `search()` method of the `SearchClient`.

## Expand queries

Query expanders are a way to reuse partial queries to build more complex ones.

The suggested way to create queries is to create the simplest possible query as a base query for your use case. Then, use query expanders to expand it with other reusable behaviors, such as pagination or sorting.

You can create a new expander by implementing `\Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface`.

Again, if you use query expanders, make sure that your base query is expandable so it provides the same instance by calling `getSearchQuery()` multiple times.

To expand a base query with a collection of expanders, use `expandQuery()` method from the `SearchClient`:

```php
<?php
    // ...

    /**
     * @var \Spryker\Client\Search\SearchClientInterface
     */
    protected $searchClient;

    // ...

    /**
     * @param \Spryker\Client\SearchExtension\Dependency\Plugin\QueryInterface $baseQuery
     * @param \Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface[] $queryExpanders
     * @param array $requestParameters
     *
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\QueryInterface
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
### Query expander plugins

Spryker provides the following query expander plugins.

#### Filter by store

The *Filter by store* feature is a background capability that enables filtering content according to the request's store.
To filter content according to the request's store, use `\Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\StoreQueryExpanderPlugin`.

#### Filter by locale

The *Filter by locale* feature is a background capability that enables filtering content according to the request's locale.
To filter content according to the request's store, use `\Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\LocalizedQueryExpanderPlugin`.

#### Filter by the "is active" flag

To display only active records in search results, use `\Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\IsActiveQueryExpanderPlugin`. Add this to expander plugin stack, for example `\Pyz\Client\Catalog\CatalogDependencyProvider::createSuggestionQueryExpanderPlugins`. You also must export the `is-active` field by your search collector. The value for it is a boolean.

#### Filter by "is active" within a given date range

To display only records which are active within a given date range, use `\Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\IsActiveInDateRangeQueryExpanderPlugin`. Add this plugin to expander plugin stack—for example, `\Pyz\Client\Catalog\CatalogDependencyProvider::createSuggestionQueryExpanderPlugins`.

You also must export `active-from` and `active-to` by your search collector. The value is any valid Elasticsearch Date datatype value. For more information, see [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/date.html#date).

#### Faceted navigation and filters

The *Faceted navigation and filtering* feature lets you refilter search results by specific criteria. The filters are commonly displayed on the left side of the catalog page.

`\Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\FacetQueryExpanderPlugin` is responsible for adding necessary aggregations to your query based on a predefined configuration (see [Configure search features](/docs/pbc/all/search/{{page.version}}/base-shop/tutorials-and-howtos/configure-search-features.html). Use this plugin to get the necessary data for the faceted navigation of your search results.

{% info_block warningBox "Note" %}

If you use this plugin, add `\Spryker\Client\SearchElasticsearch\Plugin\ResultFormatter\FacetResultFormatterPlugin` to your result formatter collection, which processes the returned raw aggregation data.

{% endinfo_block %}

To optimize facet aggregations, the `Search` module combines all fields in groups of simple faceted aggregations—for example, `string-facet`. However, in some cases, you need more control over facet generation.

To manage each facet filter separately, check the `aggregationParams` field in `FacetConfigTransfer`. If no custom parameters are set to a facet config, it is grouped by default.

However, if your project requires more, replace the default behavior in the provided extension points. `FacetQueryExpanderPlugin`, `FacetResultFormatterPlugin` are good points to start.

#### Paginate the results

It provides information about paginating the catalog pages and their current state.

`\Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\PaginatedQueryExpanderPlugin` takes care of paginating your results based on the predefined configuration.

{% info_block warningBox "Note" %}

If you use this plugin, add `\Spryker\Client\SearchElasticsearch\Plugin\ResultFormatter\PaginatedResultFormatterPlugin` to your result formatter collection.

{% endinfo_block %}

#### Sort the results

It provides information and functionality necessary for sorting the results.
`\Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\SortedQueryExpanderPlugin` takes care of sorting your results based on the predefined configuration. The necessary result formatter for this plugin is `\Spryker\Client\SearchElasticsearch\Plugin\ResultFormatter\SortedResultFormatterPlugin`.

#### Spell suggestion

It adds a spelling correction suggestion to search results.
Use `\Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\SpellingSuggestionQueryExpanderPlugin` to allow Elasticsearch to provide the "did you mean" suggestions for full-text search typos. The suggestions are collected from the `suggestion_terms` field of the `page` index map. Therefore, inside this field, store only the information that you want to use for this purpose. The necessary result formatter for this plugin is `\Spryker\Client\SearchElasticsearch\Plugin\ResultFormatter\SpellingSuggestionResultFormatterPlugin`

#### Fuzzy search (query)

{% info_block warningBox "Note" %}

Fuzzy search is valid for Master Suite only and has not been integrated into B2B/B2C Suites yet.

{% endinfo_block %}

It looks up for products even if a customer makes typos and spelling mistakes in a search query. Use `\Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\FuzzyQueryExpanderPlugin` to allow Elasticsearch to add the `"fuzziness": "AUTO" parameter` to any matching query that is created as the suggested search.

Before enabling this plugin for the primary search (not a suggestions search), make sure that you are not using the `cross_fields` search type, which is not allowed in conjunction with the [fuzzy search in Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html#crossfields-fuzziness).
You can change this behavior by overriding `\Spryker\Client\Catalog\Plugin\Elasticsearch\Query\CatalogSearchQueryPlugin` on the project level and adjusting the `createMultiMatchQuery` method.
For example, you can change the type to the `best_fields`:
```php
 /**
     * @param array<string> $fields
     * @param string $searchString
     *
     * @return \Elastica\Query\MultiMatch
     */
    protected function createMultiMatchQuery(array $fields, string $searchString): MultiMatch
    {
        return (new MultiMatch())
            ->setFields($fields)
            ->setType(MultiMatch::TYPE_BEST_FIELDS)
            ->setFuzziness(MultiMatch::FUZZINESS_AUTO)
            ->setQuery($searchString)
            ->setType(MultiMatch::TYPE_BEST_FIELDS);
    }
```
Please check [official Elastic Search documentation]{https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html#multi-match-types} in order to pick most preferable type for the multi-match search query.

#### Suggestions by page type

Suggestions by page type result by page types such as a category, products, and CMS pages. To return sets of documents matching a full-text search query grouped by type, use `\Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\SuggestionByTypeQueryExpanderPlugin` —for example, "product", "category", or "cms page". Typical usage for this plugin is suggesting the top results by type when the user is typing in the search field. The necessary result formatter for this plugin is `\Spryker\Client\SearchElasticsearch\Plugin\ResultFormatter\SuggestionByTypeResultFormatterPlugin`.

#### Autocompletion

Autocompletion adds the functionality to predict the rest of the word or search string.
`\Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\CompletionQueryExpanderPlugin` provides top completion terms for full-text search queries. Typical usage for this plugin is autocompleting the input of users with the top result when they type something in the full-text search field and providing more suggestions as they type. The suggestions are collected from the `completion_terms` field of the `page` index map. Hence, make sure to store only the information inside the field that you'd like to use for this purpose. The necessary result formatter for this plugin is `\Spryker\Client\SearchElasticsearch\Plugin\ResultFormatter\CompletionResultFormatterPlugin`.

{% info_block infoBox "Autocompletion preparations" %}

To enable autocompletion when the user types, add some analyzers to the full-text search fields. Without this, the standard analyzer of Elasticsearch only provides suggestions after each completed word. The solution to providing mid-word suggestions is to add an [edge ngram filter](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-edgengram-tokenfilter.html) to the fields in which you are searching. To add this behavior to the `page` index, add the following settings to your `src/Pyz/Shared/Search/Schema/page.json` file.

Keep in mind that for existing indexes, changing the analyzers is not possible, so you need to set it up from the ground.

{% endinfo_block %}

<details>
<summary>src/Pyz/Shared/Search/Schema/page.json</summary>

```json
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
</details>

<a name="process"></a>

#### Process query result

After creating your query, process the raw response from Elasticsearch. This is done by providing a collection of `\Spryker\Client\SearchExtension\Dependency\Plugin\ResultFormatterPluginInterface`.
To create one, extend `\Spryker\Client\SearchElasticsearch\Plugin\ResultFormatter\AbstractElasticsearchResultFormatterPlugin`.
It's also possible to not provide any result formatters; in this case, the raw response is returned at the end.

<details>
<summary>Pyz\Client\Catalog\Plugin\ResultFormatter</summary>

```php
<?php

namespace Pyz\Client\Catalog\Plugin\ResultFormatter;

use Elastica\Result;
use Elastica\ResultSet;
use Generated\Shared\Search\PageIndexMap;
use Spryker\Client\SearchElasticsearch\Plugin\ResultFormatter\AbstractElasticsearchResultFormatterPlugin;

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

        foreach ($searchResult->getResults() as $result) {
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
</details>

To execute the previously created query along with this result formatter plugin, you need to call the `search()` method of `SearchClient` and provide this formatter to its second parameter.

When you use the result formatter plugins, the result of the `SearchClient::search()` method is an associative array, where the keys are the name of each result formatters (provided by the `getName()` method) and the values are the response for each result formatter.

This way, in your controller, where you get the response at the end, you can simply provide everything you get right to the template to care of.
