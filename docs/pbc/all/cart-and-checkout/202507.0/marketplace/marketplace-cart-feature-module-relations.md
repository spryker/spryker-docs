---
title: "Marketplace Cart feature: Module relations"
description: Explore the Marketplace Cart feature module relations in Spryker Marketplace, detailing the interconnected components and functionality.
last_updated: Nov 1, 2021
description: Buyers can add notes to carts of their orders.
template: concept-topic-template

---

The following diagram illustrates the dependencies between the modules for the *Marketplace Cart* feature.

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/f2665938-a482-4b43-b37a-48e8ed682b5d.png?utm_medium=live&utm_source=custom)

| MODULE     | DESCRIPTION                |
|------------|----------------------------|
| [CartNote](https://github.com/spryker/cart-note) | This module provides functionality to add notes to cart and cart items, push notes from cart to order and than show them on order detail page in zed. |
| [CartNoteMerchantSalesOrderGui](https://github.com/spryker/cart-note-merchant-sales-order-gui) | CartNoteMerchantSalesOrderGui provides Zed UI interface for merchant cart note management. |
