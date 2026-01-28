

This document describes how to install the Glue API: Configurable Bundle + Product feature.

## Prerequisites

To start the feature integration, overview and install the necessary features:

| NAME | VERSION | INSTALLATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{page.version}} | [Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html) |
| Configurable Bundle | {{page.version}} | [Install the Configurable Bundle Glue API](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-glue-api/install-the-configurable-bundle-cart-glue-api.html) |
| Product | {{page.version}} | [Install the Product Glue API](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-glue-api/install-the-product-glue-api.html) |

## 1) Install the required modules

Install the required modules using Composer:

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
| ProductConcreteCriteriaFilterTransfer | class | created | src/Generated/Shared/Transfer/ProductConcreteCriteriaFilterTransfer |
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


## Install related features

Integrate the following related features:

| FEATURE | REQUIRED FOR THE CURRENT FEATURE | INSTALLATION GUIDE |
| --- | --- | --- |
| Glue API: Configurable Bundle  | ✓ | [Install the Configurable Bundle Glue API](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-glue-api/install-the-configurable-bundle-cart-glue-api.html) |
| GLUE: Configurable Bundle + Cart  | ✓ | [Install the Configurable Bundle + Cart Glue API](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-glue-api/install-the-configurable-bundle-cart-glue-api.html) |
