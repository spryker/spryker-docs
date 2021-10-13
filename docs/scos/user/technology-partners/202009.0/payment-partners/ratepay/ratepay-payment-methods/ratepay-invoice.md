---
title: RatePay - Invoice
description: Integrate invoice payment through Ratepay into the Spryker-based shop.
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/ratepay-invoice
originalArticleId: 8e61458a-11fd-4761-a455-00734ed8721c
redirect_from:
  - /v6/docs/ratepay-invoice
  - /v6/docs/en/ratepay-invoice
related:
  - title: RatePay - Facade
    link: docs/scos/user/technology-partners/201811.0/payment-partners/ratepay/technical-details-and-howtos/ratepay-facade.html
  - title: RatePay - How to Disable Address Updates from the Backend Application
    link: docs/scos/user/technology-partners/201811.0/payment-partners/ratepay/technical-details-and-howtos/ratepay-how-to-disable-address-updates-from-the-backend-application.html
  - title: RatePay- Core Module Structure Diagram
    link: docs/scos/user/technology-partners/201811.0/payment-partners/ratepay/ratepay-core-module-structure-diagram.html
  - title: RatePay - Prepayment
    link: docs/scos/user/technology-partners/201811.0/payment-partners/ratepay/ratepay-payment-methods/ratepay-prepayment.html
  - title: RatePay
    link: docs/scos/user/technology-partners/201811.0/payment-partners/ratepay/ratepay.html
  - title: RatePay - Payment Workflow
    link: docs/scos/user/technology-partners/201811.0/payment-partners/ratepay/technical-details-and-howtos/ratepay-payment-workflow.html
  - title: RatePay - State Machine Commands and Conditions
    link: docs/scos/user/technology-partners/201811.0/payment-partners/ratepay/technical-details-and-howtos/ratepay-state-machine-commands-and-conditions.html
  - title: RatePay - Installment
    link: docs/scos/user/technology-partners/201811.0/payment-partners/ratepay/ratepay-payment-methods/ratepay-installment.html
  - title: RatePay - Direct Debit
    link: docs/scos/user/technology-partners/201811.0/payment-partners/ratepay/ratepay-payment-methods/ratepay-direct-debit.html
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
To perform the needed requests,  use the [RatePAY State Machine Commands and Conditions](/docs/scos/dev/technology-partners/202009.0/payment-partners/ratepay/technical-details-and-howtos/ratepay-state-machine-commands-and-conditions.html) . You can also use the `facademethods`directly which, however, are invoked by the state machine.
