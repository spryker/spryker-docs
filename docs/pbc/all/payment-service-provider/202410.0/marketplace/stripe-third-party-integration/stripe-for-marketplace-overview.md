---
title: Stripe for Marketplace Overview
description: Overview of the Stripe integration for Spryker Marketplace based projects and how stripe can enhance your store.
last_updated: August 8, 2024
template: concept-topic-template
---

This document describes how Stripe marketplace payments and merchant payouts are administered and managed.

## Marketplace personas

The Marketplace payment experience affects merchants, buyers, and the marketplace operator.

***Merchant***
  An entity selling goods in a marketplace.

***Buyer***
  An entity that buys products in a marketplace.

***Marketplace Operator***
  The owner of a marketplace who can optionally sell products.

For more information about personas, see [Marketplace personas](/docs/about/all/spryker-marketplace/marketplace-personas.html)


## Setting up and onboarding to Stripe

This section describes how the marketplace operator can set up and onboard themself and merchants to Stripe.

### Marketplace operator's onboarding to Stripe

After [prerequisites are installed](/docs/pbc/all/payment-service-provider/{{page.version}}/marketplace/stripe-third-party-integration/install-and-configure-stripe-prerequisites-for-marketplace.html), to connect Spryker to Stripe via the Stripe App, the operator needs to follow [Connect and configure Stripe for Marketplace](/docs/pbc/all/payment-service-provider/{{page.version}}/marketplace/stripe-third-party-integration/connect-and-configure-stripe-for-marketplace.html).

Once the marketplace is connected to Stripe, we recommend that the Operator does the following before going live:
* In the Stripe Dashboard, enable the needed payment methods.
* Test the payment flow.
* Complete [Stripe's account checklist](https://docs.stripe.com/get-started/account/checklist).
* Adhere to [Stripe's risk management best practices](https://docs.stripe.com/connect/risk-management/best-practices#fraud).


### Onboarding merchants to Stripe

The merchant onboarding to Stripe is part of the general merchant onboarding process.

Depending on your marketplace setup, merchant users will receive information on accessing the Merchant Portal via email or other means. We recommend using the same communication channel to inform merchants about Stripe and how to onboard to it. They can use Stripe as a payment method only after onboarding, so make sure to make this process clear to them.

Onboarding happens in the following steps:
1. To connect to the Marketplace Stripe account, a merchant follows [Onboard to Stripe in the Merchant Portal](/docs/pbc/all/payment-service-provider/{{page.version}}/marketplace/stripe-third-party-integration/onboard-to-stripe-in-the-merchant-portal.html).
2. A Stripe Express account is created for the merchant.
3. Stripe verifies the merchant's KYC details.
4. If the verification is successful, the status of the connection changes in the Stripe Dashboard.


#### Notes for the Marketplace Operator about merchant onboarding

- Merchants disabled in the Spryker Marketplace aren't automatically removed from the Stripe App. If you need to disable a merchant from receiving payouts, you need to do it in the Stripe Dashboard.
- A merchant needs to onboard once to enable Stripe for all merchant users.
- All merchant users belonging to a merchant have access to the **Payment Setting** page with Stripe onboarding.

## Marketplace payments and merchant payouts

This section describes the marketplace payment flow and how to set up commissions and payouts.

### Marketplace payments

The Stripe app in the marketplace uses separate charges and transfers fund flow. This fund flow works great for marketplaces that need to split payments between multiple merchants. With this flow, Stripe requires that the marketplace operator and the merchants are in the same region. If they're not in the same region, payments will result in errors. If you want to set up a marketplace with merchants in different regions, contact your customer success representative to set up a proper fund flow.

The payment flow is as follows:
* For an order in the marketplace, a customer make a single payment.
* Refunds are handled by Spryker Marketplace because the payment contract is between the marketplace operator and the customer.
* Payouts to merchants fulfilled through them are issued later.


### Managing merchant payouts using Spryker's commissions engine

The terms *payouts* and *transfers* are interchangeable in Spryker's context. However, they have different meanings in Stripe's context:

***Transfer***
  Refers to the movement of money from a Marketplace Stripe account to the Merchant's Stripe account, meaning the connected account.

***Payout***
  Refers to the movement of money from the merchant's Stripe account to their bank account.

The Stripe app lets you configure how you want to manage payouts (also called transfers). An example OMS configuration is provided as a reference.

To use Spryker's marketplace commissions engine, you need to [install the Marketplace Merchant Commissions feature](/docs/pbc/all/merchant-management/202410.0/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-commission-feature.html).

Payouts with Spryker's commissions engine work as follows:
1. Set up the marketplace merchant commissions feature and the Stripe app.
2. Configure OMS to suit your business logic.
4. Set up a trigger for transfers using a timeout or [set up cronjobs that trigger transfers on a schedule](/docs/pbc/all/payment-service-provider/{{page.version}}/marketplace/stripe-third-party-integration/configure-merchant-transfers-for-stripe.html).
5. Test that the commissions are applied to the transfer amount.

## Important notes about Stripe

* Actions performed on a payment, such as cancellation or capture, must be triggered from Spryker either using the Back Office or OMS. Because OMS information is stored in Spryker, triggering such actions from Stripe Dashboard will result in failures.
* The Marketplace business model doesn't support multi-capture. Before transfers can be made to merchants, the marketplace owner must capture a payment. For more information on multi-capture, see [Capture a payment multiple times](https://docs.stripe.com/payments/multicapture).


## Next step
[Install and configure Stripe prerequisites for marketplace](/docs/pbc/all/payment-service-provider/202404.0/marketplace/stripe-third-party-integration/install-and-configure-stripe-prerequisites-for-marketplace.html)
