---
title: Test the prepayment implementation
description: Test your prepayment method implementation in Spryker with this guide. Ensure proper functionality and optimize your payment process for a seamless ecommerce experience.
last_updated: Jun 16, 2021
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/payment-methods/prepayment/test-the-prepayment-implementation.html
  - /docs/scos/dev/back-end-development/data-manipulation/payment-methods/prepayment/testing-the-prepayment-implementation.html
related:
  - title: Implement prepayment
    link: docs/dg/dev/backend-development/data-manipulation/payment-methods/prepayment/implement-prepayment.html
  - title: Implement prepayment in frontend
    link: docs/dg/dev/backend-development/data-manipulation/payment-methods/prepayment/implement-prepayment-in-frontend.html
  - title: Implement prepayment in backend
    link: docs/dg/dev/backend-development/data-manipulation/payment-methods/prepayment/implement-prepayment-in-backend.html
  - title: Implement prepayment in shared layer
    link: docs/dg/dev/backend-development/data-manipulation/payment-methods/prepayment/implement-prepayment-in-shared-layer.html
  - title: Integrate Prepayment into checkout
    link: docs/dg/dev/backend-development/data-manipulation/payment-methods/prepayment/integrate-prepayment-into-checkout.html
---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}



When you have completed the instructions on [frontend](/docs/dg/dev/backend-development/data-manipulation/payment-methods/prepayment/implement-prepayment-in-frontend.html), [backend](/docs/dg/dev/backend-development/data-manipulation/payment-methods/prepayment/implement-prepayment-in-backend.html), and [shared](/docs/dg/dev/backend-development/data-manipulation/payment-methods/prepayment/implement-prepayment-in-shared-layer.html) implementation, you can test the payment method you just implemented.

All you need to do is to submit a new order from Yves. After that, you can control the flow of the order in Zed UI.
