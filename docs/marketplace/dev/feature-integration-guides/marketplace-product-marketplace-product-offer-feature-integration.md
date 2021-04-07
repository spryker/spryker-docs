---
title: Marketplace Product + Marketplace Product Offer feature integration
last_updated: Dec 07, 2020
summary: This document describes the process how to integrate the Marketplace Product + Marketplace Product Offer feature into a Spryker project.
---

## Install feature core
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version | Link |
|-|-|-|
| Spryker Core | master | [[PUBLISHED] Glue API: Spryker Core feature integration - ongoing](https://spryker.atlassian.net/l/c/91U2u3Mk)  |
| Marketplace Product | master | [[WIP] Marketplace Product Feature Integration - ongoing](https://spryker.atlassian.net/l/c/4iTsw5Ei)  |
| Product Offer | master | [[WIP] Marketplace Product Offer Feature Integration - ongoing](https://spryker.atlassian.net/wiki/spaces/DOCS/pages/1057325063?atlOrigin=eyJpIjoiYjVlMDFlOTg0N2RiNDY5MWI5NmIzODgzMDdjOGFlMjYiLCJwIjoiYyJ9)   |

### 1) Setup behavior
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

Make sure you can switch between merchant products and product offers on the product detail page.

Make sure that merchant products selected on the product detail page by default.
