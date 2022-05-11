---
title: Marketplace Inventory Management + Packaging Units feature integration
last_updated: Sep 07, 2021
description: This document describes the process how to integrate the Marketplace Inventory Management + Packaging Units feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Inventory Management + Packaging Units feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Inventory Management + Packaging Units feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
|-|-|-|
| Packaging Units  | {{page.version}} | [Packaging Units feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/packaging-units-feature-integration.html)  |
| Marketplace Inventory Management | {{page.version}} | [Marketplace Inventory Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-inventory-management-feature-integration.html)  |
| Marketplace Order Management | {{page.version}} | [Marketplace Order Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-order-management-feature-integration.html)  |

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
     * @return \Spryker\Zed\OmsExtension\Dependency\Plugin\OmsReservationAggregationPluginInterface[]
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

* Add such a product offer to the cart.
* Place an order.
* Make sure that `spy_product_offer_reservation` contains a new row, which has reserved the quantity equal to the amount of the bought packaging unit.

{% endinfo_block %}
