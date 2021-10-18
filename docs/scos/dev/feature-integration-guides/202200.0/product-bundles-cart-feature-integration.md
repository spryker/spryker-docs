---
title: Product bundles + cart feature integration
description: This guide provides step-by-step instructions on integrating Product Bundles + Cart feature into your project.
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/product-bundles-cart-feature-integration
originalArticleId: f069a875-5736-4134-a2c9-34a54b2dfdd0
redirect_from:
  - /2021080/docs/product-bundles-cart-feature-integration
  - /2021080/docs/en/product-bundles-cart-feature-integration
  - /docs/product-bundles-cart-feature-integration
  - /docs/en/product-bundles-cart-feature-integration
---

## Install Feature Core

### Prerequisites
To start feature integration, overview and install the necessary features:
| Module | Expected Directory |
| --- | --- |
| Product Bundles | 202009.0 |
| Cart | 202009.0 |
| Spryker Core | 202009.0 |

### 1) Set up Behavior
| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ProductBundleItemCountQuantityPlugin` | Returns combined quantity of all items in cart. | None | `Spryker\Client\ProductBundle\Plugin\Cart` |

**src/Pyz/Client/Cart/CartDependencyProvider.php**
```php
<?php

namespace Pyz\Client\Cart;

use Spryker\Client\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Client\ProductBundle\Plugin\Cart\ProductBundleItemCountQuantityPlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @return \Spryker\Client\Cart\Dependency\Plugin\ItemCountPluginInterface
     */
    protected function getItemCountPlugin(): ItemCountPluginInterface
    {
        return new ProductBundleItemCountQuantityPlugin();
    }
}
```
{% info_block warningBox "Verification" %}

Add several regular products and product bundles to cart.
Make sure that item counter at cart widget shows correct number (bundled items should not be counted as separate items).

{% endinfo_block %}

