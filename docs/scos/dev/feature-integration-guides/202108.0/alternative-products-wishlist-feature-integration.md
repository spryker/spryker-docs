---
title: Alternative products + Wishlist feature integration
description: The guide walks you through the process of installing the Alternative products and Wishlist features into the project.
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/alternative-products-wishlist-feature-integration
originalArticleId: 753cb57b-3b63-4fa1-b40c-a1950802ca9c
redirect_from:
  - /2021080/docs/alternative-products-wishlist-feature-integration
  - /2021080/docs/en/alternative-products-wishlist-feature-integration
  - /docs/alternative-products-wishlist-feature-integration
  - /docs/en/alternative-products-wishlist-feature-integration
---

## Install feature frontend

### Prerequisites

To start feature integration, review and install the necessary features:

|NAME|VERSION|
|---|---|
|Alternative Products|{{page.version}}|
|Wishlist|{{page.version}}|

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

### 2) Set up widgets

Register the following plugins to enable widgets:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
|WishlistProductAlternativeWidget|Displays a list of alternative products on wishlist page.|None|SprykerShop\Yves\ProductAlternativeWidget\Widget|

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

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

Make sure that the following widgets were registered:

| MODULE | TEST |
| --- | --- |
| WishlistProductAlternativeWidget | Assign some alternative products in Zed, and make sure that they are displayed on the wishlist page of the product to which they were assigned. |

{% endinfo_block %}
