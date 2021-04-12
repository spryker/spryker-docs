---
title: Marketplace Shipment + Cart feature integration
description: Integrate Marketplace Shipment feature into your project
tags:
---

## Install Feature Core
Follow the steps below to install the Marketplace Shipment + Cart feature core.

### Prerequisites
To start feature integration, overview, and install the necessary features:

| Name | Version |
|-|-|
| Marketplace Shipment | dev-master |
| Cart | 202001.0 |

## 1) Set up behavior
Enable the following behaviors by registering the plugins:

| Plugin | Description | Prerequisites | Namespace |
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

---
**Verification**

Make sure that merchant sold items have merchant reference attached to their selected shipment.
Make sure that correct merchant reference is saved in `spy_sales_shipment`.

---

## Install feature front end
Follow the steps below to install the Marketplace Shipment + Cart feature front end.

### Prerequisites
To start feature integration, overview, and install the necessary features:

| Name | Version |
|-|-|
| Cart | 202001.0 |
| Marketplace Shipment | dev-master |
|   |   |

1) Set up Behavior
Enable the following behaviors by registering the plugins:

| Plugin | Description | Prerequisites | Namespace |
|-|-|-|-|
| MerchantShipmentPreAddToCartPlugin | Adds cart item merchant reference to shipment transfer | None | Spryker\Yves\MerchantShipment\Plugin\CartPage |

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

---
**Verification**

Make sure that items that belong to a merchant being added to cart have the same merchant reference added to their shipments.

---
