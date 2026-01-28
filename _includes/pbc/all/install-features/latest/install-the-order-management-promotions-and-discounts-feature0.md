This document describes how to install the Order Management + Promotions & Discounts feature.

## Install feature core

Follow the steps below to install the feature core.

### Prerequisites

Install the required features:

| NAME                   | VERSION          | INSTALLATION GUIDE                                                                                                                                                                                |
|------------------------|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Promotions & Discounts | {{page.version}} | [Install the Promotions & Discounts feature](/docs/pbc/all/discount-management/latest/base-shop/install-and-upgrade/install-features/install-the-promotions-and-discounts-feature.html) |
| Order Management       | {{page.version}} | [Install the Order Management feature](/docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html)           |
| Spryker Core           | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                       |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/sales-discount-connector:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                                   | EXPECTED DIRECTORY                      |
|------------------------------------------|-----------------------------------------|
| SalesDiscountConnector                   | vendor/spryker/sales-discount-connector |

{% endinfo_block %}

### 2) Set up behavior

Set up the following behaviors:

| PLUGIN                               | SPECIFICATION                                    | PREREQUISITES | NAMESPACE                                                        |
|--------------------------------------|--------------------------------------------------|---------------|------------------------------------------------------------------|
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

1. [Create a discount](/docs/pbc/all/discount-management/latest/base-shop/manage-in-the-back-office/create-discounts.html) and define its condition as a query string with a `customer-order-count` field.
2. Log in as a customer with a number of orders that fulfills the discount condition.
3. Add any product to the cart.
4. Verify that the discount is applied to the cart.

{% endinfo_block %}
