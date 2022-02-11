---
title: Multi-Step Checkout
description: The checkout is based on a flexible step engine and can be adjusted to any use case.
last_updated: Aug 13, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v4/docs/multi-step-checkout
originalArticleId: 2317299d-3cf9-4832-93d4-f1278ca68553
redirect_from:
  - /v4/docs/multi-step-checkout
  - /v4/docs/en/multi-step-checkout
  - /v4/docs/define-payment-shipment-methods
  - /v4/docs/en/define-payment-shipment-methods
---

The Checkout workflow is a multi-step process that can be fully customized to fit your needs. The standard steps include customer registration and login, shipping and billing address, shipment method and costs, payment method, checkout overview and checkout success. You can easily design the process to accommodate different checkout types and to adapt to different preferences, such as one-page checkout or an invoice page replacing the payment page, by means of our step-engine.

The checkout is based on a flexible step engine and can be adjusted to any use case:

* Highly customizable because of underlying step engine
* Checkout as guest, registered customer or register in the checkout flow
* Hooks for the integration of any payment or shipment methods
* Progress bar to navigate between checkout steps

Developer:
- [Get a general idea of the Checkout steps](/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/checkout/checkout-steps.html)
- [Get a general idea of the Checkout process](/docs/scos/user/features/{{page.version}}/checkout-feature-overview/checkout-feature-overview.html)
- [Migrate the Checkout module from version 4.* to version 6.0.0](/docs/scos/dev/module-migration-guides/migration-guide-checkout.html#upgrading-from-version-4-to-version-600)
- [Migrate the CheckoutPage module from version 2.* to version 3.*](/docs/scos/dev/module-migration-guides/migration-guide-checkoutpage.html)

Shop User:
- [Get a general idea of the Checkout steps](/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/checkout/checkout-steps.html)
- [Get a general idea of the Checkout process](/docs/scos/user/features/{{page.version}}/checkout-feature-overview/checkout-feature-overview.html)
- [Perform the Address Step](/docs/scos/user/shop-user-guides/{{page.version}}/shop-guide-checkout/shop-guide-address-step.html)
- [Perform the Shipment Step](/docs/scos/user/shop-user-guides/{{page.version}}/shop-guide-checkout/shop-guide-shipment-step.html)
- [Perform the Payment Step](/docs/scos/user/shop-user-guides/{{page.version}}/shop-guide-checkout/shop-guide-payment-step.html)
- [Perform the Summary Step](/docs/scos/user/shop-user-guides/{{page.version}}/shop-guide-checkout/shop-guide-summary-step.html)