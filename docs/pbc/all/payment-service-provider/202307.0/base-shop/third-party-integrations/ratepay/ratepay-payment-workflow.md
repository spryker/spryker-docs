---
title: RatePay payment workflow
description: This article describes the request flow that uses Ratepay.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/ratepay-payment-workflow
originalArticleId: 9e0777dc-e660-4a9c-b2e0-0b8cf7adabb2
redirect_from:
  - /docs/scos/user/technology-partners/202307.0/payment-partners/ratepay/ratepay-payment-workflow.html
  - /docs/pbc/all/payment-service-provider/202307.0/third-party-integrations/ratepay/ratepay-payment-workflow.html
related:
  - title: RatePay facade methods
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/ratepay/ratepay-facade-methods.html
  - title: Disabling address updates from the backend application for RatePay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/ratepay/disable-address-updates-from-the-backend-application-for-ratepay.html
  - title: Integrating the Invoice payment method for RatePay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/ratepay/integrate-payment-methods-for-ratepay/integrate-the-invoice-payment-method-for-ratepay.html
  - title: RatePay- Core Module Structure Diagram
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/ratepay/ratepay-core-module-structure-diagram.html
  - title: Integrating the Prepayment payment method for RatePay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/ratepay/integrate-payment-methods-for-ratepay/integrate-the-prepayment-payment-method-for-ratepay.html
  - title: RatePay - State Machine Commands and Conditions
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/ratepay/ratepay-state-machine-commands-and-conditions.html
  - title: Integrating the Installment payment method for RatePay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/ratepay/integrate-payment-methods-for-ratepay/integrate-the-installment-payment-method-for-ratepay.html
  - title: Integrating the Direct Debit payment method for RatePay
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/ratepay/integrate-payment-methods-for-ratepay/integrate-the-direct-debit-payment-method-for-ratepay.html
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

* `PAYMENT CHANGE`cancellation - Merchant cancels some or all items of the order.
* `PAYMENT CHANGE`refund - Merchant returns some or all items of the order.

## Payment Workflow Diagram

![Payment Workflow Diagram](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Ratepay/ratepay-payment-workflow.png)

## Checkout and Delivery process flow

![RatePay - Checkout Delivery Process Flow](https://spryker.s3.eu-central-1.amazonaws.com/docs/Technology+Partners/Payment+Partners/Ratepay/ratepay-checkout-delivery-process-flow.png)
