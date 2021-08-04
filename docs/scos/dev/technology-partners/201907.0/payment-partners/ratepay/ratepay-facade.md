---
title: RatePay - Facade
originalLink: https://documentation.spryker.com/v3/docs/ratepay-facade
redirect_from:
  - /v3/docs/ratepay-facade
  - /v3/docs/en/ratepay-facade
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
