---
title: Marketplace Order Management feature walkthrough
description: The Marketplace Order Management feature lets Marketplace customers place orders.
template: feature-walkthrough-template
related:
    - title: MerchantOms
      link: docs/marketplace/dev/feature-walkthroughs/page.version/marketplace-order-management-feature-walkthrough/merchant-oms.html
    - title: Marketplace Shipment
      link: docs/marketplace/dev/feature-walkthroughs/page.version/marketplace-shipment-feature-walkthrough.html
    - title: Marketplace and merchant state machines
      link: docs/marketplace/user/features/page.version/marketplace-order-management-feature-overview/marketplace-and-merchant-state-machines-overview/marketplace-and-merchant-state-machines-overview.html
    - title: Marketplace and merchant state machines interaction
      link: docs/marketplace/user/features/page.version/marketplace-order-management-feature-overview/marketplace-and-merchant-state-machines-overview/marketplace-and-merchant-state-machines-interaction.html
    - title: 'How-to: Create a new MerchantOms flow'
      link: docs/marketplace/dev/howtos/how-to-create-a-new-merchant-oms-flow.html
---


*Marketplace Order Management* enables splitting orders into merchant orders and letting product offers be bought directly from a Storefront.
The orders are designed to be used by the Marketplace operator, while the merchant orders are always connected to a merchant. See [Marketplace domain model](/docs/marketplace/dev/architecture-overview/marketplace-domain-model.html) to learn more about the core Marketplace objects.

By using `MerchantSalesOrderFacade::createMerchantOrderCollection()`, you can decide when to create merchant orders out of an order in your project. By default, it is created by `CreateMerchantOrdersCommandPlugin`.

{% info_block warningBox "User documentation" %}

To learn more about the feature and to find out how end users use it, see [Marketplace Order Management](/docs/marketplace/user/features/{{page.version}}/marketplace-order-management-feature-overview/marketplace-order-management-feature-overview.html) feature overview for business users.

{% endinfo_block %}

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


## Merchant orders in the Merchant Portal

{% info_block warningBox “Warning” %}

Do not build the Merchant functionality around Orders, but rather around Merchant Orders.
Make sure that Merchants do not modify the order directly, but instead use [MerchantOms](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-order-management-feature-walkthrough/merchant-oms.html) for this purpose.

{% endinfo_block %}

In the Merchant Portal, merchants can view and manage their `MerchantOrders`.

The information in the Merchant Portal is limited and includes:
- Customer information
- Shipment address
- Merchant order overview
- Totals

Merchant order uses its own totals based on order totals, restricted by the Merchant Order Item:
- refundTotal
- grandTotal
- taxTotal
- expenseTotal
- subtotal
- discountTotal
- canceledTotal

The *merchant order total* is the sum of the totals of items of an order relating to the merchant order.

## Related Developer articles

|INTEGRATION GUIDES  |GLUE API GUIDES  |DATA IMPORT  | REFERENCES  |
|---------|---------|---------|--------|
| [Marketplace Order Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-order-management-feature-integration.html)    | [Retrieving Marketplace orders](/docs/marketplace/dev/glue-api-guides/{{page.version}}/retrieving-marketplace-orders.html)        | [File details: merchant_oms_process.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-oms-process.csv.html)        |  [MerchantOms](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-order-management-feature-walkthrough/merchant-oms.html)  |
| [Marketplace Order Management + Order Threshold feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-order-management-order-threshold-feature-integration.html)    |         | [File details: merchant-order-status.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-order-status.csv.html)        |  [How-to: Creation a new MerchantOms flow](/docs/marketplace/dev/howtos/how-to-create-a-new-merchant-oms-flow.html)   |
| [Marketplace Order Management + Customer Account Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-order-management-customer-account-management-feature-integration.html)    |         |         |
