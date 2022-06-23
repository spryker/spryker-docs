---
title: Glue API - Product price feature integration
last_updated: Aug 27, 2020
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v6/docs/glue-api-product-price-api-feature-integration
originalArticleId: f496039c-1f10-47e9-a845-1d871e5ebdf6
redirect_from:
  - /v6/docs/glue-api-product-price-api-feature-integration
  - /v6/docs/en/glue-api-product-price-api-feature-integration
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

{% info_block warningBox "Verification" %}


Make sure that the following modules are installed:

| Module | Expected Directory |
| --- | --- |
| `ProductPricesRestApi` | `vendor/spryker/product-prices-rest-api` |
|`ProductsProductPricesResourceRelationship`|`vendor/spryker/products-product-prices-resource-relationship`|

{% endinfo_block %}

## 2) Set up Transfer Objects

Run the following command to generate transfer changes:

```yaml
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes are present in the transfer objects:

| Transfer |Type  | Event | Path |
| --- | --- | --- | --- |
| `RestProductPriceAttributesTransfer` | column | created | `src/Generated/Shared/Transfer/RestProductPriceAttributesTransfer` |
| `RestProductPricesAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestProductPricesAttributesTransfer` |
| `RestCurrencyTransfer` | class | created | `src/Generated/Shared/Transfer/RestCurrencyTransfer` |

{% endinfo_block %}

## 3) Set up Behavior
### Enable resources and relationships
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

{% info_block warningBox "Verification" %}

Make sure that the following endpoints are available:

* `http://mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}/abstract-product-prices` 
* `http://mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}/concrete-product-prices`

{% endinfo_block %} 

{% info_block warningBox "Verification" %}
Make the request to `http://mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}?include=abstract-product-prices`. Make sure that the response includes relationships to the `abstract-product-prices` resources. 
{% endinfo_block %}
{% info_block warningBox "Verification" %}
Make the request to `http://mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}?include=concrete-product-prices`. Make sure that the response includes relationships to the `concrete-product-prices` resources.
{% endinfo_block %}
