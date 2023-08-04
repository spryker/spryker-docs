


This document describes how to integrate the [Order Management](/docs/scos/user/features/{{page.version}}/order-management-feature-overview/order-management-feature-overview.html) + [Inventory Management](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/inventory-management-feature-overview.html) features into a Spryker project.

{% info_block errorBox %}

The following features integration guide expects the basic feature to be in place.

The current feature integration guide adds the following functionality:

* [Order Management](/docs/scos/user/features/{{page.version}}/order-management-feature-overview/order-management-feature-overview.html)
* [Inventory Management](/docs/pbc/all/warehouse-management-system/{{page.version}}/base-shop/inventory-management-feature-overview.html)

{% endinfo_block %}

## Install feature core

Follow the steps below to install the Order Management + Inventory Management feature.

### Prerequisites

To start feature integration, integrate the required features:

| NAME                 | VERSION          | INTEGRATION GUIDE                                                                                                                                 |
|----------------------|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| Order Management     | {{page.version}} | [Order Management feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/order-management-feature-integration.html)      |
| Inventory Management | {{page.version}} | [Inventory Management feature integration](docs/scos/dev/feature-integration-guides/{{page.version}}/install-the-inventory-management-feature.md) |


### 1) Set up behavior

Enable the following plugins.

| PLUGIN                           | SPECIFICATION                       | PREREQUISITES | NAMESPACE                                                  |
|----------------------------------|-------------------------------------|---------------|------------------------------------------------------------|
| WarehouseOrderItemExpanderPlugin | Expands order item with warehouse.  | none          | Spryker\Zed\WarehouseAllocation\Communication\Plugin\Sales |


**src/Pyz/Zed/Sales/SalesDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;
use Spryker\Zed\WarehouseAllocation\Communication\Plugin\Sales\WarehouseOrderItemExpanderPlugin;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemExpanderPluginInterface>
     */
    protected function getOrderItemExpanderPlugins(): array
    {
        return [
            new WarehouseOrderItemExpanderPlugin(),
        ];
    }
}

```

{% info_block warningBox "Verification" %}

Make sure that when you retrieve an order each order item has warehouse property set.  

{% endinfo_block %}
