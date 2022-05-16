---
title: Marketplace Product Offer + Catalog feature integration
description: This document describes the process how to integrate the Marketplace Product Offer + Catalog feature into a Spryker project.
template: feature-integration-guide-template
last_updated: May 16, 2022
---

This document describes how to integrate the Marketplace Product Offer + Catalog feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Product Offer + Catalog feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME                      | VERSION          | INTEGRATION GUIDE                                                                                                                                                     |
|---------------------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core              | {{page.version}} | [Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/spryker-core-feature-integration.html)                                  |
| Marketplace Product Offer | {{page.version}} | [Marketplace Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-offer-feature-integration.html) |
| Catalog                   | {{page.version}} | [Catalog feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/catalog-feature-integration.html)                                            |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/product-offer: "^0.6.1" --update-with-dependencies
composer require spryker-feature/catalog --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE            | EXPECTED DIRECTORY         |
|-------------------|----------------------------|
| CheckoutExtension | spryker/checkout-extension |
| ProductOffer      | spryker/product-offer      |
| Catalog           | vendor/spryker/catalog     |

{% endinfo_block %}

### 4) Set up behavior

To set up behavior:

1. Enable the following behaviors by registering the plugins:

| PLUGIN                                 | SPECIFICATION                                              | PREREQUISITES | NAMESPACE                                               |
|----------------------------------------|------------------------------------------------------------|---------------|---------------------------------------------------------|
| MerchantReferenceQueryExpanderPlugin   | Adds filter by the merchant reference to the search query. |               | Spryker\Client\MerchantProductOfferSearch\Plugin\Search |

**src/Pyz/Client/Catalog/CatalogDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Catalog;

use Spryker\Client\Catalog\CatalogDependencyProvider as SprykerCatalogDependencyProvider;
use Spryker\Client\MerchantProductOfferSearch\Plugin\Search\MerchantReferenceQueryExpanderPlugin;

class CatalogDependencyProvider extends SprykerCatalogDependencyProvider
{
    /**
     * @return \Spryker\Client\Search\Dependency\Plugin\QueryExpanderPluginInterface[]|\Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface[]
     */
    protected function createCatalogSearchQueryExpanderPlugins()
    {
        return [
            new MerchantReferenceQueryExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Client\Search\Dependency\Plugin\QueryExpanderPluginInterface[]|\Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface[]
     */
    protected function createSuggestionQueryExpanderPlugins()
    {
        return [
            new MerchantReferenceQueryExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure the Merchant column is in the Product Offers list in `ProductOfferGui`.

{% endinfo_block %}

## Related features

| FEATURE                   | REQUIRED FOR THE CURRENT FEATURE | INTEGRATION GUIDE                                                                                                                                      |
|---------------------------| -------------------------------- |--------------------------------------------------------------------------------------------------------------------------------------------------------|
| Marketplace Product Offer | | [Marketplace Product Offer](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-offer-feature-integration.html) |
| Catalog                   | | [Catalog](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/catalog-feature-integration.html)                                     |

