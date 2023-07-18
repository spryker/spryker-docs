---
title: What's changed in Shopping List and Wishlist
last_updated: Aug 2, 2022
description: This document lists all the Shopping List and Wishlist releases
template: concept-topic-template
---

## April 20th, 2022

This release contains one module, [ShoppingList](https://github.com/spryker/shopping-list/releases/tag/4.9.0).

[Public release details](https://api.release.spryker.com/release-group/4069)


### Fixes

Adjusted `ShoppingListClient::createShoppingList()` to remove outdated shopping lists collection from session.
Adjusted `ShoppingListClient::updateShoppingList()` to remove outdated shopping lists collection from session.
Adjusted `ShoppingListClient::removeShoppingList()` to remove outdated shopping lists collection from session.
Adjusted `ShoppingListClient::clearShoppingList()` to remove outdated shopping lists collection from session.
Adjusted `ShoppingListClient::addShoppingListItem()` to remove outdated shopping lists collection from session.
Adjusted `ShoppingListClient::addItems()` to remove outdated shopping lists collection from session.
Adjusted `ShoppingListClient::removeItemById()` to remove outdated shopping lists collection from session.
Adjusted `ShoppingListClient::createShoppingListFromQuote()` to remove outdated shopping lists collection from session.

### Adjustments

Added `Session` module to dependencies.


## April 20th, 2022

This release contains one module, [ShoppingList](https://github.com/spryker/shopping-list/releases/tag/2.8.0).

[Public release details](https://api.release.spryker.com/release-group/4069)


### Fixes

Adjusted `ShoppingListClient::createShoppingList()` to remove outdated shopping lists collection from session.
Adjusted `ShoppingListClient::updateShoppingList()` to remove outdated shopping lists collection from session.
Adjusted `ShoppingListClient::removeShoppingList()` to remove outdated shopping lists collection from session.
Adjusted `ShoppingListClient::clearShoppingList()` to remove outdated shopping lists collection from session.
Adjusted `ShoppingListClient::addItem()` to remove outdated shopping lists collection from session.
Adjusted `ShoppingListClient::addItems()` to remove outdated shopping lists collection from session.
Adjusted `ShoppingListClient::removeItemById()` to remove outdated shopping lists collection from session.
Adjusted `ShoppingListClient::createShoppingListFromQuote()` to remove outdated shopping lists collection from session.

### Adjustments

Added `Session` module to dependencies.

## Apr 18th, 2022

This release contains one module, [ShoppingListStorage](https://github.com/spryker/shopping-list/releases/tag/4.8.0).

[Public release details](https://api.release.spryker.com/release-group/2084)


### Fixes

Removed deprecated usage of `DatabaseTransactionHandlerTrait::preventTransaction()`.

## Mar 14th, 2022

This release contains one module, [ShoppingList](https://github.com/spryker/shopping-list/releases/tag/4.8.0).

[Public release details](https://api.release.spryker.com/release-group/3972)


### Improvements

* Introduced `ShoppingListItemProductConcreteHasValidStoreAddItemPreCheckPlugin` to validate that product in shopping list belongs to current store.
* Introduced `ShoppingListFacade::checkShoppingListItemProductHasValidStore()` facade method to validate that product in shopping list belongs to current store.
* Introduced `StoreRelation` transfer object.
* Introduced `Store` transfer object.
* Introduced `ProductAbstract` transfer object.
* Added `Store` module to dependencies.
* Added `ProductFacadeInterface::getProductConcrete()` to dependencies.
* Added `ProductFacadeInterface::findProductAbstractById()` to dependencies.
* Added `StoreFacadeInterface` to dependencies.
