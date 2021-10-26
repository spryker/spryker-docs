---
title: Shopping List Notes overview
description: With the feature, you can leave and manage notes for each item in the order.
last_updated: Oct 23, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v3/docs/shopping-list-notes
originalArticleId: 2772f0df-1cbb-4b77-932a-2ccea3228c83
redirect_from:
  - /v3/docs/shopping-list-notes
  - /v3/docs/en/shopping-list-notes
---

The Shopping List Notes feature allows buyers to manage notes for individual items they have on their shopping lists. For example, a bakery might have created a shopping list with products they buy on a regular basis. Suppose, they have 10 kg flour bag on the shopping list, but they want to make sure that they always have enough amount of flour in their stock and therefore need to buy more sometimes. They can leave a note at the "flour bag" product saying "check if more than one bag should be purchased". Notes to shopping list items are added on *Edit shopping list* page. Customers can edit and delete the created shopping list notes there as well.

When customer transfers shopping list items to cart, their notes are taken over as well, under the following conditions:

* If an item **with notes** exists in a shopping list, and is transferred to cart, where the same item does not exist, the item is added with notes.
* If an item **with notes exists in a shopping list, and is transferred to cart**, **where the same item already exists** (with or without notes), the item is added as a **separate item** with notes.
* If an item **without notes** exists in a shopping list, and is transferred to cart, where the same item already exists **without notes**, the items are **merged**.
* If an item **without notes exists in a shopping list, and is transferred to cart, where the same item already exists with a note**, the item is added as a **separate item**.
