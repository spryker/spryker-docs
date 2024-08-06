---
title: Configure merchant transfers for Stripe
description: Learn how to configure merchant transfers for Stripe
last_updated: June 31, 2024
template: howto-guide-template
---

The terms *Payout* and *Reverse Payout* refer to transferring money from the Marketplace to the Merchant and reversing the transfer respectively.

When using Stripe in a Marketplace, you need to configure the these transfers. Transfers are handled by the `MerchantPayoutCommandByOrderPlugin` and `MerchantPayoutReverseCommandByOrderPlugin` commands. These commands transfer money from the Marketplace to the Merchant and reverse such transfers.

By default, there're several options to trigger transfers in OMS. The simplest solution is to set a state-machine-timeout for the `MerchantPayoutCommandByOrderPlugin` command. This triggers the command after the timeout is reached. You can also define your own conditions and triggers for the command.

With more sophisticated requirements, like transferring money to merchants on the last Firday of every month, you can set up a cronjob that triggers the event for the transition.

## Next step

[Connect and configure Stripe for Marketplace](/docs/pbc/all/payment-service-provider/{{page.version}}/marketplace/stripe-third-party-integration/connect-and-configure-stripe-for-marketplace.html)
