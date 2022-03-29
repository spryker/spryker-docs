---
title: Alternative Products + Wishlist feature integration
description: The guide walks you through the process of installing the Alternative products and Wishlist features into the project.
last_updated: Mar 5, 2020
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v4/docs/alternative-products-wishlist-feature-integration
originalArticleId: 985b3208-20f9-45e8-acbb-6f6326c858e1
redirect_from:
  - /v4/docs/alternative-products-wishlist-feature-integration
  - /v4/docs/en/alternative-products-wishlist-feature-integration
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
**src/data/import/glossary.csv**

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

src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php

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

Run the following command to enable Javascript and CSS changes:

```bash
console frontend:yves:build
```
{% info_block warningBox "Verification" %}
Make sure that the following widgets were registered:<table><thead><tr><td>Module</td><td>Test</td></tr></thead><tbody><tr><td>`WishlistProductAlternativeWidget`</td><td>Assign some alternative products in Zed, and make sure that they are displayed on the wishlist page of the product to which they were assigned.</td></tr></tbody></table>
{% endinfo_block %}
