---
title: Dummy Payment
originalLink: https://documentation.spryker.com/v5/docs/dummy-payment
redirect_from:
  - /v5/docs/dummy-payment
  - /v5/docs/en/dummy-payment
---

{% info_block infoBox %}
Do not use this code for production but you can use it as a starting point for new payment integrations.
{% endinfo_block %}

What is the DummyPayment for:

* it brings a simple state machine
* it shows how to integrate payment into the system
* it shows how to handle refunds
* it allows to test checkout process in several ways

## State Machine
The module comes with a simple state machine which has a couple of states, commands and conditions. With that state machine it’s possible to trigger events for order items from Zed’s order detail page.

## Integration
A couple of examples which shows how a payment is integrated into the system. These examples show:

* how to integrate forms into Yves checkout
* how to add PaymentMethodHandler
* how to add a state machine, commands and conditions to the [Oms module](https://documentation.spryker.com/docs/en/oms-matrix)
* how to add CheckoutPlugins to the Payment module
* how to handle refunds with the [Refund module](https://documentation.spryker.com/docs/en/refund)

## Refunds
Refunds mostly triggered by a state machine command, this module shows how that could look like. Look into the RefundPlugin. This command can be triggered from Zed’s order detail page when a order item has the state returned.

## Test Checkout
You can do an order as you already used to it. A way to test what happens when something after saveOrder() goes into the wrong direction has been added. A good example for this is when authorizing a payment fails.

When “Invalid” is used as last name the order is saved but all items go into invalid state and the user is redirected to the PaymentStep of Checkout.
