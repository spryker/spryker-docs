---
title: OMS configuration for Stripe
description: Learn how to implement Stripe using ACP
last_updated: Nov 8, 2024
template: howto-guide-template
related:
   - title: Stripe
     link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/stripe/stripe.html
   - title: Embed the Stripe payment page as an iframe
     link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/stripe/project-guidelines-for-stripe/embed-the-stripe-payment-page-as-an-iframe.html
   - title: Implement Stripe checkout as a hosted payment page
     link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/stripe/project-guidelines-for-stripe/project-prerequisites-for-implementing-Stripe-checkout-as-a-hosted-payment-page.html
   - title: Processing refunds with Stripe
     link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/stripe/project-guidelines-for-stripe/processing-refunds-with-stripe.html
   - title: Sending additional data to Stripe
     link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/stripe/project-guidelines-for-stripe/sending-additional-data-to-stripe.html
   - title: Stripe checkout with third-party frontends
     link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/stripe/project-guidelines-for-stripe/stripe-checkout-with-third-party-frontends.html     
---


The complete default payment OMS configuration is available at `vendor/spryker/sales-payment/config/Zed/Oms/ForeignPaymentStateMachine01.xml`.

The payment flow of the default OMS involves authorizing the initial payment. The amount is temporarily blocked when the payment method permits. Then, the OMS sends requests to capture, that is, transfer of the previously blocked amount from the customer's account to the store account.

The `Payment/Capture` command initiates the capture action. By default, this command is initiated when a Back Office user clicks **Ship** on the **Order Overview** page.

Optionally, you can change and configure your own payment OMS based on `ForeignPaymentStateMachine01.xml` from the core package and change this behavior according to your business flow. For more information about OMS configuration, see [Install the Order Management feature](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html).

To configure your payment OMS based on `ForeignPaymentStateMachine01.xml`, copy `ForeignPaymentStateMachine01.xml` with the `Subprocess` folder to the project root `config/Zed/oms`. Then, change the file's name and the value of `<process name=` in the file.

The following example shows how to configure the order state machine transition from `ready for dispatch` to `payment capture pending`:

<details>
  <summary>State machine example</summary>

```xml
<?xml version="1.0"?>
<statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 https://static.spryker.com/oms-01.xsd"
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

</details>

By default, the timeout for the payment authorization action is set to seven days. If the order is in the `payment authorization pending` state, after a day the order state is changed to `payment authorization failed`. Another day later, the order is transitioned to the `payment authorization canceled` state.

To decrease or increase timeouts or change the states, update `config/Zed/oms/Subprocess/PaymentAuthorization01.xml`.

For more information on the integration of ACP payment methods with OMS configuration, see [Integrate ACP payment apps with Spryker OMS configuration](/docs/dg/dev/acp/integrate-acp-payment-apps-with-spryker-oms-configuration.html).
