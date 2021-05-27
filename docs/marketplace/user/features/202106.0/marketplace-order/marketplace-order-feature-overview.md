---
title: Marketplace order feature overview
description: This document contains concept information for the Marketplace order feature in the Spryker Commerce OS.
template: concept-topic-template
---

When a customer places an order on the Marketplace, the system creates the *Marketplace order*. The Marketplace order, in comparison to a regular order in Spryker Commerce OS, contains information about merchant(s) and one or several [merchant orders](https://documentation.spryker.com/marketplace/docs/merchant-order-feature-overview). Thus, the Marketplace order represents a list of items the customer has bought from one or multiple merchants in a single order.

![Marketplace order](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Marketplace+and+Merchant+orders/Marketplace+order+feature+overview/marketplace-order.png)

Each Marketplace order has a set of properties such as order number, order summary, payment information, date, state, shipping methods, and others. 

For example, let’s consider the case when a customer purchased 4 items from 3 different merchants in 1 order.
From the customer perspective, Marketplace oder is a single order with products from one or multiple merchants:

![Marketplace order structure](https://confluence-connect.gliffy.net/embed/image/66d8ccea-abeb-4121-b2f0-2348356fe481.png?utm_medium=live&utm_source=custom)

The items in the Marketplace order are grouped by merchant and split into different shipments automatically by default. However, you can change this behavior on the project level according to your business requirements. During the checkout, customers can check how many shipments to expect and select different delivery addresses or methods based on their items. To learn more about multiple shipments, see [Split Delivery feature overview](https://documentation.spryker.com/docs/split-delivery-overview). 

As the Marketplace order contains details about offers and products the customer has bought from multiple merchants, the Marketplace order list with the related information is only available to the Marketplace administrator in the Back Office. Each merchant order can be accessed by the relevant merchant in the Merchant Portal.

![Merchant order in the Merchant Portal](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Marketplace+and+Merchant+orders/Marketplace+order+feature+overview/merchant-order-in-merchant-portal.png)

## Marketplace order calculation
By default, calculations for the Marketplace order items are performed using the item price (product offer price or the price inherited from the concrete/abstract product), their totals, subtotal aggregation, and tax information. 

The Marketplace order comprises all the [totals from the Merchant orders](https://documentation.spryker.com/marketplace/docs/merchant-order-feature-overview#merchant-order-calculation) and is defined by the following formula:
:::(Info) ()
Marketplace Sales Order Total = ∑ Merchant Order Totals + ∑ Marketplace Sales Order Expense Totals
:::

At the same time, each Marketplace Order Total includes the sum of the respective Merchant Order Totals, for example:

* Marketplace Sales Order Subtotal = Merchant Order Subtotal 1 + Merchant Order Subtotal 2 + Merchant Order Subtotal n.
* Marketplace Sales Order Discount Total = ∑ Discount Totals included in all Merchant Orders. Check [Discount Totals calculation for Merchant Orders](https://documentation.spryker.com/marketplace/docs/merchant-order-feature-overview#discounts-total-calculation) to learn how the discounts are calculated.
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

:::(Warning) (Warning)
In some cases, due to rounding, the amounts of Marketplace order totals can differ from the amounts of the Merchant order totals in a matter of a cent or less. You can modify the behavior by changing the rounding algorithms on the project level.  
:::

