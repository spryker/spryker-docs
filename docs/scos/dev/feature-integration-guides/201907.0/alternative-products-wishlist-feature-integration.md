---
title: Alternative Products + Wishlist feature integration
description: The guide walks you through the process of installing the Alternative products and Wishlist features into the project.
last_updated: Dec 24, 2019
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v3/docs/alternative-products-wishlist-feature-integration
originalArticleId: 2a343c21-4174-4f15-9d6d-9035590014b4
redirect_from:
  - /v3/docs/alternative-products-wishlist-feature-integration
  - /v3/docs/en/alternative-products-wishlist-feature-integration
---

## Install Feature Frontend
### Prerequisites
To start feature integration, review and install the necessary features:
|Name|Version|
|---|---|
|Alternative Products|201903.0|
|Wishlist|201903.0|

### 1) Add Translations
Append glossary according to your configuration:
**`src/data/import/glossary.csv`**
```yaml
product_alternative_widget.add_to_wishlist,Add to Wishlist,en_US
product_alternative_widget.add_to_wishlist,Zur Wunschliste hinzufügen,de_DE
```

Run the following console command to import data:
```yaml
console data:import glossary
```
{% info_block warningBox "Verification" %}
Make sure that in the database the configured data are added to the `spy_glossary` table.
{% endinfo_block %}

### 2) Set up Widgets
Register the following plugins to enable widgets:
|Plugin|Description|Prerequisites|Namespace|
|---|---|---|---|
|`WishlistProductAlternativeWidget`|Displays a list of alternative products on wishlist page.|None|`SprykerShop\Yves\ProductAlternativeWidget\Widget`|

<details open>
<summary markdown='span'>src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php</summary>

```php    
<?php
 
namespace Pyz\Yves\ShopApplication;
 
use SprykerShop\Yves\ProductAlternativeWidget\Widget\WishlistProductAlternativeWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
 
class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
	/**
	 * @return string[]
	 */
	protected function getGlobalWidgets(): array
	{
		return [
			WishlistProductAlternativeWidget::class,
		];
	}
}
```
<br>
</details>

Run the following command to enable Javascript and CSS changes:
```
console frontend:yves:build
```
{% info_block warningBox "Verification" %}
Make sure that the following widgets were registered:<table><thead><tr><td>Module</td><td>Test</td></tr></thead><tbody><tr><td>`WishlistProductAlternativeWidget`</td><td>Assign some alternative products in Zed, and make sure that they are displayed on the wishlist page of the product to which they were assigned.</td></tr></tbody></table>
{% endinfo_block %}
