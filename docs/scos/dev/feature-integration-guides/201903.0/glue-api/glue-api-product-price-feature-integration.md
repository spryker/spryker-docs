---
title: Glue API - Price feature integration
description: This guide will navigate through the process of installing and configuring of the Price API feature used in Spryker OS.
last_updated: Nov 22, 2019
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v2/docs/glue-api-product-price-api-feature-integration
originalArticleId: c9c43516-2904-45a7-973c-dc60dfdbbcd9
redirect_from:
  - /v2/docs/glue-api-product-price-api-feature-integration
  - /v2/docs/en/glue-api-product-price-api-feature-integration
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version | Integration guide |
| --- | --- | --- |
| Glue API: Glue Application | 201903.0 | [Glue Application feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-glue-application-feature-integration.html) |
| Product | 201903.0 | [Products feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/products-feature-integration.html) |
| Price | 201903.0 |  |

### 1) Install the required modules using Composer
Run the following command to install the required modules:
`composer require spryker/product-prices-rest-api:"^1.1.0" spryker/products-product-prices-resource-relationship:"^1.0.0" --update-with-dependencies`

{% info_block warningBox “Verification” %}

Make sure that the following modules are installed:<br><table><th>Module</th><th>Expected Directory</th><tr><td>`ProductPricesRestApi`</td><td>`vendor/spryker/product-prices-rest-api`</td></tr><tr><td>`ProductsProductPricesResourceRelationship`</td><td>`vendor/spryker/products-product-prices-resource-relationship`</td></tr></table>
{% endinfo_block %}

### 2) Set up Transfer Objects
Run the following commands to generate transfer changes:
`console transfer:generate`

{% info_block warningBox “Verification” %}

Make sure that the following changes are present in the transfer objects:<br><table><th>Transfer</th><th>Type</th><th>Event</th><th>Path</th><tr><td>`RestProductPriceAttributesTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/RestProductPriceAttributesTransfer`</td></tr><tr><td>`RestProductPricesAttributesTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/RestProductPricesAttributesTransfer`</td></tr><tr><td>`RestCurrencyTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/RestCurrencyTransfer`</td></tr></table>
{% endinfo_block %}

### 3) Set up Behavior
#### Enable resources and relationships
Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `AbstractProductPricesRoutePlugin` | Registers the abstract product prices resource. | None | `Spryker\Glue\ProductPricesRestApi\Plugin` |
| `ConcreteProductPricesRoutePlugin` | Registers the concrete product prices resource. | None | `Spryker\Glue\ProductPricesRestApi\Plugin` |
| `AbstractProductsProductPricesResourceRelationshipPlugin` | Adds the abstract product prices resource as a relationship to the abstract product resource. | None | `Spryker\Glue\ProductsProductPricesResourceRelationship\Plugin` |
| `ConcreteProductsProductPricesResourceRelationshipPlugin` | Adds the concrete product prices resource as a relationship to the concrete product resource. | None | `Spryker\Glue\ProductsProductPricesResourceRelationship\Plugin` |

<details open>
<summary markdown='span'>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\ProductPricesRestApi\Plugin\AbstractProductPricesRoutePlugin;
use Spryker\Glue\ProductPricesRestApi\Plugin\ConcreteProductPricesRoutePlugin;
use Spryker\Glue\ProductsProductPricesResourceRelationship\Plugin\AbstractProductsProductPricesResourceRelationshipPlugin;
use Spryker\Glue\ProductsProductPricesResourceRelationship\Plugin\ConcreteProductsProductPricesResourceRelationshipPlugin;
use Spryker\Glue\ProductsRestApi\ProductsRestApiConfig;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new AbstractProductPricesRoutePlugin(),
            new ConcreteProductPricesRoutePlugin(),
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
            new AbstractProductsProductPricesResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            ProductsRestApiConfig::RESOURCE_CONCRETE_PRODUCTS,
            new ConcreteProductsProductPricesResourceRelationshipPlugin()
        );

        return $resourceRelationshipCollection;
    }
}
```

<br>
</details>

{% info_block warningBox “Verification” %}

Make sure that the following endpoints are available:<br><ul><li>`http://mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}/abstract-product-prices`</li><li>`http://mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}/concrete-product-prices`</li></ul>Send a request to `http://mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}?include=abstract-product-prices`. Make sure that the response includes relationships to the `abstract-product-prices` resources.<br>Send a request to `http://mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}?include=concrete-product-prices`. Make sure that the response includes relationships to the `concrete-product-prices` resources.
{% endinfo_block %}

_Last review date: Apr 25, 2019_ <!-- by Tihran Voitov and Dmitry Beirak -->
