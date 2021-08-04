---
title: Payolution - Installment Payment
originalLink: https://documentation.spryker.com/v4/docs/payolution-installment
redirect_from:
  - /v4/docs/payolution-installment
  - /v4/docs/en/payolution-installment
---

## Installment Scenarios

### Standard Case
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Payolution/payolution-installment-standard-case.png){height="" width=""}

### Full Refund
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Payolution/payolution-installment-fullrefund-case.png){height="" width=""}

### Partial Refund
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Payolution/payolution-installment-partialrefund-case.png){height="" width=""}

## Integrating Payolution Installment Payment
The In order to integrate installment payment, two simple steps are needed: setting Payolution installment payment configuration and calling the facade functions.

### Setting Payolution Installment Configuration
As installment requests use additional type of requests called Calculation Requests, two groups of configuration are defined: transaction configuration for handling the basic requests (pre-authorization, re-authorization, etc), and calculation configuration for handling calculation requests. The configuration to integrate installment payments using Payolution is:

* `TRANSACTION_GATEWAY_URL`: the gateway URL to connect with Payolution services (required).
* `CALCULATION_GATEWAY_URL`: the gateway URL to connect with Payolution calculation service (required).
* `TRANSACTION_SECURITY_SENDER`: the sender id (required).
* `TRANSACTION_USER_LOGIN`: the sender username (required).
* `TRANSACTION_USER_PASSWORD`: the sender password (required).
* `CALCULATION_SENDER`: the sender name for the calculation request (optional, default is Spryker).
* `CALCULATION_USER_LOGIN`: the sender username for the calculation request (required).
* `CALCULATION_USER_PASSWORD`: the sender password for the calculation request (required).
* `TRANSACTION_MODE`: the mode of the transaction, either test or live (required).
* `CALCULATION_MODE`: the mode of the calculation, either test or live (required).
* `TRANSACTION_CHANNEL_PRE_CHECK`: a Payolution channel for handling pre-check requests, in case of using Pre-check (optional).
* `TRANSACTION_CHANNEL_INSTALLMENT`: a Payolution channel for handling installment requests except Pre-check and calculation as they have their own channel (required).
* `CALCULATION_CHANNEL`: a Payolution channel for handling calculation requests (required).
* `MIN_ORDER_GRAND_TOTAL_INSTALLMENT`: the allowed minimum order grand total amount for installment payments in the shop e.g. the minimum allowed payment is $2 (required).
* `MAX_ORDER_GRAND_TOTAL_INSTALLMENT`: the allowed maximum order grand total amount for installment payments in the shop e.g. the maximum allowed payment is $5000 (required).
* `PAYOLUTION_BCC_EMAIL_ADDRESS`: Payolution email address to send copies of payment details to Payolution.
