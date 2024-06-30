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
| PriceProductMerchantCommissionItemCollectorRulePlugin | Collects items with unit price that matches the provided clause. |               | Spryker\Zed\PriceProductMerchantCommissionConnector\Communication\Plugin\MerchantCommission |

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

Ensure that the plugins work correctly:

1. Import a new merchant commission via data import or GUI import with defined item condition as a query string with an *item-price* field (e.g. "item-price >= '500'").
2. Add a merchant product with corresponding price to the cart and complete the order process.
3. Make sure that OMS event `commission-calculate` was triggered.
4. In database navigate to `spy_sales_merchant_commission` table and make sure there's a new record with your merchant commission applied to corresponding sales order item.

{% endinfo_block %}

