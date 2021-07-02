---
title: Marketplace Shipment + Cart feature integration
description: This document describes the process how to integrate Marketplace Shipment feature into your project
tags:
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Shipment + Cart feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Shipment + Cart feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
|-|-|-|
| Marketplace Shipment | dev-master | [Marketplace Shipment feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-shipment-feature-integration.html) |
| Cart | 202001.0 | [Cart feature integration](https://github.com/spryker-feature/cart) |

### Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantShipmentItemExpanderPlugin | Expands Cart items with merchant shipment | None | Spryker\Zed\MerchantShipment\Communication\Plugin\Cart |
| MerchantShipmentQuoteExpanderPlugin | Expands Quote items with merchant shipment | None | Spryker\Zed\MerchantShipment\Communication\Plugin\Quote |

**src/Pyz/Zed/Cart/CartDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\MerchantShipment\Communication\Plugin\Cart\MerchantShipmentItemExpanderPlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\ItemExpanderPluginInterface[]
     */
    protected function getExpanderPlugins(Container $container): array
    {
        return [
            new MerchantShipmentItemExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Quote/QuoteDependencyProvider.php**

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Quote;

use Spryker\Zed\MerchantShipment\Communication\Plugin\Quote\MerchantShipmentQuoteExpanderPlugin;
use Spryker\Zed\Quote\QuoteDependencyProvider as SprykerQuoteDependencyProvider;

class QuoteDependencyProvider extends SprykerQuoteDependencyProvider
{
    /**
     * @return \Spryker\Zed\QuoteExtension\Dependency\Plugin\QuoteExpanderPluginInterface[]
     */
    protected function getQuoteExpanderPlugins(): array
    {
        return [
            new MerchantShipmentQuoteExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that merchant sold items have a merchant reference attached to their selected shipment.

Make sure that correct merchant reference is saved in `spy_sales_shipment`.

{% endinfo_block %}

## Install feature front end

Follow the steps below to install the Marketplace Shipment + Cart feature front end.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION |
|-|-|
| Cart | 202001.0 |
| Marketplace Shipment | dev-master |

### Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantShipmentPreAddToCartPlugin | Adds cart item merchant reference to shipment transfer |  | Spryker\Yves\MerchantShipment\Plugin\CartPage |

**src/Pyz/Zed/Cart/CartDependencyProvider.php**
```php

<?php

namespace Pyz\Yves\CartPage;

use SprykerShop\Yves\CartPage\CartPageDependencyProvider as SprykerCartPageDependencyProvider;
use Spryker\Yves\MerchantShipment\Plugin\CartPage\MerchantShipmentPreAddToCartPlugin;

class CartPageDependencyProvider extends SprykerCartPageDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\CartPageExtension\Dependency\Plugin\PreAddToCartPluginInterface[]
     */
    protected function getPreAddToCartPlugins(): array
    {
        return [
            new MerchantShipmentPreAddToCartPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that items that belong to a merchant being added to cart have the same merchant reference added to their shipments.

{% endinfo_block %}
