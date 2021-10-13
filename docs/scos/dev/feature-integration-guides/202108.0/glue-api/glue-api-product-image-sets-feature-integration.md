---
title: Glue API- Product image sets feature integration
description: This guide will navigate you through the process of installing and configuring the Product Image Sets API feature in Spryker OS.
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/glue-api-product-image-sets-api-feature-integration
originalArticleId: 830ee74b-7a54-441e-9c41-b1c38c66d4cf
redirect_from:
  - /2021080/docs/glue-api-product-image-sets-api-feature-integration
  - /2021080/docs/en/glue-api-product-image-sets-api-feature-integration
  - /docs/glue-api-product-image-sets-api-feature-integration
  - /docs/en/glue-api-product-image-sets-api-feature-integration
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core | 2018.12.0 |
| Customer Account Management | 2018.12.0 |
| ProductImage | 2018.12.0 |
| ProductsRestApi | 2.2.3 |

## 1) Install the required modules

Run the following command to install the required modules:
`composer require spryker/product-image-sets-rest-api:"^1.0.3" --update-with-dependencies`

{% info_block warningBox "Verification" %}

Make sure that the following module is installed:)

| Module | Expected Directory |
| --- | --- |
| `ProductImageSetsRestApi` | `	vendor/spryker/product-image-sets-rest-api` |       

{% endinfo_block %}

## 2) Set up Transfer Objects

Run the following command to generate transfer changes:
`console transfer:generat`

{% info_block warningBox "Verification" %}

Make sure that the following changes are present in the transfer objects:

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `RestProductImageSetsAttributesTransfer` | column | created | `src/Generated/Shared/Transfer/RestProductImageSetsAttributesTransfers` |
| `RestProductImageSetTransfer` | class | created | `src/Generated/Shared/Transfer/RestProductImageSetTransfer` |
| `RestImagesAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestImagesAttributesTransfer` |

{% endinfo_block %}

## 3) Set up Behavior
Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `AbstractProductImageSetsRoutePlugin` | Registers an abstract product image sets resource. | None | `Spryker\Glue\ProductImageSetsRestApi\Plugin` |
| `ConcreteProductImageSetsRoutePlugin` | Registers a concrete product image sets resource. | None | `Spryker\Glue\ProductImageSetsRestApi\Plugin` |
| `AbstractProductsProductImageSetsResourceRelationshipPlugin` | Adds an abstract product image sets resource as a relationship to an abstract product resource. | None | `Spryker\Glue\ProductImageSetsRestApi\Plugin` |
| `ConcreteProductsProductImageSetsResourceRelationshipPlugin` | Adds a concrete product image sets resource as a relationship to a concrete product resource. | None | `Spryker\Glue\ProductImageSetsRestApi\Plugin` |

**`src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`**
```php
<?php
 
namespace Pyz\Glue\GlueApplication;
 
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\ProductImageSetsRestApi\Plugin\AbstractProductImageSetsRoutePlugin;
use Spryker\Glue\ProductImageSetsRestApi\Plugin\ConcreteProductImageSetsRoutePlugin;
use Spryker\Glue\ProductImageSetsRestApi\Plugin\Relationship\AbstractProductsProductImageSetsResourceRelationshipPlugin;
use Spryker\Glue\ProductImageSetsRestApi\Plugin\Relationship\ConcreteProductsProductImageSetsResourceRelationshipPlugin;
use Spryker\Glue\ProductsRestApi\ProductsRestApiConfig;
 
class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new AbstractProductImageSetsRoutePlugin(),
            new ConcreteProductImageSetsRoutePlugin(),
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
            ProductsRestApiConfig::RESOURCE_ABSTRACT_PRODUCTS,
            new AbstractProductsProductImageSetsResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            ProductsRestApiConfig::RESOURCE_CONCRETE_PRODUCTS,
            new ConcreteProductsProductImageSetsResourceRelationshipPlugin()
        );
 
        return $resourceRelationshipCollection;
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the following endpoints are available:

* `http://example.org//abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}/abstract-product-image-sets` 
* `http://example.org/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}/concrete-product-image-sets` 

{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make the request to `http://example.org/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}?include=abstract-product-image-sets`. The abstract product with the given SKU should have at least one image set. Make sure that the response includes relationships to the `abstract-product-image-sets` resources.
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make the request to `http://example.org/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}?include=abstract-product-image-sets`. The concrete product with the given SKU should have at least one image set. Make sure that the response includes relationships to the `concrete-product-image-sets` resources.
{% endinfo_block %}
