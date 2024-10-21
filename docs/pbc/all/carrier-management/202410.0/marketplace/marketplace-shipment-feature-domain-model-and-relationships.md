---
title: "Marketplace Shipment feature: Domain model and relationships"
last_updated: Nov 2, 2021
description: The Marketplace Shipment feature provides the connection between Merchant and Shipment.
template: feature-walkthrough-template
---

The *Marketplace Shipment* feature provides the connection between Merchant and Shipment, and works together with [marketplace orders](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/marketplace-order-management-feature-overview/marketplace-order-management-feature-overview.html) to split order items into several shipments based on the merchants from which they were bought.

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
