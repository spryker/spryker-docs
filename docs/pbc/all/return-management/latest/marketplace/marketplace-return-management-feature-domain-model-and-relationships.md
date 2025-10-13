---
title: "Marketplace Return Management feature: Domain model and relationships"
description: This document provides technical details about the Marketplace Return Management feature.
template: feature-walkthrough-template
last_updated: Nov 21, 2023
---

With the *Marketplace Return Management* feature, marketplace merchants can manage their returns.

## Module dependency graph

The following diagram illustrates the dependencies between the modules for the *Marketplace Return Management* feature.

![Entity diagram](https://confluence-connect.gliffy.net/embed/image/e12bcdcb-8510-4ebf-80c3-0ee1c3054002.png?utm_medium=live&utm_source=confluence)

| MODULE     | DESCRIPTION                |
|------------|----------------------------|
| MerchantSalesReturn | Provides functionality to link merchant to the sales returns.  |
| MerchantSalesReturnGui | Provides Back Office UI for the merchant sales returns.  |
| MerchantSalesReturnMerchantUserGui | Provides Back Office UI for managing merchant user sales returns.  |
| MerchantSalesReturnWidget | Provides merchant information for the sales returns on the Storefront.   |
| MerchantSalesReturnsRestApi | Provides REST API endpoints to manage merchant sales returns.   |
| SalesReturn | Handles order returns. |
| SalesReturnExtension | Provides interfaces of plugins to extend `SalesReturn` module from other modules.  |

## Domain model

The following schema illustrates the Marketplace Return Management domain model:

![Entity diagram](https://confluence-connect.gliffy.net/embed/image/9f01ed2f-2be0-4e59-afa3-e56fd8390b51.png?utm_medium=live&utm_source=confluence)

                                                |
