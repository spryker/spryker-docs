  - /docs/pbc/all/order-management-system/latest/marketplace/marketplace-order-management-feature-overview/marketplace-and-merchant-state-machines-overview/marketplace-and-merchant-state-machines-overview.html
---
title: Marketplace and merchant state machines overview
description: This document contains concept information about the Marketplace and merchant state machines in the Spryker Commerce OS.
template: concept-topic-template
redirect_from:
last_updated: Nov 21, 2023
related:
  - title: Marketplace and merchant state machines interaction
    link: docs/pbc/all/order-management-system/page.version/marketplace/marketplace-order-management-feature-overview/marketplace-and-merchant-state-machines-overview/marketplace-and-merchant-state-machines-interaction.html
  - title: Marketplace Order Management feature overview
    link: docs/pbc/all/order-management-system/page.version/marketplace/marketplace-order-management-feature-overview/marketplace-order-management-feature-overview.html
  - title: Marketplace order overview
    link: docs/pbc/all/order-management-system/page.version/marketplace/marketplace-order-management-feature-overview/marketplace-order-overview.html
  - title: Merchant order overview
    link: docs/pbc/all/order-management-system/page.version/marketplace/marketplace-order-management-feature-overview/merchant-order-overview.html
---

The basic concept of state machines allows creating a patterned behavior and automation for complicated processes defined by the business, for example, order processes.
With the help of the state machine, a business owner can coordinate the process of changing the statuses of orders and order items according to the business logic.
To provide the algorithm of dealing with orders for Marketplace administrators and merchants simultaneously, there are multiple state machine templates. These templates help the Marketplace owners to make the order management process flexible and corresponding to the business logic. As the process of managing marketplace orders is different from that of managing the merchant orders, there are two separate state machine engine templates: *Marketplace state machine* and *Merchant state machine*.

{% info_block infoBox "Info" %}

You can set up as many state machines as you need and let your Marketplace administrator decide which state machine to use for specific payment methods or countries and stores with different processes. You can also set up different merchant state machines to apply to different merchants according to their processes.

{% endinfo_block %}

![Marketplace and merchant state machines](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+order+management/Marketplace+and+merchant+state+machines+overview/Marketplace-Merchant+state+machine+schema.png)

## Marketplace state machine

The Marketplace can have one or several state machines assigned to the marketplace orders. Marketplace State Machine processes marketplace order items.
Our exemplary Marketplace state machine provides the following states:

- New
- Paid
- Canceled
- Refunded
- Sent to Merchant
- Shipped by Merchant
- Delivered
- Closed

To learn more about states, see [State Machine Fundamentals](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/state-machine-cookbook/state-machine-cookbook-state-machine-fundamentals.html).

{% info_block warningBox "Note" %}

You can set up the states according to your business requirements.
The status of the Marketplace order is an aggregated state of the Marketplace order items.

{% endinfo_block %}

<details>

<summary>Marketplace state machine flow</summary>

![Merchant state machine](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Marketplace+and+Merchant+orders/Marketplace+and+Merchant+State+Machines+feature+overview/marketplace-state-machine.png)

</details>

{% info_block infoBox "Info" %}

In the Marketplace Dummy Payment, only the *invoice* type of payment is supported by default.

{% endinfo_block %}

### Marketplace state machine in the Back Office

Marketplace administrators manage the orders in the Back Office. For details, see [Managing marketplace orders](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/manage-in-the-back-office/manage-marketplace-orders.html). In the Back Office, the Marketplace administrators can change the state of the marketplace order by triggering the states. However, they can do that only if there are manually executable events related to the marketplace order items. Triggering the states executes the corresponding event and moves the marketplace order item to the next state. There can be multiple triggering buttons corresponding to several items in the marketplace order. When you click one of those buttons, only the items with such a manually executable event execute it. The rest stay in the same state and need their trigger to be performed to move to the next state.

If there are no manually executable events applicable to any of the items, there is no button to click in the Back Office interface. In this case, the action is performed automatically.

## Merchant state machine

The Marketplace administrator can define one or several state machines for merchants:

- One as the default, which applies automatically to merchant order items in every merchant order.
- Another state machine for a specific merchant.

Merchant state machine processes merchant order items and works in parallel with the Marketplace state machine.
The status of the merchant order is aggregated from the merchant order item statuses. The merchant order status gets properly updated when the state of the items changes.
Our exemplary merchant state machine provides the following states:

1. New
2. Canceled by merchant
3. Shipped
4. Delivered
5. Closed

<details>

<summary>Merchant state machine flow</summary>

![Merchant state machine](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Marketplace+and+Merchant+orders/Marketplace+and+Merchant+State+Machines+feature+overview/merchant-state-machine.png)

</details>

## Next steps

[Learn how the marketplace and merchant state machines interact with each other](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/marketplace-order-management-feature-overview/marketplace-and-merchant-state-machines-overview/marketplace-and-merchant-state-machines-interaction.html)
