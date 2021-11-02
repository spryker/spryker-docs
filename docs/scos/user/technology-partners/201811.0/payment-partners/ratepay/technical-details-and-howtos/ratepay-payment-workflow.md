---
title: RatePay - Payment Workflow
description: This article describes the request flow that uses Ratepay.
last_updated: Oct 23, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v1/docs/ratepay-payment-workflow
originalArticleId: 04bd95c1-61b9-4db3-9386-1b35585dd124
redirect_from:
  - /v1/docs/ratepay-payment-workflow
  - /v1/docs/en/ratepay-payment-workflow
related:
  - title: RatePay
    link: docs/scos/user/technology-partners/page.version/payment-partners/ratepay/ratepay.html
  - title: RatePay - Facade
    link: docs/scos/user/technology-partners/page.version/payment-partners/ratepay/technical-details-and-howtos/ratepay-facade.html
  - title: RatePay - How to Disable Address Updates from the Backend Application
    link: docs/scos/user/technology-partners/page.version/payment-partners/ratepay/technical-details-and-howtos/ratepay-how-to-disable-address-updates-from-the-backend-application.html
  - title: RatePay - Invoice
    link: docs/scos/user/technology-partners/page.version/payment-partners/ratepay/ratepay-payment-methods/ratepay-invoice.html
  - title: RatePay- Core Module Structure Diagram
    link: docs/scos/user/technology-partners/page.version/payment-partners/ratepay/ratepay-core-module-structure-diagram.html
  - title: RatePay - Prepayment
    link: docs/scos/user/technology-partners/page.version/payment-partners/ratepay/ratepay-payment-methods/ratepay-prepayment.html
  - title: RatePay - State Machine Commands and Conditions
    link: docs/scos/user/technology-partners/page.version/payment-partners/ratepay/technical-details-and-howtos/ratepay-state-machine-commands-and-conditions.html
  - title: RatePay - Installment
    link: docs/scos/user/technology-partners/page.version/payment-partners/ratepay/ratepay-payment-methods/ratepay-installment.html
  - title: RatePay - Direct Debit
    link: docs/scos/user/technology-partners/page.version/payment-partners/ratepay/ratepay-payment-methods/ratepay-direct-debit.html
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

