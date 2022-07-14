---
title: Shipment + Cart feature integration
description: This guide provides step-by-step instruction on integrating Shipment + Cart feature into the Spryker-based project.
last_updated: Sep 8, 2020
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v6/docs/shipment-cart-feature-integration
originalArticleId: ca3fb1e7-be43-4645-b8f4-44e0924f98c7
redirect_from:
  - /v6/docs/shipment-cart-feature-integration
  - /v6/docs/en/shipment-cart-feature-integration
related:
  - title: Shipment feature integration
    link: docs/scos/dev/feature-integration-guides/page.version/shipment-feature-integration.html
---

## Install Feature Core

### Prerequisites
To start feature integration, overview, and install the necessary features:

| Feature | Version |
| --- | --- |
| Shipment | 202009.0 |
| Cart | 202009.0 |
| Spryker Core | 202009.0 |
| Prices | 202009.0 |

### 1) Install the required modules using Composer
Run the following command(s) to install the required modules:
```bash
composer require spryker/shipment-cart-connector: "^2.1.0" --update-with-dependencies
```
{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| Module | Expected Directory |
| --- | --- |
| `ShipmentCartConnector` | `vendor/spryker/shipment-cart-connector` |

{% endinfo_block %}

### 2) Set up Transfer Objects
Run the following command(s) to apply transfer changes
```bash
console transfer:generate
```
{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `ShipmentMethodsTransfer` | class | Created | `src/Generated/Shared/Transfer/ShipmentMethodsTransfer` |
| `ShipmentMethodTransfer` | class | Created | `src/Generated/Shared/Transfer/ShipmentMethodTransfer` |
| `OrderTransfer` | class | Created | `src/Generated/Shared/Transfer/OrderTransfer` |
| `QuoteTransfer` | class | Created | `src/Generated/Shared/Transfer/QuoteTransfer` |
| `ItemTransfer` | class | Created | `src/Generated/Shared/Transfer/ItemTransfer` |
| `ExpenseTransfer` | class | Created | `src/Generated/Shared/Transfer/ExpenseTransfer` |
| `MoneyValueTransfer` | class | Created | `src/Generated/Shared/Transfer/MoneyValueTransfer` |
| `MoneyTransfer` | class | Created | `src/Generated/Shared/Transfer/MoneyTransfer` |
| `CartPreCheckResponseTransfer` | class | Created | `src/Generated/Shared/Transfer/CartPreCheckResponseTransfer` |
| `MessageTransfer` | class | Created | `src/Generated/Shared/Transfer/MessageTransfer` |
| `CartChangeTransfer` | class | Created | `src/Generated/Shared/Transfer/CartChangeTransfer` |
| `CurrencyTransfer` | class | Created | `src/Generated/Shared/Transfer/CurrencyTransfer` |
| `ShipmentGroupTransfer` | class | Created | `src/Generated/Shared/Transfer/ShipmentGroupTransfer` |
| `ShipmentTransfer` | class | Created | `src/Generated/Shared/Transfer/ShipmentTransfer` |
| `ShipmentMethodsCollectionTransfer` | class | Created | `src/Generated/Shared/Transfer/ShipmentMethodsCollectionTransfer` |

{% endinfo_block %}

### 3) Set up Behavior
Register the following plugins:

| Plugin | Specification | Prerequisites |
| --- | --- | --- |
| `CartShipmentCartOperationPostSavePlugin` | Recalculates the shipment expenses. | Replacement for `CartShipmentExpanderPlugin` |
| `SanitizeCartShipmentItemExpanderPlugin` | Clears quote shipping data if a user modified quote items. | None |

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

