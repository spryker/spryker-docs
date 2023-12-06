---
title: Service Points Cart + Checkout feature overview
description: General overview of the Service Points Cart + Checkout feature
template: concept-topic-template
---

This feature provides an example of a replacement strategy used by Click & Collect. The strategy is needed to replace a product offer with another product offer after a customer changes a service point or a shipment type in cart.

How does it work?
* When a customer changes a shipment type and/or a service point, the replacement strategy is triggered.
* The strategy applies the selected shipment type and/or service point to the product offers in the system. These are available for the selected product SKU and Merchant linked to the product offer.
* If a match is found, the product offer with the lower price is selected and replaces the current product offer in the cart.
Additionally, the strategy checks the availability of the offer. This means it should be Active and have enough stock to fulfill the order.

Example of Strategy Execution:

A product sold by a merchant has the following product offers created:

|*Product Offer Reference*|*Service*|*Shipment Type*|
|Offer1|Pickup at Munich Main Store|Pickup|
|Offer2|Pickup at Berlin Main Store|Pickup|
|Offer3|-|Delivery|

If a customer has a product in the cart with *Offer3*, and then they select *Pickup* during checkout, and proceed to select *Berlin Main Store* as a service point location, the system will replace the cart line item with another product offer, *Offer2*.


On the project level, you can extend this feature to support more complex scenarios, like the following:
* Getting information from external systems about the offer you want to replace the current offer with.
* Have different algorithms for replacement based on information obtained from a customer.

## Current constraints

* The example strategy does not support a use case where the same product SKU from the same merchant is added to the shopping cart as two separate cart line items. We recommend implementing the following logic on a project level if you intend to use the example strategy in production:
* * When a product is added to the shopping cart, if the same product from the same merchant is already present, the quantity will be updated automatically, regardless of the specific product offer.
* Currently, the example strategy supports only concrete products. We have not yet implemented support for bundles or configurable products.

## Related Developer documents

| INSTALLATION GUIDES |
| - |
| [Install the Service Points Cart + Checkout feature](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/install-and-upgrade/install-the-service-points-cart-checkout-feature.html) |
