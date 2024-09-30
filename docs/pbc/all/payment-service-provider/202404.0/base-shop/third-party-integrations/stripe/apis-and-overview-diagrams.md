---
title: APIs and Overview Diagrams
description: See all APIs and overview diagrams for the Stripe payment service provider integration.
last_updated: Sep 27, 2024
template: howto-guide-template
related:
   - title: Stripe
     link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/stripe/stripe.html
redirect_from:
   - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/stripe/install-stripe.html
   - /docs/pbc/all/payment-service-provider/202311.0/base-shop/third-party-integrations/stripe/install-stripe.html
   - /docs/pbc/all/payment-service-provider/202311.0/base-shop/third-party-integrations/stripe/integrate-stripe.html

---

This document provides an overview of the APIs. All Payment Service Provider (PSP) use a synchronous API together with an asynchronous API.

## Asynchronous API

All Payment Service Provider (PSP) integrations are based on the asynchronous API. The asynchronous API is used to process payments and refunds. The following asynchronous messages are used:

* `AddPaymentMethod`: Send from the App when a new payment method is added.
* `UpdatePaymentMethod`: Send from the App to SCOS when a payment method is updated.
* `DeletePaymentMethod`: Send from the App when a payment method is deleted.
* `CancelPayment`: Send from SCOS to initiate the payment cancellation.
* `CapturePayment`: Send from SCOS to initiate the payment capture.
* `RefundPayment`: Send from SCOS to initiate the payment refund.
* `PaymentAuthorized`: Send from the App when the payment is authorized.
* `PaymentAuthorizationFailed`: Send from the App when the payment authorization fails.
* `PaymentCaptured`: Send from the App when the payment is captured.
* `PaymentCaptureFailed`: Send from the App when the payment capture fails.
* `PaymentRefunded`: Send from the App when the payment is refunded.
* `PaymentRefundFailed`: Send from the App when the payment refund fails.
* `PaymentCanceled`: Send from the App when the payment is canceled.
* `PaymentCancellationFailed`: Send from the App when the payment cancellation fails.
* `PaymentCreated`: Send from the App when the payment is created.
* `PaymentUpdated`: Send from the App when the payment is updated.
* `ReadyForMerchantAppOnboarding`: Send from the App when the App is ready to onboard merchants.
* `MerchantAppOnboardingStatusChanged`: Send from the App when the merchant app onboarding status changes.
* `AppConfigUpdated`: Send from the App when the App configuration is updated.

## Synchronous API

All Payment Service Provider (PSP) integrations are based on the synchronous API. The synchronous API is used to process payments and refunds. The following endpoints are used:

+ `/configure`: Used from the ACP App Catalog to configure an App.
+ `/disconnect`: Used from the ACP App Catalog to disconnect an App.
+ `/initialize-payment`: Used from the SCOS back-end after an order was created and before the hosted payment page is shown to the customer. This will initialize the payment in the PSP App and the PSP App will return the URL to the hosted payment page.
+ `/payments`: Glue endpoint to initialize the Payment.
+ `/payment-cancellations`: Glue endpoint to cancel a previous created the Payment.
+ `/confirm-pre-order-payment`: Used from the SCOS back-end after an order was created in a headless approach where the payment gets created before the order persists. This will connect a previously created (preOrder) Payment on the App side with the order on the Zed side.
+ `/cancel-pre-order-payment`: Used from the Glue application in a headless approach where a customer clicks cancel or in cases where the headless implementation sees the need for canceling. This will cancel the Payment on the PSP side.
+ `/payments/transfers`: Used from the Back office/OMS with the App being used in a Marketplace business model. This initiates the transfer of money from the Marketplace to the Merchant.
+ `/webhooks`: Used from external applications to send requests to an App.
+ `/webhooks/test`: Used from external applications in test mode to send requests to an App.