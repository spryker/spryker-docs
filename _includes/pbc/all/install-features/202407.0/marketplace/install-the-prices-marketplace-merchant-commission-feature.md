This document describes how to install the Prices + Marketplace Merchant Commission feature.

## Install feature core

Follow the steps below to install the feature core.

### Prerequisites

Install the required features:

| NAME                            | VERSION          | INSTALLATION GUIDE                                                                                                                                                                                          |
|---------------------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Marketplace Merchant Commission | {{page.version}} | [Install the Marketplace Merchant Commission feature](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-commission.html) |
| Prices                          | {{site.version}} | [Install the Prices feature](/docs/pbc/all/price-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-prices-feature.html)                                                |

## 1) Install the required modules

```bash
composer require spryker/price-product-merchant-commission-connector:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                                  | EXPECTED DIRECTORY                                   |
|-----------------------------------------|------------------------------------------------------|
| PriceProductMerchantCommissionConnector | vendor/spryker/product-merchant-commission-connector |

{% endinfo_block %}

### 2) Set up behavior

Set up the following behaviors:

| PLUGIN                                                | SPECIFICATION                                                    | PREREQUISITES | NAMESPACE                                                                                   |
|-------------------------------------------------------|------------------------------------------------------------------|---------------|---------------------------------------------------------------------------------------------|
| PriceProductMerchantCommissionItemCollectorRulePlugin | Collects items with a unit price that matches the provided clause. |               | Spryker\Zed\PriceProductMerchantCommissionConnector\Communication\Plugin\MerchantCommission |

**src/Pyz/Zed/MerchantCommission/MerchantCommissionDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\MerchantCommission;

use Spryker\Zed\MerchantCommission\MerchantCommissionDependencyProvider as SprykerMerchantCommissionDependencyProvider;
use Spryker\Zed\PriceProductMerchantCommissionConnector\Communication\Plugin\MerchantCommission\PriceProductMerchantCommissionItemCollectorRulePlugin;

class MerchantCommissionDependencyProvider extends SprykerMerchantCommissionDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\RuleEngineExtension\Communication\Dependency\Plugin\CollectorRulePluginInterface>
     */
    protected function getRuleEngineCollectorRulePlugins(): array
    {
        return [
            new PriceProductMerchantCommissionItemCollectorRulePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Import a new merchant commission via data import or GUI import with item condition defined as a query string with an `item-price` field. For example,  `item-price >= '500'`.
2. Add a merchant product with the corresponding price to cart and place the order.
3. Make sure the following applies:
  * The `commission-calculate` OMS event has been triggered.
  * In the `spy_sales_merchant_commission` database table, a record with the merchant commission applied to corresponding sales order item has been created.


{% endinfo_block %}
