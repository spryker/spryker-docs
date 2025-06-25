This document describes how to install the Customer Account Management + Promotions & Discounts feature.

## Prerequisites

Install the required features:

| NAME                      | VERSION          | INSTALLATION GUIDE                                                                                                                                                                                   |
|---------------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Promotions & Discounts      | {{page.version}} | [Install the Promotions & Discounts feature](/docs/pbc/all/discount-management/latest/base-shop/install-and-upgrade/install-features/install-the-promotions-and-discounts-feature.html)    |
| Customer Account Management | {{page.version}} | [Install the Customer Account Management feature](/docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-feature.html)  |
| Spryker Core                | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                          |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/customer-discount-connector:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                        | EXPECTED DIRECTORY                      |
|-------------------------------|-----------------------------------------|
| CustomerDiscountConnector | vendor/customer-discount-connector |

{% endinfo_block %}

## 2) Set up database schema

Apply database changes:

```bash
console propel:install
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in the database:

| DATABASE ENTITY                 | TYPE  | EVENT   |
|---------------------------------|-------|---------|
| spy_customer_discount           | table | created |

{% endinfo_block %}

## 3) Set up behavior

Set up the following behaviors:

| PLUGIN                                               | SPECIFICATION                                                                        | PREREQUISITES | NAMESPACE                                                               |
|------------------------------------------------------|--------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------------|
| CustomerReferenceDecisionRulePlugin              | Checks if a customer reference matches the discount's condition.       |               | Spryker\Zed\CustomerDiscountConnector\Communication\Plugin\Discount |
| CustomerOrderAmountDecisionRulePlugin              | Checks if a customer's order number matches the discount's condition.       |               | Spryker\Zed\CustomerDiscountConnector\Communication\Plugin\Discount |
| CustomerDiscountOrderSavePlugin              | Stores the relationship between a customer and discount.       |               | Spryker\Zed\CustomerDiscountConnector\Communication\Plugin\Checkout |

**src/Pyz/Zed/Discount/DiscountDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Discount;

use Spryker\Zed\CustomerDiscountConnector\Communication\Plugin\Discount\CustomerOrderAmountDecisionRulePlugin;
use Spryker\Zed\CustomerDiscountConnector\Communication\Plugin\Discount\CustomerReferenceDecisionRulePlugin;
use Spryker\Zed\Discount\DiscountDependencyProvider as SprykerDiscountDependencyProvider;

class DiscountDependencyProvider extends SprykerDiscountDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\DiscountExtension\Dependency\Plugin\DecisionRulePluginInterface>
     */
    protected function getDecisionRulePlugins(): array
    {
        return array_merge(parent::getDecisionRulePlugins(), [
            new CustomerReferenceDecisionRulePlugin(),
            new CustomerOrderAmountDecisionRulePlugin(),
        ]);
    }
}
```

**src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Checkout;

use Spryker\Zed\CustomerDiscountConnector\Communication\Plugin\Checkout\CustomerDiscountOrderSavePlugin;
use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;
use Spryker\Zed\Kernel\Container;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return list<\Spryker\Zed\Checkout\Dependency\Plugin\CheckoutSaveOrderInterface|\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutDoSaveOrderInterface>
     */
    protected function getCheckoutOrderSavers(Container $container): array
    {
        return [
            new CustomerDiscountOrderSavePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. [Create a discount](/docs/pbc/all/discount-management/latest/base-shop/manage-in-the-back-office/create-discounts.html) and define its condition as a query string with a `customer-reference` field.
2. Add the `max-uses-per-customer` condition with value `1`.
3. Log in as a customer with a customer reference defined in the discount you've created. Make sure that the discount is applied to the cart automatically.
4. Place an order. Make sure a relationship between the customer and the discount is created in the `spy_customer_discount` database table.
5. Create a new cart and add some items. Make sure the same discount is not applied.

{% endinfo_block %}





















































