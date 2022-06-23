---
title: Alternative products + Inventory Management feature integration
description: The guide walks you through the process of installing the Alternative products and Inventory features into the project.
last_updated: Dec 3, 2020
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v6/docs/alternative-products-inventory-management-feature-integration
originalArticleId: 4d64d6c0-2fc0-4916-94ec-c72b71c06a7a
redirect_from:
  - /v6/docs/alternative-products-inventory-management-feature-integration
  - /v6/docs/en/alternative-products-inventory-management-feature-integration
---

## Install Feature Core
### Prerequisites
To start feature integration, review and install the necessary features:
|Name|Version|
|---|---|
|Alternative Products|202009.0|
|Inventory Management|202009.0|

### 1) Set up Behavior
Enable the following behaviors by registering the plugins:
|Plugin|Specification|Prerequisites|Namespace|
|---|---|---|---|
|`AvailabilityCheckAlternativeProductApplicablePlugin`|Checks if product alternatives should be shown for the product.|None|`Spryker\Zed\Availability\Communication\Plugin\ProductAlternative`|
|`AvailabilityCheckAlternativeProductApplicablePlugin`|Checks if product alternatives should be shown for the product.|Expects SKU and `IdProductAbstract` to be set for the ProductViewTransfer.|`Spryker\Client\AvailabilityStorage\Plugin\ProductAlternativeStorage`|

**src/Pyz/Client/ProductAlternativeStorage/ProductAlternativeStorageDependencyProvider.php**

```php
<?php
 
namespace Pyz\Client\ProductAlternativeStorage;
 
use Spryker\Client\AvailabilityStorage\Plugin\ProductAlternativeStorage\AvailabilityCheckAlternativeProductApplicablePlugin;
use Spryker\Client\ProductAlternativeStorage\ProductAlternativeStorageDependencyProvider as SprykerProductAlternativeStorageDependencyProvider;
 
class ProductAlternativeStorageDependencyProvider extends SprykerProductAlternativeStorageDependencyProvider
{
	/**
	 * @return \Spryker\Client\ProductAlternativeStorageExtension\Dependency\Plugin\AlternativeProductApplicablePluginInterface[]
	 */
	protected function getAlternativeProductApplicableCheckPlugins(): array
	{
		return [
			new AvailabilityCheckAlternativeProductApplicablePlugin(),
		];
	}
}
```

**src/Pyz/Zed/ProductAlternative/ProductAlternativeDependencyProvider.php**

```php
<?php
 
namespace Pyz\Zed\ProductAlternative;
 
use Spryker\Zed\Availability\Communication\Plugin\ProductAlternative\AvailabilityCheckAlternativeProductApplicablePlugin;
use Spryker\Zed\ProductAlternative\ProductAlternativeDependencyProvider as SprykerProductAlternativeDependencyProvider;
 
class ProductAlternativeDependencyProvider extends SprykerProductAlternativeDependencyProvider
{
	/**
	 * @return \Spryker\Zed\ProductAlternativeExtension\Dependency\Plugin\AlternativeProductApplicablePluginInterface[]
	 */
	protected function getAlternativeProductApplicablePlugins(): array
	{
		return [
			new AvailabilityCheckAlternativeProductApplicablePlugin(),
		];
	}
}
```

{% info_block infoBox "Verification" %}
Make sure that you can see alternatives for not available products on the product detail page.
{% endinfo_block %}
