This document describes how to install the Marketplace Inventory Management + Packaging Units feature.

## Install feature core

Follow the steps below to install the Marketplace Inventory Management + Packaging Units feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|-|-|-|
| Packaging Units  | 202507.0 | [Install the Packaging Units feature](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-packaging-units-feature.html)  |
| Marketplace Inventory Management | 202507.0 | [Install the Marketplace Inventory Management feature](/docs/pbc/all/warehouse-management-system/latest/marketplace/install-features/install-the-marketplace-inventory-management-feature.html)  |
| Marketplace Order Management | 202507.0 | [Install the Marketplace Order Management feature](/docs/pbc/all/order-management-system/latest/marketplace/install-features/install-the-marketplace-order-management-feature.html)  |

### 1) Set up behavior

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| ProductOfferPackagingUnitOmsReservationAggregationPlugin | Aggregates reservations for product offers packaging unit. |  | Spryker\Zed\ProductOfferPackagingUnit\Communication\Plugin\Oms |

**src/Pyz/Zed/Oms/OmsDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Oms;

use Spryker\Zed\Oms\OmsDependencyProvider as SprykerOmsDependencyProvider;
use Spryker\Zed\ProductOfferPackagingUnit\Communication\Plugin\Oms\ProductOfferPackagingUnitOmsReservationAggregationPlugin;

class OmsDependencyProvider extends SprykerOmsDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\OmsExtension\Dependency\Plugin\OmsReservationAggregationPluginInterface>
     */
    protected function getOmsReservationAggregationPlugins(): array
    {
        return [
            new ProductOfferPackagingUnitOmsReservationAggregationPlugin(),
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
