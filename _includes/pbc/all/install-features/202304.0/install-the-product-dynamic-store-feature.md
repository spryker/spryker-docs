
This document describes how to integrate the Product + Dynamic store feature into a Spryker project.

## Install feature core

### Prerequisites

To start feature integration, overview and install the necessary features:

| NAME | VERSION |
| --- | --- |
| Spryker Core | {{page.version}} |
| Product | {{page.version}} |

### 1) Install the required modules using Composer

```bash
composer require spryker-feature/product:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| Product | vendor/spryker/product |
| ProductImage | vendor/spryker/product-image |


{% endinfo_block %}

### 2) Set up behavior

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

