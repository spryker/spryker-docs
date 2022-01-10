---
title: Category Management + promotions & discounts feature integration
description: This guide provides step-by-step instructions on integrating into a Spryker-based project the new feature: Addition of a "Category" parameter to calculation and conditions queries in discounts.
template: feature-integration-guide-template
---

## Install feature core

Follow the steps below to install the feature core.

### Prerequisites

To start feature integration, overview, and install the necessary features:


| NAME                   | VERSION |
|------------------------| --- |
| Promotions & Discounts | {{page.version}} |
| Category Management    | {{page.version}} |
| Spryker Core           | {{page.version}} |

### 1) Set up behavior

Set up the following behaviors:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| CategoryDecisionRulePlugin | Checks if category matches clause. | None | Spryker\Zed\CategoryDiscountConnector\Communication\Plugin\Discount |
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

1. [Create a discount](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/creating-cart-rules.html) and define its condition as a query string with a *category* field.
2. Add a product assigned to the defined category to cart.
3. The discount should be applied to the cart.

{% endinfo_block %}


### 2) Build Zed UI frontend

Run the following command to enable Javascript and CSS changes for Zed:

```bash
console frontend:zed:build
```
