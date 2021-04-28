---
title: Marketplace Product Offer + Checkout feature integration
last_updated: Apr 28, 2021
description: This document describes the process how to integrate the Marketplace Product Offer + Checkout feature into a Spryker project.
---

This document describes how to integrate the [Marketplace Product Offer + Checkout feature integration]() feature into a Spryker project.

## Install feature core
Follow the steps below to install the Marketplace Product Offer + Checkout feature integration feature core.

### Prerequisites
To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
|-|-|-|
| Spryker Core | master | [Spryker Core feature integration](https://documentation.spryker.com/docs/spryker-core-feature-integration)  |
| Marketplace Product Offer | dev-master | [Product Offer feature integration](docs/marketplace/dev/feature-integration-guides/product-offer-feature-integration.html) |

### 1) Install the required modules using Composer
Run the following command to install the required modules:

```bash
composer require spryker/product-offer: "^0.6.1" --update-with-dependencies
```

---
**Verification**

Make sure that the following modules were installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| CartExtension | spryker/cart-extension |
| CheckoutExtension | spryker/checkout-extension |
| Product | spryker/product |
| ProductOfferExtension | spryker/product-offer-extension |
| Store | spryker/store |

---

### 2) Set up transfer objects

Generate transfer changes:
```bash
console transfer:generate
```

---
**Verification**

Make sure that the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
|-|-|-|-|
| CheckoutErrorTransfer | class | Created | src/Generated/Shared/Transfer/CheckoutErrorTransfer |
| CheckoutResponseTransfer | class | Created | src/Generated/Shared/Transfer/CheckoutResponseTransfer |
| ItemTransfer.merchantReference | property | Created | src/Generated/Shared/Transfer/ItemTransfer |

---

### 3) Configure Checkout Pre Condition Plugins

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| ProductOfferCheckoutPreConditionPlugin | Checks if at least one quote item transfer has items with inactive or not approved ProductOffer. |   | Spryker/Zed/ProductOffer/Communication/Plugin/Checkout/ProductOfferCheckoutPreConditionPlugin.php |

**src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Checkout;

use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\ProductOffer\Communication\Plugin\Checkout\ProductOfferCheckoutPreConditionPlugin;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPreConditionPluginInterface[]
     */
    protected function getCheckoutPreConditions(Container $container)
    {
        return [
            // other plugins ..

            new ProductOfferCheckoutPreConditionPlugin(),
        ];
    }
}
```

---
**Verification**

Make sure that when refreshing the checkout summary page, after changing `active` or `approved` status of a product offer, the status is reflected accordingly.

---
