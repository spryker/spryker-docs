---
title: Shopping List Notes overview
description: With the feature, you can leave and manage notes for each item in the order.
last_updated: May 19, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v1/docs/shopping-list-notes
originalArticleId: e3ade7f9-36e2-4c8b-9155-f3a168321d54
redirect_from:
  - /v1/docs/shopping-list-notes
  - /v1/docs/en/shopping-list-notes
  - /v1/docs/shopping-list-notes-overview
  - /v1/docs/en/shopping-list-notes-overview
---

The Shopping List Notes feature allows buyers to manage notes for individual items they have on their shopping lists. For example, a bakery might have created a shopping list with products they buy on a regular basis. Suppose, they have 10 kg flour bag on the shopping list, but they want to make sure that they always have enough amount of flour in their stock and therefore need to buy more sometimes. They can leave a note at the "flour bag" product saying "check if more than one bag should be purchased". Notes to shopping list items are added on *Edit shopping list* page. Customers can edit and delete the created shopping list notes there as well.

When customer transfers shopping list items to cart, their notes are taken over as well, under the following conditions:

* If an item **with notes** exists in a shopping list, and is transferred to cart, where the same item does not exist, the item is added with notes.
* If an item **with notes exists in a shopping list, and is transferred to cart**, **where the same item already exists** (with or without notes), the item is added as a **separate item** with notes.
* If an item **without notes** exists in a shopping list, and is transferred to cart, where the same item already exists **without notes**, the items are **merged**.
* If an item **without notes exists in a shopping list, and is transferred to cart, where the same item already exists with a note**, the item is added as a **separate item**.
