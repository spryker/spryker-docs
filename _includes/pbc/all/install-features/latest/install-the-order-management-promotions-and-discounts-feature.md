This document describes how to install the Order Management + Promotions & Discounts feature.

## Install feature core

Follow the steps below to install the feature core.

### Prerequisites

Install the required features:

| NAME                   | VERSION          | INSTALLATION GUIDE                                                                                                                                                                                |
|------------------------|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Promotions & Discounts | {{page.version}} | [Install the Promotions & Discounts feature](/docs/pbc/all/discount-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-promotions-and-discounts-feature.html) |
| Order Management       | {{page.version}} | [Install the Order Management feature](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html)           |
| Spryker Core           | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                       |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/sales-discount-connector:"^1.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                                   | EXPECTED DIRECTORY                      |
|------------------------------------------|-----------------------------------------|
| SalesDiscountConnector                   | vendor/spryker/sales-discount-connector |

{% endinfo_block %}

### 2) Set up behavior

Set up the following behaviors:

| PLUGIN                               | SPECIFICATION                                                          | PREREQUISITES | NAMESPACE                                                        |
|--------------------------------------|------------------------------------------------------------------------|---------------|------------------------------------------------------------------|
| CustomerOrderCountDecisionRulePlugin | Checks if the customer's order count matches the discount's condition. |               | Spryker\Zed\SalesDiscountConnector\Communication\Plugin\Discount |

**src/Pyz/Zed/Discount/DiscountDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Discount;

use Spryker\Zed\Discount\DiscountDependencyProvider as SprykerDiscountDependencyProvider;
use Spryker\Zed\SalesDiscountConnector\Communication\Plugin\Discount\CustomerOrderCountDecisionRulePlugin;

class DiscountDependencyProvider extends SprykerDiscountDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\DiscountExtension\Dependency\Plugin\DecisionRulePluginInterface>
     */
    protected function getDecisionRulePlugins(): array
    {
        return array_merge(parent::getDecisionRulePlugins(), [
            new CustomerOrderCountDecisionRulePlugin(),
        ]);
    }
}
```

{% info_block warningBox "Verification" %}

1. [Create a discount](/docs/pbc/all/discount-management/{{site.version}}/base-shop/manage-in-the-back-office/create-discounts.html) and define its condition as a query string with a `customer-order-count` field.
2. Log in as a customer with a number of orders that fulfills the discount condition.
3. Add any product to the cart.
4. Verify that the discount is applied to the cart.

{% endinfo_block %}

### 3) Configure discount context synchronization

By default, when a discount based on `CustomerOrderCountDecisionRulePlugin` is applied to the main order, it is *not* automatically applied to associated merchant orders in a marketplace setup. Merchant orders discounts are calculated separately from the main order.  

For customer order count-based discounts to be applied to merchant orders, configure the synchronization of discount context between the main order and merchant orders:

1. Update the required modules using Composer:

```bash
composer require spryker/merchant-sales-order:"^1.7.0" spryker/merchant-sales-order-extension:"^1.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                      | EXPECTED DIRECTORY                            |
|-----------------------------|-----------------------------------------------|
| MerchantSalesOrder          | vendor/spryker/merchant-sales-order           |
| MerchantSalesOrderExtension | vendor/spryker/merchant-sales-order-extension |

{% endinfo_block %}

2. Set `SalesDiscountConnectorConfig::isCurrentOrderExcludedFromCount` to return `true` if you want to exclude the current order from the `customer-order-count` discount condition:

**src/Pyz/Zed/SalesDiscountConnector/SalesDiscountConnectorConfig.php**

```php
<?php

namespace Pyz\Zed\SalesDiscountConnector;

use Spryker\Zed\SalesDiscountConnector\SalesDiscountConnectorConfig as SprykerSalesDiscountConnectorConfig;

class SalesDiscountConnectorConfig extends SprykerSalesDiscountConnectorConfig
{
    /**
     * @return bool
     */
    public function isCurrentOrderExcludedFromCount(): bool
    {
        return true;
    }
}
```

3. Copy the order context from the original order to the merchant order:

**src/Pyz/Zed/MerchantSalesOrder/MerchantSalesOrderDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\MerchantSalesOrder;

use Spryker\Zed\MerchantSalesOrder\MerchantSalesOrderDependencyProvider as SprykerMerchantSalesOrderDependencyProvider;
use Spryker\Zed\SalesDiscountConnector\Communication\Plugin\MerchantSalesOrder\CopyOrderContextMerchantOrderTotalsPreRecalculatePlugin;

class MerchantSalesOrderDependencyProvider extends SprykerMerchantSalesOrderDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\MerchantSalesOrderExtension\Dependency\Plugin\MerchantOrderTotalsPreRecalculatePluginInterface>
     */
    protected function getMerchantOrderTotalsPreRecalculatePlugins(): array
    {
        return [
            new CopyOrderContextMerchantOrderTotalsPreRecalculatePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. [Create a discount](/docs/pbc/all/discount-management/{{site.version}}/base-shop/manage-in-the-back-office/create-discounts.html) and define its condition as a query string with a `customer-order-count` field.
2. Log in as a customer with a number of orders that fulfills the discount condition.
3. Add any product offer (merchant product) to the cart.
4. Verify that the discount is applied to the cart.
5. Place an order.
6. Trigger OMS commands and conditions till merchant order is created.
7. Go to merchant portal and check the order.
8. Discount should be applied to the merchant order.

{% endinfo_block %}
