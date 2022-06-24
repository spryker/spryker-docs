---
title: Glue API - Configurable Bundle feature integration
description: Learn how to integrate the Glue API - Configurable Bundle feature into a Spryker project.
last_updated: Jun 27, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/glue-api-configurable-bundle-feature-integration
originalArticleId: f4ee682d-f18e-43a3-b945-6a287cb62c3e
redirect_from:
  - /2021080/docs/glue-api-configurable-bundle-feature-integration
  - /2021080/docs/en/glue-api-configurable-bundle-feature-integration
  - /docs/glue-api-configurable-bundle-feature-integration
  - /docs/en/glue-api-configurable-bundle-feature-integration
---

This document describes how to integrate the Configurable Bundle feature.

## Prerequisites


To start the feature integration, overview and install the necessary features:


| FEATURE | VERSION | INTEGRATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{page.version}} | [Glue API: Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-spryker-core-feature-integration.html) |
|Configurable Bundles |{{page.version}} | [Configurable Bundle feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/configurable-bundle-feature-integration.html)|
|Order Management |{{page.version}} |[Glue API: Order Management feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-order-management-feature-integration.html)|

## 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/configurable-bundles-rest-api:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following module has been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ConfigurableBundlesRestApi | vendor/spryker/configurable-bundles-rest-api |

{% endinfo_block %}


## 2) Set up transfer objects


Set up transfer objects:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:


| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| RestConfigurableBundleTemplatesAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestConfigurableBundleTemplatesAttributesTransfer |
| RestConfigurableBundleTemplateSlotsAttributesTransfer | class |created | src/Generated/Shared/Transfer/RestConfigurableBundleTemplateSlotsAttributesTransfer |
| RestConfigurableBundleTemplateImageSetsAttributesTransfer |class | created | src/Generated/Shared/Transfer/RestConfigurableBundleTemplateImageSetsAttributesTransfer |
| RestConfigurableBundleImagesAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestConfigurableBundleImagesAttributesTransfer |
| RestErrorMessageTransfer |class|created |src/Generated/Shared/Transfer/RestErrorMessageTransfer|
| ConfigurableBundleTemplateStorageTransfer | class | created | src/Generated/Shared/Transfer/ConfigurableBundleTemplateStorageTransfer |
| ConfigurableBundleTemplateSlotStorageTransfer | class | created | src/Generated/Shared/Transfer/ConfigurableBundleTemplateSlotStorageTransfer |
| ProductImageSetStorageTransfer | class | created | src/Generated/Shared/Transfer/ProductImageSetStorageTransfer |
| ProductImageStorageTransfer | class | created | src/Generated/Shared/Transfer/ProductImageStorageTransfer |
| ConfigurableBundleTemplatePageSearchRequestTransfer | class | created | src/Generated/Shared/Transfer/ConfigurableBundleTemplatePageSearchRequestTransfer |
| ConfigurableBundleTemplateStorageFilterTransfer | class | created | src/Generated/Shared/Transfer/ConfigurableBundleTemplateStorageFilterTransfer |
| ItemTransfer.salesOrderConfiguredBundle | property | created | src/Generated/Shared/Transfer/ItemTransfer |
| ItemTransfer.salesOrderConfiguredBundleItem | property | created | src/Generated/Shared/Transfer/ItemTransfer |
| RestSalesOrderConfiguredBundleTransfer | class | created | src/Generated/Shared/Transfer/RestSalesOrderConfiguredBundleTransfer |
| RestSalesOrderConfiguredBundleItemTransfer | class | created | src/Generated/Shared/Transfer/RestSalesOrderConfiguredBundleItemTransfer |
| RestOrderItemsAttributesTransfer.salesOrderConfiguredBundle | property | created | src/Generated/Shared/Transfer/RestOrderItemsAttributesTransfer | |RestOrderItemsAttributesTransfer.salesOrderConfiguredBundleItem | property | created | src/Generated/Shared/Transfer/RestOrderItemsAttributesTransfer |
| SalesOrderConfiguredBundleTransfer | class | created | src/Generated/Shared/Transfer/SalesOrderConfiguredBundleTransfer |
| SalesOrderConfiguredBundleTranslationTransfer | class | created | src/Generated/Shared/Transfer/SalesOrderConfiguredBundleTranslationTransfer |
| SalesOrderConfiguredBundleItemTransfer | class | created | src/Generated/Shared/Transfer/SalesOrderConfiguredBundleItemTransfer |

{% endinfo_block %}


## 3) Set up behavior

Activate the following plugins:


| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ConfigurableBundleTemplateSlotByConfigurableBundleTemplateResourceRelationshipPlugin | Adds `configurable-bundle-template-slots` resource as a relationship by configurable bundle template. | None | Spryker\Glue\ConfigurableBundlesRestApi\Plugin\GlueApplication |
| ConfigurableBundleTemplateImageSetByConfigurableBundleTemplateResourceRelationshipPlugin | Adds `configurable-bundle-template-image-sets` resource as a relationship by configurable bundle template. | None | Spryker\Glue\ConfigurableBundlesRestApi\Plugin\GlueApplication |
| ConfigurableBundleTemplatesResourceRoutePlugin | Provides the `/configurable-bundle-templates` resource route. | None | Spryker\Glue\ConfigurableBundlesRestApi\Plugin\GlueApplication |
SalesConfiguredBundleRestOrderItemsAttributesMapperPlugin | Maps the additional information from the`ItemTransfer` to `RestOrderItemsAttributesTransfer`. | None | Spryker\Glue\ConfigurableBundlesRestApi\Plugin\OrdersRestApi |

<details open>
<summary markdown='span'>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\ConfigurableBundlesRestApi\Plugin\GlueApplication\ConfigurableBundleTemplatesResourceRoutePlugin;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\ConfigurableBundlesRestApi\ConfigurableBundlesRestApiConfig;
use Spryker\Glue\ConfigurableBundlesRestApi\Plugin\GlueApplication\ConfigurableBundleTemplateImageSetByConfigurableBundleTemplateResourceRelationshipPlugin;
use Spryker\Glue\ConfigurableBundlesRestApi\Plugin\GlueApplication\ConfigurableBundleTemplateSlotByConfigurableBundleTemplateResourceRelationshipPlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new ConfigurableBundleTemplatesResourceRoutePlugin(),
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
            ConfigurableBundlesRestApiConfig::RESOURCE_CONFIGURABLE_BUNDLE_TEMPLATES,
            new ConfigurableBundleTemplateSlotByConfigurableBundleTemplateResourceRelationshipPlugin()
        );

        $resourceRelationshipCollection->addRelationship(
            ConfigurableBundlesRestApiConfig::RESOURCE_CONFIGURABLE_BUNDLE_TEMPLATES,
            new ConfigurableBundleTemplateImageSetByConfigurableBundleTemplateResourceRelationshipPlugin()
        );

        return $resourceRelationshipCollection;
    }
}
```
</details>

{% info_block warningBox "Verification" %}

Make sure that:

*   The `/configurable-bundle-templates` resource is available by sending the request: `GET https://glue.mysprykershop.com/configurable-bundle-templates`.

*   Each `configurable-bundle-template` resource has a relationship to `configurable-bundle-template-slots` by sending the request:  `GET https://glue.mysprykershop.com/configurable-bundle-templates?include=configurable-bundle-template-slots`.

*   Each `configurable-bundle-template` resource has a relationship to `configurable-bundle-template-image-sets` by sending the request:`GET https://glue.mysprykershop.com/configurable-bundle-templates?include=configurable-bundle-template-image-sets`.


**src/Pyz/Glue/OrdersRestApi/OrdersRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\OrdersRestApi;

use Spryker\Glue\ConfigurableBundlesRestApi\Plugin\OrdersRestApi\SalesConfiguredBundleRestOrderItemsAttributesMapperPlugin;
use Spryker\Glue\OrdersRestApi\OrdersRestApiDependencyProvider as SprykerOrdersRestApiDependencyProvider;

class OrdersRestApiDependencyProvider extends SprykerOrdersRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\OrdersRestApiExtension\Dependency\Plugin\RestOrderItemsAttributesMapperPluginInterface[]
     */
    protected function getRestOrderItemsAttributesMapperPlugins(): array
    {
        return [
            new SalesConfiguredBundleRestOrderItemsAttributesMapperPlugin(),
        ];
    }
}
```

{% endinfo_block %}


{% info_block warningBox "Verification" %}

1.  Create an order with a configurable bandle.

2.  Retrieve the order by sending the request: `GET https://glue.mysprykershop.com/order/:orderReference`  
    Make sure the endpoint returns the sections: `data.attributes.items.salesOrderConfiguredBundle` and `data.attributes.items.salesOrderConfiguredBundleItem`.

{% endinfo_block %}


## Related features

Integrate the following related features:


| FEATURE | REQUIRED FOR THE CURRENT FEATURE | INTEGRATION GUIDE |
| --- | --- | --- |
| Glue API: Configurable Bundle + Cart Feature | ✓ | [Glue API: Configurable Bundle + Cart feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-configurable-bundle-cart-feature-integration.html) |
| Glue API: Configurable Bundle + Product Feature | ✓ | [Glue API: Configurable Bundle + Product feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-configurable-bundle-product-feature-integration.html) |
