---
title: "Glue API: Marketplace Product Offer feature integration"
last_updated: Sep 9, 2021
description: This document describes the process how to integrate the Marketplace Product Offer Glue API feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Product Offer Glue API feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Product Offer Glue API feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
|-|-|-|
| Marketplace Product Offer | {{page.version}} |[Marketplace Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-offer-feature-integration.html) |

### 1) Install the required modules using Composer

Install the required modules:
```bash
composer require spryker/merchant-product-offers-rest-api:"^1.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| MerchantProductOffersRestApi | spryker/merchant-product-offers-rest-api |

{% endinfo_block %}

### 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
|-|-|-|-|
| RestProductOffersAttributes | class | Created | src/Generated/Shared/Transfer/RestProductOffersAttributesTransfer |
| PersistentCartChange | class | Created | src/Generated/Shared/Transfer/PersistentCartChangeTransfer |
| RestItemsAttributes.productOfferReference | property | Created | src/Generated/Shared/Transfer/RestItemsAttributesTransfer |
| RestItemsAttributes.merchantReference | property | Created | src/Generated/Shared/Transfer/RestItemsAttributesTransfer |
| CartItemRequest.productOfferReference | property | Created | src/Generated/Shared/Transfer/CartItemRequestTransfer |
| CartItemRequest.merchantReference | property | Created | src/Generated/Shared/Transfer/CartItemRequestTransfer |
| RestCartItemsAttributes.productOfferReference | property | Created | src/Generated/Shared/Transfer/RestCartItemsAttributesTransfer |

{% endinfo_block %}

### 3) Set up behavior

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| ProductOffersResourceRoutePlugin | Registers the `product-offers` resource. |  | Spryker\Glue\MerchantProductOffersRestApi\Plugin\GlueApplication |
| ConcreteProductsProductOffersResourceRoutePlugin | Registers the `product-offers` resource with `concrete-products`. |  | Spryker\Glue\MerchantProductOffersRestApi\Plugin\GlueApplication |
| ProductOffersByProductConcreteSkuResourceRelationshipPlugin | Registers the `product-offers` resource as a relationship to `concrete-products`. |  | Spryker\Glue\MerchantProductOffersRestApi\Plugin\GlueApplication |
| MerchantByMerchantReferenceResourceRelationshipPlugin | Adds `merchants` resources as relationship by merchant references in the attributes. |  | Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication |

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

{% info_block warningBox "Verification" %}

Make sure that `ProductOffersResourceRoutePlugin` is set up by sending the request `GET http://glue.mysprykershop.com/product-offers/{% raw %}{{offerReference}}{% endraw %}`.

Make sure that `ConcreteProductsProductOffersResourceRoutePlugin` is set up by sending the request `GET http://glue.mysprykershop.com/concrete-products/{% raw %}{{sku}}{% endraw %}/product-offers`.

Make sure that `ProductOffersByProductConcreteSkuResourceRelationshipPlugin` is set up by sending the request `GET http://glue.mysprykershop.com/concrete-products/{% raw %}{{sku}}{% endraw %}?include=product-offers`. You should get `concrete-products` with all product’s `product-offers` as relationships.

Make sure that `MerchantByMerchantReferenceResourceRelationshipPlugin` is set up by sending the request `GET http://glue.mysprykershop.com/product-offers/{% raw %}{{sku}}{% endraw %}?include=merchants`. The response should include the `merchants` resource along with `product-offers`.

{% endinfo_block %}

## Related features

| FEATURE | REQUIRED FOR THE CURRENT FEATURE | INTEGRATION GUIDE |
| -------------- | -------------------------------- | ----------------- |
| Marketplace Product Offer + Prices API | | [Glue API: Marketplace Product Offer + Prices feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-offer-prices-feature-integration.html) |
| Marketplace Product Offer + Volume Prices API | | [Glue API: Marketplace Product Offer + Volume Prices feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-offer-volume-prices-feature-integration.html) |
| Marketplace Product Offer + Wishlist API | | [Glue API: Marketplace Product Offer + Wishlist feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-offer-wishlist-feature-integration.html) |
| Marketplace Product Offer + Cart API | | [Glue API: Marketplace Product Offer + Cart feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-offer-cart-feature-integration.html) |
