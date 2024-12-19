This document describes how to install the Marketplace Product Offer + Promotions & Discounts feature.

## Prerequisites

Install the required features:

| NAME                      | VERSION          | INSTALLATION GUIDE                                                                                                                                                                                   |
|---------------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Promotions & Discounts    | {{page.version}} | [Install the Promotions & Discounts feature](/docs/pbc/all/discount-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-promotions-and-discounts-feature.html)    |
| Marketplace Product Offer | {{page.version}} | [Install the Marketplace Product Offer feature](/docs/pbc/all/offer-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-feature.html) |
| Spryker Core              | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                          |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/product-offer-discount-connector:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                        | EXPECTED DIRECTORY                      |
|-------------------------------|-----------------------------------------|
| ProductOfferDiscountConnector | vendor/product-offer-discount-connector |

{% endinfo_block %}

## 2) Set up behavior

Set up the following behaviors:

| PLUGIN                                               | SPECIFICATION                                                                        | PREREQUISITES | NAMESPACE                                                               |
|------------------------------------------------------|--------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------------|
| ProductOfferReferenceDecisionRulePlugin              | Checks if an item's product offer reference matches the discount's condition.       |               | Spryker\Zed\ProductOfferDiscountConnector\Communication\Plugin\Discount |
| ProductOfferReferenceDiscountableItemCollectorPlugin | Collects discountable items from the given quote by items' product offer references. |               | Spryker\Zed\ProductOfferDiscountConnector\Communication\Plugin\Discount |

**src/Pyz/Zed/Discount/DiscountDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Discount;

use Spryker\Zed\Discount\DiscountDependencyProvider as SprykerDiscountDependencyProvider;
use Spryker\Zed\ProductOfferDiscountConnector\Communication\Plugin\Discount\ProductOfferReferenceDecisionRulePlugin;
use Spryker\Zed\ProductOfferDiscountConnector\Communication\Plugin\Discount\ProductOfferReferenceDiscountableItemCollectorPlugin;

class DiscountDependencyProvider extends SprykerDiscountDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\DiscountExtension\Dependency\Plugin\DecisionRulePluginInterface>
     */
    protected function getDecisionRulePlugins(): array
    {
        return array_merge(parent::getDecisionRulePlugins(), [
            new ProductOfferReferenceDecisionRulePlugin(),
        ]);
    }

    /**
     * @return list<\Spryker\Zed\DiscountExtension\Dependency\Plugin\DiscountableItemCollectorPluginInterface>
     */
    protected function getCollectorPlugins(): array
    {
        return array_merge(parent::getCollectorPlugins(), [
            new ProductOfferReferenceDiscountableItemCollectorPlugin(),
        ]);
    }
}
```

{% info_block warningBox "Verification" %}

1. [Create a discount](/docs/pbc/all/discount-management/{{site.version}}/base-shop/manage-in-the-back-office/create-discounts.html) and define its condition as a query string with a `product-offer` field.
2. Add a product offer defined in the discount you've created to cart.
  Make sure that the discount has been applied to the cart.

{% endinfo_block %}
