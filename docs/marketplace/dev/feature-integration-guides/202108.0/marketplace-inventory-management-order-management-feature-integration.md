---
title: Marketplace Inventory Management + Order Management feature integration
last_updated: Dec 16, 2020
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
| Spryker Core | {{page.version}} | [Spryker Core feature integration](https://documentation.spryker.com/docs/spryker-core-feature-integration)  |
| Inventory Management | {{page.version}} |  [Inventory Management Feature Integration](https://documentation.spryker.com/docs/inventory-management-feature-integration)  |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/oms-product-offer-reservation: "^0.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| OmsProductOfferReservation | vendor/spryker/oms-product-offer-reservation |
| OmsProductOfferReservationGui | vendor/spryker/product-offer-reservation-gui |

{% endinfo_block %}

### 2) Set up the database schema

Adjust the schema definition so entity changes trigger events:

**src/Pyz/Zed/OmsProductOfferReservation/Persistence/Propel/Schema/spy_oms_product_offer_reservation.schema.xml**

```xml
<?xml version="1.0"?>
<database xmlns="spryker:schema-01"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          name="zed"
          xsi:schemaLocation="spryker:schema-01 https://static.spryker.com/schema-01.xsd"
          namespace="Orm\Zed\OmsProductOfferReservation\Persistence"
          package="src.Orm.Zed.OmsProductOfferReservation.Persistence">

    <table name="spy_oms_product_offer_reservation">
        <behavior name="event">
            <parameter name="spy_oms_product_offer_reservation_all" column="*"/>
        </behavior>
    </table>

</database>
```

Apply database changes and to generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY | TYPE | EVENT |
|-|-|-|
| spy_oms_product_offer_reservation | table | created |

{% endinfo_block %}

### 3) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
|-|-|-|-|
| SpyOmsProductOfferReservationEntity | object | Created | src/Generated/Shared/Transfer/SpyOmsProductOfferReservationEntityTransfer |
| OmsProductOfferReservationCriteria | object | Created | src/Generated/Shared/Transfer/OmsProductOfferReservationCriteriaTransfer |
| OmsProductOfferReservation | object | Created | src/Generated/Shared/Transfer/OmsProductOfferReservationTransfer |

{% endinfo_block %}

### 4) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| ProductOfferOmsReservationAggregationPlugin | Aggregates reservations for product offers. |  | Spryker\Zed\OmsProductOfferReservation\Communication\Plugin\Oms |
| ProductOfferOmsReservationReaderStrategyPlugin | Provides the ability to read product offer reservation data from alternative table. |  | Spryker\Zed\OmsProductOfferReservation\Communication\Plugin\Oms |
| ProductOfferOmsReservationWriterStrategyPlugin | Provides the ability to write product offer reservation to alternative table. |  | Spryker\Zed\OmsProductOfferReservation\Communication\Plugin\Oms |
| ProductOfferReservationPostSaveTerminationAwareStrategyPlugin | Prevents generic product availability update for product offers. |  | Spryker\Zed\OmsProductOfferReservation\Communication\Plugin\Oms |
| ProductOfferReservationProductOfferStockTableExpanderPlugin | Expands product offer stock table with reservations column. |  | Spryker\Zed\OmsProductOfferReservation\Communication\Plugin\Oms |

<details><summary markdown='span'>src/Pyz/Zed/Oms/OmsDependencyProvider.php</summary>

```php
namespace Pyz\Zed\Oms;

use Spryker\Zed\Availability\Communication\Plugin\Oms\AvailabilityReservationPostSaveTerminationAwareStrategyPlugin;
use Spryker\Zed\Kernel\Container;
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

</details>

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
