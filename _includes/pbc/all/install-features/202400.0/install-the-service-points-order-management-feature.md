

This document describes how to integrate the Service Points + Order Management feature into a Spryker project.

## Install feature core

Follow the steps below to install the Service Points + Order Management feature.

### Prerequisites

To start feature integration, integrate the required features:

| NAME             | VERSION          | INTEGRATION GUIDE                                                                                                                                                                       |
|------------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Service Points   | {{page.version}} | [Install the Service Points feature](/docs/pbc/all/service-points/{{page.version}}/install-and-upgrade/install-the-service-points-feature.html)                                         |
| Order Management | {{page.version}} | [Order Management feature integration](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html) |

## 1) Install the required modules using Composer

```bash
composer require spryker/sales-service-point:"^0.1.0" spryker/sales-service-point-gui:"^0.1.0" spryker/sales-service-point-gui:"^0.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following module has been installed:

| MODULE                  | EXPECTED DIRECTORY                             |
|-------------------------|------------------------------------------------|
| SalesServicePoint       | vendor/spryker/sales-service-point             |
| SalesServicePointGui    | vendor/spryker/sales-service-point-gui         |
| SalesServicePointWidget | vendor/spryker-shop/sales-service-point-widget |

{% endinfo_block %}

## 2) Set up database schema and transfer objects

1. Apply database changes and generate transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in the database:

| DATABASE ENTITY                     | TYPE   | EVENT   |
|-------------------------------------|--------|---------|
| spy_sales_order_item_service_point  | table  | created |

Make sure that propel entities have been generated successfully by checking their existence. Also, make generated entity classes extending respective Spryker core classes.

| CLASS NAMESPACE                                                           | EXTENDS                                                                                      |
|---------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| \Orm\Zed\SalesServicePoint\Persistence\SpySalesOrderItemServicePoint      | \Spryker\Zed\SalesServicePoint\Persistence\Propel\AbstractSpySalesOrderItemServicePoint      |
| \Orm\Zed\SalesServicePoint\Persistence\SpySalesOrderItemServicePointQuery | \Spryker\Zed\SalesServicePoint\Persistence\Propel\AbstractSpySalesOrderItemServicePointQuery |

Make sure that the following changes have been applied in transfer objects:

| TRANSFER                             | TYPE     | EVENT   | PATH                                                               |
|--------------------------------------|----------|---------|--------------------------------------------------------------------|
| SalesOrderItemServicePoint           | class    | created | src/Generated/Shared/Transfer/SalesOrderItemServicePointTransfer   |
| SalesOrderItemServicePointCriteria   | class    | created | src/Generated/Shared/Transfer/SalesOrderItemServicePointCriteria   |
| SalesOrderItemServicePointConditions | class    | created | src/Generated/Shared/Transfer/SalesOrderItemServicePointConditions |
| SalesOrderItemServicePointCollection | class    | created | src/Generated/Shared/Transfer/SalesOrderItemServicePointCollection |
| ServicePoint                         | class    | created | src/Generated/Shared/Transfer/ServicePoint                         |
| Quote                                | class    | created | src/Generated/Shared/Transfer/QuoteTransfer                        |
| SaveOrder                            | class    | created | src/Generated/Shared/Transfer/SaveOrderTransfer                    |
| Item                                 | class    | created | src/Generated/Shared/Transfer/ItemTransfer                         |
| ShipmentGroup.items                  | property | created | src/Generated/Shared/Transfer/ShipmentGroupTransfer                |

{% endinfo_block %}

## 3) Set up behavior

1. Register sales plugins:

| PLUGIN                                | SPECIFICATION                                              | PREREQUISITES | NAMESPACE                                                                                     |
|---------------------------------------|------------------------------------------------------------|---------------|-----------------------------------------------------------------------------------------------|
| ServicePointOrderItemExpanderPlugin   | Expands sales order items with with related service point. | None          | Spryker\Zed\SalesServicePoint\Communication\Plugin\Sales\ServicePointOrderItemExpanderPlugin  |
| ServicePointOrderItemsPostSavePlugin  | Persists service point information for sales order items.  | None          | Spryker\Zed\SalesServicePoint\Communication\Plugin\Sales\ServicePointOrderItemsPostSavePlugin |

**src/Pyz/Zed/Sales/SalesDependencyProvider.php**

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;
use Spryker\Zed\SalesServicePoint\Communication\Plugin\Sales\ServicePointOrderItemExpanderPlugin;
use Spryker\Zed\SalesServicePoint\Communication\Plugin\Sales\ServicePointOrderItemsPostSavePlugin;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemExpanderPluginInterface>
     */
    protected function getOrderItemExpanderPlugins(): array
    {
        return [
            new ServicePointOrderItemExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemsPostSavePluginInterface>
     */
    protected function getOrderItemsPostSavePlugins(): array
    {
        return [
            new ServicePointOrderItemsPostSavePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that sales plugins work correctly:

1.  Add product offer with service point shipment type to cart.

2.  Place an order with the added product.

3.  Check that the `spy_sales_order_item_service_point` database table contains a record with the product and selected service point.

{% endinfo_block %}

## Install feature frontend

## 1) Set up widgets

1. Register the following plugins to enable widgets:

| PLUGIN                                      | SPECIFICATION                                             | PREREQUISITES | NAMESPACE                                       |
|---------------------------------------------|-----------------------------------------------------------|---------------|-------------------------------------------------|
| SalesServicePointNameForShipmentGroupWidget | Allow customers to display orders related service points. |               | SprykerShop\Yves\SalesServicePointWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\SalesServicePointWidget\Widget\SalesServicePointNameForShipmentGroupWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            SalesServicePointNameForShipmentGroupWidget::class,
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the following widgets have been registered by adding the respective code snippets to a Twig template:

| WIDGET                                      | VERIFICATION                                                                                                                                                                    |
|---------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| SalesServicePointNameForShipmentGroupWidget | `{% raw %}{%{% endraw %} widget 'SalesServicePointNameForShipmentGroupWidget' args [...] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}` |

{% endinfo_block %}
