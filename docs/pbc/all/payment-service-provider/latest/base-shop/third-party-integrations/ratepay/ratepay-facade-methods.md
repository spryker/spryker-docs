---
title: RatePay facade methods
description: Explore the Ratepay facade methods in Spryker Cloud Commerce OS to manage payment integrations, enhance transaction capabilities, and streamline workflows.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/ratepay-facade
originalArticleId: eabf3483-95ab-4ced-91e5-4dd2dd2211db
redirect_from:
  - /docs/scos/user/technology-partners/202311.0/payment-partners/ratepay/ratepay-facade-methods.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/ratepay/ratepay-facade-methods.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/ratepay/ratepay-facade-methods.html
related:
  - title: Integrating the Invoice payment method for RatePay
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/ratepay/integrate-payment-methods-for-ratepay/integrate-the-invoice-payment-method-for-ratepay.html
  - title: Integrating the Prepayment payment method for RatePay
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/ratepay/integrate-payment-methods-for-ratepay/integrate-the-prepayment-payment-method-for-ratepay.html
  - title: RatePay - Payment Workflow
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/ratepay/ratepay-payment-workflow.html
  - title: Disabling address updates from the backend application for RatePay
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/ratepay/disable-address-updates-from-the-backend-application-for-ratepay.html
  - title: RatePay- Core Module Structure Diagram
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/ratepay/ratepay-core-module-structure-diagram.html
  - title: Integrating the Installment payment method for RatePay
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/ratepay/integrate-payment-methods-for-ratepay/integrate-the-installment-payment-method-for-ratepay.html
  - title: Integrating the Direct Debit payment method for RatePay
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/ratepay/integrate-payment-methods-for-ratepay/integrate-the-direct-debit-payment-method-for-ratepay.html
  - title: RatePay - State Machine Commands and Conditions
    link: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/ratepay/ratepay-state-machine-commands-and-conditions.html
---

| FACADE METHOD | PARAMETER | RETURN | DESCRIPTION |
| --- | --- | --- | --- |
| `saveOrderPayment` | `QuoteTransfer`, `CheckoutResponseTransfer` | void | Saves RatePAY payment method data according to quote and checkout response transfer data. |
| `initPayment` | `QuoteTransfer` | `RatepayResponseTransfer` | Performs the init payment request to RatePAY Gateway to retrieve transaction data. |
| `requestPayment` | `QuoteTransfer` | `RatepayResponseTransfer` | Performs check the customer and order details payment request to RatePAY Gateway. |
| `confirmPayment` | `OrderTransfer` | `RatepayResponseTransfer` | Performs the payment confirmation request to RatePAY Gateway. |
| `confirmDelivery` | `OrderTransfer`, array (Order Items) | `RatepayResponseTransfer` | Performs the delivery confirmation request to RatePAY Gateway. |
| `cancelPayment` | `OrderTransfer`, array (Order Items) | `RatepayResponseTransfer` | Performs the cancel payment request to RatePAY Gateway. |
| `refundPayment` | `OrderTransfer`, array (Order Items) | `RatepayResponseTransfer` | Performs the refund payment request to RatePAY Gateway. |
| `installmentConfiguration` | `QuoteTransfer` | `RatepayInstallmentConfigurationResponseTransfer` | Performs the installment payment method calculator configuration request to RatePAY Gateway. |
| `installmentCalculation` | `QuoteTransfer` | `RatepayInstallmentCalculationResponseTransfer` | Performs the installment payment method calculator calculation request to RatePAY Gateway. |
| `isPaymentConfirmed` | `OrderTransfer` | bool | Checks if the payment confirmation API request got success response from RatePAY Gateway. |
| `isDeliveryConfirmed` | `OrderTransfer` | bool | Checks if the delivery confirmation API request got success response from RatePAY Gateway. |
| `isRefundApproved` | `OrderTransfer` | bool | Checks if the payment refund API request got success response from RatePAY Gateway. |
| `isCancellationConfirmed` | `OrderTransfer` | bool | Checks if the payment cancellation API request got success response from RatePAY Gateway. |
| `requestProfile` |  | `RatepayProfileResponseTransfer` | Retrieves profile data from Ratepay Gateway. |
| `expandItems` | `CartChangeTransfer` | `CartChangeTransfer` | Expands cart items with necessary for RatePAY information (short_description, long_description, etc). |
| `install` | `MessengerInterface` | void | Installs module translations to project glossary. |
