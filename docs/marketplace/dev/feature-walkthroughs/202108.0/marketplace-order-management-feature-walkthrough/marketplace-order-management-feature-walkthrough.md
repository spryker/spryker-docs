---
title: Marketplace Order Management feature walkthrough
description: The Marketplace Order Management feature allows Marketplace customers to place orders.
template: feature-walkthrough-template
---


*Marketplace Order Management* enables splitting Orders into Merchant Orders and allowing Product Offers to be bought directly from a Storefront.
The Orders are designed to be used by the Marketplace operator, while the Merchant Orders are always connected to a Merchant. See [Marketplace domain model](/docs/marketplace/dev/architecture-overview/marketplace-domain-model.html) to learn more about the core Marketplace objects.

By using `MerchantSalesOrderFacade::createMerchantOrderCollection()`, you can decide when to create Merchant Orders out of an Order in your project. By default, it is created by `CreateMerchantOrdersCommandPlugin`.

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
| [MerchantSalesOrderMerchantUserGui](https://github.com/spryker/merchant-sales-order-merchant-user-gui) | Backoffice UI for managing merchant sales orders for the Marketplace operator. |
| [MerchantSalesOrderWidget](https://github.com/spryker-shop/merchant-sales-order-widget) | Provides Merchant Order information for Yves. |
| [Oms](https://github.com/spryker/oms) | Order management system for implementing complex process flows using the state machines. |
| [OmsProductOfferReservation](https://github.com/spryker/oms-product-offet-reservation) | Provides functionality for save/update/remove reservations for the product offers. |
| [ProductOfferReservationGui](https://github.com/spryker/product-offer-reservation-gui) | Backoffice UI component for managing reservations for product offers. |
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

Do not build Merchant functionality around Orders, but rather around Merchant Orders.
Make sure that Merchants do not modify the order directly, but instead use MerchantOms (/docs/marketplace/dev/feature-walkthroughs/[version]/marketplace-order-management-feature-walkthrough/merchant-oms.html) for this purpose.
 
{% endinfo_block %}
 
In the Merchant Portal, a Merchant can view and manage their `MerchantOrders`.

The information in the Merchant Portal is limited and includes:
- customer information
- shipment address
- merchant order overview
- totals

Merchant Order uses its own Totals, based on Order Totals, restricted by the Merchant Order Item:
- refundTotal
- grandTotal
- taxTotal
- expenseTotal
- subtotal
- discountTotal
- canceledTotal

A *merchant order total* is the sum of the totals of items of an order relating to the merchant order.


## Learn more

- [MerchantOms](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-order-management-feature-walkthrough/merchant-oms.html)

- [Marketplace Shipment](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-shipment-feature-walkthrough.html)

- [Marketplace & Merchant State Machines](https://spryker.atlassian.net/wiki/spaces/DOCS/pages/1296599943/Reviewed+Marketplace+Merchant+State+Machines)

- [Marketplace and Merchant State Machines Interaction](https://spryker.atlassian.net/wiki/spaces/DOCS/pages/1247904276/PUBLISHED+Marketplace+and+Merchant+State+Machines+Interaction)

- [How-to: Creation a new MerchantOms flow](/docs/marketplace/dev/howtos/how-to-create-a-new-merchant-oms-flow.html)

## Related Developer articles

|INTEGRATION GUIDES  |GLUE API GUIDES  |DATA IMPORT  | REFERENCES  |
|---------|---------|---------|--------|
| [Marketplace Order Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-order-management-feature-integration.html)    | [Retrieving Marketplace orders](/docs/marketplace/dev/glue-api-guides/{{page.version}}/retrieving-marketplace-orders.html)        | [File details: merchant_oms_process.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-oms-process.csv.html)        |  [MerchantOms](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-order-management-feature-walkthrough/merchant-oms.html)  |
| [Marketplace Order Management + Order Threshold feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-order-management-order-threshold-feature-integration.html)    |         | [File details: merchant-order-status.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-order-status.csv.html)        |  [How-to: Creation a new MerchantOms flow](/docs/marketplace/dev/howtos/how-to-create-a-new-merchant-oms-flow.html)   |
| [Marketplace Order Management + Customer Account Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-order-management-customer-account-management-feature-integration.html)    |         |         |
| [Marketplace Order Management + Cart feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-order-management-cart-feature-integration.html)     |         |         |

