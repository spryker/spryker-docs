---
title: "Marketplace Order Management feature: Domain model and relationships"
description: The Marketplace Order Management feature lets Marketplace customers place orders.
template: feature-walkthrough-template
last_updated: Nov 21, 2023
related:
    - title: MerchantOms
      link: docs/pbc/all/order-management-system/page.version/marketplace/merchant-oms.html
    - title: Marketplace Shipment
      link: docs/pbc/all/carrier-management/page.version/marketplace/marketplace-shipment-feature-overview.html
    - title: Marketplace and merchant state machines
      link: docs/pbc/all/order-management-system/page.version/marketplace/marketplace-order-management-feature-overview/marketplace-and-merchant-state-machines-overview/marketplace-and-merchant-state-machines-overview.html
    - title: Marketplace and merchant state machines interaction
      link: docs/pbc/all/order-management-system/page.version/marketplace/marketplace-order-management-feature-overview/marketplace-and-merchant-state-machines-overview/marketplace-and-merchant-state-machines-interaction.html
    - title: 'How-to: Create a new MerchantOms flow'
      link: docs/pbc/all/order-management-system/page.version/marketplace/create-merchant-oms-flows.html
---


*Marketplace Order Management* enables splitting orders into merchant orders and letting product offers be bought directly from a Storefront.
The orders are designed to be used by the Marketplace operator, while the merchant orders are always connected to a merchant. To learn more about the core Marketplace objects, see [Marketplace domain model](/docs/dg/dev/architecture/marketplace-architecture/marketplace-domain-model.html).

By using `MerchantSalesOrderFacade::createMerchantOrderCollection()`, you can decide when to create merchant orders out of an order in your project. By default, it is created by `CreateMerchantOrdersCommandPlugin`.

## Module dependency graph

The following diagram illustrates the dependencies between the modules for the *Marketplace Order Management* feature.

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/901b201a-030b-4824-a136-ef06d258a41b.png?utm_medium=live&utm_source=confluence)

<div class="width-100">

| MODULE     | DESCRIPTION                |
|------------|----------------------------|
| [MerchantOms](https://github.com/spryker/merchant-oms) | Provides the order management system functionality for the merchant orders. |
| [MerchantOmsDataImport](https://github.com/spryker/merchant-oms-data-import) | Data importer for the `MerchantOms`. | Backoffice UI interface for the Merchant Oms management. |
| [MerchantSalesOrder](https://github.com/spryker/merchant-sales-order)  | Provides functionality for managing merchant orders. |
| [MerchantSalesOrderDataExport](https://github.com/spryker/merchant-sales-order-data-export) | Provides possibility to export data related to the merchant orders. |
| [MerchantSalesOrderMerchantUserGui](https://github.com/spryker/merchant-sales-order-merchant-user-gui) | Back Office UI for managing merchant sales orders for the Marketplace operator. |
| [MerchantSalesOrderWidget](https://github.com/spryker-shop/merchant-sales-order-widget) | Provides Merchant Order information for Yves. |
| [Oms](https://github.com/spryker/oms) | Order management system for implementing complex process flows using the state machines. |
| [OmsProductOfferReservation](https://github.com/spryker/oms-product-offer-reservation) | Provides functionality for save/update/remove reservations for the product offers. |
| [ProductOfferReservationGui](https://github.com/spryker/product-offer-reservation-gui) | Back Office UI component for managing reservations for product offers. |
| [ProductOfferSales](https://github.com/spryker/product-offer-sales) | Connects product offer and sales entities. |
| [Sales](https://github.com/spryker/sales) | Provides the order management core functionality. |
| [MerchantSalesOrderExtension](https://github.com/spryker/merchant-sales-order-extension) | Extension point for the `MerchantSalesOrder`. |
| [MerchantSalesOrderThresholdGui](https://github.com/spryker/merchant-sales-order-threshold-gui) | Provides Zed UI interface for Merchant Order threshold management. |
| [SalesMerchantPortalGui](https://github.com/spryker/sales-merchant-portal-gui) | Provides UI for managing Merchant Sales in the Merchant Portal. |
</div>

## Domain model

The following diagram illustrates the domain model of the Marketplace Order Management feature:

![Domain Model](https://confluence-connect.gliffy.net/embed/image/041ca5e4-7738-47ac-a01b-4ed91a57662d.png?utm_medium=live&utm_source=confluence)
