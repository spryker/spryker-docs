---
title: Marketplace Merchant Portal Customer Specific Prices feature walkthrough
description: Marketplace Merchant Portal Customer Specific Prices lets merchants create specific product price for the customer that merchant has relationship with.
template: feature-walkthrough-template
---

The *Marketplace Merchant Portal Customer Specific Prices* feature lets merchants in create and edit specific product price for the Customer Business Unit that current merchant has relationship with.

{% info_block warningBox "User documentation" %}

To learn more about the Customer Specific Prices feature in general and to find out how end users use it, see [Merchant Custom Prices feature overview](/docs/scos/user/features/{{page.version}}/merchant-custom-prices-feature-overview.html) for business users.

{% endinfo_block %}

## Module dependency graph

The following diagram illustrates the dependencies between the modules for the *Marketplace Merchant Portal Customer Specific Prices* feature.

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/de5c60d1-10f4-4663-ad00-86689014651e.png?utm_medium=live&utm_source=custom)

| NAME | DESCRIPTION |
| --- | --- |
| [PriceProduct](https://github.com/spryker/price-product) | Provides product price main business logic and persistence. |
| [PriceProductMerchantRelationship](https://github.com/spryker/price-product-merchant-relationship) | Provides product customer specific price functionality. |
| [PriceProductMerchantRelationshipMerchantPortalGui](https://github.com/spryker/price-product-merchant-relationship-merchant-portal-gui) | Provides merchant portal UI for product customer specific price management. |
| [ProductMerchantPortalGui](https://github.com/spryker/product-merchant-portal-gui) | Provides merchant portal UI for product management. |

## Domain model

The following schema illustrates the Marketplace Merchant Portal Customer Specific Prices domain model:

![Domain Model](https://confluence-connect.gliffy.net/embed/image/de5c60d1-10f4-4663-ad00-86689014651e.png?utm_medium=live&utm_source=custom)

## Related Developer articles

| INTEGRATION GUIDES | DATA IMPORT |
| ---- | --- |
| [Marketplace Merchant Portal Customer Specific Price feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/merchant-portal-marketplace-customer-specific-prices-feature-integration.html) |  |
