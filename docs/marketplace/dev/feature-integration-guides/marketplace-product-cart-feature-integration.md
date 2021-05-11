---
title: Marketplace Product + Cart feature integration
last_updated: Dec 16, 2020
description: This document describes the process how to integrate the Marketplace Product + Cart feature into a Spryker project.
template: feature-integration-guide-template
---

## Install feature core
Follow the steps below to install the Marketplace Product + Cart feature core.

### Prerequisites
To start feature integration, overview and install the necessary features:

| NAME | VERSION | INTEGRATION GUIDE  |
|-|-|-|
| Spryker Core | master | [Spryker Core feature integration](https://documentation.spryker.com/docs/spryker-core-feature-integration)  |
| Marketplace Product | master | [Marketplace Product feature integration](/docs/marketplace/dev/feature-integration-guides/marketplace-product-feature-integration.html)|
| Cart | master | [Cart Feature Integration](https://github.com/spryker-feature/cart) |

### 1) Set up transfer objects
Run the following command to generate transfer changes:
```bash
console transfer:generate
```

---
**Verification**

Make sure that the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
|-|-|-|-|
| Item.merchantReference | property | Created | src/Generated/Shared/Transfer/ItemTransfer |

---

### 2) Set up behavior
Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantProductCartPreCheckPlugin | Validates that merchant references in the cart items match existing merchant products. |  | Spryker\Zed\MerchantProduct\Communication\Plugin\Cart |

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
