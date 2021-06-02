---
title: Marketplace Product + Marketplace Product Offer feature integration
last_updated: Dec 07, 2020
description: This document describes the process how to integrate the Marketplace Product + Marketplace Product Offer feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Product + Marketplace Product Offer feature into a Spryker project.

## Install feature core
Follow the steps below to install the Marketplace Product + Marketplace Product Offer feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
|-|-|-|
| Spryker Core | master | [Spryker Core feature integration](https://documentation.spryker.com/docs/spryker-core-feature-integration)  |
| Marketplace Product | master | [Marketplace Product feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-product-feature-integration.html)  |
| Product Offer | master | [Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/product-offer-feature-integration.html)   |

### 1) Set up behavior
Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantProductProductOfferReferenceStrategyPlugin | Allows selecting merchant product by default on PDP. |  | Spryker\Client\MerchantProductOfferStorageExtension\Dependency\Plugin |

**src/Pyz/Client/MerchantProductOfferStorage/MerchantProductOfferStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\MerchantProductOfferStorage;

use Spryker\Client\MerchantProductOfferStorage\MerchantProductOfferStorageDependencyProvider as SprykerMerchantProductOfferStorageDependencyProvider;
use Spryker\Client\MerchantProductOfferStorageExtension\Dependency\Plugin\ProductOfferStorageCollectionSorterPluginInterface;
use Spryker\Client\MerchantProductStorage\Plugin\MerchantProductOfferStorage\MerchantProductProductOfferReferenceStrategyPlugin;

class MerchantProductOfferStorageDependencyProvider extends SprykerMerchantProductOfferStorageDependencyProvider
{
    /**
     * @return \Spryker\Client\MerchantProductOfferStorageExtension\Dependency\Plugin\ProductOfferReferenceStrategyPluginInterface[]
     */
    protected function getProductOfferReferenceStrategyPlugins(): array
    {
        return [
            new DefaultProductOfferReferenceStrategyPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure you can switch between merchant products and product offers on the Product Details page.

Make sure that merchant products selected on the Product Details page by default.

{% endinfo_block %}
