---
title: Glue API - Configurable Bundle + Product feature integration
description: Learn how to integrate the Glue API - Configurable Bundle + Product feature into a Spryker project.
last_updated: Jun 18, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/glue-api-configurable-bundle-product-feature-integration
originalArticleId: 6afcf67c-cdf1-43c8-8881-c87650dba091
redirect_from:
  - /2021080/docs/glue-api-configurable-bundle-product-feature-integration
  - /2021080/docs/en/glue-api-configurable-bundle-product-feature-integration
  - /docs/glue-api-configurable-bundle-product-feature-integration
  - /docs/en/glue-api-configurable-bundle-product-feature-integration
---

This document describes how to integrate the Glue API: Configurable Bundle + Product feature.

## Prerequisites

To start the feature integration, overview and install the necessary features:

| NAME | VERSION | INTEGRATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{page.version}} | [Glue API: Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-spryker-core-feature-integration.html) |
| Configurable Bundle | {{page.version}} | [Glue API: Configurable Bundle feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-configurable-bundle-feature-integration.html) |
| Product | {{page.version}} | [Glue API: Products feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-product-feature-integration.html) | 

## 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/configurable-bundles-products-resource-relationship:"^1.0.0" --update-with-dependencies
``` 

{% info_block warningBox "Verification" %}

Make sure that the following module has been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ConfigurableBundlesProductsResourceRelationship | vendor/spryker/configurable-bundles-products-resource-relationship |

{% endinfo_block %}


## 2) Set up transfer objects

Set up transfer objects:

```bash
console transfer:generate
``` 

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in the transfer objects:

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| ConcreteProductsRestAttributesTransfer | class | created | src/Generated/Shared/Transfer/ConcreteProductsRestAttributesTransfer |
| ProductConcreteCriteriaFilterTransfer | class | created src/Generated/Shared/Transfer/ProductConcreteCriteriaFilterTransfer | 
| ConfigurableBundleTemplateSlotStorageTransfer | class | created | src/Generated/Shared/Transfer/ConfigurableBundleTemplateSlotStorageTransfer |
| ProductListTransfer | class | created | src/Generated/Shared/Transfer/ProductListTransfer |

{% endinfo_block %}

## 3) Set up behavior

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductConcreteByConfigurableBundleTemplateSlotResourceRelationshipPlugin | Adds the `concrete-products` resource as a relationship by configurable bundle template slot. | None | Spryker\Glue\ConfigurableBundlesProductsResourceRelationship\Plugin\GlueApplication | 


**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\ConfigurableBundlesProductsResourceRelationship\ConfigurableBundlesProductsResourceRelationshipConfig;
use Spryker\Glue\ConfigurableBundlesProductsResourceRelationship\Plugin\GlueApplication\ProductConcreteByConfigurableBundleTemplateSlotResourceRelationshipPlugin;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
     *
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
     */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            ConfigurableBundlesProductsResourceRelationshipConfig::RESOURCE_CONFIGURABLE_BUNDLE_TEMPLATE_SLOTS,
            new ProductConcreteByConfigurableBundleTemplateSlotResourceRelationshipPlugin()
        );

        return $resourceRelationshipCollection;
    }
}
```

{% info_block warningBox "Verification" %}

Send the following request and make sure that each `configurable-bundle-template-slot` resource has a relationship to the `concrete-products` resource: `GET https://glue.mysprykershop.com/configurable-bundle-templates?include=configurable-bundle-template-slots,concrete-products`.

{% endinfo_block %}


## Related features

Integrate the following related features:

| FEATURE | REQUIRED FOR THE CURRENT FEATURE | INTEGRATION GUIDE |
| --- | --- | --- |
| Glue API: Configurable Bundle  | ✓ | [Glue API: Configurable Bundle feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-configurable-bundle-feature-integration.html) |
| GLUE: Configurable Bundle + Cart  | ✓ | [Glue API: Configurable Bundle + Cart feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-configurable-bundle-cart-feature-integration.html) | 




