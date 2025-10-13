This document describes how to install the Product + Marketplace Merchant Commission feature.

## Prerequisites

Install the required features:

| NAME                            | VERSION          | INSTALLATION GUIDE                                                                                                                                                                                          |
|---------------------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Marketplace Merchant Commission | {{page.version}} | [Install the Marketplace Merchant Commission feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-commission-feature.html) |
| Product                         | {{page.version}} | [Install the Product feature](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-product-feature.html)                                |

## 1) Install the required modules

```bash
composer require spryker/product-merchant-commission-connector:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                             | EXPECTED DIRECTORY                                   |
|------------------------------------|------------------------------------------------------|
| ProductMerchantCommissionConnector | vendor/spryker/product-merchant-commission-connector |

{% endinfo_block %}


## 2) Set up behavior

Set up the following behaviors:

| PLUGIN                                                    | SPECIFICATION                                                  | PREREQUISITES | NAMESPACE                                                                              |
|-----------------------------------------------------------|----------------------------------------------------------------|---------------|----------------------------------------------------------------------------------------|
| ProductAttributeMerchantCommissionItemCollectorRulePlugin | Collects items with attributes that match the provided clause. |               | Spryker\Zed\ProductMerchantCommissionConnector\Communication\Plugin\MerchantCommission |

**src/Pyz/Zed/MerchantCommission/MerchantCommissionDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\MerchantCommission;

use Spryker\Zed\MerchantCommission\MerchantCommissionDependencyProvider as SprykerMerchantCommissionDependencyProvider;
use Spryker\Zed\ProductMerchantCommissionConnector\Communication\Plugin\MerchantCommission\ProductAttributeMerchantCommissionItemCollectorRulePlugin;

class MerchantCommissionDependencyProvider extends SprykerMerchantCommissionDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\RuleEngineExtension\Communication\Dependency\Plugin\CollectorRulePluginInterface>
     */
    protected function getRuleEngineCollectorRulePlugins(): array
    {
        return [
            new ProductAttributeMerchantCommissionItemCollectorRulePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Import a new merchant commission via data import or GUI import with an item condition defined as a query string with an *attribute* field. For example, `attribute.brand IS IN 'samsung;sony'`.
2. Add a merchant product with the corresponding product attribute to the cart and place the order.
Make sure the following applies:
- The `commission-calculate` OMS event has been triggered.
- In the `spy_sales_merchant_commission` database table, a record with the merchant commission applied to corresponding sales order item has been added.

{% endinfo_block %}
