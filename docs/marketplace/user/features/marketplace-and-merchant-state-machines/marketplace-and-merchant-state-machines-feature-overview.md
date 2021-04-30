---
title: Marketplace and merchant state machine feature overview
template: concept-topic-template
---

The basic concept of state machines allows creating a patterned behavior and automation for complicated processes defined by the business, for example, order processes. 
With the help of the state machine, a business owner can coordinate the process of changing the statuses of orders and order items according to the business logic.
To provide the algorithm of dealing with orders for Marketplace administrators and merchants simultaneously, we have implemented multiple state machine templates. These templates help the Marketplace owners to make the order management process flexible and corresponding to the business logic. As the process of managing marketplace orders is different from managing the merchant orders, there are two separate state machine engine templates: *Marketplace state machine* and *Merchant state machine*. 

:::(Info) (Info)

You can set up as many state machines as you need and allow your Marketplace administrator to decide which state machine to use for specific payment methods or countries and stores with different processes. You can also set up different merchant state machines to apply to different merchants according to their processes.
:::

![Marketplace and merchant state machines](https://confluence-connect.gliffy.net/embed/image/01b89c1e-03f6-448a-90f4-982630e5f96a.png?utm_medium=live&utm_source=custom)

## Marketplace state machine
The Marketplace can have one or several state machines assigned to the marketplace orders. Marketplace State Machine processes marketplace order items. 
Our exemplary Marketplace state machine provides the following states: 

* New
* Paid
* Canceled
* Refunded
* Sent to Merchant
* Shipped by Merchant
* Delivered
* Closed

To learn more about states, see [State Machine Fundamentals](https://documentation.spryker.com/docs/state-machine-cookbook#state-machine-cookbook---part-i---state-machine-fundamentals).

:::(Warning) (Note)
You can set up the states according to your business requirements.
The status of the Marketplace order is an aggregated state of the Marketplace order items.
:::

<details open>
<summary>Marketplace state machine flow</summary>
![Merchant state machine](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Marketplace+and+Merchant+orders/Marketplace+and+Merchant+State+Machines+feature+overview/marketplace-state-machine.png)
</details>

### Marketplace state machine in the Back Office

Marketplace Administrators manage the orders in the Back Office > Marketplace > Orders. See the Back Office user guide - Managing marketplace orders for details. There is a trigger button to change the state of the marketplace order only if there are manually executable events related to the marketplace order items. Triggering the button executes the corresponding event and moves the marketplace order item to the next state. There can be multiple trigger buttons corresponding to several items in the marketplace order. When you click one of those buttons, only the items with such a manually executable event will execute it. The rest stay in the same state and need their trigger to be performed to move to the next state.

If there are no manually executable events applicable to any of the items, there is no button to click in the Back Office interface. In this case, the action is performed automatically.

## Merchant state machine
The Marketplace administrator can define one or several state machines for merchants:

* One as the default one, which will apply automatically to merchant order items in every merchant order.
* Another state machine for a specific merchant.

Merchant state machine processes merchant order items and works in parallel with the Marketplace state machine.
The status of the merchant order is aggregated from the merchant order item statuses. The merchant order status gets properly updated when the state of the items changes.
Our exemplary merchant state machine provides the following states: 

1. New
2. Canceled by merchant
3. Shipped
4. Delivered
5. Closed

<details open>
<summary>Merchant State Machine flow</summary>

![Merchant state machine](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Marketplace/Marketplace+and+Merchant+orders/Marketplace+and+Merchant+State+Machines+feature+overview/merchant-state-machine.png)

</details>



