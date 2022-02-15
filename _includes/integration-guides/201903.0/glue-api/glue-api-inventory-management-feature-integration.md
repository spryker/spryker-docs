---
title: Glue API - Inventory Management feature integration
description: This guide will guide you through the process of installing and configuring the Inventory Management feature for your project.
last_updated: Nov 22, 2019
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v2/docs/inventory-management-feature-integration-201903
originalArticleId: 7986ca0c-a023-4e8c-a015-c6bd20661400
redirect_from:
  - /v2/docs/inventory-management-feature-integration-201903
  - /v2/docs/en/inventory-management-feature-integration-201903
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version | Integration guide |
| --- | --- | --- |
| Glue API: Glue Application | 201903.0 | [Glue Application feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-glue-application-feature-integration.html) |
| Glue API: Product | 201903.0 | [Product API feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/product-api-feature-integration.html) |
|Inventory Management  | 201903.0 |  |

### 1) Install the required modules using Composer
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
<summary markdown='span'>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

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
