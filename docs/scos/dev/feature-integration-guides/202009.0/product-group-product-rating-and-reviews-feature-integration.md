---
title: Product Group + Product Rating and Reviews feature integration
description: Instructions to integrate the Product group + Product rating & reviews feature into a Spryker project.
last_updated: Aug 27, 2020
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v6/docs/product-group-product-rating-reviews-feature-integration
originalArticleId: 01752b9d-6fc1-4570-99dd-1e396c3b4d83
redirect_from:
  - /v6/docs/product-group-product-rating-reviews-feature-integration
  - /v6/docs/en/product-group-product-rating-reviews-feature-integration
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

