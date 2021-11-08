---
title: "Glue API: Marketplace Inventory Management feature integration"
last_updated: Dec 16, 2020
description: This document describes the process how to integrate the Marketplace Inventory Management Glue API feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Inventory Management Glue API feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Inventory Management Glue API feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
|-|-|-|
| Spryker Core | {{page.version}} | [Glue API: Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-spryker-core-feature-integration.html)  |
| Marketplace Inventory Management | {{page.version}} | [Marketplace Inventory Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-inventory-management-feature-integration.html)  |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/product-offer-availabilities-rest-api:"^0.4.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| ProductOfferAvailabilitiesRestApi | vendor/spryker/product-offer-availabilities-rest-api |

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
| RestProductOfferAvailabilitiesAttributes | object | Created | src/Generated/Shared/Transfer/RestProductOfferAvailabilitiesAttributesTransfer |

{% endinfo_block %}

### 3) Enable resources and relationships

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| ProductOfferAvailabilitiesResourceRoutePlugin | Registers the `product-offer-availabilities` resource. |  | Spryker\Glue\ProductOfferAvailabilitiesRestApi\Plugin\GlueApplication |
| ProductOfferAvailabilitiesByProductOfferReferenceResourceRelationshipPlugin | Adds the product-offer-availabilities resource as a relationship of the product-offers resource. |  | Spryker\Glue\ProductOfferAvailabilitiesRestApi\Plugin\GlueApplication |

<details><summary markdown='span'>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\MerchantProductOffersRestApi\MerchantProductOffersRestApiConfig;
use Spryker\Glue\ProductOfferAvailabilitiesRestApi\Plugin\GlueApplication\ProductOfferAvailabilitiesByProductOfferReferenceResourceRelationshipPlugin;
use Spryker\Glue\ProductOfferAvailabilitiesRestApi\Plugin\GlueApplication\ProductOfferAvailabilitiesResourceRoutePlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new ProductOfferAvailabilitiesResourceRoutePlugin(),
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
            new ProductOfferAvailabilitiesByProductOfferReferenceResourceRelationshipPlugin()
        );

        return $resourceRelationshipCollection;
    }
}
```

</details>

{% info_block warningBox "Verification" %}

Make sure that the `ProductOfferAvailabilitiesResourceRoutePlugin` plugin is set up by sending the request `GET http://glue.mysprykershop.com/product-offers/{% raw %}{{productOfferReference}}{% endraw %}/product-offer-availabilities`.

Make sure that `ProductOfferAvailabilitiesByProductOfferReferenceResourceRelationshipPlugin` is set up by sending the request `GET http://glue.mysprykershop.com{% raw %}{{url}}{% endraw %}/product-offers/{% raw %}{{productOfferReference}}{% endraw %}?include=product-offer-availabilities`. The response should include the `product-offer-availabilities` resource along with `product-offers`.

{% endinfo_block %}


## Related features

Integrate the following related features:

| FEATURE | REQUIRED FOR THE CURRENT FEATURE | INTEGRATION GUIDE |
|---|---|---|
| Marketplace Inventory Management + Wishlist Glue API |  |  [Glue API: Marketplace Inventory Management + Wishlist feature integration ](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-inventory-management-wishlist-feature-integration.html) |
