---
title: Click and Collect feature Service Point Cart subdomain walkthrough
last_updated: Nov 02, 2023
description: |
  Explore the Service Point Cart subdomain in the Click and Collect feature, focusing on the validation of service points and the replacement of line items in a shopping cart. Learn how to install the essential modules and leverage the extension point for implementing custom item replacement strategies during the checkout process.

template: concept-topic-template
---

# Service Point Cart

The Service Point Cart subdomain enables you to validate service points and replace line items within a shopping cart.

[Install the Service Points Cart feature](/docs/pbc/all/install-features/{{page.version}}/install-the-service-points-cart-feature.html)

## 1. Modules

| MODULE                      | EXPECTED DIRECTORY                             |
|-----------------------------|------------------------------------------------|
| ServicePointCart            | vendor/spryker/service-point-cart              |
| ServicePointCartExtension   | vendor/spryker/service-point-cart-extension    |
| ServicePointCartsRestApi    | vendor/spryker/service-point-carts-rest-api    |

## 2. Extension point that allows for the implementation of item replacement strategies in the cart during the checkout process

Utilize the extension point to implement custom strategies for replacing items in the cart during the checkout process.

**\Spryker\Zed\ServicePointCartExtension\Dependency\Plugin\ServicePointQuoteItemReplaceStrategyPluginInterface**

Example Implementation:

**\Spryker\Zed\ClickAndCollectExample\Communication\Plugin\ServicePointCart\ClickAndCollectExampleServicePointQuoteItemReplaceStrategyPlugin**

This example replacement strategy substitutes a product offer with another based on updated information about the Service Point and Shipment Type in the shopping cart.

At the project level, extend this capability to support more intricate scenarios, such as:

1. Receiving information from external systems about the offer intended for replacement.
2. Implementing diverse algorithms for cart item replacement based on information obtained from customers.
