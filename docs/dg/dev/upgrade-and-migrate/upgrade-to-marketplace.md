---
title: Upgrade to Marketplace
description: This document provides details how to upgrade Spryker instance to the Marketplace.
template: howto-guide-template
last_updated: Sep 25, 2023
redirect_from:
  - /docs/marketplace/dev/howtos/how-to-upgrade-spryker-instance-to-marketplace.html
  - /docs/scos/dev/migration-concepts/upgrade-to-marketplace.html
---

This document describes how to upgrade the existing instance of Spryker Shop to the Marketplace.

## 1. Add core features

Implement the features and functionality of the Marketplace by following the integration guides from the following table.

| FEATURE | DESCRIPTION |
| --- | --- |
| [Marketplace Merchant](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-feature.html) | The Marketplace Merchant feature lets you create, read, and update a merchant in the Spryker Marketplace project. |
| [Merchant Opening Hours](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/install-and-upgrade/install-features/install-the-merchant-opening-hours-feature.html) | Merchant Opening Hours is a feature that lets a merchant store their working hours in the system where they can be retrieved for customers. Every merchant has a Weekday Schedule, meaning a daily schedule for every day of the week, as well as date-based exceptions for specific dates, such as during the holiday season. |
| [Merchant Category](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/install-and-upgrade/install-features/install-the-merchant-category-feature.html) | The Merchant Category feature allows splitting merchants into various categories in order to extend business logic of the project. |
| [Marketplace Product](/docs/pbc/all/product-information-management/{{site.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-feature.html) | Adds merchant information to the product that a merchant sells. Such products are called marketplace products. |
| [Marketplace Product Offer](/docs/pbc/all/offer-management/{{site.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-feature.html) | Merchant offers are new entities that let a merchant sell their products on the Marketplace. A merchant who wants to sell an existing product creates a mrchant offer for it if it already exists in the system. An offer from a merchant relates to a specific product and may contain details such as price, stock, or status.|
| [Marketplace Product Offer Prices](/docs/pbc/all/price-management/{{site.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-prices-feature.html) | Marketplace merchants can define custom prices for product offers with Marketplace Product Offer Prices. |
| [Marketplace Product Options](/docs/pbc/all/product-information-management/{{site.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-options-feature.html) | This feature allows merchants to create their own product option groups and values. |
| [Marketplace Inventory Management](/docs/pbc/all/warehouse-management-system/{{site.version}}/marketplace/install-features/install-the-marketplace-inventory-management-feature.html) | The Marketplace Inventory Management implies Stock & Availability Management as well as Multiple Warehouse Stock Management for product offers and marketplace products. |
| [Marketplace Wishlist](/docs/pbc/all/shopping-list-and-wishlist/{{site.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-wishlist-feature.html) | With the Marketplace Wishlist feature, the customers can track and save merchant offers and products they wish to purchase through the wishlist. The customers can create multiple wishlists and customize their names. |
| [Marketplace Cart](/docs/pbc/all/cart-and-checkout/{{site.version}}/marketplace/install/install-features/install-the-marketplace-cart-feature.html) | The Marketplace Cart feature lets you include a "Notes" field on the cart page. Buyers can add notes to a particular item or the whole cart, for example, some special instructions about how to prepare and deliver an order. |
| [Marketplace Promotions & Discounts](/docs/pbc/all/discount-management/{{site.version}}/marketplace/install-the-marketplace-promotions-discounts-feature.html) | With the Marketplace Promotions and Discounts feature, the discounts are correctly applied to the merchant orders. |
| [Marketplace Order Management](/docs/pbc/all/order-management-system/{{site.version}}/marketplace/install-features/install-the-marketplace-order-management-feature.html) | With the Marketplace Order Management, default orders that contain additional information about the merchants are called Marketplace orders. In turn, every merchant can view and manage only the orders that are related to their items. Such orders are called merchant orders. |
| [Marketplace Shipment](/docs/pbc/all/carrier-management/{{site.version}}/marketplace/install-features/install-marketplace-shipment-feature.html) | The Marketplace orders are split into several shipments based on the merchants from which the items were bought. Merchants can see their shipments only. |
| [Marketplace Return Management](/docs/pbc/all/return-management/{{site.version}}/marketplace/install-and-upgrade/install-the-marketplace-return-management-glue-api.html) | Order returns management enhancement for OMS. |

## 2. Add MerchantPortal features

Follow feature integration guides from the table that provides functionality for MerchantPortal Application.

| FEATURE                                                                                                                                                                                                  | DESCRIPTION                                                                                                                             |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| [Marketplace Merchant Portal Core](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-core-feature.html)                                          | Marketplace MerchantPortal Core enables server configuration and the basic functionality of the Merchant Portal such as security login. |
| [Marketplace Merchant Portal Product Management](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/install-and-upgrade/install-features/install-the-merchant-portal-marketplace-product-feature.html)                         | Merchants can manage their products in the Merchant Portal.                                                                             |
| [Marketplace Merchant Portal Product Offer Management](/docs/pbc/all/offer-management/{{site.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-portal-product-offer-management-feature.html)  | Merchants can manage their product offers in the Merchant Portal.                                                                       |
| [Marketplace Merchant Portal Product Option Management](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/install-and-upgrade/install-features/install-the-merchant-portal-marketplace-product-options-feature.html)        | Extends the order items with related product options in the Merchant Portal.                                                            |
| [Marketplace Merchant Portal Order Management](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/install-and-upgrade/install-features/install-the-merchant-portal-marketplace-order-management-feature.html)                  | Allows merchants to manage their orders in the Merchant Portal.                                                                         |
| [ACL](/docs/pbc/all/user-management/{{site.version}}/base-shop/install-and-upgrade/install-the-acl-feature.html)                                                                                                    | Allows managing access to HTTP endpoints and Persistence entities.                                                                      |

## 3. Build and start the instance

Rebuild your app in order to apply all the changes regarding database entities, data imports, search engine indexes, UI assets:

```shell
docker/sdk up
```
