---
title: Marketplace Merchant + Quick Add to Cart feature integration
last_updated: May 25, 2022
description: This document describes the process how to integrate the Marketplace Merchant + Quick Add to Cart feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Merchant + Quick Add to Cart feature into a Spryker project.

## Install feature frontend

Follow the steps below to install the Marketplace Merchant + Quick Add to Cart feature frontend.

### Prerequisites

To start feature integration, integrate the required features:

| NAME                 | VERSION          | INTEGRATION GUIDE                                                                                                                                            |
|----------------------|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Marketplace Merchant | {{page.version}} | [Marketplace Merchant feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-merchant-feature-integration.html)  |
| Quick Add to Cart    | {{page.version}} | [Quick Add to Cart feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/quick-add-to-cart-feature-integration.html)               |

### Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                             | DESCRIPTION                                           | PREREQUISITES | NAMESPACE                                             |
|------------------------------------|-------------------------------------------------------|---------------|-------------------------------------------------------|
| MerchantQuickOrderItemMapperPlugin | Maps merchant reference to `QuickOrderItem` transfer. |               | SprykerShop\Yves\MerchantWidget\Plugin\QuickOrderPage |

**src/Pyz/Yves/QuickOrderPage/QuickOrderPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\QuickOrderPage;

use SprykerShop\Yves\MerchantWidget\Plugin\QuickOrderPage\MerchantQuickOrderItemMapperPlugin;
use SprykerShop\Yves\QuickOrderPage\QuickOrderPageDependencyProvider as SprykerQuickOrderPageDependencyProvider;

class QuickOrderPageDependencyProvider extends SprykerQuickOrderPageDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\QuickOrderPageExtension\Dependency\Plugin\QuickOrderItemMapperPluginInterface>
     */
    protected function getQuickOrderItemMapperPlugins(): array
    {
        return [
            new MerchantQuickOrderItemMapperPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that selected merchant reference affects search results while retrieving for product by sku on Quick Add To Cart page.

{% endinfo_block %}
