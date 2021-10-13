---
title: RatePay - Facade
description: This article includes facade methods provided by Ratepay.
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/ratepay-facade
originalArticleId: 500af5e7-cbd7-47df-b4e8-e8539edafc20
redirect_from:
  - /v6/docs/ratepay-facade
  - /v6/docs/en/ratepay-facade
---

| Facade Method | Param | Return | Description |
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
