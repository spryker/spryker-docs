---
title: "Glue API: Marketplace Merchant feature integration"
last_updated: Aug 27, 2021
description: This document describes the process how to integrate the Marketplace Merchant Glue API feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Merchant Glue API feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Merchant Glue API feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
|-|-|-|
| Spryker Core | {{page.version}} | [Glue API: Spryker Core Feature Integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-spryker-core-feature-integration.html) |
| Marketplace Merchant | {{page.version}} | [Marketplace Merchant feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-merchant-feature-integration.html) |

### 1) Install the required modules using Composer

Install the required modules:
```bash
composer require spryker/merchants-rest-api:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| MerchantsRestApi | vendor/spryker/merchants-rest-api |

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
| RestMerchantsAttributesTransfer | class | Created | src/Generated/Shared/Transfer/RestMerchantsAttributesTransfer |
| RestMerchantAddressesAttributesTransfer | class | Created | src/Generated/Shared/Transfer/RestMerchantAddressesAttributesTransfer |
| RestMerchantAddressTransfer | class | Created | src/Generated/Shared/Transfer/RestMerchantAddressTransfer |
| RestLegalInformationTransfer | class | Created | src/Generated/Shared/Transfer/RestLegalInformationTransfer |
| RestOrdersAttributesTransfer.merchantReferences | property | Created | src/Generated/Shared/Transfer/RestOrdersAttributesTransfer |
| RestOrderDetailsAttributesTransfer.merchantReferences | property | Created | src/Generated/Shared/Transfer/RestOrderDetailsAttributesTransfer |
| RestOrderItemsAttributesTransfer.merchantReference | property | Created | src/Generated/Shared/Transfer/RestOrderItemsAttributesTransfer |
| MerchantStorageProfileTransfer.description | property | Created | src/Generated/Shared/Transfer/MerchantStorageProfileTransfer |
| MerchantStorageProfileTransfer.bannerUrl | property | Created | src/Generated/Shared/Transfer/MerchantStorageProfileTransfer |
| MerchantStorageProfileTransfer.deliveryTime | property | Created | src/Generated/Shared/Transfer/MerchantStorageProfileTransfer |
| MerchantStorageProfileTransfer.termsConditions | property | Created | src/Generated/Shared/Transfer/MerchantStorageProfileTransfer |
| MerchantStorageProfileTransfer.cancellationPolicy | property | Created | src/Generated/Shared/Transfer/MerchantStorageProfileTransfer |
| MerchantStorageProfileTransfer.imprint | property | Created | src/Generated/Shared/Transfer/MerchantStorageProfileTransfer |
| MerchantStorageProfileTransfer.dataPrivacy | property | Created | src/Generated/Shared/Transfer/MerchantStorageProfileTransfer |

{% endinfo_block %}

### 3) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantsResourceRoutePlugin | Registers the `merchants` resource. |  | Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication |
| MerchantAddressesResourceRoutePlugin | Registers the `merchant-addresses` resource. |  | Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication |
| MerchantAddressByMerchantReferenceResourceRelationshipPlugin | Adds the `merchant-addresses` resource as a relationship of the `merchants` resource. |  | Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication |
| MerchantByMerchantReferenceResourceRelationshipPlugin | Adds `merchants` resource as a relationship by merchant reference provided in the attributes. |  | Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication |
| MerchantRestUrlResolverAttributesTransferProviderPlugin | Adds functionality for merchant url resolving to UrlRestApi. |  | Spryker\Glue\MerchantsRestApi\Plugin\UrlsRestApi |
| MerchantsByOrderResourceRelationshipPlugin | Adds `merchants` resources as relationship by order merchant references. |  | Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\MerchantsRestApi\MerchantsRestApiConfig;
use Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication\MerchantAddressByMerchantReferenceResourceRelationshipPlugin;
use Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication\MerchantAddressesResourceRoutePlugin;
use Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication\MerchantByMerchantReferenceResourceRelationshipPlugin;
use Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication\MerchantsByOrderResourceRelationshipPlugin;
use Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication\MerchantsResourceRoutePlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new MerchantsResourceRoutePlugin(),
            new MerchantAddressesResourceRoutePlugin(),
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
            MerchantsRestApiConfig::RESOURCE_MERCHANTS,
            new MerchantAddressByMerchantReferenceResourceRelationshipPlugin()
        );
        
        $resourceRelationshipCollection->addRelationship(
            OrdersRestApiConfig::RESOURCE_ORDERS,
            new MerchantsByOrderResourceRelationshipPlugin()
        );
        
        $resourceRelationshipCollection->addRelationship(
            MerchantProductOffersRestApiConfig::RESOURCE_PRODUCT_OFFERS,
            new MerchantByMerchantReferenceResourceRelationshipPlugin()
        );

        return $resourceRelationshipCollection;
    }
}
```

**src/Pyz/Glue/UrlsRestApi/UrlsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\UrlsRestApi;

use Spryker\Glue\MerchantsRestApi\Plugin\UrlsRestApi\MerchantRestUrlResolverAttributesTransferProviderPlugin;

class UrlsRestApiDependencyProvider extends SprykerUrlsRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\UrlsRestApiExtension\Dependency\Plugin\RestUrlResolverAttributesTransferProviderPluginInterface[]
     */
    protected function getRestUrlResolverAttributesTransferProviderPlugins(): array
    {
        return [
            new MerchantRestUrlResolverAttributesTransferProviderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the `MerchantsResourceRoutePlugin` plugin is set up by sending the request `GET http://glue.mysprykershop.com/merchants/{% raw %}{{merchantReference}}{% endraw %}`, `http://glue.mysprykershop.com/merchants`.

Make sure that the pagination is working by sending the request `GET http://glue.mysprykershop.com/merchants?offset=1&limit=1`.

Make sure that the `MerchantAddressesResourceRoutePlugin` plugin is set up by sending the request `GET http://glue.mysprykershop.com/merchants/{% raw %}{{merchantReference}}{% endraw %}/merchant-addresses`.

Make sure that the `MerchantAddressByMerchantReferenceResourceRelationshipPlugin` plugin is set up by sending the request `GET http://glue.mysprykershop.com/merchants/{% raw %}{{merchantReference}}{% endraw %}?include=merchant-addresses`. The response should include the `merchant-addresses` resource along with the merchants.

Make sure that after sending the request `GET http://glue.mysprykershop.com/url-resolver?url={% raw %}{{merchantUrl}{% endraw %}`, the merchant entity type and ID is returned in response.

Make sure that by sending the request `GET http://glue.mysprykershop.com/orders?include=merchant`, merchant attributes are returned in response.

{% endinfo_block %}
