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

# Supported business models
The Stripe App supports the business-to-business (B2B) and business-to-consumer (B2C) models.

## Prerequisites for using the Stripe app

1. Your country is included in the [list of countries supported by Stripe](https://stripe.com/global).
2. Your business isn't listed among the [prohibited and restricted businesses](https://stripe.com/legal/restricted-businesses).
3. Your Spryker project is ACP-enabled. For more information on the ACP enablement process, see [App Composition Platform installation](/docs/acp/user/app-composition-platform-installation.html).
4. You have a Stripe account, and you have been onboarded to the Spryker platform with it. Spryker manages the onboarding process. For details, contact the [Spryker support team](https://spryker.my.site.com/support/s/).
Once you have been onboarded to the platform, you will have access to your account ID on the Stripe dashboard. The account ID is necessary to connect your project to the Stripe App. For more information on the Stripe account ID, see the [Stripe documentation](https://stripe.com/docs/payments/account).

### Setting up the Stripe app

To set up Stripe on your project, do the following:
1. [Install Stripe](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/install-stripe.html).
2. [Configure and Connect Stripe in the Back Office](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/configure-stripe.html).

### Supported payment methods
The Stripe app supports the following payment methods:
- Cards: Visa and Mastercard
- Debit card
- Bank transfer 

{% info_block infoBox "Bank transfers" %}

Note the following about bank transfers in Stripe:
1. Stripe supports bank transfers in specific regions. For details on this payment method, see the Stripe documentation on [Bank transfer payments](https://stripe.com/docs/payments/bank-transfers).
2. Stripe provides some best practices for bank transfers. For example, if a business in EU wants to receive a transfer from a customer in Switzerland then they are advised to make the transfer in Euro, and not in CHF. For details, see [Stripe’s Payment Method Factsheet](https://stripe.com/ie/guides/payment-methods-guide#4-payment-methods-fact-sheets).

{% endinfo_block %}

- SEPA direct debit
- iDEAL
- Klarna

For more information about payment methods available in Stripe and regional peculiarities, see the Stripe documentation [Payment methods overview](https://stripe.com/docs/payments/payment-methods/overview).

### Current limitations
1. Refunds: The refund process using the Spryker OMS currently isn't supported.
2. Multi-Capture: Multi-Capture enables businesses to capture money paid for an order multiple times. Stripe offers it only to customers who use the IC+ pricing model. For details on the pricing model, see the Stripe documentation [Understanding Blended & Interchange+ pricing](https://support.stripe.com/questions/understanding-blended-interchange-pricing).
