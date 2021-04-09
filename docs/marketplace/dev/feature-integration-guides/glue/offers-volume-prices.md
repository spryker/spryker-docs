---
title: Offers Volume Prices feature integration
last_updated: Dec 04, 2020
summary: This document describes how to integrate the Offers Volume Prices Glue API feature into a Spryker project.
---

## Install feature core
Follow the steps below to install the Offers Volume Prices Glue API feature core.

### Prerequisites

To start feature integration, overview and install the necessary features:

| Name | Version |
|-|-|
| Marketplace Product Offer Prices | dev-master |
| Marketplace Product Offer Volume Prices | dev-master |

### 1) Install the required modules using Composer
Run the following commands to install the required modules:
```bash
composer require spryker/spryker/price-product-offer-volumes-rest-api:"^0.1.0" --update-with-dependencies
```

---
**Verification**

Make sure that the following modules have been installed:

| Module | Expected Directory |
|-|-|
| PriceProductOfferVolumesRestApi | spryker/price-product-offer-volumes-rest-api |

---

### 2) Set up database and transfer objects
Run the following command to update the database and generate transfer changes:
```bash
console transfer:generate
console propel:install
console transfer:generate
```

---
**Verification**

Make sure that the following changes have been applied in transfer objects:

| Transfer | Type | Event | Path |
|-|-|-|-|
| RestProductOfferPriceAttributes.volumePrices | property | Created | src/Generated/Shared/Transfer/RestProductOffersAttributesTransfer |

---

### 3) Set up behavior
Enable Product Offer Prices resources and relationships
Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
|-|-|-|-|
| RestProductOfferPricesAttributesMapperPlugin | Extends RestProductOfferPricesAttributesTransfer with volume price data | None | Spryker\Glue\PriceProductOfferVolumesRestApi\Plugin |

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

---
**Verification**

Make sure that the `ProductOfferPricesRestApiDependencyProvider` plugin is set up by having product offer volumes over sending the request `GET http://glue.mysprykershop.com//concrete-products/{concreteProductId}?include=product-offers,product-offer-prices`.

---
