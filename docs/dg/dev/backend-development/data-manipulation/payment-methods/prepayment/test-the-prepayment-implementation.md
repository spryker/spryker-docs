---
title: Test the prepayment implementation
description: This document describes how to test the prepayment implementation.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-prepayment-test
originalArticleId: 3895c67a-c137-4474-9314-cd4cc814d8b4
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/payment-methods/prepayment/test-the-prepayment-implementation.html
  - /docs/scos/dev/back-end-development/data-manipulation/payment-methods/prepayment/testing-the-prepayment-implementation.html
related:
  - title: Implement prepayment
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/prepayment/implement-prepayment.html
  - title: Implement prepayment in frontend
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/prepayment/implement-prepayment-in-frontend.html
  - title: Implement prepayment in backend
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/prepayment/implement-prepayment-in-backend.html
  - title: Implement prepayment in shared layer
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/prepayment/implement-prepayment-in-shared-layer.html
  - title: Integrate Prepayment into checkout
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/prepayment/integrate-prepayment-into-checkout.html
---


When you have completed the instructions on [frontend](/docs/dg/dev/backend-development/data-manipulation/payment-methods/prepayment/implement-prepayment-in-frontend.html), [backend](/docs/dg/dev/backend-development/data-manipulation/payment-methods/prepayment/implement-prepayment-in-backend.html), and [shared](/docs/dg/dev/backend-development/data-manipulation/payment-methods/prepayment/implement-prepayment-in-shared-layer.html) implementation, you can test the payment method you just implemented.

All you need to do is to submit a new order from Yves. After that, you can control the flow of the order in Zed UI.
