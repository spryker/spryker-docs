

## Upgrading from version 3.11.* to version 3.12.*

{% info_block errorBox "Prerequisites" %}

This migration guide is a part of the [Search migration effort](/docs/pbc/all/search/{{site.version}}/base-shop/install-and-upgrade/search-migration-concept.html). Prior to upgarding this module, make sure you have completed all the steps from the [Search Migration Guide](/docs/pbc/all/search/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-search–module.html#upgrading-from-version-89-to-version-810).

{% endinfo_block %}

To upgrade the module, do the following:

1. Update the module using Composer:

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

## Upgrading from version 2.* to version 3.*

`ProductPageSearch` 3.0.0 got separate search index for Concrete Products. It includes database table and ElasticSearch index.

*Estimated migration time: ~2h*

To perform the migration, follow the steps:

1. Run the database migration:

```bash
vendor/bin/console propel:install
```

2. Generate transfers:

```bash
vendor/bin/console transfer:generate
```

3. Install search:

```bash
vendor/bin/console search:setup
```

4. Sync concrete products data with ElasticSearch:

```bash
vendor/bin/console data:import:product-concrete
```

or

```bash
vendor/bin/console event:trigger -r product_concrete
```
