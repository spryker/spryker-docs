---
title: Project guidelines for the Stripe app
description: Find out about the SCCOS modules needed for the Stripe App to function and their configuration
draft: true
last_updated: Jan 31, 2024
template: howto-guide-template
related:
   - title: Stripe
     link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/stripe/stripe.html
redirect_from:
   - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/stripe/install-stripe.html
   - /docs/pbc/all/payment-service-provider/202311.0/base-shop/third-party-integrations/stripe/install-stripe.html
   - /docs/pbc/all/payment-service-provider/202311.0/base-shop/third-party-integrations/stripe/integrate-stripe.html

---

This document provides guidelines for projects using the Stripe app.

## OMS configuration for the project

The complete default payment OMS configuration is available at `vendor/spryker/sales-payment/config/Zed/Oms/ForeignPaymentStateMachine01.xml`.

The payment flow of the default OMS involves authorizing the initial payment, which means that the amount is temporarily blocked when the payment method permits. Then, the OMS sends requests to capture, that is, transfer of the previously blocked amount from the customer's account to the store account.

The `Payment/Capture` command initiates the capture action. By default, this command is initiated when a Back office user clicks **Ship** on the *Order Overview* page.

Optionally, you can change and configure your own payment OMS based on `ForeignPaymentStateMachine01.xml` from the core package and change this behavior according to your business flow. See [Install the Order Management feature](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html) for more information about the OMS feature and its configuration.

To configure your payment OMS based on `ForeignPaymentStateMachine01.xml`, copy `ForeignPaymentStateMachine01.xml` with `Subprocess` folder to the project root `config/Zed/oms`. Then, change the file's name and the value of `<process name=` in the file.

This example demonstrates how to configure the order state machine transition from `ready for dispatch` to `payment capture pending`:

```xml
<?xml version="1.0"?>
<statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd"
>

   <process name="SomeProjectProcess" main="true">

      <!-- other configurations -->

      <states>

         <!-- other states -->

         <state name="payment capture pending" display="oms.state.in-progress"/>

         <!-- other states -->

      </states>

      <transitions>

         <!-- other transitions -->

         <transition happy="true">
            <source>ready for dispatch</source>
            <target>payment capture pending</target>
            <event>capture payment</event>
         </transition>

         <!-- other transitions -->

      </transitions>

      <events>

         <!-- other events -->

         <event name="capture payment" onEnter="true" command="Payment/Capture"/>

         <!-- other events -->

      </events>

   </process>

</statemachine>
```

By default, the timeout for the payment authorization action is set to 7 days. This means that if the order is in the `payment authorization pending` state, the OMS will wait for a day and then change the order state to `payment authorization failed`. Another day later, the order is automatically transitioned to the `payment authorization canceled` state. Therefore,
if you need to decrease or increase timeouts or change the states, modify the `config/Zed/oms/Subprocess/PaymentAuthorization01.xml` file according to your requirements.

For more information about ACP payment methods integration with your project OMS configuration, see [Integrate ACP payment apps with Spryker OMS configuration](/docs/dg/dev/acp/integrate-acp-payment-apps-with-spryker-oms-configuration.html).

## Checkout payment step

If you have rewritten `@CheckoutPage/views/payment/payment.twig` on the project level, do the following:

1. Make sure that a form molecule uses the following code for the payment selection choices:

```twig
{% raw %}

{% for name, choices in data.form.paymentSelection.vars.choices %}
    ...
    {% embed molecule('form') with {
        data: {
            form: data.form[data.form.paymentSelection[key].vars.name],
            ...
        }
    {% endembed %}
{% endfor %}
{% endraw %}       
```

2. If you want to change the default payment provider or method names, do the following:
   1. Make sure the names are translated in your payment step template:

```twig
{% raw %}
{% for name, choices in data.form.paymentSelection.vars.choices %}
    ...
    <h5>{{ name | trans }}</h5>
{% endfor %}
{% endraw %}
```

    2. Add translations to your glossary data import file:

```csv
...
Stripe,Pay Online with Stripe,en_US
```
    3. Run the data import command for the glossary:

```bash
console data:import glossary
```

## Processing refunds

In the default OMS configuration, a refund can be done for an order or an individual item. The refund action is initiated by a Back Office user triggering the `Payment/Refund` command. The selected item enters the `payment refund pending` state, awaiting the response from Stripe.

During this period, Stripe attempts to process the request, which results in success or failure:
* Success: the items transition to the `payment refund succeeded` state, although the payment isn't refunded at this step.
* Failure: the items transition to the `payment refund failed` state.

These states serve to track the refund status and inform the Back Office user. Over the following days, Stripe finalizes the refund, causing the item states to change accordingly. For example, previously successful refunds may be declined and vice versa.

If a refund fails, the Back Office user can go to the Stripe Dashboard to identify the cause of the failure. After resolving the issue, the item can be refunded again.

In the default OMS configuration, seven days are allocated to Stripe to complete successful payment refunds. This is reflected in the Back Office by transitioning the items to the `payment refunded` state.

## Retrieving and using payment details from Stripe

For instructions on using payment details, like the payment reference, from Stripe, see [Retrieve and use payment details from third-party PSPs](https://docs.spryker.com/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/retrieve-and-use-payment-details-from-third-party-psps.html)

## Sending additional data to Stripe

Stripe accepts to pass metadata in the API calls for additional data. To send additional data to Stripe, you can use the `QuoteTransfer::PAYMENT::ADDITIONAL_PAYMENT_DATA` field. This field is a key-value array that you can use to pass additional data to Stripe.

The metadata field has some limitations you must ensure to be met:

- Key length: max 40 characters
- Value length: max 500 characters
- Key-value pairs: max 50 pairs

When you pass the metadata to Stripe, it is stored in the payment object and can be retrieved later. For example, you can use the metadata to store the order ID or any other data you need to pass to Stripe.

When a `PaymentIntent` is created on the Stripe side you can see your passed `additionalPaymentData` in the Stripe UI. 