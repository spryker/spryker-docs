---
title: Click and Collect feature Service Point Cart subdomain walkthrough
last_updated: Nov 02, 2023
description: TODO
template: concept-topic-template
---

# Service Point Cart

Provides support for service points validation and replacement in a cart.

[Install the Service Points Cart feature](/docs/pbc/all/install-features/{{page.version}}/install-the-service-points-cart-feature.html)

## 1. Modules

| MODULE                      | EXPECTED DIRECTORY                             |
|-----------------------------|------------------------------------------------|
| ServicePointCart            | vendor/spryker/service-point-cart              |
| ServicePointCartExtension   | vendor/spryker/service-point-cart-extension    |
| ServicePointCartsRestApi    | vendor/spryker/service-point-carts-rest-api    |

## 2. Extension point for item replacement strategy in the cart during checkout process

Allows to provide your own replacement strategy for items in the cart.

**\Spryker\Zed\ServicePointCartExtension\Dependency\Plugin\ServicePointQuoteItemReplaceStrategyPluginInterface**

The example of the implementation:

**\Spryker\Zed\ClickAndCollectExample\Communication\Plugin\ServicePointCart\ClickAndCollectExampleServicePointQuoteItemReplaceStrategyPlugin**

An example replacement strategy replaces a product offer with another product offer based on updated information about the Service Point and Shipment Type in the shopping cart.

On a project level, this can be extended to support more complex scenarios such as:

1. Getting information from external systems about the offer you want to replace the current offer with.
2. Have different algorithms for replacement based on information obtained from a customer.
