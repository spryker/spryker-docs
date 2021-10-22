---
title: "Glue API: Marketplace Product Offer Prices feature integration"
last_updated: Nov 10, 2020
description: This document describes the process how to integrate the Marketplace Product Offer Prices Glue API feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Product Offer Prices Glue API feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Product Offer Prices Glue API feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
|-|-|-|
| Marketplace Product Offer Prices | {{page.version}} | [Marketplace Product Offer Prices feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-offer-prices-feature-integration.html) |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/product-offer-prices-rest-api:"^0.4.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| ProductOfferPricesRestApi | spryker/product-offer-prices-rest-api |

{% endinfo_block %}

### 2) Set up database schema and transfer objects

Update the database and generate transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the `src/Orm/Zed/ProductStorage/Persistence/Base/SpyProductConcreteStorage.php` class contains the `syncPublishedMessageForMappings` public function.

Make sure that the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
|-|-|-|-|
| RestProductOfferPriceAttributes | class | Created | src/Generated/Shared/Transfer/RestProductOffersAttributesTransfer |

{% endinfo_block %}

### 3) Enable Product Offer Prices resources and relationships

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| ProductOfferPricesResourceRoutePlugin | Registers the `product-offer-prices` resource. |  | Spryker\Glue\ProductOfferPricesRestApi\Plugin\GlueApplication |
| ProductOfferPriceByProductOfferReferenceResourceRelationshipPlugin | Registers the `product-offer-prices` resource as a relationship to `product-offers`. |  | Spryker\Glue\ProductOfferPricesRestApi\Plugin\GlueApplication |


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

{% info_block warningBox "Verification" %}

Make sure that the `ProductOfferPricesResourceRoutePlugin` plugin is set up by sending the request `GET http://glue.mysprykershop.com/product-offers/{% raw %}{{offerReference}}{% endraw %}/product-offer-prices`.

Make sure that the `ProductOfferPriceByProductOfferReferenceResourceRelationshipPlugin` plugin is set up by sending the request `GET http://glue.mysprykershop.com/product-offers/{% raw %}{{offerReference}}{% endraw %}?include=product-offer-prices`. You should get `product-offers` with all product offer’s `product-offer-prices` as relationships.

{% endinfo_block %}


## Related features

Integrate the following related features:

| FEATURE | REQUIRED FOR THE CURRENT FEATURE | INTEGRATION GUIDE |
|---|---|---|
| Marketplace Product Offer Prices + Wishlist Glue API | &check;  |  [Glue API: Marketplace Product Offer Prices + Wishlist feature integration ](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-offer-prices-wishlist-feature-integration.html) |

