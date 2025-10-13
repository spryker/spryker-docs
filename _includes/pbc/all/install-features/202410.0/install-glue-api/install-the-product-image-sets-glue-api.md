

## Install Feature API

### Prerequisites

Install the required features:

| NAME | VERSION |
| --- | --- |
| Spryker Core | {{page.version}} |
| Customer Account Management | {{page.version}} |
| ProductImage | {{page.version}} |
| ProductsRestApi | {{page.version}} |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/product-image-sets-rest-api:"^1.0.3" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following module is installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ProductImageSetsRestApi | vendor/spryker/product-image-sets-rest-api |

{% endinfo_block %}

## 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes are present in the transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| RestProductImageSetsAttributesTransfer | column | created | src/Generated/Shared/Transfer/RestProductImageSetsAttributesTransfers |
| RestProductImageSetTransfer | class | created | src/Generated/Shared/Transfer/RestProductImageSetTransfer |
| RestImagesAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestImagesAttributesTransfer |

{% endinfo_block %}

## 3) Set up behavior

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| AbstractProductImageSetsRoutePlugin | Registers an abstract product image sets resource. | None | Spryker\Glue\ProductImageSetsRestApi\Plugin |
| ConcreteProductImageSetsRoutePlugin | Registers a concrete product image sets resource. | None | Spryker\Glue\ProductImageSetsRestApi\Plugin |
| AbstractProductsProductImageSetsResourceRelationshipPlugin | Adds an abstract product image sets resource as a relationship to an abstract product resource. | None | Spryker\Glue\ProductImageSetsRestApi\Plugin |
| ConcreteProductsProductImageSetsResourceRelationshipPlugin | Adds a concrete product image sets resource as a relationship to a concrete product resource. | None | Spryker\Glue\ProductImageSetsRestApi\Plugin |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

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

- `http://mysprykershop.com//abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}/abstract-product-image-sets`
- `http://mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}/concrete-product-image-sets`

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make the request to `http://mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}?include=abstract-product-image-sets`. The abstract product with the given SKU should have at least one image set. Make sure that the response includes relationships to the `abstract-product-image-sets` resources.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make the request to `http://mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}?include=abstract-product-image-sets`. The concrete product with the given SKU should have at least one image set. Make sure that the response includes relationships to the `concrete-product-image-sets` resources.

{% endinfo_block %}
