---
title: Migration Guide - ProductNew
originalLink: https://documentation.spryker.com/v5/docs/migration-guide-productnew
originalArticleId: 42e51c20-58e2-4e21-b671-c66e7d98210f
redirect_from:
  - /v5/docs/migration-guide-productnew
  - /v5/docs/en/migration-guide-productnew
---

## Upgarding from Version 1.1* to Version 1.2*
{% info_block errorBox "Prerequisites" %}

This migration guide is a part of the [Search migration effort](/docs/scos/dev/migration-concepts/search-migration-concept/search-migration-concept.html). Prior to upgarding this module, make sure you have completed all the steps from the [Search Migration Guide](/docs/scos/dev/module-migration-guides/{{page.version}}/migration-guide-search.html#upgrading-from-version-8-9---to-version-8-10--). 

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
