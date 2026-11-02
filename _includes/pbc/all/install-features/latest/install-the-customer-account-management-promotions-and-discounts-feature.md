This document describes how to install the Customer Account Management + Promotions & Discounts feature.

## Prerequisites

Install the required features:

| NAME                      | VERSION          | INSTALLATION GUIDE                                                                                                                                                                                   |
|---------------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Promotions & Discounts      | {{page.release_tag}} | [Install the Promotions & Discounts feature](/docs/pbc/all/discount-management/latest/base-shop/install-and-upgrade/install-features/install-the-promotions-and-discounts-feature.html)    |
| Customer Account Management | {{page.release_tag}} | [Install the Customer Account Management feature](/docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-feature.html)  |
| Spryker Core                | {{page.release_tag}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                          |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/customer-discount-connector:"^1.1.0" --update-with-dependencies
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
| CustomerMaximumOrderAmountDecisionRulePlugin              | Checks if a customer's order number matches the discount's condition.       |               | Spryker\Zed\CustomerDiscountConnector\Communication\Plugin\Discount |
| CustomerDiscountOrderSavePlugin              | Stores the relationship between a customer and discount.       |               | Spryker\Zed\CustomerDiscountConnector\Communication\Plugin\Checkout |

**src/Pyz/Zed/Discount/DiscountDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Discount;

use Spryker\Zed\CustomerDiscountConnector\Communication\Plugin\Discount\CustomerMaximumOrderAmountDecisionRulePlugin;
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
            new CustomerMaximumOrderAmountDecisionRulePlugin(),
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
2. Add the `maximum-uses-per-customer` condition with value `1`.
3. Log in as a customer with a customer reference defined in the discount you've created. Make sure that the discount is applied to the cart automatically.
4. Place an order. Make sure a relationship between the customer and the discount is created in the `spy_customer_discount` database table.
5. Create a new cart and add some items. Make sure the same discount is not applied.

{% endinfo_block %}

## Optional: Apply customer-group discounts to companies and business units

By default, the `customer-group` discount condition matches only the customer groups a customer is assigned to directly. To offer a discount to all users of a B2B company or business unit without assigning each customer to the group individually, let the condition also match the customer groups assigned to the customer's company and business units. For details on how business unit assignments are inherited, see [Customer Groups overview](/docs/pbc/all/customer-relationship-management/latest/base-shop/customer-account-management-feature-overview/customer-groups-overview.html#how-business-unit-assignments-are-inherited).

### Prerequisites

- `spryker-feature/customer-experience-management` is installed.
- `CustomerGroupDecisionRulePlugin` from `spryker/customer-group-discount-connector` is registered in `DiscountDependencyProvider::getDecisionRulePlugins()`.

### 1) Install the required modules

```bash
composer require spryker/customer-group:"^2.16.0" spryker/customer-group-extension:"^1.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                 | EXPECTED DIRECTORY                        |
|------------------------|-------------------------------------------|
| CustomerGroup          | vendor/spryker/customer-group             |
| CustomerGroupExtension | vendor/spryker/customer-group-extension   |

{% endinfo_block %}

### 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER                | TYPE     | EVENT   | PATH                                                          |
|-------------------------|----------|---------|---------------------------------------------------------------|
| CustomerGroupCollection | class    | created | src/Generated/Shared/Transfer/CustomerGroupCollectionTransfer |
| CompanyUser             | class    | created | src/Generated/Shared/Transfer/CompanyUserTransfer             |
| Customer.companyUserTransfer | property | created | src/Generated/Shared/Transfer/CustomerTransfer           |

{% endinfo_block %}

### 3) Set up behavior

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| CompanyUserCustomerGroupProviderPlugin | Provides the customer groups assigned to the company and business unit of the company user the customer currently shops as, including the ancestor business units. | | SprykerFeature\Zed\CustomerExperienceManagement\Communication\Plugin\CustomerGroup |

**src/Pyz/Zed/CustomerGroup/CustomerGroupDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CustomerGroup;

use Spryker\Zed\CustomerGroup\CustomerGroupDependencyProvider as SprykerCustomerGroupDependencyProvider;
use SprykerFeature\Zed\CustomerExperienceManagement\Communication\Plugin\CustomerGroup\CompanyUserCustomerGroupProviderPlugin;

class CustomerGroupDependencyProvider extends SprykerCustomerGroupDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\CustomerGroupExtension\Dependency\Plugin\CustomerGroupProviderPluginInterface>
     */
    protected function getCustomerGroupProviderPlugins(): array
    {
        return [
            new CompanyUserCustomerGroupProviderPlugin(),
        ];
    }
}
```

To provide customer groups from another source, implement `Spryker\Zed\CustomerGroupExtension\Dependency\Plugin\CustomerGroupProviderPluginInterface` and register your plugin in the same stack.

{% info_block warningBox "Verification" %}

1. In the Back Office, assign a business unit to a customer group.
2. [Create a discount](/docs/pbc/all/discount-management/latest/base-shop/manage-in-the-back-office/create-discounts.html) with the condition `customer-group = "{CUSTOMER_GROUP_NAME}"`.
3. On the Storefront, log in as a company user of a child business unit of the assigned business unit, and add a product to the cart.
4. Make sure the discount is applied.
5. Log in as a company user of the parent business unit of the assigned business unit, and add a product to the cart.
6. Make sure the discount is not applied.

{% endinfo_block %}
