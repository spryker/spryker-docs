---
title: API and overview diagram the configure and disconnect flows for payment service providers
description: Overview of configuration and disconnect flow
last_updated: Now 08, 2024
template: concept-topic-template
related:
   - title: APIs and overview diagrams for payment service providers
     link: docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers.html
---

The following diagram explains the configuration and disconnect flows for a payment app.

![configure-and-disconnect-flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers.md/configure-and-disconnect-flows.png)

The following messages are optional:
* `AddPaymentMethod`
* `UpdatePaymentMethod`
* `DeletePaymentMethod`
* `ReadyForMerchantAppOnboarding`

The Payment Method related messages are used to manage payment methods in Spryker. These messages are sent only when a payment method configuration changes or when the list of available payment methods changes.

The `ReadyForMerchantAppOnboarding` message is used to inform Spryker that the app is ready to onboard merchants; used only for marketplace projects.

### Further reading

* [Learn about the Hosted payment page flow used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-hosted-payment-page.html)
* [Learn about the Headless payment flow used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-headless.html)
* [Learn about the Headless payment flow with express-checkout payment methods used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-headless-express-checkout.html)
* [Learn about the OMS payment flow used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-oms-payment-flow.html)
* [Learn about the asynchronous messages used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-asynchronous-api.html)
* [Learn about the synchronous API endpoints used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-synchronous-api.html)
