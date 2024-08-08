---
title: Stripe for Marketplace
description: Stripe technology partner for Marketplace
last_updated: August 8, 2024
template: concept-topic-template
---

[Stripe](https://stripe.com/en-de) is a financial infrastructure platform that enables businesses to accept payments, grow their revenue, and accelerate new business opportunities.

The Stripe integration in Spryker is part of the App Composition Platform and supports both the default Storefront Yves and Spryker GLUE APIs.

This section contains the guides related to running Stripe with Marketplace projects. For more information about Stripe, see [Stripe](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/stripe.html).

## Understanding the Marketplace Design with Stripe
Payments are a crucial component of any commerce platform, including marketplaces. Spryker offers an out-of-the-box integration with Stripe, enabling marketplaces to seamlessly collect payments from customers and remit payments to the merchants selling on the platform. 
The payment flow is built using [separate charges & transfers](https://docs.stripe.com/connect/separate-charges-and-transfers). This is summarized in the following four steps:

1. A buyer makes a single payment to the platform (Marketplace) for a purchase involving multiple sellers.
2. The platform (Marketplace) receives the funds in its Stripe account and pays the associated Stripe fees.
3. Transfers are made to the merchants separately, depending on the Marketplace's operating model.
4. The balances in the merchants' connected accounts are paid out to their respective bank accounts.


## User Journey
The image below outlines the user journey for how the Stripe App functions in marketplaces built with Spryker.


Before using the Stripe App in your marketplace, please ensure the following [prerequisites are met](/docs/pbc/all/payment-service-provider/{{page.version}}/marketplace/stripe-third-party-integration/install-and-configure-stripe-prerequisites-for-marketplace.html)

## Next steps

[Install and configure Stripe prerequisites for Marketplace](/docs/pbc/all/payment-service-provider/{{page.version}}/marketplace/stripe-third-party-integration/install-and-configure-stripe-prerequisites-for-marketplace.html)
