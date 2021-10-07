---
title: Marketplace Order Management + Shipment feature integration
description: This document describes the process how to integrate the Marketplace Order Management Feature + Shipment feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Order Management + Shipment feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Order Management feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
| --------- | ------ | ---------------|
| Marketplace Shipment | {{page.version}} | [Marketplace Shipment feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-shipment-feature-integration.html) |
| Marketplace Order Management | {{page.version}} | [Marketplace Order Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-order-management-feature-integration.html) |

### 1) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN  | SPECIFICATION | PREREQUISITES | NAMESPACE |
| ------------ | ----------- | ----- | ------------ |
| ShipmentFormTypePlugin | Returns ShipmentFormType class name resolution.  |  | Spryker\Zed\ShipmentGui\Communication\Plugin\Form |
| ItemFormTypePlugin | Returns ItemFormType class name resolution.  |  | Spryker\Zed\ShipmentGui\Communication\Plugin\Form |
| MerchantReferenceShipmentExpenseExpanderPlugin | Expands expense transfer with merchant reference from items | | Spryker\Zed\MerchantSalesOrder\Communication\Plugin\Shipment |

**src/Pyz/Zed/MerchantSalesOrderMerchantUserGui/MerchantSalesOrderMerchantUserGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\MerchantSalesOrderMerchantUserGui;

use Spryker\Zed\Kernel\Communication\Form\FormTypeInterface;
use Spryker\Zed\MerchantSalesOrderMerchantUserGui\MerchantSalesOrderMerchantUserGuiDependencyProvider as SprykerMerchantSalesOrderMerchantUserGuiDependencyProvider;
use Spryker\Zed\ShipmentGui\Communication\Plugin\Form\ItemFormTypePlugin;
use Spryker\Zed\ShipmentGui\Communication\Plugin\Form\ShipmentFormTypePlugin;

class MerchantSalesOrderMerchantUserGuiDependencyProvider extends SprykerMerchantSalesOrderMerchantUserGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\Kernel\Communication\Form\FormTypeInterface
     */
    public function getShipmentFormTypePlugin(): FormTypeInterface
    {
        return new ShipmentFormTypePlugin();
    }

    /**
     * @return \Spryker\Zed\Kernel\Communication\Form\FormTypeInterface
     */
    public function getItemFormTypePlugin(): FormTypeInterface
    {
        return new ItemFormTypePlugin();
    }
}
```

**src/Pyz/Zed/Shipment/ShipmentDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Shipment;

use Spryker\Zed\MerchantSalesOrder\Communication\Plugin\Shipment\MerchantReferenceShipmentExpenseExpanderPlugin;
use Spryker\Zed\Shipment\ShipmentDependencyProvider as SprykerShipmentDependencyProvider;

class ShipmentDependencyProvider extends SprykerShipmentDependencyProvider
{
    /**
     * @return \Spryker\Zed\ShipmentExtension\Dependency\Plugin\ShipmentExpenseExpanderPluginInterface[]
     */
    protected function getShipmentExpenseExpanderPlugins(): array
    {
        return [
            new MerchantReferenceShipmentExpenseExpanderPlugin(),
        ];
    }
}
```