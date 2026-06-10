---
title: Stripe
description: Learn all about Sprykers Technology partner, Stripe. Enabling and Enhancing your payment process.
last_updated: Apr 14, 2026
template: concept-topic-template
redirect_from:
- docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/stripe/connect-and-configure-stripe.html
- docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/stripe/disconnect-stripe.html
---

[Stripe](https://stripe.com/en-de) is a financial infrastructure platform that enables businesses to accept payments, grow their revenue, and accelerate new business opportunities.

The Stripe integration in Spryker is part of [Spryker ecosystem](/docs/integrations/eco-modules) and supports both the default Storefront Yves and Spryker GLUE APIs.

## Supported business models

The Stripe module supports B2B, B2C, and Marketplace models.

## Stripe features

- Interface within the Back Office to configure API keys.
- Support of test (sandbox) or live credentials.
- Storefront Payment Page: when the Stripe payment method is configured, after order submission end users are presented with the Stripe Elements payment form where they can select and complete their payment. This works both on the web and mobile.
- Viewing the activated payment methods in the Stripe dashboard.
- GLUE API support: Support for customers using Spryker headless.
- Authorize payments and capture later: The default OMS configuration lets you authorize cards and capture the order amount either after shipping or based on the established business logic.
- Default OMS Configuration: We provide default OMS configurations (for regular ecommerce sites and marketplaces) that you can use as an example or modify to align with your business logic.

## Stripe payment methods

The Stripe module supports all payments enabled by Stripe in your region. For more information, see [Payment methods in Stripe](https://stripe.com/docs/payments/payment-methods/overview).
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

- Partial capture of payment for orders with multiple items isn't covered (Stripe allows only one capture per PaymentIntent). One payment intent is created per order, and the payment for the order can either be authorized, captured, or cancelled from Stripe's side.
- Payments can't be partially canceled.
- Items canceled after capture are handled via refunds. 

## Browser back button handling

Using the browser back button at the Stripe payment form may lead to issues with order persistence and stock management. For instructions on configuring your application to handle this scenario and prevent duplicate orders, see [Configure handling of browser back button action at payment page](/docs/pbc/all/payment-service-provider/latest/base-shop/configure-handling-of-browser-back-button-action-at-hosted-payment-page.html).


## Next step

[Integrate Stripe](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/stripe/install-and-configure-stripe-prerequisites.html)
