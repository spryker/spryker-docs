---
title: Product Group + Cart Feature Integration
originalLink: https://documentation.spryker.com/v5/docs/product-group-cart-feature-integration
redirect_from:
  - /v5/docs/product-group-cart-feature-integration
  - /v5/docs/en/product-group-cart-feature-integration
---

## Install Feature Core

Follow the steps below to install Product group + Cart feature core.

### Prerequisites

To start feature integration, overview and install the necessary features:


| Name | Version |
| --- | --- |
| Cart | master |
| Product Labels | master |



### Set up Behavior

Register the following plugin:


| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| AddToCartUrlProductViewExpanderPlugin | Expands `ProductViewTransfer` with the URL to add product to cart. | None | SprykerShop\Yves\ProductLabelWidget\Plugin\ProductGroupWidget |

```php
<?php

namespace Pyz\Yves\ProductGroupWidget;

use SprykerShop\Yves\CartPage\Plugin\ProductGroupWidget\AddToCartUrlProductViewExpanderPlugin;
use SprykerShop\Yves\ProductGroupWidget\ProductGroupWidgetDependencyProvider as SprykerShopProductGroupWidgetDependencyProvider;

class ProductGroupWidgetDependencyProvider extends SprykerShopProductGroupWidgetDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\ProductGroupWidgetExtension\Dependency\Plugin\ProductViewExpanderPluginInterface[]
     */
    protected function getProductViewExpanderPlugins(): array
    {
        return [
            new AddToCartUrlProductViewExpanderPlugin(),
        ];
    }
}
```


{% info_block warningBox "Verification" %}

Make sure that the correct path to add product to cart is displayed for products in products set:
1. Open a product details page with a product set.
2. Hover over the **Add to Cart** button.
3. Make sure that the correct URL to add the product to cart is displayed.
4. Hover over a color selector to switch to a different abstract product. 
5. Hover over the **Add to Cart** button.
6. Make sure that the URL to add the product to cart corresponds to the new product.

{% endinfo_block %}

