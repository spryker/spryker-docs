---
title: Marketplace Order Management feature overview
description: This document contains concept information for the Marketplace order feature in the Spryker Commerce OS.
template: concept-topic-template
redirect_from:
last_updated: Nov 21, 2023
related:
  - title: Marketplace order overview
    link: docs/pbc/all/order-management-system/page.version/marketplace/marketplace-order-management-feature-overview/marketplace-order-overview.html
  - title: Merchant order overview
    link: docs/pbc/all/order-management-system/page.version/marketplace/marketplace-order-management-feature-overview/merchant-order-overview.html
  - title: Marketplace and merchant state machines overview
    link: docs/pbc/all/order-management-system/page.version/marketplace/marketplace-order-management-feature-overview/marketplace-and-merchant-state-machines-overview/marketplace-and-merchant-state-machines-overview.html
  - title: Marketplace and merchant state machines interaction
    link: docs/pbc/all/order-management-system/page.version/marketplace/marketplace-order-management-feature-overview/marketplace-and-merchant-state-machines-overview/marketplace-and-merchant-state-machines-interaction.html
  - title: Managing marketplace orders
    link: docs/pbc/all/order-management-system/page.version/marketplace/manage-in-the-back-office/manage-marketplace-orders.html
---

When a customer places an order on the Marketplace, the *Marketplace order* is created in the system. Compared to a regular order in Spryker Commerce OS, the Marketplace order contains information about merchants and one or several [merchant orders](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/marketplace-order-management-feature-overview/merchant-order-overview.html). Thus, the Marketplace order represents a list of items a customer has bought from one or multiple merchants in a single order.

![Marketplace order](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Marketplace+and+Merchant+orders/Marketplace+order+feature+overview/marketplace-order.png)

Each Marketplace order has a set of properties such as order number, order summary, payment information, date, state, shipping methods, and others.

For example, let's consider the case when a customer purchased four items from three different merchants in one order.
From the customer perspective, the Marketplace order is a single order with products from one or multiple merchants:

![Marketplace order structure](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+order+management/Marketplace+Order+Management+feature+overview/Marketplace+Order+schema.png)

The items in the Marketplace order are grouped by merchant and split into different shipments automatically by default. However, you can change this behavior on the project level according to your business requirements. During the checkout, customers can check how many shipments to expect and select different delivery addresses or methods based on their items. To learn more about multiple shipments, see the [Split Delivery feature overview](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/order-management-feature-overview/split-delivery-overview.html).

As the Marketplace order contains details about offers and products a customer has bought from multiple merchants, the Marketplace order list with the related information is only available to the Marketplace administrator in the Back Office. <!---See LINK TO BACK OFFICE FOR ORDERS for details about how Marketplace administrators can manage Marketplace orders in the Back Office.--> Each [merchant order](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/marketplace-order-management-feature-overview/merchant-order-overview.html) can be accessed and managed by the relevant merchant in the Merchant Portal.<!---See LINK TO MERCHANT PORTAL FOR ORDERS for details about how merchants can manage their orders in the Merchant Portal.-->

![Merchant order in the Merchant Portal](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Marketplace+and+Merchant+orders/Marketplace+order+feature+overview/merchant-order-in-merchant-portal.png)

## Marketplace and merchant order states machines
You can coordinate the Marketplace and merchant orders processing by triggering the state machine events.

For details about the Marketplace and merchant order state machines, see [Marketplace and merchant state machines](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/marketplace-order-management-feature-overview/marketplace-and-merchant-state-machines-overview/marketplace-and-merchant-state-machines-overview.html).

For details about how the two state machines interact, see [Marketplace and merchant state machine interactions](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/marketplace-order-management-feature-overview/marketplace-and-merchant-state-machines-overview/marketplace-and-merchant-state-machines-interaction.html).

## Marketplace order calculation
By default, calculations for the Marketplace order items are performed using the item price (product offer price or the price inherited from the concrete or abstract product), their totals, subtotal aggregation, and tax information.

The Marketplace order contains all the [totals from the Merchant orders](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/marketplace-order-management-feature-overview/merchant-order-overview.html) and is defined by the following formula:

{% info_block infoBox "Info" %}

Marketplace Sales Order Total = ∑ Merchant Order Totals + ∑ Marketplace Sales Order Expense Totals.

{% endinfo_block %}

At the same time, each Marketplace Order Total includes the sum of the respective Merchant Order Totals, for example:

* Marketplace Sales Order Subtotal = Merchant Order Subtotal 1 + Merchant Order Subtotal 2 + Merchant Order Subtotal n.
* Marketplace Sales Order Discount Total = ∑ Discount Totals included in all Merchant Orders. Check [Marketplace Promotions and Discounts feature overview](/docs/pbc/all/discount-management/{{page.version}}/marketplace/marketplace-promotions-discounts-feature-overview.html) to learn how the discounts are calculated.
* Marketplace Sales Order Tax Total= ∑ Merchant Order Tax Totals.
* Marketplace Sales Order Grand Total = ∑ Merchant Order Grand Totals.
* Marketplace Sales Order Refund Total = ∑ Merchant Order Refund Totals.
* Marketplace Sales Order Canceled Total = ∑ Merchant Order Canceled Totals.

The sum of Merchant Order Expense Totals may not equal the Marketplace Sales Order Expense Total, as the Marketplace order itself may have additional expenses or fees that do not relate to Merchant orders.

![Marketplace order calculation](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Marketplace+and+Merchant+orders/Marketplace+order+feature+overview/marketplace-order-calculation.png)

### Rounding
Rounding rules for a regular SCOS sales order also apply to the Marketplace order. The rules imply:

* The rounding is performed on the third decimal number.
* If the number you are rounding is followed by 5, 6, 7, 8, or 9, round the number up. Example: The number  325.78<u>7</u>21 will be rounded to 325.79.
* If the number you are rounding is followed by 0, 1, 2, 3, or 4, round the number down. Example:  The number 62.53<u>4</u>7 will be rounded to 62.53.

{% info_block warningBox "Warning" %}

In some cases, because of rounding, the amounts of Marketplace order totals can differ from the amounts of the Merchant order totals in a matter of a cent or less. You can modify the behavior by changing the rounding algorithms on the project level.  

{% endinfo_block %}


## Merchant orders in the Merchant Portal

{% info_block warningBox "Warning" %}

Do not build the Merchant functionality around Orders, but rather around Merchant Orders.
Make sure that Merchants do not modify the order directly, but instead use [MerchantOms](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/merchant-oms.html) for this purpose.

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

## Next steps
* [Learn about the merchant orders](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/marketplace-order-management-feature-overview/merchant-order-overview.html)
* [Learn about the Marketplace and merchant state machines](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/marketplace-order-management-feature-overview/marketplace-and-merchant-state-machines-overview/marketplace-and-merchant-state-machines-overview.html)

## Related Business User documents

|FEATURE OVERVIEWS  |MERCHANT PORTAL USER GUIDES  |BACK OFFICE USER GUIDES |
|---------|---------|---------|
|[Merchant order overview](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/marketplace-order-management-feature-overview/merchant-order-overview.html) |[Managing merchant orders](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/manage-merchant-orders.html)  | <!---LINK TO BO ORDER MANAGEMENT-->|
|[Marketplace and merchant state machines overview](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/marketplace-order-management-feature-overview/marketplace-and-merchant-state-machines-overview/marketplace-and-merchant-state-machines-overview.html) | | |
|[Marketplace and merchant state machines interaction](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/marketplace-order-management-feature-overview/marketplace-and-merchant-state-machines-overview/marketplace-and-merchant-state-machines-interaction.html) | | |

## Related Developer documents

|INSTALLATION GUIDES  |GLUE API GUIDES  |DATA IMPORT  | REFERENCES  |
|---------|---------|---------|--------|
| [Install the Marketplace Order Management feature](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/install-features/install-the-marketplace-order-management-feature.html)    | [Retrieving Marketplace orders](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/glue-api-retrieve-marketplace-orders.html)        | [File details: merchant_oms_process.csv](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/import-and-export-data/import-file-details-merchant-oms-process.csv.html)        |  [MerchantOms](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/merchant-oms.html)  |
| [Install the Marketplace Order Management + Order Threshold feature](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/install-features/install-the-marketplace-order-management-order-threshold-feature.html)    |         | [File details: merchant-order-status.csv](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/import-and-export-data/import-file-details-merchant-order-status.csv.html)        |  [Create MerchantOms flows](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/create-merchant-oms-flows.html)   |
