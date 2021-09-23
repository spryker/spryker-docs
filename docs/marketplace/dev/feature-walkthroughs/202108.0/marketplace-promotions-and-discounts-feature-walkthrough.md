---
title: Marketplace Promotions and Discounts feature walkthrough
description: This article provides technical details on the Marketplace Promotions and Discounts feature.
template: concept-topic-template
---

With the *Marketplace Promotions and Discounts* feature, the discounts are applied to the merchant orders.

{% info_block warningBox "User documentation" %}

To learn more about the feature and to find out how end users use it, see [Marketplace Promotions and Discounts feature overview](/docs/marketplace/user/features/{{page.version}}/marketplace-product-options-feature-overview.html) for business users.

{% endinfo_block %}

## Module dependency graph

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/75358e26-725d-4f7d-8686-c72be236b88e.png?utm_medium=live&utm_source=custom)

| NAME | DESCRIPTION | 
| --- | --- |
| [DiscountMerchantSalesOrder](https://github.com/spryker/discount-merchant-sales-order) | Provides plugin for filtering out discounts in `MerchantOrderTransfer.order` that does not belongs to the current merchant order. |
| [DiscountMerchantSalesOrderGui](https://github.com/spryker/discount-merchant-sales-order) | Provides the the endpoint `/discount-merchant-sales-order-gui/merchant-sales-order/list` to view of merchant order discounts list in Backoffice. |
| [MerchantSalesOrderExtension](https://github.com/spryker/merchant-sales-order-extension) | Provides plugin interfaces for `MerchantSalesOrder` module. |
| [MerchantSalesOrder](https://github.com/spryker/merchant-sales-order) | Provides functionality to link merchant to sales orders. |
| [Discount](https://github.com/spryker/discount) | Provides basic functionality to create dynamic rules with which discounts can be applied to cart items. |
| [Shop.DiscountWidget](https://github.com/spryker-shop/discount-widget) | Provides discount information: discounts summary and voucher or discount form on the cart page. |
| [DiscountPromotion](https://github.com/spryker/merchant-sales-order) | Provides basic functionality to give away discounted or even free products to create promotions like "buy one, get one for free", "buy product X, get product Y for free", "buy 10 of product X and get 1 of product X for discounted price". |
| [Shop.DiscountPromotionWidget](https://github.com/spryker-shop/discount-promotion-widget) | Provides widget for discount promotions. |
| [CartCode](https://github.com/spryker/merchant-sales-order) | Provides basic functionality to apply/remove any kind of "codes" (i.e. voucher code, gift card code, etc.) on a cart. |
| [Shop.CartCodeWidget](https://github.com/spryker-shop/cart-code-widget) | Provides functionality to apply/remove codes for carts. |

## Related Developer articles

| INTEGRATION GUIDES| GLUE API GUIDES  | DATA IMPORT   |
| -------------- | ----------------- | ------------------ |
| [Marketplace Promotions & Discounts feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-promotions-discounts-feature-integration.html) | | |
