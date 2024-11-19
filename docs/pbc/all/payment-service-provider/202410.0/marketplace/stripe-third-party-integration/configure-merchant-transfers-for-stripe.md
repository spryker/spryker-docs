---
title: Configure merchant transfers for Stripe
description: Learn how to configure merchant transfers for Stripe
last_updated: Aug 20, 2024
template: howto-guide-template
---

The terms *Payout* and *Reverse Payout* refer to transferring money from the Marketplace to the Merchant and reversing the transfer respectively.

When using Stripe in a Marketplace, you need to configure the these transfers. Transfers are handled by the `MerchantPayoutCommandByOrderPlugin` and `MerchantPayoutReverseCommandByOrderPlugin` commands. These commands transfer money from the Marketplace to the Merchant and reverse such transfers.

By default, there're several options to trigger transfers in OMS. The simplest solution is to set a state-machine-timeout for the `MerchantPayoutCommandByOrderPlugin` command. This triggers the command after the timeout is reached. You can also define your own conditions and triggers for the command.

With more sophisticated requirements, like transferring money to merchants on the last Friday of every month, you can set up a cronjob that triggers the event for the transition.

## Commission calculation

The amount to be paid out to the merchants is calculated based on the commission that is set up in the Back Office. The commission is calculated when the order is moved to the `payment captured` state. The commission calculation is based on your project settings.

For more details on merchant commissions, see [Marketplace Merchant Commission feature overview](/docs/pbc/all/merchant-management/202410.0/marketplace/marketplace-merchant-commission-feature-overview.html).

## Next step

[Connect and configure Stripe for Marketplace](/docs/pbc/all/payment-service-provider/{{page.version}}/marketplace/stripe-third-party-integration/connect-and-configure-stripe-for-marketplace.html)
