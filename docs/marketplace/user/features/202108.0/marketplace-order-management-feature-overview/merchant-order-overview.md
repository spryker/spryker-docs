---
title: Merchant order overview
description: This document contains concept information for the Merchant order feature in the Spryker Commerce OS.
template: concept-topic-template
---

In the marketplace, when a buyer goes through checkout, the [Marketplace order](/docs/marketplace/user/features/{{page.version}}/marketplace-order-management-feature-overview/marketplace-order-management-feature-overview.html) is created. Such an order can contain offers and products from different merchants. The part of the order that belongs to a certain merchant is called *merchant order*. The merchant order created in the system after the Marketplace order is has been placed. Thus, each merchant order contains at least one item from the Marketplace order.

![Merchant order](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+order+management/Marketplace+Order+Management+feature+overview/Merchant+Order+overview/Merchant+Order+schema.png)



## Merchant order calculation

A merchant order consists of merchant order items, which are items (products) purchased by a customer. All the calculations for merchant order items are performed using the product offer, merchant products price, and *merchant order totals*. These are the [initial totals](/docs/scos/dev/feature-walkthroughs/{{page.version}}/cart-feature-walkthrough/calculation-3-0.html) that are calculated according to the product offer purchased:

| TOTAL | DESCRIPTION |
| -------- | -------------- |
| Canceled total   | Amount to be returned in case the order was canceled. `Canceled total = Merchant Order grand total - Merchant Order expense total` |
| Discount total  | Total discount amount.    |
| Merchant Order grand total   | Total amount the customer needs to pay after the discounts have been applied. |
| Merchant Order expense total  | Total expenses amount (for example, shipping).   |
| Merchant Order refund total  | Total refundable amount.   |
| Merchant Order subtotal  | Total amount before taxes and discounts.  |
| Merchant Order tax total  | Total tax amount from the grand total.   |
| Marketplace Operator fees total | Total amount of fees paid to the Marketplace administrator.  |

Rounding logic for the calculations is the same as the one used for the Marketplace order. See [Rounding in the Marketplace Order feature overview](/docs/marketplace/user/features/{{page.version}}/marketplace-order-management-feature-overview/marketplace-order-management-feature-overview.html#rounding) for details.
