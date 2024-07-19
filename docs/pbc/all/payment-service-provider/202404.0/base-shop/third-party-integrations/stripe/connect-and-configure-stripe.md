---
title: Connect and configure Stripe
description: Find out how you can configure the Stripe app in your Spryker shop
last_updated: Jan 31, 2024
template: howto-guide-template
redirect_from:
- /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/stripe/install-stripe.html
- /docs/pbc/all/payment-service-provider/202311.0/base-shop/third-party-integrations/stripe/configure-stripe.html
- /docs/pbc/all/payment-service-provider/202311.0/base-shop/third-party-integrations/stripe/disconnect-stripe.html
- /docs/pbc/all/payment-service-provider/202311.0/base-shop/third-party-integrations/stripe/manage-stripe-configurations-in-the-acp-catalog.html
---

This document describes how to connect and configure the Stripe app in the Back Office.

## Prerequisites

[Install and configure Stripe prerequisites](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/install-and-configure-stripe-prerequisites.html)

## Connect and configure the Stripe app

1. In your store's Back Office, go to **Apps**.
2. Click **Stripe**.
   This takes you to the Stripe app details page.
3. In the top right corner of the Stripe app details page, click **Connect app**.
   This displays a message about the successful connection of the app to your SCCOS. The Stripe app's status changes to *Connection pending*.
4. Go to [Stripe Dashboard](https://dashboard.stripe.com) and copy your account ID. Learn more about the Stripe [account id](https://stripe.com/docs/payments/account).
5. Go back to your store's Back Office, to the Stripe app details page.
6. In the top right corner of the Stripe app details page, click **Configure**.
7. In the *Configure* pane, fill in the *ACCOUNT ID* field with value from step 4.
8. In *Environment*, select if you want to use the app in test or live mode. For details on the Stripe test mode, see [Test mode](https://stripe.com/docs/test-mode).
9. Optionally: In *Payment page title*, enter your shop name. This name will be displayed on the *Payment* page as a merchant label for the payee.
![stripe-configuration](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/payment-service-providers/stripe/configure-stripe/stripe-configuration.png)
10. Click **Save**.
If the app was connected successfully, a corresponding message appears, and the app status changes to **Connected**.
11. Activate Stripe in your store's Back office, in **Administration** -> **Payment methods**. For details, see [Edit payment methods](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/manage-in-the-back-office/edit-payment-methods.html).

## Using Stripe in Marketplace context

#### Configuring Transfers

In Spryker we used the terms "Payout" and "Reverse Payout" for transferring money from the Marketplace to the Merchant and reverse the transfer respectively.

In the context of Stripe in a Marketplace, you need to configure the transfers. The transfers are handled by the `MerchantPayoutCommandByOrderPlugin` and `MerchantPayoutReverseCommandByOrderPlugin` commands. These commands are responsible for transferring money from the Marketplace to the Merchant and reverse the transfer respectively when needed.

You also need to define when this should happen. You have several options here which are default options provided by the OMS. The simplest solution is to set a state-machine-timeout for the `MerchantPayoutCommandByOrderPlugin` command. This will trigger the command after the timeout is reached. You can also define your own conditions and triggers for the command.

You can also set up a cronjob that triggers the event for the transition when you have more sophisticated requirements e.g. transfer money to merchants every last friday of the month.


### App Configuration

The Stripe App is capable of handling payments in a Marketplace context. This can be configured in the AppStore Catalog by selecting the business model "Marketplace". When selecting the Marketplace business model, you need to pass the required configuration values for:
- Stripe Account ID
- Stripe Publishable Key
- Stripe Secret Key

When you save the configuration an asynchronous message will be sent to your application to get details for Merchants on how to onboard to the Stripe App. The onboarding is required to let Stripe know which Merchants are part of the Marketplace and to handle the payments, transfer money, and reverse transfers accordingly.

From this moment your customers can use Stripe to pay for their orders.
