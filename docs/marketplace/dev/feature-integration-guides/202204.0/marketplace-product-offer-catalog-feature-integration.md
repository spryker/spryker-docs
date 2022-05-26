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
| Marketplace Product Offer | {{page.version}} | [Marketplace Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-offer-feature-integration.html) |
| Catalog                   | {{page.version}} | Catalog feature integration                                          |

### Set up behavior

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

Make sure you can filter product offers by merchant reference while retrieving them from the storage.

{% endinfo_block %}
