---
title: API and overview diagram the OMS payment flow for payment service providers
description: Overview of POMS payment flow
last_updated: Now 08, 2024
template: concept-topic-template
related:
   - title: APIs and overview diagrams for payment service providers
     link: docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers.html
---

The following diagram shows the flow of an order in the OMS together with an app.

![oms-payment-flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers.md/oms-payment-flow.png)

Optional elements:
* `/payments/transfers` transfers request: used only in marketplaces.
* `CancelPayment` message: used only when a payment needs to be canceled.
* `RefundPayment` message: used only when the refund process is triggered for one or more order items.

### Further reading

* `Configure and disconnect` - [Learn about the configure and disconnect flow used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-configure-and-disconnect.html)
* `Hosted payment page` - [Learn about the Hosted payment page flow used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-hosted-payment-page.html)
* `Headless payment implementation` - [Learn about the Headless payment flow used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-headless.html)
* `Headless payment with express-checkout payment methods` - [Learn about the Headless payment flow with express-checkout payment methods used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-headless-express-checkout.html)
* `Asynchronous API - ACP Messages` - [Learn about the asynchronous messages used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-asynchronous-api.html)
* `Synchronous API - API Endpoints` - [Learn about the synchronous API endpoints used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-synchronous-api.html)