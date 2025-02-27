---
title: Marketplace and merchant state machines interaction
description: This document contains details about how the Marketplace and merchant state machines interact with each other in the Spryker Commerce OS.
template: concept-topic-template
last_updated: Nov 21, 2023
related:
  - title: Marketplace and merchant state machines overview
    link: docs/pbc/all/order-management-system/page.version/marketplace/marketplace-order-management-feature-overview/marketplace-and-merchant-state-machines-overview/marketplace-and-merchant-state-machines-overview.html
  - title: Marketplace Order Management feature overview
    link: docs/pbc/all/order-management-system/page.version/marketplace/marketplace-order-management-feature-overview/marketplace-order-management-feature-overview.html
  - title: Marketplace order overview
    link: docs/pbc/all/order-management-system/page.version/marketplace/marketplace-order-management-feature-overview/marketplace-order-overview.html
  - title: Merchant order overview
    link: docs/pbc/all/order-management-system/page.version/marketplace/marketplace-order-management-feature-overview/merchant-order-overview.html
---

When viewed independently of each other, the Marketplace and Merchant State Machines workflows look like this:

Marketplace State Machine workflow:
![Marketplace state machine workflow](https://confluence-connect.gliffy.net/embed/image/f0eb1f48-ae89-47ca-8f48-42e37c63f4ba.png)

Merchant State Machine workflow:
![Merchant state machine workflow](https://confluence-connect.gliffy.net/embed/image/b938441d-1a4a-4fe3-903d-580965b1bfea.png?utm_medium=live&utm_source=custom)

In this article, we'll look into the process of how Marketplace and merchant state machines interfere and check what statuses are displayed in the Back Office to a Marketplace administrator, in the Merchant Portal to a merchant, and on the Storefront to a buyer.

## Order item's status progress: New
The process starts when a customer places an order. The Marketplace order obtains state *New*.
![State: New](https://confluence-connect.gliffy.net/embed/image/630bbd7b-66ee-475f-9d79-50a258b994b2.png?utm_medium=live&utm_source=custom)

The following table provides an overview of the statuses that are displayed at this step:

| ROLE | APPLICATION | STATUS |
| ------------------------ | -------------- | ------------------- |
| Marketplace administrator | Back Office     | New                  |
| Merchant                  | Merchant Portal | N/A                  |
| Customer                  | Storefront      | Confirmed / Accepted |

## Order item's status progress: Paid
Once the Marketplace administrator receives the payment, the state of the marketplace order item becomes *Paid*. The event could be triggered automatically when the payment was made in the marketplace system, or the payment confirmation is uploaded with data importers or manually in other circumstances.

![Order item's status progress: Paid](https://confluence-connect.gliffy.net/embed/image/98582508-84a7-4fc5-ad6e-73ace5772daa.png?utm_medium=live&utm_source=custom)

The following table provides an overview of the statuses that are displayed at this step:

| ROLE   | APPLICATION | STATUS  |
| ------------------------ | -------------- | ---------- |
| Marketplace administrator | Back Office     | Paid   |
| Merchant                  | Merchant Portal | N/A         |
| Customer                  | Storefront      | In Progress |

## Order item's status progress: Canceled
After the payment has been made, the customer can still cancel the order during the period outlined by the Marketplace policies. The Marketplace provides the customer with a button on the Storefront to carry out that action. When the customer cancels the order, the state of the marketplace order item becomes *Canceled*.

{% info_block infoBox "Note" %}

The Marketplace administrator can also cancel the order under exceptional circumstances.

{% endinfo_block %}




![Order item's status progress: Canceled](https://confluence-connect.gliffy.net/embed/image/d6ceb379-7990-4bf1-b2d4-a46a80230d58.png?utm_medium=live&utm_source=custom)

The following table provides an overview of the statuses that are displayed at this step:

| ROLE                  | APPLICATION | STATUS |
| ------------------------ | -------------- | --------- |
| Marketplace administrator | Back Office     | Canceled   |
| Merchant                  | Merchant Portal | N/A        |
| Customer                  | Storefront      | Canceled   |

## Order item's status progress: Refunded
When the order is canceled after the payment has been made, the Marketplace administrator has to refund the payment for the canceled order to the customer in full or partially. Once the refund has been made, the state of the Marketplace order item becomes *Refunded*. After issuing the refund, the Marketplace policies set time to elapse before the state of the order is automatically transferred to *Closed*.

![Order item's status progress: Refunded](https://confluence-connect.gliffy.net/embed/image/fafabe65-1339-48d7-88b3-b83bf54ccf09.png?utm_medium=live&utm_source=custom)

The following table provides an overview of the statuses that are displayed at this step:

| ROLE                  | APPLICATION | STATUS |
| ------------------------ | -------------- | --------- |
| Marketplace administrator | Back Office     | Refunded   |
| Merchant                  | Merchant Portal | N/A        |
| Customer                  | Storefront      | Refunded   |

## Order item's status progress: Sent to Merchant
When the system has payment confirmation, it performs the operations to split the marketplace order into one or several merchant orders. The state of the marketplace order item becomes *Sent to Merchant*. The merchant orders are created, and each of the items that they contain shows a state according to each Merchant’s state machine. The first state is *New*.

![Order item's status progress: Sent to Merchant](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+Order+Management/sent-to-merchant.png)

The following table provides an overview of the statuses that are displayed at this step:

| ROLE   | APPLICATION | STATUS |
| ----------------- | -------------- | --------- |
| Marketplace administrator | Back Office   | Sent to Merchant |
| Merchant      | Merchant Portal | New |
| Customer   | Storefront      | In Progress      |

## Order item's status progress: Canceled by Merchant
Merchant can cancel the order for various reasons. The state of the merchant order item, in this case, will change to *Canceled by Merchant*. The Marketplace administrator also sees the updated state in the Back Office.

![Order item's status progress: Canceled by Merchant](https://confluence-connect.gliffy.net/embed/image/c141bb84-9abe-48c7-8ca4-5ea508435480.png?utm_medium=live&utm_source=custom)

The following table provides an overview of the statuses that are displayed at this step:

| ROLE       | APPLICATION | STATUS |
| ----------- | -------------- | --------- |
| Marketplace administrator | Back Office    | Canceled   |
| Merchant       | Merchant Portal | Canceled by Merchant|
| Customer    | Storefront      | Canceled    |

## Order item's status progress: Shipped by Merchant
The merchant ships the item to the customer's address. To input this information on Merchant Portal, the merchant triggers the event manually (the **Shipped** action button) or by importing of the new state via a CSV file. The item's state on the merchant state machine moves to *Shipped*. The Marketplace administrator also needs to make use of this info. They need to see that the item was also shipped in the Marketplace state machine.

![Order item's Status Progress: Shipped by Merchant](https://confluence-connect.gliffy.net/embed/image/6cea2d2f-1797-47ba-8a99-938aef05fc90.png?utm_medium=live&utm_source=custom)

The following table provides an overview of the statuses that are displayed at this step:

| ROLE   | APPLICATION | STATUS |
| ------------- | -------------- | --------- |
| Marketplace administrator | Back Office     | Shipped by Merchant  |
| Merchant       | Merchant Portal | Shipped  |
| Customer  | Storefront   | Shipped Expected by \<date\> |

## Order item's status progress: Delivered
After the shipment, the merchant tracks the delivery with the shipment carrier. When the item is delivered, the carrier notifies the merchant. The merchant triggers the *Deliver* event manually (**Delivered** action button) or automatically by uploading a CSV with the new state to the Merchant Portal. The Marketplace administrator also needs to be aware of this information. The state is also updated on the Marketplace state machine.

![Order item's status progress: Delivered](https://confluence-connect.gliffy.net/embed/image/04b08764-f5c4-4de7-9725-b12557e2ea61.png?utm_medium=live&utm_source=custom)

The following table provides an overview of the statuses that are displayed at this step:

| ROLE   | APPLICATION | STATUS |
| ------------- | -------------- | --------- |
| Marketplace administrator | Back Office     | Delivered           |
| Merchant                  | Merchant Portal | Delivered           |
| Customer                  | Storefront      | Delivered on \<date\> |

## Order item's status progress: Closed
Marketplace applies a series of policies that let customers return items during a given period of time. When that period expires, the marketplace order item gets the *Closed* state. The Merchant administrator must also be aware of that expiration, and the state closed is also used on the Merchant state machine for the item.

![Order item's status progress: Closed](https://confluence-connect.gliffy.net/embed/image/d4583bab-dda6-4ecc-bd92-94388f5e8710.png?utm_medium=live&utm_source=custom)

The following table provides an overview of the statuses that are displayed at this step:

| ROLE     | APPLICATION| STATUS      |
| --------- | ------------- | --------------- |
| Marketplace administrator | Back Office     | Delivered           |
| Merchant   | Merchant Portal | Delivered   |
| Customer    | Storefront      | Delivered on \<date\> |
