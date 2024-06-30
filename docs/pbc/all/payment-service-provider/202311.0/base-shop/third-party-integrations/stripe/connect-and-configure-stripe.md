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
