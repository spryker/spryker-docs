---
title: Headless payment flow for payment service providers
description: Overview of the Headless payment flow
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
  - title: OMS payment flow for payment service providers
    link: docs/dg/dev/acp/apis-and-flows-for-payment-service-providers/oms-payment-flow-for-payment-service-providers.html
  - title: Synchronous API for payment service providers
    link: docs/dg/dev/acp/apis-and-flows-for-payment-service-providers/synchronous-api-for-payment-service-providers.html
---

The following diagram explains the flow of a headless payment page based on Glue API.

![headless-payment-flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers.md/headless-payment-flow.png)

`CancelPreOrderPayment` is an optional element. It's used to cancel a payment that had been created before an order was persisted. This can happen when a customer clicks cancel or when a headless implementation requires a cancellation.
