---
title: Marketplace Order Management feature walkthrough
description: The Marketplace Order Management feature allows Marketplace customers to place orders
template: feature-walkthrough-template
---


*Marketplace Order Management* enables splitting Orders into Merchant Orders and allows Product Offers to be bought from a the Storefront application.
The Orders are designed to be used by the Marketplace operator, while the Merchant Orders are always connected to a Merchant (Learn more about [Core Marketplace domain objects here](/docs/marketplace/dev/architecture-overview/marketplace-domain-model.html)).

It's up to the project to decide when to create Merchant Orders out of an Order by using `MerchantSalesOrderFacade::createMerchantOrderCollection()`. Out of the box it is created by `CreateMerchantOrdersCommandPlugin`.



{% info_block warningBox "User documentation" %}


To learn more about the feature and to find out how end users use it, see [Marketplace Order Management](/docs/marketplace/user/features/{{page.version}}/marketplace-order-management-feature-overview/marketplace-order-management-feature-overview.html) feature overview for business users.
{% endinfo_block %}

## Module dependency graph

![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/901b201a-030b-4824-a136-ef06d258a41b.png?utm_medium=live&utm_source=confluence)
<div class="width-100">

| MODULE     | DESCRIPTION                |
|------------|----------------------------|
| [MerchantOms](https://github.com/spryker/merchant-oms) | Provides order management system functionality for merchant orders |
| [MerchantOmsDataImport](https://github.com/spryker/merchant-oms-data-import) | Data importer for MerchantOms |
| [MerchantOmsGui](https://github.com/spryker/merchant-oms-gui) | Provides Backoffice UI interface for Merchant Oms management |
| [MerchantSalesOrder](https://github.com/spryker/merchant-sales-order)  | Provides functionality for managing Merchant Orders |
| [MerchantSalesOrderDataExport](https://github.com/spryker/merchant-sales-order-data-export) | Provides possibility to export data related to merchant orders |
| [MerchantSalesOrderMerchantUserGui](https://github.com/spryker/merchant-sales-order-merchant-user-gui) | Provides Backoffice UI interface for merchant sales order management for Marketplace Operator |
| [MerchantSalesOrderWidget](https://github.com/spryker-shop/merchant-sales-order-widget) | Provides Merchant Order information for Yves |
| [Oms](https://github.com/spryker/oms) | Order management system for implementing complex process flows using state machines |
| [OmsProductOfferReservation](https://github.com/spryker/oms-product-offet-reservation) | Provides functionality for save/update/remove reservations for product offers |
| [ProductOfferReservationGui](https://github.com/spryker/product-offer-reservation-gui) | Backoffice Administrative Interface component for managing reservations for Product Offers |
| [ProductOfferSales](https://github.com/spryker/product-offer-sales) | Connects Product Offer and Sales domains |
| [Sales](https://github.com/spryker/sales) | Provides the order management core functionality |
| [MerchantSalesOrderExtension](https://github.com/spryker/merchant-sales-order-extension) | Extension point for MerchantSalesOrder |
| [MerchantSalesOrderThresholdGui](https://github.com/spryker/merchant-sales-order-threshold-gui) | Provides Zed UI interface for Merchant Order threshold management |
| [SalesMerchantPortalGui](https://github.com/spryker/sales-merchant-portal-gui) | Provides UI for managing Merchant Sales in Merchant Portal |
</div>

## Domain model

![Domain Model](https://confluence-connect.gliffy.net/embed/image/041ca5e4-7738-47ac-a01b-4ed91a57662d.png?utm_medium=live&utm_source=confluence)


## Merchant Portal
{% info_block warningBox “Warning” %}

Don't build any Merchant functionality around Order, rather you should build it around Merchant Orders.
Never let Merchants modify Order directly, instead use [MerchantOms](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-order-management-feature-walkthrough/merchant-oms.html)) for this purpose 
 
{% endinfo_block %}
 
In Merchant Portal, a Merchant can view and manage its MerchantOrders.

The information in Merchant Portal is limited and includes:
- customer
- shipment address
- merchant order overview
- totals

Merchant Order uses its own Totals, based on Order Totals, restricted with Merchant Order Item:
- refundTotal
- grandTotal
- taxTotal
- expenseTotal
- subtotal
- discountTotal
- canceledTotal

*Merchant Order total* is the sum of the totals of items of an order that related to the MerchantOrder. 




## Learn more

[MerchantOms](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-order-management-feature-walkthrough/merchant-oms.html)

[Marketplace Shipment](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-shipment-feature-walkthrough.html)

[Marketplace & Merchant State Machines](https://spryker.atlassian.net/wiki/spaces/DOCS/pages/1296599943/Reviewed+Marketplace+Merchant+State+Machines)

[Marketplace and Merchant State Machines Interaction](https://spryker.atlassian.net/wiki/spaces/DOCS/pages/1247904276/PUBLISHED+Marketplace+and+Merchant+State+Machines+Interaction)

[How-to: Creation a new MerchantOms flow](/docs/marketplace/dev/howtos/how-to-create-a-new-merchant-oms-flow.html)

## Related Developer articles
<!-- Usually filled by a technical writer. You can omit this part -->

|INTEGRATION GUIDES  |GLUE API GUIDES  |DATA IMPORT  | REFERENCES  |
|---------|---------|---------|--------|
| [Marketplace Order Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-order-management-feature-integration.html)    | [Retrieving Marketplace orders](/docs/marketplace/dev/glue-api-guides/{{page.version}}/retrieving-marketplace-orders.html)        | [File details: merchant_oms_process.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-oms-process.csv.html)        |
| [Marketplace Order Management + Order Threshold feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-order-management-order-threshold-feature-integration.html)    |         | [File details: merchant-order-status.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-order-status.csv.html)        |
| [Marketplace Order Management + Customer Account Management feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-order-management-customer-account-management-feature-integration.html)    |         |         |
| [Marketplace Order Management + Cart feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-order-management-cart-feature-integration.html)     |         |         |

