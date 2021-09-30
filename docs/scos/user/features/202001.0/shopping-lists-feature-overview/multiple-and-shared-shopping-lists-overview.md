---
title: Multiple and Shared Shopping Lists Overview
description: A general overview of the Multiple and shared shopping lists feature.
originalLink: https://documentation.spryker.com/v4/docs/multiple-shared-shopping-lists-overview
originalArticleId: 6f285ce8-0da1-43d1-91a1-886d2e364d06
redirect_from:
  - /v4/docs/multiple-shared-shopping-lists-overview
  - /v4/docs/en/multiple-shared-shopping-lists-overview
  - /v4/docs/multiple-shared-shopping-lists
  - /v4/docs/en/multiple-shared-shopping-lists
  - /v4/docs/printing-shopping-list
  - /v4/docs/en/printing-shopping-list
  - /v4/docs/printing-shopping-list-overview
  - /v4/docs/en/printing-shopping-list-overview
---

A shopping list is a list of the items that shoppers buy or plan to buy frequently or regularly. For example, a consumer can compile a shopping list of the products they purchase every week. Shopping lists allow a buyer to have a quick overview of the products they are planning to buy and the sum of money they are going to spend.

A shopping list is always saved disregarding if a company user logs out and logs in again – the list is still available. Shopping list does not reserve products on stock, so adding an item to the shopping list does not affect item availability. However, a company user can easily convert any shopping list into a shopping cart to proceed with the Checkout.
There are two ways to create a shopping list:

* through a [shopping list widget](/docs/scos/user/features/{{page.version}}/shopping-lists-feature-overview/shopping-list-widget-overview.html) in the header of the shop
* from Shopping Lists page in My Account menu. See [Creating a shopping list](/docs/scos/user/user-guides/{{page.version}}/shop-user-guide/shop-guide-shopping-lists.html#create-shopping-list) for more detailed instruction.

New items are added to shopping lists by clicking Add to Shopping List on the product details page.

Company users can create not just one, but multiple shopping lists to be used for different needs or to purchase products at different periods.

{% info_block infoBox "Example" %}
These could be, for instance, separate shopping lists for daily, weekly and monthly purchases.
{% endinfo_block %}

The detailed information on managing shopping lists is covered in the [Shop User Guide](/docs/scos/user/user-guides/{{page.version}}/shop-user-guide/shop-guide-shopping-lists.html).

## Permissions Management for Shared Shopping Lists

Users of companies with business units can **share** their shopping lists within the company business units. The shopping lists can either be shared with the entire business unit or its members. Company users can view shopping lists shared with them, on *My Account->Shopping lists* page. The shopping lists can be shared by clicking **Share** at this page as well. The *Share [SHOPPING LIST NAME]* page consists of two sections: Business Units and Users. Here, the shopping list owner can select either the entire business unit or individual users to share the shopping list with.
![Share shopping list](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+List/Multiple+and+Shared+Shopping+Lists/Multiple+and+Shared+Shopping+Lists+Overview+v201907.0/share-shopping+list.png) 

Three types of shopping list access rights can be granted:

* no access
* read-only
* full access

### No Access
**No access** measns that shopping list is not shared and therefore can not be seen by a business unit/user.

### Read only
**_Read only_** permissions allows:

1. **Reading Shopping list**: On the *Shopping List View* page, the user sees shopping list name, owner, access level (*Read only*), number of users the shopping list is shared with, as well as table of items with the following information:

* Product image
* Product name
* SKU
* Product attribute
* Product options
* Product comments (see [Shopping List Notes](/docs/scos/user/features/{{page.version}}/shopping-lists-feature-overview/shopping-list-notes-overview.html) for more details)
* Quantity
* Item price
* Availability
* Actions: **Add to Cart** button

{% info_block infoBox %}
Alternative products are not shown for discontinued products, since they can not be basically added to cart, and user with *Read Only* rights can not amend shopping list by adding these products to it.
{% endinfo_block %}


2. **Changing quantity of items for adding to cart**: On the *Shopping List View* page, the user can change the item quantity to be added to cart

3. **Printing shopping list**: See [Printing Shopping list](/docs/scos/user/features/{{page.version}}/shopping-lists-feature-overview/multiple-and-shared-shopping-lists-overview.html) to learn how it works

4. **Adding shopping list items to cart**: The user can select the necessary which are available and add them to cart


## Full access
**_Full access_** permissions allows:

1. Reading Shopping list: On the _Shopping List View_ page, the user sees the name of owner, access level (Full access), number of users the shopping list is shared with, as well as table of items with the following information:
   * Product image
   * Product name
   * SKU
   * Product attribute
   * Product options 
   * Product notes (see [Shopping List Notes](/docs/scos/user/features/{{page.version}}/shopping-lists-feature-overview/shopping-list-notes-overview.html) for more details)
   * Quantity
   * Item price
   * Availability
   * Actions: **Add to cart** icon, **Remove** button

{% info_block infoBox %}
Besides other products, user with *Full access* rights is allowed to see alternatives for discontinued items, which can be added to the shopping list.
{% endinfo_block %}

2. **Changing the number of items for adding to cart**: On the *Shopping List View* page, user can change the item quantity to be added to cart

3. **Printing shopping list**: See [Printing a Shopping List](/docs/scos/user/features/{{page.version}}/shopping-lists-feature-overview/multiple-and-shared-shopping-lists-overview.html) to learn how it works

4. **Editing shopping list**: Having clicked **Edit**, the user is taken to *Edit Shopping list* page

5. **Changing quantity for the shopping list**: The amount of items in the shopping list can be changed on *Edit Shopping list* page.

6. **Sharing shopping list**: The shopping list can be shared by clicking *Share* button or *Shared with* link

7. **Deleting shopping list**

8. **Deleting items in shopping list**: The shopping list items can be deleted on *Edit Shopping list* page
![Shared full access](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+List/Multiple+and+Shared+Shopping+Lists/Multiple+and+Shared+Shopping+Lists+Overview+v201907.0/shared-full-access.png) 

It is possible to grant different access rights on shopping list to a business unit and users belonging to it. For example, a shopping list can be shared with *Read only* permissions to a business unit, but some of its users might be granted *Full access* permissions. In this case, these users will have *Full access* for the shopping list, whereas the rest of the business unit members will be entitled to *Read only* access.

## Search Widget for Shopping Lists
Starting from v. 2019.03.0, it is possible to add a [search widget for concrete products](/docs/scos/user/features/{{page.version}}/product-feature-overview/search-widget-for-concrete-products-overview.html) to a shopping list. The widget allows adding the products to the shopping list directly from the shopping list page. The shoppers do not need to go to product detail pages to add products to a list anymore.
![Search widget](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+List/Multiple+and+Shared+Shopping+Lists/Multiple+and+Shared+Shopping+Lists+Overview+v201907.0/shopping-list-search-widget.png) 

## Subtotal for a Shopping List
Starting from v.201907.0, every shopping list has Subtotal for all the items added to the shopping list according to the selected Price Mode and Currency.
![Subtotal for shopping list](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+List/Multiple+and+Shared+Shopping+Lists/Multiple+and+Shared+Shopping+Lists+Overview+v201907.0/subtotal-for-shopping-list.png) 

The web shop users can print their shopping lists, as well as shopping lists shared with them, in two ways:

* from *My Account→Shopping Lists* page:
![Overview page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+List/Print+Shopping+List/Printing+a+Shopping+List+Feature+Overview/actions-overview-page.png) 

* from Shopping List View page (which can be accessed by clicking on the name of a shopping list on Shopping Lists page):
![Shopping list details page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+List/Print+Shopping+List/Printing+a+Shopping+List+Feature+Overview/shopping-list-details-page.png) 

Clicking *Print* opens a printable version of a *Shopping List* page, which contains the shopping lists name, product barcode, SKU, name, default price and note:
![Printing page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Shopping+List/Print+Shopping+List/Printing+a+Shopping+List+Feature+Overview/print.png) 


## Current Constraints
We do not support product options in Subtotal of the Shopping Lists. For example, a shopping list includes 3 office chairs, each of them cost €15. The subtotal will show €45 for 3 items. But if we add a product option, e.g. gift wrapping for €5 each to these three office chairs, the subtotal should display €60 (€15/chair + €5/gift wrapping * 3). However, the shopping list will display just the product price - €45.

<!-- Last review date: Jul 29, 2019 by Ahmed Saaba, Oksana Karasyova -->
