---
title: RatePay - Payment Workflow
description: This article describes the request flow that uses Ratepay.
last_updated: Apr 3, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v5/docs/ratepay-payment-workflow
originalArticleId: f514f3c8-bab1-4bbe-872f-926f07d80e43
redirect_from:
  - /v5/docs/ratepay-payment-workflow
  - /v5/docs/en/ratepay-payment-workflow
  - /docs/scos/user/technology-partners/202005.0/payment-partners/ratepay/technical-details-and-howtos/ratepay-payment-workflow.html
related:
  - title: RatePay
    link: docs/scos/user/technology-partners/page.version/payment-partners/ratepay/ratepay.html
  - title: RatePay - Facade
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/technical-details-and-howtos/ratepay-facade.html
  - title: Disabling address updates from the backend application for RatePay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/technical-details-and-howtos/disabling-address-updates-from-the-backend-application-for-ratepay.html
  - title: RatePay - Invoice
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/ratepay-payment-methods/ratepay-invoice.html
  - title: RatePay- Core Module Structure Diagram
    link: docs/scos/user/technology-partners/page.version/payment-partners/ratepay/ratepay-core-module-structure-diagram.html
  - title: RatePay - Prepayment
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/ratepay-payment-methods/ratepay-prepayment.html
  - title: RatePay - State Machine Commands and Conditions
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/technical-details-and-howtos/ratepay-state-machine-commands-and-conditions.html
  - title: RatePay - Installment
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/ratepay-payment-methods/ratepay-installment.html
  - title: RatePay - Direct Debit
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/ratepay-payment-methods/ratepay-direct-debit.html
---

Invoice, Prepayment and Direct Debit methods have the same request flow.
The payment workflow consists of the following requests:

*   `PAYMENT INIT`- Initialize the transaction and get a valid transaction-id.
*   `PAYMENT QUERY`- Check the customer and order details, perform a configurable risk scoring, retrieve the payment products permitted in the given context. The PAYMENT_QUERY full can be booked with a guaranteed acceptance. This means that all products given back will be accepted by a following PAYMENT_REQUEST.
*   `PAYMENT REQUEST`- Check the customer and order details, perform risk scoring, return either customer acceptance or rejection.
*   `PAYMENT CONFIRM`- Finalize the payment process.
*   `CONFIRMATION DELIVER`- Immediately after the ordered goods have been delivered to the customer, the merchant must send a Confirmation Deliver message to the RatePAY Gateway.

 Installment method has additional requests for installment calculator:

*   `CONFIGURATION REQUEST`- Retrieve the stored configuration parameters for a certain merchant profile.

*   `CALCULATION REQUEST`- Provides an installment plan depending on the request parameters and stored parameters of the merchant profile.

## Payment Change Workflow
Trigger payment change processing and fee charging:

`PAYMENT CHANGE`cancellation - Merchant cancels some or all items of the order.

`PAYMENT CHANGE`refund - Merchant returns some or all items of the order.

## Payment Workflow Diagram
![Payment Workflow Diagram](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Ratepay/ratepay-payment-workflow.png)

## Checkout and Delivery process flow
![RatePay - Checkout Delivery Process Flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Ratepay/ratepay-checkout-delivery-process-flow.png)
