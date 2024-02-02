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

## OMS configuration for the project

The complete default payment OMS configuration is available at `vendor/spryker/sales-payment/config/Zed/Oms/ForeignPaymentStateMachine01.xml`.

The payment flow of the default OMS involves authorizing the initial payment, which means that the amount is temporarily blocked when the payment method permits. Then, the OMS sends requests to capture, that is, transfer of the previously blocked amount from the customer's account to the store account.

The `Payment/Capture` command initiates the capture action. By default, this command is initiated when a Back office user clicks **Ship** on the *Order Overview* page. 

Optionally, you can change and configure your own payment OMS based on `ForeignPaymentStateMachine01.xml` from the core package and change this behavior according to your business flow. See [Install the Order Management feature](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html) for more information about the OMS feature and its configuration.

To configure your payment OMS based on `ForeignPaymentStateMachine01.xml`, copy `ForeignPaymentStateMachine01.xml` with `Subprocess` folder to the project root `config/Zed/oms`. Then, change the name of the file and the value of `<process name=` in the file.

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

By default, the timeout for the payment authorization action is set to one day. This means that if the order is in the 'payment authorization pending' state, the OMS will wait for a day and then change the order state to 'payment authorization failed'. Another day later, the order is automatically transitioned to the 'payment authorization canceled' state. Therefore, if you need to increase timeouts or change the states, modify the config/Zed/oms/Subprocess/PaymentAuthorization01.xml file according to your requirements.

## Checkout. Payment Step

If you have rewritten `@CheckoutPage/views/payment/payment.twig` on the project level, do the following:

1. Make sure that a form molecule uses the following code for the payment selection choices:

```twig

{% for name, choices in data.form.paymentSelection.vars.choices %}
    ...
    {% embed molecule('form') with {
        data: {
            form: data.form[data.form.paymentSelection[key].vars.name],
            ...
        }
    {% endembed %}
{% endfor %}        
```

2. If you want to change default payment provider or method names, make sure the names are translated in your payment step template:

```twig
{% for name, choices in data.form.paymentSelection.vars.choices %}
    ...
    <h5>{{ name | trans }}</h5>
{% endfor %}
```

add translations to your glossary data import file:

```csv
...
Stripe,Pay Online with Stripe,en_US
```
Then run the data import for the glossary:

```bash
console data:import glossary
```