---
title: Stripe
description: Stripe technology partner
last_updated: Mar 24, 2024
template: concept-topic-template
---

[Stripe](https://stripe.com/en-de) is a financial infrastructure platform that enables businesses to accept payments, grow their revenue, and accelerate new business opportunities.

The Stripe integration in Spryker is part of the App Composition Platform and supports both the default Storefront Yves and Spryker GLUE APIs.

## Supported business models

The Stripe App supports B2B and B2C models.

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


## Current limitations

The Stripe App has limited or no support for the following features:
- Multi-capture: Partial capture of payment for order with multiple items is not covered. Hence, Payments can’t be partially canceled. We create one payment intent per order and the payment for the order can either be authorised, captured or cancelled from Stripe's perespective.

## Next step

[Install and configure the Stripe App prerequisites](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/install-and-configure-stripe-prerequisites.html)
