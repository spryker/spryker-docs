---
title: Integrating the Prepayment payment method for RatePay
description: Integrate prepayment through Ratepay into the Spryker-based shop.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/ratepay-prepayment
originalArticleId: a4c45f04-f178-4d8f-aee3-79cc0a24106d
redirect_from:
  - /2021080/docs/ratepay-prepayment
  - /2021080/docs/en/ratepay-prepayment
  - /docs/ratepay-prepayment
  - /docs/en/ratepay-prepayment
  - /docs/scos/user/technology-partners/202108.0/payment-partners/ratepay/integrating-payment-methods-for-ratepay//integrating-the-prepayment-payment-method-for-ratepay.html
related:
  - title: RatePay
    link: docs/scos/user/technology-partners/page.version/payment-partners/ratepay.html
  - title: RatePay facade methods
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/ratepay-facade-methods.html
  - title: Disabling address updates from the backend application for RatePay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/disabling-address-updates-from-the-backend-application-for-ratepay.html
  - title: RatePay- Core Module Structure Diagram
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/ratepay-core-module-structure-diagram.html
  - title: Integrating the Invoice payment method for RatePay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/integrating-payment-methods-for-ratepay//integrating-the-invoice-payment-method-for-ratepay.html
  - title: RatePay - Payment Workflow
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/ratepay-payment-workflow.html
  - title: RatePay - State Machine Commands and Conditions
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/ratepay-state-machine-commands-and-conditions.html
  - title: Integrating the Installment payment method for RatePay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/integrating-payment-methods-for-ratepay//integrating-the-installment-payment-method-for-ratepay.html
  - title: Integrating the Direct Debit payment method for RatePay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/integrating-payment-methods-for-ratepay/integrating-the-direct-debit-payment-method-for-ratepay.html
---

## Payment Flow Scenarios

![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Ratepay/ratepay_prepayment_payment_flow.png)

## Cancellation Flow Scenarios

![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Ratepay/ratepay_prepayment_cancellation_flow.png)

## Partial Cancellation Flow Scenarios

![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Ratepay/ratepay_prepayment_payment_flow.png)

## Refund Flow Scenarios

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
