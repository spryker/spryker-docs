---
title: "Migrate OrdersRestApi to API Platform"
description: Step-by-step guide to migrate the OrdersRestApi module to the API Platform Sales module.
last_updated: Mar 31, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `OrdersRestApi` Glue module to the API Platform `Sales` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

## Overview

The `OrdersRestApi` module provided the following storefront endpoints:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `GET /orders` | List orders | `OrdersResourceRoutePlugin` |
| `GET /orders/{orderReference}` | Get order | `OrdersResourceRoutePlugin` |
| `GET /customers/{customerReference}/orders` | List customer orders | `CustomerOrdersResourceRoutePlugin` |

These are now served by the API Platform `Sales` module, which also adds the `order-shipments` sub-resource.

## 1. Update module dependencies

```bash
composer require spryker/sales:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugins from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugins from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `OrdersResourceRoutePlugin` | `Spryker\Glue\OrdersRestApi\Plugin\OrdersResourceRoutePlugin` |
| `CustomerOrdersResourceRoutePlugin` | `Spryker\Glue\OrdersRestApi\Plugin\CustomerOrdersResourceRoutePlugin` |

## 3. Remove relationship plugins from GlueApplicationDependencyProvider

In the same file, remove the following relationship plugin registrations from `getResourceRelationshipPlugins()`:

| Plugin to remove | Fully qualified class name | Was registered on resource |
|---|---|---|
| `MerchantsByOrderResourceRelationshipPlugin` | `Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication\MerchantsByOrderResourceRelationshipPlugin` | `orders` |
| `OrderShipmentByOrderResourceRelationshipPlugin` | `Spryker\Glue\ShipmentsRestApi\Plugin\GlueApplication\OrderShipmentByOrderResourceRelationshipPlugin` | `orders` |
| `OrderAmendmentsByOrderResourceRelationshipPlugin` | `Spryker\Glue\OrderAmendmentsRestApi\Plugin\GlueApplication\OrderAmendmentsByOrderResourceRelationshipPlugin` | `orders` |
| `OrderRelationshipByOrderReferencePlugin` | `Spryker\Glue\OrdersRestApi\Plugin\OrderRelationshipByOrderReferencePlugin` | `checkout` |

## 4. Delete the OrdersRestApi Pyz module

Delete the entire `src/Pyz/OrdersRestApi/` directory. This module contained:

- `Pyz\Glue\OrdersRestApi\OrdersRestApiDependencyProvider` — had order item and order details attribute mapper plugins

The plugins that were registered there are replaced by new expander plugins in the `Sales` module dependency provider (see step 5).

## 5. Create Sales Glue dependency provider

Create a new file `src/Pyz/Glue/Sales/SalesDependencyProvider.php`. This file does not exist yet in your project.

```php
<?php

declare(strict_types = 1);

namespace Pyz\Glue\Sales;

use Spryker\Glue\ConfigurableBundle\Plugin\Sales\SalesConfiguredBundleOrderItemExpanderPlugin;
use Spryker\Glue\Oms\Plugin\Sales\OmsOrderItemExpanderPlugin;
use Spryker\Glue\ProductBundle\Plugin\Sales\BundleItemOrderDetailsExpanderPlugin;
use Spryker\Glue\ProductConfiguration\Plugin\Sales\ProductConfigurationOrderItemExpanderPlugin;
use Spryker\Glue\ProductMeasurementUnit\Plugin\Sales\SalesUnitOrderItemExpanderPlugin;
use Spryker\Glue\ProductOption\Plugin\Sales\ProductOptionOrderItemExpanderPlugin;
use Spryker\Glue\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\SalesExtension\Dependency\Plugin\OrderItemExpanderPluginInterface>
     */
    protected function getOrderItemExpanderPlugins(): array
    {
        return [
            new ProductOptionOrderItemExpanderPlugin(),
            new SalesUnitOrderItemExpanderPlugin(),
            new OmsOrderItemExpanderPlugin(),
            new SalesConfiguredBundleOrderItemExpanderPlugin(),
            new ProductConfigurationOrderItemExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\SalesExtension\Dependency\Plugin\OrderDetailsExpanderPluginInterface>
     */
    protected function getOrderDetailsExpanderPlugins(): array
    {
        return [
            new BundleItemOrderDetailsExpanderPlugin(),
        ];
    }
}
```

## 6. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

| Plugin | Status |
|---|---|
| `MerchantsByOrderResourceRelationshipPlugin` (`MerchantsRestApi`) | Removed. Merchant data on orders is now provided by the `Sales` module through the `include` parameter. |
| `OrderShipmentByOrderResourceRelationshipPlugin` (`ShipmentsRestApi`) | Removed. Order shipments are now a dedicated `order-shipments` sub-resource in the `Sales` module. |
| `OrderAmendmentsByOrderResourceRelationshipPlugin` (`OrderAmendmentsRestApi`) | Removed. Order amendments are now provided by the `SalesOrderAmendment` module through the `include` parameter. |
| `OrderRelationshipByOrderReferencePlugin` (`OrdersRestApi`) | Removed from `checkout` resource. Now handled by the `Checkout` module. |
| `OrderItemByResourceIdResourceRelationshipPlugin` (`OrdersRestApi`) | Remains on legacy Glue for `return-items`. Do not remove yet. |
