---
title: OMS payment flow for payment service providers
description: Overview of POMS payment flow
last_updated: Now 08, 2024
template: concept-topic-template
related:
  - title: Asynchronous API for payment service providers
    link: docs/dg/dev/acp/apis-and-flows-for-payment-service-providers/asynchronous-api-for-payment-service-providers.html
  - title: Configure and disconnect flows for payment service providers
    link: docs/dg/dev/acp/apis-and-flows-for-payment-service-providers/configure-and-disconnect-flows-for-payment-service-providers.html
  - title: Headless express checkout payment flow for payment service providers
    link: docs/dg/dev/acp/apis-and-flows-for-payment-service-providers/headless-express-checkout-payment-flow-for-payment-service-providers.html
  - title: Headless payment flow for payment service providers
    link: docs/dg/dev/acp/apis-and-flows-for-payment-service-providers/headless-payment-flow-for-payment-service-providers.html
  - title: Hosted payment page flow for payment service providers
    link: docs/dg/dev/acp/apis-and-flows-for-payment-service-providers/hosted-payment-page-flow-for-payment-service-providers.html
  - title: Synchronous API for payment service providers
    link: docs/dg/dev/acp/apis-and-flows-for-payment-service-providers/synchronous-api-for-payment-service-providers.html
---

The following diagram shows the flow of an order in the OMS with an app.

![oms-payment-flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers.md/oms-payment-flow.png)

Optional elements:
* `/payments/transfers` transfers request: used only in marketplaces.
* `CancelPayment` message: used only when a payment needs to be canceled.
* `RefundPayment` message: used only when the refund process is triggered for one or more order items.
