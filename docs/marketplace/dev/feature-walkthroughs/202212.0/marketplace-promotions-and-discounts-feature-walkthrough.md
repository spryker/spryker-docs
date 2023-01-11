---
title: Marketplace Promotions and Discounts feature walkthrough
description: This document provides technical details about the Marketplace Promotions and Discounts feature.
template: feature-walkthrough-template
---

With the *Marketplace Promotions and Discounts* feature, the discounts are applied to the merchant orders.

{% info_block warningBox "User documentation" %}

To learn more about the feature and to find out how end users use it, see [Marketplace Promotions and Discounts feature overview](/docs/marketplace/user/features/{{page.version}}/marketplace-product-options-feature-overview.html) for business users.

{% endinfo_block %}

## Module dependency graph

The following diagram illustrates the dependencies between the modules for the *Marketplace Promotions and Discounts* feature.

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/75358e26-725d-4f7d-8686-c72be236b88e.png?utm_medium=live&utm_source=custom)

| NAME | DESCRIPTION |
| --- | --- |
| [DiscountMerchantSalesOrder](https://github.com/spryker/discount-merchant-sales-order) | Provides a plugin for filtering out discounts in `MerchantOrderTransfer.order` that does not belong to the current merchant order. |
| [DiscountMerchantSalesOrderGui](https://github.com/spryker/discount-merchant-sales-order) | Provides an endpoint `/discount-merchant-sales-order-gui/merchant-sales-order/list` to view the merchant order discounts list in the Back Office. |
| [MerchantSalesOrderExtension](https://github.com/spryker/merchant-sales-order-extension) | Provides plugin interfaces for the `MerchantSalesOrder` module. |
| [MerchantSalesOrder](https://github.com/spryker/merchant-sales-order) | Links merchant to sales orders. |

## Related Developer articles

| INTEGRATION GUIDES|
| -------------- |
| [Marketplace Promotions & Discounts feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-promotions-discounts-feature-integration.html) |
