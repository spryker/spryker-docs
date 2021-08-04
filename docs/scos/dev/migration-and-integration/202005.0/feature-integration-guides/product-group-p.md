---
title: Product Group + Product Labels Feature Integration
originalLink: https://documentation.spryker.com/v5/docs/product-group-product-labels-feature-integration
redirect_from:
  - /v5/docs/product-group-product-labels-feature-integration
  - /v5/docs/en/product-group-product-labels-feature-integration
---

## Install Feature Core

Follow the steps below to install Product group + Product labels feature core.

### Prerequisites

To start feature integration, overview and install the necessary features:



| Name | Version |
| --- | --- |
| Product Group | master |
| Product Labels | master |




### Set up Behavior

Register the following plugin:



| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| ProductLabelProductViewExpanderPlugin | Expands `ProductViewTransfer` with labels. | None | SprykerShop\Yves\ProductLabelWidget\Plugin\ProductGroupWidget |


```php	
<?php

namespace Pyz\Yves\ProductGroupWidget;

use SprykerShop\Yves\ProductGroupWidget\ProductGroupWidgetDependencyProvider as SprykerShopProductGroupWidgetDependencyProvider;
use SprykerShop\Yves\ProductLabelWidget\Plugin\ProductGroupWidget\ProductLabelProductViewExpanderPlugin;

class ProductGroupWidgetDependencyProvider extends SprykerShopProductGroupWidgetDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\ProductGroupWidgetExtension\Dependency\Plugin\ProductViewExpanderPluginInterface[]
     */
    protected function getProductViewExpanderPlugins(): array
    {
        return [
            new ProductLabelProductViewExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the product label on a product abstract card changes correctly after hovering over a color selector. 

{% endinfo_block %}


