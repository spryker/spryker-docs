---
title: Marketplace Product + Quick Add to Cart feature integration
last_updated: May 16, 2022
description: This document describes the process how to integrate the Marketplace Product + Quick Add to Cart feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Product + Quick Add to Cart feature into a Spryker project.

## Install feature frontend

Follow the steps below to install the Marketplace Product + Quick Add to Cart feature frontend.

### Prerequisites

To start feature integration, integrate the required features:

| NAME                | VERSION          | INTEGRATION GUIDE                                                                                                                                           |
|---------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Marketplace Product | {{page.version}} | [Marketplace Product Feature Integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-feature-integration.html)|
| Quick Add to Cart   | {{page.version}} | [Quick Add to Cart feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/quick-add-to-cart-feature-integration.html)              |

### Set up behavior

1. Enable the following behaviors by registering the plugins:

| PLUGIN                                      | SPECIFICATION                                         | PREREQUISITES | NAMESPACE                                                    |
|---------------------------------------------|-------------------------------------------------------|---------------|--------------------------------------------------------------|
| MerchantProductQuickOrderItemExpanderPlugin | Expands provided ItemTransfer with merchant reference.|               | SprykerShop\Yves\MerchantProductWidget\Plugin\QuickOrderPage |

**src/Pyz/Yves/StorageRouter/StorageRouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\QuickOrderPage;

use SprykerShop\Yves\MerchantProductWidget\Plugin\QuickOrderPage\MerchantProductQuickOrderItemExpanderPlugin;
use SprykerShop\Yves\QuickOrderPage\QuickOrderPageDependencyProvider as SprykerQuickOrderPageDependencyProvider;

class QuickOrderPageDependencyProvider extends SprykerQuickOrderPageDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\QuickOrderPageExtension\Dependency\Plugin\QuickOrderItemExpanderPluginInterface>
     */
    protected function getQuickOrderItemTransferExpanderPlugins(): array
    {
        return [
            new MerchantProductQuickOrderItemExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that merchant related products are added to cart with the corresponding merchant in "SoldBy" section.

Make sure that selected merchant reference affects search results while retrieving for product by name or sku.

{% endinfo_block %}
