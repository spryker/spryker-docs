---
title: Merchant Switcher feature walkthrough
last_updated: Sep 29, 2021
description: This article provides technical details on the Merchant Switcher feature.
template: merchant-switcher-feature-walkthrough
---

With the *Merchant Switcher* feature, the customers can select an active merchant so that he can only see products and offers which belong to this merchant.
The feature modules provide plugins to validate merchant in a quote on cart and checkout as well as in wishlist items.
So if merchant is not equal - finds substitution for items depending on the chosen merchant.
If  the system doesn't have suitable items, a customer will see the error or warning about these items.

*MerchantSwitcherWidget* module provides plugins for *Cart*, *Checkout*, *Wishlist* modules, to validate, reload items in the list. 

## Module dependency graph
![Entity Diagram](https://confluence-connect.gliffy.net/embed/image/8db03d24-88d4-4715-a5e1-afae4f2ff8ca.png?utm_medium=live&utm_source=confluence)

| MODULE     | DESCRIPTION                |
|------------|----------------------------|
| MerchantSwitcher | Provides functionality for switching merchant in a quote and in quote items   |
| MerchantSwitcherWidget | Allows to select a merchant from an active merchants list and store the selected merchant data   |

## Related Developer articles

| INTEGRATION GUIDES | GLUE API GUIDES  |
| ------------- | -------------- |
| [Merchant Switcher feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/merchant-switcher-feature-integration.html) |