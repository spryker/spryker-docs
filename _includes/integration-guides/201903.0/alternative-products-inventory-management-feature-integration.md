---
title: Alternative Products + Inventory Management feature integration
description: The guide walks you through the process of installing the Alternative products and Inventory features into the project
last_updated: Nov 22, 2019
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v2/docs/alternative-products-inventory-management-feature-integration
originalArticleId: deebd095-82e1-4a10-a320-d2d513b92f74
redirect_from:
  - /v2/docs/alternative-products-inventory-management-feature-integration
  - /v2/docs/en/alternative-products-inventory-management-feature-integration
---

## Install Feature Core
### Prerequisites
To start feature integration, review and install the necessary features:
|Name|Version|
|---|---|
|Alternative Products|201903.0|
|Inventory Management|201903.0|

### 1) Set up Behavior
Enable the following behaviors by registering the plugins:
|Plugin|Specification|Prerequisites|Namespace|
|---|---|---|---|
|`AvailabilityCheckAlternativeProductApplicablePlugin`|Checks if product alternatives should be shown for the product.|None|`Spryker\Zed\Availability\Communication\Plugin\ProductAlternative`|
|`AvailabilityCheckAlternativeProductApplicablePlugin`|Checks if product alternatives should be shown for the product.|Expects SKU and `IdProductAbstract` to be set for the ProductViewTransfer.|`Spryker\Client\AvailabilityStorage\Plugin\ProductAlternativeStorage`|

<details open>
<summary markdown='span'>src/Pyz/Client/ProductAlternativeStorage/ProductAlternativeStorageDependencyProvider.php</summary>

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
<br>
</details>

<details open>
<summary markdown='span'>src/Pyz/Zed/ProductAlternative/ProductAlternativeDependencyProvider.php</summary>

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
<br>
</details>

{% info_block infoBox "Verification" %}
Make sure that you can see alternatives for not available products on the product detail page.
{% endinfo_block %}

<!-- Last review date: Mar. 22nd, 2019 by  Karoly Gerner, Oksana Karasyova-->
