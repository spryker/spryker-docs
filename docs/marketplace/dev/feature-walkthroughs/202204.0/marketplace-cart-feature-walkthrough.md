---
title: Marketplace Cart feature walkthrough
last_updated: Nov 1, 2021
description: Buyers can add notes to carts of their orders.
template: feature-walkthrough-template
---

The *Marketplace Cart* feature lets buyers add notes to their carts, and Marketplace administrators can view these notes.

{% info_block warningBox "User documentation" %}

To learn more about the feature and to find out how end users use it, see [Marketplace Cart Notes feature overview](/docs/marketplace/user/features/{{page.version}}/marketplace-cart-notes-feature-overview.html) for business users.

{% endinfo_block %}


## Module dependency graph

The following diagram illustrates the dependencies between the modules for the *Marketplace Cart* feature.

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/f2665938-a482-4b43-b37a-48e8ed682b5d.png?utm_medium=live&utm_source=custom)

| MODULE     | DESCRIPTION                |
|------------|----------------------------|
| [CartNote](https://github.com/spryker/cart-note) | This module provides functionality to add notes to cart and cart items, push notes from cart to order and than show them on order detail page in zed. |
| [CartNoteMerchantSalesOrderGui](https://github.com/spryker/cart-note-merchant-sales-order-gui) | CartNoteMerchantSalesOrderGui provides Zed UI interface for merchant cart note management. |

## Related Developer articles

|INTEGRATION GUIDES  |GLUE API GUIDES  |
|---------|---------|---------|--------|
| [Marketplace Cart feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-cart-feature-integration.html)          | [Managing carts of registered users](/docs/marketplace/dev/glue-api-guides/{{page.version}}/carts-of-registered-users/managing-carts-of-registered-users.html)          |
|  | [Managing items in carts of registered users](/docs/marketplace/dev/glue-api-guides/{{page.version}}/carts-of-registered-users/managing-items-in-carts-of-registered-users.html)
