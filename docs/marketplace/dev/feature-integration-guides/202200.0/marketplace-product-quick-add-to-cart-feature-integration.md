---
title: Marketplace Product + quick add to Cart feature integration
last_updated: Jul 28, 2021
Description: This document describes the process how to integrate the Marketplace Product feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Product + quick add to Cart feature integration feature into a Spryker project.


## Install feature core

Follow the steps below to install the Marketplace Product Offer + Cart feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE        |
| --------------- | -------- | ------------------ |
| Spryker Core         | {{page.version}} | [Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/spryker-core-feature-integration.html) |
| Marketplace Merchant | {{page.version}} | [Marketplace Merchant feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-merchant-feature-integration.html) |
| Product   | {{page.version}} | [Product feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/product-feature-integration.html) |

### 1) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                       | DESCRIPTION                                                                 | PREREQUISITES | NAMESPACE                                                                     |
|----------------------------------------------|-----------------------------------------------------------------------------|---------------|-------------------------------------------------------------------------------|
| MerchantProductQuickOrderItemExpanderPlugin  | Expands provided ItemTransfer with additional data.                                                                    |                                       | SprykerShop\Yves\MerchantProductWidget\Plugin\QuickOrderPage                     |

**src/Pyz/Yves/QuickOrderPage/QuickOrderPageDependencyProvider.php**
```php
<?php

namespace Pyz\Yves\QuickOrderPage;

use ...

class QuickOrderPageDependencyProvider extends SprykerQuickOrderPageDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\QuickOrderPageExtension\Dependency\Plugin\QuickOrderItemExpanderPluginInterface>
     */
    protected function getQuickOrderItemTransferExpanderPlugins(): array
    {
        return [
            new QuickOrderItemDefaultPackagingUnitExpanderPlugin(),
            new MerchantProductQuickOrderItemExpanderPlugin(),
            new MerchantProductOfferQuickOrderItemExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that correct product offer is added to cart with Quick Add To Cart option.

{% endinfo_block %}
