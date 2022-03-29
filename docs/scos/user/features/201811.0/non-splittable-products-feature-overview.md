---
title: Non-splittable Products feature overview
description: The article describes the concept of product quantity restrictions-  its types and how they can be set
last_updated: Oct 28, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v1/docs/product-quantity-restrictions-overview
originalArticleId: 0860adb4-807a-425b-9f29-877a552ac8e9
redirect_from:
  - /v1/docs/product-quantity-restrictions-overview
  - /v1/docs/en/product-quantity-restrictions-overview
  - /v1/docs/product-quantity-restrictions
  - /v1/docs/en/product-quantity-restrictions
---

On the *Edit product* page of the Administration interface, the administrator can set **quantity restrictions** for product concretes. Quantity restriction values define the amount of items that customer can put into the cart. You can set three values for quantity restrictions: minimum, maximum, interval. Minimum value defines the smallest allowable quantity of a specific item in cart. Maximum quantity restricts the allowable quantity of items in cart to a specific value. Interval value determines an increment value by which the quantity can be changed. For example, if you specify minimum quantity as 5, interval as 3, and maximum quantity as 14, it means that user can put 5, 8, 11 and 14 items to cart. If user puts an unacceptable quantity of items to cart, they will be suggested to buy another, allowable, quantity of items.

The shop administrator can either enable or disable the quantity restrictions in the *Quantity restrictions* tab for products. If they are enabled, the minimum and interval values must be specified, and maximum value is optional. If the quantity restrictions are not set, basic rules are applied - minimum quantity is 1 and no maximum restriction.

## Current Constraints
According to the current setup, quantity suggestions in the quantity restrictions do not work with the shopping lists. A buyer can add any quantity of the product in the shopping list. It can lead to a situation where the customer is forced to guess what amount should be added from a shopping list - because they will not see quantity suggestion on the shopping list page. However, when they add this product from a shopping list to a shopping cart, an error message will appear notifying the buyer that a selected amount cannot be added (if any quantity restrictions were set up for this product).

<!-- Last review date: Jul 08, 2019 -->
