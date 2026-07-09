---
title: Test your Direct Debit implementation
description: This document describes how to test the direct debit payment implementation.
last_updated: Jun 16, 2021
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/payment-methods/direct-debit-example-implementation/test-your-direct-debit-implementation.html
  - /docs/scos/dev/back-end-development/data-manipulation/payment-methods/direct-debit-example-implementation/testing-your-direct-debit-implementation.html
related:
  - title: Implement Direct Debit payment
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/direct-debit-example-implementation/implement-direct-debit-payment.html
  - title: Implement Direct Debit in Yves
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/direct-debit-example-implementation/implement-direct-debit-in-yves.html
  - title: Implement Direct Debit in Zed
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/direct-debit-example-implementation/implement-direct-debit-in-zed.html
  - title: Implement Direct Debit in the shared layer
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/direct-debit-example-implementation/implement-direct-debit-in-the-shared-layer.html
  - title: Integrate Direct Debit into checkout
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/direct-debit-example-implementation/integrate-direct-debit-into-checkout.html
---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}


After the Direct Debit payment method has been set up on the [frontend](/docs/dg/dev/backend-development/data-manipulation/payment-methods/direct-debit-example-implementation/implement-direct-debit-in-yves.html), [backend](/docs/dg/dev/backend-development/data-manipulation/payment-methods/direct-debit-example-implementation/implement-direct-debit-in-zed.html), and [shared implementation](/docs/dg/dev/backend-development/data-manipulation/payment-methods/direct-debit-example-implementation/implement-direct-debit-in-the-shared-layer.html), test it by [submitting a new order](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/feature-overviews/checkout-feature-overview/multi-step-checkout-overview.html) from Yves. Then, you can manage the flow of the order [in the Back Office](/docs/pbc/all/order-management-system/{{site.version}}/base-shop/manage-in-the-back-office/orders/change-the-state-of-order-items.html).
