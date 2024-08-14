This document describes how to install the Marketplace Shipment + Cart feature.

## Install feature core

Follow the steps below to install the Marketplace Shipment + Cart feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|-|-|-|
| Marketplace Shipment | {{page.version}} | [Install the Marketplace Shipment feature](/docs/pbc/all/carrier-management/{{page.version}}/marketplace/install-features/install-marketplace-shipment-feature.html) |
| Cart | {{page.version}} | [Install the Cart feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-cart-feature.html) |

### 1) Set up behavior

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
     * @return array<\Spryker\Zed\CartExtension\Dependency\Plugin\ItemExpanderPluginInterface>
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
     * @return array<\Spryker\Zed\QuoteExtension\Dependency\Plugin\QuoteExpanderPluginInterface>
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
