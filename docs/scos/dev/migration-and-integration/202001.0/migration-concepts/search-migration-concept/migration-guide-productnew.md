---
title: Migration Guide - ProductNew
originalLink: https://documentation.spryker.com/v4/docs/migration-guide-productnew
originalArticleId: c645ac19-d8d4-4d83-958a-1b7dd67a86f3
redirect_from:
  - /v4/docs/migration-guide-productnew
  - /v4/docs/en/migration-guide-productnew
---

{% info_block errorBox "Prerequisites" %}

This migration guide is a part of the [Search migration effort](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/search-migration-concept/search-migration-concept.html). Prior to upgarding this module, make sure you have completed all the steps from the [Search Migration Guide](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/search-migration-concept/migration-guide-search.html). 

{% endinfo_block %}
To upgrade the module, do the following:
1. Remove all  deprecated query expander and result formatter plugins coming from the Search module (if any) from `Pyz\Client\ProductNew\ProductNewDependencyProvider`:

```php
\Spryker\Client\Search\Plugin\Elasticsearch\QueryExpander\FacetQueryExpanderPlugin;
\Spryker\Client\Search\Plugin\Elasticsearch\QueryExpander\LocalizedQueryExpanderPlugin;
\Spryker\Client\Search\Plugin\Elasticsearch\QueryExpander\PaginatedQueryExpanderPlugin;
\Spryker\Client\Search\Plugin\Elasticsearch\QueryExpander\SortedQueryExpanderPlugin;
\Spryker\Client\Search\Plugin\Elasticsearch\QueryExpander\StoreQueryExpanderPlugin;
\Spryker\Client\Search\Plugin\Elasticsearch\ResultFormatter\FacetResultFormatterPlugin;
\Spryker\Client\Search\Plugin\Elasticsearch\ResultFormatter\PaginatedResultFormatterPlugin;
\Spryker\Client\Search\Plugin\Elasticsearch\ResultFormatter\SortedResultFormatterPlugin;
```
2. Enable the new plugins from SearchElasticsearch in `Pyz\Client\ProductNew\ProductNewDependencyProvider`:

Pyz\Client\ProductNew
   
```php
<?php

namespace Pyz\Client\ProductNew;

...
use Spryker\Client\ProductNew\ProductNewDependencyProvider as SprykerProductNewDependencyProvider;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\FacetQueryExpanderPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\LocalizedQueryExpanderPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\PaginatedQueryExpanderPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\SortedQueryExpanderPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\StoreQueryExpanderPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\ResultFormatter\FacetResultFormatterPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\ResultFormatter\PaginatedResultFormatterPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\ResultFormatter\SortedResultFormatterPlugin;

class ProductNewDependencyProvider extends SprykerProductNewDependencyProvider
{
    ...
    /**
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface[]
     */
    protected function getNewProductsQueryExpanderPlugins()
    {
        return [
            ...
            new StoreQueryExpanderPlugin(),
            new LocalizedQueryExpanderPlugin(),
            new SortedQueryExpanderPlugin(),
            new PaginatedQueryExpanderPlugin(),

            /**
             * FacetQueryExpanderPlugin needs to be after other query expanders which filters down the results.
             */
            new FacetQueryExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Client\SearchExtension\Dependency\Plugin\ResultFormatterPluginInterface[]
     */
    protected function getNewProductsResultFormatterPlugins()
    {
        return [
            ...
            new FacetResultFormatterPlugin(),
            new SortedResultFormatterPlugin(),
            new PaginatedResultFormatterPlugin(),
        ];
    }
}
```
