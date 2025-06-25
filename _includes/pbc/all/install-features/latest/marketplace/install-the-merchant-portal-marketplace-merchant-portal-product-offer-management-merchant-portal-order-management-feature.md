

This document describes how to install the Merchant Portal - Marketplace Merchant Portal Product Offer Management + Merchant Portal Order Management feature.

## Prerequisites

To start feature integration, install the required features:

| NAME  | VERSION | INSTALLATION GUIDE |
| --------------- | --------- | ------------|
| Marketplace Merchant Portal Product Offer Management | 202507.0 | [Install the Marketplace Merchant Portal Product Offer Management feature](/docs/pbc/all/offer-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-product-offer-management-feature.html) |
| Merchant Portal - Marketplace Order Management | 202507.0 | [Install the Marketplace Merchant Portal Order Management feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-merchant-portal-marketplace-order-management-feature.html) |


### 1) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN  | SPECIFICATION  | PREREQUISITES | NAMESPACE |
| --------------- | ------------ | ----------- | ------------ |
| ProductOfferMerchantOrderItemTableExpanderPlugin | Expands MerchantOrderItemTable with Merchant SKU and Product offer reference columns configuration. |  | Spryker\Zed\ProductOfferMerchantPortalGui\Communication\Plugin\SalesMerchantPortalGui |

**src/Pyz/Zed/SalesMerchantPortalGui/SalesMerchantPortalGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\SalesMerchantPortalGui;

use Spryker\Zed\ProductOfferMerchantPortalGui\Communication\Plugin\SalesMerchantPortalGui\ProductOfferMerchantOrderItemTableExpanderPlugin;
use Spryker\Zed\SalesMerchantPortalGui\SalesMerchantPortalGuiDependencyProvider as SprykerSalesMerchantPortalGuiDependencyProvider;

class SalesMerchantPortalGuiDependencyProvider extends SprykerSalesMerchantPortalGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SalesMerchantPortalGuiExtension\Dependency\Plugin\MerchantOrderItemTableExpanderPluginInterface>
     */
    protected function getMerchantOrderItemTableExpanderPlugins(): array
    {
        return [
            new ProductOfferMerchantOrderItemTableExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the `ProductOfferMerchantOrderItemTableExpanderPlugin` is set up by opening `http://mp.mysprykershop.com/sales-merchant-portal-gui/orders`. Click on any of the orders and check that the *Merchant Reference* and *Product Offer SKU* are present.

{% endinfo_block %}
