---
title: PayOne Credit Card payment flow
description: Payone offers your customers to pay with Credit Card.
template: howto-guide-template
last_updated: Now 8, 2024
related:
  - title: PayOne PayPal Express payment flow in headless applications
    url: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/payone/app-composition-platform-integration/payment-method-flows/payone-paypal-express-payment-flow-in-headless-applications.html
  - title: Payone PayPal payment flow
    url: docs/pbc/all/payment-service-provider/latest/base-shop/third-party-integrations/payone/app-composition-platform-integration/payment-method-flows/payone-paypal-payment-flow.html    
---

When customers pay with a credit card, the flow is as follows:

1. Customer provides their credit card payment credentials and pays the required amount for the placed order.
2. The customer's credit card data is validated.
3. Customer receives a payment message indidcating if the payment or authorization was successful.

When paying with a credit card, customers can do the following:

- Repeat payment as often as they want if a payment or preauthorization failed, or cancel and close the payment page.
- Cancel an entire order before shipment and receive the money back, that is, void the existing preauthorization without being charged a fee.
- Cancel an order after it's ready for shipment and receive the money back, that is, trigger a refund.
- Return part or all items of an order after it was shipped and recieve a refund for the returned items of full order respectively.

When customers pay with a credit card, a shop owner can do the following:


- Charge customers once the order is ready to be shipped, that is, capture the funds.
- Cancel the entire customer order, that is, void the existing preauthorization. In this case, the customer is not charged anything.
- Cancel one or more items of a customer's order before shipment. The customer is not charged for the canceled items.
