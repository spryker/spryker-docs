This document describes how to install the Merchant + Promotions & Discounts feature.

## Install feature core

Follow the steps below to install the feature core.

### Prerequisites

Install the required features:

| NAME                   | VERSION          | INSTALLATION GUIDE                                                                                                                                                                                |
|------------------------|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Marketplace Merchant   | {{page.version}} | [Install the Marketplace Merchant feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-feature.html)     |
| Promotions & Discounts | {{page.version}} | [Install the Promotions & Discounts feature](/docs/pbc/all/discount-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-promotions-and-discounts-feature.html) |
| Spryker Core           | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                       |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/merchant-discount-connector:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                    | EXPECTED DIRECTORY                         |
|---------------------------|--------------------------------------------|
| MerchantDiscountConnector | vendor/spryker/merchant-discount-connector |

{% endinfo_block %}

### 2) Set up behavior

Set up the following behaviors:

| PLUGIN                                           | SPECIFICATION                                                                            | PREREQUISITES | NAMESPACE                                                           |
|--------------------------------------------------|------------------------------------------------------------------------------------------|---------------|---------------------------------------------------------------------|
| MerchantReferenceDecisionRulePlugin              | Defines if a discount can be applied to a cart item with a merchant reference specified. |               | Spryker\Zed\MerchantDiscountConnector\Communication\Plugin\Discount |
| MerchantReferenceDiscountableItemCollectorPlugin | Collects the cart items with merchant reference to which a discount should be applied.   |               | Spryker\Zed\MerchantDiscountConnector\Communication\Plugin\Discount |

**src/Pyz/Zed/Discount/DiscountDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Discount;

use Spryker\Zed\Discount\DiscountDependencyProvider as SprykerDiscountDependencyProvider;
use Spryker\Zed\MerchantDiscountConnector\Communication\Plugin\Discount\MerchantReferenceDecisionRulePlugin;
use Spryker\Zed\MerchantDiscountConnector\Communication\Plugin\Discount\MerchantReferenceDiscountableItemCollectorPlugin;

class DiscountDependencyProvider extends SprykerDiscountDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\DiscountExtension\Dependency\Plugin\DecisionRulePluginInterface>
     */
    protected function getDecisionRulePlugins(): array
    {
        return array_merge(parent::getDecisionRulePlugins(), [
            new MerchantReferenceDecisionRulePlugin(),
        ]);
    }

    /**
     * @return list<\Spryker\Zed\DiscountExtension\Dependency\Plugin\DiscountableItemCollectorPluginInterface>
     */
    protected function getCollectorPlugins(): array
    {
        return array_merge(parent::getCollectorPlugins(), [
            new MerchantReferenceDiscountableItemCollectorPlugin(),
        ]);
    }
}
```

{% info_block warningBox "Verification" %}

1. [Create a discount](/docs/pbc/all/discount-management/{{site.version}}/base-shop/manage-in-the-back-office/create-discounts.html) and define its condition as a query string with a `merchant-refernce` field.
2. Add a product sold by the defined merchant to the cart.
3. Verify that the discount is applied to the cart.

{% endinfo_block %}
