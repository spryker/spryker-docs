


This document describes how to install the Alternative Products + Wishlist feature.

## Install feature frontend

Follow the steps below to install the Alternative Products + Wishlist feature frontend.


### Prerequisites

To start feature integration, integrate the required features and Glue APIs:

| NAME | VERSION | INSTALLATION GUIDE|
|---|---|---|
|Alternative Products| 202507.0 | [Install the Alternative Products feature](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-alternative-products-feature.html)|
|Wishlist| 202507.0 | |

### 1) Add translations

Append glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
product_alternative_widget.add_to_wishlist,Add to Wishlist,en_US
product_alternative_widget.add_to_wishlist,Zur Wunschliste hinzufügen,de_DE
```

Import data:

```yaml
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data are added to the `spy_glossary` table.

{% endinfo_block %}

### 2) Set up widgets

To enable widgets, register the following plugins:

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

Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Make sure the following widgets were registered:

| MODULE | TEST |
| --- | --- |
| WishlistProductAlternativeWidget | Assign some alternative products in Zed, and make sure that they are displayed on the wishlist page of the product to which they were assigned. |

{% endinfo_block %}
