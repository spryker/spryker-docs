---
title: Marketplace Promotions & Discounts feature integration
last_updated: Jan 04, 2021
summary: This document describes the process how to integrate the Marketplace Promotions & Discounts feature into a Spryker project.
---

## Install feature core

Follow the steps below to install the Marketplace Promotions & Discounts feature core.


### Prerequisites

To start feature integration, overview, and install the necessary features:

| NAME | VERSION |
| - | - |
| Spryker Core                 | 202001.0   |
| Marketplace Order Management | dev-master |
| Promotions & Discounts       | 202001.0   |

###  1) Install the required modules using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker-feature/marketplace-promotions-discounts --update-with-dependencies
```

---

**Verification**

Make sure that the following modules were installed:

| MODULE | EXPECTED DIRECTORY |
 |
| - | - |
| DiscountMerchantSalesOrder    | spryker/discount-merchant-sales-order     |
| DiscountMerchantSalesOrderGui | spryker/discount-merchant-sales-order-gui |

---

### 2) Set up the transfer objects

Run the following commands to generate transfer changes.

```bash
console transfer:generate
```

---

**Verification**

Make sure that the following changes were applied in transfer objects:

| TRANSFER  | TYPE  | EVENT | PATH |
| - | - | - | - |
| MerchantOrder.merchantOrderItems | attribute | created | src/Generated/Shared/Transfer/MerchantOrderTransfer |

---

### 3) Add translations

#### Zed translations

Run the following command to generate a new translation cache for Zed:

```bash
console translator:generate-cache
```

### 4) Set up configuration

Change the following the configuration to enable the feature:

| CONFIGURATION | SPECIFICATION | NAMESPACE |
 |
| - | - | - |
| MerchantSalesOrderMerchantUserGuiConfig   ::getMerchantSalesOrderDetailExternalBlocksUrls | Adds Merchant discount separation while viewing Merchant Order | \Pyz\Zed\MerchantSalesOrderMerchantUserGui\MerchantSalesOrderMerchantUserGuiConfig |

**src/Pyz/Zed/MerchantSalesOrderMerchantUserGui/MerchantSalesOrderMerchantUserGuiConfig.php**

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
            'discount' => '/discount-merchant-sales-order-gui/merchant-sales-order/list',
        ];
    }
}
```

### 5) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |

| - | - | - | - |
| DiscountMerchantOrderFilterPlugin | Removes none Merchant related discounts from Merchant Orders | None          | Spryker\Zed\DiscountMerchantSalesOrder\Communication\Plugin |

**src/Pyz/Zed/MerchantSalesOrder/MerchantSalesOrderDependencyProvider.php**

```
<?php

namespace Pyz\Zed\MerchantSalesOrder;

use Spryker\Zed\DiscountMerchantSalesOrder\Communication\Plugin\DiscountMerchantOrderFilterPlugin;
use Spryker\Zed\MerchantSalesOrder\MerchantSalesOrderDependencyProvider as SprykerMerchantSalesOrderDependencyProvider;

class MerchantSalesOrderDependencyProvider extends SprykerMerchantSalesOrderDependencyProvider
{
    /**
     * @return \Spryker\Zed\MerchantSalesOrderExtension\Dependency\Plugin\MerchantOrderFilterPluginInterface[]
     */
    protected function getMerchantOrderFilterPlugins(): array
    {
        return [
            new DiscountMerchantOrderFilterPlugin(),
        ];
    }
}
```

---

**Verification**

 Make sure that correct discounts are applied to the merchant orders when viewing them in the Back Office.

---
