---
title: Migration guide - ProductReviewSearch
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/migration-guide-productreviewsearch
originalArticleId: b8c887b4-96de-4269-b503-eb8b11980671
redirect_from:
  - /2021080/docs/migration-guide-productreviewsearch
  - /2021080/docs/en/migration-guide-productreviewsearch
  - /docs/migration-guide-productreviewsearch
  - /docs/en/migration-guide-productreviewsearch
  - /v5/docs/migration-guide-productreviewsearch
  - /v5/docs/en/migration-guide-productreviewsearch
  - /v6/docs/migration-guide-productreviewsearch
  - /v6/docs/en/migration-guide-productreviewsearch
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-productreviewsearch.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-productreviewsearch.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-productreviewsearch.html
---

## Upgrading from version 1.3.* to version 1.4.*

{% info_block errorBox "Prerequisites" %}

This migration guide is a part of the [Search migration effort](/docs/scos/dev/migration-concepts/search-migration-concept/search-migration-concept.html). Prior to upgarding this module, make sure you have completed all the steps from the [Search Migration Guide](/docs/scos/dev/module-migration-guides/migration-guide-search.html#upgrading-from-version-89-to-version-810).

{% endinfo_block %}

To upgrade the module, do the following:
1. Update the module with composer:
```bash
composer update spryker/product-review-search
```
2. Remove the usage of deprecated `Spryker\Zed\ProductReviewSearch\Communication\Plugin\PageMapExpander\ProductReviewMapExpanderPlugin` from `Pyz\Zed\ProductPageSearch\ProductPageSearchDependencyProvider`.
3. Enable the replacement plugin:
```php
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
