---
title: Configure Stripe
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
Once you have [installed Stipe](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/install-stripe.html), you can configure it.

## Prerequisites

Before configuring Stripe, ensure you have a Stripe account which is connected to the Spryker platform. If you are unsure how to do it, contact the Spryker support team.

## Configure Stripe

1. In your store's Back Office, go to **Apps**.
2. Click **Stripe**.
   This takes you to the Stripe app details page.
3. In the top right corner of the Stripe app details page, click **Connect app**.
   This displays a message about the successful connection of the app to your SCCOS. The Stripe app's status changes to *Connection pending*.
4. Go to [Stripe Dashboard](https://dashboard.stripe.com) and copy your account ID. For details on how to obtain the Stipe account it, see the [Stripe documentation](https://stripe.com/docs/payments/account).

{% info_block infoBox "Info" %}

It takes some time to obtain an account ID from Stripe because you have to go through a thorough vetting process, such as the "know your customer" (KYC) process, before Stripe verifies you.

{% endinfo_block %}

5. Go back to your store's Back Office, to the Stripe app details page.
6. In the top right corner of the Stripe app details page, click **Configure**.
7. In the *Configure* pane, fill in the *ACCOUNT ID* field with value from step 4.
8. In *Environment*, select the Stripe environment mode. For details in the Stipe modes, see the [Stripe documentation](https://stripe.com/docs/test-mode).
9. Optionally: In *Payment page title*, enter your shop name. This name will be displayed on the *Payment* page as a merchant label for the payee.
![stripe-configuration](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/payment-service-providers/stripe/configure-stripe/stripe-configuration.png)
10. Click **Save**.
If the app was connected successfully, a corresponding message appears, and the app status changes to **Connected**. 
11. Activate Stripe in your store's Back office, in **Administration** -> **Payment methods**. For details, see [Edit payment methods](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/manage-in-the-back-office/edit-payment-methods.html).


