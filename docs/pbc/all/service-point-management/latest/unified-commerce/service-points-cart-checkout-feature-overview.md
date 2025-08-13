---
title: Service Points Cart + Checkout feature overview
description: General overview of the Service Points Cart + Checkout feature for your Spryuker Unified Commerce Projects.
template: concept-topic-template
redirect_from:
last_updated: Dec 19, 2023
---

This feature provides an example of a replacement strategy used by Click & Collect. The strategy is needed to replace a product offer with another product offer after a customer changes a service point or a shipment type in cart.

The default replacement strategy works as follows:
- When a customer changes a shipment type, a service point, or both, the replacement strategy is triggered.
- All available product offers are parsed based on the product SKU, merchant of the original offer, the updated shipment type and service point.
- If one or more product offers with the selected shipment type and service point are found, the product offer with the lowest price replaces the product offer in the cart. The offer must be active and have enough stock to fulfill the order.

## Example of a replacement strategy execution

A product sold by a merchant has the following product offers:

| PRODUCT OFFER REFERENCE | SERVICE | SHIPMENT TYPE |
| - | - |
| Offer1 |   Pickup at Munich Main Store | Pickup |
| Offer2 |   Pickup at Berlin Main Store | Pickup |
| Offer3 | | Delivery |

A customer has a product with the *Offer3* in cart. During checkout, the customer changes the *Delivery* shipment type to *Pickup* and select the *Berlin Main Store* as a pickup location.
Then, *Offer3* is replaced with *Offer2*.

## Creating other scenarios

On the project level, you can extend this feature to support more complex scenarios, like the following:
- Getting information from external systems about the offer you want to replace the current offer with.
- Have different algorithms for replacement based on information obtained from a customer.

## Current constraints

- The example strategy does not support a use case where the same product SKU from the same merchant is added to the shopping cart as two separate cart line items. If you are going to use the example strategy in production, we recommend implementing the following logic: when a product is added to cart, if the same product from the same merchant is already in cart, the quantity is updated regardless of the specific product offer.
- The example replacement strategy supports only concrete products. Product bundles and configurable products are not supported.

## Related Developer documents

| INSTALLATION GUIDES |
| - |
| [Install the Service Points Cart + Checkout feature](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/install-features/install-the-service-points-cart-checkout-feature.html) |
