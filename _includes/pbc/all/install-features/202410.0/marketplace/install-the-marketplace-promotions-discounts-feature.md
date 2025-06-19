

This document describes how to install the Marketplace Promotions & Discounts feature.

## Install feature core

Follow the steps below to install the Marketplace Promotions & Discounts feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
| - | - | - |
| Spryker Core                 | {{page.version}}   | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Marketplace Order Management | {{page.version}} | [Install the Marketplace Order Management feature](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/install-features/install-the-marketplace-order-management-feature.html) |
| Promotions & Discounts       | {{page.version}}   | [Install the Promotions & Discounts feature](https://github.com/spryker-feature/promotions-discounts) |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/marketplace-promotions-discounts:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

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
     * @return array<string>
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

use Spryker\Zed\DiscountMerchantSalesOrder\Communication\Plugin\MerchantSalesOrder\DiscountMerchantOrderFilterPlugin;
use Spryker\Zed\MerchantSalesOrder\MerchantSalesOrderDependencyProvider as SprykerMerchantSalesOrderDependencyProvider;

class MerchantSalesOrderDependencyProvider extends SprykerMerchantSalesOrderDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\MerchantSalesOrderExtension\Dependency\Plugin\MerchantOrderFilterPluginInterface>
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
