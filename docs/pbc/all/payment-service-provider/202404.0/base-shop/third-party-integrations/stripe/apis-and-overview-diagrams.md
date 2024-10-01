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

The following diagram explains the configuration and disconnect flow for a Payment App.

PLACE OVERVIEW IMAGE FOR CONFIGURATION/DISCONNECTION FLOW HERE

The optional elements here are the `AddPaymentMethod`, `UpdatePaymentMethod`, `DeletePaymentMethod`, and the `ReadyForMerchantAppOnboarding` messages. The Payment Method related messages are used to manage payment methods in the SCOS. Those messages are only sent when a Payment method configuration changes or when the available payment methods are changed. The `ReadyForMerchantAppOnboarding` message is used to inform SCOS that the App is ready to onboard merchants, this message is send when the App is used in the Marketplace business model.

The following diagram explains the flow of an Order in the OMS together with an App.

PLACE OVERVIEW IMAGE FOR OMS FLOW HERE

The optional elements here are the request to do transfers `/payments/transfers` which is only used in a Marketplace business model, the `CancelPayment` message which is only used when a payment needs to be canceled, and the `RefundPayment` message which is only used when the refund process is triggered for one or more order items.

The following diagram explains the Hosted Payment Page Flow. 

PLACE OVERVIEW IMAGE FOR HOSTED PAYMENT PAGE HERE

The following diagram explains the Headless Payment Page Flow using Glue.

PLACE OVERVIEW IMAGE FOR HEADLESS PAYMENT PAGE HERE

The optional element here is the `CancelPreOrderPayment` which can be used to cancel a payment that was created before the order was persisted. This can be used in cases where the customer clicks cancel or in cases where the headless implementation sees the need for canceling. 

You can find information about endpoints and messages down below.

[//]: # (Original diagrams can be found here https://miro.com/app/board/uXjVLZYKfE4=/)

## Asynchronous API

All Payment Service Provider (PSP) integrations are based on the asynchronous API. The asynchronous API is used to process payments and refunds. The following asynchronous messages are used:

* `AddPaymentMethod`: Sent from the App when a new payment method is added.
* `UpdatePaymentMethod`: Sent from the App to SCOS when a payment method is updated.
* `DeletePaymentMethod`: Sent from the App when a payment method is deleted.
* `CancelPayment`: Sent from SCOS to initiate the payment cancellation.
* `CapturePayment`: Sent from SCOS to initiate the payment capture.
* `RefundPayment`: Sent from SCOS to initiate the payment refund.
* `PaymentAuthorized`: Sent from the App when the payment is authorized.
* `PaymentAuthorizationFailed`: Sent from the App when the payment authorization fails.
* `PaymentCaptured`: Sent from the App when the payment is captured.
* `PaymentCaptureFailed`: Sent from the App when the payment capture fails.
* `PaymentRefunded`: Sent from the App when the payment is refunded.
* `PaymentRefundFailed`: Sent from the App when the payment refund fails.
* `PaymentCanceled`: Sent from the App when the payment is canceled.
* `PaymentCancellationFailed`: Sent from the App when the payment cancellation fails.
* `PaymentCreated`: Sent from the App when the payment is created.
* `PaymentUpdated`: Sent from the App when the payment is updated.
* `ReadyForMerchantAppOnboarding`: Sent from the App when the App is ready to onboard merchants.
* `MerchantAppOnboardingStatusChanged`: Sent from the App when the merchant app onboarding status changes.
* `AppConfigUpdated`: Sent from the App when the App configuration is updated.

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