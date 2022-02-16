---
title: Glue API - Price feature integration
description: This guide will navigate through the process of installing and configuring of the Price API feature used in Spryker OS.
last_updated: Nov 22, 2019
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v3/docs/glue-api-product-price-api-feature-integration
originalArticleId: ee4ed9ad-e820-4e1d-8df9-392db150c042
redirect_from:
  - /v3/docs/glue-api-product-price-api-feature-integration
  - /v3/docs/en/glue-api-product-price-api-feature-integration
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version | Integration guide |
| --- | --- | --- |
| Spryker Core | 201907.0 | Glue Application |
| Product | 201907.0 | Products API |
| Price | 201907.0 | Price |

### 1) Install the required modules using Composer
Run the following command to install the required modules:

```bash
composer require spryker/product-prices-rest-api:"^1.1.0" spryker/products-product-prices-resource-relationship:"^1.0.0" --update-with-dependencies
```

<section contenteditable="false" class="warningBox"><div class="content">
    Make sure that the following modules are installed:

| Module | Expected Directory |
| --- | --- |
| `ProductPricesRestApi` | `vendor/spryker/product-prices-rest-api` |
| `ProductsProductPricesResourceRelationship` | `vendor/spryker/products-product-prices-resource-relationship` |
</div></section>

### 2) Set up Transfer Objects
Run the following commands to generate transfer changes:

```bash
console transfer:generate
```

<section contenteditable="false" class="warningBox"><div class="content">
    Make sure that the following changes are present in the transfer objects:

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `RestProductPriceAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestProductPriceAttributesTransfer` |
| `RestProductPricesAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestProductPricesAttributesTransfer` |
| `RestCurrencyTransfer` | class | created | `src/Generated/Shared/Transfer/RestCurrencyTransfer` |
</div></section>

### 3) Set up Behavior
#### Enable resources and relationships
Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `AbstractProductPricesRoutePlugin` | Registers the `abstract-product-prices` resource. | None | `Spryker\Glue\ProductPricesRestApi\Plugin` |
| `ConcreteProductPricesRoutePlugin` | Registers the `concrete-product-prices` resource. | None | `Spryker\Glue\ProductPricesRestApi\Plugin` |
| `AbstractProductsProductPricesResourceRelationshipPlugin` | Adds the `abstract-product-prices` resource as a relationship to the `abstract-products` resource. | None | `Spryker\Glue\ProductsProductPricesResourceRelationship\Plugin` |
| `ConcreteProductsProductPricesResourceRelationshipPlugin` | Adds the `concrete-product-prices` resource as a relationship to the `concrete-products` resource. | None | `Spryker\Glue\ProductsProductPricesResourceRelationship\Plugin` |

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

Make sure that the following endpoints are available:<ul><li>http://mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}/abstract-product-prices</li><li>http://mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}/concrete-product-prices</li></ul>Send a request to *http://mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}?include=abstract-product-prices*. Make sure that the response includes relationships to the `abstract-product-prices` resources.<br>Send a request to *http://mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}?include=concrete-product-prices*. <br>Make sure that the response includes relationships to the `concrete-product-prices` resources.
{% endinfo_block %}

*Last review date: Aug 05, 2019*

<!--by Tihran Voitov and Yulia Boiko-->
