---
title: Inventory Management Feature Integration
originalLink: https://documentation.spryker.com/v2/docs/inventory-management-feature-integration-201903
redirect_from:
  - /v2/docs/inventory-management-feature-integration-201903
  - /v2/docs/en/inventory-management-feature-integration-201903
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version | Required sub-feature |
| --- | --- | --- |
| Spryker Core | 201903.0 | Feature API <!-- https://spryker.atlassian.net/wiki/spaces/DOCS/pages/639173086/WIP+GLUE+Glue+Application+Feature+Integration+-+ongoing--> |
| Product | 201903.0 | Feature API<!--(https://documentation.spryker.com/feature_integration_guides/glue_api/product_api_feature_integration/product-api-feature-integration-201903.htm)--> |
|Inventory Management  | 201903.0 |  |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker/product-availabilities-rest-api:"^1.0.3" spryker/products-product-availabilities-resource-relationship:"^1.0.0" --update-with-dependencies
```
#### Verfification
Make sure that the following modules were installed:

| Module | Expected Directory |
| --- | --- |
|`ProductAvailabilitiesRestApi` | `vendor/spryker/product-availabilities-rest-api` |
| `ProductsProductAvailabilitiesResourceRelationship` | `vendor/spryker/products-product-availabilities-resource-relationship` |

### 2) Set up Transfer objects
Run the following commands to generate transfer changes:
```bash
console transfer:generate
```

#### Verification
Make sure that the following changes have been applied in transfer objects:

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
|`RestAbstractProductAvailabilityAttributesTransfer`  | class | created | `src/Generated/Shared/Transfer/RestAbstractProductAvailabilityAttributesTransfer` |
| `RestConcreteProductAvailabilityAttributesTransfer` | class | created |`src/Generated/Shared/Transfer/RestConcreteProductAvailabilityAttributesTransfer` |

### 3) Set up Behavior
#### Enable resources and relationships
Activate the following plugin:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
|`AbstractProductAvailabilitiesRoutePlugin`|Registers abstract product availabilities resource.  | None |`Spryker\Glue\ProductAvailabilitiesRestApi\Plugin`  |
| `ConcreteProductAvailabilitiesRoutePlugin` | Registers concrete product availabilities resource. | None | `Spryker\Glue\ProductAvailabilitiesRestApi\Plugin` |
| `AbstractProductAvailabilitiesResourceRelationshipPlugin` | Adds abstract product availability resource as a relationship to abstract product resource. |None  | `Spryker\Glue\ProductsProductAvailabilitiesResourceRelationship\Plugin` |
| `ConcreteProductAvailabilitiesResourceRelationshipPlugin` | Adds concrete product availability resource as a relationship to concrete product resource. | None | `Spryker\Glue\ProductsProductAvailabilitiesResourceRelationship\Plugin` |

<details open>
<summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>
    
```php
<?php
 
namespace Pyz\Glue\GlueApplication;
 
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\ProductAvailabilitiesRestApi\Plugin\AbstractProductAvailabilitiesRoutePlugin;
use Spryker\Glue\ProductAvailabilitiesRestApi\Plugin\ConcreteProductAvailabilitiesRoutePlugin;
use Spryker\Glue\ProductsProductAvailabilitiesResourceRelationship\Plugin\AbstractProductAvailabilitiesResourceRelationshipPlugin;
use Spryker\Glue\ProductsProductAvailabilitiesResourceRelationship\Plugin\ConcreteProductAvailabilitiesResourceRelationshipPlugin;
use Spryker\Glue\ProductsRestApi\ProductsRestApiConfig;
 
class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
	/**
	* @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
	*/
	protected function getResourceRoutePlugins(): array
	{
		return [
			new AbstractProductAvailabilitiesRoutePlugin(),
			new ConcreteProductAvailabilitiesRoutePlugin(),
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
			new AbstractProductAvailabilitiesResourceRelationshipPlugin()
		);
		$resourceRelationshipCollection->addRelationship(
			ProductsRestApiConfig::RESOURCE_CONCRETE_PRODUCTS,
			new ConcreteProductAvailabilitiesResourceRelationshipPlugin()
		);
 
		return $resourceRelationshipCollection;
	}
}
```
<br>

</details>

{% info_block warningBox "Verification" %}
Make sure that the following endpoints are available: <ul><li>http://mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}/abstract-product-availabilities</li><li>http://mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}/concrete-product-availabilities</li></ul><br>Send a request to "http://mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}?include=abstract-product-availabilities". Make sure that the response includes relationships to the "abstract-product-availabilities" resource.<br><br> Send a request to "http://mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}?include=concrete-product-availabilities". Make sure that the response includes relationships to the "concrete-product-availabilities" resource.
{% endinfo_block %}
 
<!--**See also:**

* [Inventory Management](https://documentation.spryker.com/capabilities/inventory_management/inventory-management.htm)

* [Product Management](https://documentation.spryker.com/capabilities/product_management/product-management.htm)
-->
_Last review date: Mar 21, 2019_

[//]: # (by Tihran Voitov, Yuliia Boiko)
