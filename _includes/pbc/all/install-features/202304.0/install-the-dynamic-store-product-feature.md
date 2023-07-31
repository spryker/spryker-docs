
This document describes how to integrate the  Dynamic Store + Product feature into a Spryker project.

## Install feature core

### Prerequisites

To start feature integration, overview and install the necessary features:

| NAME | VERSION |
| --- | --- |
| Spryker Core | {{page.version}} |
| Product | {{page.version}} |

### Set up behavior

Register the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| StoreProductCategoryListActionViewDataExpanderPlugin | Expands view data for list of product categories with stores data. | None | Spryker\Zed\StoreGui\Communication\Plugin\ProductCategoryFilterGui |

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
            new StoreProductCategoryListActionViewDataExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the following data is displayed on the **Product Category Filter** page:

* Store 
* Category

{% endinfo_block %}

