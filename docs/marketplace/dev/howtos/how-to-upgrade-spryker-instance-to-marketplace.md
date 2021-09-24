---
title: "How-To: Upgrade Spryker instance to Marketplace"
description: This article provides details how to upgrade Spryker instance to Marketplace
template: howto-guide-template
---

This articles provides details how to upgrade existing instance of Spryker shop to Marketplace

## 1) Add core features

Follow feature integration guids from the table, that provides basic and consistent functionality of Marketplace

| Feature | Description |
| --- | --- |
| [Marketplace Merchant](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-merchant-feature-integration.html) | Merchant user management. |
| [ACL](/docs/marketplace/dev/feature-integration-guides/202108.0/acl-feature-integration.html) | Merchant security management. |
| [Marketplace Category](/docs/marketplace/dev/feature-integration-guides/202108.0/merchant-category-feature-integration.html) | Allows splitting merchants into various categories in order to extend business logic of the project. |
| [Marketplace Product](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-product-feature-integration.html) | Extends product with merchant information. |
| [Marketplace Product Offer](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-product-offer-feature-integration.html) | Allows a Merchant to sell the Product based on concrete product with own price, stock, status and etc. |
| [Marketplace Product Offer Prices](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-product-offer-prices-feature-integration.html) | Allows define custom prices for product offers. |
| [Marketplace Inventory Management](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-inventory-management-feature-integration.html) | Stock & Availability Management as well as Multiple Warehouse Stock Management for product offers and merchant products. |
| [Marketplace Wishlist](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-wishlist-feature-integration.html) | Allows the customers to track and save merchant offers and products they wish to purchase through the wishlist. |
| Marketplace Cart <!--- LINK --> | Allows you to include a "Notes" field on the cart page. Buyers can add notes to a particular item or the whole cart. |
| [Marketplace Order Management](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-order-management-feature-integration.html) | Extends the default orders with merchants information. |
| [Marketplace Shipment](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-shipment-feature-integration.html) | Allows to split order into several shipments based on the merchants from which the items were bought. Merchants can see their shipments only. |
| [Marketplace Return Management](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-return-management-feature-integration.html) | Order returns management enhancement for OMS. |

Optional features

| Feature | Description |
| --- | --- |
| Marketplace Product Options <!--- LINK --> | Allows merchants to create their own product option groups and values. |
| [Marketplace Merchant Opening Hours](/docs/marketplace/dev/feature-integration-guides/202108.0/merchant-opening-hours-feature-integration.html) | Merchant working/opening hours management. |
| [Marketplace Promotions & Discounts](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-promotions-discounts-feature-integration.html) | Merchant products promotions and discounts management. |

## 2) Add MerchantPortal features

Follow feature integration guids from the table, that provides functionality for MerchantPortal Application

| Feature | Description |
| --- | --- |
| [Marketplace MerchantPortal Core](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-merchant-portal-core-feature-integration.html) | Allows to config server and the basic functionality of the Merchant Portal. |
| [Marketplace MerchantPortal Product Management](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-merchant-portal-core-feature-integration.html) | Allows to merchants manage their product in Merchant Portal. |
| [Marketplace MerchantPortal Product Offer Management](/docs/marketplace/dev/feature-integration-guides/202108.0/marketplace-merchant-portal-core-feature-integration.html) | Allows to merchants manage their product offers in Merchant Portal. |
| Marketplace MerchantPortal Product Option Management <!-- LINK --> | Allows to merchants manage their product options in Merchant Portal. |
| Marketplace MerchantPortal Order Management <!-- LINK --> | Allows to merchants manage their orders in Merchant Portal. |

## 3) Build app

To apply all changes regarding to database entities, data imports, search engine indexes, UI assets etc,  need rebuild your app.
Depends on what virtualization solution do you use just follow recommendations bellow

- [Docker based instance build](https://documentation.spryker.com/docs/installing-spryker-with-docker)
- [Vagrant based instance build](https://documentation.spryker.com/docs/b2b-b2c-demo-shop-installation-mac-os-or-linux-with-devvm)