---
title: Stripe
description: Stripe technology partner
last_updated: Mar 24, 2025
template: concept-topic-template
---

[Stripe](https://stripe.com/en-de) is a financial infrastructure platform that enables businesses to accept payments, grow their revenue, and accelerate new business opportunities.

The Stripe integration in Spryker is part of the App Composition Platform and supports both the default Storefront Yves and Spryker GLUE APIs.

## Supported business models

The Stripe App supports B2B, B2C, and Marketplace models.

## Stripe features

- Interface within the Spryker ACP catalog to connect with Stripe: You can connect to Stripe from the App Composition Platform.
- Easy switch between Test and Live modes: You can test payments in either mode.
- Responsive Redirect Payment Page: Once a connection is set up between Spryker and Stripe, upon checkout, end users are redirected to a Spryker-hosted payment page where they can view activated payment methods. This works both on the web and mobile.
- Viewing the activated payment methods in the Stripe dashboard.
- GLUE API support: Support for customers using Spryker headless.
- Authorize payments and capture later: The default OMS configuration lets you authorize cards and capture the order amount either after shipping or based on the established business logic.
- Default OMS Configuration: We provide a default OMS configuration that you can use as an example or modify to align with your business logic.

## Stripe payment methods

The Stripe app supports all payments enabled by Stripe in your region. For more information, see [Payment methods in Stripe](https://stripe.com/docs/payments/payment-methods/overview).
However, our team only tested the following payment methods:
- Cards: including Visa and Mastercard
- Debit card
- Bank transfer: supported in some regions, see [Bank transfer payments](https://stripe.com/docs/payments/bank-transfers)
- PayPal
- Klarna
- Apple Pay
- Google Pay
- Direct Debit (SEPA) / Sofortüberweisung
- iDEAL
- Link
- Przelewy24
- Giropay
- US, UK, CA, AU, NZ: AfterPay


## Current limitations

* The Stripe App has limited or no support for multi-capture. Partial capture of payment for orders with multiple items isn't covered. So, payments can't be partially canceled. One payment intent is created per order, and the payment for the order can either be authorized, captured, or cancelled from Stripe's side.
* Payments can be properly canceled only from the the Back Office and not from the Stripe Dashboard.
* When customer email address is not provided to the API, which is optional, bank transfer is not available as a payment method on the hosted payment page. This feature enables omitting personal data while retaining other payment options.


## Next step

[Install and configure the Stripe App prerequisites](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/install-and-configure-stripe-prerequisites.html)













































