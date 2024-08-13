


This document describes how to install the Product Labels + Promotions & Discounts feature.

## Install feature core

Follow the steps below to install the feature core.

### Prerequisites

Install the required features:

| NAME                   | VERSION            | INSTALLATION GUIDE                                                                                                                                          |
|------------------------|--------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Promotions & Discounts | {{site.version}}   | [Install the Promotions & Discounts feature](/docs/pbc/all/discount-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-promotions-and-discounts-feature.html) |
| Product Labels         | {{site.version}}   | [Install the Discontinued Products feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-labels-feature.html)                   |
| Spryker Core           | {{site.version}}   | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                       |

### 1) Set up behavior

Set up the following behaviors:

| PLUGIN                                      | SPECIFICATION                                                                      | PREREQUISITES | NAMESPACE                                                                   |
|---------------------------------------------|------------------------------------------------------------------------------------|---------------|-----------------------------------------------------------------------------|
| ProductLabelDiscountableItemCollectorPlugin | Collects the cart items with product labels to which a discount should be applied. | None          | Spryker\Zed\ProductLabelDiscountConnector\Communication\Plugin\Collector    |
| ProductLabelListDecisionRulePlugin          | Defines if a discount can be applied to a cart item with a product label.          | None          | Spryker\Zed\ProductLabelDiscountConnector\Communication\Plugin\DecisionRule |

**src/Pyz/Zed/Discount/DiscountDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Discount;
use Spryker\Zed\Discount\DiscountDependencyProvider as SprykerDiscountDependencyProvider;
use Spryker\Zed\ProductLabelDiscountConnector\Communication\Plugin\DecisionRule\ProductLabelListDecisionRulePlugin;
use Spryker\Zed\ProductLabelDiscountConnector\Communication\Plugin\Collector\ProductLabelDiscountableItemCollectorPlugin;

class DiscountDependencyProvider extends SprykerDiscountDependencyProvider
{
    /**
     * @return \Spryker\Zed\Discount\Dependency\Plugin\DecisionRulePluginInterface[]
     */
    protected function getDecisionRulePlugins()
    {
        return array_merge(parent::getDecisionRulePlugins(), [
            new ProductLabelListDecisionRulePlugin(),
        ]);
    }

    /**
     * @return \Spryker\Zed\Discount\Dependency\Plugin\CollectorPluginInterface[]
     */
    protected function getCollectorPlugins()
    {
        return array_merge(parent::getCollectorPlugins(), [
            new ProductLabelDiscountableItemCollectorPlugin(),
        ]);
    }
}
```

{% info_block warningBox "Verification" %}

Ensure that the plugins work correctly:

1. [Create a discount](/docs/pbc/all/discount-management/{{site.version}}/base-shop/manage-in-the-back-office/create-discounts.html) and define its condition as a query string with a *product-label* field.
2. Add a product with the defined product label to the cart.
3. Verify that the discount is applied to the cart.

{% endinfo_block %}
