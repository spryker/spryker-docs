---
title: Marketplace Merchant Portal Product Offer Management + Merchant Portal Sales Management feature integration
last_updated: Sep 13, 2021
description: This integration guide provides steps on how to integrate the Marketplace Merchant Portal Product Offer Management + Merchant Portal Sales Management feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Merchant Portal Product Offer Management + Merchant Portal Sales Management feature into a Spryker project.

## Prerequisites

To start feature integration, integrate the required features:

| NAME  | VERSION | INTEGRATION GUIDE |
| --------------- | --------- | ------------|
| Marketplace Merchant Portal Product Offer Management | {{page.version}} | [Marketplace Merchant Portal Product Offer Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-merchant-portal-product-offer-management-feature-integration.html)
| Marketplace Merchant Portal Sales Management | {{page.version}} | [Marketplace Merchant Portal Sales Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-merchant-portal-sales-management-feature-integration.html)


### 1) Set up behavior

To set up behavior:

1. Enable the following behaviors by registering the plugins:

| PLUGIN  | SPECIFICATION  | PREREQUISITES | NAMESPACE |
| --------------- | ------------ | ----------- | ------------ |
| ProductOfferMerchantOrderItemTableExpanderPlugin | Adds `merchantReference` and `ProductOfferSku` to Sales tables in the `MerchantPortal`. | Marketplace Sales Merchant Portal integrated | Spryker\Zed\ProductOfferMerchantPortalGui\Communication\Plugin\SalesMerchantPortalGui |

**src/Pyz/Zed/SalesMerchantPortalGui/SalesMerchantPortalGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\SalesMerchantPortalGui;

use Spryker\Zed\ProductOfferMerchantPortalGui\Communication\Plugin\SalesMerchantPortalGui\ProductOfferMerchantOrderItemTableExpanderPlugin;
use Spryker\Zed\SalesMerchantPortalGui\SalesMerchantPortalGuiDependencyProvider as SprykerSalesMerchantPortalGuiDependencyProvider;

class SalesMerchantPortalGuiDependencyProvider extends SprykerSalesMerchantPortalGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\SalesMerchantPortalGuiExtension\Dependency\Plugin\MerchantOrderItemTableExpanderPluginInterface[]
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

dd
