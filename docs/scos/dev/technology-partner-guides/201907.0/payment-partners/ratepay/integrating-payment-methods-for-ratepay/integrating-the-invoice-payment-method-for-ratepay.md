---
title: Integrating the Invoice payment method for RatePay
description: Integrate invoice payment through Ratepay into the Spryker-based shop.
last_updated: Jan 20, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v3/docs/ratepay-invoice
originalArticleId: 7a52be40-4d0e-4a1c-8bcc-892443cf06c0
redirect_from:
  - /v3/docs/ratepay-invoice
  - /v3/docs/en/ratepay-invoice
  - /docs/scos/user/technology-partners/201907.0/payment-partners/ratepay/integrating-payment-methods-for-ratepay//integrating-the-invoice-payment-method-for-ratepay.html
related:
  - title: RatePay facade methods
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/ratepay-facade-methods.html
  - title: Disabling address updates from the backend application for RatePay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/disabling-address-updates-from-the-backend-application-for-ratepay.html
  - title: RatePay- Core Module Structure Diagram
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/ratepay-core-module-structure-diagram.html
  - title: Integrating the Prepayment payment method for RatePay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/integrating-payment-methods-for-ratepay//integrating-the-prepayment-payment-method-for-ratepay.html
  - title: RatePay
    link: docs/scos/user/technology-partners/page.version/payment-partners/ratepay.html
  - title: RatePay - Payment Workflow
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/ratepay-payment-workflow.html
  - title: RatePay - State Machine Commands and Conditions
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/ratepay-state-machine-commands-and-conditions.html
  - title: Integrating the Installment payment method for RatePay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/integrating-payment-methods-for-ratepay//integrating-the-installment-payment-method-for-ratepay.html
  - title: Integrating the Direct Debit payment method for RatePay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/integrating-payment-methods-for-ratepay/integrating-the-direct-debit-payment-method-for-ratepay.html
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
To perform the needed requests,  use the [RatePAY State Machine Commands and Conditions](/docs/scos/user/technology-partners/201907.0/payment-partners/ratepay/ratepay-state-machine-commands-and-conditions.html) . You can also use the `facademethods`directly which, however, are invoked by the state machine.
