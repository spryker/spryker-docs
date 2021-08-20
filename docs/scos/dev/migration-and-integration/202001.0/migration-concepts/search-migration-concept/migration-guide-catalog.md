---
title: Migration Guide - Catalog
originalLink: https://documentation.spryker.com/v4/docs/migration-guide-catalog
originalArticleId: bc363b22-486a-40e8-9b36-9f73ba064060
redirect_from:
  - /v4/docs/migration-guide-catalog
  - /v4/docs/en/migration-guide-catalog
---

{% info_block errorBox "Prerequisites" %}

This migration guide is a part of the [Search migration effort](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/search-migration-concept/search-migration-concept.html). Prior to upgarding this module, make sure you have completed all the steps from the [Search Migration Guide](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/search-migration-concept/migration-guide-search.html). 

{% endinfo_block %}
To upgrade the module, do the following:
1. Remove usages of all deprecated query expander and result formatter plugins (if any) from `Pyz\Client\Catalog\CatalogDependencyProvider`
```php
Spryker\Client\Search\Plugin\Elasticsearch\QueryExpander\CompletionQueryExpanderPlugin
Spryker\Client\Search\Plugin\Elasticsearch\QueryExpander\FacetQueryExpanderPlugin
Spryker\Client\Search\Plugin\Elasticsearch\QueryExpander\IsActiveInDateRangeQueryExpanderPlugin
Spryker\Client\Search\Plugin\Elasticsearch\QueryExpander\IsActiveQueryExpanderPlugin
Spryker\Client\Search\Plugin\Elasticsearch\QueryExpander\LocalizedQueryExpanderPlugin
Spryker\Client\Search\Plugin\Elasticsearch\QueryExpander\PaginatedQueryExpanderPlugin
Spryker\Client\Search\Plugin\Elasticsearch\QueryExpander\SortedCategoryQueryExpanderPlugin
Spryker\Client\Search\Plugin\Elasticsearch\QueryExpander\SortedQueryExpanderPlugin
Spryker\Client\Search\Plugin\Elasticsearch\QueryExpander\SpellingSuggestionQueryExpanderPlugin
Spryker\Client\Search\Plugin\Elasticsearch\QueryExpander\StoreQueryExpanderPlugin
Spryker\Client\Search\Plugin\Elasticsearch\QueryExpander\SuggestionByTypeQueryExpanderPlugin
Spryker\Client\Search\Plugin\Elasticsearch\ResultFormatter\CompletionResultFormatterPlugin
Spryker\Client\Search\Plugin\Elasticsearch\ResultFormatter\FacetResultFormatterPlugin
Spryker\Client\Search\Plugin\Elasticsearch\ResultFormatter\PaginatedResultFormatterPlugin
Spryker\Client\Search\Plugin\Elasticsearch\ResultFormatter\SortedResultFormatterPlugin
Spryker\Client\Search\Plugin\Elasticsearch\ResultFormatter\SpellingSuggestionResultFormatterPlugin
Spryker\Client\Search\Plugin\Elasticsearch\ResultFormatter\SuggestionByTypeResultFormatterPlugin
```
2. Enable the replacement plugins:

Pyz\Client\Catalog
   
```php
<?php

namespace Pyz\Client\Catalog;

use Spryker\Client\Catalog\CatalogDependencyProvider as SprykerCatalogDependencyProvider;
use Spryker\Client\CatalogPriceProductConnector\Plugin\ProductPriceQueryExpanderPlugin;
use Spryker\Client\Catalog\Plugin\ConfigTransferBuilder\CategoryFacetConfigTransferBuilderPlugin;
use Spryker\Client\CatalogPriceProductConnector\Plugin\CurrencyAwareCatalogSearchResultFormatterPlugin;
use Spryker\Client\Catalog\Plugin\Elasticsearch\ResultFormatter\RawCatalogSearchResultFormatterPlugin;
use Spryker\Client\CatalogPriceProductConnector\Plugin\CurrencyAwareSuggestionByTypeResultFormatter;
use Spryker\Client\Catalog\Plugin\Elasticsearch\QueryExpander\PaginatedProductConcreteCatalogSearchQueryExpanderPlugin;
...
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\CompletionQueryExpanderPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\FacetQueryExpanderPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\IsActiveInDateRangeQueryExpanderPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\IsActiveQueryExpanderPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\LocalizedQueryExpanderPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\PaginatedQueryExpanderPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\SortedCategoryQueryExpanderPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\SortedQueryExpanderPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\SpellingSuggestionQueryExpanderPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\StoreQueryExpanderPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\SuggestionByTypeQueryExpanderPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\ResultFormatter\CompletionResultFormatterPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\ResultFormatter\FacetResultFormatterPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\ResultFormatter\PaginatedResultFormatterPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\ResultFormatter\SortedResultFormatterPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\ResultFormatter\SpellingSuggestionResultFormatterPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\ResultFormatter\SuggestionByTypeResultFormatterPlugin;

class CatalogDependencyProvider extends SprykerCatalogDependencyProvider
{
    ...

    /**
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface[]
     */
    protected function createCatalogSearchQueryExpanderPlugins()
    {
        return [
            new StoreQueryExpanderPlugin(),
            new LocalizedQueryExpanderPlugin(),
            new ProductPriceQueryExpanderPlugin(),
            new SortedQueryExpanderPlugin(),
            new SortedCategoryQueryExpanderPlugin(CategoryFacetConfigTransferBuilderPlugin::PARAMETER_NAME),
            new PaginatedQueryExpanderPlugin(),
            new SpellingSuggestionQueryExpanderPlugin(),
            new IsActiveQueryExpanderPlugin(),
            new IsActiveInDateRangeQueryExpanderPlugin(),

            /**
             * FacetQueryExpanderPlugin needs to be after other query expanders which filters down the results.
             */
            new FacetQueryExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\ResultFormatterPluginInterface[]
     */
    protected function createCatalogSearchResultFormatterPlugins()
    {
        return [
            new FacetResultFormatterPlugin(),
            new SortedResultFormatterPlugin(),
            new PaginatedResultFormatterPlugin(),
            new CurrencyAwareCatalogSearchResultFormatterPlugin(
                new RawCatalogSearchResultFormatterPlugin()
            ),
            new SpellingSuggestionResultFormatterPlugin(),
        ];
    }

    /**
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface[]
     */
    protected function createSuggestionQueryExpanderPlugins()
    {
        return [
            new StoreQueryExpanderPlugin(),
            new LocalizedQueryExpanderPlugin(),
            new CompletionQueryExpanderPlugin(),
            new SuggestionByTypeQueryExpanderPlugin(),
            new IsActiveQueryExpanderPlugin(),
            new IsActiveInDateRangeQueryExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\ResultFormatterPluginInterface[]
     */
    protected function createSuggestionResultFormatterPlugins()
    {
        return [
            new CompletionResultFormatterPlugin(),
            new CurrencyAwareSuggestionByTypeResultFormatter(
                new SuggestionByTypeResultFormatterPlugin()
            ),
        ];
    }

    /**
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface[]
     */
    protected function createCatalogSearchCountQueryExpanderPlugins(): array
    {
        return [
            new StoreQueryExpanderPlugin(),
            new LocalizedQueryExpanderPlugin(),
            new IsActiveQueryExpanderPlugin(),
            new IsActiveInDateRangeQueryExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface[]
     */
    protected function getProductConcreteCatalogSearchQueryExpanderPlugins(): array
    {
        return [
            new LocalizedQueryExpanderPlugin(),
            new PaginatedProductConcreteCatalogSearchQueryExpanderPlugin(),
        ];
    }
}
```
