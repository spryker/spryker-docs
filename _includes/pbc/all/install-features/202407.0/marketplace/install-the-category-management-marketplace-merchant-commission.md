This document describes how to install the Category Management + Marketplace Merchant Commission feature.

## Install feature core

Follow the steps below to install the feature core.

### Prerequisites

Install the required features:

| NAME                            | VERSION          | INSTALLATION GUIDE                                                                                                                                                                                          |
|---------------------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Category Management             | {{page.version}} | [Install the Category Management feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-category-management-feature.html)        |
| Marketplace Merchant Commission | {{page.version}} | [Install the Marketplace Merchant Commission feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-commission.html) |

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


### 2) Set up behavior

Set up the following behaviors:

| PLUGIN                                            | SPECIFICATION                                              | PREREQUISITES | NAMESPACE                                                                               |
|---------------------------------------------------|------------------------------------------------------------|---------------|-----------------------------------------------------------------------------------------|
| CategoryMerchantCommissionItemCollectorRulePlugin | Collects items which categories match the provided clause. |               | Spryker\Zed\CategoryMerchantCommissionConnector\Communication\Plugin\MerchantCommission |

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

Ensure that the plugins work correctly:

1. Import a new merchant commission via data import or GUI import with defined item condition as a query string with a *category* field (e.g. "category = 'cameras-and-camcorders'").
2. Add a merchant product assigned to the defined category to the cart and complete the order process.
3. Make sure that OMS event `commission-calculate` was triggered.
4. In database navigate to `spy_sales_merchant_commission` table and make sure there's a new record with your merchant commission applied to corresponding sales order item.

{% endinfo_block %}

