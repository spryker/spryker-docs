
## Install feature core

### Prerequisites

To start feature integration, overview, and install the necessary features:

| NAME | VERSION |
| --- | --- |
| Shipment | {{page.version}} |
| Cart | {{page.version}} |
| Spryker Core | {{page.version}} |
| Prices | {{page.version}} |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/shipment-cart-connector: "^2.1.0" --update-with-dependencies
```
{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ShipmentCartConnector | vendor/spryker/shipment-cart-connector |

{% endinfo_block %}

### 2) Set up transfer objects

Run the following command(s) to apply transfer changes:

```bash
console transfer:generate
```
{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| ShipmentMethodsTransfer | class | Created | src/Generated/Shared/Transfer/ShipmentMethodsTransfer |
|ShipmentMethodTransfer | class | Created | src/Generated/Shared/Transfer/ShipmentMethodTransfer |
|OrderTransfer| class | Created | src/Generated/Shared/Transfer/OrderTransfer |
| QuoteTransfer | class | Created | src/Generated/Shared/Transfer/QuoteTransfer |
| ItemTransfer | class | Created | src/Generated/Shared/Transfer/ItemTransfer |
| ExpenseTransfer | class | Created | src/Generated/Shared/Transfer/ExpenseTransfer|
| MoneyValueTransfer | class | Created | src/Generated/Shared/Transfer/MoneyValueTransfer |
| MoneyTransfer | class | Created | src/Generated/Shared/Transfer/MoneyTransfer |
| CartPreCheckResponseTransfer | class | Created | src/Generated/Shared/Transfer/CartPreCheckResponseTransfer |
| MessageTransfer | class | Created | src/Generated/Shared/Transfer/MessageTransfer |
| CartChangeTransfer | class | Created | src/Generated/Shared/Transfer/CartChangeTransfer |
| CurrencyTransfer | class | Created | src/Generated/Shared/Transfer/CurrencyTransfer |
| ShipmentGroupTransfer | class | Created | src/Generated/Shared/Transfer/ShipmentGroupTransfer |
| ShipmentTransfer | class | Created | src/Generated/Shared/Transfer/ShipmentTransfer` |
| ShipmentMethodsCollectionTransfer | class | Created | src/Generated/Shared/Transfer/ShipmentMethodsCollectionTransfer |

{% endinfo_block %}

### 3) Set up behavior

Register the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES |
| --- | --- | --- |
| CartShipmentCartOperationPostSavePlugin | Recalculates the shipment expenses. | Replacement for `CartShipmentExpanderPlugin` |
| SanitizeCartShipmentItemExpanderPlugin | Clears quote shipping data if a user modified quote items. | None |

**Pyz\Zed\Cart\CartDependencyProvider**

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\ShipmentCartConnector\Communication\Plugin\Cart\CartShipmentCartOperationPostSavePlugin;
use Spryker\Zed\ShipmentCartConnector\Communication\Plugin\Cart\SanitizeCartShipmentItemExpanderPlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\ItemExpanderPluginInterface[]
     */
    protected function getExpanderPlugins(Container $container)
    {
        return [
            new SanitizeCartShipmentItemExpanderPlugin(),
        ];
    }

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\CartOperationPostSavePluginInterface[]
     */
    protected function getPostSavePlugins(Container $container)
    {
        return [
            new CartShipmentCartOperationPostSavePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that if you change items in the cart (add, remove or change quantity) then all the shipping methods are sanitized.

{% endinfo_block %}
