This document describes how to install the Category Management + Marketplace Merchant Commission feature.

## Prerequisites

Install the required features:

| NAME                            | VERSION          | INSTALLATION GUIDE                                                                                                                                                                                          |
|---------------------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Category Management             | {{page.version}} | [Install the Category Management feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-category-management-feature.html)        |
| Marketplace Merchant Commission | {{page.version}} | [Install the Marketplace Merchant Commission feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-commission-feature.html) |

## 1) Install the required modules

```bash
composer require spryker/category-merchant-commission-connector:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                              | EXPECTED DIRECTORY                                    |
|-------------------------------------|-------------------------------------------------------|
| CategoryMerchantCommissionConnector | vendor/spryker/category-merchant-commission-connector |

{% endinfo_block %}


## 2) Set up behavior

Set up the following behaviors:

| PLUGIN                                            | SPECIFICATION                                              | PREREQUISITES | NAMESPACE                                                                               |
|---------------------------------------------------|------------------------------------------------------------|---------------|-----------------------------------------------------------------------------------------|
| CategoryMerchantCommissionItemCollectorRulePlugin | Collects the items whose categories match the provided clause. |               | Spryker\Zed\CategoryMerchantCommissionConnector\Communication\Plugin\MerchantCommission |

**src/Pyz/Zed/MerchantCommission/MerchantCommissionDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\MerchantCommission;

use Spryker\Zed\CategoryMerchantCommissionConnector\Communication\Plugin\MerchantCommission\CategoryMerchantCommissionItemCollectorRulePlugin;
use Spryker\Zed\MerchantCommission\MerchantCommissionDependencyProvider as SprykerMerchantCommissionDependencyProvider;

class MerchantCommissionDependencyProvider extends SprykerMerchantCommissionDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\RuleEngineExtension\Communication\Dependency\Plugin\CollectorRulePluginInterface>
     */
    protected function getRuleEngineCollectorRulePlugins(): array
    {
        return [
            new CategoryMerchantCommissionItemCollectorRulePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Import a new merchant commission via data import or GUI import with an item condition defined as a query string with a `category` field. For example, `category = 'cameras-and-camcorders'`.
2. Add a merchant product assigned to the defined category to cart and place the order.

Make sure the following applies:
- The `commission-calculate` OMS event has been triggered.
- In the `spy_sales_merchant_commission` database table, there's a new record with your merchant commission applied to corresponding sales order item.

{% endinfo_block %}
