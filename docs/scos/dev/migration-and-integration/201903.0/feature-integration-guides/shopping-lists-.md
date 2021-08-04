---
title: Shopping Lists- Product Options Feature Integration
originalLink: https://documentation.spryker.com/v2/docs/shopping-lists-product-options-feature-integration
redirect_from:
  - /v2/docs/shopping-lists-product-options-feature-integration
  - /v2/docs/en/shopping-lists-product-options-feature-integration
---

## Install Feature Core
### Prerequisites
To start feature integration, review ad install the necessary features.
|Name|Version|
|---|---|
|Product Options|201903.0|
|Shopping Lists|201903.0|

### 1) Install the Required Modules by Using Composer
Run the following command to install the required modules:
```bash
composer require spryker-feature/shopping-list-product-option-connector:"^1.0.0" --update-with-dependencies
```
{% info_block infoBox "Verification" %}
Verify that the following modules were installed:
{% endinfo_block %}
|Module|Expected Directory|
|---|---|
|`ShoppingListProductOptionConnector`|`vendor/spryker/shopping-list-product-option-connector`|

### 2) Set up the Database Schema and Transfer Objects
Run the following commands to apply database changes and generate entity and transfer changes:
```yaml
console transfer:generate
console propel:install
console transfer:generate
```

**Verification**
{% info_block infoBox %}
Make sure that the following changes are applied by checking your database:
{% endinfo_block %}
|Module|Type|Event|
|---|---|---|
|`spy_shopping_list_product_option`|table|created|
{% info_block infoBox %}
Make sure that the following changes are applied in transfer objects:
{% endinfo_block %}
|Module|Type|Event|Path|
|---|---|---|---|
|`ProductOption`|class|created|`src/Generated/Shared/Transfer/ProductOptionTransfer`|
|`ProductOptionCriteria`|class|created|`src/Generated/Shared/Transfer/ProductOptionCriteriaTransfer`|
|`ProductOptionCollection`|class|created|`src/Generated/Shared/Transfer/ProductOptionCollectionTransfer`|
|`ProductOptionValueStorage`|class|created|`src/Generated/Shared/Transfer/ProductOptionValueStorageTransfer`|
|`ShoppingListItem`|class|created|`src/Generated/Shared/Transfer/ShoppingListItemTransfer`|


### 3) Set up Behavior

Enable the following behaviors by registering the plugins:
|Plugin|Specification|Prerequisites|Namespaces|
|---|---|---|---|
|`ShoppingListItemProductOptionRequestMapperPlugin`|Provides the ability to map product options from request parameters to `ShoppingListItemTransfer`.|None|`Spryker\Client\ShoppingListProductOptionConnector\ShoppingList`|
|`ProductOptionQuoteItemToItemMapperPlugin`|Provides the ability to map an item product option to a shopping list item product option when transferring items from a shopping list to a cart.|None|                    |`Spryker\Client\ShoppingListProductOptionConnector\ShoppingListShoppingListItem`|
|`ProductOptionToItemProductOptionMapperPlugin`|Provides the ability to map a shopping list item product option to an item product option when transferring items from a shopping list to a cart.|None|`Spryker\Client\ShoppingListProductOptionConnector\ShoppingList`|

<details open>
<summary>src/Pyz/Client/ShoppingList/ShoppingListDependencyProvider.php</summary>
 
```php    
<?php
 
namespace Pyz\Client\ShoppingList;
 
use Spryker\Client\ShoppingList\ShoppingListDependencyProvider as SprykerShoppingListDependencyProvider;
use Spryker\Client\ShoppingListProductOptionConnector\ShoppingList\ProductOptionQuoteItemToItemMapperPlugin;
use Spryker\Client\ShoppingListProductOptionConnector\ShoppingList\ShoppingListItemProductOptionRequestMapperPlugin;
use Spryker\Client\ShoppingListProductOptionConnector\ShoppingList\ShoppingListItemProductOptionToItemProductOptionMapperPlugin;
 
class ShoppingListDependencyProvider extends SprykerShoppingListDependencyProvider
{
	/**
	 * @return \Spryker\Client\ShoppingListExtension\Dependency\Plugin\ShoppingListItemMapperPluginInterface[]
	 */
	protected function getAddItemShoppingListItemMapperPlugins(): array
	{
		return [
			new ShoppingListItemProductOptionRequestMapperPlugin(),
		];
	}
 
	/**
	 * @return \Spryker\Client\ShoppingListExtension\Dependency\Plugin\ShoppingListItemToItemMapperPluginInterface[]
	 */
	protected function getShoppingListItemToItemMapperPlugins(): array
	{
		return [
			new ShoppingListItemProductOptionToItemProductOptionMapperPlugin(),
		];
	}
 
	/**
	 * @return \Spryker\Client\ShoppingListExtension\Dependency\Plugin\QuoteItemToItemMapperPluginInterface[]
	 */
	protected function getQuoteItemToItemMapperPlugins(): array
	{
		return [
			new ProductOptionQuoteItemToItemMapperPlugin(),
		];
	}
}
```
</br>
</details>


{% info_block infoBox "Verification" %}
Add an item with a product option to a shopping list, make sure that the corresponding table row has been created in `spy_shopping_list_product_option`.
{% endinfo_block %}
{% info_block infoBox "Verification" %}
Make sure that when creating a cart from a shopping list, the product options are transferred to cart. The other way around should also work, having a cart with an item with product options in it, when creating a shopping list out of should contain the selected product options.
{% endinfo_block %}

## Install Feature Frontend
### Prerequisites
Please review and install the necessary features before beginning the integration step.
|Name|Version|
|---|---|
|Spryker Core |201903.0|
|Product Options|201903.0|

### 1) Add Translations
Append glossary according to your configuration:
**`src/data/import/glossary.csv`**
```yaml
customer.account.shopping_list.remove_all,Remove all,en_US
customer.account.shopping_list.remove_all,Alles entfernen,de_DE
```
Run the following console command to import data:
```yaml
console data:import glossary
```
{% info_block infoBox "Verification" %}
Make sure that in the database the configured data are added to the `spy_glossary` table.
{% endinfo_block %}

### 2) Set up Behavior

Enable the following behaviors by registering the plugins:
|Plugin|Specification|Prerequisites|Namespace|
|---|---|---|---|
|`ShoppingListItemProductOptionFormExpanderPlugin`|Provides the ability to expand the Shopping List Item Form with a Product Option form elements.|None|`SprykerShop\Yves\ProductOptionWidget\Plugin\ShoppingListPage`|
|`ShoppingListItemProductOptionFormDataProviderMapperPlugin`|Provides the ability to populate the Shopping List Form Item with product option data.|None|`SprykerShop\Yves\ProductOptionWidget\Plugin\ShoppingListPage`|

<details open>
<summary>src/Pyz/Yves/ShoppingListPage/ShoppingListPageDependencyProvider.php</summary>

```php
<?php
 
/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */
 
namespace Pyz\Yves\ShoppingListPage;
 
use SprykerShop\Yves\ProductOptionWidget\Plugin\ShoppingListPage\ShoppingListItemProductOptionFormDataProviderMapperPlugin;
use SprykerShop\Yves\ProductOptionWidget\Plugin\ShoppingListPage\ShoppingListItemProductOptionFormExpanderPlugin;
use SprykerShop\Yves\ShoppingListPage\ShoppingListPageDependencyProvider as SprykerShoppingListPageDependencyProvider;
 
class ShoppingListPageDependencyProvider extends SprykerShoppingListPageDependencyProvider
{
 
	/**
	 * @return \SprykerShop\Yves\ShoppingListPageExtension\Dependency\Plugin\ShoppingListItemFormExpanderPluginInterface[]
	 */
	protected function getShoppingListItemFormExpanderPlugins(): array
	{
		return [
			new ShoppingListItemProductOptionFormExpanderPlugin(),
		];
	}
 
	/**
	 * @return \SprykerShop\Yves\ShoppingListPageExtension\Dependency\Plugin\ShoppingListFormDataProviderMapperPluginInterface[]
	 */
	protected function getShoppingListFormDataProviderMapperPlugins(): array
	{
		return [
			new ShoppingListItemProductOptionFormDataProviderMapperPlugin(),
		];
	}
}
```
</br>
</details>

{% info_block infoBox "Verification" %}
Make sure that items with product options attached to them  have the drop-down menu of product options next to them in shopping list. Also, make sure that the saved product option is the one that is saved on page reload.
{% endinfo_block %}

### 3) Set up Widgets
Run the following command to enable Javascript and CSS changes:
```yaml
console frontend:yves:build
```
{% info_block infoBox "Verification" %}
Make sure that the following UI components were correctly integrated:
{% endinfo_block %}
|Module|Test|
|---|---|
|`ShoppingLisPage`|Add a product with product options to a shopping list, then verify if on shopping list page the product option appears.|

<!--**See also:**

* [Familiarize yourself with Products with Options in Shopping Lists feature](https://documentation.spryker.com/capabilities/shopping_list/products_with_options/product-options-in-shopping_lists.htm) 

