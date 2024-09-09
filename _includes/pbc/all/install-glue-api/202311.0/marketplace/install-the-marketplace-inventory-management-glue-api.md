This document describes how to integrate the Marketplace Inventory Management Glue API feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Inventory Management Glue API feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|-|-|-|
| Spryker Core | {{page.version}} | [Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html)  |
| Marketplace Inventory Management | {{page.version}} | [Install the Marketplace Inventory Management feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/marketplace/install-features/install-the-marketplace-inventory-management-feature.html)  |

### 1) Install the required modules

Install the required modules using Composer:

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

Make sure the following changes have been applied in transfer objects:

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

<details><summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

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
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface>
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

Make sure that the `ProductOfferAvailabilitiesResourceRoutePlugin` plugin is set up by sending the request `GET https://glue.mysprykershop.com/product-offers/{% raw %}{{productOfferReference}}{% endraw %}/product-offer-availabilities`.

Make sure that `ProductOfferAvailabilitiesByProductOfferReferenceResourceRelationshipPlugin` is set up by sending the request `GET https://glue.mysprykershop.com{% raw %}{{url}}{% endraw %}/product-offers/{% raw %}{{productOfferReference}}{% endraw %}?include=product-offer-availabilities`. The response should include the `product-offer-availabilities` resource along with `product-offers`.

{% endinfo_block %}


## Install related features

Integrate the following related features:

| FEATURE | REQUIRED FOR THE CURRENT FEATURE | INSTALLATION GUIDE |
|---|---|---|
| Marketplace Inventory Management + Wishlist Glue API |  |  [Install the Marketplace Inventory Management + Wishlist Glue API ](/docs/pbc/all/warehouse-management-system/{{page.version}}/marketplace/install-glue-api/install-the-marketplace-inventory-management-wishlist-glue-api.html) |
