---
title: APIs and overview diagrams for payment service providers
description: Overview of PSP APIs
last_updated: Sep 27, 2024
template: concept-topic-template
related:
   - title: Stripe
     link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/stripe/stripe.html
---

This document provides an overview of Payment Service Provider (PSP) APIs. All PSPs use both synchronous and asynchronous APIs.

The following diagram explains the configuration and disconnect flows for a payment app.

![configure-and-disconnect-flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers.md/configure-and-disconnect-flows.png)

The following messages are optional:
* `AddPaymentMethod`
* `UpdatePaymentMethod`
* `DeletePaymentMethod`
* `ReadyForMerchantAppOnboarding`

The Payment Method related messages are used to manage payment methods in Spryker. These messages are sent only when a payment method configuration changes or when the list of available payment methods changes.

The `ReadyForMerchantAppOnboarding` message is used to inform Spryker that the app is ready to onboard merchants; used only for marketplace projects.

The following diagram shows the flow of an order in the OMS together with an app.

![oms-payment-flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers.md/oms-payment-flow.png)

Optional elements:
* `/payments/transfers` transfers request: used only in marketplaces.
* `CancelPayment` message: used only when a payment needs to be canceled.
* `RefundPayment` message: used only when the refund process is triggered for one or more order items.

The following diagram explains the hosted payment page flow.

![hosted-payment-page-flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers.md/hosted-payment-page-flow.png)

The following diagram explains the flow of a headless payment page based on Glue API.

![headless-payment-flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers.md/headless-payment-flow.png)

`CancelPreOrderPayment` is an optional element. It's used to cancel a payment that had been created before an order was persisted. This can happen when a customer clicks cancel or when the headless implementation requires a cancellation.

For information about endpoints and messages, see the following sections.

The following diagram explains the flow of a headless payment page with an express-checkout payment method based on Glue API.

![headless-express-checkout-flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers.md/headless-express-checkout-flow.png)

The main difference here is that the customer skips most of the default checkout steps and goes directly to the payment step. The payment is created before the order is persisted. The data a customer usually enters during the checkout steps will be retrieved via another API call to get the customer's data. This data can then be used on SCOS side to update e.g. addresses.

## Asynchronous API

All PSP integrations are based on a asynchronous API. The asynchronous API is used to process payments and refunds. The following asynchronous messages are used:

Sent from the app:
* `AddPaymentMethod`: A new payment method is added.
* `UpdatePaymentMethod`: A payment method is updated.
* `DeletePaymentMethod`: A payment method is deleted.
* `PaymentAuthorized`: A payment is authorized.
* `PaymentAuthorizationFailed`: Payment authorization fails.
* `PaymentCaptured`: Payment is captured.
* `PaymentCaptureFailed`: Payment capture fails.
* `PaymentRefunded`: A payment is refunded.
* `PaymentRefundFailed`: Payment refund fails.
* `PaymentCanceled`: A payment is canceled.
* `PaymentCancellationFailed`: Payment cancellation fails.
* `PaymentCreated`: A payment is created.
* `PaymentUpdated`: A payment is updated.
* `ReadyForMerchantAppOnboarding`: App is ready to onboard merchants.
* `MerchantAppOnboardingStatusChanged`: Merchant app onboarding status changes.
* `AppConfigUpdated`: App configuration is updated.

Sent from Spryker:
* `CancelPayment`: Initiates payment cancellation.
* `CapturePayment`: Initiates payment capture.
* `RefundPayment`: Initiates payment refund.


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
