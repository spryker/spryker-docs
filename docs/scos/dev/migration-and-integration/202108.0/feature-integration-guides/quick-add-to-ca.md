---
title: Quick Add to Cart + Shopping Lists feature integration
originalLink: https://documentation.spryker.com/2021080/docs/quick-add-to-cart-shopping-lists-feature-integration
redirect_from:
  - /2021080/docs/quick-add-to-cart-shopping-lists-feature-integration
  - /2021080/docs/en/quick-add-to-cart-shopping-lists-feature-integration
---

## Install Feature Frontend
### Prerequisites

To start feature integration, overview and install the necessary features:
|Name |	Version|
|---|---|
|Quick Order|master|
|Shopping Lists|master|

### 1) Set up Widgets

Register the following global widget:

|Widget|Description|Namespace|
|---|---|---|
|`AddItemsToShoppingListWidget`|Adds another submit button and a drop-down list with the shopping lists available for the logged-in customer. Note: You don't need it if you don't use Shopping List functionality or just don't want it to be displayed on the Quick Order page.|`SprykerShop\Yves\ShoppingListWidget\Widget`|

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
Make sure that the following elements are available on the **Quick Order** page for logged-in customers (`https://mysprykershop.com/quick-order`
{% endinfo_block %}:<ul><li>**Submit** button under the form called *Add to shopping list*</li><li>**Drop-down box** containing shopping list names.</li></ul>)

### 2) Set up Behavior

#### Set up the Additional Functionality

Enable the following behaviors by registering the plugins:

|Plugin|Specification|Prerequisites|Namespace|
|---|---|---|---|
|`ShoppingListQuickOrderFormHandlerStrategyPlugin`|Send items to Shopping list instead of Cart if **Add to shopping list** has been selected.|None|`SprykerShop\Yves\ShoppingListWidget\Plugin\QuickOrderPage`|

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
