This document describes how to install the Marketplace Inventory Management + Order Management feature.

## Install feature core

Follow the steps below to install the Marketplace Inventory Management + Order Management feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|-|-|-|
| Marketplace Inventory Management | {{page.release_tag}} |  [Install the Marketplace Inventory Management feature](/docs/pbc/all/warehouse-management-system/latest/marketplace/install-features/install-the-marketplace-inventory-management-feature.html)  |
| Marketplace Order Management | {{page.release_tag}} |  [Install the Marketplace Order Management feature](/docs/pbc/all/order-management-system/latest/marketplace/install-features/install-the-marketplace-order-management-feature.html)  |

### 1) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| ProductOfferReservationAggregationQueryCriteriaExpanderPlugin | Scopes the OMS reservation aggregation query to the product offer carried by the reservation request. No-op when `productOfferReference` is empty. |  | Spryker\Zed\OmsProductOfferReservation\Communication\Plugin\Oms |
| ProductOfferStockReservationRequestExpanderPlugin | Expands the reservation request with every store that carries product-offer stock for the requested offer. Applicable when `productOfferReference` is set; priority `200`. |  | Spryker\Zed\ProductOfferStock\Communication\Plugin\Oms |
| ProductOfferOmsReservationReaderStrategyPlugin | Provides the ability to read product offer reservation data from alternative table. |  | Spryker\Zed\OmsProductOfferReservation\Communication\Plugin\Oms |
| ProductOfferOmsReservationWriterStrategyPlugin | Provides the ability to write product offer reservation to alternative table. |  | Spryker\Zed\OmsProductOfferReservation\Communication\Plugin\Oms |
| ProductOfferReservationPostSaveTerminationAwareStrategyPlugin | Prevents generic product availability update for product offers. Registered on the store-aware post-save stack. |  | Spryker\Zed\OmsProductOfferReservation\Communication\Plugin\Oms |
| ProductOfferReservationProductOfferStockTableExpanderPlugin | Expands product offer stock table with reservations column. |  | Spryker\Zed\OmsProductOfferReservation\Communication\Plugin\Oms |

{% info_block infoBox "Deprecated plugins" %}

`ProductOfferOmsReservationAggregationPlugin` (registered via `getOmsReservationAggregationPlugins()`) is deprecated in favor of `ProductOfferReservationAggregationQueryCriteriaExpanderPlugin`. Keeping it registered causes the legacy aggregation flow to be used instead of the composed reservation aggregation query.

{% endinfo_block %}

If you are migrating an existing project, deintegrate the deprecated plugin: remove `ProductOfferOmsReservationAggregationPlugin` from the `getOmsReservationAggregationPlugins()` stack in `src/Pyz/Zed/Oms/OmsDependencyProvider.php` and delete its `use` statement. If the stack becomes empty, return an empty array:

```php
    /**
     * @return array<\Spryker\Zed\OmsExtension\Dependency\Plugin\OmsReservationAggregationPluginInterface>
     */
    protected function getOmsReservationAggregationPlugins(): array
    {
        return [];
    }
```

Then register the new plugins:

**src/Pyz/Zed/Oms/OmsDependencyProvider.php**

```php
namespace Pyz\Zed\Oms;

use Spryker\Zed\Oms\OmsDependencyProvider as SprykerOmsDependencyProvider;
use Spryker\Zed\OmsProductOfferReservation\Communication\Plugin\Oms\ProductOfferOmsReservationReaderStrategyPlugin;
use Spryker\Zed\OmsProductOfferReservation\Communication\Plugin\Oms\ProductOfferOmsReservationWriterStrategyPlugin;
use Spryker\Zed\OmsProductOfferReservation\Communication\Plugin\Oms\ProductOfferReservationAggregationQueryCriteriaExpanderPlugin;
use Spryker\Zed\OmsProductOfferReservation\Communication\Plugin\Oms\ProductOfferReservationPostSaveTerminationAwareStrategyPlugin;
use Spryker\Zed\ProductOfferStock\Communication\Plugin\Oms\ProductOfferStockReservationRequestExpanderPlugin;

class OmsDependencyProvider extends SprykerOmsDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\OmsExtension\Dependency\Plugin\OmsReservationAggregationQueryCriteriaExpanderPluginInterface>
     */
    protected function getOmsReservationAggregationQueryCriteriaExpanderPlugins(): array
    {
        return [
            new ProductOfferReservationAggregationQueryCriteriaExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\OmsExtension\Dependency\Plugin\ReservationRequestExpanderPluginInterface>
     */
    protected function getReservationRequestExpanderPlugins(): array
    {
        return [
            new ProductOfferStockReservationRequestExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\OmsExtension\Dependency\Plugin\OmsReservationWriterStrategyPluginInterface>
     */
    protected function getOmsReservationWriterStrategyPlugins(): array
    {
        return [
            new ProductOfferOmsReservationWriterStrategyPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\OmsExtension\Dependency\Plugin\ReservationPostSaveTerminationAwareStrategyPluginInterface>
     */
    protected function getStoreAwareReservationPostSaveTerminationAwareStrategyPlugins(): array
    {
        return [
            new ProductOfferReservationPostSaveTerminationAwareStrategyPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\OmsExtension\Dependency\Plugin\OmsReservationReaderStrategyPluginInterface>
     */
    protected function getOmsReservationReaderStrategyPlugins(): array
    {
        return [
            new ProductOfferOmsReservationReaderStrategyPlugin(),
        ];
    }
}
```

{% info_block infoBox "Combine plugins across features" %}

`getOmsReservationAggregationQueryCriteriaExpanderPlugins()` and `getReservationRequestExpanderPlugins()` each take a single stack for the whole project. If you install more than one feature that contributes to reservation aggregation—for example, product offers and packaging units—return all of their plugins from one method rather than overriding it separately per feature. The plugins are additive, and their criteria are composed into a single reservation aggregation query.

{% endinfo_block %}

{% info_block warningBox "Configure the OMS process before adding the warehouse allocation aggregation expander" %}

`WarehouseAllocationReservationAggregationQueryCriteriaExpanderPlugin` counts only items that are already warehouse-allocated, so its result depends on the OMS process. A reservation is recalculated when the reserved set of a SKU changes—for example, when items enter or leave a `reserved` state—so an item must already be warehouse-allocated by the time it first becomes reserved.

Before adding this plugin to `getOmsReservationAggregationQueryCriteriaExpanderPlugins()`, configure your OMS process so that:

- The `WarehouseAllocation/WarehouseAllocate` command runs on a transition the item passes through **before** its first `reserved` state.
- That transition is triggered automatically (for example, `onEnter` or a zero/short timeout), not by a manual or long-delayed event.

With this setup, every reservation recalculation sees the final allocation state and stays correct. If allocation happens after items are already reserved, or is gated behind a manual event, the reservation is calculated while items are still unallocated and is not refreshed when they are allocated later—leaving availability incorrect.

{% endinfo_block %}

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
     * @return array<\Spryker\Zed\ProductOfferStockGuiExtension\Dependeency\Plugin\ProductOfferStockTableExpanderPluginInterface>
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

Make sure that when you view some product offer at `http://zed.de.demo-spryker.com/product-offer-gui/view?id-product-offer={idProductOffer}}`, you can see the `Stock` section.

Make sure that if you open some product offer in view mode at `http://zed.mysprykershop.com/product-offer-gui/view?id-product-offer={% raw %}{{idProductOffer}}{% endraw %}`, stock table contains the `Reservations` column.

{% endinfo_block %}
