---
title: Shopping Lists + Product Options Feature Integration
originalLink: https://documentation.spryker.com/v1/docs/shopping-lists-product-options-feature-integration-2018-11
redirect_from:
  - /v1/docs/shopping-lists-product-options-feature-integration-2018-11
  - /v1/docs/en/shopping-lists-product-options-feature-integration-2018-11
---

## Install Feature Core
### Prerequisites
To start feature integration, review and install the necessary features.
|Name|Version|
|---|---|
|Product Options|2018.11.0|
|Shopping Lists|2018.11.0|
### 1) Install the Required Modules by Using Composer
#### Implementation
Run the following command to install the required modules:
```bash
composer require spryker-feature/shopping-list-product-option-connector:"^1.0.0" --update-with-dependencies
```
#### Verification
Verify if the following modules were installed:
|Module|Expected Directory|
|---|---|
|`ShoppingListProductOptionConnector`|`vendor/spryker/shopping-list-product-option-connector`|
### 2) Set up the Database Schema and Transfer Objects
#### Implementation
Run the following commands to apply database changes and generate entity and transfer changes:
```yaml
console transfer:generate
console propel:install
console transfer:generate
```
#### Verification
Make sure that the following changes are applied by checking your database:
|Module|Type|Event|
|---|---|---|
|`spy_shopping_list_product_option`|`table`|`created`|
Make sure that the following changes are applied in transfer objects:
|Module|Type|Event|Path|
|---|---|---|---|
|`ProductOption`|`class`|`created`|`src/Generated/Shared/Transfer/ProductOptionTransfer`|
|`ProductOptionCriteria`|`class`|`created`|`src/Generated/Shared/Transfer/ProductOptionCriteriaTransfer`|
|`ProductOptionCollection`|`class`|`created`|`src/Generated/Shared/Transfer/ProductOptionCollectionTransfer`|
|`ProductOptionValueStorage`|`class`|`created`|`src/Generated/Shared/Transfer/ProductOptionValueStorageTransfer`|
|`ShoppingListItem`|`class`|`created`|`src/Generated/Shared/Transfer/ShoppingListItemTransfer`|
### 3) Set up Behavior
#### Implementation
Enable the following behavior be registering the plugins:
|Plugin|Specification|Prerequisites|Namespaces|
|---|---|---|---|
|`ShoppingListItemProductOptionRequestMapperPlugin`|Provides the ability to map product options from request parameters to `ShoppingListItemTransfer`.|None|S`pryker\Client\ShoppingListProductOptionConnector\ShoppingList`|
|`ProductOptionQuoteItemToItemMapperPlugin`|Provides the ability to map an item product option to a shopping list item product option when transferring items from a shopping list to a cart.|None|`Spryker\Client\ShoppingListProductOptionConnector\ShoppingList`|
|`ShoppingListItemProductOptionToItemProductOptionMapperPlugin`|Provides the ability to map a shopping list item product option to an item product option when transferring items from a shopping list to a cart.|None|`Spryker\Client\ShoppingListProductOptionConnector\ShoppingList`|

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

#### Verification
Add an item with a product option to a shopping list, make sure that the corresponding table row has been created in `spy_shopping_list_product_option`.
Make sure that when creating a cart from a shopping list, the product options are transferred to cart. The other way around should also work, having a cart with an item with product options in it, when creating a shopping list out of should contain the selected product options.

## Install Feature Frontend
### Prerequisites
Please review  and install the necessary features before beginning the integration step.
|Name|Version|
|---|---|
|Spryker Core| 2018.11.0|
|Product Options|2018.11.0|
### 1) Add Translations
#### Implemenation
Append glossary according to your configuration:
<details open>
<summary>src/data/import/glossary.csv</summary>

```yaml
customer.account.shopping_list.remove_all,Remove all,en_US
customer.account.shopping_list.remove_all,Alles entfernen,de_D
```
</br>
</details>

Run the following console command to import data:
```yaml
console data:import glossary
```
#### Verification

Make sure that in the database the configured data are added to the `spy_glossary` table.

### 2) Set up Behavior
Enable the following behaviors by registering the plugins:
|Plugin|Specification|Prerequisites|Namespaces|
|---|---|---|---|
|`ShoppingListItemProductOptionFormExpanderPlugin`|Provides the ability to have the ability to product option form elements to shopping list item form.|None|`SprykerShop\Yves\ProductOptionWidget\Plugin\ShoppingListPage`|
|`ShoppingListItemProductOptionToItemProductOptionMapperPlugin`|Provides the ability to populate the shopping list with product option data.|None|`SprykerShop\Yves\ProductOptionWidget\Plugin\ShoppingListPage`|
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

#### Verification
Make sure that items with product options attached to them in shopping list have the dropdown menu of product options next to them. Also make sure that the saved product option is the one that is saved on page reload.

### 3) Set up Widgets
#### Implementation
Register the following plugins to enable widgets:
|Plugin|Specification|Prerequisites|Namespaces|
|---|---|---|---|
|`ShoppingListItemProductOptionWidgetPlugin`|Shows a drop-down of product options when showing a shopping list item with the selected product option as the selected one.|None|`SprykerShop\Yves\ProductOptionWidget\Plugin\ShoppingListPage`|

<details open>
<summary>Yves/ShoppingListPage/ShoppingListPageDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Yves\ShoppingListPage;
 
use SprykerShop\Yves\ProductOptionWidget\Plugin\ShoppingListPage\ShoppingListItemProductOptionWidgetPlugin;
use SprykerShop\Yves\ShoppingListPage\ShoppingListPageDependencyProvider as SprykerShoppingListPageDependencyProvider;
 
class ShoppingListPageDependencyProvider extends SprykerShoppingListPageDependencyProvider
{
 
	/**
	 * @return string[]
	 */
	protected function getShoppingListViewWidgetPlugins(): array
	{
		return [
			ShoppingListItemProductOptionWidgetPlugin::class,
		];
	}
}
```
</br>
</details>

Run the following console command to import data:
```yaml
console frontend:yves:build
```
#### Verification
Make sure that the following changes are applied by checking your database:
|Module|Test|
|---|---|
|`ShoppingListItemProductOptionWidgetPlugin`|Go to the shopping list page and check a product added to it with product options|

