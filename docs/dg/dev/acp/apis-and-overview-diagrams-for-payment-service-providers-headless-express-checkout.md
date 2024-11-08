---
title: API and overview diagram the Headless express-checkout payment flow for payment service providers
description: Overview of the Headless payment flow with express-checkout payment methods
last_updated: Now 08, 2024
template: concept-topic-template
related:
   - title: APIs and overview diagrams for payment service providers
     link: docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers.html
---

The following diagram explains the flow of a headless payment page with an express-checkout payment method based on Glue API.

![headless-express-checkout-flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers.md/headless-express-checkout-flow.png)

The main difference here is that the customer skips most of the default checkout steps such as enter addresses and goes directly to the payment step. The payment is created before the order is persisted. The data a customer usually enters during the checkout steps will be retrieved via the Glue `/payment-customer` API call. The returned data can then be used on SCOS side to update e.g. addresses.

### Further reading

* `Configure and disconnect` - [Learn about the configure and disconnect flow used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-configure-and-disconnect.html)
* `Hosted payment page` - [Learn about the Hosted payment page flow used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-hosted-payment-page.html)
* `Headless payment implementation` - [Learn about the Headless payment flow used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-headless.html)
* `OMS payment flow` - [Learn about the OMS payment flow used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-oms-payment-flow.html)
* `Asynchronous API - ACP Messages` - [Learn about the asynchronous messages used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-asynchronous-api.html)
* `Synchronous API - API Endpoints` - [Learn about the synchronous API endpoints used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-synchronous-api.html)