

This document describes how to add the `category` parameter to calculation and conditions queries in the [Promotions & Discounts](/docs/pbc/all/discount-management/{{page.version}}/base-shop/promotions-discounts-feature-overview.html) feature.

## Install feature core

Follow the steps below to install the feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
| --- | --- | --- |
| Promotions & Discounts | {{page.version}} | [Promotions & Discounts feature integration](/docs/pbc/all/discount-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-promotions-and-discounts-feature.html) |
| Category Management | {{page.version}} | [Install the Category Management feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-category-management-feature.html) |
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |

### 1) Set up behavior

Set up the following behaviors:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| CategoryDecisionRulePlugin | Checks if the category matches the clause. | None | Spryker\Zed\CategoryDiscountConnector\Communication\Plugin\Discount |
| CategoryDiscountableItemCollectorPlugin | Collects discountable items from the given quote by item categories. | None | Spryker\Zed\CategoryDiscountConnector\Communication\Plugin\Discount |

**src/Pyz/Zed/Discount/DiscountDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Discount;

use Spryker\Zed\CategoryDiscountConnector\Communication\Plugin\Discount\CategoryDecisionRulePlugin;
use Spryker\Zed\CategoryDiscountConnector\Communication\Plugin\Discount\CategoryDiscountableItemCollectorPlugin;
use Spryker\Zed\Discount\DiscountDependencyProvider as SprykerDiscountDependencyProvider;

class DiscountDependencyProvider extends SprykerDiscountDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\DiscountExtension\Dependency\Plugin\DecisionRulePluginInterface>
     */
    protected function getDecisionRulePlugins(): array
    {
        return array_merge(parent::getDecisionRulePlugins(), [
            new CategoryDecisionRulePlugin(),
        ]);
    }

    /**
     * @return array<\Spryker\Zed\DiscountExtension\Dependency\Plugin\DiscountableItemCollectorPluginInterface>
     */
    protected function getCollectorPlugins(): array
    {
        return array_merge(parent::getCollectorPlugins(), [
            new CategoryDiscountableItemCollectorPlugin(),
        ]);
    }
}
```

{% info_block warningBox "Verification" %}

Ensure that the plugins work correctly:

1. [Create a discount](/docs/pbc/all/discount-management/{{page.version}}/base-shop/manage-in-the-back-office/create-discounts.html) and define its condition as a query string with a *category* field.
2. Add a product assigned to the defined category to the cart.
3. The discount should be applied to the cart.

{% endinfo_block %}


### 2) Build Zed UI frontend

Enable Javascript and CSS changes for Zed:

```bash
console frontend:zed:build
```
