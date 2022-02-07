---
title: Glue API - Product Labels feature integration
description: This guide will navigate you through the process of installing and configuring the Product Labels API feature in Spryker OS.
last_updated: Nov 4, 2019
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v1/docs/product-labels-api-feature-integration
originalArticleId: 327e406f-7874-49c7-ba1a-fd20d76120e0
redirect_from:
  - /v1/docs/product-labels-api-feature-integration
  - /v1/docs/en/product-labels-api-feature-integration
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core | 2018.12.0 |
| Product Management | 2018.12.0 |
| Product Label | 2018.12.0 |
| ProductsRestApi | 2.2.3 |

## 1) Install the required modules using Composer

Run the following command to install the required modules:

```bash
composer require spryker/product-labels-rest-api:"^1.0.1" --update-with-dependencies
```

{% info_block warningBox “Verification” %}

Make sure that the following module is installed:

| Module | Expected Directory |
| --- | --- |
| `ProductLabelsRestApi` | `vendor/spryker/product-labels-rest-api` |

{% endinfo_block %}

## 2) Set up Transfer Objects

Run the following commands to generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox “Verification” %}

Make sure that the following changes are present in transfer objects:

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `RestProductLabelsAttributesTransfer` | class | created | `	src/Generated/Shared/Transfer/RestProductLabelsAttributesTransfer` |
{% endinfo_block %}

## 3) Set up Behavior
### Enable resources and relationships

**Implementation**

Activate the following plugin:

| Plugin | Specification |Prerequisites  |Namespace  |
| --- | --- | --- | --- |
| `ProductLabelsRelationshipByResourceIdPlugin` | Adds the product labels resource as a relationship to an abstract product resource. | None | `Spryker\Glue\ProductLabelsRestApi\Plugin\GlueApplication\ProductLabelsRelationshipByResourceIdPlugin` |
| `ProductLabelsResourceRoutePlugin` |Registers the product labels resource.  | None | `Spryker\Glue\ProductLabelsRestApi\Plugin\GlueApplication\ProductLabelsResourceRoutePlugin` |

<details open>
<summary markdown='span'>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Glue\GlueApplication;
 
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\ProductLabelsRestApi\Plugin\GlueApplication\ProductLabelsRelationshipByResourceIdPlugin;
use Spryker\Glue\ProductLabelsRestApi\Plugin\GlueApplication\ProductLabelsResourceRoutePlugin;
 
class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new ProductLabelsResourceRoutePlugin(),
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
            new ProductLabelsRelationshipByResourceIdPlugin()
        );
 
        return $resourceRelationshipCollection;
    }
}
```

<br>
</details>

{% info_block infoBox %}

Make sure the following endpoint is available: `http://mysprykershop.com/product-labels/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}`

{% endinfo_block %}

{% info_block infoBox %}

Make a request to `http://mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}sku{% raw %}}}{% endraw %}?include=product-labels`. An abstract product with the given SKU should have at least one assigned product label. Make sure the response includes relationships to the `product-labels` resources.

{% endinfo_block %}

