---
title: Connect and configure Stripe for Marketplace
description: Find out how you can connect and configure the Stripe app for your Spryker Marketplace project.
last_updated: June 31, 2024
template: howto-guide-template
---

This document describes how to connect and configure the Stripe app in the Back Office.

## Prerequisites

- [Install and configure Stripe prerequisites](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/install-and-configure-stripe-prerequisites.html).
- Obtain Stripe account details in [Stripe Dashboard](https://dashboard.stripe.com):
  - Stripe account ID. For more details, see [Stripe account ID](https://stripe.com/docs/payments/account).
  - Stripe publishable and secret keys. For more details, see [Secret and publishable keys](https://docs.stripe.com/keys#obtain-api-keys).


## Connect and configure the Stripe app

1. In your store's Back Office, go to **Apps**.
2. Click on **Stripe**.
   This opens the Stripe app details page.
3. Click **Connect app**.
   This displays a success message with the app's status as **Connection pending**.
4. Click **Configure**.
  This opens the **Configure** pane.
5. For **Business Model**, select **Marketplace**.  
6. For **STRIPE ACCOUNT ID**, enter the account ID you've obtained in the [prerequisites](#prerequisites).
7. For **STRIPE PUBLISHABLE KEY**, enter the key you've obtained in the [prerequisites](#prerequisites).
8. For **STRIPE SECRET KEY**, enter the key you've obtained in the [prerequisites](#prerequisites).
9. For **Environment**, select if you want to use the app in test or live mode. For details on the Stripe test mode, see [Test mode](https://stripe.com/docs/test-mode).
10. Optional: For **PAYMENT PAGE TITLE**, enter your shop name. This name will be displayed on the **Payment** page as a merchant label for the payee.
11. Optional: For **BRAND FAVICON**, enter a link to an image to be used as a favicon on the **Payment** page.
12. Optional: For **PAY BUTTON COLOR**, enter a HEX code to customize the **PAY** button color.
13. Click **Save**.
  This displays a success message with the app's status as **Connected**.


## Retain Stripe configuration after a destructive deployment

{% info_block errorBox "" %}
[Destructive deployment](https://spryker.com/docs/dg/dev/acp/retaining-acp-apps-when-running-destructive-deployments.html) permanently deletes the configuration of the Stripe payment method.

To run a destructive deployment, follow the steps:
1. Disconnect Stripe.
2. Run a destructive deployment.
3. Reconnect Stripe.

{% endinfo_block %}

## Next steps

1. Activate the Stripe payment method. For instructions, see [Edit payment methods](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/manage-in-the-back-office/edit-payment-methods.html).
2. Inform merchants about Stripe being available. To be able to use Stripe, merchants need to onboard. For instructions, see [Onboard to Stripe in the Merchant Portal](/docs/pbc/all/payment-service-provider/{{page.version}}/marketplace/stripe-third-party-integration/onboard-to-stripe-in-the-merchant-portal.html).
