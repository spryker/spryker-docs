---
title: Migration Guide - ProductLabelSearch
originalLink: https://documentation.spryker.com/v4/docs/migration-guide-productlabelsearch
originalArticleId: 9747c13c-be00-49e1-b966-a44a1c0460d5
redirect_from:
  - /v4/docs/migration-guide-productlabelsearch
  - /v4/docs/en/migration-guide-productlabelsearch
---

{% info_block errorBox "Prerequisites" %}

This migration guide is a part of the [Search migration effort](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/search-migration-concept/search-migration-concept.html). Prior to upgarding this module, make sure you have completed all the steps from the [Search Migration Guide](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/search-migration-concept/migration-guide-search.html). 

{% endinfo_block %}
To upgrade the module, do the following:
1. Update the module with composer:
```Bash
composer update spryker/product-label-search
```
2. Remove the usage of deprecated `Spryker\Zed\ProductLabelSearch\Communication\Plugin\PageMapExpander\ProductLabelMapExpanderPlugin` from `Pyz\Zed\ProductPageSearch\ProductPageSearchDependencyProvider`.
3. Enable the replacement plugin:
```PHP
<?php

namespace Pyz\Zed\ProductPageSearch;

...
use Spryker\Zed\ProductLabelSearch\Communication\Plugin\ProductPageSearch\Elasticsearch\ProductLabelMapExpanderPlugin;
use Spryker\Zed\ProductPageSearch\ProductPageSearchDependencyProvider as SprykerProductPageSearchDependencyProvider;

class ProductPageSearchDependencyProvider extends SprykerProductPageSearchDependencyProvider
{
    ...

    /**
     * @return \Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductAbstractMapExpanderPluginInterface[]
     */
    protected function getProductAbstractMapExpanderPlugins(): array
    {
        return [
            ...
            new ProductLabelMapExpanderPlugin(),
        ];
    }
}
```
