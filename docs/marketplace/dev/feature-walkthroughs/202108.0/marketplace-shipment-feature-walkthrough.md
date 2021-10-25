---
title: Marketplace Shipment feature walkthrough
last_updated: Aug 2, 2021
description: The Marketplace Shipment feature provides the connection between Merchant and Shipment.
template: feature-walkthrough-template
---

The *Marketplace Shipment* feature provides the connection between Merchant and Shipment, used together with [marketplace orders](/docs/marketplace/dev/feature-walkthroughs/{{ page.version }}/marketplace-order-management-feature-walkthrough.html) to split order items into several shipments based on the merchants from which the items were bought.

{% info_block warningBox "User documentation" %}

To learn more about the feature and to find out how end users use it, see [Marketplace Shipment feature overview](/docs/marketplace/user/features/{{ page.version }}/marketplace-shipment-feature-overview.html) for business users.
{% endinfo_block %}

## Module dependency graph

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/448f4d60-ebdb-4380-bfc9-21b6c49ddf3f.png?utm_medium=live&utm_source=confluence)

<div class="width-100">

| MODULE     | DESCRIPTION                |
|------------|----------------------------|
| [MerchantShipment](https://github.com/spryker/merchant-shipment) |  Provides connection between merchant and shipment.  |
| [MerchantShipmentGui](https://github.com/spryker/merchant-shipment-gui) |  Module is responsible for providing the Zed Administrative Interface for merchant shipment functionality.  |
| [Merchant](https://github.com/spryker/merchant) | This module provides DB structure and functionality to manage Merchants.  |
| [Shipment](https://github.com/spryker/shipment) | Shipment enables shipment features with shipment carriers and shipment methods. The shipment method is linked to the sales order which for example can be selected during checkout in Yves. Each shipment method is linked to a shipment carrier and a shipment carrier can have zero to many shipment methods.  |
| [ShipmentGui](https://github.com/spryker/shipment-gui) | Module is responsible for providing the Zed Administrative Interface for shipment functionality. |
| [ShipmentGuiExtension](https://github.com/spryker/shipment-gui-extension) | ShipmentGuiExtension module provides interfaces of plugins to extend ShipmentGui module from the other modules. |

</div>

## Domain model
![Domain Model](https://confluence-connect.gliffy.net/embed/image/bc12cbec-87e4-4913-9885-e1986df6f464.png?utm_medium=live&utm_source=confluence)

## Related Developer articles

|INTEGRATION GUIDES  |GLUE API GUIDES  |DATA IMPORT  | REFERENCES  |
|---------|---------|---------|--------|
| [Marketplace Shipment feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-shipment-feature-integration.html) |  |
| [Marketplace Shipment + Cart feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-shipment-cart-feature-integration.html) |  |
| [Marketplace Shipment + Customer feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-shipment-customer-feature-integration.html) |   |
| [Marketplace Shipment + Checkout feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/marketplace-shipment-checkout-feature-integration.html) |  |
|    |    |    |    |
