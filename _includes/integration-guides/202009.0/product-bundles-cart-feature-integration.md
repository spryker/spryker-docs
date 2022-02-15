---
title: Product Bundles + Cart feature integration
description: This guide provides step-by-step instructions on integrating Product Bundles + Cart feature into your project.
last_updated: Sep 8, 2020
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v6/docs/product-bundles-cart-feature-integration
originalArticleId: eee3b93c-05c3-4f72-85b5-9c232ada68c2
redirect_from:
  - /v6/docs/product-bundles-cart-feature-integration
  - /v6/docs/en/product-bundles-cart-feature-integration
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

