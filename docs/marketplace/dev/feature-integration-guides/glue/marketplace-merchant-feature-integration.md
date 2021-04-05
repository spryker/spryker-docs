---
title: Marketplace Merchant feature integration
last_updated: Dec 03, 2020
summary: This document describes the process how to integrate the Marketplace Merchant Glue API feature into a Spryker project.
---

## Install feature core
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version | Link |
|-|-|-|
| Spryker Core | master | [[PUBLISHED] Glue API: Spryker Core feature integration - ongoing](https://spryker.atlassian.net/l/c/6k015Xc9) |
| Marketplace Merchant | master | [[WIP] Marketplace Merchant Feature Integration - ongoing](https://spryker.atlassian.net/l/c/CndMqdDE) |

### 1) Install the required modules using Composer
Run the following commands to install the required modules:
```bash
composer require spryker/merchants-rest-api:"^0.2.0" --update-with-dependencies
```
Make sure that the following modules have been installed:

| Module | Expected Directory |
|-|-|
| MerchantsRestApi | vendor/spryker/merchants-rest-api |

### 2) Set up transfer objects
Run the following command to generate transfer changes:

```bash
console transfer:generate
```

Make sure that the following changes have been applied in transfer objects:

| Transfer | Type | Event | Path |
|-|-|-|-|
| RestMerchantsAttributesTransfer | object | Created | src/Generated/Shared/Transfer/RestMerchantsAttributesTransfer |
| RestMerchantAddressesAttributesTransfer | object | Created | src/Generated/Shared/Transfer/RestMerchantAddressesAttributesTransfer |
| RestMerchantAddressTransfer | object | Created | src/Generated/Shared/Transfer/RestMerchantAddressTransfer |
| RestLegalInformationTransfer | object | Created | src/Generated/Shared/Transfer/RestLegalInformationTransfer |
| RestOrdersAttributesTransfer.merchantReferences | property | Created | src/Generated/Shared/Transfer/RestOrdersAttributesTransfer |
| RestOrderDetailsAttributesTransfer.merchantReferences | property | Created | src/Generated/Shared/Transfer/RestOrderDetailsAttributesTransfer |
| RestOrderItemsAttributesTransfer.merchantReference | property | Created | src/Generated/Shared/Transfer/RestOrderItemsAttributesTransfer |
| RestErrorMessageTransfer | object | Created | src/Generated/Shared/Transfer/RestErrorMessageTransfer |

### 3) Set up behavior
#### Enable resources and relationships
Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
|-|-|-|-|
| MerchantsResourceRoutePlugin | Registers the `merchants` resource. | None | Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication |
| MerchantAddressesResourceRoutePlugin | Registers the `merchant-addresses` resource. | None | Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication |
| MerchantAddressByMerchantReferenceResourceRelationshipPlugin | Adds the `merchant-addresses` resource as a relationship of the `merchants` resource. | None | Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication |
| MerchantByMerchantReferenceResourceRelationshipPlugin | Adds `merchants` resource as a relationship by merchant reference provided in the attributes. | None | Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication |
| MerchantRestUrlResolverAttributesTransferProviderPlugin | Adds functionality for merchant url resolving to UrlRestApi. | None | Spryker\Glue\MerchantsRestApi\Plugin\UrlsRestApi |
| MerchantsByOrderResourceRelationshipPlugin | Adds `merchants` resources as relationship by order merchant references. | None | Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\MerchantsRestApi\MerchantsRestApiConfig;
use Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication\MerchantAddressByMerchantReferenceResourceRelationshipPlugin;
use Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication\MerchantAddressesResourceRoutePlugin;
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

Make sure that the `MerchantsResourceRoutePlugin` plugin is set up by sending the request GET `http://glue.mysprykershop.com/merchants/{{merchantReference}}`, `http://glue.mysprykershop.com/merchants`.

Make sure that the pagination is working by sending the request GET `http://glue.mysprykershop.com/merchants?offset=1&limit=1`.

Make sure that the `MerchantAddressesResourceRoutePlugin` plugin is set up by sending the request GET `http://glue.mysprykershop.com/merchants/{{merchantReference}}/merchant-addresses`.

Make sure that the `MerchantAddressByMerchantReferenceResourceRelationshipPlugin` plugin is set up by sending the request GET `http://glue.mysprykershop.com/merchants/{{merchantReference}}?include=merchant-addresses`. The response should include the `merchant-addresses` resource along with the merchants.

Make sure that by sending the request GET `http://glue.mysprykershop.com/url-resolver?url={merchantUrl}`, you can see the merchant entity type and ID in the response.

Make sure that by sending the request GET `http://glue.mysprykershop.com/orders?include=merchant`, you can see merchant attributes in the response.
