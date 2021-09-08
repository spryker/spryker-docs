---
title: RatePay - Prepayment
description: Integrate prepayment through Ratepay into the Spryker-based shop.
originalLink: https://documentation.spryker.com/2021080/docs/ratepay-prepayment
originalArticleId: a4c45f04-f178-4d8f-aee3-79cc0a24106d
redirect_from:
  - /2021080/docs/ratepay-prepayment
  - /2021080/docs/en/ratepay-prepayment
  - /docs/ratepay-prepayment
  - /docs/en/ratepay-prepayment
---

## Workflow Scenarios

### Payment Flow
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Ratepay/ratepay_prepayment_payment_flow.png) 

### Cancellation Flow
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Ratepay/ratepay_prepayment_cancellation_flow.png) 

### Partial Cancellation Flow
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Ratepay/ratepay_prepayment_payment_flow.png) 

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
