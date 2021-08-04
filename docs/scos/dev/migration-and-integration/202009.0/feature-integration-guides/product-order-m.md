---
title: Product + order management feature integration
originalLink: https://documentation.spryker.com/v6/docs/product-order-management-feature-integration
redirect_from:
  - /v6/docs/product-order-management-feature-integration
  - /v6/docs/en/product-order-management-feature-integration
---

## Install Feature Core

### Prerequisites
To start feature integration, overview and install the necessary features:

| Feature | Version |
| --- | --- |
| Product | 202009.0 |
| Order Management | 202009.0 |
| Spryker Core | 202009.0 |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules
```bash
composer require spryker/sales-product-connector:"^1.4.0" --update-with-dependencies
```
{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| Module | Expected Directory |
| --- | --- |
| `SalesProductConnector` | `vendor/spryker/sales-product-connector` |

{% endinfo_block %}
### 2) Set up Transfer Objects
Run the following command to generate transfer changes:
```bash
console transfer:generate
```
{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| Transfer| Type| Event| Path|
| --- | --- | --- | --- |
| `Order.idSalesOrder` | property | Created |`src/Generated/Shared/Transfer/OrderTransfer` |
| `Item.fkSalesOrder` | property | Created | `src/Generated/Shared/Transfer/ItemTransfer` |

{% endinfo_block %}

### 3) Set up Behavior
Register the following plugins:
| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ItemMetadataSearchOrderExpanderPlugin` | Expands items of each order with metadata information. | None | `Spryker\Zed\SalesProductConnector\Communication\Plugin\Sales` |
| `MetadataOrderItemExpanderPlugin` | Expands order items with metadata information. | None | `Spryker\Zed\SalesProductConnector\Communication\Plugin\Sales` |
| `ProductIdOrderItemExpanderPlugin` | Expands order items with abstract and concrete product ids. | None | `Spryker\Zed\SalesProductConnector\Communication\Plugin\Sales`

**/src/Pyz/Zed/Sales/SalesDependencyProvider.php**
```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;
use Spryker\Zed\SalesProductConnector\Communication\Plugin\Sales\ItemMetadataSearchOrderExpanderPlugin;
use Spryker\Zed\SalesProductConnector\Communication\Plugin\Sales\MetadataOrderItemExpanderPlugin;
use Spryker\Zed\SalesProductConnector\Communication\Plugin\Sales\ProductIdOrderItemExpanderPlugin;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\SearchOrderExpanderPluginInterface[]
     */
    protected function getSearchOrderExpanderPlugins(): array
    {
        return [
            new ItemMetadataSearchOrderExpanderPlugin(),
        ];
    }
    
    /**
     * @return \Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemExpanderPluginInterface[]
     */
    protected function getOrderItemExpanderPlugins(): array
    {
        return [
            new MetadataOrderItemExpanderPlugin(),
            new ProductIdOrderItemExpanderPlugin(),
        ];
    }
}
```
{% info_block warningBox "Verification" %}

Make sure that every order item from `SalesFacade::searchOrders()` results contain metadata information.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that every order item from `SalesFacade::getOrderItems()` results contain product concrete/abstract IDs data.
Make sure that every order item from `SalesFacade::getOrderItems()` results contain metadata information.

{% endinfo_block %}

