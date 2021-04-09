---
title: Marketplace Product + Marketplace Product Offer feature integration
last_updated: Dec 07, 2020
summary: This document describes the process how to integrate the Marketplace Product + Marketplace Product Offer feature into a Spryker project.
---

## Install feature core
Follow the steps below to install the Marketplace Product + Marketplace Product Offer feature core.

### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version | Link |
|-|-|-|
| Spryker Core | master | [Spryker Core feature integration](https://documentation.spryker.com/docs/glue-api-spryker-core-feature-integration)  |
| Marketplace Product | master | [Marketplace Product Feature Integration](/docs/marketplace/dev/feature-integration-guides/marketplace-product-feature-integration.html)  |
| Product Offer | master | [Marketplace Product Offer Feature Integration](/docs/marketplace/dev/feature-integration-guides/product-offer-feature-integration.html)   |

### 1) Set up behavior
Enable the following behaviors by registering the plugins:

| Plugin | Description | Prerequisites | Namespace |
|-|-|-|-|
| MerchantProductProductOfferReferenceStrategyPlugin | Allows to select merchant product by default on PDP. | None | Spryker\Client\MerchantProductOfferStorageExtension\Dependency\Plugin |

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

---
**Verification**

Make sure you can switch between merchant products and product offers on the product detail page.

Make sure that merchant products selected on the product detail page by default.

---
