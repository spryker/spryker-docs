---
title: Asynchronous API for payment service providers
description: Overview of PSP Asynchronous API
last_updated: Feb 19, 2025
template: concept-topic-template
related:
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

All PSP integrations are based on a asynchronous API. The asynchronous API is used to process payments and refunds. The following asynchronous messages are used:


Here’s the information formatted into tables:  

## Messages sent from the app
| Message                             | Description                                  |
|--------------------------------------|----------------------------------------------|
| AddPaymentMethod                  | A new payment method is added.              |
| UpdatePaymentMethod                | A payment method is updated.                |
| DeletePaymentMethod                | A payment method is deleted.                |
| PaymentAuthorized                  | A payment is authorized.                    |
| PaymentAuthorizationFailed         | Payment authorization fails.                |
| PaymentCaptured                    | Payment is captured.                        |
| PaymentCaptureFailed               | Payment capture fails.                      |
| PaymentRefunded                    | A payment is refunded.                      |
| PaymentRefundFailed                | Payment refund fails.                       |
| PaymentCanceled                    | A payment is canceled.                      |
| PaymentCancellationFailed          | Payment cancellation fails.                 |
| PaymentOverpaid                    | A payment is overpaid.                      |
| PaymentUnderpaid                   | A payment is underpaid.                     |
| PaymentCreated                     | A payment is created.                       |
| PaymentUpdated                     | A payment is updated.                       |
| ReadyForMerchantAppOnboarding      | App is ready to onboard merchants.          |
| MerchantAppOnboardingStatusChanged | Merchant app onboarding status changes.     |
| AppConfigUpdated                   | App configuration is updated.               |

## Messages sent from Spryker

| Message         | Description                        |
|----------------|------------------------------------|
| CancelPayment | Initiates payment cancellation.  |
| CapturePayment | Initiates payment capture.      |
| RefundPayment | Initiates payment refund.        |
