---
title: Marketplace Merchant Custom Prices feature walkthrough
description: Marketplace Merchant Customer Specific Prices lets merchants in Merchant Portal create specific product price for the customer that merchant has relationship with.
template: feature-walkthrough-template
---

The *Marketplace Merchant Custom Prices* feature lets merchants in create and edit specific product price for the Customer Business Unit that current merchant has relationship with a help of Merchant Portal UI that is provided.

{% info_block warningBox "User documentation" %}

To learn more about the Marketplace Merchant Custom Prices feature in Merchant Portal and find out how end users use it see Marketplace Merchant Custom Prices feature overview.

{% endinfo_block %}

## Module dependency graph

The following diagram illustrates the dependencies between the modules for the *Marketplace Merchant Custom Prices* feature.

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/5eb0f9ca-ed53-4f7f-a968-38b647712678.png?utm_medium=live&utm_source=custom)

| NAME | DESCRIPTION |
| --- | --- |
| [PriceProduct](https://github.com/spryker/price-product) | Provides product price main business logic and persistence. |
| [PriceProductMerchantRelationship](https://github.com/spryker/price-product-merchant-relationship) | Provides product customer specific price functionality. |
| [PriceProductMerchantRelationshipMerchantPortalGui](https://github.com/spryker/price-product-merchant-relationship-merchant-portal-gui) | Provides merchant portal UI for product customer specific price management. |
| [ProductMerchantPortalGui](https://github.com/spryker/product-merchant-portal-gui) | Provides merchant portal UI for product management. |

## Domain model

The following schema illustrates the Marketplace Merchant Portal Customer Specific Prices domain model:

![Domain Model](https://confluence-connect.gliffy.net/embed/image/5eb0f9ca-ed53-4f7f-a968-38b647712678.png?utm_medium=live&utm_source=custom)

