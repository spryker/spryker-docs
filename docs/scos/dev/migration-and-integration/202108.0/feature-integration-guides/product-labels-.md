---
title: Product labels + promotions & discounts feature integration
originalLink: https://documentation.spryker.com/2021080/docs/product-labels-promotions-discounts-feature-integration
redirect_from:
  - /2021080/docs/product-labels-promotions-discounts-feature-integration
  - /2021080/docs/en/product-labels-promotions-discounts-feature-integration
---

## Install Feature Core
Follow the steps below to install the feature core.


### Prerequisites
To start feature integration, overview, and install the necessary features:


| Name | Version |
| --- | --- |
| Promotions & Discounts | 202009.0 |
| Product Labels | 202009.0 |
| Spryker Core | 202009.0 |

### 1) Set up Behavior
Set up the following behavirors:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| ProductLabelCollectorPlugin | Collects the cart items with product labels to which a discount should be applied. | None | Spryker\Zed\ProductLabelDiscountConnector\Communication\Plugin\Collector |
| ProductLabelDecisionRulePlugin | Defines if a discount can be applied to a cart item with a product label. | None | Spryker\Zed\ProductLabelDiscountConnector\Communication\Plugin\DecisionRule |

**src/Pyz/Zed/Discount/DiscountDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Discount;
use Spryker\Zed\Discount\DiscountDependencyProvider as SprykerDiscountDependencyProvider;
use Spryker\Zed\ProductLabelDiscountConnector\Communication\Plugin\DecisionRule\ProductLabelDecisionRulePlugin;
use Spryker\Zed\ProductLabelDiscountConnector\Communication\Plugin\Collector\ProductLabelCollectorPlugin;

class DiscountDependencyProvider extends SprykerDiscountDependencyProvider
{
    /**
     * @return \Spryker\Zed\Discount\Dependency\Plugin\DecisionRulePluginInterface[]
     */
    protected function getDecisionRulePlugins()
    {
        return array_merge(parent::getDecisionRulePlugins(), [
            new ProductLabelDecisionRulePlugin(),
        ]);
    }

    /**
     * @return \Spryker\Zed\Discount\Dependency\Plugin\CollectorPluginInterface[]
     */
    protected function getCollectorPlugins()
    {
        return array_merge(parent::getCollectorPlugins(), [
            new ProductLabelCollectorPlugin(),
        ]);
    }
}
```
{% info_block warningBox "Verification" %}

Ensure that the plugins work correctly:

1. [Create a discount](https://documentation.spryker.com/docs/en/creating-a-cart-rule) and define its condition as a query string with a *product-label* field.
2. Add a product with the defined product label to cart.
3. The discount should be applied to the cart.


{% endinfo_block %}
