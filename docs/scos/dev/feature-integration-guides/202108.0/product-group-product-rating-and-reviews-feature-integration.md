---
title: Product Group + Product Rating and Reviews feature integration
description: Instructions to integrate the Product group + Product rating & reviews feature into a Spryker project.
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/product-group-product-rating-reviews-feature-integration
originalArticleId: e7a2ed29-792b-4d39-b394-b4d213a3a152
redirect_from:
  - /2021080/docs/product-group-product-rating-reviews-feature-integration
  - /2021080/docs/en/product-group-product-rating-reviews-feature-integration
  - /docs/product-group-product-rating-reviews-feature-integration
  - /docs/en/product-group-product-rating-reviews-feature-integration
---

## Install feature core

Follow the steps below to install Product group + Product rating & review feature core.

### Prerequisites

To start feature integration, overview and install the necessary features:


| NAME | VERSION |
| --- | --- |
| Product Group | {{page.version}} |
| Product Rating & Reviews | {{page.version}} |


### Set up behavior

Register the following plugin:


| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
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
