---
title: Stripe for Marketplace Overview
description: Overview of the Stripe integration for Marketplace
last_updated: August 8, 2024
template: concept-topic-template
---
The Marketplace payment experience cuts across different parts of the journey that impacts the merchant, buyer and the marketplace operator. 

Understanding the Personas
1. Merchant: Someone selling goods in a marketplace
2. Buyer: Someone making a purchase from the marketplace
3. Marketplace Operator: The owner of the marketplace who may also be selling goods on the marketplace

## Marketplace Payment Administration

### Marketplace Operator's Onboarding to the Stripe App
After installing the [prerequisites](/docs/pbc/all/payment-service-provider/{{page.version}}/marketplace/stripe-third-party-integration/install-and-configure-stripe-prerequisites-for-marketplace.html#prerequisites) required to use the Stripe App in the marketplace, the Operator has to follow the steps [here](/docs/pbc/all/payment-service-provider/{{page.version}}/marketplace/stripe-third-party-integration/connect-and-configure-stripe-for-marketplace.html) to connect Spryker to Stripe via the Stripe App.

Once the step above is completed, we recommend that the Operator does the following:
1. Ensure that payment methods of choice are enabled from within the Stripe Dashboard
2. The payment flow is tested in test mode before going live
3. The account [checklist here from Stripe](https://docs.stripe.com/get-started/account/checklist) are followed before the shop goes live
4. Best practices for [risk management with Stripe](https://docs.stripe.com/connect/risk-management/best-practices#fraud) are adhered to


### Onboarding Merchants to the Stripe App
The merchant onboarding to the Stripe App or any Payment Service Provide is a part of the general merchant onboarding process to the marketplace.

Depending on the setup of your marketplace, merchant users will receive a communication on how to access the Merchant Portal either via email or some other means. We recommend using this same channel of communication to inform Merchants of the need to connect to the Marketplace Stripe account. 

How this works:
1. Merchants follow the steps [here](/docs.spryker.com/docs/pbc/all/payment-service-provider/{{page.version}}/marketplace/stripe-third-party-integration/onboard-to-stripe-in-the-merchant-portal.html) to connect to the Marketplace Stripe account
2. Once step 1 is completed, a Stripe Express account is created for the merchant and Stripe verifies the merchant's KYC details
3. If the verification is successful, then the status changes

It is important for merchants to be connected to the Marketplace Stripe account so that payments can be made to them from the marketplace for goods sold. Merchants who are successfully verified by Stripe will be able to receive payouts from the marketplace. Do check with your merchants to ensure that this process is clear to them

Some notes for the Marketplace Operator:
- Merchants disabled from Spryker are not automatically removed from the Stripe App. If you need to disable a merchant from receiving payouts, this is to be done from within the Stripe Dashboard
- A single onboarding is required for each merchant. This means that if a merchant has more than 1 merchant users, the Stripe onboarding needs to be done once.
- The payment page where the onboarding is done within the merchant portal will be visible to all merchant users connected to a single merchant.

## Marketplace Payments & Merchant Payouts

### Marketplace Payments
The Stripe App in the marketplace uses the separate charges and transfers fund flow. This fund flow works great for marketplaces that need to split payments between multiple merchants. With this flow, Stripe requires that the marketplace operator and the merchants are in the same region. An error is returned if this is not the case. 

Projects who will like to use a set up a single marketplace with merchants across different regions should contact the product team via their customer success representative. 

Summary of the Payment Flow:
1. Customers make a single payment for an order to the Marketplace
2. The Marketplace is in charge of refunds since the payment contract is between the marketplace operator and the customer. 
3. Payouts are later made to the merchants for their corresponding order.


### Managing Merchant Payouts using Spryker's Commissions Engine
The terms payouts & transfers are used interchangeably in our documentation. These 2 words have different meanings in Stripe's context.

- Transfer: refers to the movement of money from a Marketplace Stripe account to the Merchant's Stripe account (i.e. the connected account)
- Payout: refers to the movement of money from the merchant's stripe account to their bank account

Payouts are a key part of any marketplace setup. The Stripe App has been built to allow projects configure how they want to manage payouts (also called transfers). An example of an OMS configuration is provided which can be used as a reference on projects. 

Marketplaces using the Spryker commissions engine should ensure that they have the [feature installed](https://docs.spryker.com/docs/pbc/all/merchant-management/202407.0/marketplace/marketplace-merchant-commission-feature-overview.html)

How Payouts (Transfers) work with the Spryker Commission Engine:
1. Ensure that the commissions feature and Stripe App for marketplace is set up on the project
2. Configure your OMS to suit your business logic
4. Setup trigger for transfers using a timeout or [schedule cronjobs that trigger transfers in a defined period](/docs.spryker.com/docs/pbc/all/payment-service-provider/202404.0/marketplace/stripe-third-party-integration/configure-merchant-transfers-for-stripe.html)
5. Test that the commissions are applied to the transfer amount
