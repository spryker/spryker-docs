---
title: Shopping List Notes overview
originalLink: https://documentation.spryker.com/2021080/docs/shopping-list-notes-overview
redirect_from:
  - /2021080/docs/shopping-list-notes-overview
  - /2021080/docs/en/shopping-list-notes-overview
---

The Shopping List Notes feature allows buyers to manage notes for individual items they have on their shopping lists. For example, a bakery might have created a shopping list with products they buy on a regular basis. Suppose, they have 10 kg flour bag on the shopping list, but they want to make sure that they always have enough amount of flour in their stock and therefore need to buy more sometimes. They can leave a note at the "flour bag" product saying "check if more than one bag should be purchased". Notes to shopping list items are added on *Edit shopping list* page. Customers can edit and delete the created shopping list notes there as well.

When customer transfers shopping list items to cart, their notes are taken over as well, under the following conditions:

* If an item **with notes** exists in a shopping list, and is transferred to cart, where the same item does not exist, the item is added with notes.
* If an item **with notes exists in a shopping list, and is transferred to cart**, **where the same item already exists** (with or without notes), the item is added as a **separate item** with notes.
* If an item **without notes** exists in a shopping list, and is transferred to cart, where the same item already exists **without notes**, the items are **merged**.
* If an item **without notes exists in a shopping list, and is transferred to cart, where the same item already exists with a note**, the item is added as a **separate item**.

## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li><a href="https://documentation.spryker.com/docs/shopping-lists-feature-integration" class="mr-link">Enable Shopping List Notes in your project by integrating the Shopping Lists feature</a></li>
            </ul>
        </div>
    </div>
</div>
