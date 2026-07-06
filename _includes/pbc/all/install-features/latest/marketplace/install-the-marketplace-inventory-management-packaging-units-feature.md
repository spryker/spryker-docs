This document describes how to install the Marketplace Inventory Management + Packaging Units feature.

## Install feature core

Follow the steps below to install the Marketplace Inventory Management + Packaging Units feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|-|-|-|
| Packaging Units  | {{page.release_tag}} | [Install the Packaging Units feature](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-packaging-units-feature.html)  |
| Marketplace Inventory Management | {{page.release_tag}} | [Install the Marketplace Inventory Management feature](/docs/pbc/all/warehouse-management-system/latest/marketplace/install-features/install-the-marketplace-inventory-management-feature.html)  |
| Marketplace Order Management | {{page.release_tag}} | [Install the Marketplace Order Management feature](/docs/pbc/all/order-management-system/latest/marketplace/install-features/install-the-marketplace-order-management-feature.html)  |

### 1) Set up behavior

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| ProductOfferReservationAggregationQueryCriteriaExpanderPlugin | Scopes the OMS reservation aggregation query to the product offer carried by the reservation request. No-op when `productOfferReference` is empty. |  | Spryker\Zed\OmsProductOfferReservation\Communication\Plugin\Oms |
| ProductPackagingUnitReservationAggregationQueryCriteriaExpanderPlugin | Makes the OMS reservation aggregation packaging-unit-aware: for items sold as a packaging unit, the underlying product `amount` is aggregated instead of the wrapping `quantity`. |  | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Oms |

{% info_block infoBox "Deprecated plugin" %}

`ProductOfferPackagingUnitOmsReservationAggregationPlugin` (registered via `getOmsReservationAggregationPlugins()`) is deprecated. Its behavior is now covered by combining the product offer and packaging unit query criteria expander plugins — their criteria compose into a single aggregation query, so no dedicated offer-plus-packaging-unit plugin is needed. Remove the deprecated plugin from `getOmsReservationAggregationPlugins()` — keeping it registered causes the legacy flow to short-circuit the composed aggregation query.

{% endinfo_block %}

**src/Pyz/Zed/Oms/OmsDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Oms;

use Spryker\Zed\Oms\OmsDependencyProvider as SprykerOmsDependencyProvider;
use Spryker\Zed\OmsProductOfferReservation\Communication\Plugin\Oms\ProductOfferReservationAggregationQueryCriteriaExpanderPlugin;
use Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Oms\ProductPackagingUnitReservationAggregationQueryCriteriaExpanderPlugin;

class OmsDependencyProvider extends SprykerOmsDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\OmsExtension\Dependency\Plugin\OmsReservationAggregationQueryCriteriaExpanderPluginInterface>
     */
    protected function getOmsReservationAggregationQueryCriteriaExpanderPlugins(): array
    {
        return [
            new ProductOfferReservationAggregationQueryCriteriaExpanderPlugin(),
            new ProductPackagingUnitReservationAggregationQueryCriteriaExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that availability is calculated properly for the product offers that belong to the product with packaging units.

- Add such a product offer to the cart.
- Place an order.
- Make sure that `spy_oms_product_offer_reservation` contains a new row, which has reserved the quantity equal to the amount of the bought packaging unit.

{% endinfo_block %}
