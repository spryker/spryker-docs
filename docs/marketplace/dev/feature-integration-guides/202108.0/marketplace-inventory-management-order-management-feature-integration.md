---
title: Marketplace Inventory Management + Order Management feature integration
last_updated: Sep 07, 2021
description: This document describes the process how to integrate the Marketplace Inventory Management + Order Management feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Inventory Management + Order Management feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Inventory Management + Order Management feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
|-|-|-|
| Marketplace Inventory Management | {{page.version}} |  [Marketplace Inventory Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-inventory-management-feature-integration.html)  |
| Marketplace Order Management | {{page.version}} |  [Marketplace Order Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-order-management-feature-integration.html)  |

### 1) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| ProductOfferOmsReservationAggregationPlugin | Aggregates reservations for product offers. |  | Spryker\Zed\OmsProductOfferReservation\Communication\Plugin\Oms |
| ProductOfferOmsReservationReaderStrategyPlugin | Provides the ability to read product offer reservation data from alternative table. |  | Spryker\Zed\OmsProductOfferReservation\Communication\Plugin\Oms |
| ProductOfferOmsReservationWriterStrategyPlugin | Provides the ability to write product offer reservation to alternative table. |  | Spryker\Zed\OmsProductOfferReservation\Communication\Plugin\Oms |
| ProductOfferReservationPostSaveTerminationAwareStrategyPlugin | Prevents generic product availability update for product offers. |  | Spryker\Zed\OmsProductOfferReservation\Communication\Plugin\Oms |
| ProductOfferReservationProductOfferStockTableExpanderPlugin | Expands product offer stock table with reservations column. |  | Spryker\Zed\OmsProductOfferReservation\Communication\Plugin\Oms |

**src/Pyz/Zed/Oms/OmsDependencyProvider.php**

```php
namespace Pyz\Zed\Oms;

use Spryker\Zed\Oms\OmsDependencyProvider as SprykerOmsDependencyProvider;
use Spryker\Zed\OmsProductOfferReservation\Communication\Plugin\Oms\ProductOfferOmsReservationAggregationPlugin;
use Spryker\Zed\OmsProductOfferReservation\Communication\Plugin\Oms\ProductOfferOmsReservationReaderStrategyPlugin;
use Spryker\Zed\OmsProductOfferReservation\Communication\Plugin\Oms\ProductOfferOmsReservationWriterStrategyPlugin;
use Spryker\Zed\OmsProductOfferReservation\Communication\Plugin\Oms\ProductOfferReservationPostSaveTerminationAwareStrategyPlugin;

class OmsDependencyProvider extends SprykerOmsDependencyProvider
{
    /**
     * @return \Spryker\Zed\OmsExtension\Dependency\Plugin\OmsReservationAggregationPluginInterface[]
     */
    protected function getOmsReservationAggregationPlugins(): array
    {
        return [
            new ProductOfferOmsReservationAggregationPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\OmsExtension\Dependency\Plugin\OmsReservationWriterStrategyPluginInterface[]
     */
    protected function getOmsReservationWriterStrategyPlugins(): array
    {
        return [
            new ProductOfferOmsReservationWriterStrategyPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\OmsExtension\Dependency\Plugin\ReservationPostSaveTerminationAwareStrategyPluginInterface[]
     */
    protected function getReservationPostSaveTerminationAwareStrategyPlugins(): array
    {
        return [
            new ProductOfferReservationPostSaveTerminationAwareStrategyPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\OmsExtension\Dependency\Plugin\OmsReservationReaderStrategyPluginInterface[]
     */
    protected function getOmsReservationReaderStrategyPlugins(): array
    {
        return [
            new ProductOfferOmsReservationReaderStrategyPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure if you add a product offer to the cart, place the order, reserved product offers count changes in the `spy_oms_product_offer_reservation` table.

Make sure that a product offer is available at PDP if its stock > 0 in the `spy_product_offer_stock` table.

Make sure that the concrete product availability (in the `spy_availability` table) are not affected when you place an order with a product offer.

{% endinfo_block %}

**src/Pyz/Zed/ProductOfferStockGui/ProductOfferStockGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductOfferStockGui;

use Spryker\Zed\ProductOfferReservationGui\Communication\Plugin\ProductOfferStock\ProductOfferReservationProductOfferStockTableExpanderPlugin;
use Spryker\Zed\ProductOfferStockGui\ProductOfferStockGuiDependencyProvider as SprykerProductOfferStockGuiDependencyProvider;

class ProductOfferStockGuiDependencyProvider extends SprykerProductOfferStockGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\ProductOfferStockGuiExtension\Dependeency\Plugin\ProductOfferStockTableExpanderPluginInterface[]
     */
    protected function getProductOfferStockTableExpanderPlugins(): array
    {
        return [
            new ProductOfferReservationProductOfferStockTableExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that if you open some product offer in view mode at `http://zed.mysprykershop.com/product-offer-gui/view?id-product-offer={% raw %}{{idProductOffer}}{% endraw %}`, stock table contains the `Reservations` column.

{% endinfo_block %}
