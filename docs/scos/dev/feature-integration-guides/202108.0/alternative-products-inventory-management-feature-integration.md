---
title: Alternative products + Inventory Management feature integration
description: The guide walks you through the process of installing the Alternative products and Inventory features into the project.
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/alternative-products-inventory-management-feature-integration
originalArticleId: 5bb30c5b-4912-4a16-be29-46f68ef0e0c7
redirect_from:
  - /2021080/docs/alternative-products-inventory-management-feature-integration
  - /2021080/docs/en/alternative-products-inventory-management-feature-integration
  - /docs/alternative-products-inventory-management-feature-integration
  - /docs/en/alternative-products-inventory-management-feature-integration
---

## Install feature core

### Prerequisites
To start feature integration, review and install the necessary features:

| NAME | VERSION |
|---|---|
|Alternative Products|{{page.version}}|
|Inventory Management|{{page.version}}|

### 1) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
|AvailabilityCheckAlternativeProductApplicablePlugin|Checks if product alternatives should be shown for the product.|None|`Spryker\Zed\Availability\Communication\Plugin\ProductAlternative|
|AvailabilityCheckAlternativeProductApplicablePlugin|Checks if product alternatives should be shown for the product.|Expects SKU and `IdProductAbstract` to be set for the ProductViewTransfer.|Spryker\Client\AvailabilityStorage\Plugin\ProductAlternativeStorage|

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

{% info_block warningBox “Verification” %}
Make sure that you can see alternatives for not available products on the product detail page.
{% endinfo_block %}
