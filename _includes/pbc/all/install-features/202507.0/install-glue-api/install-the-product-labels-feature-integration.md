

Follow the steps below to install Product Labels Feature API.

### Prerequisites

Install the required features:

| NAME | VERSION | REQUIRED SUB-FEATURE |
| --- | --- | --- |
| Spryker Core | 202507.0 | [Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html) |
| Product Management | 202507.0 | [Install the Product Glue API](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-glue-api/install-the-product-glue-api.html) |
| Product Label | 202507.0 | |


## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/product-labels-rest-api:"^1.0.1" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following module is installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ProductLabelsRestApi | vendor/spryker/product-labels-rest-api |

{% endinfo_block %}

## 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes are present in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| RestProductLabelsAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestProductLabelsAttributesTransfer |

{% endinfo_block %}

## 3) Set up behavior

Set up the following behaviors.

### Enable resources and relationships

Activate the following plugin:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductLabelsRelationshipByResourceIdPlugin | Adds the product labels resource as a relationship to the abstract product resource. | None | Spryker\Glue\ProductLabelsRestApi\Plugin\GlueApplication\ProductLabelsRelationshipByResourceIdPlugin |
| ProductLabelsResourceRoutePlugin |Registers the product labels resource.  | None | Spryker\Glue\ProductLabelsRestApi\Plugin\GlueApplication\ProductLabelsResourceRoutePlugin |

<details>
<summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\ProductLabelsRestApi\Plugin\GlueApplication\ProductLabelsRelationshipByResourceIdPlugin;
use Spryker\Glue\ProductLabelsRestApi\Plugin\GlueApplication\ProductLabelsResourceRoutePlugin;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;

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

{% info_block warningBox "Verification" %}

Make sure the following endpoint is available: `https://glue.mysprykershop.com/product-labels/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}`

Send a request to `http://mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}sku{% raw %}}}{% endraw %}?include=product-labels`and verify if the abstract product with the given SKU has at least one assigned product label and the response includes relationships to the product-labels resources.

{% endinfo_block %}
