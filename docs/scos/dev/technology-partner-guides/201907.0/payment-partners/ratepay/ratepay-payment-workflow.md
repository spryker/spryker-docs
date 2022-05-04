---
title: RatePay - Payment Workflow
description: This article describes the request flow that uses Ratepay.
last_updated: Nov 22, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v3/docs/ratepay-payment-workflow
originalArticleId: 482013ea-7661-42ec-9ac0-02c4fd6653e1
redirect_from:
  - /v3/docs/ratepay-payment-workflow
  - /v3/docs/en/ratepay-payment-workflow
  - /docs/scos/user/technology-partners/201907.0/payment-partners/ratepay/ratepay-payment-workflow.html
related:
  - title: RatePay
    link: docs/scos/user/technology-partners/page.version/payment-partners/ratepay.html
  - title: RatePay facade methods
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/ratepay-facade-methods.html
  - title: Disabling address updates from the backend application for RatePay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/disabling-address-updates-from-the-backend-application-for-ratepay.html
  - title: Integrating the Invoice payment method for RatePay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/integrating-payment-methods-for-ratepay//integrating-the-invoice-payment-method-for-ratepay.html
  - title: RatePay- Core Module Structure Diagram
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/ratepay-core-module-structure-diagram.html
  - title: Integrating the Prepayment payment method for RatePay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/integrating-payment-methods-for-ratepay//integrating-the-prepayment-payment-method-for-ratepay.html
  - title: RatePay - State Machine Commands and Conditions
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/ratepay-state-machine-commands-and-conditions.html
  - title: Integrating the Installment payment method for RatePay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/integrating-payment-methods-for-ratepay//integrating-the-installment-payment-method-for-ratepay.html
  - title: Integrating the Direct Debit payment method for RatePay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/ratepay/integrating-payment-methods-for-ratepay/integrating-the-direct-debit-payment-method-for-ratepay.html
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
