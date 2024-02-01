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
The Stripe App currently has the following features:
1. Interface within Spryker ACP Catalog to connect with Stripe: Users can easily connect to Stripe from the App Composition Platform.
2. Easy switch between Test & Live mode: Users have the option to test payments in either mode.
3. Responsive Redirect Payment Page: Once a connection is set up between Spryker & Stripe, End users checking out are redirected to a Spryker-hosted payment page where they can view activated payment methods. This works both on web and mobile.
4. View Payment Methods activated in your Stripe Dashboard
5. GLUE API Support: Support for customers using Spryker headless.
6. Authorize payments and capture later: The default OMS configuration enables you authorize cards and capture the order amount after shipping or depending on the business logic set up.
7. Default OMS Configuration: We provide a default OMS configuration which can be used as an example or modified to suit your business logic.

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

Keep in mind following about bank transfers in Stripe:
Stripe supports bank transfers in specific regions. You can read more about [Bank transfer payments](https://stripe.com/docs/payments/bank-transfers) here.

{% endinfo_block %}


## Current limitations
The Stripe App has limited or no support for the following features:
1. Refunds & Payment Cancellation: Handling refunds & payment cancellation via the Spryker OMS.
2. Payment Authorization & Capture: The current logic implemented works with separate authorization & capture hence all payment methods go through this transition.
3. Payment Authorization Timeout: We have a timeout of 1 day for authorizing payments. This means that for payment methods such as Bank Transfers which are not authorized will have this timeout. Our recommendation is to change the 1-day timeout to 7 days. 
4. Multi-Capture: Partial capture of payment for orders items.
