---
title: Product group + product rating & reviews feature integration
originalLink: https://documentation.spryker.com/2021080/docs/product-group-product-rating-reviews-feature-integration
redirect_from:
  - /2021080/docs/product-group-product-rating-reviews-feature-integration
  - /2021080/docs/en/product-group-product-rating-reviews-feature-integration
---

## Install Feature Core

Follow the steps below to install Product group + Product rating & review feature core.

### Prerequisites

To start feature integration, overview and install the necessary features:


| Name | Version |
| --- | --- |
| Product Group | master |
| Product Rating & Reviews | master |




### Set up Behavior

Register the following plugin:


| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| ProductReviewSummaryProductViewExpanderPlugin | Expands `ProductViewTransfer` with the product review summary data (average rating). | None | SprykerShop\Yves\ProductReviewWidget\Plugin\ProductGroupWidget |


```php
<?php

namespace Pyz\Yves\ProductGroupWidget;

use SprykerShop\Yves\ProductGroupWidget\ProductGroupWidgetDependencyProvider as SprykerShopProductGroupWidgetDependencyProvider;
use SprykerShop\Yves\ProductReviewWidget\Plugin\ProductGroupWidget\ProductReviewSummaryProductViewExpanderPlugin;

class ProductGroupWidgetDependencyProvider extends SprykerShopProductGroupWidgetDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\ProductGroupWidgetExtension\Dependency\Plugin\ProductViewExpanderPluginInterface[]
     */
    protected function getProductViewExpanderPlugins(): array
    {
        return [
            new ProductReviewSummaryProductViewExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the product rating on a product abstract card changes correctly after hovering over a color selector.

{% endinfo_block %}

