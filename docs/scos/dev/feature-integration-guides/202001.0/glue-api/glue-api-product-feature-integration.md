---
title: Glue API - Product feature integration
description: This guide will navigate you through the process of installing and configuring the Product API feature in Spryker OS.
last_updated: Apr 27, 2020
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v4/docs/glue-api-products-feature-integration
originalArticleId: 59c96846-3dd7-4d2d-a269-fc8117892a19
redirect_from:
  - /v4/docs/glue-api-products-feature-integration
  - /v4/docs/en/glue-api-products-feature-integration
---

## Install Feature API

### Prerequisites

To start feature integration, overview and install the necessary features:

| Name | Version | Integration guide |
| --- | --- | --- |
| Spryker Core | 202001.0 | Feature API |
| Product | 202001.0 |  |
| Price | 202001.0 |  |

### 1) Install the required modules using Composer

Run the following command(s) to install the required modules:

```bash
composer require spryker/products-rest-api:"^2.4.1" spryker/product-image-sets-rest-api:"^1.0.3" spryker/product-prices-rest-api:"^1.1.0" spryker/products-categories-resource-relationship:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox “Verification” %}

Make sure that the following modules were installed:

| Module | Expected Directory |
| --- | --- |
| `ProductsRestApi` | `vendor/spryker/products-rest-api` |
| `ProductsRestApiExtension` | `vendor/spryker/products-rest-api-extension` |
| `ProductImageSetsRestApi` | `vendor/spryker/product-image-sets-rest-api` |
| `ProductPricesRestApi` | `vendor/spryker/product-prices-rest-api` |
| `ProductsCategoriesResourceRelationship` | `vendor/spryker/products-categories-resource-relationship` |

{% endinfo_block %}

### 2) Set up Database Schema and Transfer Objects

Run the following commands to apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox “Verification” %}

Make sure that the following changes have been applied in transfer objects:

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `AbstractProductsRestAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/AbstractProductsRestAttributesTransfer` |
| `ConcreteProductsRestAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/ConcreteProductsRestAttributesTransfer` |
| `RestProductImageSetsAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestProductImageSetsAttributesTransfer` |
| `RestProductImageSetTransfer` | class | created | `src/Generated/Shared/Transfer/RestProductImageSetTransfer` |
| `RestImagesAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestImagesAttributesTransfer` |
| `RestProductPriceAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestProductPriceAttributesTransfer` |
| `RestProductPricesAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestProductPricesAttributesTransfer` |
| `RestCurrencyTransfer` | class | created | `src/Generated/Shared/Transfer/RestCurrencyTransfer` |

{% endinfo_block %}

{% info_block warningBox “Verification” %}

Make sure that `SpyProductAbstractStorage` and `SpyProductConcreteStorage` are extended by synchronization behavior with these methods:

| Entity | Type | Event | Path | Methods |
| --- | --- | --- | --- | --- |
| `SpyProductAbstractStorage` | class | extended | `src/Orm/Zed/ProductStorage/Persistence/Base/SpyProductAbstractStorage` | `syncPublishedMessageForMappings()`,<br>`syncUnpublishedMessageForMappings()` |
| `SpyProductConcreteStorage` | class | extended | `src/Orm/Zed/ProductStorage/Persistence/Base/SpyProductConcreteStorage` | `syncPublishedMessageForMappings()`,<br>`syncUnpublishedMessageForMappings()` |

{% endinfo_block %}

### 3) Set up Behavior

#### Reload Data to Storage

Run the following commands to reload abstract and product data to storage.

```bash
console event:trigger -r product_abstract
console event:trigger -r product_concrete
```

{% info_block warningBox “Verification” %}

Make sure that there is data in Redis with keys:

- `kv:product_abstract:{% raw %}{{{% endraw %}store_name{% raw %}}}{% endraw %}:{% raw %}{{{% endraw %}locale_name{% raw %}}}{% endraw %}:sku:{% raw %}{{{% endraw %}sku_product_abstract{% raw %}}}{% endraw %}`

- `kv:product_concrete:{% raw %}{{{% endraw %}locale_name{% raw %}}}{% endraw %}:sku:{% raw %}{{{% endraw %}sku_product_concrete{% raw %}}}{% endraw %}`

{% endinfo_block %}

#### Enable resources
Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `AbstractProductsResourceRoutePlugin` | Registers the abstract product resource. | None | `Spryker\Glue\ProductsRestApi\Plugin` |
| `ConcreteProductsResourceRoutePlugin` | Registers the concrete product resource. | None | `Spryker\Glue\ProductsRestApi\Plugin` |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\ProductsRestApi\Plugin\AbstractProductsResourceRoutePlugin;
use Spryker\Glue\ProductsRestApi\Plugin\ConcreteProductsResourceRoutePlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
	/**
	* @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
	*/
	protected function getResourceRoutePlugins(): array
	{
		return [
			new AbstractProductsResourceRoutePlugin(),
			new ConcreteProductsResourceRoutePlugin(),
		];
	}
}
```

{% info_block warningBox “Verification” %}

Make sure that the following endpoints are available:
- http://glue.mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %} 
- http://glue.mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}
- 
{% endinfo_block %}

#### Enable resources and relationships

Activate the following plugin:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `AbstractProductImageSetsRoutePlugin` | Registers the abstract product image sets resource. | None | `Spryker\Glue\ProductImageSetsRestApi\Plugin` |
| `ConcreteProductImageSetsRoutePlugin` | Registers the concrete product image sets resource. | None | `Spryker\Glue\ProductImageSetsRestApi\Plugin` |
| `AbstractProductsProductImageSetsResourceRelationshipPlugin` | Adds the abstract product image sets resource as a relationship to the abstract product resource. | None | `Spryker\Glue\ProductImageSetsRestApi\Plugin\Relationship` |
| `ConcreteProductsProductImageSetsResourceRelationshipPlugin` | Adds the concrete product image sets resource as a relationship to the concrete product resource. | None | `Spryker\Glue\ProductImageSetsRestApi\Plugin\Relationship` |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
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

{% info_block warningBox “Verification” %}

Make sure that the following endpoints are available:
- http://glue.mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}/abstract-product-image-sets
- http://glue.mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}/concrete-product-image-sets

Send a request to "http://glue.mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}?include=abstract-product-image-sets". An abstract product with a given SKU should have at least one image set. Make sure that the response includes relationships to the `abstract-product-image-sets` resources.
Send a request to "http://glue.mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}?include=abstract-product-image-sets". A concrete product with a given SKU should have at least one image set. Make sure that the response includes relationships to the "concrete-product-image-sets" resources.

{% endinfo_block %}

#### Enable resources and relationships

Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `AbstractProductPricesRoutePlugin` | Registers the abstract product prices resource. | None | `Spryker\Glue\ProductPricesRestApi\Plugin` |
| `ConcreteProductPricesRoutePlugin` | Registers the concrete product prices resource. | None | `Spryker\Glue\ProductPricesRestApi\Plugin` |
| `AbstractProductPricesByResourceIdResourceRelationshipPlugin` | Adds the abstract product prices resource as a relationship to the abstract product resource. | None | `Spryker\Glue\ProductPricesRestApi\Plugin\GlueApplication` |
| `ConcreteProductPricesByResourceIdResourceRelationshipPlugin` | `Adds the concrete product prices resource as a relationship to the concrete product resource.` | None | `Spryker\Glue\ProductPricesRestApi\Plugin\GlueApplication` |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\ProductPricesRestApi\Plugin\AbstractProductPricesRoutePlugin;
use Spryker\Glue\ProductPricesRestApi\Plugin\ConcreteProductPricesRoutePlugin;
use Spryker\Glue\ProductPricesRestApi\Plugin\GlueApplication\AbstractProductPricesByResourceIdResourceRelationshipPlugin;
use Spryker\Glue\ProductPricesRestApi\Plugin\GlueApplication\ConcreteProductPricesByResourceIdResourceRelationshipPlugin;
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
			new AbstractProductPricesByResourceIdResourceRelationshipPlugin()
		);
		$resourceRelationshipCollection->addRelationship(
			ProductsRestApiConfig::RESOURCE_CONCRETE_PRODUCTS,
			new ConcreteProductPricesByResourceIdResourceRelationshipPlugin()
		);

		return $resourceRelationshipCollection;
	}
}
```

{% info_block warningBox “Verification” %}

Make sure that the following endpoints are available:
- http://glue.mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}/abstract-product-prices
- http://glue.mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}/concrete-product-prices

Send a request to "http://glue.mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}?include=abstract-product-prices". Make sure that the response includes relationships to the `abstract-product-prices` resources.

Make a request to "http://glue.mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}?include=concrete-product-prices". Make sure that the response includes relationships to the `concrete-product-prices` resources.

{% endinfo_block %}

#### Enable resources and relationships

Activate the following plugin:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `AbstractProductsCategoriesResourceRelationshipPlugin` | Adds the categories resource as a relationship to the abstract product. | None | `Spryker\Glue\ProductsCategoriesResourceRelationship\Plugin` |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\ProductsCategoriesResourceRelationship\Plugin\AbstractProductsCategoriesResourceRelationshipPlugin;
use Spryker\Glue\ProductsRestApi\ProductsRestApiConfig;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
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
			new AbstractProductsCategoriesResourceRelationshipPlugin()
		);

		return $resourceRelationshipCollection;
	}
}
```

{% info_block warningBox “Verification” %}

Send a request to http://glue.mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}?include=category-nodes.

Make sure that the response contains `category-nodes` as a relationship and `category-nodes` data included.

Example:

```json
{  
	"data":{  
		"type":"abstract-products",
		"id":"001",
		"attributes":{  
			...
		},
		"links":{  
			"self":"http://glue.mysprykershop.com/abstract-products/001"
		},
		"relationships":{  
			"category-nodes":{  
				"data":[  
					{  
						"type":"category-nodes",
						"id":"4"
					},
					{  
						"type":"category-nodes",
						"id":"2"
					}
				]
			}
		}
	},
	"included":[  
		{  
			"type":"category-nodes",
			"id":"4",
			"attributes":{  
				...
			},
			"links":{  
				"self":"http://glue.mysprykershop.com/category-nodes/4"
			}
		},
		{  
			"type":"category-nodes",
			"id":"2",
			"attributes":{  
				...
			},
			"links":{  
				"self":"http://glue.mysprykershop.com/category-nodes/2"
			}
		}
	]
}
```

{% endinfo_block %}
