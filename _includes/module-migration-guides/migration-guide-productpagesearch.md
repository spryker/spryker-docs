---
title: Migration guide - ProductPageSearch
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/migration-guide-productpagesearch
originalArticleId: 76339996-261a-4533-9a32-7bfd2a0b53c5
redirect_from:
  - /2021080/docs/migration-guide-productpagesearch
  - /2021080/docs/en/migration-guide-productpagesearch
  - /docs/migration-guide-productpagesearch
  - /docs/en/migration-guide-productpagesearch
  - /v2/docs/mg-product-page-search
  - /v2/docs/en/mg-product-page-search
  - /v3/docs/mg-product-page-search
  - /v3/docs/en/mg-product-page-search
  - /v4/docs/mg-product-page-search
  - /v4/docs/en/mg-product-page-search
  - /v5/docs/mg-product-page-search
  - /v5/docs/en/mg-product-page-search
  - /v6/docs/mg-product-page-search
  - /v6/docs/en/mg-product-page-search
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-productpagesearch.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-productpagesearch.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-productpagesearch.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-productpagesearch.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-productpagesearch.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-productpagesearch.html
---

## Upgrading from Version 3.11.* to Version 3.12.*

{% info_block errorBox "Prerequisites" %}

This migration guide is a part of the [Search migration effort](/docs/scos/dev/migration-concepts/search-migration-concept/search-migration-concept.html). Prior to upgarding this module, make sure you have completed all the steps from the [Search Migration Guide](/docs/scos/dev/module-migration-guides/migration-guide-search.html#upgrading-from-version-89-to-version-810).

{% endinfo_block %}

To upgrade the module, do the following:
1. Update the module with composer:
```bash
composer update spryker/product-page-search
```
2. Remove `ProductPageSearchDependencyProvider::getMapExpanderPlugins()` method.
3. Enable the new abstract product map expander plugins:

**Pyz\Zed\ProductPageSearch**

```php
<?php

namespace Pyz\Zed\ProductPageSearch;

...
use Spryker\Zed\ProductPageSearch\Communication\Plugin\ProductPageSearch\Elasticsearch\ProductCategoryMapExpanderPlugin;
use Spryker\Zed\ProductPageSearch\Communication\Plugin\ProductPageSearch\Elasticsearch\ProductImageMapExpanderPlugin;
use Spryker\Zed\ProductPageSearch\Communication\Plugin\ProductPageSearch\Elasticsearch\ProductPriceMapExpanderPlugin;
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
            new ProductPriceMapExpanderPlugin(),
            new ProductCategoryMapExpanderPlugin(),
            new ProductImageMapExpanderPlugin(),
        ];
    }
}
```

4. Remove deprecated plugin usages (if any) from `Pyz\Zed\Search\SearchDependencyProvider`:
```php
Spryker\Zed\ProductPageSearch\Communication\Plugin\Search\ProductConcretePageMapPlugin
Spryker\Zed\ProductPageSearch\Communication\Plugin\Search\ProductPageMapPlugin
```
## Upgrading from Version 2.* to Version 3.*
ProductPageSearch 3.0.0 got separate search index for Concrete Products. It includes database table and ElasticSearch index.

To perform the migration, follow the steps:

1. Run the database migration:
```bash
vendor/bin/console propel:install
```
2. Generate transfers:
```bash:
vendor/bin/console transfer:generate
```
3. Install search:
```bash:
vendor/bin/console search:setup
```
4. Sync concrete products data with ElasticSearch:
```bash:
vendor/bin/console data:import:product-concrete
```
or
```bash
vendor/bin/console event:trigger -r product_concrete
```

*Estimated migration time: ~2h*
