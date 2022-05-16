---
title: Marketplace Merchant Custom Prices feature walkthrough
description: Marketplace Merchant Custom Prices feature lets merchants to define custom prices for specific business units of B2B customers via Merchant Portal Product Price UI.
template: feature-walkthrough-template
---

The *Marketplace Merchant Custom Prices* feature lets merchants to define custom prices for specific business units of B2B customers via Merchant Portal Product Price UI.

{% info_block warningBox "User documentation" %}

To learn more about the Marketplace Merchant Custom Prices feature in Merchant Portal and find out how end users use it see Marketplace Merchant Custom Prices feature overview.

{% endinfo_block %}

## Module dependency graph

The following diagram illustrates the dependencies between the modules for the *Marketplace Merchant Custom Prices* feature.

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/07d9f98a-5bc3-478f-8d0a-cb33cdeb2ed7.png?utm_medium=live&utm_source=custom)

| NAME | DESCRIPTION |
| --- | --- |
| [PriceProduct](https://github.com/spryker/price-product) | Provides product price related functionality, price persistence, current price resolvers per currency/price mode. |
| [PriceProductMerchantRelationship](https://github.com/spryker/price-product-merchant-relationship) | Provides database schema and required plugins for specific product prices per merchant relationship. |
| [PriceProductMerchantRelationshipMerchantPortalGui](https://github.com/spryker/price-product-merchant-relationship-merchant-portal-gui) | Provides components for price product merchant relationships management. |
| [ProductMerchantPortalGui](https://github.com/spryker/product-merchant-portal-gui) | Provides components for merchant products management. |

## Domain model

The following schema illustrates the *Marketplace Merchant Custom Prices* domain model:

![Domain Model](https://confluence-connect.gliffy.net/embed/image/165bf49e-5aed-4228-b231-cc5187eca7d4.png?utm_medium=live&utm_source=custom)
