---
title: Product Group + Product Labels feature integration
description: Instructions to integrate Product group + Product labels feature into a Spryker project.
last_updated: May 18, 2020
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v5/docs/product-group-product-labels-feature-integration
originalArticleId: 30aad86f-b489-4d64-b6bc-0fab68277361
redirect_from:
  - /v5/docs/product-group-product-labels-feature-integration
  - /v5/docs/en/product-group-product-labels-feature-integration
related:
  - title: Product Groups feature overview
    link: docs/scos/user/features/page.version/product-groups-feature-overview.html
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


