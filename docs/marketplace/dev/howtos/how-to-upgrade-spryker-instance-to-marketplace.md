---
title: "How-To: Upgrade Spryker instance to the Marketplace"
description: This document provides details how to upgrade Spryker instance to the Marketplace.
template: howto-guide-template
---

This document describes how to upgrade the existing instance of Spryker Shop to the Marketplace.

## 1) Add core features

Implement the features and functionality of the Marketplace by following the integration guides from the following table.

| FEATURE | DESCRIPTION |
| --- | --- |
| [Marketplace Merchant](/docs/marketplace/dev/feature-integration-guides/{{site.version}}/marketplace-merchant-feature-integration.html) | The Marketplace Merchant feature lets you create, read, and update a merchant in the Spryker Marketplace project. |
| [Merchant Opening Hours](/docs/marketplace/dev/feature-integration-guides/{{site.version}}/merchant-opening-hours-feature-integration.html) | Merchant Opening Hours is a feature that lets a merchant store their working hours in the system where they can be retrieved for customers. Every merchant has a Weekday Schedule, meaning a daily schedule for every day of the week, as well as date-based exceptions for specific dates, such as during the holiday season. |
| [Merchant Category](/docs/marketplace/dev/feature-integration-guides/{{site.version}}/merchant-category-feature-integration.html) | The Merchant Category feature allows splitting merchants into various categories in order to extend business logic of the project. |
| [Marketplace Product](/docs/marketplace/dev/feature-integration-guides/{{site.version}}/marketplace-product-feature-integration.html) | Adds merchant information to the product that a merchant sells. Such products are called marketplace products. |
| [Marketplace Product Offer](/docs/marketplace/dev/feature-integration-guides/{{site.version}}/marketplace-product-offer-feature-integration.html) | Merchant offers are new entities that allow a Merchant to sell their products on the Marketplace. A merchant who wants to sell an existing product creates a Merchant Offer for it if it already exists in the system. An offer from a merchant relates to a specific product and may contain details such as price, stock, or status.|
| [Marketplace Product Offer Prices](/docs/marketplace/dev/feature-integration-guides/{{site.version}}/marketplace-product-offer-prices-feature-integration.html) | Marketplace merchants can define custom prices for product offers with Marketplace Product Offer Prices. |
| [Marketplace Product Options](/docs/marketplace/dev/feature-integration-guides/{{site.version}}/marketplace-product-option-feature-integration.html) | This feature allows merchants to create their own product option groups and values. |
| [Marketplace Inventory Management](/docs/marketplace/dev/feature-integration-guides/{{site.version}}/marketplace-inventory-management-feature-integration.html) | The Marketplace Inventory Management implies Stock & Availability Management as well as Multiple Warehouse Stock Management for product offers and marketplace products. |
| [Marketplace Wishlist](/docs/marketplace/dev/feature-integration-guides/{{site.version}}/marketplace-wishlist-feature-integration.html) | With the Marketplace Wishlist feature, the customers can track and save merchant offers and products they wish to purchase through the wishlist. The customers can create multiple wishlists and customize their names. |
| [Marketplace Cart](/docs/marketplace/dev/feature-integration-guides/{{site.version}}/marketplace-cart-feature-integration.html) | The Marketplace Cart feature lets you include a "Notes" field on the cart page. Buyers can add notes to a particular item or the whole cart, for example, some special instructions about how to prepare and deliver an order. |
| [Marketplace Promotions & Discounts](/docs/marketplace/dev/feature-integration-guides/{{site.version}}/marketplace-promotions-discounts-feature-integration.html) | With the Marketplace Promotions and Discounts feature, the discounts are correctly applied to the merchant orders. |
| [Marketplace Order Management](/docs/marketplace/dev/feature-integration-guides/{{site.version}}/marketplace-order-management-feature-integration.html) | With the Marketplace Order Management, default orders that contain additional information about the merchants are called Marketplace orders. In turn, every merchant can view and manage only the orders that are related to their items. Such orders are called merchant orders. |
| [Marketplace Shipment](/docs/marketplace/dev/feature-integration-guides/{{site.version}}/marketplace-shipment-feature-integration.html) | The Marketplace orders are split into several shipments based on the merchants from which the items were bought. Merchants can see their shipments only. |
| [Marketplace Return Management](/docs/marketplace/dev/feature-integration-guides/{{site.version}}/marketplace-return-management-feature-integration.html) | Order returns management enhancement for OMS. |

## 2) Add MerchantPortal features

Follow feature integration guides from the table that provides functionality for MerchantPortal Application.

| FEATURE | DESCRIPTION |
| --- | --- |
| [Marketplace Merchant Portal Core](/docs/marketplace/dev/feature-integration-guides/{{site.version}}/marketplace-merchant-portal-core-feature-integration.html) | Marketplace MerchantPortal Core enables server configuration and the basic functionality of the Merchant Portal such as security login. |
| [Marketplace Merchant Portal Product Management](/docs/marketplace/dev/feature-integration-guides/{{site.version}}/merchant-portal-marketplace-product-feature-integration.html) | Merchants can manage their products in the Merchant Portal. |
| [Marketplace Merchant Portal Product Offer Management](/docs/marketplace/dev/feature-integration-guides/{{site.version}}/marketplace-merchant-portal-product-offer-management-feature-integration.html) | Merchants can manage their product offers in the Merchant Portal. |
| [Marketplace Merchant Portal Product Option Management](/docs/marketplace/dev/feature-integration-guides/{{site.version}}/merchant-portal-marketplace-product-option-management-feature-integration.html) | Extends the order items with related product options in the Merchant Portal. |
| [Marketplace Merchant Portal Order Management](/docs/marketplace/dev/feature-integration-guides/{{site.version}}/merchant-portal-marketplace-order-management-feature-integration.html) | Allows merchants to manage their orders in the Merchant Portal. |
| [ACL](/docs/marketplace/dev/feature-integration-guides/{{site.version}}/acl-feature-integration.html) | Allows managing access to HTTP endpoints and Persistence entities. |

## 3) Build app

Please rebuild your app in order to apply all the changes regarding database entities, data imports, search engine indexes, UI assets.
Depending on the virtualization solution you use, use the following recommendations:
- [Docker based instance build](/docs/scos/dev/setup/installing-spryker-with-docker/installing-spryker-with-docker.html)
- [Vagrant based instance build](/docs/scos/dev/setup/installing-spryker-with-development-virtual-machine/installing-spryker-with-devvm-on-macos-and-linux.html)
