---
title: Marketplace Shipment feature walkthrough 
last_updated: Aug 2, 2021
description: Merchants are product and service sellers in the Marketplace.
template: concept-topic-template
---

With the *Marketplace Shipment* feature, the [marketplace orders](/docs/marketplace/dev/feature-walkthroughs/{{ page.version }}/marketplace-order-management-feature-walkthrough.html) are split into several shipments based on the merchants from which the items were bought. Merchants can see only shipments with products and offers that belong to them.

To learn more about the feature and to find out how end users use it, see [Marketplace Shipment feature overview](/docs/marketplace/user/features/{{ page.version }}/marketplace-shipment-feature-overview.html) for business users.

![Entity diagram](https://confluence-connect.gliffy.net/embed/image/448f4d60-ebdb-4380-bfc9-21b6c49ddf3f.png?utm_medium=live&utm_source=confluence)

**Modules**

**CheckoutPage** - .

**CheckoutPageExtension** - introduced `CheckoutPageStepEnginePreRenderPluginInterface` extends `StepEnginePreRenderPluginInterface`.

**StepEngine** - injected stack of plugins that implement `CheckoutPageStepEnginePreRenderPluginInterface` and executed before getTemplateVariables() method.  

**StepEngineExtension** - introduced `StepEnginePreRenderPluginInterface`.

**MerchantShipment** - implemented `CheckoutPageStepEnginePreRenderPluginInterface` in `MerchantShipment` module where you go through quote items and set `ItemTransfer.ShipmentTransfer.merchantReference` = `ItemTransfer.merchantReference`. 

## Entity diagram

The following schema illustrates relations in the Marketplace Wishlist entity:

![Entity diagram](https://confluence-connect.gliffy.net/embed/image/bc12cbec-87e4-4913-9885-e1986df6f464.png?utm_medium=live&utm_source=confluence)

| INTEGRATION GUIDES | GLUE API GUIDES  |
| ---------------------- | ---------------- |
| [Marketplace Shipment feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-shipment-feature-integration.html) | [Retrieving an order](/docs/marketplace/dev/glue-api-guides/{{ page.version }}/retrieving-marketplace-orders.html#retrieve-an-order) |
| [Marketplace Shipment + Cart feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-shipment-cart-feature-integration.html) |  |
| [Marketplace Shipment + Customer feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-shipment-customer-feature-integration.html) |   |
| [Marketplace Shipment + Checkout feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-shipment-checkout-feature-integration.html) |  |
|    |    |
