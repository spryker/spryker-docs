

## Install feature frontend

### Prerequisites

Install the required features:

| NAME | VERSION |
|---|---|
|Quick Order| {{page.version}} |
|Shopping Lists| {{page.version}} |

### 1) Set up widgets

Register the following global widget:

| WIDGET | DESCRIPTION | NAMESPACE |
|---|---|---|
|AddItemsToShoppingListWidget|Adds another submit button and a drop-down list with the shopping lists available for the logged-in customer. Note: You don't need it if you don't use Shopping List functionality or just don't want it to be displayed on the Quick Order page.|SprykerShop\Yves\ShoppingListWidget\Widget|

**src\Pyz\Yves\ShopApplication\ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
use SprykerShop\Yves\ShoppingListWidget\Widget\AddItemsToShoppingListWidget;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
	/**
	 * @return string[]
	 */
	protected function getGlobalWidgets(): array
	{
		return [
			AddItemsToShoppingListWidget::class,
		];
	}
}		
```

{% info_block warningBox "Verification" %}

Make sure that the following elements are available on the **Quick Order** page for logged-in customers `https://mysprykershop.com/quick-order`:
* **Submit** button under the form called *Add to shopping list*
* **Drop-down box** containing shopping list names.

{% endinfo_block %}

### 2) Set up behavior

#### Set up the additional functionality

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
|ShoppingListQuickOrderFormHandlerStrategyPlugin|Send items to Shopping list instead of Cart if **Add to shopping list** has been selected.|None|SprykerShop\Yves\ShoppingListWidget\Plugin\QuickOrderPage|

**src/Pyz/Yves/QuickOrderPage/QuickOrderPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\QuickOrderPage;

use SprykerShop\Yves\QuickOrderPage\QuickOrderPageDependencyProvider as SprykerQuickOrderPageDependencyProvider;
use SprykerShop\Yves\ShoppingListWidget\Plugin\QuickOrderPage\ShoppingListQuickOrderFormHandlerStrategyPlugin;

class QuickOrderPageDependencyProvider extends SprykerQuickOrderPageDependencyProvider
{
	/**
	* @return \SprykerShop\Yves\QuickOrderPageExtension\Dependency\Plugin\QuickOrderFormHandlerStrategyPluginInterface[]
	*/
	protected function getQuickOrderFormHandlerStrategyPlugins(): array
	{
		return [
			new ShoppingListQuickOrderFormHandlerStrategyPlugin(), #ShoppingListFeature
		];
	}
}
```

{% info_block warningBox "Verification" %}

Make the following checks at `https://mysprykershop.com/quick-order`: `ShoppingListQuickOrderFormHandlerStrategyPlugin` takes care about storing quick order as a shopping list. Click **Add To Shopping List** on the **Quick Order** page and check if products were successfully added to the shopping list.

{% endinfo_block %}
