---
title: Reference information - Orders
description: The guide provides reference information you see when creating, updating and viewing order details in the Back Office.
last_updated: Nov 22, 2019
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v2/docs/orders-reference-information
originalArticleId: 990c9ad6-2684-41e7-ac35-09ebd9d9df93
redirect_from:
  - /v2/docs/orders-reference-information
  - /v2/docs/en/orders-reference-information
  - /docs/scos/user/back-office-user-guides/201903.0/sales/orders/references/orders-reference-information.html
---

This topic contains the reference information that you need to know when managing orders in the **Sales > Orders** section.
***

## Orders Page
By default, the last created order goes on top of the table. However, you can sort the table by the order number, order reference, created date, customer emails, or the number of items ordered.

On the **Orders** page, you see the following:
* Order number, reference, and the creation date
* Customer name and email
* Order state, the grand total of the order, and the number of items ordered
* Actions that you can do on this page

## Order Statuses
You can set different statuses for your order. The following describes the statuses you can select:

| Order Status| Description |
| --- | --- |
| **Pay** | Select this status once you receive the payment for the order from your customer. |
| **Ship** | Select this status once the order is shipped.|
| **Stock-update** | Select this status when you update the number of available products of products in the **Products > Availability** section. |
|  **Close**| Select this status when your customer has successfully received the ordered items and is satisfied with their quality.|
| **Return** | Select this status if the customer returns you either all or several items from the order.  |
|**Refund**|Select this status in case of refund.|

Statuses flow:
* **Payment pending** - the initial order statuses.
* When you select **Pay**, the status becomes exported.
* When you select **Ship**, the status becomes shipped.
* When you select **Stock-update**, the status becomes delivered.
* When you select **Close**, the status becomes closed.
* In case the customer returns the ordered items: when you select **Return**, the status becomes returned.
* In case of a return, when you select **Refund**, the status becomes refunded.

