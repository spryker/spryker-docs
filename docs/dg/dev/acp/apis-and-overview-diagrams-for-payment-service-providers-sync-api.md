---
title: Synchronous API overview
description: Overview of Synchronous API endpoints
last_updated: Now 08, 2024
template: concept-topic-template
related:
   - title: APIs and overview diagrams for payment service providers
     link: docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers.html
---


## Synchronous API

All PSP integrations are based on a synchronous API. A synchronous API is used to process payments and refunds. The following endpoints are used:

* `/configure`: Used from the ACP app catalog to configure an app.
* `/disconnect`: Used from the ACP app catalog to disconnect an app.
* `/initialize-payment`: Used from the Spryker backend after an order was created and before the hosted payment page is shown to the customer. Initialize the payment in the PSP app, and the PSP app returns the URL to the hosted payment page.
* `/payments`: Glue API endpoint to initialize a payment.
* `/payment-cancellations`: Glue API endpoint to cancel a previously created payment.
* `/confirm-pre-order-payment`: Used from the Spryker backend after an order was created using a headless approach where the payment gets created before the order persists. This connects a previously created (preOrder) payment on the app side with the order on the Zed side.
* `/cancel-pre-order-payment`: Used from the Glue API application in a headless approach when a customer clicks cancel or in case the headless implementation requires a cancellation. This cancels the payment on the PSP side.
* `/payments/transfers`: Used from the Back Office or OMS with the app being used in a marketplace. This initiates the transfer of money from the marketplace to the merchant.
* `/webhooks`: Used from external applications to send requests to an app.
* `/webhooks/test`: Used from external applications in test mode to send requests to an app.

### Further reading

* `Configure and disconnect` - [Learn about the configure and disconnect flow used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-configure-and-disconnect.html)
* `Hosted payment page` - [Learn about the Hosted payment page flow used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-hosted-payment-page.html)
* `Headless payment implementation` - [Learn about the Headless payment flow used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-headless.html)
* `Headless payment with express-checkout payment methods` - [Learn about the Headless payment flow with express-checkout payment methods used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-headless-express-checkout.html)
* `OMS payment flow` - [Learn about the OMS payment flow used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-oms-payment-flow.html)
* `Asynchronous API - ACP Messages` - [Learn about the asynchronous messages used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-asynchronous-api.html)
