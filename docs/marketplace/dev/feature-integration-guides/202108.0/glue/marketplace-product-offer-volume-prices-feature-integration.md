---
title: "Glue API: Marketplace Product Offer Volume Prices feature integration"
last_updated: Dec 04, 2020
description: This document describes how to integrate the Offers Volume Prices Glue API feature into a Spryker project.
template: feature-integration-guide-template
redirect_from:
    - /docs/marketplace/dev/feature-integration-guides/202108.0/glue/marketplace-product-offer-volume-prices.html
---

This document describes how to integrate the Offers Volume Prices Glue API feature into a Spryker project.

## Install feature core

Follow the steps below to install the Offer Volume Prices Glue API feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
|-|-| - |
| Marketplace Product Offer Prices | {{page.version}} | [Marketplace Product Offer Prices feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-offer-prices-feature-integration.html) |
| Marketplace Product Offer Volume Prices | {{page.version}} | Marketplace Product Offer Volume Prices feature integration <!---LINK--> |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/spryker/price-product-offer-volumes-rest-api:"^0.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| PriceProductOfferVolumesRestApi | spryker/price-product-offer-volumes-rest-api |

{% endinfo_block %}

### 2) Set up database and transfer objects

Update the database and generate transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
|-|-|-|-|
| RestProductOfferPriceAttributes.volumePrices | property | Created | src/Generated/Shared/Transfer/RestProductOffersAttributesTransfer |

{% endinfo_block %}

### 3) Enable Product Offer Prices resources and relationships

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| RestProductOfferPricesAttributesMapperPlugin | Extends `RestProductOfferPricesAttributesTransfer` with volume price data. |  | Spryker\Glue\PriceProductOfferVolumesRestApi\Plugin |

**src/Pyz/Glue/ProductOfferPricesRestApi/ProductOfferPricesRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\ProductOfferPricesRestApi;

use Spryker\Glue\PriceProductOfferVolumesRestApi\Plugin\RestProductOfferPricesAttributesMapperPlugin;
use Spryker\Glue\ProductOfferPricesRestApi\ProductOfferPricesRestApiDependencyProvider as SprykerProductPricesRestApiDependencyProvider;

class ProductOfferPricesRestApiDependencyProvider extends SprykerProductPricesRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\ProductOfferPricesRestApiExtension\Dependency\Plugin\RestProductOfferPricesAttributesMapperPluginInterface[]
     */
    protected function getRestProductOfferPricesAttributesMapperPlugins(): array
    {
        return [
            new RestProductOfferPricesAttributesMapperPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that  `ProductOfferPricesRestApiDependencyProvider` plugin is set up by having product offer volumes over sending the request `GET http://glue.mysprykershop.com//concrete-products/{% raw %}{{concreteProductId}}{% endraw %}?include=product-offers,product-offer-prices`.

{% endinfo_block %}
