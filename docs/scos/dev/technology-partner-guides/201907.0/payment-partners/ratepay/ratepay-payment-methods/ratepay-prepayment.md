---
title: RatePay - Prepayment
description: Integrate prepayment through Ratepay into the Spryker-based shop.
last_updated: Nov 22, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v3/docs/ratepay-prepayment
originalArticleId: eec3217e-94b8-4ae7-853e-3f6258668bf1
redirect_from:
  - /v3/docs/ratepay-prepayment
  - /v3/docs/en/ratepay-prepayment
  - /docs/scos/user/technology-partners/201907.0/payment-partners/ratepay/ratepay-payment-methods/ratepay-prepayment.html
related:
  - title: RatePay
    link: docs/scos/user/technology-partners/page.version/payment-partners/ratepay/ratepay.html
  - title: RatePay - Facade
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/technical-details-and-howtos/ratepay-facade.html
  - title: Disabling address updates from the backend application for RatePay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/technical-details-and-howtos/disabling-address-updates-from-the-backend-application-for-ratepay.html
  - title: RatePay- Core Module Structure Diagram
    link: docs/scos/user/technology-partners/page.version/payment-partners/ratepay/ratepay-core-module-structure-diagram.html
  - title: RatePay - Invoice
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/ratepay-payment-methods/ratepay-invoice.html
  - title: RatePay - Payment Workflow
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/technical-details-and-howtos/ratepay-payment-workflow.html
  - title: RatePay - State Machine Commands and Conditions
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/technical-details-and-howtos/ratepay-state-machine-commands-and-conditions.html
  - title: RatePay - Installment
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/ratepay-payment-methods/ratepay-installment.html
  - title: RatePay - Direct Debit
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/ratepay-payment-methods/ratepay-direct-debit.html
---

## Workflow Scenarios

### Payment Flow
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Ratepay/ratepay_prepayment_payment_flow.png)

### Cancellation Flow
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Ratepay/ratepay_prepayment_cancellation_flow.png)

### Partial Cancellation Flow
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Ratepay/ratepay_prepayment_payment_flow.pngng)

### Refund Flow
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Ratepay/payolution_installment_partialrefund_case.png)

## Integrating RatePay Prepayment Payment

To integrate prepayment payment: set RatePAY prepayment payment configuration and call the facade functions.

### Set RatePay Prepayment Configuration

The configuration to integrate prepayment payments using RatePAY is:

* `PROFILE_ID`: merchant's login (required).
* `SECURITY_CODE`: merchant's password (required).
* `SHOP_ID`: shop identifier (required).
* `SYSTEM_ID`: system identifier (required).
* `CLIENT_VERSION`: client system version.
* `CLIENT_NAME`: client name.
* `RATEPAY_REQUEST_VERSION`: request version.
* `RATEPAY_REQUEST_XMLNS_URN`: request XMLNS urn.
* `MODE`: the mode of the transaction, either test or live (required).
* `API_TEST_URL`: test mode API URL.
* `API_LIVE_URL`: live mode API URL.

### Performing Requests

In order to perform the needed requests, you can easily use the implemented state machine commands and conditions. The RatePAY State Machine Commands and Conditions section gives a summary of them. You can also use the facade methods directly which, however, are invoked by the state machine.
