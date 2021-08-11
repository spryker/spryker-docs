---
title: Merchant order overview
description: This document contains concept information for the Merchant order feature in the Spryker Commerce OS.
template: concept-topic-template
---

In the marketplace, when a buyer goes through checkout, the [Marketplace order](https://documentation.spryker.com/marketplace/docs/marketplace-order-feature-overview) is created. Such an order can contain offers and products from different merchants. The part of the order that belongs to a certain merchant is called *merchant order*. The merchant order created in the system after the Marketplace order is has been placed. Thus, each merchant order contains at least one item from the Marketplace order.

![Merchant order](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+order+management/Marketplace+Order+Management+feature+overview/Merchant+Order+overview/Merchant+Order+schema.png)



## Merchant order calculation

The merchant order consists of the merchant order items, which are the items (products) purchased by the customer. All the calculations for the merchant order items are performed using the product offer, merchant products price, and *merchant order totals*. These are the [initial totals](https://documentation.spryker.com/docs/calculation-3-0#totals-transfer) that are calculated according to the product offer purchased:

| TOTAL | DESCRIPTION |
| -------- | -------------- |
| Canceled total   | Amount to be returned in case the order was canceled. `Canceled total = Merchant Order grand total - Merchant Order expense total` |
| Discount total  | Total discount amount.    |
| Merchant Order grand total   | Total amount the customer needs to pay after the discounts have been applied. |
| Merchant Order expense total  | Total expenses amount (e.g., shipping).   |
| Merchant Order refund total  | Total refundable amount.   |
| Merchant Order subtotal  | Total amount before taxes and discounts.  |
| Merchant Order tax total  | Total tax amount from the grand total.   |
| Marketplace Operator fees total | Total amount of fees paid to the Marketplace administrator.  |

Rounding logic for the calculations is the same as the one used for the Marketplace order. See [Rounding in the Marketplace Order feature overview](https://documentation.spryker.com/marketplace/docs/marketplace-order-feature-overview#rounding) for details.
