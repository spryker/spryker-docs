---
title: Marketplace Wishlist feature walkthrough
last_updated: Jul 28, 2021
description: This article provides technical details on the Marketplace Wishlist feature.
template: concept-topic-template
---

With the *Marketplace Wishlist* feature, the customers can track and save merchant offers and products they wish to purchase through the wishlist. The customers can create multiple wishlists and customize their names.

## Related Developer articles

| INTEGRATION GUIDES | GLUE API GUIDES  |
| ------------- | -------------- |
| [Marketplace Wishlist feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-wishlist-feature-integration.html) | [Managing wishlists](/docs/marketplace/dev/glue-api-guides/{{page.version}}/wishlists/managing-wishlists.html)
| [Glue API: Marketplace Product Offer + Wishlist feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-offer-wishlist-feature-integration.html) | [Managing wishlist items](/docs/marketplace/dev/glue-api-guides/{{page.version}}/wishlists/managing-wishlist-items.html) |

## Module dependency graph

![Entity diagram](https://confluence-connect.gliffy.net/embed/image/e7a2ef43-7eb8-435a-870b-d8012fe8bd07.png?utm_medium=live&utm_source=confluence)

**MerchantProductWishlist** - Provides ability to work with merchant product in wishlist.

**MerchantProductOfferWishlist** - Provides ability to work with product offers in wishlist.

**Wishlist** - Provides infrastructure and functionality to handle multiple wishlists for a customer account.

**WishlistPage** - Provides enduser wishlist management functionality.

**WishlistWidget** - Provides wishlist rendering functionality integration to other modules.

## Domain model

The following diagram illustrates domain model of Marketplace Wishlist feature:

![Entity diagram](https://confluence-connect.gliffy.net/embed/image/6d5e9f9f-f841-4877-bf65-7fdd38d6d49b.png?utm_medium=live&utm_source=confluence)