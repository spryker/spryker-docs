---
title: Glue API - Marketplace Inventory Management feature integration
last_updated: Dec 16, 2020
description: This document describes the process how to integrate the Marketplace Inventory Management Glue API feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the [Marketplace Inventory Management Glue API](https://github.com/spryker-feature/marketplace-inventory-management) feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Inventory Management Glue API feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
|-|-|-|
| Spryker Core | master | [Glue API: Spryker Core feature integration](https://documentation.spryker.com/docs/glue-api-spryker-core-feature-integration)  |
| Marketplace Inventory Management | master | [Marketplace Inventory Management feature integration](/docs/marketplace/dev/feature-integration-guides/marketplace-inventory-management-feature-integration.html)  |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/product-offer-availabilities-rest-api:"^0.3.0" --update-with-dependencies
```

---
**Verification**

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| ProductOfferAvailabilitiesRestApi | vendor/spryker/product-offer-availabilities-rest-api |

---

### 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

---
**Verification**

Make sure that the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
|-|-|-|-|
| RestProductOfferAvailabilitiesAttributes | object | Created | src/Generated/Shared/Transfer/RestProductOfferAvailabilitiesAttributesTransfer |

---

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

---
**Verification**

Make sure that the `ProductOfferAvailabilitiesResourceRoutePlugin` plugin is set up by sending the request GET `http://glue.mysprykershop.com/product-offers/{% raw %}{{productOfferReference}}{% endraw %}/product-offer-availabilities`.

Make sure that the `ProductOfferAvailabilitiesByProductOfferReferenceResourceRelationshipPlugin` plugin is set up by sending the request GET `http://glue.mysprykershop.com{% raw %}{{url}}{% endraw %}/product-offers/{% raw %}{{productOfferReference}}{% endraw %}?include=product-offer-availabilities`. The response should include the `product-offer-availabilities` resource along with the `product-offers`.

---
