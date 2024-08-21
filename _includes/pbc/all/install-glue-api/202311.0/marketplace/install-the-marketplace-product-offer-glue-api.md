This document describes how to integrate the Marketplace Product Offer Glue API feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Product Offer Glue API feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|-|-|-|
| Marketplace Product Offer | {{page.version}} |[Install the Marketplace Product Offer feature](/docs/pbc/all/offer-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-feature.html) |

### 1) Install the required modules

Install the required modules using Composer:
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

Make sure the following changes have been applied in transfer objects:

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
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface>
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

Make sure that `ProductOffersResourceRoutePlugin` is set up by sending the request `GET https://glue.mysprykershop.com/product-offers/{% raw %}{{offerReference}}{% endraw %}`.

Make sure that `ConcreteProductsProductOffersResourceRoutePlugin` is set up by sending the request `GET https://glue.mysprykershop.com/concrete-products/{% raw %}{{sku}}{% endraw %}/product-offers`.

Make sure that `ProductOffersByProductConcreteSkuResourceRelationshipPlugin` is set up by sending the request `GET https://glue.mysprykershop.com/concrete-products/{% raw %}{{sku}}{% endraw %}?include=product-offers`. You should get `concrete-products` with all product’s `product-offers` as relationships.

Make sure that `MerchantByMerchantReferenceResourceRelationshipPlugin` is set up by sending the request `GET https://glue.mysprykershop.com/product-offers/{% raw %}{{sku}}{% endraw %}?include=merchants`. The response should include the `merchants` resource along with `product-offers`.

{% endinfo_block %}

## Install related features

| FEATURE | REQUIRED FOR THE CURRENT FEATURE | INSTALLATION GUIDE |
| -------------- | -------------------------------- | ----------------- |
| Marketplace Product Offer + Prices API | | [Install the Marketplace Product Offer + Prices Glue API](/docs/pbc/all/price-management/{{page.version}}/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-offer-prices-glue-api.html) |
| Marketplace Product Offer + Volume Prices API | | [Install the Marketplace Product Offer + Volume Prices Glue API](/docs/pbc/all/price-management/{{page.version}}/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-offer-volume-prices-glue-api.html) |
| Marketplace Product Offer + Wishlist API | | [Install the Marketplace Product Offer + Wishlist Glue API](/docs/pbc/all/offer-management/{{page.version}}/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-offer-wishlist-glue-api.html) |
| Marketplace Product Offer + Cart API | | [Install the Marketplace Product Offer + Cart Glue API](/docs/pbc/all/offer-management/{{page.version}}/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-offer-cart-glue-api.html) |
