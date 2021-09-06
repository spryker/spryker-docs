---
title: Marketplace Wishlist feature walkthrough
last_updated: Jul 28, 2021
description: This article provides technical details on the Marketplace Wishlist feature.
template: concept-topic-template
---

With the *Marketplace Wishlist* feature, the customers can track and save merchant offers and products they wish to purchase through the wishlist. The customers can create multiple wishlists and customize their names.

## Modules diagram

![Entity diagram](https://confluence-connect.gliffy.net/embed/image/948f1aa1-e020-406e-b6b4-6e5e6cd2a5a5.png?utm_medium=live&utm_source=confluence)

**Modules**

**MerchantProductOfferWishlist** - extends `WishlistItem` DB table with new column.

**MerchantProductWishlist** - extends `WishlistItem` DB table with new column.

**WishlistPageExtension** - contains plugin interfaces for extending functionality of `WishlistPage` module.

**MerchantWidget** - created new `SoldByMerchantWidget` to show owners of merchant products or product offers.

**WishlistWidget** - created new molecules for PDP and deprecated old one.

**ProductDetailPage** - replace molecules by new from `WishlistWidget`.

**MerchantProductOfferWidget** - created new plugins and molecules to extend forms and request data with `merchant_reference` and `product_offer_reference` on PDP.

**MerchantProductWidget** - created new plugins and molecules to extend forms and request data with `merchant_reference` on PDP.

**Wishlist** - included plugins for extending functionality of the Wishlist with supporting merchant products and product offers.

**WishlistPage** - adjusted functionality to show all information about merchants and product offers of products.

**MerchantSwitcher** - created new plugins to support WishList.

**ProductAlternativeStorage** - adjusted functionality to support merchants and product offers in `ProductViewTransfer`.

**ProductAlternativeWidget** - adjusted templates with new molecules and new `SoldBy` widget.

**WishlistExtension** - created new plugin interfaces for extending `Wishlist` module functionality.

**CustomerPage** - updated `SoldBy` widget usage.

**CartPage** - updated `SoldBy` widget usage.

**ProductPackagingUnitWidget** - updated `SoldBy` widget usage.

## Entity diagram

The following schema illustrates relations in the Marketplace Wishlist entity:

![Entity diagram](https://confluence-connect.gliffy.net/embed/image/6d5e9f9f-f841-4877-bf65-7fdd38d6d49b.png?utm_medium=live&utm_source=confluence)

## Related Developer articles

| INTEGRATION GUIDES | GLUE API GUIDES  |
| ------------- | -------------- |
| [Marketplace Wishlist feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-wishlist-feature-integration.html) | [Managing wishlists](/docs/marketplace/dev/glue-api-guides/{{page.version}}/wishlists/managing-wishlists.html) 
| [Glue API: Marketplace Product Offer + Wishlist feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-offer-wishlist-feature-integration.html) | [Managing wishlist items](/docs/marketplace/dev/glue-api-guides/{{page.version}}/wishlists/managing-wishlist-items.html) |
