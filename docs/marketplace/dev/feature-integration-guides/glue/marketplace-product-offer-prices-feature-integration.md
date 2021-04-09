---
title: Marketplace Product Offer Prices feature integration
last_updated: Nov 10, 2020
summary: This document describes the process how to integrate the Marketplace Product Offer Prices Glue API feature into a Spryker project.
---

## Install feature core

Follow the steps below to install the Marketplace Product Offer Prices Glue API feature core.

### Prerequisites

To start feature integration, overview, and install the necessary features:

| NAME | VERSION |
|-|-|
| Marketplace Product Offer Prices | dev-master |

### 1) Install the required modules using Composer
Run the following commands to install the required modules:

```bash
composer require spryker/spryker/product-offer-prices-rest-api:"^0.3.0" --update-with-dependencies
```

---
**Verification**

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| ProductOfferPricesRestApi | spryker/product-offer-prices-rest-api |

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

Make sure that the `src/Orm/Zed/ProductStorage/Persistence/Base/SpyProductConcreteStorage.php` class contains the `syncPublishedMessageForMappings` public function.

Make sure that the  `src/Orm/Zed/ProductStorage/Persistence/Base/SpyProductConcreteStorage.php` class contains the syncPublishedMessageForMappings public function.

Make sure that the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
|-|-|-|-|
| RestProductOfferPriceAttributes | class | Created | src/Generated/Shared/Transfer/RestProductOffersAttributesTransfer |

---

### 3) Set up behavior
To set up behavior, take the following steps:

#### Enable Product Offer Prices resources and relationships
Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| ProductOfferPricesResourceRoutePlugin | Registers the `product-offer-prices` resource. | None | Spryker\Glue\ProductOfferPricesRestApi\Plugin\GlueApplication |
| ProductOfferPriceByProductOfferReferenceResourceRelationshipPlugin | Registers the `product-offer-prices` resource as a relationship to `product-offers`. | None | Spryker\Glue\ProductOfferPricesRestApi\Plugin\GlueApplication |


<details><summary markdown='span'>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\MerchantProductOffersRestApi\MerchantProductOffersRestApiConfig;
use Spryker\Glue\ProductOfferPricesRestApi\Plugin\GlueApplication\ProductOfferPricesResourceRoutePlugin;
use Spryker\Glue\ProductOfferPricesRestApi\Plugin\GlueApplication\ProductOfferPriceByProductOfferReferenceResourceRelationshipPlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new ProductOfferPricesResourceRoutePlugin(),
        ];
    }

    /**
     * @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
     *
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
     */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            MerchantProductOffersRestApiConfig::RESOURCE_PRODUCT_OFFERS,
            new ProductOfferPriceByProductOfferReferenceResourceRelationshipPlugin()
        );

        return $resourceRelationshipCollection;
    }
}
```

</details>

---
**Verification**

Make sure that the `ProductOfferPricesResourceRoutePlugin` plugin is set up by sending the request `GET http://glue.mysprykershop.com/product-offers/{{offerReference}}/product-offer-prices`.

Make sure that the `ProductOfferPriceByProductOfferReferenceResourceRelationshipPlugin` plugin is set up by sending the request `GET http://glue.mysprykershop.com/product-offers/{{offerReference}}?include=product-offer-pricess`. You should get `product-offers` with all product offer’s `product-offer-prices` as relationships.

---
