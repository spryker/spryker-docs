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

This document outlines the steps to connect and configure the Stripe app in the Back Office.

## Prerequisites

- [Install and configure Stripe prerequisites](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/stripe/install-and-configure-stripe-prerequisites.html).
- Obtain Stripe account ID in [Stripe Dashboard](https://dashboard.stripe.com). For more details, see [Stripe account ID](https://stripe.com/docs/payments/account).
- (Only for the shops with the B2C business model) Please contact your Spryker account manager with the request to connect your Stripe account to Spryker's account.

## Connect and configure the Stripe app

1. In the Back Office, go to **Apps**.
2. Click on **Stripe**.
   This opens the Stripe app details page.
3. Click **Connect app**.
   This displays a success message with the app's status as **Connection pending**.
4. Click **Configure**.
  This opens the **Configure** pane.
5. For **Business Model**, select **B2B/B2C**.

{% info_block infobox %}

If you're configuring Stripe for Marketplace, see [Connect and configure Stripe for Marketplace](/docs/pbc/all/payment-service-provider/latest/marketplace/stripe-third-party-integration/connect-and-configure-stripe-for-marketplace.html).

{% endinfo_block %}  

6. For **STRIPE ACCOUNT ID**, enter the account ID you've obtained in the [prerequisites](#prerequisites).
7. For **Environment**, select if you want to use the app in test or live mode. For details on the Stripe test mode, see [Test mode](https://stripe.com/docs/test-mode).
8. Optional: For **PAYMENT PAGE TITLE**, enter your shop name. This name will be displayed on the **Payment** page as a merchant label for the payee.
9. Optional: For **BRAND FAVICON**, enter a link to an image to be used as a favicon on the **Payment** page.
10. Optional: For **PAY BUTTON COLOR**, enter a HEX code to customize the **PAY** button color.
11. Click **Save**.
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

Activate the Stripe payment method. For instructions, see [Edit payment methods](/docs/pbc/all/payment-service-provider/latest/base-shop/manage-in-the-back-office/edit-payment-methods.html).
