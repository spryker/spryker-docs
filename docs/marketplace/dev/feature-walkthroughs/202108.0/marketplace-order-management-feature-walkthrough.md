---
title: Marketplace Order Management feature walkthrough
description: The Marketplace Order Management feature allows Marketplace customers to place orders
template: feature-walkthrough-template
---

 

*Marketplace Order Management* enables splitting Orders into Merchant Orders and allows Product Offers to be bought from a store front app.
Plain Orders are desgined to be used by the Marketplace operator, while Merchant Orders are always connected to a Merchant.

{% info_block warningBox “Warning” %}

Don't built Merchant functionality around Order, rather you should build it around Merchant Orders.
Never let Merchants modify Order directly. 
 
{% endinfo_block %}
 
A Merchant can view and manage the order items that are related to their Merchant Order only.

The information in merchant portal is limited and includes^
- customer
- shipment info
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

*Merchant Order total* is the sum of the totals making up the merchant order. The *Merchant Order total* is in one to one relation to the *Merchant Order*. The *Merchant Order total* is in many to one relation to the *Marketplace/Sales Order total*. The sum of all the merchant order totals and Marketplace-assigned expenses equals the *Marketplace order total*. *Merchant Order total* is calculated by the Calculation module when Merchant Order collection is created.

 
{% info_block warningBox "User documentation" %}

Merchant Order is created by Merchant State Machine in MerchantStateMachineHandlerPlugin, it requires StateMachineItem and MerchantOrderItem

To learn more about the feature and to find out how end users use it, see [Marketplace Order Management](/docs/marketplace/user/features/{{page.version}}/marketplace-order-management-feature-overview/marketplace-order-management-feature-overview.html) feature overview for business users.
{% endinfo_block %}

## Module dependency graph

Merchant Order
![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/901b201a-030b-4824-a136-ef06d258a41b.png?utm_medium=live&utm_source=confluence)

| MODULE     | DESCRIPTION                |
|------------|----------------------------|
| Merchant | Provides functionality to save/update/remove Merchants |
| MerchantOms | Provides order management system functionality for merchant orders |
| MerchantOmsDataImport | Data importer for MerchantOms |
| MerchantOmsGui | Provides Backoffice UI interface for Merchant Oms management |
| MerchantSalesOrder | Provides functionality to link merchant to sales orders |
| MerchantSalesOrderDataExport | Provides possibility to export data related to merchant orders |
| MerchantSalesOrderMerchantUserGui | Provides Backoffice UI interface for merchant sales order management |
| MerchantSalesOrderWidget | Provides merchant sales order information |
| Oms | Order management system for implementing complex process flows using state machines |
| OmsProductOfferReservation | Provides functionality for save/update/remove reservations for product offers |
| OrderCancelWidget | Widget module is responsible for displaying an order cancelation functionality |
| ProductOfferReservationGui | Backoffice Administrative Interface component for managing reservations for product offers |
| ProductOfferSales | Provides product offer functionality to Sales module |
| Sales | Provides the order management functionality |
| SalesOms | Provides ability to manipulate order item states |
| MerchantSalesOrderExtension | Provides plugin interfaces for MerchantSalesOrder module |
| MerchantSalesOrderThresholdGui | Provides Zed UI interface for merchant sales order threshold management |
| ProductOfferSalesRestApi | Provides REST API endpoints to manage product offer sales |
| SalesMerchantPortalGui | Provides components for merchant orders management |
| SalesMerchantPortalGuiExtension | Provides extension interfaces for SalesMerchantPortalGui module |


## Domain model
<!--
- Domain model SHOULD contain all the entities that were adjusted or introduced by the feature.
- All the new connections SHOULD also be shown and highlighted properly 
- Make sure to follow the same style as in the example
-->
![Domain Model](https://confluence-connect.gliffy.net/embed/image/041ca5e4-7738-47ac-a01b-4ed91a57662d.png?utm_medium=live&utm_source=confluence)

<!--
- Here you CAN cover the features technical topic in more details, if needed.
- A diagram SHOULD be placed to make the content easier to grasp
-->

## Learn more

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

