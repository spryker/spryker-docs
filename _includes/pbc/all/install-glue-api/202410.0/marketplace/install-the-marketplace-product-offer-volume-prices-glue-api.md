This document describes how to integrate the Offers Volume Prices Glue API feature into a Spryker project.

## Install feature core

Follow the steps below to install the Offer Volume Prices Glue API feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|-|-| - |
| Marketplace Product Offer Prices | {{page.version}} | [Install the Marketplace Product Offer Prices feature](/docs/pbc/all/price-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-prices-feature.html) |
| Marketplace Product Offer Volume Prices | {{page.version}} | Install the Marketplace Product Offer Volume Prices feature <!---LINK--> |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/price-product-offer-volumes-rest-api:"^1.0.0" --update-with-dependencies
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

Make sure the following changes have been applied in transfer objects:

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
     * @return array<\Spryker\Glue\ProductOfferPricesRestApiExtension\Dependency\Plugin\RestProductOfferPricesAttributesMapperPluginInterface>
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

Make sure that the `ProductOfferPricesRestApiDependencyProvider` plugin is set up by having product offer volumes over sending the request `GET https://glue.mysprykershop.com//concrete-products/{% raw %}{{concreteProductId}}{% endraw %}?include=product-offers,product-offer-prices`.

{% endinfo_block %}
