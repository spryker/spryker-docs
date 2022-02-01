---
title: Product labels + Promotions and Discounts feature integration
description: This guide provides step-by-step instructions on integrating Product Labels + Promotions & Discounts feature into a Spryker-based project.
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/product-labels-promotions-discounts-feature-integration
originalArticleId: b1e08ad1-ac8b-4986-ab62-1d99816fe36f
redirect_from:
  - /2021080/docs/product-labels-promotions-discounts-feature-integration
  - /2021080/docs/en/product-labels-promotions-discounts-feature-integration
  - /docs/product-labels-promotions-discounts-feature-integration
  - /docs/en/product-labels-promotions-discounts-feature-integration
related:
  - title: Product labels feature integration
    link: docs/scos/dev/feature-integration-guides/page.version/product-labels-feature-integration.html
  - title: Promotions & Discounts feature integration
    link: docs/scos/dev/feature-integration-guides/page.version/promotions-and-discounts-feature-integration.html
---

## Install feature core

Follow the steps below to install the feature core.

### Prerequisites

To start feature integration, overview, and install the necessary features:


| NAME | VERSION |
| --- | --- |
| Promotions & Discounts | {{page.version}} |
| Product Labels | {{page.version}} |
| Spryker Core | {{page.version}} |

### 1) Set up behavior

Set up the following behavirors:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
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
