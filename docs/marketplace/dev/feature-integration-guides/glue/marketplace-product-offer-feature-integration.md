---
title: Marketplace Product Offer feature integration
last_updated: Dec 17, 2020
summary: This document describes the process how to integrate the Marketplace Product Offer Glue API feature into a Spryker project.
---

## Install feature core
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
|-|-|
| Marketplace Product Offer | dev-master |

### 1) Install the required modules using composer
Run the following commands to install the required modules:
```bash
composer require spryker/merchant-product-offers-rest-api:"^0.4.0" --update-with-dependencies
```

---
**Verification**

Make sure that the following modules have been installed:

| Module | Expected Directory |
|-|-|
| MerchantProductOffersRestApi | spryker/merchant-product-offers-rest-api |

---

### 2) Set up transfer objects
Run the following command to generate transfer changes:
```bash
console transfer:generate
```

---
**Verification**

Make sure that the following changes have been applied in transfer objects:

| Transfer | Type | Event | Path |
|-|-|-|-|
| RestProductOffersAttributes | class | Created | src/Generated/Shared/Transfer/RestProductOffersAttributesTransfer |

---

### 3) Set up behavior
#### Enable resources and relationships
Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
|-|-|-|-|
| ProductOffersResourceRoutePlugin | Registers the `product-offers` resource. | None | Spryker\Glue\MerchantProductOffersRestApi\Plugin\GlueApplication |
| ConcreteProductsProductOffersResourceRoutePlugin | Registers the `product-offers` resource with `concrete-products`. | None | Spryker\Glue\MerchantProductOffersRestApi\Plugin\GlueApplication |
| ProductOffersByProductConcreteSkuResourceRelationshipPlugin | Registers the `product-offers` resource as a relationship to `concrete-products`. | None | Spryker\Glue\MerchantProductOffersRestApi\Plugin\GlueApplication |


**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**
```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\MerchantProductOffersRestApi\MerchantProductOffersRestApiConfig;
use Spryker\Glue\MerchantProductOffersRestApi\Plugin\GlueApplication\ConcreteProductsProductOffersResourceRoutePlugin;
use Spryker\Glue\MerchantProductOffersRestApi\Plugin\GlueApplication\ProductOffersByProductConcreteSkuResourceRelationshipPlugin;
use Spryker\Glue\MerchantProductOffersRestApi\Plugin\GlueApplication\ProductOffersResourceRoutePlugin;
use Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication\MerchantByMerchantReferenceResourceRelationshipPlugin;
use Spryker\Glue\ProductsRestApi\ProductsRestApiConfig;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new ProductOffersResourceRoutePlugin(),
            new ConcreteProductsProductOffersResourceRoutePlugin(),
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
            ProductsRestApiConfig::RESOURCE_CONCRETE_PRODUCTS,
            new ProductOffersByProductConcreteSkuResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            MerchantProductOffersRestApiConfig::RESOURCE_PRODUCT_OFFERS,
            new MerchantByMerchantReferenceResourceRelationshipPlugin()
        );

        return $resourceRelationshipCollection;
    }
}
```

---
**Verification**

Make sure that the `ProductOffersResourceRoutePlugin` plugin is set up by sending the request GET `http://glue.mysprykershop.com/product-offers/{{offerReference}}`.

Make sure that the `ConcreteProductsProductOffersResourceRoutePlugin` plugin is set up by sending the request GET `http://glue.mysprykershop.com/concrete-products/{{sku}}/product-offers`.

Make sure that the `ProductOffersByProductConcreteSkuResourceRelationshipPlugin` plugin is set up by sending the request GET `http://glue.mysprykershop.com/concrete-products/{{sku}}?include=product-offers`. You should get `concrete-products` with all product’s `product-offers` as relationships.

Make sure that the `MerchantByMerchantReferenceResourceRelationshipPlugin` plugin is set up by sending the request GET `http://glue.mysprykershop.com/product-offers/{{productOfferReference}}?include=merchants`. The response should include the `merchants` resource along with the `product-offers`.

---
