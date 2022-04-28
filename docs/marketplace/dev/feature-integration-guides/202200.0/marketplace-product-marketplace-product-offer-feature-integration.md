---
title: Marketplace Product + Marketplace Product Offer feature integration
last_updated: Jun 25, 2021
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
| Spryker Core | {{page.version}} | [Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/spryker-core-feature-integration.html)  |
| Marketplace Product | {{page.version}} | [Marketplace Product feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-feature-integration.html)  |
| Product Offer | {{page.version}} | [Marketplace Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-offer-feature-integration.html)   |

### Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantProductProductOfferReferenceStrategyPlugin | Allows selecting a merchant product by default on PDP. |  | Spryker\Client\MerchantProductStorage\Plugin\ProductOfferStorage |

{% info_block warningBox "Note" %}

The order is important. Plugin has to be registered after `ProductOfferReferenceStrategyPlugin`.

{% endinfo_block %}

**src/Pyz/Client/ProductOfferStorage/ProductOfferStorageDependencyProvider.php**

```php
<?php

namespace Pyz\Client\ProductOfferStorage;

use Spryker\Client\MerchantProductStorage\Plugin\ProductOfferStorage\MerchantProductProductOfferReferenceStrategyPlugin;
use Spryker\Client\ProductOfferStorage\ProductOfferStorageDependencyProvider as SprykerProductOfferStorageDependencyProvider;

class ProductOfferStorageDependencyProvider extends SprykerProductOfferStorageDependencyProvider
{
    /**
     * @return array<\Spryker\Client\ProductOfferStorageExtension\Dependency\Plugin\ProductOfferReferenceStrategyPluginInterface>
     */
    protected function getProductOfferReferenceStrategyPlugins(): array
    {
        return [
            new MerchantProductProductOfferReferenceStrategyPlugin(),
        ];
    }
}

```

{% info_block warningBox "Verification" %}

Make sure you can switch between merchant products and product offers on the **Product Details** page.

Make sure that merchant products selected on the **Product Details** page by default.

{% endinfo_block %}
