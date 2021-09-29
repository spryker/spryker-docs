---
title: Merchant Switcher feature walkthrough
last_updated: Sep 29, 2021
description: This article provides technical details on the Merchant Switcher feature.
template: feature-walkthroughs-merchant-switcher
---

With the *Merchant Switcher* feature, the customers can select an active merchant so that he can only see products and offers which belong to this merchant.
Has been created plugins to check that chosen merchant is equal in all items in Cart, Quote, Checkout modules.
So if merchant is not equal the item replaces with offer or merchant product from owned to chosen merchant.
If  the system doesn't have suitable items, a customer will see the error or warning about these items.

## Module dependency graph
![Entity Diagram](https://confluence-connect.gliffy.net/embed/image/8db03d24-88d4-4715-a5e1-afae4f2ff8ca.png?utm_medium=live&utm_source=confluence)

| MODULE     | DESCRIPTION                |
|------------|----------------------------|
| MerchantSearch | Manages Elasticsearch documents for merchant entities   |
| MerchantSwitcher | Provides functionality for switching merchant in a quote and in quote items   |
| MerchantSwitcherWidget | Allows to select a merchant from an active merchants list and store the selected merchant data   |

## Related Developer articles

| INTEGRATION GUIDES | GLUE API GUIDES  |
| ------------- | -------------- |
| [Marketplace Wishlist feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/merchant-switcher-feature-integration.html) | [Managing wishlists](/docs/marketplace/dev/glue-api-guides/{{page.version}}/wishlists/managing-wishlists.html)