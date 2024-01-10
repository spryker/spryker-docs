---
title: Install Stripe
description: Find out how you can install Stripe in your Spryker shop
draft: true
last_updated: Jan 31, 2024
template: howto-guide-template
related:
  - title: Stripe
    link: docs/pbc/all/payment-service-provider/page.version/stripe/stripe.html
redirect_from:
    - /docs/pbc/all/tax-management/202311.0/vertex/install-vertex.html

---
This document describes how to integrate [Stripe](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/third-party-integrations/stripe/stripe.html) into a Spryker shop.

## Prerequisites

Before integrating Stripe, ensure the following prerequisites are met:

- Make sure your project is ACP-enabled. See [App Composition Platform installation](/docs/acp/user/app-composition-platform-installation.html) for details.

## 1. Connect Stripe

1. In your store's Back Office, go to **Apps&nbsp;<span aria-label="and then">></span> Catalog**.
2. Click **Stripe**.
   This takes you to the Stripe app details page.
3. In the top right corner of the Stripe app details page, click **Connect app**.
   This displays a message about the successful connection of the app to your SCCOS. The Stripe app's status changes to *Connection pending*.
4. Go to [Stripe Dashboard](https://dashboard.stripe.com) and obtain your account ID.
   [Get Stripe account ID here](https://stripe.com/docs/payments/account)

   {% info_block infoBox "Info" %}

   It takes some time to obtain an account ID from Stripe because you have to go through a thorough vetting process by Stripe, such as the "know your customer" (KYC) process before Stripe verifies you.

   {% endinfo_block %}

## 2. Configure Stripe

1. Go to your store's Back Office, to the Stripe app details page.
2. In the top right corner of the Stripe app details page, click **Configure**.
3. On the Stripe app details page, fill in the account ID field in the **Configuration** section.
4. Select **Stripe Environment Mode**.
5. Enter your *Shop Name*. This name will be displayed on **Payment** page as a merchant label for whom to pay:
6. Click **Save**.

If the app was connected successfully, a corresponding message appears, and the app status changes to **Connected**. Activate Stripe by going to Back office, under **Administration&nbsp;<span aria-label="and then">></span>  Payment methods**.

## 3. Add Stripe domain to your allowlist

To enable Stripe to redirect your customers to their 3D Secure page and later to your success page, you must add the ACP domain inside your **Content Security Policy** allowlist. To do that, change your `deploy.yml` file or your `config/Shared/config_default.php` file if changing the environment variable is not possible.

In the `deploy.yml` file, introduce the required changes:

```yml
image:
  environment:
    SPRYKER_AOP_APPLICATION: '{
      "APP_DOMAINS": [
        "stripe.acp.spryker.com",
        ...
      ],
      ...
    }'
```

Alternatively, you may add the domain to the allowlist from the `config/Shared/config_default.php` file. If you updated the `deploy.yml` file, this step can be ignored.

```php
$config[KernelConstants::DOMAIN_WHITELIST][] = 'os.apps.aop.spryker.com';
```

## Next steps

[Activate Stripe payment methods](/docs/pbc/all/payment-service-provider/{{page.version}}/base-shop/manage-in-the-back-office/edit-payment-methods.html)
