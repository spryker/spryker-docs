---
title: Search Widget for Concrete Products Feature Integration
originalLink: https://documentation.spryker.com/v4/docs/search-widget-for-concrete-products-integration
redirect_from:
  - /v4/docs/search-widget-for-concrete-products-integration
  - /v4/docs/en/search-widget-for-concrete-products-integration
---

## Install Feature Core
### Prerequisites
To start the feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
| Cart | 201903.0 |
| Product | 201903.0 |
| Non-splittable Products (optional) | 201903.0 |

### 1) Check the Installed Modules

<section contenteditable="false" class="warningBox"><div class="content">

**Verification**    
Make sure that the following modules were installed:

| Module | Expected Directory |
| --- | --- |
| `Cart` | `vendor/spryker/cart` |
| `Product` | `vendor/spryker/product` |
| `ProductQuantity` (optional) | `vendor/spryker/product-quantity` |
| `ProductSearchWidget` | `vendor/spryker-shop/product-search-widget` |
</div></section>

### 2) Set up Transfer Objects
Run the following commands to apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
```

<section contenteditable="false" class="warningBox"><div class="content">

**Verification**
Make sure that the following changes are present in the transfer objects:

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `CartChangeTransfer` | class | created | `src/Generated/Shared/Transfer/CartChangeTransfer` |
| `ItemTransfer` | class | created |`src/Generated/Shared/Transfer/ItemTransfer`  |
| `MessageTransfer` | class | created | `src/Generated/Shared/Transfer/MessageTransfer` |
</div></section>

### 3) Add Translations
Append glossary according to your language configuration:

src/data/import/glossary.csv

```yaml
cart.quick_add_to_cart,Schnell zum Warenkorb hinzufügen,de_DE
cart.quick_add_to_cart,Quick add to Cart,en_US
cart.quick_add_to_cart.submit,In den Warenkorb,de_DE
cart.quick_add_to_cart.submit,Add to Cart,en_US
product_quick_add_widget.form.quantity,"# Qty",en_US
product_quick_add_widget.form.quantity,"# Anzahl",de_DE
product_quick_add_widget.form.error.quantity.required,"Quantity must be at least 1",en_US
product_quick_add_widget.form.error.quantity.required,"Die Anzahl muss mindestens 1 sein",de_DE
product_quick_add_widget.form.error.quantity.max_value_constraint,"Provided quantity is too high",en_US
product_quick_add_widget.form.error.quantity.max_value_constraint,"Die Menge ist leider zu groß",de_DE
product_quick_add_widget.form.error.redirect_route_empty,"Redirect router should not be empty",en_US
product_quick_add_widget.form.error.redirect_route_empty,"Redirect Router kann nicht leer sein",de_DE
product_quick_add_widget.form.error.sku.empty,"SKU should not be empty",en_US
product_quick_add_widget.form.error.sku.empty,"SKU kann nicht leer sein",de_DE
product-quantity.notification.quantity.min.failed,The ordered quantity was adjusted to the next possible quantity for the article because minimum quantity is %min%.,en_US
product-quantity.notification.quantity.min.failed,Die bestellte Anzahl erfüllt nicht die Anforderungen für dieses Produkt. Mindestanzahl ist %min%.,de_DE
product-quantity.notification.quantity.max.failed,The ordered quantity was adjusted to the next possible quantity for the article because maximum quantity is %max%.,en_US
product-quantity.notification.quantity.max.failed,Die bestellte Anzahl erfüllt nicht die Anforderungen für dieses Produkt. Maximalanzahl ist %max%.,de_DE
product-quantity.notification.quantity.interval.failed,The ordered quantity was adjusted to the next possible quantity for the article because quantity step is %step%.,en_US
product-quantity.notification.quantity.interval.failed,Die bestellte Anzahl erfüllt nicht die Anforderungen für dieses Produkt. Intervallgröße ist %step%.,de_DE
```
    
Run the following console command to import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}
Make sure that in the database the configured data are added to the `spy_glossary` table.
{% endinfo_block %}

### 4) Set up Widgets
Enable global widgets:

| Widget | Description | Namespace |
| --- | --- | --- |
| `ProductConcreteAddWidget` | Provides a form with the product concrete search and quantity inputs to add the concrete products to cart. | `SprykerShop\Yves\ProductSearchWidget\Widget` |

src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ProductSearchWidget\Widget\ProductConcreteAddWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
	/**
	 * @return string[]
	 */
	protected function getGlobalWidgets(): array
	{
		return [
			ProductConcreteAddWidget::class,
		];
	}
}
```

<section contenteditable="false" class="..."><div class="content">
    
**Verification**
Make sure that the following widgets were registered:

| Module | Test |
| --- | --- |
| `ProductConcreteAddWidget` | Go to a cart page. You should see the form with the product search widget, quantity input, and add button. |
</div></section>

### 5) Set up Behavior
#### Adjust Concrete Product Quantity
Add the following plugins to your project:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `CartChangeTransferQuantityNormalizerPlugin` | The plugin is responsible for adjusting concrete products quantity and adding notification messages about that. | `ProductQuantity` and `ProductQuantityStorage` modules should be installed. | `Spryker\Zed\ProductQuantity\Communication\Plugin\Cart\CartChangeTransferQuantityNormalizerPlugin` |

src/Pyz/Zed/Cart/CartDependencyProvider.php

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\ProductQuantity\Communication\Plugin\Cart\CartChangeTransferQuantityNormalizerPlugin;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
	/**
	 * @param \Spryker\Zed\Kernel\Container $container
	 *
	 * @return \Spryker\Zed\CartExtension\Dependency\Plugin\CartChangeTransferNormalizerPluginInterface[]
	 */
	protected function getCartBeforePreCheckNormalizerPlugins(Container $container): array
	{
		return [
			new CartChangeTransferQuantityNormalizerPlugin(),
		];
	}
}
```
