---
title: Payone ACP app
description: With Payone, your customers can pay with common payment methods, such as credit card, PayPal, Prepayment and Klarna.
template: howto-guide-template
last_updated: Dec 18, 2024
redirect_from:
   - /docs/aop/user/apps/payone.html
   - /docs/acp/user/apps/payone.html
   - /docs/pbc/all/payment-service-providers/payone/payone.html
   - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/payone/integration-in-the-back-office/payone-integration-in-the-back-office.html
   - /docs/pbc/all/payment-service-provider/202404.0/base-shop/third-party-integrations/payone/integration-in-the-back-office/payone-integration-in-the-back-office.html
---

[Payone](https://www.payone.com/DE-en?ref=spryker-documentation) lets your customers make payments with common payment methods, such as credit card, PayPal, Prepayment, and Klarna.

The Payone integration in Spryker is part of the App Composition Platform and supports both the default Storefront Yves and Spryker GLUE APIs.

You can have multiple accounts with Payone. For example, you can have different Payone credentials per store.

## Supported business models and payment methods

The Payone App supports the B2B and B2C business models and the following payment methods:

* Credit Card
* PayPal Standard
* PayPal Express
* Klarna:
  * Invoice: pay later
  * Installments: slice it
  * Direct Debit: pay now
* Prepayment

## Payment methods explained

For the *Payone Credit Card* payment method, the following modes are supported:

- *Preauthorization and Capture*: After a customer entered the credit card details during the checkout, the seller preauthorizes or reserves the payable amount on the customer's credit card. As soon as the items have shipped, this amount is captured. Capture kicks off the process of moving money from the customer's credit card to the seller's account. The preauthorization and capture mode is the best choice for physical goods. It ensures that in case the ordered items are not available anymore or the customer cancels the order before it's shipped, the seller does not have to transfer the money back to the customer's account and thereby avoids a chargeback.
- *3DS*: Messaging protocol that enables consumer authentication with their card issuer when making online purchases.
- *PCI DSS Compliance via SAQ A*: A set of security standards designed to ensure that you accept, process, and transmit credit card information in a secure environment.

For the *Payone Paypal* payment method, we support only *Preauthorization and Capture*.

{% info_block infoBox "State machine for Payone" %}

The payment modes like Preauthorization and Capture must be set via the Spryker state machine in the Order Management System (OMS). However, the state machine for the Payone app is now in development, so you can not customize it for your project yet.

{% endinfo_block %}

## Payment method flows

* [Credit Card](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/payone/app-composition-platform-integration/payment-method-flows/payone-credit-card-payment-flow.html)
* [PayPal](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/payone/app-composition-platform-integration/payment-method-flows/payone-paypal-payment-flow.html)
* [PayPal Express](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/payone/app-composition-platform-integration/payment-method-flows/payone-paypal-express-payment-flow-in-headless-applications.html)


## Current limitations

- Payments can be properly canceled only from the Back Office and not from the Payone PMI.
- Payments can't be partially canceled. One payment intent is created per order, and it can either be authorized or fully cancelled.
- When an item is canceled on the order details page, all order items are canceled.

## Next steps

[Integrate Payone](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/payone/app-composition-platform-integration/integrate-payone.html)
