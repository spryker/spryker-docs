---
title: Stripe
description: Stripe technology partner
last_updated: Jan 31, 2024
template: concept-topic-template
related:
  - title: Install Stripe
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/stripe/install-stripe.html
---

[Stripe](https://stripe.com/en-de) is a financial infrastructure platform that enables businesses to accept payments, grow their revenue, and accelerate new business opportunities.

The Stripe integration in Spryker is a part of the App Composition Platform and supports both the default Storefront Yves and Spryker GLUE APIs. 

## Supported business models
The Stripe App supports the business-to-business (B2B) and business-to-consumer (B2C) models.

## Features
The Stripe app has the following features:
- Interface within the Spryker ACP catalog to connect with Stripe: You can connect to Stripe from the App Composition Platform.
- Easy switch between Test & Live mode: You can test payments in either mode.
- Responsive Redirect Payment Page: Once a connection is set up between Spryker & Stripe, upon check out, end users are redirected to a Spryker-hosted payment page where they can view activated payment methods. This works both on web and mobile.
- Viewing the activated payment methods in the Stripe dashboard.
- GLUE API support: Support for customers using Spryker headless.
- Authorize payments and capture later: The default OMS configuration allows you to authorize cards and capture the order amount either after shipping or based on the established business logic.
- Default OMS Configuration: We provide a default OMS configuration which you can use an example or modify to align with your business logic.

## Prerequisites for using the Stripe app

1. You have a Stripe account. Your Stripe account needs to be connected to the Spryker platform account. We will help you with this. Kindly send a message to our [Spryker support team](https://spryker.my.site.com/support/s/).
2. Your Spryker project is ACP-enabled. For more information on the ACP enablement process, see [App Composition Platform installation](/docs/acp/user/app-composition-platform-installation.html).
3. You have the required [SCCOS prerequisites](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/install-stripe.html).
4. Your country is included in the [list of countries supported by Stripe](https://stripe.com/global).
5. Your business isn't listed among the [prohibited and restricted businesses](https://stripe.com/legal/restricted-businesses).


## Payment methods
The Stripe app supports all payments enabled by Stripe in your region. Learn more about [Payment methods in Stripe](https://stripe.com/docs/payments/payment-methods/overview). 
However our team only tested the following payment methods
- Cards: including Visa and Mastercard
- Debit card
- Bank transfer
- Klarna
- Apple Pay
- Google Pay
- Direct Debit (SEPA) / Sofortüberweisung
- iDEAL
- Link
- Przelewy24
- Giropay

{% info_block infoBox "Bank transfers" %}

Stripe supports bank transfers in specific regions. You can read more about [Bank transfer payments](https://stripe.com/docs/payments/bank-transfers) here.

{% endinfo_block %}


## Current limitations

The Stripe App has limited or no support for the following features:
- Refunds & Payment Cancellation: Handling refunds & payment cancellation via the Spryker OMS.
- Payment Authorization & Capture: The current logic works with separate authorization & capture. Hence, all payment methods go through this transition.
- Payment Authorization Timeout: There is currently a one-day timeout for authorizing payments. This means that payment methods such as bank transfers, which are not authorized within this timeframe, will experience a timeout. We recommend extending the timeout from one day to seven days. 
- Multi-Capture: Partial capture of payment for orders items.