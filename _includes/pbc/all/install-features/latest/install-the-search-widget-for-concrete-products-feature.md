

## Install feature core

### Prerequisites

To start the feature integration, overview and install the necessary features:

| NAME |       REQUIRED |   VERSION |
| --- | --- | --- |
| Cart |       v        |      {{page.version}} |
| Product | v       |{{page.version}} |
| Non-splittable Products |              | 202507.0 |

### 1) Check the installed modules

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | REQUIRED | EXPECTED DIRECTORY |
| --- | --- | --- |
| Cart | v | vendor/spryker/cart |
| Product | v | vendor/spryker/product |
| ProductQuantity |    | vendor/spryker/product-quantity |
| ProductSearchWidget |      | vendor/spryker-shop/product-search-widget |

{% endinfo_block %}

### 2) Set up transfer objects

Apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes are present in the transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| CartChangeTransfer | class | created | src/Generated/Shared/Transfer/CartChangeTransfer |
| ItemTransfer | class | created |src/Generated/Shared/Transfer/ItemTransfer |
| MessageTransfer | class | created | src/Generated/Shared/Transfer/MessageTransfer |

{% endinfo_block %}

### 3) Add translations

Append glossary according to your language configuration:

**src/data/import/glossary.csv**

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

Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data are added to the `spy_glossary` table.

{% endinfo_block %}

### 4) Set up widgets

Enable global widgets:

| WIDGET | DESCRIPTION | NAMESPACE |
| --- | --- | --- |
| ProductConcreteAddWidget | Provides a form with the product concrete search and quantity inputs to add the concrete products to cart. | SprykerShop\Yves\ProductSearchWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

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

{% info_block warningBox "Verification" %}

Make sure the following widgets were registered:

| MODULE | TEST |
| --- | --- |
| ProductConcreteAddWidget | Go to a cart page. You should see the form with the product search widget, quantity input, and add button. |

{% endinfo_block %}

### 5) Set up behavior

#### Adjust concrete product quantity

Add the following plugins to your project:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| CartChangeTransferQuantityNormalizerPlugin | The plugin is responsible for adjusting concrete products quantity and adding notification messages about that. | `ProductQuantity` and `ProductQuantityStorage` modules should be installed. | Spryker\Zed\ProductQuantity\Communication\Plugin\Cart\CartChangeTransferQuantityNormalizerPlugin |

**src/Pyz/Zed/Cart/CartDependencyProvider.php**

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
