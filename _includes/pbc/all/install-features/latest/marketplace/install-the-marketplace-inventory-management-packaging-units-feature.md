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

To use multistore reservation aggregation, the following minimum module versions are required:

| NAME | VERSION |
| --- | --- |
| `spryker/product-offer-packaging-unit` | 1.1.0 |
| `spryker/product-packaging-unit` | 4.15.0 |
| `spryker/oms` | 11.54.0 |
| `spryker/oms-product-offer-reservation` | 1.3.0 |

### 1) Set up behavior

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| ProductOfferReservationAggregationQueryCriteriaExpanderPlugin | Scopes the OMS reservation aggregation query to the product offer carried by the reservation request. No-op when `productOfferReference` is empty. |  | Spryker\Zed\OmsProductOfferReservation\Communication\Plugin\Oms |
| ProductPackagingUnitReservationAggregationQueryCriteriaExpanderPlugin | Makes the OMS reservation aggregation packaging-unit-aware: for items sold as a packaging unit, the underlying product `amount` is aggregated instead of the wrapping `quantity`. |  | Spryker\Zed\ProductPackagingUnit\Communication\Plugin\Oms |

{% info_block infoBox "Deprecated plugin" %}

`ProductOfferPackagingUnitOmsReservationAggregationPlugin` (registered via `getOmsReservationAggregationPlugins()`) is deprecated. Its behavior is now covered by combining the product offer and packaging unit query criteria expander plugins — their criteria are composed into a single reservation aggregation query, so no dedicated offer-plus-packaging-unit plugin is needed. Keeping it registered causes the legacy aggregation flow to be used instead of the composed reservation aggregation query.

{% endinfo_block %}

If you are migrating an existing project, deintegrate the deprecated plugin: remove `ProductOfferPackagingUnitOmsReservationAggregationPlugin` from the `getOmsReservationAggregationPlugins()` stack in `src/Pyz/Zed/Oms/OmsDependencyProvider.php` and delete its `use` statement. If the stack becomes empty, return an empty array:

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
