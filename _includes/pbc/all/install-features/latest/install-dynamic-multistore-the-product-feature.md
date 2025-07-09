This document describes how to install [Dynamic Multistore](/docs/pbc/all/dynamic-multistore/latest/base-shop/dynamic-multistore-feature-overview.html) + the [Product](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-feature-overview/product-feature-overview.html) feature.

## Install feature core

### Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
| Spryker Core | 202507.0 |
| Product | 202507.0 |

### Set up behavior

Register the following plugins:

| PLUGIN | SPECIFICATION | NAMESPACE |
| --- | --- | --- |
| StoreProductCategoryListActionViewDataExpanderPlugin | Expands **Overview of Category Filters** page with infromation about stores.| Spryker\Zed\StoreGui\Communication\Plugin\ProductCategoryFilterGui |

**src/Pyz/Zed/Product/ProductDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductCategoryFilterGui;

use Spryker\Zed\ProductCategoryFilterGui\ProductCategoryFilterGuiDependencyProvider as SprykerProductCategoryFilterGuiDependencyProvider;
use Spryker\Zed\StoreGui\Communication\Plugin\ProductCategoryFilterGui\StoreProductCategoryListActionViewDataExpanderPlugin;

class ProductCategoryFilterGuiDependencyProvider extends SprykerProductCategoryFilterGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductCategoryFilterGuiExtension\Dependency\Plugin\ProductCategoryListActionViewDataExpanderPluginInterface>
     */
    protected function getProductCategoryListActionViewDataExpanderPlugins(): array
    {
        return [
            ...
            new StoreProductCategoryListActionViewDataExpanderPlugin(),
            ...
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the following data is displayed on the **Product Category Filter** page:

- Store
- Category

{% endinfo_block %}
