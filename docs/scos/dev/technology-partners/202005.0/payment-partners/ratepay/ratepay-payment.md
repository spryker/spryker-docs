---
title: RatePay - Payment Workflow
originalLink: https://documentation.spryker.com/v5/docs/ratepay-payment-workflow
redirect_from:
  - /v5/docs/ratepay-payment-workflow
  - /v5/docs/en/ratepay-payment-workflow
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
![Payment Workflow Diagram](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Ratepay/ratepay-payment-workflow.png){height="" width=""}

## Checkout and Delivery process flow
![RatePay - Checkout Delivery Process Flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Ratepay/ratepay-checkout-delivery-process-flow.png){height="" width=""}

