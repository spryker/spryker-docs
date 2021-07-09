---
title: Marketplace Product Offer
description: This article provides details about Marketplace Product Offer feature of the back-end project in the Spryker Marketplace.
template: concept-topic-template
---

This article provides details about Marketplace Product Offer feature of the back-end project in the Spryker Marketplace.

## Installation

For installing the feature please follow:  [Marketplace product offer feature integration guide](/docs/marketplace/dev/feature-integration-guides/202106.0/marketplace-product-offer-feature-integration.html)

## Overview

A product offer is a variation of a product concrete with its own specific price (and volume prices) and stock, it can be “owned” by any entity in Spryker, yet in a B2B/B2C marketplace it is owned by a merchant. 
It has its own validity dates and its own availability calculation based on its reservations.

Offer products re-use and extend concrete product feature, 
all product related data is stored and processed as concrete products. 
All offer-related data is stored in a separate entity and linked to a concrete product. 

The feature contains both merchant product offer and product offer concepts. 

Merchant product offer extends product offer by adding a pointer to a merchant.

### Main feature modules

| NAME | Description | Manage Entities  |
| -------------------- | ---------- | ----------------- | 
| [MerchantProductOffer](https://github.com/spryker/merchant-product-offer) | Provides collection of product offers by request, extends ProductOffer with merchant information. Used by MerchantSwitcher for switching merchant functionality  | SpyProductOffer |
| [ProductOffer](https://github.com/spryker/product-offer) | Main create-read-update product offer functionality  | SpyProductOffer |
| [ProductOfferValidity](https://github.com/spryker/product-offer-validity) | Defines validity period for an offer | SpyProductOfferValidity |
| [Shop.MerchantProductOfferWidget](https://github.com/spryker/spryker-shop) | Provides merchant product offer information for spryker-shop | - |

### Entity diagram
![Entity diagram](https://confluence-connect.gliffy.net/embed/image/6a64677b-090a-4dbf-86a5-8e9d8afa1a68.png?utm_medium=live&utm_source=custom)

### Learn more
 - [How product offer validity dates works](/docs/marketplace/dev/back-end/features/marketplace-product-offer-learn-more/validity-dates.html) 
 - [How offer is connected to a store](/docs/marketplace/dev/back-end/features/marketplace-product-offer-learn-more/store-relationship.html) 
 - [Product offer data cahing](/docs/marketplace/dev/back-end/features/marketplace-product-offer-learn-more/cache.html) 
 - [How it works with Back Office](/docs/marketplace/dev/back-end/features/marketplace-product-offer-learn-more/back-office.html)
