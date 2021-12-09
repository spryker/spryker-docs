---
title: Marketplace Promotions & Discounts feature integration
last_updated: Sep 09, 2021
description: This document describes the process how to integrate the Marketplace Promotions & Discounts feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Promotions & Discounts feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Promotions & Discounts feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
| - | - | - |
| Spryker Core                 | {{page.version}}   | [Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/spryker-core-feature-integration.html) |
| Marketplace Order Management | {{page.version}} | [Marketplace Order Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-order-management-feature-integration.html) |
| Promotions & Discounts       | {{page.version}}   | [Promotions & Discounts feature integration](https://github.com/spryker-feature/promotions-discounts) |

###  1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker-feature/marketplace-promotions-discounts:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules were installed:

| MODULE | EXPECTED DIRECTORY |
| - | - |
| DiscountMerchantSalesOrder    | vendor/spryker/discount-merchant-sales-order     |
| DiscountMerchantSalesOrderGui | vendor/spryker/discount-merchant-sales-order-gui |

{% endinfo_block %}

### 2) Set up configuration

Add the following configuration:

| CONFIGURATION | SPECIFICATION | NAMESPACE |
| ------------- | ------------- | --------- |
| MerchantSalesOrderMerchantUserGuiConfig::getMerchantSalesOrderDetailExternalBlocksUrls()  | Introduces list of urls of order detail page configuration. | src/Pyz/Zed/MerchantSalesOrderMerchantUserGui/MerchantSalesOrderMerchantUserGuiConfig.php |

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

### 3) Set up the transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes were applied in transfer objects:

| TRANSFER  | TYPE  | EVENT | PATH |
| - | - | - | - |
| CalculatedDiscount.fkSalesOrderItem | property | created | src/Generated/Shared/Transfer/CalculatedDiscountTransfer |

{% endinfo_block %}

### 4) Add translations

Generate a new translation cache for Zed:

```bash
console translator:generate-cache
```

### 5) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
| - | - | - | - |
| DiscountMerchantOrderFilterPlugin | Removes none merchant-related discounts from merchant orders. |           | Spryker\Zed\DiscountMerchantSalesOrder\Communication\Plugin |

**src/Pyz/Zed/MerchantSalesOrder/MerchantSalesOrderDependencyProvider.php**

```php
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


{% info_block warningBox "Verification" %}

Make sure that correct discounts are applied to the merchant orders when viewing them in the Back Office.

{% endinfo_block %}
