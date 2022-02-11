---
title: Product Labels + Promotions and Discounts feature integration
description: This guide provides step-by-step instructions on integrating Product Labels + Promotions & Discounts feature into a Spryker-based project.
last_updated: Sep 21, 2020
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v6/docs/product-labels-promotions-discounts-feature-integration
originalArticleId: da740023-3f68-4292-800c-711585e7cfba
redirect_from:
  - /v6/docs/product-labels-promotions-discounts-feature-integration
  - /v6/docs/en/product-labels-promotions-discounts-feature-integration
related:
  - title: Product labels feature integration
    link: docs/scos/dev/feature-integration-guides/page.version/product-labels-feature-integration.html
  - title: Promotions & Discounts feature integration
    link: docs/scos/dev/feature-integration-guides/page.version/promotions-and-discounts-feature-integration.html
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

1. [Create a discount](/docs/scos/user/back-office-user-guides/{{page.version}}/merchandising/discount/creating-cart-rules.html) and define its condition as a query string with a *product-label* field.
2. Add a product with the defined product label to cart.
3. The discount should be applied to the cart.


{% endinfo_block %}
