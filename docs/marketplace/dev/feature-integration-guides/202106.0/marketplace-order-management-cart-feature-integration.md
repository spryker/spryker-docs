---
title: Marketplace Order Management + Cart feature integration
last_updated:  Jan 05, 2021
description: This document describes the process how to integrate the Marketplace Order Management Feature + Cart integration feature into a Spryker project.
---

This document describes how to integrate the [Marketplace Order Management + Cart](https://github.com/spryker-feature/marketplace-merchant) feature into a Spryker project.

## Install feature core
Follow the steps below to install the Marketplace Order Management Feature + Cart feature core.


### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
| ----------- | ------- | ------------------|
| Order Threshold | dev-master  | [Order Threshold feature integration](https://documentation.spryker.com/docs/order-threshold-feature-integration) |
| Cart            | 202001.0    | [Cart feature integration](https://github.com/spryker-feature/cart) |

### 1) Install the required modules using Composer

Run the following commands to install the required modules:

```bash
composer require spryker/cart-note-merchant-sales-order-gui:"^0.1.0" --update-with-dependencies
```

---

**Verification**

Make sure that the following modules have been installed:

| MODULE                  | EXPECTED DIRECTORY                   |
| ----------------------------- | ------------------------------------------ |
| CartNoteMerchantSalesOrderGui | spryker/cart-note-merchant-sales-order-gui |

---

### 2) Set up transfer objects

Run the following commands to generate transfer changes.

```bash
console transfer:generate
```

---

**Verification**

Make sure that the following changes were applied in transfer objects.

| TRANSFER      | TYPE  | EVENT | PATH                                            |
| ------------------- | --------- | --------- | --------------------------------------------------- |
| MerchantOrder.order | attribute | created   | src/Generated/Shared/Transfer/MerchantOrderTransfer |

---

### 3) Set up behavior

Add the following configuration to the project:

```php
<?php

namespace Pyz\Zed\MerchantSalesOrderMerchantUserGui;

use Spryker\Zed\MerchantSalesOrderMerchantUserGui\MerchantSalesOrderMerchantUserGuiConfig as SprykerMerchantSalesOrderMerchantUserGuiConfig;

class MerchantSalesOrderMerchantUserGuiConfig extends SprykerMerchantSalesOrderMerchantUserGuiConfig
{
    /**
     * @return string[]
     */
    public function getMerchantSalesOrderDetailExternalBlocksUrls(): array
    {
        return [
            'cart_note' => '/cart-note-merchant-sales-order-gui/merchant-sales-order/list',
        ];
    }
}

```

---

**Verification**

Ensure that cart notes are shown on the order view page when looking at merchant orders in Zed GUI.

---

## Install feature front end
Follow the steps below to install the Marketplace Order Management Feature + Cart feature front end.

### Prerequisites

To start feature integration, overview and install the necessary features:

| NAME            | VERSION |
| -------------------- | ----------- |
| Order Threshold      | dev-master  |
| Cart                 | 202001.0    |
| Merchant Portal Core | dev-master  |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/cart-note-merchant-portal-gui:"^0.1.2" --update-with-dependencies
```

---

**Verification**

Make sure that the following modules have been installed:

| MODULE                | EXPECTED DIRECTORY                |
| ------------------------- | ------------------------------------- |
| CartNoteMerchantPortalGui | spryker/cart-note-merchant-portal-gui |

---

### 2) Set up behavior

Add the following configuration to the project:

| PLUGIN  | SPECIFICATION | PREREQUISITES  | NAMESPACE |
| -------------------- | ------------------ | ----------- | ------------------ |
| CartNoteMerchantOrderItemTableExpanderPlugin | Adds CartNote column to Sales tables in MerchantPortal | Marketplace Sales Merchant Portal integrated | Spryker\Zed\CartNoteMerchantPortalGui\Communication\Plugin |

**src/Pyz/Zed/SalesMerchantPortalGui/SalesMerchantPortalGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\SalesMerchantPortalGui;

use Spryker\Zed\CartNoteMerchantPortalGui\Communication\Plugin\SalesMerchantPortalGui\CartNoteMerchantOrderItemTableExpanderPlugin;
use Spryker\Zed\SalesMerchantPortalGui\SalesMerchantPortalGuiDependencyProvider as SprykerSalesMerchantPortalGuiDependencyProvider;

class SalesMerchantPortalGuiDependencyProvider extends SprykerSalesMerchantPortalGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\SalesMerchantPortalGuiExtension\Dependency\Plugin\MerchantOrderItemTableExpanderPluginInterface[]
     */
    protected function getMerchantOrderItemTableExpanderPlugins(): array
    {
        return [
            new CartNoteMerchantOrderItemTableExpanderPlugin(),
        ];
    }
}
```

---

**Verification**

Make sure that the `ProductOfferMerchantOrderItemTableExpanderPlugin` plugin is set up by opening  `http://zed.mysprykershop.com/sales-merchant-portal-gui/orders`. Click on any of the orders and check that column “Cart Note” is present.

---
