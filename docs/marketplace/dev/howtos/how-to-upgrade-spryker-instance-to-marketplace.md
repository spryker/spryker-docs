---
title: "How-To: Upgrade Spryker instance to Marketplace"
description: This article provides details how to upgrade Spryker instance to Marketplace
template: howto-guide-template
---

This article provides details on how to upgrade the existing instance of Spryker Shop to Marketplace.

## 1) Add core features

Follow feature integration guides from the table that provides the basic and functionality of Marketplace.

| Feature | Description |
| --- | --- |
| [Marketplace Merchant](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-merchant-feature-integration.html) | The Marketplace Merchant feature allows you to create, read, and update a merchant in the Spryker Marketplace project. |
| [Merchant Opening Hours](/docs/marketplace/dev/feature-integration-guides/202108.0/merchant-opening-hours-feature-integration.html) | Merchant Opening Hours is a feature that allows a Merchant entity to have their working/opening hours saved in the system as well as it being retrievable for presentation for curious customers. A merchant can have a Weekday Schedule, meaning a daily schedule for every day of the week, as well as date-based exceptions where they setup different working/opening hours for specific dates like during the holiday season. |
| [Merchant Category](/docs/marketplace/dev/feature-integration-guides/202108.0/merchant-category-feature-integration.html) | The Merchant Category feature allows splitting merchants into various categories in order to extend business logic of the project. |
| [Marketplace Product](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-product-feature-integration.html) | Adds merchant information to the product that a merchant sells. Such products are called merchant products. |
| [Marketplace Product Offer](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-product-offer-feature-integration.html) | Merchant Offer is a new entity that allows a Merchant to sell the Product on the Marketplace. If the product already exists in the system and Merchant wants to sell it, s/he creates a Merchant Offer for this product. Merchant Offer is based on the concrete product and might contain such details as price, stock, status, etc. |
| [Marketplace Product Offer Prices](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-product-offer-prices-feature-integration.html) | With the Marketplace Product Offer Prices feature, a marketplace Merchants can define custom prices for product offers. |
| [Marketplace Product Options](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-product-option-feature-integration.html) | Allows merchants to create their own product option groups and values. |
| [Marketplace Inventory Management](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-inventory-management-feature-integration.html) | The Marketplace Inventory Management implies Stock & Availability Management as well as Multiple Warehouse Stock Management for product offers and merchant products. |
| [Marketplace Wishlist](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-wishlist-feature-integration.html) | With the Marketplace Wishlist feature, the customers can track and save merchant offers and products they wish to purchase through the wishlist. The customers can create multiple wishlists and customize their names. |
| [Marketplace Cart](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-cart-feature-integration.html) | The Marketplace Cart feature allows you to include a "Notes" field on the cart page. Buyers can add notes to a particular item or the whole cart, for example, some special instructions about how to prepare and deliver an order. |
| [Marketplace Promotions & Discounts](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-promotions-discounts-feature-integration.html) | With the Marketplace Promotions and Discounts feature, the discounts are correctly applied to the merchant orders. |
| [Marketplace Order Management](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-order-management-feature-integration.html) | With the Marketplace Order Management, default orders that contain additional information about the merchants are called Marketplace orders. In turn, every merchant can view and manage only the orders that are related to their items. Such orders are called merchant orders. |
| [Marketplace Shipment](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-shipment-feature-integration.html) | The Marketplace orders are split into several shipments based on the merchants from which the items were bought. Merchants can see their shipments only. |
| [Marketplace Return Management](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-return-management-feature-integration.html) | Order returns management enhancement for OMS. |

## 2) Add MerchantPortal features

Follow feature integration guides from the table that provides functionality for MerchantPortal Application.

| Feature | Description |
| --- | --- |
| [Marketplace Merchant Portal Core](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-merchant-portal-core-feature-integration.html) | Marketplace MerchantPortal Core enables server configuration and the basic functionality of the Merchant Portal such as security login. |
| [Marketplace Merchant Portal Product Management](/docs/marketplace/dev/feature-integration-guides/202108.0/merchant-portal-marketplace-product-feature-integration.html) | Merchants can manage their products in Merchant Portal. |
| [Marketplace Merchant Portal Product Offer Management](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-merchant-portal-product-offer-management-feature-integration.html) | Merchants can manage their product offers in Merchant Portal. |
| [Marketplace Merchant Portal Product Option Management](https://github.com/spryker/product-option-merchant-portal-gui) | Allows to merchants manage their product options in Merchant Portal. |
| [Marketplace Merchant Portal Order Management](/docs/marketplace/dev/feature-integration-guides/202108.0/merchant-portal-marketplace-order-management-feature-integration.html) | Allows to merchants manage their orders in Merchant Portal. |
| [ACL](/docs/marketplace/dev/feature-integration-guides/202108.0/acl-feature-integration.html) | Allows to manage access to HTTP endpoints and Persistance Entities. |

## 3) Build app

To apply all changes regarding database entities, data imports, search engine indexes, UI assets, etc. please rebuild your app.
Depending on what virtualization solution do you use follow the recommendations below.

- [Docker based instance build](https://documentation.spryker.com/docs/installing-spryker-with-docker)
- [Vagrant based instance build](https://documentation.spryker.com/docs/b2b-b2c-demo-shop-installation-mac-os-or-linux-with-devvm)