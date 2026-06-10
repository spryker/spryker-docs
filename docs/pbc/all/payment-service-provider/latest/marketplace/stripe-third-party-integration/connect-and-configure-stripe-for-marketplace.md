---
title: Configure Stripe for Marketplace
description: Find out how you can configure Stripe for your Spryker Marketplace project.
last_updated: Apr 14, 2026
template: howto-guide-template
---

This document describes how to configure Stripe for a Marketplace project after the module has been installed.

## Prerequisites

- [Install and configure Stripe prerequisites for base shop](/docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/stripe/install-and-configure-stripe-prerequisites.html) with the `StripeManualMarketplace01` OMS process active.
- [Install and configure Stripe prerequisites for Marketplace](/docs/pbc/all/payment-service-provider/latest/marketplace/stripe-third-party-integration/install-and-configure-stripe-prerequisites-for-marketplace.html).
- Obtain Stripe account details in [Stripe Dashboard](https://dashboard.stripe.com):
  - Stripe account ID. For more details, see [Stripe account ID](https://stripe.com/docs/payments/account).
  - Stripe publishable and secret keys. For more details, see [Secret and publishable keys](https://docs.stripe.com/keys#obtain-api-keys).

## Configure the Connect webhook secret

In your `config/Shared/config_local.php`, add the Stripe Connect webhook secret obtained from the Stripe Dashboard:

```php
use SprykerEco\Shared\Stripe\StripeConstants;

$config[StripeConstants::STRIPE_WEBHOOK_SECRET_CONNECT] = 'whsec_***'; // Replace with your Connect webhook signing secret
```

## Enable Stripe Connect in the Stripe Dashboard

1. Log in to the [Stripe Dashboard](https://dashboard.stripe.com).
2. Navigate to **Connect** and enable Stripe Connect for your platform account.
3. For each merchant who will sell on your marketplace, create a connected account in the Stripe Dashboard, or let the onboarding flow create one automatically when a merchant completes onboarding.

## Activate the Stripe payment method in Back Office

1. In the Back Office, go to **Administration > Payment Methods**.
2. Find **Stripe** in the list and click **Edit**.
3. On the **Edit Payment Method** page, select the stores where Stripe should be active.
4. Click **Save**.

For detailed instructions, see [Edit payment methods](/docs/pbc/all/payment-service-provider/latest/base-shop/manage-in-the-back-office/edit-payment-methods.html).

## Inform merchants about Stripe onboarding

After Stripe is activated, inform your merchants that Stripe is available as a payment method. Merchants must complete the Stripe onboarding process before they can receive payouts.

For merchant onboarding instructions, see [Onboard to Stripe in the Merchant Portal](/docs/pbc/all/payment-service-provider/latest/marketplace/stripe-third-party-integration/onboard-to-stripe-in-the-merchant-portal.html).

## Next steps

1. Review the OMS configuration: [Stripe OMS configuration for marketplaces](/docs/pbc/all/payment-service-provider/latest/marketplace/stripe-third-party-integration/stripe-oms-configuration-in-marketplaces.html).
2. Configure merchant transfer schedules: [Configure merchant transfers for Stripe](/docs/pbc/all/payment-service-provider/latest/marketplace/stripe-third-party-integration/configure-merchant-transfers-for-stripe.html).
