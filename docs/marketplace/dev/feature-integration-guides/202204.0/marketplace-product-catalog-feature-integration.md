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

| NAME                | VERSION          | INTEGRATION GUIDE                                                                                                                                           |
|---------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Marketplace Product | {{page.version}} | [Marketplace Product Feature Integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-feature-integration.html)|
| Catalog             | {{page.version}} | Catalog feature integration                              |

### Set up behavior

1. Enable the following behaviors by registering the plugins:

| PLUGIN                                | SPECIFICATION                               | PREREQUISITES | NAMESPACE                                          |
|---------------------------------------|---------------------------------------------|---------------|----------------------------------------------------|
| MerchantReferenceQueryExpanderPlugin  | Adds filter by merchant reference to query. |               | Spryker\Client\MerchantProductSearch\Plugin\Search |


**src/Pyz/Client/Catalog/CatalogDependencyProvider.php**
```php
<?php

namespace Pyz\Client\Catalog;

use Spryker\Client\Catalog\CatalogDependencyProvider as SprykerCatalogDependencyProvider;
use Spryker\Client\MerchantProductSearch\Plugin\Search\MerchantReferenceQueryExpanderPlugin;

class CatalogDependencyProvider extends SprykerCatalogDependencyProvider
{
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

Make sure you can filter concrete products by merchant reference while searching by full-text.

{% endinfo_block %}
