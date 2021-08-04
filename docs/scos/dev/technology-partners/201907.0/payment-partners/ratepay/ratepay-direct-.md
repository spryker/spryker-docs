---
title: RatePay - Direct Debit
originalLink: https://documentation.spryker.com/v3/docs/ratepay-direct-debit
redirect_from:
  - /v3/docs/ratepay-direct-debit
  - /v3/docs/en/ratepay-direct-debit
---

## Workflow Scenarios


### Payment Flow
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Ratepay/ratepay-ddelv-payment-flow.png){height="" width=""}

### Cancellation Flow
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Ratepay/ratepay-ddelv-payment-flow.png){height="" width=""}

### Partial Cancellation Flow
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Ratepay/ratepay-ddelv-partial-cancellation-flow.png){height="" width=""}

### Refund Flow
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Ratepay/ratepay-ddelv-refund-flow.png){height="" width=""}

## Integrating RatePay

Direct Debit Payment
In order to integrate direct debit payment, two simple steps are needed: set RatePAY Direct Debit payment configuration and call the facade functions.

### Set RatePay Direct Debit Configuration

The configuration to integrate Direct Debit payments using RatePAY is:

* `PROFILE_ID`: merchant's login (required).
* `SECURITY_CODE`: merchant's password (required).
* `SHOP_ID`: shop identifier (required).
* `SYSTEM_ID`: system identifier (required).
* `CLIENT_VERSION`: client system version.
* `CLIENT_NAME`: client name.
* `RATEPAY_REQUEST_VERSION`: request version.
* `RATEPAY_REQUEST_XMLNS_URN`: request XMLNS urn.
* `MODE`: the mode of the transaction, either test or live (required).
* `API_TEST_URL`: test mode API url.
* `API_LIVE_URL`: live mode API url.
* `DEBIT_PAY_TYPES`: debit pay types, can be DIRECT-DEBIT or BANK-TRANSFER.

## Performing Requests

In order to perform the needed requests, you can easily use the implemented state machine commands and conditions. The [RatePAY State Machine Commands and Conditions](/docs/scos/dev/technology-partners/202001.0/payment-partners/ratepay/ratepay-state-m) section gives a summary of them. You can also use the facade methods directly which, however, are invoked by the state machine.
