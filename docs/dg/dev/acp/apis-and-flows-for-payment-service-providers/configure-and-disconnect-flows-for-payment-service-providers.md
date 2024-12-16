---
title: Configure and disconnect flows for payment service providers
description: Overview of configuration and disconnect flow
last_updated: Now 08, 2024
template: concept-topic-template
related:
  - title: Asynchronous API for payment service providers
    link: docs/dg/dev/acp/apis-and-flows-for-payment-service-providers/asynchronous-api-for-payment-service-providers.html
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

The following diagram explains the configuration and disconnect flows for a payment app.

![configure-and-disconnect-flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers.md/configure-and-disconnect-flows.png)

Optional messages:
* `AddPaymentMethod`
* `UpdatePaymentMethod`
* `DeletePaymentMethod`
* `ReadyForMerchantAppOnboarding`

The Payment Method related messages are used to manage payment methods in Spryker. These messages are sent only when a payment method configuration changes or when the list of available payment methods changes.

The `ReadyForMerchantAppOnboarding` message is used to inform Spryker that the app is ready to onboard merchants; used only for marketplace projects.
