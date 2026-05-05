---
title: Processing refunds with Stripe
description: Learn how to implement Stripe using ACP
last_updated: Nov 8, 2024
template: howto-guide-template
redirect_from:
related:
   - title: Stripe
     link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/stripe/stripe.html
---

In the default OMS configuration, a refund can be done for an order or an individual item. The refund action is initiated by a Back Office user triggering the `Payment/Refund` command. The selected item enters the `payment refund pending` state, awaiting the response from Stripe.

During this period, Stripe attempts to process the request, which results in success or failure:
* Success: the items transition to the `payment refund succeeded` state, although the payment isn't refunded at this step.
* Failure: the items transition to the `payment refund failed` state.

These states are used to track the refund status and inform the Back Office user. In a few days after an order is refunded in the Back Office, Stripe finalizes the refund, causing the item states to change accordingly. Previously successful refunds may be declined and the other way around.

If a refund fails, the Back Office user can go to the Stripe Dashboard to identify the cause of the failure. After resolving the issue, the item can be refunded again.

In the default OMS configuration, seven days are allocated to Stripe to complete successful payment refunds. This is reflected in the Back Office by transitioning items to the `payment refunded` state.
