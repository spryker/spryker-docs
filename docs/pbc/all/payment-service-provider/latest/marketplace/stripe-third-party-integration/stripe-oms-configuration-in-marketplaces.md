---
title: "Stripe: OMS configuration for marketplaces"
description: Guidelines on the Spryker Ordermanagement system and Stripe integration for Marketplace based stores.
last_updated: Aug 20, 2024
template: howto-guide-template
---

This document provides guidelines for projects using Stripe in marketplaces.

## OMS configuration

The complete default payment OMS configuration is available in `vendor/spryker/sales-payment/config/Zed/Oms/ForeignPaymentStateMachine01.xml`.

The payment flow of the default OMS involves authorizing the initial payment, which means that the amount is emporarily blocked when the payment method permits. Then, the OMS sends requests to capture, that is, transfer of the previously blocked amount from the customer's account to the store account.

For more information about the ForeignPayment OMS configuration, see [Project guidelines for Stripe](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/stripe/project-guidelines-for-stripe/project-guidelines-for-stripe.html)

In addition to the base shop implementation, the Stripe App in Marketplaces requires the following OMS configuration:

- The `MerchantCommission/Calculate` command triggers the calculation of the commission for the merchant. By default, this command is initiated when an order is moved to the `payment captured` state. This command calculates the commission based on your projects settings. For more details on configuration, see  [Marketplace Merchant Commission feature overview](/docs/pbc/all/merchant-management/202410.0/marketplace/marketplace-merchant-commission-feature-overview.html).

- The `SalesPaymentMerchant/Payout` command initiates the payout to merchant action. By default, this command is initiated after the OMS is in the `delivered` state and the commission was calculated.

- The `SalesPaymentMerchant/ReversePayout` command initiates the reversal of the payout to the merchant action. By default, this command is initiated after the OMS is in the `payment refunded` state.

- The validation of the payout status is done by the `SalesPaymentMerchant/IsMerchantPaidOut` condition. By default, this condition is triggered after a payout is done. When a payout is successful, the OMS moves to the `closed` state. If a payout fails, the OMS moves to the `payout failed` state.

- The `SalesPaymentMerchant/IsMerchantPayoutReversed` condition validates the reverse payout status. By default, this condition is triggered after the reverse payout is done. When a reverse payout is successful, the OMS moves to the `canceled` state. If a reverse payout fails, the OMS moves to the `reverse payout failed` state.

You can change and configure your own payment OMS based on `ForeignPaymentStateMachine01.xml` from the core package. For more information about the OMS feature and its configuration, see [Install the Order Management feature](/docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html).

To configure your payment OMS based on `ForeignPaymentStateMachine01.xml`, copy `ForeignPaymentStateMachine01.xml` with the `Subprocess` folder to the project root `config/Zed/oms`. Then, change the file's name and the value of `<process name=` in the file.

<details>
  <summary>Payout subprocess example</summary>

```xml
<?xml version="1.0"?>
<statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd"
>

   <process name="MerchantPayout">

      <states>
         <state name="merchant payout ready" display="oms.state.payout-merchant"/>
         <state name="payout failed" display="oms.state.payout-failed"/>
      </states>

      <transitions>

         <transition condition="SalesPaymentMerchant/IsMerchantPaidOut" happy="true">
            <source>merchant payout ready</source>
            <target>closed</target>
            <event>payout merchant</event>
         </transition>

         <transition>
            <source>merchant payout ready</source>
            <target>payout failed</target>
            <event>payout merchant</event>
         </transition>

         <transition>
            <source>payout failed</source>
            <target>merchant payout ready</target>
            <event>retry payout merchant</event>
         </transition>

      </transitions>

      <events>
         <event name="payout merchant" onEnter="true" command="SalesPaymentMerchant/Payout"/>
         <event name="retry payout merchant" manual="true"/>
         <event name="close" manual="true"/>
      </events>
   </process>

</statemachine>
```

</details>


<details>
  <summary>Reverse Payout subprocess</summary>

```xml
<?xml version="1.0"?>
<statemachine
        xmlns="spryker:oms-01"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="spryker:oms-01 http://static.spryker.com/oms-01.xsd"
>

   <process name="MerchantPayoutReverse">

      <states>
         <state name="merchant payout reverse ready" display="oms.state.payout-reversed"/>
         <state name="reverse payout failed" display="oms.state.payout-reversal-failed"/>
      </states>

      <transitions>

         <transition condition="SalesPaymentMerchant/IsMerchantPayoutReversed">
            <source>merchant payout reverse ready</source>
            <target>canceled</target>
            <event>reverse payout</event>
         </transition>

         <transition>
            <source>merchant payout reverse ready</source>
            <target>reverse payout failed</target>
            <event>reverse payout</event>
         </transition>

         <transition>
            <source>reverse payout failed</source>
            <target>merchant payout reverse ready</target>
            <event>retry reverse payout</event>
         </transition>

      </transitions>

      <events>
         <event name="reverse payout" onEnter="true" command="SalesPaymentMerchant/ReversePayout"/>
         <event name="retry reverse payout" manual="true"/>
         <event name="canceled" manual="true"/>
      </events>
   </process>

</statemachine>
```

</details>


## Processing payouts

In the default OMS configuration, a payout to merchants is initiated after the OMS is in `delivered` state and the commission was calculated. This command sends an API call to the StripeApp to initiate the payout to the merchant. The payout status is tracked in the Back Office, and the OMS can either move to `payout failed` or `closed` state. The `payout failed` state is used to track the payout status and inform the Back Office user about the failure. The `closed` state is used to track the successful payout.

### Payout process

1. A customer pays for an order.
2. The money is transferred from the customer's account, like a bank account, to the marketplace Stripe account.
- The marketplace calculates the commission for the merchant.
- The marketplace initiates a payout to the merchant.
- The money is transferred from the marketplace Stripe account to the merchant's Stripe account.

### When a payout fails

A payout can fail for many reasons. Examples:
- The merchant's account isn't verified
- The merchant's account isn't connected to the marketplace Stripe account
- The merchant's account isn't active

You can identify the cause of a failure in the Stripe Dashboard. After resolving the issue, the payout can be reinitiated.

## Processing refunds as reverse payout

In the default OMS configuration, a reverse payout can be done for an order or an individual item. The reverse payout action is initiated by a Back Office user triggering the `SalesPaymentMerchant/ReversePayout` command. The selected item or items are used to find the previously made payout in the database and the amount that was payed out to the merchant and make a call to the StripeApp which does the reverse payout. Based on the response the items go either into `canceled` or `reverse payout failed` state.

### Reverse Payout process

1. A customer returns an item.
2. The money is transferred from the marketplace Stripe account to the customers account, like a bank account.
3. The marketplace initiates a reverse payout from a merchant.
4. The money is transferred from the merchant's Stripe account to the marketplace Stripe account.


### Reverse payout failures

A reverse payout can fail for many reasons, for example-the merchant's Stripe account doesn't have the funds to cover a reverse payout. You can identify the cause of a failure in the Stripe Dashboard. After resolving the issue, the reverse payout can be reinitiated again.
