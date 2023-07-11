

## Upgrading from version 1.3.* to version 1.4.*

{% info_block errorBox "Prerequisites" %}

This migration guide is a part of the [Search migration effort](/docs/pbc/all/search/{{site.version}}/base-shop/install-and-upgrade/search-migration-concept.html). Prior to upgarding this module, make sure you have completed all the steps from the [Search Migration Guide](/docs/pbc/all/search/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-search–module.html#upgrading-from-version-89-to-version-810).

{% endinfo_block %}

To upgrade the module, do the following:

1. Update the module using Composer:

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
