---
title: Manage your Stripe Configurations in the ACP Catalog
description: Find out how you can configure the Stripe app in your Spryker shop
draft: true
last_updated: Jan 31, 2024
template: howto-guide-template
related:
  - title: Stripe
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/stripe/stripe.html
redirect_from:
- /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/stripe/install-stripe.html
---
Once you have [the SCCOS prerequisites for Stripe](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/install-stripe.html), you can configure it.

## Prerequisites

Before configuring Stripe, make sure you have met all the prerequisites listed in [Prerequisites for using the Stripe app](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/stripe.html#prerequisites-for-using-the-stripe-app).

## Connect & Configure the Stripe App

1. In your store's Back Office, go to **Apps**.
2. Click **Stripe**.
   This takes you to the Stripe app details page.
3. In the top right corner of the Stripe app details page, click **Connect app**.
   This displays a message about the successful connection of the app to your SCCOS. The Stripe app's status changes to *Connection pending*.
4. Go to [Stripe Dashboard](https://dashboard.stripe.com) and copy your account ID. Learn more about the Stripe [account id](https://stripe.com/docs/payments/account).
5. Go back to your store's Back Office, to the Stripe app details page.
6. In the top right corner of the Stripe app details page, click **Configure**.
7. In the *Configure* pane, fill in the *ACCOUNT ID* field with value from step 4.
8. In *Environment*, select if you want to use the App in test or live mode. View here to learn more about [Stripe test modes](https://stripe.com/docs/test-mode).
9. Optionally: In *Payment page title*, enter your shop name. This name will be displayed on the *Payment* page as a merchant label for the payee.
![stripe-configuration](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/payment-service-providers/stripe/configure-stripe/stripe-configuration.png)
10. Click **Save**.
If the app was connected successfully, a corresponding message appears, and the app status changes to **Connected**. 
11. Activate Stripe in your store's Back office, in **Administration** -> **Payment methods**. For details, see [Edit payment methods](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/manage-in-the-back-office/edit-payment-methods.html).


## Disconnect the Stripe App
Please note that disconnecting the Stripe App from your store removes makes it unavailable to your customers as a payment option. 
You should only disconnect if there are no open orders that still use the Stripe payment method.
You will need to reconnect the App is you want to use the Stripe App after a disconnection

To disconnect the Stripe app from your store, do the following:
1. In your store's Back Office, go to **Apps**.
2. Click **Stripe**.
3. On the Stripe app details page, next to the **Configure** button, hold the pointer over <span class="inline-img">![disconnect-button](https://spryker.s3.eu-central-1.amazonaws.com/docs/aop/user/apps/bazzarvoice/disconnect-button.png)</span> and click **Disconnect**.
4. In the message that appears, click **Disconnect**. This removes the Stripe configurations from the Back Office and from the Storefront.

