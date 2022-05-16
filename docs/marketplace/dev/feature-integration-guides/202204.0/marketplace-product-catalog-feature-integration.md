---
title: Marketplace Product + Catalog feature integration
description: This document describes the process how to integrate the Marketplace Product + Catalog feature into a Spryker project.
template: feature-integration-guide-template
last_updated: May 16, 2022
---

This document describes how to integrate the Marketplace Product + Catalog feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Product + Catalog feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME                 | VERSION          | INTEGRATION GUIDE                                                                                                                                           |
|----------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core         | {{page.version}} | [Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/spryker-core-feature-integration.html)                        |
| Marketplace Merchant | {{page.version}} | [Marketplace Merchant feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-merchant-feature-integration.html) |
| Product              | {{page.version}} | [Product feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/product-feature-integration.html)                                  |
| Catalog              | {{page.version}} | [Catalog feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/catalog-feature-integration.html)                                  |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker-feature/marketplace-product:"{{page.version}}" --update-with-dependencies
composer require spryker-feature/catalog --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE          | EXPECTED DIRECTORY              |
|-----------------|---------------------------------|
| MerchantProduct | vendor/spryker/merchant-product |
| Catalog         | vendor/spryker/catalog          |

{% endinfo_block %}

### 4) Set up behavior

To set up behavior:

1. Enable the following behaviors by registering the plugins:

| PLUGIN                                | SPECIFICATION                               | PREREQUISITES | NAMESPACE                                               |
|---------------------------------------|---------------------------------------------|---------------|---------------------------------------------------------|
| MerchantReferenceQueryExpanderPlugin  | Adds filter by merchant reference to query. |               | Spryker\Client\MerchantProductOfferSearch\Plugin\Search |


**src/Pyz/Client/Catalog/CatalogDependencyProvider.php**
```php
<?php

namespace Pyz\Client\Catalog;

use Spryker\Client\MerchantProductOfferSearch\Plugin\Search\MerchantReferenceQueryExpanderPlugin;

class CatalogDependencyProvider extends SprykerCatalogDependencyProvider
{
    /**
     * @return array<\Spryker\Client\Search\Dependency\Plugin\QueryExpanderPluginInterface>|array<\Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface>
     */
    protected function createCatalogSearchQueryExpanderPlugins(): array
    {
        return [
            new MerchantReferenceQueryExpanderPlugin(),
        ];
    }
   
    /**
     * @return array<\Spryker\Client\Search\Dependency\Plugin\QueryExpanderPluginInterface>|array<\Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface>
     */
    protected function createSuggestionQueryExpanderPlugins(): array
    {
        return [
            new MerchantReferenceQueryExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Client\Search\Dependency\Plugin\QueryExpanderPluginInterface>|array<\Spryker\Client\SearchExtension\Dependency\Plugin\QueryExpanderPluginInterface>
     */
    protected function getProductConcreteCatalogSearchQueryExpanderPlugins(): array
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

## Related features

| FEATURE             | REQUIRED FOR THE CURRENT FEATURE | INTEGRATION GUIDE                                                                                                                                    |
|---------------------| -------------------------------- |------------------------------------------------------------------------------------------------------------------------------------------------------|
| Marketplace Product | | [Marketplace Product](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-feature-integration.html) |
| Catalog             | | [Catalog](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/catalog-feature-integration.html)                                   |

