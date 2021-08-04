---
title: Product Price API Feature Integration
originalLink: https://documentation.spryker.com/v1/docs/product-price-api-feature-integration
redirect_from:
  - /v1/docs/product-price-api-feature-integration
  - /v1/docs/en/product-price-api-feature-integration
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Spryker Core | 2018.12.0 |
| Product Management | 2018.12.0 |
| Price | 2018.12.0 |
| ProductsRestApi | 2.2.3 |

## 1) Install the required modules

Run the following commands to install the required modules:
```yaml
composer require spryker/product-prices-rest-api:"^1.1.0" --update-with-dependencies
composer require spryker/products-product-prices-resource-relationship:"^1.0.0" --update-with-dependencies
```

{% info_block infoBox "Verification" %}
Make sure that the following modules are installed:
{% endinfo_block %}

| Module | Expected Directory |
| --- | --- |
| `ProductPricesRestApi` | `vendor/spryker/product-prices-rest-api` |
|`ProductsProductPricesResourceRelationship`|`vendor/spryker/products-product-prices-resource-relationship`|

## 2) Set up Transfer object

Run the following command to generate transfer changes:
```yaml
console transfer:generate
```

{% info_block infoBox "Verification" %}
Make sure that the following changes are present in the transfer objects:
{% endinfo_block %}

| Transfer |Type  | Event | Path |
| --- | --- | --- | --- |
| `RestProductPriceAttributesTransfer` | column | created | `src/Generated/Shared/Transfer/RestProductPriceAttributesTransfer` |
| `RestProductPricesAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestProductPricesAttributesTransfer` |
| `RestCurrencyTransfer` | class | created | `src/Generated/Shared/Transfer/RestCurrencyTransfer` |

## 3) Set up behavior
### Enable resources and relationships
**Implementation**
Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `AbstractProductPricesRoutePlugin` | Registers an abstract product prices resource. | None | `Spryker\Glue\ProductPricesRestApi\Plugin` |
| `ConcreteProductPricesRoutePlugin` | Registers a concrete product prices resource. | None | `Spryker\Glue\ProductPricesRestApi\Plugin` |
| `AbstractProductsProductPricesResourceRelationshipPlugin` | Adds an abstract product prices resource as a relationship to an abstract product resource. | None | `Spryker\Glue\ProductsProductPricesResourceRelationship\Plugin` |
| `ConcreteProductsProductPricesResourceRelationshipPlugin` | Adds a concrete product prices resource as a relationship to a concrete product resource. | None | `Spryker\Glue\ProductsProductPricesResourceRelationship\Plugin` |

**`src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`**
```php
<?php
 
namespace Pyz\Glue\GlueApplication;
 
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
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

**Verification**
{% info_block infoBox %}
Make sure that the following endpoints are available:
{% endinfo_block %}

* `http://example.org/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}/abstract-product-prices` 
* `http://example.org/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}/concrete-product-prices` 
{% info_block infoBox %}
Make the request to `http://example.org/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}?include=abstract-product-prices`. Make sure that the response includes relationships to the `abstract-product-prices` resources. 
{% endinfo_block %}
{% info_block infoBox %}
Make the request to `http://example.org/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}?include=concrete-product-prices`. Make sure that the response includes relationships to the `concrete-product-prices` resources.
{% endinfo_block %}

_Last review date: Feb 21, 2019_
