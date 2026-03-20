---
title: Onboard to Stripe in the Merchant Portal
description: Learn how to onboard to Stripe in the Merchant Portal for your Spryker Marketplace projects.
last_updated: June 28, 2024
template: back-office-user-guide-template
---

{% info_block warningBox "" %}

For merchants to to be redirected to the Merchant Portal portal from third-party websites, make sure that, in the web server public folder of your Merchant Portal, there is a `redirect.php` file: [/public/MerchantPortal/redirect.php](https://github.com/spryker-shop/b2c-demo-marketplace/blob/master/public/MerchantPortal/redirect.php).

{% endinfo_block %}

To onboard to Stripe as a merchant, follow the steps:

1. In the Merchant Portal, go to **Payment Settings**.
2. On the **Payment Settings** page, click **Start Onboarding**.
  This opens Stripe's onboarding page
3. To complete the onboarding, follow the prompts to fill in merchant information.
  Once you finish onboarding, the **Payment Settings** page is opened. Stripe needs to approve your onboarding request before you can start using it. You can check the status of onboarding in the Stripe dashboard.



## Stripe onboarding statuses

- **Pending**: The Merchant started the onboarding process but did not complete it.
- **Enabled**: The Merchant completed the onboarding process and is ready to receive payments.
- **Restricted**: Additional data from the Merchant are required. When not updated the payouts will be paused after some period of time.
- **Restricted Soon**: Additional data from the Merchant are required. When not updated the payouts will be paused in the near future.
- **Pending**: The Merchant onboarding is not completed and must be finalized.
- **Rejected**: The Merchant onboarding was rejected and need to contact you to clarify the issue.
