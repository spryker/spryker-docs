---
title: Stripe for Marketplace
description: Learn about Stripe technology partner for running in a Spryker Marketplace store.
last_updated: August 8, 2024
template: concept-topic-template
---

[Stripe](https://stripe.com/en-de) is a financial infrastructure platform that enables businesses to accept payments, grow their revenue, and accelerate new business opportunities.

The Stripe integration in Spryker is part of the App Composition Platform and supports both the default Storefront Yves and Spryker GLUE APIs.

This section contains the guides related to running Stripe with Marketplace projects. For more information about Stripe, see [Stripe](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/stripe.html).

## Understanding the Marketplace design with Stripe

Payments are a crucial component of any commerce platform, including marketplaces. Spryker offers an out-of-the-box integration with Stripe, enabling marketplaces to seamlessly collect payments from customers and remit payments to the merchants selling on the platform.
The payment flow is built using [separate charges and transfers](https://docs.stripe.com/connect/separate-charges-and-transfers). This is summarized in the following four steps:

1. A buyer makes a single payment to the platform (Marketplace) for a purchase involving multiple sellers.
2. The platform (Marketplace) receives the funds in its Stripe account and pays the associated Stripe fees.
3. Transfers are made to the merchants separately, depending on the Marketplace's operating model.
4. The balances in the merchants' connected accounts are paid out to their respective bank accounts.

![marketpalce-funds-flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/payment-service-providers/marketplace/stripe-third-party-integration/stripe-for-marketplace.md/marketplace-funds-flow.png)

## User journey
The image below outlines the user journey for how the Stripe App functions in marketplaces built with Spryker.
![user-journey](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/payment-service-providers/marketplace/stripe-third-party-integration/stripe-for-marketplace.md/marketplace-payment-user-journey.png)

Before using the Stripe App in your marketplace, make sure the [prerequisites are met](/docs/pbc/all/payment-service-provider/{{page.version}}/marketplace/stripe-third-party-integration/install-and-configure-stripe-prerequisites-for-marketplace.html).
