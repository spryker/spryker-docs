---
title: Asynchronous API overview for payment service providers
description: Overview of PSP Asynchronous API
last_updated: Now 08, 2024
template: concept-topic-template
related:
   - title: APIs and overview diagrams for payment service providers
     link: docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers.html
---

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

### Further reading

* `Configure and disconnect` - [Learn about the configure and disconnect flow used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-configure-and-disconnect.html)
* `Hosted payment page` - [Learn about the Hosted payment page flow used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-hosted-payment-page.html)
* `Headless payment implementation` - [Learn about the Headless payment flow used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-headless.html)
* `Headless payment with express-checkout payment methods` - [Learn about the Headless payment flow with express-checkout payment methods used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-headless-express-checkout.html)
* `OMS payment flow` - [Learn about the OMS payment flow used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-oms-payment-flow.html)
* `Synchronous API - API Endpoints` - [Learn about the synchronous API endpoints used in the ACP.](docs/dg/dev/acp/apis-and-overview-diagrams-for-payment-service-providers-synchronous-api.html)
