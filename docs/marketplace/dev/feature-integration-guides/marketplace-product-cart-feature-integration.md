---
title: Marketplace Product + Cart feature integration
last_updated: Dec 16, 2020
summary: This document describes the process how to integrate the Marketplace Product + Cart feature into a Spryker project.
---

## Install feature core
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version | Integration Guide  |
|-|-|-|
| Spryker Core | master | [Glue API: Spryker Core feature integration](https://documentation.spryker.com/docs/glue-api-spryker-core-feature-integration)  |
| Marketplace Product | master | [Marketplace Product feature integration](/docs/marketplace/dev/feature-integration-guides/marketplace-product-feature-integration.html)|
| Cart | master | [Cart Feature Integration](https://documentation.spryker.com/docs/cart-feature-integration) |

### 1) Set up transfer objects
Run the following command to generate transfer changes:
```bash
console transfer:generate
```
***
**Verification**
Make sure that the following changes have been applied in transfer objects:

| Transfer | Type | Event | Path |
|-|-|-|-|
| Item.merchantReference | property | Created | src/Generated/Shared/Transfer/ItemTransfer |

***

### 2) Set up behavior
Enable the following behaviors by registering the plugins:

| Plugin | Description | Prerequisites | Namespace |
|-|-|-|-|
| MerchantProductCartPreCheckPlugin | Validates that merchant references in the cart items match existing merchant products. | None | Spryker\Zed\MerchantProduct\Communication\Plugin\Cart |

**src/Pyz/Zed/Merchant/MerchantDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Merchant\Communication\Plugin\Cart\MerchantCartPreCheckPlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\CartPreCheckPluginInterface[]
     */
    protected function getCartPreCheckPlugins(Container $container): array
    {
        return [
            new MerchantProductCartPreCheckPlugin(),
        ];
    }
}
```

---
**Verification**

Make sure that you can’t add an item with `merchantReference` and `sku` that do not belong to the same `MerchantProduct`(see `spy_merchant_product_abstract`).

---
