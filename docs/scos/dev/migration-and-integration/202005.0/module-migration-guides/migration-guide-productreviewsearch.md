---
title: Migration Guide - ProductReviewSearch
originalLink: https://documentation.spryker.com/v5/docs/migration-guide-productreviewsearch
originalArticleId: 48613b42-8d03-49a9-863c-97b82dc35de3
redirect_from:
  - /v5/docs/migration-guide-productreviewsearch
  - /v5/docs/en/migration-guide-productreviewsearch
---

## Upgrading from Version 1.3.* to Version 1.4.*

{% info_block errorBox "Prerequisites" %}

This migration guide is a part of the [Search migration effort](/docs/scos/dev/migration-and-integration/202005.0/migration-concepts/search-migration-concept/search-migration-concept.html). Prior to upgarding this module, make sure you have completed all the steps from the [Search Migration Guide](/docs/scos/dev/migration-and-integration/202005.0/module-migration-guides/migration-guide-search.html#upgrading-from-version-8-9---to-version-8-10--). 

{% endinfo_block %}
To upgrade the module, do the following:
1. Update the module with composer:
```Bash
composer update spryker/product-review-search
```
2. Remove the usage of deprecated `Spryker\Zed\ProductReviewSearch\Communication\Plugin\PageMapExpander\ProductReviewMapExpanderPlugin` from `Pyz\Zed\ProductPageSearch\ProductPageSearchDependencyProvider`.
3. Enable the replacement plugin:
```PHP
<?php

namespace Pyz\Zed\ProductPageSearch;

...
use Spryker\Zed\ProductReviewSearch\Communication\Plugin\ProductPageSearch\Elasticsearch\ProductReviewMapExpanderPlugin;
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
            new ProductReviewMapExpanderPlugin(),
        ];
    }
}
```
