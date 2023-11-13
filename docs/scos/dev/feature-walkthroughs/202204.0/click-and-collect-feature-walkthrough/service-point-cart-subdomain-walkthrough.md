---
title: Click and Collect feature Service Point Cart subdomain walkthrough
last_updated: Nov 02, 2023
description: TODO
template: concept-topic-template
---

# Service Point Cart

Enables validation of service points and replacement of line items in a shopping cart.

[Install the Service Points Cart feature](/docs/pbc/all/install-features/{{page.version}}/install-the-service-points-cart-feature.html)

## 1. Modules

| MODULE                      | EXPECTED DIRECTORY                             |
|-----------------------------|------------------------------------------------|
| ServicePointCart            | vendor/spryker/service-point-cart              |
| ServicePointCartExtension   | vendor/spryker/service-point-cart-extension    |
| ServicePointCartsRestApi    | vendor/spryker/service-point-carts-rest-api    |

## 2. Extension point that allows for the implementation of item replacement strategies in the cart during the checkout process

Allows you to provide your strategy for replacing items in your cart.

**\Spryker\Zed\ServicePointCartExtension\Dependency\Plugin\ServicePointQuoteItemReplaceStrategyPluginInterface**

The example of the implementation:

**\Spryker\Zed\ClickAndCollectExample\Communication\Plugin\ServicePointCart\ClickAndCollectExampleServicePointQuoteItemReplaceStrategyPlugin**

An example replacement strategy replaces a product offer with another product offer based on updated information about the Service Point and Shipment Type in the shopping cart.

On a project level, this can be extended to support more complex scenarios such as:

1. Receive information from external systems about the offer you want to replace the current offer with.
2. Have different algorithms for cart item replacement based on information obtained from a customer.
