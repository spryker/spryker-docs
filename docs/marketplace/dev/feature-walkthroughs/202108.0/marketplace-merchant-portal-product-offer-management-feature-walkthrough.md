---
title: Marketplace Merchant Portal Product Offer Management feature walkthrough
description: This article provides reference information about product offers in the Merchant Portal.
template: concept-topic-template
---

The *Marketplace Merchant Portal Product Offer Management* feature allows merchants to manage product offers and its prices, stock, validity dates in the Merchant portal.

{% info_block warningBox "User documentation" %}

To learn more about the feature and to find out how end users use it, see [Marketplace Merchant Portal Product Offer Management feature overview](/docs/marketplace/user/features/{{page.version}}/marketplace-merchant-portal-product-offer-management-feature-overview.html) for business users.

{% endinfo_block %}

## Module dependency graph

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/c7d38902-eec0-417d-94ce-31d1baf9599d.png?utm_medium=live&utm_source=custom)

| NAME | DESCRIPTION | 
| --- | --- |
| [ProductOfferMerchantPortalGui](https://github.com/spryker/product-offer-merchant-portal-gui) | Provides UI for merchant product offers management. |
| [DashboardMerchantPortalGuiExtension](https://github.com/spryker/dashboard-merchant-portal-gui-extension) | Provides extension interfaces for DashboardMerchantPortalGui module. |
| [SalesMerchantPortalGuiExtension](https://github.com/spryker/sales-merchant-portal-gui-extension) | Provides extension interfaces for SalesMerchantPortalGui module. |
| [MerchantProductOffer](https://github.com/spryker/merchant-product-offer) | Provides ability for working with merchant product offer. |
| [ProductOffer](https://github.com/spryker/product-offer) | Provides the core functionality for product offer features. |
| [ProductOfferStock](https://github.com/spryker/product-offer-stock) | Provides product offers stock functionality. |
| [ProductOfferValidity](https://github.com/spryker/product-offer-validity) | Provides validity dates for product offers. Based on the validity dates product offers will be triggered as active/inactive. |
| [PriceProductOffer](https://github.com/spryker/price-product-offer) | Provides product offer price related functionality, price type, store relation and currency/price mode. |
| [PriceProductOfferVolume](https://github.com/spryker/price-product-offer-volume) | Provides functionality to handle volume prices for product offers. |

## Related Developer articles

| INTEGRATION GUIDES| GLUE API GUIDES  | DATA IMPORT   |
| -------------- | ----------------- | ------------------ |
| [Marketplace Merchant Portal Product Offer Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-merchant-portal-product-offer-management-feature-integration.html) | | |
