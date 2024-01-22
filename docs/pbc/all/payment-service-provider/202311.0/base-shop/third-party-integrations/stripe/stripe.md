---
title: Stripe
description: Stripe technology partner
last_updated: Jan 31, 2024
template: concept-topic-template
related:
  - title: Install Stripe
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/stripe/install-stripe.html
---

Stripe is a financial infrastructure platform which enables businesses to accept payments, grow their revenue, and accelerate new business opportunities. You can read more about Stripe on their website here, [Stripe website](https://stripe.com/en-de).

The Stripe integration in Spryker is a part of the App Composition Platform and is built to support both the default Storefront Yves & Spryker GLUE APIs. 

### Supported Business Models
The Stripe App is currently built to support Busines- to-business (B2B) and Business-to-consumer (B2C) models. Marketplace model will be supported in a later phase

### Prerequisites for using the Stripe App
1. The country is supported in one of the regions here, [Stripe Regions]([https://stripe.com/en-de](https://stripe.com/global).
2. Your business is not listed in the list of [prohibited & restricted businesses](https://stripe.com/legal/restricted-businesses).
3. Your Spryker project is ACP-Enabled. Read more about App Composition Platform (ACP) Enablement process here, [ACP](https://docs.spryker.com/docs/acp/user/app-composition-platform-installation.html).

## Getting started with Stripe in your Spryker Project
To use connect the Stripe App to your Spryker project, you need to have a Stripe account and be onboarded to the platform. This is managed by Spryker.

Once you have been onboarded to the platform, you will have access to your account IDs provided inside your Stripe dashboard. This is then used to connect your project to the Stripe App. You can learn more about the [Stripe account ID here](https://stripe.com/docs/payments/account).

### Setting up the Stripe App
To set up Stripe on your project, do follow the steps below:
1. Install Stripe by following this guide. [Install Stripe](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/install-stripe.html).
2. Configure & Connect Stripe in the *Backoffice>>Apps*. [Details here](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/configure-stripe.html).

### Supported Payment Methods
The following payment methods are currently supported in the Stripe App:
- Cards: Visa and Mastercard
- Debit Card
- Bank Transfer *
- SEPA Direct Debit
- iDEAL
- Klarna

{% info_block infoBox "Payment Methods" %}

Please note the following about Stripe Payment Methods:
1. Stripe supports Bank Transfers in specific regions. Click [here](https://stripe.com/docs/payments/bank-transfers) to learn more this payment method.
2. Stripe provides some best practices for Bank Transfer. For example, if a business in EU wants to receive transfer from a customer in Switzerland then they are advised to make the transfer in Euro as opposed to CHF. Learn more about [Stripe’s Payment Method Factsheet here](https://stripe.com/ie/guides/payment-methods-guide#4-payment-methods-fact-sheets).
3. You can learn more about Payment methods available in Stripe and the regions [here](https://stripe.com/docs/payments/payment-methods/overview).

{% endinfo_block %}

### Current Limitations
1. Refunds: Refund process using the Spryker OMS is not currently supported. This will be supported in the next release
2. Multi-Capture: This enables businesses to capture money paid for an order multiple times. Stripe offers this to specific customers. Learn more about it [here](https://support.stripe.com/questions/understanding-blended-interchange-pricing)
