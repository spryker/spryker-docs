---
title: Product Group + Cart feature integration
description: Instructions to integrate the Product group + Cart feature into a Spryker project.
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/product-group-cart-feature-integration
originalArticleId: 0377da7c-316a-41bf-a8f3-c00736e18b9b
redirect_from:
  - /2021080/docs/product-group-cart-feature-integration
  - /2021080/docs/en/product-group-cart-feature-integration
  - /docs/product-group-cart-feature-integration
  - /docs/en/product-group-cart-feature-integration
---

## Install feature core

Follow the steps below to install Product group + Cart feature core.

### Prerequisites

To start feature integration, overview and install the necessary features

| NAME | VERSION |
| --- | --- |
| Cart | {{page.version}} |
| Product Labels | {{page.version}} |

### Set up behavior

Register the following plugin:


| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
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
