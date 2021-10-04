---
title: Marketplace Order Management feature walkthrough
description: The Marketplace Order Management feature allows Marketplace customers to place orders
template: feature-walkthrough-template
---

<!--- Feature summary. Short and precise explanation of what the feature brings in terms of functionality.
-->

With the *Marketplace Order Management* feature, default orders that contain additional information about the merchants are called Marketplace orders.
Every Order is linked with Merchant Order and Merchant so that an Order can consist of different Merchant Orders, every Merchant Order belongs to one merchant only.

Every merchant can view and manage only the orders that are related to their items only.

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

<!--- Feel free to drop the following part if the User doc is not yet published-->
{% info_block warningBox "User documentation" %}

Merchant Order is created by Merchant State Machine in MerchantStateMachineHandlerPlugin, it requires StateMachineItem and MerchantOrderItem

To learn more about the feature and to find out how end users use it, see [Marketplace Order Management](/docs/marketplace/user/features/{{page.version}}/marketplace-order-management-feature-overview/marketplace-order-management-feature-overview.html) feature overview for business users.
{% endinfo_block %}

## Module dependency graph

Merchant Order
![Module Dependency Graph](https://confluence-connect.gliffy.net/embed/image/901b201a-030b-4824-a136-ef06d258a41b.png?utm_medium=live&utm_source=confluence)

<!--
Diagram content:
    -The module dependency graph SHOULD contain all the modules that are specified in the feature  (don't confuse with the module in the epic)
    - The module dependency graph MAY contain other module that might be useful or required to show
Diagram styles:
    - The diagram SHOULD be drown with the same style as the example in this doc
    - Use the same distance between boxes, the same colors, the same size of the boxes
Table content:
    - The table that goes after diagram SHOULD contain all the modules that are present on the diagram
    - The table should provide the role each module plays in this feature
-->
| MODULE     | DESCRIPTION                |
|------------|----------------------------|
| MerchantOrderTotal | Provides a sum calculation for a merchant order|
| MerchantOrder | Provides Merchant related information for Order |
| MerchantOrderItem | Provides Merchant related information for Order Item |


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

[Marketplace Shipment](/docs/marketplace/dev/feature-walkthroughs/marketplace-shipment-feature-walkthrough.html)

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

