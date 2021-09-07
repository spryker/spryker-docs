---
title: RatePay - Invoice
description: Integrate invoice payment through Ratepay into the Spryker-based shop.
originalLink: https://documentation.spryker.com/v1/docs/ratepay-invoice
originalArticleId: 2f16b13f-4fb4-436b-9a05-5245aee85e5f
redirect_from:
  - /v1/docs/ratepay-invoice
  - /v1/docs/en/ratepay-invoice
---

## Workflow Scenarios
### Payment Flow
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Ratepay/ratepay-installment-payment-flow.png) 

### Cancellation Flow
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Ratepay/ratepay-invoice-cancellation-flow.png) 

### Partial Cancellation Flow
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Ratepay/ratepay-invoice-partial-cancellation-flow.png) 

### Refund Flow
![Click Me](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Ratepay/ratepay-invoice-refund-flow.png) 


## Integrating RatePAY Invoice Payment
To integrate invoice payment, you need to: RatePAY invoice payment configuration and call the facade functions.

## Setting RatePAY Invoice Configuration
The configuration to integrate invoice payments using RatePAY is:
 
  * `PROFILE_ID`: merchant’s login (required).

  * `SECURITY_CODE`: merchant’s password (required).

  * `SHOP_ID`: shop identifier (required).

  * `SYSTEM_ID`: system identifier (required).

  * `CLIENT_VERSION`: client system version.

  * `CLIENT_NAME`: client name.

  * `RATEPAY_REQUEST_VERSION`: request version.

  * `RATEPAY_REQUEST_XMLNS_URN`: request XMLNS urn.

  * `MODE`: the mode of the transaction, either test or live (required).

  * `API_TEST_URL`: test mode API url.

  * `API_LIVE_URL`: live mode API url.

## Perform Requests
To perform the needed requests,  use the [RatePAY State Machine Commands and Conditions](/docs/scos/dev/technology-partners/201811.0/payment-partners/ratepay/ratepay-state-machine-commands-and-conditions.html) . You can also use the `facademethods`directly which, however, are invoked by the state machine.
