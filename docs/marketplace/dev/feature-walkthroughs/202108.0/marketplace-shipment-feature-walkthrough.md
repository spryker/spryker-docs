---
title: Marketplace Shipment feature walkthrough
last_updated: Nov 2, 2021
description: The Marketplace Shipment feature provides the connection between Merchant and Shipment.
template: feature-walkthrough-template
---

The *Marketplace Shipment* feature provides the connection between Merchant and Shipment, and works together with [marketplace orders](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-order-management-feature-walkthrough/marketplace-order-management-feature-walkthrough.html) to split order items into several shipments based on the merchants from which they were bought.

{% info_block warningBox "User documentation" %}

To learn more about the feature and to find out how end users use it, see [Marketplace Shipment feature overview](/docs/marketplace/user/features/{{page.version}}/marketplace-shipment-feature-overview.html) for business users.
{% endinfo_block %}

## Module dependency graph

The following diagram illustrates the dependencies between the modules for the *Marketplace Shipment* feature.

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/448f4d60-ebdb-4380-bfc9-21b6c49ddf3f.png?utm_medium=live&utm_source=confluence)

<div class="width-100">

| MODULE     | DESCRIPTION                |
|------------|----------------------------|
| [MerchantShipment](https://github.com/spryker/merchant-shipment) |  Provides connection between merchant and shipment.  |
| [MerchantShipmentGui](https://github.com/spryker/merchant-shipment-gui) |  Module is responsible for providing the Back Office interface for merchant shipment functionality.  |
| [Merchant](https://github.com/spryker/merchant) | This module provides database structure and functionality to manage Merchants.  |
| [Shipment](https://github.com/spryker/shipment) | With shipment features, shipment carriers and shipment methods can be selected. In the Storefront, for example, the shipment method can be selected during checkout. Each shipment method is linked to a shipment carrier, and a shipment carrier can have zero to many shipment methods.  |
| [ShipmentGui](https://github.com/spryker/shipment-gui) | The Back Office interface for shipment functionality is provided by this module. |
| [ShipmentGuiExtension](https://github.com/spryker/shipment-gui-extension) | The `ShipmentGuiExtension` module provides interfaces for plugins to extend the `ShipmentGui` module from other modules. |

</div>

## Domain model

The following schema illustrates the Marketplace Shipment domain model:

![Domain Model](https://confluence-connect.gliffy.net/embed/image/bc12cbec-87e4-4913-9885-e1986df6f464.png?utm_medium=live&utm_source=confluence)

## Related Developer articles

|INTEGRATION GUIDES  |
|---------|
| [Marketplace Shipment feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-shipment-feature-integration.html) |  |
| [Marketplace Shipment + Cart feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-shipment-cart-feature-integration.html) |  |
| [Marketplace Shipment + Customer feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-shipment-customer-feature-integration.html) |   |
| [Marketplace Shipment + Checkout feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-shipment-checkout-feature-integration.html) |  |
|    |    |    |    |
