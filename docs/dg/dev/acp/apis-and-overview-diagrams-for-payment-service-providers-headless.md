---
title: API and overview diagram the Headless payment flow for payment service providers
description: Overview of the Headless payment flow
last_updated: Now 08, 2024
template: concept-topic-template
related:
   - title: APIs and overview diagrams for payment service providers
     link: docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers.html
---

The following diagram explains the flow of a headless payment page based on Glue API.

![headless-payment-flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers.md/headless-payment-flow.png)

`CancelPreOrderPayment` is an optional element. It's used to cancel a payment that had been created before an order was persisted. This can happen when a customer clicks cancel or when the headless implementation requires a cancellation.

For information about endpoints and messages, see the following links.

### Further reading

* [Learn about the configure and disconnect flow used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-configure-and-disconnect.html)
* [Learn about the Hosted payment page flow used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-hosted-payment-page.html)
* [Learn about the Headless payment flow with express-checkout payment methods used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-headless-express-checkout.html)
* [Learn about the OMS payment flow used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-oms-payment-flow.html)
* [Learn about the asynchronous messages used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-asynchronous-api.html)
* [Learn about the synchronous API endpoints used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-synchronous-api.html)
