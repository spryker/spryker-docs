---
title: Shopping List Notes overview
description: With the feature, you can leave and manage notes for each item in the order.
last_updated: Jul 2, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/shopping-list-notes-overview
originalArticleId: f3bbe202-94da-4e64-9480-d57af69fb057
redirect_from:
  - /2021080/docs/shopping-list-notes-overview
  - /2021080/docs/en/shopping-list-notes-overview
  - /docs/shopping-list-notes-overview
  - /docs/en/shopping-list-notes-overview
  - /docs/scos/user/features/202311.0/shopping-lists-feature-overview/shopping-list-notes-overview.html
  - /docs/pbc/all/shopping-list-and-wishlist/202204.0/base-shop/shopping-lists-feature-overview/shopping-list-notes-overview.html
---

The *Shopping List Notes* feature lets buyers manage notes for individual items they have on their shopping lists. For example, a bakery might have created a shopping list with products they buy regularly. Suppose, they have a 10&nbsp;kg-flour bag on the shopping list, but they want to make sure that they always have enough amount of flour in their stock and therefore need to buy more sometimes. They can leave a note at the "flour bag" product saying "check if more than one bag should be purchased". Notes to shopping list items are added on the **Edit shopping list** page. Customers can edit and delete the created shopping list notes there as well.

When customer transfers shopping list items to the cart, their notes are taken over as well, under the following conditions:

* If an item *with notes* exists in a shopping list and is transferred to the cart, where the same item *does not exist*, the item is added with notes.
* If an item *with notes* exists in a shopping list and is transferred to the cart, where the same item *already exists* (with or without notes), the item is added as a *separate item* with notes.
* If an item *without notes* exists in a shopping list and is transferred to the cart, where the same item already exists *without notes*, the items are *merged*.
* If an item *without notes* exists in a shopping list and is transferred to the cart, where the same item *already exists with a note*, the item is added as a *separate item*.
